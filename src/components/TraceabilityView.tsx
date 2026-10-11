import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BRAND_INFO } from '../data/mockData';

interface TraceabilityViewProps {
  onOpenScanner?: () => void;
}

export const TraceabilityView: React.FC<TraceabilityViewProps> = ({ onOpenScanner }) => {
  const [searchHash, setSearchHash] = useState('#PK-89F4');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedResult, setVerifiedResult] = useState<any>({
    batch: '#PK-89F4',
    vegetables: 'Fresh Desi Baingan & Vine Tomatoes (देशी बैंगन और टमाटर)',
    farmer: 'Kamana Experienced Farmers (Lead: Somabhai & Het Patel)',
    harvestTime: '5:45 AM Today (Sunrise Hand Picked)',
    plot: 'Plot 1 · Kamana Organic Farmland, Visnagar',
    labTest: '100% Zero-Chemical & Pesticide-Free (0.00% Pesticides)',
    sweetness: 'Crisp Natural Sweetness & Village Fragrance',
    waterSource: 'Kamana Tube-well Solar Drip Water',
    packaging: 'Eco-friendly Ventilated Cotton Crate',
    journey: 'Plucked at 5:45 AM → Delivered to Your Door in 4 Hours'
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedResult({
        batch: searchHash,
        vegetables: searchHash.includes('77')
          ? 'Fresh Cauliflower & Snap Bhindi (फूलगोभी और भिंडी)'
          : searchHash.includes('63')
            ? 'Tender Baby Palak & Methi Bundle (पालक और मेथी)'
            : 'Fresh Desi Baingan & Vine Tomatoes (देशी बैंगन और टमाटर)',
        farmer: 'Kamana Experienced Farmers (Lead: Somabhai & Het Patel)',
        harvestTime: '5:45 AM Today (Sunrise Hand Picked)',
        plot: 'Plot 1 · Kamana Organic Farmland, Visnagar',
        labTest: '100% Zero-Chemical & Pesticide-Free (0.00% Pesticides)',
        sweetness: 'Crisp Natural Sweetness & Village Fragrance',
        waterSource: 'Kamana Tube-well Solar Drip Water',
        packaging: 'Eco-friendly Ventilated Cotton Crate',
        journey: 'Plucked at 5:45 AM → Delivered to Your Door in 4 Hours'
      });
    }, 400);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E3DAC6] dark:border-[#283C2C] pb-6"
      >
        <div>
          <span className="text-[#C86D3B] dark:text-[#E0854E] font-mono text-xs uppercase tracking-wider font-bold block mb-1">
            🌱 PURITY &amp; HARVEST ORIGIN CHECK · PUREKHETAR INDIA
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E3F20] dark:text-[#FAF5EA]">
            Verify Your PureKhetar Crate Origin
          </h1>
          <p className="text-xs sm:text-sm text-[#556357] dark:text-[#CBD5CD] max-w-2xl mt-2 font-light">
            Every vegetable crate comes with a QR tag. Verify the exact Kamana farm plot, local farmer, dawn picking time, and 0.00% pesticide test results.
          </p>
        </div>

        <a
          href={BRAND_INFO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1E3F20] text-[#FAF7EE] text-xs font-semibold shadow-sm hover:bg-[#163519]"
        >
          <span className="material-symbols-outlined text-[16px]">chat</span>
          <span>WhatsApp Query: {BRAND_INFO.phone}</span>
        </a>
      </motion.div>

      {/* Search Bar (Loaded on Scroll) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] p-6 sm:p-8 border border-[#E3DAC6] dark:border-[#283C2C] space-y-4 shadow-lg"
      >
        <h3 className="font-serif text-xl text-[#1E3F20] dark:text-[#FAF5EA] font-bold">
          Check Your Crate Code or Scan with Camera
        </h3>
        <p className="text-xs text-[#556357] dark:text-[#CBD5CD]">
          Enter the code printed on your crate tag (e.g. #PK-89F4) or scan the QR code using your phone camera.
        </p>

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative flex-1 w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#79887C] text-[18px]">
              tag
            </span>
            <input
              type="text"
              value={searchHash}
              onChange={(e) => setSearchHash(e.target.value)}
              placeholder="Enter batch code e.g. #PK-89F4 or #PK-77BC"
              className="w-full bg-[#FAF7EE] dark:bg-[#141F16] border border-[#DED4BE] dark:border-[#283C2C] rounded-full pl-11 pr-4 py-3.5 text-xs text-[#1C271E] dark:text-[#FAF5EA] placeholder-[#79887C] font-mono focus:outline-none focus:border-[#1E3F20]"
            />
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1E3F20] hover:bg-[#163519] text-[#FAF7EE] text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shadow-md"
          >
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>{isVerifying ? 'Checking Farm Records...' : 'Check PureKhetar Record'}</span>
          </button>

          {onOpenScanner && (
            <button
              type="button"
              onClick={onOpenScanner}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#EFE8D8] hover:bg-[#E2D8C3] dark:bg-[#203223] dark:hover:bg-[#2A422F] text-[#1E3F20] dark:text-[#FAF5EA] text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#DFD5BE] dark:border-[#283C2C] whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px] text-[#C86D3B]">qr_code_scanner</span>
              <span>Scan QR with Camera</span>
            </button>
          )}
        </form>

        {/* Quick Sample Batch Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-[#556357] dark:text-[#CBD5CD]">Quick Test Batches:</span>
          {['#PK-89F4', '#PK-77BC', '#PK-63EA'].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setSearchHash(code)}
              className="px-3 py-1 rounded-full bg-[#EFE8D8] dark:bg-[#1A261D] hover:bg-[#E2D8C3] border border-[#DFD5BE] dark:border-[#283C2C] text-[#1E3F20] dark:text-[#4ADE80] font-mono text-xs cursor-pointer font-bold"
            >
              {code}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Verified Record Display (Loaded on Scroll) */}
      {verifiedResult && (
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] p-6 sm:p-10 border-2 border-[#1E3F20] dark:border-[#4ADE80] shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3DAC6] dark:border-[#283C2C] gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-[#C86D3B] dark:text-[#E0854E] block">
                AUTHENTICATED HARVEST RECORD · {verifiedResult.batch}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1E3F20] dark:text-[#FAF5EA] mt-0.5">
                {verifiedResult.vegetables}
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EBF2EB] dark:bg-[#203423] text-[#1E3F20] dark:text-[#4ADE80] text-xs font-bold font-mono">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>100% Zero-Chemical Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF7EE] dark:bg-[#141F16] border border-[#E3DAC6] dark:border-[#283C2C] space-y-1">
              <span className="text-[#556357] dark:text-[#CBD5CD] block">Grower &amp; Farmer Team:</span>
              <strong className="text-sm text-[#1E3F20] dark:text-[#FAF5EA]">{verifiedResult.farmer}</strong>
              <p className="text-[#79887C] text-[11px]">Cultivated with traditional natural farming wisdom in Kamana.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7EE] dark:bg-[#141F16] border border-[#E3DAC6] dark:border-[#283C2C] space-y-1">
              <span className="text-[#556357] dark:text-[#CBD5CD] block">Harvest Timestamp:</span>
              <strong className="text-sm text-[#1E3F20] dark:text-[#FAF5EA]">{verifiedResult.harvestTime}</strong>
              <p className="text-[#79887C] text-[11px]">Plucked before the sun gets hot to protect natural enzymes.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7EE] dark:bg-[#141F16] border border-[#E3DAC6] dark:border-[#283C2C] space-y-1">
              <span className="text-[#556357] dark:text-[#CBD5CD] block">Kamana Farm Plot:</span>
              <strong className="text-sm text-[#1E3F20] dark:text-[#FAF5EA]">{verifiedResult.plot}</strong>
              <p className="text-[#79887C] text-[11px]">Rich living loam soil enriched with cow dung compost.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7EE] dark:bg-[#141F16] border border-[#E3DAC6] dark:border-[#283C2C] space-y-1">
              <span className="text-[#556357] dark:text-[#CBD5CD] block">Lab Chemical Test:</span>
              <strong className="text-sm text-[#2E5A33] dark:text-[#4ADE80]">{verifiedResult.labTest}</strong>
              <p className="text-[#79887C] text-[11px]">Zero synthetic insecticides detected by certified lab.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#EFE8D8] dark:bg-[#1A261D] border border-[#DFD5BE] dark:border-[#283C2C] flex items-center justify-between text-xs text-[#1E3F20] dark:text-[#FAF5EA]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#C86D3B] text-[20px]">local_shipping</span>
              <span>{verifiedResult.journey}</span>
            </div>
            <span className="font-mono text-[11px] text-[#C86D3B] dark:text-[#E0854E] font-bold">
              PureKhetar Doorstep Express
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
