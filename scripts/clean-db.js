import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPPORT_SUPABASE_URL || 'https://ksqmuxcgswfmosjxfjzm.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPPORT_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzcW11eGNnc3dmbW9zanhmanptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MTg0NTAsImV4cCI6MjEwNjA5NDQ1MH0.8CTmtP3X3eJXMPlPO9mZIzTWo73qVzHCFQhAlLf4OeY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function cleanString(str) {
  if (!str) return str;
  const trimmed = str.trim();
  if (trimmed.startsWith('{') && (trimmed.includes('"text"') || trimmed.includes('"html"'))) {
    try {
      const parsed = JSON.parse(trimmed);
      if (parsed && typeof parsed.text === 'string') {
        return parsed.text.replace(/\{0\}/g, '').trim();
      }
    } catch {}
  }
  return str.replace(/\{0\}/g, '').trim();
}

async function run() {
  // 1. Clean ticket_messages
  const { data: messages } = await supabase.from('ticket_messages').select('id, body_text');
  if (messages) {
    for (const msg of messages) {
      const cleaned = cleanString(msg.body_text);
      if (cleaned !== msg.body_text) {
        await supabase.from('ticket_messages').update({ body_text: cleaned }).eq('id', msg.id);
        console.log(`Cleaned message ${msg.id}`);
      }
    }
  }

  // 2. Clean tickets first_message_snippet
  const { data: tickets } = await supabase.from('tickets').select('id, first_message_snippet');
  if (tickets) {
    for (const t of tickets) {
      const cleaned = cleanString(t.first_message_snippet);
      if (cleaned !== t.first_message_snippet) {
        await supabase.from('tickets').update({ first_message_snippet: cleaned.substring(0, 150) }).eq('id', t.id);
        console.log(`Cleaned ticket ${t.id}`);
      }
    }
  }

  console.log('Database cleanup completed!');
}

run().catch(console.error);
