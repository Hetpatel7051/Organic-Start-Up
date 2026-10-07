/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { ActiveView, ProduceLot, UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { HarvestLiveView } from './components/HarvestLiveView';
import { TelemetryView } from './components/TelemetryView';
import { ThePlotsView } from './components/ThePlotsView';
import { SubscriptionBasketsView } from './components/SubscriptionBasketsView';
import { TraceabilityView } from './components/TraceabilityView';
import { LabReportsView } from './components/LabReportsView';
import { AdminPanel } from './components/AdminPanel';
import { AgentPanel } from './components/AgentPanel';
import { LoginModal } from './components/LoginModal';
import { FloatingQRScannerButton } from './components/FloatingQRScannerButton';
import { StudioInspectorModal } from './components/StudioInspectorModal';
import { ProduceInspectModal } from './components/ProduceInspectModal';
import { QRScannerModal } from './components/QRScannerModal';
import { Footer } from './components/Footer';
import { MOCK_USERS } from './data/mockData';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('harvest-live');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(MOCK_USERS[0]);
  const [inspectingLot, setInspectingLot] = useState<ProduceLot | null>(null);
  const [reservedCount, setReservedCount] = useState<number>(3);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Real-time smooth scroll progress tracking
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`);
    if (user.role === 'admin') {
      setActiveView('admin-panel');
    } else if (user.role === 'agent') {
      setActiveView('agent-panel');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully');
    setActiveView('harvest-live');
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-emerald-500 selection:text-white bg-[#fafaf7] dark:bg-[#0c0f0d] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* Global Real-Time Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-400 origin-left z-[70] shadow-[0_0_12px_rgba(16,185,129,0.8)] pointer-events-none"
        style={{ scaleX }}
      />

      {/* Dynamic Ambient Background Elements */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[140px] opacity-70"></div>
        <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] bg-amber-500/5 dark:bg-emerald-400/10 rounded-full blur-[160px] opacity-40"></div>
        <div className="absolute bottom-0 left-[-10%] w-[700px] h-[500px] bg-emerald-600/5 dark:bg-black/90 rounded-full blur-[120px] opacity-90"></div>
      </div>

      {/* Main Top Navigation Bar (Organic India Sample Styled) */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
        onOpenStudio={() => setIsStudioOpen(true)}
        onOpenScanner={() => setIsQRScannerOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        currentUser={currentUser}
        basketCount={reservedCount}
        onSearchChange={(q) => setSearchFilter(q)}
      />

      {/* Dynamic Main View Switcher */}
      <main className="flex-1 relative z-10 w-full min-h-screen pt-12 md:pt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {activeView === 'harvest-live' && (
              <HarvestLiveView
                setActiveView={setActiveView}
                onInspectProduce={(lot) => setInspectingLot(lot)}
                onReserveProduce={handleReserveProduce}
                onOpenScanner={() => setIsQRScannerOpen(true)}
                searchQuery={searchFilter}
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

            {activeView === 'admin-panel' && (
              <AdminPanel onBackToStore={() => setActiveView('harvest-live')} />
            )}

            {activeView === 'agent-panel' && (
              <AgentPanel
                onBackToStore={() => setActiveView('harvest-live')}
                onOpenScanner={() => setIsQRScannerOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Scan QR Code Button at the Bottom Right (as requested) */}
      <FloatingQRScannerButton onOpenScanner={() => setIsQRScannerOpen(true)} />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-neutral-900 border border-emerald-500 text-white shadow-2xl flex items-center gap-2 text-xs font-mono"
        >
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">eco</span>
          <span>{toastMessage}</span>
        </motion.div>
      )}

      {/* Login / Profile Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      {/* Other Modals */}
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

      {/* Global Brand Footer */}
      <Footer setActiveView={setActiveView} />
    </div>
  );
}
