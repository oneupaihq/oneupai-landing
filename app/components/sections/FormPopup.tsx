"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCalendar from "../ui/CustomCalendar";

export type PopupVariant = "community" | "sales";
type Step = "form" | "calendar";

interface FormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  variant: PopupVariant;
}

const config = {
  community: {
    heading: "Join Our Community",
    description:
      "Connect with thousands of business owners using AI to grow faster. Get tips, templates, and early access to new features — completely free.",
    submitLabel: "Join the Community",
    calendarTitle: "Book Your Welcome Call",
    calendarDescription: "Let's get you started! Pick a time for a quick welcome call where we'll show you around the community and answer any questions.",
    submitHandler: async (data: { name: string; email: string; message?: string }) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          type: 'community',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send email');
      }

      return response.json();
    },
  },
  sales: {
    heading: "How Can We Help?",
    description:
      "Tell us about your business and what you're looking for. Our team will reach out within a few hours to schedule a call.",
    submitLabel: "Send Message",
    calendarTitle: "Schedule Your Call",
    calendarDescription: "Pick a time that works for you and we'll discuss how OneUpAI can help grow your business.",
    submitHandler: async (data: { name: string; email: string; message?: string }) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          type: 'sales',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send email');
      }

      return response.json();
    },
  },
};

export default function FormPopup({ isOpen, onClose, variant }: FormPopupProps) {
  const { heading, description, submitLabel, calendarTitle, calendarDescription, submitHandler } = config[variant];
  const showTextarea = variant === "sales";
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep("form");
      setFormData({ name: "", email: "", message: "" });
      setSubmitError(null);
      setSubmitSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      ...(showTextarea && {
        message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      }),
    };

    // Store form data for calendar step
    setFormData({
      name: data.name,
      email: data.email,
      message: data.message || ""
    });

    try {
      // Always wait for email to be sent successfully before proceeding
      await submitHandler(data);
      setSubmitSuccess(true);
      
      if (variant === "sales") {
        // For sales variant, proceed to calendar after successful email
        setTimeout(() => {
          setStep("calendar");
          setSubmitSuccess(false);
          setIsSubmitting(false);
        }, 1500);
      } else {
        // For community variant, close modal after successful email
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
        }, 2000);
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  // Google Calendar URL - use form data if available, otherwise empty
  const calendarSrc = `https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zHtz5TpbUPKdLqQSMdjM3ytjL8dwweYX9BlJVVXpulfxdhDHMWJdnWA08aXLRRJENBuPD3JV-?gv=true&name=${encodeURIComponent(formData.name || "")}&email=${encodeURIComponent(formData.email || "")}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className={`pointer-events-auto w-full ${step === "calendar" ? "max-w-[900px]" : "max-w-[630px]"} rounded-[20px] shadow-2xl flex flex-col transition-all duration-300`}
              style={{ background: "#EAF6FB", maxHeight: "calc(100vh - 32px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-y-auto overscroll-contain flex-1 p-7 sm:p-9 ff-jakarta" style={{ scrollbarWidth: "none" }}>

                {step === "form" && (
                  <>
                    {/* Top bar */}
                    <div className="flex justify-between items-center -mt-1 -mr-1 mb-8">
                      <img
                        className="w-20 md:w-28 h-auto"
                        alt="Company Logo"
                        src="/images/logo.svg"
                      />
                      <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 bg-black/10 hover:bg-black/15 transition-all duration-200"
                        aria-label="Close"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>

                    {/* Heading */}
                    <h2 className="text-center ff-jakarta text-2xl sm:text-3xl font-bold text-[#1A80E7] mb-3 leading-tight">
                      {heading}
                    </h2>

                    {/* Description */}
                    <p className="text-[#140505] text-center max-w-[500px] mx-auto text-sm mb-5 ff-Graphik leading-relaxed">
                      {description}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-[#4065d33b] mb-6" />

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-[#12715B80] mb-1.5 tracking-wide uppercase">
                          Full Name
                        </label>
                        <input
                          name="name"
                          type="text"
                          placeholder="John Smith"
                          required
                          className="w-full rounded-[12px] bg-white border border-transparent px-4 md:py-4 py-3 text-sm text-gray-700 placeholder-[#00000080] outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 shadow-sm"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold text-[#12715B80] mb-1.5 tracking-wide uppercase">
                          Email Address
                        </label>
                        <input
                          name="email"
                          type="email"
                          placeholder="name@company.com"
                          required
                          className="w-full rounded-[12px] bg-white border border-transparent px-4 md:py-4 py-3 text-sm text-gray-700 placeholder-[#00000080] outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 shadow-sm"
                        />
                      </div>

                      {/* Message — sales only */}
                      <AnimatePresence initial={false}>
                        {showTextarea && (
                          <motion.div
                            key="message-field"
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <label className="block text-xs font-semibold text-[#12715B80] mb-1.5 tracking-wide uppercase">
                              How can we help?
                            </label>
                            <textarea
                              name="message"
                              placeholder="Tell us about your business and what you're looking for..."
                              required
                              rows={4}
                              className="w-full rounded-[12px] bg-white border border-transparent px-4 py-3 text-sm text-gray-700 placeholder-[#00000080] outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 shadow-sm resize-none"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Error Message */}
                      {submitError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                          {submitError}
                        </div>
                      )}

                      {/* Success Message */}
                      {submitSuccess && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                          {variant === 'sales' 
                            ? 'Great! Now let\'s schedule your call...' 
                            : 'Welcome to the community! Check your email for a confirmation message with next steps.'}
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting || submitSuccess}
                        className="mt-2 w-full rounded-[12px] bg-[#1A80E7] hover:bg-[#155FA0] active:scale-[0.98] text-white font-bold text-base md:py-4 py-3 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1A80E7] disabled:active:scale-100"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </span>
                        ) : submitSuccess ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {variant === 'sales' ? 'Loading calendar...' : 'Sent!'}
                          </span>
                        ) : (
                          submitLabel
                        )}
                      </button>

                      <div className="text-center">
                        {/* Call us — sales only */}
                        {variant === "sales" && (
                          <p className="ff-Graphik md:text-[15px] text-sm text-[#000000] md:mt-4 mt-1">
                            Prefer to talk? &nbsp;&nbsp;
                            <a
                              href="tel:+18336638724"
                              className="inline-flex items-center gap-1 text-[#1A80E7] hover:text-[#155FA0] font-medium transition-colors duration-150"
                            >
                              <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.5 12.69v2.25a1.5 1.5 0 0 1-1.635 1.5A14.835 14.835 0 0 1 8.393 14.1a14.61 14.61 0 0 1-4.5-4.5 14.835 14.835 0 0 1-2.34-6.517A1.5 1.5 0 0 1 3.045 1.5H5.3a1.5 1.5 0 0 1 1.5 1.29c.095.72.27 1.428.525 2.108a1.5 1.5 0 0 1-.337 1.582L6.022 7.447a12 12 0 0 0 4.5 4.5l.967-.967a1.5 1.5 0 0 1 1.582-.337c.68.254 1.388.43 2.108.525A1.5 1.5 0 0 1 16.5 12.69Z" fill="currentColor"/>
                              </svg>
                              1-833-ONEUPAI (663-8724)
                            </a>
                          </p>
                        )}
                      </div>
                    </form>
                  </>
                )}

                {step === "calendar" && (
                  <>
                    {/* Calendar Step Header */}
                    <div className="flex justify-between items-center -mt-1 -mr-1 mb-6">
                      <img
                        className="w-20 md:w-28 h-auto"
                        alt="Company Logo"
                        src="/images/logo.svg"
                      />
                      <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 bg-black/10 hover:bg-black/15 transition-all duration-200"
                        aria-label="Close"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>

                    {/* Calendar Title */}
                    <h2 className="text-center ff-jakarta text-2xl sm:text-3xl font-bold text-[#1A80E7] mb-3 leading-tight">
                      {calendarTitle}
                    </h2>

                    {/* Calendar Description */}
                    <p className="text-[#140505] text-center max-w-[500px] mx-auto text-sm mb-6 ff-Graphik leading-relaxed">
                      Hi {formData.name.split(" ")[0]}! {calendarDescription}
                    </p>

                    {/* Back Button */}
                    <button
                      onClick={() => setStep("form")}
                      className="flex items-center gap-2 text-[#1A80E7] hover:text-[#155FA0] font-medium text-sm mb-4 transition-colors duration-150"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Back to form
                    </button>

                    {/* Custom Styled Calendar */}
                    <CustomCalendar 
                      name={formData.name} 
                      email={formData.email}
                      className="mb-4"
                    />

                    {/* Skip Option */}
                    <div className="text-center mt-4">
                      <button
                        onClick={onClose}
                        className="text-[#666] hover:text-[#1A80E7] text-sm font-medium transition-colors duration-150"
                      >
                        Skip for now - I'll schedule later
                      </button>
                    </div>
                  </>
                )}

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}