import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { MOCK_USERS } from '../data/mockData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout
}) => {
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('4821');
  const [keepUpdated, setKeepUpdated] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleQuickRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const mockUser = MOCK_USERS.find((u) => u.role === role);
    if (mockUser) {
      setPhoneNumber(mockUser.phone.replace('+91 ', '').replace(' ', ''));
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setErrorMsg('');
    setOtpStep(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = MOCK_USERS.find((u) => u.role === selectedRole);
    if (existing) {
      onLoginSuccess(existing);
    } else {
      onLoginSuccess({
        phone: `+91 ${phoneNumber}`,
        name: selectedRole === 'admin' ? 'Farm Admin' : selectedRole === 'agent' ? 'Field Agent' : 'Organic Customer',
        role: selectedRole,
        location: 'Gujarat, India',
        activeOrdersCount: 1
      });
    }
    setOtpStep(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Login Modal"
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Top Golden Curved Banner (from user's Organic India screenshot) */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 py-2.5 px-6 text-center text-xs font-bold text-neutral-900 tracking-wide shadow-sm">
          <span>🌿 Your Wellness Journey Starts Here · Aura Terra</span>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Logo Emblem (Organic India style circular badge) */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-neutral-800 border-2 border-amber-400/80 shadow-md flex items-center justify-center mb-3">
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[26px]">eco</span>
                <span className="text-[7px] font-bold tracking-widest text-emerald-700 dark:text-emerald-300 uppercase leading-none">ORGANIC</span>
              </div>
            </div>
            
            <h3 className="font-serif text-2xl font-bold tracking-tight">
              {currentUser ? 'Your Farm Account' : 'Login for a smoother experience'}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {currentUser
                ? `Logged in as ${currentUser.name} (${currentUser.role.toUpperCase()})`
                : 'Enter your 10-digit mobile number for instant OTP sign in'}
            </p>
          </div>

          {/* Already Logged In State */}
          {currentUser ? (
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Name:</span>
                  <span className="font-bold text-neutral-900 dark:text-white">{currentUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Phone:</span>
                  <span className="font-mono text-neutral-800 dark:text-neutral-200">{currentUser.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Role:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-400 text-black font-bold uppercase text-[10px]">
                    {currentUser.role}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Location:</span>
                  <span className="text-neutral-800 dark:text-neutral-200">{currentUser.location}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onLogout}
                  className="flex-1 py-3 rounded-full bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Log Out
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Role Selector Tabs (Customer / Agent / Admin) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                  Select Role to Test:
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-xs">
                  <button
                    type="button"
                    onClick={() => handleQuickRoleSelect('customer')}
                    className={`py-2 rounded-xl text-center font-bold transition-all cursor-pointer ${
                      selectedRole === 'customer'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-white/50'
                    }`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickRoleSelect('agent')}
                    className={`py-2 rounded-xl text-center font-bold transition-all cursor-pointer ${
                      selectedRole === 'agent'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-white/50'
                    }`}
                  >
                    Delivery Agent
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickRoleSelect('admin')}
                    className={`py-2 rounded-xl text-center font-bold transition-all cursor-pointer ${
                      selectedRole === 'admin'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-white/50'
                    }`}
                  >
                    Farm Admin
                  </button>
                </div>
              </div>

              {!otpStep ? (
                /* Step 1: Mobile Phone Form */
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1">
                      Mobile Number
                    </label>
                    <div className="flex items-center border-2 border-neutral-300 dark:border-neutral-700 rounded-2xl px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800/60 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 transition-all">
                      <div className="flex items-center gap-1.5 pr-2.5 border-r border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-200">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 10-digit number"
                        className="w-full pl-3 bg-transparent text-sm font-semibold text-neutral-900 dark:text-white focus:outline-none tracking-wider"
                      />
                    </div>
                    {errorMsg && (
                      <p className="text-xs text-red-500 mt-1 font-medium">{errorMsg}</p>
                    )}
                  </div>

                  {/* Log In Button (matching screenshot #16a34a / emerald green) */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all duration-200 cursor-pointer shadow-lg shadow-emerald-600/30 active:scale-[0.99]"
                  >
                    Log In
                  </button>

                  {/* Keep Me Posted Checkbox */}
                  <label className="flex items-center gap-2.5 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={keepUpdated}
                      onChange={(e) => setKeepUpdated(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span>Keep me posted about fresh sunrise harvest and offers</span>
                  </label>
                </form>
              ) : (
                /* Step 2: OTP Verification */
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-xs text-emerald-700 dark:text-emerald-300 flex justify-between items-center">
                    <span>OTP sent to +91 {phoneNumber}</span>
                    <button
                      type="button"
                      onClick={() => setOtpStep(false)}
                      className="text-xs underline font-bold cursor-pointer"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1">
                      Enter 4-Digit OTP (Demo code: 4821)
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full text-center tracking-[1em] text-xl font-bold py-3 bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-700 rounded-2xl focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all duration-200 cursor-pointer shadow-lg shadow-emerald-600/30"
                  >
                    Verify &amp; Enter {selectedRole === 'admin' ? 'Admin Panel' : selectedRole === 'agent' ? 'Agent Panel' : 'Farm Store'}
                  </button>
                </form>
              )}

              {/* Disclaimer */}
              <p className="text-[11px] text-neutral-400 text-center leading-relaxed">
                By continuing, you agree to our <span className="underline">Terms</span> &amp; <span className="underline">Privacy Policy</span>.
              </p>
            </>
          )}

          {/* Footer branding */}
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 text-center text-[10px] text-neutral-400 font-mono">
            Direct Farm Harvest · Powered by Aura Terra India
          </div>
        </div>
      </div>
    </div>
  );
};
