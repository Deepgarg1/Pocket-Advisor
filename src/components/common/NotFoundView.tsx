import React from 'react';
import { Home, Calculator, Users, BookOpen, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface NotFoundViewProps {
  onNavigate?: (view: string) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  const handleNav = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    } else {
      window.location.href = view === 'home' ? '/' : `/${view}`;
    }
  };

  return (
    <section
      style={{
        padding: '80px 24px',
        maxWidth: '860px',
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '65vh',
      }}
    >
      {/* 404 Large Gradient Code */}
      <div
        style={{
          fontSize: 'clamp(5rem, 14vw, 8rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          display: 'inline-block',
          marginBottom: '12px',
          userSelect: 'none',
        }}
      >
        404
      </div>

      {/* Pill Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          color: '#f87171',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '20px',
        }}
      >
        <AlertCircle size={15} /> Page Not Found
      </div>

      <h1
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          margin: '0 0 16px 0',
          color: 'var(--text-primary)',
        }}
      >
        Oops! We couldn't find that page
      </h1>

      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '1.05rem',
          maxWidth: '560px',
          lineHeight: 1.65,
          margin: '0 0 36px 0',
        }}
      >
        The link you followed may be broken, the page may have been moved, or the URL might be mistyped.
      </p>

      {/* Primary Action Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '14px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '50px',
        }}
      >
        <Button
          variant="primary"
          size="lg"
          onClick={() => handleNav('home')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <Home size={18} /> Back to Home
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => handleNav('split')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <Users size={18} /> Try Bill Splitter
        </Button>
      </div>

      {/* Helpful Links Grid */}
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '20px',
          padding: '24px 28px',
          textAlign: 'left',
        }}
      >
        <div style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Popular Destinations
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          <button
            onClick={() => handleNav('calculators')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 14px',
              borderRadius: '12px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s ease',
            }}
          >
            <Calculator size={18} color="var(--primary)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>Financial Calculators</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>EMI, SIP &amp; Prepayment</div>
            </div>
          </button>

          <button
            onClick={() => handleNav('guides')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 14px',
              borderRadius: '12px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s ease',
            }}
          >
            <BookOpen size={18} color="var(--primary)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>Problem-Solving Guides</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Rent splits &amp; UPI math</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
