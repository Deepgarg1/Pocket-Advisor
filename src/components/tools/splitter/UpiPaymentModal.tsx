import React, { useState } from 'react';
import { Zap, Check, Copy, Smartphone } from 'lucide-react';
import { formatMoney } from '../../../utils/formatters';

export interface ActiveUpiModalData {
  from: string;
  to: string;
  amount: number;
  upiUri: string;
  upiId: string;
}

interface UpiPaymentModalProps {
  modalData: ActiveUpiModalData;
  currencySymbol: string;
  onClose: () => void;
  onMarkSettled: (from: string) => void;
}

export const UpiPaymentModal: React.FC<UpiPaymentModalProps> = ({
  modalData,
  currencySymbol,
  onClose,
  onMarkSettled,
}) => {
  const [copiedModalUpi, setCopiedModalUpi] = useState(false);

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(modalData.upiId);
      setCopiedModalUpi(true);
      setTimeout(() => setCopiedModalUpi(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
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
      onClick={onClose}
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
          onClick={onClose}
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
          {modalData.from} paying to <strong>{modalData.to}</strong>
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
          {formatMoney(modalData.amount, currencySymbol)}
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
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(modalData.upiUri)}`}
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
            {modalData.upiId}
          </span>
          <button
            type="button"
            onClick={handleCopyUpi}
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
            href={modalData.upiUri}
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
            onClick={() => onMarkSettled(modalData.from)}
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
  );
};
