import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { privacyPolicyHtml } from '../../data/privacyPolicyHtml';

interface PrivacyPolicyViewProps {
  onBack: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onBack }) => {
  useEffect(() => {
    const handle = requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <main style={{ maxWidth: '980px', margin: '0 auto', padding: '30px 24px 80px', width: '100%' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-start' }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', padding: '4px 0' }}>
          <ArrowLeft size={18} /> Back to Overview
        </button>
      </div>
      <header style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)', borderRadius: '24px', border: '1px solid var(--border-subtle)', padding: 'clamp(22px, 5vw, 36px)', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'var(--primary-surface)', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '12px' }}>
          <ShieldCheck size={14} /> Official Privacy &amp; Data Policy
        </div>
        <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>This Privacy Policy explains how Pocket Advisor collects, uses, stores, and shares information when you use our app and services, and describes the choices available to you.</p>
      </header>
      <article className="privacy-policy-markdown" style={{ backgroundColor: 'var(--bg-surface)', borderRadius: '24px', border: '1px solid var(--border-subtle)', padding: 'clamp(20px, 5vw, 40px)', color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.95rem', overflowWrap: 'anywhere' }} dangerouslySetInnerHTML={{ __html: privacyPolicyHtml }} />
      <style>{`
        .privacy-policy-markdown h1,.privacy-policy-markdown h2,.privacy-policy-markdown h3 { color: var(--text-primary); line-height: 1.3; }
        .privacy-policy-markdown h1 { font-size: clamp(1.7rem, 4vw, 2.25rem); margin: 0 0 18px; letter-spacing: -0.025em; }
        .privacy-policy-markdown h2 { font-size: 1.35rem; margin: 32px 0 12px; }
        .privacy-policy-markdown h3 { font-size: 1.08rem; margin: 22px 0 10px; }
        .privacy-policy-markdown p { margin: 10px 0; }
        .privacy-policy-markdown ul,.privacy-policy-markdown ol { padding-left: 24px; margin: 10px 0 18px; }
        .privacy-policy-markdown li { padding-left: 3px; margin: 5px 0; }
        .privacy-policy-markdown a { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; }
        .privacy-policy-markdown code { background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: 5px; padding: 2px 5px; font-size: .88em; }
        .privacy-policy-markdown hr { border: 0; border-top: 1px solid var(--border-subtle); margin: 24px 0; }
        @media (max-width: 600px) { .privacy-policy-markdown { border-radius: 16px !important; } }
      `}</style>
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Button variant="secondary" size="md" onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> Back to Home
        </Button>
      </div>
    </main>
  );
};
