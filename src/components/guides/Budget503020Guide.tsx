import React from 'react';
import {
  PieChart,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { GuideFaqItem, AuthorCard, TableOfContents } from './ProblemSolvingGuides';

interface Budget503020GuideProps {
  onNavigate?: (view: string) => void;
}

export const Budget503020Guide: React.FC<Budget503020GuideProps> = ({ onNavigate }) => {
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
        <span style={{ color: 'var(--text-secondary)' }}>50/30/20 Budgeting Rule for India</span>
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
        <PieChart size={14} /> Personal Finance &amp; Budgeting Guide
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
        How to Create a Monthly Budget Using the 50/30/20 Rule: Indian Salary Guide
      </h1>

      <p
        style={{
          fontSize: '1.08rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '28px',
        }}
      >
        From ₹30,000 entry-level salaries in Tier-2 cities to ₹2,00,000 executive packages in Bengaluru and Mumbai:
        here is how to divide Indian take-home pay across Needs, Wants, and Investments without feeling financially restricted.
      </p>

      {/* Author Card */}
      <AuthorCard topic="Indian Household Budgeting &amp; Cashflow Allocation" />

      {/* Table of Contents */}
      <TableOfContents
        items={[
          { id: 'what-is-503020', label: '1. What is the 50/30/20 Budgeting Framework?' },
          { id: 'indian-metro-reality', label: '2. The Indian Metro Reality: Rent & High Living Costs' },
          { id: 'salary-breakdown-table', label: '3. Real Indian Salary Breakdowns (₹30K to ₹2L)' },
          { id: 'bucket-needs', label: '4. The 50% Needs Bucket: Essential Non-Negotiables' },
          { id: 'bucket-wants', label: '5. The 30% Wants Bucket: Guilt-Free Lifestyle' },
          { id: 'bucket-savings', label: '6. The 20% Savings & Compounding Wealth Bucket' },
          { id: 'automation-tool', label: '7. How Pocket Advisor Tracks 50/30/20 on Android' },
          { id: 'faq', label: '8. Frequently Asked Questions' },
        ]}
      />

      {/* Section 1: The Framework */}
      <section id="what-is-503020" style={{ marginBottom: '36px', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
          1. What is the 50/30/20 Budgeting Framework?
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '14px' }}>
          Originally conceptualized by Senator Elizabeth Warren, the 50/30/20 rule is an intuitive budgeting framework
          that divides your <strong>post-tax, take-home salary</strong> into three distinct operational buckets:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '18px' }}>
          <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>50% Needs</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 6px' }}>Survival Essentials</div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Rent, groceries, utility bills, mandatory school fees, minimum loan EMIs, and health insurance.</div>
          </div>
          <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase' }}>30% Wants</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 6px' }}>Lifestyle &amp; Joy</div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Dining out, Swiggy/Zomato deliveries, weekend trips, OTT subscriptions (Netflix/Hotstar), and gadgets.</div>
          </div>
          <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>20% Savings</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 6px' }}>Compounding Wealth</div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Mutual fund SIPs, emergency fund reserve, PPF, NPS, and accelerated debt prepayments.</div>
          </div>
        </div>
      </section>

      {/* Section 2: Metro Realities */}
      <section id="indian-metro-reality" style={{ marginBottom: '36px', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
          2. The Indian Metro Reality: Adjusting for High Rent
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '14px' }}>
          In western economies where health insurance is heavily subsidized and public transport is universal, 50% for needs is straightforward.
          However, for young professionals living in Mumbai, Bengaluru, Gurugram, or Hyderabad, rent alone can consume 35% to 45% of entry-level salaries.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '14px' }}>
          If your rent pushes your needs to 60%, don't abandon budgeting entirely. Instead, adopt the <strong>Indian Adaptive 60/20/20 Ratio</strong>:
          cap your discretionary wants at 20% while maintaining the sacred 20% investment discipline. As your salary increases, scale back to 50/30/20.
        </p>
      </section>

      {/* Section 3: Salary Breakdown Table */}
      <section id="salary-breakdown-table" style={{ marginBottom: '36px', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
          3. Real Indian Monthly Take-Home Salary Breakdowns
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '16px' }}>
          Here is how standard take-home salaries (net of EPF and professional tax) break down using the 50/30/20 framework:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '18px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                <th style={{ padding: '12px 14px' }}>Monthly In-Hand</th>
                <th style={{ padding: '12px 14px', color: '#0284c7' }}>50% Needs (Max)</th>
                <th style={{ padding: '12px 14px', color: '#f59e0b' }}>30% Wants (Limit)</th>
                <th style={{ padding: '12px 14px', color: '#10b981' }}>20% Savings (Min)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 800 }}>₹30,000</td>
                <td style={{ padding: '12px 14px' }}>₹15,000</td>
                <td style={{ padding: '12px 14px' }}>₹9,000</td>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#10b981' }}>₹6,000</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 800 }}>₹50,000</td>
                <td style={{ padding: '12px 14px' }}>₹25,000</td>
                <td style={{ padding: '12px 14px' }}>₹15,000</td>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#10b981' }}>₹10,000</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 800 }}>₹1,00,000</td>
                <td style={{ padding: '12px 14px' }}>₹50,000</td>
                <td style={{ padding: '12px 14px' }}>₹30,000</td>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#10b981' }}>₹20,000</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 800 }}>₹2,00,000</td>
                <td style={{ padding: '12px 14px' }}>₹1,00,000</td>
                <td style={{ padding: '12px 14px' }}>₹60,000</td>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#10b981' }}>₹40,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Needs */}
      <section id="bucket-needs" style={{ marginBottom: '36px', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
          4. The 50% Needs Bucket: Essential Non-Negotiables
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '12px' }}>
          Needs are expenses you cannot avoid without direct legal, health, or shelter consequences.
        </p>
        <ul style={{ paddingLeft: '22px', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.94rem' }}>
          <li><strong>Apartment Rent / Maintenance:</strong> Including society charges, water, and domestic electricity.</li>
          <li><strong>Groceries &amp; Cooking Gas:</strong> Basic pantry essentials (flour, rice, dal, vegetables, LPG cylinder).</li>
          <li><strong>Commute to Office:</strong> Metro cards, bus passes, or basic two-wheeler fuel.</li>
          <li><strong>Insurance Premiums:</strong> Pure Term Life Insurance and Family Floater Health Insurance.</li>
          <li><strong>Minimum Loan EMIs:</strong> Home loan, car loan, or education loan contractual obligations.</li>
        </ul>
      </section>

      {/* Section 5: Wants */}
      <section id="bucket-wants" style={{ marginBottom: '36px', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
          5. The 30% Wants Bucket: Guilt-Free Lifestyle
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '12px' }}>
          Wants improve your quality of life but are not strictly mandatory for survival. Keeping them within 30% ensures you enjoy life without accumulating high-interest credit card debt.
        </p>
        <ul style={{ paddingLeft: '22px', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.94rem' }}>
          <li><strong>Food Delivery &amp; Weekend Cafes:</strong> Swiggy, Zomato, Starbucks, and dinner with friends.</li>
          <li><strong>Digital Subscriptions:</strong> Netflix, Spotify, Amazon Prime, YouTube Premium.</li>
          <li><strong>Shopping &amp; Apparel:</strong> Clothing upgrades, shoes, and trendy electronics.</li>
          <li><strong>Vacations &amp; Road Trips:</strong> Weekend getaways, flight tickets, and hotel bookings.</li>
        </ul>
      </section>

      {/* Section 6: Savings */}
      <section id="bucket-savings" style={{ marginBottom: '36px', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
          6. The 20% Savings &amp; Compounding Wealth Bucket
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '12px' }}>
          This 20% is your future freedom fund. Follow a strict order of priority for maximum safety:
        </p>
        <ol style={{ paddingLeft: '22px', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.94rem' }}>
          <li style={{ marginBottom: '8px' }}><strong>Build a 6-Month Emergency Fund:</strong> Stored in high-yield liquid funds or sweep-in FDs before investing in stocks.</li>
          <li style={{ marginBottom: '8px' }}><strong>Equity Mutual Fund SIPs:</strong> Broad-market index funds (Nifty 50) compounding over 10–20 year horizons.</li>
          <li style={{ marginBottom: '8px' }}><strong>Guaranteed Tax-Saving Instruments:</strong> PPF, Sukanya Samriddhi Yojana (SSY), and Tier-1 NPS.</li>
          <li><strong>Extra Principal Prepayments:</strong> Adding ₹5,000–₹10,000 extra to home loan principal to save massive interest.</li>
        </ol>
      </section>

      {/* Tool CTA Card */}
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
          <Sparkles size={15} /> Free Interactive Tool
        </div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Simulate Your Own 50/30/20 Plan Online
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
          Enter your exact monthly income in our free web planner to calculate instant category limits, daily safe spend targets, and printable budget blueprints.
        </p>
        <div>
          <a
            href="/monthly-budget-planner"
            onClick={(e) => handleNav('monthly-budget-planner', e)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 22px',
              borderRadius: '12px',
              background: 'var(--primary-gradient)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 6px 18px rgba(99, 102, 241, 0.35)',
            }}
          >
            <span>Launch Free 50/30/20 Budget Planner</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* FAQ Section */}
      <section id="faq" style={{ marginBottom: '40px', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px' }}>
          Frequently Asked Questions
        </h2>
        <GuideFaqItem
          question="Does my home loan EMI count as a Need or Savings?"
          answer="A home loan EMI consists of two parts: Interest and Principal. The interest is an unavoidable cost of capital (Need). The principal portion actually builds home equity (Savings). However, for simple day-to-day budgeting, treat your contractual monthly EMI as a Need so your bank balance never defaults. Extra prepayments above the mandatory EMI count as Savings."
          defaultOpen={true}
        />
        <GuideFaqItem
          question="What if rent alone takes 40% of my salary in Mumbai or Bengaluru?"
          answer="Adopt the Indian Adaptive 60/20/20 rule. Allocate 60% to Needs, cut your Wants down to 20%, and keep 20% for Savings. Never drop your savings below 15-20%, because inflation will otherwise erode your future purchasing power."
        />
        <GuideFaqItem
          question="How do I budget irregular Diwali bonuses or variable sales commissions?"
          answer="Never budget your monthly lifestyle on expected variable bonuses. Base your 50/30/20 numbers strictly on guaranteed fixed take-home pay. When variable bonuses arrive, allocate 80% directly into your 20% Wealth Bucket (prepaying loans or lump-sum SIPs) and enjoy 20% as guilt-free celebration."
        />
      </section>
    </article>
  );
};
