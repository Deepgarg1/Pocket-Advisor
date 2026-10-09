import React from 'react';
import { Shield, Lock, Smartphone, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (view: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(view);
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  return (
    <footer
      className="cv-auto"
      style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface)',
        padding: '60px 24px 32px',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Main 5-Column Grid */}
        <div className="footer-main-grid">
          {/* Col 1: Brand & Mission */}
          <div className="footer-brand-col">
            <a
              href="/"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '14px',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              aria-label="Pocket Advisor Home"
            >
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img
                  src="/logo.png"
                  alt="Pocket Advisor"
                  width="34"
                  height="34"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    objectFit: 'contain',
                  }}
                />
              </picture>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Pocket Advisor
              </span>
            </a>
            <p style={{ lineHeight: 1.6, marginBottom: '18px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Minimal, intelligent personal expense and budget tracking, bank &amp; UPI automatic transaction detection, and mathematical 2-stage group bill splitting — natively designed for Android.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#10b981' }}>
                <Shield size={15} />
                <span>SQLCipher On-Device Encryption</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#818cf8' }}>
                <Lock size={15} />
                <span>100% Private Ledger • Zero Cloud Telemetry</span>
              </div>
            </div>
          </div>

          {/* Col 2: Features & Tools */}
          <div>
            <h3 className="footer-col-title">Features &amp; Tools</h3>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="/features"
                  onClick={(e) => handleNavClick('features', e)}
                  className="footer-nav-link"
                >
                  App Features &amp; Security
                </a>
              </li>
              <li>
                <a
                  href="/upi-expense-tracker"
                  onClick={(e) => handleNavClick('upi-expense-tracker', e)}
                  className="footer-nav-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>UPI Expense Tracker</span>
                  <span style={{ fontSize: '0.62rem', fontWeight: 800, padding: '1px 5px', borderRadius: '4px', background: 'rgba(249, 115, 22, 0.15)', color: '#f97316' }}>India</span>
                </a>
              </li>
              <li>
                <a
                  href="/split"
                  onClick={(e) => handleNavClick('split', e)}
                  className="footer-nav-link"
                >
                  Free Bill Splitter &amp; Debt Minimizer
                </a>
              </li>
              <li>
                <a
                  href="/flatmates-rent-splitter"
                  onClick={(e) => handleNavClick('flatmates-rent-splitter', e)}
                  className="footer-nav-link"
                >
                  Flatmates Rent &amp; Room Splitter
                </a>
              </li>
              <li>
                <a
                  href="/home-loan-prepayment-vs-sip"
                  onClick={(e) => handleNavClick('home-loan-prepayment-vs-sip', e)}
                  className="footer-nav-link"
                >
                  Home Loan Prepayment vs. SIP
                </a>
              </li>
              <li>
                <a
                  href="/calculators"
                  onClick={(e) => handleNavClick('calculators', e)}
                  className="footer-nav-link"
                >
                  Loan EMI &amp; SIP Wealth Tools
                </a>
              </li>
              <li>
                <a
                  href="/features"
                  onClick={(e) => handleNavClick('features', e)}
                  className="footer-nav-link"
                >
                  Offline Spending Widgets
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Problem-Solving Guides */}
          <div>
            <h3 className="footer-col-title">Financial Guides</h3>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="/how-to-split-rent-unequal-rooms"
                  onClick={(e) => handleNavClick('how-to-split-rent-unequal-rooms', e)}
                  className="footer-nav-link"
                >
                  Split Rent for Unequal Rooms (50/50)
                </a>
              </li>
              <li>
                <a
                  href="/home-loan-prepayment-vs-mutual-funds"
                  onClick={(e) => handleNavClick('home-loan-prepayment-vs-mutual-funds', e)}
                  className="footer-nav-link"
                >
                  Home Loan Prepayment vs. Mutual Funds
                </a>
              </li>
              <li>
                <a
                  href="/how-to-track-upi-payments-automatically"
                  onClick={(e) => handleNavClick('how-to-track-upi-payments-automatically', e)}
                  className="footer-nav-link"
                >
                  Private On-Device SMS Tracking
                </a>
              </li>
              <li>
                <a
                  href="/best-expense-tracker-apps-india"
                  onClick={(e) => handleNavClick('best-expense-tracker-apps-india', e)}
                  className="footer-nav-link"
                >
                  Best Expense Tracker Apps (2026)
                </a>
              </li>
              <li>
                <a
                  href="/news"
                  onClick={(e) => handleNavClick('news', e)}
                  className="footer-nav-link"
                >
                  Spending Intelligence Blog
                </a>
              </li>
              <li>
                <a
                  href="/guides"
                  onClick={(e) => handleNavClick('guides', e)}
                  className="footer-nav-link"
                  style={{ color: 'var(--primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  All Problem-Solving Guides <ArrowRight size={13} />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Get the App */}
          <div>
            <h3 className="footer-col-title">Get the App</h3>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="/download"
                  onClick={(e) => handleNavClick('download', e)}
                  className="footer-nav-link"
                >
                  Download for Android (APK)
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => handleNavClick('faq', e)}
                  className="footer-nav-link"
                >
                  Frequently Asked Questions (FAQ)
                </a>
              </li>
              <li>
                <a
                  href="/download"
                  onClick={(e) => handleNavClick('download', e)}
                  className="footer-nav-link"
                >
                  Installation Guide &amp; QR Code
                </a>
              </li>
              <li>
                <a
                  href="/download"
                  onClick={(e) => handleNavClick('download', e)}
                  className="footer-nav-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Smartphone size={13} color="var(--primary)" /> Android 8.0+ Compatibility
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Compliance */}
          <div>
            <h3 className="footer-col-title">Legal &amp; Security</h3>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handleNavClick('privacy', e)}
                  className="footer-nav-link"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleNavClick('terms', e)}
                  className="footer-nav-link"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a
                  href="/refund"
                  onClick={(e) => handleNavClick('refund', e)}
                  className="footer-nav-link"
                >
                  Cancellation &amp; Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNavClick('contact', e)}
                  className="footer-nav-link"
                >
                  Contact &amp; Customer Support
                </a>
              </li>
              <li>
                <a
                  href="/delete-account"
                  onClick={(e) => handleNavClick('delete-account', e)}
                  className="footer-nav-link"
                >
                  Account &amp; Data Deletion
                </a>
              </li>
              <li>
                <a
                  href="/how-to-track-upi-payments-automatically"
                  onClick={(e) => handleNavClick('how-to-track-upi-payments-automatically', e)}
                  className="footer-nav-link"
                >
                  Zero-Trust Architecture
                </a>
              </li>
              <li>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Package: <code style={{ color: 'var(--text-secondary)' }}>com.pocketadvisor.app</code>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Security Guarantee */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.85rem',
          }}
        >
          <div style={{ color: 'var(--text-muted)' }}>
            &copy; 2026 Pocket Advisor. Developed by Deepesh Garg. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
            <Lock size={14} color="#818cf8" /> Bank-Grade Security • Offline-First • 100% Private Ledger
          </div>
        </div>
      </div>
    </footer>
  );
};
