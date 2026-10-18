import React, { useState } from 'react';
import { Card } from '../common/Card';
import { 
  Smartphone, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Calculator, 
  TrendingUp, 
  HelpCircle, 
  BookOpen, 
  PieChart, 
  Percent, 
  Layers,
  Scale,
  Home,
  Target,
  Landmark,
  Coins,
  Flame,
} from 'lucide-react';

// Collapsible FAQ Accordion Component
export const FaqAccordionItem: React.FC<{ question: string; answer: string | React.ReactNode; defaultOpen?: boolean }> = ({
  question,
  answer,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
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
            borderTop: '1px solid var(--border-subtle)',
            marginTop: '4px',
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
};

// Inter-Tool Navigation for SEO & Crawl Architecture
export const RelatedToolsNav: React.FC<{
  currentTool: 'split' | 'emi' | 'sip' | 'prepayment' | 'rent' | 'budget' | 'goal' | 'fdrd' | 'compound' | 'inflation';
  onNavigate?: (view: string) => void;
}> = ({ currentTool, onNavigate }) => {
  const tools = [
    {
      id: 'budget',
      href: '/monthly-budget-planner',
      title: 'Plan 50/30/20 Monthly Budget & Track Take-Home Salary',
      shortTitle: 'Monthly Budget Planner',
      badge: '50/30/20',
    },
    {
      id: 'prepayment',
      href: '/home-loan-prepayment-vs-sip',
      title: 'Calculate Home Loan Prepayment vs Equity SIP',
      shortTitle: 'Prepay vs SIP Calculator',
      badge: 'Trending',
    },
    {
      id: 'split',
      href: '/split',
      title: 'Split Group Dining & Vacation Bills with 2-Stage Debt Minimizer',
      shortTitle: 'Free Bill Splitter',
      badge: 'Zero Login',
    },
    {
      id: 'emi',
      href: '/emi-calculator',
      title: 'Calculate Reducing Balance Loan EMI & Amortization Schedule',
      shortTitle: 'Loan EMI Calculator',
      badge: 'Amortization',
    },
    {
      id: 'sip',
      href: '/sip-calculator',
      title: 'Calculate Step-Up SIP Wealth Compounding & Inflation Returns',
      shortTitle: 'Step-Up SIP Planner',
      badge: 'Compounding',
    },
    {
      id: 'goal',
      href: '/savings-goal-calculator',
      title: 'Calculate Monthly Savings Required to Reach Your Target Corpus',
      shortTitle: 'Savings Goal Planner',
      badge: 'Goal Planner',
    },
    {
      id: 'fdrd',
      href: '/fd-rd-calculator',
      title: 'Calculate Fixed & Recurring Deposit Maturity with Quarterly Compounding',
      shortTitle: 'FD & RD Calculator',
      badge: 'Fixed Yield',
    },
    {
      id: 'compound',
      href: '/compound-interest-calculator',
      title: 'Calculate Compound Interest Returns Across Daily to Annual Frequencies',
      shortTitle: 'Compound Interest',
      badge: 'Exponential',
    },
    {
      id: 'inflation',
      href: '/inflation-calculator',
      title: 'Calculate Future Cost of Living & Purchasing Power Erosion (1-30 Years)',
      shortTitle: 'Inflation Calculator',
      badge: 'Real Wealth',
    },
    {
      id: 'rent',
      href: '/flatmates-rent-splitter',
      title: 'Split Flatmates Rent & WiFi Bills with 1-Tap UPI',
      shortTitle: 'Flatmates Rent Splitter',
      badge: 'Roommates',
    },
  ].filter((t) => t.id !== currentTool);

  return (
    <div
      style={{
        marginTop: '28px',
        padding: '24px',
        borderRadius: '20px',
        backgroundColor: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <Calculator size={18} color="var(--primary)" />
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Related Calculators &amp; Financial Tools
        </h4>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px',
        }}
      >
        {tools.map((t) => (
          <a
            key={t.id}
            href={t.href}
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate(t.href.replace(/^\//, ''));
              }
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--primary)' }}>
                {t.shortTitle}
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  padding: '2px 6px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(99, 102, 241, 0.12)',
                  color: 'var(--primary)',
                  fontWeight: 700,
                }}
              >
                {t.badge}
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {t.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

// High-Converting App Download Banner
export const AppConversionBanner: React.FC = () => {
  return (
    <div
      style={{
        marginTop: '48px',
        padding: 'clamp(24px, 4vw, 36px)',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ maxWidth: '640px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '8px', backgroundColor: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
            <Smartphone size={14} />
            Official Android App
          </div>
          <h3 style={{ fontSize: 'clamp(1.3rem, 2.8vw, 1.7rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '8px' }}>
            Tired of Manual Bill Tracking & Split Calculations?
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.55 }}>
            Pocket Advisor for Android automatically detects UPI alerts (Google Pay, PhonePe, Paytm, CRED & Banks) in real-time, models group splits, and gives you actionable wealth insights — with <strong>100% offline encryption</strong>.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '240px', flexShrink: 0 }}>
          <a
            href="https://play.google.com/store/apps/details?id=com.pocketadvisor.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '13px 22px',
              borderRadius: '14px',
              background: 'var(--primary-gradient)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.92rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
          >
            <Smartphone size={18} />
            <span>Get Android App</span>
          </a>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={16} color="#10b981" /> Offline-First & Private
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={16} color="#10b981" /> No OTP or Netbanking Passwords
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={16} color="#10b981" /> Free Core Tools &amp; Local-First
        </span>
      </div>
    </div>
  );
};

// ==========================================
// 1. BILL SPLITTER EDUCATIONAL GUIDE
// ==========================================
export const BillSplitterGuide: React.FC = () => {
  return (
    <div className="cv-auto" style={{ marginTop: '56px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Algorithm Deep Dive */}
      <Card glass style={{ padding: '32px', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <Layers size={20} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            How Pocket Advisor Simplifies Tangled Group Debts
          </h3>
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.96rem', marginBottom: '20px' }}>
          In traditional group outings, when 5 or 6 people pay for different items (cabs, lunch, groceries, tickets), you end up with a chaotic web of up to <strong>15 separate peer-to-peer transfers</strong> ($N \times (N-1) / 2$). Friends owe friends who owe other friends, creating endless awkward UPI reminders.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ padding: '18px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <h4 style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.92rem', marginBottom: '8px' }}>❌ Traditional Unsimplified Splitting</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5 }}>
              For 6 friends: up to <strong>15 cross-payments</strong>. A owes B ₹300, B owes C ₹400, C owes A ₹200. Money bounces around in circular loops.
            </p>
          </div>

          <div style={{ padding: '18px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
            <h4 style={{ color: '#10b981', fontWeight: 700, fontSize: '0.92rem', marginBottom: '8px' }}>✅ Pocket Advisor 2-Stage Greedy Algorithm</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5 }}>
              Collapses circular debt into net balances and settles maximum debtors with maximum creditors. Guarantees <strong>at most N - 1 total transactions</strong> (e.g. max 5 payments for 6 people).
            </p>
          </div>
        </div>

        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
          The Mathematics of Proportional Bill Allocation
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '12px' }}>
          When restaurant bills include taxes (GST / VAT) and discretionary service charges or tips, dividing costs evenly is unfair to friends who ordered lighter meals. Pocket Advisor calculates each person’s exact share proportionally:
        </p>
        <div style={{ padding: '14px 20px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.88rem', color: 'var(--primary)', marginBottom: '16px', overflowX: 'auto' }}>
          Share<sub>i</sub> = ItemCost<sub>i</sub> × (1 + (Tax% + Tip%) / 100) + (FixedCharges / N)
        </div>
      </Card>

      {/* Bill Splitting FAQ Accordion */}
      <div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} color="var(--primary)" /> Frequently Asked Questions: Bill Splitting
        </h3>

        <FaqAccordionItem
          question="Can I split bills unevenly with individual item costs?"
          answer="Yes! In the Quick Bill Splitter above, switch the split mode to 'Itemized / Custom' to enter exact amounts for each member. Taxes and tips will be distributed proportionally based on each individual's consumption."
          defaultOpen={true}
        />

        <FaqAccordionItem
          question="Does everyone in the group need to install the app or sign up?"
          answer="No! The web tool works 100% instantly with zero signup. You calculate the split and tap 'Share to WhatsApp' to dispatch itemized payment receipts directly to your group chat."
        />

        <FaqAccordionItem
          question="How does Pocket Advisor cut 30 group transactions down to 4?"
          answer="Pocket Advisor calculates the net balance of every person (Total Paid minus Total Share). Those who overpaid become Net Creditors, and those who underpaid become Net Debtors. A greedy bipartite algorithm matches the largest debtor with the largest creditor until all accounts are zeroed."
        />

        <FaqAccordionItem
          question="Is my spending data uploaded to any cloud server when using the web splitter?"
          answer="No. All bill calculations execute locally in your browser's JavaScript engine. No names, amounts, or receipts are saved on our servers."
        />
      </div>

      <RelatedToolsNav currentTool="split" />
      <AppConversionBanner />
    </div>
  );
};

// ==========================================
// 2. LOAN EMI CALCULATOR EDUCATIONAL GUIDE
// ==========================================
export const EmiCalculatorGuide: React.FC = () => {
  return (
    <div className="cv-auto" style={{ marginTop: '56px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Formula & Amortization Breakdown */}
      <Card glass style={{ padding: '32px', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <Calculator size={20} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            The Reducing Balance Loan EMI Formula
          </h3>
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.96rem', marginBottom: '16px' }}>
          Indian retail banks and NBFCs (HDFC, SBI, ICICI, Axis) calculate monthly loan installments using the standard <strong>Equated Monthly Installment (EMI) reducing balance formula</strong>:
        </p>

        <div style={{ padding: '16px 22px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '18px', textAlign: 'center' }}>
          EMI = [P × r × (1 + r)<sup>n</sup>] / [(1 + r)<sup>n</sup> - 1]
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>P (Principal):</strong>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginTop: '4px' }}>The total loan amount sanctioned by the bank.</p>
          </div>
          <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>r (Monthly Rate):</strong>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginTop: '4px' }}>Annual Interest Rate divided by 12 months and 100.</p>
          </div>
          <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>n (Tenure Months):</strong>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginTop: '4px' }}>Number of years multiplied by 12 installments.</p>
          </div>
        </div>

        {/* Amortization Benchmark Table */}
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
          EMI & Interest Benchmarks (Assumed Rate: 8.5% p.a.)
        </h4>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: '12px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                <th style={{ padding: '12px 16px' }}>Loan Principal</th>
                <th style={{ padding: '12px 16px' }}>Tenure</th>
                <th style={{ padding: '12px 16px' }}>Monthly EMI</th>
                <th style={{ padding: '12px 16px' }}>Total Interest</th>
                <th style={{ padding: '12px 16px' }}>Total Outflow</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>₹10,00,000</td>
                <td style={{ padding: '12px 16px' }}>5 Years</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 700 }}>₹20,517</td>
                <td style={{ padding: '12px 16px', color: 'var(--warning)' }}>₹2,30,992</td>
                <td style={{ padding: '12px 16px' }}>₹12,30,992</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>₹25,00,000</td>
                <td style={{ padding: '12px 16px' }}>15 Years</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 700 }}>₹24,619</td>
                <td style={{ padding: '12px 16px', color: 'var(--warning)' }}>₹19,31,348</td>
                <td style={{ padding: '12px 16px' }}>₹44,31,348</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>₹50,00,000</td>
                <td style={{ padding: '12px 16px' }}>20 Years</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 700 }}>₹43,391</td>
                <td style={{ padding: '12px 16px', color: 'var(--warning)' }}>₹54,13,879</td>
                <td style={{ padding: '12px 16px' }}>₹1,04,13,879</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Prepayment Hack */}
        <div style={{ marginTop: '24px', padding: '18px 22px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
          <h4 style={{ color: '#10b981', fontWeight: 700, fontSize: '0.98rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Percent size={18} /> The "1 Extra EMI Per Year" Prepayment Hack
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55 }}>
            On a 20-year home loan of ₹50 Lakhs at 8.5%, paying just <strong>one extra monthly EMI every 12 months</strong> directly toward principal reduces your effective loan tenure by <strong>4 years and 3 months</strong>, saving over ₹12 Lakhs in interest!
          </p>
        </div>
      </Card>

      {/* EMI FAQ Accordion */}
      <div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} color="var(--primary)" /> Frequently Asked Questions: Loan EMI
        </h3>

        <FaqAccordionItem
          question="What is the difference between Flat Rate vs Reducing Balance EMI?"
          answer="In a flat-rate loan, interest is calculated on the full initial principal for the entire tenure, meaning you pay interest on money you have already repaid. In a reducing-balance loan (used in our calculator and by all RBI-regulated banks), interest is charged only on the remaining outstanding principal balance."
          defaultOpen={true}
        />

        <FaqAccordionItem
          question="Can I prepay my floating rate home loan without penalty?"
          answer="Yes. Under Reserve Bank of India (RBI) guidelines, banks and housing loan companies cannot charge prepayment penalties or foreclosure charges on floating-rate retail loans taken by individual borrowers."
        />

        <FaqAccordionItem
          question="How does loan tenure affect my total interest payout?"
          answer="Longer tenures reduce your monthly EMI burden but drastically increase the total interest paid. For example, a ₹50L loan for 20 years incurs over ₹54L in interest — more than the loan amount itself. Shorter tenures are always more cost-effective."
        />

        <FaqAccordionItem
          question="Why do my initial EMIs pay mostly interest and very little principal?"
          answer="Because interest is calculated on the high initial balance. In an amortization schedule, the early years are dominated by interest. As the principal balance drops, the interest component decreases and the principal repayment component accelerates."
        />
      </div>

      <RelatedToolsNav currentTool="emi" />
      <AppConversionBanner />
    </div>
  );
};

// ==========================================
// 3. SIP WEALTH PLANNER EDUCATIONAL GUIDE
// ==========================================
export const SipCalculatorGuide: React.FC = () => {
  return (
    <div className="cv-auto" style={{ marginTop: '56px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Compounding & Step-Up Math */}
      <Card glass style={{ padding: '32px', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <TrendingUp size={20} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            The Mathematics of Compounding & Step-Up SIPs
          </h3>
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.96rem', marginBottom: '16px' }}>
          A Systematic Investment Plan (SIP) leverages <strong>Rupee Cost Averaging</strong> and exponential compound interest. Unlike a lump-sum deposit, SIP purchases more mutual fund units when markets dip and fewer when markets peak.
        </p>

        <div style={{ padding: '16px 22px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.95rem', color: '#10b981', marginBottom: '18px', textAlign: 'center' }}>
          FV = P × [ (1 + r)<sup>n</sup> - 1 ] / r × (1 + r)
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '24px' }}>
          (Compounded Annuity Due for installments deposited at the start of each month)
        </p>

        {/* Step-Up Comparison Grid */}
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
          How an Annual Step-Up Doubles Your Final Corpus
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '16px' }}>
          As your salary or business earnings rise each year, increasing your monthly SIP installment by just 5% to 10% creates a massive compounding kicker:
        </p>

        <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: '12px', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                <th style={{ padding: '12px 16px' }}>Starting SIP</th>
                <th style={{ padding: '12px 16px' }}>Annual Step-Up</th>
                <th style={{ padding: '12px 16px' }}>Duration</th>
                <th style={{ padding: '12px 16px' }}>Capital Invested</th>
                <th style={{ padding: '12px 16px' }}>Estimated Maturity (12% CAGR)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>₹10,000 / mo</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>0% (Flat)</td>
                <td style={{ padding: '12px 16px' }}>15 Years</td>
                <td style={{ padding: '12px 16px' }}>₹18,00,000</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 700 }}>₹50,45,760</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>₹10,000 / mo</td>
                <td style={{ padding: '12px 16px', color: 'var(--info)' }}>5% Yearly</td>
                <td style={{ padding: '12px 16px' }}>15 Years</td>
                <td style={{ padding: '12px 16px' }}>₹25,90,560</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 700 }}>₹67,52,140</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>₹10,000 / mo</td>
                <td style={{ padding: '12px 16px', color: '#10b981' }}>10% Yearly</td>
                <td style={{ padding: '12px 16px' }}>15 Years</td>
                <td style={{ padding: '12px 16px' }}>₹38,12,700</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 800 }}>₹89,28,450 (+77% more wealth!)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Inflation Purchasing Power Warning */}
        <div style={{ padding: '18px 22px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
          <h4 style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.98rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PieChart size={18} /> Don't Forget Inflation-Adjusted Purchasing Power
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55 }}>
            Nominal wealth is an illusion. At 6% historical inflation, a corpus of ₹1 Crore in 20 years has the purchasing power of only <strong>~₹31.1 Lakhs in today’s money</strong>. Our calculator factors in real wealth discounting so your retirement and child-education targets reflect actual future buying power.
          </p>
        </div>
      </Card>

      {/* SIP FAQ Accordion */}
      <div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} color="var(--primary)" /> Frequently Asked Questions: Systematic Investment Plans
        </h3>

        <FaqAccordionItem
          question="What is a Step-Up SIP and why should I choose it?"
          answer="A Step-Up (or Top-Up) SIP automatically increases your monthly investment by a fixed percentage (e.g. 5% or 10%) every year. Because expenses and salaries rise annually, a step-up SIP channels your increments into wealth creation and dramatically expands your terminal corpus."
          defaultOpen={true}
        />

        <FaqAccordionItem
          question="Why does Pocket Advisor model Annuity Due (Month-Start) by default?"
          answer="Most Indian mutual fund SIP auto-debits occur immediately after salary credit (e.g. on the 1st or 5th of the month). Depositing money at the beginning of the month allows that installment to compound for the entire 30-day billing cycle, generating slightly higher returns than end-of-month deposits."
        />

        <FaqAccordionItem
          question="What return rate should I assume for Indian equity mutual funds?"
          answer="Historically, broad Indian indices like Nifty 50 and BSE Sensex have generated annualized 12% to 14% CAGR over 10+ year horizons. For conservative debt funds, 6% to 7% is realistic. For long-term equity plans, 11%–12% is considered an appropriate planning benchmark."
        />

        <FaqAccordionItem
          question="Can I pause or cancel my SIP during a market crash?"
          answer="You should never pause your SIP during a market downturn. Dips are when your fixed monthly amount buys the maximum number of mutual fund NAV units. When the market recovers, those cheaper units drive exponential portfolio acceleration."
        />
      </div>

      <RelatedToolsNav currentTool="sip" />
      <AppConversionBanner />
    </div>
  );
};

// =========================================================================
// Home Loan Prepayment vs. SIP Guide & FAQ Section
// =========================================================================
export const PrepaymentVsSipGuide: React.FC = () => {
  return (
    <div className="cv-auto" style={{ marginTop: '56px', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* Educational Framework Card */}
      <Card
        style={{
          padding: 'clamp(24px, 4vw, 36px)',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            <Scale size={14} /> Comprehensive Decision Framework
          </div>
          <h3 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '10px' }}>
            Home Loan Prepayment vs. Equity SIP: The Ultimate Decision Guide
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
            In India, home loan interest rates typically range between <strong>8.25% and 9.5% p.a.</strong>, while diversified equity mutual funds (e.g. Nifty 50 or Flexi Cap funds) historically deliver <strong>12% to 14% CAGR</strong> over 10+ year horizons. Deciding whether to channel your surplus savings into principal prepayment or mutual fund SIPs is not just about raw returns — it is a balance of guaranteed savings, tax deductions, and compounding wealth.
          </p>
        </div>

        {/* Strategy Matrix Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '12px 16px' }}>Dimension</th>
                <th style={{ padding: '12px 16px' }}>Option A: Prepay Home Loan</th>
                <th style={{ padding: '12px 16px' }}>Option B: Equity SIP</th>
                <th style={{ padding: '12px 16px' }}>Option C: 50:50 Hybrid</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Nature of Return</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 600 }}>100% Guaranteed &amp; Risk-Free</td>
                <td style={{ padding: '12px 16px', color: '#f59e0b', fontWeight: 600 }}>Market-Linked (Volatile)</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 600 }}>Balanced Risk-Return</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Effective Rate</td>
                <td style={{ padding: '12px 16px' }}>Saves 8.5% borrowing cost</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 700 }}>Compounds at ~12%–14% CAGR</td>
                <td style={{ padding: '12px 16px' }}>Earns 12% on half, saves 8.5% on half</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Liquidity</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>Low (Locked in brick &amp; mortar)</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 600 }}>High (Redeemable in T+2 days)</td>
                <td style={{ padding: '12px 16px' }}>Moderate emergency liquidity</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Tax Advantage</td>
                <td style={{ padding: '12px 16px' }}>Reduces interest deduction eligible under Sec 24b</td>
                <td style={{ padding: '12px 16px' }}>12.5% LTCG above ₹1.25 Lakhs exemption</td>
                <td style={{ padding: '12px 16px' }}>Optimizes deductions while accumulating assets</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Psychological Value</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 800 }}>Immeasurable debt-free peace of mind</td>
                <td style={{ padding: '12px 16px' }}>Requires stomach for market corrections</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 700 }}>Best of both worlds</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tax Note */}
        <div style={{ padding: '18px 22px', borderRadius: '14px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
          <h4 style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.98rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Percent size={18} /> How Tax Deductions Affect Your Effective Loan Rate
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
            Under the Old Tax Regime, Section 24(b) permits deducting up to <strong>₹2 Lakhs per fiscal year</strong> against home loan interest. For someone in the 30% tax bracket, a ₹2 Lakh interest deduction yields ₹62,400 in direct tax savings. Consequently, an 8.5% gross interest rate translates to an <strong>effective net borrowing rate of ~6.8%</strong>. When your effective borrowing cost is under 7%, the ~12% expected return of equity mutual funds makes SIP investing even more lucrative.
          </p>
        </div>
      </Card>

      {/* Prepayment vs SIP FAQ Accordion */}
      <div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} color="var(--primary)" /> Frequently Asked Questions: Prepayment vs. SIP
        </h3>

        <FaqAccordionItem
          question="Is it better to prepay home loan or invest in SIP?"
          answer="Mathematically, if your equity SIP generates 12%–14% returns and your home loan interest is 8.5%, investing the surplus builds substantially more wealth over 15–20 years due to compounding. However, if market volatility causes you anxiety or your priority is closing all debts, prepayment delivers an unconditional, guaranteed 8.5% post-tax return."
          defaultOpen={true}
        />

        <FaqAccordionItem
          question="How does paying just 1 extra EMI every year affect a 20-year home loan?"
          answer="Paying just 1 extra EMI per year (equivalent to a ~8.3% monthly prepayment) reduces a 20-year home loan by approximately 4 to 5 years and saves 20% to 25% of your total payable interest. Combining 1 extra EMI with an annual 5% EMI step-up can clear a 20-year loan in less than 10 years."
        />

        <FaqAccordionItem
          question="What is the 50:50 Hybrid Strategy?"
          answer="The 50:50 Hybrid strategy divides surplus cash into two equal streams: 50% is used to pay down home loan principal every month, and 50% is invested in an equity mutual fund SIP. This eliminates the regret of missing out on stock market bull runs while simultaneously shortening your loan tenure by several years."
        />

        <FaqAccordionItem
          question="Are there prepayment penalties on home loans in India?"
          answer="Under Reserve Bank of India (RBI) regulations, banks and housing loan companies (HFCs) are prohibited from levying foreclosure or prepayment charges on floating-rate home loans sanctioned to individual borrowers."
        />

        <FaqAccordionItem
          question="Should I prepay loan principal or invest if interest rates rise to 9.5%?"
          answer="As home loan interest rates rise, the hurdle rate for equity investments increases. If loan rates cross 9.5%–10%, the appeal of guaranteed interest savings grows significantly, making prepayment or a higher prepayment allocation the prudent move."
        />
      </div>

      <RelatedToolsNav currentTool="prepayment" />
      <AppConversionBanner />
    </div>
  );
};

// =========================================================================
// Flatmates & Rent Splitter Guide Section
// =========================================================================
export const FlatmatesRentGuide: React.FC = () => {
  return (
    <div className="cv-auto" style={{ marginTop: '56px', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      <Card
        style={{
          padding: 'clamp(24px, 4vw, 36px)',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            <Home size={14} /> Roommate Spending Harmony
          </div>
          <h3 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '10px' }}>
            The Definitive Flatmate Rent &amp; Shared Utility Splitting Guide
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
            Living with flatmates in cities like Bengaluru, Mumbai, Pune, or Gurgaon is a fantastic way to enjoy spacious apartments at reasonable costs. However, disputes over master bedroom rent, maid charges, WiFi, and AC electricity bills frequently strain friendships. Pocket Advisor eliminates friction using transparent mathematical splits and 1-tap UPI deep links.
          </p>
        </div>

        {/* 3 Steps to Rent Harmony */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
          <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Step 1: Square Footage Rent
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Split 50% of the rent equally for common spaces (living room, kitchen, balcony) and the remaining 50% proportionally based on bedroom floor area and attached bathrooms.
            </p>
          </div>

          <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', marginBottom: '6px' }}>
              Step 2: Fixed Monthly Utilities
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Pool recurring bills (Cook, Maid, High-Speed WiFi, Drinking Water) into an equal itemized total split across all roommates on the 1st of every month.
            </p>
          </div>

          <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', marginBottom: '6px' }}>
              Step 3: 1-Tap UPI WhatsApp Settle
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Share the digital split link to your flatmate WhatsApp group with pre-configured <code>upi://pay</code> links. Roommates tap once to pay directly via Google Pay or PhonePe.
            </p>
          </div>
        </div>
      </Card>

      {/* Flatmate FAQ Accordion */}
      <div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} color="var(--primary)" /> Frequently Asked Questions: Roommate Splits
        </h3>

        <FaqAccordionItem
          question="How should we split rent when one bedroom is much bigger with an attached washroom?"
          answer="A time-tested formula: Treat 50% of the total rent as Common Space Rent (split equally by headcount), and 50% as Private Bedroom Rent. The roommate occupying the master bedroom with an attached bath pays approximately 55% to 60% of the private rent pool, while smaller room occupants split the remainder."
          defaultOpen={true}
        />

        <FaqAccordionItem
          question="How to split variable electricity bills when one roommate has an AC?"
          answer="Calculate the baseline electricity bill from winter or non-AC months as the common shared consumption. The difference during peak summer months is attributed to the AC user(s) and added to their monthly share."
        />

        <FaqAccordionItem
          question="Why does Pocket Advisor's 2-stage debt minimization matter for roommates?"
          answer="When three or four flatmates pay for various items during the month (Aman pays maid, Priya pays WiFi, Rahul buys groceries), circular debts accumulate. Pocket Advisor's greedy debt minimization algorithm collapses 8 confusing cross-payments into just 2 simple bilateral transfers, settling everyone to zero instantly."
        />

        <FaqAccordionItem
          question="Do my roommates need to download the app to view and pay their share?"
          answer="No! The Pocket Advisor Web Splitter requires zero login and zero app installation. Anyone opening your shared WhatsApp receipt link can see their exact share and tap once to pay via their preferred UPI app."
        />
      </div>

      <RelatedToolsNav currentTool="rent" />
      <AppConversionBanner />
    </div>
  );
};

// ==========================================
// REGULATORY DISCLAIMER & ASSUMPTIONS BOX
// ==========================================
export const CalculatorDisclaimerAndAssumptions: React.FC<{ toolName?: string; assumptions?: string[] }> = ({
  toolName = 'financial calculator',
  assumptions = [],
}) => {
  return (
    <div
      style={{
        marginTop: '28px',
        padding: '22px 26px',
        borderRadius: '16px',
        backgroundColor: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-subtle)',
        fontSize: '0.86rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 800, marginBottom: '8px' }}>
        <ShieldCheck size={18} color="#10b981" />
        <span>Calculation Assumptions &amp; Regulatory Disclaimer</span>
      </div>
      {assumptions.length > 0 && (
        <ul style={{ margin: '0 0 10px 0', paddingLeft: '20px', color: 'var(--text-secondary)' }}>
          {assumptions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      )}
      <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <strong>Important Notice:</strong> Outputs generated by this {toolName} are mathematical simulations intended solely for educational planning. Actual outcomes will vary based on market volatility, bank rate revisions (such as RBI repo rate hikes or MCLR adjustments), tax laws (LTCG/STCG, Section 24b deductions), and compounding conventions. This tool does not provide certified financial, tax, or investment advice.
      </p>
    </div>
  );
};

// ==========================================
// 5. SAVINGS GOAL PLANNER EDUCATIONAL GUIDE
// ==========================================
export const SavingsGoalGuide: React.FC = () => {
  return (
    <div className="cv-auto" style={{ marginTop: '56px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <Card glass style={{ padding: '32px', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <Target size={20} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            The Mathematics of Reverse Goal Savings
          </h3>
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.96rem', marginBottom: '16px' }}>
          Rather than saving whatever random amount remains at month-end, the <strong>Reverse Goal SIP formula</strong> determines the exact monthly installment required to fund a future target (down payment, wedding, dream car, higher education) given your existing savings and investment timeline:
        </p>

        <div style={{ padding: '16px 22px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.92rem', color: 'var(--primary)', marginBottom: '18px', textAlign: 'center' }}>
          PMT = [Target - Current × (1 + r)<sup>n</sup>] × r / [(1 + r) × ((1 + r)<sup>n</sup> - 1)]
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
          <strong>Where:</strong> <code>Target</code> is your future corpus target, <code>Current</code> is initial capital already in hand, <code>r</code> is monthly return rate, and <code>n</code> is number of months.
        </p>

        {/* Goal Benchmarks */}
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
          Monthly Savings Required for Milestone Targets (Assumed 11% p.a. Return)
        </h4>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: '12px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                <th style={{ padding: '12px 16px' }}>Target Goal</th>
                <th style={{ padding: '12px 16px' }}>In 3 Years</th>
                <th style={{ padding: '12px 16px' }}>In 5 Years</th>
                <th style={{ padding: '12px 16px' }}>In 10 Years</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>₹10,00,000 (Car / Wedding)</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 700 }}>₹23,600 / mo</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 700 }}>₹12,650 / mo</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 700 }}>₹4,600 / mo</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>₹25,00,000 (Home Down Payment)</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 700 }}>₹59,000 / mo</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 700 }}>₹31,600 / mo</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 700 }}>₹11,500 / mo</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>₹1,00,00,000 (Retirement Core)</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 700 }}>₹2,36,000 / mo</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 700 }}>₹1,26,500 / mo</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 700 }}>₹46,000 / mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} color="var(--primary)" /> Frequently Asked Questions: Goal Savings
        </h3>

        <FaqAccordionItem
          question="What return rate should I assume for short-term vs long-term goals?"
          answer="For goals within 1 to 3 years (e.g. vacation, emergency buffer), prioritize capital safety using Arbitrage Funds, Short-Duration Debt Funds, or FDs (6.5% - 7.5%). For horizons of 5+ years, diversified equity mutual fund index funds (10% - 12%) let compound growth do the heavy lifting."
          defaultOpen={true}
        />

        <FaqAccordionItem
          question="How does existing seed capital reduce my monthly burden?"
          answer="Existing savings earn compound interest across the entire timeline. For instance, ₹2 Lakhs in seed capital growing at 11% over 5 years reaches ~₹3.4 Lakhs on its own, reducing the remaining gap you need to save each month."
        />

        <FaqAccordionItem
          question="What if market returns fluctuate below my assumed percentage?"
          answer="Market returns are never linear. Build a 10% safety cushion into your monthly contributions and rebalance equities into fixed-income debt funds when you are within 12 months of your goal deadline."
        />
      </div>

      <CalculatorDisclaimerAndAssumptions
        toolName="Savings Goal Planner"
        assumptions={[
          'Constant expected return rate across the timeline (compounded monthly)',
          'Contributions are made at the beginning of each monthly cycle (annuity due)',
          'Taxes on capital gains are not factored into gross target requirements',
        ]}
      />

      <RelatedToolsNav currentTool="goal" />
      <AppConversionBanner />
    </div>
  );
};

// ==========================================
// 6. FD & RD CALCULATOR EDUCATIONAL GUIDE
// ==========================================
export const FdRdGuide: React.FC = () => {
  return (
    <div className="cv-auto" style={{ marginTop: '56px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <Card glass style={{ padding: '32px', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <Landmark size={20} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Fixed Deposit vs. Recurring Deposit: Compounding Conventions
          </h3>
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.96rem', marginBottom: '16px' }}>
          In India, the Reserve Bank of India (RBI) mandates that bank <strong>Fixed Deposits (FDs)</strong> and <strong>Recurring Deposits (RDs)</strong> compound interest on a <strong>quarterly basis</strong> (every 3 months). This produces an effective annual yield that is higher than the nominal headline interest rate.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ padding: '18px', borderRadius: '12px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px' }}>Fixed Deposit (FD) Formula</h4>
            <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
              A = P × (1 + r / 4)<sup>4t</sup>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>
              Single lump sum <code>P</code> compounded 4 times per year over <code>t</code> years.
            </p>
          </div>

          <div style={{ padding: '18px', borderRadius: '12px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: '#10b981', fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px' }}>Recurring Deposit (RD) Formula</h4>
            <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
              M = Σ [P × (1 + r / 4)<sup>4 × (n - m + 1) / 12</sup>]
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>
              Sum of monthly deposits where each deposit <code>m</code> earns interest for remaining months.
            </p>
          </div>
        </div>

        {/* FD vs RD Comparison Table */}
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
          Feature Comparison: FD vs RD
        </h4>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: '12px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                <th style={{ padding: '12px 16px' }}>Feature</th>
                <th style={{ padding: '12px 16px' }}>Fixed Deposit (FD)</th>
                <th style={{ padding: '12px 16px' }}>Recurring Deposit (RD)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Deposit Frequency</td>
                <td style={{ padding: '12px 16px' }}>One-time lump sum</td>
                <td style={{ padding: '12px 16px' }}>Fixed monthly installment</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Compounding Frequency</td>
                <td style={{ padding: '12px 16px' }}>Quarterly (standard in India)</td>
                <td style={{ padding: '12px 16px' }}>Quarterly</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Senior Citizen Benefit</td>
                <td style={{ padding: '12px 16px', color: '#10b981' }}>+0.50% to +0.75% extra interest</td>
                <td style={{ padding: '12px 16px', color: '#10b981' }}>+0.50% extra interest</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Tax Treatment (TDS)</td>
                <td style={{ padding: '12px 16px' }}>TDS deducted if interest &gt; ₹40,000 (₹50k for seniors)</td>
                <td style={{ padding: '12px 16px' }}>Same TDS thresholds apply under Section 194A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} color="var(--primary)" /> Frequently Asked Questions: FDs &amp; RDs
        </h3>

        <FaqAccordionItem
          question="How does quarterly compounding increase my effective yield?"
          answer="When a bank quotes 7.5% per annum on an FD, it credits interest into your principal balance every 3 months. In subsequent quarters, you earn interest on that accrued interest. Over a 5-year period, 7.5% nominal translates to an effective annualized yield of ~8.99%."
          defaultOpen={true}
        />

        <FaqAccordionItem
          question="Can I withdraw an FD or RD prematurely?"
          answer="Yes, most Indian banks permit premature closure, typically subject to a 0.5% to 1.0% interest rate penalty on the contracted rate for the period the deposit was held."
        />

        <FaqAccordionItem
          question="How is interest earned on FDs and RDs taxed in India?"
          answer="FD and RD interest is added to your total income and taxed at your marginal slab rate. Banks deduct 10% TDS under Section 194A if total annual interest across branches exceeds ₹40,000 (₹50,000 for senior citizens). You can submit Form 15G or 15H to prevent TDS if your total income is below the taxable threshold."
        />
      </div>

      <CalculatorDisclaimerAndAssumptions
        toolName="FD & RD Calculator"
        assumptions={[
          'Compounding frequency is quarterly as per standard Indian commercial bank practice',
          'TDS deductions under Section 194A are not automatically subtracted from gross maturity payouts',
          'Tenure is assumed in full monthly blocks without broken-period days',
        ]}
      />

      <RelatedToolsNav currentTool="fdrd" />
      <AppConversionBanner />
    </div>
  );
};

// ==========================================
// 7. COMPOUND INTEREST CALCULATOR GUIDE
// ==========================================
export const CompoundInterestGuide: React.FC = () => {
  return (
    <div className="cv-auto" style={{ marginTop: '56px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <Card glass style={{ padding: '32px', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
            <Coins size={20} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            The Physics of Compounding: Frequency, Duration &amp; the Rule of 72
          </h3>
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.96rem', marginBottom: '16px' }}>
          Compound interest is interest calculated on the initial principal plus all accumulated interest from previous periods. Over long horizons, the growth curve transitions from linear to steep exponential acceleration:
        </p>

        <div style={{ padding: '16px 22px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.92rem', color: 'var(--primary)', marginBottom: '18px', textAlign: 'center' }}>
          A = P × (1 + r / n)<sup>nt</sup> + PMT × [((1 + r / n)<sup>nt</sup> - 1) / (r / n)]
        </div>

        {/* Compounding Frequency Comparison Table */}
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
          Compounding Frequency Impact on ₹10 Lakhs at 12% p.a. over 15 Years
        </h4>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: '12px', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                <th style={{ padding: '12px 16px' }}>Frequency</th>
                <th style={{ padding: '12px 16px' }}>Cycles per Year</th>
                <th style={{ padding: '12px 16px' }}>Final Maturity Corpus</th>
                <th style={{ padding: '12px 16px' }}>Total Interest Earned</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Annually</td>
                <td style={{ padding: '12px 16px' }}>1 time</td>
                <td style={{ padding: '12px 16px' }}>₹54,73,566</td>
                <td style={{ padding: '12px 16px', color: '#10b981' }}>₹44,73,566</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Semi-Annually</td>
                <td style={{ padding: '12px 16px' }}>2 times</td>
                <td style={{ padding: '12px 16px' }}>₹57,43,491</td>
                <td style={{ padding: '12px 16px', color: '#10b981' }}>₹47,43,491 (+₹2.7L)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Quarterly</td>
                <td style={{ padding: '12px 16px' }}>4 times</td>
                <td style={{ padding: '12px 16px' }}>₹58,91,601</td>
                <td style={{ padding: '12px 16px', color: '#10b981' }}>₹48,91,601 (+₹4.18L)</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Monthly</td>
                <td style={{ padding: '12px 16px' }}>12 times</td>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--primary)' }}>₹59,95,802</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 800 }}>₹49,95,802 (+₹5.22L)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* The Rule of 72 Callout */}
        <div style={{ padding: '18px 22px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
          <h4 style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.98rem', marginBottom: '6px' }}>
            ⚡ The Rule of 72: Doubling Your Capital
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
            Divide 72 by your annual interest rate to find how many years it takes for your investment to double. At 12% equity return, your wealth doubles every <strong>6 years</strong> (72 / 12). Over 24 years, that means your money doubles 4 times: ₹10L becomes ₹20L, then ₹40L, then ₹80L, and finally ₹1.6 Crores!
          </p>
        </div>
      </Card>

      <div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} color="var(--primary)" /> Frequently Asked Questions: Compound Growth
        </h3>

        <FaqAccordionItem
          question="Why does time matter more than the amount invested?"
          answer="Compounding is back-loaded: most of your gains occur in the final 20% of your investment duration. A 25-year-old investing ₹5,000/month will accumulate significantly more wealth by age 50 than a 35-year-old investing ₹15,000/month, even though the older investor contributed more total cash."
          defaultOpen={true}
        />

        <FaqAccordionItem
          question="What is the difference between Simple Interest and Compound Interest?"
          answer="Simple interest pays returns strictly on the original principal throughout the loan or deposit. Compound interest adds accrued returns back into the capital, creating exponential snowball growth."
        />

        <FaqAccordionItem
          question="How do taxes affect compounding in India?"
          answer="When tax is deducted annually (like TDS on FDs), you lose the compounding power on the taxed portion. Equity mutual funds, where tax is deferred until redemption, allow 100% of your gains to compound uninterrupted for decades."
        />
      </div>

      <CalculatorDisclaimerAndAssumptions
        toolName="Compound Interest Calculator"
        assumptions={[
          'Nominal annual interest rate is assumed constant throughout the entire horizon',
          'Regular monthly deposits (if specified) are added on the first day of each compounding period',
          'Pre-tax gross returns: taxation upon withdrawal or capital realization is not deducted',
        ]}
      />

      <RelatedToolsNav currentTool="compound" />
      <AppConversionBanner />
    </div>
  );
};

// ==========================================
// 8. INFLATION CALCULATOR EDUCATIONAL GUIDE
// ==========================================
export const InflationGuide: React.FC = () => {
  return (
    <div className="cv-auto" style={{ marginTop: '56px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <Card glass style={{ padding: '32px', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171' }}>
            <Flame size={20} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Inflation Mathematics: How Purchasing Power Decays Over Time
          </h3>
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.96rem', marginBottom: '16px' }}>
          Inflation acts as an invisible tax on cash savings. While your bank balance may appear unchanged, the <strong>purchasing power</strong> of that capital erodes relentlessly year after year:
        </p>

        <div style={{ padding: '16px 22px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.92rem', color: 'var(--primary)', marginBottom: '18px', textAlign: 'center' }}>
          FutureCost = CurrentCost × (1 + i)<sup>n</sup> &nbsp;|&nbsp; PurchasingPower = CurrentCost / (1 + i)<sup>n</sup>
        </div>

        {/* Historical India Benchmark Table */}
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
          Purchasing Power Erosion on ₹10 Lakhs at 6.0% Inflation
        </h4>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: '12px', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                <th style={{ padding: '12px 16px' }}>Timeline</th>
                <th style={{ padding: '12px 16px' }}>Future Cost of ₹10L Purchase</th>
                <th style={{ padding: '12px 16px' }}>Real Value of Today's ₹10L</th>
                <th style={{ padding: '12px 16px' }}>Purchasing Power Lost</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>5 Years</td>
                <td style={{ padding: '12px 16px' }}>₹13,38,226</td>
                <td style={{ padding: '12px 16px', color: '#f59e0b' }}>₹7,47,258</td>
                <td style={{ padding: '12px 16px', color: '#ef4444', fontWeight: 700 }}>-25.3%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>10 Years</td>
                <td style={{ padding: '12px 16px' }}>₹17,90,848</td>
                <td style={{ padding: '12px 16px', color: '#f59e0b' }}>₹5,58,395</td>
                <td style={{ padding: '12px 16px', color: '#ef4444', fontWeight: 700 }}>-44.2%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>15 Years</td>
                <td style={{ padding: '12px 16px' }}>₹23,96,558</td>
                <td style={{ padding: '12px 16px', color: '#f59e0b' }}>₹4,17,265</td>
                <td style={{ padding: '12px 16px', color: '#ef4444', fontWeight: 700 }}>-58.3%</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>20 Years</td>
                <td style={{ padding: '12px 16px', color: '#f43f5e', fontWeight: 700 }}>₹32,07,135</td>
                <td style={{ padding: '12px 16px', color: '#ef4444', fontWeight: 800 }}>₹3,11,805</td>
                <td style={{ padding: '12px 16px', color: '#ef4444', fontWeight: 800 }}>-68.8%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Lifestyle vs Headline Inflation Warning */}
        <div style={{ padding: '18px 22px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
          <h4 style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.98rem', marginBottom: '6px' }}>
            ⚠️ Headline CPI vs. Real Lifestyle Inflation
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
            Official government Consumer Price Index (CPI) averages around 5% - 6% because it is heavily weighted toward subsidized food and staple grains. However, <strong>private education and tertiary healthcare</strong> in India inflate at <strong>10% to 12% annually</strong>. If you are planning an MBA or retirement medical corpus, you must assume double-digit inflation rates.
          </p>
        </div>
      </Card>

      <div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} color="var(--primary)" /> Frequently Asked Questions: Inflation &amp; Purchasing Power
        </h3>

        <FaqAccordionItem
          question="How do I protect my savings from inflation erosion in India?"
          answer="Fixed bank savings accounts paying 3% and FDs paying 7% (taxable at slab rates) often produce negative real post-tax returns. To beat 6% inflation, allocate long-term capital toward equity mutual funds, index funds, and sovereign gold bonds which historically compound above inflation."
          defaultOpen={true}
        />

        <FaqAccordionItem
          question="What is the difference between nominal returns and real returns?"
          answer="Nominal return is the raw interest rate quoted on your statement (e.g. 12% mutual fund growth). Real return is the nominal rate minus the inflation rate (12% - 6% = 6% real wealth growth). Real return represents your true gain in purchasing power."
        />

        <FaqAccordionItem
          question="Why does Pocket Advisor include inflation discounting on all wealth tools?"
          answer="Planning for retirement with unadjusted figures leads to dangerous shortfalls. An Indian executive expecting to live on ₹1 Lakh/month today will require ₹3.2 Lakhs/month in 20 years just to maintain the exact same standard of living."
        />
      </div>

      <CalculatorDisclaimerAndAssumptions
        toolName="Inflation Calculator"
        assumptions={[
          'Annual inflation rate is assumed uniform across all years in the horizon',
          'Does not account for category-specific inflation differentials (e.g., healthcare vs food)',
          'Illustrative purchasing power model based on constant compound discount rates',
        ]}
      />

      <RelatedToolsNav currentTool="inflation" />
      <AppConversionBanner />
    </div>
  );
};


