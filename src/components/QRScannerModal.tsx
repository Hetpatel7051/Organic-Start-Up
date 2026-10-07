import React, { useState, useEffect, useRef } from 'react';
import jsQR from 'jsqr';
import { PRODUCE_LOTS } from '../data/mockData';

interface DecodedProduceInfo {
  code: string;
  name: string;
  hindiName: string;
  farmer: string;
  harvestTime: string;
  farmLocation: string;
  pesticideTest: string;
  sweetness: string;
  waterSource: string;
  safeVerdict: string;
}

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLotVerified?: (info: DecodedProduceInfo) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onLotVerified
}) => {
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [scannedResult, setScannedResult] = useState<DecodedProduceInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const testCodes: DecodedProduceInfo[] = [
    {
      code: '#0x89F4',
      name: 'Sweet Desi Tomatoes',
      hindiName: 'देशी टमाटर',
      farmer: 'Somabhai Patel',
      harvestTime: 'Today at 5:45 AM',
      farmLocation: 'Mehsana Organic Farm, Gujarat',
      pesticideTest: '0.00% Chemicals Detected (100% Clean)',
      sweetness: '9.4 / 10 Natural Sugar Level',
      waterSource: 'Clean Rainwater Tube-well',
      safeVerdict: '100% PURE & SAFE FOR FAMILY'
    },
    {
      code: '#0x77BC',
      name: 'Fresh Cauliflower & Romanesco',
      hindiName: 'हरी फूलगोभी',
      farmer: 'Dhanraj Mehsana',
      harvestTime: 'Today at 5:30 AM',
      farmLocation: 'Mehsana Organic Farm, Gujarat',
      pesticideTest: '0.00% Chemicals Detected (100% Clean)',
      sweetness: 'Sweet & Crunchy Brassica',
      waterSource: 'Drip Fed Tube-well Water',
      safeVerdict: '100% PURE & SAFE FOR FAMILY'
    },
    {
      code: '#0x63EA',
      name: 'Tender Baby Palak (Spinach)',
      hindiName: 'ताज़ा देशी पालक',
      farmer: 'Dr. Sharad Chandra',
      harvestTime: 'Today at 6:00 AM',
      farmLocation: 'Mehsana Organic Farm, Gujarat',
      pesticideTest: '0.00% Chemicals Detected (100% Clean)',
      sweetness: 'High Natural Iron & Minerals',
      waterSource: 'Clean Mist Sprinkler Water',
      safeVerdict: '100% PURE & SAFE FOR FAMILY'
    }
  ];

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported by browser.');
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setCameraActive(true);
        startScanLoop();
      }
    } catch (err: any) {
      setCameraError(
        err.name === 'NotAllowedError'
          ? 'Camera permission denied. You can click any test crate button below to check harvest details!'
          : 'Camera device unavailable in this browser window. Click any test batch below for instant verification.'
      );
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const startScanLoop = () => {
    const scan = () => {
      if (!videoRef.current || !canvasRef.current || scannedResult) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (video.readyState === video.HAVE_ENOUGH_DATA && ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        });

        if (code && code.data && !isProcessing) {
          handleQRCodeDetected(code.data);
          return;
        }
      }

      animationFrameRef.current = requestAnimationFrame(scan);
    };

    animationFrameRef.current = requestAnimationFrame(scan);
  };

  const handleQRCodeDetected = (dataString: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      let matched = testCodes[0];
      if (dataString.includes('77BC') || dataString.includes('cauliflower')) matched = testCodes[1];
      if (dataString.includes('63EA') || dataString.includes('palak')) matched = testCodes[2];
      setScannedResult(matched);
      setIsProcessing(false);
      stopCamera();
      if (onLotVerified) onLotVerified(matched);
    }, 500);
  };

  const handleTestClick = (item: typeof testCodes[0]) => {
    setIsProcessing(true);
    setTimeout(() => {
      setScannedResult(item);
      setIsProcessing(false);
      stopCamera();
      if (onLotVerified) onLotVerified(item);
    }, 400);
  };

  useEffect(() => {
    if (isOpen) {
      setScannedResult(null);
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, facingMode]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full rounded-3xl bg-neutral-950 border border-emerald-400/40 p-6 sm:p-8 space-y-6 shadow-2xl relative text-white my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30">
              <span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                PHONE CAMERA SCANNER
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold">
                Scan Vegetable Basket QR Code
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Video or Result */}
        {!scannedResult ? (
          <div className="space-y-4">
            <div className="relative w-full h-72 rounded-2xl bg-black overflow-hidden border border-white/10 flex items-center justify-center">
              <canvas ref={canvasRef} className="hidden" />

              <video
                ref={videoRef}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  cameraActive ? 'opacity-100' : 'opacity-0'
                }`}
                autoPlay
                playsInline
                muted
              />

              {/* Scanning Target Box */}
              {cameraActive && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="relative w-48 h-48 border-2 border-emerald-400/60 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(78,222,163,0.3)]">
                    <div className="absolute w-full h-0.5 bg-emerald-400 animate-bounce opacity-80 shadow-[0_0_10px_#4edea3]"></div>
                    <span className="text-[10px] font-mono text-emerald-300 bg-black/60 px-2 py-0.5 rounded">
                      AIM AT CRATE QR CODE
                    </span>
                  </div>
                </div>
              )}

              {/* Error or Standby Message */}
              {!cameraActive && (
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center space-y-3 bg-neutral-900/90">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">center_focus_strong</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white">Camera Ready</h3>
                    <p className="text-xs text-neutral-400 max-w-sm mt-1">
                      {cameraError || 'Point camera at the QR code on your vegetable crate tag.'}
                    </p>
                  </div>
                  <button
                    onClick={startCamera}
                    className="px-4 py-2 rounded-full bg-emerald-400 text-black text-xs font-semibold hover:bg-emerald-300 cursor-pointer"
                  >
                    Turn On Camera
                  </button>
                </div>
              )}

              {isProcessing && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center space-y-2 z-20">
                  <span className="material-symbols-outlined text-emerald-400 text-[32px] animate-spin">sync</span>
                  <span className="text-xs text-emerald-300">Checking Harvest Records...</span>
                </div>
              )}
            </div>

            {/* Test Crate Buttons */}
            <div className="space-y-2 pt-1">
              <div className="text-xs text-neutral-400 flex items-center justify-between">
                <span>Or Click a Sample Harvest Batch Below to Test:</span>
                <span className="text-emerald-400 font-mono text-[11px]">Instant Check</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {testCodes.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => handleTestClick(item)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/50 text-left transition-all cursor-pointer space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-emerald-400">{item.code}</span>
                      <span className="material-symbols-outlined text-[14px] text-neutral-400">arrow_forward</span>
                    </div>
                    <div className="text-xs font-bold text-white truncate">{item.name}</div>
                    <div className="text-[11px] text-emerald-300">{item.hindiName}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Provenance Result */
          <div className="space-y-5 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-400/50 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-400 text-black flex items-center justify-center font-bold text-lg shadow-md shrink-0">
                  <span className="material-symbols-outlined text-[28px]">verified</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {scannedResult.name} ({scannedResult.hindiName})
                  </h3>
                  <span className="text-xs text-neutral-300">Batch Code: {scannedResult.code}</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 font-mono text-xs font-bold shrink-0">
                100% ORGANIC
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 space-y-0.5">
                <span className="text-neutral-400 text-[11px]">Harvested When:</span>
                <span className="text-white font-bold block">{scannedResult.harvestTime}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 space-y-0.5">
                <span className="text-neutral-400 text-[11px]">Farmer Name:</span>
                <span className="text-emerald-400 font-bold block">{scannedResult.farmer}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 space-y-0.5">
                <span className="text-neutral-400 text-[11px]">Farm Location:</span>
                <span className="text-white block">{scannedResult.farmLocation}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 space-y-0.5">
                <span className="text-neutral-400 text-[11px]">Chemical Test:</span>
                <span className="text-emerald-400 font-bold block">{scannedResult.pesticideTest}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 space-y-0.5">
                <span className="text-neutral-400 text-[11px]">Water Source:</span>
                <span className="text-white block">{scannedResult.waterSource}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 space-y-0.5">
                <span className="text-neutral-400 text-[11px]">Natural Sweetness:</span>
                <span className="text-emerald-300 font-bold block">{scannedResult.sweetness}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  setScannedResult(null);
                  startCamera();
                }}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Scan Another Crate
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-emerald-400 text-black text-xs font-bold hover:bg-emerald-300 cursor-pointer shadow-md"
              >
                Verified &middot; Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
