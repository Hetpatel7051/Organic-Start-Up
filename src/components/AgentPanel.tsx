import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DeliveryOrder } from '../types';
import { INITIAL_ORDERS, BRAND_INFO } from '../data/mockData';

interface AgentPanelProps {
  onBackToStore: () => void;
  onOpenScanner: () => void;
}

export const AgentPanel: React.FC<AgentPanelProps> = ({ onBackToStore, onOpenScanner }) => {
  const [orders, setOrders] = useState<DeliveryOrder[]>(INITIAL_ORDERS);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleMarkDelivered = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Delivered', isPaid: true } : o))
    );
    showToast(`Order ${orderId} delivered & payment collected!`);
  };

  const handleMarkInTransit = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Out for Delivery' } : o))
    );
    showToast(`Order ${orderId} is now out for delivery!`);
  };

  const completedCount = orders.filter((o) => o.status === 'Delivered').length;
  const pendingCount = orders.length - completedCount;

  return (
    <div className="pt-24 sm:pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Agent Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E3DAC6] dark:border-[#283C2C]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C86D3B] dark:text-[#E0854E] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#1E3F20] animate-ping"></span>
            <span>FIELD DELIVERY AGENT PORTAL · PUREKHETAR KAMANA DISPATCH</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3F20] dark:text-[#FAF5EA]">
            Today&apos;s Morning Delivery Route
          </h1>
          <p className="text-xs sm:text-sm text-[#556357] dark:text-[#CBD5CD] font-light mt-1">
            Agent: <strong className="font-semibold text-[#1E3F20] dark:text-[#FAF5EA]">Ramesh Patel</strong> · Vehicle: EV Delivery Van #GJ-02-PK-4821 · Kamana Hub
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenScanner}
            className="px-5 py-2.5 rounded-full bg-[#1E3F20] hover:bg-[#163519] text-[#FAF7EE] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
            <span>Scan Crate QR with Camera</span>
          </button>

          <button
            onClick={onBackToStore}
            className="px-4 py-2.5 rounded-full bg-[#EFE8D8] hover:bg-[#E2D8C3] dark:bg-[#1A261D] text-[#1E3F20] dark:text-[#FAF5EA] text-xs font-bold transition-all cursor-pointer"
          >
            Exit Portal
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C] shadow-sm">
          <span className="text-[11px] font-mono text-[#79887C] uppercase block">Total Crates Today</span>
          <div className="text-2xl font-mono font-bold text-[#1E3F20] dark:text-[#FAF5EA] mt-1">{orders.length} Boxes</div>
          <span className="text-xs text-[#556357] dark:text-[#CBD5CD]">Harvested at 5:45 AM</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C] shadow-sm">
          <span className="text-[11px] font-mono text-[#79887C] uppercase block">Completed Deliveries</span>
          <div className="text-2xl font-mono font-bold text-[#2E5A33] dark:text-[#4ADE80] mt-1">{completedCount} Delivered</div>
          <span className="text-xs text-[#2E5A33] dark:text-[#4ADE80] font-medium">Verified via QR tag</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C] shadow-sm">
          <span className="text-[11px] font-mono text-[#79887C] uppercase block">Pending Deliveries</span>
          <div className="text-2xl font-mono font-bold text-[#C86D3B] dark:text-[#E0854E] mt-1">{pendingCount} Left</div>
          <span className="text-xs text-[#556357] dark:text-[#CBD5CD]">Target before 9:00 AM</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#E3DAC6] dark:border-[#283C2C] shadow-sm">
          <span className="text-[11px] font-mono text-[#79887C] uppercase block">Cash &amp; UPI to Collect</span>
          <div className="text-2xl font-mono font-bold text-[#1E3F20] dark:text-[#FAF5EA] mt-1">₹3,796</div>
          <span className="text-xs text-[#556357] dark:text-[#CBD5CD]">UPI QR Scanner ready</span>
        </div>
      </div>

      {/* Delivery Route List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E3F20] dark:text-[#FAF5EA]">
            Assigned Delivery Stops (Kamana ➔ Visnagar ➔ Ahmedabad Route)
          </h3>
          <span className="text-xs font-mono text-[#556357] dark:text-[#CBD5CD]">
            Live route from Kamana Dispatch Hub · Support: {BRAND_INFO.phone}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {orders.map((ord, idx) => (
            <div
              key={ord.id}
              className={`p-6 rounded-3xl border transition-all shadow-sm flex flex-col justify-between ${
                ord.status === 'Delivered'
                  ? 'bg-[#EBF2EB]/70 dark:bg-[#1B291D] border-[#74A878]'
                  : 'bg-[#FFFDF9] dark:bg-[#18261B] border-[#E3DAC6] dark:border-[#283C2C]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#C86D3B] dark:text-[#E0854E]">
                      STOP #{idx + 1} · {ord.id}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-[#1E3F20] dark:text-[#FAF5EA] mt-0.5">
                      {ord.customerName}
                    </h4>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      ord.status === 'Delivered'
                        ? 'bg-[#EBF2EB] text-[#1E3F20] dark:text-[#4ADE80]'
                        : ord.status === 'Out for Delivery'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-[#F5ECE5] text-[#C86D3B]'
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF7EE] dark:bg-[#141F16] space-y-1.5 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#79887C] shrink-0 mt-0.5">location_on</span>
                    <span className="text-[#1C271E] dark:text-[#FAF5EA] leading-snug">{ord.address}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-[#E3DAC6]/60 dark:border-[#283C2C]">
                    <span className="material-symbols-outlined text-[16px] text-[#79887C]">phone</span>
                    <span className="font-mono text-[#1E3F20] dark:text-[#FAF5EA] font-semibold">{ord.phone}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[#556357] dark:text-[#CBD5CD] block">Basket Plan:</span>
                    <strong className="text-[#1E3F20] dark:text-[#FAF5EA]">{ord.tierName}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[#556357] dark:text-[#CBD5CD] block">Amount to Collect:</span>
                    <strong className="text-[#1E3F20] dark:text-[#4ADE80] font-mono text-base font-bold">
                      ₹{ord.amountRupees}
                    </strong>
                  </div>
                </div>

                <div className="text-[11px] text-[#556357] dark:text-[#CBD5CD] flex items-center justify-between border-t border-[#E3DAC6]/60 dark:border-[#283C2C] pt-2">
                  <span>Crate Tag: <strong className="font-mono text-[#C86D3B] dark:text-[#E0854E]">{ord.crateCode}</strong></span>
                  <span className={ord.isPaid ? 'text-[#2E5A33] dark:text-[#4ADE80] font-bold' : 'text-[#C86D3B] font-bold'}>
                    {ord.isPaid ? 'Payment Received ✓' : `Collect via ${ord.paymentMode}`}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-[#E3DAC6] dark:border-[#283C2C] flex items-center gap-2">
                <button
                  onClick={onOpenScanner}
                  className="flex-1 py-2.5 rounded-xl bg-[#EFE8D8] dark:bg-[#1A261D] text-[#1E3F20] dark:text-[#FAF5EA] text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                  <span>Scan Crate QR</span>
                </button>

                {ord.status !== 'Delivered' ? (
                  ord.status === 'Out for Delivery' ? (
                    <button
                      onClick={() => handleMarkDelivered(ord.id)}
                      className="flex-1 py-2.5 rounded-xl bg-[#1E3F20] hover:bg-[#163519] text-[#FAF7EE] text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Mark Delivered (₹{ord.amountRupees})</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMarkInTransit(ord.id)}
                      className="flex-1 py-2.5 rounded-xl bg-[#C86D3B] hover:bg-[#B85D2A] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <span className="material-symbols-outlined text-[16px]">directions_bike</span>
                      <span>Start Delivery</span>
                    </button>
                  )
                ) : (
                  <span className="flex-1 py-2.5 rounded-xl bg-[#EBF2EB] dark:bg-[#203423] text-[#1E3F20] dark:text-[#4ADE80] text-xs font-bold text-center">
                    Delivery Completed ✓
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

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
