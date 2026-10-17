import React from 'react';
import {
  Users,
  Home,
  Scale,
  Calculator,
  TrendingUp,
  Wallet,
  ChevronDown,
  Sun,
  Moon,
} from 'lucide-react';
import { prefetchRoute } from '../../../utils/prefetch';

interface MobileNavDrawerProps {
  isOpen: boolean;
  currentView: string;
  isMobileToolsOpen: boolean;
  theme: string;
  onToggleTools: () => void;
  onToggleTheme: () => void;
  onNavigate: (view: string, e?: React.MouseEvent) => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  currentView,
  isMobileToolsOpen,
  theme,
  onToggleTools,
  onToggleTheme,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '20px 24px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: 'var(--shadow-lg)',
      }}
      className="mobile-nav-panel animate-fade-in"
    >
      <a
        href="/"
        onClick={(e) => onNavigate('home', e)}
        style={{
          color: currentView === 'home' ? 'var(--primary)' : 'var(--text-primary)',
          textAlign: 'left',
          fontWeight: currentView === 'home' ? 700 : 600,
          fontSize: '1rem',
          padding: '8px 0',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'block',
        }}
      >
        Overview
      </a>

      <a
        href="/features"
        onClick={(e) => onNavigate('features', e)}
        onTouchStart={() => prefetchRoute('features')}
        style={{
          color: currentView === 'features' ? 'var(--primary)' : 'var(--text-primary)',
          textAlign: 'left',
          fontWeight: currentView === 'features' ? 700 : 600,
          fontSize: '1rem',
          padding: '8px 0',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'block',
        }}
      >
        Features
      </a>

      <a
        href="/upi-expense-tracker"
        onClick={(e) => onNavigate('upi-expense-tracker', e)}
        onTouchStart={() => prefetchRoute('upi-expense-tracker')}
        style={{
          color: currentView === 'upi-expense-tracker' ? 'var(--primary)' : 'var(--text-primary)',
          textAlign: 'left',
          fontWeight: currentView === 'upi-expense-tracker' ? 700 : 600,
          fontSize: '1rem',
          padding: '8px 0',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span>UPI Tracker</span>
        <span
          style={{
            fontSize: '0.62rem',
            fontWeight: 800,
            padding: '2px 6px',
            borderRadius: '6px',
            background: 'rgba(249, 115, 22, 0.15)',
            color: '#f97316',
          }}
        >
          India
        </span>
      </a>

      {/* Mobile Tools Collapsible */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
        }}
      >
        <button
          onClick={onToggleTools}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
          aria-expanded={isMobileToolsOpen}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calculator size={16} color="var(--primary)" />
            <span>Calculators &amp; Splitter Tools</span>
          </div>
          <ChevronDown
            size={16}
            style={{
              transition: 'transform 0.2s ease',
              transform: isMobileToolsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </button>

        {isMobileToolsOpen && (
          <div
            style={{
              padding: '4px 8px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <a
              href="/split"
              onClick={(e) => onNavigate('split', e)}
              onTouchStart={() => prefetchRoute('split')}
              style={{
                background: currentView === 'split' ? 'var(--primary-surface)' : 'none',
                color: currentView === 'split' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: currentView === 'split' ? 700 : 500,
                fontSize: '0.9rem',
                padding: '8px 10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <Users size={15} color="var(--primary)" /> Quick Bill Splitter
            </a>

            <a
              href="/flatmates-rent-splitter"
              onClick={(e) => onNavigate('flatmates-rent-splitter', e)}
              onTouchStart={() => prefetchRoute('flatmates-rent-splitter')}
              style={{
                background: currentView === 'flatmates-rent-splitter' ? 'var(--primary-surface)' : 'none',
                color: currentView === 'flatmates-rent-splitter' ? '#10b981' : 'var(--text-secondary)',
                fontWeight: currentView === 'flatmates-rent-splitter' ? 700 : 500,
                fontSize: '0.9rem',
                padding: '8px 10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <Home size={15} color="#10b981" /> Flatmates Rent Splitter
            </a>

            <a
              href="/home-loan-prepayment-vs-sip"
              onClick={(e) => onNavigate('home-loan-prepayment-vs-sip', e)}
              onTouchStart={() => prefetchRoute('home-loan-prepayment-vs-sip')}
              style={{
                background: currentView === 'home-loan-prepayment-vs-sip' ? 'var(--primary-surface)' : 'none',
                color: currentView === 'home-loan-prepayment-vs-sip' ? '#f59e0b' : 'var(--text-secondary)',
                fontWeight: currentView === 'home-loan-prepayment-vs-sip' ? 700 : 500,
                fontSize: '0.9rem',
                padding: '8px 10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <Scale size={15} color="#f59e0b" /> Prepay Loan vs SIP
            </a>

            <a
              href="/emi-calculator"
              onClick={(e) => onNavigate('emi-calculator', e)}
              onTouchStart={() => prefetchRoute('emi-calculator')}
              style={{
                background: currentView === 'emi-calculator' ? 'var(--primary-surface)' : 'none',
                color: currentView === 'emi-calculator' ? '#38bdf8' : 'var(--text-secondary)',
                fontWeight: currentView === 'emi-calculator' ? 700 : 500,
                fontSize: '0.9rem',
                padding: '8px 10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <Calculator size={15} color="#38bdf8" /> Loan EMI Calculator
            </a>

            <a
              href="/sip-calculator"
              onClick={(e) => onNavigate('sip-calculator', e)}
              onTouchStart={() => prefetchRoute('sip-calculator')}
              style={{
                background: currentView === 'sip-calculator' ? 'var(--primary-surface)' : 'none',
                color: currentView === 'sip-calculator' ? '#10b981' : 'var(--text-secondary)',
                fontWeight: currentView === 'sip-calculator' ? 700 : 500,
                fontSize: '0.9rem',
                padding: '8px 10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <TrendingUp size={15} color="#10b981" /> SIP Wealth Planner
            </a>

            <a
              href="/monthly-budget-planner"
              onClick={(e) => onNavigate('monthly-budget-planner', e)}
              onTouchStart={() => prefetchRoute('monthly-budget-planner')}
              style={{
                background: currentView === 'monthly-budget-planner' ? 'var(--primary-surface)' : 'none',
                color: currentView === 'monthly-budget-planner' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: currentView === 'monthly-budget-planner' ? 700 : 500,
                fontSize: '0.9rem',
                padding: '8px 10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <Wallet size={15} color="#38bdf8" /> Monthly Budget Planner
            </a>

            <a
              href="/calculators"
              onClick={(e) => onNavigate('calculators', e)}
              style={{
                background: currentView === 'calculators' ? 'var(--primary-surface)' : 'none',
                color: currentView === 'calculators' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.82rem',
                padding: '6px 10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '2px',
                textDecoration: 'none',
              }}
            >
              <span>All Calculators &amp; Tools →</span>
            </a>
          </div>
        )}
      </div>

      <a
        href="/news"
        onClick={(e) => onNavigate('news', e)}
        style={{
          color: currentView === 'news' ? 'var(--primary)' : 'var(--text-primary)',
          textAlign: 'left',
          fontWeight: currentView === 'news' ? 700 : 600,
          fontSize: '1rem',
          padding: '8px 0',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'block',
        }}
      >
        Financial Insights &amp; Articles
      </a>

      <a
        href="/guides"
        onClick={(e) => onNavigate('guides', e)}
        style={{
          color:
            currentView === 'guides' ||
            currentView.startsWith('how-to') ||
            currentView.includes('mutual-funds') ||
            currentView.includes('best-expense-tracker')
              ? 'var(--primary)'
              : 'var(--text-primary)',
          textAlign: 'left',
          fontWeight:
            currentView === 'guides' || currentView.includes('best-expense-tracker') ? 700 : 600,
          fontSize: '1rem',
          padding: '8px 0',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'block',
        }}
      >
        Financial Guides (E-E-A-T)
      </a>

      <a
        href="/faq"
        onClick={(e) => onNavigate('faq', e)}
        onTouchStart={() => prefetchRoute('faq')}
        style={{
          color: currentView === 'faq' ? 'var(--primary)' : 'var(--text-primary)',
          textAlign: 'left',
          fontWeight: currentView === 'faq' ? 700 : 600,
          fontSize: '1rem',
          padding: '8px 0',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'block',
        }}
      >
        Frequently Asked Questions
      </a>

      <a
        href="/contact"
        onClick={(e) => onNavigate('contact', e)}
        onTouchStart={() => prefetchRoute('contact')}
        style={{
          color: currentView === 'contact' ? 'var(--primary)' : 'var(--text-primary)',
          textAlign: 'left',
          fontWeight: currentView === 'contact' ? 700 : 600,
          fontSize: '1rem',
          padding: '8px 0',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'block',
        }}
      >
        Contact &amp; Support
      </a>

      {/* Theme Toggle in Mobile */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Appearance</span>
        <button
          onClick={onToggleTheme}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '7px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-primary)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={15} color="#fbbf24" /> : <Moon size={15} color="#818cf8" />}
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>

      {/* Download App CTA */}
      <a
        href="/download"
        onClick={(e) => onNavigate('download', e)}
        style={{
          padding: '12px',
          backgroundColor: 'var(--primary-btn)',
          color: '#ffffff',
          borderRadius: '12px',
          border: 'none',
          textAlign: 'center',
          fontWeight: 700,
          fontSize: '0.95rem',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'block',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
        }}
      >
        Download Android App
      </a>
    </div>
  );
};
