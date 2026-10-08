import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Sparkles, Scale } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { formatMoney } from '../../utils/formatters';
import { PrepaymentVsSipCalculator } from '../tools/PrepaymentVsSipCalculator';
import {
  EmiCalculatorGuide,
  SipCalculatorGuide,
  PrepaymentVsSipGuide,
} from '../tools/CalculatorGuides';
import { updatePageSeo } from '../../utils/seo';

export type DemoTab = 'PREPAYMENT' | 'EMI' | 'SIP';

interface InteractiveDemoProps {
  initialTab?: DemoTab;
  onNavigate?: (view: string, shouldScroll?: boolean) => void;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ initialTab, onNavigate }) => {
  const { currencySymbol } = useSettings();
  const [activeTab, setActiveTab] = useState<DemoTab>(() => {
    if (initialTab) return initialTab;
    const full = `${window.location.pathname} ${window.location.hash}`.toLowerCase();
    if (full.includes('prepayment') || full.includes('vs-sip') || full.includes('prepay')) return 'PREPAYMENT';
    if (full.includes('sip')) return 'SIP';
    if (full.includes('emi') || full.includes('loan')) return 'EMI';
    return 'EMI';
  });

  useEffect(() => {
    if (initialTab && initialTab !== activeTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    const handleLocation = () => {
      const full = `${window.location.pathname} ${window.location.hash}`.toLowerCase();
      if (full.includes('prepayment') || full.includes('vs-sip') || full.includes('prepay')) setActiveTab('PREPAYMENT');
      else if (full.includes('sip')) setActiveTab('SIP');
      else if (full.includes('emi') || full.includes('loan')) setActiveTab('EMI');
    };
    window.addEventListener('hashchange', handleLocation);
    window.addEventListener('popstate', handleLocation);
    return () => {
      window.removeEventListener('hashchange', handleLocation);
      window.removeEventListener('popstate', handleLocation);
    };
  }, []);

  const handleSelectTab = (tab: DemoTab) => {
    setActiveTab(tab);
    let viewSlug = 'emi-calculator';
    if (tab === 'PREPAYMENT') {
      viewSlug = 'home-loan-prepayment-vs-sip';
      window.history.replaceState(null, '', '/home-loan-prepayment-vs-sip');
      updatePageSeo('home-loan-prepayment-vs-sip');
    } else if (tab === 'EMI') {
      viewSlug = 'emi-calculator';
      window.history.replaceState(null, '', '/emi-calculator');
      updatePageSeo('emi-calculator');
    } else if (tab === 'SIP') {
      viewSlug = 'sip-calculator';
      window.history.replaceState(null, '', '/sip-calculator');
      updatePageSeo('sip-calculator');
    }
    if (onNavigate) {
      onNavigate(viewSlug, false);
    }
  };

  // EMI State
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  // SIP State
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [investmentYears, setInvestmentYears] = useState<number>(10);
  const [sipTiming, setSipTiming] = useState<'beginning' | 'end'>('beginning');
  const [annualStepUp, setAnnualStepUp] = useState<number>(5);
  const [inflationRate, setInflationRate] = useState<number>(6);

  // Calculate EMI
  const emiRes = React.useMemo(() => {
    const principal = Math.max(0, loanAmount || 0);
    const months = Math.max(0, (tenureYears || 0) * 12);
    if (principal <= 0 || months <= 0) {
      return { emi: 0, totalPayment: 0, totalInterest: 0, principalPct: 100, interestPct: 0 };
    }
    const monthlyRate = Math.max(0, interestRate || 0) / 12 / 100;
    if (monthlyRate === 0) {
      const emi = principal / months;
      return { emi, totalPayment: principal, totalInterest: 0, principalPct: 100, interestPct: 0 };
    }
    const rateFactor = Math.pow(1 + monthlyRate, months);
    if (!Number.isFinite(rateFactor) || rateFactor <= 1) {
      return { emi: 0, totalPayment: 0, totalInterest: 0, principalPct: 100, interestPct: 0 };
    }
    const emi = (principal * monthlyRate * rateFactor) / (rateFactor - 1);
    const totalPayment = emi * months;
    const totalInterest = Math.max(0, totalPayment - principal);
    const principalPct = totalPayment > 0 ? Math.min(100, Math.max(0, Math.round((principal / totalPayment) * 100))) : 100;
    const interestPct = Math.max(0, 100 - principalPct);
    return { emi, totalPayment, totalInterest, principalPct, interestPct };
  }, [loanAmount, interestRate, tenureYears]);

  // Calculate SIP with Step-Up & Inflation
  const sipRes = React.useMemo(() => {
    let currentMonthlySip = Math.max(0, monthlyInvestment || 0);
    let totalWealth = 0;
    let investedAmount = 0;
    const years = Math.max(0, investmentYears || 0);
    const retRate = Math.max(0, expectedReturn || 0);
    const stepUp = Math.max(0, annualStepUp || 0);
    const infRate = Math.max(0, inflationRate || 0);
    
    // Industry-standard mutual fund monthly compounding rate: r / 12
    const monthlyRate = (retRate / 12) / 100;
    
    if (years > 0 && currentMonthlySip > 0) {
      for (let year = 1; year <= years; year++) {
        for (let month = 1; month <= 12; month++) {
          investedAmount += currentMonthlySip;
          
          if (sipTiming === 'beginning') {
            // Add this month's deposit, then apply interest to entire corpus
            totalWealth += currentMonthlySip;
            totalWealth *= (1 + monthlyRate);
          } else {
            // Apply interest to existing corpus, then add this month's deposit
            totalWealth *= (1 + monthlyRate);
            totalWealth += currentMonthlySip;
          }
        }
        // Apply step-up at the end of the year
        currentMonthlySip += currentMonthlySip * (stepUp / 100);
      }
    }
    
    const estReturns = Math.max(0, totalWealth - investedAmount);
    
    // Calculate Inflation adjusted value (Discounting totalWealth by inflation rate over investmentYears)
    const inflationDiscountFactor = Math.pow(1 + infRate / 100, years);
    const realWealth = inflationDiscountFactor > 0 ? totalWealth / inflationDiscountFactor : totalWealth;
    const investedPct = totalWealth > 0 ? Math.min(100, Math.max(0, Math.round((investedAmount / totalWealth) * 100))) : 0;
    const returnsPct = Math.max(0, 100 - investedPct);
    
    return { totalWealth, investedAmount, estReturns, realWealth, investedPct, returnsPct };
  }, [monthlyInvestment, expectedReturn, investmentYears, sipTiming, annualStepUp, inflationRate]);

  return (
    <section
      id="calculator"
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
          <Sparkles size={14} /> Zero Login • 100% Free Spending Sandbox
        </div>
        <h2 style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '8px', color: 'var(--text-primary)' }}>
          Smart Calculators
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.5 }}>
          Calculate loan EMIs, plan your SIP investments, or compare home loan prepayment vs SIP returns.
        </p>
      </div>

      {/* Segmented Tab Switcher */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '32px',
          flexWrap: 'wrap',
          background: 'var(--bg-surface-elevated)',
          padding: '6px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          maxWidth: 'fit-content',
          margin: '0 auto 32px auto',
        }}
      >

        <a
          href="/home-loan-prepayment-vs-sip"
          onClick={(e) => {
            e.preventDefault();
            handleSelectTab('PREPAYMENT');
          }}
          title="Home Loan Prepayment vs Equity SIP Calculator"
          style={{
            padding: '9px 20px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: activeTab === 'PREPAYMENT' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'PREPAYMENT' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: activeTab === 'PREPAYMENT' ? '0 4px 16px rgba(99, 102, 241, 0.45)' : 'none',
            textDecoration: 'none',
          }}
        >
          <Scale size={16} />
          <span>Prepay vs SIP</span>
          <span
            style={{
              fontSize: '0.62rem',
              fontWeight: 800,
              padding: '2px 6px',
              borderRadius: '6px',
              backgroundColor: activeTab === 'PREPAYMENT' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(245, 158, 11, 0.15)',
              color: activeTab === 'PREPAYMENT' ? '#ffffff' : '#f59e0b',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Hot
          </span>
        </a>

        <a
          href="/emi-calculator"
          onClick={(e) => {
            e.preventDefault();
            handleSelectTab('EMI');
          }}
          title="Loan EMI Calculator with Amortization Schedule"
          style={{
            padding: '9px 20px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: activeTab === 'EMI' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'EMI' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: activeTab === 'EMI' ? '0 4px 16px rgba(99, 102, 241, 0.45)' : 'none',
            textDecoration: 'none',
          }}
        >
          <Calculator size={16} />
          <span>Loan EMI Calculator</span>
        </a>

        <a
          href="/sip-calculator"
          onClick={(e) => {
            e.preventDefault();
            handleSelectTab('SIP');
          }}
          title="Step-Up SIP Wealth Compounding Calculator"
          style={{
            padding: '9px 20px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: activeTab === 'SIP' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'SIP' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: activeTab === 'SIP' ? '0 4px 16px rgba(99, 102, 241, 0.45)' : 'none',
            textDecoration: 'none',
          }}
        >
          <TrendingUp size={16} />
          <span>SIP Wealth Planner</span>
        </a>
      </div>

      {activeTab === 'PREPAYMENT' ? (
        <>
          <PrepaymentVsSipCalculator
            onExploreOther={(tab) => {
              if (tab === 'SPLIT') {
                if (onNavigate) onNavigate('split');
              } else {
                handleSelectTab(tab);
              }
            }}
          />
          <PrepaymentVsSipGuide />
        </>
      ) : (
        <>
          <div
            style={{
              padding: 'clamp(24px, 4vw, 36px)',
              borderRadius: '26px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
          {activeTab === 'EMI' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              alignItems: 'center',
            }}
          >
            {/* Input Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Loan Amount
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '4px 8px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginRight: '4px' }}>{currencySymbol}</span>
                    <input
                      type="number"
                      value={loanAmount || (loanAmount === 0 ? 0 : '')}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: 700, width: '90px', textAlign: 'right', outline: 'none', fontSize: '0.9rem' }}
                      className="num-tabular"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="5000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Interest Rate (Annual)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '4px 8px' }}>
                    <input
                      type="number"
                      value={interestRate || (interestRate === 0 ? 0 : '')}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: 700, width: '50px', textAlign: 'right', outline: 'none', fontSize: '0.9rem' }}
                      className="num-tabular"
                    />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginLeft: '4px' }}>%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Tenure (Years)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '4px 8px' }}>
                    <input
                      type="number"
                      value={tenureYears || (tenureYears === 0 ? 0 : '')}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: 700, width: '40px', textAlign: 'right', outline: 'none', fontSize: '0.9rem' }}
                      className="num-tabular"
                    />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginLeft: '4px' }}>Yrs</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>
            </div>

            {/* Results Card */}
            <div
              style={{
                padding: '28px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }}
            >
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>MONTHLY EMI</p>
                <h3 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--primary)' }} className="num-tabular">
                  {formatMoney(Math.round(emiRes.emi), currencySymbol, 0)}
                </h3>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Principal Amount:</span>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }} className="num-tabular">{formatMoney(Math.round(loanAmount), currencySymbol, 0)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Interest Payable:</span>
                <span style={{ fontWeight: 700, color: 'var(--expense)' }} className="num-tabular">{formatMoney(Math.round(emiRes.totalInterest), currencySymbol, 0)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Payment:</span>
                <span style={{ fontWeight: 700 }} className="num-tabular">{formatMoney(Math.round(emiRes.totalPayment), currencySymbol, 0)}</span>
              </div>
              
              {/* Visual Breakdown Bar */}
              <div style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                  <span style={{ color: 'var(--primary)' }}>{emiRes.principalPct}% Principal</span>
                  <span style={{ color: 'var(--expense)' }}>{emiRes.interestPct}% Interest</span>
                </div>
                <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden', background: 'var(--bg-surface)' }}>
                  <div style={{ width: `${emiRes.principalPct}%`, background: 'var(--primary)' }} title="Principal" />
                  <div style={{ width: `${emiRes.interestPct}%`, background: 'var(--expense)' }} title="Interest" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              alignItems: 'center',
            }}
          >
            {/* SIP Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Monthly Investment
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '4px 8px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginRight: '4px' }}>{currencySymbol}</span>
                    <input
                      type="number"
                      value={monthlyInvestment || (monthlyInvestment === 0 ? 0 : '')}
                      onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: 700, width: '90px', textAlign: 'right', outline: 'none', fontSize: '0.9rem' }}
                      className="num-tabular"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--income)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Expected Return Rate (p.a.)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '4px 8px' }}>
                    <input
                      type="number"
                      value={expectedReturn || (expectedReturn === 0 ? 0 : '')}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: 700, width: '50px', textAlign: 'right', outline: 'none', fontSize: '0.9rem' }}
                      className="num-tabular"
                    />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginLeft: '4px' }}>%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--income)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Time Period (Years)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '4px 8px' }}>
                    <input
                      type="number"
                      value={investmentYears || (investmentYears === 0 ? 0 : '')}
                      onChange={(e) => setInvestmentYears(Number(e.target.value))}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: 700, width: '40px', textAlign: 'right', outline: 'none', fontSize: '0.9rem' }}
                      className="num-tabular"
                    />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginLeft: '4px' }}>Yrs</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  step="1"
                  value={investmentYears}
                  onChange={(e) => setInvestmentYears(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--income)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Annual Step-Up
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '4px 8px' }}>
                    <input
                      type="number"
                      value={annualStepUp || (annualStepUp === 0 ? 0 : '')}
                      onChange={(e) => setAnnualStepUp(Number(e.target.value))}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: 700, width: '50px', textAlign: 'right', outline: 'none', fontSize: '0.9rem' }}
                      className="num-tabular"
                    />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginLeft: '4px' }}>%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="1"
                  value={annualStepUp}
                  onChange={(e) => setAnnualStepUp(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--info)' }}
                />
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Expected Inflation
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '4px 8px' }}>
                    <input
                      type="number"
                      value={inflationRate || (inflationRate === 0 ? 0 : '')}
                      onChange={(e) => setInflationRate(Number(e.target.value))}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: 700, width: '50px', textAlign: 'right', outline: 'none', fontSize: '0.9rem' }}
                      className="num-tabular"
                    />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginLeft: '4px' }}>%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--warning)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Installment Timing
                  </label>
                  <span style={{ fontSize: '0.75rem', color: 'var(--income)', fontWeight: 600 }}>
                    {sipTiming === 'beginning' ? 'Compounded Annuity Due' : 'Ordinary Annuity'}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setSipTiming('beginning')}
                    style={{
                      padding: '8px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      borderRadius: '8px',
                      border: sipTiming === 'beginning' ? '1px solid #10b981' : '1px solid var(--border-subtle)',
                      background: sipTiming === 'beginning' ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-surface-elevated)',
                      color: sipTiming === 'beginning' ? '#10b981' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    Month Start (Standard)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSipTiming('end')}
                    style={{
                      padding: '8px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      borderRadius: '8px',
                      border: sipTiming === 'end' ? '1px solid #10b981' : '1px solid var(--border-subtle)',
                      background: sipTiming === 'end' ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-surface-elevated)',
                      color: sipTiming === 'end' ? '#10b981' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    Month End
                  </button>
                </div>
              </div>
            </div>

            {/* SIP Output */}
            <div
              style={{
                padding: '28px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }}
            >
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>ESTIMATED MATURITY WEALTH</p>
                <h3 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--income)' }} className="num-tabular">
                  {formatMoney(Math.round(sipRes.totalWealth), currencySymbol, 0)}
                </h3>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Invested Capital:</span>
                <span style={{ fontWeight: 700, color: 'var(--info)' }} className="num-tabular">{formatMoney(Math.round(sipRes.investedAmount), currencySymbol, 0)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Estimated Returns:</span>
                <span style={{ fontWeight: 700, color: 'var(--income)' }} className="num-tabular">{formatMoney(Math.round(sipRes.estReturns), currencySymbol, 0)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>Real Wealth <span style={{ fontSize: '0.7rem' }}>(Inflation Adj):</span></span>
                <span style={{ fontWeight: 700, color: 'var(--warning)' }} className="num-tabular">{formatMoney(Math.round(sipRes.realWealth), currencySymbol, 0)}</span>
              </div>
              
              {/* Visual Breakdown Bar */}
              <div style={{ marginTop: '4px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                  <span style={{ color: 'var(--info)' }}>{sipRes.investedPct}% Invested</span>
                  <span style={{ color: 'var(--income)' }}>{sipRes.returnsPct}% Returns</span>
                </div>
                <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden', background: 'var(--bg-surface)' }}>
                  <div style={{ width: `${sipRes.investedPct}%`, background: 'var(--info)' }} title="Invested Capital" />
                  <div style={{ width: `${sipRes.returnsPct}%`, background: 'var(--income)' }} title="Estimated Returns" />
                </div>
              </div>

              <div style={{ marginTop: '2px', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                {sipTiming === 'beginning' ? (
                  <span>
                    <strong style={{ color: '#10b981' }}>Model:</strong> Annuity Due (start of month). Annual step-up applied at end of year. Real wealth assumes {inflationRate}% constant inflation.
                  </span>
                ) : (
                  <span>
                    <strong style={{ color: 'var(--text-secondary)' }}>Model:</strong> Ordinary Annuity (end of month). Annual step-up applied at end of year. Real wealth assumes {inflationRate}% constant inflation.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {activeTab === 'EMI' && <EmiCalculatorGuide />}
      {activeTab === 'SIP' && <SipCalculatorGuide />}
    </>
    )}
    </section>
  );
};
