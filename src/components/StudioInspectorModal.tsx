import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PureKhetarLogo } from './PureKhetarLogo';
import { BRAND_INFO } from '../data/mockData';

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
    <div className="fixed inset-0 z-50 bg-[#141F16]/95 backdrop-blur-2xl flex flex-col overflow-hidden animate-fadeIn text-[#FAF5EA] font-sans">
      {/* Studio Top Control Bar */}
      <div className="h-16 border-b border-[#283C2C] px-6 flex items-center justify-between bg-[#111A13]/95 shrink-0">
        <div className="flex items-center gap-3">
          <PureKhetarLogo size="sm" withText={false} />
          <div>
            <span className="font-serif font-bold text-base tracking-wider text-[#FAF5EA]">PUREKHETAR STUDIO PREVIEW</span>
            <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-[#E5A93C]/20 text-[#E5A93C] font-mono font-bold">SPU STARTUP · KAMANA</span>
          </div>
        </div>

        {/* Viewport switchers */}
        <div className="flex items-center gap-2 bg-[#18261B] px-3 py-1.5 rounded-xl border border-[#283C2C]">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              deviceMode === 'desktop' ? 'bg-[#1E3F20] text-[#FAF7EE] font-bold' : 'text-[#A8B8AB] hover:text-white'
            }`}
            title="Desktop 1536px"
          >
            <span className="material-symbols-outlined text-[18px]">desktop_windows</span>
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              deviceMode === 'mobile' ? 'bg-[#1E3F20] text-[#FAF7EE] font-bold' : 'text-[#A8B8AB] hover:text-white'
            }`}
            title="Mobile 390px"
          >
            <span className="material-symbols-outlined text-[18px]">smartphone</span>
          </button>
          <div className="h-4 w-px bg-[#283C2C] mx-1"></div>
          <span className="text-xs font-mono text-[#CBD5CD]">
            {deviceMode === 'desktop' ? 'Desktop 1536px' : 'Mobile 390px'} | {zoomLevel}%
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setZoomLevel(zoomLevel === 100 ? 80 : 100)}
            className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#18261B] hover:bg-[#203224] border border-[#283C2C] text-[#CBD5CD]"
          >
            Zoom {zoomLevel}%
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF7EE] text-[#1E3F20] font-bold text-xs hover:bg-[#E5A93C] transition-colors cursor-pointer"
          >
            <span>Exit Preview</span>
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>

      {/* Main Studio Work Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Layers / Pages */}
        <div className="w-64 border-r border-[#283C2C] bg-[#111A13]/90 flex flex-col shrink-0">
          <div className="flex border-b border-[#283C2C] text-xs font-medium">
            <button
              onClick={() => setActiveTab('pages')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'pages' ? 'text-[#E5A93C] border-b-2 border-[#E5A93C] font-bold' : 'text-[#A8B8AB] hover:text-white'
              }`}
            >
              Pages
            </button>
            <button
              onClick={() => setActiveTab('layers')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'layers' ? 'text-[#E5A93C] border-b-2 border-[#E5A93C] font-bold' : 'text-[#A8B8AB] hover:text-white'
              }`}
            >
              Screens
            </button>
          </div>

          <div className="p-3 space-y-1 overflow-y-auto text-xs font-sans">
            {[
              { id: 'Fresh Harvest Screen', icon: 'eco', sub: 'તાઝા શાકભાજી' },
              { id: 'Kamana Weather & Soil', icon: 'thermostat', sub: 'કામના હવામાન' },
              { id: '10 Bigha Farm Map', icon: 'map', sub: 'ખેતરનો નકશો' },
              { id: 'Weekly Vegetable Baskets', icon: 'shopping_bag', sub: '₹499 / ₹899 / ₹1499' },
              { id: 'Batch Origin Verification', icon: 'verified', sub: 'QR કોડ ચકાસણી' },
              { id: 'Zero-Chemical Lab Reports', icon: 'science', sub: '100% શુદ્ધ રિપોર્ટ' }
            ].map((layer) => (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                  selectedLayer === layer.id ? 'bg-[#1E3F20] text-[#FAF7EE] font-bold' : 'text-[#CBD5CD] hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{layer.icon}</span>
                <div>
                  <span className="truncate block font-medium">{layer.id}</span>
                  <span className="text-[10px] text-[#A8B8AB] block">{layer.sub}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center Canvas Viewport */}
        <div className="flex-1 bg-[#0D140E] overflow-auto p-8 flex items-center justify-center relative">
          {/* Perspective Device Container */}
          <motion.div
            layout
            className={`rounded-3xl border border-[#283C2C] bg-[#FAF7EE] text-[#1C271E] shadow-2xl overflow-hidden transition-all duration-500 relative flex flex-col ${
              deviceMode === 'desktop' ? 'w-full max-w-5xl h-[620px]' : 'w-[390px] h-[720px]'
            }`}
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            {/* Device Header Bar */}
            <div className="h-8 bg-[#EFE8D8] border-b border-[#DED4BE] px-4 flex items-center justify-between text-[11px] font-mono text-[#5E6D60]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              </div>
              <span className="text-[#1E3F20] font-bold">purekhetar.in · Kamana, Visnagar</span>
              <span className="text-[#2E5A33] font-bold">SPU STARTUP · LIVE</span>
            </div>

            {/* Inner Live Canvas Preview with Creamy Indian Veggie Cards */}
            <div className="flex-1 bg-[#FAF7EE] p-6 relative overflow-hidden flex flex-col justify-center items-center text-center">
              <h2 className="font-serif text-3xl md:text-5xl text-[#1E3F20] mb-2 z-10">
                Pure Natural <span className="text-[#C86D3B] italic">Vegetables</span>
              </h2>
              <p className="text-xs text-[#556357] max-w-md z-10 font-light">
                Inspecting: {selectedLayer}. Hand-plucked fresh at 5:45 AM from Kamana, Visnagar. Delivered to your doorstep in 4 hours.
              </p>

              {/* Suspended mini cards */}
              <div className="flex gap-4 mt-8 z-10 [perspective:800px]">
                <div className="w-40 h-48 rounded-2xl bg-[#FFFDF9] border border-[#E3DAC6] p-3 transform [transform:rotateY(15deg)_scale(0.95)] flex flex-col justify-between text-left text-xs shadow-md">
                  <span className="text-[10px] font-mono text-[#1E3F20] font-bold">PLOT 1</span>
                  <div className="font-serif font-bold text-[#1E3F20] text-sm">Desi Baingan &amp; Tamatar</div>
                  <div className="text-[11px] text-[#C86D3B] font-bold">₹55 / kg · Zero Spray</div>
                </div>

                <div className="w-44 h-52 rounded-2xl bg-[#FFFDF9] border-2 border-[#1E3F20] p-3 transform scale-105 shadow-xl flex flex-col justify-between text-left text-xs">
                  <span className="text-[10px] font-mono text-[#C86D3B] font-bold">BESTSELLER</span>
                  <div className="font-serif font-bold text-[#1E3F20] text-base">Phool Gobi &amp; Bhindi</div>
                  <div className="text-[11px] text-[#1E3F20] font-bold">₹75 / kg · 100% Pure</div>
                </div>

                <div className="w-40 h-48 rounded-2xl bg-[#FFFDF9] border border-[#E3DAC6] p-3 transform [transform:rotateY(-15deg)_scale(0.95)] flex flex-col justify-between text-left text-xs shadow-md">
                  <span className="text-[10px] font-mono text-[#1E3F20] font-bold">PLOT 2</span>
                  <div className="font-serif font-bold text-[#1E3F20] text-sm">Baby Palak &amp; Methi</div>
                  <div className="text-[11px] text-[#C86D3B] font-bold">₹40 / bunch</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Inspector Panel */}
        <div className="w-72 border-l border-[#283C2C] bg-[#111A13]/90 p-5 space-y-6 shrink-0 overflow-y-auto text-xs font-sans">
          <div>
            <span className="text-[#A8B8AB] uppercase text-[10px] font-mono block mb-1">Current Screen</span>
            <div className="font-bold text-[#FAF5EA] text-sm">{selectedLayer}</div>
          </div>

          <div className="space-y-3 pt-3 border-t border-[#283C2C]">
            <span className="text-[#A8B8AB] uppercase text-[10px] font-mono block">Startup Details</span>
            <div className="p-3.5 rounded-2xl bg-[#18261B] border border-[#283C2C] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#A8B8AB]">Brand:</span>
                <span className="text-[#FAF5EA] font-bold">PureKhetar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A8B8AB]">Incubation:</span>
                <span className="text-[#E5A93C] font-semibold">Sankalchand Patel Univ.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A8B8AB]">Farm Location:</span>
                <span className="text-[#FAF5EA]">Kamana, Visnagar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A8B8AB]">WhatsApp:</span>
                <span className="text-[#4ADE80] font-mono font-bold">{BRAND_INFO.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
