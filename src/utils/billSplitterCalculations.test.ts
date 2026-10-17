import { describe, it, expect } from 'vitest';
import {
  calculateGrandTotal,
  calculateSplitResults,
  calculateSettlements,
  buildUpiUri,
} from './billSplitterCalculations';

describe('calculateGrandTotal', () => {
  it('calculates grand total with percentage tax correctly', () => {
    const { baseAmount, extraAmount, grandTotal } = calculateGrandTotal(2000, 5, 'PERCENT');
    expect(baseAmount).toBe(2000);
    expect(extraAmount).toBe(100);
    expect(grandTotal).toBe(2100);
  });

  it('calculates grand total with flat tax/tip amount', () => {
    const { baseAmount, extraAmount, grandTotal } = calculateGrandTotal(2000, 150, 'FLAT');
    expect(baseAmount).toBe(2000);
    expect(extraAmount).toBe(150);
    expect(grandTotal).toBe(2150);
  });

  it('handles negative or invalid values gracefully', () => {
    const { grandTotal } = calculateGrandTotal(-500, 0, 'PERCENT');
    expect(grandTotal).toBe(0);
  });
});

describe('calculateSplitResults & calculateSettlements', () => {
  it('splits equally among members and generates direct settlements to payer', () => {
    const members = ['Alice', 'Bob', 'Charlie'];
    const results = calculateSplitResults(members, 3000, 'EQUAL', {}, 'Alice');

    expect(results).toHaveLength(3);
    results.forEach((r) => {
      expect(r.owed).toBe(1000);
    });

    const settlements = calculateSettlements(results, 'Alice');
    expect(settlements).toHaveLength(2);
    expect(settlements).toEqual([
      { from: 'Bob', to: 'Alice', amount: 1000 },
      { from: 'Charlie', to: 'Alice', amount: 1000 },
    ]);
  });

  it('splits proportionally in custom mode', () => {
    const members = ['Alice', 'Bob'];
    const customShares = { Alice: '100', Bob: '300' };
    const results = calculateSplitResults(members, 800, 'CUSTOM', customShares, 'Alice');

    const aliceResult = results.find((r) => r.name === 'Alice');
    const bobResult = results.find((r) => r.name === 'Bob');

    // 100 / 400 * 800 = 200; 300 / 400 * 800 = 600
    expect(aliceResult?.owed).toBe(200);
    expect(bobResult?.owed).toBe(600);

    const settlements = calculateSettlements(results, 'Alice');
    expect(settlements).toEqual([
      { from: 'Bob', to: 'Alice', amount: 600 },
    ]);
  });
});

describe('buildUpiUri', () => {
  it('generates standard NPCI UPI URI with unencoded @ sign in pa', () => {
    const uri = buildUpiUri('deep@okhdfcbank', 'Deep Garg', 500, 'Dinner split');
    expect(uri).toContain('pa=deep@okhdfcbank');
    expect(uri).toContain('am=500.00');
    expect(uri).toContain('cu=INR');
    expect(uri).toContain('pn=Deep%20Garg');
  });

  it('returns empty string if payee UPI is missing', () => {
    expect(buildUpiUri('', 'Deep', 500, 'Dinner')).toBe('');
  });
});
