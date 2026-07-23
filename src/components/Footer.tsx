import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Clock
} from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterSignup';
import { useCategories, useStoreSettings } from '@/hooks/useStoreData';
import { openAnalyticsChoices } from '@/lib/privacyChoices';
import { trackEvent } from '@/lib/analytics';

const Footer = () => {
  const { data: settings } = useStoreSettings();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const supportEmail = settings?.supportEmail || 'aacharitiwari@gmail.com';
  const supportPhone = settings?.supportPhone || '+919877031481';
  const phoneHref = `tel:${supportPhone.replace(/[^+\d]/g, '')}`;
  const currentYear = new Date().getFullYear();
  const trackSocial = (platform: string) => { void trackEvent('social_click', { platform, location: 'footer' }); };

  return (
    <footer className="bg-[#11240b] text-white">
      {/* Newsletter Section */}
      <div className="border-y border-[#c88a2b]/30 bg-[#17320d]">
        <div className="container mx-auto px-4 py-12">
          <NewsletterSignup
            source="footer"
            variant="band"
            title="Letters from the Achari kitchen"
            description="New batches, seasonal recipes and quiet pantry notes, sent occasionally."
          />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(140px,.8fr)_minmax(170px,1fr)_minmax(260px,1.25fr)]">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-24 w-24 overflow-hidden rounded-lg border border-[#c88a2b]/50 bg-[#fff8ed] shadow-glow">
                <img 
                  src="/brand/achari-tiwari-logo.png" 
                  alt="Achari Tiwari Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-display text-3xl text-white">Achari Tiwari</h3>
                <p className="text-sm uppercase tracking-[0.18em] text-[#e7bd78]">Taste of tradition</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed max-w-md">
              Traditional Indian pickles and aachar, thoughtfully prepared and carefully packed for tables across India.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/aacharitiwari" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocial('facebook')}
                aria-label="Follow Achari Tiwari on Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-800 transition-all duration-300 hover:scale-105 hover:bg-[#8f1715] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17320d]"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/aacharitiwari/" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocial('instagram')}
                aria-label="Follow Achari Tiwari on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-800 transition-all duration-300 hover:scale-105 hover:bg-[#8f1715] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17320d]"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/AachariTiwari" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocial('x')}
                aria-label="Follow Achari Tiwari on X"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-800 transition-all duration-300 hover:scale-105 hover:bg-[#8f1715] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17320d]"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.youtube.com/@Aacharitiwari" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocial('youtube')}
                aria-label="Subscribe to Achari Tiwari on YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-800 transition-all duration-300 hover:scale-105 hover:bg-[#8f1715] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17320d]"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-lg font-bold leading-7 text-white">Quick Links</h4>
            <ul className="space-y-1">
              {[
                { name: 'Home', href: '/' },
                { name: 'Products', href: '/products' },
                { name: 'Blog', href: '/blog' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'Reviews', href: '/reviews' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href} 
                    className="inline-flex py-1.5 text-gray-200 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-5 text-lg font-bold leading-7 text-white">Categories</h4>
            <ul className="space-y-1">
              {categoriesLoading ? Array.from({ length: 4 }).map((_, index) => (
                <li key={index} className="h-11 animate-pulse bg-white/10" aria-hidden="true" />
              )) : categories.length ? categories.map((category) => (
                <li key={category._id}>
                  <Link
                    to={`/products?category=${encodeURIComponent(category.slug)}`}
                    className="inline-flex py-1.5 text-gray-200 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  >
                    {category.name}
                  </Link>
                </li>
              )) : <li className="text-sm leading-6 text-gray-400">{categoriesError ? 'Categories are temporarily unavailable.' : 'New categories are coming soon.'}</li>}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-5 text-lg font-bold leading-7 text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#e7bd78]" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Corporate office: Saket, New Delhi<br />
                    Manufacturing: Gopalganj, Bihar<br />
                    Serving customers across India
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-[#e7bd78]" />
                <div>
                  <a href={phoneHref} onClick={() => { void trackEvent('contact_click', { method: 'phone', location: 'footer' }); }} className="inline-flex py-1 text-sm text-gray-200 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">{supportPhone}</a>
                  <p className="text-gray-300 text-xs">Mon-Sat 9AM-7PM</p>
                </div>
              </div>
              
              <div className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-[#e7bd78]" />
                <div>
                  <a href={`mailto:${supportEmail}`} onClick={() => { void trackEvent('contact_click', { method: 'email', location: 'footer' }); }} className="inline-flex break-all py-1 text-sm text-gray-200 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">{supportEmail}</a>
                  <p className="text-gray-300 text-xs">Email support</p>
                </div>
              </div>
              
              <div className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-3">
                <Clock className="mt-1 h-5 w-5 text-[#e7bd78]" />
                <div>
                  <p className="text-gray-300 text-sm font-medium">Business Hours</p>
                  <p className="text-gray-300 text-xs">
                    Mon-Sat: 9:00 AM - 7:00 PM<br />
                    Sunday: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-10 border-t border-gray-700 pt-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-gray-300 text-sm">Payment options:</span>
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold"><span className="rounded border border-[#c88a2b]/50 px-3 py-1">UPI</span><span className="rounded border border-[#c88a2b]/50 px-3 py-1">Cash on Delivery</span></div>
            </div>
            
            <div className="text-sm text-gray-300">
              🔒 Secure SSL Encrypted Payments
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/50 border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <p className="text-sm text-gray-300">
              © {currentYear} AachariTiwari. All rights reserved. Made with ❤️ in India.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 md:justify-end">
              <Link to="/privacy-policy" className="inline-flex min-h-11 items-center text-sm text-gray-300 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="inline-flex min-h-11 items-center text-sm text-gray-300 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
                Terms of Service
              </Link>
              <Link to="/shipping-policy" className="inline-flex min-h-11 items-center text-sm text-gray-300 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
                Shipping Policy
              </Link>
              <Link to="/refund-policy" className="inline-flex min-h-11 items-center text-sm text-gray-300 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
                Refund Policy
              </Link>
              <button type="button" onClick={openAnalyticsChoices} className="min-h-11 text-sm text-gray-300 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
                Privacy choices
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
