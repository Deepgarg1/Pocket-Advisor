import React from 'react';
import { ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

interface DownloadSectionProps {
  onNavigate?: (view: string) => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = () => {
  const { theme } = useSettings();
  const isDark = theme === 'dark';

  return (
    <section
      id="download"
      className="cv-auto"
      style={{
        padding: '90px 24px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(30, 27, 75, 0.7) 0%, rgba(15, 23, 42, 0.95) 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)',
          borderRadius: '32px',
          border: isDark
            ? '1.5px solid rgba(99, 102, 241, 0.3)'
            : '1.5px solid rgba(99, 102, 241, 0.25)',
          padding: 'clamp(28px, 5vw, 48px) clamp(16px, 4vw, 36px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          alignItems: 'center',
          boxShadow: isDark
            ? '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.15)'
            : '0 20px 50px rgba(99, 102, 241, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.25s ease',
        }}
      >
        {/* Left Col: Download Links & Badges */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img
                src="/logo.png"
                alt="Pocket Advisor Logo"
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
                style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'contain' }}
              />
            </picture>
            <div>
              <h2
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: isDark ? '#f8fafc' : '#0f172a',
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                Get Pocket Advisor for Android
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <div style={{ display: 'flex', color: '#f59e0b' }}>
                  {'★'.repeat(5)}
                </div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: isDark ? '#94a3b8' : '#475569',
                    fontWeight: 600,
                  }}
                >
                  4.9 / 5 Rating • Verified Android App
                </span>
              </div>
            </div>
          </div>

          <p
            style={{
              color: isDark ? '#cbd5e1' : '#334155',
              fontSize: '1rem',
              lineHeight: 1.6,
              marginBottom: '28px',
            }}
          >
            Take control of your personal spending, automate bill splitting with friends, and unlock AI spending insights. Ready for immediate install on Android devices.
          </p>

          {/* Download buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {/* Google Play Store Badge Button (Temporarily commented out) */}
            {/* <a
              href="https://play.google.com/store/apps/details?id=com.pocketadvisor.app"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 20px',
                backgroundColor: '#000000',
                color: '#ffffff',
                borderRadius: '14px',
                textDecoration: 'none',
                border: '1.5px solid #334155',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#6366f1')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#334155')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M3.6 1.8L13.8 12L3.6 22.2c-.3-.3-.6-.8-.6-1.4V3.2c0-.6.3-1.1.6-1.4z"
                />
                <path
                  fill="#34A853"
                  d="M17.3 8.5L13.8 12l3.5 3.5 3.9-2.2c1.1-.6 1.1-1.7 0-2.3l-3.9-2.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.6 22.2L13.8 12 17.3 15.5 5.8 22.1c-.8.5-1.7.4-2.2.1z"
                />
                <path
                  fill="#EA4335"
                  d="M3.6 1.8L5.8 3l11.5 6.6L13.8 12 3.6 1.8z"
                />
              </svg>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.8 }}>GET IT ON</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, lineHeight: 1.1 }}>Google Play</div>
              </div>
            </a> */}
          </div>

          {/* Guarantee Badges */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              fontSize: '0.825rem',
              color: isDark ? '#cbd5e1' : '#334155',
              fontWeight: 500,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#10b981" /> Android 8.0+ Support
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#0284c7" /> SQLCipher 256-bit Encrypted
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="#f59e0b" /> 100% Private Ledger • Ad-Free with Pro
            </span>
          </div>
        </div>

        {/* Right Col: Instant Scan QR Code */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.85)' : '#ffffff',
            borderRadius: '24px',
            padding: '28px',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
            boxShadow: isDark ? 'none' : '0 10px 25px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Authentic High-Res Play Store QR Code */}
          <div
            style={{
              width: '160px',
              height: '160px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              marginBottom: '16px',
            }}
          >
            <img
              src="/playstore-qr.svg"
              alt="Scan to download Pocket Advisor on Google Play"
              width="140"
              height="140"
              style={{ display: 'block', width: '100%', height: '100%', borderRadius: '8px' }}
            />
          </div>

          <div
            style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              color: isDark ? '#f8fafc' : '#0f172a',
              marginBottom: '4px',
            }}
          >
            Scan with Android Camera
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: isDark ? '#94a3b8' : '#64748b',
            }}
          >
            Instant Google Play store install
          </div>
        </div>
      </div>
    </section>
  );
};
