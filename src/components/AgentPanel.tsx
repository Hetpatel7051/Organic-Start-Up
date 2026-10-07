import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DeliveryOrder } from '../types';
import { INITIAL_ORDERS } from '../data/mockData';

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>FIELD DELIVERY AGENT PORTAL · AURA TERRA INDIA</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            Today&apos;s Morning Delivery Route
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light mt-1">
            Agent: <strong className="font-semibold text-neutral-900 dark:text-white">Ramesh Patel</strong> · Vehicle: EV Delivery Van #GJ-02-AT-4821
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenScanner}
            className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
            <span>Scan Crate QR with Camera</span>
          </button>

          <button
            onClick={onBackToStore}
            className="px-4 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 text-neutral-800 dark:text-white text-xs font-bold transition-all cursor-pointer"
          >
            Exit Portal
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm">
          <span className="text-[11px] font-mono text-neutral-500 uppercase block">Total Crates Today</span>
          <div className="text-2xl font-mono font-bold text-neutral-900 dark:text-white mt-1">{orders.length} Boxes</div>
          <span className="text-xs text-neutral-500">Harvested at 5:45 AM</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm">
          <span className="text-[11px] font-mono text-neutral-500 uppercase block">Completed Deliveries</span>
          <div className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1">{completedCount} Delivered</div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">All verified via QR</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm">
          <span className="text-[11px] font-mono text-neutral-500 uppercase block">Pending Deliveries</span>
          <div className="text-2xl font-mono font-bold text-amber-500 mt-1">{pendingCount} Left</div>
          <span className="text-xs text-neutral-500">Route target before 9:00 AM</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm">
          <span className="text-[11px] font-mono text-neutral-500 uppercase block">Cash &amp; UPI to Collect</span>
          <div className="text-2xl font-mono font-bold text-neutral-900 dark:text-white mt-1">₹3,796</div>
          <span className="text-xs text-neutral-500">QR UPI Scanner ready</span>
        </div>
      </div>

      {/* Delivery Route List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
            Assigned Delivery Stops (Gujarat North Route)
          </h3>
          <span className="text-xs font-mono text-neutral-500">
            Updated live from Mehsana dispatch hub
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {orders.map((ord, idx) => (
            <div
              key={ord.id}
              className={`p-6 rounded-3xl border transition-all shadow-sm flex flex-col justify-between ${
                ord.status === 'Delivered'
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                  : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-white/10'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      STOP #{idx + 1} · {ord.id}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-neutral-900 dark:text-white mt-0.5">
                      {ord.customerName}
                    </h4>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      ord.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                        : ord.status === 'Out for Delivery'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 animate-pulse'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-white/5 space-y-1.5 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] text-neutral-400 shrink-0 mt-0.5">location_on</span>
                    <span className="text-neutral-700 dark:text-neutral-300 leading-snug">{ord.address}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-neutral-200 dark:border-white/5">
                    <span className="material-symbols-outlined text-[16px] text-neutral-400">phone</span>
                    <span className="font-mono text-neutral-900 dark:text-white font-semibold">{ord.phone}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="text-neutral-500 block">Basket Plan:</span>
                    <strong className="text-neutral-900 dark:text-white">{ord.tierName}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 block">Amount to Collect:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-base font-bold">
                      ₹{ord.amountRupees}
                    </strong>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-500 flex items-center justify-between border-t border-neutral-200 dark:border-white/5 pt-2">
                  <span>Crate Tag: <strong className="font-mono text-emerald-600 dark:text-emerald-400">{ord.crateCode}</strong></span>
                  <span className={ord.isPaid ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-amber-600 font-bold'}>
                    {ord.isPaid ? 'Payment Received ✓' : `Collect via ${ord.paymentMode}`}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-neutral-200 dark:border-white/10 flex items-center gap-2">
                <button
                  onClick={onOpenScanner}
                  className="flex-1 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 text-neutral-800 dark:text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                  <span>Verify Crate</span>
                </button>

                {ord.status !== 'Delivered' ? (
                  ord.status === 'Out for Delivery' ? (
                    <button
                      onClick={() => handleMarkDelivered(ord.id)}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Mark Delivered (₹{ord.amountRupees})</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMarkInTransit(ord.id)}
                      className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <span className="material-symbols-outlined text-[16px]">directions_bike</span>
                      <span>Start Delivery</span>
                    </button>
                  )
                ) : (
                  <span className="flex-1 py-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center">
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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-neutral-900 text-white border border-emerald-400 text-xs font-mono shadow-2xl flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};
