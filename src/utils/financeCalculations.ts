/**
 * Pure financial computation engine for Pocket Advisor.
 * Extracted for modularity, single-responsibility, and unit testability.
 */

export interface LoanPrepaymentParams {
  loanPrincipal: number;
  loanInterestRate: number; // Annual % e.g. 8.5
  tenureYears: number;
  monthlySurplus: number;
  annualLumpsum: number;
  expectedSipReturn: number; // Annual % e.g. 12
}

export interface LoanComparisonResult {
  regularEmi: number;
  totalBasePayment: number;
  totalBaseInterest: number;
  // Option A: Prepay
  monthsToPayoff: number;
  yearsToPayoff: string;
  monthsSaved: number;
  yearsSaved: string;
  interestSaved: number;
  totalInterestPaidPrepay: number;
  totalExtraPaid: number;
  // Option B: SIP
  sipCorpus: number;
  totalSipInvested: number;
  sipNetWealthProfit: number;
  // Option C: Hybrid 50/50
  hybridInterestSaved: number;
  hybridYearsSaved: string;
  hybridSipCorpus: number;
  hybridSipInvested: number;
  // Verdict
  isSipWinner: boolean;
  netDifference: number;
}

export function calculateEmi(principal: number, annualRatePct: number, tenureYears: number): number {
  const P = Math.max(0, principal || 0);
  const R = Math.max(0, annualRatePct || 0);
  const T = Math.max(1, tenureYears || 0);
  const totalMonths = T * 12;

  if (P === 0) return 0;
  if (R === 0) return P / totalMonths;

  const r = R / 12 / 100;
  const factor = Math.pow(1 + r, totalMonths);
  if (!isFinite(factor) || factor <= 1) return P / totalMonths;

  return (P * r * factor) / (factor - 1);
}

export function calculatePrepaymentVsSipComparison(params: LoanPrepaymentParams): LoanComparisonResult {
  const P = Math.max(0, params.loanPrincipal || 0);
  const R_loan = Math.max(0.1, params.loanInterestRate || 0);
  const T = Math.max(1, params.tenureYears || 0);
  const extraMonthly = Math.max(0, params.monthlySurplus || 0);
  const annualBonus = Math.max(0, params.annualLumpsum || 0);
  const R_sip = Math.max(0.1, params.expectedSipReturn || 0);

  const totalMonths = T * 12;
  const r_loan = R_loan / 12 / 100;
  const r_sip = R_sip / 12 / 100;

  const regularEmi = calculateEmi(P, R_loan, T);
  const totalBasePayment = regularEmi * totalMonths;
  const totalBaseInterest = Math.max(0, totalBasePayment - P);

  // Simulation Option A: Home Loan Prepayment (reducing balance)
  let balancePrepay = P;
  let monthsToPayoff = 0;
  let totalInterestPaidPrepay = 0;
  let totalExtraPaid = 0;

  for (let m = 1; m <= totalMonths; m++) {
    if (balancePrepay <= 0) break;
    monthsToPayoff = m;

    const interestThisMonth = balancePrepay * r_loan;
    totalInterestPaidPrepay += interestThisMonth;

    const regularPrincipalPaid = regularEmi - interestThisMonth;
    const extraThisMonth = extraMonthly + (m % 12 === 0 ? annualBonus : 0);
    const totalPrincipalChunk = regularPrincipalPaid + extraThisMonth;

    if (totalPrincipalChunk >= balancePrepay) {
      totalExtraPaid += Math.max(0, balancePrepay - regularPrincipalPaid);
      balancePrepay = 0;
      break;
    } else {
      totalExtraPaid += extraThisMonth;
      balancePrepay -= totalPrincipalChunk;
    }
  }

  const monthsSaved = Math.max(0, totalMonths - monthsToPayoff);
  const yearsSaved = (monthsSaved / 12).toFixed(1);
  const interestSaved = Math.max(0, totalBaseInterest - totalInterestPaidPrepay);

  // Simulation Option B: Regular EMI + Surplus Invested in SIP
  let sipCorpus = 0;
  let totalSipInvested = 0;

  for (let m = 1; m <= totalMonths; m++) {
    const deposit = extraMonthly + (m % 12 === 0 ? annualBonus : 0);
    totalSipInvested += deposit;
    sipCorpus = (sipCorpus + deposit) * (1 + r_sip);
  }

  const sipNetWealthProfit = Math.max(0, sipCorpus - totalSipInvested);

  // Simulation Option C: The 50:50 Hybrid Strategy
  let balanceHybrid = P;
  let hybridMonths = 0;
  let hybridInterestPaid = 0;
  let hybridSipCorpus = 0;
  let hybridSipInvested = 0;

  for (let m = 1; m <= totalMonths; m++) {
    if (balanceHybrid > 0) {
      hybridMonths = m;
      const interest = balanceHybrid * r_loan;
      hybridInterestPaid += interest;
      const regPrin = regularEmi - interest;
      const halfExtra = (extraMonthly / 2) + (m % 12 === 0 ? annualBonus / 2 : 0);
      const totalPrin = regPrin + halfExtra;
      if (totalPrin >= balanceHybrid) {
        balanceHybrid = 0;
      } else {
        balanceHybrid -= totalPrin;
      }
    }

    const halfSip = (extraMonthly / 2) + (m % 12 === 0 ? annualBonus / 2 : 0);
    hybridSipInvested += halfSip;
    hybridSipCorpus = (hybridSipCorpus + halfSip) * (1 + r_sip);
  }

  const hybridInterestSaved = Math.max(0, totalBaseInterest - hybridInterestPaid);
  const hybridYearsSaved = ((totalMonths - hybridMonths) / 12).toFixed(1);

  // Verdict
  const netDifference = Math.abs(sipNetWealthProfit - interestSaved);
  const isSipWinner = sipNetWealthProfit > interestSaved;

  return {
    regularEmi,
    totalBasePayment,
    totalBaseInterest,
    monthsToPayoff,
    yearsToPayoff: (monthsToPayoff / 12).toFixed(1),
    monthsSaved,
    yearsSaved,
    interestSaved,
    totalInterestPaidPrepay,
    totalExtraPaid,
    sipCorpus,
    totalSipInvested,
    sipNetWealthProfit,
    hybridInterestSaved,
    hybridYearsSaved,
    hybridSipCorpus,
    hybridSipInvested,
    isSipWinner,
    netDifference,
  };
}

// ============================================================================
// 3. SAVINGS GOAL PLANNER
// ============================================================================

export interface SavingsGoalParams {
  targetAmount: number;
  currentSavings: number;
  tenureYears: number;
  expectedAnnualReturn: number; // % e.g. 10
}

export interface SavingsGoalResult {
  monthlySavingsRequired: number;
  totalSelfInvested: number;
  projectedInterestEarned: number;
  futureValueOfCurrentSavings: number;
  targetAmount: number;
}

export function calculateSavingsGoal(params: SavingsGoalParams): SavingsGoalResult {
  const target = Math.max(0, params.targetAmount || 0);
  const current = Math.max(0, params.currentSavings || 0);
  const years = Math.max(0.1, params.tenureYears || 1);
  const ratePct = Math.max(0, params.expectedAnnualReturn || 0);

  const months = Math.round(years * 12);
  const monthlyRate = (ratePct / 12) / 100;

  // Future value of current savings
  const fvCurrent = monthlyRate > 0
    ? current * Math.pow(1 + monthlyRate, months)
    : current;

  const remainingGap = Math.max(0, target - fvCurrent);

  let monthly = 0;
  if (remainingGap > 0 && months > 0) {
    if (monthlyRate > 0) {
      // Monthly beginning-of-period compounding formula (Annuity Due)
      const factor = Math.pow(1 + monthlyRate, months);
      monthly = (remainingGap * monthlyRate) / ((1 + monthlyRate) * (factor - 1));
    } else {
      monthly = remainingGap / months;
    }
  }

  const roundedMonthly = Math.round(monthly);
  const totalSelfInvested = Math.round(current + (roundedMonthly * months));
  const projectedInterestEarned = Math.max(0, Math.round(target - totalSelfInvested));

  return {
    monthlySavingsRequired: roundedMonthly,
    totalSelfInvested,
    projectedInterestEarned,
    futureValueOfCurrentSavings: Math.round(fvCurrent),
    targetAmount: Math.round(target),
  };
}

// ============================================================================
// 4. FD & RD (FIXED / RECURRING DEPOSIT) CALCULATOR
// ============================================================================

export interface FdRdParams {
  type: 'FD' | 'RD';
  depositAmount: number; // Lump sum for FD, Monthly deposit for RD
  annualRatePct: number; // Annual % e.g. 7.5
  tenureMonths: number; // e.g. 36
  compoundingFrequency?: number; // 1, 2, 4 (default quarterly for Indian banks), 12
}

export interface FdRdResult {
  maturityAmount: number;
  totalDeposit: number;
  totalInterest: number;
  effectiveAnnualYield: number; // %
}

export function calculateFdRd(params: FdRdParams): FdRdResult {
  const deposit = Math.max(0, params.depositAmount || 0);
  const rate = Math.max(0, params.annualRatePct || 0);
  const months = Math.max(1, params.tenureMonths || 1);
  const freq = params.compoundingFrequency || 4; // Quarterly standard for Indian banks

  const years = months / 12;

  if (params.type === 'FD') {
    // Lump sum FD compounding: A = P * (1 + r/n)^(n*t)
    const periodicRate = (rate / 100) / freq;
    const totalPeriods = freq * years;
    const maturityAmount = Math.round(deposit * Math.pow(1 + periodicRate, totalPeriods));
    const totalInterest = Math.max(0, maturityAmount - deposit);
    const effectiveAnnualYield = years > 0 && deposit > 0
      ? ((Math.pow(maturityAmount / deposit, 1 / years) - 1) * 100)
      : rate;

    return {
      maturityAmount,
      totalDeposit: deposit,
      totalInterest,
      effectiveAnnualYield: Number(effectiveAnnualYield.toFixed(2)),
    };
  } else {
    // Recurring Deposit (RD) with standard quarterly compounding
    let maturity = 0;
    const quarterlyRate = (rate / 100) / 4;

    for (let m = 1; m <= months; m++) {
      // Month m deposit earns interest for remaining (months - m + 1) months
      const remainingMonths = months - m + 1;
      const quarters = remainingMonths / 3;
      maturity += deposit * Math.pow(1 + quarterlyRate, quarters);
    }

    const roundedMaturity = Math.round(maturity);
    const totalDeposit = deposit * months;
    const totalInterest = Math.max(0, roundedMaturity - totalDeposit);
    const avgInvestmentPeriodYears = years / 2;
    const effectiveAnnualYield = totalDeposit > 0 && avgInvestmentPeriodYears > 0
      ? (totalInterest / (totalDeposit * avgInvestmentPeriodYears)) * 100
      : rate;

    return {
      maturityAmount: roundedMaturity,
      totalDeposit,
      totalInterest,
      effectiveAnnualYield: Number(effectiveAnnualYield.toFixed(2)),
    };
  }
}

// ============================================================================
// 5. COMPOUND INTEREST CALCULATOR
// ============================================================================

export interface CompoundInterestParams {
  principal: number;
  annualRatePct: number;
  tenureYears: number;
  compoundingFrequency?: number; // 1 (annual), 2 (semi), 4 (quarterly), 12 (monthly), 365 (daily)
  monthlyDeposit?: number;
}

export interface CompoundScheduleItem {
  year: number;
  openingBalance: number;
  annualDeposit: number;
  interestEarned: number;
  closingBalance: number;
}

export interface CompoundInterestResult {
  finalBalance: number;
  totalPrincipalInvested: number;
  totalInterestEarned: number;
  schedule: CompoundScheduleItem[];
}

export function calculateCompoundInterest(params: CompoundInterestParams): CompoundInterestResult {
  const P = Math.max(0, params.principal || 0);
  const R = Math.max(0, params.annualRatePct || 0);
  const years = Math.max(1, Math.min(50, Math.round(params.tenureYears || 1)));
  const monthlyDeposit = Math.max(0, params.monthlyDeposit || 0);
  const freq = params.compoundingFrequency || 12; // Monthly default

  let balance = P;
  let totalInvested = P;
  const schedule: CompoundScheduleItem[] = [];

  const periodsPerYear = freq;
  const periodicRate = (R / 100) / periodsPerYear;
  const monthsPerPeriod = 12 / periodsPerYear;

  for (let y = 1; y <= years; y++) {
    const opening = Math.round(balance);
    let yearDeposits = 0;

    for (let p = 1; p <= periodsPerYear; p++) {
      const periodDeposit = monthlyDeposit * monthsPerPeriod;
      yearDeposits += periodDeposit;
      balance = (balance + periodDeposit) * (1 + periodicRate);
    }

    totalInvested += yearDeposits;
    const closing = Math.round(balance);
    const interestThisYear = Math.max(0, closing - opening - Math.round(yearDeposits));

    schedule.push({
      year: y,
      openingBalance: opening,
      annualDeposit: Math.round(yearDeposits),
      interestEarned: interestThisYear,
      closingBalance: closing,
    });
  }

  const finalBalance = Math.round(balance);
  const totalPrincipalInvested = Math.round(totalInvested);
  const totalInterestEarned = Math.max(0, finalBalance - totalPrincipalInvested);

  return {
    finalBalance,
    totalPrincipalInvested,
    totalInterestEarned,
    schedule,
  };
}

// ============================================================================
// 6. INFLATION CALCULATOR
// ============================================================================

export interface InflationParams {
  currentCost: number;
  annualInflationPct: number;
  tenureYears: number;
}

export interface InflationScheduleItem {
  year: number;
  futureCost: number;
  purchasingPower: number;
  valueErodedPct: number;
}

export interface InflationResult {
  futureCost: number;
  purchasingPower: number;
  purchasingPowerLossPct: number;
  additionalCostNeeded: number;
  schedule: InflationScheduleItem[];
}

export function calculateInflation(params: InflationParams): InflationResult {
  const cost = Math.max(0, params.currentCost || 0);
  const rate = Math.max(0, params.annualInflationPct || 0);
  const years = Math.max(1, Math.min(50, Math.round(params.tenureYears || 1)));

  const factor = Math.pow(1 + rate / 100, years);
  const futureCost = Math.round(cost * factor);
  const purchasingPower = factor > 0 ? Math.round(cost / factor) : cost;
  const additionalCostNeeded = Math.max(0, futureCost - cost);
  const purchasingPowerLossPct = cost > 0
    ? Number((((cost - purchasingPower) / cost) * 100).toFixed(1))
    : 0;

  const schedule: InflationScheduleItem[] = [];
  for (let y = 1; y <= years; y++) {
    const yFactor = Math.pow(1 + rate / 100, y);
    const yFuture = Math.round(cost * yFactor);
    const yPower = yFactor > 0 ? Math.round(cost / yFactor) : cost;
    const yLoss = cost > 0 ? Number((((cost - yPower) / cost) * 100).toFixed(1)) : 0;

    schedule.push({
      year: y,
      futureCost: yFuture,
      purchasingPower: yPower,
      valueErodedPct: yLoss,
    });
  }

  return {
    futureCost,
    purchasingPower,
    purchasingPowerLossPct,
    additionalCostNeeded,
    schedule,
  };
}

