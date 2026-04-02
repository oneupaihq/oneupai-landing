"use client";

import { useState, useEffect, useRef } from "react";

interface JoinCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border-2 border-white/40 border-t-white animate-spin ${className}`}
    />
  );
}

export default function JoinCommunityModal({ isOpen, onClose }: JoinCommunityModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const t = setTimeout(resetAll, 300);
      return () => clearTimeout(t);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  function resetAll() {
    setFullName("");
    setEmail("");
    setErrors({});
    setSubmitting(false);
    setSuccess(false);
    setSubmitError(null);
  }

  const validate = () => {
    const e: typeof errors = {};
    if (!fullName.trim()) e.fullName = "Please enter your full name.";
    if (!email.trim()) e.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please enter a valid email.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/community/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setSuccess(true);
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes ouaFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes ouaSlideUp { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>

      <div
        ref={overlayRef}
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        style={{ animation: "ouaFadeIn 0.15s ease-out" }}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="relative bg-[#f0f6ff] rounded-2xl w-full max-w-[480px] shadow-md overflow-y-auto max-h-[92vh]"
          style={{ animation: "ouaSlideUp 0.15s ease-out" }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-gray-100 hover:text-slate-600 transition-all duration-150"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="1" y1="1" x2="11" y2="11" />
              <line x1="11" y1="1" x2="1" y2="11" />
            </svg>
          </button>

          {/* ── SUCCESS ──────────────────────────────────────────────────── */}
          {success ? (
            <div className="p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">You&apos;re in!</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-7">
                Check your inbox — we&apos;ll be in touch soon.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:-translate-y-px transition-all duration-150"
              >
                Done
              </button>
            </div>
          ) : (
            /* ── FORM ──────────────────────────────────────────────────── */
            <div className="p-8">
              <div className="mb-6">
                <span className="text-sm font-bold text-slate-800">
                  OneUp<span className="text-emerald-500">AI</span>
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
                Join the Community
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Get free access to learning resources, ready-made tools, and a support community to help your business grow.
              </p>

              <div className="h-px bg-gray-200 mb-6" />

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-emerald-500 mb-1.5" htmlFor="jc-name">
                    Full Name
                  </label>
                  <input
                    id="jc-name" type="text" placeholder="John Smith"
                    value={fullName} autoComplete="name"
                    onChange={(e) => { setFullName(e.target.value); setErrors(p => ({ ...p, fullName: undefined })); }}
                    className={`w-full bg-white rounded-xl px-4 py-3 text-sm text-slate-800 border outline-none transition-colors duration-150 placeholder:text-slate-300 focus:border-blue-600 ${errors.fullName ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-emerald-500 mb-1.5" htmlFor="jc-email">
                    Email Address
                  </label>
                  <input
                    id="jc-email" type="email" placeholder="name@company.com"
                    value={email} autoComplete="email"
                    onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                    className={`w-full bg-white rounded-xl px-4 py-3 text-sm text-slate-800 border outline-none transition-colors duration-150 placeholder:text-slate-300 focus:border-blue-600 ${errors.email ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                {submitError && (
                  <p className="text-xs text-red-500">{submitError}</p>
                )}

                <button
                  onClick={handleSubmit} disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 transition-all duration-150 mt-1"
                >
                  {submitting ? <><Spinner className="w-4 h-4" /> Joining…</> : "Join Free Community"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
