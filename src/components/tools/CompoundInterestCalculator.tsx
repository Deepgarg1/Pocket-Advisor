import React, { useState, useMemo } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { formatMoney } from '../../utils/formatters';
import { calculateCompoundInterest } from '../../utils/financeCalculations';
import {
  Copy,
  Check,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  DollarSign,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import './CalculatorCard.css';

export const CompoundInterestCalculator: React.FC = () => {
  const { currencySymbol } = useSettings();

  const initialParams = useMemo(() => {
    if (typeof window === 'undefined') return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  }, []);

  const [principal, setPrincipal] = useState<number>(() => {
    const val = Number(initialParams.get('principal'));
    return Number.isFinite(val) && val > 0 ? val : 100000;
  });
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(() => {
    const val = Number(initialParams.get('deposit'));
    return Number.isFinite(val) && val >= 0 ? val : 5000;
  });
  const [annualRate, setAnnualRate] = useState<number>(() => {
    const val = Number(initialParams.get('rate'));
    return Number.isFinite(val) && val > 0 ? val : 12;
  });
  const [tenureYears, setTenureYears] = useState<number>(() => {
    const val = Number(initialParams.get('years'));
    return Number.isFinite(val) && val > 0 ? val : 10;
  });
  const [freq, setFreq] = useState<number>(() => {
    const val = Number(initialParams.get('freq'));
    return [1, 2, 4, 12, 365].includes(val) ? val : 12;
  });
  const [showSchedule, setShowSchedule] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateCompoundInterest({
      principal,
      annualRatePct: annualRate,
      tenureYears,
      compoundingFrequency: freq,
      monthlyDeposit,
    });
  }, [principal, annualRate, tenureYears, freq, monthlyDeposit]);

  const principalPct = result.finalBalance > 0
    ? Math.min(100, Math.max(0, Math.round((result.totalPrincipalInvested / result.finalBalance) * 100)))
    : 100;
  const interestPct = Math.max(0, 100 - principalPct);
  const wealthMultiplier = result.totalPrincipalInvested > 0
    ? (result.finalBalance / result.totalPrincipalInvested).toFixed(2)
    : '1.00';

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/compound-interest-calculator?principal=${principal}&rate=${annualRate}&years=${tenureYears}&deposit=${monthlyDeposit}&freq=${freq}`
    : '';

  // Track fills
  const principalFill = Math.min(100, Math.max(0, ((principal - 10000) / (5000000 - 10000)) * 100));
  const depositFill = Math.min(100, Math.max(0, (monthlyDeposit / 100000) * 100));
  const rateFill = Math.min(100, Math.max(0, ((annualRate - 1) / (25 - 1)) * 100));
  const tenureFill = Math.min(100, Math.max(0, ((tenureYears - 1) / (35 - 1)) * 100));

  const getSliderStyle = (fillPct: number, colorVar = 'var(--primary)') => ({
    background: `linear-gradient(to right, ${colorVar} 0%, ${colorVar} ${fillPct}%, var(--bg-surface-elevated) ${fillPct}%, var(--bg-surface-elevated) 100%)`,
  });

  return (
    <div className="calc-2col-container">
      <div className="calc-2col-grid">
        {/* ========================================================= */}
        {/* CARD 1: Investment & Compounding Inputs                   */}
        {/* ========================================================= */}
        <div className="calc-card">
          <div className="calc-card-header">
            <div className="calc-card-badge">
              <TrendingUp size={14} /> Compound Growth
            </div>
            <h4 className="calc-card-title">Investment Parameters</h4>
          </div>

          <div className="calc-controls">
            {/* Initial Principal */}
            <div className="calc-field">
              <div className="calc-field-header">
                <label className="calc-label" htmlFor="ci-principal-input">
                  <DollarSign size={16} color="var(--primary)" />
                  Initial Principal Deposit
                </label>
                <div className="calc-input-badge">
                  <span className="calc-unit" style={{ marginRight: '5px' }}>{currencySymbol}</span>
                  <input
                    id="ci-principal-input"
                    type="number"
                    value={principal || ''}
                    onChange={(e) => setPrincipal(Math.max(0, Number(e.target.value)))}
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
                  step="25000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="calc-range"
                  style={getSliderStyle(principalFill)}
                  aria-label="Initial principal amount slider"
                />
              </div>
              <div className="calc-presets">
                {[
                  { label: '₹50K', val: 50000 },
                  { label: '₹1 Lakh', val: 100000 },
                  { label: '₹2.5 Lakh', val: 250000 },
                  { label: '₹5 Lakh', val: 500000 },
                  { label: '₹10 Lakh', val: 1000000 },
                ].map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    className={`calc-chip ${principal === p.val ? 'active' : ''}`}
                    onClick={() => setPrincipal(p.val)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Contribution */}
            <div className="calc-field">
              <div className="calc-field-header">
                <label className="calc-label" htmlFor="ci-deposit-input">
                  <Calendar size={16} color="#10b981" />
                  Monthly Additional Contribution
                </label>
                <div className="calc-input-badge">
                  <span className="calc-unit" style={{ marginRight: '5px' }}>{currencySymbol}</span>
                  <input
                    id="ci-deposit-input"
                    type="number"
                    value={monthlyDeposit || (monthlyDeposit === 0 ? 0 : '')}
                    onChange={(e) => setMonthlyDeposit(Math.max(0, Number(e.target.value)))}
                    className="calc-num-input num-tabular"
                    style={{ width: '80px' }}
                  />
                </div>
              </div>
              <div className="calc-slider-track">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                  className="calc-range"
                  style={getSliderStyle(depositFill, '#10b981')}
                  aria-label="Monthly deposit slider"
                />
              </div>
              <div className="calc-presets">
                {[
                  { label: '₹0 / mo', val: 0 },
                  { label: '₹5,000 / mo', val: 5000 },
                  { label: '₹10,000 / mo', val: 10000 },
                  { label: '₹25,000 / mo', val: 25000 },
                ].map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    className={`calc-chip ${monthlyDeposit === p.val ? 'active' : ''}`}
                    onClick={() => setMonthlyDeposit(p.val)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate */}
            <div className="calc-field">
              <div className="calc-field-header">
                <label className="calc-label" htmlFor="ci-rate-input">
                  <TrendingUp size={16} color="#0284c7" />
                  Annual Expected Return Rate
                </label>
                <div className="calc-input-badge">
                  <input
                    id="ci-rate-input"
                    type="number"
                    step="0.5"
                    min="1"
                    max="30"
                    value={annualRate || ''}
                    onChange={(e) => setAnnualRate(Math.max(0, Number(e.target.value)))}
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
                  step="0.5"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  className="calc-range"
                  style={getSliderStyle(rateFill, '#0284c7')}
                  aria-label="Annual interest return rate slider"
                />
              </div>
              <div className="calc-presets">
                {[
                  { label: 'Fixed Return (8%)', val: 8.0 },
                  { label: 'Index Fund (12%)', val: 12.0 },
                  { label: 'Active Equity (14%)', val: 14.0 },
                  { label: 'High Alpha (16%)', val: 16.0 },
                ].map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    className={`calc-chip ${annualRate === p.val ? 'active' : ''}`}
                    onClick={() => setAnnualRate(p.val)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="calc-field">
              <div className="calc-field-header">
                <label className="calc-label" htmlFor="ci-tenure-input">
                  <Calendar size={16} color="var(--primary)" />
                  Investment Horizon
                </label>
                <div className="calc-input-badge">
                  <input
                    id="ci-tenure-input"
                    type="number"
                    min="1"
                    max="40"
                    value={tenureYears || ''}
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
                  max="35"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="calc-range"
                  style={getSliderStyle(tenureFill)}
                  aria-label="Investment horizon years slider"
                />
              </div>
              <div className="calc-presets">
                {[5, 10, 15, 20, 25, 30].map((yr) => (
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

            {/* Compounding Frequency */}
            <div className="calc-field">
              <label className="calc-label" htmlFor="ci-freq-select">
                <Layers size={16} color="var(--primary)" />
                Compounding Frequency
              </label>
              <select
                id="ci-freq-select"
                value={freq}
                onChange={(e) => setFreq(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value={12}>Compounded Monthly (12 times/year)</option>
                <option value={4}>Compounded Quarterly (4 times/year)</option>
                <option value={2}>Compounded Semi-Annually (2 times/year)</option>
                <option value={1}>Compounded Annually (1 time/year)</option>
                <option value={365}>Compounded Daily (365 times/year)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CARD 2: Final Corpus & Wealth Growth Results              */}
        {/* ========================================================= */}
        <div className="calc-card calc-results-card">
          <div>
            <div className="calc-card-header" style={{ marginBottom: '16px' }}>
              <div className="calc-card-badge calc-card-badge-success">
                <Sparkles size={14} /> Projected Wealth
              </div>
              <span className="calc-pill calc-pill-indigo">
                {wealthMultiplier}x Total Growth
              </span>
            </div>

            <div className="calc-hero-metric">
              <h3 className="calc-hero-val num-tabular">
                {formatMoney(result.finalBalance, currencySymbol, 0)}
              </h3>
              <span className="calc-hero-sub">
                Projected total maturity corpus after {tenureYears} years with {annualRate}% annual return.
              </span>
            </div>
          </div>

          {/* Breakdown Gauge */}
          <div className="calc-gauge">
            <div className="calc-gauge-header">
              <span style={{ color: 'var(--primary)' }}>
                Capital Invested: {principalPct}%
              </span>
              <span style={{ color: '#10b981' }}>
                Compound Returns: {interestPct}%
              </span>
            </div>
            <div className="calc-gauge-track" title="Principal Invested vs Compound Interest">
              <div style={{ width: `${principalPct}%`, background: 'var(--primary)', height: '100%' }} />
              <div style={{ width: `${interestPct}%`, background: '#10b981', height: '100%' }} />
            </div>
          </div>

          {/* Metric Rows */}
          <div className="calc-metrics-list">
            <div className="calc-metric-row">
              <span className="calc-metric-key">Total Capital Invested:</span>
              <span className="calc-metric-val num-tabular">
                {formatMoney(result.totalPrincipalInvested, currencySymbol, 0)}
              </span>
            </div>
            <div className="calc-metric-row">
              <span className="calc-metric-key">Compound Returns Generated:</span>
              <span className="calc-metric-val num-tabular" style={{ color: '#10b981' }}>
                +{formatMoney(result.totalInterestEarned, currencySymbol, 0)}
              </span>
            </div>
            <div className="calc-metric-row">
              <span className="calc-metric-key">Wealth Multiplier:</span>
              <span className="calc-metric-val num-tabular" style={{ color: 'var(--primary)' }}>
                {wealthMultiplier}x
              </span>
            </div>
          </div>

          {/* Compounding Multiplier Box */}
          <div className="calc-insight-box">
            <div className="calc-insight-title">Power of Compounding</div>
            <div className="calc-insight-num num-tabular">
              +{formatMoney(result.totalInterestEarned, currencySymbol, 0)} In Gains
            </div>
            <div className="calc-insight-sub">
              Compound interest generates {interestPct}% of your final balance, effectively multiplying your invested capital by {wealthMultiplier}x.
            </div>
          </div>

          {/* Toggle Schedule Button */}
          <button
            type="button"
            className="calc-accordion-btn"
            onClick={() => setShowSchedule(!showSchedule)}
          >
            <span>View Annual Growth Amortization ({result.schedule.length} Years)</span>
            {showSchedule ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {/* Action Buttons */}
          <div className="calc-actions">
            <button
              type="button"
              className="calc-share-btn"
              onClick={() => {
                const text = `📈 *Compound Interest Simulation*
💰 *Initial Principal:* ${formatMoney(principal, currencySymbol, 0)}
📥 *Monthly Contribution:* ${formatMoney(monthlyDeposit, currencySymbol, 0)}/mo
⚡ *Interest Rate:* ${annualRate}% p.a.
⏳ *Tenure:* ${tenureYears} Years

🏆 *Compounded Results:*
• *Final Corpus:* *${formatMoney(result.finalBalance, currencySymbol, 0)}* (${wealthMultiplier}x initial)
• *Total Capital Invested:* ${formatMoney(result.totalPrincipalInvested, currencySymbol, 0)}
• *Compounded Wealth Gains:* ${formatMoney(result.totalInterestEarned, currencySymbol, 0)}

🔗 *Simulate compound growth on Pocket Advisor:*
${shareUrl}`;
                const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
            >
              <MessageCircle size={16} />
              <span>Share Simulation</span>
            </button>

            <button
              type="button"
              className={`calc-copy-btn ${copied ? 'copied' : ''}`}
              onClick={async () => {
                try {
                  if (navigator?.clipboard?.writeText) {
                    await navigator.clipboard.writeText(shareUrl);
                  }
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                } catch {
                  // ignore
                }
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* EXPANDABLE SCHEDULE CARD                                  */}
      {/* ========================================================= */}
      {showSchedule && (
        <div className="calc-card calc-schedule-card">
          <div className="calc-card-header" style={{ marginBottom: '12px' }}>
            <h4 className="calc-card-title">
              Annual Compounding Growth Schedule
            </h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {tenureYears} Years Compounded {freq === 12 ? 'Monthly' : freq === 4 ? 'Quarterly' : freq === 365 ? 'Daily' : 'Annually'}
            </span>
          </div>
          <div className="calc-table-container">
            <table className="calc-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Annual Deposit</th>
                  <th>Interest Earned</th>
                  <th>Closing Wealth Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((item) => (
                  <tr key={item.year}>
                    <td style={{ fontWeight: 800 }}>Year {item.year}</td>
                    <td style={{ color: 'var(--text-secondary)' }} className="num-tabular">
                      {formatMoney(item.annualDeposit, currencySymbol, 0)}
                    </td>
                    <td style={{ color: '#10b981', fontWeight: 600 }} className="num-tabular">
                      +{formatMoney(item.interestEarned, currencySymbol, 0)}
                    </td>
                    <td style={{ color: 'var(--primary)', fontWeight: 800 }} className="num-tabular">
                      {formatMoney(item.closingBalance, currencySymbol, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
