"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface BookACallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "form" | "calendar" | "confirm" | "success";

interface Slot {
  start: string;
  end: string;
  available: boolean;
}

interface GroupedSlots {
  [dateKey: string]: Slot[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const EST_TZ = "America/Toronto";

function todayEST(): string {
  return new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: EST_TZ,
  });
}

function addDaysToStr(dateStr: string, n: number): string {
  const d = new Date(`${dateStr}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function formatFullDate(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00Z`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-CA", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: EST_TZ,
  });
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: EST_TZ,
  });
}

function groupSlotsByDay(slots: Slot[]): GroupedSlots {
  const grouped: GroupedSlots = {};
  for (const slot of slots) {
    const key = new Date(slot.start).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: EST_TZ,
    });
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(slot);
  }
  return grouped;
}

function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border-2 border-white/40 border-t-white animate-spin ${className}`}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BookACallModal({ isOpen, onClose }: BookACallModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; message?: string }>({});

  const [currentDay, setCurrentDay] = useState<string>(todayEST);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [meetLink, setMeetLink] = useState<string | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const today = todayEST();
  const isPrevDisabled = currentDay <= today;

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

  function resetAll() {
    setStep("form");
    setFullName(""); setEmail(""); setMessage("");
    setErrors({}); setSubmitting(false);
    setSlots([]); setSelectedSlot(null);
    setBooking(false); setBookingError(null); setMeetLink(null);
    setCurrentDay(todayEST());
  }

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const fetchSlots = useCallback(async (dayStr: string) => {
    setLoadingSlots(true);
    setSlotsError(null);
    setSelectedSlot(null);
    try {
      const res = await fetch(`/api/calendar/availability?weekStart=${dayStr}`);
      if (!res.ok) throw new Error("Could not load availability.");
      const data = await res.json();
      setSlots(data.slots ?? []);
    } catch (e: unknown) {
      setSlotsError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (step === "calendar") fetchSlots(currentDay);
  }, [step, currentDay, fetchSlots]);

  const validate = () => {
    const e: typeof errors = {};
    if (!fullName.trim()) e.fullName = "Please enter your full name.";
    if (!email.trim()) e.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please enter a valid email.";
    if (!message.trim()) e.message = "Please tell us how we can help.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFormSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 300));
    setSubmitting(false);
    setStep("calendar");
  };

  const handleBook = async () => {
    if (!selectedSlot) return;
    setBooking(true);
    setBookingError(null);
    try {
      const res = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start: selectedSlot.start, end: selectedSlot.end, fullName, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed.");
      setMeetLink(data.meetLink);
      setStep("success");
    } catch (e: unknown) {
      setBookingError(e instanceof Error ? e.message : "Booking failed.");
    } finally {
      setBooking(false);
    }
  };

  const prevDay = () => {
    const prev = addDaysToStr(currentDay, -1);
    if (prev >= today) setCurrentDay(prev);
  };
  const nextDay = () => setCurrentDay(addDaysToStr(currentDay, 1));

  const grouped = groupSlotsByDay(slots);
  const daySlots = grouped[currentDay] ?? [];
  const availableCount = daySlots.filter(s => s.available).length;

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
          className={`relative bg-[#f0f6ff] rounded-2xl w-full shadow-md overflow-y-auto max-h-[92vh] ${step === "calendar" ? "max-w-[440px]" : "max-w-[480px]"}`}
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

          {/* ── FORM ─────────────────────────────────────────────────────────── */}
          {step === "form" && (
            <div className="p-8">
              <div className="mb-6">
                <span className="text-sm font-bold text-slate-800">
                  OneUp<span className="text-emerald-500">AI</span>
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
                Let&apos;s Build a Website That<br />Grows Your Business
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Tell us about your business and what you need. We&apos;ll help you create a website that makes it easier to attract customers, book jobs, accept payments, and stay active on social media.
              </p>

              <div className="h-px bg-gray-200 mb-6" />

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-emerald-500 mb-1.5" htmlFor="oua-name">
                    Full Name
                  </label>
                  <input
                    id="oua-name" type="text" placeholder="John Smith"
                    value={fullName} autoComplete="name"
                    onChange={(e) => { setFullName(e.target.value); setErrors(p => ({ ...p, fullName: undefined })); }}
                    className={`w-full bg-white rounded-xl px-4 py-3 text-sm text-slate-800 border outline-none transition-colors duration-150 placeholder:text-slate-300 focus:border-blue-600 ${errors.fullName ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-emerald-500 mb-1.5" htmlFor="oua-email">
                    Email Address
                  </label>
                  <input
                    id="oua-email" type="email" placeholder="name@company.com"
                    value={email} autoComplete="email"
                    onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                    className={`w-full bg-white rounded-xl px-4 py-3 text-sm text-slate-800 border outline-none transition-colors duration-150 placeholder:text-slate-300 focus:border-blue-600 ${errors.email ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-emerald-500 mb-1.5" htmlFor="oua-msg">
                    How Can We Help?
                  </label>
                  <textarea
                    id="oua-msg" rows={4}
                    placeholder="Tell us about your business and what you're looking for..."
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); setErrors(p => ({ ...p, message: undefined })); }}
                    className={`w-full bg-white rounded-xl px-4 py-3 text-sm text-slate-800 border outline-none transition-colors duration-150 resize-none placeholder:text-slate-300 focus:border-blue-600 ${errors.message ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                <button
                  onClick={handleFormSubmit} disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 transition-all duration-150 mt-1"
                >
                  {submitting ? <><Spinner className="w-4 h-4" /> Saving…</> : "Book a Call"}
                </button>
              </div>
            </div>
          )}

          {/* ── CALENDAR ─────────────────────────────────────────────────────── */}
          {step === "calendar" && (
            <div className="p-6">
              <div className="mb-5">
                <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-500">Schedule</span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">Pick a Time</h2>
                <p className="text-xs text-slate-400 mt-0.5">All times in EST · 30-min slots</p>
              </div>

              {/* Day navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevDay} disabled={isPrevDisabled}
                  aria-label="Previous day"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-gray-100 hover:text-slate-700 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="10 4 6 8 10 12" />
                  </svg>
                </button>
                <span className="text-sm font-semibold text-slate-800">{formatFullDate(currentDay)}</span>
                <button
                  onClick={nextDay}
                  aria-label="Next day"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-gray-100 hover:text-slate-700 transition-all duration-150"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 4 10 8 6 12" />
                  </svg>
                </button>
              </div>

              {/* Slots */}
              {loadingSlots ? (
                <div className="flex flex-col items-center justify-center py-12 gap-2">
                  <span className="w-6 h-6 rounded-full border-2 border-gray-200 border-t-blue-600 animate-spin inline-block" />
                  <p className="text-xs text-slate-400">Loading…</p>
                </div>
              ) : slotsError ? (
                <div className="text-center py-10">
                  <p className="text-sm text-red-500 mb-2">{slotsError}</p>
                  <button onClick={() => fetchSlots(currentDay)} className="text-xs text-blue-600 underline">Try again</button>
                </div>
              ) : daySlots.length === 0 || availableCount === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm text-slate-400">{daySlots.length === 0 ? "No slots available." : "Fully booked."}</p>
                  <button onClick={nextDay} className="mt-2 text-xs text-blue-600 underline">Next day →</button>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto">
                  {daySlots.map((slot) => {
                    const isSelected = selectedSlot?.start === slot.start;
                    return (
                      <button
                        key={slot.start}
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(isSelected ? null : slot)}
                        className={`w-full text-sm font-medium rounded-xl py-2.5 px-4 text-left border transition-all duration-100
                          ${!slot.available
                            ? "bg-gray-50 text-gray-300 border-gray-100 line-through cursor-not-allowed"
                            : isSelected
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-blue-600 border-gray-200 hover:border-blue-300 hover:shadow-sm"
                          }`}
                      >
                        {formatTime(slot.start)}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Footer */}
              <div className="mt-5 flex items-center gap-3">
                <button onClick={() => setStep("form")} className="text-sm text-slate-400 hover:text-slate-700 font-medium transition-colors duration-150 shrink-0">
                  ← Back
                </button>
                <button
                  onClick={() => { if (selectedSlot) setStep("confirm"); }}
                  disabled={!selectedSlot}
                  className="flex-1 py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:-translate-y-px disabled:opacity-30 disabled:cursor-not-allowed disabled:translate-y-0 transition-all duration-150"
                >
                  {selectedSlot ? `Confirm ${formatTime(selectedSlot.start)}` : "Select a time slot"}
                </button>
              </div>
            </div>
          )}

          {/* ── CONFIRM ──────────────────────────────────────────────────────── */}
          {step === "confirm" && selectedSlot && (
            <div className="p-8">
              <div className="mb-6">
                <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-500">Review</span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">Confirm Booking</h2>
                <p className="text-sm text-slate-400 mt-0.5">Double-check the details below.</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 mb-5 overflow-hidden">
                <div className="px-4 py-3.5">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-500 mb-1">Date &amp; Time (EST)</p>
                  <p className="text-sm font-semibold text-slate-900">{formatDateTime(selectedSlot.start)}</p>
                  <p className="text-xs text-slate-400 mt-0.5">30-minute discovery call</p>
                </div>
                <div className="px-4 py-3.5">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-500 mb-1">Your Details</p>
                  <p className="text-sm font-semibold text-slate-900">{fullName}</p>
                  <p className="text-sm text-slate-400">{email}</p>
                </div>
                <div className="px-4 py-3.5">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-500 mb-1">Message</p>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{message}</p>
                </div>
              </div>

              {bookingError && (
                <p className="mb-4 text-xs text-red-500">{bookingError}</p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => { setStep("calendar"); setBookingError(null); }}
                  className="flex-1 py-3 rounded-full text-sm font-semibold text-slate-600 border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-150"
                >
                  ← Change time
                </button>
                <button
                  onClick={handleBook} disabled={booking}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 transition-all duration-150"
                >
                  {booking ? <><Spinner className="w-4 h-4" /> Booking…</> : "Confirm Booking"}
                </button>
              </div>
            </div>
          )}

          {/* ── SUCCESS ──────────────────────────────────────────────────────── */}
          {step === "success" && selectedSlot && (
            <div className="p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-2">
                You&apos;re booked, {fullName.split(" ")[0]}!
              </h2>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                A confirmation was sent to{" "}
                <span className="font-medium text-slate-700">{email}</span>.
              </p>

              <div className="bg-white rounded-xl border border-gray-100 px-4 py-3.5 mb-5 text-left">
                <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-500 mb-1">Scheduled for</p>
                <p className="text-sm font-semibold text-slate-900">{formatDateTime(selectedSlot.start)}</p>
                <p className="text-xs text-slate-400 mt-0.5">30 minutes · EST</p>
              </div>

              {meetLink && (
                <a
                  href={meetLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full mb-3 bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 hover:-translate-y-px transition-all duration-150"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                  Join Google Meet
                </a>
              )}

              <button onClick={onClose} className="w-full py-3 rounded-full text-sm font-medium text-slate-500 border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-150">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
