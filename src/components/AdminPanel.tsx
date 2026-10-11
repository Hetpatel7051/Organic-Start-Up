import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProduceLot, DeliveryOrder } from '../types';
import { PRODUCE_LOTS, INITIAL_ORDERS, FARM_PLOTS, BRAND_INFO } from '../data/mockData';

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E3DAC6] dark:border-[#283C2C]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C86D3B] dark:text-[#E0854E] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#1E3F20] animate-pulse"></span>
            <span>PUREKHETAR FOUNDER CONSOLE · KAMANA FARM HQ · SPU STARTUP</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3F20] dark:text-[#FAF5EA]">
            Farm Dispatch &amp; Operations Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#556357] dark:text-[#CBD5CD] font-light mt-1">
            Manage sunrise harvest pricing, weekly subscription crates, delivery routes, and Kamana solar irrigation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={BRAND_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>WhatsApp Dispatch ({BRAND_INFO.phone})</span>
          </a>

          <button
            onClick={onBackToStore}
            className="px-5 py-2.5 rounded-full bg-[#EFE8D8] hover:bg-[#E2D8C3] dark:bg-[#1A261D] dark:hover:bg-[#243628] text-[#1E3F20] dark:text-[#FAF5EA] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">storefront</span>
            <span>Customer View</span>
          </button>
        </div>
      </div>

      {/* Quick KPI Cards (Loaded on Scroll) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Today's Kamana Harvest", val: '192 kg', sub: 'Picked at 5:45 AM dawn', isGreen: true },
          { title: 'Weekly Subscribers', val: '28 Families', sub: '100% on-time delivery', isGreen: true },
          { title: "Today's Dispatch Value", val: '₹26,450', sub: 'Cash & UPI upon arrival' },
          { title: 'Zero Chemical Health', val: '0.00% Pesticides', sub: 'NABL Certified 100% Pure', isGreen: true }
        ].map((kpi, idx) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C] shadow-sm space-y-1"
          >
            <span className="text-[11px] font-mono text-[#79887C] uppercase">{kpi.title}</span>
            <div className={`text-2xl font-mono font-bold ${kpi.isGreen ? 'text-[#1E3F20] dark:text-[#4ADE80]' : 'text-[#C86D3B] dark:text-[#E0854E]'}`}>
              {kpi.val}
            </div>
            <span className="text-xs text-[#556357] dark:text-[#CBD5CD]">{kpi.sub}</span>
          </motion.div>
        ))}
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex border-b border-[#E3DAC6] dark:border-[#283C2C] overflow-x-auto space-x-2 pb-1 text-xs">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'inventory'
              ? 'bg-[#1E3F20] text-[#FAF7EE] shadow-sm'
              : 'text-[#4A5A4D] dark:text-[#CBD5CD] hover:bg-[#EFE8D8] dark:hover:bg-[#1A261D]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">inventory_2</span>
          <span>Produce Inventory &amp; Pricing</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'orders'
              ? 'bg-[#1E3F20] text-[#FAF7EE] shadow-sm'
              : 'text-[#4A5A4D] dark:text-[#CBD5CD] hover:bg-[#EFE8D8] dark:hover:bg-[#1A261D]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">local_shipping</span>
          <span>Weekly Basket Deliveries ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('farm')}
          className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'farm'
              ? 'bg-[#1E3F20] text-[#FAF7EE] shadow-sm'
              : 'text-[#4A5A4D] dark:text-[#CBD5CD] hover:bg-[#EFE8D8] dark:hover:bg-[#1A261D]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">sensors</span>
          <span>Kamana 4-Plot Sensors</span>
        </button>
      </div>

      {/* Tab 1: Inventory & Pricing */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#1E3F20] dark:text-[#FAF5EA]">
              Live PureKhetar Produce Pricing (₹ / kg) &amp; Available Stock
            </h3>
            <span className="text-xs font-mono text-[#556357] dark:text-[#CBD5CD]">
              Real-time synchronization with customer web store
            </span>
          </div>

          <div className="rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#EFE8D8] dark:bg-[#141F16] border-b border-[#E3DAC6] dark:border-[#283C2C] text-[#556357] dark:text-[#CBD5CD] font-mono">
                    <th className="py-3 px-4">VEGETABLE</th>
                    <th className="py-3 px-4">PLOT</th>
                    <th className="py-3 px-4">HARVEST TIME</th>
                    <th className="py-3 px-4">PRICE (₹/KG)</th>
                    <th className="py-3 px-4">BASKETS LEFT</th>
                    <th className="py-3 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3DAC6]/60 dark:divide-[#283C2C]/60">
                  {lots.map((lot) => (
                    <tr key={lot.id} className="hover:bg-[#FAF7EE] dark:hover:bg-[#1F2E22] transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-[#1C271E] dark:text-[#FAF5EA]">
                        <span className="block">{lot.name}</span>
                        <span className="text-[#C86D3B] dark:text-[#E0854E] text-[11px] font-sans">{lot.hindiName}</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#556357] dark:text-[#CBD5CD]">{lot.plot}</td>
                      <td className="py-3.5 px-4 text-[#1E3F20] dark:text-[#4ADE80] font-mono">{lot.harvestTime}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-sm">
                        {editingLotId === lot.id ? (
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                            className="w-16 px-2 py-1 rounded bg-white dark:bg-black border border-[#1E3F20] text-center"
                          />
                        ) : (
                          <span>₹{lot.pricePerKg}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        {editingLotId === lot.id ? (
                          <input
                            type="number"
                            value={editStock}
                            onChange={(e) => setEditStock(Number(e.target.value))}
                            className="w-16 px-2 py-1 rounded bg-white dark:bg-black border border-[#1E3F20] text-center"
                          />
                        ) : (
                          <span>{lot.basketsLeft} crates</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {editingLotId === lot.id ? (
                          <button
                            onClick={() => handleSaveLot(lot.id)}
                            className="px-3 py-1 rounded-full bg-[#1E3F20] text-[#FAF7EE] font-bold text-[11px] cursor-pointer"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingLotId(lot.id);
                              setEditPrice(lot.pricePerKg);
                              setEditStock(lot.basketsLeft);
                            }}
                            className="px-3 py-1 rounded-full bg-[#EFE8D8] dark:bg-[#203223] text-[#1E3F20] dark:text-[#FAF5EA] font-semibold text-[11px] cursor-pointer"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Orders Dispatch */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#1E3F20] dark:text-[#FAF5EA]">
              Customer Vegetable Delivery Orders (Direct from Kamana Farm)
            </h3>
            <span className="text-xs font-mono text-[#556357] dark:text-[#CBD5CD]">
              Delivery Agent: Ramesh Patel
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C] space-y-3 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#C86D3B] dark:text-[#E0854E]">{ord.id} · Crate {ord.crateCode}</span>
                    <h4 className="font-serif text-lg font-bold text-[#1E3F20] dark:text-[#FAF5EA]">{ord.customerName}</h4>
                    <span className="text-xs text-[#556357] dark:text-[#CBD5CD]">{ord.phone}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    ord.status === 'Delivered'
                      ? 'bg-[#EBF2EB] text-[#1E3F20] dark:text-[#4ADE80]'
                      : 'bg-[#F5ECE5] text-[#C86D3B] dark:text-[#E0854E]'
                  }`}>
                    {ord.status}
                  </span>
                </div>

                <div className="text-xs text-[#556357] dark:text-[#CBD5CD] space-y-1">
                  <div><strong>Address:</strong> {ord.address}</div>
                  <div><strong>Basket:</strong> {ord.tierName} (₹{ord.amountRupees})</div>
                  <div><strong>Items:</strong> {ord.items.join(', ')}</div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E3DAC6] dark:border-[#283C2C] text-xs">
                  <button
                    onClick={() => handleTogglePayment(ord.id)}
                    className={`font-semibold cursor-pointer ${ord.isPaid ? 'text-[#2E5A33] dark:text-[#4ADE80]' : 'text-[#C86D3B]'}`}
                  >
                    Payment: {ord.isPaid ? 'Paid ✓' : 'Unpaid (Collect COD/UPI)'}
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateOrderStatus(ord.id, 'Delivered')}
                      className="px-3 py-1 rounded-full bg-[#1E3F20] text-[#FAF7EE] font-bold text-[11px] cursor-pointer"
                    >
                      Mark Delivered
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Farm Plot Telemetry */}
      {activeTab === 'farm' && (
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#1E3F20] dark:text-[#FAF5EA]">
            Kamana 4-Plot Sensors &amp; Solar Irrigation Control
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FARM_PLOTS.map((plot) => (
              <div
                key={plot.id}
                className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C] space-y-2 text-xs shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-[#1E3F20] dark:text-[#4ADE80]">{plot.code}</span>
                  <span className="font-mono text-[#79887C]">{plot.area}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#1C271E] dark:text-[#FAF5EA]">{plot.name}</h4>
                <div className="text-[#C86D3B] dark:text-[#E0854E] font-medium">{plot.cropHindi}</div>
                <div className="pt-2 border-t border-[#E3DAC6] dark:border-[#283C2C] space-y-1 text-[#556357] dark:text-[#CBD5CD]">
                  <div>Soil Moist: <strong>{plot.soilMoisture}</strong></div>
                  <div>Bed Temp: <strong>{plot.soilTemp}</strong></div>
                  <div>Health: <strong className="text-[#1E3F20] dark:text-[#4ADE80]">{plot.healthScore}% Healthy</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#1E3F20] text-[#FAF7EE] text-xs font-mono shadow-2xl flex items-center gap-2">
          <span className="material-symbols-outlined text-[#E5A93C] text-[18px]">check_circle</span>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};
