import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, Search, Heart, Phone, Mail, X, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import logoSvg from '@/assets/logo.png';

const Header = () => {
  const location = useLocation();
  const { state } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', active: location.pathname === '/' },
    { name: 'Products', href: '/products', active: location.pathname === '/products' },
    { name: 'Blog', href: '/blog', active: location.pathname === '/blog' },
    { name: 'About', href: '/about', active: location.pathname === '/about' },
    { name: 'Contact', href: '/contact', active: location.pathname === '/contact' },
  ];

  return (
    <>
      {/* Top Bar - Indian Cultural Elements in English */}
      <div className="bg-gradient-primary text-white py-2 text-center text-sm hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-3 w-3" />
              <span>+917973070600</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-3 w-3" />
              <span> contact@aacharitiwari.com</span>
            </div>
           
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-300 text-yellow-300" />
              <span className="text-xs">4.8★ Thousands of Happy Customers</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-3 w-3" />
              <span className="text-xs">🏆 Pure Quality Guaranteed</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs">🚚 All India Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/98 backdrop-blur-md shadow-elegant' 
          : 'bg-background/95 backdrop-blur'
      } border-b border-border`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Indian Cultural Logo */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                {/* Main logo container */}
                
                  
                  {/* Logo image */}
                  <img 
                    src={logoSvg} 
                    alt="AachariTiwari - Taste of Bihar" 
                    className={`object-contain transition-all duration-300 ${
                      isScrolled ? 'w-12 h-12' : 'w-14 h-14'
                    }`}
                  />

                {/* Quality badge */}
               
              </div>

              {/* Brand Text in English */}
              <div className="flex flex-col">
                <h1 className={`font-bold text-foreground group-hover:text-primary transition-colors duration-300 ${
                  isScrolled ? 'text-2xl' : 'text-3xl'
                }`}>
                  AachariTiwari
                </h1>
                <p className={`text-muted-foreground font-medium transition-all duration-300 flex items-center ${
                  isScrolled ? 'text-sm' : 'text-base'
                }`}>
                  <span className="text-accent font-semibold mr-1">🌶️ Authentic Taste of India</span>
                  <span className="mx-2">•</span>
                  <span className="text-primary font-semibold">Premium Quality</span>
                </p>
               
              </div>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-muted relative ${
                    item.active 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.name}
                  {item.active && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Search className="h-4 w-4" />
              </Button>

              {/* Wishlist */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-colors relative"
              >
                <Heart className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full"></span>
              </Button>

              {/* Cart */}
              <Link to="/cart">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {state.itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                      {state.itemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - English version */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      item.active 
                        ? 'text-primary bg-primary/10 border border-primary/20' 
                        : 'text-foreground hover:bg-muted hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Quality Message */}
                <div className="mt-4 p-3 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
                  <p className="text-xs text-center text-muted-foreground">
                    🏆 <span className="font-semibold text-primary">Premium Quality</span> • 🌶️ <span className="font-semibold text-accent">Taste of Bihar</span>
                  </p>
                </div>
                
                {/* Mobile Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="flex-1 mr-2">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 ml-2">
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;