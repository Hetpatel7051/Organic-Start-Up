import React, { useState } from 'react';
import { FARM_PLOTS } from '../data/mockData';
import { FarmPlot } from '../types';

export const ThePlotsView: React.FC = () => {
  const [selectedPlot, setSelectedPlot] = useState<FarmPlot>(FARM_PLOTS[0]);

  return (
    <div className="pt-24 sm:pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider block mb-1">
            MEHSANA FARMLAND · GUJARAT, INDIA
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-white">
            Our 10 Bigha Organic Farm Map
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl mt-2 font-light">
            Interactive view of our four main vegetable plots, natural tube-well water canal, and desi cow compost shelter.
          </p>
        </div>
      </div>

      {/* Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: SVG Farm Map */}
        <div className="lg:col-span-8 rounded-3xl bg-neutral-950 p-6 border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[460px]">
          <div className="flex justify-between items-center z-10 text-xs">
            <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-mono">
              GPS: Mehsana Organic Belt, Gujarat
            </span>
            <span className="text-neutral-400 font-mono">10 Bigha Fertile Land</span>
          </div>

          {/* SVG Map */}
          <div className="my-6 relative flex items-center justify-center">
            <svg viewBox="0 0 600 360" className="w-full max-w-2xl h-auto drop-shadow-2xl">
              <rect width="600" height="360" rx="16" fill="#0d1410" />

              {/* Water Canal Path */}
              <path
                d="M 50 180 Q 200 130, 350 200 T 580 160"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="7"
                strokeOpacity="0.4"
                strokeDasharray="6 4"
              />
              <text x="360" y="225" fill="#38bdf8" fontSize="10" fontFamily="JetBrains Mono">Tube-Well Sweet Water Canal</text>

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
                  fill={selectedPlot.id === 'plot-1' ? '#143828' : '#0f1713'}
                  stroke={selectedPlot.id === 'plot-1' ? '#4edea3' : '#1e2d25'}
                  strokeWidth={selectedPlot.id === 'plot-1' ? '2.5' : '1.5'}
                />
                <text x="80" y="70" fill="#4edea3" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">PLOT 1 (2.5 Bigha)</text>
                <text x="80" y="95" fill="#ffffff" fontSize="14" fontFamily="Playfair Display">Tomato &amp; Baingan</text>
                <text x="80" y="120" fill="#9ca3af" fontSize="11" fontFamily="Plus Jakarta Sans">देशी टमाटर और बैंगन</text>
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
                  fill={selectedPlot.id === 'plot-2' ? '#143828' : '#0f1713'}
                  stroke={selectedPlot.id === 'plot-2' ? '#4edea3' : '#1e2d25'}
                  strokeWidth={selectedPlot.id === 'plot-2' ? '2.5' : '1.5'}
                />
                <text x="330" y="70" fill="#4edea3" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">PLOT 2 (2.0 Bigha)</text>
                <text x="330" y="95" fill="#ffffff" fontSize="14" fontFamily="Playfair Display">Palak, Methi, Dhaniya</text>
                <text x="330" y="120" fill="#9ca3af" fontSize="11" fontFamily="Plus Jakarta Sans">पालक, मेथी, ताज़ा धनिया</text>
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
                  fill={selectedPlot.id === 'plot-3' ? '#143828' : '#0f1713'}
                  stroke={selectedPlot.id === 'plot-3' ? '#4edea3' : '#1e2d25'}
                  strokeWidth={selectedPlot.id === 'plot-3' ? '2.5' : '1.5'}
                />
                <text x="80" y="220" fill="#4edea3" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">PLOT 3 (3.0 Bigha)</text>
                <text x="80" y="245" fill="#ffffff" fontSize="14" fontFamily="Playfair Display">Cauliflower &amp; Capsicum</text>
                <text x="80" y="270" fill="#9ca3af" fontSize="11" fontFamily="Plus Jakarta Sans">ताज़ा फूलगोभी और शिमला मिर्च</text>
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
                  fill={selectedPlot.id === 'plot-4' ? '#143828' : '#0f1713'}
                  stroke={selectedPlot.id === 'plot-4' ? '#4edea3' : '#1e2d25'}
                  strokeWidth={selectedPlot.id === 'plot-4' ? '2.5' : '1.5'}
                />
                <text x="330" y="220" fill="#4edea3" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">PLOT 4 (2.5 Bigha)</text>
                <text x="330" y="245" fill="#ffffff" fontSize="14" fontFamily="Playfair Display">Bhindi, Kheera &amp; Lauki</text>
                <text x="330" y="270" fill="#9ca3af" fontSize="11" fontFamily="Plus Jakarta Sans">भिंडी, खीरा, और ताज़ा लौकी</text>
              </g>
            </svg>
          </div>

          <div className="flex justify-between items-center z-10 text-xs text-neutral-400">
            <span>Click any plot to see soil moisture &amp; crop details</span>
            <span className="text-emerald-400 font-mono">100% Chemical-Free Land</span>
          </div>
        </div>

        {/* Right: Selected Plot Details */}
        <div className="lg:col-span-4 rounded-3xl bg-neutral-950 p-6 sm:p-8 border border-white/10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-400 font-mono text-xs font-bold">
                {selectedPlot.code}
              </span>
              <span className="text-xs text-neutral-400 font-mono">{selectedPlot.area}</span>
            </div>

            <h2 className="font-serif text-2xl text-white font-bold">{selectedPlot.name}</h2>
            <p className="text-sm text-emerald-300 font-medium">{selectedPlot.cropHindi}</p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-neutral-400">Soil Condition:</span>
                <span className="text-white font-medium">{selectedPlot.soilType}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-neutral-400">Soil Moisture:</span>
                <span className="text-emerald-400 font-bold">{selectedPlot.soilMoisture}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-neutral-400">Bed Temperature:</span>
                <span className="text-white font-mono">{selectedPlot.soilTemp}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-neutral-400">Harvest Status:</span>
                <span className="text-emerald-300 font-medium">{selectedPlot.status}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-neutral-400">Water Source:</span>
                <span className="text-white">Clean Tube-Well Sweet Water</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs space-y-1">
            <span className="text-emerald-400 font-bold block">Natural Organic Compost:</span>
            <p className="text-neutral-300 font-light">
              We use traditional cow dung compost, neem oil sprays, and Jeevamrutha bio-culture. No chemical urea or synthetic fertilizers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
