import React, { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, Download, RotateCcw, ShieldCheck, Wallet, TrendingUp, CircleDollarSign } from 'lucide-react';

type Expense = { id: string; label: string; amount: string; group: 'needs' | 'wants' | 'savings' };

const initialExpenses: Expense[] = [
  { id: 'rent', label: 'Rent / home loan', amount: '12000', group: 'needs' },
  { id: 'groceries', label: 'Groceries', amount: '5000', group: 'needs' },
  { id: 'utilities', label: 'Utilities & phone', amount: '1800', group: 'needs' },
  { id: 'transport', label: 'Transport', amount: '2000', group: 'needs' },
  { id: 'insurance', label: 'Insurance & healthcare', amount: '1500', group: 'needs' },
  { id: 'dining', label: 'Dining & entertainment', amount: '2500', group: 'wants' },
  { id: 'shopping', label: 'Shopping & subscriptions', amount: '1500', group: 'wants' },
  { id: 'sip', label: 'Investments (SIP etc.)', amount: '3000', group: 'savings' },
  { id: 'emergency', label: 'Emergency savings', amount: '2000', group: 'savings' },
];

const money = (value: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(Math.round(value));

const numberValue = (value: string) => Math.max(0, Number(value) || 0);

const groupConfig = {
  needs: { title: 'Needs', subtitle: 'Essentials & commitments', color: '#38bdf8', target: 0.5 },
  wants: { title: 'Wants', subtitle: 'Lifestyle & flexible spending', color: '#a78bfa', target: 0.3 },
  savings: { title: 'Savings & investing', subtitle: 'Future you will thank you for', color: '#34d399', target: 0.2 },
};

export const MonthlyBudgetPlanner: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const [income, setIncome] = useState('45000');
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ needs: true, wants: true, savings: true });
  const [showGuide, setShowGuide] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const summary = useMemo(() => {
    const needs = expenses.filter(e => e.group === 'needs').reduce((sum, e) => sum + numberValue(e.amount), 0);
    const wants = expenses.filter(e => e.group === 'wants').reduce((sum, e) => sum + numberValue(e.amount), 0);
    const savings = expenses.filter(e => e.group === 'savings').reduce((sum, e) => sum + numberValue(e.amount), 0);
    const monthlyIncome = numberValue(income);
    const planned = needs + wants + savings;
    return {
      needs, wants, savings, monthlyIncome, planned, remaining: monthlyIncome - planned,
      needsTarget: monthlyIncome * 0.5, wantsTarget: monthlyIncome * 0.3, savingsTarget: monthlyIncome * 0.2,
      budgetUsed: monthlyIncome > 0 ? planned / monthlyIncome * 100 : 0,
    };
  }, [income, expenses]);

  const updateExpense = (id: string, amount: string) =>
    setExpenses(current => current.map(item => item.id === id ? { ...item, amount } : item));

  const reset = () => {
    setIncome('45000');
    setExpenses(initialExpenses);
    setOpenGroups({ needs: true, wants: true, savings: true });
  };

  const exportCsv = () => {
    const rows = [['Monthly Budget Planner'], ['Monthly take-home income', summary.monthlyIncome.toString()], ['Category', 'Budget group', 'Monthly amount']];
    expenses.forEach(item => rows.push([item.label, item.group, numberValue(item.amount).toString()]));
    rows.push(['Total planned', '', summary.planned.toString()], ['Money left', '', summary.remaining.toString()]);
    const csv = rows.map(row => row.map(cell => '"' + cell.replace(/"/g, '""') + '"').join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'pocket-advisor-monthly-budget.csv'; link.click();
    URL.revokeObjectURL(url);
  };

  const groups = [
    { key: 'needs' as const, ...groupConfig.needs, total: summary.needs, targetAmount: summary.needsTarget },
    { key: 'wants' as const, ...groupConfig.wants, total: summary.wants, targetAmount: summary.wantsTarget },
    { key: 'savings' as const, ...groupConfig.savings, total: summary.savings, targetAmount: summary.savingsTarget },
  ];

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 18,
  };

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(18px, 3.5vw, 36px) clamp(12px, 3vw, 24px) 64px', color: 'var(--text-primary)' }}>
      <header style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', borderRadius: 999, padding: '6px 11px', color: 'var(--text-secondary)', fontSize: 12, marginBottom: 13 }}>
          <Wallet size={14} /> FREE PERSONAL FINANCE TOOL
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', lineHeight: 1.08, letterSpacing: '-0.04em', fontWeight: 850, margin: '0 0 11px' }}>
          Monthly Budget Planner <span className="text-gradient">for India</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1.03rem)', lineHeight: 1.6, margin: 0, maxWidth: 580, marginInline: 'auto' }}>
          Give every rupee a purpose. Plan your spending, savings and goals in one place.
        </p>
      </header>

      <section style={{ ...cardStyle, padding: '16px', marginBottom: 12 }}>
        <label htmlFor="budget-income" style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>MONTHLY TAKE-HOME INCOME</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 23, fontWeight: 800, color: 'var(--text-muted)' }}>₹</span>
          <input id="budget-income" type="number" min="0" inputMode="decimal" value={income} onChange={e => setIncome(e.target.value)} style={{ width: '100%', minWidth: 0, boxSizing: 'border-box', fontSize: 26, fontWeight: 850, color: 'var(--text-primary)', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '11px 13px' }} />
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '7px 0 0' }}>Your income after tax and salary deductions</p>
      </section>

      <section style={{ ...cardStyle, padding: 17, marginBottom: 18, background: 'linear-gradient(145deg, var(--bg-surface) 0%, rgba(56, 189, 248, 0.07) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 12 }}><CircleDollarSign size={15} /> MONEY LEFT TO ASSIGN</div>
            <div style={{ fontSize: 'clamp(1.65rem, 5vw, 2.15rem)', fontWeight: 850, letterSpacing: '-0.035em', color: summary.remaining >= 0 ? '#34d399' : '#fb7185', marginTop: 6 }}>{money(Math.abs(summary.remaining))}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 3 }}>{summary.remaining >= 0 ? 'Available for goals or a buffer' : 'You are over your income plan'}</div>
          </div>
          <div style={{ width: 54, height: 54, borderRadius: 16, display: 'grid', placeItems: 'center', flexShrink: 0, background: summary.remaining >= 0 ? 'rgba(52, 211, 153, .12)' : 'rgba(251, 113, 133, .12)', color: summary.remaining >= 0 ? '#34d399' : '#fb7185' }}>
            <TrendingUp size={25} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginTop: 17, fontSize: 12 }}>
          <span style={{ color: 'var(--text-secondary)' }}>Planned: <strong style={{ color: 'var(--text-primary)' }}>{money(summary.planned)}</strong></span>
          <strong style={{ color: 'var(--text-primary)' }}>{summary.monthlyIncome > 0 ? summary.budgetUsed.toFixed(0) : '0'}% allocated</strong>
        </div>
        <div style={{ height: 7, background: 'var(--bg-canvas)', borderRadius: 999, overflow: 'hidden', marginTop: 8 }}>
          <div style={{ width: Math.min(100, Math.max(0, summary.budgetUsed)) + '%', height: '100%', background: summary.remaining < 0 ? '#fb7185' : 'linear-gradient(90deg, #38bdf8, #6366f1)', borderRadius: 999, transition: 'width .2s ease' }} />
        </div>
        <button type="button" onClick={() => setShowBreakdown(v => !v)} aria-expanded={showBreakdown} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 12, padding: '7px 0 0', background: 'transparent', border: 0, color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer' }}>
          <span>See budget breakdown</span><ChevronDown size={16} style={{ transform: showBreakdown ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
        </button>
        {showBreakdown && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8, marginTop: 12 }}>
          {groups.map(group => <div key={group.key} style={{ minWidth: 0, padding: 10, borderRadius: 12, background: 'var(--bg-canvas)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{group.title}</div>
            <strong style={{ fontSize: 13, color: group.color, overflowWrap: 'anywhere' }}>{money(group.total)}</strong>
          </div>)}
        </div>}
      </section>

      <section style={{ ...cardStyle, padding: '17px clamp(13px, 3vw, 22px)', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 4 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 820 }}>Your monthly plan</h2>
            <p style={{ margin: '5px 0 0', color: 'var(--text-secondary)', fontSize: 12 }}>Tap a category to edit amounts.</p>
          </div>
          <button onClick={reset} type="button" aria-label="Reset budget" style={{ display: 'inline-flex', gap: 6, alignItems: 'center', background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', padding: '8px 10px', borderRadius: 10, cursor: 'pointer', fontSize: 12, flexShrink: 0 }}><RotateCcw size={14} /> Reset</button>
        </div>

        {groups.map(group => {
          const open = !!openGroups[group.key];
          const share = summary.monthlyIncome > 0 ? group.total / summary.monthlyIncome * 100 : 0;
          const items = expenses.filter(item => item.group === group.key);
          return <div key={group.key} style={{ marginTop: 14, border: '1px solid var(--border-subtle)', borderRadius: 14, overflow: 'hidden' }}>
            <button type="button" onClick={() => setOpenGroups(current => ({ ...current, [group.key]: !current[group.key] }))} aria-expanded={open} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '13px 12px', textAlign: 'left', background: 'var(--bg-canvas)', border: 0, cursor: 'pointer', color: 'var(--text-primary)' }}>
              <span style={{ width: 9, height: 34, borderRadius: 999, background: group.color, flexShrink: 0 }} />
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontWeight: 800, fontSize: 14 }}>{group.title}</span>
                <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: 11, marginTop: 2 }}>{share.toFixed(0)}% of income · guide {Math.round(group.target * 100)}%</span>
              </span>
              <span style={{ textAlign: 'right', flexShrink: 0 }}>
                <strong style={{ display: 'block', fontSize: 14 }}>{money(group.total)}</strong>
                <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 10 }}>target {money(group.targetAmount)}</span>
              </span>
              <ChevronDown size={16} style={{ flexShrink: 0, color: 'var(--text-muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
            </button>
            <div style={{ height: 3, background: 'var(--bg-canvas)' }}>
              <div style={{ width: Math.min(100, Math.max(0, share)) + '%', height: '100%', background: group.color, transition: 'width .2s ease' }} />
            </div>
            {open && <div style={{ padding: '10px 12px 13px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 10 }}>
              {items.map(item => <label key={item.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(108px, 42%)', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--text-secondary)' }}>
                <span style={{ lineHeight: 1.35 }}>{item.label}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, minWidth: 0, background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: 9, padding: '0 9px' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>₹</span>
                  <input aria-label={item.label + ' monthly amount'} type="number" min="0" inputMode="decimal" value={item.amount} onChange={e => updateExpense(item.id, e.target.value)} style={{ width: '100%', minWidth: 0, boxSizing: 'border-box', padding: '10px 0', border: 0, outline: 0, background: 'transparent', color: 'var(--text-primary)', fontSize: 14, fontWeight: 650 }} />
                </span>
              </label>)}
            </div>}
          </div>;
        })}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))', gap: 9, marginTop: 17 }}>
          <button onClick={exportCsv} type="button" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: 8, padding: '12px 14px', borderRadius: 11, border: 0, background: 'var(--primary-btn)', color: '#fff', fontWeight: 750, cursor: 'pointer' }}><Download size={16} /> Export budget CSV</button>
          {onNavigate && <button onClick={() => onNavigate('download')} type="button" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: 8, padding: '12px 14px', borderRadius: 11, border: '1px solid var(--border-subtle)', background: 'var(--bg-canvas)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>Explore the app <ArrowRight size={15} /></button>}
        </div>
      </section>

      <section style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
        <h2 style={{ margin: '0 0 5px', fontSize: 17 }}>Your 50/30/20 guide</h2>
        <p style={{ margin: '0 0 12px', color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.55 }}>A flexible starting point—not a rule. Adjust for your rent, family commitments and goals.</p>
        {groups.map(group => <div key={group.key} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: 10, alignItems: 'center', padding: '9px 0', borderTop: '1px solid var(--border-subtle)', fontSize: 13 }}>
          <span style={{ color: 'var(--text-secondary)' }}>{group.title} <span style={{ color: group.color }}>· {Math.round(group.target * 100)}%</span></span>
          <strong>{money(group.targetAmount)}</strong>
        </div>)}
      </section>

      <section style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
        <h2 style={{ margin: '0 0 7px', fontSize: 17 }}>Understand your result</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.65, margin: 0 }}>{summary.monthlyIncome <= 0 ? 'Enter your monthly take-home income to see the budget breakdown.' : summary.remaining < 0 ? 'Your plan is over income. Review flexible spending and adjust estimates to fit your current situation.' : summary.remaining === 0 ? 'Your income is fully allocated. Consider whether you need a small buffer for irregular costs.' : 'Your plan leaves ' + money(summary.remaining) + ' unallocated. Consider assigning some to emergency savings, upcoming bills, or a goal.'}</p>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 13, color: 'var(--text-secondary)', fontSize: 11, lineHeight: 1.55 }}><ShieldCheck size={16} style={{ flexShrink: 0, color: '#34d399' }} />Your entries stay in this browser and are not sent to a server or saved automatically.</div>
      </section>

      <section style={{ ...cardStyle, padding: 16 }}>
        <button type="button" onClick={() => setShowGuide(value => !value)} aria-expanded={showGuide} style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'transparent', border: 0, padding: 0, color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left' }}>
          <span style={{ fontWeight: 800, fontSize: 16 }}>How to build a monthly budget</span><ChevronDown size={17} style={{ transform: showGuide ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
        </button>
        {showGuide && <div style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.75, marginTop: 12 }}>
          <ol style={{ paddingLeft: 19 }}>
            <li>Enter take-home income after deductions.</li>
            <li>Estimate essential costs like housing, groceries, transport, utilities and healthcare.</li>
            <li>Add flexible spending, subscriptions, savings and investments.</li>
            <li>Compare your plan with income and adjust until it feels realistic.</li>
          </ol>
          <p>For irregular costs such as annual insurance, repairs or festivals, divide the expected amount by 12 to estimate a monthly budget.</p>
        </div>}
      </section>

      <section style={{ maxWidth: 720, margin: '26px auto 0', textAlign: 'center', padding: '0 8px' }}>
        <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', margin: '0 0 8px' }}>Plan your budget. Track your real expenses.</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: 13, margin: '0 0 15px' }}>A budget is a plan; tracking helps compare it with what you actually spend. Pocket Advisor helps organize supported bank and UPI alert transactions on Android.</p>
        {onNavigate && <button type="button" onClick={() => onNavigate('download')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 12, border: 0, background: 'var(--primary-btn)', color: '#fff', fontWeight: 750, cursor: 'pointer' }}>Explore Pocket Advisor <ArrowRight size={16} /></button>}
      </section>
    </div>
  );
};
