"use client";

import { useState } from 'react';

interface CustomCalendarProps {
  name?: string;
  email?: string;
  className?: string;
}

export default function CustomCalendar({ name = "", email = "", className = "" }: CustomCalendarProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const calendarSrc = `https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zHtz5TpbUPKdLqQSMdjM3ytjL8dwweYX9BlJVVXpulfxdhDHMWJdnWA08aXLRRJENBuPD3JV-?gv=true&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

  const handleIframeLoad = () => {
    // Add a small delay to ensure calendar content is fully loaded
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const openCalendarInNewTab = () => {
    window.open(calendarSrc, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading State */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#EAF6FB] rounded-[16px] z-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-[#1A80E7] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#1A80E7] text-sm ff-jakarta font-medium">Loading calendar...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="bg-white rounded-[16px] p-8 shadow-lg border border-[#4065d33b] text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-[#FEF2F2] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Calendar Loading Issue</h3>
              <p className="text-[#64748B] text-sm mb-4">
                We're having trouble loading the calendar. You can open it in a new tab instead.
              </p>
              <button
                onClick={openCalendarInNewTab}
                className="bg-[#1A80E7] hover:bg-[#155FA0] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Open Calendar in New Tab
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Calendar Container */}
      {!hasError && (
        <div className="bg-white rounded-[16px] p-2 shadow-lg border border-[#4065d33b] overflow-hidden">
          <iframe
            src={calendarSrc}
            style={{ 
              border: 0, 
              width: "100%", 
              height: 600,
              borderRadius: "12px",
              display: isLoading ? 'none' : 'block'
            }}
            frameBorder="0"
            title="Schedule Your Call"
            loading="eager"
            className="rounded-[12px]"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allow="camera; microphone; geolocation"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      )}
      
      {/* Subtle styling without interfering with functionality */}
      <style jsx>{`
        iframe {
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}