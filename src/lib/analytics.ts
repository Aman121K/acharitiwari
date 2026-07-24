import { getApp, getApps, initializeApp } from 'firebase/app';
import type { Analytics } from 'firebase/analytics';
import type { Product } from '@/contexts/CartContext';
import { firebaseConfig } from '@/lib/firebaseConfig';

export const ANALYTICS_CONSENT_KEY = 'achari-analytics-consent';
export const ANALYTICS_CONSENT_EVENT = 'achari:analytics-consent-changed';

type ConsentChoice = 'granted' | 'denied' | null;
type EventParameters = Record<string, unknown>;

const isConfigured = Boolean(
  firebaseConfig.apiKey
  && firebaseConfig.projectId
  && firebaseConfig.appId,
);

let analyticsPromise: Promise<Analytics | null> | null = null;
let lastPagePath = '';
let desiredUserId: string | null | undefined;
let appliedUserId: string | null | undefined;

function safeUserId(value: unknown): string | null | undefined {
  if (value === null) return null;
  if (typeof value !== 'string') return undefined;
  const userId = value.trim().slice(0, 256);
  if (!userId) return undefined;
  // User-ID must be an opaque internal identifier, never direct contact data.
  if (/\S+@\S+\.\S+/.test(userId) || /^\+?\d[\d\s-]{7,}\d$/.test(userId)) return undefined;
  return userId;
}

function getPersistedUserId(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const customer = JSON.parse(window.localStorage.getItem('customerUser') || 'null') as { id?: unknown } | null;
    const userId = safeUserId(customer?.id);
    return typeof userId === 'string' ? userId : undefined;
  } catch {
    return undefined;
  }
}

async function applyAnalyticsUserId(analytics: Analytics) {
  if (desiredUserId === undefined) desiredUserId = getPersistedUserId();
  if (desiredUserId === undefined || desiredUserId === appliedUserId) return;
  const { setUserId } = await import('firebase/analytics');
  setUserId(analytics, desiredUserId);
  appliedUserId = desiredUserId;
}

export function getAnalyticsConsent(): ConsentChoice {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return value === 'granted' || value === 'denied' ? value : null;
}

export async function setAnalyticsConsent(choice: Exclude<ConsentChoice, null>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, choice);

  if (choice === 'denied' && analyticsPromise) {
    const analytics = await analyticsPromise;
    if (analytics) {
      const { setAnalyticsCollectionEnabled } = await import('firebase/analytics');
      setAnalyticsCollectionEnabled(analytics, false);
    }
    lastPagePath = '';
  }

  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: choice }));
  if (choice === 'granted') {
    await loadAnalytics();
    await trackPageView(window.location.pathname, document.title);
  }
}

export function resetAnalyticsConsent() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: null }));
}

async function loadAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined' || !isConfigured || getAnalyticsConsent() !== 'granted') return null;
  if (analyticsPromise) {
    const analytics = await analyticsPromise;
    if (analytics) {
      const { setAnalyticsCollectionEnabled } = await import('firebase/analytics');
      setAnalyticsCollectionEnabled(analytics, true);
      await applyAnalyticsUserId(analytics);
    }
    return analytics;
  }

  analyticsPromise = (async () => {
    const { initializeAnalytics, isSupported, setAnalyticsCollectionEnabled } = await import('firebase/analytics');
    if (!await isSupported()) return null;
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const analytics = initializeAnalytics(app, { config: { send_page_view: false } });
    setAnalyticsCollectionEnabled(analytics, true);
    await applyAnalyticsUserId(analytics);
    return analytics;
  })().catch(() => null);

  return analyticsPromise;
}

export async function setAnalyticsUserId(userId: string | null) {
  const normalizedUserId = safeUserId(userId);
  if (normalizedUserId === undefined) return;
  desiredUserId = normalizedUserId;
  const analytics = await loadAnalytics();
  if (analytics) await applyAnalyticsUserId(analytics);
}

export async function trackEvent(name: string, parameters: EventParameters = {}) {
  const analytics = await loadAnalytics();
  if (!analytics) return;
  const { logEvent } = await import('firebase/analytics');
  logEvent(analytics, name, parameters);
}

export async function trackPageView(path: string, title: string) {
  const analytics = await loadAnalytics();
  if (!analytics || lastPagePath === path) return;
  lastPagePath = path;
  const { logEvent } = await import('firebase/analytics');
  logEvent(analytics, 'page_view', {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
    page_title: title,
  });
}

export const analyticsItem = (product: Product, quantity = 1, index?: number) => ({
  item_id: product.sku || product.id,
  item_name: product.name,
  item_brand: 'Achari Tiwari',
  item_category: product.category,
  item_category2: product.subCategory,
  item_variant: 'variantLabel' in product && typeof product.variantLabel==='string' ? product.variantLabel : product.weight,
  price: product.price,
  quantity,
  ...(typeof index === 'number' ? { index } : {}),
});

export function safeSearchTerm(value: string) {
  const term = value.trim().slice(0, 100);
  if (/\S+@\S+\.\S+/.test(term) || /(?:\+?\d[\d\s-]{7,}\d)/.test(term)) return '[redacted]';
  return term;
}

export const analyticsIsConfigured = isConfigured;
