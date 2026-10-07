import React from 'react';
import { ActiveView } from '../types';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView }) => {
  return (
    <footer className="relative z-10 w-full bg-neutral-950/95 border-t border-white/10 backdrop-blur-xl mt-20 text-neutral-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-[24px]">eco</span>
              <span className="font-serif text-lg tracking-wider text-white uppercase font-bold">
                AURA TERRA
              </span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-300 max-w-xs font-light">
              100% natural organic farm in Mehsana, Gujarat. Grown with desi cow compost and sweet tube-well water.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-mono text-emerald-400 tracking-wider uppercase font-semibold">
                Daily Sunrise Harvest Active
              </span>
            </div>
          </div>

          {/* Quick Pages */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold block mb-3">
              Explore Our Farm
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveView('harvest-live')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Today&apos;s Fresh Harvest
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('the-plots')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Our 10 Bigha Plots
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('telemetry')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Live Farm Weather &amp; Soil
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('traceability')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Check Crate Origin
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold block mb-3">
              Weekly Vegetable Boxes
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveView('subscription-baskets')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Small Family Box (&#8377;499/wk)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('subscription-baskets')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Family Regular Box (&#8377;899/wk)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('subscription-baskets')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Grand Kitchen Box (&#8377;1,499/wk)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('lab-reports')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Zero-Chemical Lab Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Farm Contact & Guarantee */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold block mb-3">
              Pure Food Guarantee
            </span>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
                <span>Lab Standard</span>
                <span className="text-emerald-400 font-bold">100% PURE</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                If you ever find any chemical residue or spoiled vegetables in your box, we replace the entire basket for free with no questions asked.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-neutral-500 gap-4">
          <span>&copy; 2026 Aura Terra Organic Farms India Pvt. Ltd. All rights reserved.</span>
          <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-400">
            <span>Mehsana, Gujarat</span>
            <span>&bull;</span>
            <span className="text-emerald-400">0.00% Pesticides Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
