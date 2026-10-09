import React, { useEffect, useState } from 'react';
import {
  getAnalyticsConsent,
  isAnalyticsConfigured,
  setAnalyticsConsent,
  type AnalyticsConsentChoice,
} from '../../utils/analytics';

export const AnalyticsConsent: React.FC = () => {
  const [choice, setChoice] = useState<AnalyticsConsentChoice>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (isAnalyticsConfigured()) setChoice(getAnalyticsConsent());
  }, []);

  if (!isAnalyticsConfigured()) return null;

  const choose = (nextChoice: Exclude<AnalyticsConsentChoice, null>) => {
    setAnalyticsConsent(nextChoice);
    setChoice(nextChoice);
    setShowSettings(false);
  };

  return (
    <>
      {choice === null ? (
        <aside
          aria-label="Analytics privacy preferences"
          style={{
            position: 'fixed',
            left: '16px',
            right: '16px',
            bottom: 'calc(92px + env(safe-area-inset-bottom, 0px))',
            zIndex: 1000,
            maxWidth: '560px',
            margin: '0 auto',
            padding: '18px',
            borderRadius: '16px',
            border: '1px solid var(--border-subtle)',
            background: '#111827',
            color: '#f8fafc',
            boxShadow: '0 12px 36px rgba(0,0,0,0.35)',
          }}
        >
          <p style={{ margin: '0 0 8px', fontWeight: 800, fontSize: '0.98rem' }}>
            Your analytics preferences
          </p>
          <p style={{ margin: '0 0 14px', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.55 }}>
            Pocket Advisor can use Google Analytics to understand website visits and improve the site.
            Analytics is off unless you accept. This does not access your app expenses or financial records.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <button
              type="button"
              onClick={() => choose('granted')}
              style={{ border: 0, borderRadius: '10px', padding: '10px 14px', background: '#6366f1', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
            >
              Accept analytics
            </button>
            <button
              type="button"
              onClick={() => choose('denied')}
              style={{ border: '1px solid #64748b', borderRadius: '10px', padding: '10px 14px', background: 'transparent', color: '#f8fafc', fontWeight: 700, cursor: 'pointer' }}
            >
              Reject
            </button>
            <a href="/privacy" style={{ alignSelf: 'center', color: '#c7d2fe', fontSize: '0.86rem' }}>
              Privacy policy
            </a>
          </div>
        </aside>
      ) : (
        <div style={{ position: 'fixed', left: '12px', bottom: 'calc(88px + env(safe-area-inset-bottom, 0px))', zIndex: 999 }}>
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            aria-expanded={showSettings}
            style={{ border: '1px solid #475569', borderRadius: '999px', padding: '8px 12px', background: '#111827', color: '#e2e8f0', fontSize: '0.78rem', cursor: 'pointer' }}
          >
            Privacy settings
          </button>
          {showSettings && (
            <div style={{ marginTop: '8px', padding: '12px', borderRadius: '12px', background: '#111827', border: '1px solid #475569', color: '#f8fafc', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
              <p style={{ margin: '0 0 10px', fontSize: '0.82rem' }}>
                Analytics: {choice === 'granted' ? 'accepted' : 'rejected'}
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" onClick={() => choose('granted')} style={{ border: 0, borderRadius: '8px', padding: '8px 10px', background: '#6366f1', color: '#fff', cursor: 'pointer' }}>Accept</button>
                <button type="button" onClick={() => choose('denied')} style={{ border: '1px solid #64748b', borderRadius: '8px', padding: '8px 10px', background: 'transparent', color: '#f8fafc', cursor: 'pointer' }}>Reject</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
