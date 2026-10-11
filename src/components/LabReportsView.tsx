import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BRAND_INFO } from '../data/mockData';

export const LabReportsView: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const testResults = [
    { name: 'Common Market Insecticides (Chlorpyrifos, Malathion)', marketNorm: 'Allowed up to 0.10 ppm', pureKhetarResult: '0.00% (Zero Detected)', verdict: '100% CLEAN' },
    { name: 'Artificial Ripening Chemicals (Ethylene gas, Calcium carbide)', marketNorm: 'Frequently Used in Mandis', pureKhetarResult: '0.00% (Strictly Prohibited)', verdict: '100% NATURAL' },
    { name: 'Synthetic Weedkillers & Herbicides (Glyphosate)', marketNorm: 'Frequently found in soil', pureKhetarResult: '0.00% (Zero Detected)', verdict: '100% CLEAN' },
    { name: 'Chemical Fungicides (Bavistin, Mancozeb)', marketNorm: 'Allowed up to 0.05 ppm', pureKhetarResult: '0.00% (Zero Detected)', verdict: '100% CLEAN' },
    { name: 'Toxic Heavy Metals (Lead, Cadmium, Arsenic)', marketNorm: 'Allowed below 0.05 ppm', pureKhetarResult: 'Safe Natural Trace Only', verdict: 'SAFE FOR BABIES' }
  ];

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
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
            ACCREDITED LABORATORY TESTING · SPU STUDENT STARTUP
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E3F20] dark:text-[#FAF5EA]">
            Purity &amp; Zero-Chemical Lab Reports
          </h1>
          <p className="text-xs sm:text-sm text-[#556357] dark:text-[#CBD5CD] max-w-2xl mt-2 font-light">
            Every batch of vegetables from our Kamana, Visnagar farm is tested in certified laboratories. We guarantee 100% zero-chemical, safe for children and families.
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E3F20] text-[#FAF7EE] font-bold text-xs tracking-wider hover:bg-[#163519] transition-all cursor-pointer shadow-md shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          <span>{downloadSuccess ? 'Downloaded PureKhetar PDF' : 'Download Complete Lab Certificate'}</span>
        </button>
      </motion.div>

      {/* Lab Results Table (Loaded on Scroll) */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-[#FFFDF9] dark:bg-[#141F16] p-6 sm:p-8 border border-[#E3DAC6] dark:border-[#283C2C] space-y-4 shadow-lg"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#1E3F20] dark:text-[#FAF5EA] font-bold">
              Comparison: Market Mandi Produce vs. PureKhetar Organic
            </h3>
            <span className="text-xs text-[#556357] dark:text-[#CBD5CD]">
              Certified testing conducted by accredited laboratory for Kamana farm harvest.
            </span>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#EBF2EB] dark:bg-[#203423] text-[#1E3F20] dark:text-[#4ADE80] text-xs font-bold font-mono">
            100% Zero-Chemical Verified ✓
          </span>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E3DAC6] dark:border-[#283C2C] text-[#556357] dark:text-[#CBD5CD] font-mono">
                <th className="py-3 px-4">HARMFUL CHEMICAL / PESTICIDE</th>
                <th className="py-3 px-4">REGULAR MARKET NORMS</th>
                <th className="py-3 px-4">PUREKHETAR TEST RESULT</th>
                <th className="py-3 px-4 text-right">SAFETY VERDICT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3DAC6]/60 dark:divide-[#283C2C]/60">
              {testResults.map((t, idx) => (
                <tr key={idx} className="hover:bg-[#FAF7EE] dark:hover:bg-[#1B291D] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-[#1C271E] dark:text-[#FAF5EA]">{t.name}</td>
                  <td className="py-3.5 px-4 text-[#79887C]">{t.marketNorm}</td>
                  <td className="py-3.5 px-4 font-bold text-[#1E3F20] dark:text-[#4ADE80] font-mono">
                    {t.pureKhetarResult}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2EB] dark:bg-[#203423] text-[#1E3F20] dark:text-[#4ADE80] font-bold font-mono text-[11px]">
                      {t.verdict}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* University & Safety Guarantee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C] space-y-2 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#EBF2EB] dark:bg-[#203423] text-[#1E3F20] dark:text-[#4ADE80] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">school</span>
          </div>
          <h4 className="font-serif text-lg font-bold text-[#1E3F20] dark:text-[#FAF5EA]">SPU AgTech Startup</h4>
          <p className="text-xs text-[#556357] dark:text-[#CBD5CD] leading-relaxed">
            Supported by Sankalchand Patel University to pioneer scientific, transparent organic agriculture in the Mehsana region.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C] space-y-2 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#F5ECE5] dark:bg-[#2D211B] text-[#C86D3B] dark:text-[#E0854E] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">child_care</span>
          </div>
          <h4 className="font-serif text-lg font-bold text-[#1E3F20] dark:text-[#FAF5EA]">Safe for Infants &amp; Elders</h4>
          <p className="text-xs text-[#556357] dark:text-[#CBD5CD] leading-relaxed">
            Zero chemical residues mean children and elderly family members can eat wholesome salads, juices, and meals with absolute peace of mind.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C] space-y-2 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#EBF2EB] dark:bg-[#203423] text-[#1E3F20] dark:text-[#4ADE80] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">verified</span>
          </div>
          <h4 className="font-serif text-lg font-bold text-[#1E3F20] dark:text-[#FAF5EA]">Kamana Soil Stewardship</h4>
          <p className="text-xs text-[#556357] dark:text-[#CBD5CD] leading-relaxed">
            Our farmers rely strictly on desi cow dung compost, neem cake, and Jeevamrutha bio-culture. We never add synthetic urea or DAP.
          </p>
        </div>
      </div>
    </div>
  );
};
