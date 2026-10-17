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
      'Pocket Advisor provides optional automatic expense tracking under Google Play\'s SMS-based financial money management policy. When enabled, our on-device linguistic engine (SmsParser.kt, 790+ lines) parses incoming bank transaction SMS alerts (HDFC, SBI, ICICI, Axis, Bandhan, etc.) directly on your phone across 150+ currencies. It operates 100% locally with zero cloud uploads, requires zero bank logins or passwords, and strictly drops OTPs and personal chats in memory for complete privacy.',
  },
  {
    question: 'How does the 2-stage greedy debt minimization bill splitter work?',
    answer:
      'Traditional bill splitting results in messy tangled webs where everyone owes everyone else. Pocket Advisor models group balances as a bipartite graph and greedily resolves net dues, cutting dozens of entangled transfers down to the absolute minimum bilateral payments. You can invite friends via 6-character short codes and pay via dynamic ZXing UPI QR codes or WhatsApp receipts.',
  },
  {
    question: 'How do Smart Bill and Loan EMI Reminders work?',
    answer:
      'Pocket Advisor schedules exact alarms using Android AlarmManager.setExactAndAllowWhileIdle() to guarantee delivery even during Android Doze mode. Incoming SMS alerts auto-reconcile and mark reminders paid. You can track remaining EMI installments, snooze alarms from the notification shade, and share 1-tap reminders via WhatsApp.',
  },
  {
    question: 'How does SQLCipher AES-256 and Android Keystore protect my data?',
    answer:
      'All local ledgers are encrypted with SQLCipher AES-256 with keys generated and sealed inside your device hardware security module (TEE / StrongBox) via KeystoreHelper. With FLAG_SECURE window protection, screen recordings, screenshots, and app-switcher snapshot leaks are completely blocked.',
  },
  {
    question: 'What financial calculators are included in the suite?',
    answer:
      'Pocket Advisor features a 6-in-1 mathematics suite: Reducing-balance Loan EMI, Step-Up SIP Compounding, Savings Goal Planner, FD / RD Calculator with compound frequencies, Compound Interest Calculator, and Inflation Erosion Calculator (1-30 years), plus an interactive Shopping List that converts into ledger expenses with 1 tap.',
  },
  {
    question: 'How does the Smart AI Financial Advisor work?',
    answer:
      'Our on-device Financial Intelligence Engine monitors burn-rate velocity and alerts you to category surges. For personalized coaching, it securely connects via Supabase Edge Functions to smart AI models to offer actionable debt reduction strategies and savings tips formatted in clean Markdown.',
  },
  {
    question: 'How does Pocket Advisor monetize, and does it show ads?',
    answer:
      'Pocket Advisor follows a fair freemium model. Core tracking, UPI & bank SMS detection, and calculators are 100% free. The main dashboard, analytics, and bill splitter remain completely ad-free. Upgrading to Pocket Advisor Pro removes all ads across the app, provides unlimited AI Copilot queries, unlimited split groups, and custom-range PDF exports.',
  },
];

export const HOME_FAQS: FaqItem[] = [
  {
    question: 'How does Pocket Advisor track bank and UPI expenses automatically?',
    answer:
      "Pocket Advisor securely detects incoming banking and payment SMS alerts (HDFC, SBI, ICICI, Axis, Bandhan, and major Indian banks) directly on your Android device using deterministic regex parsing under Google Play's financial SMS policy. SMS parsing runs 100% locally on your device without transmitting raw message contents to external servers. Your financial ledger is encrypted locally with SQLCipher AES-256.",
  },
  {
    question: 'How does the 2-stage greedy debt minimization bill splitter work?',
    answer:
      "Instead of tangled peer-to-peer transfers where everyone owes each other, Pocket Advisor's mathematical engine models all group debts as a bipartite graph and greedily resolves net balances, cutting up to 30 entangled transactions down to the absolute minimum payments.",
  },
  {
    question: 'Can I use the Quick Bill Splitter without downloading the app or creating an account?',
    answer:
      'Yes! Pocket Advisor provides a 100% free interactive Web Bill Splitter with zero login required. You can split dinner, travel, or rent bills, calculate taxes and tips, and export clean itemized receipts directly to WhatsApp.',
  },
  {
    question: 'Is Pocket Advisor free and safe to use?',
    answer:
      'Yes, Pocket Advisor is free to download, does not ask for netbanking credentials or OTPs, operates offline-first with on-device data encryption, and never sells your personal spending data.',
  },
  {
    question: 'How does SQLCipher AES-256 and Android Keystore protect my financial records?',
    answer:
      'Your financial transactions and budgets are stored in an on-device SQLite database encrypted with SQLCipher AES-256. The master encryption key is generated and sealed inside your phone\'s hardware-backed Android Keystore (TEE / StrongBox). Pocket Advisor also applies FLAG_SECURE window protection to block screen recordings, screenshots, and OS app-switcher snapshot leaks.',
  },
  {
    question: 'How do the Smart Bill and Loan EMI Reminders work?',
    answer:
      'Pocket Advisor schedules exact alarms using Android AlarmManager.setExactAndAllowWhileIdle() to trigger notifications even in deep Android Doze mode. When you pay a bill, incoming bank SMS alerts automatically reconcile and mark the reminder paid. You can also generate 1-tap WhatsApp reminders for flatmates or contacts.',
  },
  {
    question: 'What calculators are included in the Pocket Advisor suite?',
    answer:
      'Pocket Advisor includes a complete 6-in-1 financial mathematics suite: Loan EMI Calculator (reducing balance amortization), SIP Wealth Calculator (compound growth and annual step-ups), Savings Goal Planner, FD / RD Calculator with compound frequencies, Compound Interest Calculator, and Inflation Calculator (purchasing power erosion over 1-30 years).',
  },
  {
    question: 'How does the Smart AI Copilot and on-device burn-rate engine work?',
    answer:
      "Pocket Advisor's on-device Financial Intelligence Engine monitors your daily burn-rate velocity and alerts you to category spending spikes before you exceed monthly budget caps. For personalized financial coaching, it securely connects via Supabase Edge Functions to smart AI models, offering contextual debt reduction strategies, savings tips, and Markdown breakdowns.",
  },
];

export interface FaqSectionProps {
  onNavigate?: (view: string) => void;
  items?: FaqItem[];
  useHomeFaqs?: boolean;
  headingLevel?: 'h1' | 'h2';
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  items,
  useHomeFaqs = false,
  headingLevel = 'h2',
}) => {
  const faqList = items || (useHomeFaqs ? HOME_FAQS : FAQS);
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
        {headingLevel === 'h1' ? (
          <h1 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 10px 0' }}>
            Frequently Asked Questions
          </h1>
        ) : (
          <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 10px 0' }}>
            Frequently Asked Questions
          </h2>
        )}
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: 0 }}>
          Clear answers about permissions, security, and Android capabilities.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {faqList.map((faq, i) => {
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
