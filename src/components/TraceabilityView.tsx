import React, { useState } from 'react';
import { motion } from 'motion/react';

interface TraceabilityViewProps {
  onOpenScanner?: () => void;
}

export const TraceabilityView: React.FC<TraceabilityViewProps> = ({ onOpenScanner }) => {
  const [searchHash, setSearchHash] = useState('#0x89F4');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedResult, setVerifiedResult] = useState<any>({
    batch: '#0x89F4',
    vegetables: 'Sweet Desi Tomatoes & Fresh Palak (देशी टमाटर और पालक)',
    farmer: 'Somabhai Patel (Lead Organic Farmer, Mehsana, Gujarat)',
    harvestTime: '5:45 AM Today (Sunrise Hand Picked)',
    plot: 'Plot 1 · Sunny Bed, Mehsana Farmland, Gujarat',
    labTest: '0.00% Pesticides (Certified 100% Clean by NABL Lab)',
    sweetness: 'Natural Sweetness & High Freshness',
    waterSource: '100% Clean Tube-well Water',
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
          ? 'Fresh Cauliflower & Green Bhindi (फूलगोभी और भिंडी)'
          : searchHash.includes('63')
            ? 'Tender Baby Palak & Methi Bundle (पालक और मेथी)'
            : 'Sweet Desi Tomatoes & Fresh Palak (देशी टमाटर और पालक)',
        farmer: 'Somabhai Patel (Lead Organic Farmer, Mehsana, Gujarat)',
        harvestTime: '5:45 AM Today (Sunrise Hand Picked)',
        plot: 'Plot 1 · Mehsana Organic Farmland, Gujarat',
        labTest: '0.00% Pesticides (Certified 100% Clean by NABL Lab)',
        sweetness: 'Natural Sweetness & High Freshness',
        waterSource: '100% Clean Tube-well Water',
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
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6"
      >
        <div>
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider block mb-1">
            FARM PURITY &amp; HARVEST ORIGIN CHECK · INDIA
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-white">
            Verify Your Vegetable Harvest &amp; Origin
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl mt-2 font-light">
            Every basket comes with a verification code. Check the exact farmer name, Gujarat farm plot, morning picking time, and clean lab test results.
          </p>
        </div>
      </motion.div>

      {/* Search Bar (Loaded on Scroll) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-neutral-950 p-6 sm:p-8 border border-white/10 space-y-4 shadow-xl"
      >
        <h3 className="font-serif text-xl text-white">Check Your Crate Code or Scan with Camera</h3>
        <p className="text-xs text-neutral-400">
          Enter the code printed on your wooden crate tag (e.g. #0x89F4) or scan the QR code using your phone camera.
        </p>

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative flex-1 w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]">
              tag
            </span>
            <input
              type="text"
              value={searchHash}
              onChange={(e) => setSearchHash(e.target.value)}
              placeholder="Enter batch code e.g. #0x89F4 or #0x77BC"
              className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-3.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-emerald-400"
            />
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shadow-md"
          >
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>{isVerifying ? 'Checking Farm Records...' : 'Check Farm Record'}</span>
          </button>

          {onOpenScanner && (
            <button
              type="button"
              onClick={onOpenScanner}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-emerald-400 hover:text-black text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/10 hover:border-emerald-400 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px] text-emerald-400">qr_code_scanner</span>
              <span>Scan QR with Camera</span>
            </button>
          )}
        </form>

        {/* Quick Sample Batch Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-neutral-500">Quick Test Batches:</span>
          {['#0x89F4', '#0x77BC', '#0x63EA'].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setSearchHash(code)}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-400 font-mono text-xs cursor-pointer"
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
          className="rounded-3xl bg-neutral-950 p-6 sm:p-10 border border-emerald-400/40 shadow-2xl space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider font-bold">
                  VERIFIED HARVEST RECORD
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                Batch {verifiedResult.batch} · 100% Genuine Farm Harvest
              </h2>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-emerald-400/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-400/30 flex items-center gap-2 self-start sm:self-auto">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>CERTIFIED SAFE &amp; PURE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            {[
              { label: 'VEGETABLES IN BATCH', value: verifiedResult.vegetables, sub: 'Hand sorted and quality checked', isSerif: true },
              { label: 'LEAD FARMER', value: verifiedResult.farmer, sub: '18 years practicing organic natural farming' },
              { label: 'SUNRISE PICKING TIME', value: verifiedResult.harvestTime, sub: 'Plucked while morning dew is fresh', isEmerald: true, isMono: true },
              { label: 'FARM LOCATION', value: verifiedResult.plot, sub: 'Living compost soil, zero chemical spray' },
              { label: 'LAB TEST RESULT', value: verifiedResult.labTest, sub: 'Zero synthetic chemical detected', isEmerald: true, isMono: true },
              { label: 'FARM TO KITCHEN TIMELINE', value: verifiedResult.journey, sub: 'Zero cold storage warehouse delay', isSubEmerald: true }
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1"
              >
                <span className="text-neutral-400 block font-mono text-[10px]">{item.label}</span>
                <strong className={`text-white text-sm block ${item.isSerif ? 'font-serif' : ''} ${item.isEmerald ? 'text-emerald-400 font-mono' : ''}`}>
                  {item.value}
                </strong>
                <span className={item.isSubEmerald ? 'text-emerald-300' : item.isEmerald ? 'text-neutral-300' : 'text-neutral-300'}>
                  {item.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
