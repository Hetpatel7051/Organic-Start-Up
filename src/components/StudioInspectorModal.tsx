import React, { useState } from 'react';
import { motion } from 'motion/react';

interface StudioInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudioInspectorModal: React.FC<StudioInspectorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'layers' | 'pages'>('layers');
  const [selectedLayer, setSelectedLayer] = useState('Fresh Harvest Screen');
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col overflow-hidden animate-fadeIn text-white font-sans">
      {/* Studio Top Control Bar */}
      <div className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-neutral-950/90 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-400 text-black font-bold">
            A
          </div>
          <span className="font-serif font-bold text-base tracking-wider">AURA TERRA STUDIO PREVIEW</span>
          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-emerald-400 font-mono">INDIA · LIVE</span>
        </div>

        {/* Viewport switchers */}
        <div className="flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              deviceMode === 'desktop' ? 'bg-emerald-400 text-black font-bold' : 'text-neutral-400 hover:text-white'
            }`}
            title="Desktop 1536px"
          >
            <span className="material-symbols-outlined text-[18px]">desktop_windows</span>
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              deviceMode === 'mobile' ? 'bg-emerald-400 text-black font-bold' : 'text-neutral-400 hover:text-white'
            }`}
            title="Mobile 390px"
          >
            <span className="material-symbols-outlined text-[18px]">smartphone</span>
          </button>
          <div className="h-4 w-px bg-white/10 mx-1"></div>
          <span className="text-xs font-mono text-neutral-300">
            {deviceMode === 'desktop' ? 'Desktop 1536px' : 'Mobile 390px'} | {zoomLevel}%
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setZoomLevel(zoomLevel === 100 ? 80 : 100)}
            className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
          >
            Zoom {zoomLevel}%
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-emerald-400 transition-colors cursor-pointer"
          >
            <span>Exit Preview</span>
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>

      {/* Main Studio Work Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Layers / Pages */}
        <div className="w-64 border-r border-white/10 bg-neutral-950/80 flex flex-col shrink-0">
          <div className="flex border-b border-white/10 text-xs font-medium">
            <button
              onClick={() => setActiveTab('pages')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'pages' ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Pages
            </button>
            <button
              onClick={() => setActiveTab('layers')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'layers' ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Screens
            </button>
          </div>

          <div className="p-3 space-y-1 overflow-y-auto text-xs font-sans">
            {[
              { id: 'Fresh Harvest Screen', icon: 'eco', sub: 'ताज़ा सब्जियां' },
              { id: 'Farm Weather & Sensors', icon: 'thermostat', sub: 'मौसम व मिट्टी' },
              { id: '10 Bigha Farm Map', icon: 'map', sub: 'खेत का नक्शा' },
              { id: 'Weekly Vegetable Boxes', icon: 'shopping_bag', sub: '₹499 / ₹899 / ₹1499' },
              { id: 'Batch Origin Verification', icon: 'verified', sub: 'QR कोड जांच' },
              { id: 'Zero-Chemical Lab Reports', icon: 'science', sub: '100% शुद्ध रिपोर्ट' }
            ].map((layer) => (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                  selectedLayer === layer.id ? 'bg-emerald-400/20 text-emerald-400 font-bold border border-emerald-400/40' : 'text-neutral-300 hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{layer.icon}</span>
                <div>
                  <span className="truncate block font-medium">{layer.id}</span>
                  <span className="text-[10px] text-neutral-400 block">{layer.sub}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center Canvas Viewport */}
        <div className="flex-1 bg-[#090b0a] overflow-auto p-8 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(#4edea3_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

          {/* Perspective Device Container */}
          <motion.div
            layout
            className={`rounded-3xl border border-white/20 bg-neutral-900 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-500 relative flex flex-col ${
              deviceMode === 'desktop' ? 'w-full max-w-5xl h-[620px]' : 'w-[390px] h-[720px]'
            }`}
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            {/* Device Header Bar */}
            <div className="h-8 bg-neutral-950 border-b border-white/10 px-4 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              </div>
              <span className="text-neutral-300">https://auraterra.in/harvest</span>
              <span className="text-emerald-400">100% ONLINE</span>
            </div>

            {/* Inner Live Canvas Preview with Perspective Indian Veggie Cards */}
            <div className="flex-1 bg-black p-6 relative overflow-hidden flex flex-col justify-center items-center text-center">
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <path d="M-50 200 C 200 50, 400 400, 700 150 C 900 50, 1100 350, 1400 200" stroke="#4edea3" strokeWidth="2" fill="none" />
                <path d="M-50 350 C 300 150, 500 500, 850 250 C 1100 100, 1300 400, 1500 250" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
              </svg>

              <h2 className="font-serif text-3xl md:text-5xl text-white mb-2 z-10">
                Pure Natural <span className="text-emerald-400 italic">Vegetables</span>
              </h2>
              <p className="text-xs text-neutral-300 max-w-md z-10 font-light">
                Inspecting: {selectedLayer}. Harvested fresh at 5:45 AM from our organic fields in Mehsana, Gujarat. Delivered in 4 hours.
              </p>

              {/* Suspended mini cards in Indian context */}
              <div className="flex gap-4 mt-8 z-10 [perspective:800px]">
                <div className="w-40 h-48 rounded-xl bg-neutral-800/90 border border-emerald-400/30 p-3 transform [transform:rotateY(15deg)_scale(0.95)] flex flex-col justify-between text-left text-xs">
                  <span className="text-[10px] font-mono text-emerald-400">PLOT 1</span>
                  <div className="font-serif font-bold text-white text-sm">Desi Tomatoes</div>
                  <div className="text-[11px] text-emerald-300">₹60 / kg</div>
                </div>

                <div className="w-44 h-52 rounded-xl bg-neutral-800/95 border border-emerald-400 p-3 transform scale-105 shadow-2xl flex flex-col justify-between text-left text-xs">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">BESTSELLER</span>
                  <div className="font-serif font-bold text-white text-base">Phool Gobi &amp; Romanesco</div>
                  <div className="text-[11px] text-emerald-300 font-bold">₹80 / piece · Zero Spray</div>
                </div>

                <div className="w-40 h-48 rounded-xl bg-neutral-800/90 border border-emerald-400/30 p-3 transform [transform:rotateY(-15deg)_scale(0.95)] flex flex-col justify-between text-left text-xs">
                  <span className="text-[10px] font-mono text-emerald-400">PLOT 2</span>
                  <div className="font-serif font-bold text-white text-sm">Baby Palak Greens</div>
                  <div className="text-[11px] text-emerald-300">₹40 / bunch</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Inspector Panel */}
        <div className="w-72 border-l border-white/10 bg-neutral-950/80 p-5 space-y-6 shrink-0 overflow-y-auto text-xs font-sans">
          <div>
            <span className="text-neutral-400 uppercase text-[10px] font-mono block mb-1">Current Screen</span>
            <div className="font-bold text-white text-sm">{selectedLayer}</div>
          </div>

          <div className="space-y-3 pt-3 border-t border-white/10">
            <span className="text-neutral-400 uppercase text-[10px] font-mono block">Delivery Info</span>
            <div className="p-3 rounded-xl bg-white/5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Country:</span>
                <span className="text-white font-medium">India 🇮🇳</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Currency:</span>
                <span className="text-emerald-400 font-bold">Indian Rupee (₹)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Timing:</span>
                <span className="text-white">Dawn Plucked 5:45 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
