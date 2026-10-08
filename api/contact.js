import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/contact
 * Creates a ticket directly in the support database.
 * Replaces Web3Forms — customer email is stored as-is, enabling direct replies.
 */
export default async function handler(req, res) {
  // CORS — allow only our own origin
  res.setHeader('Access-Control-Allow-Origin', 'https://pocketadvisor.in');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
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
  // Parse body
  // ------------------------------------------------------------------
  const { name, email, subject, message, category, honeypot } = req.body || {};

  // Honeypot: bots fill the hidden field → silently drop
  if (honeypot) {
    return res.status(200).json({ success: true, message: 'Message received.' });
  }

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  // ------------------------------------------------------------------
  // Determine routing
  // ------------------------------------------------------------------
  const cleanCategory = (category || 'general').toLowerCase();
  const cleanSubject = subject?.trim() || (cleanCategory === 'privacy'
    ? 'Privacy Request'
    : `Inquiry from ${name.trim()}`);
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
        customer_name: name.trim(),
        customer_email: email.trim(),
        subject: cleanSubject,
        status: 'open',
        mailbox_folder: mailboxFolder,
        source: 'web',
        acknowledgement_sent: true, // User sees confirmation on screen — no email needed
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
        body_text: message.trim(),
        sender_email: email.trim(),
        sender_name: name.trim(),
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
