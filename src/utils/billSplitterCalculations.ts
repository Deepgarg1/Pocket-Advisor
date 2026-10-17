/**
 * Pure bill splitting and settlement calculation engine.
 * Extracted from QuickBillSplitter for modularity, SRP, and unit testability.
 */

export interface SplitResult {
  name: string;
  owed: number;
  isPayer: boolean;
}

export interface Settlement {
  from: string;
  to: string;
  amount: number;
}

export function calculateGrandTotal(
  baseAmount: number,
  taxTipValue: number,
  taxTipType: 'PERCENT' | 'FLAT'
): { baseAmount: number; extraAmount: number; grandTotal: number } {
  const base = Math.max(0, Number(baseAmount) || 0);
  const val = Math.max(0, Number(taxTipValue) || 0);
  const extraAmount = taxTipType === 'PERCENT' ? (base * val) / 100 : val;
  const grandTotal = base + extraAmount;

  return { baseAmount: base, extraAmount, grandTotal };
}

export function calculateSplitResults(
  members: string[],
  grandTotal: number,
  splitMode: 'EQUAL' | 'CUSTOM',
  customShares: Record<string, string>,
  paidBy: string
): SplitResult[] {
  if (!members || members.length === 0 || grandTotal <= 0) return [];

  if (splitMode === 'EQUAL') {
    const share = grandTotal / members.length;
    return members.map((name) => ({
      name,
      owed: share,
      isPayer: name === paidBy,
    }));
  }

  // Custom mode
  const customTotal = members.reduce((sum, name) => {
    return sum + (parseFloat(customShares[name] || '0') || 0);
  }, 0);

  const multiplier = customTotal > 0 ? grandTotal / customTotal : 1;

  return members.map((name) => {
    const entered = parseFloat(customShares[name] || '0') || 0;
    return {
      name,
      owed: entered * multiplier,
      isPayer: name === paidBy,
    };
  });
}

export function calculateSettlements(splitResults: SplitResult[], paidBy: string): Settlement[] {
  return splitResults
    .filter((r) => r.name !== paidBy && r.owed > 0.01)
    .map((r) => ({
      from: r.name,
      to: paidBy,
      amount: r.owed,
    }));
}

/**
 * Builds standard 1-tap NPCI-compliant UPI URI.
 * Preserves the unencoded '@' symbol in the pa parameter.
 */
export function buildUpiUri(payeeUpi: string, payeeName: string, amount: number, note: string): string {
  const cleanUpi = (payeeUpi || '').trim();
  if (!cleanUpi) return '';
  const cleanName = (payeeName || '').trim().replace(/[^a-zA-Z0-9 ]/g, '') || 'Payee';
  const cleanNote = (note || '').trim().replace(/[^a-zA-Z0-9 ]/g, '').slice(0, 40) || 'Split bill';

  return `upi://pay?pa=${cleanUpi}&pn=${encodeURIComponent(cleanName)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(cleanNote)}`;
}
