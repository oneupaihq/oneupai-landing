"use client";

import { useEffect, useRef } from 'react';

interface CustomCalendarProps {
  name?: string;
  email?: string;
  className?: string;
}

export default function CustomCalendar({ name = "", email = "", className = "" }: CustomCalendarProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const calendarSrc = `https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zHtz5TpbUPKdLqQSMdjM3ytjL8dwweYX9BlJVVXpulfxdhDHMWJdnWA08aXLRRJENBuPD3JV-?gv=true&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

  useEffect(() => {
    // Add custom styling to the iframe when it loads
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        try {
          // Note: Due to CORS restrictions, we can't directly style the iframe content
          // But we can apply filters and transformations to the iframe itself
          iframe.style.filter = 'contrast(1.05) brightness(1.02) saturate(1.1)';
        } catch (error) {
          // Silently handle cross-origin restrictions
        }
      };
    }
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Custom overlay styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EAF6FB]/20 to-transparent pointer-events-none rounded-[16px] z-10" />
      
      {/* Calendar container with custom styling */}
      <div className="relative bg-white rounded-[16px] p-3 shadow-lg border border-[#4065d33b] overflow-hidden">
        
        {/* Custom header overlay */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#EAF6FB] to-transparent z-20 pointer-events-none rounded-t-[16px]" />
        
        {/* Loading state */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#EAF6FB] rounded-[16px] z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-[#1A80E7] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#1A80E7] text-sm ff-jakarta font-medium">Loading calendar...</p>
          </div>
        </div>
        
        {/* Actual calendar iframe */}
        <iframe
          ref={iframeRef}
          src={calendarSrc}
          style={{ 
            border: 0, 
            width: "100%", 
            height: 600,
            borderRadius: "12px",
            position: "relative",
            zIndex: 30
          }}
          frameBorder="0"
          title="Schedule Your Call"
          loading="lazy"
          className="rounded-[12px] relative z-30"
          onLoad={() => {
            // Hide loading state when iframe loads
            const loadingDiv = document.querySelector('.absolute.inset-0.flex.items-center.justify-center') as HTMLElement;
            if (loadingDiv) {
              loadingDiv.style.display = 'none';
            }
          }}
        />
        
        {/* Custom bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#EAF6FB]/30 to-transparent pointer-events-none rounded-b-[16px] z-20" />
      </div>
      
      {/* Custom styling for better integration */}
      <style jsx>{`
        .calendar-wrapper {
          background: linear-gradient(135deg, #EAF6FB 0%, #ffffff 100%);
          box-shadow: 
            0 10px 40px rgba(26, 128, 231, 0.1),
            0 2px 8px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }
        
        /* Custom scrollbar for the container */
        .calendar-wrapper::-webkit-scrollbar {
          width: 6px;
        }
        
        .calendar-wrapper::-webkit-scrollbar-track {
          background: rgba(26, 128, 231, 0.1);
          border-radius: 3px;
        }
        
        .calendar-wrapper::-webkit-scrollbar-thumb {
          background: rgba(26, 128, 231, 0.3);
          border-radius: 3px;
        }
        
        .calendar-wrapper::-webkit-scrollbar-thumb:hover {
          background: rgba(26, 128, 231, 0.5);
        }
      `}</style>
    </div>
  );
}