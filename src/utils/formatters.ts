export function formatMoney(amount: number, currency: string = '₹', decimals?: number): string {
  const dec = decimals !== undefined ? Math.min(Math.max(0, decimals), 20) : 2;
  if (!Number.isFinite(amount)) {
    return `${currency}${(0).toFixed(dec)}`;
  }
  const isINR = currency === '₹' || currency.toUpperCase() === 'INR';
  const locale = isINR ? 'en-IN' : 'en-US';
  const absAmount = Math.abs(amount);
  const rounded = Math.round(absAmount * Math.pow(10, dec)) / Math.pow(10, dec);
  const sign = rounded !== 0 && amount < 0 ? '-' : '';
  return `${sign}${currency}${rounded.toLocaleString(locale, {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  })}`;
}

