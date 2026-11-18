import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, TrendingUp } from 'lucide-react';
import './InteractiveQuickCalculator.css';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.pocketadvisor.app';

export const InteractiveQuickCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'emi' | 'sip'>('emi');

  // EMI state
  const [loanAmount, setLoanAmount] = useState(1000000); // 10 Lakhs
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState(5);

  // SIP state
  const [monthlySip, setMonthlySip] = useState(10000); // 10k/month
  const [sipRate, setSipRate] = useState(12);
  const [sipTenureYears, setSipTenureYears] = useState(10);

  // EMI Math
  const emiCalculation = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = loanTenureYears * 12;
    if (r === 0) {
      const emi = P / n;
      return { monthlyEmi: Math.round(emi), totalInterest: 0, totalPayable: P };
    }
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayable = emi * n;
    const totalInterest = totalPayable - P;
    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayable: Math.round(totalPayable),
    };
  }, [loanAmount, interestRate, loanTenureYears]);

  // SIP Math
  const sipCalculation = useMemo(() => {
    const P = monthlySip;
    const i = sipRate / 12 / 100;
    const n = sipTenureYears * 12;
    const invested = P * n;
    const totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const wealthGain = totalValue - invested;
    return {
      invested: Math.round(invested),
      wealthGain: Math.round(wealthGain),
      totalValue: Math.round(totalValue),
    };
  }, [monthlySip, sipRate, sipTenureYears]);

  const formatInr = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  return (
    <section className="pa-quick-calc-section" aria-labelledby="pa-quick-calc-heading">
      <div className="pa-quick-calc-container">
        <div className="pa-quick-calc-header">
          <div className="pa-calc-badge">
            <Calculator size={14} />
            <span>INTERACTIVE FINANCIAL LAB</span>
          </div>
          <h2 id="pa-quick-calc-heading">
            Instant Wealth &amp; <span className="pa-gradient-text">Loan Simulator</span>
          </h2>
          <p className="pa-calc-subtext">
            Simulate your EMI or SIP growth in real-time. Pocket Advisor builds these 6 native calculators directly
            into your Android phone with zero ads and zero signups.
          </p>
        </div>

        <div className="pa-calc-card">
          <div className="pa-calc-tab-nav" role="tablist" aria-label="Calculator Mode Selection">
            <button
              id="emi-calc-tab"
              type="button"
              role="tab"
              aria-controls="emi-calc-panel"
              aria-selected={activeTab === 'emi'}
              className={`pa-calc-tab ${activeTab === 'emi' ? 'active' : ''}`}
              onClick={() => setActiveTab('emi')}
            >
              <Calculator size={16} />
              <span>Loan EMI Calculator</span>
            </button>
            <button
              id="sip-calc-tab"
              type="button"
              role="tab"
              aria-controls="sip-calc-panel"
              aria-selected={activeTab === 'sip'}
              className={`pa-calc-tab ${activeTab === 'sip' ? 'active' : ''}`}
              onClick={() => setActiveTab('sip')}
            >
              <TrendingUp size={16} />
              <span>Step-Up SIP Compounding</span>
            </button>
          </div>

          <div className="pa-calc-body">
            {activeTab === 'emi' ? (
              <div id="emi-calc-panel" role="tabpanel" aria-labelledby="emi-calc-tab" className="pa-calc-grid">
                <div className="pa-calc-inputs">
                  <div className="pa-input-group">
                    <div className="pa-label-row">
                      <label htmlFor="emi-loan-amount">Loan Amount</label>
                      <strong>{formatInr(loanAmount)}</strong>
                    </div>
                    <input
                      id="emi-loan-amount"
                      name="loanAmount"
                      type="range"
                      aria-label="Loan Amount in Rupees"
                      aria-valuemin={100000}
                      aria-valuemax={10000000}
                      aria-valuenow={loanAmount}
                      aria-valuetext={formatInr(loanAmount)}
                      min={100000}
                      max={10000000}
                      step={50000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="pa-range-slider"
                    />
                    <div className="pa-range-bounds">
                      <small>₹1 Lakh</small>
                      <small>₹1 Crore</small>
                    </div>
                  </div>

                  <div className="pa-input-group">
                    <div className="pa-label-row">
                      <label htmlFor="emi-interest-rate">Interest Rate (p.a.)</label>
                      <strong>{interestRate}%</strong>
                    </div>
                    <input
                      id="emi-interest-rate"
                      name="interestRate"
                      type="range"
                      aria-label="Interest Rate Percentage per Annum"
                      aria-valuemin={5}
                      aria-valuemax={24}
                      aria-valuenow={interestRate}
                      aria-valuetext={`${interestRate}% per annum`}
                      min={5}
                      max={24}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="pa-range-slider"
                    />
                    <div className="pa-range-bounds">
                      <small>5%</small>
                      <small>24%</small>
                    </div>
                  </div>

                  <div className="pa-input-group">
                    <div className="pa-label-row">
                      <label htmlFor="emi-loan-tenure">Tenure (Years)</label>
                      <strong>{loanTenureYears} Years ({loanTenureYears * 12} Mos)</strong>
                    </div>
                    <input
                      id="emi-loan-tenure"
                      name="loanTenureYears"
                      type="range"
                      aria-label="Loan Tenure in Years"
                      aria-valuemin={1}
                      aria-valuemax={30}
                      aria-valuenow={loanTenureYears}
                      aria-valuetext={`${loanTenureYears} Years`}
                      min={1}
                      max={30}
                      step={1}
                      value={loanTenureYears}
                      onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                      className="pa-range-slider"
                    />
                    <div className="pa-range-bounds">
                      <small>1 Yr</small>
                      <small>30 Yrs</small>
                    </div>
                  </div>
                </div>

                <div className="pa-calc-results">
                  <div className="pa-result-highlight">
                    <small>Monthly EMI Due</small>
                    <div className="pa-highlight-value">{formatInr(emiCalculation.monthlyEmi)}</div>
                  </div>
                  <div className="pa-result-breakdown">
                    <div className="pa-breakdown-row">
                      <span>Principal Amount</span>
                      <strong>{formatInr(loanAmount)}</strong>
                    </div>
                    <div className="pa-breakdown-row">
                      <span>Total Interest</span>
                      <strong className="pa-text-amber">{formatInr(emiCalculation.totalInterest)}</strong>
                    </div>
                    <div className="pa-breakdown-row pa-total-row">
                      <span>Total Repayment</span>
                      <strong className="pa-text-indigo">{formatInr(emiCalculation.totalPayable)}</strong>
                    </div>
                  </div>

                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pa-calc-app-cta"
                  >
                    <span>Get Amortization Table on Android</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            ) : (
              <div id="sip-calc-panel" role="tabpanel" aria-labelledby="sip-calc-tab" className="pa-calc-grid">
                <div className="pa-calc-inputs">
                  <div className="pa-input-group">
                    <div className="pa-label-row">
                      <label htmlFor="sip-monthly-amount">Monthly Investment</label>
                      <strong>{formatInr(monthlySip)} / mo</strong>
                    </div>
                    <input
                      id="sip-monthly-amount"
                      name="monthlySip"
                      type="range"
                      aria-label="Monthly Investment Amount in Rupees"
                      aria-valuemin={500}
                      aria-valuemax={100000}
                      aria-valuenow={monthlySip}
                      aria-valuetext={`${formatInr(monthlySip)} per month`}
                      min={500}
                      max={100000}
                      step={500}
                      value={monthlySip}
                      onChange={(e) => setMonthlySip(Number(e.target.value))}
                      className="pa-range-slider"
                    />
                    <div className="pa-range-bounds">
                      <small>₹500</small>
                      <small>₹1 Lakh</small>
                    </div>
                  </div>

                  <div className="pa-input-group">
                    <div className="pa-label-row">
                      <label htmlFor="sip-expected-rate">Expected Return Rate (CAGR)</label>
                      <strong>{sipRate}%</strong>
                    </div>
                    <input
                      id="sip-expected-rate"
                      name="sipRate"
                      type="range"
                      aria-label="Expected Return Rate Percentage CAGR"
                      aria-valuemin={6}
                      aria-valuemax={25}
                      aria-valuenow={sipRate}
                      aria-valuetext={`${sipRate}% CAGR`}
                      min={6}
                      max={25}
                      step={0.5}
                      value={sipRate}
                      onChange={(e) => setSipRate(Number(e.target.value))}
                      className="pa-range-slider"
                    />
                    <div className="pa-range-bounds">
                      <small>6%</small>
                      <small>25%</small>
                    </div>
                  </div>

                  <div className="pa-input-group">
                    <div className="pa-label-row">
                      <label htmlFor="sip-tenure-years">Time Horizon</label>
                      <strong>{sipTenureYears} Years</strong>
                    </div>
                    <input
                      id="sip-tenure-years"
                      name="sipTenureYears"
                      type="range"
                      aria-label="SIP Time Horizon in Years"
                      aria-valuemin={1}
                      aria-valuemax={35}
                      aria-valuenow={sipTenureYears}
                      aria-valuetext={`${sipTenureYears} Years`}
                      min={1}
                      max={35}
                      step={1}
                      value={sipTenureYears}
                      onChange={(e) => setSipTenureYears(Number(e.target.value))}
                      className="pa-range-slider"
                    />
                    <div className="pa-range-bounds">
                      <small>1 Yr</small>
                      <small>35 Yrs</small>
                    </div>
                  </div>
                </div>

                <div className="pa-calc-results">
                  <div className="pa-result-highlight pa-sip-highlight">
                    <small>Estimated Maturity Wealth</small>
                    <div className="pa-highlight-value">{formatInr(sipCalculation.totalValue)}</div>
                  </div>
                  <div className="pa-result-breakdown">
                    <div className="pa-breakdown-row">
                      <span>Total Invested</span>
                      <strong>{formatInr(sipCalculation.invested)}</strong>
                    </div>
                    <div className="pa-breakdown-row">
                      <span>Compounded Wealth Gain</span>
                      <strong className="pa-text-emerald">+{formatInr(sipCalculation.wealthGain)}</strong>
                    </div>
                    <div className="pa-breakdown-row pa-total-row">
                      <span>Final Maturity Value</span>
                      <strong className="pa-text-teal">{formatInr(sipCalculation.totalValue)}</strong>
                    </div>
                  </div>

                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pa-calc-app-cta"
                  >
                    <span>Track SIPs with Pocket Advisor</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
