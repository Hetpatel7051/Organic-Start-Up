import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CategoryFilter, ProduceLot, ActiveView } from '../types';
import { PRODUCE_LOTS, BASKET_TIERS } from '../data/mockData';

interface HarvestLiveViewProps {
  setActiveView: (view: ActiveView) => void;
  onInspectProduce: (lot: ProduceLot) => void;
  onReserveProduce: (lot: ProduceLot) => void;
  onOpenScanner?: () => void;
}

export const HarvestLiveView: React.FC<HarvestLiveViewProps> = ({
  setActiveView,
  onInspectProduce,
  onReserveProduce,
  onOpenScanner
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-medium');
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [allocationConfirmed, setAllocationConfirmed] = useState(false);

  const filteredLots = PRODUCE_LOTS.filter((lot) => {
    if (activeCategory === 'all') return true;
    return lot.category === activeCategory;
  });

  const selectedTier = BASKET_TIERS.find((t) => t.id === selectedTierId) || BASKET_TIERS[1];

  const farmPromises = [
    {
      id: 'cert',
      icon: 'verified',
      title: '100% Certified Organic',
      sub: 'Govt. Lab Approved',
      detail: 'Officially certified organic by authorized government laboratories with zero synthetic chemical inputs.'
    },
    {
      id: 'pesticide',
      icon: 'sanitizer',
      title: '0.00% Chemical Spray',
      sub: 'Safe for Children',
      detail: 'Completely free from harmful chemical pesticides, artificial ripening gases, and toxic wax coatings.'
    },
    {
      id: 'soil',
      icon: 'compost',
      title: 'Living Natural Soil',
      sub: 'Desi Cow Compost',
      detail: 'Nourished exclusively with traditional Jeevamrutha, neem oil spray, and natural organic compost.'
    },
    {
      id: 'qr',
      icon: 'qr_code_2',
      title: 'QR Code on Every Box',
      sub: 'Know Your Farmer',
      detail: 'Scan the QR code on your vegetable crate to see the exact time it was picked and farmer name.'
    },
    {
      id: 'solar',
      icon: 'solar_power',
      title: 'Solar Drip Irrigation',
      sub: 'Clean Well Water',
      detail: 'Clean underground tube-well water delivered drop-by-drop using clean solar energy.'
    },
    {
      id: 'dawn',
      icon: 'wb_twilight',
      title: 'Sunrise Hand Plucked',
      sub: '5:45 AM Daily Cut',
      detail: 'Vegetables are picked strictly between 5:30 AM and 6:30 AM when crispness and natural vitamins are highest.'
    },
    {
      id: 'fresh',
      icon: 'local_shipping',
      title: 'Zero Cold Storage',
      sub: 'Never in Warehouse',
      detail: 'Unlike market vegetables that sit in cold storage for days, our harvest reaches your kitchen in 4 hours.'
    },
    {
      id: 'farm',
      icon: 'nature_people',
      title: '10 Bigha Natural Farm',
      sub: 'Mehsana, Gujarat',
      detail: 'Our own dedicated agricultural land with native trees, clean air, and peaceful rural surroundings.'
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
    <div className="relative w-full overflow-hidden">
      {/* Background Fiber Wave Aesthetics (Visuvate Style) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        <svg
          className="w-full h-full min-h-[1400px] text-emerald-400/20"
          fill="none"
          viewBox="0 0 1600 1200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="animate-pulse"
            d="M-100 200 C 400 50, 700 600, 1100 250 C 1350 50, 1500 450, 1800 280"
            stroke="currentColor"
            strokeDasharray="8 6"
            strokeWidth="1.2"
          />
          <path
            d="M-50 450 C 350 250, 600 850, 1050 400 C 1300 150, 1600 650, 1750 400"
            stroke="rgba(69,223,164,0.35)"
            strokeWidth="1.8"
          />
          <circle cx="1050" cy="400" fill="#4edea3" filter="drop-shadow(0 0 8px #4edea3)" r="4" />
          <circle cx="600" cy="850" fill="#68fcbf" filter="drop-shadow(0 0 6px #68fcbf)" r="3" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-24 sm:pt-32 pb-12 max-w-7xl mx-auto w-full">
        {/* Simple Notification Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setActiveView('telemetry')}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 dark:bg-white/5 backdrop-blur-md border border-emerald-400/30 shadow-md mb-6 hover:scale-105 cursor-pointer transition-transform"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-xs uppercase tracking-wider text-neutral-200 font-medium">
            Morning Harvest &mdash; <span className="text-emerald-400 font-bold">Picked at 5:45 AM Today</span>
          </span>
          <span className="material-symbols-outlined text-[15px] text-emerald-400">arrow_forward</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight max-w-5xl leading-[1.1] mb-5 font-normal text-neutral-900 dark:text-white"
        >
          Pure Natural Vegetables.<br />
          <span className="italic font-normal text-emerald-500 dark:text-emerald-400 underline decoration-emerald-400/40 decoration-wavy decoration-1 underline-offset-8">
            Picked Fresh
          </span>
          {' '}at Sunrise.
        </motion.h1>

        {/* Clear, simple subtitle in formal English */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mb-8 leading-relaxed font-light"
        >
          100% chemical-free organic vegetables grown in rich living soil in Gujarat. Plucked fresh every morning and delivered directly to your doorstep in 4 hours.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 z-20"
        >
          <button
            onClick={() => {
              const el = document.getElementById('basket-builder-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else setActiveView('subscription-baskets');
            }}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-emerald-400 text-black font-bold text-xs sm:text-sm shadow-lg hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>Order Weekly Basket (from ₹499)</span>
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
          </button>

          <button
            onClick={() => setActiveView('the-plots')}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-xl text-neutral-900 dark:text-white font-semibold text-xs sm:text-sm border border-neutral-300 dark:border-white/15 hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span className="material-symbols-outlined text-emerald-500 dark:text-emerald-400 text-[18px]">travel_explore</span>
            <span>View Our Farm Plots</span>
          </button>

          {onOpenScanner && (
            <button
              onClick={onOpenScanner}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 font-semibold text-xs sm:text-sm border border-emerald-400/40 hover:bg-emerald-400 hover:text-black transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
              <span>Scan Box QR</span>
            </button>
          )}
        </motion.div>

        {/* Category Filters */}
        <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-black/60 dark:bg-black/60 border border-white/10 backdrop-blur-xl">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-emerald-400 text-black font-bold shadow-md'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            All Vegetables ({PRODUCE_LOTS.length})
          </button>
          <button
            onClick={() => setActiveCategory('daily')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === 'daily'
                ? 'bg-emerald-400 text-black font-bold shadow-md'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Daily Sabzi (टमाटर, भिंडी, गोभी)
          </button>
          <button
            onClick={() => setActiveCategory('leafy')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === 'leafy'
                ? 'bg-emerald-400 text-black font-bold shadow-md'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Fresh Greens (पालक, मेथी, धनिया)
          </button>
          <button
            onClick={() => setActiveCategory('gourd-roots')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === 'gourd-roots'
                ? 'bg-emerald-400 text-black font-bold shadow-md'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Gourds & Roots (लौकी, गाजर)
          </button>
        </div>
      </section>

      {/* 3D Floating Perspective Vegetable Cards Section */}
      <section className="relative z-10 w-full px-4 sm:px-8 py-6" id="plots-stage">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full rounded-3xl bg-neutral-900/90 dark:bg-neutral-950/90 backdrop-blur-3xl p-5 sm:p-8 md:p-10 border border-white/10 shadow-2xl">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-3">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs uppercase tracking-wider font-semibold mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Today&apos;s Live Morning Harvest · Mehsana Farm
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">
                  Fresh Vegetables Harvested This Morning
                </h2>
              </div>
              <p className="text-xs text-neutral-300 max-w-sm font-sans">
                Grown on our natural farm in Mehsana, Gujarat. Zero cold storage, delivered in pure cotton crates.
              </p>
            </div>

            {/* Responsive Card Grid with Rupee Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLots.map((lot) => (
                <div
                  key={lot.id}
                  className="group relative rounded-2xl bg-neutral-900 p-5 backdrop-blur-2xl border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-400/60 shadow-xl flex flex-col justify-between"
                >
                  {lot.isPopular && (
                    <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-emerald-400 text-black text-[10px] font-bold uppercase tracking-wider shadow-md z-10">
                      Most Popular
                    </div>
                  )}

                  <div>
                    {/* Image Box */}
                    <div className="relative h-56 w-full rounded-xl overflow-hidden mb-4 shadow-inner">
                      <img
                        src={lot.imageUrl}
                        alt={lot.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"></div>
                      
                      {/* Top Plot Badge */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-emerald-400 text-xs font-semibold border border-emerald-400/20">
                        {lot.plot}
                      </span>

                      {/* Stock Badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="text-emerald-400 text-[11px] font-bold">{lot.basketsLeft} Baskets Left</span>
                      </div>

                      {/* Bottom Title & Price in ₹ */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <div>
                          <span className="text-white font-serif text-lg font-bold block leading-snug">
                            {lot.name}
                          </span>
                          <span className="text-emerald-300 text-xs font-sans">
                            {lot.hindiName}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-400/20 text-emerald-300 font-mono text-sm font-bold border border-emerald-400/30">
                          ₹{lot.pricePerKg} / kg
                        </span>
                      </div>
                    </div>

                    {/* Metadata in Simple Words */}
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Picking Time:</span>
                        <span className="text-white font-medium">{lot.harvestTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Chemical Spray:</span>
                        <span className="text-emerald-400 font-bold">0.00% (Certified Safe)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Freshness Score:</span>
                        <span className="text-emerald-300 font-bold">{lot.freshnessScore}% Pure</span>
                      </div>
                      <p className="text-neutral-300 font-light text-[11px] leading-relaxed pt-1">
                        {lot.simpleDescription}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onInspectProduce(lot)}
                      className="py-2.5 px-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">info</span>
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => onReserveProduce(lot)}
                      className="py-2.5 px-3 rounded-full bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_circle</span>
                      <span>Add Basket</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Farm Status Bar in Simple English */}
            <div className="mt-10 rounded-2xl bg-black/60 backdrop-blur-xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
                </div>
                <div className="text-xs">
                  <span className="text-white font-semibold block">Mehsana Farm, Gujarat</span>
                  <span className="text-neutral-400 text-[11px]">Today: 24°C Morning Sunshine · Clean Village Air</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-neutral-300">
                <div>Soil: <strong className="text-emerald-400">Living Compost</strong></div>
                <div className="hidden sm:inline text-neutral-600">|</div>
                <div>Pesticides: <strong className="text-emerald-400">0.00% Zero Spray</strong></div>
                <div className="hidden sm:inline text-neutral-600">|</div>
                <div>Delivery: <strong className="text-white">To Your Home in 4 Hours</strong></div>
              </div>

              <button
                onClick={() => setActiveView('telemetry')}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/10 transition-colors cursor-pointer"
              >
                View Farm Weather &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8-Card Pure Food Promise (Simple English) */}
      <section className="relative z-10 px-4 sm:px-8 py-16 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Feature Card */}
          <div className="lg:col-span-5 rounded-3xl bg-neutral-900/90 dark:bg-neutral-950 p-8 sm:p-10 flex flex-col justify-between border border-white/10 shadow-xl">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-400/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Direct From Our Land in Gujarat
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
                No Cold Storage.<br />
                No Middlemen.
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                Market vegetables often sit in cold storage rooms for days, losing their real taste and essential vitamins. At Aura Terra, your vegetables are plucked at 5:45 AM, packed in clean cotton crates, and brought directly to your home.
              </p>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setActiveView('traceability')}
                className="px-6 py-3 rounded-full bg-white text-black hover:bg-emerald-400 font-bold text-xs tracking-wide transition-all cursor-pointer shadow-md"
              >
                Check Today&apos;s Harvest Batch
              </button>
            </div>
          </div>

          {/* Right 8-Promise Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/40 p-3 rounded-3xl border border-white/10 backdrop-blur-xl">
            {farmPromises.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedCert(selectedCert === p.id ? null : p.id)}
                className={`p-4 rounded-2xl transition-all text-center space-y-2 cursor-pointer border flex flex-col items-center justify-center ${
                  selectedCert === p.id
                    ? 'bg-emerald-500/20 border-emerald-400 scale-[1.03]'
                    : 'bg-white/5 hover:bg-white/10 border-white/5'
                }`}
              >
                <div className="w-11 h-11 rounded-full bg-black/50 flex items-center justify-center text-emerald-400 border border-white/10">
                  <span className="material-symbols-outlined text-[22px]">{p.icon}</span>
                </div>
                <div className="text-xs text-white font-semibold leading-tight">{p.title}</div>
                <div className="text-[10px] text-neutral-400">{p.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Info Banner */}
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-400/40 flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-400 text-[20px]">verified</span>
              <div>
                <strong className="text-emerald-300">
                  {farmPromises.find((p) => p.id === selectedCert)?.title}:
                </strong>{' '}
                <span className="text-neutral-200">
                  {farmPromises.find((p) => p.id === selectedCert)?.detail}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedCert(null)}
              className="text-neutral-400 hover:text-white px-2 py-1 text-xs cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        )}
      </section>

      {/* Marquee Ticker */}
      <div className="w-full py-4 bg-black/80 border-y border-white/10 overflow-hidden relative">
        <div className="animate-marquee flex items-center space-x-8 text-neutral-400 text-xs uppercase tracking-widest whitespace-nowrap">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 100% Chemical-Free Vegetables
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Fresh From Gujarat Farms
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Hand-Picked at 5:45 AM
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Delivered Directly to Your Home in 4 Hours
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 100% Safe for Children &amp; Elders
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Zero Cold Storage Warehousing
          </span>
        </div>
      </div>

      {/* Weekly Basket Section in Indian Rupees (₹) */}
      <section className="relative z-10 px-4 sm:px-8 py-20 max-w-7xl mx-auto w-full" id="basket-builder-section">
        <div className="rounded-3xl bg-neutral-900/90 dark:bg-neutral-950 p-6 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mb-10">
            <span className="text-emerald-400 text-xs uppercase tracking-wider font-semibold block mb-2">
              Weekly Home Vegetable Delivery · India
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white">
              Choose Your Weekly Vegetable Basket
            </h2>
            <p className="text-sm md:text-base text-neutral-300 font-light mt-3 leading-relaxed">
              Get clean, chemical-free vegetables harvested every Tuesday and Friday morning. No advance contract lock-in. Cancel or pause anytime.
            </p>
          </div>

          {/* 3 Tier Cards in Rupees (₹) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {BASKET_TIERS.map((tier) => {
              const isSelected = selectedTierId === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between cursor-pointer border relative ${
                    isSelected
                      ? 'bg-neutral-900 border-emerald-400 shadow-[0_15px_40px_rgba(78,222,163,0.2)] scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  {tier.isPopular && (
                    <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-emerald-400 text-black text-[10px] font-bold uppercase tracking-wider shadow-md">
                      Most Families Choose This
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-xl text-white font-bold">{tier.name}</h3>
                      <div className="text-right">
                        <span className="font-mono text-emerald-400 text-2xl font-bold">
                          ₹{tier.priceRupees}
                        </span>
                        <span className="text-xs text-neutral-400 block">/week</span>
                      </div>
                    </div>

                    <div className="text-xs text-emerald-300 mb-3 font-medium">
                      {tier.hindiSubtitle} &middot; {tier.weightKg}
                    </div>

                    <p className="text-xs text-neutral-300 mb-4 font-light">
                      {tier.simpleDescription}
                    </p>

                    <ul className="space-y-2 text-xs text-neutral-200">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-emerald-400 text-[16px]">
                            check_circle
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <span
                      className={`block w-full py-2.5 rounded-full text-center text-xs font-semibold tracking-wide transition-all ${
                        isSelected
                          ? 'bg-emerald-400 text-black font-bold shadow-md'
                          : 'bg-white/10 text-neutral-300'
                      }`}
                    >
                      {isSelected ? 'Selected Active Basket' : 'Choose This Basket'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="p-5 sm:p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-400 shrink-0">
                <span className="material-symbols-outlined text-[24px]">local_shipping</span>
              </div>
              <div>
                <span className="text-white font-serif text-base font-semibold block">
                  Selected: {selectedTier.name} (₹{selectedTier.priceRupees}/week)
                </span>
                <span className="text-neutral-400 text-xs">
                  Next Delivery: Tuesday Morning 7:00 AM &middot; Free Home Delivery in India
                </span>
              </div>
            </div>

            <button
              onClick={handleConfirmAllocation}
              disabled={allocationConfirmed}
              className={`w-full md:w-auto px-8 py-3.5 rounded-full font-bold text-xs tracking-wider transition-all duration-300 cursor-pointer ${
                allocationConfirmed
                  ? 'bg-emerald-400 text-black'
                  : 'bg-emerald-400 text-black hover:bg-emerald-300 hover:scale-105 active:scale-95 shadow-md'
              }`}
            >
              {allocationConfirmed ? 'Basket Booked! Opening Customizer...' : 'Confirm & Customize Basket'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
