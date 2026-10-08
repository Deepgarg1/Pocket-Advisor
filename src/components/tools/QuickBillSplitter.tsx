import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '../common/Button';
import {
  Users,
  Plus,
  Trash2,
  Copy,
  Check,
  Receipt,
  ArrowRight,
  MessageCircle,
  Link2,
  CheckCircle2,
  Zap,
  Smartphone,
  Sparkles,
  Edit2,
  Share2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { formatMoney } from '../../utils/formatters';
import { useSettings } from '../../context/SettingsContext';

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
];

const getAvatarGradient = (name: string, isPayer: boolean) => {
  if (isPayer) return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};

const EVENT_PRESETS = [
  { label: 'Dinner', icon: '🍕' },
  { label: 'Trip', icon: '🏖️' },
  { label: 'Rent', icon: '🏠' },
  { label: 'Cab', icon: '🚕' },
  { label: 'Drinks', icon: '☕' },
];

const TAX_PRESETS = [
  { label: '0% Tax', value: '0', type: 'PERCENT' as const },
  { label: '5% GST', value: '5', type: 'PERCENT' as const },
  { label: '12% GST', value: '12', type: 'PERCENT' as const },
  { label: '18% GST', value: '18', type: 'PERCENT' as const },
];

// Smart parser supporting compact keys, legacy keys, rent preset, and UPI deep linking
interface ParsedSplitState {
  desc: string;
  amount: string;
  tax: string;
  taxType: 'PERCENT' | 'FLAT';
  members: string[];
  paidBy: string;
  mode: 'EQUAL' | 'CUSTOM';
  customShares: Record<string, string>;
  upiId: string;
  isFromShare: boolean;
}

const getInitialSplitState = (): ParsedSplitState => {
  const isRentPreset = typeof window !== 'undefined' && (
    window.location.pathname.toLowerCase().includes('rent') ||
    window.location.pathname.toLowerCase().includes('flatmates') ||
    window.location.hash.toLowerCase().includes('rent') ||
    window.location.hash.toLowerCase().includes('flatmates')
  );

  const defaults: ParsedSplitState = {
    desc: isRentPreset ? 'Flat 302 Rent & Utilities' : 'Dinner with Friends',
    amount: isRentPreset ? '36000' : '2400',
    tax: isRentPreset ? '0' : '5',
    taxType: 'PERCENT',
    members: isRentPreset ? ['You (Room 1)', 'Aman (Room 2)', 'Rohit (Room 3)'] : ['You', 'Aman', 'Priya', 'Rahul'],
    paidBy: isRentPreset ? 'You (Room 1)' : 'You',
    mode: 'EQUAL',
    customShares: {},
    upiId: '',
    isFromShare: false,
  };

  if (typeof window === 'undefined') return defaults;

  const urlParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash;
  const hashQIndex = hash.indexOf('?');
  if (hashQIndex !== -1) {
    const hashParams = new URLSearchParams(hash.substring(hashQIndex + 1));
    hashParams.forEach((val, key) => {
      urlParams.set(key, val);
    });
  }

  // Check preset query param
  if (urlParams.get('preset') === 'rent') {
    defaults.desc = 'Flat 302 Rent & Utilities';
    defaults.amount = '36000';
    defaults.tax = '0';
    defaults.members = ['You (Room 1)', 'Aman (Room 2)', 'Rohit (Room 3)'];
    defaults.paidBy = 'You (Room 1)';
  }

  // If no query parameters, return defaults cleanly
  if (urlParams.toString().length === 0) return defaults;

  const desc = urlParams.get('d') || urlParams.get('desc') || urlParams.get('name') || defaults.desc;
  const amount = urlParams.get('a') || urlParams.get('amount') || urlParams.get('bill') || defaults.amount;
  const tax = urlParams.get('t') || urlParams.get('tax') || defaults.tax;
  const rawTaxType = (urlParams.get('tt') || urlParams.get('taxType') || '').toUpperCase();
  const taxType: 'PERCENT' | 'FLAT' = rawTaxType === 'FLAT' ? 'FLAT' : 'PERCENT';

  const rawMembers = urlParams.get('m') || urlParams.get('members');
  let members = defaults.members;
  if (rawMembers) {
    const parsed = rawMembers.split(',').map((m) => m.trim()).filter(Boolean);
    if (parsed.length >= 2) {
      members = parsed;
    }
  }

  const rawPaidBy = urlParams.get('p') || urlParams.get('paidBy');
  const paidBy = rawPaidBy && members.includes(rawPaidBy) ? rawPaidBy : members[0] || 'You';

  const rawMode = (urlParams.get('mode') || '').toUpperCase();
  const mode: 'EQUAL' | 'CUSTOM' = rawMode === 'CUSTOM' ? 'CUSTOM' : 'EQUAL';

  const customShares: Record<string, string> = {};
  const rawCustom = urlParams.get('c');
  if (rawCustom) {
    rawCustom.split(';').forEach((entry) => {
      const [k, v] = entry.split(':');
      if (k && v) customShares[k.trim()] = v.trim();
    });
  }

  const upiId = urlParams.get('upi') || urlParams.get('u') || '';
  const isFromShare = urlParams.get('s') === '1' || urlParams.get('shared') === '1' ||
    (urlParams.has('a') && urlParams.has('m') && !urlParams.has('edit'));

  return {
    desc,
    amount,
    tax,
    taxType,
    members,
    paidBy,
    mode,
    customShares,
    upiId,
    isFromShare,
  };
};

export const QuickBillSplitter: React.FC = () => {
  const { currencySymbol } = useSettings();
  const initial = useMemo(() => getInitialSplitState(), []);

  // Form State initialized from smart parser
  const [eventName, setEventName] = useState(initial.desc);
  const [billAmount, setBillAmount] = useState(initial.amount);
  const [taxTipType, setTaxTipType] = useState<'PERCENT' | 'FLAT'>(initial.taxType);
  const [taxTipValue, setTaxTipValue] = useState(initial.tax);
  const [members, setMembers] = useState<string[]>(initial.members);
  const [newMemberInput, setNewMemberInput] = useState('');
  const [paidBy, setPaidBy] = useState<string>(initial.paidBy);
  const [splitMode, setSplitMode] = useState<'EQUAL' | 'CUSTOM'>(initial.mode);
  const [customShares, setCustomShares] = useState<Record<string, string>>(initial.customShares);
  const [upiId, setUpiId] = useState(initial.upiId);
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
  const [settledDebts, setSettledDebts] = useState<Record<string, boolean>>({});
  const [activeUpiModal, setActiveUpiModal] = useState<{
    from: string;
    to: string;
    amount: number;
    upiUri: string;
    upiId: string;
  } | null>(null);
  const [copiedModalUpi, setCopiedModalUpi] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCustomTaxOpen, setIsCustomTaxOpen] = useState(false);
  const [isFromShare, setIsFromShare] = useState(initial.isFromShare);
  const [editingMember, setEditingMember] = useState<{ original: string; current: string } | null>(null);
  const [previewRecipientMode, setPreviewRecipientMode] = useState(false);

  // Synchronize browser address bar with a clean, concise URL (no duplicate /split#/split!)
  useEffect(() => {
    const isDefaultDesc = !eventName || eventName === 'Dinner with Friends' || eventName === 'Flat 302 Rent & Utilities';
    const isDefaultAmount = billAmount === '2400' || billAmount === '36000' || !billAmount;
    const isDefaultMembers = (members.length === 4 && members.join(',') === 'You,Aman,Priya,Rahul') ||
      (members.length === 3 && members.join(',') === 'You (Room 1),Aman (Room 2),Rohit (Room 3)');
    const isDefaultPaidBy = paidBy === members[0];
    const isDefaultTax = (taxTipValue === '5' && taxTipType === 'PERCENT') || (taxTipValue === '0' && taxTipType === 'PERCENT');
    const isDefaultMode = splitMode === 'EQUAL';
    const isDefaultUpi = !upiId || upiId.trim() === '';

    const isAllDefault = isDefaultDesc && isDefaultAmount && isDefaultMembers && isDefaultPaidBy && isDefaultTax && isDefaultMode && isDefaultUpi;

    const params = new URLSearchParams();
    if (!isAllDefault) {
      if (billAmount && billAmount !== '0') params.set('a', billAmount);
      if (eventName && !isDefaultDesc) params.set('d', eventName.trim());
      if (!isDefaultMembers) params.set('m', members.join(','));
      if (!isDefaultPaidBy) params.set('p', paidBy);
      if (upiId && upiId.trim()) params.set('upi', upiId.trim());
      if (!isDefaultTax) {
        params.set('t', taxTipValue);
        if (taxTipType === 'FLAT') params.set('tt', 'flat');
      }
      if (splitMode === 'CUSTOM') {
        params.set('mode', 'custom');
        const customEntries = Object.entries(customShares)
          .filter(([_, v]) => parseFloat(v) > 0)
          .map(([k, v]) => `${k}:${v}`)
          .join(';');
        if (customEntries) params.set('c', customEntries);
      }
    }

    const qs = params.toString();

    const timer = setTimeout(() => {
      const isRentPage = window.location.pathname.includes('rent') ||
        window.location.pathname.includes('flatmate') ||
        window.location.hash.includes('rent') ||
        window.location.hash.includes('flatmate');
      const isCalculators = window.location.pathname.startsWith('/calculators') || window.location.hash.startsWith('#/calculators');
      const isPureHash = (window.location.hash.startsWith('#/split') || window.location.hash.startsWith('#/flatmates') || window.location.hash.startsWith('#/calculators')) &&
        !window.location.pathname.includes('/split') &&
        !window.location.pathname.includes('/flatmates') &&
        !window.location.pathname.includes('/calculators');

      const routePrefix = isRentPage ? 'flatmates-rent-splitter' : (isCalculators ? 'calculators' : 'split');
      let targetUrl = '';
      if (isPureHash) {
        targetUrl = qs ? `#/${routePrefix}?${qs}` : `#/${routePrefix}`;
      } else {
        targetUrl = qs ? `/${routePrefix}?${qs}` : `/${routePrefix}`;
      }

      const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (!currentUrl.endsWith(targetUrl)) {
        try {
          window.history.replaceState(null, '', targetUrl);
        } catch {
          // Gracefully ignore history rate-limiting exceptions on rapid typing
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [eventName, billAmount, taxTipValue, taxTipType, members, paidBy, splitMode, customShares, upiId]);

  // Grand Total Calculations
  const baseAmount = Math.max(0, parseFloat(billAmount) || 0);
  const extraAmount = useMemo(() => {
    const val = parseFloat(taxTipValue) || 0;
    if (taxTipType === 'PERCENT') {
      return (baseAmount * val) / 100;
    }
    return val;
  }, [baseAmount, taxTipType, taxTipValue]);

  const grandTotal = baseAmount + extraAmount;

  // Add Member
  const handleAddMember = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanName = newMemberInput.replace(/,/g, '').trim();
    if (!cleanName) return;
    if (members.map((m) => m.toLowerCase()).includes(cleanName.toLowerCase())) {
      setErrorMsg(`"${cleanName}" is already in the split.`);
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }
    setErrorMsg(null);
    setMembers((prev) => [...prev, cleanName]);
    setNewMemberInput('');
  };

  // Remove Member
  const handleRemoveMember = (nameToRemove: string) => {
    if (members.length <= 2) {
      setErrorMsg('You need at least 2 people to split a bill.');
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }
    setErrorMsg(null);
    const updated = members.filter((m) => m !== nameToRemove);
    setMembers(updated);
    if (paidBy === nameToRemove) {
      setPaidBy(updated[0] || 'You');
    }
    const updatedCustom = { ...customShares };
    delete updatedCustom[nameToRemove];
    setCustomShares(updatedCustom);
  };

  // Rename Member
  const handleRenameMember = (originalName: string, newName: string) => {
    const cleanNew = newName.trim();
    if (!cleanNew || cleanNew === originalName) {
      setEditingMember(null);
      return;
    }
    if (members.map((m) => m.toLowerCase()).includes(cleanNew.toLowerCase())) {
      setErrorMsg(`"${cleanNew}" is already in the split.`);
      setTimeout(() => setErrorMsg(null), 3000);
      setEditingMember(null);
      return;
    }
    setErrorMsg(null);
    setMembers((prev) => prev.map((m) => (m === originalName ? cleanNew : m)));
    if (paidBy === originalName) {
      setPaidBy(cleanNew);
    }
    if (customShares[originalName] !== undefined) {
      const updatedCustom = { ...customShares };
      updatedCustom[cleanNew] = updatedCustom[originalName];
      delete updatedCustom[originalName];
      setCustomShares(updatedCustom);
    }
    if (settledDebts[originalName] !== undefined) {
      const updatedSettled = { ...settledDebts };
      updatedSettled[cleanNew] = updatedSettled[originalName];
      delete updatedSettled[originalName];
      setSettledDebts(updatedSettled);
    }
    if (selectedRecipient === originalName) {
      setSelectedRecipient(cleanNew);
    }
    setEditingMember(null);
  };

  // Derive suggested name from UPI ID (e.g. "deep.garg@okhdfcbank" -> "Deep Garg")
  const suggestedNameFromUpi = useMemo(() => {
    if (!upiId || !upiId.includes('@')) return '';
    const localPart = upiId.split('@')[0];
    const cleaned = localPart.replace(/[0-9_.-]+/g, ' ').trim();
    if (!cleaned) return '';
    return cleaned
      .split(' ')
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }, [upiId]);

  // Split results calculation
  const splitResults = useMemo(() => {
    if (members.length === 0 || grandTotal <= 0) return [];

    if (splitMode === 'EQUAL') {
      const share = grandTotal / members.length;
      return members.map((name) => ({
        name,
        owed: share,
        isPayer: name === paidBy,
      }));
    } else {
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
  }, [members, grandTotal, splitMode, customShares, paidBy]);

  // Settlements (Bilateral transfers to payer)
  const settlements = useMemo(() => {
    return splitResults
      .filter((r) => r.name !== paidBy && r.owed > 0.01)
      .map((r) => ({
        from: r.name,
        to: paidBy,
        amount: r.owed,
      }));
  }, [splitResults, paidBy]);

  // Helper to build standard 1-tap UPI URI (strictly follows NPCI standard: unencoded @)
  const buildUpiUri = (payeeUpi: string, payeeName: string, amount: number, note: string) => {
    const cleanUpi = payeeUpi.trim();
    if (!cleanUpi) return '';
    const cleanName = payeeName.trim().replace(/[^a-zA-Z0-9 ]/g, '') || 'Payee';
    const cleanNote = note.trim().replace(/[^a-zA-Z0-9 ]/g, '').slice(0, 40) || 'Split bill';
    // CRITICAL: Do NOT percent-encode the @ symbol in payee UPI ID (pa parameter)
    return `upi://pay?pa=${cleanUpi}&pn=${encodeURIComponent(cleanName)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(cleanNote)}`;
  };

  // Share URL Generator - preserves eventName, payer, route, and adds s=1 for recipients
  const generateShareUrl = (forExternalShare: boolean = false) => {
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const origin = (forExternalShare || !isLocal)
      ? 'https://www.pocketadvisor.in'
      : (typeof window !== 'undefined' ? window.location.origin : 'https://www.pocketadvisor.in');

    const isRentPage = typeof window !== 'undefined' && (
      window.location.pathname.includes('rent') ||
      window.location.pathname.includes('flatmate') ||
      window.location.hash.includes('rent') ||
      window.location.hash.includes('flatmate')
    );
    const isCalculators = typeof window !== 'undefined' && (
      window.location.pathname.startsWith('/calculators') ||
      window.location.hash.startsWith('#/calculators')
    );

    const routePrefix = isRentPage ? 'flatmates-rent-splitter' : (isCalculators ? 'calculators' : 'split');

    const params = new URLSearchParams();

    if (billAmount && billAmount !== '0') {
      params.set('a', billAmount);
    }
    if (eventName && eventName.trim()) {
      params.set('d', eventName.trim());
    }
    if (members.length > 0) {
      params.set('m', members.join(','));
    }
    if (paidBy) {
      params.set('p', paidBy);
    }
    if (upiId && upiId.trim()) {
      params.set('upi', upiId.trim());
    }
    if (taxTipValue !== '0' || taxTipType !== 'PERCENT') {
      params.set('t', taxTipValue);
      if (taxTipType === 'FLAT') params.set('tt', 'flat');
    }
    if (splitMode === 'CUSTOM') {
      params.set('mode', 'custom');
      const customEntries = Object.entries(customShares)
        .filter(([_, v]) => parseFloat(v) > 0)
        .map(([k, v]) => `${k}:${v}`)
        .join(';');
      if (customEntries) params.set('c', customEntries);
    }

    // Flag for recipient mode
    params.set('s', '1');

    const qs = params.toString();
    return qs ? `${origin}/${routePrefix}?${qs}` : `${origin}/${routePrefix}`;
  };

  // WhatsApp Message Formatter - clear, clean, and clickable on all phones
  const generateWhatsAppMessage = () => {
    const hostName = paidBy === 'You' ? 'Bill Host' : paidBy;
    const title = eventName.trim() ? `🧾 *${eventName.trim()} — Bill Split*` : `🧾 *Bill Split Summary*`;
    const totalLine = `💰 *Total Bill:* ${formatMoney(grandTotal, currencySymbol)} (Paid upfront by *${hostName}*)`;

    const breakdownLines = splitResults
      .map((r) => {
        const name = r.name === 'You' ? hostName : r.name;
        return `  • ${name}: ${formatMoney(r.owed, currencySymbol)}${r.isPayer ? ' (Paid upfront)' : ''}`;
      })
      .join('\n');

    const settlementLines = settlements.length > 0
      ? settlements.map((s) => {
          const fromName = s.from === 'You' ? hostName : s.from;
          const toName = s.to === 'You' ? hostName : s.to;
          return `  👉 *${fromName}* owes *${toName}*: ${formatMoney(s.amount, currencySymbol)}`;
        }).join('\n')
      : '  ✅ All settled up!';

    const upiSection = upiId.trim()
      ? `\n💳 *Pay to ${hostName} via UPI:*\n${upiId.trim()}\n`
      : '';

    const shareUrl = generateShareUrl(true);

    return `${title}
${totalLine}

👥 *Individual Shares (${members.length} people):*
${breakdownLines}

💸 *Settlements:*
${settlementLines}
${upiSection}
🔗 *Tap to view receipt & 1-tap pay via UPI:*
${shareUrl}

⚡ _Split seamlessly with Pocket Advisor_`;
  };

  // Resilient Clipboard helper with fallback
  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // ignore
    }
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch (err) {
      console.warn('Clipboard copy failed:', err);
      return false;
    }
  };

  const handleCopyClipboard = async () => {
    const text = generateWhatsAppMessage();
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    }
  };

  const handleCopyLinkOnly = async () => {
    const url = generateShareUrl(false);
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const text = generateWhatsAppMessage();
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    const isMobile = typeof navigator !== 'undefined' && /android|iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = waUrl;
    } else {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleNativeShare = async () => {
    const text = generateWhatsAppMessage();
    const shareUrl = generateShareUrl(true);
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: `${eventName.trim() || 'Bill Split'} — Pocket Advisor`,
          text: text,
          url: shareUrl,
        });
        return;
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
      }
    }
    handleShareWhatsApp();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Interactive Recipient Settle-Up Experience - Shown when loaded from share or in preview mode */}
      {(isFromShare || previewRecipientMode) && (
        <div
          style={{
            padding: '18px 22px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.14) 0%, rgba(99, 102, 241, 0.1) 100%)',
            border: '1.5px solid rgba(16, 185, 129, 0.35)',
            boxShadow: '0 8px 30px rgba(16, 185, 129, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <Zap size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {previewRecipientMode
                    ? '👁️ Previewing Recipient View (What friends see)'
                    : `📋 Shared Bill: ${eventName}`}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Total <strong>{formatMoney(grandTotal, currencySymbol)}</strong> paid upfront by{' '}
                  <strong>{paidBy === 'You' ? (isFromShare ? 'Bill Host' : 'You') : paidBy}</strong>. Tap your name below to settle your share via UPI:
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {selectedRecipient && (
                <button
                  type="button"
                  onClick={() => setSelectedRecipient(null)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Clear Selection
                </button>
              )}
              {previewRecipientMode ? (
                <button
                  type="button"
                  onClick={() => setPreviewRecipientMode(false)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Exit Preview
                </button>
              ) : isFromShare ? (
                <button
                  type="button"
                  onClick={() => setIsFromShare(false)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid var(--primary)',
                    color: 'var(--primary)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Switch to Edit Mode
                </button>
              ) : null}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {members.map((m) => {
              const isSelected = selectedRecipient === m;
              const isPayer = m === paidBy;
              const isPaid = settledDebts[m];
              const debtorSettlement = settlements.find((s) => s.from === m);
              const owedAmount = debtorSettlement?.amount || 0;
              const displayMember = (isFromShare || previewRecipientMode) && m === 'You' ? 'Bill Host' : m;

              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedRecipient(isSelected ? null : m)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '12px',
                    border: isSelected
                      ? '1.5px solid #10b981'
                      : '1px solid var(--border-subtle)',
                    background: isSelected
                      ? 'rgba(16, 185, 129, 0.25)'
                      : isPaid
                      ? 'rgba(16, 185, 129, 0.1)'
                      : 'var(--bg-surface-elevated)',
                    color: isSelected
                      ? '#10b981'
                      : isPaid
                      ? '#10b981'
                      : 'var(--text-primary)',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{displayMember}</span>
                  {isPayer ? (
                    <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>(Payer)</span>
                  ) : isPaid ? (
                    <CheckCircle2 size={14} color="#10b981" />
                  ) : owedAmount > 0 ? (
                    <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#f59e0b' }}>
                      {formatMoney(owedAmount, currencySymbol)}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Expanded Personalized Recipient Action Card */}
          {selectedRecipient && selectedRecipient !== paidBy && (
            (() => {
              const recipientSettlement = settlements.find((s) => s.from === selectedRecipient);
              const owed = recipientSettlement?.amount || 0;
              const isPaid = settledDebts[selectedRecipient];
              const payeeDisplayName = (isFromShare || previewRecipientMode) && paidBy === 'You' ? 'Bill Host' : paidBy;
              const recipientDisplayName = (isFromShare || previewRecipientMode) && selectedRecipient === 'You' ? 'Bill Host' : selectedRecipient;
              const uri = upiId.trim()
                ? buildUpiUri(upiId, paidBy, owed, `Split for ${eventName.trim() || 'bill'}`)
                : '';

              return (
                <div
                  style={{
                    marginTop: '4px',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        Hi <strong>{recipientDisplayName}</strong>! You owe <strong>{payeeDisplayName}</strong>:
                      </div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: isPaid ? '#10b981' : '#f59e0b', marginTop: '2px' }} className="num-tabular">
                        {formatMoney(owed, currencySymbol)} {isPaid && '✓ (Marked Settled)'}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      {/* Mark as paid toggle */}
                      <button
                        type="button"
                        onClick={() => setSettledDebts((prev) => ({ ...prev, [selectedRecipient]: !prev[selectedRecipient] }))}
                        style={{
                          padding: '9px 15px',
                          borderRadius: '10px',
                          border: isPaid ? '1.5px solid #10b981' : '1px solid var(--border-subtle)',
                          background: isPaid ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                          color: isPaid ? '#10b981' : 'var(--text-secondary)',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <CheckCircle2 size={16} color={isPaid ? '#10b981' : 'var(--text-muted)'} />
                        <span>{isPaid ? 'Settled' : 'Mark as Paid'}</span>
                      </button>

                      {/* 1-Tap Pay Button */}
                      {owed > 0 && !isPaid && (
                        upiId.trim() ? (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveUpiModal({
                                from: selectedRecipient,
                                to: paidBy,
                                amount: owed,
                                upiUri: uri,
                                upiId: upiId.trim(),
                              });
                              if (/android|iphone|ipad/i.test(navigator.userAgent)) {
                                window.location.href = uri;
                              }
                            }}
                            style={{
                              padding: '9px 20px',
                              borderRadius: '10px',
                              border: 'none',
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              color: '#ffffff',
                              fontSize: '0.88rem',
                              fontWeight: 800,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                            }}
                          >
                            <Zap size={16} /> Pay {formatMoney(owed, currencySymbol)} via UPI
                          </button>
                        ) : (
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span>(Add payee UPI ID to enable 1-tap payment)</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}

      {/* Main Two-Column Interactive Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '28px',
          alignItems: 'start',
        }}
      >
        {/* ========================================================= */}
        {/* LEFT COLUMN: Bill Details & Participants Configurator      */}
        {/* ========================================================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Bill Setup Card */}
          <div
            style={{
              padding: 'clamp(22px, 3vw, 30px)',
              borderRadius: '24px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
            }}
          >
            {/* Event Name & Preset Chips */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Bill Title
                </label>
              </div>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="What is this expense for?"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
              />

              {/* Quick Presets */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                {EVENT_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setEventName(`${preset.label} with Friends`)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      background: eventName.toLowerCase().includes(preset.label.toLowerCase()) ? 'rgba(99, 102, 241, 0.18)' : 'var(--bg-surface-elevated)',
                      color: eventName.toLowerCase().includes(preset.label.toLowerCase()) ? 'var(--primary)' : 'var(--text-muted)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Amount Input Display */}
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                Total Bill Amount
              </label>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: '16px',
                  border: '1.5px solid var(--border-subtle)',
                  padding: '6px 16px',
                  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.05)',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginRight: '8px' }}>
                  {currencySymbol}
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '1.85rem',
                    fontWeight: 800,
                    outline: 'none',
                    letterSpacing: '-0.02em',
                  }}
                  className="num-tabular"
                />
              </div>
            </div>

            {/* Taxes & Tips Quick Chips */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Taxes &amp; Service Charge
                </label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setTaxTipType('PERCENT')}
                    style={{
                      padding: '2px 8px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      backgroundColor: taxTipType === 'PERCENT' ? 'var(--primary)' : 'var(--bg-surface-elevated)',
                      color: taxTipType === 'PERCENT' ? '#ffffff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    %
                  </button>
                  <button
                    type="button"
                    onClick={() => setTaxTipType('FLAT')}
                    style={{
                      padding: '2px 8px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      backgroundColor: taxTipType === 'FLAT' ? 'var(--primary)' : 'var(--bg-surface-elevated)',
                      color: taxTipType === 'FLAT' ? '#ffffff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    {currencySymbol}
                  </button>
                </div>
              </div>

              {/* Preset buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                {TAX_PRESETS.map((p) => {
                  const isSelected = taxTipType === 'PERCENT' && taxTipValue === p.value && !isCustomTaxOpen;
                  return (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        setTaxTipType('PERCENT');
                        setTaxTipValue(p.value);
                        setIsCustomTaxOpen(false);
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '10px',
                        border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-surface-elevated)',
                        color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {p.label}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setIsCustomTaxOpen(!isCustomTaxOpen)}
                  aria-label="Toggle custom tax or tip percentage"
                  aria-expanded={isCustomTaxOpen}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '10px',
                    border: isCustomTaxOpen ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                    background: isCustomTaxOpen ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-surface-elevated)',
                    color: isCustomTaxOpen ? '#ffffff' : 'var(--text-secondary)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Custom
                </button>
              </div>

              {isCustomTaxOpen && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <input
                    type="number"
                    min="0"
                    value={taxTipValue}
                    onChange={(e) => setTaxTipValue(e.target.value)}
                    placeholder={taxTipType === 'PERCENT' ? 'Percentage (e.g. 5)' : 'Amount (e.g. 150)'}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {taxTipType === 'PERCENT' ? '%' : currencySymbol}
                  </span>
                </div>
              )}
            </div>

            {/* Grand Total Highlight Badge */}
            <div
              style={{
                padding: '16px 20px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.14) 0%, rgba(16, 185, 129, 0.08) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Grand Total
                </span>
                <div style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }} className="num-tabular">
                  {formatMoney(grandTotal, currencySymbol)}
                </div>
              </div>

              {extraAmount > 0 && (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>INCLUDES TAX/TIP</span>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#10b981' }}>
                    +{formatMoney(extraAmount, currencySymbol)}
                  </div>
                </div>
              )}
            </div>

            {/* Payee UPI ID Input */}
            <div style={{ paddingTop: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={14} color="#f59e0b" /> Payee UPI ID (Optional for 1-Tap Pay)
                </label>
                {upiId.trim() && (
                  <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <Check size={12} /> 1-Tap Active
                  </span>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm"
                  style={{
                    width: '100%',
                    padding: '11px 15px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: upiId.trim() ? '1.5px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                  onBlur={(e) => (e.target.style.borderColor = upiId.trim() ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-subtle)')}
                />
              </div>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '6px', margin: 0, lineHeight: 1.4 }}>
                Enables 1-tap UPI buttons on WhatsApp and this page so friends can settle in seconds via Google Pay, PhonePe, Paytm, or CRED.
              </p>

              {/* 1-Tap Smart Suggestion to Rename "You" */}
              {suggestedNameFromUpi && members.some((m) => m.toLowerCase() === 'you' || m.toLowerCase().startsWith('you ')) && (
                <div
                  style={{
                    marginTop: '8px',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    background: 'rgba(99, 102, 241, 0.12)',
                    border: '1px solid rgba(99, 102, 241, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    💡 Set payee name to <strong>{suggestedNameFromUpi}</strong> for clear receipts?
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const youMember = members.find((m) => m.toLowerCase() === 'you' || m.toLowerCase().startsWith('you '));
                      if (youMember) handleRenameMember(youMember, suggestedNameFromUpi);
                    }}
                    style={{
                      padding: '3px 10px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--primary-btn)',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Rename &quot;You&quot;
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Friends & Payer Selection Card */}
          <div
            style={{
              padding: 'clamp(22px, 3vw, 30px)',
              borderRadius: '24px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={18} color="var(--primary)" />
                  Group Members ({members.length})
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px' }}>
                  Tap avatar to select payer • Click pencil to rename &quot;You&quot; or friends
                </p>
              </div>
            </div>

            {errorMsg && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                {errorMsg}
              </div>
            )}

            {/* Member Avatar Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
              {members.map((member) => {
                const isPayer = paidBy === member;
                const initial = member.charAt(0).toUpperCase();

                return (
                  <div
                    key={member}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${member} as payer`}
                    onClick={() => setPaidBy(member)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setPaidBy(member);
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '14px',
                      backgroundColor: isPayer ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-surface-elevated)',
                      border: isPayer ? '1.5px solid #10b981' : '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative',
                      boxShadow: isPayer ? '0 4px 14px rgba(16, 185, 129, 0.2)' : 'none',
                    }}
                  >
                    {/* Circle Avatar with Initials */}
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: getAvatarGradient(member, isPayer),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {initial}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      {editingMember?.original === member ? (
                        <input
                          type="text"
                          value={editingMember.current}
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => setEditingMember({ ...editingMember, current: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleRenameMember(editingMember.original, editingMember.current);
                            } else if (e.key === 'Escape') {
                              setEditingMember(null);
                            }
                          }}
                          onBlur={() => handleRenameMember(editingMember.original, editingMember.current)}
                          style={{
                            width: '100%',
                            padding: '2px 6px',
                            borderRadius: '6px',
                            border: '1.5px solid var(--primary)',
                            background: 'var(--bg-surface-elevated)',
                            color: 'var(--text-primary)',
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            outline: 'none',
                          }}
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span
                            style={{
                              fontSize: '0.88rem',
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {member}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingMember({ original: member, current: member });
                            }}
                            title={`Rename ${member}`}
                            aria-label={`Rename ${member}`}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                              padding: '2px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              opacity: 0.7,
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                            onMouseOut={(e) => (e.currentTarget.style.opacity = '0.7')}
                          >
                            <Edit2 size={11} />
                          </button>
                        </div>
                      )}
                      <div style={{ fontSize: '0.7rem', color: isPayer ? '#10b981' : 'var(--text-muted)', fontWeight: 600 }}>
                        {isPayer ? '👑 Paid Upfront' : 'Member'}
                      </div>
                    </div>

                    {members.length > 2 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveMember(member);
                        }}
                        title={`Remove ${member}`}
                        aria-label={`Remove ${member} from bill split`}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '2px',
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Add Member Field */}
            <form onSubmit={handleAddMember} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={newMemberInput}
                onChange={(e) => setNewMemberInput(e.target.value)}
                placeholder="Add friend's name..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
              <Button variant="secondary" size="md" type="submit" icon={<Plus size={16} />}>
                Add
              </Button>
            </form>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: The Digital Split Receipt Card              */}
        {/* ========================================================= */}
        <div style={{ position: 'sticky', top: '90px' }}>
          <div
            style={{
              borderRadius: '26px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Receipt Decorative Header */}
            <div
              style={{
                padding: '24px 26px 18px',
                background: 'linear-gradient(180deg, var(--primary-surface) 0%, transparent 100%)',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  <Receipt size={14} /> Split Receipt
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  {eventName || 'Group Split'}
                </h3>
              </div>

              {/* Mode Switcher */}
              <div style={{ display: 'flex', backgroundColor: 'var(--bg-surface-elevated)', borderRadius: '10px', padding: '3px', border: '1px solid var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={() => setSplitMode('EQUAL')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    backgroundColor: splitMode === 'EQUAL' ? 'var(--primary)' : 'transparent',
                    color: splitMode === 'EQUAL' ? '#ffffff' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                  }}
                >
                  Equally
                </button>
                <button
                  type="button"
                  onClick={() => setSplitMode('CUSTOM')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    backgroundColor: splitMode === 'CUSTOM' ? 'var(--primary)' : 'transparent',
                    color: splitMode === 'CUSTOM' ? '#ffffff' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                  }}
                >
                  Itemized
                </button>
              </div>
            </div>

            <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Itemized custom share inputs if active */}
              {splitMode === 'CUSTOM' && (
                <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    Enter pre-tax item subtotals for each person. Taxes are applied proportionally:
                  </p>
                  {members.map((name) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{name}</span>
                      <div style={{ position: 'relative', width: '120px' }}>
                        <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                          {currencySymbol}
                        </span>
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={customShares[name] || ''}
                          onChange={(e) => setCustomShares({ ...customShares, [name]: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '6px 10px 6px 24px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--bg-surface-elevated)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-primary)',
                            fontSize: '0.88rem',
                            textAlign: 'right',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Individual Shares List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Individual Shares ({members.length} people)
                </span>

                {splitResults.map((r) => {
                  const initial = r.name.charAt(0).toUpperCase();

                  return (
                    <div
                      key={r.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '14px',
                        backgroundColor: r.isPayer ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-surface-elevated)',
                        border: r.isPayer ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid var(--border-subtle)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: getAvatarGradient(r.name, r.isPayer),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                          }}
                        >
                          {initial}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {r.name}
                          </div>
                          {r.isPayer && (
                            <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>
                              Paid upfront ({formatMoney(grandTotal, currencySymbol)})
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: r.isPayer ? '#10b981' : 'var(--text-primary)' }} className="num-tabular">
                          {formatMoney(r.owed, currencySymbol)}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {grandTotal > 0 ? `${Math.round((r.owed / grandTotal) * 100)}% of total` : ''}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Settlements Flow (Who Pays Whom) */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Settlement Plan
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>
                    {settlements.length} Payment{settlements.length === 1 ? '' : 's'} to Zero
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {settlements.length > 0 ? (
                    settlements.map((s, idx) => {
                      const isSettled = settledDebts[s.from];
                      const uri = upiId.trim() && s.to === paidBy
                        ? buildUpiUri(upiId, paidBy, s.amount, `Split for ${eventName.trim() || 'bill'}`)
                        : '';

                      return (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            borderRadius: '12px',
                            backgroundColor: isSettled ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-surface-elevated)',
                            border: isSettled ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                            fontSize: '0.88rem',
                            flexWrap: 'wrap',
                            gap: '8px',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                            <strong style={{ color: isSettled ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: isSettled ? 'line-through' : 'none' }}>
                              {s.from}
                            </strong>
                            <ArrowRight size={13} color="var(--primary)" />
                            <strong style={{ color: isSettled ? 'var(--text-muted)' : '#10b981' }}>{s.to}</strong>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span
                              style={{
                                fontWeight: 800,
                                color: isSettled ? '#10b981' : '#f59e0b',
                                textDecoration: isSettled ? 'line-through' : 'none',
                              }}
                              className="num-tabular"
                            >
                              {formatMoney(s.amount, currencySymbol)}
                            </span>

                            {isSettled ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                  <CheckCircle2 size={13} /> Paid
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setSettledDebts((prev) => ({ ...prev, [s.from]: false }))}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.7rem',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    padding: '2px',
                                  }}
                                >
                                  Undo
                                </button>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                {uri && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveUpiModal({
                                        from: s.from,
                                        to: s.to,
                                        amount: s.amount,
                                        upiUri: uri,
                                        upiId: upiId.trim(),
                                      });
                                      if (/android|iphone|ipad/i.test(navigator.userAgent)) {
                                        window.location.href = uri;
                                      }
                                    }}
                                    style={{
                                      padding: '4px 10px',
                                      borderRadius: '8px',
                                      border: 'none',
                                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                      color: '#ffffff',
                                      fontSize: '0.74rem',
                                      fontWeight: 800,
                                      cursor: 'pointer',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)',
                                    }}
                                  >
                                    <Zap size={12} /> 1-Tap Pay
                                  </button>
                                )}
                                <button
                                  type="button"
                                  title={`Mark ${s.from}'s payment as received`}
                                  onClick={() => setSettledDebts((prev) => ({ ...prev, [s.from]: true }))}
                                  style={{
                                    padding: '4px 8px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-subtle)',
                                    background: 'transparent',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.74rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                  }}
                                >
                                  Mark Paid
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '0.88rem', fontWeight: 600 }}>
                      <CheckCircle2 size={16} /> All accounts are settled!
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
                <button
                  onClick={handleShareWhatsApp}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    borderRadius: '16px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <MessageCircle size={20} />
                  Share Receipt to WhatsApp
                </button>

                {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                  <button
                    type="button"
                    onClick={handleNativeShare}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(99, 102, 241, 0.12)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      color: 'var(--primary)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <Share2 size={16} /> Share via Phone (Telegram, SMS, Apps)
                  </button>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    onClick={handleCopyClipboard}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      color: copiedSummary ? '#10b981' : 'var(--text-secondary)',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {copiedSummary ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                    <span>{copiedSummary ? 'Copied Text' : 'Copy Text'}</span>
                  </button>

                  <button
                    onClick={handleCopyLinkOnly}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      color: copiedLink ? '#10b981' : 'var(--text-secondary)',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {copiedLink ? <Check size={15} color="#10b981" /> : <Link2 size={15} />}
                    <span>{copiedLink ? 'Link Copied' : 'Share Link'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const nextMode = !previewRecipientMode;
                    setPreviewRecipientMode(nextMode);
                    if (nextMode) {
                      requestAnimationFrame(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      });
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: previewRecipientMode ? '#10b981' : 'var(--text-muted)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '6px',
                    marginTop: '2px',
                    textDecoration: 'underline',
                  }}
                >
                  {previewRecipientMode ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>
                    {previewRecipientMode
                      ? 'Exit Friend View Preview'
                      : "Preview Friend's View (Test how it looks when shared)"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product-Led Growth (PLG) Viral Multiplier Banner */}
      <div
        style={{
          marginTop: '12px',
          padding: 'clamp(20px, 3vw, 28px)',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              <Sparkles size={14} /> Product-Led Growth • 100% Free
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
              Split Your Own Bills Free with Pocket Advisor
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
              Never deal with messy spreadsheets or awkward money reminders again. Pocket Advisor minimizes group transfers, generates 1-tap UPI WhatsApp receipts, and automatically detects expenses from bank SMS alerts on Android.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => {
                setEventName('Dinner with Friends');
                setBillAmount('2400');
                setTaxTipValue('5');
                setTaxTipType('PERCENT');
                setMembers(['You', 'Aman', 'Priya', 'Rahul']);
                setPaidBy('You');
                setSplitMode('EQUAL');
                setCustomShares({});
                setUpiId('');
                setSelectedRecipient(null);
                setSettledDebts({});
              }}
              style={{
                padding: '10px 16px',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Start Fresh Split
            </button>

            {/* <a
              href="https://play.google.com/store/apps/details?id=com.pocketadvisor.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 18px',
                borderRadius: '12px',
                background: 'var(--primary-gradient)',
                color: '#ffffff',
                fontSize: '0.84rem',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
              }}
            >
              <Smartphone size={16} /> Get Android App
            </a> */}
          </div>
        </div>
      </div>

      {/* UPI 1-Tap QR & Settlement Modal Dialog */}
      {activeUpiModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="upi-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          onClick={() => setActiveUpiModal(null)}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: '24px',
              border: '1.5px solid rgba(99, 102, 241, 0.35)',
              padding: '28px',
              maxWidth: '380px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveUpiModal(null)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '1.2rem',
                fontWeight: 800,
                cursor: 'pointer',
                padding: '4px 8px',
              }}
            >
              ✕
            </button>

            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                marginBottom: '14px',
                boxShadow: '0 6px 18px rgba(16, 185, 129, 0.4)',
              }}
            >
              <Zap size={24} />
            </div>

            <h3 id="upi-modal-title" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
              Instant UPI Settle
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
              {activeUpiModal.from} paying to <strong>{activeUpiModal.to}</strong>
            </p>

            {/* Amount Callout */}
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#10b981',
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}
              className="num-tabular"
            >
              {formatMoney(activeUpiModal.amount, currencySymbol)}
            </div>

            {/* Scannable Dynamic QR Code */}
            <div
              style={{
                width: '180px',
                height: '180px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                marginBottom: '16px',
              }}
            >
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(activeUpiModal.upiUri)}`}
                alt="Scan with GPay, PhonePe, Paytm, CRED or any UPI App to pay"
                width="160"
                height="160"
                style={{ width: '100%', height: '100%', borderRadius: '8px' }}
              />
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 14px 0' }}>
              Scan with camera or any UPI app on your phone
            </p>

            {/* UPI ID Copy Field */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '14px',
              }}
            >
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '220px' }}>
                {activeUpiModal.upiId}
              </span>
              <button
                type="button"
                onClick={async () => {
                  const success = await copyToClipboard(activeUpiModal.upiId);
                  if (success) {
                    setCopiedModalUpi(true);
                    setTimeout(() => setCopiedModalUpi(false), 2000);
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: copiedModalUpi ? '#10b981' : 'var(--primary)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {copiedModalUpi ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedModalUpi ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href={activeUpiModal.upiUri}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                }}
              >
                <Smartphone size={16} /> Open in UPI App
              </a>

              <button
                type="button"
                onClick={() => {
                  setSettledDebts((prev) => ({ ...prev, [activeUpiModal.from]: true }));
                  setActiveUpiModal(null);
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '12px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                }}
              >
                Mark as Settled
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
