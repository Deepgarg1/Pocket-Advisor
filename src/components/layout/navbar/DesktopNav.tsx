import React from 'react';
import { ToolsDropdown } from './ToolsDropdown';
import { prefetchRoute } from '../../../utils/prefetch';

interface DesktopNavProps {
  currentView: string;
  isToolsDropdownOpen: boolean;
  onOpenTools: () => void;
  onCloseTools: () => void;
  onToggleTools: () => void;
  onNavigate: (view: string, e?: React.MouseEvent) => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  currentView,
  isToolsDropdownOpen,
  onOpenTools,
  onCloseTools,
  onToggleTools,
  onNavigate,
}) => {
  return (
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
        onClick={(e) => onNavigate('home', e)}
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
        onClick={(e) => onNavigate('features', e)}
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
        onClick={(e) => onNavigate('upi-expense-tracker', e)}
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

      {/* Tools Dropdown */}
      <ToolsDropdown
        currentView={currentView}
        isOpen={isToolsDropdownOpen}
        onOpen={onOpenTools}
        onClose={onCloseTools}
        onToggle={onToggleTools}
        onNavigate={onNavigate}
      />

      <a
        href="/news"
        onClick={(e) => onNavigate('news', e)}
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
        Insights
      </a>

      <a
        href="/guides"
        onClick={(e) => onNavigate('guides', e)}
        style={{
          background:
            currentView === 'guides' ||
            currentView.startsWith('how-to') ||
            currentView.includes('mutual-funds') ||
            currentView.includes('best-expense-tracker')
              ? 'var(--primary-surface)'
              : 'transparent',
          color:
            currentView === 'guides' ||
            currentView.startsWith('how-to') ||
            currentView.includes('mutual-funds') ||
            currentView.includes('best-expense-tracker')
              ? 'var(--primary)'
              : 'var(--text-secondary)',
          border: 'none',
          borderRadius: '10px',
          padding: '7px 14px',
          fontSize: '0.92rem',
          fontWeight: 600,
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'var(--transition-smooth)',
        }}
      >
        Guides
      </a>
    </nav>
  );
};
