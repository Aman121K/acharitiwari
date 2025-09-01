import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * This component automatically scrolls the page to the top whenever the route changes.
 * It also handles hash-based navigation by scrolling to specific elements when a hash is present.
 * 
 * Usage: Place inside BrowserRouter to enable automatic scroll restoration.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, try to scroll to that element
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Otherwise, scroll to top
    // Use a small timeout to ensure the page has rendered
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };

    // Immediate scroll for instant feedback
    scrollToTop();
    
    // Also scroll after a small delay to ensure React has rendered
    const timeoutId = setTimeout(scrollToTop, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
