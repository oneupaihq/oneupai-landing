'use client';

import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

const CORRECT_PIN = '1251';
const PIN_STORAGE_KEY = 'admin_blog_pin_verified';
const PIN_EXPIRY_KEY = 'admin_blog_pin_expiry';
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

interface PinProtectionProps {
  children: React.ReactNode;
}

export default function PinProtection({ children }: PinProtectionProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if PIN is already verified and not expired
    const verified = sessionStorage.getItem(PIN_STORAGE_KEY);
    const expiry = sessionStorage.getItem(PIN_EXPIRY_KEY);
    
    if (verified === 'true' && expiry) {
      const expiryTime = parseInt(expiry, 10);
      if (Date.now() < expiryTime) {
        setIsVerified(true);
      } else {
        // Session expired, clear storage
        sessionStorage.removeItem(PIN_STORAGE_KEY);
        sessionStorage.removeItem(PIN_EXPIRY_KEY);
      }
    }
    
    setIsChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin === CORRECT_PIN) {
      const expiryTime = Date.now() + SESSION_DURATION;
      sessionStorage.setItem(PIN_STORAGE_KEY, 'true');
      sessionStorage.setItem(PIN_EXPIRY_KEY, expiryTime.toString());
      setIsVerified(true);
      setError('');
    } else {
      setError('Incorrect PIN. Please try again.');
      setPin('');
    }
  };

  const handlePinChange = (value: string) => {
    // Only allow numbers and limit to 4 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 4);
    setPin(numericValue);
    setError('');
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#f7fafd] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1a80e7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#64748b]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-[#00244c] flex items-center justify-center px-4 relative overflow-hidden font-outfit">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(65,230,191,0.18)] via-transparent to-[rgba(26,128,231,0.22)]" />
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
              `,
              backgroundSize: '52px 52px'
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            {/* Lock Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#00244c] text-center mb-2 tracking-tight">
              Admin Access
            </h1>
            <p className="text-[#64748b] text-center mb-8">
              Enter your 4-digit PIN to continue
            </p>

            {/* PIN Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="pin" className="block text-sm font-semibold text-[#00244c] mb-3">
                  PIN Code
                </label>
                <input
                  id="pin"
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={pin}
                  onChange={(e) => handlePinChange(e.target.value)}
                  placeholder="••••"
                  maxLength={4}
                  className={`w-full px-6 py-4 border-2 rounded-xl text-center text-2xl font-bold tracking-widest focus:outline-none transition-all ${
                    error
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20'
                      : 'border-[#e4eaf2] focus:border-[#1a80e7] focus:ring-2 focus:ring-[#1a80e7] focus:ring-opacity-20'
                  }`}
                  autoFocus
                  autoComplete="off"
                />
                {error && (
                  <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={pin.length !== 4}
                className="w-full bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] text-white px-6 py-4 rounded-xl text-base font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {pin.length === 4 ? 'Unlock Admin Panel' : 'Enter 4-digit PIN'}
              </button>
            </form>

            {/* Info */}
            <div className="mt-8 pt-6 border-t border-[#e4eaf2]">
              <p className="text-xs text-[#64748b] text-center">
                🔒 Your session will remain active for 1 hour
              </p>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-6">
            <a
              href="/blog"
              className="text-sm text-[rgba(255,255,255,0.7)] hover:text-white transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
