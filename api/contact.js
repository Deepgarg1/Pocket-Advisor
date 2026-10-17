import { createClient } from '@supabase/supabase-js';

// In-memory sliding-window IP rate limiter
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const activeTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);

  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, activeTimestamps);
    const oldestTimestamp = activeTimestamps[0] || now;
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((oldestTimestamp + RATE_LIMIT_WINDOW_MS - now) / 1000)),
    };
  }

  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);

  // Periodically sweep expired entries if the map exceeds 1000 entries
  if (rateLimitMap.size > 1000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (!v.some(ts => now - ts < RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(k);
      }
    }
  }

  return { allowed: true };
}

/**
 * POST /api/contact
 * Creates a ticket directly in the support database with rate-limiting and bot defenses.
 */
export default async function handler(req, res) {
  // CORS — allow our production domains and local development
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://pocketadvisor.in',
    'https://www.pocketadvisor.in',
  ];

  if (origin && (allowedOrigins.includes(origin) || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.pocketadvisor.in');
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // ------------------------------------------------------------------
  // Rate Limiting by Client IP
  // ------------------------------------------------------------------
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : null)
    || req.headers['x-real-ip']
    || req.socket?.remoteAddress
    || '127.0.0.1';

  const rateLimitResult = checkRateLimit(clientIp);
  if (!rateLimitResult.allowed) {
    res.setHeader('Retry-After', String(rateLimitResult.retryAfterSec));
    return res.status(429).json({
      error: `Too many submissions. Please wait ${rateLimitResult.retryAfterSec} seconds before sending another message.`,
    });
  }

  // ------------------------------------------------------------------
  // Validate env
  // ------------------------------------------------------------------
  const supabaseUrl = process.env.SUPPORT_SUPABASE_URL;
  const supabaseKey = process.env.SUPPORT_SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPPORT_SUPABASE_URL or SUPPORT_SUPABASE_SERVICE_KEY');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  // ------------------------------------------------------------------
  // Parse body & Bot Defenses
  // ------------------------------------------------------------------
  const { name, email, subject, message, category, honeypot, formLoadedAt, turnstileToken } = req.body || {};

  // 1. Honeypot check: bots fill hidden fields -> silently drop with fake success
  if (honeypot) {
    return res.status(200).json({ success: true, message: 'Message received.' });
  }

  // 2. Timing Gate: humans need at least 2.5s to read/type a form.
  // If filled impossibly fast (< 2.5s) or token is in the future/expired (> 4 hrs), silently drop
  if (formLoadedAt) {
    const elapsedMs = Date.now() - Number(formLoadedAt);
    if (isNaN(elapsedMs) || elapsedMs < 2500 || elapsedMs > 4 * 60 * 60 * 1000) {
      return res.status(200).json({ success: true, message: 'Message received.' });
    }
  }

  // 3. Optional Cloudflare Turnstile Verification if configured
  if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
    try {
      const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(process.env.TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(turnstileToken)}&remoteip=${encodeURIComponent(clientIp)}`,
      });
      const turnstileData = await turnstileRes.json();
      if (!turnstileData.success) {
        return res.status(400).json({ error: 'Bot verification failed. Please refresh and try again.' });
      }
    } catch (err) {
      console.warn('Turnstile verification error:', err);
    }
  }

  // ------------------------------------------------------------------
  // Field Validation & Sanitization
  // ------------------------------------------------------------------
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const cleanName = name.trim().slice(0, 100);
  const cleanEmail = email.trim().slice(0, 120);
  const cleanMessage = message.trim().slice(0, 3000);

  if (cleanName.length < 2) {
    return res.status(400).json({ error: 'Please enter a valid name (at least 2 characters).' });
  }

  // Strict email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  // Link spam check: reject messages with more than 3 external links
  const urlCount = (cleanMessage.match(/https?:\/\//gi) || []).length;
  if (urlCount > 3) {
    return res.status(400).json({ error: 'Messages containing multiple links are blocked for spam prevention.' });
  }

  // ------------------------------------------------------------------
  // Determine routing
  // ------------------------------------------------------------------
  const cleanCategory = (category || 'general').toLowerCase();
  const cleanSubject = subject?.trim().slice(0, 150) || (cleanCategory === 'privacy'
    ? 'Privacy Request'
    : `Inquiry from ${cleanName}`);
  const mailboxFolder = cleanCategory === 'privacy' ? 'Privacy' : 'WebForm';

  // ------------------------------------------------------------------
  // Insert into support DB
  // ------------------------------------------------------------------
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // 1. Create the ticket
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .insert({
        customer_name: cleanName,
        customer_email: cleanEmail,
        subject: cleanSubject,
        status: 'open',
        mailbox_folder: mailboxFolder,
        source: 'web',
        acknowledgement_sent: true,
      })
      .select('id, ticket_number')
      .single();

    if (ticketError) {
      console.error('Ticket insert error:', ticketError);
      throw ticketError;
    }

    // 2. Create the initial inbound message
    const { error: msgError } = await supabase
      .from('ticket_messages')
      .insert({
        ticket_id: ticket.id,
        direction: 'inbound',
        sender_type: 'customer',
        body_text: cleanMessage,
        sender_email: cleanEmail,
        sender_name: cleanName,
      });

    if (msgError) {
      console.error('Message insert error:', msgError);
      throw msgError;
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been received. We will respond shortly.',
      ticketNumber: ticket.ticket_number,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Failed to submit your message. Please try again.' });
  }
}
