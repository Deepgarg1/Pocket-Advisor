import React, { useRef, useEffect } from 'react';
import {
  ChevronDown,
  Users,
  Home,
  Calculator,
  Scale,
  TrendingUp,
  Wallet,
  ArrowRight,
} from 'lucide-react';
import { prefetchRoute } from '../../../utils/prefetch';

interface ToolsDropdownProps {
  currentView: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onNavigate: (view: string, e?: React.MouseEvent) => void;
}

export const ToolsDropdown: React.FC<ToolsDropdownProps> = ({
  currentView,
  isOpen,
  onOpen,
  onClose,
  onToggle,
  onNavigate,
}) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isSplitActive = currentView === 'split' || currentView === 'flatmates-rent-splitter';
  const isCalculatorsActive =
    currentView === 'calculators' ||
    currentView === 'emi-calculator' ||
    currentView === 'sip-calculator' ||
    currentView === 'home-loan-prepayment-vs-sip';
  const isToolsActive = isSplitActive || isCalculatorsActive || currentView === 'monthly-budget-planner';

  const handleMouseEnter = () => {
    prefetchRoute('split');
    prefetchRoute('calculators');
    prefetchRoute('monthly-budget-planner');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    onOpen();
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      onClose();
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Keyboard accessibility: Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={onToggle}
        style={{
          background: isToolsActive ? 'var(--primary-surface)' : 'transparent',
          color: isToolsActive ? 'var(--primary)' : 'var(--text-secondary)',
          border: 'none',
          borderRadius: '10px',
          padding: '7px 14px',
          fontSize: '0.92rem',
          fontWeight: isToolsActive ? 700 : 600,
          cursor: 'pointer',
          transition: 'var(--transition-smooth)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
        }}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>Tools</span>
        <ChevronDown
          size={14}
          style={{
            transition: 'transform 0.2s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {isOpen && (
        <div
          className="nav-dropdown-menu"
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '420px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: '18px',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 20px 48px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08)',
            padding: '16px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Bill Splitting Category */}
          <div>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--text-muted)',
                padding: '0 8px 6px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Users size={13} color="var(--primary)" />
              <span>Bill Splitting</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <a
                href="/split"
                onClick={(e) => onNavigate('split', e)}
                className="nav-dropdown-item"
                style={{ textDecoration: 'none' }}
                role="menuitem"
              >
                <div
                  className="item-icon-box"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(99, 102, 241, 0.12)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <Users size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="item-title" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Quick Bill Splitter
                    </span>
                    <span style={{ fontSize: '0.62rem', fontWeight: 800, padding: '2px 6px', borderRadius: '6px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)' }}>
                      1-Tap UPI
                    </span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Group expenses with instant WhatsApp &amp; UPI links
                  </div>
                </div>
              </a>

              <a
                href="/flatmates-rent-splitter"
                onClick={(e) => onNavigate('flatmates-rent-splitter', e)}
                className="nav-dropdown-item"
                style={{ textDecoration: 'none' }}
                role="menuitem"
              >
                <div
                  className="item-icon-box"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.12)',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <Home size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <span className="item-title" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Flatmates Rent Splitter
                  </span>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Split apartment rent, electricity &amp; maid bills
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '0 4px' }} />

          {/* Spending Calculators Category */}
          <div>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--text-muted)',
                padding: '0 8px 6px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Calculator size={13} color="var(--primary)" />
              <span>Spending Calculators</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <a
                href="/home-loan-prepayment-vs-sip"
                onClick={(e) => onNavigate('home-loan-prepayment-vs-sip', e)}
                className="nav-dropdown-item"
                style={{ textDecoration: 'none' }}
                role="menuitem"
              >
                <div
                  className="item-icon-box"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(245, 158, 11, 0.12)',
                    color: '#f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <Scale size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="item-title" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Prepay Loan vs SIP
                    </span>
                    <span style={{ fontSize: '0.62rem', fontWeight: 800, padding: '2px 6px', borderRadius: '6px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                      Popular
                    </span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Compare loan prepayment vs investing surplus in SIP
                  </div>
                </div>
              </a>

              <a
                href="/emi-calculator"
                onClick={(e) => onNavigate('emi-calculator', e)}
                className="nav-dropdown-item"
                style={{ textDecoration: 'none' }}
                role="menuitem"
              >
                <div
                  className="item-icon-box"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(56, 189, 248, 0.12)',
                    color: '#38bdf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <Calculator size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <span className="item-title" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Loan EMI Calculator
                  </span>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Home, car &amp; personal loan reducing-balance schedules
                  </div>
                </div>
              </a>

              <a
                href="/sip-calculator"
                onClick={(e) => onNavigate('sip-calculator', e)}
                className="nav-dropdown-item"
                style={{ textDecoration: 'none' }}
                role="menuitem"
              >
                <div
                  className="item-icon-box"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.12)',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <TrendingUp size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <span className="item-title" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    SIP Wealth Planner
                  </span>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Project mutual fund returns with yearly step-ups
                  </div>
                </div>
              </a>

              <a
                href="/monthly-budget-planner"
                onClick={(e) => onNavigate('monthly-budget-planner', e)}
                className="nav-dropdown-item"
                style={{ textDecoration: 'none' }}
                role="menuitem"
              >
                <div
                  className="item-icon-box"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(56, 189, 248, 0.12)',
                    color: '#38bdf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <Wallet size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <span className="item-title" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Monthly Budget Planner
                  </span>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    50/30/20 spending framework with CSV export
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '0 4px' }} />

          {/* Footer link in dropdown */}
          <a
            href="/calculators"
            onClick={(e) => onNavigate('calculators', e)}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              background: 'var(--primary-surface)',
              color: 'var(--primary)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'var(--transition-smooth)',
            }}
            role="menuitem"
          >
            <span>Browse All Calculators &amp; Interactive Tools</span>
            <ArrowRight size={14} />
          </a>
        </div>
      )}
    </div>
  );
};
