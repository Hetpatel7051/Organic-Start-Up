import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FARM_WEATHER, FARM_PLOTS, BRAND_INFO } from '../data/mockData';

export const TelemetryView: React.FC = () => {
  const [spectralMode, setSpectralMode] = useState<'normal' | 'growth' | 'morning'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const [isWatering, setIsWatering] = useState(false);
  const [currentTime, setCurrentTime] = useState('06:30 AM IST');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWaterPulse = () => {
    setIsWatering(true);
    setTimeout(() => setIsWatering(false), 2500);
  };

  const getCameraFilter = () => {
    if (spectralMode === 'growth') return 'contrast(1.2) saturate(1.6) hue-rotate(25deg)';
    if (spectralMode === 'morning') return 'contrast(1.1) brightness(1.15) sepia(0.2)';
    return 'none';
  };

  const weatherMetrics = [
    { title: 'AIR TEMP', icon: 'thermostat', val: `${FARM_WEATHER.airTemp}°C`, sub: FARM_WEATHER.airStatus, iconColor: 'text-[#1E3F20] dark:text-[#4ADE80]' },
    { title: 'HUMIDITY', icon: 'water_drop', val: `${FARM_WEATHER.humidity}%`, sub: 'Morning Dew', iconColor: 'text-[#0284c7]' },
    { title: 'SUNSHINE', icon: 'wb_sunny', val: `${FARM_WEATHER.sunlightHours} hrs`, sub: 'Natural Sunlight', iconColor: 'text-[#E5A93C]' },
    { title: 'SOIL MOISTURE', icon: 'grass', val: '65%', sub: 'Living Compost Soil', iconColor: 'text-[#1E3F20] dark:text-[#4ADE80]' },
    { title: 'VILLAGE AIR', icon: 'air', val: 'AQI 28', sub: 'Kamana Village Air', iconColor: 'text-[#059669]' },
    { title: 'GENTLE WIND', icon: 'wind_power', val: '4.5 km/h', sub: 'Cool Morning Breeze', iconColor: 'text-[#0284c7]' },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E3DAC6] dark:border-[#283C2C] pb-6"
      >
        <div>
          <div className="flex items-center gap-2 text-[#C86D3B] dark:text-[#E0854E] font-mono text-xs uppercase tracking-wider mb-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#1E3F20] animate-ping"></span>
            <span>KAMANA FARMLAND · VISNAGAR, MEHSANA</span>
            <span className="text-[#A8B8AB]">|</span>
            <span className="text-[#1E3F20] dark:text-[#FAF5EA] font-bold">{currentTime}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E3F20] dark:text-[#FAF5EA]">
            Live Farm Weather &amp; Living Soil Health
          </h1>
          <p className="text-xs sm:text-sm text-[#556357] dark:text-[#CBD5CD] max-w-2xl mt-2 font-light">
            Monitor real-time weather conditions, clean solar tube-well drip irrigation, and living compost soil from our Kamana, Visnagar farm fields.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#EFE8D8] dark:bg-[#1A261D] border border-[#DFD5BE] dark:border-[#283C2C] px-4 py-2.5 rounded-2xl shrink-0">
          <span className="material-symbols-outlined text-[#1E3F20] dark:text-[#4ADE80] text-[22px]">sensors</span>
          <div className="text-left text-xs">
            <span className="text-[#1E3F20] dark:text-[#FAF5EA] font-bold block">Kamana IoT Sensors</span>
            <span className="text-[#2E5A33] dark:text-[#4ADE80] font-semibold text-[11px]">All Online · SPU Supported</span>
          </div>
        </div>
      </motion.div>

      {/* 6 Weather Cards with Staggered Scroll-Driven Loading */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {weatherMetrics.map((m, idx) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.07, ease: 'easeOut' }}
            className="p-4 rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C] space-y-1 shadow-sm"
          >
            <div className="flex items-center justify-between text-[#556357] dark:text-[#CBD5CD] text-xs">
              <span className="font-mono text-[10.5px] font-bold">{m.title}</span>
              <span className={`material-symbols-outlined ${m.iconColor} text-[18px]`}>{m.icon}</span>
            </div>
            <div className="font-mono text-2xl text-[#1E3F20] dark:text-[#FAF5EA] font-bold">{m.val}</div>
            <div className="text-[11px] text-[#2E5A33] dark:text-[#4ADE80] font-semibold">{m.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Farm Live Stage (Loaded on Scroll) */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left: Live Farm Camera Feed */}
        <div className="lg:col-span-8 rounded-3xl bg-[#FFFDF9] dark:bg-[#141F16] p-6 border border-[#E3DAC6] dark:border-[#283C2C] space-y-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-xs font-mono font-bold text-[#1E3F20] dark:text-[#FAF5EA] uppercase tracking-wider">
                LIVE CAMERA · PLOT 1 (DESI BAINGAN &amp; TOMATO BED)
              </span>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-[#EFE8D8] dark:bg-[#1A261D] p-1 rounded-xl text-xs">
              <button
                onClick={() => setSpectralMode('normal')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  spectralMode === 'normal' ? 'bg-[#1E3F20] text-[#FAF7EE] font-bold' : 'text-[#4A5A4D] dark:text-[#CBD5CD]'
                }`}
              >
                Daylight
              </button>
              <button
                onClick={() => setSpectralMode('growth')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  spectralMode === 'growth' ? 'bg-[#1E3F20] text-[#FAF7EE] font-bold' : 'text-[#4A5A4D] dark:text-[#CBD5CD]'
                }`}
              >
                Crop Growth
              </button>
              <button
                onClick={() => setSpectralMode('morning')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  spectralMode === 'morning' ? 'bg-[#1E3F20] text-[#FAF7EE] font-bold' : 'text-[#4A5A4D] dark:text-[#CBD5CD]'
                }`}
              >
                Morning Dew
              </button>
            </div>
          </div>

          {/* Camera Viewport */}
          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#E3DAC6] dark:border-[#283C2C] shadow-inner bg-[#EFE8D8]">
            <img
              src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=80"
              alt="Kamana Farm Camera"
              referrerPolicy="no-referrer"
              style={{ filter: getCameraFilter() }}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] text-white font-mono">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse"></span>
              <span>Kamana Solar Cam 1 · 1080p HD</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between text-xs text-white">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-black/60 font-mono text-[#4ADE80]">Soil Moist: 64%</span>
                <span className="px-2.5 py-1 rounded bg-black/60 font-mono text-white">Bed Temp: 23°C</span>
              </div>
              <span className="font-mono text-[#E4EDE1] text-[11px] mt-2 sm:mt-0">
                Kamana, Visnagar · Mehsana, Gujarat
              </span>
            </div>
          </div>

          <p className="text-xs text-[#556357] dark:text-[#CBD5CD] leading-relaxed font-light">
            Direct high-definition camera feed positioned over Plot 1. PureKhetar farmers monitor natural crop vigor, morning dew formation, and sunrise harvest readiness in real time.
          </p>
        </div>

        {/* Right: Clean Solar Drip Control */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-[#FFFDF9] dark:bg-[#141F16] p-6 border border-[#E3DAC6] dark:border-[#283C2C] space-y-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EBF2EB] dark:bg-[#203423] text-[#1E3F20] dark:text-[#4ADE80] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">water</span>
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#1E3F20] dark:text-[#FAF5EA] font-bold">Solar Drip Irrigation</h3>
                <span className="text-xs text-[#556357] dark:text-[#CBD5CD]">Kamana Tube-Well Water</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7EE] dark:bg-[#1A261D] border border-[#E3DAC6] dark:border-[#283C2C] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#556357] dark:text-[#CBD5CD]">Water Source:</span>
                <span className="text-[#1E3F20] dark:text-[#FAF5EA] font-semibold">Sweet Underground Tube-Well</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#556357] dark:text-[#CBD5CD]">Chemical Contaminants:</span>
                <span className="text-[#2E5A33] dark:text-[#4ADE80] font-bold">0.00% Zero Chemicals</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#556357] dark:text-[#CBD5CD]">Power Source:</span>
                <span className="text-[#C86D3B] dark:text-[#E0854E] font-semibold">Clean Solar Energy</span>
              </div>
            </div>

            <button
              onClick={handleWaterPulse}
              disabled={isWatering}
              className={`w-full py-3.5 px-4 rounded-full font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                isWatering
                  ? 'bg-[#0284c7] text-white'
                  : 'bg-[#1E3F20] text-[#FAF7EE] hover:bg-[#163519]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isWatering ? 'water_drop' : 'shower'}
              </span>
              <span>{isWatering ? 'Watering Kamana Beds...' : 'Activate Solar Drip Test'}</span>
            </button>
          </div>

          <div className="rounded-3xl bg-[#FFFDF9] dark:bg-[#141F16] p-6 border border-[#E3DAC6] dark:border-[#283C2C] space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#1E3F20] dark:text-[#4ADE80] text-[20px]">volume_up</span>
                <span className="text-xs font-semibold text-[#1E3F20] dark:text-[#FAF5EA]">Kamana Farm Morning Sound</span>
              </div>
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="text-xs text-[#C86D3B] font-bold hover:underline cursor-pointer"
              >
                {isPlayingAudio ? 'Mute' : 'Play'}
              </button>
            </div>
            <p className="text-xs text-[#556357] dark:text-[#CBD5CD] font-light">
              Live microphone stream of birds singing and dawn breezes across our agricultural land in Kamana, Visnagar.
            </p>
            {isPlayingAudio && (
              <div className="flex items-center gap-1.5 h-6 pt-1">
                <div className="w-1 h-3 bg-[#1E3F20] dark:bg-[#4ADE80] rounded-full animate-bounce"></div>
                <div className="w-1 h-5 bg-[#1E3F20] dark:bg-[#4ADE80] rounded-full animate-bounce [animation-delay:0.15s]"></div>
                <div className="w-1 h-4 bg-[#1E3F20] dark:bg-[#4ADE80] rounded-full animate-bounce [animation-delay:0.3s]"></div>
                <div className="w-1 h-6 bg-[#1E3F20] dark:bg-[#4ADE80] rounded-full animate-bounce [animation-delay:0.45s]"></div>
                <div className="w-1 h-2 bg-[#1E3F20] dark:bg-[#4ADE80] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <span className="text-[11px] font-mono text-[#556357] dark:text-[#CBD5CD] ml-2">Village Morning Stream Active</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Farm Plots Health Status Table */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-[#FFFDF9] dark:bg-[#141F16] p-6 sm:p-8 border border-[#E3DAC6] dark:border-[#283C2C] space-y-4 shadow-lg"
      >
        <h3 className="font-serif text-xl sm:text-2xl text-[#1E3F20] dark:text-[#FAF5EA]">
          All 4 Kamana Plots · Soil Moisture &amp; Crop Report
        </h3>
        <p className="text-xs text-[#556357] dark:text-[#CBD5CD]">
          Live telemetry from all 10 Bigha plots on our Kamana, Visnagar organic farm.
        </p>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E3DAC6] dark:border-[#283C2C] text-[#556357] dark:text-[#CBD5CD] font-mono">
                <th className="py-3 px-4">PLOT</th>
                <th className="py-3 px-4">CURRENT VEGETABLES</th>
                <th className="py-3 px-4">AREA</th>
                <th className="py-3 px-4">SOIL MOISTURE</th>
                <th className="py-3 px-4">HEALTH SCORE</th>
                <th className="py-3 px-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3DAC6]/60 dark:divide-[#283C2C]/60">
              {FARM_PLOTS.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAF7EE] dark:hover:bg-[#1B291D] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1E3F20] dark:text-[#4ADE80]">{p.code}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-[#1C271E] dark:text-[#FAF5EA] font-semibold block">{p.name}</span>
                    <span className="text-[#C86D3B] dark:text-[#E0854E] text-[11px]">{p.cropHindi}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#556357] dark:text-[#CBD5CD]">{p.area}</td>
                  <td className="py-3.5 px-4 text-[#1C271E] dark:text-[#FAF5EA] font-mono">{p.soilMoisture}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-[#EBF2EB] dark:bg-[#203423] text-[#1E3F20] dark:text-[#4ADE80] font-bold font-mono">
                      {p.healthScore}% Healthy
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-[#2E5A33] dark:text-[#4ADE80] font-semibold">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
