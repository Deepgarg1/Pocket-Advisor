import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UsersRound, Gift, Copy, Check, Download, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

interface DeepLinkLandingViewProps {
  type: 'invite' | 'ref';
  onNavigate?: (view: string) => void;
}

export const DeepLinkLandingView: React.FC<DeepLinkLandingViewProps> = ({ type, onNavigate }) => {
  const params = useParams<{ code?: string; id?: string }>();
  const code = (params.code || params.id || '').toUpperCase();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playStoreUrl = type === 'ref' && code
    ? `https://play.google.com/store/apps/details?id=com.pocketadvisor.app&referrer=utm_source%3Dapp_referral%26utm_content%3D${encodeURIComponent(code)}`
    : 'https://play.google.com/store/apps/details?id=com.pocketadvisor.app';

  const appSchemeUrl = type === 'invite'
    ? `pocketadvisor://invite?group=${encodeURIComponent(code)}`
    : `pocketadvisor://ref?code=${encodeURIComponent(code)}`;

  React.useEffect(() => {
    if (typeof window !== 'undefined' && code && /android/i.test(navigator.userAgent)) {
      const timer = setTimeout(() => {
        window.location.href = appSchemeUrl;
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [code, appSchemeUrl]);

  return (
    <div
      style={{
        maxWidth: '680px',
        margin: '60px auto 100px',
        padding: '0 24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '24px',
          padding: '40px 28px',
          boxShadow: 'var(--shadow-md)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Eyebrow Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: type === 'invite' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(16, 185, 129, 0.15)',
            color: type === 'invite' ? 'var(--primary)' : '#10b981',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '20px',
          }}
        >
          {type === 'invite' ? <UsersRound size={16} /> : <Gift size={16} />}
          <span>{type === 'invite' ? 'Group Expense Invitation' : 'Exclusive Invitation'}</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 14px',
            color: 'var(--text-primary)',
          }}
        >
          {type === 'invite'
            ? "You've been invited to join a Split Group"
            : 'Your friend invited you to Pocket Advisor'}
        </h1>

        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '520px',
            margin: '0 auto 28px',
          }}
        >
          {type === 'invite'
            ? 'Join to split trip, dinner, and roommate expenses with 2-stage greedy debt minimization and instant UPI settlements.'
            : 'Get the 100% private Android expense tracker with on-device SMS parsing, SQLCipher AES-256 encryption, and smart AI insights.'}
        </p>

        {code && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 24px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-glass)',
              borderRadius: '16px',
              marginBottom: '32px',
            }}
          >
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {type === 'invite' ? 'GROUP CODE' : 'REFERRAL CODE'}:
            </span>
            <span
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)',
              }}
            >
              {code}
            </span>
            <button
              onClick={handleCopy}
              style={{
                background: 'transparent',
                border: 'none',
                color: copied ? '#10b981' : 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
                transition: 'color 0.2s',
              }}
              title="Copy code"
              aria-label="Copy code"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '380px', margin: '0 auto' }}>
          {type === 'invite' && (
            <a
              href={appSchemeUrl}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px 24px',
                borderRadius: '14px',
                background: 'var(--primary-btn)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
              }}
            >
              <span>Open in Pocket Advisor</span>
              <ExternalLink size={16} />
            </a>
          )}

          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px 24px',
              borderRadius: '14px',
              background: '#000000',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
            }}
          >
            <Download size={18} color="#34d399" />
            <span>Install on Google Play</span>
          </a>

          <Link
            to="/split"
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              marginTop: '8px',
              textDecoration: 'underline',
            }}
          >
            Try the free web bill splitter instead →
          </Link>
        </div>

        <div
          style={{
            marginTop: '36px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} color="#10b981" /> SQLCipher AES-256
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={14} color="#818cf8" /> 100% On-Device
          </span>
          <span>Zero Telemetry</span>
        </div>
      </div>
    </div>
  );
};
