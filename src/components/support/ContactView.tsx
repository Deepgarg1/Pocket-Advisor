import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Clock,
  User,
  HelpCircle,
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  AlertCircle,
  Loader2,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface ContactViewProps {
  onNavigate?: (view: string) => void;
}

const CATEGORY_OPTIONS = [
  { value: 'general', label: 'General Inquiry & Support' },
  { value: 'bug', label: 'Bug Report / App Issue' },
  { value: 'feature', label: 'Feature Request / Suggestion' },
  { value: 'tools', label: 'Bill Splitter & Financial Calculators' },
  { value: 'privacy', label: 'Privacy, Security & Data Deletion' },
  { value: 'partnership', label: 'Business & Partnership Inquiry' },
  { value: 'other', label: 'Other / Something Else' },
];

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('general');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [targetInbox, setTargetInbox] = useState('support@pocketadvisor.in');

  const [copiedTicket, setCopiedTicket] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNav = (view: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    // Set destination inbox display
    const destination = category === 'privacy' ? 'privacy@pocketadvisor.in' : 'support@pocketadvisor.in';
    setTargetInbox(destination);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          category,
          subject: subject.trim() || undefined,
          message: message.trim(),
          honeypot: honeypot.trim() || undefined,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setTicketId(data.ticketNumber || 'PA-CREATED');
        setSubmitted(true);
      } else {
        setSubmitError(
          data?.error || 'Unable to send your message. Please try again, or email us directly at support@pocketadvisor.in.'
        );
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setSubmitError(
        'Network error — please check your internet connection and try again, or email us directly at support@pocketadvisor.in.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setCategory('general');
    setSubject('');
    setMessage('');
    setSubmitted(false);
    setSubmitError(null);
  };

  const handleCopyTicket = () => {
    const text =
      `Ticket Reference: ${ticketId}\n` +
      `Destination: ${targetInbox}\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Category: ${category}\n` +
      `Subject: ${subject}\n\n` +
      `Message:\n${message}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2500);
    });
  };

  const handleCopyEmail = (address: string) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedEmail(address);
      setTimeout(() => setCopiedEmail(null), 2000);
    });
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Top Breadcrumb & Back Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <button
          type="button"
          onClick={(e) => handleNav('home', e)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600,
            padding: 0,
          }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <nav aria-label="Breadcrumb" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <a href="/" onClick={(e) => handleNav('home', e)} style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Contact &amp; Support</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.28)',
            color: 'var(--primary)',
            fontSize: '0.84rem',
            fontWeight: 700,
            marginBottom: '16px',
          }}
        >
          <Sparkles size={14} /> Official Customer Support &amp; Developer Inquiries
        </div>

        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            margin: '0 0 16px',
          }}
        >
          Get in Touch with Pocket Advisor
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.12rem)', lineHeight: 1.6, margin: '0 0 20px' }}>
          Have a question about automated bank SMS tracking, bill splitting algorithms, or data privacy? Submit your inquiry directly and our team will get back to you promptly.
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.88rem', fontWeight: 600 }}>
          <Clock size={16} /> Typical response time: Under 24 hours (Monday &ndash; Saturday)
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Direct In-Page Contact Form */}
        <Card
          style={{
            padding: '36px',
            borderRadius: '24px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(99, 102, 241, 0.14)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                  }}
                >
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    Send Us a Message
                  </h2>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
                    Directly dispatched to our support desk with zero app-switching.
                  </p>
                </div>
              </div>

              {/* Error Alert */}
              {submitError && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    color: '#ef4444',
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    marginBottom: '20px',
                  }}
                >
                  <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Transmission Notice:</strong> {submitError}
                  </div>
                </div>
              )}

              {/* Honeypot field for bot filtering */}
              <input
                type="text"
                name="_honey"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Name & Email Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Your Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Inquiry Category Custom Styled Dropdown */}
              <div ref={dropdownRef} style={{ marginBottom: '16px', position: 'relative' }}>
                <label
                  id="category-dropdown-label"
                  style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}
                >
                  Topic / Category *
                </label>

                {/* Dropdown Trigger Button */}
                <button
                  type="button"
                  id="contact-category-trigger"
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                  aria-labelledby="category-dropdown-label contact-category-trigger"
                  disabled={isSubmitting}
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: isDropdownOpen
                      ? '1px solid var(--primary)'
                      : '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: isDropdownOpen ? '0 0 0 3px rgba(99, 102, 241, 0.18)' : 'none',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                  }}
                >
                  <span>
                    {CATEGORY_OPTIONS.find((opt) => opt.value === category)?.label || 'Select Category'}
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      color: isDropdownOpen ? 'var(--primary)' : 'var(--text-secondary)',
                      transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0,
                    }}
                  />
                </button>

                {/* Dropdown Floating Menu with Bold Bottom Outline */}
                {isDropdownOpen && (
                  <ul
                    role="listbox"
                    aria-labelledby="category-dropdown-label"
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 6px)',
                      left: 0,
                      right: 0,
                      zIndex: 100,
                      margin: 0,
                      padding: '8px',
                      listStyle: 'none',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid rgba(99, 102, 241, 0.35)',
                      borderBottom: '2.5px solid var(--primary)',
                      borderRadius: '14px',
                      boxShadow: '0 20px 42px rgba(0, 0, 0, 0.65), 0 4px 12px rgba(0, 0, 0, 0.3)',
                      maxHeight: '320px',
                      overflowY: 'auto',
                    }}
                  >
                    {CATEGORY_OPTIONS.map((opt) => {
                      const isSelected = category === opt.value;
                      return (
                        <li
                          key={opt.value}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setCategory(opt.value);
                            setIsDropdownOpen(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            fontSize: '0.88rem',
                            fontWeight: isSelected ? 700 : 500,
                            color: isSelected ? 'var(--primary)' : 'var(--text-primary)',
                            backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                            cursor: 'pointer',
                            transition: 'background-color 0.15s ease',
                            marginBottom: '2px',
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          <span>{opt.label}</span>
                          {isSelected && <Check size={16} color="var(--primary)" />}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Subject */}
              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="contact-subject" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  disabled={isSubmitting}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief summary of your question or issue"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Detailed Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  disabled={isSubmitting}
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your question or issue in detail. If reporting a bug, include your Android version and device model if applicable."
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical',
                    lineHeight: 1.5,
                  }}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.75 : 1,
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Sending Message Directly...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message Directly
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <CheckCircle2 size={40} />
              </div>

              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Message Sent Directly!
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '24px' }}>
                Thank you, <strong>{name}</strong>! Your inquiry has been dispatched directly to our support inbox without opening external mail applications.
              </p>

              <div
                style={{
                  padding: '18px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  textAlign: 'left',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.04em' }}>
                    TICKET REF: {ticketId}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '6px' }}>
                    Dispatched
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  <strong>Destination:</strong> {targetInbox}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  <strong>From:</strong> {name} ({email})
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <strong>Expected Response:</strong> Within 24 hours
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCopyTicket}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem' }}
                >
                  {copiedTicket ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                  {copiedTicket ? 'Inquiry Copied!' : 'Copy Ticket Reference'}
                </Button>

                <Button
                  type="button"
                  variant="primary"
                  onClick={handleResetForm}
                  style={{ fontSize: '0.88rem' }}
                >
                  Send Another Message
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Right Column: Direct Channels & Help Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Card 1: Direct Support Channels */}
          <Card
            style={{
              padding: '28px',
              borderRadius: '24px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(16, 185, 129, 0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981',
                }}
              >
                <Mail size={18} />
              </div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Direct Support Inboxes
              </h2>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
              Prefer to email us from your own email client? Reach out directly to our specialized email desks:
            </p>

            {/* General Support Item */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '12px',
              }}
            >
              <div>
                <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', margin: '0 0 2px', textTransform: 'uppercase' }}>
                  General Support &amp; Bugs
                </h3>
                <a
                  href="mailto:support@pocketadvisor.in"
                  style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.92rem', textDecoration: 'none' }}
                >
                  support@pocketadvisor.in
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleCopyEmail('support@pocketadvisor.in')}
                aria-label="Copy support email address"
                style={{
                  background: 'none',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.78rem',
                }}
              >
                {copiedEmail === 'support@pocketadvisor.in' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                {copiedEmail === 'support@pocketadvisor.in' ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* Privacy Inquiries Item */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div>
                <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', margin: '0 0 2px', textTransform: 'uppercase' }}>
                  Privacy &amp; Data Deletion
                </h3>
                <a
                  href="mailto:privacy@pocketadvisor.in"
                  style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.92rem', textDecoration: 'none' }}
                >
                  privacy@pocketadvisor.in
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleCopyEmail('privacy@pocketadvisor.in')}
                aria-label="Copy privacy email address"
                style={{
                  background: 'none',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.78rem',
                }}
              >
                {copiedEmail === 'privacy@pocketadvisor.in' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                {copiedEmail === 'privacy@pocketadvisor.in' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </Card>

          {/* Card 2: Developer & Maintainer Info (Google E-E-A-T) */}
          <Card
            style={{
              padding: '28px',
              borderRadius: '24px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(59, 130, 246, 0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3b82f6',
                }}
              >
                <User size={18} />
              </div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Developer &amp; Maintainer
              </h2>
            </div>

            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 10px' }}>
                <strong>Creator:</strong> Deepesh Garg (Independent Android &amp; Web Developer)
              </p>
              <p style={{ margin: '0 0 10px' }}>
                <strong>Location &amp; Jurisdiction:</strong> India
              </p>
              <p style={{ margin: '0 0 10px' }}>
                <strong>Android Application ID:</strong>{' '}
                <a
                  href="https://play.google.com/store/apps/details?id=com.pocketadvisor.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                >
                  com.pocketadvisor.app <ExternalLink size={12} />
                </a>
              </p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Pocket Advisor is independently designed and maintained, committed to zero-cloud financial privacy and open algorithmic financial calculators.
              </p>
            </div>
          </Card>

          {/* Card 3: Self-Service Resource Shortcuts */}
          <Card
            style={{
              padding: '24px 28px',
              borderRadius: '24px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <HelpCircle size={18} color="var(--primary)" />
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Frequently Requested Resources
              </h2>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => handleNav('faq', e)}
                  style={{ color: 'var(--primary)', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' }}
                >
                  &rarr; Frequently Asked Questions (Bank SMS Security &amp; App Usage)
                </a>
              </li>
              <li>
                <a
                  href="/delete-account"
                  onClick={(e) => handleNav('delete-account', e)}
                  style={{ color: 'var(--primary)', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' }}
                >
                  &rarr; Web Account &amp; Cloud Data Deletion Portal
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handleNav('privacy', e)}
                  style={{ color: 'var(--primary)', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' }}
                >
                  &rarr; Full Privacy Policy &amp; Security Architecture
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
