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
