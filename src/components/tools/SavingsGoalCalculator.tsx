import React, { useState, useMemo } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { formatMoney } from '../../utils/formatters';
import { calculateSavingsGoal } from '../../utils/financeCalculations';
import { Copy, Check, MessageCircle, Target, PiggyBank, Calendar, TrendingUp } from 'lucide-react';
import './CalculatorCard.css';

export const SavingsGoalCalculator: React.FC = () => {
  const { currencySymbol } = useSettings();

  const initialParams = useMemo(() => {
    if (typeof window === 'undefined') return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  }, []);

  const [targetAmount, setTargetAmount] = useState<number>(() => {
    const val = Number(initialParams.get('target'));
    return Number.isFinite(val) && val > 0 ? val : 1000000;
  });
  const [currentSavings, setCurrentSavings] = useState<number>(() => {
    const val = Number(initialParams.get('current'));
    return Number.isFinite(val) && val >= 0 ? val : 100000;
  });
  const [tenureYears, setTenureYears] = useState<number>(() => {
    const val = Number(initialParams.get('years'));
    return Number.isFinite(val) && val > 0 ? val : 3;
  });
  const [expectedReturn, setExpectedReturn] = useState<number>(() => {
    const val = Number(initialParams.get('returnRate'));
    return Number.isFinite(val) && val >= 0 ? val : 10;
  });
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateSavingsGoal({
      targetAmount,
      currentSavings,
      tenureYears,
      expectedAnnualReturn: expectedReturn,
    });
  }, [targetAmount, currentSavings, tenureYears, expectedReturn]);

  const selfInvestedPct = result.targetAmount > 0
    ? Math.min(100, Math.max(0, Math.round((result.totalSelfInvested / result.targetAmount) * 100)))
    : 100;
  const growthPct = Math.max(0, 100 - selfInvestedPct);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/savings-goal-calculator?target=${targetAmount}&current=${currentSavings}&years=${tenureYears}&returnRate=${expectedReturn}`
    : '';

  // Track fill percentages
  const targetFill = Math.min(100, Math.max(0, ((targetAmount - 50000) / (10000000 - 50000)) * 100));
  const currentFill = Math.min(100, Math.max(0, (currentSavings / 5000000) * 100));
  const tenureFill = Math.min(100, Math.max(0, ((tenureYears - 1) / (25 - 1)) * 100));
  const returnFill = Math.min(100, Math.max(0, (expectedReturn / 20) * 100));

  const getSliderStyle = (fillPct: number, colorVar = 'var(--primary)') => ({
    background: `linear-gradient(to right, ${colorVar} 0%, ${colorVar} ${fillPct}%, var(--bg-surface-elevated) ${fillPct}%, var(--bg-surface-elevated) 100%)`,
  });

  return (
    <div className="calc-2col-container">
      <div className="calc-2col-grid">
        {/* ========================================================= */}
        {/* CARD 1: Savings Goal Inputs                               */}
        {/* ========================================================= */}
        <div className="calc-card">
          <div className="calc-card-header">
            <div className="calc-card-badge">
              <Target size={14} /> Goal Planner
            </div>
            <h4 className="calc-card-title">Savings Target Parameters</h4>
          </div>

          <div className="calc-controls">
            {/* Target Amount */}
            <div className="calc-field">
              <div className="calc-field-header">
                <label className="calc-label" htmlFor="goal-target-input">
                  <Target size={16} color="var(--primary)" />
                  Target Savings Goal
                </label>
                <div className="calc-input-badge">
                  <span className="calc-unit" style={{ marginRight: '5px' }}>{currencySymbol}</span>
                  <input
                    id="goal-target-input"
                    type="number"
                    value={targetAmount || ''}
                    onChange={(e) => setTargetAmount(Math.max(0, Number(e.target.value)))}
                    className="calc-num-input num-tabular"
                    style={{ width: '105px' }}
                  />
                </div>
              </div>
              <div className="calc-slider-track">
                <input
                  type="range"
                  min="50000"
                  max="10000000"
                  step="50000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="calc-range"
                  style={getSliderStyle(targetFill)}
                  aria-label="Target savings amount slider"
                />
              </div>
              <div className="calc-presets">
                {[
                  { label: '₹2 Lakh', val: 200000 },
                  { label: '₹5 Lakh', val: 500000 },
                  { label: '₹10 Lakh', val: 1000000 },
                  { label: '₹25 Lakh', val: 2500000 },
                  { label: '₹50 Lakh', val: 5000000 },
                ].map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    className={`calc-chip ${targetAmount === p.val ? 'active' : ''}`}
                    onClick={() => setTargetAmount(p.val)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Savings */}
            <div className="calc-field">
              <div className="calc-field-header">
                <label className="calc-label" htmlFor="goal-current-input">
                  <PiggyBank size={16} color="#10b981" />
                  Current Existing Savings
                </label>
                <div className="calc-input-badge">
                  <span className="calc-unit" style={{ marginRight: '5px' }}>{currencySymbol}</span>
                  <input
                    id="goal-current-input"
                    type="number"
                    value={currentSavings || (currentSavings === 0 ? 0 : '')}
                    onChange={(e) => setCurrentSavings(Math.max(0, Number(e.target.value)))}
                    className="calc-num-input num-tabular"
                    style={{ width: '95px' }}
                  />
                </div>
              </div>
              <div className="calc-slider-track">
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="25000"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="calc-range"
                  style={getSliderStyle(currentFill, '#10b981')}
                  aria-label="Current existing savings slider"
                />
              </div>
              <div className="calc-presets">
                {[
                  { label: '₹0 (Starting Fresh)', val: 0 },
                  { label: '₹50K', val: 50000 },
                  { label: '₹1 Lakh', val: 100000 },
                  { label: '₹2.5 Lakh', val: 250000 },
                ].map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    className={`calc-chip ${currentSavings === p.val ? 'active' : ''}`}
                    onClick={() => setCurrentSavings(p.val)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Deadline */}
            <div className="calc-field">
              <div className="calc-field-header">
                <label className="calc-label" htmlFor="goal-tenure-input">
                  <Calendar size={16} color="var(--primary)" />
                  Target Deadline
                </label>
                <div className="calc-input-badge">
                  <input
                    id="goal-tenure-input"
                    type="number"
                    min="1"
                    max="30"
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
                  max="25"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="calc-range"
                  style={getSliderStyle(tenureFill)}
                  aria-label="Target deadline years slider"
                />
              </div>
              <div className="calc-presets">
                {[1, 2, 3, 5, 7, 10].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    className={`calc-chip ${tenureYears === yr ? 'active' : ''}`}
                    onClick={() => setTenureYears(yr)}
                  >
                    {yr} {yr === 1 ? 'Year' : 'Years'}
                  </button>
                ))}
              </div>
            </div>

            {/* Expected Annual Return */}
            <div className="calc-field">
              <div className="calc-field-header">
                <label className="calc-label" htmlFor="goal-return-input">
                  <TrendingUp size={16} color="#0284c7" />
                  Expected Annual Return
                </label>
                <div className="calc-input-badge">
                  <input
                    id="goal-return-input"
                    type="number"
                    step="0.5"
                    min="0"
                    max="25"
                    value={expectedReturn || (expectedReturn === 0 ? 0 : '')}
                    onChange={(e) => setExpectedReturn(Math.max(0, Number(e.target.value)))}
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
                  max="20"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="calc-range"
                  style={getSliderStyle(returnFill, '#0284c7')}
                  aria-label="Expected annual return percentage slider"
                />
              </div>
              <div className="calc-presets">
                {[
                  { label: 'Savings A/c (4%)', val: 4.0 },
                  { label: 'FD / Debt (7%)', val: 7.0 },
                  { label: 'Balanced (10%)', val: 10.0 },
                  { label: 'Equity Mutual Fund (12%)', val: 12.0 },
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
          </div>
        </div>

        {/* ========================================================= */}
        {/* CARD 2: Goal Projection & Monthly Savings Required        */}
        {/* ========================================================= */}
        <div className="calc-card calc-results-card">
          <div>
            <div className="calc-card-header" style={{ marginBottom: '16px' }}>
              <div className="calc-card-badge calc-card-badge-success">
                <Target size={14} /> Required Monthly Savings
              </div>
              <span className="calc-pill calc-pill-emerald">
                {tenureYears} Years Timeline
              </span>
            </div>

            <div className="calc-hero-metric">
              <h3 className="calc-hero-val calc-hero-val-success num-tabular">
                {formatMoney(result.monthlySavingsRequired, currencySymbol, 0)}
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '8px' }}>/ month</span>
              </h3>
              <span className="calc-hero-sub">
                Save and invest this amount monthly at {expectedReturn}% CAGR to accumulate {formatMoney(result.targetAmount, currencySymbol, 0)} in {tenureYears} years.
              </span>
            </div>
          </div>

          {/* Visual Breakdown Gauge */}
          <div className="calc-gauge">
            <div className="calc-gauge-header">
              <span style={{ color: 'var(--primary)' }}>
                Self-Contribution: {selfInvestedPct}%
              </span>
              <span style={{ color: '#10b981' }}>
                Growth: {growthPct}%
              </span>
            </div>
            <div className="calc-gauge-track" title="Self Contribution vs Wealth Growth">
              <div style={{ width: `${selfInvestedPct}%`, background: 'var(--primary)', height: '100%' }} />
              <div style={{ width: `${growthPct}%`, background: '#10b981', height: '100%' }} />
            </div>
          </div>

          {/* Key Metric Rows */}
          <div className="calc-metrics-list">
            <div className="calc-metric-row">
              <span className="calc-metric-key">Target Goal Corpus:</span>
              <span className="calc-metric-val num-tabular">
                {formatMoney(result.targetAmount, currencySymbol, 0)}
              </span>
            </div>
            <div className="calc-metric-row">
              <span className="calc-metric-key">Total Self-Contribution:</span>
              <span className="calc-metric-val num-tabular" style={{ color: 'var(--primary)' }}>
                {formatMoney(result.totalSelfInvested, currencySymbol, 0)}
              </span>
            </div>
            <div className="calc-metric-row">
              <span className="calc-metric-key">Compounding Gains Generated:</span>
              <span className="calc-metric-val num-tabular" style={{ color: '#10b981' }}>
                +{formatMoney(result.projectedInterestEarned, currencySymbol, 0)}
              </span>
            </div>
          </div>

          {/* Context Insight Box */}
          <div className="calc-insight-box">
            <div className="calc-insight-title">Compounding Efficiency</div>
            <div className="calc-insight-num num-tabular">
              {formatMoney(result.projectedInterestEarned, currencySymbol, 0)} Free Growth
            </div>
            <div className="calc-insight-sub">
              Compound returns fund {growthPct}% of your target goal, reducing your out-of-pocket contributions.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="calc-actions">
            <button
              type="button"
              className="calc-share-btn"
              onClick={() => {
                const text = `🎯 *Savings Goal Calculation*
🎯 *Target Corpus:* ${formatMoney(targetAmount, currencySymbol, 0)}
⏳ *Timeline:* ${tenureYears} Years (${tenureYears * 12} Months)
💼 *Initial Savings:* ${formatMoney(currentSavings, currencySymbol, 0)}
📈 *Assumed Return:* ${expectedReturn}% p.a.

📊 *Plan Breakdown:*
• *Required Monthly Savings:* *${formatMoney(result.monthlySavingsRequired, currencySymbol, 0)}/mo*
• *Total Self-Invested:* ${formatMoney(result.totalSelfInvested, currencySymbol, 0)} (${selfInvestedPct}%)
• *Wealth Gains from Compounding:* ${formatMoney(result.projectedInterestEarned, currencySymbol, 0)} (${growthPct}%)

🔗 *Calculate your goal roadmap on Pocket Advisor:*
${shareUrl}`;
                const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
            >
              <MessageCircle size={16} />
              <span>Share Plan</span>
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
    </div>
  );
};
