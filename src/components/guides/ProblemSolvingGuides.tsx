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
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Smartphone,
  Download,
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
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '28px' }}>
          Looking for an Android app to organize eligible bank transaction alerts? Explore the{' '}
          <a href="/upi-expense-tracker" onClick={(e) => handleNav('upi-expense-tracker', e)} style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}>
            Pocket Advisor UPI Expense Tracker
          </a>{' '}
          to learn how supported-message parsing and privacy controls work.
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
  // GUIDE 4: Expense Tracker Architectures in India (2026 Comparison)
  // -------------------------------------------------------------
  if (slug === 'best-expense-tracker-apps-india' || slug === 'best-expense-tracker-apps' || slug === 'expense-tracker-apps-india') {
    return (
      <article
        style={{
          maxWidth: '920px',
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
          <span style={{ color: 'var(--text-secondary)' }}>Expense Tracker Apps Comparison (2026)</span>
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
          <Layers size={14} /> Architectural &amp; Category Evaluation (2026)
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
          Best Expense Tracker Apps in India (2026): An Architectural Comparison
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          An honest, technical evaluation of India&apos;s 4 dominant personal finance architectures: on-device SMS parsers, Account Aggregators (AA), cloud credit marketplaces, and manual web tools. Compare privacy, cloud sync options, and business models.
        </p>

        {/* E-E-A-T Author Card */}
        <AuthorCard topic="Indian Personal Finance Engineering &amp; Data Architectures" />

        {/* Section 1: The 30-Second Bottom Line */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            The 30-Second Summary: Which Category Fits Your Needs?
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '18px' }}>
            Rather than looking at marketing slogans, picking an expense tracker in India comes down to which underlying technical architecture and business model matches your daily habits:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '14px', marginBottom: '24px' }}>
            <Card style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.35)', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', textTransform: 'uppercase' }}>
                  Category 1: Offline-First SMS
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                On-Device SMS + Optional Cloud
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                <em>Primary Example: Pocket Advisor</em>. Parses bank &amp; UPI SMS locally on-device with SQLCipher AES-256 encryption. Works 100% offline, offers optional encrypted cloud sync, and includes bill splitting. Ad-supported free tier with Pro ad-free upgrade; zero loan telemarketing.
              </p>
            </Card>

            <Card style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', textTransform: 'uppercase' }}>
                  Category 2: Account Aggregators
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                RBI Account Aggregator Apps
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                <em>Primary Example: Fold Money</em>. Connects to banks via RBI-regulated Account Aggregators (Setu, OneMoney) with OTP consent. Clean cross-platform UI (iOS &amp; Android), zero SMS access needed. Requires an annual subscription fee (~₹1,500+/yr).
              </p>
            </Card>

            <Card style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', textTransform: 'uppercase' }}>
                  Category 3: Cloud Credit Hubs
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                Cloud FinTech &amp; Lending Hubs
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                <em>Examples: Moneyview, Axio</em>. Tracks SMS and bank balances while syncing financial telemetry to corporate cloud databases to offer instant personal loans, credit lines, and free credit score updates. Expect in-app loan marketing.
              </p>
            </Card>

            <Card style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', textTransform: 'uppercase' }}>
                  Category 4: Manual Web Tools
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                Manual Web &amp; Desktop Ledgers
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                <em>Example: Mera Kharcha</em>. Allows logging income and expenses manually on desktop browsers and mobile devices. Good for family bookkeeping; requires ongoing manual entry discipline and cloud storage.
              </p>
            </Card>
          </div>
        </section>

        {/* Section 2: Architectural Breakdown */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Why Personal Finance in India is Architecturally Unique
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '16px' }}>
            In Western markets, apps connect to banks via unified aggregation APIs like Plaid or Salt Edge. In India, consumer open-banking APIs do not exist in that format. Furthermore, with over 15 billion monthly UPI transactions, Indian consumers make dozens of micro-transactions daily (₹15 tea, ₹120 quick groceries, ₹180 auto rickshaw).
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '18px' }}>
            This has led to four distinct architectural approaches in the Indian market:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#10b981" /> 1. On-Device Deterministic Regex Parsing
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Whenever a transaction occurs, your bank issues a confirmation SMS. Apps in this category parse that SMS directly inside the phone processor using local regex patterns, storing records in an encrypted on-device database (SQLCipher AES-256). Apps like <strong>Pocket Advisor</strong> operate 100% offline-first, while giving users the flexibility to enable optional encrypted cloud backups for multi-device recovery.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="#38bdf8" /> 2. The RBI Account Aggregator (AA) Ecosystem
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Licensed under RBI guidelines, Account Aggregators allow apps (like Fold) to retrieve structured financial statements directly from partner bank APIs with explicit OTP consent. This enables automated tracking on iOS devices without SMS permissions, but requires ongoing subscription fees to cover the recurring costs of querying bank API infrastructure.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={18} color="#f59e0b" /> 3. Cloud FinTech &amp; Credit Underwriting Marketplaces
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Popular services (such as Moneyview and Axio) sync SMS alerts and statements to cloud infrastructure. The upside is multi-device backup and integrated credit score monitoring. The trade-off is the business model: users frequently receive pre-approved personal loan offers and credit card notifications based on their verified spending habits.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={18} color="#8b5cf6" /> 4. Manual Web &amp; Desktop Accounting
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Traditional software (like Mera Kharcha) that focuses on deliberate manual logging across desktop web browsers and mobile apps. It avoids permission sensitivities entirely, though it requires users to maintain the discipline of entering small daily purchases by hand.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Feature Matrix Table */}
        <section style={{ marginBottom: '44px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Architectural Category Comparison Matrix
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '18px' }}>
            Factual breakdown across core technical, privacy, and economic dimensions (October 2026).
          </p>

          <div
            style={{
              overflowX: 'auto',
              borderRadius: '16px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            }}
          >
            <table style={{ width: '100%', minWidth: '780px', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                  <th style={{ padding: '14px 16px', fontWeight: 800 }}>Evaluation Metric</th>
                  <th style={{ padding: '14px 16px', fontWeight: 800, color: 'var(--primary)', background: 'rgba(99, 102, 241, 0.08)' }}>Offline-First SMS (e.g. Pocket Advisor)</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>Account Aggregator (e.g. Fold)</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>Cloud Credit Hubs (e.g. Moneyview, Axio)</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>Manual Web Tools (e.g. Mera Kharcha)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Tracking Mechanism</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#10b981', background: 'rgba(99, 102, 241, 0.04)' }}>On-Device SMS Regex (Android)</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>RBI Account Aggregator APIs</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Cloud-Parsed SMS &amp; Statements</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Manual Entry (+ basic SMS)</td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Data Storage &amp; Sync</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#10b981', background: 'rgba(99, 102, 241, 0.04)' }}>Local SQLCipher + Optional Cloud Backup</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Cloud Database</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Cloud Servers (Lending Underwriting DB)</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Cloud Database</td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Bank Credentials / Consent</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#10b981', background: 'rgba(99, 102, 241, 0.04)' }}>Zero Logins (Local SMS Alert Filter)</td>
                  <td style={{ padding: '12px 16px', color: '#f59e0b' }}>Phone OTP + RBI AA Consent</td>
                  <td style={{ padding: '12px 16px', color: '#f59e0b' }}>Phone OTP + Cloud SMS Permissions</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>User Email / Password</td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Monetization &amp; Ads</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--primary)', background: 'rgba(99, 102, 241, 0.04)' }}>Ad-Supported Free / Optional Ad-Free Pro</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Paid Subscription (~₹1,500–₹2,500/yr)</td>
                  <td style={{ padding: '12px 16px', color: '#f59e0b' }}>Free (Monetized via Personal Loans/Cards)</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Free with Ads / Pro Upgrade</td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Loan Telemarketing Calls?</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#10b981', background: 'rgba(99, 102, 241, 0.04)' }}>Zero Loan Sales / No NBFC Sharing</td>
                  <td style={{ padding: '12px 16px', color: '#10b981' }}>Zero Loan Sales (Subscription model)</td>
                  <td style={{ padding: '12px 16px', color: '#ef4444' }}>Frequent In-App Loan &amp; Card Prompts</td>
                  <td style={{ padding: '12px 16px', color: '#10b981' }}>No Loan Sales</td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Group Bill Splitting</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--primary)', background: 'rgba(99, 102, 241, 0.04)' }}>Built-in 2-Stage Greedy Debt Minimization</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>Not Available</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Basic or Bill Reminders</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Basic Group Ledger</td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Offline Usability</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#10b981', background: 'rgba(99, 102, 241, 0.04)' }}>100% Functional Without Internet</td>
                  <td style={{ padding: '12px 16px', color: '#ef4444' }}>No (Requires Active AA Server)</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Partial (Requires Cloud Sync)</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Partial (Requires Web Connection)</td>
                </tr>

                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Supported Platforms</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--primary)', background: 'rgba(99, 102, 241, 0.04)' }}>Android Native + Free Web Tools</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Android + iOS</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Android + iOS</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Desktop Web + Android + iOS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Detailed Category Breakdowns */}
        <section style={{ marginBottom: '44px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px' }}>
            In-Depth Analysis of Each Architecture
          </h2>

          {/* Category 1 */}
          <div style={{ marginBottom: '28px', padding: '24px', borderRadius: '18px', background: 'var(--bg-surface-elevated)', border: '1px solid rgba(99, 102, 241, 0.35)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Category 1
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 0 0' }}>
                  Offline-First SMS Trackers with Optional Cloud Sync (e.g. Pocket Advisor)
                </h3>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, padding: '4px 10px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                Privacy &amp; Efficiency Leader
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '16px' }}>
              Apps in this space focus on maximum data control. Pocket Advisor parses transaction SMS alerts from 15+ Indian banks and UPI applications (Google Pay, PhonePe, Paytm, BHIM) directly on your device. Storage is secured locally with 256-bit SQLCipher encryption. For users wanting multi-device sync, an optional encrypted Cloud Backup can be toggled on at will.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#10b981', fontSize: '0.86rem', marginBottom: '6px' }}>
                  <CheckCircle2 size={16} /> Key Strengths
                </div>
                <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  <li>100% offline-first functionality without needing an active data connection</li>
                  <li>Local SQLCipher AES-256 database encryption</li>
                  <li>Optional encrypted cloud backup for seamless multi-device restoration</li>
                  <li>Integrated 2-stage greedy debt minimization for group bill splitting</li>
                  <li>Clean ad-supported free tier with optional ad-free Pro upgrade</li>
                  <li>Zero personal loan marketing or NBFC credit underwriting</li>
                </ul>
              </div>

              <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#f59e0b', fontSize: '0.86rem', marginBottom: '6px' }}>
                  <AlertCircle size={16} /> Realistic Trade-offs
                </div>
                <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  <li>Free tier includes standard display ads (removable via Pro tier)</li>
                  <li>Automated SMS parsing is Android-only due to Apple&apos;s iOS sandbox restrictions</li>
                  <li>Requires granting SMS permission on initial Android setup</li>
                </ul>
              </div>
            </div>

            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <strong>Best suited for:</strong> Android users who want automated UPI tracking, group bill splitting, and complete freedom from loan telemarketing calls.
            </div>
          </div>

          {/* Category 2 */}
          <div style={{ marginBottom: '28px', padding: '24px', borderRadius: '18px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Category 2
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 0 0' }}>
                  RBI Account Aggregator Apps (e.g. Fold Money)
                </h3>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, padding: '4px 10px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                Cross-Platform Bank Sync
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '16px' }}>
              The newest wave of Indian personal finance tools connects directly to bank accounts via the RBI Account Aggregator framework. Users give OTP consent to fetch account balances and statements directly from participating banks, eliminating the need to read SMS text messages.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#10b981', fontSize: '0.86rem', marginBottom: '6px' }}>
                  <CheckCircle2 size={16} /> Key Strengths
                </div>
                <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  <li>Works on both iOS and Android with identical feature sets</li>
                  <li>Direct bank server connection; zero SMS permissions required</li>
                  <li>Modern, clutter-free user interfaces with zero advertising</li>
                </ul>
              </div>

              <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#f59e0b', fontSize: '0.86rem', marginBottom: '6px' }}>
                  <AlertCircle size={16} /> Realistic Trade-offs
                </div>
                <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  <li>Requires a recurring annual paid subscription (~₹1,500 – ₹2,500/year)</li>
                  <li>Dependent on bank API uptimes; sync delays occur during bank maintenance</li>
                  <li>Does not support group debt minimization or roommate bill splits</li>
                </ul>
              </div>
            </div>

            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <strong>Best suited for:</strong> iPhone users and design purists who want automated bank tracking and are comfortable paying an annual subscription for bank API connectivity.
            </div>
          </div>

          {/* Category 3 */}
          <div style={{ marginBottom: '28px', padding: '24px', borderRadius: '18px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Category 3
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 0 0' }}>
                  Cloud FinTech &amp; Credit Marketplaces (e.g. Moneyview, Axio)
                </h3>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, padding: '4px 10px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                Credit &amp; Lending Focus
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '16px' }}>
              These platforms pair SMS/statement expense tracking with credit line services. They provide real-time balance overviews, credit card due date alerts, and free monthly credit bureau score checks, funded primarily through digital lending products.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#10b981', fontSize: '0.86rem', marginBottom: '6px' }}>
                  <CheckCircle2 size={16} /> Key Strengths
                </div>
                <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  <li>Free monthly CIBIL/Experian credit score tracking</li>
                  <li>Fast pre-approved personal loan disbursements when needed</li>
                  <li>Mature credit card statement cycle tracking and payment reminders</li>
                </ul>
              </div>

              <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#ef4444', fontSize: '0.86rem', marginBottom: '6px' }}>
                  <AlertCircle size={16} /> Realistic Trade-offs
                </div>
                <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  <li>Financial records are hosted on corporate cloud databases to underwrite credit</li>
                  <li>Frequent in-app loan banners and telemarketing notifications</li>
                  <li>Requires account registration and active cloud synchronization</li>
                </ul>
              </div>
            </div>

            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <strong>Best suited for:</strong> Users who want integrated credit bureau score tracking and immediate access to personal loan or credit line facilities.
            </div>
          </div>

          {/* Category 4 */}
          <div style={{ marginBottom: '28px', padding: '24px', borderRadius: '18px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Category 4
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 0 0' }}>
                  Manual Web &amp; Desktop Ledgers (e.g. Mera Kharcha)
                </h3>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, padding: '4px 10px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                Desktop Accessibility
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '16px' }}>
              Ideal for users who prefer doing their budgeting at an office desk or laptop browser without installing mobile applications. Provides structured categories, monthly budget caps, and simple shared ledgers.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#10b981', fontSize: '0.86rem', marginBottom: '6px' }}>
                  <CheckCircle2 size={16} /> Key Strengths
                </div>
                <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  <li>Accessible on any desktop browser without mobile device dependency</li>
                  <li>Zero mobile SMS permissions required</li>
                  <li>Intuitive interface for manual cash and household accounting</li>
                </ul>
              </div>

              <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#f59e0b', fontSize: '0.86rem', marginBottom: '6px' }}>
                  <AlertCircle size={16} /> Realistic Trade-offs
                </div>
                <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  <li>Requires manual entry discipline; high abandonment rate over time</li>
                  <li>Financial records are hosted on remote cloud databases</li>
                  <li>Free version displays banner ads and prompts to upgrade</li>
                </ul>
              </div>
            </div>

            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <strong>Best suited for:</strong> Small business owners, freelance professionals, or family accountants who prefer manual budgeting on a computer browser.
            </div>
          </div>
        </section>

        {/* Section 5: The Decision Framework */}
        <section style={{ marginBottom: '44px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Decision Framework: Which Architecture Matches You?
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '18px' }}>
            Use this simple 4-question decision checklist:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div style={{ padding: '14px 18px', borderRadius: '14px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>🛡️</span>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Do you want zero loan calls, on-device encryption, and roommate bill splitting?</strong> Choose an <strong>Offline-First SMS Tracker</strong> like <em>Pocket Advisor</em>.
              </div>
            </div>

            <div style={{ padding: '14px 18px', borderRadius: '14px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>🍎</span>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Do you use an iPhone and are comfortable paying an annual subscription for bank sync?</strong> Choose an <strong>Account Aggregator App</strong> like <em>Fold Money</em>.
              </div>
            </div>

            <div style={{ padding: '14px 18px', borderRadius: '14px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>💳</span>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Do you actively need credit score tracking and loan access?</strong> Choose a <strong>Cloud Credit Marketplace</strong> like <em>Moneyview</em> or <em>Axio</em>.
              </div>
            </div>

            <div style={{ padding: '14px 18px', borderRadius: '14px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>💻</span>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Do you prefer entering numbers manually on a desktop computer?</strong> Choose a <strong>Manual Web Tool</strong> like <em>Mera Kharcha</em>.
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Frequently Asked Questions */}
        <section style={{ marginBottom: '44px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="var(--primary)" /> Frequently Asked Questions
          </h2>

          <GuideFaqItem
            question="Can Pocket Advisor back up my expenses to the cloud?"
            answer="Yes. Pocket Advisor gives you full control over your data. By default, it operates 100% offline using on-device SQLCipher encryption. If you wish to sync across devices or prevent data loss when changing phones, you can enable optional Cloud Backup (powered by Supabase) at any time."
            defaultOpen={true}
          />
          <GuideFaqItem
            question="How is Pocket Advisor monetized if you don't push personal loans?"
            answer="Pocket Advisor provides a free ad-supported tier with standard, clean mobile display ads. Users who prefer a completely ad-free experience can upgrade to Pocket Advisor Pro. Crucially, we never sell financial data, broker NBFC loans, or make telemarketing calls."
          />
          <GuideFaqItem
            question="Why isn't automated SMS tracking available on iPhone?"
            answer="Apple's iOS operating system isolates the SMS inbox inside a strict security sandbox that completely blocks third-party apps from reading background text messages. On Android, Google Play permits SMS parsing under its official Financial Money Management exception policy."
          />
          <GuideFaqItem
            question="What is the difference between Account Aggregator and SMS tracking?"
            answer="SMS tracking parses transaction alerts sent by banks to your phone locally without external server dependencies. Account Aggregators (AA) query bank servers directly through RBI-regulated intermediaries. AA works on iPhone and does not require SMS permissions, but relies on bank server uptime and involves recurring API query fees."
          />
        </section>

        {/* Legal Disclaimer */}
        <div style={{ padding: '16px 20px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '32px' }}>
          <strong>Trademark &amp; Fair Use Notice:</strong> All product names, logos, trademarks, and registered trademarks mentioned (including Pocket Advisor, Fold, Moneyview, Axio, Walnut, Mera Kharcha, and Splitwise) are property of their respective owners. Their use in this guide is strictly for nominative fair use to provide factual, comparative education on personal finance technologies in India. Information verified as of October 2026.
        </div>

        {/* Section 7: Download & Tool CTAs */}
        <div
          style={{
            padding: '36px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'inline-flex', padding: '8px', borderRadius: '16px', background: 'rgba(99, 102, 241, 0.2)', marginBottom: '16px' }}>
            <Smartphone size={32} color="var(--primary)" />
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
            Experience Fast, Intelligent Personal Finance
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '580px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
            Download Pocket Advisor on Google Play. Automatic UPI tracking, on-device SQLCipher encryption, optional cloud backup, and built-in group debt minimization.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://play.google.com/store/apps/details?id=com.pocketadvisor.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <Download size={18} />
              <span>Get on Google Play (Free)</span>
            </a>

            <a
              href="/upi-expense-tracker"
              onClick={(e) => handleNav('upi-expense-tracker', e)}
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '12px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>Explore UPI Tracker Details</span>
              <ArrowRight size={16} />
            </a>

            <a
              href="/split"
              onClick={(e) => handleNav('split', e)}
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '12px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>Try Free Web Bill Splitter</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
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

        {/* Guide Card 4: Best Expense Tracker Apps in India */}
        <Card
          style={{
            padding: '28px',
            borderRadius: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            transition: 'all 0.25s ease',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '8px', backgroundColor: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)', textTransform: 'uppercase' }}>
                Architectural Comparison
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>9 min read</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', lineHeight: 1.35 }}>
              <a
                href="/best-expense-tracker-apps-india"
                onClick={(e) => handleNav('best-expense-tracker-apps-india', e)}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Best Expense Tracker Apps in India (2026): An Architectural Comparison
              </a>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Comparing 4 core architectures: on-device SMS parsers, Account Aggregators, cloud credit hubs, and manual web ledgers. An honest look at privacy, cloud backup, and monetization.
            </p>
          </div>
          <a
            href="/best-expense-tracker-apps-india"
            onClick={(e) => handleNav('best-expense-tracker-apps-india', e)}
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
            <span>Read Architectural Comparison</span>
            <ArrowRight size={15} />
          </a>
        </Card>
      </div>
    </div>
  );
};
