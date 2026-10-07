import React, { useState } from 'react';
import { ActiveView, UserProfile } from '../types';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
  onOpenScanner?: () => void;
  onOpenStudio?: () => void;
  onOpenLoginModal?: () => void;
  currentUser: UserProfile | null;
  basketCount?: number;
  onSearchChange?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  isDark,
  toggleDarkMode,
  onOpenLoginModal,
  currentUser,
  basketCount = 1,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks: { id: ActiveView; label: string; badge?: string; icon: string }[] = [
    { id: 'harvest-live', label: 'Fresh Harvest', icon: 'eco' },
    { id: 'subscription-baskets', label: 'Weekly Baskets', badge: '⭐ Popular', icon: 'shopping_bag' },
    { id: 'telemetry', label: 'Farm Live Weather', icon: 'thermostat' },
    { id: 'the-plots', label: '10 Bigha Plots', icon: 'map' },
    { id: 'lab-reports', label: 'Purity Reports', icon: 'science' },
    { id: 'traceability', label: 'Verify Origin', icon: 'verified' },
    { id: 'agent-panel', label: 'Agent Portal', badge: 'Route', icon: 'two_wheeler' },
    { id: 'admin-panel', label: 'Admin Hub', badge: 'Farm HQ', icon: 'admin_panel_settings' },
  ];

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) onSearchChange(searchQuery);
    if (activeView !== 'harvest-live') {
      setActiveView('harvest-live');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all font-sans">
      
      {/* 1. Top Announcement Marquee (matching image.png sample website) */}
      <div className="bg-[#155e3b] dark:bg-[#0f4429] text-white py-1 px-4 text-[11px] font-medium tracking-wide overflow-hidden border-b border-emerald-600/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6 overflow-hidden whitespace-nowrap mx-auto text-emerald-100">
            <span className="flex items-center gap-1.5">
              <span>🌿</span> Mystery Organic Sample with orders above ₹999
            </span>
            <span className="text-emerald-400">•</span>
            <span className="flex items-center gap-1.5">
              <span>🚚</span> Free Doorstep Delivery across India in 4 Hours
            </span>
            <span className="text-emerald-400">•</span>
            <span className="flex items-center gap-1.5">
              <span>💵</span> Cash &amp; UPI on Delivery Available
            </span>
            <span className="text-emerald-400">•</span>
            <span className="flex items-center gap-1.5">
              <span>☀️</span> Sunrise Harvest Picked at 5:45 AM Today
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-3 text-[10px] text-emerald-200 shrink-0 font-mono">
            <span>Mehsana, Gujarat</span>
            <span>|</span>
            <span className="text-emerald-300 font-bold">100% PURE</span>
          </div>
        </div>
      </div>

      {/* 2. Main Brand & Search Bar */}
      <div className={`px-4 sm:px-6 py-2.5 backdrop-blur-2xl transition-all duration-300 border-b shadow-sm ${
        isDark
          ? 'bg-neutral-950/95 border-neutral-800 text-white'
          : 'bg-white/95 border-neutral-200 text-neutral-900'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Circular Emblem Brand Logo (Organic India sample style) */}
          <button
            onClick={() => handleNavClick('harvest-live')}
            className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-50 dark:bg-neutral-900 border-2 border-amber-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[20px] leading-none">eco</span>
                <span className="text-[6.5px] font-bold tracking-widest text-emerald-700 dark:text-emerald-300 uppercase leading-none mt-0.5">ORGANIC</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-base sm:text-lg font-bold tracking-wider uppercase leading-none">
                  AURA TERRA
                </span>
                <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-600 dark:text-amber-400 text-[9px] font-bold uppercase tracking-wider">
                  INDIA
                </span>
              </div>
              <span className="text-[10px] tracking-wide text-neutral-500 dark:text-neutral-400 font-sans mt-0.5">
                Direct Organic Farm Fresh
              </span>
            </div>
          </button>

          {/* Center Search Bar (matching Organic India sample screenshot) */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-xl hidden md:flex items-center relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              placeholder="Search fresh vegetables, leafy greens, weekly baskets..."
              className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-full pl-5 pr-11 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 text-neutral-500 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
            </button>
          </form>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Quick Trace / Track Icon */}
            <button
              onClick={() => handleNavClick('traceability')}
              title="Track Harvest & Crate Origin"
              className={`p-2 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
                isDark ? 'text-neutral-300 hover:bg-neutral-800' : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">local_shipping</span>
            </button>

            {/* Profile / Login Button (matching user request) */}
            <button
              onClick={onOpenLoginModal}
              title={currentUser ? `Logged in as ${currentUser.name}` : 'Login to Your Account'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                currentUser
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-800 dark:text-emerald-300'
                  : isDark
                    ? 'bg-white/5 border-white/10 text-neutral-200 hover:bg-white/10'
                    : 'bg-neutral-100 border-neutral-300 text-neutral-800 hover:bg-neutral-200'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-emerald-600 dark:text-emerald-400">
                {currentUser ? 'account_circle' : 'person'}
              </span>
              <span className="text-xs font-bold hidden sm:inline">
                {currentUser ? currentUser.name.split(' ')[0] : 'Login'}
              </span>
              {currentUser && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-500 text-white leading-none">
                  {currentUser.role}
                </span>
              )}
            </button>

            {/* Basket Cart Button */}
            <button
              onClick={() => handleNavClick('subscription-baskets')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-transform hover:scale-105 active:scale-95 shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span className="hidden xs:inline">Basket</span>
              {basketCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-emerald-800 text-[10px] font-bold flex items-center justify-center">
                  {basketCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer border ${
                isDark
                  ? 'bg-neutral-900 border-neutral-700 text-yellow-300 hover:bg-neutral-800'
                  : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-white"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sub-Category Navbar (Organized, Engaging, Not Boring) */}
      <div className={`hidden lg:block border-b backdrop-blur-xl ${
        isDark
          ? 'bg-neutral-900/90 border-neutral-800 text-neutral-300'
          : 'bg-[#fafaf7] border-neutral-200 text-neutral-700'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <nav className="flex items-center space-x-1 py-1.5 overflow-x-auto text-xs">
            {navLinks.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isDark
                        ? 'hover:text-white hover:bg-white/10'
                        : 'hover:text-emerald-800 hover:bg-emerald-100/60'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                      isActive ? 'bg-white text-emerald-800' : 'bg-amber-400 text-neutral-900'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Live Farm Status Badge */}
          <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Living Soil: 65% Moist · Clean Well Drip Active</span>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`fixed inset-0 top-[88px] z-40 p-6 flex flex-col justify-between animate-fadeIn lg:hidden backdrop-blur-3xl overflow-y-auto ${
          isDark ? 'bg-neutral-950/98 text-white' : 'bg-white/98 text-neutral-900'
        }`}>
          <div className="space-y-4 max-w-md mx-auto w-full">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vegetables &amp; baskets..."
                className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-full pl-4 pr-10 py-2.5 text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-neutral-500">
                <span className="material-symbols-outlined text-[18px]">search</span>
              </button>
            </form>

            <div className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider pb-2 border-b border-neutral-200 dark:border-neutral-800">
              Farm Navigation &amp; Portals
            </div>

            <div className="space-y-1.5">
              {navLinks.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white font-bold shadow-md'
                        : isDark
                          ? 'bg-neutral-900 hover:bg-neutral-800 text-white'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span className="text-sm font-semibold">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-neutral-900 text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Profile Action in Drawer */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenLoginModal) onOpenLoginModal();
              }}
              className="w-full py-3 px-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 flex items-center justify-between text-xs font-bold cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-[20px]">account_circle</span>
                <span>{currentUser ? `Account: ${currentUser.name}` : 'Login / Register Profile'}</span>
              </div>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-500">
            Aura Terra Organic Farms · 100% Certified Chemical-Free
          </div>
        </div>
      )}
    </header>
  );
};
