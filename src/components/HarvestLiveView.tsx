import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CategoryFilter, ProduceLot, ActiveView } from '../types';
import { PRODUCE_LOTS, BASKET_TIERS, BRAND_INFO } from '../data/mockData';
import { PureKhetarLogo } from './PureKhetarLogo';

interface HarvestLiveViewProps {
  setActiveView: (view: ActiveView) => void;
  onInspectProduce: (lot: ProduceLot) => void;
  onReserveProduce: (lot: ProduceLot) => void;
  onOpenScanner?: () => void;
  searchQuery?: string;
}

export const HarvestLiveView: React.FC<HarvestLiveViewProps> = ({
  setActiveView,
  onInspectProduce,
  onReserveProduce,
  onOpenScanner,
  searchQuery = ''
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-medium');
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [allocationConfirmed, setAllocationConfirmed] = useState(false);

  const filteredLots = PRODUCE_LOTS.filter((lot) => {
    const matchesCategory = activeCategory === 'all' || lot.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q ||
      lot.name.toLowerCase().includes(q) ||
      lot.hindiName.toLowerCase().includes(q) ||
      lot.simpleDescription.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const selectedTier = BASKET_TIERS.find((t) => t.id === selectedTierId) || BASKET_TIERS[1];

  const farmPromises = [
    {
      id: 'spu',
      icon: 'school',
      title: 'SPU University Supported',
      sub: 'Student AgTech Startup',
      detail: 'Officially incubated and supported by Sankalchand Patel University (SPU) to bring pure, transparent organic farming from Kamana to Gujarat homes.'
    },
    {
      id: 'zero-chem',
      icon: 'sanitizer',
      title: '100% Zero-Chemical Spray',
      sub: '0.00% Pesticides',
      detail: 'Completely free from synthetic chemical insecticides, artificial ripening gases, and toxic wax coatings. Safe for babies, pregnant mothers, and elders.'
    },
    {
      id: 'local-farmers',
      icon: 'nature_people',
      title: 'Local Experienced Farmers',
      sub: 'Rural Kamana Heritage',
      detail: 'Cultivated directly by traditional farmers in Kamana, Visnagar who possess generations of natural soil stewardship and wisdom.'
    },
    {
      id: 'sunrise',
      icon: 'wb_twilight',
      title: 'Sunrise Hand Plucked',
      sub: '5:45 AM Morning Cut',
      detail: 'Vegetables are picked strictly in the cool dawn hours (5:30 AM – 6:30 AM) when morning dew preserves the highest natural vitamins and sweet crunch.'
    },
    {
      id: 'solar-well',
      icon: 'solar_power',
      title: 'Solar Tube-Well Irrigation',
      sub: 'Sweet Deep Ground Water',
      detail: 'Nourished drop-by-drop with sweet underground tube-well water powered by clean solar pump systems in Kamana.'
    },
    {
      id: 'doorstep',
      icon: 'local_shipping',
      title: 'Direct Farm to Doorstep',
      sub: 'Delivered in 4 Hours',
      detail: 'No wholesale cold-storage godowns, no middlemen, no delays. Packed in hygienic cotton crates and brought to your kitchen within 4 hours.'
    },
    {
      id: 'qr',
      icon: 'qr_code_2',
      title: 'Harvest QR Verification',
      sub: 'Instant Phone Scan',
      detail: 'Scan the QR badge printed on your vegetable crate to see the exact plot location, farmer name, and morning harvest timestamp.'
    },
    {
      id: 'whatsapp',
      icon: 'chat',
      title: 'Direct WhatsApp Support',
      sub: 'Call: 83200 19977',
      detail: 'Direct friendly customer support via WhatsApp at 83200 19977. Pause, modify, or add custom veggies to your weekly delivery anytime.'
    }
  ];

  const handleConfirmAllocation = () => {
    setAllocationConfirmed(true);
    setTimeout(() => {
      setAllocationConfirmed(false);
      setActiveView('subscription-baskets');
    }, 1000);
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#FAF7EE] dark:bg-[#111A13] text-[#1C271E] dark:text-[#FAF5EA] transition-colors duration-300">
      
      {/* Background Soft Organic Grain and Leaf Curves */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40 dark:opacity-20">
        <svg
          className="w-full h-full min-h-[1400px] text-[#2E5A33]/25"
          fill="none"
          viewBox="0 0 1600 1200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 220 C 350 40, 700 580, 1100 240 C 1350 60, 1500 420, 1800 260"
            stroke="currentColor"
            strokeDasharray="6 8"
            strokeWidth="1.5"
          />
          <path
            d="M-50 460 C 300 280, 600 820, 1050 380 C 1300 160, 1600 620, 1750 380"
            stroke="#C86D3B"
            strokeOpacity="0.25"
            strokeWidth="2"
          />
          <circle cx="1050" cy="380" fill="#1E3F20" r="5" />
          <circle cx="600" cy="820" fill="#C86D3B" r="4" />
        </svg>
      </div>

      {/* Hero Section Matching the Uploaded Posters */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-20 sm:pt-28 pb-14 max-w-7xl mx-auto w-full">
        
        {/* SPU University Startup Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#1E3F20] text-[#FAF7EE] shadow-md mb-6 border border-[#2E5A33]"
        >
          <span className="text-[#E5A93C] text-sm">🎓</span>
          <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-wider">
            {BRAND_INFO.universitySupport}
          </span>
        </motion.div>

        {/* Script Stamp Accent: "Good Food Grows Here" */}
        <motion.div
          initial={{ opacity: 0, rotate: -4 }}
          animate={{ opacity: 1, rotate: -3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-serif italic text-[#C86D3B] dark:text-[#E0854E] font-bold tracking-wide mb-2"
        >
          <span>🌱 Good Food Grows Here</span>
          <span className="px-2 py-0.5 rounded-full bg-[#C86D3B]/10 text-[#C86D3B] dark:text-[#E0854E] text-[10px] uppercase font-sans font-bold not-italic">
            Pure · Fresh · Organic
          </span>
        </motion.div>

        {/* Main Headline from the Poster */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight max-w-5xl leading-[1.15] mb-4 font-normal text-[#1E3F20] dark:text-[#FAF5EA]"
        >
          Fresh Organic Vegetables |<br />
          <span className="italic font-normal text-[#C86D3B] dark:text-[#E0854E]">
            Straight from Farm to Home
          </span>
        </motion.h1>

        {/* Tagline & Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-[#556357] dark:text-[#CBD5CD] max-w-3xl mb-8 leading-relaxed font-light"
        >
          <strong>Rooted in Nature, Cultivated with Care.</strong> 100% chemical-free vegetables grown by local experienced farmers in Kamana, Visnagar. Hand-picked at 5:45 AM sunrise and delivered straight to your home in 4 hours.
        </motion.p>

        {/* 3 Circular Value Proposition Pillars from the Poster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mb-10"
        >
          {/* Pillar 1: 100% Zero-Chemical */}
          <div className="flex flex-col items-center text-center p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-[#EBF2EB] dark:bg-[#203423] text-[#1E3F20] dark:text-[#65A46B] flex items-center justify-center mb-3 shadow-inner">
              <span className="material-symbols-outlined text-[28px]">eco</span>
            </div>
            <h4 className="font-serif text-base font-bold text-[#1E3F20] dark:text-[#FAF5EA] leading-snug">
              100% Zero-Chemical &amp; Pesticide-Free
            </h4>
            <p className="text-xs text-[#5E6D60] dark:text-[#A8B8AB] mt-1 font-light">
              No harmful chemicals, no artificial ripening sprays, no toxic waxes.
            </p>
          </div>

          {/* Pillar 2: Grown by Local Farmers */}
          <div className="flex flex-col items-center text-center p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-[#F5ECE5] dark:bg-[#2D211B] text-[#C86D3B] dark:text-[#E0854E] flex items-center justify-center mb-3 shadow-inner">
              <span className="material-symbols-outlined text-[28px]">nature_people</span>
            </div>
            <h4 className="font-serif text-base font-bold text-[#1E3F20] dark:text-[#FAF5EA] leading-snug">
              Grown by Local Experienced Farmers
            </h4>
            <p className="text-xs text-[#5E6D60] dark:text-[#A8B8AB] mt-1 font-light">
              Support Kamana &amp; Visnagar farmers, boosting rural agrarian heritage.
            </p>
          </div>

          {/* Pillar 3: Direct Doorstep Delivery */}
          <div className="flex flex-col items-center text-center p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-[#EBF2EB] dark:bg-[#203423] text-[#1E3F20] dark:text-[#65A46B] flex items-center justify-center mb-3 shadow-inner">
              <span className="material-symbols-outlined text-[28px]">local_shipping</span>
            </div>
            <h4 className="font-serif text-base font-bold text-[#1E3F20] dark:text-[#FAF5EA] leading-snug">
              Direct Farm to Doorstep Delivery
            </h4>
            <p className="text-xs text-[#5E6D60] dark:text-[#A8B8AB] mt-1 font-light">
              Harvested at 5:45 AM dawn and delivered fresh to your door in 4 hours.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons & WhatsApp Quick Trigger */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 z-20 mb-8"
        >
          {/* Order Weekly Basket */}
          <button
            onClick={() => {
              const el = document.getElementById('basket-builder-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else setActiveView('subscription-baskets');
            }}
            className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full bg-[#1E3F20] hover:bg-[#163519] dark:bg-[#2E5A33] dark:hover:bg-[#3D7544] text-[#FAF7EE] font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>Order Weekly Basket (from ₹499)</span>
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
          </button>

          {/* WhatsApp Direct Chat Button */}
          <a
            href={BRAND_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BA5C] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>WhatsApp Us: {BRAND_INFO.phone}</span>
          </a>

          {/* Explore Kamana Farm Plots */}
          <button
            onClick={() => setActiveView('the-plots')}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-[#FFFDF9] dark:bg-[#18261B] text-[#1E3F20] dark:text-[#FAF5EA] font-semibold text-xs sm:text-sm border border-[#DED4BE] dark:border-[#283C2C] hover:border-[#1E3F20] hover:bg-[#F3EFE4] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[#C86D3B] text-[18px]">travel_explore</span>
            <span>View Kamana Farm Plots</span>
          </button>
        </motion.div>

        {/* 3-Step Farm Flow Ribbon: Farm ➔ Packing ➔ Doorstep */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center gap-3 sm:gap-6 py-2.5 px-6 rounded-full bg-[#EFE8D8] dark:bg-[#1A261D] text-xs font-semibold text-[#1E3F20] dark:text-[#FAF5EA] border border-[#DFD5BE] dark:border-[#283C2C]"
        >
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#2E5A33]">grass</span>
            <span>Kamana Farm</span>
          </span>
          <span className="text-[#C86D3B] font-bold">➔</span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#C86D3B]">inventory_2</span>
            <span>Eco Packing</span>
          </span>
          <span className="text-[#C86D3B] font-bold">➔</span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#2E5A33]">home</span>
            <span>Your Doorstep</span>
          </span>
          <span className="hidden md:inline text-[#79887C]">|</span>
          <span className="hidden md:inline font-mono text-[11px] text-[#556357] dark:text-[#A8B8AB]">
            📍 Kamana, Visnagar, Mehsana
          </span>
        </motion.div>

        {/* Category Filters with Creamy Style */}
        <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-[#EFE8D8] dark:bg-[#1A261D] border border-[#DFD5BE] dark:border-[#283C2C]">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#1E3F20] text-[#FAF7EE] font-bold shadow-md'
                : 'text-[#4A5A4D] dark:text-[#BDC8BE] hover:text-[#1E3F20]'
            }`}
          >
            All Vegetables ({PRODUCE_LOTS.length})
          </button>
          <button
            onClick={() => setActiveCategory('daily')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === 'daily'
                ? 'bg-[#1E3F20] text-[#FAF7EE] font-bold shadow-md'
                : 'text-[#4A5A4D] dark:text-[#BDC8BE] hover:text-[#1E3F20]'
            }`}
          >
            Daily Sabzi (बैंगन, गोभी, भिंडी, टमाटर)
          </button>
          <button
            onClick={() => setActiveCategory('leafy')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === 'leafy'
                ? 'bg-[#1E3F20] text-[#FAF7EE] font-bold shadow-md'
                : 'text-[#4A5A4D] dark:text-[#BDC8BE] hover:text-[#1E3F20]'
            }`}
          >
            Fresh Greens (पालक, मेथी, धनिया)
          </button>
          <button
            onClick={() => setActiveCategory('gourd-roots')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === 'gourd-roots'
                ? 'bg-[#1E3F20] text-[#FAF7EE] font-bold shadow-md'
                : 'text-[#4A5A4D] dark:text-[#BDC8BE] hover:text-[#1E3F20]'
            }`}
          >
            Gourds &amp; Roots (दूधी / लौकी, गाजर)
          </button>
        </div>
      </section>

      {/* Vegetable Cards Section (Creamy Cards with Deep Green Accents) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 w-full px-4 sm:px-8 py-6"
        id="plots-stage"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full rounded-3xl bg-[#FAF7EE] dark:bg-[#141F16] p-5 sm:p-8 md:p-10 border border-[#E3DAC6] dark:border-[#283C2C] shadow-lg">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E3DAC6] dark:border-[#283C2C] gap-3"
            >
              <div>
                <div className="flex items-center gap-2 text-[#C86D3B] dark:text-[#E0854E] text-xs uppercase tracking-wider font-bold mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#C86D3B] animate-pulse"></span>
                  Today&apos;s Live Morning Harvest · Kamana Farm, Visnagar
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1E3F20] dark:text-[#FAF5EA] font-normal">
                  Fresh Vegetables Harvested This Morning
                </h2>
              </div>
              <p className="text-xs text-[#556357] dark:text-[#CBD5CD] max-w-sm font-sans">
                Grown on our natural farm in Kamana, Visnagar. Zero cold storage, delivered in clean cotton crates.
              </p>
            </motion.div>

            {/* Responsive Card Grid with Staggered Scroll-Driven Loading */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLots.map((lot, idx) => (
                <motion.div
                  key={lot.id}
                  initial={{ opacity: 0, y: 35, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: 'easeOut' }}
                  className="group relative rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] p-5 border border-[#E3DAC6] dark:border-[#283C2C] transition-all duration-300 hover:scale-[1.02] hover:border-[#1E3F20] dark:hover:border-[#4E8653] shadow-sm hover:shadow-xl flex flex-col justify-between"
                >
                  {lot.isPopular && (
                    <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#C86D3B] text-white text-[10px] font-bold uppercase tracking-wider shadow-md z-10">
                      Most Popular
                    </div>
                  )}

                  <div>
                    {/* Image Box */}
                    <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-4 shadow-inner bg-[#EFE8D8] dark:bg-[#1A261D]">
                      <img
                        src={lot.imageUrl}
                        alt={lot.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      
                      {/* Top Plot Badge */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FAF7EE]/90 dark:bg-[#141F16]/90 backdrop-blur-md text-[#1E3F20] dark:text-[#A8DBAC] text-xs font-bold border border-[#E3DAC6] dark:border-[#283C2C]">
                        {lot.plot}
                      </span>

                      {/* Stock Badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-ping"></span>
                        <span className="text-[#4ADE80] text-[11px] font-bold">{lot.basketsLeft} Baskets Left</span>
                      </div>

                      {/* Bottom Title & Price in ₹ */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <div>
                          <span className="text-white font-serif text-lg font-bold block leading-snug drop-shadow-sm">
                            {lot.name}
                          </span>
                          <span className="text-[#E5A93C] text-xs font-sans drop-shadow-sm font-semibold">
                            {lot.hindiName}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-[#1E3F20]/90 text-[#FAF7EE] font-mono text-sm font-bold border border-[#3E6B41]">
                          ₹{lot.pricePerKg} / kg
                        </span>
                      </div>
                    </div>

                    {/* Metadata in Simple Words */}
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#5E6D60] dark:text-[#A8B8AB]">Picking Time:</span>
                        <span className="text-[#1E3F20] dark:text-[#FAF5EA] font-semibold">{lot.harvestTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#5E6D60] dark:text-[#A8B8AB]">Chemical Spray:</span>
                        <span className="text-[#1E3F20] dark:text-[#4ADE80] font-bold">0.00% Zero-Chemical</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#5E6D60] dark:text-[#A8B8AB]">Freshness Score:</span>
                        <span className="text-[#C86D3B] dark:text-[#E0854E] font-bold">{lot.freshnessScore}% Pure</span>
                      </div>
                      <p className="text-[#556357] dark:text-[#CBD5CD] font-light text-[11px] leading-relaxed pt-1">
                        {lot.simpleDescription}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-[#E3DAC6] dark:border-[#283C2C] grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onInspectProduce(lot)}
                      className="py-2.5 px-3 rounded-full bg-[#EFE8D8] hover:bg-[#E2D8C3] dark:bg-[#203223] dark:hover:bg-[#2A422F] text-[#1E3F20] dark:text-[#FAF5EA] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">info</span>
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => onReserveProduce(lot)}
                      className="py-2.5 px-3 rounded-full bg-[#1E3F20] hover:bg-[#163519] dark:bg-[#2E5A33] dark:hover:bg-[#3D7544] text-[#FAF7EE] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_circle</span>
                      <span>Add Basket</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Farm Status Bar in Creamy Theme */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="mt-10 rounded-2xl bg-[#EFE8D8] dark:bg-[#1A261D] p-4 border border-[#DFD5BE] dark:border-[#283C2C] flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1E3F20] text-[#FAF7EE] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">wb_sunny</span>
                </div>
                <div className="text-xs">
                  <span className="text-[#1E3F20] dark:text-[#FAF5EA] font-bold block">
                    Kamana Farm, Visnagar, Mehsana
                  </span>
                  <span className="text-[#5E6D60] dark:text-[#A8B8AB] text-[11px]">
                    24°C Morning Sunshine · Pure Village Air · Call: {BRAND_INFO.phone}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-[#3E6B41] dark:text-[#A8B8AB]">
                <div>Soil: <strong className="text-[#1E3F20] dark:text-[#FAF5EA]">Living Desi Compost</strong></div>
                <div className="hidden sm:inline text-[#B8AC9D]">|</div>
                <div>Pesticides: <strong className="text-[#1E3F20] dark:text-[#4ADE80]">0.00% Zero Spray</strong></div>
                <div className="hidden sm:inline text-[#B8AC9D]">|</div>
                <div>Delivery: <strong className="text-[#C86D3B] dark:text-[#E0854E]">Direct to Home in 4 Hours</strong></div>
              </div>

              <button
                onClick={() => setActiveView('telemetry')}
                className="px-4 py-1.5 rounded-full bg-[#1E3F20] hover:bg-[#163519] text-[#FAF7EE] text-xs font-semibold transition-colors cursor-pointer"
              >
                View Farm Weather &rarr;
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 8-Card Pure Food Promise (Creamy with Greenish Badges) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 px-4 sm:px-8 py-16 max-w-7xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Feature Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-3xl bg-[#1E3F20] text-[#FAF7EE] p-8 sm:p-10 flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7EE]/15 text-[#E5A93C] text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] animate-pulse"></span>
                Kamana, Visnagar, Gujarat
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7EE] leading-tight font-normal">
                No Cold Storage.<br />
                No Middlemen.<br />
                <span className="text-[#E5A93C] italic">100% Direct Farm.</span>
              </h3>
              <p className="text-sm text-[#E4EDE1] leading-relaxed font-light">
                Market vegetables often sit in chemical-cooled warehouses for days, losing their sweet taste and vital vitamins. At <strong>PureKhetar</strong>, your vegetables are hand-picked at 5:45 AM sunrise from our Kamana fields and brought straight to your kitchen in 4 hours.
              </p>
            </div>

            <div className="pt-8 space-y-3">
              <div className="text-xs text-[#E5A93C] font-semibold">
                An SPU Student Startup · Supported by Sankalchand Patel University
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveView('traceability')}
                  className="px-6 py-3 rounded-full bg-[#FAF7EE] text-[#1E3F20] hover:bg-[#E5A93C] hover:text-[#1E3F20] font-bold text-xs tracking-wide transition-all cursor-pointer shadow-md"
                >
                  Check Today&apos;s Harvest Batch
                </button>
                <a
                  href={BRAND_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs tracking-wide transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right 8-Promise Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#EFE8D8] dark:bg-[#1A261D] p-4 rounded-3xl border border-[#DFD5BE] dark:border-[#283C2C]">
            {farmPromises.map((p, idx) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => setSelectedCert(selectedCert === p.id ? null : p.id)}
                className={`p-4 rounded-2xl transition-all text-center space-y-2 cursor-pointer border flex flex-col items-center justify-center ${
                  selectedCert === p.id
                    ? 'bg-[#1E3F20] text-[#FAF7EE] border-[#1E3F20] scale-[1.03] shadow-md'
                    : 'bg-[#FFFDF9] dark:bg-[#141F16] hover:bg-[#FAF7EE] text-[#1C271E] dark:text-[#FAF5EA] border-[#E3DAC6] dark:border-[#283C2C]'
                }`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
                  selectedCert === p.id
                    ? 'bg-[#FAF7EE]/20 text-[#FAF7EE]'
                    : 'bg-[#EBF2EB] dark:bg-[#203423] text-[#1E3F20] dark:text-[#65A46B]'
                }`}>
                  <span className="material-symbols-outlined text-[22px]">{p.icon}</span>
                </div>
                <div className="text-xs font-bold leading-tight">{p.title}</div>
                <div className={`text-[10px] ${selectedCert === p.id ? 'text-[#E5A93C]' : 'text-[#79887C]'}`}>
                  {p.sub}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Selected Info Banner */}
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-2xl bg-[#EBF2EB] dark:bg-[#1F3323] border border-[#74A878] flex items-center justify-between text-xs text-[#1E3F20] dark:text-[#FAF5EA]"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#1E3F20] dark:text-[#4ADE80] text-[20px]">verified</span>
              <div>
                <strong className="text-[#1E3F20] dark:text-[#4ADE80]">
                  {farmPromises.find((p) => p.id === selectedCert)?.title}:
                </strong>{' '}
                <span>
                  {farmPromises.find((p) => p.id === selectedCert)?.detail}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedCert(null)}
              className="text-[#556357] hover:text-[#1E3F20] dark:hover:text-white px-2 py-1 text-xs cursor-pointer font-bold"
            >
              Close
            </button>
          </motion.div>
        )}
      </motion.section>

      {/* Marquee Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="w-full py-4 bg-[#1E3F20] text-[#FAF7EE] border-y border-[#2E5A33] overflow-hidden relative"
      >
        <div className="animate-marquee flex items-center space-x-8 text-xs uppercase tracking-widest whitespace-nowrap">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]"></span> PureKhetar · SPU Student Startup
          </span>
          <span className="text-[#3E6B41]">&bull;</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]"></span> 100% Zero-Chemical &amp; Pesticide-Free
          </span>
          <span className="text-[#3E6B41]">&bull;</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]"></span> Hand-Picked at 5:45 AM Sunrise in Kamana, Visnagar
          </span>
          <span className="text-[#3E6B41]">&bull;</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]"></span> Direct Farm to Doorstep in 4 Hours
          </span>
          <span className="text-[#3E6B41]">&bull;</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]"></span> Call / WhatsApp: 83200 19977
          </span>
          <span className="text-[#3E6B41]">&bull;</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]"></span> Rooted in Nature, Cultivated with Care
          </span>
        </div>
      </motion.div>

      {/* Weekly Basket Section */}
      <motion.section
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 px-4 sm:px-8 py-20 max-w-7xl mx-auto w-full"
        id="basket-builder-section"
      >
        <div className="rounded-3xl bg-[#FAF7EE] dark:bg-[#141F16] p-6 sm:p-12 border border-[#E3DAC6] dark:border-[#283C2C] shadow-xl relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-10"
          >
            <span className="text-[#C86D3B] dark:text-[#E0854E] text-xs uppercase tracking-wider font-bold block mb-2">
              Weekly Home Vegetable Delivery · Kamana, Visnagar Farm
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E3F20] dark:text-[#FAF5EA] font-normal">
              Choose Your Weekly PureKhetar Basket
            </h2>
            <p className="text-sm md:text-base text-[#556357] dark:text-[#CBD5CD] font-light mt-3 leading-relaxed">
              Receive clean, 100% zero-chemical vegetables picked fresh every Tuesday and Friday morning. No advance lock-in contracts. Cancel, pause, or customize anytime via WhatsApp.
            </p>
          </motion.div>

          {/* 3 Tier Cards in Rupees (₹) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {BASKET_TIERS.map((tier, idx) => {
              const isSelected = selectedTierId === tier.id;
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 35, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between cursor-pointer border relative ${
                    isSelected
                      ? 'bg-[#1E3F20] text-[#FAF7EE] border-[#1E3F20] shadow-xl scale-[1.02]'
                      : 'bg-[#FFFDF9] dark:bg-[#18261B] text-[#1C271E] dark:text-[#FAF5EA] border-[#E3DAC6] dark:border-[#283C2C] hover:border-[#1E3F20]'
                  }`}
                >
                  {tier.isPopular && (
                    <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#C86D3B] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                      Most Families Choose This
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug">{tier.name}</h3>
                      <div className="text-right shrink-0 ml-2">
                        <span className={`font-mono text-2xl font-bold ${isSelected ? 'text-[#E5A93C]' : 'text-[#1E3F20] dark:text-[#65A46B]'}`}>
                          ₹{tier.priceRupees}
                        </span>
                        <span className={`text-xs block ${isSelected ? 'text-[#E4EDE1]' : 'text-[#79887C]'}`}>/week</span>
                      </div>
                    </div>

                    <div className={`text-xs mb-3 font-semibold ${isSelected ? 'text-[#E5A93C]' : 'text-[#C86D3B] dark:text-[#E0854E]'}`}>
                      {tier.hindiSubtitle} &middot; {tier.weightKg}
                    </div>

                    <p className={`text-xs mb-4 font-light ${isSelected ? 'text-[#E4EDE1]' : 'text-[#556357] dark:text-[#CBD5CD]'}`}>
                      {tier.simpleDescription}
                    </p>

                    <ul className="space-y-2 text-xs">
                      {tier.features.map((feat, fidx) => (
                        <li key={fidx} className="flex items-center gap-2">
                          <span className={`material-symbols-outlined text-[16px] ${isSelected ? 'text-[#E5A93C]' : 'text-[#1E3F20] dark:text-[#65A46B]'}`}>
                            check_circle
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10">
                    <span
                      className={`block w-full py-2.5 rounded-full text-center text-xs font-semibold tracking-wide transition-all ${
                        isSelected
                          ? 'bg-[#FAF7EE] text-[#1E3F20] font-bold shadow-md'
                          : 'bg-[#EFE8D8] dark:bg-[#203223] text-[#1E3F20] dark:text-[#FAF5EA]'
                      }`}
                    >
                      {isSelected ? 'Active Plan Selected' : 'Select This Basket'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="p-5 sm:p-6 rounded-3xl bg-[#EFE8D8] dark:bg-[#1A261D] border border-[#DFD5BE] dark:border-[#283C2C] flex flex-col md:flex-row items-center justify-between gap-5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1E3F20] flex items-center justify-center text-[#FAF7EE] shrink-0">
                <span className="material-symbols-outlined text-[24px]">local_shipping</span>
              </div>
              <div>
                <span className="text-[#1E3F20] dark:text-[#FAF5EA] font-serif text-base font-bold block">
                  Selected: {selectedTier.name} (₹{selectedTier.priceRupees}/week)
                </span>
                <span className="text-[#556357] dark:text-[#CBD5CD] text-xs">
                  Next Delivery: Tuesday Morning 7:00 AM &middot; Direct Farm Harvest from Kamana, Visnagar
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href={`${BRAND_INFO.whatsappLink}&text=Hi%20PureKhetar!%20I%20want%20to%20subscribe%20to%20the%20${encodeURIComponent(selectedTier.name)}%20(₹${selectedTier.priceRupees}/week).`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BA5C] text-white font-bold text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>WhatsApp to Order</span>
              </a>

              <button
                onClick={handleConfirmAllocation}
                disabled={allocationConfirmed}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1E3F20] hover:bg-[#163519] text-[#FAF7EE] font-bold text-xs tracking-wider transition-all duration-300 cursor-pointer shadow-md"
              >
                {allocationConfirmed ? 'Basket Booked! Customizing...' : 'Customize Online'}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};
