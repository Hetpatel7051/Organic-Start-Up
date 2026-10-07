import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BASKET_TIERS, PRODUCE_LOTS } from '../data/mockData';
import { BasketTier } from '../types';

interface SubscriptionBasketsViewProps {
  onSuccessOrder?: (orderId: string) => void;
}

export const SubscriptionBasketsView: React.FC<SubscriptionBasketsViewProps> = ({
  onSuccessOrder
}) => {
  const [selectedTier, setSelectedTier] = useState<BasketTier>(BASKET_TIERS[1]);
  const [selectedLots, setSelectedLots] = useState<string[]>([
    PRODUCE_LOTS[0].id,
    PRODUCE_LOTS[1].id,
    PRODUCE_LOTS[2].id,
    PRODUCE_LOTS[3].id,
    PRODUCE_LOTS[4].id
  ]);
  const [deliveryDay, setDeliveryDay] = useState<'tuesday' | 'friday'>('tuesday');
  const [familyTag, setFamilyTag] = useState('My Family Kitchen Basket');
  const [deliveryCity, setDeliveryCity] = useState('Ahmedabad / Mehsana, Gujarat');
  const [isOrdering, setIsOrdering] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  const toggleLot = (lotId: string) => {
    if (selectedLots.includes(lotId)) {
      if (selectedLots.length > 2) {
        setSelectedLots(selectedLots.filter((id) => id !== lotId));
      }
    } else {
      setSelectedLots([...selectedLots, lotId]);
    }
  };

  const handleCheckout = () => {
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      const order = {
        orderId: `AT-IND-${Math.floor(10000 + Math.random() * 90000)}`,
        tier: selectedTier.name,
        priceRupees: selectedTier.priceRupees,
        deliveryDay: deliveryDay === 'tuesday' ? 'Every Tuesday Morning (7:00 AM)' : 'Every Friday Morning (7:00 AM)',
        familyTag,
        city: deliveryCity,
        lotsCount: selectedLots.length,
        timestamp: new Date().toLocaleTimeString('en-IN')
      };
      setCompletedOrder(order);
      if (onSuccessOrder) onSuccessOrder(order.orderId);
    }, 900);
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
            DOORSTEP DELIVERY ACROSS INDIA · 100% CHEMICAL FREE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-white">
            Choose Your Weekly Vegetable Basket
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl mt-2 font-light">
            Pure, chemical-free vegetables harvested early morning and brought directly to your home in India. No advance contract lock-in. Pause or cancel anytime.
          </p>
        </div>
      </motion.div>

      {/* 3 Tier Cards with Scroll Loading Animation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BASKET_TIERS.map((tier, idx) => {
          const isSelected = selectedTier.id === tier.id;
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              onClick={() => setSelectedTier(tier)}
              className={`rounded-3xl p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer border relative ${
                isSelected
                  ? 'bg-neutral-900 border-emerald-400 shadow-[0_20px_50px_rgba(78,222,163,0.2)] scale-[1.02]'
                  : 'bg-neutral-950/80 hover:bg-neutral-900/60 border-white/10'
              }`}
            >
              {tier.isPopular && (
                <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-emerald-400 text-black text-[10px] font-bold uppercase tracking-wider">
                  Recommended for Families
                </span>
              )}

              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-bold">{tier.name}</h3>
                    <span className="text-xs text-emerald-400 font-medium block mt-0.5">{tier.hindiSubtitle}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-emerald-400 text-2xl sm:text-3xl font-bold">
                      ₹{tier.priceRupees}
                    </span>
                    <span className="text-xs text-neutral-400 block">/week</span>
                  </div>
                </div>

                <div className="text-xs text-neutral-300 font-mono mb-4">
                  {tier.weightKg} · {tier.idealFor}
                </div>

                <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                  {tier.simpleDescription}
                </p>

                <div className="space-y-2 border-t border-white/10 pt-4">
                  {tier.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-center gap-2 text-xs text-neutral-200">
                      <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <button
                  type="button"
                  className={`w-full py-3 rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-emerald-400 text-black shadow-md'
                      : 'bg-white/10 text-neutral-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {isSelected ? 'Active Plan Selected' : 'Select This Plan'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Vegetable Customizer Section (Loaded on Scroll) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-neutral-950 p-6 sm:p-10 border border-white/10 space-y-8 shadow-2xl"
      >
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs uppercase tracking-wider font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Weekly Customizer · Select Your Vegetables
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white">
            Customize What Goes in Your {selectedTier.name}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1">
            Toggle which vegetables you and your family prefer this week. Freshly picked at 5:45 AM.
          </p>
        </div>

        {/* Veggie Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {PRODUCE_LOTS.map((lot, idx) => {
            const isIncluded = selectedLots.includes(lot.id);
            return (
              <motion.div
                key={lot.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.4, delay: (idx % 5) * 0.05 }}
                onClick={() => toggleLot(lot.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isIncluded
                    ? 'bg-neutral-900 border-emerald-400 shadow-[0_4px_20px_rgba(78,222,163,0.15)]'
                    : 'bg-white/5 border-white/5 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={`material-symbols-outlined text-[20px] ${isIncluded ? 'text-emerald-400' : 'text-neutral-500'}`}>
                    {isIncluded ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                  <span className="font-mono text-[11px] text-emerald-400 font-bold">
                    ₹{lot.pricePerKg}/kg
                  </span>
                </div>

                <div>
                  <span className="font-serif text-sm text-white font-bold block leading-tight">
                    {lot.name}
                  </span>
                  <span className="text-[11px] text-emerald-300 block mt-0.5">
                    {lot.hindiName.split(' ')[0]}
                  </span>
                </div>

                <div className="text-[10px] text-neutral-400 mt-2 pt-2 border-t border-white/5 flex justify-between">
                  <span>{lot.weightText}</span>
                  <span className="text-emerald-400 font-semibold">{lot.freshnessScore}% Fresh</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Delivery Preferences Form */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div>
            <label className="text-neutral-400 block mb-2 font-medium">Weekly Delivery Morning:</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDeliveryDay('tuesday')}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                  deliveryDay === 'tuesday' ? 'bg-emerald-400 text-black font-bold border-emerald-400' : 'bg-white/5 text-white border-white/10'
                }`}
              >
                Every Tuesday (7 AM)
              </button>
              <button
                type="button"
                onClick={() => setDeliveryDay('friday')}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                  deliveryDay === 'friday' ? 'bg-emerald-400 text-black font-bold border-emerald-400' : 'bg-white/5 text-white border-white/10'
                }`}
              >
                Every Friday (7 AM)
              </button>
            </div>
          </div>

          <div>
            <label className="text-neutral-400 block mb-2 font-medium">Family Label on Wooden Crate:</label>
            <input
              type="text"
              value={familyTag}
              onChange={(e) => setFamilyTag(e.target.value)}
              placeholder="e.g. Patel Family Kitchen"
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400 text-xs font-sans"
            />
          </div>

          <div>
            <label className="text-neutral-400 block mb-2 font-medium">Delivery City / Region:</label>
            <input
              type="text"
              value={deliveryCity}
              onChange={(e) => setDeliveryCity(e.target.value)}
              placeholder="e.g. Ahmedabad / Mehsana"
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400 text-xs font-sans"
            />
          </div>
        </div>

        {/* Final Order Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div>
            <div className="text-white text-base font-serif font-bold">
              Total Weekly Price: <span className="font-mono text-emerald-400 text-2xl font-bold">₹{selectedTier.priceRupees}</span>
            </div>
            <span className="text-xs text-neutral-400">
              Includes {selectedLots.length} vegetable types · Free morning doorstep delivery · Cash/UPI on Delivery
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isOrdering}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs tracking-wider transition-all duration-300 cursor-pointer shadow-lg"
          >
            {isOrdering ? 'Confirming Your Weekly Basket...' : 'Book Weekly Basket (₹' + selectedTier.priceRupees + ')'}
          </button>
        </div>
      </motion.div>

      {/* Completed Order Modal/Receipt */}
      {completedOrder && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 sm:p-8 rounded-3xl bg-emerald-950/40 border border-emerald-400/50 space-y-4 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-400 text-[32px]">check_circle</span>
            <div>
              <h3 className="font-serif text-2xl text-white font-bold">
                Weekly Vegetable Basket Confirmed!
              </h3>
              <p className="text-xs text-emerald-300 font-mono">
                Order Reference: {completedOrder.orderId} · {completedOrder.timestamp}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
              <span className="text-neutral-400 block">BASKET TIER</span>
              <strong className="text-white text-sm">{completedOrder.tier}</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
              <span className="text-neutral-400 block">DELIVERY SCHEDULE</span>
              <strong className="text-emerald-400 text-sm">{completedOrder.deliveryDay}</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
              <span className="text-neutral-400 block">PAYMENT MODE</span>
              <strong className="text-white text-sm">₹{completedOrder.priceRupees} · Pay on Delivery (UPI / Cash)</strong>
            </div>
          </div>

          <p className="text-xs text-neutral-300 font-light">
            Our farmers in Mehsana will harvest your vegetables at 5:45 AM on {completedOrder.deliveryDay.split(' ')[1]}. Your crate will carry a QR verification tag with your family name.
          </p>
        </motion.div>
      )}
    </div>
  );
};
