// Privacy-first Analytics integration for ENNAVAL
// Respects user cookie consent preferences. Only tracks when consent is explicitly granted.

export interface AnalyticsEvent {
  name: 
    | 'page_view'
    | 'collection_view'
    | 'product_view'
    | 'search'
    | 'wishlist_toggle'
    | 'add_to_cart'
    | 'whatsapp_enquiry'
    | 'contact_form_submit';
  params?: Record<string, any>;
}

const COOKIE_PREFS_KEY = 'ennaval_cookie_consent_v1';

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(COOKIE_PREFS_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed.analytics && parsed.hasConsented);
  } catch {
    return false;
  }
}

export function trackEvent(event: AnalyticsEvent): void {
  // Check if consent has been given
  if (!hasAnalyticsConsent()) {
    return;
  }

  const measurementId = import.meta.env.VITE_ANALYTICS_ID;

  // In development or when no measurement ID is configured, log in console for debugging
  if (import.meta.env.DEV) {
    console.debug(`[ENNAVAL Analytics Event]`, event.name, event.params);
  }

  // If a real GA4 / privacy analytics provider is configured via env variable:
  if (measurementId && typeof window !== 'undefined') {
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('event', event.name, event.params);
    }
  }

  // Dispatch a CustomEvent for custom web telemetry / backend listening
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ennaval:analytics', { detail: event }));
  }
}
