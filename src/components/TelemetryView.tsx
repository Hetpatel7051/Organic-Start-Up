import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FARM_WEATHER, FARM_PLOTS } from '../data/mockData';

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
    { title: 'AIR TEMP', icon: 'thermostat', val: `${FARM_WEATHER.airTemp}°C`, sub: FARM_WEATHER.airStatus, iconColor: 'text-emerald-400' },
    { title: 'HUMIDITY', icon: 'water_drop', val: `${FARM_WEATHER.humidity}%`, sub: 'Morning Dew', iconColor: 'text-emerald-300' },
    { title: 'SUNSHINE', icon: 'wb_sunny', val: `${FARM_WEATHER.sunlightHours} hrs`, sub: 'Natural Sunlight', iconColor: 'text-yellow-400' },
    { title: 'SOIL MOISTURE', icon: 'grass', val: '65%', sub: 'Optimal Compost Soil', iconColor: 'text-emerald-400' },
    { title: 'VILLAGE AIR', icon: 'air', val: 'AQI 28', sub: 'Pure Village Air', iconColor: 'text-cyan-400' },
    { title: 'GENTLE WIND', icon: 'wind_power', val: '4.5 km/h', sub: 'Cool Morning', iconColor: 'text-blue-300' },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6"
      >
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>MEHSANA FARM · GUJARAT, INDIA</span>
            <span className="text-neutral-500">|</span>
            <span className="text-neutral-300 font-bold">{currentTime}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-white">
            Live Farm Weather &amp; Soil Health
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl mt-2 font-light">
            Check real-time weather, clean well-water drip irrigation, and living compost soil from our organic farmland in Gujarat.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-black/60 border border-white/10 px-4 py-2.5 rounded-2xl shrink-0">
          <span className="material-symbols-outlined text-emerald-400 text-[20px]">sensors</span>
          <div className="text-left text-xs">
            <span className="text-white font-bold block">Farm Sensors</span>
            <span className="text-emerald-400 font-semibold text-[11px]">All Online &amp; Active</span>
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
            className="p-4 rounded-2xl bg-neutral-900 border border-white/10 space-y-1 shadow-sm"
          >
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>{m.title}</span>
              <span className={`material-symbols-outlined ${m.iconColor} text-[18px]`}>{m.icon}</span>
            </div>
            <div className="font-mono text-2xl text-white font-bold">{m.val}</div>
            <div className="text-[11px] text-emerald-400">{m.sub}</div>
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
        <div className="lg:col-span-8 rounded-3xl bg-neutral-950 p-6 border border-white/10 space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                LIVE CAMERA · PLOT 1 (TOMATOES &amp; BRINJAL BED)
              </span>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5 text-xs">
              <button
                onClick={() => setSpectralMode('normal')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  spectralMode === 'normal' ? 'bg-emerald-400 text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Daylight
              </button>
              <button
                onClick={() => setSpectralMode('growth')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  spectralMode === 'growth' ? 'bg-emerald-400 text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Crop Growth
              </button>
              <button
                onClick={() => setSpectralMode('morning')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  spectralMode === 'morning' ? 'bg-emerald-400 text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Morning Mist
              </button>
            </div>
          </div>

          {/* Camera Viewport */}
          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-inner">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl5qXp72YsKFn3kNbwTAshP2kU-uB64ZZAoj7CG2uB134ZK1mOHRkwAuOlOUnLpMorgl3OifwHAij9A0OU6Py_DF1T3owFNFIbB8SpmmPEOjCdBpqMydPfC6kYRt4c4NLbr0RTX6JGcenl-HmhC62ZR_5KzZ3bHmfeKUuAzCA5cvu7jk6wYZkXKZz7md98HzPEfmLPoWxI4I6oiUg6xfH-ZzLwFq5g3zXxowSRuGaaaAU1xobkj0rd"
              alt="Farm Camera"
              referrerPolicy="no-referrer"
              style={{ filter: getCameraFilter() }}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-white font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>1080p Solar Cam 1 · 30 FPS</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between text-xs text-white">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-black/60 font-mono text-emerald-400">Soil Moist: 64%</span>
                <span className="px-2.5 py-1 rounded bg-black/60 font-mono text-white">Bed Temp: 23°C</span>
              </div>
              <span className="font-mono text-neutral-400 text-[11px] mt-2 sm:mt-0">
                Lat 23.58° N, Long 72.36° E · Mehsana
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            Direct high-definition camera stream positioned over Plot 1. Farmers monitor natural plant health, dew levels, and morning harvest quality in real-time.
          </p>
        </div>

        {/* Right: Clean Well-Water Drip Control */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-neutral-950 p-6 border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">water</span>
              </div>
              <div>
                <h3 className="font-serif text-lg text-white font-bold">Solar Drip Irrigation</h3>
                <span className="text-xs text-neutral-400">Natural Tube-Well Water</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Water Source:</span>
                <span className="text-white font-medium">Sweet Underground Well</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Chemical Contaminants:</span>
                <span className="text-emerald-400 font-bold">0.00% Zero Chemicals</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">System Status:</span>
                <span className="text-emerald-300 font-medium">Running on Solar Power</span>
              </div>
            </div>

            <button
              onClick={handleWaterPulse}
              disabled={isWatering}
              className={`w-full py-3.5 px-4 rounded-full font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                isWatering
                  ? 'bg-blue-400 text-black'
                  : 'bg-emerald-400 text-black hover:bg-emerald-300 hover:scale-[1.02]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isWatering ? 'water_drop' : 'shower'}
              </span>
              <span>{isWatering ? 'Watering Plot Beds Now...' : 'Water Vegetable Beds (Test)'}</span>
            </button>
          </div>

          <div className="rounded-3xl bg-neutral-950 p-6 border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-emerald-400 text-[20px]">volume_up</span>
                <span className="text-xs font-semibold text-white">Village Morning Sound</span>
              </div>
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="text-xs text-emerald-400 hover:underline cursor-pointer"
              >
                {isPlayingAudio ? 'Mute' : 'Play'}
              </button>
            </div>
            <p className="text-xs text-neutral-400 font-light">
              Live microphone stream of morning birds, gentle wind, and quiet rural serenity from our Gujarat fields.
            </p>
            {isPlayingAudio && (
              <div className="flex items-center gap-1.5 h-6 pt-1">
                <div className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.15s]"></div>
                <div className="w-1 h-4 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]"></div>
                <div className="w-1 h-6 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.45s]"></div>
                <div className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <span className="text-[11px] font-mono text-neutral-400 ml-2">Birds &amp; Breeze Active</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Farm Plots Health Status Table (Loaded on Scroll) */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-neutral-950 p-6 sm:p-8 border border-white/10 space-y-4 shadow-xl"
      >
        <h3 className="font-serif text-xl sm:text-2xl text-white">
          All 4 Farm Plots · Current Crop &amp; Soil Report
        </h3>
        <p className="text-xs text-neutral-400">
          Regular sensor readings from all 10 Bigha plots on our Mehsana organic estate.
        </p>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-neutral-400 font-mono">
                <th className="py-3 px-4">PLOT</th>
                <th className="py-3 px-4">CURRENT VEGETABLES</th>
                <th className="py-3 px-4">AREA</th>
                <th className="py-3 px-4">SOIL MOISTURE</th>
                <th className="py-3 px-4">HEALTH SCORE</th>
                <th className="py-3 px-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {FARM_PLOTS.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{p.code}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-white font-medium block">{p.name}</span>
                    <span className="text-emerald-300 text-[11px]">{p.cropHindi}</span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-300">{p.area}</td>
                  <td className="py-3.5 px-4 text-white font-mono">{p.soilMoisture}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-400 font-bold font-mono">
                      {p.healthScore}% Healthy
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-emerald-300 font-semibold">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
