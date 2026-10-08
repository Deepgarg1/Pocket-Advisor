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

// Inter-Tool Navigation for SEO & Crawl Architecture
export const RelatedToolsNav: React.FC<{
  currentTool: 'split' | 'emi' | 'sip' | 'prepayment' | 'rent';
}> = ({ currentTool }) => {
  const tools = [
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
      id: 'rent',
      href: '/flatmates-rent-splitter',
      title: 'Split Flatmates Rent & WiFi Bills with 1-Tap UPI',
      shortTitle: 'Flatmates Rent Splitter',
      badge: 'Roommates',
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
          {/* <a
            href="https://play.google.com/store/apps/details?id=com.pocketadvisor.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="primary"
              style={{
                width: '100%',
                padding: '12px 20px',
                fontWeight: 700,
                fontSize: '0.92rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 20px rgba(99, 102, 241, 0.35)',
              }}
            >
              <Sparkles size={16} /> Get on Google Play
            </Button>
          </a> */}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={16} color="#10b981" /> 100% Offline & Private
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={16} color="#10b981" /> No OTP or Netbanking Passwords
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={16} color="#10b981" /> 4.9 ★ Rating on Android
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
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>₹10,00,000</td>
                <td style={{ padding: '12px 16px' }}>5 Years</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 700 }}>₹20,517</td>
                <td style={{ padding: '12px 16px', color: 'var(--warning)' }}>₹2,30,992</td>
                <td style={{ padding: '12px 16px' }}>₹12,30,992</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
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
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>₹10,000 / mo</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>0% (Flat)</td>
                <td style={{ padding: '12px 16px' }}>15 Years</td>
                <td style={{ padding: '12px 16px' }}>₹18,00,000</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 700 }}>₹50,45,760</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
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
              <tr style={{ borderBottom: '1.5px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '12px 16px' }}>Dimension</th>
                <th style={{ padding: '12px 16px' }}>Option A: Prepay Home Loan</th>
                <th style={{ padding: '12px 16px' }}>Option B: Equity SIP</th>
                <th style={{ padding: '12px 16px' }}>Option C: 50:50 Hybrid</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Nature of Return</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 600 }}>100% Guaranteed &amp; Risk-Free</td>
                <td style={{ padding: '12px 16px', color: '#f59e0b', fontWeight: 600 }}>Market-Linked (Volatile)</td>
                <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 600 }}>Balanced Risk-Return</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Effective Rate</td>
                <td style={{ padding: '12px 16px' }}>Saves 8.5% borrowing cost</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 700 }}>Compounds at ~12%–14% CAGR</td>
                <td style={{ padding: '12px 16px' }}>Earns 12% on half, saves 8.5% on half</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>Liquidity</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>Low (Locked in brick &amp; mortar)</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 600 }}>High (Redeemable in T+2 days)</td>
                <td style={{ padding: '12px 16px' }}>Moderate emergency liquidity</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
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

