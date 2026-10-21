import React, { useState, useEffect, useMemo } from 'react';
import {
  Calculator,
  TrendingUp,
  Sparkles,
  Scale,
  MessageCircle,
  Copy,
  Check,
  Smartphone,
  Target,
  Landmark,
  Flame,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { formatMoney } from '../../utils/formatters';
import { PrepaymentVsSipCalculator } from '../tools/PrepaymentVsSipCalculator';
import { SavingsGoalCalculator } from '../tools/SavingsGoalCalculator';
import { FdRdCalculator } from '../tools/FdRdCalculator';
import { CompoundInterestCalculator } from '../tools/CompoundInterestCalculator';
import { InflationCalculator } from '../tools/InflationCalculator';
import '../tools/CalculatorCard.css';
import {
  EmiCalculatorGuide,
  SipCalculatorGuide,
  PrepaymentVsSipGuide,
  SavingsGoalGuide,
  FdRdGuide,
  CompoundInterestGuide,
  InflationGuide,
} from '../tools/CalculatorGuides';
import { updatePageSeo } from '../../utils/seo';

export type DemoTab = 'PREPAYMENT' | 'EMI' | 'SIP' | 'GOAL' | 'FD_RD' | 'COMPOUND' | 'INFLATION';

interface InteractiveDemoProps {
  initialTab?: DemoTab;
  onNavigate?: (view: string, shouldScroll?: boolean) => void;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ initialTab, onNavigate }) => {
  const { currencySymbol } = useSettings();

  // Read initial query parameters for state persistence & direct link sharing
  const initialParams = useMemo(() => {
    if (typeof window === 'undefined') return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  }, []);

  const [activeTab, setActiveTab] = useState<DemoTab>(() => {
    if (initialTab) return initialTab;
    const full = `${window.location.pathname} ${window.location.hash}`.toLowerCase();
    if (full.includes('prepayment') || full.includes('vs-sip') || full.includes('prepay')) return 'PREPAYMENT';
    if (full.includes('savings-goal') || full.includes('goal')) return 'GOAL';
    if (full.includes('fd-rd') || full.includes('fixed-deposit') || full.includes('fdrd')) return 'FD_RD';
    if (full.includes('compound')) return 'COMPOUND';
    if (full.includes('inflation')) return 'INFLATION';
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
      else if (full.includes('savings-goal') || full.includes('goal')) setActiveTab('GOAL');
      else if (full.includes('fd-rd') || full.includes('fixed-deposit') || full.includes('fdrd')) setActiveTab('FD_RD');
      else if (full.includes('compound')) setActiveTab('COMPOUND');
      else if (full.includes('inflation')) setActiveTab('INFLATION');
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
    } else if (tab === 'GOAL') {
      viewSlug = 'savings-goal-calculator';
      window.history.replaceState(null, '', '/savings-goal-calculator');
      updatePageSeo('savings-goal-calculator');
    } else if (tab === 'FD_RD') {
      viewSlug = 'fd-rd-calculator';
      window.history.replaceState(null, '', '/fd-rd-calculator');
      updatePageSeo('fd-rd-calculator');
    } else if (tab === 'COMPOUND') {
      viewSlug = 'compound-interest-calculator';
      window.history.replaceState(null, '', '/compound-interest-calculator');
      updatePageSeo('compound-interest-calculator');
    } else if (tab === 'INFLATION') {
      viewSlug = 'inflation-calculator';
      window.history.replaceState(null, '', '/inflation-calculator');
      updatePageSeo('inflation-calculator');
    }
    if (onNavigate) {
      onNavigate(viewSlug, false);
    }
  };

  // EMI State with URL Param hydration
  const [loanAmount, setLoanAmount] = useState<number>(() => {
    const val = Number(initialParams.get('amount') || initialParams.get('loan'));
    return Number.isFinite(val) && val > 0 ? val : 500000;
  });
  const [interestRate, setInterestRate] = useState<number>(() => {
    const val = Number(initialParams.get('rate'));
    return Number.isFinite(val) && val > 0 ? val : 8.5;
  });
  const [tenureYears, setTenureYears] = useState<number>(() => {
    const val = Number(initialParams.get('years') || initialParams.get('tenure'));
    return Number.isFinite(val) && val > 0 ? val : 5;
  });

  // SIP State with URL Param hydration
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(() => {
    const val = Number(initialParams.get('monthly') || initialParams.get('sip'));
    return Number.isFinite(val) && val > 0 ? val : 10000;
  });
  const [expectedReturn, setExpectedReturn] = useState<number>(() => {
    const val = Number(initialParams.get('return') || initialParams.get('rate'));
    return Number.isFinite(val) && val > 0 ? val : 12;
  });
  const [investmentYears, setInvestmentYears] = useState<number>(() => {
    const val = Number(initialParams.get('years') || initialParams.get('tenure'));
    return Number.isFinite(val) && val > 0 ? val : 10;
  });
  const [sipTiming, setSipTiming] = useState<'beginning' | 'end'>(() => {
    const val = initialParams.get('timing');
    return val === 'end' ? 'end' : 'beginning';
  });
  const [annualStepUp, setAnnualStepUp] = useState<number>(() => {
    const val = Number(initialParams.get('stepup'));
    return Number.isFinite(val) && val >= 0 ? val : 5;
  });
  const [inflationRate] = useState<number>(() => {
    const val = Number(initialParams.get('inflation'));
    return Number.isFinite(val) && val >= 0 ? val : 6;
  });

  // Clipboard copy state flags
  const [copiedEmi, setCopiedEmi] = useState(false);
  const [copiedSip, setCopiedSip] = useState(false);

  // Sync EMI parameters to URL address bar (debounced)
  useEffect(() => {
    if (typeof window === 'undefined' || activeTab !== 'EMI' || window.location.pathname === '/calculators') return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (loanAmount !== 500000) params.set('amount', String(loanAmount));
      if (interestRate !== 8.5) params.set('rate', String(interestRate));
      if (tenureYears !== 5) params.set('years', String(tenureYears));
      const qs = params.toString();
      const newPath = qs ? `/emi-calculator?${qs}` : '/emi-calculator';
      try {
        window.history.replaceState(null, '', newPath);
      } catch {
        // Ignore rate limiting exceptions
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [activeTab, loanAmount, interestRate, tenureYears]);

  // Sync SIP parameters to URL address bar (debounced)
  useEffect(() => {
    if (typeof window === 'undefined' || activeTab !== 'SIP' || window.location.pathname === '/calculators') return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (monthlyInvestment !== 10000) params.set('monthly', String(monthlyInvestment));
      if (expectedReturn !== 12) params.set('return', String(expectedReturn));
      if (investmentYears !== 10) params.set('years', String(investmentYears));
      if (annualStepUp !== 5) params.set('stepup', String(annualStepUp));
      if (inflationRate !== 6) params.set('inflation', String(inflationRate));
      if (sipTiming !== 'beginning') params.set('timing', sipTiming);
      const qs = params.toString();
      const newPath = qs ? `/sip-calculator?${qs}` : '/sip-calculator';
      try {
        window.history.replaceState(null, '', newPath);
      } catch {
        // Ignore rate limiting exceptions
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [activeTab, monthlyInvestment, expectedReturn, investmentYears, annualStepUp, inflationRate, sipTiming]);

  // Dynamic shareable URLs
  const emiShareUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set('amount', String(loanAmount));
    params.set('rate', String(interestRate));
    params.set('years', String(tenureYears));
    return `https://www.pocketadvisor.in/emi-calculator?${params.toString()}`;
  }, [loanAmount, interestRate, tenureYears]);

  const sipShareUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set('monthly', String(monthlyInvestment));
    params.set('return', String(expectedReturn));
    params.set('years', String(investmentYears));
    params.set('stepup', String(annualStepUp));
    if (inflationRate !== 6) params.set('inflation', String(inflationRate));
    return `https://www.pocketadvisor.in/sip-calculator?${params.toString()}`;
  }, [monthlyInvestment, expectedReturn, investmentYears, annualStepUp, inflationRate]);

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
        <h1 style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '8px', color: 'var(--text-primary)' }}>
          {activeTab === 'PREPAYMENT' && 'Home Loan Prepayment vs. Equity SIP Calculator'}
          {activeTab === 'EMI' && 'Loan EMI Calculator & Amortization Schedule'}
          {activeTab === 'SIP' && 'Step-Up SIP Calculator & Compounding Simulator'}
          {activeTab === 'GOAL' && 'Target Savings Goal & Reverse SIP Planner'}
          {activeTab === 'FD_RD' && 'Fixed Deposit (FD) & Recurring Deposit (RD) Calculator'}
          {activeTab === 'COMPOUND' && 'Compound Interest Calculator & Frequency Modeler'}
          {activeTab === 'INFLATION' && 'Inflation & Purchasing Power Erosion Calculator'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.5 }}>
          {activeTab === 'PREPAYMENT' && 'Compare guaranteed interest saved by prepaying home loan principal against historical wealth generated from equity mutual fund SIPs.'}
          {activeTab === 'EMI' && 'Calculate exact monthly loan EMI, total interest liability, and amortized repayment schedules for home, car, or personal loans.'}
          {activeTab === 'SIP' && 'Project compound wealth accumulation for monthly systematic investments with annual step-ups and real inflation discounting.'}
          {activeTab === 'GOAL' && 'Calculate exact monthly savings required using annuity due formulas to reach a target down payment, emergency fund, or corpus.'}
          {activeTab === 'FD_RD' && 'Simulate maturity amounts and effective annual yields with quarterly compounding standard in Indian public and private banks.'}
          {activeTab === 'COMPOUND' && 'Model exponential wealth growth across daily, monthly, quarterly, and annual compounding frequencies with recurring deposits.'}
          {activeTab === 'INFLATION' && 'Forecast future living costs and project the erosion of fiat purchasing power over 5 to 30 years based on historical CPI trends.'}
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
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: activeTab === 'PREPAYMENT' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'PREPAYMENT' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.86rem',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: activeTab === 'PREPAYMENT' ? '0 4px 16px rgba(99, 102, 241, 0.45)' : 'none',
            textDecoration: 'none',
          }}
        >
          <Scale size={15} />
          <span>Prepay vs SIP</span>
          <span
            style={{
              fontSize: '0.62rem',
              fontWeight: 800,
              padding: '2px 5px',
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
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: activeTab === 'EMI' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'EMI' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.86rem',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: activeTab === 'EMI' ? '0 4px 16px rgba(99, 102, 241, 0.45)' : 'none',
            textDecoration: 'none',
          }}
        >
          <Calculator size={15} />
          <span>Loan EMI</span>
        </a>

        <a
          href="/sip-calculator"
          onClick={(e) => {
            e.preventDefault();
            handleSelectTab('SIP');
          }}
          title="Step-Up SIP Wealth Compounding Calculator"
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: activeTab === 'SIP' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'SIP' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.86rem',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: activeTab === 'SIP' ? '0 4px 16px rgba(99, 102, 241, 0.45)' : 'none',
            textDecoration: 'none',
          }}
        >
          <TrendingUp size={15} />
          <span>SIP Wealth</span>
        </a>

        <a
          href="/savings-goal-calculator"
          onClick={(e) => {
            e.preventDefault();
            handleSelectTab('GOAL');
          }}
          title="Target Savings Goal & Reverse SIP Planner"
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: activeTab === 'GOAL' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'GOAL' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.86rem',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: activeTab === 'GOAL' ? '0 4px 16px rgba(99, 102, 241, 0.45)' : 'none',
            textDecoration: 'none',
          }}
        >
          <Target size={15} />
          <span>Goal Planner</span>
        </a>

        <a
          href="/fd-rd-calculator"
          onClick={(e) => {
            e.preventDefault();
            handleSelectTab('FD_RD');
          }}
          title="Fixed Deposit & Recurring Deposit Calculator"
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: activeTab === 'FD_RD' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'FD_RD' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.86rem',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: activeTab === 'FD_RD' ? '0 4px 16px rgba(99, 102, 241, 0.45)' : 'none',
            textDecoration: 'none',
          }}
        >
          <Landmark size={15} />
          <span>FD &amp; RD</span>
        </a>

        <a
          href="/compound-interest-calculator"
          onClick={(e) => {
            e.preventDefault();
            handleSelectTab('COMPOUND');
          }}
          title="Compound Interest Calculator & Frequency Modeler"
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: activeTab === 'COMPOUND' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'COMPOUND' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.86rem',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: activeTab === 'COMPOUND' ? '0 4px 16px rgba(99, 102, 241, 0.45)' : 'none',
            textDecoration: 'none',
          }}
        >
          <Sparkles size={15} />
          <span>Compound</span>
        </a>

        <a
          href="/inflation-calculator"
          onClick={(e) => {
            e.preventDefault();
            handleSelectTab('INFLATION');
          }}
          title="Inflation & Purchasing Power Erosion Calculator"
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: activeTab === 'INFLATION' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'INFLATION' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.86rem',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: activeTab === 'INFLATION' ? '0 4px 16px rgba(99, 102, 241, 0.45)' : 'none',
            textDecoration: 'none',
          }}
        >
          <Flame size={15} />
          <span>Inflation</span>
        </a>
      </div>

      {activeTab === 'PREPAYMENT' && (
        <PrepaymentVsSipCalculator
          onExploreOther={(tab) => {
            if (tab === 'SPLIT') {
              if (onNavigate) onNavigate('split');
            } else {
              handleSelectTab(tab);
            }
          }}
        />
      )}
      {activeTab === 'EMI' && (
        <div className="calc-2col-container">
          <div className="calc-2col-grid">
            {/* CARD 1: Loan & Tenure Parameters */}
            <div className="calc-card">
              <div className="calc-card-header">
                <div className="calc-card-badge">
                  <Calculator size={14} /> Loan EMI Calculator
                </div>
                <h4 className="calc-card-title">Borrowing Parameters</h4>
              </div>

              <div className="calc-controls">
                {/* Loan Amount */}
                <div className="calc-field">
                  <div className="calc-field-header">
                    <label className="calc-label" htmlFor="demo-loan-amount">
                      <Calculator size={16} color="var(--primary)" />
                      Loan Amount
                    </label>
                    <div className="calc-input-badge">
                      <span className="calc-unit" style={{ marginRight: '5px' }}>{currencySymbol}</span>
                      <input
                        id="demo-loan-amount"
                        type="number"
                        value={loanAmount || (loanAmount === 0 ? 0 : '')}
                        onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                        className="calc-num-input num-tabular"
                        style={{ width: '105px' }}
                      />
                    </div>
                  </div>
                  <div className="calc-slider-track">
                    <input
                      type="range"
                      min="10000"
                      max="5000000"
                      step="10000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="calc-range"
                      style={{
                        background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${Math.min(100, Math.max(0, ((loanAmount - 10000) / (5000000 - 10000)) * 100))}%, var(--bg-surface-elevated) ${Math.min(100, Math.max(0, ((loanAmount - 10000) / (5000000 - 10000)) * 100))}%, var(--bg-surface-elevated) 100%)`,
                      }}
                      aria-label="Loan amount slider"
                    />
                  </div>
                  <div className="calc-presets">
                    {[
                      { label: '₹5 Lakh', val: 500000 },
                      { label: '₹10 Lakh', val: 1000000 },
                      { label: '₹25 Lakh', val: 2500000 },
                      { label: '₹50 Lakh', val: 5000000 },
                    ].map((p) => (
                      <button
                        key={p.val}
                        type="button"
                        className={`calc-chip ${loanAmount === p.val ? 'active' : ''}`}
                        onClick={() => setLoanAmount(p.val)}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="calc-field">
                  <div className="calc-field-header">
                    <label className="calc-label" htmlFor="demo-loan-rate">
                      <TrendingUp size={16} color="#0284c7" />
                      Interest Rate (Annual)
                    </label>
                    <div className="calc-input-badge">
                      <input
                        id="demo-loan-rate"
                        type="number"
                        step="0.1"
                        min="1"
                        max="25"
                        value={interestRate || (interestRate === 0 ? 0 : '')}
                        onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                        className="calc-num-input num-tabular"
                        style={{ width: '48px' }}
                      />
                      <span className="calc-unit" style={{ marginLeft: '4px' }}>%</span>
                    </div>
                  </div>
                  <div className="calc-slider-track">
                    <input
                      type="range"
                      min="1"
                      max="25"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="calc-range"
                      style={{
                        background: `linear-gradient(to right, #0284c7 0%, #0284c7 ${Math.min(100, Math.max(0, ((interestRate - 1) / (25 - 1)) * 100))}%, var(--bg-surface-elevated) ${Math.min(100, Math.max(0, ((interestRate - 1) / (25 - 1)) * 100))}%, var(--bg-surface-elevated) 100%)`,
                      }}
                      aria-label="Interest rate slider"
                    />
                  </div>
                  <div className="calc-presets">
                    {[
                      { label: '8.5% Home Loan', val: 8.5 },
                      { label: '9.0% Car Loan', val: 9.0 },
                      { label: '10.5% Personal', val: 10.5 },
                      { label: '12.0% High', val: 12.0 },
                    ].map((p) => (
                      <button
                        key={p.val}
                        type="button"
                        className={`calc-chip ${interestRate === p.val ? 'active' : ''}`}
                        onClick={() => setInterestRate(p.val)}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tenure */}
                <div className="calc-field">
                  <div className="calc-field-header">
                    <label className="calc-label" htmlFor="demo-loan-tenure">
                      <Smartphone size={16} color="var(--primary)" />
                      Tenure (Years)
                    </label>
                    <div className="calc-input-badge">
                      <input
                        id="demo-loan-tenure"
                        type="number"
                        min="1"
                        max="30"
                        value={tenureYears || (tenureYears === 0 ? 0 : '')}
                        onChange={(e) => setTenureYears(Math.max(1, Number(e.target.value)))}
                        className="calc-num-input num-tabular"
                        style={{ width: '45px' }}
                      />
                      <span className="calc-unit" style={{ marginLeft: '4px' }}>Yrs</span>
                    </div>
                  </div>
                  <div className="calc-slider-track">
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      className="calc-range"
                      style={{
                        background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${Math.min(100, Math.max(0, ((tenureYears - 1) / (30 - 1)) * 100))}%, var(--bg-surface-elevated) ${Math.min(100, Math.max(0, ((tenureYears - 1) / (30 - 1)) * 100))}%, var(--bg-surface-elevated) 100%)`,
                      }}
                      aria-label="Tenure slider"
                    />
                  </div>
                  <div className="calc-presets">
                    {[3, 5, 10, 15, 20, 25].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        className={`calc-chip ${tenureYears === yr ? 'active' : ''}`}
                        onClick={() => setTenureYears(yr)}
                      >
                        {yr} Years
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: Monthly EMI Results */}
            <div className="calc-card calc-results-card">
              <div>
                <div className="calc-card-header" style={{ marginBottom: '16px' }}>
                  <div className="calc-card-badge">
                    <Calculator size={14} /> Monthly EMI Breakdown
                  </div>
                  <span className="calc-pill calc-pill-indigo">
                    Reducing Balance
                  </span>
                </div>

                <div className="calc-hero-metric">
                  <h3 className="calc-hero-val num-tabular">
                    {formatMoney(Math.round(emiRes.emi), currencySymbol, 0)}
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '8px' }}>/ month</span>
                  </h3>
                  <span className="calc-hero-sub">
                    Monthly debt commitment for {tenureYears * 12} installments at {interestRate}% p.a.
                  </span>
                </div>
              </div>

              {/* Visual Breakdown Gauge */}
              <div className="calc-gauge">
                <div className="calc-gauge-header">
                  <span style={{ color: 'var(--primary)' }}>
                    Principal: {emiRes.principalPct}%
                  </span>
                  <span style={{ color: 'var(--expense)' }}>
                    Interest: {emiRes.interestPct}%
                  </span>
                </div>
                <div className="calc-gauge-track" title="Principal vs Total Interest">
                  <div style={{ width: `${emiRes.principalPct}%`, background: 'var(--primary)', height: '100%' }} />
                  <div style={{ width: `${emiRes.interestPct}%`, background: 'var(--expense)', height: '100%' }} />
                </div>
              </div>

              {/* Key Metrics */}
              <div className="calc-metrics-list">
                <div className="calc-metric-row">
                  <span className="calc-metric-key">Principal Amount:</span>
                  <span className="calc-metric-val num-tabular" style={{ color: 'var(--primary)' }}>
                    {formatMoney(Math.round(loanAmount), currencySymbol, 0)}
                  </span>
                </div>
                <div className="calc-metric-row">
                  <span className="calc-metric-key">Total Interest Payable:</span>
                  <span className="calc-metric-val num-tabular" style={{ color: 'var(--expense)' }}>
                    +{formatMoney(Math.round(emiRes.totalInterest), currencySymbol, 0)}
                  </span>
                </div>
                <div className="calc-metric-row">
                  <span className="calc-metric-key">Total Repayment Amount:</span>
                  <span className="calc-metric-val num-tabular">
                    {formatMoney(Math.round(emiRes.totalPayment), currencySymbol, 0)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="calc-actions">
                <button
                  type="button"
                  className="calc-share-btn"
                  onClick={() => {
                    const text = `💵 *Loan EMI Calculation*
🏠 *Loan Amount:* ${formatMoney(loanAmount, currencySymbol, 0)}
📈 *Interest Rate:* ${interestRate}% p.a.
⏳ *Tenure:* ${tenureYears} Years (${tenureYears * 12} Months)

📊 *Payment Breakdown:*
• *Monthly EMI:* *${formatMoney(Math.round(emiRes.emi), currencySymbol, 0)}*
• *Total Interest Payable:* ${formatMoney(Math.round(emiRes.totalInterest), currencySymbol, 0)}
• *Total Repayment:* ${formatMoney(Math.round(emiRes.totalPayment), currencySymbol, 0)}
• *Breakdown:* ${emiRes.principalPct}% Principal / ${emiRes.interestPct}% Interest

🔗 *Simulate & tweak on Pocket Advisor:*
${emiShareUrl}`;
                    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <MessageCircle size={16} />
                  <span>Share EMI</span>
                </button>

                <button
                  type="button"
                  className={`calc-copy-btn ${copiedEmi ? 'copied' : ''}`}
                  onClick={async () => {
                    try {
                      if (navigator?.clipboard?.writeText) {
                        await navigator.clipboard.writeText(emiShareUrl);
                      }
                      setCopiedEmi(true);
                      setTimeout(() => setCopiedEmi(false), 2000);
                    } catch {
                      // ignore
                    }
                  }}
                >
                  {copiedEmi ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copiedEmi ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'SIP' && (
        <div className="calc-2col-container">
          <div className="calc-2col-grid">
            {/* CARD 1: SIP Parameters */}
            <div className="calc-card">
              <div className="calc-card-header">
                <div className="calc-card-badge calc-card-badge-success">
                  <TrendingUp size={14} /> Step-Up SIP Wealth Planner
                </div>
                <h4 className="calc-card-title">Investment &amp; Growth Terms</h4>
              </div>

              <div className="calc-controls">
                {/* Monthly Investment */}
                <div className="calc-field">
                  <div className="calc-field-header">
                    <label className="calc-label" htmlFor="demo-sip-amount">
                      <TrendingUp size={16} color="#10b981" />
                      Monthly Investment
                    </label>
                    <div className="calc-input-badge">
                      <span className="calc-unit" style={{ marginRight: '5px' }}>{currencySymbol}</span>
                      <input
                        id="demo-sip-amount"
                        type="number"
                        value={monthlyInvestment || (monthlyInvestment === 0 ? 0 : '')}
                        onChange={(e) => setMonthlyInvestment(Math.max(0, Number(e.target.value)))}
                        className="calc-num-input num-tabular"
                        style={{ width: '95px' }}
                      />
                    </div>
                  </div>
                  <div className="calc-slider-track">
                    <input
                      type="range"
                      min="500"
                      max="100000"
                      step="500"
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                      className="calc-range"
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${Math.min(100, Math.max(0, ((monthlyInvestment - 500) / (100000 - 500)) * 100))}%, var(--bg-surface-elevated) ${Math.min(100, Math.max(0, ((monthlyInvestment - 500) / (100000 - 500)) * 100))}%, var(--bg-surface-elevated) 100%)`,
                      }}
                      aria-label="Monthly SIP investment slider"
                    />
                  </div>
                  <div className="calc-presets">
                    {[
                      { label: '₹2,500', val: 2500 },
                      { label: '₹5,000', val: 5000 },
                      { label: '₹10,000', val: 10000 },
                      { label: '₹25,000', val: 25000 },
                    ].map((p) => (
                      <button
                        key={p.val}
                        type="button"
                        className={`calc-chip ${monthlyInvestment === p.val ? 'active' : ''}`}
                        onClick={() => setMonthlyInvestment(p.val)}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Expected Return Rate */}
                <div className="calc-field">
                  <div className="calc-field-header">
                    <label className="calc-label" htmlFor="demo-sip-return">
                      <TrendingUp size={16} color="#0284c7" />
                      Expected Return Rate (p.a.)
                    </label>
                    <div className="calc-input-badge">
                      <input
                        id="demo-sip-return"
                        type="number"
                        step="0.5"
                        min="1"
                        max="30"
                        value={expectedReturn || (expectedReturn === 0 ? 0 : '')}
                        onChange={(e) => setExpectedReturn(Math.max(0, Number(e.target.value)))}
                        className="calc-num-input num-tabular"
                        style={{ width: '48px' }}
                      />
                      <span className="calc-unit" style={{ marginLeft: '4px' }}>%</span>
                    </div>
                  </div>
                  <div className="calc-slider-track">
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="0.5"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="calc-range"
                      style={{
                        background: `linear-gradient(to right, #0284c7 0%, #0284c7 ${Math.min(100, Math.max(0, ((expectedReturn - 1) / (30 - 1)) * 100))}%, var(--bg-surface-elevated) ${Math.min(100, Math.max(0, ((expectedReturn - 1) / (30 - 1)) * 100))}%, var(--bg-surface-elevated) 100%)`,
                      }}
                      aria-label="Expected return rate slider"
                    />
                  </div>
                  <div className="calc-presets">
                    {[
                      { label: 'Conservative (10%)', val: 10.0 },
                      { label: 'Nifty 50 (12%)', val: 12.0 },
                      { label: 'Flexi Cap (14%)', val: 14.0 },
                      { label: 'Mid/Small (16%)', val: 16.0 },
                    ].map((p) => (
                      <button
                        key={p.val}
                        type="button"
                        className={`calc-chip ${expectedReturn === p.val ? 'active' : ''}`}
                        onClick={() => setExpectedReturn(p.val)}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Period */}
                <div className="calc-field">
                  <div className="calc-field-header">
                    <label className="calc-label" htmlFor="demo-sip-period">
                      <Smartphone size={16} color="var(--primary)" />
                      Time Period (Years)
                    </label>
                    <div className="calc-input-badge">
                      <input
                        id="demo-sip-period"
                        type="number"
                        min="1"
                        max="35"
                        value={investmentYears || (investmentYears === 0 ? 0 : '')}
                        onChange={(e) => setInvestmentYears(Math.max(1, Number(e.target.value)))}
                        className="calc-num-input num-tabular"
                        style={{ width: '45px' }}
                      />
                      <span className="calc-unit" style={{ marginLeft: '4px' }}>Yrs</span>
                    </div>
                  </div>
                  <div className="calc-slider-track">
                    <input
                      type="range"
                      min="1"
                      max="35"
                      step="1"
                      value={investmentYears}
                      onChange={(e) => setInvestmentYears(Number(e.target.value))}
                      className="calc-range"
                      style={{
                        background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${Math.min(100, Math.max(0, ((investmentYears - 1) / (35 - 1)) * 100))}%, var(--bg-surface-elevated) ${Math.min(100, Math.max(0, ((investmentYears - 1) / (35 - 1)) * 100))}%, var(--bg-surface-elevated) 100%)`,
                      }}
                      aria-label="Investment tenure slider"
                    />
                  </div>
                  <div className="calc-presets">
                    {[5, 10, 15, 20, 25].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        className={`calc-chip ${investmentYears === yr ? 'active' : ''}`}
                        onClick={() => setInvestmentYears(yr)}
                      >
                        {yr} Years
                      </button>
                    ))}
                  </div>
                </div>

                {/* Annual Step-Up */}
                <div className="calc-field">
                  <div className="calc-field-header">
                    <label className="calc-label" htmlFor="demo-sip-stepup">
                      <Sparkles size={16} color="#0284c7" />
                      Annual Step-Up
                    </label>
                    <div className="calc-input-badge">
                      <input
                        id="demo-sip-stepup"
                        type="number"
                        min="0"
                        max="25"
                        value={annualStepUp || (annualStepUp === 0 ? 0 : '')}
                        onChange={(e) => setAnnualStepUp(Math.max(0, Number(e.target.value)))}
                        className="calc-num-input num-tabular"
                        style={{ width: '45px' }}
                      />
                      <span className="calc-unit" style={{ marginLeft: '4px' }}>%</span>
                    </div>
                  </div>
                  <div className="calc-slider-track">
                    <input
                      type="range"
                      min="0"
                      max="25"
                      step="1"
                      value={annualStepUp}
                      onChange={(e) => setAnnualStepUp(Number(e.target.value))}
                      className="calc-range"
                      style={{
                        background: `linear-gradient(to right, #0284c7 0%, #0284c7 ${(annualStepUp / 25) * 100}%, var(--bg-surface-elevated) ${(annualStepUp / 25) * 100}%, var(--bg-surface-elevated) 100%)`,
                      }}
                      aria-label="Annual step up slider"
                    />
                  </div>
                  <div className="calc-presets">
                    {[
                      { label: '0% None', val: 0 },
                      { label: '5% Moderate', val: 5 },
                      { label: '10% Salary Hike Match', val: 10 },
                      { label: '15% Aggressive', val: 15 },
                    ].map((p) => (
                      <button
                        key={p.val}
                        type="button"
                        className={`calc-chip ${annualStepUp === p.val ? 'active' : ''}`}
                        onClick={() => setAnnualStepUp(p.val)}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: SIP Maturity Wealth Results */}
            <div className="calc-card calc-results-card">
              <div>
                <div className="calc-card-header" style={{ marginBottom: '16px' }}>
                  <div className="calc-card-badge calc-card-badge-success">
                    <TrendingUp size={14} /> Projected Maturity Corpus
                  </div>
                  <span className="calc-pill calc-pill-emerald">
                    {sipTiming === 'beginning' ? 'Compounded Annuity Due' : 'Ordinary Annuity'}
                  </span>
                </div>

                <div className="calc-hero-metric">
                  <h3 className="calc-hero-val calc-hero-val-success num-tabular">
                    {formatMoney(Math.round(sipRes.totalWealth), currencySymbol, 0)}
                  </h3>
                  <span className="calc-hero-sub">
                    Accumulated maturity wealth with {annualStepUp}% annual step-up compounding over {investmentYears} years.
                  </span>
                </div>
              </div>

              {/* Visual Breakdown Gauge */}
              <div className="calc-gauge">
                <div className="calc-gauge-header">
                  <span style={{ color: 'var(--info)' }}>
                    Invested Capital: {sipRes.investedPct}%
                  </span>
                  <span style={{ color: '#10b981' }}>
                    Compounded Returns: {sipRes.returnsPct}%
                  </span>
                </div>
                <div className="calc-gauge-track" title="Invested Capital vs Compounded Returns">
                  <div style={{ width: `${sipRes.investedPct}%`, background: 'var(--info)', height: '100%' }} />
                  <div style={{ width: `${sipRes.returnsPct}%`, background: '#10b981', height: '100%' }} />
                </div>
              </div>

              {/* Metric Rows */}
              <div className="calc-metrics-list">
                <div className="calc-metric-row">
                  <span className="calc-metric-key">Total Capital Invested:</span>
                  <span className="calc-metric-val num-tabular" style={{ color: 'var(--info)' }}>
                    {formatMoney(Math.round(sipRes.investedAmount), currencySymbol, 0)}
                  </span>
                </div>
                <div className="calc-metric-row">
                  <span className="calc-metric-key">Estimated Returns Generated:</span>
                  <span className="calc-metric-val num-tabular" style={{ color: '#10b981' }}>
                    +{formatMoney(Math.round(sipRes.estReturns), currencySymbol, 0)}
                  </span>
                </div>
                <div className="calc-metric-row">
                  <span className="calc-metric-key">Real Wealth (Inflation-Adjusted):</span>
                  <span className="calc-metric-val num-tabular" style={{ color: 'var(--warning)' }}>
                    {formatMoney(Math.round(sipRes.realWealth), currencySymbol, 0)}
                  </span>
                </div>
              </div>

              {/* Timing Selector */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setSipTiming('beginning')}
                  className={`calc-chip ${sipTiming === 'beginning' ? 'active' : ''}`}
                  style={{ padding: '8px 12px', textAlign: 'center', width: '100%' }}
                >
                  Month Start (Standard)
                </button>
                <button
                  type="button"
                  onClick={() => setSipTiming('end')}
                  className={`calc-chip ${sipTiming === 'end' ? 'active' : ''}`}
                  style={{ padding: '8px 12px', textAlign: 'center', width: '100%' }}
                >
                  Month End
                </button>
              </div>

              {/* Action Buttons */}
              <div className="calc-actions">
                <button
                  type="button"
                  className="calc-share-btn"
                  onClick={() => {
                    const text = `📈 *Step-Up SIP Wealth Plan*
💰 *Monthly Investment:* ${formatMoney(monthlyInvestment, currencySymbol, 0)}/mo
🚀 *Expected Return:* ${expectedReturn}% p.a.
⏳ *Time Period:* ${investmentYears} Years
⚡ *Annual Step-Up:* ${annualStepUp}%

🏆 *Projected Wealth:*
• *Estimated Maturity Value:* *${formatMoney(Math.round(sipRes.totalWealth), currencySymbol, 0)}*
• *Total Capital Invested:* ${formatMoney(Math.round(sipRes.investedAmount), currencySymbol, 0)}
• *Compounded Wealth Gains:* ${formatMoney(Math.round(sipRes.estReturns), currencySymbol, 0)}
• *Real Wealth (${inflationRate}% Inflation-adjusted):* ${formatMoney(Math.round(sipRes.realWealth), currencySymbol, 0)}

🔗 *Plan your SIP compounding on Pocket Advisor:*
${sipShareUrl}`;
                    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <MessageCircle size={16} />
                  <span>Share SIP</span>
                </button>

                <button
                  type="button"
                  className={`calc-copy-btn ${copiedSip ? 'copied' : ''}`}
                  onClick={async () => {
                    try {
                      if (navigator?.clipboard?.writeText) {
                        await navigator.clipboard.writeText(sipShareUrl);
                      }
                      setCopiedSip(true);
                      setTimeout(() => setCopiedSip(false), 2000);
                    } catch {
                      // ignore
                    }
                  }}
                >
                  {copiedSip ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copiedSip ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'GOAL' && <SavingsGoalCalculator />}
      {activeTab === 'FD_RD' && <FdRdCalculator />}
      {activeTab === 'COMPOUND' && <CompoundInterestCalculator />}
      {activeTab === 'INFLATION' && <InflationCalculator />}

      {/* Contextual Android App Bridge Banner */}
      <div
        style={{
          marginTop: '28px',
          padding: 'clamp(20px, 3.5vw, 28px)',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.28)',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            <Sparkles size={14} /> Bridge to Automated Money Management
          </div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
            {activeTab === 'EMI' && 'Never Miss an EMI or Loan Auto-Debit'}
            {activeTab === 'SIP' && 'Keep Your Monthly SIPs on Auto-Pilot'}
            {activeTab === 'PREPAYMENT' && 'Balance Debt Prepayment with Monthly Cash Flow'}
            {activeTab === 'GOAL' && 'Track Every Rupee Toward Your Savings Goal'}
            {activeTab === 'FD_RD' && 'Auto-Log Term Deposit Debits & Interest Credits'}
            {activeTab === 'COMPOUND' && 'Harness the Compounding Power of Small Daily Savings'}
            {activeTab === 'INFLATION' && 'Protect Your Purchasing Power from Stealth Inflation'}
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55, margin: 0 }}>
            {activeTab === 'EMI' && 'Tracking loan installments manually is stressful. Pocket Advisor on Android tracks debit SMS alerts directly on your device with 100% offline encryption, predicts upcoming EMIs, and ensures your bank balance is always ready.'}
            {activeTab === 'SIP' && 'Consistent investing requires keeping lifestyle spending in check. Pocket Advisor detects income credits, calculates your disposable surplus, and helps you fund your monthly SIPs without dipping into emergency savings.'}
            {activeTab === 'PREPAYMENT' && 'Deciding whether to prepay your loan or invest in equity requires disciplined budgeting. Pocket Advisor tracks your real spending vs budget to find extra principal prepayment capital.'}
            {activeTab === 'GOAL' && 'Hitting ambitious targets like a down payment or car fund demands predictable monthly savings. Pocket Advisor helps you find cash leaks and ring-fence money for goals.'}
            {activeTab === 'FD_RD' && 'Pocket Advisor automatically parses bank SMS alerts for recurring deposit debits and fixed deposit interest payouts directly on your phone with SQLCipher AES-256.'}
            {activeTab === 'COMPOUND' && 'Saving ₹150 daily on impulse food delivery compounds into lakhs over a decade. Pocket Advisor gives you instant category breakdowns so you keep more money compounding.'}
            {activeTab === 'INFLATION' && 'Lifestyle inflation creeps up silently. Pocket Advisor gives you real-time category spending inflation trends and Smart AI budget optimizations to stay ahead.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <a
            href="https://play.google.com/store/apps/details?id=com.pocketadvisor.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '12px 22px',
              borderRadius: '14px',
              background: 'var(--primary-gradient)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.9rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
              transition: 'transform 0.15s ease',
            }}
          >
            <Smartphone size={16} />
            <span>Get Android App</span>
          </a>
        </div>
      </div>

      {activeTab === 'PREPAYMENT' && <PrepaymentVsSipGuide />}
      {activeTab === 'EMI' && <EmiCalculatorGuide />}
      {activeTab === 'SIP' && <SipCalculatorGuide />}
      {activeTab === 'GOAL' && <SavingsGoalGuide />}
      {activeTab === 'FD_RD' && <FdRdGuide />}
      {activeTab === 'COMPOUND' && <CompoundInterestGuide />}
      {activeTab === 'INFLATION' && <InflationGuide />}
    </section>
  );
};
