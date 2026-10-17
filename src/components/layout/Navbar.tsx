import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import {
  Sun,
  Moon,
  MoreVertical,
  X,
  Download,
} from 'lucide-react';
import { DesktopNav } from './navbar/DesktopNav';
import { MobileNavDrawer } from './navbar/MobileNavDrawer';

interface NavbarProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView = 'home', onNavigate }) => {
  const { theme, toggleTheme } = useSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(true);

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
            <source srcSet="/logo-80.webp" type="image/webp" />
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

        {/* Desktop Navigation Links & Tools */}
        <DesktopNav
          currentView={currentView}
          isToolsDropdownOpen={isToolsDropdownOpen}
          onOpenTools={() => setIsToolsDropdownOpen(true)}
          onCloseTools={() => setIsToolsDropdownOpen(false)}
          onToggleTools={() => setIsToolsDropdownOpen((prev) => !prev)}
          onNavigate={handleNav}
        />

        {/* Right Actions: Theme Toggle, Download CTA & Mobile Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'transparent',
              border: 'none',
              borderRadius: '10px',
              padding: '8px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition-smooth)',
            }}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun size={19} color="#fbbf24" />
            ) : (
              <Moon size={19} color="#818cf8" />
            )}
          </button>

          {/* Download CTA (Desktop) */}
          <a
            className="nav-cta-btn"
            href="/download"
            onClick={(e) => handleNav('download', e)}
            aria-label="Download Android App"
            style={{
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
            <Download size={16} />
            <span>Get App</span>
          </a>

          {/* Mobile 3-Dots Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              background: isMobileMenuOpen ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              border: '1px solid',
              borderColor: isMobileMenuOpen ? 'var(--primary)' : 'var(--border-subtle)',
              borderRadius: '10px',
              padding: '8px',
              color: isMobileMenuOpen ? 'var(--primary)' : 'var(--text-primary)',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition-smooth)',
            }}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open pages menu (3 dots)'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <MoreVertical size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        currentView={currentView}
        isMobileToolsOpen={isMobileToolsOpen}
        theme={theme}
        onToggleTools={() => setIsMobileToolsOpen((prev) => !prev)}
        onToggleTheme={toggleTheme}
        onNavigate={handleNav}
      />
    </header>
  );
};
