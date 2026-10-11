import React from 'react';
import { ProduceLot } from '../types';
import { BRAND_INFO } from '../data/mockData';

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
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-2xl w-full rounded-3xl bg-[#FAF7EE] dark:bg-[#141F16] border-2 border-[#1E3F20] dark:border-[#4ADE80] p-6 md:p-8 space-y-6 shadow-2xl relative text-[#1C271E] dark:text-[#FAF5EA]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EFE8D8] dark:bg-[#1A261D] hover:bg-[#E2D8C3] flex items-center justify-center text-[#1E3F20] dark:text-[#FAF5EA] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative w-full sm:w-52 h-52 rounded-2xl overflow-hidden shrink-0 border border-[#DED4BE] dark:border-[#283C2C] bg-[#EFE8D8]">
            <img
              src={lot.imageUrl}
              alt={lot.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-[#1E3F20] text-[#FAF7EE] text-xs font-mono font-bold shadow-md">
              ₹{lot.pricePerKg} / kg
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <span className="text-[#C86D3B] dark:text-[#E0854E] font-mono text-xs uppercase tracking-wider font-bold block">
              {lot.plot}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1E3F20] dark:text-[#FAF5EA]">{lot.name}</h2>
            <p className="text-sm text-[#C86D3B] dark:text-[#E0854E] font-semibold">{lot.hindiName}</p>
            <p className="text-xs text-[#556357] dark:text-[#CBD5CD] leading-relaxed font-light pt-1">
              {lot.simpleDescription}
            </p>
          </div>
        </div>

        {/* Detailed Metrics in Simple Words */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C]">
            <span className="text-[#79887C] text-[10px] block font-mono font-bold">HARVEST TIME</span>
            <span className="text-[#1E3F20] dark:text-[#FAF5EA] font-bold">{lot.harvestTime}</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C]">
            <span className="text-[#79887C] text-[10px] block font-mono font-bold">PURITY SCORE</span>
            <span className="text-[#1E3F20] dark:text-[#4ADE80] font-bold">{lot.freshnessScore}% Pure</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C]">
            <span className="text-[#79887C] text-[10px] block font-mono font-bold">NATURAL TASTE</span>
            <span className="text-[#C86D3B] dark:text-[#E0854E] font-bold">{lot.sweetnessRating.split('with')[0]}</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C]">
            <span className="text-[#79887C] text-[10px] block font-mono font-bold">CHEMICAL TEST</span>
            <span className="text-[#1E3F20] dark:text-[#4ADE80] font-bold">0.00% Pesticides</span>
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-4 border-t border-[#E3DAC6] dark:border-[#283C2C] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#556357] dark:text-[#CBD5CD]">
            Irrigation: <span className="text-[#1E3F20] dark:text-[#FAF5EA] font-semibold">{lot.waterSource}</span>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <a
              href={`${BRAND_INFO.whatsappLink}&text=Hi%20PureKhetar!%20I%20have%20a%20question%20about%20${encodeURIComponent(lot.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onReserve(lot);
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1E3F20] hover:bg-[#163519] text-[#FAF7EE] font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              <span>Add to This Week&apos;s Basket</span>
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
