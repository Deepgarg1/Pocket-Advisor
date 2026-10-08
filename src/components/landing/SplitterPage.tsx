import React from 'react';
import { Sparkles } from 'lucide-react';
import { QuickBillSplitter } from '../tools/QuickBillSplitter';
import {
  BillSplitterGuide,
  FlatmatesRentGuide,
} from '../tools/CalculatorGuides';

interface SplitterPageProps {
  onNavigate?: (view: string, shouldScroll?: boolean) => void;
}

export const SplitterPage: React.FC<SplitterPageProps> = ({ onNavigate }) => {
  const isRentRoute = typeof window !== 'undefined' && (
    window.location.pathname.includes('rent') ||
    window.location.pathname.includes('flatmates') ||
    window.location.hash.includes('rent')
  );

  return (
    <section
      id="splitter"
      style={{
        padding: 'clamp(20px, 3vw, 40px) clamp(16px, 4vw, 24px)',
        maxWidth: '1140px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(16, 185, 129, 0.12) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: 'var(--primary)',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: '12px',
          }}
        >
          <Sparkles size={14} /> Zero Login • Instant Bill Split
        </div>
        <h2 style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '8px', color: 'var(--text-primary)' }}>
          {isRentRoute ? 'Flatmates Rent Splitter' : 'Quick Bill Splitter'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.5 }}>
          {isRentRoute
            ? 'Split rent, utilities & shared expenses fairly among flatmates. Share via WhatsApp with 1-tap UPI payments.'
            : 'Split group bills instantly with 1-tap WhatsApp summaries and UPI payment links. No signup needed.'
          }
        </p>
      </div>

      <QuickBillSplitter />
      <BillSplitterGuide />
      {isRentRoute && <FlatmatesRentGuide />}
    </section>
  );
};
