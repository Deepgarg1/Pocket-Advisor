import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WalletCards,
  Zap,
} from 'lucide-react';
import { prefetchRoute } from '../../utils/prefetch';
import { PhoneMockup } from './PhoneMockup';
import './Hero.css';

interface HeroProps {
  onNavigate?: (view: string) => void;
}

const featureCards = [
  { icon: ReceiptText, title: 'Auto UPI & Bank Tracking', description: 'Instant auto-logging from SBI, HDFC, ICICI, Axis & 50+ banks. No manual typing.', tone: 'mint', view: 'upi-expense-tracker' },
  { icon: Sparkles, title: 'Small Spends Intelligence', description: 'Uncover how ₹40 chai and ₹149 Blinkit orders silently drain your monthly salary.', tone: 'amber', view: 'features' },
  { icon: UsersRound, title: 'Group Splits + 1-Tap UPI QR', description: 'Split flatmate rent & trip bills without switching apps. Settle instantly via QR code.', tone: 'cyan', view: 'split' },
  { icon: ShieldCheck, title: '100% Private • Zero Loan Spam', description: 'Zero cloud tracking. Zero telemarketing calls. Data stays strictly on your device.', tone: 'violet', view: 'features' },
];

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {

  const navigate = (view: string) => onNavigate?.(view);
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
              <span className="pa-eyebrow-icon"><ShieldCheck size={14} /></span>
              100% PRIVATE ON-DEVICE TRACKING <span className="pa-eyebrow-dot">•</span> ZERO LOAN SPAM • ZERO DATA HARVESTING
            </div>

            <h1 id="pa-hero-title">
              Know Where Every Rupee Goes.
              <span className="pa-title-line pa-gradient-text">Take Control of Where It Goes Next.</span>
            </h1>
            <p className="pa-hero-subtitle">Automatic Bank &amp; UPI Tracking • Stop Micro-Spend Leaks • 50/30/20 Smart Budgets</p>

            <p className="pa-hero-description">
              Your money doesn't disappear—micro-payments add up. ₹40 for morning tea, ₹120 for an auto ride, ₹149 on Blinkit, and ₹380 on Swiggy. Pocket Advisor automatically detects incoming bank &amp; UPI transaction alerts 100% locally on your phone. No manual typing, no cloud data harvesting, and zero predatory loan calls.
            </p>

            <div className="pa-hero-actions">
              <a className="pa-play-button" href="https://play.google.com/store/apps/details?id=com.pocketadvisor.app"
                target="_blank" rel="noopener noreferrer" aria-label="Get Pocket Advisor on Google Play">
                <svg width="27" height="30" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M3.6 1.8 13.8 12 3.6 22.2c-.3-.3-.6-.8-.6-1.4V3.2c0-.6.3-1.1.6-1.4Z" />
                  <path fill="#34A853" d="m17.3 8.5-3.5 3.5 3.5 3.5 3.9-2.2c1.1-.6 1.1-1.7 0-2.3l-3.9-2.5Z" />
                  <path fill="#FBBC05" d="M3.6 22.2 13.8 12l3.5 3.5L5.8 22.1c-.8.5-1.7.4-2.2.1Z" />
                  <path fill="#EA4335" d="M3.6 1.8 5.8 3l11.5 6.6-3.5 2.4L3.6 1.8Z" />
                </svg>
                <span className="pa-play-label"><small>GET IT ON</small><strong>Google Play</strong></span>
              </a>
              <a className="pa-primary-button" {...routeLink('split')}>
                <UsersRound size={17} /> Try the free bill splitter <ArrowRight size={16} />
              </a>
            </div>

            <div className="pa-trust-row" aria-label="Product highlights">
              <span><ShieldCheck size={17} /> 100% On-Device Privacy</span>
              <span><Zap size={16} /> Zero Loan Calls or Spam</span>
              <span><UsersRound size={16} /> 1-Tap UPI QR Splits</span>
              <span><CheckCircle2 size={17} /> Free Core Tools Forever</span>
            </div>

            <div className="pa-hero-links">
              <span>Explore tools</span>
              <a {...routeLink('features')}>App features <ArrowRight size={13} /></a>
              <a {...routeLink('calculators')}>6-in-1 calculators <ArrowRight size={13} /></a>
              <a {...routeLink('upi-expense-tracker')}>UPI tracker <ArrowRight size={13} /></a>
              <a {...routeLink('monthly-budget-planner')}>50/30/20 planner <ArrowRight size={13} /></a>
              <a {...routeLink('news/diwali-2026-how-to-track-upi-spending')} className="pa-hero-link-festive">🪔 Diwali UPI guide <ArrowRight size={13} /></a>
            </div>
          </div>

          <div className="pa-hero-visual">
            <div className="pa-visual-glow" />
            <div className="pa-visual-label"><span className="pa-live-dot" /> A clearer view of your money</div>
            <div className="pa-phone-stage">
              <PhoneMockup />
            </div>
            <div className="pa-float-card pa-float-card-top">
              <span className="pa-float-icon pa-float-mint"><WalletCards size={18} /></span>
              <span><small>Money overview</small><strong>Stay in control</strong></span>
              <span className="pa-float-check"><CheckCircle2 size={16} /></span>
            </div>
            <div className="pa-float-card pa-float-card-bottom">
              <span className="pa-float-icon pa-float-violet"><Zap size={17} /></span>
              <span><small>Everyday finance</small><strong>Track · Split · Plan</strong></span>
            </div>
          </div>
        </div>

        <div className="pa-feature-grid" aria-label="Pocket Advisor features">
          {featureCards.map(({ icon: Icon, title, description, tone, view }) => (
            <a key={title} className={`pa-feature-card pa-tone-${tone}`} {...routeLink(view)}>
              <span className="pa-feature-icon"><Icon size={21} strokeWidth={1.8} /></span>
              <span className="pa-feature-copy"><strong>{title}</strong><small>{description}</small></span>
              <span className="pa-feature-arrow"><ArrowRight size={16} /></span>
            </a>
          ))}
        </div>
        <div className="pa-below-note">
          <span><ShieldCheck size={15} /> 100% On-device private ledger</span><i />
          <span><Sparkles size={15} /> Smart AI Copilot spending velocity</span><i />
          <span><UsersRound size={15} /> Instant 1-tap bill settlements via UPI QR</span>
        </div>
      </section>
    </div>
  );
};
