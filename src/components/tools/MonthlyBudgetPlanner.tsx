import React, { useMemo, useState } from 'react';
import './MonthlyBudgetPlanner.css';
import {
  ArrowRight,
  ChevronDown,
  Download,
  RotateCcw,
  ShieldCheck,
  Wallet,
  TrendingUp,
  CircleDollarSign,
  Plus,
  Trash2,
  AlertCircle,
  PiggyBank,
  Sparkles,
  Share2,
  Check,
} from 'lucide-react';
import { RelatedToolsNav } from './CalculatorGuides';

export type ExpenseGroup = 'needs' | 'wants' | 'savings';

export interface Expense {
  id: string;
  label: string;
  amount: string;
  group: ExpenseGroup;
}

const INITIAL_EXPENSES: Expense[] = [
  { id: 'rent', label: 'Rent / Home Loan EMI', amount: '12000', group: 'needs' },
  { id: 'groceries', label: 'Groceries & Household', amount: '5000', group: 'needs' },
  { id: 'utilities', label: 'Electricity, Water & WiFi', amount: '2200', group: 'needs' },
  { id: 'transport', label: 'Fuel / Metro / Commute', amount: '2500', group: 'needs' },
  { id: 'insurance', label: 'Health & Term Insurance', amount: '1800', group: 'needs' },
  { id: 'dining', label: 'Dining Out & Food Delivery', amount: '3000', group: 'wants' },
  { id: 'shopping', label: 'Shopping, OTT & Gadgets', amount: '2000', group: 'wants' },
  { id: 'sip', label: 'Mutual Fund SIP & Stocks', amount: '5000', group: 'savings' },
  { id: 'emergency', label: 'Emergency Fund Savings', amount: '3000', group: 'savings' },
];

const SALARY_PRESETS = [
  { label: '₹30k', value: '30000' },
  { label: '₹50k', value: '50000' },
  { label: '₹75k', value: '75000' },
  { label: '₹1 Lakh', value: '100000' },
  { label: '₹1.5 Lakh', value: '150000' },
  { label: '₹2 Lakh', value: '200000' },
];

const money = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(value));

const numberValue = (value: string) => Math.max(0, Number(value) || 0);

const GROUP_CONFIG = {
  needs: {
    title: 'Needs (50%)',
    subtitle: 'Housing, food, utilities, EMIs & healthcare',
    colorVar: 'var(--planner-needs)',
    targetRatio: 0.5,
  },
  wants: {
    title: 'Wants (30%)',
    subtitle: 'Dining, lifestyle, entertainment & vacations',
    colorVar: 'var(--planner-wants)',
    targetRatio: 0.3,
  },
  savings: {
    title: 'Savings & Investing (20%)',
    subtitle: 'SIPs, emergency reserves & wealth compounding',
    colorVar: 'var(--planner-savings)',
    targetRatio: 0.2,
  },
};

export const MonthlyBudgetPlanner: React.FC<{ onNavigate?: (view: string) => void }> = ({
  onNavigate,
}) => {
  const [income, setIncome] = useState('50000');
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [openGroups, setOpenGroups] = useState<Record<ExpenseGroup, boolean>>({
    needs: true,
    wants: true,
    savings: true,
  });
  const [newLabels, setNewLabels] = useState<Record<ExpenseGroup, string>>({
    needs: '',
    wants: '',
    savings: '',
  });
  const [newAmounts, setNewAmounts] = useState<Record<ExpenseGroup, string>>({
    needs: '',
    wants: '',
    savings: '',
  });
  const [showAddForm, setShowAddForm] = useState<Record<ExpenseGroup, boolean>>({
    needs: false,
    wants: false,
    savings: false,
  });
  const [showGuide, setShowGuide] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const summary = useMemo(() => {
    const needs = expenses
      .filter((e) => e.group === 'needs')
      .reduce((sum, e) => sum + numberValue(e.amount), 0);
    const wants = expenses
      .filter((e) => e.group === 'wants')
      .reduce((sum, e) => sum + numberValue(e.amount), 0);
    const savings = expenses
      .filter((e) => e.group === 'savings')
      .reduce((sum, e) => sum + numberValue(e.amount), 0);

    const monthlyIncome = numberValue(income);
    const planned = needs + wants + savings;
    const remaining = monthlyIncome - planned;

    const needsTarget = monthlyIncome * 0.5;
    const wantsTarget = monthlyIncome * 0.3;
    const savingsTarget = monthlyIncome * 0.2;

    const needsPct = monthlyIncome > 0 ? (needs / monthlyIncome) * 100 : 0;
    const wantsPct = monthlyIncome > 0 ? (wants / monthlyIncome) * 100 : 0;
    const savingsPct = monthlyIncome > 0 ? (savings / monthlyIncome) * 100 : 0;
    const budgetUsedPct = monthlyIncome > 0 ? (planned / monthlyIncome) * 100 : 0;

    // Emergency fund calculations (3-month and 6-month needs)
    const emergency3Months = needs * 3;
    const emergency6Months = needs * 6;
    const monthsToFund3 = savings > 0 ? Math.ceil(emergency3Months / savings) : null;
    const monthsToFund6 = savings > 0 ? Math.ceil(emergency6Months / savings) : null;

    return {
      needs,
      wants,
      savings,
      monthlyIncome,
      planned,
      remaining,
      needsTarget,
      wantsTarget,
      savingsTarget,
      needsPct,
      wantsPct,
      savingsPct,
      budgetUsedPct,
      emergency3Months,
      emergency6Months,
      monthsToFund3,
      monthsToFund6,
    };
  }, [income, expenses]);

  const updateExpense = (id: string, amount: string) => {
    setExpenses((current) =>
      current.map((item) => (item.id === id ? { ...item, amount } : item))
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses((current) => current.filter((item) => item.id !== id));
  };

  const addExpense = (group: ExpenseGroup) => {
    const label = newLabels[group].trim();
    const amount = newAmounts[group].trim();
    if (!label) return;

    const newItem: Expense = {
      id: `custom-${Date.now()}`,
      label,
      amount: amount || '0',
      group,
    };

    setExpenses((prev) => [...prev, newItem]);
    setNewLabels((prev) => ({ ...prev, [group]: '' }));
    setNewAmounts((prev) => ({ ...prev, [group]: '' }));
    setShowAddForm((prev) => ({ ...prev, [group]: false }));
  };

  const reset = () => {
    setIncome('50000');
    setExpenses(INITIAL_EXPENSES);
    setOpenGroups({ needs: true, wants: true, savings: true });
  };

  const exportCsv = () => {
    const rows = [
      ['Pocket Advisor — Monthly Budget Plan (50/30/20 Rule)'],
      ['Monthly Take-Home Income', summary.monthlyIncome.toString()],
      ['Category Name', 'Group', 'Monthly Amount (INR)', 'Target (50/30/20)'],
    ];

    expenses.forEach((item) => {
      rows.push([item.label, item.group, numberValue(item.amount).toString(), '']);
    });

    rows.push([]);
    rows.push(['Total Needs (Actual)', '', summary.needs.toString(), summary.needsTarget.toString()]);
    rows.push(['Total Wants (Actual)', '', summary.wants.toString(), summary.wantsTarget.toString()]);
    rows.push(['Total Savings (Actual)', '', summary.savings.toString(), summary.savingsTarget.toString()]);
    rows.push(['Total Planned Outflow', '', summary.planned.toString(), summary.monthlyIncome.toString()]);
    rows.push(['Remaining / Unallocated', '', summary.remaining.toString(), '0']);

    const csv = rows
      .map((row) => row.map((cell) => '"' + (cell || '').replace(/"/g, '""') + '"').join(','))
      .join('\r\n');

    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `monthly-budget-plan-${summary.monthlyIncome}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareSummary = async () => {
    const text = `📊 Pocket Advisor 50/30/20 Budget Breakdown:\n• Income: ${money(summary.monthlyIncome)}\n• Needs (50%): ${money(summary.needs)} (${summary.needsPct.toFixed(0)}%)\n• Wants (30%): ${money(summary.wants)} (${summary.wantsPct.toFixed(0)}%)\n• Savings (20%): ${money(summary.savings)} (${summary.savingsPct.toFixed(0)}%)\n• Remaining: ${money(summary.remaining)}\n\nPlan your budget free at https://www.pocketadvisor.in/monthly-budget-planner`;

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const groups: Array<{
    key: ExpenseGroup;
    title: string;
    subtitle: string;
    colorVar: string;
    targetRatio: number;
    total: number;
    targetAmount: number;
    pct: number;
  }> = [
    {
      key: 'needs',
      ...GROUP_CONFIG.needs,
      total: summary.needs,
      targetAmount: summary.needsTarget,
      pct: summary.needsPct,
    },
    {
      key: 'wants',
      ...GROUP_CONFIG.wants,
      total: summary.wants,
      targetAmount: summary.wantsTarget,
      pct: summary.wantsPct,
    },
    {
      key: 'savings',
      ...GROUP_CONFIG.savings,
      total: summary.savings,
      targetAmount: summary.savingsTarget,
      pct: summary.savingsPct,
    },
  ];

  return (
    <div className="budget-planner-container">
      {/* Header */}
      <header className="budget-planner-header">
        <div className="budget-planner-badge">
          <Wallet size={14} /> PERSONAL BUDGET PLANNER • MONTHLY EXPENSES INDIA
        </div>
        <h1 className="budget-planner-title">
          Monthly Budget Planner <span className="text-gradient">for India Personal Expenses</span>
        </h1>
        <p className="budget-planner-subtitle">
          Free personal budget planner for monthly expenses in India. Structure your take-home salary with the proven 50/30/20 rule, balance needs vs wants, and export your budget to CSV.
        </p>
      </header>

      {/* 2-Column Responsive Layout */}
      <div className="budget-planner-layout">
        {/* Left Column: Inputs & Categories */}
        <div className="budget-left-col">
          {/* Income Card */}
          <section className="budget-card budget-income-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <label
                htmlFor="budget-income"
                style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.04em' }}
              >
                MONTHLY TAKE-HOME INCOME
              </label>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Net after PF &amp; Tax</span>
            </div>

            <div
              className="expense-input-wrapper"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                borderRadius: 14,
                padding: '4px 16px',
              }}
            >
              <span style={{ fontSize: 26, fontWeight: 850, color: 'var(--primary)' }}>₹</span>
              <input
                id="budget-income"
                type="number"
                min="0"
                inputMode="decimal"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                style={{
                  width: '100%',
                  fontSize: 26,
                  fontWeight: 850,
                  color: 'var(--text-primary)',
                  background: 'transparent',
                  border: 0,
                  outline: 0,
                  padding: '12px 0',
                }}
                placeholder="50000"
              />
            </div>

            {/* Quick Presets */}
            <div className="income-presets">
              {SALARY_PRESETS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setIncome(p.value)}
                  className={`income-preset-btn ${income === p.value ? 'active' : ''}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </section>

          {/* Expense Categories Card */}
          <section className="budget-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 850 }}>Expense Allocation</h2>
                <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Adjust line items or add custom expenses to each bucket.
                </p>
              </div>

              <button
                type="button"
                onClick={reset}
                aria-label="Reset budget to defaults"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'transparent',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  padding: '6px 12px',
                  borderRadius: 10,
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                }}
              >
                <RotateCcw size={13} /> Reset
              </button>
            </div>

            {/* Category Groups */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {groups.map((group) => {
                const isOpen = openGroups[group.key];
                const items = expenses.filter((e) => e.group === group.key);
                const isOver = group.total > group.targetAmount && group.targetAmount > 0;

                return (
                  <div
                    key={group.key}
                    className={`budget-group-card group-${group.key}`}
                  >
                    {/* Group Header Toggle */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenGroups((prev) => ({ ...prev, [group.key]: !prev[group.key] }))
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '14px 16px',
                        background: 'transparent',
                        border: 0,
                        cursor: 'pointer',
                        textAlign: 'left',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                        <span
                          style={{
                            width: 10,
                            height: 38,
                            borderRadius: 999,
                            background: group.colorVar,
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontWeight: 800, fontSize: '0.98rem' }}>{group.title}</span>
                            <span
                              style={{
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                padding: '2px 7px',
                                borderRadius: 6,
                                background: isOver ? 'rgba(251, 113, 133, 0.15)' : 'rgba(52, 211, 153, 0.15)',
                                color: isOver ? '#fb7185' : 'var(--income)',
                              }}
                            >
                              {group.pct.toFixed(0)}% (Target {Math.round(group.targetRatio * 100)}%)
                            </span>
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                            {group.subtitle}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ display: 'block', fontWeight: 850, fontSize: '1rem', color: group.colorVar }}>
                            {money(group.total)}
                          </span>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            Target {money(group.targetAmount)}
                          </span>
                        </div>
                        <ChevronDown
                          size={18}
                          style={{
                            color: 'var(--text-muted)',
                            transform: isOpen ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.2s ease',
                          }}
                        />
                      </div>
                    </button>

                    {/* Progress Bar for Group */}
                    <div style={{ height: 3, background: 'rgba(0, 0, 0, 0.05)' }}>
                      <div
                        style={{
                          width: `${Math.min(100, Math.max(0, group.pct))}%`,
                          height: '100%',
                          background: isOver ? '#fb7185' : group.colorVar,
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>

                    {/* Items List */}
                    {isOpen && (
                      <div style={{ padding: '12px 14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {items.map((item) => (
                          <div key={item.id} className="expense-item-row">
                            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                              {item.label}
                            </span>

                            <div className="expense-input-wrapper">
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>₹</span>
                              <input
                                aria-label={`${item.label} monthly amount`}
                                type="number"
                                min="0"
                                inputMode="decimal"
                                value={item.amount}
                                onChange={(e) => updateExpense(item.id, e.target.value)}
                                className="expense-input-field"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() => deleteExpense(item.id)}
                              aria-label={`Delete ${item.label}`}
                              className="expense-delete-btn"
                              title="Delete item"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        ))}

                        {/* Inline Add Expense Item */}
                        {showAddForm[group.key] ? (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              marginTop: 6,
                              padding: '8px 10px',
                              background: 'var(--bg-canvas)',
                              borderRadius: 12,
                              border: '1px dashed var(--border-subtle)',
                            }}
                          >
                            <input
                              type="text"
                              placeholder="e.g. Gym membership"
                              value={newLabels[group.key]}
                              onChange={(e) =>
                                setNewLabels((prev) => ({ ...prev, [group.key]: e.target.value }))
                              }
                              style={{
                                flex: 1,
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: 8,
                                padding: '6px 10px',
                                color: 'var(--text-primary)',
                                fontSize: '0.85rem',
                                outline: 0,
                              }}
                            />
                            <div className="expense-input-wrapper" style={{ width: '110px' }}>
                              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>₹</span>
                              <input
                                type="number"
                                placeholder="Amount"
                                value={newAmounts[group.key]}
                                onChange={(e) =>
                                  setNewAmounts((prev) => ({ ...prev, [group.key]: e.target.value }))
                                }
                                className="expense-input-field"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => addExpense(group.key)}
                              style={{
                                padding: '6px 12px',
                                background: 'var(--primary-btn)',
                                color: '#fff',
                                border: 0,
                                borderRadius: 8,
                                fontWeight: 700,
                                fontSize: '0.82rem',
                                cursor: 'pointer',
                              }}
                            >
                              Add
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setShowAddForm((prev) => ({ ...prev, [group.key]: false }))
                              }
                              style={{
                                padding: '6px 10px',
                                background: 'transparent',
                                color: 'var(--text-muted)',
                                border: 0,
                                fontSize: '0.82rem',
                                cursor: 'pointer',
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setShowAddForm((prev) => ({ ...prev, [group.key]: true }))
                            }
                            className="add-expense-btn"
                          >
                            <Plus size={14} /> Add custom {group.title.split(' ')[0]} expense
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Real-Time Sticky Dashboard */}
        <div className="budget-right-col">
          {/* Real-Time Live Status Card */}
          <section className={`budget-card budget-status-card ${summary.remaining >= 0 ? 'status-surplus' : 'status-deficit'}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: 'var(--text-secondary)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}
                >
                  <CircleDollarSign size={16} color="var(--primary)" />
                  {summary.remaining >= 0 ? 'UNALLOCATED SURPLUS' : 'BUDGET DEFICIT'}
                </div>
                <div
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.6rem)',
                    fontWeight: 850,
                    letterSpacing: '-0.04em',
                    color: summary.remaining >= 0 ? 'var(--planner-surplus-text)' : 'var(--planner-deficit-text)',
                    marginTop: 6,
                    lineHeight: 1,
                  }}
                >
                  {money(Math.abs(summary.remaining))}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 6 }}>
                  {summary.remaining >= 0
                    ? 'Ready for extra investments or emergency cushion.'
                    : 'Your planned spending exceeds your monthly take-home.'}
                </div>
              </div>

              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  display: 'grid',
                  placeItems: 'center',
                  background: summary.remaining >= 0 ? 'var(--income-surface)' : 'var(--expense-surface)',
                  color: summary.remaining >= 0 ? 'var(--income)' : 'var(--expense)',
                  flexShrink: 0,
                }}
              >
                {summary.remaining >= 0 ? <TrendingUp size={24} /> : <AlertCircle size={24} />}
              </div>
            </div>

            {/* Multi-Segment Allocation Bar */}
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Total Planned: <strong style={{ color: 'var(--text-primary)' }}>{money(summary.planned)}</strong>
                </span>
                <strong style={{ color: summary.budgetUsedPct > 100 ? 'var(--expense)' : 'var(--text-primary)' }}>
                  {summary.budgetUsedPct.toFixed(0)}% Allocated
                </strong>
              </div>

              <div className="multi-segment-bar">
                <div
                  className="segment-fill"
                  style={{
                    width: `${Math.min(100, summary.needsPct)}%`,
                    background: 'var(--planner-needs)',
                  }}
                  title={`Needs: ${summary.needsPct.toFixed(0)}%`}
                />
                <div
                  className="segment-fill"
                  style={{
                    width: `${Math.min(100 - summary.needsPct, summary.wantsPct)}%`,
                    background: 'var(--planner-wants)',
                  }}
                  title={`Wants: ${summary.wantsPct.toFixed(0)}%`}
                />
                <div
                  className="segment-fill"
                  style={{
                    width: `${Math.min(100 - summary.needsPct - summary.wantsPct, summary.savingsPct)}%`,
                    background: 'var(--planner-savings)',
                  }}
                  title={`Savings: ${summary.savingsPct.toFixed(0)}%`}
                />
                {summary.remaining < 0 && (
                  <div
                    className="segment-fill"
                    style={{
                      width: `${Math.min(100, Math.abs(summary.remaining) / summary.monthlyIncome * 100)}%`,
                      background: 'var(--expense)',
                    }}
                    title="Deficit"
                  />
                )}
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--planner-needs)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Needs ({summary.needsPct.toFixed(0)}%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--planner-wants)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Wants ({summary.wantsPct.toFixed(0)}%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--planner-savings)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Savings ({summary.savingsPct.toFixed(0)}%)</span>
                </div>
              </div>
            </div>
          </section>

          {/* 50/30/20 Target Comparison Card */}
          <section className="budget-card budget-comparison-card">
            <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', fontWeight: 800 }}>50/30/20 Benchmark Comparison</h3>
            <p style={{ margin: '0 0 14px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Compare how your spending aligns with recommended personal finance standards:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {groups.map((group) => {
                const diff = group.total - group.targetAmount;
                const status =
                  diff > 0
                    ? group.key === 'savings'
                      ? 'Supercharged! 🎉'
                      : `Over by ${money(diff)}`
                    : diff === 0
                    ? 'Perfect Fit'
                    : `Under by ${money(Math.abs(diff))}`;

                const isGood = group.key === 'savings' ? diff >= 0 : diff <= 0;
                const badgeBg = isGood ? 'var(--income-surface)' : 'var(--expense-surface)';
                const badgeColor = isGood ? 'var(--income)' : 'var(--expense)';

                return (
                  <div
                    key={group.key}
                    className={`benchmark-row row-${group.key}`}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{group.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        Target: {money(group.targetAmount)}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: group.colorVar }}>
                        {money(group.total)}
                      </div>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '2px 7px',
                          borderRadius: 6,
                          background: badgeBg,
                          color: badgeColor,
                          marginTop: 3,
                        }}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Emergency Fund & Smart Insights Card */}
          <section className="budget-card budget-emergency-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <PiggyBank size={18} color="var(--income)" />
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Emergency Fund Readiness</h3>
            </div>

            <p style={{ margin: '0 0 12px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Financial experts recommend holding 3 to 6 months of essential living expenses (Needs) in a high-interest savings account or liquid fund.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              <div className="metric-box">
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>3-Month Safety Net</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 850, color: 'var(--text-primary)', marginTop: 3 }}>
                  {money(summary.emergency3Months)}
                </div>
                {summary.monthsToFund3 && (
                  <div style={{ fontSize: '0.72rem', color: 'var(--income)', marginTop: 2, fontWeight: 700 }}>
                    Achievable in ~{summary.monthsToFund3} mos
                  </div>
                )}
              </div>

              <div className="metric-box">
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>6-Month Full Runway</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 850, color: 'var(--text-primary)', marginTop: 3 }}>
                  {money(summary.emergency6Months)}
                </div>
                {summary.monthsToFund6 && (
                  <div style={{ fontSize: '0.72rem', color: 'var(--primary)', marginTop: 2, fontWeight: 700 }}>
                    Achievable in ~{summary.monthsToFund6} mos
                  </div>
                )}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                padding: '8px 10px',
                background: 'var(--income-surface)',
                border: '1px solid rgba(5, 150, 105, 0.25)',
                borderRadius: 10,
                fontSize: '0.76rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.45,
              }}
            >
              <ShieldCheck size={16} color="var(--income)" style={{ flexShrink: 0, marginTop: 1 }} />
              <span>Private and local. All calculations happen in your browser with zero server uploads of your financial data.</span>
            </div>
          </section>

          {/* Action Hub */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button
              type="button"
              onClick={exportCsv}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 14px',
                borderRadius: 12,
                border: 0,
                background: 'var(--primary-btn)',
                color: '#fff',
                fontWeight: 750,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
            >
              <Download size={16} /> Export CSV
            </button>

            <button
              type="button"
              onClick={shareSummary}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 14px',
                borderRadius: 12,
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {copiedShare ? (
                <>
                  <Check size={16} color="var(--income)" /> Copied!
                </>
              ) : (
                <>
                  <Share2 size={16} /> Share Plan
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Educational Accordion & CTA */}
      <div className="budget-bottom-sections">
        <section className="budget-card">
          <button
            type="button"
            onClick={() => setShowGuide((v) => !v)}
            aria-expanded={showGuide}
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              background: 'transparent',
              border: 0,
              padding: 0,
              color: 'var(--text-primary)',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Sparkles size={18} color="var(--primary)" />
              <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>How to optimize your monthly budget</span>
            </div>
            <ChevronDown
              size={18}
              style={{
                transform: showGuide ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s ease',
              }}
            />
          </button>

          {showGuide && (
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: 16 }}>
              <ol style={{ paddingLeft: 20, margin: '0 0 12px' }}>
                <li>
                  <strong>Enter realistic take-home income:</strong> Include salary after TDS, provident fund, and professional tax.
                </li>
                <li>
                  <strong>Cap needs at 50%:</strong> If your rent or EMI alone exceeds 35%, try to balance other fixed costs.
                </li>
                <li>
                  <strong>Be honest with flexible wants (30%):</strong> Weekend dining, Swiggy/Zomato, and subscriptions can silently inflate.
                </li>
                <li>
                  <strong>Automate savings first (20%):</strong> Schedule mutual fund SIP deductions on the 1st or 2nd of each month immediately after payday.
                </li>
              </ol>
              <p style={{ margin: 0 }}>
                💡 <em>Pro-tip:</em> For annual or irregular expenses like vehicle insurance, festival shopping, or medical checkups, divide the estimated cost by 12 and add it as an emergency reserve line item.
              </p>
            </div>
          )}
        </section>

        {/* CTA Card */}
        <section className="budget-card budget-cta-card" style={{ textAlign: 'center', padding: '36px 24px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.85rem)', fontWeight: 850, margin: '0 0 10px' }}>
            Plan your budget. Track your real UPI expenses automatically.
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              fontSize: '0.95rem',
              maxWidth: 640,
              margin: '0 auto 20px',
            }}
          >
            A monthly budget is your blueprint. Pocket Advisor helps you stick to it on Android by auto-detecting bank and UPI SMS transactions with zero manual typing and 100% on-device privacy.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('download')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 22px',
                  borderRadius: 14,
                  border: 0,
                  background: 'var(--primary-btn)',
                  color: '#fff',
                  fontWeight: 750,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(79, 70, 229, 0.4)',
                }}
              >
                Install Pocket Advisor on Android <ArrowRight size={16} />
              </button>
            )}

            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('split')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 20px',
                  borderRadius: 14,
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-canvas)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                }}
              >
                Try Free Bill Splitter
              </button>
            )}
          </div>
        </section>

        {/* Related Calculators & Tools Silo */}
        <RelatedToolsNav currentTool="budget" onNavigate={onNavigate} />
      </div>
    </div>
  );
};
