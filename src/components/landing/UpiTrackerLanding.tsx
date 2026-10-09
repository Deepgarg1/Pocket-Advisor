import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import {
  ShieldCheck,
  MessageSquareText,
  Zap,
  Lock,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Download,
  ArrowRight,
  Sparkles,
  RefreshCw,
  EyeOff,
  Database,
  Building2,
  FileCheck2,
} from 'lucide-react';

interface UpiTrackerLandingProps {
  onNavigate?: (view: string) => void;
}

interface SmsSample {
  id: string;
  bankName: string;
  senderId: string;
  rawSms: string;
  extracted: {
    amount: string;
    type: 'DEBIT' | 'CREDIT';
    merchant: string;
    category: string;
    account: string;
    otpFiltered: boolean;
  };
}

const SMS_SAMPLES: SmsSample[] = [
  {
    id: 'hdfc-upi',
    bankName: 'HDFC Bank',
    senderId: 'VK-HDFCBK',
    rawSms: 'Sent Rs. 385.00 from HDFC Bank A/C **4819 to SWIGGY UPI ref 418293817291 on 09-10-26. Bal Rs 42,150.80. Not you? Call 18002583838',
    extracted: {
      amount: '₹385.00',
      type: 'DEBIT',
      merchant: 'Swiggy',
      category: 'Food & Dining 🍔',
      account: 'HDFC (**4819)',
      otpFiltered: true,
    },
  },
  {
    id: 'sbi-upi',
    bankName: 'State Bank of India',
    senderId: 'AD-SBIINB',
    rawSms: 'Dear SBI User, A/C 6281 debited by Rs.120.00 on 09Oct26 transfer to CHAI POINT UPI ref 94820184. Bal: Rs 18,340.00 -SBI',
    extracted: {
      amount: '₹120.00',
      type: 'DEBIT',
      merchant: 'Chai Point',
      category: 'Coffee & Snacks ☕',
      account: 'SBI (**6281)',
      otpFiltered: true,
    },
  },
  {
    id: 'icici-salary',
    bankName: 'ICICI Bank',
    senderId: 'BP-ICICIB',
    rawSms: 'Dear Customer, your Acct XX8920 has been credited with INR 85,000.00 on 01-Oct-26 by NEFT-SALARY OCT 2026. Avail Bal INR 1,12,450.00.',
    extracted: {
      amount: '₹85,000.00',
      type: 'CREDIT',
      merchant: 'Salary Credit',
      category: 'Income / Salary 💼',
      account: 'ICICI (**8920)',
      otpFiltered: true,
    },
  },
  {
    id: 'axis-refund',
    bankName: 'Axis Bank',
    senderId: 'AX-AXISBK',
    rawSms: 'INR 499.00 refunded to your Axis Bank A/c no. XX3104 on 07-Oct-26 from AMAZON SELLER SERVICES. Total available balance INR 24,800.00.',
    extracted: {
      amount: '₹499.00',
      type: 'CREDIT',
      merchant: 'Amazon Refund',
      category: 'Shopping (Refund Reversal) 🛍️',
      account: 'Axis (**3104)',
      otpFiltered: true,
    },
  },
];

const SUPPORTED_BANKS = [
  { name: 'State Bank of India', code: 'SBI', type: 'Public' },
  { name: 'HDFC Bank', code: 'HDFC', type: 'Private' },
  { name: 'ICICI Bank', code: 'ICICI', type: 'Private' },
  { name: 'Axis Bank', code: 'AXIS', type: 'Private' },
  { name: 'Kotak Mahindra Bank', code: 'KOTAK', type: 'Private' },
  { name: 'Punjab National Bank', code: 'PNB', type: 'Public' },
  { name: 'Bank of Baroda', code: 'BOB', type: 'Public' },
  { name: 'Canara Bank', code: 'CANARA', type: 'Public' },
  { name: 'IndusInd Bank', code: 'INDUS', type: 'Private' },
  { name: 'IDFC FIRST Bank', code: 'IDFC', type: 'Private' },
  { name: 'Bandhan Bank', code: 'BANDHAN', type: 'Private' },
  { name: 'Union Bank of India', code: 'UNION', type: 'Public' },
];

const UPI_APPS = [
  'Google Pay',
  'PhonePe',
  'Paytm',
  'CRED',
  'BHIM UPI',
  'Amazon Pay',
  'WhatsApp Pay',
  'Navi',
];

const FAQS = [
  {
    q: 'How does Pocket Advisor detect my UPI transactions automatically?',
    a: 'Some banks send transaction SMS alerts for eligible payments, but delivery, timing, and message format vary. When a supported alert reaches your device, Pocket Advisor can parse available details such as amount and merchant for your ledger. Reconcile your records with your bank statement.',
  },
  {
    q: 'Does Pocket Advisor ever upload my financial SMS or messages to a cloud server?',
    a: 'SMS parsing and categorization are designed to run on your Android device. If you enable optional cloud backup, selected app data may sync according to your settings and the Privacy Policy. Review the app’s current privacy disclosures for encryption and data-sync details.',
  },
  {
    q: 'Does the app ask for my bank login, debit card PIN, or netbanking passwords?',
    a: 'No. Pocket Advisor does not connect to bank APIs, Account Aggregators, or ask for netbanking credentials, OTPs, or debit card details. It operates strictly from standard confirmation SMS text messages you already receive from your bank.',
  },
  {
    q: 'How does Pocket Advisor protect one-time passwords (OTPs) in SMS?',
    a: 'The parser is designed to identify transaction messages and filter common OTP or authentication patterns. No automated filter can guarantee perfect classification across every message format, so review imported transactions and correct mistakes when needed.',
  },
  {
    q: 'What happens if a bank SMS is delayed, missed, or network is down?',
    a: 'If an alert is delayed or never arrives, automatic tracking may miss that transaction. You can add missing expenses manually using the app’s available entry tools. Widget and notification features depend on your device and app settings.',
  },
  {
    q: 'How are refunds and transfers between my own accounts treated?',
    a: 'Pocket Advisor may identify refunds and transfers from recognizable message patterns. Classification can vary by bank and message format, so review these entries and correct them if they are categorized incorrectly.',
  },
];

export const UpiTrackerLanding: React.FC<UpiTrackerLandingProps> = ({ onNavigate }) => {
  const { theme } = useSettings();
  const isDark = theme === 'dark';
  const [selectedSample, setSelectedSample] = useState<SmsSample>(SMS_SAMPLES[0]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleNav = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    } else {
      window.location.href = view === 'home' ? '/' : `/${view}`;
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <a href="/" onClick={(e) => { e.preventDefault(); handleNav('home'); }} style={{ color: 'var(--text-secondary)' }}>
          Home
        </a>
        <span style={{ margin: '0 8px' }}>/</span>
        <a href="/features" onClick={(e) => { e.preventDefault(); handleNav('features'); }} style={{ color: 'var(--text-secondary)' }}>
          Features
        </a>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: 'var(--primary)', fontWeight: 600 }}>UPI Expense Tracker</span>
      </nav>

      {/* Hero Header */}
      <section style={{ textAlign: 'center', marginBottom: '64px', position: 'relative' }}>
        {/* Glow backdrop */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '350px',
            background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.22) 0%, transparent 70%)',
            filter: 'blur(70px)',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            backgroundColor: 'var(--primary-surface)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: 'var(--primary)',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '20px',
          }}
        >
          <Sparkles size={15} />
          <span>On-device SMS parsing for supported transaction alerts</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            maxWidth: '960px',
            margin: '0 auto 20px',
          }}
        >
          Automatic UPI &amp; Bank SMS Expense Tracker for{' '}
          <span className="text-gradient">
            Android
          </span>
        </h1>

        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            maxWidth: '780px',
            lineHeight: 1.65,
            margin: '0 auto 32px',
          }}
        >
          Stop typing every chai, cab, and grocery transaction manually. Pocket Advisor helps you record eligible transactions from bank SMS alerts for supported banks and payment apps. SMS availability and parsing can vary by bank, account, and message format. Review our Privacy Policy to understand local storage and optional cloud backup.
        </p>

        {/* Primary Action Buttons */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '36px' }}>
          <a
            href="https://play.google.com/store/apps/details?id=com.pocketadvisor.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              backgroundColor: '#000000',
              color: '#ffffff',
              borderRadius: '14px',
              border: '1.5px solid #334155',
              fontWeight: 700,
              fontSize: '0.98rem',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
              transition: 'all 0.2s ease',
            }}
          >
            <Download size={18} color="#00d2ff" />
            <span>Install on Google Play</span>
          </a>
          <button
            onClick={() => handleNav('split')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 22px',
              backgroundColor: 'var(--bg-surface-elevated)',
              color: 'var(--text-primary)',
              borderRadius: '14px',
              border: '1px solid var(--border-subtle)',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <span>Try Free Web Bill Splitter</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Trust Badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} color="#10b981" /> Built for Android expense tracking
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={16} color="#818cf8" /> SQLCipher 256-bit On-Device Encryption
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <EyeOff size={16} color="#38bdf8" /> 100% Zero Bank Login Credentials
          </span>
        </div>
      </section>

      {/* Interactive SMS Regex Simulation Section */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
            How On-Device SMS Detection Works
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto' }}>
            Test the live regex extraction engine below. Select a bank SMS to observe how Pocket Advisor captures amounts and merchant details in real time without touching OTPs.
          </p>
        </div>

        {/* Bank SMS Sample Selector Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '24px',
          }}
        >
          {SMS_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => setSelectedSample(sample)}
              style={{
                padding: '10px 18px',
                borderRadius: '12px',
                border: selectedSample.id === sample.id ? '1.5px solid var(--primary)' : '1px solid var(--border-subtle)',
                backgroundColor: selectedSample.id === sample.id ? 'var(--primary-surface)' : 'var(--bg-surface)',
                color: selectedSample.id === sample.id ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {sample.bankName}
            </button>
          ))}
        </div>

        {/* Two-Column Simulation Showcase Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-glass)',
            borderRadius: '24px',
            padding: ' clamp(20px, 4vw, 36px)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {/* Left: Raw Incoming Bank SMS Notification */}
          <div
            style={{
              background: 'var(--bg-app)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '18px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquareText size={18} color="var(--primary)" />
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    Incoming Bank SMS: {selectedSample.senderId}
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.12)' }}>
                  Sample SMS
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  background: isDark ? 'rgba(0, 0, 0, 0.35)' : 'var(--bg-surface-elevated)',
                  padding: '16px',
                  borderRadius: '12px',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid var(--border-subtle)',
                  wordBreak: 'break-word',
                }}
              >
                {selectedSample.rawSms}
              </p>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <Lock size={14} color="#10b981" />
              <span>This interactive example illustrates how a transaction SMS may be parsed</span>
            </div>
          </div>

          {/* Right: Parsed Expense Object */}
          <div
            style={{
              background: isDark ? 'var(--bg-surface-elevated)' : '#ffffff',
              border: isDark ? '1px solid rgba(99, 102, 241, 0.25)' : '1px solid var(--border-subtle)',
              borderRadius: '18px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: isDark ? 'none' : '0 4px 14px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Parsed Transaction Record
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: selectedSample.extracted.type === 'DEBIT' ? '#f43f5e' : '#10b981',
                    background: selectedSample.extracted.type === 'DEBIT' ? 'rgba(244, 63, 94, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                  }}
                >
                  {selectedSample.extracted.type}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Amount Detected</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {selectedSample.extracted.amount}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Beneficiary / Entity</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {selectedSample.extracted.merchant}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Auto-Categorization</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--primary)' }}>
                    {selectedSample.extracted.category}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Linked Bank / Account</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {selectedSample.extracted.account}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                color: '#34d399',
                fontWeight: 600,
              }}
            >
              <CheckCircle2 size={16} />
              <span>Zero OTPs or passwords logged. Encrypted to local SQLite.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Banks & UPI Ecosystem */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
            Supported Indian Banks &amp; Payment Apps
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto' }}>
            Pocket Advisor is designed to recognize transaction-alert formats from selected banks. Actual coverage depends on the SMS format delivered to your phone; check sample records and reconcile with your bank statement.
          </p>
        </div>

        {/* UPI Apps Grid */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '12px', textAlign: 'center' }}>
            Supported UPI Payment Apps
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {UPI_APPS.map((app) => (
              <span
                key={app}
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Zap size={14} color="#00d2ff" />
                {app}
              </span>
            ))}
          </div>
        </div>

        {/* Banks Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {SUPPORTED_BANKS.map((b) => (
            <div
              key={b.code}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Building2 size={18} color="var(--primary)" />
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{b.name}</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', padding: '2px 8px', borderRadius: '6px' }}>
                {b.code}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Real-World Edge Cases: Honest & Transparent */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
            Handling Real-World Edge Cases Honestly
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto' }}>
            We know financial tracking isn’t always linear. Here is how Pocket Advisor manages edge cases without skewing your monthly numbers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Card 1: Missing / Delayed SMS */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '24px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <RefreshCw size={20} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Delayed or Missing SMS
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
              If your telecom provider delays delivery due to poor connectivity, Pocket Advisor processes pending alerts as soon as service returns. You can also log purchases via the Android Home Screen widget in under 2 seconds.
            </p>
          </div>

          {/* Card 2: Refunds & Reversals */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '24px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <CheckCircle2 size={20} color="#10b981" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Refunds &amp; Failed Payments
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
              When a failed UPI charge is reversed, Pocket Advisor offsets the initial debit instead of falsely counting the refund as new salary or income. Failed and declined alerts are flagged and excluded.
            </p>
          </div>

          {/* Card 3: Self-Transfers & CC Payments */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '24px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Database size={20} color="#f59e0b" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Self-Transfers Without Double-Counting
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
              Moving funds between your own SBI and HDFC accounts, or paying your credit card bill from your savings balance, is classified as an internal transfer so your monthly spending totals never get doubled.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy & Permissions Architecture */}
      <section
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(30, 27, 75, 0.5) 0%, rgba(15, 23, 42, 0.9) 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)',
          borderRadius: '24px',
          border: isDark ? '1.5px solid rgba(99, 102, 241, 0.3)' : '1.5px solid rgba(99, 102, 241, 0.25)',
          padding: 'clamp(28px, 5vw, 48px)',
          marginBottom: '80px',
          boxShadow: isDark ? 'none' : '0 12px 32px rgba(99, 102, 241, 0.08)',
        }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
            <FileCheck2 size={16} /> Google Play Financial Policy Exception
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Why We Have High Privacy Standards
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.65, marginBottom: '24px' }}>
            Google Play restricts SMS permissions and reviews eligible use cases under its current policies. Permission availability and approval depend on the app’s actual Play Console status. Review the app’s permission disclosures and Privacy Policy for details.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div style={{ background: isDark ? 'rgba(0,0,0,0.3)' : 'var(--bg-surface)', borderRadius: '14px', padding: '16px', border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>On-Device SMS Parsing</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>SMS parsing is designed to run on your device. If you enable optional cloud backup, selected app data may sync according to your settings and Privacy Policy.</div>
            </div>
            <div style={{ background: isDark ? 'rgba(0,0,0,0.3)' : 'var(--bg-surface)', borderRadius: '14px', padding: '16px', border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>Local-First Processing</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>SMS parsing is designed to happen locally. Optional cloud backup may sync selected app data if you enable it; see the Privacy Policy for details.</div>
            </div>
            <div style={{ background: isDark ? 'rgba(0,0,0,0.3)' : 'var(--bg-surface)', borderRadius: '14px', padding: '16px', border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>Encrypted SQLite Storage</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Your local ledger is locked using SQLCipher 256-bit military-grade encryption.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section style={{ marginBottom: '80px', maxWidth: '860px', margin: '0 auto 80px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', textAlign: 'center', marginBottom: '32px' }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.q}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 22px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    gap: '12px',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <HelpCircle size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: '0 22px 20px 50px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.92rem',
                      lineHeight: 1.65,
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Conversion CTA */}
      <section
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(30, 27, 75, 0.8) 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #eef2ff 100%)',
          borderRadius: '28px',
          border: isDark ? '1px solid var(--border-glass)' : '1.5px solid rgba(99, 102, 241, 0.25)',
          padding: 'clamp(32px, 6vw, 60px) 24px',
          textAlign: 'center',
          boxShadow: isDark ? 'var(--shadow-lg)' : '0 20px 48px -12px rgba(99, 102, 241, 0.12)',
        }}
      >
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
          Start Tracking UPI &amp; Bank Expenses Today
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto 28px', lineHeight: 1.6 }}>
          Join thousands of smart Indians managing their money with complete privacy. Available now on Google Play Store.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href="https://play.google.com/store/apps/details?id=com.pocketadvisor.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 26px',
              backgroundColor: '#000000',
              color: '#ffffff',
              borderRadius: '14px',
              border: '1.5px solid #334155',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
            }}
          >
            <Download size={18} color="#00d2ff" />
            <span>Download on Google Play</span>
          </a>
          <button
            onClick={() => handleNav('split')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#ffffff',
              color: isDark ? '#ffffff' : 'var(--text-primary)',
              borderRadius: '14px',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1.5px solid var(--border-subtle)',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: isDark ? 'none' : '0 2px 8px rgba(15, 23, 42, 0.06)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.color = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1.5px solid var(--border-subtle)';
              e.currentTarget.style.color = isDark ? '#ffffff' : 'var(--text-primary)';
            }}
          >
            <span>Open Web Bill Splitter</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
