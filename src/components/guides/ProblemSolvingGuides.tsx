import React, { useState } from 'react';
import { Card } from '../common/Card';
import {
  Home,
  Scale,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Lock,
  Calendar,
  UserCheck,
} from 'lucide-react';

interface GuideFaqProps {
  question: string;
  answer: string | React.ReactNode;
  defaultOpen?: boolean;
}

const GuideFaqItem: React.FC<GuideFaqProps> = ({ question, answer, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        border: '1px solid var(--border-subtle)',
        borderRadius: '14px',
        backgroundColor: 'var(--bg-surface-elevated)',
        overflow: 'hidden',
        marginBottom: '12px',
        transition: 'all 0.2s ease',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-primary)',
          fontWeight: 700,
          fontSize: '0.98rem',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '12px',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <HelpCircle size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
          {question}
        </span>
        {isOpen ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
      </button>

      {isOpen && (
        <div
          style={{
            padding: '0 20px 18px 48px',
            color: 'var(--text-secondary)',
            fontSize: '0.92rem',
            lineHeight: 1.65,
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            marginTop: '4px',
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
};

const AuthorCard: React.FC<{ topic: string }> = ({ topic }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '14px 18px',
      borderRadius: '16px',
      backgroundColor: 'var(--bg-surface-elevated)',
      border: '1px solid var(--border-subtle)',
      marginBottom: '32px',
      flexWrap: 'wrap',
    }}
  >
    <div
      style={{
        width: '42px',
        height: '42px',
        borderRadius: '12px',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--primary)',
        flexShrink: 0,
      }}
    >
      <UserCheck size={22} />
    </div>
    <div style={{ flex: 1, minWidth: '240px' }}>
      <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-primary)' }}>
        Reviewed by Pocket Advisor Financial Engineering Team
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '2px' }}>
        <span>Verified for Indian Personal Finance &amp; Banking</span>
        <span>•</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Calendar size={13} /> September 2026
        </span>
        <span>•</span>
        <span>Topic: {topic}</span>
      </div>
    </div>
  </div>
);

interface GuideViewProps {
  slug: string;
  onNavigate?: (view: string) => void;
}

export const ProblemSolvingGuides: React.FC<GuideViewProps> = ({ slug, onNavigate }) => {
  const handleNav = (target: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    }
  };

  // -------------------------------------------------------------
  // GUIDE 1: Rent Splitting for Unequal Rooms
  // -------------------------------------------------------------
  if (slug === 'how-to-split-rent-unequal-rooms') {
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
          <span style={{ color: 'var(--text-secondary)' }}>Unequal Room Rent Split</span>
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
          <Home size={14} /> Roommate Personal Finance Guide
        </div>

        {/* H1 Heading */}
        <h1
          style={{
            fontSize: 'clamp(1.9rem, 4vw, 2.7rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            marginBottom: '14px',
          }}
        >
          How to Split Apartment Rent Fairly When Room Sizes Are Different
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          Master bedroom with an attached bathroom vs. a compact second bedroom: here is the mathematical 50/50 square-footage framework to eliminate roommate resentment and settle up via 1-tap UPI links.
        </p>

        {/* E-E-A-T Author Card */}
        <AuthorCard topic="Roommate Rent &amp; Utility Allocation" />

        {/* Section 1: The Problem */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Why Dividing Rent Equally Creates Resentment
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '14px' }}>
            When 2 to 4 flatmates lease a flat in urban hubs like Bengaluru, Mumbai, Pune, Hyderabad, or Delhi NCR, bedroom sizes are almost never equal. The master bedroom often boasts an ensuite bathroom, private balcony, and 180 sq ft of space, while the secondary or third bedroom might be a modest 100 sq ft room with a shared hallway washroom.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem' }}>
            Dividing a ₹45,000 rent check into a naive ₹15,000 equal three-way split leaves small room occupants feeling exploited. Conversely, guessing arbitrary numbers based on gut feelings leads to uncomfortable negotiations. You need an objective, repeatable mathematical formula.
          </p>
        </section>

        {/* Section 2: The Golden 50/50 Framework */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            The 50/50 Common vs. Private Space Formula
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '18px' }}>
            Top real estate economists and tenant associations recommend dividing the total monthly rent into two equal pools:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <Card style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Pool A: 50% Common Space
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                Living room, kitchen, shared balconies, dining area, and hallway. Everyone has equal access to these areas, so this 50% is divided <strong>equally by headcount</strong>.
              </p>
            </Card>

            <Card style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', marginBottom: '6px' }}>
                Pool B: 50% Private Bedroom Space
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                The private bedroom square footage. Weighted by room floor area, attached bathroom premiums (typically +10% to +15%), and dedicated balconies.
              </p>
            </Card>
          </div>

          <div
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'monospace',
              fontSize: '0.88rem',
              color: 'var(--primary)',
              lineHeight: 1.6,
            }}
          >
            Individual Rent = (Total Rent × 0.50 / N) + (Total Rent × 0.50 × WeightedRoomShare%)
          </div>
        </section>

        {/* Section 3: Worked Practical Example */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Worked Example: 3BHK Flat Renting for ₹45,000/Month
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '18px' }}>
            Let's calculate the exact rent breakdown for 3 roommates (Aman, Priya, and Rohan) sharing a 3BHK apartment in Bengaluru:
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                  <th style={{ padding: '12px 14px' }}>Roommate</th>
                  <th style={{ padding: '12px 14px' }}>Bedroom Specifications</th>
                  <th style={{ padding: '12px 14px' }}>Common Pool</th>
                  <th style={{ padding: '12px 14px' }}>Private Pool</th>
                  <th style={{ padding: '12px 14px', color: 'var(--primary)' }}>Fair Monthly Rent</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>Aman</td>
                  <td style={{ padding: '12px 14px' }}>Master Bedroom (180 sq ft + Ensuite Bath)</td>
                  <td style={{ padding: '12px 14px' }}>₹7,500</td>
                  <td style={{ padding: '12px 14px' }}>₹10,950</td>
                  <td style={{ padding: '12px 14px', fontWeight: 800, color: 'var(--primary)' }}>₹18,450</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>Priya</td>
                  <td style={{ padding: '12px 14px' }}>Standard Bedroom (130 sq ft, shared bath)</td>
                  <td style={{ padding: '12px 14px' }}>₹7,500</td>
                  <td style={{ padding: '12px 14px' }}>₹6,980</td>
                  <td style={{ padding: '12px 14px', fontWeight: 800, color: 'var(--primary)' }}>₹14,480</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>Rohan</td>
                  <td style={{ padding: '12px 14px' }}>Compact Bedroom (100 sq ft, shared bath)</td>
                  <td style={{ padding: '12px 14px' }}>₹7,500</td>
                  <td style={{ padding: '12px 14px' }}>₹4,570</td>
                  <td style={{ padding: '12px 14px', fontWeight: 800, color: 'var(--primary)' }}>₹12,070</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            style={{
              padding: '16px 20px',
              borderRadius: '14px',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            💡 <strong>The Result:</strong> Aman pays ₹18,450 for superior luxury and privacy, while Rohan saves over ₹2,900 every month in exchange for occupying the compact room. All 3 flatmates feel respected and satisfied.
          </div>
        </section>

        {/* Section 4: What About Utilities & Bills? */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Handling Variable Utilities: Maid, WiFi, and AC Power Bills
          </h2>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Fixed Utilities (Equal Split):</strong> High-speed broadband WiFi, cook salary, maid charges, and monthly water deliveries should be pooled and split 100% equally on the 1st of every month.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>AC Power Surcharges:</strong> If one flatmate runs an air conditioner 8 hours a night while others do not, baseline winter electricity bills determine shared consumption. The summer bill spike above baseline is assigned to the AC user.
            </li>
            <li>
              <strong>2-Stage Debt Minimization:</strong> When Aman pays the landlord rent, Priya pays the maid, and Rohan buys groceries, tangled cross-debts arise. Pocket Advisor simplifies this to the absolute fewest payments.
            </li>
          </ul>
        </section>

        {/* Section 5: Interactive Tool Call-to-Action */}
        <div
          style={{
            padding: '32px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)',
            border: '1.5px solid rgba(99, 102, 241, 0.3)',
            marginBottom: '48px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '10px' }}>
            <Sparkles size={16} /> Free Online Tool • Zero Login
          </div>
          <h3 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
            Calculate Your Roommate Split in 30 Seconds
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 22px auto', fontSize: '0.95rem', lineHeight: 1.55 }}>
            Put the formula to work right now. Use Pocket Advisor's free web rent splitter to adjust bedroom shares, add utility expenses, and generate 1-tap UPI payment WhatsApp receipts.
          </p>
          <a
            href="/flatmates-rent-splitter"
            onClick={(e) => handleNav('flatmates-rent-splitter', e)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 28px',
              backgroundColor: 'var(--primary-btn)',
              color: '#ffffff',
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
              transition: 'all 0.2s ease',
            }}
          >
            <span>Launch Flatmates Rent Splitter</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Section 6: FAQ Accordion */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="var(--primary)" /> Frequently Asked Questions: Roommate Splits
          </h3>

          <GuideFaqItem
            question="What if a couple occupies the master bedroom together?"
            answer="Count each partner as an individual head for common spaces. For example, in a flat with 3 rooms and 4 people (a couple in the master bedroom and 2 singles in other rooms), the 50% Common Space Pool is divided by 4. The couple then shares the master bedroom private space pool between themselves."
            defaultOpen={true}
          />
          <GuideFaqItem
            question="How should we adjust rent if one roommate works from home (WFH) full time?"
            answer="Roommates who work from home use more daytime electricity, air conditioning, and water. A fair convention is for the full-time WFH roommate to contribute an extra ₹500 to ₹1,000 toward the monthly utility pool rather than altering base room rent."
          />
          <GuideFaqItem
            question="Do my flatmates need to create an account or download an app to settle rent?"
            answer="No! The Pocket Advisor Web Splitter runs directly in any browser. You enter the numbers, tap 'Share to WhatsApp', and your flatmates receive a clean itemized receipt with instant UPI payment deep links."
          />
        </section>
      </article>
    );
  }

  // -------------------------------------------------------------
  // GUIDE 2: Home Loan Prepayment vs Mutual Funds (50:50 Strategy)
  // -------------------------------------------------------------
  if (slug === 'home-loan-prepayment-vs-mutual-funds') {
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
          <span style={{ color: 'var(--text-secondary)' }}>Prepayment vs. Mutual Funds</span>
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
          <Scale size={14} /> Wealth Engineering &amp; Debt Optimization
        </div>

        {/* H1 Heading */}
        <h1
          style={{
            fontSize: 'clamp(1.9rem, 4vw, 2.7rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            marginBottom: '14px',
          }}
        >
          Should You Prepay Your Home Loan or Invest in Mutual Funds?
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          The 50:50 hybrid strategy explained: how to balance risk-free interest savings with long-term equity compounding, income tax deductions under Section 24b, and interest rate spikes.
        </p>

        {/* E-E-A-T Author Card */}
        <AuthorCard topic="Home Loan Prepayment vs. Equity SIP Modeling" />

        {/* Section 1: The Dilemma */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            The Psychological Debt Trap vs. The Compounding Engine
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '14px' }}>
            A ₹50 Lakh home loan at 8.5% interest over 20 years incurs an astounding <strong>₹54.1 Lakhs in interest alone</strong> — more than the original borrowing amount. Staring at this figure, borrowers naturally feel an urgent urge to throw every spare rupee into prepaying the principal.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem' }}>
            However, equity mutual funds in India (represented by Nifty 50 and Nifty 500 indices) have historically delivered <strong>12% to 14% annualized CAGR</strong> over 10-to-20-year horizons. Overzealous home loan prepayment locks all your surplus liquid cash permanently into illiquid bricks and mortar.
          </p>
        </section>

        {/* Section 2: Comparison Matrix Table */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Side-by-Side Comparison: Prepayment vs. Equity SIP
          </h2>

          <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                  <th style={{ padding: '12px 14px' }}>Dimension</th>
                  <th style={{ padding: '12px 14px', color: '#10b981' }}>Home Loan Prepayment</th>
                  <th style={{ padding: '12px 14px', color: '#f59e0b' }}>Equity Mutual Fund SIP</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>Expected Return</td>
                  <td style={{ padding: '12px 14px' }}>Guaranteed ~8.5% (equal to loan rate)</td>
                  <td style={{ padding: '12px 14px' }}>Variable ~12%–14% historical CAGR</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>Liquidity</td>
                  <td style={{ padding: '12px 14px', color: '#ef4444' }}>Zero (Locked in real estate)</td>
                  <td style={{ padding: '12px 14px', color: '#10b981' }}>High (Redeemable in T+2 days)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>Tax Impact</td>
                  <td style={{ padding: '12px 14px' }}>May reduce Section 24b ₹2L interest shield</td>
                  <td style={{ padding: '12px 14px' }}>12.5% LTCG above ₹1.25L annual exemption</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>Psychological Value</td>
                  <td style={{ padding: '12px 14px' }}>Peace of mind, debt-free living</td>
                  <td style={{ padding: '12px 14px' }}>Wealth accumulation, financial independence</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: The 50:50 Hybrid Strategy */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            The 50:50 Hybrid Strategy: The Mathematical Sweet Spot
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '18px' }}>
            Instead of picking an extreme ("Prepay Everything" vs "Never Prepay"), the 50:50 Hybrid Strategy splits your monthly surplus into two parallel wealth streams:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '22px' }}>
            <Card style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', marginBottom: '6px' }}>
                Stream A: 50% Principal Prepayment
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Chops years off your loan tenure, drastically slashes total bank interest, and preserves peace of mind.
              </p>
            </Card>

            <Card style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', marginBottom: '6px' }}>
                Stream B: 50% Step-Up Equity SIP
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Compounding in high-quality index mutual funds, building a multi-crore liquid nest egg so you never suffer liquidity crunches.
              </p>
            </Card>
          </div>

          <div
            style={{
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.92rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
            }}
          >
            📊 <strong>The 20-Year Simulation (₹50L Loan @ 8.5% with ₹15,000 Surplus):</strong>
            <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
              <li><strong>100% Prepayment:</strong> Debt-free in ~9.5 years. Interest saved: ₹31 Lakhs. Liquid investment corpus: ₹0.</li>
              <li><strong>100% Mutual Funds:</strong> Loan runs 20 years. Accumulated SIP corpus: <strong>₹1.49 Crores</strong>.</li>
              <li><strong>50:50 Hybrid Strategy:</strong> Debt-free in ~13 years. Interest saved: ₹19 Lakhs AND accumulated mutual fund corpus of <strong>₹58 Lakhs</strong>!</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Three Golden Rules */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Three Golden Rules to Decide Your Strategy
          </h2>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem' }}>
            <li style={{ marginBottom: '10px' }}>
              <strong>Never prepay before building a 6-month emergency reserve:</strong> Once money is handed to the bank, you cannot withdraw it for medical emergencies or job transitions.
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Check your loan interest rate benchmark:</strong> If home loan rates are under 8.5%, mutual fund equity returns have a clear historical edge. If rates climb to 9.5%–10%+, increasing prepayment allocation is financially optimal.
            </li>
            <li>
              <strong>Remember RBI's zero prepayment penalty rule:</strong> Under Reserve Bank of India mandate, banks cannot penalize floating-rate retail borrowers for prepaying loan principal.
            </li>
          </ol>
        </section>

        {/* Section 5: Interactive Tool CTA */}
        <div
          style={{
            padding: '32px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)',
            border: '1.5px solid rgba(99, 102, 241, 0.3)',
            marginBottom: '48px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '10px' }}>
            <Scale size={16} /> Interactive Decision Engine
          </div>
          <h3 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
            Compare Prepayment vs. Equity SIP for Your Exact Loan
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 22px auto', fontSize: '0.95rem', lineHeight: 1.55 }}>
            Input your loan amount, interest rate, tenure, and monthly surplus into Pocket Advisor's free simulator to see your exact interest savings vs. mutual fund wealth creation.
          </p>
          <a
            href="/home-loan-prepayment-vs-sip"
            onClick={(e) => handleNav('home-loan-prepayment-vs-sip', e)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 28px',
              backgroundColor: 'var(--primary-btn)',
              color: '#ffffff',
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
              transition: 'all 0.2s ease',
            }}
          >
            <span>Run Prepayment vs. SIP Simulator</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Section 6: FAQ Accordion */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="var(--primary)" /> Frequently Asked Questions: Loan Prepayment
          </h3>

          <GuideFaqItem
            question="Should I choose tenure reduction or EMI reduction when prepaying?"
            answer="Always choose tenure reduction. Keeping your monthly EMI constant while shortening the loan tenure saves substantially more interest over the loan life. Reducing the EMI provides immediate monthly cash relief but extends interest costs."
            defaultOpen={true}
          />
          <GuideFaqItem
            question="What is the 1-extra-EMI-per-year prepayment hack?"
            answer="Paying just one extra monthly EMI directly toward principal every 12 months on a 20-year loan reduces your effective loan payoff timeline by approximately 4 years and saves over ₹12 Lakhs in interest!"
          />
          <GuideFaqItem
            question="How does the New Tax Regime affect home loan tax savings?"
            answer="Under the New Tax Regime, Section 24b (up to ₹2 Lakh interest deduction on self-occupied property) and Section 80C principal deductions are not available. This makes the effective loan cost equal to the nominal interest rate (~8.5%), making prepayments more attractive."
          />
        </section>
      </article>
    );
  }

  // -------------------------------------------------------------
  // GUIDE 3: Automatic UPI Tracking Without Netbanking Credentials
  // -------------------------------------------------------------
  if (slug === 'how-to-track-upi-payments-automatically') {
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
          <span style={{ color: 'var(--text-secondary)' }}>Automatic UPI Tracking Privacy</span>
        </nav>

        {/* Category Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            color: '#38bdf8',
            fontSize: '0.8rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '14px',
          }}
        >
          <ShieldCheck size={14} /> Android Security &amp; Privacy Architecture
        </div>

        {/* H1 Heading */}
        <h1
          style={{
            fontSize: 'clamp(1.9rem, 4vw, 2.7rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            marginBottom: '14px',
          }}
        >
          How to Track UPI Payments Automatically Without Giving Netbanking Credentials
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          Why cloud-based expense trackers and netbanking credential logins compromise your privacy, and how Pocket Advisor uses 100% on-device SMS parsing under Google Play's financial exception.
        </p>

        {/* E-E-A-T Author Card */}
        <AuthorCard topic="Zero-Trust Android Security &amp; SMS Expense Tracking" />

        {/* Section 1: The Privacy Trap */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            The Privacy Trap of Cloud-Based &amp; Credential-Scraping Apps
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '14px' }}>
            Most digital expense apps on the market use high-risk methods that compromise your financial privacy:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <Card style={{ padding: '20px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
              <h3 style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.94rem', marginBottom: '8px' }}>
                ❌ Risk 1: Netbanking Credential Logins
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
                Many apps ask for your netbanking customer ID and password to screen-scrape balances, uploading your credentials to cloud servers where leaks can prove catastrophic.
              </p>
            </Card>

            <Card style={{ padding: '20px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
              <h3 style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.94rem', marginBottom: '8px' }}>
                ❌ Risk 2: Cloud SMS Harvesting &amp; Telemetry
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
                Traditional trackers upload your SMS messages to remote cloud servers to build user spending profiles and sell credit card and loan leads to financial aggregators.
              </p>
            </Card>
          </div>
        </section>

        {/* Section 2: How Pocket Advisor Does It */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            The Zero-Trust Architecture: 100% On-Device SMS Parsing
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '16px' }}>
            Pocket Advisor operates on a privacy-by-design architecture under Google Play's strict <em>SMS-based money management</em> policy:
          </p>

          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '22px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Explicit In-App Consent:</strong> Automatic SMS tracking is completely optional and disabled by default. It activates only when you explicitly grant permission after reviewing our transparent in-app disclosure.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>100% On-Device Regex Parsing:</strong> When a bank debit or credit SMS arrives, Pocket Advisor's <code>SmsReceiver</code> and <code>SmsParser</code> process the text locally in memory in under 50 milliseconds using deterministic regex patterns.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Immediate In-Memory OTP Discard:</strong> Non-financial messages, personal chats, and all two-factor authentication OTPs are discarded in volatile memory immediately. They are never written to disk or logged.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Encrypted Local Storage:</strong> Parsed expense amounts, merchants, and categories are saved directly to an on-device Room database protected by SQLCipher AES-256 encryption.
            </li>
            <li>
              <strong>Zero Cloud Uploads:</strong> No raw SMS texts, transaction logs, or spending balances are ever sent to remote servers or third-party analytics services.
            </li>
          </ol>
        </section>

        {/* Section 3: Security Comparison Matrix */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Security Matrix: Pocket Advisor vs. Traditional Trackers
          </h2>

          <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                  <th style={{ padding: '12px 14px' }}>Security Feature</th>
                  <th style={{ padding: '12px 14px', color: 'var(--primary)' }}>Pocket Advisor</th>
                  <th style={{ padding: '12px 14px', color: '#ef4444' }}>Cloud SMS Trackers</th>
                  <th style={{ padding: '12px 14px', color: '#ef4444' }}>Netbanking Login Apps</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>Bank Passwords / Credentials</td>
                  <td style={{ padding: '12px 14px', color: '#10b981', fontWeight: 700 }}>Never Requested (Zero)</td>
                  <td style={{ padding: '12px 14px' }}>None</td>
                  <td style={{ padding: '12px 14px', color: '#ef4444' }}>Required &amp; Stored on Cloud</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>SMS Processing Location</td>
                  <td style={{ padding: '12px 14px', color: '#10b981', fontWeight: 700 }}>100% On-Device (Local)</td>
                  <td style={{ padding: '12px 14px', color: '#ef4444' }}>Uploaded to Cloud Server</td>
                  <td style={{ padding: '12px 14px' }}>N/A (Screen Scraping)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>OTP &amp; Personal Chat Handling</td>
                  <td style={{ padding: '12px 14px', color: '#10b981', fontWeight: 700 }}>Instantly Dropped in Memory</td>
                  <td style={{ padding: '12px 14px', color: '#ef4444' }}>Uploaded with Full Inbox</td>
                  <td style={{ padding: '12px 14px', color: '#ef4444' }}>Intercepted for Session Auth</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>Database Encryption</td>
                  <td style={{ padding: '12px 14px', color: '#10b981', fontWeight: 700 }}>SQLCipher AES-256 (Local)</td>
                  <td style={{ padding: '12px 14px' }}>Server-Side Managed</td>
                  <td style={{ padding: '12px 14px' }}>Server-Side Managed</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>Financial Data Monetization</td>
                  <td style={{ padding: '12px 14px', color: '#10b981', fontWeight: 700 }}>Zero Selling / Zero Ads</td>
                  <td style={{ padding: '12px 14px', color: '#ef4444' }}>Loan &amp; Credit Card Leads</td>
                  <td style={{ padding: '12px 14px', color: '#ef4444' }}>Affiliate Lead Generation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: 4-Step Setup Guide */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Setting Up Automatic Tracking in Under 60 Seconds
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <Card style={{ padding: '18px', borderRadius: '16px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '6px' }}>STEP 1</div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Install Pocket Advisor for Android. No mandatory account creation or phone number required.
              </p>
            </Card>
            <Card style={{ padding: '18px', borderRadius: '16px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', marginBottom: '6px' }}>STEP 2</div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Enable automatic SMS expense tracking after reviewing the transparent in-app disclosure dialog.
              </p>
            </Card>
            <Card style={{ padding: '18px', borderRadius: '16px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', marginBottom: '6px' }}>STEP 3</div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Pay using UPI (Google Pay, PhonePe, Paytm), debit/credit card, or netbanking as you normally do.
              </p>
            </Card>
            <Card style={{ padding: '18px', borderRadius: '16px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', marginBottom: '6px' }}>STEP 4</div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                When your bank sends an SMS confirmation, Pocket Advisor parses the amount and merchant locally, instantly updating your budget.
              </p>
            </Card>
          </div>
        </section>

        {/* Section 5: App Download CTA */}
        <div
          style={{
            padding: '32px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)',
            border: '1.5px solid rgba(56, 189, 248, 0.3)',
            marginBottom: '48px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '10px' }}>
            <Lock size={16} /> 100% Private Ledger
          </div>
          <h3 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
            Experience 1-Tap Private UPI Expense Tracking
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 22px auto', fontSize: '0.95rem', lineHeight: 1.55 }}>
            Never enter manual transactions again. Get automated UPI logging, biometric app lock, and SQLCipher AES-256 local encryption on Android.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/download"
              onClick={(e) => handleNav('download', e)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 28px',
                backgroundColor: 'var(--primary-btn)',
                color: '#ffffff',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Download Pocket Advisor Free</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="/features"
              onClick={(e) => handleNav('features', e)}
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
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Explore Features &amp; Architecture</span>
            </a>
          </div>
        </div>

        {/* Section 6: FAQ Accordion */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="var(--primary)" /> Frequently Asked Questions: Privacy &amp; Tracking
          </h3>

          <GuideFaqItem
            question="Can Pocket Advisor read my banking OTPs or private personal text messages?"
            answer="No! Pocket Advisor's on-device parser specifically looks for bank debit/credit confirmation patterns from verified financial sender IDs (such as VK-HDFCBK, VK-SBIBNK, BT-BDNSMS). All OTPs, two-factor authentication codes, and personal chats are instantly discarded in volatile memory and never stored or uploaded."
            defaultOpen={true}
          />
          <GuideFaqItem
            question="Does Pocket Advisor work offline without an active internet connection?"
            answer="Yes, 100%. All transaction parsing, database insertion, category calculations, and charts are processed entirely by your device's local CPU. No internet connection is required to track expenses."
          />
          <GuideFaqItem
            question="What happens if I switch Android devices in the future?"
            answer="Pocket Advisor provides built-in encrypted local backup and export options. You can export an encrypted backup file, password-protected PDF statements, or raw CSV spreadsheets and import them onto your new device."
          />
        </section>
      </article>
    );
  }

  // -------------------------------------------------------------
  // GUIDES INDEX / HUB VIEW (/guides)
  // -------------------------------------------------------------
  return (
    <div
      style={{
        maxWidth: '1040px',
        margin: '0 auto',
        padding: 'clamp(28px, 4vw, 56px) clamp(16px, 3vw, 24px)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            color: 'var(--primary)',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '14px',
          }}
        >
          <BookOpen size={15} /> People-First Financial Engineering Guides
        </div>
        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.9rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em',
            marginBottom: '14px',
          }}
        >
          Problem-Solving Financial Guides
        </h1>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          In-depth, mathematically verified guides solving real personal finance challenges: unequal roommate rent splits, home loan prepayment vs. mutual fund investing, and private on-device UPI tracking.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Guide Card 1 */}
        <Card
          style={{
            padding: '28px',
            borderRadius: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid var(--border-subtle)',
            transition: 'all 0.25s ease',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '8px', backgroundColor: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)', textTransform: 'uppercase' }}>
                Roommates
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>6 min read</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', lineHeight: 1.35 }}>
              <a
                href="/how-to-split-rent-unequal-rooms"
                onClick={(e) => handleNav('how-to-split-rent-unequal-rooms', e)}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                How to Split Apartment Rent Fairly When Room Sizes Are Different
              </a>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Master bedroom vs. small bedroom: the mathematical 50/50 square-footage framework, attached bathroom weighting, and 1-tap WhatsApp settlements.
            </p>
          </div>
          <a
            href="/how-to-split-rent-unequal-rooms"
            onClick={(e) => handleNav('how-to-split-rent-unequal-rooms', e)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--primary)',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <span>Read Complete Rent Guide</span>
            <ArrowRight size={15} />
          </a>
        </Card>

        {/* Guide Card 2 */}
        <Card
          style={{
            padding: '28px',
            borderRadius: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid var(--border-subtle)',
            transition: 'all 0.25s ease',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '8px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', textTransform: 'uppercase' }}>
                Debt vs Wealth
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>8 min read</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', lineHeight: 1.35 }}>
              <a
                href="/home-loan-prepayment-vs-mutual-funds"
                onClick={(e) => handleNav('home-loan-prepayment-vs-mutual-funds', e)}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Should You Prepay Your Home Loan or Invest in Mutual Funds?
              </a>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              The 50:50 hybrid strategy explained: balancing guaranteed debt reduction with mutual fund compounding, Section 24b tax reality, and rising interest cycles.
            </p>
          </div>
          <a
            href="/home-loan-prepayment-vs-mutual-funds"
            onClick={(e) => handleNav('home-loan-prepayment-vs-mutual-funds', e)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--primary)',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <span>Read 50:50 Strategy Guide</span>
            <ArrowRight size={15} />
          </a>
        </Card>

        {/* Guide Card 3 */}
        <Card
          style={{
            padding: '28px',
            borderRadius: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid var(--border-subtle)',
            transition: 'all 0.25s ease',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '8px', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', textTransform: 'uppercase' }}>
                Privacy &amp; Security
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>5 min read</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', lineHeight: 1.35 }}>
              <a
                href="/how-to-track-upi-payments-automatically"
                onClick={(e) => handleNav('how-to-track-upi-payments-automatically', e)}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                How to Track UPI Payments Automatically Without Netbanking Passwords
              </a>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Why cloud-based SMS harvesting is dangerous, and how Pocket Advisor's 100% on-device SMS parser logs expenses privately with zero cloud uploads.
            </p>
          </div>
          <a
            href="/how-to-track-upi-payments-automatically"
            onClick={(e) => handleNav('how-to-track-upi-payments-automatically', e)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--primary)',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <span>Read UPI Security Guide</span>
            <ArrowRight size={15} />
          </a>
        </Card>
      </div>
    </div>
  );
};
