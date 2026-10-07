import React, { useState } from 'react';
import { motion } from 'motion/react';

export const LabReportsView: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const testResults = [
    { name: 'Common Market Insecticides (Chlorpyrifos, Malathion)', marketNorm: 'Allowed up to 0.10 ppm', auraResult: '0.00% (Zero Detected)', verdict: '100% CLEAN' },
    { name: 'Artificial Ripening Chemicals (Ethylene gas, Calcium carbide)', marketNorm: 'Frequently Used in Mandis', auraResult: '0.00% (Strictly Prohibited)', verdict: '100% NATURAL' },
    { name: 'Synthetic Weedkillers & Herbicides (Glyphosate)', marketNorm: 'Frequently found in soil', auraResult: '0.00% (Zero Detected)', verdict: '100% CLEAN' },
    { name: 'Chemical Fungicides (Bavistin, Mancozeb)', marketNorm: 'Allowed up to 0.05 ppm', auraResult: '0.00% (Zero Detected)', verdict: '100% CLEAN' },
    { name: 'Toxic Heavy Metals (Lead, Cadmium, Arsenic)', marketNorm: 'Allowed below 0.05 ppm', auraResult: 'Safe Natural Trace', verdict: 'SAFE FOR BABIES' }
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
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6"
      >
        <div>
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider block mb-1">
            GOVERNMENT ACCREDITED LABORATORY TESTING · INDIA
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-white">
            Purity &amp; Zero-Chemical Lab Reports
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl mt-2 font-light">
            Every batch of vegetables is tested in certified laboratories. We guarantee 0.00% chemical spray, safe for pregnant women, babies, and elders.
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-400 text-black font-bold text-xs tracking-wider hover:bg-emerald-300 transition-all cursor-pointer shadow-lg shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          <span>{downloadSuccess ? 'Downloaded Official NABL PDF' : 'Download Complete Lab Certificate'}</span>
        </button>
      </motion.div>

      {/* Lab Results Table (Loaded on Scroll) */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-neutral-950 p-6 sm:p-8 border border-white/10 space-y-4 shadow-2xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-white">
              Pesticide Residue Test Report (Screening 450+ Chemicals)
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Testing Standards: Food Safety and Standards Authority of India (FSSAI) &amp; NABL Accredited Laboratory
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-400/30 self-start sm:self-auto">
            100% PURE &amp; CLEAN
          </span>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-neutral-400 font-mono">
                <th className="py-3 px-4">CHEMICAL TESTED</th>
                <th className="py-3 px-4">ORDINARY MANDI VEGETABLES</th>
                <th className="py-3 px-4">AURA TERRA ORGANIC</th>
                <th className="py-3 px-4 text-right">LAB VERDICT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {testResults.map((t, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 text-white font-medium">{t.name}</td>
                  <td className="py-3.5 px-4 text-neutral-400">{t.marketNorm}</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">{t.auraResult}</td>
                  <td className="py-3.5 px-4 text-right text-emerald-300 font-bold font-mono">{t.verdict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Health & Nutrition Benefits (Staggered Animation on Scroll) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: 'nutrition',
            title: 'Natural Vitamin C & Antioxidants',
            desc: '+45% higher natural Vitamin C in our Desi Tomatoes and Shimla Mirch because vegetables ripen under Gujarat sunshine, not in artificial gas chambers.'
          },
          {
            icon: 'spa',
            title: 'Iron in Palak & Methi',
            desc: 'Our leafy greens grow in living compost soil rich in natural minerals, giving your family genuine dietary iron and chlorophyll for healthy hemoglobin.'
          },
          {
            icon: 'family_restroom',
            title: '100% Safe for Children & Elders',
            desc: 'Zero chemical residues mean you can feed fresh salads, cucumber slices, and vegetable soups to toddlers and grandparents without fear of toxins.'
          }
        ].map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            className="p-6 rounded-2xl bg-neutral-950 border border-white/10 space-y-2 shadow-xl"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            </div>
            <h4 className="font-serif text-lg text-white font-bold">{item.title}</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
