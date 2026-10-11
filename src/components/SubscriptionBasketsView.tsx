import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BASKET_TIERS, PRODUCE_LOTS, BRAND_INFO } from '../data/mockData';
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
  const [deliveryCity, setDeliveryCity] = useState('Visnagar / Mehsana / Ahmedabad');
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
        orderId: `PK-${Math.floor(10000 + Math.random() * 90000)}`,
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
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E3DAC6] dark:border-[#283C2C] pb-6"
      >
        <div>
          <span className="text-[#C86D3B] dark:text-[#E0854E] font-mono text-xs uppercase tracking-wider font-bold block mb-1">
            🌱 KAMANA FARM TO DOORSTEP · SPU STUDENT STARTUP
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E3F20] dark:text-[#FAF5EA]">
            Weekly PureKhetar Vegetable Baskets
          </h1>
          <p className="text-xs sm:text-sm text-[#556357] dark:text-[#CBD5CD] max-w-2xl mt-2 font-light">
            Pure, 100% zero-chemical vegetables harvested early morning in Kamana, Visnagar and brought directly to your home. No lock-in contracts. Cancel or modify anytime.
          </p>
        </div>

        <a
          href={BRAND_INFO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold shadow-md hover:bg-[#20BA5C] transition-all"
        >
          <span className="material-symbols-outlined text-[17px]">chat</span>
          <span>WhatsApp Help: {BRAND_INFO.phone}</span>
        </a>
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
              className={`rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between cursor-pointer border relative ${
                isSelected
                  ? 'bg-[#1E3F20] text-[#FAF7EE] border-[#1E3F20] shadow-xl scale-[1.02]'
                  : 'bg-[#FFFDF9] dark:bg-[#18261B] text-[#1C271E] dark:text-[#FAF5EA] border-[#E3DAC6] dark:border-[#283C2C] hover:border-[#1E3F20]'
              }`}
            >
              {tier.isPopular && (
                <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#C86D3B] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                  Most Families Choose This
                </span>
              )}

              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug">{tier.name}</h3>
                    <span className={`text-xs font-semibold block mt-0.5 ${isSelected ? 'text-[#E5A93C]' : 'text-[#C86D3B] dark:text-[#E0854E]'}`}>
                      {tier.hindiSubtitle}
                    </span>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <span className={`font-mono text-2xl sm:text-3xl font-bold ${isSelected ? 'text-[#E5A93C]' : 'text-[#1E3F20] dark:text-[#65A46B]'}`}>
                      ₹{tier.priceRupees}
                    </span>
                    <span className={`text-xs block ${isSelected ? 'text-[#E4EDE1]' : 'text-[#79887C]'}`}>/week</span>
                  </div>
                </div>

                <div className={`text-xs font-mono mb-4 ${isSelected ? 'text-[#E4EDE1]' : 'text-[#5E6D60] dark:text-[#A8B8AB]'}`}>
                  {tier.weightKg} · {tier.idealFor}
                </div>

                <p className={`text-xs font-light leading-relaxed mb-6 ${isSelected ? 'text-[#E4EDE1]' : 'text-[#556357] dark:text-[#CBD5CD]'}`}>
                  {tier.simpleDescription}
                </p>

                <div className="space-y-2 border-t border-black/10 dark:border-white/10 pt-4">
                  {tier.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-center gap-2 text-xs">
                      <span className={`material-symbols-outlined text-[16px] ${isSelected ? 'text-[#E5A93C]' : 'text-[#1E3F20] dark:text-[#65A46B]'}`}>
                        check_circle
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-black/10 dark:border-white/10">
                <button
                  type="button"
                  className={`w-full py-3 rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#FAF7EE] text-[#1E3F20] shadow-md'
                      : 'bg-[#EFE8D8] dark:bg-[#203223] text-[#1E3F20] dark:text-[#FAF5EA] hover:bg-[#E2D8C3]'
                  }`}
                >
                  {isSelected ? 'Active Plan Selected' : 'Choose This Basket'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Basket Customizer Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] p-6 sm:p-10 border border-[#E3DAC6] dark:border-[#283C2C] shadow-lg space-y-8"
      >
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#C86D3B] dark:text-[#E0854E] font-bold">
            Step 2: Customize Your Weekly Produce
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1E3F20] dark:text-[#FAF5EA] mt-1">
            Pick Your Preferred Vegetables for {selectedTier.name}
          </h2>
          <p className="text-xs sm:text-sm text-[#556357] dark:text-[#CBD5CD] font-light mt-1">
            Select items you love most. We will pack extra bunches of your favored produce from our Kamana farm.
          </p>
        </div>

        {/* Veggie Toggle Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {PRODUCE_LOTS.map((lot) => {
            const isChecked = selectedLots.includes(lot.id);
            return (
              <button
                key={lot.id}
                type="button"
                onClick={() => toggleLot(lot.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isChecked
                    ? 'bg-[#EBF2EB] dark:bg-[#203423] border-[#1E3F20] dark:border-[#4ADE80] shadow-sm'
                    : 'bg-[#FAF7EE] dark:bg-[#141F16] border-[#E3DAC6] dark:border-[#283C2C] opacity-65 hover:opacity-100'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`material-symbols-outlined text-[18px] ${isChecked ? 'text-[#1E3F20] dark:text-[#4ADE80]' : 'text-neutral-400'}`}>
                    {isChecked ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                  <span className="text-[10px] font-mono text-[#C86D3B] dark:text-[#E0854E] font-bold">
                    ₹{lot.pricePerKg}/kg
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1E3F20] dark:text-[#FAF5EA] block leading-snug">
                    {lot.name}
                  </span>
                  <span className="text-[10px] text-[#556357] dark:text-[#CBD5CD]">
                    {lot.hindiName.split('/')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Delivery Options & Checkout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#E3DAC6] dark:border-[#283C2C]">
          <div>
            <label className="text-xs font-semibold text-[#1E3F20] dark:text-[#FAF5EA] block mb-1">
              Select Delivery Day
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDeliveryDay('tuesday')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  deliveryDay === 'tuesday'
                    ? 'bg-[#1E3F20] text-[#FAF7EE]'
                    : 'bg-[#EFE8D8] dark:bg-[#203223] text-[#1E3F20] dark:text-[#FAF5EA]'
                }`}
              >
                Every Tuesday (7 AM)
              </button>
              <button
                type="button"
                onClick={() => setDeliveryDay('friday')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  deliveryDay === 'friday'
                    ? 'bg-[#1E3F20] text-[#FAF7EE]'
                    : 'bg-[#EFE8D8] dark:bg-[#203223] text-[#1E3F20] dark:text-[#FAF5EA]'
                }`}
              >
                Every Friday (7 AM)
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1E3F20] dark:text-[#FAF5EA] block mb-1">
              Delivery City / Area
            </label>
            <input
              type="text"
              value={deliveryCity}
              onChange={(e) => setDeliveryCity(e.target.value)}
              className="w-full bg-[#FAF7EE] dark:bg-[#141F16] border border-[#DED4BE] dark:border-[#283C2C] rounded-xl px-3 py-2 text-xs text-[#1C271E] dark:text-[#FAF5EA] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1E3F20] dark:text-[#FAF5EA] block mb-1">
              Basket Tag / Note
            </label>
            <input
              type="text"
              value={familyTag}
              onChange={(e) => setFamilyTag(e.target.value)}
              className="w-full bg-[#FAF7EE] dark:bg-[#141F16] border border-[#DED4BE] dark:border-[#283C2C] rounded-xl px-3 py-2 text-xs text-[#1C271E] dark:text-[#FAF5EA] focus:outline-none"
            />
          </div>
        </div>

        {/* Order Summary & Final Submit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#EFE8D8] dark:bg-[#1A261D] border border-[#DFD5BE] dark:border-[#283C2C]">
          <div>
            <div className="text-sm font-bold text-[#1E3F20] dark:text-[#FAF5EA]">
              Plan: {selectedTier.name} · ₹{selectedTier.priceRupees} / week
            </div>
            <div className="text-xs text-[#556357] dark:text-[#CBD5CD]">
              {selectedLots.length} items customized · Free morning delivery from Kamana farm · Cash &amp; UPI upon delivery
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <a
              href={`${BRAND_INFO.whatsappLink}&text=Hi%20PureKhetar!%20I%20want%20to%20order%20the%20${encodeURIComponent(selectedTier.name)}%20(₹${selectedTier.priceRupees}/week)%20for%20${encodeURIComponent(deliveryCity)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20BA5C] text-white font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>WhatsApp Order</span>
            </a>

            <button
              onClick={handleCheckout}
              disabled={isOrdering}
              className="flex-1 sm:flex-none px-7 py-3 rounded-full bg-[#1E3F20] hover:bg-[#163519] text-[#FAF7EE] font-bold text-xs tracking-wider transition-all cursor-pointer shadow-md"
            >
              {isOrdering ? 'Booking Basket...' : 'Confirm Basket Online'}
            </button>
          </div>
        </div>

        {/* Completed Order Confirmation Banner */}
        {completedOrder && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-3xl bg-[#EBF2EB] dark:bg-[#1F3323] border border-[#74A878] space-y-3 text-xs"
          >
            <div className="flex items-center gap-2 text-[#1E3F20] dark:text-[#4ADE80] font-bold text-sm">
              <span className="material-symbols-outlined text-[22px]">verified</span>
              <span>Weekly Basket Booked Successfully! Order #{completedOrder.orderId}</span>
            </div>
            <p className="text-[#556357] dark:text-[#CBD5CD]">
              Thank you for supporting <strong>PureKhetar</strong>! Your fresh harvest will be plucked at sunrise and delivered on <strong>{completedOrder.deliveryDay}</strong> to <strong>{completedOrder.city}</strong>.
            </p>
            <div className="pt-2 flex gap-3 text-[#1E3F20] dark:text-[#FAF5EA] font-semibold">
              <span>Amount: ₹{completedOrder.priceRupees} (Pay upon doorstep inspection)</span>
              <span>•</span>
              <a
                href={`${BRAND_INFO.whatsappLink}&text=Hi%20PureKhetar!%20I%20just%20placed%20order%20%23${completedOrder.orderId}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C86D3B] underline"
              >
                Confirm on WhatsApp &rarr;
              </a>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
