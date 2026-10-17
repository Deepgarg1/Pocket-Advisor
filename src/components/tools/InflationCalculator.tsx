import React, { useState, useMemo } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { formatMoney } from '../../utils/formatters';
import { calculateInflation } from '../../utils/financeCalculations';
import {
  Copy,
  Check,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Flame,
  Clock,
  Coins,
} from 'lucide-react';
import './InflationCalculator.css';

export const InflationCalculator: React.FC = () => {
  const { currencySymbol } = useSettings();

  const initialParams = useMemo(() => {
    if (typeof window === 'undefined') return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  }, []);

  const [currentCost, setCurrentCost] = useState<number>(() => {
    const val = Number(initialParams.get('cost'));
    return Number.isFinite(val) && val > 0 ? val : 100000;
  });
  const [inflationRate, setInflationRate] = useState<number>(() => {
    const val = Number(initialParams.get('rate'));
    return Number.isFinite(val) && val > 0 ? val : 6.0;
  });
  const [tenureYears, setTenureYears] = useState<number>(() => {
    const val = Number(initialParams.get('years'));
    return Number.isFinite(val) && val > 0 ? val : 15;
  });
  const [showSchedule, setShowSchedule] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateInflation({
      currentCost,
      annualInflationPct: inflationRate,
      tenureYears,
    });
  }, [currentCost, inflationRate, tenureYears]);

  const costMultiplier = currentCost > 0
    ? (result.futureCost / currentCost).toFixed(2)
    : '1.00';

  const surgePercent = Math.max(0, Math.round((Number(costMultiplier) - 1) * 100));
  const retainedPct = Math.max(0, Math.min(100, Math.round(100 - result.purchasingPowerLossPct)));

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/inflation-calculator?cost=${currentCost}&rate=${inflationRate}&years=${tenureYears}`
    : '';

  // Track fill calculations
  const costFill = Math.min(100, Math.max(0, ((currentCost - 5000) / (2000000 - 5000)) * 100));
  const rateFill = Math.min(100, Math.max(0, ((inflationRate - 2) / (15 - 2)) * 100));
  const tenureFill = Math.min(100, Math.max(0, ((tenureYears - 1) / (35 - 1)) * 100));

  const getSliderStyle = (fillPct: number) => ({
    background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${fillPct}%, var(--bg-surface-elevated) ${fillPct}%, var(--bg-surface-elevated) 100%)`,
  });

  return (
    <div className="inflation-container">
      <div className="inflation-grid">
        {/* ========================================================= */}
        {/* CARD 1: Inflation & Cost Parameters                      */}
        {/* ========================================================= */}
        <div className="inflation-card inflation-controls-card">
          <div className="inflation-card-header">
            <div className="inflation-card-badge">
              <Flame size={14} /> Inflation Simulator
            </div>
            <h4 className="inflation-card-title">Cost &amp; Horizon Parameters</h4>
          </div>

          {/* 1. Current Cost */}
          <div className="inflation-field">
            <div className="inflation-field-header">
              <label className="inflation-label" htmlFor="inflation-cost-input">
                <Coins size={16} color="var(--primary)" />
                Current Cost of Living / Purchase
              </label>
              <div className="inflation-input-badge">
                <span className="inflation-unit" style={{ marginRight: '5px' }}>{currencySymbol}</span>
                <input
                  id="inflation-cost-input"
                  type="number"
                  value={currentCost || ''}
                  onChange={(e) => setCurrentCost(Math.max(0, Number(e.target.value)))}
                  className="inflation-num-input num-tabular"
                  style={{ width: '95px' }}
                />
              </div>
            </div>
            <div className="inflation-slider-track">
              <input
                type="range"
                min="5000"
                max="2000000"
                step="5000"
                value={currentCost}
                onChange={(e) => setCurrentCost(Number(e.target.value))}
                className="inflation-range"
                style={getSliderStyle(costFill)}
                aria-label="Current cost slider"
              />
            </div>
            <div className="inflation-presets">
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
                  className={`inflation-chip ${currentCost === p.val ? 'active' : ''}`}
                  onClick={() => setCurrentCost(p.val)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Inflation Rate */}
          <div className="inflation-field">
            <div className="inflation-field-header">
              <label className="inflation-label" htmlFor="inflation-rate-input">
                <Flame size={16} color="#f43f5e" />
                Assumed Annual Inflation Rate
              </label>
              <div className="inflation-input-badge">
                <input
                  id="inflation-rate-input"
                  type="number"
                  step="0.1"
                  min="1"
                  max="20"
                  value={inflationRate || ''}
                  onChange={(e) => setInflationRate(Math.max(0, Number(e.target.value)))}
                  className="inflation-num-input num-tabular"
                  style={{ width: '48px' }}
                />
                <span className="inflation-unit" style={{ marginLeft: '4px' }}>%</span>
              </div>
            </div>
            <div className="inflation-slider-track">
              <input
                type="range"
                min="2"
                max="15"
                step="0.25"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="inflation-range"
                style={getSliderStyle(rateFill)}
                aria-label="Annual inflation rate slider"
              />
            </div>
            <div className="inflation-presets">
              {[
                { label: 'Moderate (4%)', val: 4.0 },
                { label: 'India CPI (6%)', val: 6.0 },
                { label: 'Lifestyle (8%)', val: 8.0 },
                { label: 'Education / Med (10%)', val: 10.0 },
                { label: 'High (12%)', val: 12.0 },
              ].map((p) => (
                <button
                  key={p.val}
                  type="button"
                  className={`inflation-chip ${inflationRate === p.val ? 'active' : ''}`}
                  onClick={() => setInflationRate(p.val)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Time Horizon */}
          <div className="inflation-field">
            <div className="inflation-field-header">
              <label className="inflation-label" htmlFor="inflation-tenure-input">
                <Clock size={16} color="var(--primary)" />
                Time Horizon
              </label>
              <div className="inflation-input-badge">
                <input
                  id="inflation-tenure-input"
                  type="number"
                  min="1"
                  max="40"
                  value={tenureYears || ''}
                  onChange={(e) => setTenureYears(Math.max(1, Number(e.target.value)))}
                  className="inflation-num-input num-tabular"
                  style={{ width: '44px' }}
                />
                <span className="inflation-unit" style={{ marginLeft: '4px' }}>Yrs</span>
              </div>
            </div>
            <div className="inflation-slider-track">
              <input
                type="range"
                min="1"
                max="35"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="inflation-range"
                style={getSliderStyle(tenureFill)}
                aria-label="Time horizon years slider"
              />
            </div>
            <div className="inflation-presets">
              {[5, 10, 15, 20, 25, 30].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  className={`inflation-chip ${tenureYears === yr ? 'active' : ''}`}
                  onClick={() => setTenureYears(yr)}
                >
                  {yr} Years
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CARD 2: Purchasing Power & Price Projection Results       */}
        {/* ========================================================= */}
        <div className="inflation-card inflation-results-card">
          <div className="inflation-card-header">
            <div className="inflation-card-badge" style={{ color: '#e11d48', background: 'rgba(225, 29, 72, 0.1)', borderColor: 'rgba(225, 29, 72, 0.2)' }}>
              <TrendingUp size={14} /> Future Cost Projection
            </div>
            <span className="inflation-surge-pill">
              +{surgePercent}% Price Surge
            </span>
          </div>

          <div className="inflation-hero-metric">
            <h3 className="inflation-hero-val num-tabular">
              {formatMoney(result.futureCost, currencySymbol, 0)}
            </h3>
            <span className="inflation-hero-sub">
              Amount required in {tenureYears} years to match today's {formatMoney(currentCost, currencySymbol, 0)} purchasing power.
            </span>
          </div>

          {/* Purchasing Power Erosion Gauge */}
          <div className="inflation-gauge">
            <div className="inflation-gauge-header">
              <span style={{ color: '#10b981' }}>
                Remaining Value: {retainedPct}%
              </span>
              <span style={{ color: '#f43f5e' }}>
                Eroded: -{result.purchasingPowerLossPct}%
              </span>
            </div>
            <div className="inflation-gauge-track" title={`Real value retained: ${retainedPct}%`}>
              <div
                className="inflation-gauge-fill"
                style={{ width: `${retainedPct}%` }}
              />
            </div>
          </div>

          {/* Detailed Metric Rows */}
          <div className="inflation-metrics-list">
            <div className="inflation-metric-row">
              <span className="inflation-metric-key">Current Equivalent Value:</span>
              <span className="inflation-metric-val num-tabular">
                {formatMoney(currentCost, currencySymbol, 0)}
              </span>
            </div>

            <div className="inflation-metric-row">
              <span className="inflation-metric-key">
                Purchasing Power of Today's Money:
              </span>
              <span className="inflation-metric-val num-tabular" style={{ color: '#f59e0b' }}>
                {formatMoney(result.purchasingPower, currencySymbol, 0)}
              </span>
            </div>

            <div className="inflation-metric-row">
              <span className="inflation-metric-key">Cost Multiplier:</span>
              <span className="inflation-metric-val num-tabular" style={{ color: 'var(--primary)' }}>
                {costMultiplier}x
              </span>
            </div>
          </div>

          {/* Extra Outflow Box */}
          <div className="inflation-outflow-box">
            <div className="inflation-outflow-title">
              Additional Capital Outflow Needed
            </div>
            <div className="inflation-outflow-num num-tabular">
              +{formatMoney(result.additionalCostNeeded, currencySymbol, 0)}
            </div>
            <div className="inflation-outflow-sub">
              You must invest capital at &gt;{inflationRate}% annual post-tax return to prevent real net-worth decay.
            </div>
          </div>

          {/* Toggle Schedule Button */}
          <button
            type="button"
            className="inflation-accordion-btn"
            onClick={() => setShowSchedule(!showSchedule)}
          >
            <span>View Year-by-Year Cost Erosion ({result.schedule.length} Years)</span>
            {showSchedule ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {/* Action Buttons */}
          <div className="inflation-actions">
            <button
              type="button"
              className="inflation-share-btn"
              onClick={() => {
                const text = `🔥 *Inflation & Purchasing Power Projection*
🛒 *Current Cost:* ${formatMoney(currentCost, currencySymbol, 0)}
⚡ *Annual Inflation:* ${inflationRate}% p.a.
⏳ *Horizon:* ${tenureYears} Years

📊 *Erosion Summary:*
• *Future Price of Same Item:* *${formatMoney(result.futureCost, currencySymbol, 0)}* (${costMultiplier}x increase)
• *Purchasing Power of Today's ${formatMoney(currentCost, currencySymbol, 0)}:* ${formatMoney(result.purchasingPower, currencySymbol, 0)}
• *Real Wealth Erosion:* -${result.purchasingPowerLossPct}%

🔗 *Calculate inflation impact on Pocket Advisor:*
${shareUrl}`;
                const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
            >
              <MessageCircle size={16} />
              <span>Share Projection</span>
            </button>

            <button
              type="button"
              className={`inflation-copy-btn ${copied ? 'copied' : ''}`}
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
      {/* EXPANDABLE SCHEDULE CARD (Separate card underneath)       */}
      {/* ========================================================= */}
      {showSchedule && (
        <div className="inflation-card inflation-schedule-card">
          <div className="inflation-card-header" style={{ marginBottom: '12px' }}>
            <h4 className="inflation-card-title">
              Year-by-Year Cost &amp; Purchasing Power Erosion Schedule
            </h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {tenureYears} Years at {inflationRate}% p.a.
            </span>
          </div>
          <div className="inflation-table-container">
            <table className="inflation-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Future Cost of Goods</th>
                  <th>Purchasing Power of Today's Capital</th>
                  <th>Real Value Eroded (%)</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((item) => (
                  <tr key={item.year}>
                    <td style={{ fontWeight: 800 }}>Year {item.year}</td>
                    <td style={{ color: '#e11d48', fontWeight: 700 }} className="num-tabular">
                      {formatMoney(item.futureCost, currencySymbol, 0)}
                    </td>
                    <td style={{ color: '#f59e0b', fontWeight: 600 }} className="num-tabular">
                      {formatMoney(item.purchasingPower, currencySymbol, 0)}
                    </td>
                    <td style={{ color: '#ef4444', fontWeight: 800 }} className="num-tabular">
                      -{item.valueErodedPct}%
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
