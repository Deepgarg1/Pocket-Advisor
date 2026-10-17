const CONSENT_KEY = 'pocketadvisor_analytics_consent';
const MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-FP96084QTY').trim();

export type AnalyticsConsentChoice = 'granted' | 'denied' | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function isAnalyticsConfigured(): boolean {
  return /^G-[A-Z0-9]+$/i.test(MEASUREMENT_ID);
}

export function getAnalyticsConsent(): AnalyticsConsentChoice {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function initializeGoogleAnalytics(): void {
  if (!isAnalyticsConfigured() || typeof window === 'undefined') return;

  const currentConsent = getAnalyticsConsent();
  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };

    // Google Consent Mode v2: default cookieless measurement until user explicitly accepts
    window.gtag('consent', 'default', {
      analytics_storage: currentConsent === 'granted' ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });

    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, { send_page_view: false });
  }

  const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}"]`);
  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
    script.dataset.pocketAdvisorAnalytics = 'true';
    document.head.appendChild(script);
  }
}

export function trackPageView(): void {
  if (!isAnalyticsConfigured() || typeof window === 'undefined') return;
  const consent = getAnalyticsConsent();
  if (consent === 'denied') return;

  initializeGoogleAnalytics();
  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_path: window.location.pathname,
  });
}

export function setAnalyticsConsent(choice: Exclude<AnalyticsConsentChoice, null>): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Ignore storage errors in private browsing modes
  }

  initializeGoogleAnalytics();

  if (choice === 'granted') {
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    trackPageView();
    return;
  }

  // Denied: revoke analytics storage and do not send subsequent page views
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
}
