import React from 'react';
import { Home, Zap, Users, Calculator, Download } from 'lucide-react';
import { prefetchRoute } from '../../utils/prefetch';

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentView, onNavigate }) => {
  // Navigation tabs definition
  const navTabs = [
    { id: 'home', label: 'Home', href: '/', icon: Home },
    { id: 'split', label: 'Split Bills', href: '/split', icon: Users },
    { id: 'calculators', label: 'Calculators', href: '/calculators', icon: Calculator },
    { id: 'features', label: 'Features', href: '/features', icon: Zap },
    { id: 'download', label: 'Get App', href: '/download', icon: Download, isCta: true },
  ];

  return (
    <nav
      className="mobile-bottom-nav"
      aria-label="Mobile Navigation"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '66px',
        backgroundColor: 'var(--bg-surface-glass)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        zIndex: 1000,
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.25)',
      }}
    >
      {navTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === 'calculators'
          ? (currentView === 'calculators' || currentView === 'emi-calculator' || currentView === 'sip-calculator' || currentView === 'home-loan-prepayment-vs-sip')
          : tab.id === 'split'
          ? (currentView === 'split' || currentView === 'flatmates-rent-splitter')
          : (currentView === tab.id);

        if (tab.isCta) {
          return (
            <a
              key={tab.id}
              href={tab.href}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(tab.id);
              }}
              onMouseEnter={() => prefetchRoute(tab.id)}
              onTouchStart={() => prefetchRoute(tab.id)}
              aria-label={tab.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '14px',
                padding: '7px 14px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.72rem',
                textDecoration: 'none',
                boxShadow: '0 3px 12px rgba(99, 102, 241, 0.45)',
                transition: 'var(--transition-smooth)',
                transform: isActive ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              <Icon size={18} strokeWidth={2.4} />
              <span>{tab.label}</span>
            </a>
          );
        }

        return (
          <a
            key={tab.id}
            href={tab.href}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(tab.id);
            }}
            onMouseEnter={() => prefetchRoute(tab.id)}
            onTouchStart={() => prefetchRoute(tab.id)}
            aria-label={tab.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              background: 'none',
              border: 'none',
              padding: '6px 10px',
              cursor: 'pointer',
              textDecoration: 'none',
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              transition: 'var(--transition-smooth)',
              position: 'relative',
              borderRadius: '10px',
            }}
          >
            {/* Active indicator bar */}
            {isActive && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  width: '18px',
                  height: '3px',
                  borderRadius: '2px',
                  backgroundColor: 'var(--primary)',
                  boxShadow: '0 0 8px var(--primary)',
                }}
              />
            )}
            <Icon
              size={20}
              strokeWidth={isActive ? 2.4 : 1.8}
              style={{
                filter: isActive ? 'drop-shadow(0 0 6px var(--primary-glow))' : 'none',
                transition: 'transform 0.2s ease',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}
            />
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '0.01em',
              }}
            >
              {tab.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
};
