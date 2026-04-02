"use client";

import { useState, useEffect, useRef } from "react";
import BookingCalendar from "../app/components/ui/BookingCalendar";

interface BookACallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "form" | "calendar";

export default function BookACallModal({ isOpen, onClose }: BookACallModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset on close
      setTimeout(() => {
        setStep("form");
        setFullName("");
        setEmail("");
        setMessage("");
        setErrors({});
        setSubmitting(false);
      }, 300);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!fullName.trim()) newErrors.fullName = "Please enter your full name.";
    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    // TODO: send `{ fullName, email, message }` to your API route here
    // e.g. await fetch("/api/contact", { method: "POST", body: JSON.stringify({ fullName, email, message }) })

    await new Promise((r) => setTimeout(r, 600)); // simulate network
    setSubmitting(false);
    setStep("calendar");
  };

  const calendarSrc = `https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zHtz5TpbUPKdLqQSMdjM3ytjL8dwweYX9BlJVVXpulfxdhDHMWJdnWA08aXLRRJENBuPD3JV-?gv=true&name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}`;

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .oua-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(10, 20, 40, 0.55);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: ouaFadeIn 0.22s ease;
        }
        @keyframes ouaFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .oua-modal {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #f0f6ff;
          border-radius: 24px;
          width: 100%;
          max-width: 580px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 32px 80px rgba(0,80,200,0.18), 0 2px 8px rgba(0,0,0,0.08);
          animation: ouaSlideUp 0.28s cubic-bezier(0.34,1.4,0.64,1);
          scrollbar-width: thin;
          scrollbar-color: #c5d9f5 transparent;
        }
        @keyframes ouaSlideUp {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .oua-modal.calendar-step {
          max-width: 720px;
        }

        .oua-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: #dde8f7;
          color: #6b8ab5;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, color 0.15s, transform 0.15s;
          z-index: 10;
          line-height: 1;
        }
        .oua-close:hover {
          background: #c5d4ed;
          color: #1a4fa0;
          transform: rotate(90deg);
        }

        .oua-header {
          padding: 44px 44px 0;
          text-align: center;
        }
        .oua-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: flex-start;
          margin-bottom: 32px;
        }
        .oua-logo svg {
          width: 36px;
          height: 36px;
        }
        .oua-logo-text {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .oua-logo-text span { color: #2563eb; }
        .oua-logo-text strong { color: #0ea5e9; }

        .oua-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a4fa0;
          letter-spacing: -0.8px;
          margin: 0 0 12px;
          line-height: 1.15;
        }
        .oua-subtitle {
          font-size: 15px;
          color: #4b6a9a;
          line-height: 1.6;
          margin: 0 auto 28px;
          max-width: 400px;
        }
        .oua-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #c5d9f5 30%, #c5d9f5 70%, transparent);
          margin: 0 0 28px;
        }

        .oua-body {
          padding: 0 44px 44px;
        }

        .oua-field {
          margin-bottom: 20px;
        }
        .oua-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #3b82c4;
          margin-bottom: 8px;
        }
        .oua-input, .oua-textarea {
          width: 100%;
          background: #ffffff;
          border: 1.5px solid #dce9f8;
          border-radius: 14px;
          padding: 14px 18px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          color: #1e3a5f;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
          box-sizing: border-box;
        }
        .oua-input::placeholder, .oua-textarea::placeholder {
          color: #a0bbd8;
        }
        .oua-input:focus, .oua-textarea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
        }
        .oua-input.error, .oua-textarea.error {
          border-color: #f87171;
          box-shadow: 0 0 0 3px rgba(248,113,113,0.10);
        }
        .oua-textarea {
          resize: vertical;
          min-height: 120px;
        }
        .oua-error-text {
          font-size: 12px;
          color: #ef4444;
          margin-top: 5px;
          display: block;
        }

        .oua-btn {
          width: 100%;
          padding: 16px 24px;
          background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          letter-spacing: 0.2px;
          transition: opacity 0.18s, transform 0.14s, box-shadow 0.18s;
          box-shadow: 0 4px 20px rgba(37,99,235,0.30);
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .oua-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(37,99,235,0.38);
        }
        .oua-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .oua-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .oua-spinner {
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Calendar step */
        .oua-cal-header {
          padding: 36px 44px 16px;
          text-align: center;
        }
        .oua-cal-title {
          font-size: 26px;
          font-weight: 700;
          color: #1a4fa0;
          margin: 0 0 8px;
          letter-spacing: -0.5px;
        }
        .oua-cal-sub {
          font-size: 14px;
          color: #4b6a9a;
          margin: 0;
        }
        .oua-cal-body {
          padding: 8px 24px 32px;
        }
        .oua-cal-body iframe {
          border-radius: 16px;
          border: 1.5px solid #dce9f8;
          box-shadow: 0 2px 16px rgba(37,99,235,0.08);
        }
        .oua-back {
          background: none;
          border: none;
          color: #3b82c4;
          font-size: 13px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 0 44px 20px;
          transition: color 0.15s;
        }
        .oua-back:hover { color: #1a4fa0; }

        @media (max-width: 520px) {
          .oua-header, .oua-body { padding-left: 24px; padding-right: 24px; }
          .oua-title { font-size: 26px; }
          .oua-cal-header { padding-left: 20px; padding-right: 20px; }
          .oua-cal-body { padding-left: 12px; padding-right: 12px; }
          .oua-back { padding-left: 20px; }
        }
      `}</style>

      <div
        className="oua-overlay"
        ref={overlayRef}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-label="Book a Call"
      >
        <div className={`oua-modal${step === "calendar" ? " calendar-step" : ""}`}>
          <button className="oua-close" onClick={onClose} aria-label="Close">
            ✕
          </button>

          {step === "form" && (
            <>
              <div className="oua-header">
                {/* OneUpAI Logo */}
                <div className="oua-logo">
                  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="18" fill="#e8f2ff"/>
                    <path d="M18 8C12.477 8 8 12.477 8 18s4.477 10 10 10 10-4.477 10-10S23.523 8 18 8zm0 3a7 7 0 110 14A7 7 0 0118 11z" fill="#2563eb" opacity=".2"/>
                    <path d="M18 6l2.5 5.5L26 14l-5.5 2.5L18 22l-2.5-5.5L10 14l5.5-2.5L18 6z" fill="url(#logoGrad)"/>
                    <defs>
                      <linearGradient id="logoGrad" x1="10" y1="6" x2="26" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2563eb"/>
                        <stop offset="1" stopColor="#0ea5e9"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="oua-logo-text">
                    <span>OneUp</span><strong>AI</strong>
                  </div>
                </div>

                <h2 className="oua-title">How Can We Help?</h2>
                <p className="oua-subtitle">
                  Tell us about your business and what you're looking for. Our team will reach out within a few hours to schedule a call.
                </p>
                <div className="oua-divider" />
              </div>

              <div className="oua-body">
                <div className="oua-field">
                  <label className="oua-label" htmlFor="oua-name">Full Name</label>
                  <input
                    id="oua-name"
                    className={`oua-input${errors.fullName ? " error" : ""}`}
                    type="text"
                    placeholder="John Smith"
                    value={fullName}
                    onChange={(e) => { setFullName(e.target.value); setErrors((p) => ({ ...p, fullName: undefined })); }}
                    autoComplete="name"
                  />
                  {errors.fullName && <span className="oua-error-text">{errors.fullName}</span>}
                </div>

                <div className="oua-field">
                  <label className="oua-label" htmlFor="oua-email">Email Address</label>
                  <input
                    id="oua-email"
                    className={`oua-input${errors.email ? " error" : ""}`}
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                    autoComplete="email"
                  />
                  {errors.email && <span className="oua-error-text">{errors.email}</span>}
                </div>

                <div className="oua-field">
                  <label className="oua-label" htmlFor="oua-message">How Can We Help?</label>
                  <textarea
                    id="oua-message"
                    className="oua-textarea"
                    placeholder="Tell us about your business and what you're looking for..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button className="oua-btn" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? (
                    <><span className="oua-spinner" /> Saving your info...</>
                  ) : (
                    <>Book a Call →</>
                  )}
                </button>

                {/* Skip Button for Testing */}
                <button 
                  type="button"
                  onClick={() => setStep("calendar")} 
                  className="w-full mt-3 px-6 py-3 border border-[#dce9f8] text-[#3b82c4] rounded-[14px] font-medium hover:bg-[#f8fafc] transition-colors text-sm"
                >
                  Skip for Testing →
                </button>
              </div>
            </>
          )}

          {step === "calendar" && (
            <>
              <div className="oua-cal-header">
                <div className="oua-logo" style={{ justifyContent: "center" }}>
                  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 30, height: 30 }}>
                    <circle cx="18" cy="18" r="18" fill="#e8f2ff"/>
                    <path d="M18 6l2.5 5.5L26 14l-5.5 2.5L18 22l-2.5-5.5L10 14l5.5-2.5L18 6z" fill="url(#logoGrad2)"/>
                    <defs>
                      <linearGradient id="logoGrad2" x1="10" y1="6" x2="26" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2563eb"/>
                        <stop offset="1" stopColor="#0ea5e9"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="oua-logo-text"><span>OneUp</span><strong>AI</strong></div>
                </div>
                <h2 className="oua-cal-title">Pick a Time That Works for You</h2>
                <p className="oua-cal-sub">Hi {fullName.split(" ")[0]}! Choose a slot below and we'll talk soon.</p>
              </div>

              <button className="oua-back" onClick={() => setStep("form")}>
                ← Back
              </button>

              <div className="oua-cal-body">
                <BookingCalendar 
                  name={fullName} 
                  email={email}
                  className=""
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
