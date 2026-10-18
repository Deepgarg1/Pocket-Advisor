import React, { useState } from 'react';
import { Card } from '../common/Card';
import { useSettings } from '../../context/SettingsContext';
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
  Bell,
  Clock,
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
  previewType: 'notification' | 'split' | 'widget' | 'copilot' | 'shopping' | 'security' | 'sip' | 'export' | 'biometrics' | 'reminders';
  actionLabel?: string;
  actionView?: string;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onNavigate }) => {
  const { theme } = useSettings();
  const isDark = theme === 'dark';
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
      badge: '790+ Line Regex Engine • 150+ Currencies',
      badgeColor: '#818cf8',
      title: 'Linguistic SMS & UPI Expense Parser',
      description:
        'On-device linguistic engine (SmsParser.kt) parses incoming bank and UPI debit alerts (HDFC, SBI, ICICI, Axis, Bandhan & 150+ global currencies). Strict OTP & spam rejection, merchant isolation (Swiggy, Uber, Amazon, Zomato, Starbucks, Netflix), and zero cloud transmission of raw SMS under Google Play Financial Policy.',
      previewType: 'notification',
    },
    {
      id: 'debt-minimization',
      category: 'split',
      icon: <Users size={24} />,
      iconBg: 'rgba(139, 92, 246, 0.15)',
      iconColor: '#a78bfa',
      badge: 'Bipartite Graph Algorithm • ZXing Engine',
      badgeColor: '#a78bfa',
      title: '2-Stage Greedy Debt Splitter & UPI QR',
      description:
        'Collapse tangled group bills into minimum bilateral payments with bipartite greedy graph reduction. Generate 6-character short code invites, export audit-ready group PDF statements, and initiate 1-tap app-to-app UPI transfers (GPay, PhonePe, Paytm, CRED) or on-screen dynamic ZXing QR codes.',
      previewType: 'split',
      actionLabel: 'Split Group Bills & Minimize Debts',
      actionView: 'split',
    },
    {
      id: 'smart-reminders',
      category: 'automation',
      icon: <Bell size={24} />,
      iconBg: 'rgba(56, 189, 248, 0.15)',
      iconColor: '#38bdf8',
      badge: 'AlarmManager Exact Scheduling',
      badgeColor: '#38bdf8',
      title: 'Smart Bill & Loan EMI Reminders',
      description:
        'Schedule utility bills, subscriptions (Netflix, Spotify), and loan EMIs with exact AlarmManager alarms resilient to Android Doze mode. Incoming SMS alerts auto-reconcile and mark bills paid. Share 1-tap reminders via WhatsApp.',
      previewType: 'reminders',
    },
    {
      id: 'home-widgets',
      category: 'automation',
      icon: <Smartphone size={24} />,
      iconBg: 'rgba(16, 185, 129, 0.15)',
      iconColor: '#34d399',
      badge: '4x2 / 3x2 RemoteViews • Privacy Eye',
      badgeColor: '#34d399',
      title: 'Android Home Screen Widgets & Privacy Eye',
      description:
        'Check monthly burn-rate and remaining budget in under 2 seconds. Tap the privacy eye icon to instantly mask sensitive rupee totals on your launcher screen, or tap "+" to launch instant quick-add transaction activities.',
      previewType: 'widget',
    },
    {
      id: 'ai-copilot',
      category: 'ai',
      icon: <Sparkles size={24} />,
      iconBg: 'rgba(245, 158, 11, 0.15)',
      iconColor: '#fbbf24',
      badge: 'Smart AI Copilot • Anomaly Engine',
      badgeColor: '#fbbf24',
      title: 'Smart AI Advisor & Burn-Rate Engine',
      description:
        'Combines our on-device statistical momentum engine for real-time burn-rate projection and budget overrun alarms with private AI copilot insights for personalized financial coaching, debt reduction, and Markdown breakdowns.',
      previewType: 'copilot',
    },
    {
      id: 'shopping-guard',
      category: 'automation',
      icon: <ShoppingBag size={24} />,
      iconBg: 'rgba(236, 72, 153, 0.15)',
      iconColor: '#f472b6',
      badge: 'Real-Time Estimator • Ledger Convert',
      badgeColor: '#f472b6',
      title: 'Interactive Shopping List & Ledger Convert',
      description:
        'Build grocery or electronics checklists with real-time budget projection. Tapping "Convert to Expense" seamlessly logs checked items into your permanent ledger. Features an interactive home screen widget to check off items without opening the app.',
      previewType: 'shopping',
    },
    {
      id: 'sqlcipher-vault',
      category: 'security',
      icon: <ShieldCheck size={24} />,
      iconBg: 'rgba(56, 189, 248, 0.15)',
      iconColor: '#38bdf8',
      badge: 'Hardware Keystore • FLAG_SECURE',
      badgeColor: '#38bdf8',
      title: 'SQLCipher AES-256 Vault & Keystore',
      description:
        'Your local Room database is protected with SQLCipher AES-256 encryption. Master keys are sealed in the hardware-backed Android Keystore. Includes FLAG_SECURE window protection to block screenshot capture, screen recordings, and app-switcher snapshot leaks.',
      previewType: 'security',
    },
    {
      id: 'sip-simulators',
      category: 'ai',
      icon: <TrendingUp size={24} />,
      iconBg: 'rgba(16, 185, 129, 0.15)',
      iconColor: '#10b981',
      badge: '6-in-1 Financial Mathematics Suite',
      badgeColor: '#10b981',
      title: '6-in-1 Financial Calculators Suite',
      description:
        'Comprehensive interactive mathematics suite: Reducing-balance Loan EMI, Step-Up SIP compounding, Savings Goal Planner, FD / RD simulator with compound frequencies, Compound Interest calculator, and 1-30 Year Inflation purchasing power erosion.',
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
      badge: 'Integer-Cent Math • CA Ready',
      badgeColor: '#818cf8',
      title: 'Itemized Tax PDF Reports & Integer-Cent Math',
      description:
        'Standardizes financial operations with integer-cent precision math (MoneyUtils) to eliminate IEEE 754 floating-point rounding errors. Export formatted, audit-ready PDF statements with category charts and CSV files for tax filing.',
      previewType: 'export',
    },
    {
      id: 'biometric-lock',
      category: 'security',
      icon: <Lock size={24} />,
      iconBg: 'rgba(239, 68, 68, 0.15)',
      iconColor: '#f87171',
      badge: 'BiometricPrompt & RootBeer Scanner',
      badgeColor: '#f87171',
      title: 'Biometric App Lock & Root Detection',
      description:
        'Hardware-backed fingerprint, face unlock, or device PIN/pattern with a 30-second auto-lock inactivity timer. Integrated RootBeer device integrity checks actively warn against compromised or rooted execution environments.',
      previewType: 'biometrics',
    },
  ];

  const filteredFeatures =
    activeCategory === 'all'
      ? features
      : features.filter((f) => f.category === activeCategory);

  const renderVisualSnippet = (type: FeatureItem['previewType']) => {
    const snippetBg = isDark ? 'rgba(15, 23, 42, 0.65)' : 'var(--bg-surface-elevated)';
    const snippetBorder = isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid var(--border-subtle)';
    const progressTrackBg = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';

    switch (type) {
      case 'notification':
        return (
          <div
            style={{
              marginTop: '18px',
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: snippetBg,
              border: snippetBorder,
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
                borderTop: isDark ? '1px dashed rgba(255, 255, 255, 0.1)' : '1px dashed var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: isDark ? '#818cf8' : '#4f46e5',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              <span>Auto-Categorized: Dining &amp; Cafes</span>
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
              backgroundColor: snippetBg,
              border: snippetBorder,
              fontSize: '0.82rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Trip to Goa (5 Friends)</span>
              <span style={{ color: isDark ? '#a78bfa' : '#7c3aed', fontWeight: 700 }}>50% Debt Reduction</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ flex: 1, padding: '6px 8px', borderRadius: '6px', backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)', color: isDark ? '#f87171' : '#dc2626', textAlign: 'center', fontSize: '0.75rem', fontWeight: 600 }}>
                4 Raw Debts
              </div>
              <ArrowRight size={14} color="var(--text-muted)" />
              <div style={{ flex: 1, padding: '6px 8px', borderRadius: '6px', backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.12)', color: isDark ? '#34d399' : '#059669', textAlign: 'center', fontWeight: 700, fontSize: '0.75rem' }}>
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
              backgroundColor: snippetBg,
              border: snippetBorder,
              fontSize: '0.82rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>September Allowance</span>
              <span style={{ fontWeight: 700, color: isDark ? '#34d399' : '#059669' }}>₹24,800 Left</span>
            </div>
            <div style={{ height: '6px', width: '100%', borderRadius: '9999px', backgroundColor: progressTrackBg, overflow: 'hidden', marginBottom: '8px' }}>
              <div style={{ height: '100%', width: '58%', backgroundColor: isDark ? '#34d399' : '#10b981', borderRadius: '9999px' }} />
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ flex: 1, padding: '4px 6px', borderRadius: '6px', backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', border: snippetBorder, textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>+ ₹100</span>
              <span style={{ flex: 1, padding: '4px 6px', borderRadius: '6px', backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', border: snippetBorder, textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>+ ₹500</span>
              <span style={{ flex: 1, padding: '4px 6px', borderRadius: '6px', backgroundColor: 'var(--primary-surface)', textAlign: 'center', fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700 }}>Quick Log</span>
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
              backgroundColor: isDark ? 'rgba(245, 158, 11, 0.08)' : 'rgba(245, 158, 11, 0.1)',
              border: isDark ? '1px solid rgba(245, 158, 11, 0.25)' : '1px solid rgba(245, 158, 11, 0.3)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isDark ? '#fbbf24' : '#b45309', fontWeight: 700, marginBottom: '4px', fontSize: '0.76rem' }}>
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
              backgroundColor: snippetBg,
              border: snippetBorder,
              fontSize: '0.82rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Weekly Groceries</span>
              <span style={{ color: isDark ? '#f472b6' : '#db2777', fontWeight: 700, fontSize: '0.75rem' }}>₹2,850 / ₹3,500</span>
            </div>
            <div style={{ height: '6px', width: '100%', borderRadius: '9999px', backgroundColor: progressTrackBg, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '81%', backgroundColor: '#ec4899', borderRadius: '9999px' }} />
            </div>
            <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              <span>✓ 6 items checked</span>
              <span style={{ color: isDark ? '#10b981' : '#059669', fontWeight: 600 }}>Safe Budget</span>
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
              backgroundColor: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              fontSize: '0.78rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isDark ? '#38bdf8' : '#0284c7', fontWeight: 600 }}>
              <CheckCircle2 size={14} />
              <span>AES-256 SQLCipher Database Encryption</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isDark ? '#38bdf8' : '#0284c7', fontWeight: 600 }}>
              <CheckCircle2 size={14} />
              <span>Local-First • On-Device SMS Engine</span>
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
              backgroundColor: snippetBg,
              border: snippetBorder,
              fontSize: '0.82rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>₹10,000/mo @ 12% for 15 yrs</span>
              <span style={{ color: isDark ? '#10b981' : '#059669', fontWeight: 700 }}>₹50.45 Lakhs</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', fontSize: '0.72rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Invested: ₹18L</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ color: isDark ? '#34d399' : '#059669', fontWeight: 600 }}>Gain: ₹32.45L (180%)</span>
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
            <div style={{ flex: 1, padding: '8px', borderRadius: '8px', backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)', textAlign: 'center', color: 'var(--primary)', fontWeight: 600 }}>
              📄 Tax PDF Report
            </div>
            <div style={{ flex: 1, padding: '8px', borderRadius: '8px', backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center', color: isDark ? '#34d399' : '#059669', fontWeight: 600 }}>
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
              backgroundColor: isDark ? 'rgba(239, 68, 68, 0.08)' : 'rgba(239, 68, 68, 0.1)',
              border: isDark ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(239, 68, 68, 0.25)',
              fontSize: '0.78rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isDark ? '#f87171' : '#dc2626', fontWeight: 600 }}>
              <Lock size={14} />
              <span>Biometric Guard Active</span>
            </div>
            <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '9999px', backgroundColor: isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.15)', color: isDark ? '#f87171' : '#dc2626', fontWeight: 700 }}>
              Secured
            </span>
          </div>
        );

      case 'reminders':
        return (
          <div
            style={{
              marginTop: '18px',
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: snippetBg,
              border: snippetBorder,
              fontSize: '0.82rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--text-primary)' }}>
                <Clock size={14} color="#38bdf8" />
                HDFC Home Loan EMI • Due in 2 Days
              </span>
              <span style={{ fontSize: '0.72rem', color: isDark ? '#38bdf8' : '#0284c7', fontWeight: 700 }}>EMI 18/180</span>
            </div>
            <div style={{ color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Auto-Reconcile via SMS</span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹38,500.00</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
              <span style={{ flex: 1, padding: '4px 6px', borderRadius: '6px', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: isDark ? '#34d399' : '#059669', textAlign: 'center', fontSize: '0.72rem', fontWeight: 700 }}>Mark as Paid</span>
              <span style={{ flex: 1, padding: '4px 6px', borderRadius: '6px', backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', border: snippetBorder, textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>WhatsApp Reminder</span>
            </div>
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

          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '14px',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
            }}
          >
            Engineered for Android.{' '}
            <span className="text-gradient-alt">
              Designed for Clarity.
            </span>
          </h1>
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
                      : isDark ? 'var(--bg-surface-elevated)' : '#ffffff',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: isSelected
                      ? '0 4px 14px rgba(99, 102, 241, 0.35)'
                      : isDark ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.05)',
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
                    ? (isDark
                      ? `0 12px 28px -8px rgba(0, 0, 0, 0.5), 0 0 20px ${item.iconBg}`
                      : `0 12px 28px -8px rgba(15, 23, 42, 0.12), 0 0 16px ${item.iconBg}`)
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
              background: isDark
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.14) 0%, rgba(16, 185, 129, 0.08) 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #eef2ff 100%)',
              border: isDark
                ? '1px solid rgba(99, 102, 241, 0.3)'
                : '1.5px solid rgba(99, 102, 241, 0.25)',
              boxShadow: isDark
                ? '0 20px 40px -15px rgba(0, 0, 0, 0.4)'
                : '0 20px 40px -15px rgba(99, 102, 241, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)',
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
              Download Pocket Advisor free on Android. No mandatory account sign-up, free core tools, and local-first on-device encrypted storage.
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
                <CheckCircle2 size={15} color="#10b981" /> Free Core Tools Forever
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
