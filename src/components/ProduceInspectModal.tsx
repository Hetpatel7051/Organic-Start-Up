import React from 'react';
import { ProduceLot } from '../types';

interface ProduceInspectModalProps {
  lot: ProduceLot | null;
  onClose: () => void;
  onReserve: (lot: ProduceLot) => void;
}

export const ProduceInspectModal: React.FC<ProduceInspectModalProps> = ({
  lot,
  onClose,
  onReserve
}) => {
  if (!lot) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-2xl w-full rounded-3xl bg-neutral-950 border border-emerald-400/50 p-6 md:p-8 space-y-6 shadow-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative w-full sm:w-52 h-52 rounded-2xl overflow-hidden shrink-0 border border-white/10">
            <img
              src={lot.imageUrl}
              alt={lot.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/70 text-emerald-400 text-xs font-mono font-bold border border-emerald-400/30">
              &#8377;{lot.pricePerKg} / kg
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider block">
              {lot.plot}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold">{lot.name}</h2>
            <p className="text-sm text-emerald-300 font-medium">{lot.hindiName}</p>
            <p className="text-xs text-neutral-300 leading-relaxed font-light pt-1">
              {lot.simpleDescription}
            </p>
          </div>
        </div>

        {/* Detailed Metrics in Simple Words */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-neutral-400 text-[10px] block">HARVEST TIME</span>
            <span className="text-white font-bold">{lot.harvestTime}</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-neutral-400 text-[10px] block">FRESHNESS</span>
            <span className="text-emerald-400 font-bold">{lot.freshnessScore}% Pure</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-neutral-400 text-[10px] block">TASTE RATING</span>
            <span className="text-emerald-300 font-bold">{lot.sweetnessRating}</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-neutral-400 text-[10px] block">CHEMICAL TEST</span>
            <span className="text-emerald-400 font-bold">{lot.pesticideFree}</span>
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-400">
            Watered With: <span className="text-white font-medium">{lot.waterSource}</span>
          </div>

          <button
            onClick={() => {
              onReserve(lot);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-400 hover:bg-emerald-300 text-black font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
          >
            <span>Add to This Week&apos;s Basket</span>
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
          </button>
        </div>
      </div>
    </div>
  );
};
