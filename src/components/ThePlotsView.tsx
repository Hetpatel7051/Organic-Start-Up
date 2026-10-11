import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FARM_PLOTS, BRAND_INFO } from '../data/mockData';
import { FarmPlot } from '../types';

export const ThePlotsView: React.FC = () => {
  const [selectedPlot, setSelectedPlot] = useState<FarmPlot>(FARM_PLOTS[0]);

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
            KAMANA ORGANIC FARMLAND · VISNAGAR, MEHSANA · SPU STARTUP
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E3F20] dark:text-[#FAF5EA]">
            Our 10 Bigha PureKhetar Farm Map
          </h1>
          <p className="text-xs sm:text-sm text-[#556357] dark:text-[#CBD5CD] max-w-2xl mt-2 font-light">
            Interactive map of our four dedicated vegetable plots in Kamana, Visnagar, solar tube-well drip canals, and natural living compost beds.
          </p>
        </div>

        <a
          href={BRAND_INFO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1E3F20] text-[#FAF7EE] text-xs font-semibold shadow-sm hover:bg-[#163519]"
        >
          <span className="material-symbols-outlined text-[16px]">location_on</span>
          <span>Kamana, Visnagar · WhatsApp: {BRAND_INFO.phone}</span>
        </a>
      </motion.div>

      {/* Map Layout (Loaded on Scroll) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: SVG Farm Map */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8 rounded-3xl bg-[#FAF7EE] dark:bg-[#141F16] p-6 border border-[#E3DAC6] dark:border-[#283C2C] relative overflow-hidden flex flex-col justify-between min-h-[460px] shadow-lg"
        >
          <div className="flex justify-between items-center z-10 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#EBF2EB] dark:bg-[#203423] text-[#1E3F20] dark:text-[#4ADE80] border border-[#74A878] font-mono font-bold">
              GPS: Kamana Farmland, Visnagar, Mehsana
            </span>
            <span className="text-[#556357] dark:text-[#CBD5CD] font-mono">10 Bigha Fertile Living Soil</span>
          </div>

          {/* SVG Map */}
          <div className="my-6 relative flex items-center justify-center">
            <svg viewBox="0 0 600 360" className="w-full max-w-2xl h-auto drop-shadow-md">
              <rect width="600" height="360" rx="16" fill="#F4EFE3" className="dark:fill-[#18241B]" />

              {/* Water Canal Path */}
              <path
                d="M 50 180 Q 200 130, 350 200 T 580 160"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="7"
                strokeOpacity="0.5"
                strokeDasharray="6 4"
              />
              <text x="360" y="225" fill="#0284c7" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">Kamana Well Drip Canal</text>

              {/* Plot 1 */}
              <g
                onClick={() => setSelectedPlot(FARM_PLOTS[0])}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <rect
                  x="60"
                  y="40"
                  width="220"
                  height="120"
                  rx="12"
                  fill={selectedPlot.id === 'plot-1' ? '#1E3F20' : '#FFFDF9'}
                  stroke={selectedPlot.id === 'plot-1' ? '#C86D3B' : '#DED4BE'}
                  strokeWidth={selectedPlot.id === 'plot-1' ? '2.5' : '1.5'}
                />
                <text x="80" y="70" fill={selectedPlot.id === 'plot-1' ? '#E5A93C' : '#1E3F20'} fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">PLOT 1 (2.5 Bigha)</text>
                <text x="80" y="95" fill={selectedPlot.id === 'plot-1' ? '#FAF7EE' : '#1C271E'} fontSize="14" fontFamily="Playfair Display" fontWeight="bold">Baingan &amp; Desi Tamatar</text>
                <text x="80" y="120" fill={selectedPlot.id === 'plot-1' ? '#CBD5CD' : '#5E6D60'} fontSize="11" fontFamily="Plus Jakarta Sans">देशी गोल बैंगन और टमाटर</text>
              </g>

              {/* Plot 2 */}
              <g
                onClick={() => setSelectedPlot(FARM_PLOTS[1])}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <rect
                  x="310"
                  y="40"
                  width="230"
                  height="120"
                  rx="12"
                  fill={selectedPlot.id === 'plot-2' ? '#1E3F20' : '#FFFDF9'}
                  stroke={selectedPlot.id === 'plot-2' ? '#C86D3B' : '#DED4BE'}
                  strokeWidth={selectedPlot.id === 'plot-2' ? '2.5' : '1.5'}
                />
                <text x="330" y="70" fill={selectedPlot.id === 'plot-2' ? '#E5A93C' : '#1E3F20'} fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">PLOT 2 (2.0 Bigha)</text>
                <text x="330" y="95" fill={selectedPlot.id === 'plot-2' ? '#FAF7EE' : '#1C271E'} fontSize="14" fontFamily="Playfair Display" fontWeight="bold">Leafy Palak &amp; Methi</text>
                <text x="330" y="120" fill={selectedPlot.id === 'plot-2' ? '#CBD5CD' : '#5E6D60'} fontSize="11" fontFamily="Plus Jakarta Sans">पालक, मेथी, ताज़ा धनिया</text>
              </g>

              {/* Plot 3 */}
              <g
                onClick={() => setSelectedPlot(FARM_PLOTS[2])}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <rect
                  x="60"
                  y="190"
                  width="220"
                  height="120"
                  rx="12"
                  fill={selectedPlot.id === 'plot-3' ? '#1E3F20' : '#FFFDF9'}
                  stroke={selectedPlot.id === 'plot-3' ? '#C86D3B' : '#DED4BE'}
                  strokeWidth={selectedPlot.id === 'plot-3' ? '2.5' : '1.5'}
                />
                <text x="80" y="220" fill={selectedPlot.id === 'plot-3' ? '#E5A93C' : '#1E3F20'} fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">PLOT 3 (3.0 Bigha)</text>
                <text x="80" y="245" fill={selectedPlot.id === 'plot-3' ? '#FAF7EE' : '#1C271E'} fontSize="14" fontFamily="Playfair Display" fontWeight="bold">Phool Gobi &amp; Bhindi</text>
                <text x="80" y="270" fill={selectedPlot.id === 'plot-3' ? '#CBD5CD' : '#5E6D60'} fontSize="11" fontFamily="Plus Jakarta Sans">ताज़ा फूलगोभी और भिंडी</text>
              </g>

              {/* Plot 4 */}
              <g
                onClick={() => setSelectedPlot(FARM_PLOTS[3])}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <rect
                  x="310"
                  y="190"
                  width="230"
                  height="120"
                  rx="12"
                  fill={selectedPlot.id === 'plot-4' ? '#1E3F20' : '#FFFDF9'}
                  stroke={selectedPlot.id === 'plot-4' ? '#C86D3B' : '#DED4BE'}
                  strokeWidth={selectedPlot.id === 'plot-4' ? '2.5' : '1.5'}
                />
                <text x="330" y="220" fill={selectedPlot.id === 'plot-4' ? '#E5A93C' : '#1E3F20'} fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">PLOT 4 (2.5 Bigha)</text>
                <text x="330" y="245" fill={selectedPlot.id === 'plot-4' ? '#FAF7EE' : '#1C271E'} fontSize="14" fontFamily="Playfair Display" fontWeight="bold">Dudhi, Kheera &amp; Gajar</text>
                <text x="330" y="270" fill={selectedPlot.id === 'plot-4' ? '#CBD5CD' : '#5E6D60'} fontSize="11" fontFamily="Plus Jakarta Sans">ताज़ा लौकी / दूधी, काकड़ी, गाजर</text>
              </g>
            </svg>
          </div>

          <div className="flex justify-between items-center z-10 text-xs text-[#556357] dark:text-[#CBD5CD]">
            <span>Click any plot above to see live crop conditions</span>
            <span className="text-[#1E3F20] dark:text-[#4ADE80] font-mono font-bold">100% Zero Chemical Spray</span>
          </div>
        </motion.div>

        {/* Right: Selected Plot Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4 rounded-3xl bg-[#FAF7EE] dark:bg-[#141F16] p-6 sm:p-8 border border-[#E3DAC6] dark:border-[#283C2C] space-y-6 flex flex-col justify-between shadow-lg"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#1E3F20] text-[#FAF7EE] font-mono text-xs font-bold">
                {selectedPlot.code}
              </span>
              <span className="text-xs text-[#C86D3B] font-mono font-bold">{selectedPlot.area}</span>
            </div>

            <h2 className="font-serif text-2xl text-[#1E3F20] dark:text-[#FAF5EA] font-bold">{selectedPlot.name}</h2>
            <p className="text-sm text-[#C86D3B] dark:text-[#E0854E] font-semibold">{selectedPlot.cropHindi}</p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between py-2 border-b border-[#E3DAC6] dark:border-[#283C2C]">
                <span className="text-[#556357] dark:text-[#CBD5CD]">Soil Condition:</span>
                <span className="text-[#1E3F20] dark:text-[#FAF5EA] font-semibold">{selectedPlot.soilType}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E3DAC6] dark:border-[#283C2C]">
                <span className="text-[#556357] dark:text-[#CBD5CD]">Soil Moisture:</span>
                <span className="text-[#1E3F20] dark:text-[#4ADE80] font-bold">{selectedPlot.soilMoisture}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E3DAC6] dark:border-[#283C2C]">
                <span className="text-[#556357] dark:text-[#CBD5CD]">Bed Temperature:</span>
                <span className="text-[#1E3F20] dark:text-[#FAF5EA] font-mono font-semibold">{selectedPlot.soilTemp}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E3DAC6] dark:border-[#283C2C]">
                <span className="text-[#556357] dark:text-[#CBD5CD]">Harvest Status:</span>
                <span className="text-[#C86D3B] dark:text-[#E0854E] font-bold">{selectedPlot.status}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E3DAC6] dark:border-[#283C2C]">
                <span className="text-[#556357] dark:text-[#CBD5CD]">Water Source:</span>
                <span className="text-[#1E3F20] dark:text-[#FAF5EA] font-medium">Kamana Tube-Well Solar Drip</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#EFE8D8] dark:bg-[#1A261D] border border-[#DFD5BE] dark:border-[#283C2C] text-xs space-y-1">
            <span className="text-[#1E3F20] dark:text-[#4ADE80] font-bold block">PureKhetar Natural Compost:</span>
            <p className="text-[#556357] dark:text-[#CBD5CD] font-light">
              Nourished strictly with local cow dung compost, neem cake, and Jeevamrutha bio-culture. Zero chemical urea or toxic weedicides.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
