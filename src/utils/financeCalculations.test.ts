import { describe, it, expect } from 'vitest';
import {
  calculateEmi,
  calculatePrepaymentVsSipComparison,
  calculateSavingsGoal,
  calculateFdRd,
  calculateCompoundInterest,
  calculateInflation,
} from './financeCalculations';

describe('calculateEmi', () => {
  it('calculates standard home loan EMI accurately', () => {
    // 40 Lakhs at 8.5% for 20 years
    const emi = calculateEmi(4000000, 8.5, 20);
    // Standard EMI formula gives ~34,713.06
    expect(Math.round(emi)).toBe(34713);
  });

  it('handles zero interest rate gracefully (zero-interest installment)', () => {
    const emi = calculateEmi(120000, 0, 1);
    expect(emi).toBe(10000);
  });

  it('returns 0 when principal is 0 or negative', () => {
    expect(calculateEmi(0, 8.5, 20)).toBe(0);
    expect(calculateEmi(-10000, 8.5, 20)).toBe(0);
  });
});

describe('calculatePrepaymentVsSipComparison', () => {
  it('simulates loan prepayment and calculates interest savings correctly', () => {
    const result = calculatePrepaymentVsSipComparison({
      loanPrincipal: 4000000,
      loanInterestRate: 8.5,
      tenureYears: 20,
      monthlySurplus: 10000,
      annualLumpsum: 50000,
      expectedSipReturn: 12,
    });

    // Option A: Prepayment cuts down loan tenure
    expect(result.monthsToPayoff).toBeLessThan(240);
    expect(result.monthsSaved).toBeGreaterThan(0);
    expect(result.interestSaved).toBeGreaterThan(0);
    expect(result.totalInterestPaidPrepay).toBeLessThan(result.totalBaseInterest);

    // Option B: SIP generates positive returns
    expect(result.sipCorpus).toBeGreaterThan(result.totalSipInvested);
    expect(result.sipNetWealthProfit).toBeGreaterThan(0);

    // Hybrid Strategy
    expect(result.hybridInterestSaved).toBeGreaterThan(0);
    expect(result.hybridSipCorpus).toBeGreaterThan(0);
  });

  it('handles zero surplus without crashing or infinite loops', () => {
    const result = calculatePrepaymentVsSipComparison({
      loanPrincipal: 2500000,
      loanInterestRate: 9.0,
      tenureYears: 15,
      monthlySurplus: 0,
      annualLumpsum: 0,
      expectedSipReturn: 12,
    });

    expect(result.monthsToPayoff).toBe(180);
    expect(result.monthsSaved).toBe(0);
    expect(result.interestSaved).toBe(0);
    expect(result.sipCorpus).toBe(0);
  });
});

describe('calculateSavingsGoal', () => {
  it('calculates required monthly savings for target goal correctly', () => {
    // ₹10 Lakh target in 3 years with ₹1 Lakh initial and 10% expected annual return
    const result = calculateSavingsGoal({
      targetAmount: 1000000,
      currentSavings: 100000,
      tenureYears: 3,
      expectedAnnualReturn: 10,
    });

    expect(result.monthlySavingsRequired).toBeGreaterThan(15000);
    expect(result.monthlySavingsRequired).toBeLessThan(25000);
    expect(result.futureValueOfCurrentSavings).toBeGreaterThan(100000);
    expect(result.totalSelfInvested).toBeLessThan(result.targetAmount);
    expect(result.projectedInterestEarned).toBeGreaterThan(0);
  });

  it('handles zero interest rate correctly', () => {
    const result = calculateSavingsGoal({
      targetAmount: 120000,
      currentSavings: 0,
      tenureYears: 1,
      expectedAnnualReturn: 0,
    });

    expect(result.monthlySavingsRequired).toBe(10000);
    expect(result.totalSelfInvested).toBe(120000);
    expect(result.projectedInterestEarned).toBe(0);
  });
});

describe('calculateFdRd', () => {
  it('calculates lump sum Fixed Deposit with quarterly compounding correctly', () => {
    // ₹1 Lakh for 5 years at 7.5% quarterly
    const result = calculateFdRd({
      type: 'FD',
      depositAmount: 100000,
      annualRatePct: 7.5,
      tenureMonths: 60,
      compoundingFrequency: 4,
    });

    // 100000 * (1 + 0.075/4)^20 = ~1,44,994.8
    expect(result.maturityAmount).toBeGreaterThan(140000);
    expect(result.maturityAmount).toBeLessThan(150000);
    expect(result.totalInterest).toBe(result.maturityAmount - 100000);
    expect(result.effectiveAnnualYield).toBeGreaterThan(7.5);
  });

  it('calculates Recurring Deposit correctly', () => {
    // ₹5000 per month for 12 months at 7%
    const result = calculateFdRd({
      type: 'RD',
      depositAmount: 5000,
      annualRatePct: 7.0,
      tenureMonths: 12,
    });

    expect(result.totalDeposit).toBe(60000);
    expect(result.maturityAmount).toBeGreaterThan(60000);
    expect(result.totalInterest).toBeGreaterThan(2000);
  });
});

describe('calculateCompoundInterest', () => {
  it('computes compound growth and generates annual schedule', () => {
    const result = calculateCompoundInterest({
      principal: 100000,
      annualRatePct: 12,
      tenureYears: 5,
      compoundingFrequency: 12,
      monthlyDeposit: 1000,
    });

    expect(result.finalBalance).toBeGreaterThan(100000 + 5 * 12 * 1000);
    expect(result.schedule.length).toBe(5);
    expect(result.schedule[4].closingBalance).toBe(result.finalBalance);
    expect(result.totalInterestEarned).toBeGreaterThan(0);
  });
});

describe('calculateInflation', () => {
  it('computes future cost and purchasing power erosion accurately', () => {
    // ₹10 Lakh current cost at 6% inflation for 10 years
    const result = calculateInflation({
      currentCost: 1000000,
      annualInflationPct: 6,
      tenureYears: 10,
    });

    // 1000000 * (1.06)^10 = ~17,90,847
    expect(result.futureCost).toBeGreaterThan(1700000);
    expect(result.purchasingPower).toBeLessThan(600000);
    expect(result.purchasingPowerLossPct).toBeGreaterThan(40);
    expect(result.schedule.length).toBe(10);
  });
});

