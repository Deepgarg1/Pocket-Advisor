import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Does Pocket Advisor work completely offline?',
    answer:
      'Yes! Pocket Advisor is built with an offline-first architecture powered by an on-device encrypted SQLite/SQLCipher database. All transaction logging, budgets, and bill calculations work instantly without any internet connection. When you reconnect, data can seamlessly sync to your private cloud storage.',
  },
  {
    question: 'How does transaction auto-detection work? Is it secure?',
    answer:
      'Pocket Advisor provides optional automatic expense tracking under Google Play\'s SMS-based financial money management policy. When enabled, our on-device engine parses incoming bank transaction SMS alerts (HDFC, SBI, ICICI, Axis, Bandhan, etc.) directly on your phone using deterministic regex. It operates 100% locally with zero cloud uploads, requires zero bank logins or passwords, and strictly drops OTPs and personal chats in memory for complete privacy.',
  },
  {
    question: 'How does the 2-stage bill splitting algorithm work?',
    answer:
      'Traditional bill splitting results in messy tangled webs where everyone owes everyone else. Pocket Advisor uses a 2-stage algorithm: first it checks for exact bilateral matches between debtors and creditors, then applies a greedy graph reduction. This compresses dozens of transfers down to the absolute minimum mathematical transactions.',
  },
  {
    question: 'How does the AI Budget Copilot analyze my spending?',
    answer:
      'The AI copilot ingests your monthly category totals, discretionary vs. non-discretionary spending ratios, and budget limits to identify recurring leakages and suggest achievable savings targets. Your data is strictly anonymized before processing.',
  },
  {
    question: 'Can I backup and export my spending data?',
    answer:
      'Yes. You have full ownership of your data. You can export your entire ledger to standard CSV spreadsheets or full JSON snapshots at any time from the settings screen.',
  },
  {
    question: 'How does Pocket Advisor monetize, and does it show ads?',
    answer:
      'Pocket Advisor follows a fair freemium model. Free accounts are supported by Google AdMob banner ads to keep all essential tracking, UPI & bank auto-detection, and budgeting tools 100% free forever. Upgrading to Pocket Advisor Pro removes all ads for an entirely ad-free experience, along with unlimited PDF report exports.',
  },
];

interface FaqSectionProps {
  onNavigate?: (view: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="cv-auto"
      style={{
        padding: '80px 24px',
        maxWidth: '880px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--primary-surface)',
            color: 'var(--primary)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '14px',
          }}
        >
          <HelpCircle size={15} /> Frequently Asked Questions
        </div>
        <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 10px 0' }}>
          Everything You Need to Know
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: 0 }}>
          Clear answers about permissions, security, and Android capabilities.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
            >
              <button
                onClick={() => toggleFaq(i)}
                aria-expanded={isOpen}
                aria-label={faq.question}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={20}
                  color="var(--text-secondary)"
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    flexShrink: 0,
                    marginLeft: '12px',
                  }}
                />
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '0 24px 22px',
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                    paddingTop: '14px',
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
