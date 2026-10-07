import React, { useState } from 'react';
import { ActiveView } from '../types';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
  onOpenScanner?: () => void;
  onOpenStudio?: () => void;
  onOpenProfile?: () => void;
  basketCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  isDark,
  toggleDarkMode,
  onOpenScanner,
  onOpenStudio,
  basketCount = 1
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ActiveView; label: string; hindiSub: string; icon: string }[] = [
    { id: 'harvest-live', label: 'Fresh Harvest', hindiSub: 'ताज़ा सब्जियां', icon: 'eco' },
    { id: 'telemetry', label: 'Farm Weather', hindiSub: 'मौसम व मिट्टी', icon: 'thermostat' },
    { id: 'the-plots', label: 'Our Plots', hindiSub: '१० बीघा खेत', icon: 'map' },
    { id: 'subscription-baskets', label: 'Weekly Baskets', hindiSub: 'सप्ताहिक टोकरी', icon: 'shopping_bag' },
    { id: 'traceability', label: 'Verify Origin', hindiSub: 'किसान जांच', icon: 'verified' },
    { id: 'lab-reports', label: 'Purity Report', hindiSub: 'लैब रिपोर्ट', icon: 'science' },
  ];

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Floating Glass Navigation Bar (Un-squeezed & Responsive) */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-2.5 sm:pt-4 px-2 sm:px-4 md:px-6 pointer-events-none transition-all">
        <div className={`max-w-7xl mx-auto h-16 md:h-18 flex items-center justify-between px-3 sm:px-5 md:px-6 rounded-full backdrop-blur-2xl transition-all duration-300 pointer-events-auto border ${
          isDark
            ? 'bg-neutral-950/90 border-white/10 text-white shadow-[0_12px_40px_rgba(0,0,0,0.65)]'
            : 'bg-white/95 border-neutral-200/90 text-neutral-900 shadow-[0_10px_35px_rgba(0,0,0,0.08)]'
        }`}>
          
          {/* Brand Logo & Origin Tag */}
          <button
            onClick={() => handleNavClick('harvest-live')}
            className="flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none cursor-pointer group shrink-0"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 border ${
              isDark
                ? 'bg-emerald-400/20 text-emerald-400 border-emerald-400/40 shadow-[0_0_15px_rgba(78,222,163,0.3)]'
                : 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm'
            }`}>
              <span className="material-symbols-outlined text-[20px]">eco</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-sm sm:text-base md:text-lg font-bold tracking-wider uppercase leading-none ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}>
                AURA TERRA
              </span>
              <span className="text-[10px] tracking-wider text-emerald-500 font-sans font-semibold mt-0.5 whitespace-nowrap">
                Organic Farm · India 🇮🇳
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links - Squeeze-Free with clean pill indicators */}
          <nav className={`hidden lg:flex items-center gap-0.5 xl:gap-1 p-1 rounded-full border ${
            isDark ? 'bg-white/5 border-white/5' : 'bg-neutral-100 border-neutral-200/70'
          }`}>
            {navLinks.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 xl:px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-400 text-black font-bold shadow-[0_0_12px_rgba(78,222,163,0.4)]'
                      : isDark
                        ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools - Balanced & Space-Efficient */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Scan QR Button */}
            {onOpenScanner && (
              <button
                onClick={onOpenScanner}
                title="Scan QR Code on your vegetable box"
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-400/30 hover:bg-emerald-400 hover:text-black'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-500 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                <span className="hidden sm:inline">Scan QR</span>
              </button>
            )}

            {/* India / Rupee indicator tag */}
            <div className={`hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono border ${
              isDark
                ? 'bg-white/5 border-white/10 text-neutral-300'
                : 'bg-neutral-100 border-neutral-200 text-neutral-600'
            }`}>
              <span>₹ INR</span>
            </div>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle Dark/Light Mode"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all border cursor-pointer ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-yellow-300 border-white/10'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-200'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Main Action Pill: Order Basket */}
            <button
              onClick={() => handleNavClick('subscription-baskets')}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full bg-emerald-400 text-black font-bold text-xs sm:text-sm hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              <span className="hidden xs:inline">Get Basket</span>
              <span className="xs:hidden">Basket</span>
              <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
              {basketCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
                  {basketCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Drawer Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className={`lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border cursor-pointer transition-colors ${
                isDark
                  ? 'bg-white/10 text-white border-white/10 hover:bg-white/20'
                  : 'bg-neutral-100 text-neutral-800 border-neutral-200 hover:bg-neutral-200'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer - Bug-free, Clean & Responsive */}
      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-40 pt-24 px-5 pb-8 flex flex-col justify-between animate-fadeIn lg:hidden backdrop-blur-3xl ${
          isDark ? 'bg-neutral-950/95 text-white' : 'bg-white/95 text-neutral-900'
        }`}>
          <div className="space-y-4 max-w-md mx-auto w-full">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold">
                Farm Navigation · India
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-400">
                ₹ INR
              </span>
            </div>

            {/* Mobile Nav Links */}
            <div className="space-y-1.5">
              {navLinks.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left transition-all ${
                      isActive
                        ? 'bg-emerald-400 text-black font-bold shadow-md'
                        : isDark
                          ? 'bg-white/5 hover:bg-white/10 text-white'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <div>
                        <span className="text-sm font-semibold block">{item.label}</span>
                        <span className={`text-[11px] ${isActive ? 'text-neutral-800' : 'text-neutral-400'}`}>
                          {item.hindiSub}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions in Mobile Drawer */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              {onOpenScanner && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenScanner();
                  }}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 text-xs font-bold"
                >
                  <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                  <span>Scan Box QR</span>
                </button>
              )}
              {onOpenStudio && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenStudio();
                  }}
                  className={`flex items-center justify-center gap-2 py-3 rounded-2xl border text-xs font-bold ${
                    isDark ? 'bg-white/10 border-white/10 text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">layers</span>
                  <span>Studio Preview</span>
                </button>
              )}
            </div>
          </div>

          {/* Drawer Bottom Info */}
          <div className="pt-6 border-t border-white/10 max-w-md mx-auto w-full text-center space-y-2">
            <p className="text-xs text-neutral-400">
              100% Chemical-Free Fresh Harvest · Mehsana, Gujarat
            </p>
            <p className="text-[11px] font-mono text-emerald-400 font-bold">
              Morning Doorstep Delivery Across India
            </p>
          </div>
        </div>
      )}
    </>
  );
};
