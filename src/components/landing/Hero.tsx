import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { prefetchRoute } from '../../utils/prefetch';

const PhoneMockup = lazy(() => import('./PhoneMockup').then((m) => ({ default: m.PhoneMockup })));

interface HeroProps {
  onNavigate?: (view: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [showDemo, setShowDemo] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!demoRef.current) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShowDemo(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowDemo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(demoRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      style={{
        padding: '50px 24px 70px',
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Background ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '650px',
          height: '420px',
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      {/* Official App Logo */}
      <div
        style={{
          width: '84px',
          height: '84px',
          marginBottom: '20px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: '26px',
            background: 'linear-gradient(135deg, #00d2ff 0%, #00f5a0 50%, #6366f1 100%)',
            filter: 'blur(16px)',
            opacity: 0.5,
          }}
        />
        <picture>
          <source srcSet="/logo.webp" type="image/webp" />
          <img
            src="/logo.png"
            alt="Pocket Advisor Logo"
            width="84"
            height="84"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{
              position: 'relative',
              width: '84px',
              height: '84px',
              borderRadius: '22px',
              objectFit: 'contain',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
            }}
          />
        </picture>
      </div>

      {/* Pill Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--primary-surface)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          color: 'var(--primary)',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '20px',
        }}
      >
        <Sparkles size={15} />
        <span>Official Android App • AI Spending Intelligence</span>
      </div>

      {/* Primary Headline */}
      <h1
        style={{
          fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: '18px',
          color: 'var(--text-primary)',
        }}
      >
        Pocket Advisor: Spending & Monthly Budget App for{' '}
        <span
          style={{
            background: 'linear-gradient(135deg, #00d2ff 0%, #00f5a0 50%, #6366f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Android
        </span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: '1.12rem',
          color: 'var(--text-secondary)',
          maxWidth: '720px',
          lineHeight: 1.6,
          marginBottom: '28px',
        }}
      >
        Effortless expense logging with automatic bank & UPI SMS transaction detection (HDFC, SBI, ICICI, Axis & all bank SMS), mathematical 2-stage group debt minimization, home screen widgets, and AI-powered spending insights.
      </p>

      {/* Download CTAs */}
      <div
        className="hero-cta-group"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          flexWrap: 'wrap',
          marginBottom: '24px',
        }}
      >
        {/* Google Play Button (Temporarily commented out) */}
        {/* <a
          href="https://play.google.com/store/apps/details?id=com.pocketadvisor.app"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 22px',
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: '16px',
            textDecoration: 'none',
            border: '1.5px solid #334155',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
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

        {/* Interactive Web Tools Quick Anchor */}
        <a
          href="/split"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('split');
          }}
          onMouseEnter={() => prefetchRoute('split')}
          onTouchStart={() => prefetchRoute('split')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 22px',
            backgroundColor: 'var(--primary-btn)',
            color: '#ffffff',
            borderRadius: '16px',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
          }}
        >
          <Sparkles size={18} />
          <span>Free Bill Splitter &amp; Calculators</span>
        </a>

        {/* Explore Features Quick Anchor */}
        <a
          href="/features"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('features');
          }}
          onMouseEnter={() => prefetchRoute('features')}
          onTouchStart={() => prefetchRoute('features')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 22px',
            backgroundColor: 'var(--bg-surface-elevated)',
            color: 'var(--text-primary)',
            borderRadius: '16px',
            border: '1px solid var(--border-subtle)',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
          }}
        >
          <span>Explore Offline Security &amp; Features</span>
          <ArrowRight size={16} />
        </a>
      </div>

      {/* Quick Jump Navigation Pills for Mobile / Desktop */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '40px',
        }}
      >
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '4px' }}>Explore Tools:</span>
        <a
          href="/features"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('features');
          }}
          onMouseEnter={() => prefetchRoute('features')}
          onTouchStart={() => prefetchRoute('features')}
          aria-label="Explore Pocket Advisor App Features & Security"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '5px 12px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            textDecoration: 'none',
          }}
        >
          ⚡ App Features &amp; Privacy
        </a>
        <a
          href="/split"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('split');
          }}
          onMouseEnter={() => prefetchRoute('split')}
          onTouchStart={() => prefetchRoute('split')}
          aria-label="Split Group Bills and Minimize Debts"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '5px 12px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            textDecoration: 'none',
          }}
        >
          👥 Free Bill Splitter
        </a>
        <a
          href="/calculators"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('calculators');
          }}
          onMouseEnter={() => prefetchRoute('calculators')}
          onTouchStart={() => prefetchRoute('calculators')}
          aria-label="Calculate Home Loan Prepayment, EMI, and SIP Returns"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '5px 12px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            textDecoration: 'none',
          }}
        >
          🧮 Financial Calculators
        </a>
        <a
          href="/faq"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('faq');
          }}
          onMouseEnter={() => prefetchRoute('faq')}
          onTouchStart={() => prefetchRoute('faq')}
          aria-label="Frequently Asked Questions about Pocket Advisor"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '5px 12px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            textDecoration: 'none',
          }}
        >
          ❓ Expense Tracker FAQ
        </a>
      </div>

      {/* Feature metric pills */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '60px',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Star size={16} color="#f59e0b" fill="#f59e0b" /> 4.9 ★ Rating on Google Play
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={16} color="#38bdf8" /> SQLCipher 256-Bit Encrypted
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={16} color="#10b981" /> Free Forever Core Features
        </span>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE ANDROID PHONE SHOWCASE */}
      {/* ========================================================================= */}
      <div id="demo-section" ref={demoRef} style={{ width: '100%', scrollMarginTop: '90px', textAlign: 'left' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
            Interactive App Experience
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
            Tap the tabs below to test drive the core screens of Pocket Advisor on an Android phone:
          </p>
        </div>

        {showDemo ? (
          <Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  maxWidth: '380px',
                  height: '680px',
                  margin: '0 auto',
                  borderRadius: '44px',
                  border: '10px solid #1e293b',
                  background: 'linear-gradient(180deg, #0b1120 0%, #0f172a 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  color: 'var(--text-muted)',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '3px solid rgba(99, 102, 241, 0.2)',
                    borderTopColor: 'var(--primary)',
                    animation: 'spin 1s linear infinite',
                  }}
                />
                <span style={{ fontSize: '0.88rem' }}>Loading Android interactive demo...</span>
              </div>
            }
          >
            <PhoneMockup />
          </Suspense>
        ) : (
          <div
            style={{
              width: '100%',
              maxWidth: '380px',
              height: '680px',
              margin: '0 auto',
              borderRadius: '44px',
              border: '10px solid #1e293b',
              background: 'linear-gradient(180deg, #0b1120 0%, #0f172a 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              color: 'var(--text-muted)',
            }}
          >
            <span style={{ fontSize: '0.88rem' }}>Scroll to test drive Android demo...</span>
          </div>
        )}
      </div>
    </section>
  );
};
