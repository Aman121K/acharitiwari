import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, Search, Heart, X, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useStoreSettings } from '@/hooks/useStoreData';
import { useWishlist } from '@/contexts/WishlistContext';

const Header = () => {
  const location = useLocation();
  const { state } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: settings } = useStoreSettings();
  const { ids: wishlistIds } = useWishlist();

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
      <div className="border-b border-[#b58235]/35 bg-[#17320d] py-2 text-center text-[10px] font-semibold uppercase tracking-[.18em] text-[#f2d49b] sm:text-[11px]">
        {settings?.announcement || 'Traditional recipes · Carefully packed · Delivered across India'}
      </div>

      <header className={`sticky top-0 z-50 border-b border-[#c9b896] transition-all duration-300 ${isScrolled ? 'bg-[#fffaf1]/95 shadow-[0_10px_30px_-24px_#201b15] backdrop-blur' : 'bg-[#fffaf1]'}`}>
        <div className="mx-auto max-w-[1440px] px-3 py-2 sm:px-6">
          <div className="flex min-w-0 items-center justify-between gap-2 sm:gap-3">
            <Link to="/" className="group flex min-w-0 flex-1 items-center gap-2 min-[380px]:gap-2.5 sm:gap-3" aria-label="Achari Tiwari home">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border-r border-[#c9b896] pr-2 sm:h-12 sm:w-12">
                <img src="/brand/achari-tiwari-logo.png" alt="Achari Tiwari" className="h-full w-full object-contain" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-display text-xl leading-none tracking-tight text-foreground sm:text-2xl">Achari <span className="text-accent">Tiwari</span></span>
                <p className="hidden text-[9px] font-semibold uppercase tracking-[.18em] text-muted-foreground min-[390px]:block">Taste of tradition</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`border-b px-3 py-3 text-[11px] font-semibold uppercase tracking-[.12em] transition-all ${item.active ? 'border-[#8f1715] text-[#8f1715]' : 'border-transparent text-foreground hover:border-[#b58235] hover:text-primary'}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-0.5 sm:gap-2">
              <Button asChild variant="ghost" size="icon" className="hidden text-foreground hover:bg-primary/10 hover:text-primary sm:flex">
                <Link to="/search">
                  <Search className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="relative hidden text-foreground hover:bg-primary/10 hover:text-primary sm:flex">
                <Link to="/wishlist" aria-label={`Liked products${wishlistIds.length ? `, ${wishlistIds.length} saved` : ''}`}><Heart className={`h-4 w-4 ${wishlistIds.length ? 'fill-primary text-primary' : ''}`} />{wishlistIds.length > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">{wishlistIds.length}</span>}</Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="hidden text-foreground hover:bg-primary/10 hover:text-primary sm:flex"><Link to="/account" aria-label="Account"><UserRound className="h-4 w-4" /></Link></Button>
              <Button asChild variant="ghost" size="icon" className="relative h-11 w-11 text-foreground hover:bg-primary/10 hover:text-primary">
                <Link to="/cart" aria-label={`Cart with ${state.itemCount} items`}>
                  <ShoppingCart className="h-5 w-5" />
                  {state.itemCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                      {state.itemCount}
                    </span>
                  )}
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-11 w-11 text-foreground hover:bg-primary/10 hover:text-primary lg:hidden" aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-border/70 bg-background/95 backdrop-blur lg:hidden">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link key={item.name} to={item.href} onClick={() => setIsMobileMenuOpen(false)} className={`flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-medium transition-all ${item.active ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted hover:text-primary'}`}>
                    {item.name}
                  </Link>
                ))}
                <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-muted">Account / Sign in</Link>
                <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"><span className="flex items-center gap-3"><Heart className={`h-4 w-4 ${wishlistIds.length ? 'fill-primary text-primary' : ''}`}/>Liked products</span>{wishlistIds.length > 0 && <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-white">{wishlistIds.length}</span>}</Link>
                <div className="mt-3 rounded-2xl border border-accent/20 bg-gradient-to-r from-accent/10 to-primary/10 p-3 text-center text-sm text-muted-foreground">
                  {settings?.announcement || 'Free delivery on orders above ₹699'}
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
