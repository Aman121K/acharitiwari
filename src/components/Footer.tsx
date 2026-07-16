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

const Footer = () => {
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
                <span className="text-sm text-gray-300">4.8/5 Rating</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/aacharitiwari" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/aacharitiwari/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/AachariTiwari" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.youtube.com/@Aacharitiwari" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110"
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
                    className="text-gray-300 hover:text-primary transition-colors duration-200 flex items-center group"
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
              {[
                'Mango Pickles',
                'Chili Pickles', 
                'Lime Pickles',
                'Garlic Pickles',
                'Mixed Pickles',
                'Regional Specials'
              ].map((category) => (
                <li key={category}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {category}
                  </a>
                </li>
              ))}
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
                    123 Spice Market Street<br />
                    Andheri West, Mumbai<br />
                    Maharashtra 400001, India
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-gray-300 text-sm">+919877031481</p>
                  <p className="text-gray-400 text-xs">Mon-Sat 9AM-7PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-gray-300 text-sm">aacharitiwari@gmail.com</p>
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
              © 2024 AachariTiwari. All rights reserved. Made with ❤️ in India.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/shipping-policy" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Shipping Policy
              </Link>
              <Link to="/refund-policy" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
