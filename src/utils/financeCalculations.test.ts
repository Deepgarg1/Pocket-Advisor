import { describe, it, expect } from 'vitest';
import {
  calculateEmi,
  calculatePrepaymentVsSipComparison,
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
