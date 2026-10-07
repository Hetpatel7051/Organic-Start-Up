/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveView, ProduceLot } from './types';
import { Navbar } from './components/Navbar';
import { HarvestLiveView } from './components/HarvestLiveView';
import { TelemetryView } from './components/TelemetryView';
import { ThePlotsView } from './components/ThePlotsView';
import { SubscriptionBasketsView } from './components/SubscriptionBasketsView';
import { TraceabilityView } from './components/TraceabilityView';
import { LabReportsView } from './components/LabReportsView';
import { StudioInspectorModal } from './components/StudioInspectorModal';
import { ProduceInspectModal } from './components/ProduceInspectModal';
import { QRScannerModal } from './components/QRScannerModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('harvest-live');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState<boolean>(false);
  const [inspectingLot, setInspectingLot] = useState<ProduceLot | null>(null);
  const [reservedCount, setReservedCount] = useState<number>(3);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark class on HTML
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReserveProduce = (lot: ProduceLot) => {
    setReservedCount((prev) => prev + 1);
    showToast(`Added ${lot.name} (${lot.hindiName}) to your basket!`);
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-emerald-400 selection:text-black">
      {/* Dynamic Ambient Background Elements */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-emerald-500/10 rounded-full blur-[140px] opacity-70"></div>
        <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[160px] opacity-40"></div>
        <div className="absolute bottom-0 left-[-10%] w-[700px] h-[500px] bg-black/60 dark:bg-black/90 rounded-full blur-[120px] opacity-90"></div>
      </div>

      {/* Main Top Navigation Bar (Fixed & Un-squeezed) */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
        onOpenStudio={() => setIsStudioOpen(true)}
        onOpenScanner={() => setIsQRScannerOpen(true)}
        onOpenProfile={() => showToast('Authenticated: Het (Estate Allotment #0x89F4 active)')}
        basketCount={reservedCount}
      />

      {/* Dynamic Main View Switcher */}
      <main className="flex-1 relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {activeView === 'harvest-live' && (
              <HarvestLiveView
                setActiveView={setActiveView}
                onInspectProduce={(lot) => setInspectingLot(lot)}
                onReserveProduce={handleReserveProduce}
                onOpenScanner={() => setIsQRScannerOpen(true)}
              />
            )}

            {activeView === 'telemetry' && <TelemetryView />}

            {activeView === 'the-plots' && <ThePlotsView />}

            {activeView === 'subscription-baskets' && (
              <SubscriptionBasketsView
                onSuccessOrder={(orderId) =>
                  showToast(`Weekly vegetable basket booked! Order #${orderId}`)
                }
              />
            )}

            {activeView === 'traceability' && (
              <TraceabilityView onOpenScanner={() => setIsQRScannerOpen(true)} />
            )}

            {activeView === 'lab-reports' && <LabReportsView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Toast Notification Alert */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-neutral-900 border border-emerald-400 text-white shadow-2xl flex items-center gap-2 text-xs font-mono"
        >
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">eco</span>
          <span>{toastMessage}</span>
        </motion.div>
      )}

      {/* Modals */}
      <StudioInspectorModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
      />

      <ProduceInspectModal
        lot={inspectingLot}
        onClose={() => setInspectingLot(null)}
        onReserve={handleReserveProduce}
      />

      <QRScannerModal
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onLotVerified={(data) => {
          showToast(`Verified: ${data.name} (${data.code}) · 100% Organic Farm!`);
        }}
      />

      {/* Global Estate Provenance Footer */}
      <Footer setActiveView={setActiveView} />
    </div>
  );
}
