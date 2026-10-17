import React from 'react';
import {
  Calculator,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { GuideFaqItem, AuthorCard, TableOfContents } from './ProblemSolvingGuides';

interface EmiVsTotalInterestGuideProps {
  onNavigate?: (view: string) => void;
}

export const EmiVsTotalInterestGuide: React.FC<EmiVsTotalInterestGuideProps> = ({ onNavigate }) => {
  const handleNav = (target: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    }
  };

  return (
    <article
      style={{
        maxWidth: '880px',
        margin: '0 auto',
        padding: 'clamp(24px, 4vw, 48px) clamp(16px, 3vw, 24px)',
      }}
    >
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '20px', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
        <a href="/" onClick={(e) => handleNav('home', e)} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
          Home
        </a>
        <span style={{ margin: '0 8px' }}>/</span>
        <a href="/guides" onClick={(e) => handleNav('guides', e)} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
          Guides
        </a>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: 'var(--text-secondary)' }}>EMI vs Total Interest Guide</span>
      </nav>

      {/* Category Pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '5px 12px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(99, 102, 241, 0.15)',
          color: 'var(--primary)',
          fontSize: '0.8rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '14px',
        }}
      >
        <Calculator size={14} /> Retail Debt Amortization Guide
      </div>

      {/* H1 Heading */}
      <h1
        style={{
          fontSize: 'clamp(1.85rem, 3.8vw, 2.6rem)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.025em',
          lineHeight: 1.2,
          marginBottom: '14px',
        }}
      >
        EMI vs Total Interest: How Reducing Balance Loans Work and How to Save Lakhs
      </h1>

      <p
        style={{
          fontSize: '1.08rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '28px',
        }}
      >
        Why a ₹50 Lakh home loan can cost you over ₹54 Lakhs in interest alone, and three proven mathematical
        strategies to cut your tenure by 8+ years and keep more of your hard-earned wealth.
      </p>

      {/* Author Card */}
      <AuthorCard topic="Debt Amortization &amp; Retail Loan Mathematics" />

      {/* Table of Contents */}
      <TableOfContents
        items={[
          { id: 'the-shocking-math', label: '1. The Shocking Math: Why Borrowers Repay Double' },
          { id: 'flat-vs-reducing', label: '2. Flat Rate vs. Reducing Balance Interest Explained' },
          { id: 'amortization-curve', label: '3. The Front-Loaded Amortization Curve Trap' },
          { id: 'hack-1-extra-emi', label: '4. Strategy 1: The 1 Extra EMI per Year Hack' },
          { id: 'hack-step-up', label: '5. Strategy 2: 5% Annual Step-Up Prepayment' },
          { id: 'hack-5050-hybrid', label: '6. Strategy 3: The 50:50 Hybrid Prepay vs. SIP Strategy' },
          { id: 'rbi-rules', label: '7. RBI Regulations on Prepayment Penalties' },
          { id: 'faq', label: '8. Frequently Asked Questions' },
        ]}
      />

      {/* Section 1 */}
      <section id="the-shocking-math" style={{ marginBottom: '36px', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
          1. The Shocking Math: Why Borrowers Repay Double
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '14px' }}>
          Most home buyers focus solely on whether they can afford the monthly EMI check. If a bank approves a ₹50 Lakh loan
          at 8.5% interest for 20 years with an EMI of <strong>₹43,391</strong>, it feels affordable.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '16px' }}>
          However, multiplying ₹43,391 by 240 months reveals the total repayment: <strong>₹1,04,13,878</strong>.
          You borrowed ₹50 Lakhs, but you pay back over <strong>₹1.04 Crores</strong>. You are paying ₹54.14 Lakhs—more than the actual house value—purely in interest.
        </p>
      </section>

      {/* Section 2 */}
      <section id="flat-vs-reducing" style={{ marginBottom: '36px', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
          2. Flat Rate vs. Reducing Balance Interest Explained
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '14px' }}>
          Always confirm which calculation method your lender is applying:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase' }}>Flat Interest Rate (Misleading)</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 6px' }}>Calculated on Initial Principal Forever</div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Even after you have repaid 80% of the loan, interest is calculated as if you still owe the full original amount. A "7% flat rate" is actually an effective ~13% reducing rate.</div>
          </div>
          <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>Reducing Balance (Standard Retail)</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 6px' }}>Calculated Only on Outstanding Principal</div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Interest is calculated strictly on the unpaid balance remaining at each monthly cycle. Any extra principal payment immediately slashes future interest charges.</div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="amortization-curve" style={{ marginBottom: '36px', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
          3. The Front-Loaded Amortization Curve Trap
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '14px' }}>
          During the first 5 years of a 20-year home loan, your EMI payments do almost nothing to reduce the actual debt:
        </p>
        <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', marginBottom: '18px' }}>
          <div style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Month 1 Breakdown of a ₹50L Loan @ 8.5% (EMI: ₹43,391):
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '0.88rem' }}>
            <span style={{ color: '#ef4444' }}><strong>Interest to Bank:</strong> ₹35,417 (81.6%)</span>
            <span style={{ color: '#10b981' }}><strong>Principal Repaid:</strong> ₹7,974 (18.4%)</span>
          </div>
        </div>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem' }}>
          Because outstanding principal is at its maximum at the start, 80%+ of your early payments go straight to the bank's profit ledger.
          This is why prepaying in years 1 to 5 yields 4x more interest savings than prepaying in year 15.
        </p>
      </section>

      {/* Section 4 */}
      <section id="hack-1-extra-emi" style={{ marginBottom: '36px', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
          4. Strategy 1: The 1 Extra EMI per Year Hack
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '14px' }}>
          Instead of 12 EMIs a year, pay 13 EMIs (use an annual bonus, tax refund, or festive bonus to pay 1 extra installment directly towards principal).
        </p>
        <div style={{ padding: '16px 20px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
          ⚡ <strong>Impact on a ₹50L 20-Year Loan @ 8.5%:</strong>
          <br />
          • Tenure drops from <strong>20 years to ~15.5 years</strong> (saves 4.5 years of debt!).
          <br />
          • Total interest saved: <strong>₹12.8 Lakhs</strong>!
        </div>
      </section>

      {/* Section 5 */}
      <section id="hack-step-up" style={{ marginBottom: '36px', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
          5. Strategy 2: 5% Annual Step-Up Prepayment
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '14px' }}>
          Salaries increase by 7%–10% annually. If you increase your monthly loan repayment by just <strong>5% each year</strong>,
          the compounding acceleration cuts your loan duration in half:
        </p>
        <div style={{ padding: '16px 20px', borderRadius: '14px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
          🚀 <strong>Impact on a ₹50L 20-Year Loan @ 8.5%:</strong>
          <br />
          • You are 100% debt-free in <strong>~11.5 years</strong> instead of 20 years.
          <br />
          • Total interest saved: <strong>₹23.5 Lakhs</strong>!
        </div>
      </section>

      {/* Section 6 */}
      <section id="hack-5050-hybrid" style={{ marginBottom: '36px', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
          6. Strategy 3: The 50:50 Hybrid Prepay vs. SIP Strategy
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '14px' }}>
          Prepaying 100% of your disposable cash saves interest but leaves you with zero liquid wealth if a medical or employment emergency occurs.
          Conversely, investing 100% in mutual funds leaves you burdened with high monthly debt service.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '14px' }}>
          The mathematically optimal balance is the <strong>50:50 Hybrid Strategy</strong>: split your monthly surplus equally. Put 50% into extra principal prepayment and 50% into a broad index equity mutual fund SIP.
        </p>
      </section>

      {/* Section 7 */}
      <section id="rbi-rules" style={{ marginBottom: '36px', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
          7. RBI Regulations on Prepayment Penalties
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '12px' }}>
          Under Reserve Bank of India (RBI) circulars, banks and Housing Finance Companies (HFCs) are
          <strong> strictly prohibited</strong> from charging foreclosure fees or prepayment penalties to retail individual borrowers
          on floating-rate home loans, regardless of whether prepayment is partial or full.
        </p>
      </section>

      {/* Interactive Tool CTA */}
      <div
        style={{
          padding: '28px',
          borderRadius: '22px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.14) 0%, rgba(16, 185, 129, 0.1) 100%)',
          border: '1.5px solid rgba(99, 102, 241, 0.3)',
          marginBottom: '44px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
          <Sparkles size={15} /> Free Calculator Suite
        </div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Simulate Your Own Loan Amortization Online
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
          Check your exact monthly EMI, test 1-extra-EMI hacks, and compare home loan prepayment against mutual fund SIP returns with our free calculators.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href="/emi-calculator"
            onClick={(e) => handleNav('emi-calculator', e)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '12px',
              background: 'var(--primary-gradient)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 6px 18px rgba(99, 102, 241, 0.35)',
            }}
          >
            <span>Launch Loan EMI Calculator</span>
            <ArrowRight size={16} />
          </a>
          <a
            href="/home-loan-prepayment-vs-sip"
            onClick={(e) => handleNav('home-loan-prepayment-vs-sip', e)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '12px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontWeight: 750,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <span>Prepayment vs SIP Calculator</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* FAQ Section */}
      <section id="faq" style={{ marginBottom: '40px', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px' }}>
          Frequently Asked Questions
        </h2>
        <GuideFaqItem
          question="When prepaying, should I choose Tenure Reduction or EMI Reduction?"
          answer="Always choose Tenure Reduction. Reducing your tenure keeps your EMI the same, which rapidly extinguishes the remaining principal and maximizes compound interest savings. EMI reduction lowers your monthly payment but stretches the loan over the original term, saving far less interest overall."
          defaultOpen={true}
        />
        <GuideFaqItem
          question="Can banks charge a penalty if I prepay my home loan early in India?"
          answer="No. Under RBI guidelines, commercial banks and HFCs cannot levy any prepayment charges or foreclosure penalties on floating-rate individual retail loans. Fixed-rate loans, business loans, or corporate borrowings may have different contractual terms."
        />
        <GuideFaqItem
          question="Is it better to prepay my home loan or claim the Section 24b tax deduction?"
          answer="The Section 24b tax deduction allows up to ₹2 Lakhs in home loan interest deduction under the Old Tax Regime. In the 30% tax bracket, that saves up to ₹62,400 per year. However, paying ₹4,00,000 in interest just to save ₹62,400 in taxes is a net loss of ₹3,37,600! Never hold debt solely for tax deductions."
        />
      </section>
    </article>
  );
};
