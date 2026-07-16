import { useEffect, useState } from 'react';
import { BarChart3, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  ANALYTICS_CONSENT_EVENT,
  getAnalyticsConsent,
  setAnalyticsConsent,
} from '@/lib/analytics';
import { PRIVACY_CHOICES_EVENT } from '@/lib/privacyChoices';

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState(() => getAnalyticsConsent());
  const [choicesOpen, setChoicesOpen] = useState(false);

  useEffect(() => {
    const handleConsentChange = () => {
      setConsent(getAnalyticsConsent());
      setChoicesOpen(false);
    };
    const handleChoicesOpen = () => setChoicesOpen(true);

    window.addEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange);
    window.addEventListener(PRIVACY_CHOICES_EVENT, handleChoicesOpen);
    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange);
      window.removeEventListener(PRIVACY_CHOICES_EVENT, handleChoicesOpen);
    };
  }, []);

  if (consent !== null && !choicesOpen) return null;

  const choose = (choice: 'granted' | 'denied') => {
    setConsent(choice);
    setChoicesOpen(false);
    void setAnalyticsConsent(choice);
  };

  return (
    <aside
      role="region"
      aria-label="Analytics privacy choices"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-[#c99b56] bg-[#fff9ee] shadow-[0_-20px_55px_-32px_rgba(42,25,8,.75)]"
    >
      <div className="container mx-auto grid gap-5 px-4 py-5 sm:py-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8">
        <div className="flex items-start gap-3.5">
          <span aria-hidden="true" className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center border border-[#d8b985] bg-[#f4e3c5] text-primary">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Your privacy, your choice</p>
            <h2 className="mt-1 text-lg font-extrabold tracking-tight text-foreground sm:text-xl">Help us improve your visit</h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-6 text-muted-foreground">
              With your permission, Firebase and GA4 analytics help us understand which pages and products are useful. We do not intentionally send names, email addresses, phone numbers or form messages in analytics events.{' '}
              <Link to="/privacy-policy" className="font-bold text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Read our privacy policy</Link>.
            </p>
          </div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:min-w-[360px]">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="min-h-11 border border-primary bg-transparent px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Only necessary
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-[inset_0_-3px_0_rgba(0,0,0,.18)] transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <BarChart3 className="h-4 w-4" /> Accept analytics
          </button>
        </div>
      </div>
    </aside>
  );
}
