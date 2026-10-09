import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { BRAND_CONFIG, buildWhatsAppEnquiryUrl } from '../lib/config';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  wishlistCount: number;
  cartCount: number;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onReplayExperience: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  wishlistCount,
  cartCount,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
  onReplayExperience,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [showAccountNotice, setShowAccountNotice] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', route: 'home' },
    { label: 'Sarees', route: 'sarees' },
    { label: 'Ethnic', route: 'ethnic' },
    { label: 'Western', route: 'western' },
    { label: 'Beauty', route: 'cosmetics' },
    { label: 'Accessories', route: 'accessories' },
    { label: 'Collections', route: 'collections' },
    { label: 'About', route: 'about' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleLinkClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-300">
        {/* 1. Announcement Bar */}
        {showAnnouncement && (
          <div className="relative bg-[#1A0B10] text-[#FAF8F5] text-xs py-2 px-4 border-b border-[#D4AF37]/20 flex items-center justify-between text-center tracking-wider">
            <div className="hidden md:flex items-center gap-2 text-stone-400 text-[11px]">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>By {BRAND_CONFIG.owners.names}</span>
            </div>

            <div className="flex-1 text-center font-light text-[11px] sm:text-xs">
              <span className="text-[#E8B4B8] font-medium mr-1.5">Grand Showcase:</span>
              <span className="text-stone-200">
                Complimentary insured delivery across India • Discover 38 curated collections
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={buildWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#D4AF37] hover:underline"
              >
                <MessageCircle className="w-3 h-3" />
                <span>Concierge</span>
              </a>
              <button
                onClick={() => setShowAnnouncement(false)}
                aria-label="Dismiss announcement"
                className="text-stone-400 hover:text-white transition-colors text-sm ml-2 leading-none"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* 2. Main Luxury Navigation Bar */}
        <nav
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? 'bg-[#180B0F]/95 backdrop-blur-md shadow-lg border-b border-[#D4AF37]/20 py-3 text-[#FAF8F5]'
              : 'bg-[#FAF8F5]/90 backdrop-blur-sm border-b border-stone-200/80 py-4 text-[#1A1215]'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`p-2 rounded-sm transition-colors ${
                  isScrolled ? 'text-stone-200 hover:text-white' : 'text-stone-700 hover:text-black'
                }`}
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenSearch}
                className={`p-2 rounded-sm transition-colors ${
                  isScrolled ? 'text-stone-200 hover:text-white' : 'text-stone-700 hover:text-black'
                }`}
                aria-label="Search catalogue"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Brand Logo & Wordmark */}
            <div className="flex flex-col items-center cursor-pointer select-none" onClick={() => handleLinkClick('home')}>
              <div className="flex items-center gap-2">
                <span
                  className={`text-2xl sm:text-3xl font-editorial tracking-[0.14em] font-medium transition-colors ${
                    isScrolled ? 'gold-text-gradient' : 'text-[#3A0810]'
                  }`}
                >
                  ENNAVAL
                </span>
              </div>
              <span
                className={`text-[9px] tracking-[0.28em] uppercase -mt-0.5 transition-colors ${
                  isScrolled ? 'text-[#DFBF77]' : 'text-stone-500'
                }`}
              >
                Haute Couture &amp; Beauty
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-7">
              {navItems.map((item) => {
                const isActive = currentRoute === item.route;
                return (
                  <button
                    key={item.route}
                    onClick={() => handleLinkClick(item.route)}
                    className={`relative text-[13px] tracking-wider uppercase font-medium transition-all py-1 ${
                      isActive
                        ? isScrolled ? 'text-[#D4AF37]' : 'text-[#4A0E17] font-semibold'
                        : isScrolled ? 'text-stone-300 hover:text-[#D4AF37]' : 'text-stone-600 hover:text-[#4A0E17]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4AF37] animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions: Search, Wishlist, Bag, Account, Replay 3D */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Desktop Search Button */}
              <button
                onClick={onOpenSearch}
                className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-colors border ${
                  isScrolled
                    ? 'border-white/10 text-stone-300 hover:border-[#D4AF37]/50 bg-black/20'
                    : 'border-stone-200 text-stone-600 hover:border-stone-400 bg-white/70'
                }`}
                title="Search collection (Press / or click)"
              >
                <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-light">Search</span>
              </button>

              {/* 3D Replay Experience Button */}
              <button
                onClick={onReplayExperience}
                className={`p-2 rounded-full transition-colors hidden sm:flex items-center justify-center ${
                  isScrolled ? 'text-[#D4AF37] hover:bg-white/10' : 'text-[#8C6B1C] hover:bg-stone-200/50'
                }`}
                title="Re-open 3D Silk Experience"
                aria-label="Re-open 3D Silk Experience"
              >
                <Sparkles className="w-4 h-4" />
              </button>

              {/* Account Placeholder */}
              <div className="relative">
                <button
                  onClick={() => setShowAccountNotice(!showAccountNotice)}
                  className={`p-2 rounded-full transition-colors ${
                    isScrolled ? 'text-stone-200 hover:text-white' : 'text-stone-700 hover:text-[#4A0E17]'
                  }`}
                  aria-label="Account Portal"
                >
                  <User className="w-4 h-4" />
                </button>
                {showAccountNotice && (
                  <div className="absolute right-0 mt-2 w-64 p-3 bg-stone-900 text-white text-xs rounded shadow-2xl border border-[#D4AF37]/30 z-50">
                    <p className="font-semibold text-[#D4AF37] mb-1">Customer Account</p>
                    <p className="text-stone-300 leading-relaxed mb-2">
                      Customer portal login is currently reserved. You can browse, wishlist, and enquire freely without an account.
                    </p>
                    <button
                      onClick={() => setShowAccountNotice(false)}
                      className="w-full text-center py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded text-[11px] hover:bg-[#D4AF37]/30"
                    >
                      Understood
                    </button>
                  </div>
                )}
              </div>

              {/* Wishlist Icon */}
              <button
                onClick={onOpenWishlist}
                className={`p-2 rounded-full relative transition-colors ${
                  isScrolled ? 'text-stone-200 hover:text-white' : 'text-stone-700 hover:text-[#4A0E17]'
                }`}
                aria-label="View Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D4AF37] text-[#1A090D] font-bold text-[10px] rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Icon */}
              <button
                onClick={onOpenCart}
                className={`p-2 rounded-full relative transition-colors ${
                  isScrolled ? 'text-stone-200 hover:text-white' : 'text-stone-700 hover:text-[#4A0E17]'
                }`}
                aria-label="View Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#4A0E17] text-white font-bold text-[10px] rounded-full flex items-center justify-center border border-[#D4AF37]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* 3. Mobile Slide-Over Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="relative ml-0 mr-auto w-4/5 max-w-sm h-full bg-[#180B0F] text-[#FAF8F5] shadow-2xl flex flex-col z-10 border-r border-[#D4AF37]/20 overflow-y-auto">
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xl font-editorial tracking-widest gold-text-gradient font-medium">
                  ENNAVAL
                </span>
                <p className="text-[10px] text-[#DFBF77] tracking-wider uppercase">
                  Pavithran &amp; Nandhini
                </p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="py-4 px-3 flex-1 space-y-1">
              {navItems.map((item) => {
                const isActive = currentRoute === item.route;
                return (
                  <button
                    key={item.route}
                    onClick={() => handleLinkClick(item.route)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded text-sm tracking-wider uppercase text-left transition-colors ${
                      isActive
                        ? 'bg-[#3A0810]/70 text-[#D4AF37] font-semibold border-l-2 border-[#D4AF37]'
                        : 'text-stone-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-stone-500" />
                  </button>
                );
              })}
            </div>

            {/* Concierge & Policies info in mobile drawer */}
            <div className="p-5 border-t border-white/10 bg-[#12070A] space-y-3 text-xs">
              <a
                href={buildWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#D4AF37] text-[#1A0B10] font-medium rounded-sm uppercase tracking-wider text-[11px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>

              <div className="text-[11px] text-stone-400 text-center pt-2 space-y-1">
                <p>Online-Only Luxury Boutique</p>
                <p>Mon - Sat: 10:00 AM - 8:00 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
