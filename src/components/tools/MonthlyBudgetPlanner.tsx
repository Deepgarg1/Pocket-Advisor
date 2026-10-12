import React, { useMemo, useState } from 'react';
import { ArrowRight, Download, RotateCcw, ShieldCheck, Wallet } from 'lucide-react';

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

export const MonthlyBudgetPlanner: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const [income, setIncome] = useState('45000');
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [showGuide, setShowGuide] = useState(true);

  const summary = useMemo(() => {
    const needs = expenses.filter(e => e.group === 'needs').reduce((sum, e) => sum + numberValue(e.amount), 0);
    const wants = expenses.filter(e => e.group === 'wants').reduce((sum, e) => sum + numberValue(e.amount), 0);
    const savings = expenses.filter(e => e.group === 'savings').reduce((sum, e) => sum + numberValue(e.amount), 0);
    const monthlyIncome = numberValue(income);
    const planned = needs + wants + savings;
    return {
      needs, wants, savings, monthlyIncome, planned,
      remaining: monthlyIncome - planned,
      needsTarget: monthlyIncome * 0.5,
      wantsTarget: monthlyIncome * 0.3,
      savingsTarget: monthlyIncome * 0.2,
      savingsRate: monthlyIncome > 0 ? savings / monthlyIncome * 100 : 0,
      budgetUsed: monthlyIncome > 0 ? planned / monthlyIncome * 100 : 0,
    };
  }, [income, expenses]);

  const updateExpense = (id: string, amount: string) =>
    setExpenses(current => current.map(item => item.id === id ? { ...item, amount } : item));

  const reset = () => { setIncome('45000'); setExpenses(initialExpenses); };

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
    { key: 'needs' as const, title: 'Needs', subtitle: 'Essentials and commitments', target: summary.needsTarget, total: summary.needs, color: '#38bdf8' },
    { key: 'wants' as const, title: 'Wants', subtitle: 'Lifestyle and flexible spending', target: summary.wantsTarget, total: summary.wants, color: '#a78bfa' },
    { key: 'savings' as const, title: 'Savings & investing', subtitle: 'Goals, emergency fund, investments', target: summary.savingsTarget, total: summary.savings, color: '#34d399' },
  ];

  return (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '36px 20px 72px', color: 'var(--text-primary)' }}>
      <header style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 34px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', borderRadius: 999, padding: '7px 13px', color: 'var(--text-secondary)', fontSize: 13, marginBottom: 16 }}>
          <Wallet size={16} /> Free personal finance tool
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.3rem)', lineHeight: 1.1, letterSpacing: '-0.035em', fontWeight: 850, margin: '0 0 16px' }}>
          Monthly Budget Planner <span className="text-gradient">for India</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.7, margin: 0 }}>
          Plan your monthly income, organize expenses, and see how much you can save. Adjust the numbers to build a budget that fits your life.
        </p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 14, marginBottom: 22 }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: 20 }}>
          <label htmlFor="budget-income" style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>Monthly take-home income (₹)</label>
          <input id="budget-income" type="number" min="0" inputMode="decimal" value={income} onChange={e => setIncome(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', fontSize: 25, fontWeight: 800, color: 'var(--text-primary)', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '12px 13px' }} />
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '9px 0 0' }}>Use income after salary deductions.</p>
        </div>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: 20 }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Planned monthly expenses</div>
          <div style={{ fontSize: 27, fontWeight: 800, marginTop: 9 }}>{money(summary.planned)}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>{summary.monthlyIncome > 0 ? summary.budgetUsed.toFixed(0) + '% of income allocated' : 'Enter income to calculate allocation'}</div>
        </div>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: 20 }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{summary.remaining >= 0 ? 'Money left after plan' : 'Amount over budget'}</div>
          <div style={{ fontSize: 27, fontWeight: 800, marginTop: 9, color: summary.remaining >= 0 ? '#34d399' : '#fb7185' }}>{money(Math.abs(summary.remaining))}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>{summary.remaining >= 0 ? 'Assign this to a goal or keep as a buffer.' : 'Reduce planned expenses or revisit your estimates.'}</div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 20, padding: 'clamp(18px, 3vw, 28px)', marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Your monthly plan</h2>
            <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)', fontSize: 14 }}>Edit any amount. The totals update instantly.</p>
          </div>
          <button onClick={reset} type="button" style={{ display: 'inline-flex', gap: 8, alignItems: 'center', background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', padding: '9px 12px', borderRadius: 10, cursor: 'pointer' }}><RotateCcw size={15} /> Reset</button>
        </div>

        {groups.map(group => (
          <div key={group.key} style={{ marginTop: 22 }}>
            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
              <div><h3 style={{ margin: 0, fontSize: 17 }}>{group.title}</h3><p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: 13 }}>{group.subtitle}</p></div>
              <div style={{ textAlign: 'right' }}><strong>{money(group.total)}</strong><div style={{ color: 'var(--text-muted)', fontSize: 12 }}>50/30/20 guide: {money(group.target)}</div></div>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: 'var(--bg-canvas)', overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ width: summary.monthlyIncome > 0 ? Math.min(100, group.total / summary.monthlyIncome * 100) + '%' : '0%', height: '100%', background: group.color, borderRadius: 999, transition: 'width .2s ease' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 10 }}>
              {expenses.filter(item => item.group === group.key).map(item => (
                <label key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13, color: 'var(--text-secondary)' }}>
                  {item.label}
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: '0 12px', gap: 8 }}>
                    <span>₹</span>
                    <input aria-label={item.label + ' monthly amount'} type="number" min="0" inputMode="decimal" value={item.amount} onChange={e => updateExpense(item.id, e.target.value)} style={{ width: '100%', minWidth: 0, padding: '11px 0', border: 0, outline: 0, background: 'transparent', color: 'var(--text-primary)', fontSize: 15 }} />
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 26 }}>
          <button onClick={exportCsv} type="button" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '12px 16px', borderRadius: 12, border: 0, background: 'var(--primary-btn)', color: '#fff', fontWeight: 750, cursor: 'pointer' }}><Download size={17} /> Export budget CSV</button>
          {onNavigate && <button onClick={() => onNavigate('download')} type="button" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '12px 16px', borderRadius: 12, border: '1px solid var(--border-subtle)', background: 'var(--bg-canvas)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>Explore Pocket Advisor app <ArrowRight size={16} /></button>}
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 18, padding: 20, background: 'var(--bg-surface)' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 19 }}>A simple 50/30/20 budget guide</h2>
          <p style={{ margin: '0 0 14px', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>A common starting point is 50% for needs, 30% for wants, and 20% for savings and debt goals. It is a guideline, not a rule—adjust it for rent, family commitments, debt, and income.</p>
          {groups.map(group => <div key={group.key} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '9px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: 14 }}><span>{group.title}</span><strong>{money(group.target)}</strong></div>)}
        </div>
        <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 18, padding: 20, background: 'var(--bg-surface)' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 19 }}>Understand your result</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{summary.monthlyIncome <= 0 ? 'Enter your monthly take-home income to see the budget breakdown.' : summary.remaining < 0 ? 'Your plan is over income. Start with fixed essentials, then reduce flexible spending or adjust savings targets to fit your current situation.' : summary.remaining === 0 ? 'Your income is fully allocated. Consider whether you need a small buffer for irregular costs.' : 'Your plan leaves ' + money(summary.remaining) + ' unallocated. Consider assigning part of it to emergency savings, upcoming bills, or a specific goal.'}</p>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginTop: 18, color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}><ShieldCheck size={18} style={{ flexShrink: 0, color: '#34d399' }} />This planner runs in your browser. Your entries are not sent to a server or saved automatically.</div>
        </div>
      </section>

      <section style={{ border: '1px solid var(--border-subtle)', borderRadius: 18, padding: 20, background: 'var(--bg-surface)', marginBottom: 24 }}>
        <button type="button" onClick={() => setShowGuide(value => !value)} aria-expanded={showGuide} style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'transparent', border: 0, padding: 0, color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left' }}>
          <span style={{ fontWeight: 800, fontSize: 19 }}>How to build a monthly budget</span><span aria-hidden="true">{showGuide ? '−' : '+'}</span>
        </button>
        {showGuide && <div style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, marginTop: 14 }}>
          <ol style={{ paddingLeft: 20 }}>
            <li>Enter your take-home income after deductions.</li>
            <li>Estimate essential costs such as housing, groceries, transport, utilities, and healthcare.</li>
            <li>Add flexible spending such as eating out, entertainment, shopping, and subscriptions.</li>
            <li>Include savings, investments, and extra debt repayments if they fit your circumstances.</li>
            <li>Compare the plan with your income and revise estimates until the budget is realistic.</li>
          </ol>
          <p>Use actual statements or transaction history where possible. Irregular costs—such as annual insurance, repairs, and festivals—can be divided by 12 to estimate a monthly amount.</p>
        </div>}
      </section>

      <section style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 25, margin: '0 0 10px' }}>Plan your budget. Track your real expenses.</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 18px' }}>A budget is a plan; tracking helps you compare it with what you actually spend. Pocket Advisor helps you organize supported bank and UPI alert transactions on Android, with privacy-focused storage options.</p>
        {onNavigate && <button type="button" onClick={() => onNavigate('download')} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '12px 17px', borderRadius: 12, border: 0, background: 'var(--primary-btn)', color: '#fff', fontWeight: 750, cursor: 'pointer' }}>Explore Pocket Advisor <ArrowRight size={16} /></button>}
      </section>
    </div>
  );
};
