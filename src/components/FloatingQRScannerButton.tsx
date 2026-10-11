import React from 'react';
import { BRAND_INFO } from '../data/mockData';

interface FloatingQRScannerButtonProps {
  onOpenScanner: () => void;
}

export const FloatingQRScannerButton: React.FC<FloatingQRScannerButtonProps> = ({
  onOpenScanner
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
      {/* WhatsApp Quick Floating Pill */}
      <a
        href={BRAND_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with PureKhetar on WhatsApp"
        aria-label="Chat with PureKhetar on WhatsApp"
        className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20BA5C] text-white font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="material-symbols-outlined text-[19px]">chat</span>
        <span>WhatsApp: {BRAND_INFO.phone}</span>
      </a>

      {/* Main Floating QR Scanner Button */}
      <div className="relative group">
        <span className="absolute -inset-1 rounded-full bg-[#1E3F20] opacity-30 blur-md group-hover:opacity-70 transition-opacity animate-pulse"></span>
        
        <button
          onClick={onOpenScanner}
          aria-label="Scan PureKhetar Crate QR Code"
          title="Scan Harvest QR Code on your vegetable crate"
          className="relative flex items-center gap-2.5 px-4 sm:px-5 py-3.5 rounded-full bg-[#1E3F20] hover:bg-[#163519] dark:bg-[#2E5A33] dark:hover:bg-[#3D7544] text-[#FAF7EE] font-bold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-[#C86D3B]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5A93C] opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E5A93C]"></span>
          </span>
          <span className="material-symbols-outlined text-[20px] sm:text-[22px] text-[#E5A93C]">qr_code_scanner</span>
          <span className="font-sans tracking-wide">Scan Crate QR</span>
        </button>
      </div>
    </div>
  );
};
