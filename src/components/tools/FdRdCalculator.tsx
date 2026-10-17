import React, { useState, useMemo } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { formatMoney } from '../../utils/formatters';
import { calculateFdRd } from '../../utils/financeCalculations';
import { Copy, Check, MessageCircle, Building2, Percent, Calendar, Layers, ShieldCheck } from 'lucide-react';
import './CalculatorCard.css';

export const FdRdCalculator: React.FC = () => {
  const { currencySymbol } = useSettings();

  const initialParams = useMemo(() => {
    if (typeof window === 'undefined') return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  }, []);

  const [type, setType] = useState<'FD' | 'RD'>(() => {
    const val = initialParams.get('type')?.toUpperCase();
    return val === 'RD' ? 'RD' : 'FD';
  });
  const [depositAmount, setDepositAmount] = useState<number>(() => {
    const val = Number(initialParams.get('amount'));
    return Number.isFinite(val) && val > 0 ? val : (type === 'FD' ? 200000 : 10000);
  });
  const [annualRate, setAnnualRate] = useState<number>(() => {
    const val = Number(initialParams.get('rate'));
    return Number.isFinite(val) && val > 0 ? val : 7.25;
  });
  const [tenureMonths, setTenureMonths] = useState<number>(() => {
    const val = Number(initialParams.get('months'));
    return Number.isFinite(val) && val > 0 ? val : 36;
  });
  const [compoundingFreq, setCompoundingFreq] = useState<number>(() => {
    const val = Number(initialParams.get('freq'));
    return [1, 2, 4, 12].includes(val) ? val : 4;
  });
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateFdRd({
      type,
      depositAmount,
      annualRatePct: annualRate,
      tenureMonths,
      compoundingFrequency: compoundingFreq,
    });
  }, [type, depositAmount, annualRate, tenureMonths, compoundingFreq]);

  const depositPct = result.maturityAmount > 0
    ? Math.min(100, Math.max(0, Math.round((result.totalDeposit / result.maturityAmount) * 100)))
    : 100;
  const interestPct = Math.max(0, 100 - depositPct);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/fd-rd-calculator?type=${type}&amount=${depositAmount}&rate=${annualRate}&months=${tenureMonths}&freq=${compoundingFreq}`
    : '';

  // Track fills
  const maxDeposit = type === 'FD' ? 5000000 : 100000;
  const minDeposit = type === 'FD' ? 10000 : 500;
  const depositFill = Math.min(100, Math.max(0, ((depositAmount - minDeposit) / (maxDeposit - minDeposit)) * 100));
  const rateFill = Math.min(100, Math.max(0, ((annualRate - 3) / (12 - 3)) * 100));
  const tenureFill = Math.min(100, Math.max(0, ((tenureMonths - 3) / (120 - 3)) * 100));

  const getSliderStyle = (fillPct: number, colorVar = 'var(--primary)') => ({
    background: `linear-gradient(to right, ${colorVar} 0%, ${colorVar} ${fillPct}%, var(--bg-surface-elevated) ${fillPct}%, var(--bg-surface-elevated) 100%)`,
  });

  return (
    <div className="calc-2col-container">
      {/* Type Toggle Header */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            gap: '4px',
            padding: '5px',
            borderRadius: '9999px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setType('FD');
              if (depositAmount < 25000) setDepositAmount(200000);
            }}
            style={{
              padding: '8px 24px',
              borderRadius: '9999px',
              border: 'none',
              background: type === 'FD' ? 'var(--primary-gradient)' : 'transparent',
              color: type === 'FD' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 750,
              fontSize: '0.86rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Fixed Deposit (Lump Sum)
          </button>
          <button
            type="button"
            onClick={() => {
              setType('RD');
              if (depositAmount > 100000) setDepositAmount(10000);
            }}
            style={{
              padding: '8px 24px',
              borderRadius: '9999px',
              border: 'none',
              background: type === 'RD' ? 'var(--primary-gradient)' : 'transparent',
              color: type === 'RD' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 750,
              fontSize: '0.86rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Recurring Deposit (Monthly)
          </button>
        </div>
      </div>

      <div className="calc-2col-grid">
        {/* ========================================================= */}
        {/* CARD 1: FD/RD Parameters                                  */}
        {/* ========================================================= */}
        <div className="calc-card">
          <div className="calc-card-header">
            <div className="calc-card-badge">
              <Building2 size={14} /> {type === 'FD' ? 'Fixed Deposit' : 'Recurring Deposit'}
            </div>
            <h4 className="calc-card-title">Deposit &amp; Tenure Terms</h4>
          </div>

          <div className="calc-controls">
            {/* Deposit Amount */}
            <div className="calc-field">
              <div className="calc-field-header">
                <label className="calc-label" htmlFor="fdrd-amount-input">
                  <Building2 size={16} color="var(--primary)" />
                  {type === 'FD' ? 'Total Lump Sum Deposit' : 'Monthly Recurring Deposit'}
                </label>
                <div className="calc-input-badge">
                  <span className="calc-unit" style={{ marginRight: '5px' }}>{currencySymbol}</span>
                  <input
                    id="fdrd-amount-input"
                    type="number"
                    value={depositAmount || ''}
                    onChange={(e) => setDepositAmount(Math.max(0, Number(e.target.value)))}
                    className="calc-num-input num-tabular"
                    style={{ width: '105px' }}
                  />
                </div>
              </div>
              <div className="calc-slider-track">
                <input
                  type="range"
                  min={minDeposit}
                  max={maxDeposit}
                  step={type === 'FD' ? 25000 : 500}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="calc-range"
                  style={getSliderStyle(depositFill)}
                  aria-label="Deposit amount slider"
                />
              </div>
              <div className="calc-presets">
                {type === 'FD'
                  ? [
                      { label: '₹1 Lakh', val: 100000 },
                      { label: '₹2 Lakh', val: 200000 },
                      { label: '₹5 Lakh', val: 500000 },
                      { label: '₹10 Lakh', val: 1000000 },
                    ].map((p) => (
                      <button
                        key={p.val}
                        type="button"
                        className={`calc-chip ${depositAmount === p.val ? 'active' : ''}`}
                        onClick={() => setDepositAmount(p.val)}
                      >
                        {p.label}
                      </button>
                    ))
                  : [
                      { label: '₹2,500/mo', val: 2500 },
                      { label: '₹5,000/mo', val: 5000 },
                      { label: '₹10,000/mo', val: 10000 },
                      { label: '₹25,000/mo', val: 25000 },
                    ].map((p) => (
                      <button
                        key={p.val}
                        type="button"
                        className={`calc-chip ${depositAmount === p.val ? 'active' : ''}`}
                        onClick={() => setDepositAmount(p.val)}
                      >
                        {p.label}
                      </button>
                    ))}
              </div>
            </div>

            {/* Interest Rate */}
            <div className="calc-field">
              <div className="calc-field-header">
                <label className="calc-label" htmlFor="fdrd-rate-input">
                  <Percent size={16} color="#0284c7" />
                  Annual Interest Rate
                </label>
                <div className="calc-input-badge">
                  <input
                    id="fdrd-rate-input"
                    type="number"
                    step="0.05"
                    min="3"
                    max="15"
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
                  min="3"
                  max="12"
                  step="0.05"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  className="calc-range"
                  style={getSliderStyle(rateFill, '#0284c7')}
                  aria-label="Annual interest rate slider"
                />
              </div>
              <div className="calc-presets">
                {[
                  { label: '6.5% Regular', val: 6.5 },
                  { label: '7.0% Standard', val: 7.0 },
                  { label: '7.5% High Yield', val: 7.5 },
                  { label: '8.0% Senior Citizen', val: 8.0 },
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

            {/* Tenure Duration */}
            <div className="calc-field">
              <div className="calc-field-header">
                <label className="calc-label" htmlFor="fdrd-tenure-input">
                  <Calendar size={16} color="var(--primary)" />
                  Tenure Duration
                </label>
                <div className="calc-input-badge">
                  <input
                    id="fdrd-tenure-input"
                    type="number"
                    min="3"
                    max="120"
                    value={tenureMonths || ''}
                    onChange={(e) => setTenureMonths(Math.max(1, Number(e.target.value)))}
                    className="calc-num-input num-tabular"
                    style={{ width: '48px' }}
                  />
                  <span className="calc-unit" style={{ marginLeft: '4px' }}>Mos</span>
                </div>
              </div>
              <div className="calc-slider-track">
                <input
                  type="range"
                  min="3"
                  max="120"
                  step="3"
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="calc-range"
                  style={getSliderStyle(tenureFill)}
                  aria-label="Tenure months slider"
                />
              </div>
              <div className="calc-presets">
                {[
                  { label: '6 Months', val: 6 },
                  { label: '1 Year', val: 12 },
                  { label: '2 Years', val: 24 },
                  { label: '3 Years', val: 36 },
                  { label: '5 Years', val: 60 },
                ].map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    className={`calc-chip ${tenureMonths === p.val ? 'active' : ''}`}
                    onClick={() => setTenureMonths(p.val)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Compounding Frequency (FD only) */}
            {type === 'FD' && (
              <div className="calc-field">
                <label className="calc-label" htmlFor="fdrd-freq-select">
                  <Layers size={16} color="var(--primary)" />
                  Compounding Frequency
                </label>
                <select
                  id="fdrd-freq-select"
                  value={compoundingFreq}
                  onChange={(e) => setCompoundingFreq(Number(e.target.value))}
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
                  <option value={4}>Quarterly Compounding (Indian Banks Standard)</option>
                  <option value={12}>Monthly Compounding</option>
                  <option value={2}>Half-Yearly Compounding</option>
                  <option value={1}>Annual Compounding</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* CARD 2: Maturity Value & Accrued Interest Results         */}
        {/* ========================================================= */}
        <div className="calc-card calc-results-card">
          <div>
            <div className="calc-card-header" style={{ marginBottom: '16px' }}>
              <div className="calc-card-badge calc-card-badge-success">
                <ShieldCheck size={14} /> Guaranteed Maturity
              </div>
              <span className="calc-pill calc-pill-emerald">
                {result.effectiveAnnualYield}% Effective Yield
              </span>
            </div>

            <div className="calc-hero-metric">
              <h3 className="calc-hero-val calc-hero-val-success num-tabular">
                {formatMoney(result.maturityAmount, currencySymbol, 0)}
              </h3>
              <span className="calc-hero-sub">
                Guaranteed total payout at completion of {tenureMonths} months ({(tenureMonths / 12).toFixed(1)} years).
              </span>
            </div>
          </div>

          {/* Breakdown Gauge */}
          <div className="calc-gauge">
            <div className="calc-gauge-header">
              <span style={{ color: 'var(--primary)' }}>
                Capital Deposited: {depositPct}%
              </span>
              <span style={{ color: '#10b981' }}>
                Interest Accrued: {interestPct}%
              </span>
            </div>
            <div className="calc-gauge-track" title="Deposited Capital vs Total Interest">
              <div style={{ width: `${depositPct}%`, background: 'var(--primary)', height: '100%' }} />
              <div style={{ width: `${interestPct}%`, background: '#10b981', height: '100%' }} />
            </div>
          </div>

          {/* Key Metric Rows */}
          <div className="calc-metrics-list">
            <div className="calc-metric-row">
              <span className="calc-metric-key">Total Capital Deposited:</span>
              <span className="calc-metric-val num-tabular">
                {formatMoney(result.totalDeposit, currencySymbol, 0)}
              </span>
            </div>
            <div className="calc-metric-row">
              <span className="calc-metric-key">Total Interest Accrued:</span>
              <span className="calc-metric-val num-tabular" style={{ color: '#10b981' }}>
                +{formatMoney(result.totalInterest, currencySymbol, 0)}
              </span>
            </div>
            <div className="calc-metric-row">
              <span className="calc-metric-key">Effective Annualized Yield:</span>
              <span className="calc-metric-val num-tabular" style={{ color: '#f59e0b' }}>
                {result.effectiveAnnualYield}% p.a.
              </span>
            </div>
          </div>

          {/* Guaranteed Growth Insight Box */}
          <div className="calc-insight-box">
            <div className="calc-insight-title">Capital Security</div>
            <div className="calc-insight-num num-tabular">
              {formatMoney(result.totalInterest, currencySymbol, 0)} Accrued Interest
            </div>
            <div className="calc-insight-sub">
              Fixed term deposits provide DICGC insured capital protection up to ₹5 Lakh per depositor across Indian commercial banks.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="calc-actions">
            <button
              type="button"
              className="calc-share-btn"
              onClick={() => {
                const text = `🏦 *${type === 'FD' ? 'Fixed Deposit (FD)' : 'Recurring Deposit (RD)'} Calculation*
💰 *Deposit Amount:* ${formatMoney(depositAmount, currencySymbol, 0)}${type === 'RD' ? '/month' : ''}
📈 *Interest Rate:* ${annualRate}% p.a.
⏳ *Tenure:* ${tenureMonths} Months (${(tenureMonths / 12).toFixed(1)} Years)

📊 *Maturity Summary:*
• *Final Maturity Value:* *${formatMoney(result.maturityAmount, currencySymbol, 0)}*
• *Total Deposited:* ${formatMoney(result.totalDeposit, currencySymbol, 0)}
• *Total Interest Accrued:* ${formatMoney(result.totalInterest, currencySymbol, 0)}
• *Effective Annual Yield:* ${result.effectiveAnnualYield}%

🔗 *Simulate FD & RD returns on Pocket Advisor:*
${shareUrl}`;
                const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
            >
              <MessageCircle size={16} />
              <span>Share Summary</span>
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
