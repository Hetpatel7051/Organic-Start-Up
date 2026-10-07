import React from 'react';

interface FloatingQRScannerButtonProps {
  onOpenScanner: () => void;
}

export const FloatingQRScannerButton: React.FC<FloatingQRScannerButtonProps> = ({
  onOpenScanner
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Outer Pulse Glow */}
      <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 blur-md group-hover:opacity-80 transition-opacity animate-pulse"></span>
      
      {/* Main Floating Button */}
      <button
        onClick={onOpenScanner}
        aria-label="Scan Harvest QR Code"
        title="Scan Harvest QR Code on your vegetable crate"
        className="relative flex items-center gap-2.5 px-4 sm:px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-[0_10px_30px_rgba(16,185,129,0.4)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-emerald-400/50"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <span className="material-symbols-outlined text-[20px] sm:text-[22px]">qr_code_scanner</span>
        <span className="font-sans tracking-wide">Scan Crate QR</span>
      </button>
    </div>
  );
};
