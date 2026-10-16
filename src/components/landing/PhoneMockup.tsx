import React, { useState, useEffect } from 'react';

type TabKey = 'dashboard' | 'history' | 'analytics' | 'splits' | 'planner' | 'tools';

interface MockupScreen {
  key: TabKey;
  label: string;
  icon: string;
  image: string;
  alt: string;
  badge: string;
}

const SCREENS: MockupScreen[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    image: '/assets/mockup/phone-dashboard.webp',
    alt: 'Pocket Advisor Android Dashboard: Total Balance, Category Alerts, and Recent Transactions',
    badge: 'Live Spending Pace',
  },
  {
    key: 'history',
    label: 'History',
    icon: '📝',
    image: '/assets/mockup/phone-history.webp',
    alt: 'Pocket Advisor Android History: Real-time Bank and UPI SMS Expense Log',
    badge: 'Auto SMS Ledger',
  },
  {
    key: 'analytics',
    label: 'Analytics',
    icon: '📈',
    image: '/assets/mockup/phone-analytics.webp',
    alt: 'Pocket Advisor Android Analytics: AI Spending Anomalies and Monthly Trends',
    badge: 'AI Budget Advisor',
  },
  {
    key: 'splits',
    label: 'Splits',
    icon: '👥',
    image: '/assets/mockup/phone-splits.webp',
    alt: 'Pocket Advisor Android Splits: Roommates Group Expense and Debt Minimizer',
    badge: 'Greedy Debt Splitter',
  },
  {
    key: 'planner',
    label: 'Planner',
    icon: '🎯',
    image: '/assets/mockup/phone-planner.webp',
    alt: 'Pocket Advisor 50/30/20 Monthly Budget Planner and Safe Daily Spend Limit',
    badge: '50/30/20 Forecast',
  },
  {
    key: 'tools',
    label: 'Tools',
    icon: '🧰',
    image: '/assets/mockup/phone-tools.webp',
    alt: 'Pocket Advisor Financial Utilities: EMI, SIP, and Debt Splitters',
    badge: '6-in-1 Calculators',
  },
];

export const PhoneMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Preload all 5 high-res WebP screens on mount for instantaneous switching
  useEffect(() => {
    SCREENS.forEach((screen) => {
      const img = new Image();
      img.src = screen.image;
    });
  }, []);

  const handleTabChange = (key: TabKey) => {
    if (key === activeTab) return;
    setIsTransitioning(true);
    setActiveTab(key);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 180);
  };

  const currentScreen = SCREENS.find((s) => s.key === activeTab) || SCREENS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', textAlign: 'left' }}>
      {/* Screen Selector Tabs (Outside Phone) */}
      <div
        className="screen-selector-tabs"
        role="tablist"
        aria-label="App screen previews"
        style={{
          display: 'inline-flex',
          gap: '2px',
          padding: '4px 6px',
          borderRadius: '9999px',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          marginBottom: '16px',
          maxWidth: '100%',
          boxSizing: 'border-box',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          zIndex: 5,
        }}
      >
        {SCREENS.map((screen) => {
          const isActive = screen.key === activeTab;
          return (
            <button
              key={screen.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabChange(screen.key)}
              title={screen.label}
              style={{
                flex: '0 0 auto',
                padding: '5px 8px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: isActive ? '#5CF3B6' : 'transparent',
                color: isActive ? '#003822' : undefined,
                fontWeight: isActive ? 750 : 550,
                fontSize: '0.69rem',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 2px 10px rgba(92, 243, 182, 0.4)' : 'none',
              }}
            >
              <span style={{ fontSize: '0.74rem', lineHeight: 1 }}>{screen.icon}</span>
              <span>{screen.label}</span>
            </button>
          );
        })}
      </div>

      {/* Modern 3D Floating Phone Display */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '315px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
        }}
      >
        <img
          src={currentScreen.image}
          alt={currentScreen.alt}
          width={576}
          height={1024}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          style={{
            width: '100%',
            maxWidth: '310px',
            height: 'auto',
            display: 'block',
            filter: 'drop-shadow(0 25px 45px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 35px rgba(56, 189, 248, 0.18))',
            opacity: isTransitioning ? 0.7 : 1,
            transform: isTransitioning ? 'scale(0.985)' : 'scale(1)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};
