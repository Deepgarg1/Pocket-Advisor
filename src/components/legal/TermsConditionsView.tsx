import React, { useEffect } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '../common/Button';
import { termsConditionsHtml } from '../../data/termsConditionsHtml';

interface TermsConditionsViewProps {
  onBack: () => void;
}

export const TermsConditionsView: React.FC<TermsConditionsViewProps> = ({ onBack }) => {
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
      <header style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)', borderRadius: '24px', border: '1px solid var(--border-subtle)', padding: 'clamp(22px, 5vw, 36px)', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'var(--primary-surface)', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '12px' }}>
          <FileText size={14} /> Official Legal Agreement
        </div>
        <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>The terms governing your use of Pocket Advisor, including features, subscriptions, privacy, account security, and limitations.</p>
      </header>
      <article className="terms-conditions-markdown" style={{ backgroundColor: 'var(--bg-surface)', borderRadius: '24px', border: '1px solid var(--border-subtle)', padding: 'clamp(20px, 5vw, 40px)', color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.95rem', overflowWrap: 'anywhere' }} dangerouslySetInnerHTML={{ __html: termsConditionsHtml }} />
      <style>{`
        .terms-conditions-markdown h1,.terms-conditions-markdown h2,.terms-conditions-markdown h3,.terms-conditions-markdown h4 { color: var(--text-primary); line-height: 1.3; }
        .terms-conditions-markdown h1 { font-size: clamp(1.7rem, 4vw, 2.25rem); margin: 0 0 18px; letter-spacing: -0.025em; }
        .terms-conditions-markdown h2 { font-size: 1.5rem; margin: 30px 0 12px; }
        .terms-conditions-markdown h3 { font-size: 1.2rem; margin: 26px 0 10px; }
        .terms-conditions-markdown h4 { font-size: 1.05rem; margin: 20px 0 8px; }
        .terms-conditions-markdown p { margin: 10px 0; }
        .terms-conditions-markdown ul,.terms-conditions-markdown ol { padding-left: 24px; margin: 10px 0 18px; }
        .terms-conditions-markdown li { padding-left: 3px; margin: 5px 0; }
        .terms-conditions-markdown a { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; overflow-wrap: anywhere; }
        .terms-conditions-markdown code { background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: 5px; padding: 2px 5px; font-size: .88em; }
        .terms-conditions-markdown blockquote { margin: 16px 0; padding: 14px 18px; border-left: 3px solid var(--primary); background: var(--bg-app); border-radius: 0 10px 10px 0; }
        .terms-conditions-markdown blockquote p { margin: 6px 0; }
        .terms-conditions-markdown hr { border: 0; border-top: 1px solid var(--border-subtle); margin: 24px 0; }
        @media (max-width: 600px) { .terms-conditions-markdown { border-radius: 16px !important; } }
      `}</style>
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Button variant="secondary" size="md" onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> Back to Home
        </Button>
      </div>
    </main>
  );
};
