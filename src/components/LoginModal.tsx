import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { MOCK_USERS, BRAND_INFO } from '../data/mockData';
import { PureKhetarLogo } from './PureKhetarLogo';

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
  const [phoneNumber, setPhoneNumber] = useState('8320019977');
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
      setPhoneNumber(mockUser.phone.replace('+91 ', '').replace(/\s/g, ''));
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
        name: selectedRole === 'admin' ? 'Het Patel (Founder)' : selectedRole === 'agent' ? 'Ramesh Patel' : 'Organic Customer',
        role: selectedRole,
        location: 'Kamana, Visnagar, Gujarat',
        activeOrdersCount: 1
      });
    }
    setOtpStep(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#FAF7EE] dark:bg-[#141F16] rounded-3xl overflow-hidden shadow-2xl border border-[#DED4BE] dark:border-[#283C2C] text-[#1C271E] dark:text-[#FAF5EA]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Login Modal"
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Top Forest Green Ribbon with SPU details */}
        <div className="bg-[#1E3F20] py-2 px-6 text-center text-xs font-bold text-[#E5A93C] tracking-wide shadow-sm flex items-center justify-center gap-1.5">
          <span>🎓</span>
          <span>AN SPU STUDENT STARTUP · SANKALCHAND PATEL UNIVERSITY</span>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Logo Emblem */}
          <div className="flex flex-col items-center justify-center text-center">
            <PureKhetarLogo size="lg" withText={true} withTagline={true} />
            
            <h3 className="font-serif text-2xl font-bold tracking-tight text-[#1E3F20] dark:text-[#FAF5EA] mt-4">
              {currentUser ? 'Your PureKhetar Profile' : 'Login for a Smoother Experience'}
            </h3>
            <p className="text-xs text-[#556357] dark:text-[#CBD5CD] mt-1">
              {currentUser
                ? `Logged in as ${currentUser.name} (${currentUser.role.toUpperCase()})`
                : 'Enter your 10-digit mobile number for instant OTP sign in'}
            </p>
          </div>

          {/* Already Logged In State */}
          {currentUser ? (
            <div className="space-y-4 pt-1">
              <div className="p-4 rounded-2xl bg-[#FFFDF9] dark:bg-[#18261B] border border-[#DED4BE] dark:border-[#283C2C] text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-[#556357] dark:text-[#CBD5CD]">Name:</span>
                  <span className="font-bold text-[#1E3F20] dark:text-[#FAF5EA]">{currentUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#556357] dark:text-[#CBD5CD]">Phone:</span>
                  <span className="font-mono text-[#1E3F20] dark:text-[#FAF5EA]">{currentUser.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#556357] dark:text-[#CBD5CD]">Role:</span>
                  <span className="px-2 py-0.5 rounded bg-[#C86D3B] text-white font-bold uppercase text-[10px]">
                    {currentUser.role}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#556357] dark:text-[#CBD5CD]">Farm / Hub:</span>
                  <span className="text-[#1E3F20] dark:text-[#FAF5EA]">{currentUser.location}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onLogout}
                  className="flex-1 py-3 rounded-full bg-red-100 hover:bg-red-200 text-red-800 font-bold text-xs transition-colors cursor-pointer"
                >
                  Log Out
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-full bg-[#1E3F20] hover:bg-[#163519] text-[#FAF7EE] font-bold text-xs transition-colors cursor-pointer shadow-md"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Role Selector Tabs (Customer / Agent / Admin) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-[#556357] dark:text-[#CBD5CD] uppercase tracking-wider block">
                  Select Role to Test:
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#EFE8D8] dark:bg-[#1A261D] text-xs">
                  <button
                    type="button"
                    onClick={() => handleQuickRoleSelect('customer')}
                    className={`py-2 rounded-xl text-center font-bold transition-all cursor-pointer ${
                      selectedRole === 'customer'
                        ? 'bg-[#1E3F20] text-[#FAF7EE] shadow-sm'
                        : 'text-[#4A5A4D] dark:text-[#CBD5CD] hover:bg-white/40'
                    }`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickRoleSelect('agent')}
                    className={`py-2 rounded-xl text-center font-bold transition-all cursor-pointer ${
                      selectedRole === 'agent'
                        ? 'bg-[#1E3F20] text-[#FAF7EE] shadow-sm'
                        : 'text-[#4A5A4D] dark:text-[#CBD5CD] hover:bg-white/40'
                    }`}
                  >
                    Delivery Agent
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickRoleSelect('admin')}
                    className={`py-2 rounded-xl text-center font-bold transition-all cursor-pointer ${
                      selectedRole === 'admin'
                        ? 'bg-[#1E3F20] text-[#FAF7EE] shadow-sm'
                        : 'text-[#4A5A4D] dark:text-[#CBD5CD] hover:bg-white/40'
                    }`}
                  >
                    Founder Admin
                  </button>
                </div>
              </div>

              {!otpStep ? (
                /* Step 1: Mobile Phone Form */
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-[#556357] dark:text-[#CBD5CD] block mb-1">
                      Mobile Number
                    </label>
                    <div className="flex items-center border-2 border-[#DED4BE] dark:border-[#283C2C] rounded-2xl px-3 py-2.5 bg-[#FFFDF9] dark:bg-[#18261B] focus-within:border-[#1E3F20] transition-all">
                      <div className="flex items-center gap-1.5 pr-2.5 border-r border-[#DED4BE] dark:border-[#283C2C] text-xs font-semibold text-[#1E3F20] dark:text-[#FAF5EA]">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 10-digit number"
                        className="w-full pl-3 bg-transparent text-sm font-semibold text-[#1C271E] dark:text-[#FAF5EA] focus:outline-none tracking-wider"
                      />
                    </div>
                    {errorMsg && (
                      <p className="text-xs text-red-600 mt-1 font-medium">{errorMsg}</p>
                    )}
                  </div>

                  {/* Log In Button in PureKhetar Green */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#1E3F20] hover:bg-[#163519] text-[#FAF7EE] font-bold text-sm transition-all duration-200 cursor-pointer shadow-md shadow-[#1E3F20]/20 active:scale-[0.99]"
                  >
                    Log In with OTP
                  </button>

                  {/* WhatsApp Support Callout */}
                  <a
                    href={BRAND_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-xs text-[#25D366] hover:underline font-semibold"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>Need help? WhatsApp: {BRAND_INFO.phone}</span>
                  </a>

                  {/* Keep Me Posted Checkbox */}
                  <label className="flex items-center gap-2.5 text-xs text-[#556357] dark:text-[#CBD5CD] cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={keepUpdated}
                      onChange={(e) => setKeepUpdated(e.target.checked)}
                      className="w-4 h-4 rounded text-[#1E3F20] accent-[#1E3F20] cursor-pointer"
                    />
                    <span>Notify me of morning sunrise harvest and fresh arrivals</span>
                  </label>
                </form>
              ) : (
                /* Step 2: OTP Verification */
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="p-3 rounded-xl bg-[#EBF2EB] dark:bg-[#1F3323] text-xs text-[#1E3F20] dark:text-[#FAF5EA] flex justify-between items-center">
                    <span>OTP sent to +91 {phoneNumber}</span>
                    <button
                      type="button"
                      onClick={() => setOtpStep(false)}
                      className="text-xs underline font-bold cursor-pointer text-[#C86D3B]"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#556357] dark:text-[#CBD5CD] block mb-1">
                      Enter 4-Digit OTP (Demo code: 4821)
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full text-center tracking-[1em] text-xl font-bold py-3 bg-[#FFFDF9] dark:bg-[#18261B] border-2 border-[#DED4BE] dark:border-[#283C2C] rounded-2xl focus:outline-none focus:border-[#1E3F20]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#1E3F20] hover:bg-[#163519] text-[#FAF7EE] font-bold text-sm transition-all duration-200 cursor-pointer shadow-md"
                  >
                    Verify &amp; Enter {selectedRole === 'admin' ? 'Founder Admin Hub' : selectedRole === 'agent' ? 'Delivery Portal' : 'PureKhetar Store'}
                  </button>
                </form>
              )}

              {/* Disclaimer */}
              <p className="text-[11px] text-[#79887C] text-center leading-relaxed">
                By continuing, you support local organic agriculture in Kamana, Visnagar.
              </p>
            </>
          )}

          {/* Footer branding */}
          <div className="pt-3 border-t border-[#DED4BE] dark:border-[#283C2C] text-center text-[10.5px] text-[#5E6D60] dark:text-[#A8B8AB] font-medium">
            PureKhetar · Kamana, Visnagar, Mehsana · SPU Startup
          </div>
        </div>
      </div>
    </div>
  );
};
