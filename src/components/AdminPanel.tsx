import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProduceLot, DeliveryOrder } from '../types';
import { PRODUCE_LOTS, INITIAL_ORDERS, FARM_PLOTS } from '../data/mockData';

interface AdminPanelProps {
  onBackToStore: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToStore }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'farm' | 'lab'>('inventory');
  const [lots, setLots] = useState<ProduceLot[]>(PRODUCE_LOTS);
  const [orders, setOrders] = useState<DeliveryOrder[]>(INITIAL_ORDERS);
  const [editingLotId, setEditingLotId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(60);
  const [editStock, setEditStock] = useState<number>(20);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSaveLot = (lotId: string) => {
    setLots((prev) =>
      prev.map((l) => (l.id === lotId ? { ...l, pricePerKg: editPrice, basketsLeft: editStock } : l))
    );
    setEditingLotId(null);
    showToast('Updated produce pricing and stock!');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: DeliveryOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order ${orderId} marked as ${newStatus}`);
  };

  const handleTogglePayment = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, isPaid: !o.isPaid } : o))
    );
    showToast('Payment status updated');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>AURA TERRA FARM ADMIN CONSOLE · MEHSANA HQ</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            Farm Management &amp; Dispatch Portal
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light mt-1">
            Manage daily sunrise harvest pricing, customer orders, field agents, and IoT irrigation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onBackToStore}
            className="px-5 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 text-neutral-800 dark:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">storefront</span>
            <span>Customer View</span>
          </button>
        </div>
      </div>

      {/* Quick KPI Cards (Loaded on Scroll) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Today's Morning Harvest", val: '185 kg', sub: 'Picked at 5:45 AM across 4 plots', isEmerald: true },
          { title: 'Active Subscriptions', val: '24 Families', sub: '100% on-time delivery record', isSubEmerald: true },
          { title: "Today's Dispatch Value", val: '₹24,800', sub: 'COD & UPI upon inspection' },
          { title: 'Living Soil Health', val: '99% Pure', sub: '0.00% Pesticides confirmed', isEmerald: true }
        ].map((kpi, idx) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm space-y-1"
          >
            <span className="text-[11px] font-mono text-neutral-500 uppercase">{kpi.title}</span>
            <div className={`text-2xl font-mono font-bold ${kpi.isEmerald ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-900 dark:text-white'}`}>
              {kpi.val}
            </div>
            <span className={`text-xs ${kpi.isSubEmerald ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-500'}`}>
              {kpi.sub}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex border-b border-neutral-200 dark:border-white/10 overflow-x-auto space-x-2 pb-1 text-xs">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'inventory'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">inventory_2</span>
          <span>Vegetable Lots &amp; Price (₹)</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'orders'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">local_shipping</span>
          <span>Customer Orders &amp; Dispatches ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('farm')}
          className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'farm'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">sensors</span>
          <span>Farm Beds &amp; Irrigation</span>
        </button>

        <button
          onClick={() => setActiveTab('lab')}
          className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'lab'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">verified</span>
          <span>NABL Quality Certifications</span>
        </button>
      </div>

      {/* Tab 1: Vegetable Inventory & Pricing */}
      {activeTab === 'inventory' && (
        <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 p-5 sm:p-8 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-900 dark:text-white">
                Daily Indian Vegetable Pricing &amp; Harvest Stock
              </h3>
              <p className="text-xs text-neutral-500">
                Update prices in Indian Rupees (₹) and available crate quantities. Changes reflect instantly on customer screens.
              </p>
            </div>
            <button
              onClick={() => showToast('All vegetables synced with sunrise harvest!')}
              className="px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold self-start sm:self-auto cursor-pointer"
            >
              + Add New Harvest Lot
            </button>
          </div>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-white/10 text-neutral-500 font-mono">
                  <th className="py-3 px-4">VEGETABLE</th>
                  <th className="py-3 px-4">PLOT</th>
                  <th className="py-3 px-4">HARVEST TIME</th>
                  <th className="py-3 px-4">PRICE (₹)</th>
                  <th className="py-3 px-4">BASKETS LEFT</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-white/5">
                {lots.map((lot) => {
                  const isEditing = editingLotId === lot.id;
                  return (
                    <tr key={lot.id} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={lot.imageUrl}
                            alt={lot.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-xl object-cover shrink-0 border border-neutral-200 dark:border-white/10"
                          />
                          <div>
                            <span className="font-bold text-neutral-900 dark:text-white block">{lot.name}</span>
                            <span className="text-[11px] text-emerald-600 dark:text-emerald-400">{lot.hindiName}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-neutral-600 dark:text-neutral-300">{lot.plot}</td>
                      <td className="py-3 px-4 text-neutral-600 dark:text-neutral-300">{lot.harvestTime}</td>
                      <td className="py-3 px-4 font-mono font-bold text-neutral-900 dark:text-white">
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <span>₹</span>
                            <input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(Number(e.target.value))}
                              className="w-16 px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded border border-emerald-500 text-xs font-mono"
                            />
                          </div>
                        ) : (
                          <span>₹{lot.pricePerKg} / kg</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editStock}
                            onChange={(e) => setEditStock(Number(e.target.value))}
                            className="w-16 px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded border border-emerald-500 text-xs font-mono"
                          />
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-white font-mono font-semibold">
                            {lot.basketsLeft} baskets
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {isEditing ? (
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => handleSaveLot(lot.id)}
                              className="px-3 py-1 rounded bg-emerald-600 text-white font-bold text-[11px]"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingLotId(null)}
                              className="px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-[11px]"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingLotId(lot.id);
                              setEditPrice(lot.pricePerKg);
                              setEditStock(lot.basketsLeft);
                            }}
                            className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-emerald-500 hover:text-white transition-colors text-[11px] font-semibold cursor-pointer"
                          >
                            Edit Price
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders & Dispatches */}
      {activeTab === 'orders' && (
        <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 p-5 sm:p-8 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-900 dark:text-white">
                Customer Delivery Crates &amp; Route Assignment
              </h3>
              <p className="text-xs text-neutral-500">
                Monitor field delivery agents, QR crate codes, and payment status across Gujarat.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-white/10 text-neutral-500 font-mono">
                  <th className="py-3 px-4">ORDER &amp; CRATE</th>
                  <th className="py-3 px-4">CUSTOMER</th>
                  <th className="py-3 px-4">BASKET TIER</th>
                  <th className="py-3 px-4">AMOUNT (₹)</th>
                  <th className="py-3 px-4">FIELD AGENT</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">PAYMENT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-white/5">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <strong className="text-neutral-900 dark:text-white font-mono block">{ord.id}</strong>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">{ord.crateCode}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-neutral-900 dark:text-white block">{ord.customerName}</span>
                      <span className="text-[11px] text-neutral-500 truncate block max-w-xs">{ord.address}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">{ord.phone}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">{ord.tierName}</span>
                      <span className="text-[10px] text-neutral-500 block">{ord.items.length} vegetable types</span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-neutral-900 dark:text-white">
                      ₹{ord.amountRupees}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-neutral-800 dark:text-neutral-200">{ord.agentName}</span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                        className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2 py-1 text-[11px] font-semibold text-neutral-800 dark:text-neutral-200"
                      >
                        <option value="Harvested">Harvested</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleTogglePayment(ord.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                          ord.isPaid
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                            : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                        }`}
                      >
                        {ord.isPaid ? 'PAID ✓' : 'PENDING COD'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Farm Beds & Irrigation */}
      {activeTab === 'farm' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {FARM_PLOTS.map((plot) => (
            <div
              key={plot.id}
              className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">{plot.code}</span>
                  <h4 className="font-serif text-xl font-bold text-neutral-900 dark:text-white">{plot.name}</h4>
                  <span className="text-xs text-neutral-500">{plot.cropHindi}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  {plot.healthScore}% Healthy
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-50 dark:bg-white/5 p-4 rounded-2xl">
                <div>
                  <span className="text-neutral-500 block">Soil Moisture:</span>
                  <strong className="text-neutral-900 dark:text-white font-mono text-sm">{plot.soilMoisture}</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block">Bed Temperature:</span>
                  <strong className="text-neutral-900 dark:text-white font-mono text-sm">{plot.soilTemp}</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block">Soil Profile:</span>
                  <span className="text-neutral-700 dark:text-neutral-300">{plot.soilType}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Solar Camera:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{plot.liveCamera}</span>
                </div>
              </div>

              <button
                onClick={() => showToast(`Triggered solar well-water drip irrigation on ${plot.code}!`)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">water_drop</span>
                <span>Water {plot.code} Now</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: NABL Quality Certifications */}
      {activeTab === 'lab' && (
        <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
                Official NABL &amp; FSSAI Certification Register
              </h3>
              <p className="text-xs text-neutral-500">
                Government accredited laboratory test reports for today&apos;s morning harvest lot (#0x89F4).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs space-y-2">
            <div className="font-bold text-emerald-800 dark:text-emerald-300">
              Certificate No: NABL/AGRI/GJ-2026-9812A · Validated Today
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              450+ chemical pesticide analytes screened using Liquid and Gas Chromatography. Zero trace detection (0.00% ppm) across all vegetables harvested from Mehsana fields.
            </p>
          </div>

          <button
            onClick={() => showToast('Generated fresh quality verification QR seal for wooden crates!')}
            className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
          >
            Generate Fresh Crate Verification Seal (Today&apos;s Batches)
          </button>
        </div>
      )}

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-neutral-900 text-white border border-emerald-400 text-xs font-mono shadow-2xl flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};
