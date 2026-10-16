import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Calculator,
  CheckCircle2,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WalletCards,
  Zap,
} from 'lucide-react';
import { prefetchRoute } from '../../utils/prefetch';
import './Hero.css';

const PhoneMockup = lazy(() => import('./PhoneMockup').then((m) => ({ default: m.PhoneMockup })));

interface HeroProps {
  onNavigate?: (view: string) => void;
}

const featureCards = [
  {
    icon: ReceiptText,
    title: 'Automatic expense tracking',
    description: 'Organize supported bank and UPI transaction alerts with less manual entry.',
    tone: 'mint',
    view: 'upi-expense-tracker',
  },
  {
    icon: BarChart3,
    title: 'Spending insights',
    description: 'Understand spending patterns with clear analytics and category breakdowns.',
    tone: 'violet',
    view: 'features',
  },
  {
    icon: UsersRound,
    title: 'Split group bills',
    description: 'Settle shared expenses with friends, family, or flatmates in fewer payments.',
    tone: 'cyan',
    view: 'split',
  },
  {
    icon: Calculator,
    title: 'Financial calculators',
    description: 'Explore EMI, SIP, and loan prepayment scenarios before making a decision.',
    tone: 'amber',
    view: 'calculators',
  },
];

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [showDemo, setShowDemo] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = demoRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShowDemo(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShowDemo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '260px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const navigate = (view: string) => {
    if (onNavigate) onNavigate(view);
  };

  const routeLink = (view: string) => ({
    href: view === 'home' ? '/' : `/${view}`,
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      navigate(view);
    },
    onMouseEnter: () => prefetchRoute(view),
    onTouchStart: () => prefetchRoute(view),
  });

  return (
    <div className="pa-home">
      <section className="pa-hero" aria-labelledby="pa-hero-title">
        <div className="pa-hero-grid">
          <div className="pa-hero-copy">
            <div className="pa-eyebrow">
              <span className="pa-eyebrow-icon"><Sparkles size={14} /></span>
              Official Android app <span className="pa-eyebrow-dot">•</span> Built for everyday money
            </div>

            <h1 id="pa-hero-title">
              Know where your <span className="pa-gradient-text">money goes.</span>
              <span className="pa-title-line">Track spending. Split bills.</span>
              <span className="pa-title-line pa-gradient-text">Plan smarter.</span>
            </h1>

            <p className="pa-hero-description">
              Pocket Advisor helps you organize supported bank and UPI transaction alerts,
              understand your spending, and split group bills — all from your Android phone.
              Transaction coverage varies; optional cloud backup is available.
            </p>

            <div className="pa-hero-actions">
              <a
                className="pa-play-button"
                href="https://play.google.com/store/apps/details?id=com.pocketadvisor.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Pocket Advisor on Google Play"
              >
                <svg width="29" height="32" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M3.6 1.8 13.8 12 3.6 22.2c-.3-.3-.6-.8-.6-1.4V3.2c0-.6.3-1.1.6-1.4Z" />
                  <path fill="#34A853" d="m17.3 8.5-3.5 3.5 3.5 3.5 3.9-2.2c1.1-.6 1.1-1.7 0-2.3l-3.9-2.5Z" />
                  <path fill="#FBBC05" d="M3.6 22.2 13.8 12l3.5 3.5L5.8 22.1c-.8.5-1.7.4-2.2.1Z" />
                  <path fill="#EA4335" d="M3.6 1.8 5.8 3l11.5 6.6-3.5 2.4L3.6 1.8Z" />
                </svg>
                <span className="pa-play-label"><small>GET IT ON</small><strong>Google Play</strong></span>
              </a>

              <a className="pa-primary-button" {...routeLink('split')}>
                <Sparkles size={17} /> Try free bill splitter <ArrowRight size={17} />
              </a>
            </div>

            <div className="pa-trust-row" aria-label="Product highlights">
              <span><ShieldCheck size={18} /> Privacy-first design</span>
              <span><LockKeyhole size={17} /> Encrypted local database</span>
              <span><CheckCircle2 size={18} /> Free core features</span>
            </div>

            <div className="pa-hero-links">
              <span>Explore</span>
              <a {...routeLink('features')}>App features <ArrowRight size={13} /></a>
              <a {...routeLink('calculators')}>EMI &amp; SIP tools <ArrowRight size={13} /></a>
              <a {...routeLink('upi-expense-tracker')}>UPI tracker <ArrowRight size={13} /></a>
            </div>
          </div>

          <div className="pa-hero-visual" ref={demoRef}>
            <div className="pa-orbit pa-orbit-one" />
            <div className="pa-orbit pa-orbit-two" />
            <div className="pa-visual-glow" />
            <div className="pa-visual-label"><span className="pa-live-dot" /> Your money, at a glance</div>
            <div className="pa-phone-stage">
              {showDemo ? (
                <Suspense fallback={<div className="pa-phone-loading"><span className="pa-loader" />Preparing app preview…</div>}>
                  <PhoneMockup />
                </Suspense>
              ) : (
                <div className="pa-phone-loading"><span className="pa-loader" />Interactive app preview</div>
              )}
            </div>
            <div className="pa-float-card pa-float-card-top">
              <span className="pa-float-icon pa-float-mint"><WalletCards size={19} /></span>
              <span><small>Money overview</small><strong>Stay in control</strong></span>
              <span className="pa-float-check"><CheckCircle2 size={16} /></span>
            </div>
            <div className="pa-float-card pa-float-card-bottom">
              <span className="pa-float-icon pa-float-violet"><Zap size={18} /></span>
              <span><small>Everyday finance</small><strong>Track • Split • Plan</strong></span>
            </div>
          </div>
        </div>

        <div className="pa-feature-grid" aria-label="Pocket Advisor features">
          {featureCards.map(({ icon: Icon, title, description, tone, view }) => (
            <a key={title} className={`pa-feature-card pa-tone-${tone}`} {...routeLink(view)}>
              <span className="pa-feature-icon"><Icon size={22} strokeWidth={1.8} /></span>
              <span className="pa-feature-copy">
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
              <span className="pa-feature-arrow"><ArrowRight size={17} /></span>
            </a>
          ))}
        </div>

        <div className="pa-below-note">
          <span><ShieldCheck size={15} /> Designed with privacy in mind</span>
          <i />
          <span><Sparkles size={15} /> Practical tools, no clutter</span>
          <i />
          <span><CheckCircle2 size={15} /> Free core features</span>
        </div>
      </section>
    </div>
  );
};
