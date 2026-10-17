import React from 'react';
import { Sparkles, Smartphone } from 'lucide-react';

interface PlgBannerProps {
  isDark: boolean;
  onResetToDefaults: () => void;
}

export const PlgBanner: React.FC<PlgBannerProps> = ({ isDark, onResetToDefaults }) => {
  return (
    <div
      style={{
        marginTop: '12px',
        padding: 'clamp(20px, 3vw, 28px)',
        borderRadius: '24px',
        background: isDark
          ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #eef2ff 100%)',
        border: isDark
          ? '1px solid rgba(99, 102, 241, 0.25)'
          : '1.5px solid rgba(99, 102, 241, 0.25)',
        boxShadow: isDark ? 'none' : '0 8px 24px rgba(99, 102, 241, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ maxWidth: '640px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: 800,
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '6px',
            }}
          >
            <Sparkles size={14} /> Product-Led Growth • 100% Free
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
            Split Your Own Bills Free with Pocket Advisor
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
            Never deal with messy spreadsheets or awkward money reminders again. Pocket Advisor minimizes group transfers, generates 1-tap UPI WhatsApp receipts, and automatically detects expenses from bank SMS alerts on Android.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            onClick={onResetToDefaults}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Start Fresh Split
          </button>

          <a
            href="https://play.google.com/store/apps/details?id=com.pocketadvisor.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              background: 'var(--primary-gradient)',
              color: '#ffffff',
              fontSize: '0.84rem',
              fontWeight: 800,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
              transition: 'all 0.15s ease',
            }}
          >
            <Smartphone size={16} />
            <span>Get Android App</span>
          </a>
        </div>
      </div>
    </div>
  );
};
