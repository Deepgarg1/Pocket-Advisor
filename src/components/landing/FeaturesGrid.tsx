import React, { useState } from 'react';
import { Card } from '../common/Card';
import {
  Sparkles,
  Users,
  Smartphone,
  MessageSquareText,
  ShoppingBag,
  ShieldCheck,
  Zap,
  Calculator,
  TrendingUp,
  FileText,
  Lock,
  ArrowRight,
  CheckCircle2,
  Check,
} from 'lucide-react';

interface FeaturesGridProps {
  onNavigate?: (view: string) => void;
}

type FeatureCategory = 'all' | 'automation' | 'split' | 'ai' | 'security';

interface FeatureItem {
  id: string;
  category: 'automation' | 'split' | 'ai' | 'security';
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  previewType: 'notification' | 'split' | 'widget' | 'copilot' | 'shopping' | 'security' | 'sip' | 'export' | 'biometrics';
  actionLabel?: string;
  actionView?: string;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<FeatureCategory>('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all' as FeatureCategory, label: 'All Capabilities' },
    { id: 'automation' as FeatureCategory, label: '⚡ Automation & UPI' },
    { id: 'split' as FeatureCategory, label: '👥 Split & Tools' },
    { id: 'ai' as FeatureCategory, label: '🧠 AI & Calculators' },
    { id: 'security' as FeatureCategory, label: '🛡️ Privacy & Vault' },
  ];

  const features: FeatureItem[] = [
    {
      id: 'upi-detection',
      category: 'automation',
      icon: <MessageSquareText size={24} />,
      iconBg: 'rgba(99, 102, 241, 0.15)',
      iconColor: '#818cf8',
      badge: 'Play Store Financial Exception',
      badgeColor: '#818cf8',
      title: 'Automatic Bank & UPI SMS Tracking',
      description:
        'Intelligently detects real-time transaction SMS alerts from HDFC, SBI, ICICI, Axis, Bandhan, and all major Indian banks. 100% on-device regex parsing under Google Play financial rules, with zero cloud uploads and instant OTP filtering.',
      previewType: 'notification',
    },
    {
      id: 'debt-minimization',
      category: 'split',
      icon: <Users size={24} />,
      iconBg: 'rgba(139, 92, 246, 0.15)',
      iconColor: '#a78bfa',
      badge: 'Graph Optimization Algorithm',
      badgeColor: '#a78bfa',
      title: '2-Stage Debt Minimization',
      description:
        'Split group dining, vacations, and rent bills equally, by exact sum, or by percentage. Bilateral exact-match + greedy reduction cuts tangled debts down to the absolute fewest payments.',
      previewType: 'split',
      actionLabel: 'Split Group Bills & Minimize Debts',
      actionView: 'split',
    },
    {
      id: 'home-widgets',
      category: 'automation',
      icon: <Smartphone size={24} />,
      iconBg: 'rgba(16, 185, 129, 0.15)',
      iconColor: '#34d399',
      badge: 'Glanceable Android UI',
      badgeColor: '#34d399',
      title: '1-Tap Android Home Screen Widgets',
      description:
        'Log recurring expenses or inspect your remaining monthly allowance in under 2 seconds right from your Android home screen without even needing to launch the application.',
      previewType: 'widget',
    },
    {
      id: 'ai-copilot',
      category: 'ai',
      icon: <Sparkles size={24} />,
      iconBg: 'rgba(245, 158, 11, 0.15)',
      iconColor: '#fbbf24',
      badge: 'Gemini Pro Intelligence',
      badgeColor: '#fbbf24',
      title: 'AI Budget Copilot & Diagnostics',
      description:
        'A personalized budget copilot right in your pocket. Analyzes your real spending distributions to highlight sneaky subscription creep, impulse surges, and high-impact savings targets.',
      previewType: 'copilot',
    },
    {
      id: 'shopping-guard',
      category: 'automation',
      icon: <ShoppingBag size={24} />,
      iconBg: 'rgba(236, 72, 153, 0.15)',
      iconColor: '#f472b6',
      badge: 'Real-Time Overrun Warning',
      badgeColor: '#f472b6',
      title: 'Shopping Budget Guard',
      description:
        'Plan upcoming grocery or electronics purchases with live budget overrun warnings. Turn purchased items into ledger expense entries with a single tap once checked off.',
      previewType: 'shopping',
    },
    {
      id: 'sqlcipher-vault',
      category: 'security',
      icon: <ShieldCheck size={24} />,
      iconBg: 'rgba(56, 189, 248, 0.15)',
      iconColor: '#38bdf8',
      badge: 'Military Grade Encryption',
      badgeColor: '#38bdf8',
      title: 'SQLCipher AES-256 On-Device Vault',
      description:
        'Your spending database is protected by military-grade AES-256 SQLCipher encryption. Offline-first architecture guarantees your personal ledger never leaves your private custody.',
      previewType: 'security',
    },
    {
      id: 'sip-simulators',
      category: 'ai',
      icon: <TrendingUp size={24} />,
      iconBg: 'rgba(16, 185, 129, 0.15)',
      iconColor: '#10b981',
      badge: 'Wealth Compounding Engine',
      badgeColor: '#10b981',
      title: 'Step-Up SIP & Loan EMI Simulators',
      description:
        'Model long-term compounding growth with inflation discounting and annual step-up adjustments. Run reducing-balance loan EMI amortization schedules in real time.',
      previewType: 'sip',
      actionLabel: 'Calculate Step-Up SIP Compounding',
      actionView: 'sip-calculator',
    },
    {
      id: 'tax-pdf-exports',
      category: 'split',
      icon: <FileText size={24} />,
      iconBg: 'rgba(99, 102, 241, 0.15)',
      iconColor: '#818cf8',
      badge: 'Audit & CA Ready',
      badgeColor: '#818cf8',
      title: 'Itemized PDF & Excel Statements',
      description:
        'Generate cleanly formatted, tax-ready PDF statements with category analytics charts, and export CSV spreadsheets for your chartered accountant or income tax documentation.',
      previewType: 'export',
    },
    {
      id: 'biometric-lock',
      category: 'security',
      icon: <Lock size={24} />,
      iconBg: 'rgba(239, 68, 68, 0.15)',
      iconColor: '#f87171',
      badge: 'Zero-Tracker Architecture',
      badgeColor: '#f87171',
      title: 'Biometric Lock & Zero Telemetry',
      description:
        'Hardware-backed fingerprint and face authentication shields your money records from prying eyes. Zero third-party ad trackers, zero analytics trackers, and zero telemetry.',
      previewType: 'biometrics',
    },
  ];

  const filteredFeatures =
    activeCategory === 'all'
      ? features
      : features.filter((f) => f.category === activeCategory);

  const renderVisualSnippet = (type: FeatureItem['previewType']) => {
    switch (type) {
      case 'notification':
        return (
          <div
            style={{
              marginTop: '18px',
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.82rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--text-primary)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                Bank SMS • UPI Debit Alert
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Just now</span>
            </div>
            <div style={{ color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>INR 340.00 debited towards Blue Tokai</span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹340.00</span>
            </div>
            <div
              style={{
                marginTop: '4px',
                paddingTop: '6px',
                borderTop: '1px dashed var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#818cf8',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              <span>Auto-Categorized: Dining & Cafes</span>
              <Check size={14} />
            </div>
          </div>
        );

      case 'split':
        return (
          <div
            style={{
              marginTop: '18px',
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.82rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Trip to Goa (5 Friends)</span>
              <span style={{ color: '#a78bfa', fontWeight: 700 }}>50% Debt Reduction</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ flex: 1, padding: '6px 8px', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', textAlign: 'center', fontSize: '0.75rem' }}>
                4 Raw Debts
              </div>
              <ArrowRight size={14} color="var(--text-muted)" />
              <div style={{ flex: 1, padding: '6px 8px', borderRadius: '6px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', textAlign: 'center', fontWeight: 700, fontSize: '0.75rem' }}>
                ✨ 2 Simplified
              </div>
            </div>
          </div>
        );

      case 'widget':
        return (
          <div
            style={{
              marginTop: '18px',
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.82rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>September Allowance</span>
              <span style={{ fontWeight: 700, color: '#34d399' }}>₹24,800 Left</span>
            </div>
            <div style={{ height: '6px', width: '100%', borderRadius: '9999px', backgroundColor: 'rgba(255, 255, 255, 0.1)', overflow: 'hidden', marginBottom: '8px' }}>
              <div style={{ height: '100%', width: '58%', backgroundColor: '#34d399', borderRadius: '9999px' }} />
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ flex: 1, padding: '4px 6px', borderRadius: '6px', backgroundColor: 'var(--bg-surface-elevated)', textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>+ ₹100</span>
              <span style={{ flex: 1, padding: '4px 6px', borderRadius: '6px', backgroundColor: 'var(--bg-surface-elevated)', textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>+ ₹500</span>
              <span style={{ flex: 1, padding: '4px 6px', borderRadius: '6px', backgroundColor: 'rgba(99, 102, 241, 0.2)', textAlign: 'center', fontSize: '0.72rem', color: '#818cf8', fontWeight: 600 }}>Quick Log</span>
            </div>
          </div>
        );

      case 'copilot':
        return (
          <div
            style={{
              marginTop: '18px',
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fbbf24', fontWeight: 700, marginBottom: '4px', fontSize: '0.76rem' }}>
              <Sparkles size={13} />
              <span>Smart Spending Insight</span>
            </div>
            <span>Dining is 24% higher than last month. Setting a ₹3,000 weekend cap keeps your ₹10k SIP investment on track.</span>
          </div>
        );

      case 'shopping':
        return (
          <div
            style={{
              marginTop: '18px',
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.82rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Weekly Groceries</span>
              <span style={{ color: '#f472b6', fontWeight: 700, fontSize: '0.75rem' }}>₹2,850 / ₹3,500</span>
            </div>
            <div style={{ height: '6px', width: '100%', borderRadius: '9999px', backgroundColor: 'rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '81%', backgroundColor: '#ec4899', borderRadius: '9999px' }} />
            </div>
            <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              <span>✓ 6 items checked</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>Safe Budget</span>
            </div>
          </div>
        );

      case 'security':
        return (
          <div
            style={{
              marginTop: '18px',
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              fontSize: '0.78rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 600 }}>
              <CheckCircle2 size={14} />
              <span>AES-256 SQLCipher Database Encryption</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 600 }}>
              <CheckCircle2 size={14} />
              <span>100% On-Device • Zero Cloud Tracking</span>
            </div>
          </div>
        );

      case 'sip':
        return (
          <div
            style={{
              marginTop: '18px',
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.82rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>₹10,000/mo @ 12% for 15 yrs</span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>₹50.45 Lakhs</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', fontSize: '0.72rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Invested: ₹18L</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ color: '#34d399', fontWeight: 600 }}>Gain: ₹32.45L (180%)</span>
            </div>
          </div>
        );

      case 'export':
        return (
          <div
            style={{
              marginTop: '18px',
              display: 'flex',
              gap: '8px',
              fontSize: '0.75rem',
            }}
          >
            <div style={{ flex: 1, padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', textAlign: 'center', color: '#818cf8', fontWeight: 600 }}>
              📄 Tax PDF Report
            </div>
            <div style={{ flex: 1, padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center', color: '#34d399', fontWeight: 600 }}>
              📊 Excel / CSV
            </div>
          </div>
        );

      case 'biometrics':
        return (
          <div
            style={{
              marginTop: '18px',
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              fontSize: '0.78rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171', fontWeight: 600 }}>
              <Lock size={14} />
              <span>Biometric Guard Active</span>
            </div>
            <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '9999px', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', fontWeight: 700 }}>
              Secured
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      id="features"
      className="cv-auto"
      style={{
        padding: '50px 24px 90px',
        position: 'relative',
      }}
    >
      {/* Background ambient radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '750px',
          height: '450px',
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.18) 0%, transparent 70%)',
          filter: 'blur(90px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'var(--primary-surface)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: 'var(--primary)',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={14} />
            <span>Core Architecture &amp; Capabilities</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '14px',
              background: 'linear-gradient(135deg, #ffffff 30%, #cbd5e1 70%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.15,
            }}
          >
            Engineered for Android. Designed for Clarity.
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.08rem',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            From real-time UPI transaction detection to graph-theoretic debt minimization and on-device AES-256 encryption — built for effortless spending control without manual bookkeeping.
          </p>

          {/* Interactive Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '32px',
            }}
          >
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: isSelected
                      ? '1px solid var(--primary)'
                      : '1px solid var(--border-subtle)',
                    backgroundColor: isSelected
                      ? 'var(--primary)'
                      : 'var(--bg-surface-elevated)',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: isSelected
                      ? '0 4px 14px rgba(99, 102, 241, 0.35)'
                      : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Grid: Perfectly balanced 3-column desktop layout (3x3 = 9 cards) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredFeatures.map((item, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <Card
                key={item.id}
                glass
                style={{
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '20px',
                  border: isHovered
                    ? `1px solid ${item.badgeColor}`
                    : '1px solid var(--border-glass)',
                  transform: isHovered ? 'translateY(-4px)' : 'none',
                  boxShadow: isHovered
                    ? `0 12px 28px -8px rgba(0, 0, 0, 0.5), 0 0 20px ${item.iconBg}`
                    : 'var(--shadow-sm)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '18px',
                    }}
                  >
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: item.iconBg,
                        border: `1px solid ${item.badgeColor}33`,
                        color: item.iconColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 4px 12px ${item.iconBg}`,
                      }}
                    >
                      {item.icon}
                    </div>

                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        backgroundColor: item.iconBg,
                        color: item.badgeColor,
                        border: `1px solid ${item.badgeColor}40`,
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      marginBottom: '10px',
                      color: 'var(--text-primary)',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      marginBottom: '8px',
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Visual UI Micro-Snippet */}
                  {renderVisualSnippet(item.previewType)}

                  {/* Optional Interactive Action Anchor */}
                  {item.actionLabel && item.actionView && (
                    <a
                      href={`/${item.actionView}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigate) onNavigate(item.actionView!);
                      }}
                      style={{
                        marginTop: '16px',
                        width: '100%',
                        padding: '8px 12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        background: 'transparent',
                        border: '1px dashed var(--border-subtle)',
                        borderRadius: '10px',
                        color: item.badgeColor,
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textDecoration: 'none',
                        boxSizing: 'border-box',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = item.iconBg;
                        e.currentTarget.style.borderColor = item.badgeColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      }}
                    >
                      <span>{item.actionLabel}</span>
                      <ArrowRight size={13} />
                    </a>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA to Download & App Experience */}
        {onNavigate && (
          <div
            style={{
              marginTop: '56px',
              padding: 'clamp(32px, 5vw, 44px) clamp(24px, 4vw, 40px)',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.14) 0%, rgba(16, 185, 129, 0.08) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                color: 'var(--primary)',
                fontSize: '0.78rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '14px',
              }}
            >
              <Zap size={14} />
              <span>Zero-Setup • Instant Start</span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 800,
                marginBottom: '10px',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Ready to experience effortless expense tracking?
            </h3>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                maxWidth: '620px',
                marginBottom: '26px',
                lineHeight: 1.6,
              }}
            >
              Download Pocket Advisor free on Android. No subscriptions, no mandatory account sign-up, and 100% private on-device storage.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href="/download"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('download');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 28px',
                  backgroundColor: 'var(--primary-btn)',
                  color: '#ffffff',
                  borderRadius: '14px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.98rem',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
              >
                <span>Download Pocket Advisor for Android</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="/calculators"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('calculators');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 22px',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  color: 'var(--text-primary)',
                  borderRadius: '14px',
                  border: '1px solid var(--border-subtle)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
              >
                <Calculator size={16} color="var(--primary)" />
                <span>Calculate Home Loan vs SIP &amp; EMIs</span>
              </a>
            </div>

            {/* Guarantee Trust Badges */}
            <div
              style={{
                display: 'flex',
                gap: '24px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: '28px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={15} color="#10b981" /> 100% Free Forever
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={15} color="#38bdf8" /> SQLCipher Encrypted
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Smartphone size={15} color="#a78bfa" /> Android 8.0+ Ready
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
