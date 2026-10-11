import React from 'react';
import { ActiveView } from '../types';
import { PureKhetarLogo } from './PureKhetarLogo';
import { BRAND_INFO } from '../data/mockData';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView }) => {
  return (
    <footer className="relative z-10 w-full bg-[#1A2E1D] text-[#FAF7EE] border-t border-[#2E5A33] mt-20 font-sans">
      
      {/* Top Ribbon */}
      <div className="bg-[#142316] py-3 px-4 border-b border-[#243E28] text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-[#E5A93C] font-bold uppercase tracking-wider text-[11px]">
            <span>🎓</span>
            <span>{BRAND_INFO.universitySupport}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#E4EDE1]">
            <a
              href={BRAND_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#E5A93C] transition-colors"
            >
              <span>📞 Call / WhatsApp:</span>
              <strong className="underline underline-offset-2">{BRAND_INFO.phone}</strong>
            </a>
            <span className="text-[#3E6B41]">|</span>
            <span>📍 {BRAND_INFO.location}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <PureKhetarLogo size="md" withText={true} withTagline={true} />
            
            <p className="text-xs leading-relaxed text-[#CBD5CD] max-w-xs font-light">
              <strong>PureKhetar</strong> delivers 100% zero-chemical, fresh organic vegetables grown by local experienced farmers in Kamana, Visnagar directly to your doorstep.
            </p>
            
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse"></span>
              <span className="text-[11px] font-mono text-[#E5A93C] tracking-wider uppercase font-semibold">
                Sunrise Harvest Plucked at 5:45 AM
              </span>
            </div>
          </div>

          {/* Quick Pages */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#FAF7EE] font-bold block mb-3">
              Explore PureKhetar
            </span>
            <ul className="space-y-2 text-xs text-[#CBD5CD]">
              <li>
                <button
                  onClick={() => setActiveView('harvest-live')}
                  className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left"
                >
                  Today&apos;s Fresh Harvest
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('the-plots')}
                  className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left"
                >
                  Kamana 10 Bigha Farm Plots
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('telemetry')}
                  className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left"
                >
                  Farm Weather &amp; Living Soil
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('traceability')}
                  className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left"
                >
                  Verify Harvest Crate QR
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('lab-reports')}
                  className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left"
                >
                  Zero-Pesticide Lab Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Weekly Delivery Baskets */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#FAF7EE] font-bold block mb-3">
              Weekly Subscriptions
            </span>
            <ul className="space-y-2 text-xs text-[#CBD5CD]">
              <li>
                <button
                  onClick={() => setActiveView('subscription-baskets')}
                  className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left flex items-center justify-between w-full pr-4"
                >
                  <span>Small Family Basket (4.5 kg)</span>
                  <span className="font-mono text-[#E5A93C]">₹499</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('subscription-baskets')}
                  className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left flex items-center justify-between w-full pr-4"
                >
                  <span>Regular Family Basket (9.0 kg)</span>
                  <span className="font-mono text-[#E5A93C]">₹899</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('subscription-baskets')}
                  className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left flex items-center justify-between w-full pr-4"
                >
                  <span>Grand Kitchen Basket (16.0 kg)</span>
                  <span className="font-mono text-[#E5A93C]">₹1,499</span>
                </button>
              </li>
              <li className="pt-2 text-[11px] text-[#A8B8AB]">
                Free morning doorstep delivery every Tuesday &amp; Friday.
              </li>
            </ul>
          </div>

          {/* Portals & Contact */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#FAF7EE] font-bold block mb-3">
              Farm &amp; Agent Hub
            </span>
            <ul className="space-y-2 text-xs text-[#CBD5CD]">
              <li>
                <button
                  onClick={() => setActiveView('agent-panel')}
                  className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[15px]">two_wheeler</span>
                  <span>Field Agent Route Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('admin-panel')}
                  className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[15px]">admin_panel_settings</span>
                  <span>Founder Admin Console</span>
                </button>
              </li>
              <li className="pt-2">
                <a
                  href={BRAND_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] text-white font-bold text-xs shadow-md"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>WhatsApp: {BRAND_INFO.phone}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#243E28] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CBD5CD]">
          <div>
            &copy; {new Date().getFullYear()} <strong>PureKhetar</strong> · {BRAND_INFO.tagline}. All rights reserved.
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#A8B8AB]">
            <span>Kamana, Visnagar, Mehsana</span>
            <span>•</span>
            <span className="text-[#E5A93C] font-semibold">{BRAND_INFO.mission}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
