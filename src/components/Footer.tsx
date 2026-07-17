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
  Clock,
  Shield,
  Award,
  Truck,
  CreditCard,
  ArrowRight,
  Star
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
    <footer className="mt-20 bg-[#17320d] text-white">
      {/* Newsletter Section */}
      <div className="border-y border-[#c88a2b]/30 bg-[#8f1715]">
        <div className="container mx-auto px-4 py-12">
          <NewsletterSignup
            source="footer"
            variant="band"
            title="Stay Updated with Our Latest Offers"
            description="Get first taste of new jars, seasonal offers and traditional recipes delivered from our kitchen to your inbox."
          />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-24 w-24 overflow-hidden rounded-lg border border-[#c88a2b]/50 bg-[#fff8ed] shadow-glow">
                <img 
                  src="/brand/achari-tiwari-logo.png" 
                  alt="Achari Tiwari Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-white">Achari Tiwari</h3>
                <p className="text-sm uppercase tracking-[0.18em] text-[#e7bd78]">Taste of tradition</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed max-w-md">
              Bringing you the finest traditional Indian pickles and aachar, made with love and authentic recipes passed down through generations. Experience the true taste of India.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300">100% Authentic</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-gray-300">Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-300">Customer Reviewed</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/aacharitiwari" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocial('facebook')}
                aria-label="Follow Achari Tiwari on Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-800 transition-all duration-300 hover:scale-105 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17320d]"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/aacharitiwari/" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocial('instagram')}
                aria-label="Follow Achari Tiwari on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-800 transition-all duration-300 hover:scale-105 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17320d]"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/AachariTiwari" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocial('x')}
                aria-label="Follow Achari Tiwari on X"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-800 transition-all duration-300 hover:scale-105 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17320d]"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.youtube.com/@Aacharitiwari" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocial('youtube')}
                aria-label="Subscribe to Achari Tiwari on YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-800 transition-all duration-300 hover:scale-105 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17320d]"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
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
                    className="group inline-flex min-h-11 items-center text-gray-300 transition-colors duration-200 hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Categories</h4>
            <ul className="space-y-3">
              {categoriesLoading ? Array.from({ length: 4 }).map((_, index) => (
                <li key={index} className="h-11 animate-pulse bg-white/10" aria-hidden="true" />
              )) : categories.length ? categories.map((category) => (
                <li key={category._id}>
                  <Link
                    to={`/products?category=${encodeURIComponent(category.slug)}`}
                    className="group flex min-h-11 items-center text-gray-300 transition-colors duration-200 hover:text-[#e7bd78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd78]"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {category.name}
                  </Link>
                </li>
              )) : <li className="text-sm leading-6 text-gray-400">{categoriesError ? 'Categories are temporarily unavailable.' : 'New categories are coming soon.'}</li>}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Corporate office: Saket, New Delhi<br />
                    Manufacturing: Gopalganj, Bihar<br />
                    Serving customers across India
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <a href={phoneHref} onClick={() => { void trackEvent('contact_click', { method: 'phone', location: 'footer' }); }} className="inline-flex min-h-11 items-center text-sm text-gray-300 hover:text-[#e7bd78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd78]">{supportPhone}</a>
                  <p className="text-gray-400 text-xs">Mon-Sat 9AM-7PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <div>
                  <a href={`mailto:${supportEmail}`} onClick={() => { void trackEvent('contact_click', { method: 'email', location: 'footer' }); }} className="inline-flex min-h-11 break-all items-center text-sm text-gray-300 hover:text-[#e7bd78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd78]">{supportEmail}</a>
                  <p className="text-gray-400 text-xs">24/7 Support</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-gray-300 text-sm font-medium">Business Hours</p>
                  <p className="text-gray-400 text-xs">
                    Mon-Sat: 9:00 AM - 7:00 PM<br />
                    Sunday: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">Payment options:</span>
              <div className="flex items-center gap-2 text-sm font-semibold"><span className="rounded border border-[#c88a2b]/50 px-3 py-1">UPI</span><span className="rounded border border-[#c88a2b]/50 px-3 py-1">Cash on Delivery</span></div>
            </div>
            
            <div className="text-gray-400 text-sm">
              🔒 Secure SSL Encrypted Payments
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/50 border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} AachariTiwari. All rights reserved. Made with ❤️ in India.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <Link to="/privacy-policy" className="inline-flex min-h-11 items-center text-sm text-gray-400 transition-colors hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="inline-flex min-h-11 items-center text-sm text-gray-400 transition-colors hover:text-primary">
                Terms of Service
              </Link>
              <Link to="/shipping-policy" className="inline-flex min-h-11 items-center text-sm text-gray-400 transition-colors hover:text-primary">
                Shipping Policy
              </Link>
              <Link to="/refund-policy" className="inline-flex min-h-11 items-center text-sm text-gray-400 transition-colors hover:text-primary">
                Refund Policy
              </Link>
              <button type="button" onClick={openAnalyticsChoices} className="min-h-11 text-sm text-gray-400 transition-colors hover:text-[#e7bd78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd78]">
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
