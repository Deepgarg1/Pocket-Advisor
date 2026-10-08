import React, { useState, useMemo } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { formatMoney } from '../../utils/formatters';
import {
  TrendingUp,
  ShieldCheck,
  Scale,
  Sparkles,
  Copy,
  Check,
  MessageCircle,
} from 'lucide-react';

interface PrepaymentVsSipCalculatorProps {
  onExploreOther?: (tab: 'SPLIT' | 'EMI' | 'SIP') => void;
}

export const PrepaymentVsSipCalculator: React.FC<PrepaymentVsSipCalculatorProps> = ({ onExploreOther }) => {
  const { currencySymbol } = useSettings();

  // State
  const [loanPrincipal, setLoanPrincipal] = useState<number>(4000000); // 40 Lakhs
  const [loanInterestRate, setLoanInterestRate] = useState<number>(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 Years
  const [monthlySurplus, setMonthlySurplus] = useState<number>(10000); // 10k/month extra
  const [expectedSipReturn, setExpectedSipReturn] = useState<number>(12); // 12% equity CAGR
  const [annualLumpsum, setAnnualLumpsum] = useState<number>(0); // e.g. Diwali bonus
  const [activeStrategyView, setActiveStrategyView] = useState<'VERDICT' | 'MILESTONES' | 'HYBRID'>('VERDICT');
  const [copiedShare, setCopiedShare] = useState(false);

  // Calculations
  const comparison = useMemo(() => {
    const P = Math.max(0, loanPrincipal || 0);
    const R_loan = Math.max(0.1, loanInterestRate || 0);
    const T = Math.max(1, tenureYears || 0);
    const extraMonthly = Math.max(0, monthlySurplus || 0);
    const annualBonus = Math.max(0, annualLumpsum || 0);
    const R_sip = Math.max(0.1, expectedSipReturn || 0);

    const totalMonths = T * 12;
    const r_loan = R_loan / 12 / 100;
    const r_sip = R_sip / 12 / 100;

    // Standard EMI formula
    const factor = Math.pow(1 + r_loan, totalMonths);
    const regularEmi = factor > 1 ? (P * r_loan * factor) / (factor - 1) : P / totalMonths;
    const totalBasePayment = regularEmi * totalMonths;
    const totalBaseInterest = Math.max(0, totalBasePayment - P);

    // Simulation Option A: Home Loan Prepayment (reducing balance)
    let balancePrepay = P;
    let monthsToPayoff = 0;
    let totalInterestPaidPrepay = 0;
    let totalExtraPaid = 0;

    for (let m = 1; m <= totalMonths; m++) {
      if (balancePrepay <= 0) break;
      monthsToPayoff = m;

      const interestThisMonth = balancePrepay * r_loan;
      totalInterestPaidPrepay += interestThisMonth;

      const regularPrincipalPaid = regularEmi - interestThisMonth;
      const extraThisMonth = extraMonthly + (m % 12 === 0 ? annualBonus : 0);
      const totalPrincipalChunk = regularPrincipalPaid + extraThisMonth;

      if (totalPrincipalChunk >= balancePrepay) {
        totalExtraPaid += Math.max(0, balancePrepay - regularPrincipalPaid);
        balancePrepay = 0;
        break;
      } else {
        totalExtraPaid += extraThisMonth;
        balancePrepay -= totalPrincipalChunk;
      }
    }

    const monthsSaved = Math.max(0, totalMonths - monthsToPayoff);
    const yearsSaved = (monthsSaved / 12).toFixed(1);
    const interestSaved = Math.max(0, totalBaseInterest - totalInterestPaidPrepay);

    // Simulation Option B: Regular EMI + Surplus Invested in SIP
    // Invest for full original tenure totalMonths
    let sipCorpus = 0;
    let totalSipInvested = 0;

    for (let m = 1; m <= totalMonths; m++) {
      const deposit = extraMonthly + (m % 12 === 0 ? annualBonus : 0);
      totalSipInvested += deposit;
      sipCorpus = (sipCorpus + deposit) * (1 + r_sip);
    }

    const sipNetWealthProfit = Math.max(0, sipCorpus - totalSipInvested);

    // Simulation Option C: The 50:50 Hybrid Strategy
    // 50% extra surplus to prepay, 50% to SIP
    let balanceHybrid = P;
    let hybridMonths = 0;
    let hybridInterestPaid = 0;
    let hybridSipCorpus = 0;
    let hybridSipInvested = 0;

    for (let m = 1; m <= totalMonths; m++) {
      // Half surplus to loan
      if (balanceHybrid > 0) {
        hybridMonths = m;
        const interest = balanceHybrid * r_loan;
        hybridInterestPaid += interest;
        const regPrin = regularEmi - interest;
        const halfExtra = (extraMonthly / 2) + (m % 12 === 0 ? annualBonus / 2 : 0);
        const totalPrin = regPrin + halfExtra;
        if (totalPrin >= balanceHybrid) {
          balanceHybrid = 0;
        } else {
          balanceHybrid -= totalPrin;
        }
      }

      // Half surplus to SIP for full tenure
      const halfSip = (extraMonthly / 2) + (m % 12 === 0 ? annualBonus / 2 : 0);
      hybridSipInvested += halfSip;
      hybridSipCorpus = (hybridSipCorpus + halfSip) * (1 + r_sip);
    }

    const hybridInterestSaved = Math.max(0, totalBaseInterest - hybridInterestPaid);
    const hybridYearsSaved = ((totalMonths - hybridMonths) / 12).toFixed(1);

    // Calculation Verdict
    const netDifference = Math.abs(sipNetWealthProfit - interestSaved);
    const isSipWinner = sipNetWealthProfit > interestSaved;

    return {
      regularEmi,
      totalBasePayment,
      totalBaseInterest,
      // Option A
      monthsToPayoff,
      yearsToPayoff: (monthsToPayoff / 12).toFixed(1),
      monthsSaved,
      yearsSaved,
      interestSaved,
      totalInterestPaidPrepay,
      totalExtraPaid,
      // Option B
      sipCorpus,
      totalSipInvested,
      sipNetWealthProfit,
      // Option C
      hybridInterestSaved,
      hybridYearsSaved,
      hybridSipCorpus,
      hybridSipInvested,
      // Verdict
      isSipWinner,
      netDifference,
    };
  }, [loanPrincipal, loanInterestRate, tenureYears, monthlySurplus, annualLumpsum, expectedSipReturn]);

  const handleShareWhatsApp = () => {
    const text = `⚖️ *Home Loan Prepayment vs. SIP Analysis*
🏠 *Loan:* ${formatMoney(loanPrincipal, currencySymbol)} at ${loanInterestRate}% (${tenureYears} yrs)
💵 *Regular EMI:* ${formatMoney(comparison.regularEmi, currencySymbol)}/mo
💰 *Extra Monthly Surplus:* ${formatMoney(monthlySurplus, currencySymbol)}/mo

📊 *Strategy Comparison:*
1️⃣ *Prepay Home Loan:*
   • Pay off loan in *${comparison.yearsToPayoff} years* (Saved *${comparison.yearsSaved} years*!)
   • Total Interest Saved: *${formatMoney(comparison.interestSaved, currencySymbol)}* (100% Risk-Free)

2️⃣ *Invest Surplus in Equity SIP (${expectedSipReturn}% CAGR):*
   • Total Invested: ${formatMoney(comparison.totalSipInvested, currencySymbol)}
   • Accumulated SIP Corpus: *${formatMoney(comparison.sipCorpus, currencySymbol)}*
   • Net Wealth Gain: *${formatMoney(comparison.sipNetWealthProfit, currencySymbol)}*

🏆 *Verdict:* ${
      comparison.isSipWinner
        ? `Investing in SIP builds *${formatMoney(comparison.netDifference, currencySymbol)} MORE net wealth* than loan prepayment!`
        : `Prepaying loan saves *${formatMoney(comparison.netDifference, currencySymbol)} MORE* with guaranteed peace of mind!`
    }

🔗 *Simulate your loan on Pocket Advisor:*
https://www.pocketadvisor.in/home-loan-prepayment-vs-sip`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopySummary = async () => {
    const text = `Home Loan Prepayment vs SIP Comparison:
Prepaying saves ${formatMoney(comparison.interestSaved, currencySymbol)} and cuts ${comparison.yearsSaved} years off your loan.
Investing in SIP builds a corpus of ${formatMoney(comparison.sipCorpus, currencySymbol)}.
Verdict: ${comparison.isSipWinner ? 'SIP Wins by ' + formatMoney(comparison.netDifference, currencySymbol) : 'Prepayment Wins by ' + formatMoney(comparison.netDifference, currencySymbol)}.
Calculated at https://www.pocketadvisor.in/home-loan-prepayment-vs-sip`;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Intro Header */}
      <div
        style={{
          padding: '24px 28px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
            <Scale size={14} /> The Ultimate Indian Homebuyer Dilemma
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Home Loan Prepayment vs. SIP Calculator
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '6px 0 0 0', maxWidth: '650px', lineHeight: 1.5 }}>
            Should you prepay your home loan to become debt-free early, or invest surplus cash in mutual fund SIPs to build long-term wealth? Compare compounded equity returns with guaranteed interest savings.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={handleShareWhatsApp}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
            }}
          >
            <MessageCircle size={16} /> Share Verdict
          </button>
          <button
            type="button"
            onClick={handleCopySummary}
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-surface-elevated)',
              color: copiedShare ? '#10b981' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {copiedShare ? <Check size={16} /> : <Copy size={16} />}
            <span>{copiedShare ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Grid: Inputs on Left, Visual Verdict & Comparison on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '28px',
          alignItems: 'start',
        }}
      >
        {/* ========================================================= */}
        {/* LEFT COLUMN: Loan & Investment Parameters                 */}
        {/* ========================================================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div
            style={{
              padding: 'clamp(20px, 3vw, 28px)',
              borderRadius: '24px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              🏠 1. Home Loan Details
            </h4>

            {/* Loan Principal */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Outstanding Loan Balance
                </label>
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '4px 10px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginRight: '4px' }}>{currencySymbol}</span>
                  <input
                    type="number"
                    min="100000"
                    step="50000"
                    value={loanPrincipal}
                    onChange={(e) => setLoanPrincipal(Number(e.target.value))}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: 700, width: '100px', textAlign: 'right', outline: 'none', fontSize: '0.9rem' }}
                    className="num-tabular"
                  />
                </div>
              </div>
              <input
                type="range"
                min="500000"
                max="15000000"
                step="100000"
                value={loanPrincipal}
                onChange={(e) => setLoanPrincipal(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>₹5 Lakhs</span>
                <span>₹75 Lakhs</span>
                <span>₹1.5 Crores</span>
              </div>
            </div>

            {/* Interest Rate & Tenure Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {/* Interest Rate */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Interest Rate (p.a.)
                  </label>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{loanInterestRate}%</span>
                </div>
                <input
                  type="range"
                  min="6.5"
                  max="14.0"
                  step="0.1"
                  value={loanInterestRate}
                  onChange={(e) => setLoanInterestRate(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>

              {/* Tenure */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Remaining Tenure
                  </label>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{tenureYears} Yrs</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* Standard EMI readout */}
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Regular Monthly EMI (No Prepay):
              </span>
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }} className="num-tabular">
                {formatMoney(comparison.regularEmi, currencySymbol)}
              </span>
            </div>
          </div>

          {/* Surplus & Investment Card */}
          <div
            style={{
              padding: 'clamp(20px, 3vw, 28px)',
              borderRadius: '24px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              💰 2. Surplus Cash &amp; Market Assumptions
            </h4>

            {/* Extra Monthly Surplus */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Extra Monthly Surplus Available
                </label>
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '4px 10px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginRight: '4px' }}>{currencySymbol}</span>
                  <input
                    type="number"
                    min="500"
                    step="1000"
                    value={monthlySurplus}
                    onChange={(e) => setMonthlySurplus(Number(e.target.value))}
                    style={{ background: 'transparent', border: 'none', color: '#10b981', fontWeight: 700, width: '90px', textAlign: 'right', outline: 'none', fontSize: '0.9rem' }}
                    className="num-tabular"
                  />
                </div>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={monthlySurplus}
                onChange={(e) => setMonthlySurplus(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>₹1,000 / mo</span>
                <span>₹50,000 / mo</span>
                <span>₹1,00,000 / mo</span>
              </div>
            </div>

            {/* Expected Equity SIP Return */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Expected Equity SIP Return (CAGR)
                </label>
                <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#f59e0b' }}>
                  {expectedSipReturn}% p.a.
                </span>
              </div>
              <input
                type="range"
                min="8.0"
                max="18.0"
                step="0.5"
                value={expectedSipReturn}
                onChange={(e) => setExpectedSipReturn(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#f59e0b', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>8% (Conservative)</span>
                <span>12% (Nifty Index)</span>
                <span>15%+ (High Growth)</span>
              </div>
            </div>

            {/* Optional Annual Bonus */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Optional Annual Lumpsum (Bonus/Diwali)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '3px 8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginRight: '4px' }}>{currencySymbol}</span>
                  <input
                    type="number"
                    min="0"
                    step="10000"
                    value={annualLumpsum}
                    onChange={(e) => setAnnualLumpsum(Number(e.target.value))}
                    placeholder="0"
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: 700, width: '80px', textAlign: 'right', outline: 'none', fontSize: '0.85rem' }}
                    className="num-tabular"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: The Comprehensive Calculation Verdict       */}
        {/* ========================================================= */}
        <div style={{ position: 'sticky', top: '90px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Main Verdict Card */}
          <div
            style={{
              padding: 'clamp(24px, 3vw, 32px)',
              borderRadius: '26px',
              backgroundColor: 'var(--bg-surface)',
              border: comparison.isSipWinner ? '1.5px solid rgba(245, 158, 11, 0.4)' : '1.5px solid rgba(16, 185, 129, 0.4)',
              boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Verdict Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  backgroundColor: comparison.isSipWinner ? 'rgba(245, 158, 11, 0.18)' : 'rgba(16, 185, 129, 0.18)',
                  color: comparison.isSipWinner ? '#f59e0b' : '#10b981',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                <Sparkles size={14} /> Mathematical Verdict
              </div>

              {/* View Switcher Tabs */}
              <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-surface-elevated)', borderRadius: '10px', padding: '3px', border: '1px solid var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={() => setActiveStrategyView('VERDICT')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '7px',
                    border: 'none',
                    background: activeStrategyView === 'VERDICT' ? 'var(--primary)' : 'transparent',
                    color: activeStrategyView === 'VERDICT' ? '#ffffff' : 'var(--text-muted)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Verdict
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStrategyView('HYBRID')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '7px',
                    border: 'none',
                    background: activeStrategyView === 'HYBRID' ? 'var(--primary)' : 'transparent',
                    color: activeStrategyView === 'HYBRID' ? '#ffffff' : 'var(--text-muted)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  50:50 Hybrid
                </button>
              </div>
            </div>

            {/* Headline Callout */}
            {activeStrategyView === 'VERDICT' ? (
              <div>
                <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.55rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3, margin: '0 0 8px 0' }}>
                  {comparison.isSipWinner ? (
                    <>
                      🚀 Investing in SIP yields{' '}
                      <span style={{ color: '#f59e0b' }}>
                        +{formatMoney(comparison.netDifference, currencySymbol)}
                      </span>{' '}
                      more wealth!
                    </>
                  ) : (
                    <>
                      🛡️ Prepaying your home loan saves{' '}
                      <span style={{ color: '#10b981' }}>
                        +{formatMoney(comparison.netDifference, currencySymbol)}
                      </span>{' '}
                      more!
                    </>
                  )}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                  {comparison.isSipWinner
                    ? `Compounding equity returns at ${expectedSipReturn}% CAGR easily outpace the ${loanInterestRate}% borrowing cost over ${tenureYears} years. However, loan prepayment guarantees a 100% risk-free return and mental peace.`
                    : `Because your borrowing interest rate (${loanInterestRate}%) is close to or higher than equity returns, paying down principal guarantees immediate compounded interest savings.`}
                </p>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                  🎯 The 50:50 Hybrid Compromise
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                  Why choose one? Invest {formatMoney(monthlySurplus / 2, currencySymbol)}/mo into SIPs and use {formatMoney(monthlySurplus / 2, currencySymbol)}/mo to prepay your loan principal.
                </p>
              </div>
            )}

            {/* Strategy Comparison Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {/* Option A: Prepayment Card */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1.5px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>
                  <ShieldCheck size={14} /> Option A: Prepay
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Interest Saved</span>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#10b981' }} className="num-tabular">
                    {formatMoney(comparison.interestSaved, currencySymbol)}
                  </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Closes loan in <strong>{comparison.yearsToPayoff} yrs</strong>
                  <br />
                  <span style={{ color: '#10b981', fontWeight: 700 }}>Saved {comparison.yearsSaved} Years!</span>
                </div>
              </div>

              {/* Option B: SIP Card */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1.5px solid rgba(245, 158, 11, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase' }}>
                  <TrendingUp size={14} /> Option B: SIP
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Maturity Corpus</span>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f59e0b' }} className="num-tabular">
                    {formatMoney(comparison.sipCorpus, currencySymbol)}
                  </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Total Profit: <strong>{formatMoney(comparison.sipNetWealthProfit, currencySymbol)}</strong>
                  <br />
                  <span style={{ color: '#f59e0b', fontWeight: 700 }}>Over {tenureYears} Years</span>
                </div>
              </div>
            </div>

            {/* Hybrid Strategy Breakdown (when hybrid tab or summary) */}
            {activeStrategyView === 'HYBRID' && (
              <div
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
                  Hybrid 50:50 Milestones
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Loan Interest Saved:</span>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>
                      {formatMoney(comparison.hybridInterestSaved, currencySymbol)}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Cuts {comparison.hybridYearsSaved} years</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Accumulated SIP Corpus:</span>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f59e0b' }}>
                      {formatMoney(comparison.hybridSipCorpus, currencySymbol)}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Invested {formatMoney(comparison.hybridSipInvested, currencySymbol)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Visual Bar Comparison */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: '#10b981' }}>Option A (Interest Saved: {formatMoney(comparison.interestSaved, currencySymbol)})</span>
                <span style={{ color: '#f59e0b' }}>Option B (SIP Profit: {formatMoney(comparison.sipNetWealthProfit, currencySymbol)})</span>
              </div>
              <div style={{ display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.06)' }}>
                {(() => {
                  const total = comparison.interestSaved + comparison.sipNetWealthProfit;
                  const pctPrepay = total > 0 ? (comparison.interestSaved / total) * 100 : 50;
                  const pctSip = total > 0 ? (comparison.sipNetWealthProfit / total) * 100 : 50;
                  return (
                    <>
                      <div style={{ width: `${pctPrepay}%`, backgroundColor: '#10b981', transition: 'width 0.3s ease' }} />
                      <div style={{ width: `${pctSip}%`, backgroundColor: '#f59e0b', transition: 'width 0.3s ease' }} />
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Crucial Insights Warning */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
              }}
            >
              💡 <strong>Tax Tip:</strong> If you claim home loan tax deductions (up to ₹2 Lakhs on interest under Section 24b and ₹1.5 Lakhs under 80C), your effective post-tax loan cost is lower (~6.5%–7%), making SIP investing even more lucrative.
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links to Other Spending Tools */}
      {onExploreOther && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '12px', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
          <span>Related Financial Tools:</span>
          <a
            href="/emi-calculator"
            onClick={(e) => {
              e.preventDefault();
              onExploreOther('EMI');
            }}
            style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}
          >
            Calculate Loan EMI &amp; Amortization
          </a>
          <span>•</span>
          <a
            href="/sip-calculator"
            onClick={(e) => {
              e.preventDefault();
              onExploreOther('SIP');
            }}
            style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}
          >
            Calculate Step-Up SIP Wealth Compounding
          </a>
          <span>•</span>
          <a
            href="/split"
            onClick={(e) => {
              e.preventDefault();
              onExploreOther('SPLIT');
            }}
            style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}
          >
            Split Group Bills with Free Bill Splitter
          </a>
        </div>
      )}
    </div>
  );
};
