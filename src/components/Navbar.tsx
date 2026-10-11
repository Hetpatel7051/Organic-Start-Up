import React, { useState } from 'react';
import { ActiveView, UserProfile } from '../types';
import { PureKhetarLogo } from './PureKhetarLogo';
import { BRAND_INFO } from '../data/mockData';

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
    { id: 'subscription-baskets', label: 'Weekly Baskets', badge: '⭐ Bestseller', icon: 'shopping_bag' },
    { id: 'telemetry', label: 'Farm Weather & Soil', icon: 'thermostat' },
    { id: 'the-plots', label: 'Kamana 10 Bigha Plots', icon: 'map' },
    { id: 'lab-reports', label: 'Zero-Chemical Lab Reports', icon: 'science' },
    { id: 'traceability', label: 'Verify Crate Origin', icon: 'verified' },
    { id: 'agent-panel', label: 'Delivery Agent Portal', badge: 'Route', icon: 'two_wheeler' },
    { id: 'admin-panel', label: 'Admin Hub', badge: 'SPU Farm HQ', icon: 'admin_panel_settings' },
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
      
      {/* 1. Top University Support & WhatsApp Ribbon */}
      <div className="bg-[#1E3F20] dark:bg-[#142316] text-[#FAF7EE] py-1.5 px-4 text-[11px] font-medium tracking-wide overflow-hidden border-b border-[#2E5A33]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-5 overflow-hidden whitespace-nowrap mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#E5A93C] uppercase tracking-wider text-[10px]">
              <span>🎓</span> {BRAND_INFO.universitySupport}
            </span>
            <span className="text-[#3E6B41] hidden sm:inline">•</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#E4EDE1]">
              <span>🌿</span> 100% Zero-Chemical &amp; Pesticide-Free
            </span>
            <span className="text-[#3E6B41] hidden md:inline">•</span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-[#E4EDE1]">
              <span>🚚</span> Direct Farm to Doorstep Delivery · Kamana, Visnagar
            </span>
          </div>
          
          <div className="hidden sm:flex items-center gap-3 text-[11px] shrink-0 font-medium text-[#FAF7EE]">
            <a
              href={BRAND_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#E5A93C] hover:text-white transition-colors"
            >
              <span>📞 WhatsApp:</span>
              <strong className="underline underline-offset-2">{BRAND_INFO.whatsapp}</strong>
            </a>
            <span className="text-[#3E6B41]">|</span>
            <span className="text-[#B8AC9D] text-[10px]">{BRAND_INFO.shortLocation}</span>
          </div>
        </div>
      </div>

      {/* 2. Main Brand & Search Bar (Warm Creamy with Deep Green & Terracotta) */}
      <div className={`px-4 sm:px-6 py-2.5 backdrop-blur-2xl transition-all duration-300 border-b shadow-sm ${
        isDark
          ? 'bg-[#141F16]/95 border-[#283C2C] text-[#FAF5EA]'
          : 'bg-[#FAF7EE]/95 border-[#E3DAC6] text-[#1C271E]'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          
          {/* PureKhetar Brand Logo */}
          <button
            onClick={() => handleNavClick('harvest-live')}
            className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group shrink-0"
          >
            <PureKhetarLogo size="md" withText={true} withTagline={true} />
          </button>

          {/* Center Search Bar with Creamy Style */}
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
              placeholder="Search farm vegetables (baingan, gobi, bhindi, tamatar, palak)..."
              className="w-full bg-[#FFFDF9] dark:bg-[#1C2B1E] border border-[#DED4BE] dark:border-[#2D4431] rounded-full pl-5 pr-11 py-2.5 text-xs text-[#1C271E] dark:text-[#FAF5EA] placeholder-[#79887C] focus:outline-none focus:border-[#1E3F20] dark:focus:border-[#4E8653] focus:ring-1 focus:ring-[#1E3F20] shadow-sm transition-all"
            />
            <button
              type="submit"
              className="absolute right-3.5 text-[#5A6E5E] hover:text-[#1E3F20] dark:hover:text-[#65A46B] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[19px]">search</span>
            </button>
          </form>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Direct WhatsApp Callout Button */}
            <a
              href={BRAND_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat with PureKhetar on WhatsApp"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1B7E3E] dark:text-[#4ADE80] border border-[#25D366]/30 text-xs font-bold transition-all"
            >
              <span className="material-symbols-outlined text-[17px]">chat</span>
              <span className="hidden lg:inline">{BRAND_INFO.phone}</span>
            </a>

            {/* Quick Track / Origin Verify */}
            <button
              onClick={() => handleNavClick('traceability')}
              title="Track Harvest & Crate Origin"
              className={`p-2 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
                isDark ? 'text-[#BDC8BE] hover:bg-[#1E2E20]' : 'text-[#4A5A4D] hover:bg-[#F0EAE0]'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">local_shipping</span>
            </button>

            {/* Profile / Login Button with Terracotta accent */}
            <button
              onClick={onOpenLoginModal}
              title={currentUser ? `Logged in as ${currentUser.name}` : 'Login to Your Account'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                currentUser
                  ? 'bg-[#EBF2EB] dark:bg-[#1F3323] border-[#74A878] text-[#1E3F20] dark:text-[#A8DBAC]'
                  : isDark
                    ? 'bg-[#18261B] border-[#2A3E2D] text-[#FAF5EA] hover:bg-[#223626]'
                    : 'bg-[#FFFDF9] border-[#DED4BE] text-[#1C271E] hover:bg-[#F3EFE4]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-[#C86D3B] dark:text-[#E0854E]">
                {currentUser ? 'account_circle' : 'person'}
              </span>
              <span className="text-xs font-bold hidden sm:inline">
                {currentUser ? currentUser.name.split(' ')[0] : 'Login'}
              </span>
              {currentUser && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-[#1E3F20] text-white leading-none">
                  {currentUser.role}
                </span>
              )}
            </button>

            {/* Basket Cart Button in PureKhetar Deep Green */}
            <button
              onClick={() => handleNavClick('subscription-baskets')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1E3F20] hover:bg-[#163519] dark:bg-[#2B542E] dark:hover:bg-[#386D3D] text-[#FAF7EE] font-bold text-xs transition-transform hover:scale-105 active:scale-95 shadow-md cursor-pointer border border-[#163519]"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span className="hidden xs:inline">Basket</span>
              {basketCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#C86D3B] text-white text-[10px] font-bold flex items-center justify-center">
                  {basketCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              title={isDark ? 'Switch to Creamy Light Theme' : 'Switch to Dark Forest Theme'}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer border ${
                isDark
                  ? 'bg-[#18261B] border-[#2A3E2D] text-[#E5A93C] hover:bg-[#223626]'
                  : 'bg-[#FFFDF9] border-[#DED4BE] text-[#5A6E5E] hover:bg-[#F3EFE4]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center border border-[#DED4BE] dark:border-[#2D4431] text-[#1C271E] dark:text-[#FAF5EA]"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sub-Category Navbar with Creamy Pills */}
      <div className={`hidden lg:block border-b backdrop-blur-xl ${
        isDark
          ? 'bg-[#111A13]/90 border-[#243628] text-[#BDC8BE]'
          : 'bg-[#F5F0E4]/90 border-[#DFD5BE] text-[#4A5A4D]'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <nav className="flex items-center space-x-1.5 py-1.5 overflow-x-auto text-xs">
            {navLinks.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1E3F20] text-[#FAF7EE] shadow-sm'
                      : isDark
                        ? 'hover:text-[#FAF5EA] hover:bg-[#1E2E20]'
                        : 'hover:text-[#1E3F20] hover:bg-[#EBE2CF]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                      isActive
                        ? 'bg-[#C86D3B] text-white'
                        : 'bg-[#C86D3B]/20 text-[#A85527] dark:text-[#E0854E]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Live Farm Status Badge */}
          <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono text-[#576559] dark:text-[#A8B8AB]">
            <span className="w-2 h-2 rounded-full bg-[#3E6B41] animate-pulse"></span>
            <span>Kamana Farm: 100% Zero Spray · Fresh Sunrise Harvest</span>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`fixed inset-0 top-[92px] z-40 p-6 flex flex-col justify-between animate-fadeIn lg:hidden backdrop-blur-3xl overflow-y-auto ${
          isDark ? 'bg-[#111A13]/98 text-[#FAF5EA]' : 'bg-[#FAF7EE]/98 text-[#1C271E]'
        }`}>
          <div className="space-y-4 max-w-md mx-auto w-full">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search baingan, gobi, bhindi, tamatar..."
                className="w-full bg-[#FFFDF9] dark:bg-[#1C2B1E] border border-[#DED4BE] dark:border-[#2D4431] rounded-full pl-4 pr-10 py-2.5 text-xs text-[#1C271E] dark:text-[#FAF5EA] focus:outline-none"
              />
              <button type="submit" className="absolute right-3.5 top-2.5 text-[#5A6E5E]">
                <span className="material-symbols-outlined text-[18px]">search</span>
              </button>
            </form>

            <div className="p-3 rounded-2xl bg-[#EBE2CF] dark:bg-[#1B291D] text-xs space-y-1">
              <div className="font-bold text-[#1E3F20] dark:text-[#65A46B]">
                {BRAND_INFO.universitySupport}
              </div>
              <div className="text-[11px] text-[#5A6E5E] dark:text-[#A8B8AB]">
                Direct Farm: Kamana, Visnagar, Mehsana · Call: {BRAND_INFO.phone}
              </div>
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
                        ? 'bg-[#1E3F20] text-[#FAF7EE] font-bold shadow-md'
                        : isDark
                          ? 'bg-[#18261B] hover:bg-[#203224] text-[#FAF5EA]'
                          : 'bg-[#FFFDF9] hover:bg-[#F3EFE4] text-[#1C271E] border border-[#E3DAC6]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span className="text-sm font-semibold">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-[#C86D3B] text-white text-[10px] font-bold">
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
              className="w-full py-3 px-4 rounded-2xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#DED4BE] dark:border-[#2D4431] flex items-center justify-between text-xs font-bold cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1E3F20] dark:text-[#65A46B] text-[20px]">account_circle</span>
                <span>{currentUser ? `Account: ${currentUser.name}` : 'Login / Register Profile'}</span>
              </div>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div className="pt-6 border-t border-[#DED4BE] dark:border-[#243628] text-center text-xs text-[#576559] dark:text-[#A8B8AB]">
            PureKhetar · Rooted in Nature, Cultivated with Care · SPU Startup
          </div>
        </div>
      )}
    </header>
  );
};
