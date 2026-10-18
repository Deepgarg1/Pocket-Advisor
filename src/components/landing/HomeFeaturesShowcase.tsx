import React, { useState } from 'react';
import {
  MessageSquareText,
  Users,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Smartphone,
  QrCode,
  Calculator,
  Flame,
  Target,
  Building,
  Zap,
} from 'lucide-react';
import './HomeFeaturesShowcase.css';

interface HomeFeaturesShowcaseProps {
  onNavigate?: (view: string) => void;
}

interface SmsSample {
  id: string;
  bank: string;
  merchant: string;
  category: string;
  amount: string;
  isCredit?: boolean;
  rawText: string;
  icon: string;
}

const SMS_SAMPLES: SmsSample[] = [
  {
    id: 'swiggy',
    bank: 'HDFC Bank',
    merchant: 'Swiggy',
    category: 'Food & Dining',
    amount: '₹849.00',
    isCredit: false,
    rawText: 'Sent Rs.849.00 from HDFC Bank A/C **4108 to SWIGGY BANGALORE on 17-Oct-26 via UPI Ref 4291849102. Bal Rs.48,210.00',
    icon: '🍔',
  },
  {
    id: 'uber',
    bank: 'SBI Bank',
    merchant: 'Uber India',
    category: 'Travel & Commute',
    amount: '₹342.50',
    isCredit: false,
    rawText: 'Dear SBI User, your A/c **8912 debited by Rs.342.50 on 17Oct26 transfer to UBER INDIA UPI Ref 9028192839.',
    icon: '🚗',
  },
  {
    id: 'salary',
    bank: 'ICICI Bank',
    merchant: 'Salary Credit',
    category: 'Income',
    amount: '₹85,000.00',
    isCredit: true,
    rawText: 'Your A/C **6120 is credited with Rs 85,000.00 on 01-Oct-26 by INFOSYS LIMITED SALARY NEFT. Total Avail Bal Rs 1,42,850.00.',
    icon: '💼',
  },
];

export const HomeFeaturesShowcase: React.FC<HomeFeaturesShowcaseProps> = ({ onNavigate }) => {
  const [activeSms, setActiveSms] = useState<SmsSample>(SMS_SAMPLES[0]);

  const handleNav = (view: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <section className="pa-showcase" aria-labelledby="pa-showcase-title">
      {/* Section Header */}
      <div className="pa-showcase-header">
        <div className="pa-showcase-badge">
          <Sparkles size={14} /> Full Product Architecture
        </div>
        <h2 id="pa-showcase-title" className="pa-showcase-title">
          Every Financial Workflow. Solved On-Device.
        </h2>
        <p className="pa-showcase-subtitle">
          Built exclusively for Android with local-first SQLCipher encryption, automatic transaction logging,
          optimal debt simplification, and smart financial intelligence.
        </p>
      </div>

      {/* ========================================================= */}
      {/* 1. On-Device SMS & UPI Parser                             */}
      {/* ========================================================= */}
      <div className="pa-showcase-row">
        <div className="pa-showcase-copy">
          <div className="pa-tag pa-tag-indigo">
            <MessageSquareText size={13} /> Zero-Effort Automation
          </div>
          <h3 className="pa-showcase-heading">
            Linguistic On-Device SMS &amp; UPI Expense Parser
          </h3>
          <p className="pa-showcase-desc">
            Stop logging transactions by hand. Pocket Advisor includes an on-device linguistic engine
            that processes incoming bank and UPI debit alerts in milliseconds across 150+ currencies.
            Raw SMS texts never leave your phone.
          </p>

          <div className="pa-points-list">
            <div className="pa-point-item">
              <CheckCircle2 size={16} />
              <span><strong>Google Play Policy Compliant:</strong> Operates strictly under approved financial SMS guidelines with zero netbanking credentials or OTP storage.</span>
            </div>
            <div className="pa-point-item">
              <CheckCircle2 size={16} />
              <span><strong>Smart Merchant Isolation:</strong> Automatically detects Swiggy, Zomato, Uber, Amazon, Netflix, and 40+ Indian banks (HDFC, SBI, ICICI, Axis).</span>
            </div>
            <div className="pa-point-item">
              <CheckCircle2 size={16} />
              <span><strong>Instant OTP Rejection:</strong> Security and verification codes are dropped immediately in memory and never written to disk.</span>
            </div>
          </div>

          <a
            href="/upi-expense-tracker"
            onClick={(e) => handleNav('upi-expense-tracker', e)}
            className="pa-showcase-btn"
          >
            <span>Explore UPI SMS Tracker</span>
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Interactive SMS Visualizer Card */}
        <div className="pa-mockup-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Live Parser Simulation
            </span>
            <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>
              ● 100% On-Device
            </span>
          </div>

          <div className="pa-sms-selector">
            {SMS_SAMPLES.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`pa-sms-tab ${activeSms.id === s.id ? 'active' : ''}`}
                onClick={() => setActiveSms(s)}
              >
                {s.bank} {s.isCredit ? 'Credit' : 'Debit'}
              </button>
            ))}
          </div>

          {/* Raw Simulated SMS Alert */}
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
              INCOMING BANK SMS (READ ON-DEVICE)
            </div>
            <div className="pa-sms-raw">{activeSms.rawText}</div>
          </div>

          {/* Parsed Ledger Entry */}
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
              AUTO-PARSED LEDGER TRANSACTION
            </div>
            <div className="pa-parsed-row">
              <div className="pa-parsed-left">
                <div className="pa-merchant-logo">{activeSms.icon}</div>
                <div className="pa-parsed-meta">
                  <span className="pa-parsed-merchant">{activeSms.merchant}</span>
                  <span className="pa-parsed-category">{activeSms.category} • {activeSms.bank}</span>
                </div>
              </div>
              <span className={`pa-parsed-amount ${activeSms.isCredit ? 'credit' : ''}`}>
                {activeSms.isCredit ? '+' : '-'}{activeSms.amount}
              </span>
            </div>
          </div>

          <div className="pa-speed-pill">
            <span>⚡ Parse latency: &lt; 2.1ms</span>
            <span>🔒 Cloud upload: 0 Bytes</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. Greedy Debt Minimizer & Bill Splitter                   */}
      {/* ========================================================= */}
      <div className="pa-showcase-row pa-reverse">
        <div className="pa-showcase-copy">
          <div className="pa-tag pa-tag-emerald">
            <Users size={13} /> Group Financial Harmony
          </div>
          <h3 className="pa-showcase-heading">
            2-Stage Greedy Debt Splitter &amp; UPI QR Engine
          </h3>
          <p className="pa-showcase-desc">
            Splitting trip or flatmate expenses usually results in an entangled web of IOU transfers.
            Pocket Advisor models debts as a bipartite graph and greedily resolves net dues, reducing
            dozens of messy repayments down to the absolute minimum bilateral transfers.
          </p>

          <div className="pa-points-list">
            <div className="pa-point-item">
              <CheckCircle2 size={16} />
              <span><strong>80% Transaction Reduction:</strong> Turns 12 confusing cross-payments between 4 people into just 2 clean settlements.</span>
            </div>
            <div className="pa-point-item">
              <CheckCircle2 size={16} />
              <span><strong>Instant UPI Deep-Links:</strong> 1-tap handoff to Google Pay, PhonePe, Paytm, or CRED with pre-filled amounts and VPA addresses.</span>
            </div>
            <div className="pa-point-item">
              <CheckCircle2 size={16} />
              <span><strong>On-Screen Dynamic QR:</strong> Generate offline ZXing QR codes so friends can scan and pay without typing long UPI IDs.</span>
            </div>
          </div>

          <a
            href="/split"
            onClick={(e) => handleNav('split', e)}
            className="pa-showcase-btn"
          >
            <span>Try Free Web Bill Splitter</span>
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Debt Splitter Visual Mockup */}
        <div className="pa-mockup-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Goa Trip Settlement (4 Friends)
            </span>
            <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>
              Greedy Bipartite Graph
            </span>
          </div>

          <div className="pa-split-demo-grid">
            <div className="pa-split-box">
              <span className="pa-split-box-title">Without Optimization</span>
              <span className="pa-split-box-val" style={{ color: '#ef4444' }}>
                12 Transfers
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Everyone owes everyone else
              </span>
            </div>
            <div className="pa-split-box">
              <span className="pa-split-box-title">With Pocket Advisor</span>
              <span className="pa-split-box-val" style={{ color: '#10b981' }}>
                2 Transfers
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Debts minimized &amp; cleared
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="pa-settlement-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>Amit</span>
                <span style={{ color: 'var(--text-muted)' }}>pays</span>
                <span style={{ fontWeight: 800, color: '#10b981' }}>Priya</span>
              </div>
              <span style={{ fontWeight: 850, color: 'var(--text-primary)' }}>₹2,840</span>
            </div>
            <div className="pa-settlement-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>Sneha</span>
                <span style={{ color: 'var(--text-muted)' }}>pays</span>
                <span style={{ fontWeight: 800, color: '#10b981' }}>Rahul</span>
              </div>
              <span style={{ fontWeight: 850, color: 'var(--text-primary)' }}>₹1,420</span>
            </div>
          </div>

          <button
            type="button"
            className="pa-settlement-btn"
            onClick={(e) => handleNav('split', e as any)}
          >
            <QrCode size={16} />
            <span>Generate Instant Dynamic UPI QR Code</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. Hardware-Backed Privacy Vault                           */}
      {/* ========================================================= */}
      <div>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 32px' }}>
          <div className="pa-tag pa-tag-amber" style={{ margin: '0 auto 12px' }}>
            <ShieldCheck size={13} /> Enterprise Security
          </div>
          <h3 className="pa-showcase-heading">
            Your Financial Records Never Leave Your Hardware
          </h3>
          <p className="pa-showcase-desc">
            We don't ask for netbanking passwords, bank logins, or cloud access to your messages.
            Every byte is guarded locally with cryptographic isolation.
          </p>
        </div>

        <div className="pa-security-grid">
          <div className="pa-sec-item">
            <div className="pa-sec-icon">
              <Lock size={20} />
            </div>
            <h4 className="pa-sec-title">SQLCipher AES-256 Room DB</h4>
            <p className="pa-sec-desc">
              All transactions, categories, and account balances are stored in a locally encrypted
              SQLCipher database on your phone. Even if physical device files are extracted, data remains unreadable.
            </p>
          </div>

          <div className="pa-sec-item">
            <div className="pa-sec-icon">
              <ShieldCheck size={20} />
            </div>
            <h4 className="pa-sec-title">Hardware Android Keystore</h4>
            <p className="pa-sec-desc">
              Database encryption keys are generated and sealed within your phone's hardware-backed
              Trusted Execution Environment (TEE) or StrongBox keymaster chip.
            </p>
          </div>

          <div className="pa-sec-item">
            <div className="pa-sec-icon">
              <Smartphone size={20} />
            </div>
            <h4 className="pa-sec-title">FLAG_SECURE Screen Shield</h4>
            <p className="pa-sec-desc">
              App screens are protected with Android's FLAG_SECURE window flag, blocking screenshots,
              screen recordings, and OS app-switcher snapshot leaks when multitasking.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. 6-in-1 Financial Calculators Suite Quick Links          */}
      {/* ========================================================= */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <div className="pa-tag pa-tag-indigo" style={{ marginBottom: '8px' }}>
              <Calculator size={13} /> Precision Mathematics
            </div>
            <h3 className="pa-showcase-heading">
              6-in-1 Interactive Financial Calculators
            </h3>
            <p className="pa-showcase-desc">
              Run simulations directly on the web with instant formula breakdowns, shareable links, and zero signups.
            </p>
          </div>

          <a
            href="/calculators"
            onClick={(e) => handleNav('calculators', e)}
            className="pa-showcase-btn"
          >
            <span>Open All Calculators</span>
            <ArrowRight size={15} />
          </a>
        </div>

        <div className="pa-calc-hub-grid">
          <a
            href="/emi-calculator"
            onClick={(e) => handleNav('emi-calculator', e)}
            className="pa-calc-link-card"
          >
            <div className="pa-calc-link-info">
              <div className="pa-calc-link-icon">
                <Calculator size={18} />
              </div>
              <div>
                <h4 className="pa-calc-link-title">Loan EMI Calculator</h4>
                <p className="pa-calc-link-sub">Reducing balance amortization</p>
              </div>
            </div>
            <ArrowRight size={15} color="var(--text-muted)" />
          </a>

          <a
            href="/sip-calculator"
            onClick={(e) => handleNav('sip-calculator', e)}
            className="pa-calc-link-card"
          >
            <div className="pa-calc-link-info">
              <div className="pa-calc-link-icon">
                <TrendingUp size={18} />
              </div>
              <div>
                <h4 className="pa-calc-link-title">Step-Up SIP Calculator</h4>
                <p className="pa-calc-link-sub">Compounding &amp; annual step-up</p>
              </div>
            </div>
            <ArrowRight size={15} color="var(--text-muted)" />
          </a>

          <a
            href="/home-loan-prepayment-vs-sip"
            onClick={(e) => handleNav('home-loan-prepayment-vs-sip', e)}
            className="pa-calc-link-card"
          >
            <div className="pa-calc-link-info">
              <div className="pa-calc-link-icon">
                <Zap size={18} />
              </div>
              <div>
                <h4 className="pa-calc-link-title">Prepayment vs SIP</h4>
                <p className="pa-calc-link-sub">Debt clearance vs mutual funds</p>
              </div>
            </div>
            <ArrowRight size={15} color="var(--text-muted)" />
          </a>

          <a
            href="/savings-goal-calculator"
            onClick={(e) => handleNav('savings-goal-calculator', e)}
            className="pa-calc-link-card"
          >
            <div className="pa-calc-link-info">
              <div className="pa-calc-link-icon">
                <Target size={18} />
              </div>
              <div>
                <h4 className="pa-calc-link-title">Savings Goal Planner</h4>
                <p className="pa-calc-link-sub">Monthly target contributions</p>
              </div>
            </div>
            <ArrowRight size={15} color="var(--text-muted)" />
          </a>

          <a
            href="/fd-rd-calculator"
            onClick={(e) => handleNav('fd-rd-calculator', e)}
            className="pa-calc-link-card"
          >
            <div className="pa-calc-link-info">
              <div className="pa-calc-link-icon">
                <Building size={18} />
              </div>
              <div>
                <h4 className="pa-calc-link-title">FD &amp; RD Calculator</h4>
                <p className="pa-calc-link-sub">Fixed &amp; recurring term deposits</p>
              </div>
            </div>
            <ArrowRight size={15} color="var(--text-muted)" />
          </a>

          <a
            href="/inflation-calculator"
            onClick={(e) => handleNav('inflation-calculator', e)}
            className="pa-calc-link-card"
          >
            <div className="pa-calc-link-info">
              <div className="pa-calc-link-icon">
                <Flame size={18} />
              </div>
              <div>
                <h4 className="pa-calc-link-title">Inflation Calculator</h4>
                <p className="pa-calc-link-sub">1-30 Yr purchasing power decay</p>
              </div>
            </div>
            <ArrowRight size={15} color="var(--text-muted)" />
          </a>
        </div>
      </div>
    </section>
  );
};
