const CONSENT_KEY = 'pocketadvisor_analytics_consent';
const MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim();

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
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === 'granted' || value === 'denied' ? value : null;
}

function initializeGoogleAnalytics(): void {
  if (!isAnalyticsConfigured() || typeof window === 'undefined' || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
  script.dataset.pocketAdvisorAnalytics = 'true';
  document.head.appendChild(script);
}

export function trackPageView(): void {
  if (!isAnalyticsConfigured() || getAnalyticsConsent() !== 'granted') return;
  initializeGoogleAnalytics();
  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_path: window.location.pathname,
  });
}

export function setAnalyticsConsent(choice: Exclude<AnalyticsConsentChoice, null>): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CONSENT_KEY, choice);

  if (choice === 'granted') {
    initializeGoogleAnalytics();
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    trackPageView();
    return;
  }

  // If consent is withdrawn after analytics was enabled, stop subsequent measurement.
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
}
