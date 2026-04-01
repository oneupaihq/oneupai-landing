"use client";

import { useState } from 'react';

interface CustomCalendarProps {
  name?: string;
  email?: string;
  className?: string;
}

export default function CustomCalendar({ name = "", email = "", className = "" }: CustomCalendarProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Your Google Calendar booking URL - using the same URL from BookACallModal.tsx
  const calendarUrl = `https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zHtz5TpbUPKdLqQSMdjM3ytjL8dwweYX9BlJVVXpulfxdhDHMWJdnWA08aXLRRJENBuPD3JV-?gv=true&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-[16px] shadow-lg border border-[#4065d33b] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#EAF6FB] px-6 py-4 border-b border-[#4065d33b]">
          <div className="text-center">
            <h3 className="text-lg font-bold text-[#1A80E7] mb-2 ff-jakarta">Schedule Your Call</h3>
            <p className="text-[#64748B] text-sm ff-Graphik">Choose a time that works best for you</p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-[16px]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-[#1A80E7] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[#64748B] text-sm ff-Graphik">Loading calendar...</p>
            </div>
          </div>
        )}

        {/* Google Calendar Iframe */}
        <div className="relative" style={{ height: '500px' }}>
          <iframe
            src={calendarUrl}
            width="100%"
            height="500"
            style={{ border: 0 }}
            scrolling="no"
            onLoad={handleIframeLoad}
            className="w-full h-full"
            title="Schedule Appointment"
          />
        </div>

        {/* Footer */}
        <div className="bg-[#EAF6FB] px-6 py-3 border-t border-[#4065d33b]">
          <p className="text-center text-xs text-[#64748B] ff-Graphik">
            Powered by Google Calendar • Secure booking system
          </p>
        </div>
      </div>
    </div>
  );
}