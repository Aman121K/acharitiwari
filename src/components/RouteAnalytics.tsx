import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

export default function RouteAnalytics() {
  const { pathname } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      void trackPageView(pathname, document.title);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
