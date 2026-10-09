import React, { useState, useRef, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import {
  Sun,
  Moon,
  Menu,
  X,
  Download,
  ChevronDown,
  Users,
  Calculator,
  Scale,
  TrendingUp,
  Home,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { prefetchRoute } from '../../utils/prefetch';

interface NavbarProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView = 'home', onNavigate }) => {
  const { theme, toggleTheme } = useSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(true);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isSplitActive = currentView === 'split' || currentView === 'flatmates-rent-splitter';
  const isCalculatorsActive = currentView === 'calculators' || currentView === 'emi-calculator' || currentView === 'sip-calculator' || currentView === 'home-loan-prepayment-vs-sip';
  const isToolsActive = isSplitActive || isCalculatorsActive;

  const handleMouseEnterTools = () => {
    prefetchRoute('split');
    prefetchRoute('calculators');
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsToolsDropdownOpen(true);
  };

  const handleMouseLeaveTools = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsToolsDropdownOpen(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleNav = (view: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (onNavigate) {
      onNavigate(view);
    }
    setIsMobileMenuOpen(false);
    setIsToolsDropdownOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--bg-surface-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'var(--transition-smooth)',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 24px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => handleNav('home', e)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none',
            flexShrink: 0,
            textDecoration: 'none',
          }}
          aria-label="Pocket Advisor Homepage"
        >
          <picture>
            <source srcSet="/logo.webp" type="image/webp" />
            <img
              src="/logo.png"
              alt="Pocket Advisor Logo"
              width="36"
              height="36"
              decoding="async"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                objectFit: 'contain',
                boxShadow: '0 4px 16px rgba(0, 200, 255, 0.25)',
                flexShrink: 0,
              }}
            />
          </picture>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', marginTop: '2px' }}>
            <span
              className="text-gradient-brand"
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              Pocket Advisor
            </span>
            <span
              className="nav-android-badge"
              style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '3px 8px',
                borderRadius: '6px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                textTransform: 'uppercase',
                verticalAlign: 'middle',
                lineHeight: 1,
              }}
            >
              Android
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '8px',
          }}
          className="desktop-nav"
        >
          <a
            href="/"
            onClick={(e) => handleNav('home', e)}
            style={{
              background: currentView === 'home' ? 'var(--primary-surface)' : 'transparent',
              color: currentView === 'home' ? 'var(--primary)' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '10px',
              padding: '7px 14px',
              fontSize: '0.92rem',
              fontWeight: currentView === 'home' ? 700 : 600,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'var(--transition-smooth)',
            }}
          >
            Overview
          </a>
          <a
            href="/features"
            onClick={(e) => handleNav('features', e)}
            onMouseEnter={() => prefetchRoute('features')}
            style={{
              background: currentView === 'features' ? 'var(--primary-surface)' : 'transparent',
              color: currentView === 'features' ? 'var(--primary)' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '10px',
              padding: '7px 14px',
              fontSize: '0.92rem',
              fontWeight: currentView === 'features' ? 700 : 600,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'var(--transition-smooth)',
            }}
          >
            Features
          </a>
          <a
            href="/upi-expense-tracker"
            onClick={(e) => handleNav('upi-expense-tracker', e)}
            onMouseEnter={() => prefetchRoute('upi-expense-tracker')}
            style={{
              background: currentView === 'upi-expense-tracker' ? 'var(--primary-surface)' : 'transparent',
              color: currentView === 'upi-expense-tracker' ? 'var(--primary)' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '10px',
              padding: '7px 14px',
              fontSize: '0.92rem',
              fontWeight: currentView === 'upi-expense-tracker' ? 700 : 600,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'var(--transition-smooth)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>UPI Tracker</span>
            <span
              style={{
                fontSize: '0.62rem',
                fontWeight: 800,
                padding: '2px 5px',
                borderRadius: '5px',
                background: 'rgba(249, 115, 22, 0.15)',
                color: '#f97316',
                lineHeight: 1,
              }}
            >
              India
            </span>
          </a>
              {/* Tools Button with Hover Dropdown */}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={handleMouseEnterTools}
                onMouseLeave={handleMouseLeaveTools}
              >
                <button
                  onClick={() => setIsToolsDropdownOpen((prev) => !prev)}
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
                  aria-expanded={isToolsDropdownOpen}
                >
                  <span>Tools</span>
                  <ChevronDown
                    size={14}
                    style={{
                      transition: 'transform 0.2s ease',
                      transform: isToolsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                {/* Dropdown Menu */}
                {isToolsDropdownOpen && (
                  <div
                    className="nav-dropdown-menu"
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
                          onClick={(e) => handleNav('split', e)}
                          className="nav-dropdown-item"
                          style={{ textDecoration: 'none' }}
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
                          onClick={(e) => handleNav('flatmates-rent-splitter', e)}
                          className="nav-dropdown-item"
                          style={{ textDecoration: 'none' }}
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
                          onClick={(e) => handleNav('home-loan-prepayment-vs-sip', e)}
                          className="nav-dropdown-item"
                          style={{ textDecoration: 'none' }}
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
                          onClick={(e) => handleNav('emi-calculator', e)}
                          className="nav-dropdown-item"
                          style={{ textDecoration: 'none' }}
                        >
                          <div
                            className="item-icon-box"
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '10px',
                              background: 'rgba(139, 92, 246, 0.12)',
                              color: '#8b5cf6',
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
                              Principal vs interest breakdown &amp; monthly schedules
                            </div>
                          </div>
                        </a>

                        <a
                          href="/sip-calculator"
                          onClick={(e) => handleNav('sip-calculator', e)}
                          className="nav-dropdown-item"
                          style={{ textDecoration: 'none' }}
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
                              Compound returns, annual step-up &amp; inflation
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Bottom All Tools Link */}
                    <a
                      href="/calculators"
                      onClick={(e) => handleNav('calculators', e)}
                      style={{
                        marginTop: '2px',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--primary)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <Sparkles size={13} /> View All Calculators &amp; Tools <ArrowRight size={13} />
                    </a>
                  </div>
                )}
              </div>
              <a
                href="/news"
                onClick={(e) => handleNav('news', e)}
                onMouseEnter={() => prefetchRoute('news')}
                style={{
                  background: currentView === 'news' ? 'var(--primary-surface)' : 'transparent',
                  color: currentView === 'news' ? 'var(--primary)' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '7px 14px',
                  fontSize: '0.92rem',
                  fontWeight: currentView === 'news' ? 700 : 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'var(--transition-smooth)',
                }}
              >
                News
              </a>
              <a
                href="/guides"
                onClick={(e) => handleNav('guides', e)}
                onMouseEnter={() => prefetchRoute('guides')}
                style={{
                  background: currentView === 'guides' || currentView.startsWith('how-to') || currentView.includes('mutual-funds') || currentView.includes('best-expense-tracker') ? 'var(--primary-surface)' : 'transparent',
                  color: currentView === 'guides' || currentView.startsWith('how-to') || currentView.includes('mutual-funds') || currentView.includes('best-expense-tracker') ? 'var(--primary)' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '7px 14px',
                  fontSize: '0.92rem',
                  fontWeight: currentView === 'guides' || currentView.includes('best-expense-tracker') ? 700 : 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'var(--transition-smooth)',
                }}
              >
                Guides
              </a>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface-elevated)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'var(--transition-smooth)',
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Download CTA */}
          <a
            className="nav-cta-btn"
            href="/download"
            onClick={(e) => handleNav('download', e)}
            aria-label="Download Android App"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              backgroundColor: 'var(--primary-btn)',
              color: '#ffffff',
              borderRadius: '12px',
              border: 'none',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
              transition: 'all 0.2s ease',
            }}
          >
            <Download size={16} /> Get App
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              background: 'transparent',
              color: 'var(--text-primary)',
              cursor: 'pointer',
            }}
            className="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            padding: '18px 24px 24px',
            backgroundColor: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <a
            href="/"
            onClick={(e) => handleNav('home', e)}
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
            onClick={(e) => handleNav('features', e)}
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
            App Features &amp; Security
          </a>
          <a
            href="/upi-expense-tracker"
            onClick={(e) => handleNav('upi-expense-tracker', e)}
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
            <span>Automatic UPI Tracker</span>
            <span
              style={{
                fontSize: '0.62rem',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: '5px',
                background: 'rgba(249, 115, 22, 0.15)',
                color: '#f97316',
                lineHeight: 1,
              }}
            >
              India
            </span>
          </a>
          {/* Mobile Tools & Calculators Accordion */}
          <div>
            <button
              onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: isToolsActive ? 'var(--primary)' : 'var(--text-primary)',
                textAlign: 'left',
                fontWeight: isToolsActive ? 700 : 600,
                fontSize: '1rem',
                padding: '8px 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <span>Tools &amp; Calculators</span>
              <ChevronDown
                size={16}
                style={{
                  transform: isMobileToolsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>
            {isMobileToolsOpen && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  paddingLeft: '12px',
                  marginTop: '4px',
                  marginBottom: '6px',
                  borderLeft: '2px solid rgba(99, 102, 241, 0.3)',
                }}
              >
                <a
                  href="/split"
                  onClick={(e) => handleNav('split', e)}
                  style={{
                    background: currentView === 'split' ? 'var(--primary-surface)' : 'none',
                    color: currentView === 'split' ? 'var(--primary)' : 'var(--text-secondary)',
                    textAlign: 'left',
                    fontWeight: currentView === 'split' ? 700 : 500,
                    fontSize: '0.9rem',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
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
                  onClick={(e) => handleNav('flatmates-rent-splitter', e)}
                  style={{
                    background: currentView === 'flatmates-rent-splitter' ? 'var(--primary-surface)' : 'none',
                    color: currentView === 'flatmates-rent-splitter' ? 'var(--primary)' : 'var(--text-secondary)',
                    textAlign: 'left',
                    fontWeight: currentView === 'flatmates-rent-splitter' ? 700 : 500,
                    fontSize: '0.9rem',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
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
                  onClick={(e) => handleNav('home-loan-prepayment-vs-sip', e)}
                  style={{
                    background: currentView === 'home-loan-prepayment-vs-sip' ? 'var(--primary-surface)' : 'none',
                    color: currentView === 'home-loan-prepayment-vs-sip' ? 'var(--primary)' : 'var(--text-secondary)',
                    textAlign: 'left',
                    fontWeight: currentView === 'home-loan-prepayment-vs-sip' ? 700 : 500,
                    fontSize: '0.9rem',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
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
                  onClick={(e) => handleNav('emi-calculator', e)}
                  style={{
                    background: currentView === 'emi-calculator' ? 'var(--primary-surface)' : 'none',
                    color: currentView === 'emi-calculator' ? 'var(--primary)' : 'var(--text-secondary)',
                    textAlign: 'left',
                    fontWeight: currentView === 'emi-calculator' ? 700 : 500,
                    fontSize: '0.9rem',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                  }}
                >
                  <Calculator size={15} color="#8b5cf6" /> Loan EMI Calculator
                </a>
                <a
                  href="/sip-calculator"
                  onClick={(e) => handleNav('sip-calculator', e)}
                  style={{
                    background: currentView === 'sip-calculator' ? 'var(--primary-surface)' : 'none',
                    color: currentView === 'sip-calculator' ? 'var(--primary)' : 'var(--text-secondary)',
                    textAlign: 'left',
                    fontWeight: currentView === 'sip-calculator' ? 700 : 500,
                    fontSize: '0.9rem',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                  }}
                >
                  <TrendingUp size={15} color="#10b981" /> SIP Wealth Planner
                </a>
                <a
                  href="/calculators"
                  onClick={(e) => handleNav('calculators', e)}
                  style={{
                    background: currentView === 'calculators' ? 'var(--primary-surface)' : 'none',
                    color: currentView === 'calculators' ? 'var(--primary)' : 'var(--text-muted)',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
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
            onClick={(e) => handleNav('news', e)}
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
            News &amp; Spending Tips
          </a>

          <a
            href="/guides"
            onClick={(e) => handleNav('guides', e)}
            style={{
              color: currentView === 'guides' || currentView.startsWith('how-to') || currentView.includes('mutual-funds') || currentView.includes('best-expense-tracker') ? 'var(--primary)' : 'var(--text-primary)',
              textAlign: 'left',
              fontWeight: currentView === 'guides' || currentView.includes('best-expense-tracker') ? 700 : 600,
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
            href="/download"
            onClick={(e) => handleNav('download', e)}
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
      )}
    </header>
  );
};
