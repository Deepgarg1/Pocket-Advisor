export interface LoanInput {
  principal: number;
  annualInterestRate: number;
  tenureMonths: number;
}

export interface RepaymentRow {
  month: number;
  openingBalance: number;
  scheduledPayment: number;
  interest: number;
  principalPaid: number;
  closingBalance: number;
  cumulativeInterest: number;
}

export interface EmiSummary {
  monthlyEmi: number;
  totalPrincipal: number;
  totalInterest: number;
  totalPayment: number;
  actualPaymentCount: number;
}

export interface RepaymentResult {
  summary: EmiSummary;
  schedule: RepaymentRow[];
}

export function validateLoanInput(input: LoanInput): string | null {
  if (!Number.isFinite(input.principal) || input.principal <= 0) return 'Enter a loan amount greater than zero.';
  if (!Number.isFinite(input.annualInterestRate) || input.annualInterestRate < 0 || input.annualInterestRate > 100) return 'Interest rate must be between 0% and 100%.';
  if (!Number.isInteger(input.tenureMonths) || input.tenureMonths < 1 || input.tenureMonths > 600) return 'Tenure must be between 1 and 600 months.';
  if (input.principal > 1_000_000_000_000) return 'Loan amount exceeds the supported limit.';
  return null;
}

export function calculateMonthlyEmi(input: LoanInput): number {
  const error = validateLoanInput(input);
  if (error) return 0;
  const { principal, annualInterestRate, tenureMonths } = input;
  const monthlyRate = annualInterestRate / 1200;
  if (monthlyRate === 0) return principal / tenureMonths;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  return principal * monthlyRate * factor / (factor - 1);
}

/**
 * Builds a reducing-balance schedule. Calculations retain precision internally;
 * currency values are rounded to paise for each displayed ledger entry. The
 * final installment is capped at the outstanding balance plus that month's interest.
 */
export function calculateRepayment(input: LoanInput): RepaymentResult {
  const error = validateLoanInput(input);
  if (error) {
    return { summary: { monthlyEmi: 0, totalPrincipal: 0, totalInterest: 0, totalPayment: 0, actualPaymentCount: 0 }, schedule: [] };
  }

  const monthlyEmi = calculateMonthlyEmi(input);
  const monthlyRate = input.annualInterestRate / 1200;
  let balance = input.principal;
  let cumulativeInterest = 0;
  let totalInterest = 0;
  let totalPayment = 0;
  const schedule: RepaymentRow[] = [];
  const money = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

  for (let month = 1; month <= input.tenureMonths && balance > 0.005; month++) {
    const openingBalance = balance;
    const interest = money(openingBalance * monthlyRate);
    const due = openingBalance + interest;
    const scheduledPayment = money(Math.min(monthlyEmi, due));
    const principalPaid = money(Math.min(openingBalance, Math.max(0, scheduledPayment - interest)));
    balance = money(Math.max(0, openingBalance - principalPaid));
    // Prevent a rounding residue from extending the loan by an extra installment.
    if (month === input.tenureMonths && balance > 0 && balance <= 0.05) balance = 0;
    cumulativeInterest = money(cumulativeInterest + interest);
    totalInterest = money(totalInterest + interest);
    totalPayment = money(totalPayment + scheduledPayment);
    schedule.push({ month, openingBalance, scheduledPayment, interest, principalPaid, closingBalance: balance, cumulativeInterest });
  }

  return {
    summary: {
      monthlyEmi,
      totalPrincipal: money(schedule.reduce((sum, row) => sum + row.principalPaid, 0)),
      totalInterest,
      totalPayment,
      actualPaymentCount: schedule.length,
    },
    schedule,
  };
}

export interface YearlySummary {
  year: number;
  openingBalance: number;
  totalPayment: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
}

export function summarizeByYear(schedule: RepaymentRow[]): YearlySummary[] {
  const years = new Map<number, YearlySummary>();
  for (const row of schedule) {
    const year = Math.ceil(row.month / 12);
    let summary = years.get(year);
    if (!summary) {
      summary = { year, openingBalance: row.openingBalance, totalPayment: 0, principalPaid: 0, interestPaid: 0, closingBalance: row.closingBalance };
      years.set(year, summary);
    }
    summary.totalPayment = roundMoney(summary.totalPayment + row.scheduledPayment);
    summary.principalPaid = roundMoney(summary.principalPaid + row.principalPaid);
    summary.interestPaid = roundMoney(summary.interestPaid + row.interest);
    summary.closingBalance = row.closingBalance;
  }
  return Array.from(years.values());
}

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function csvCell(value: string | number): string {
  const raw = String(value);
  const safe = /^[=+@\\-]/.test(raw) ? "'" + raw : raw;
  return '"' + safe.replace(/"/g, '""') + '"';
}

export function repaymentScheduleToCsv(schedule: RepaymentRow[]): string {
  const header = ['Month', 'Opening Balance', 'EMI', 'Interest', 'Principal Repaid', 'Closing Balance', 'Cumulative Interest'];
  const rows = schedule.map(row => [row.month, row.openingBalance, row.scheduledPayment, row.interest, row.principalPaid, row.closingBalance, row.cumulativeInterest]);
  return [header, ...rows].map(row => row.map(csvCell).join(',')).join('\\r\\n');
}

export function yearlySummaryToCsv(summaries: YearlySummary[]): string {
  const header = ['Year', 'Opening Balance', 'Total Payment', 'Principal Repaid', 'Interest Paid', 'Closing Balance'];
  const rows = summaries.map(row => [row.year, row.openingBalance, row.totalPayment, row.principalPaid, row.interestPaid, row.closingBalance]);
  return [header, ...rows].map(row => row.map(csvCell).join(',')).join('\\r\\n');
}
