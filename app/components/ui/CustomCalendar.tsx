"use client";

import { useState } from 'react';

interface CustomCalendarProps {
  name?: string;
  email?: string;
  className?: string;
}

// Mock calendar data - in a real implementation, you'd fetch this from Google Calendar API
const mockTimeSlots = [
  { date: '2024-04-15', day: 'Mon', slots: ['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM'] },
  { date: '2024-04-16', day: 'Tue', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '4:00 PM'] },
  { date: '2024-04-17', day: 'Wed', slots: ['10:00 AM', '11:30 AM', '2:30 PM'] },
  { date: '2024-04-18', day: 'Thu', slots: ['9:30 AM', '1:00 PM', '3:00 PM', '4:30 PM'] },
  { date: '2024-04-19', day: 'Fri', slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
];

export default function CustomCalendar({ name = "", email = "", className = "" }: CustomCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return;
    
    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, you'd make an API call to Google Calendar here
    // const bookingData = {
    //   date: selectedDate,
    //   time: selectedTime,
    //   name,
    //   email,
    //   duration: 30 // minutes
    // };
    
    setIsBooking(false);
    setShowConfirmation(true);
  };

  const openGoogleCalendar = () => {
    const calendarSrc = `https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zHtz5TpbUPKdLqQSMdjM3ytjL8dwweYX9BlJVVXpulfxdhDHMWJdnWA08aXLRRJENBuPD3JV-?gv=true&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
    window.open(calendarSrc, '_blank', 'noopener,noreferrer');
  };

  if (showConfirmation) {
    return (
      <div className={`${className}`}>
        <div className="bg-white rounded-[16px] p-8 shadow-lg border border-[#4065d33b] text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1A80E7] to-[#00C48C] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-2 ff-jakarta">Call Scheduled!</h3>
              <p className="text-[#64748B] text-sm mb-4 ff-Graphik">
                Your call is scheduled for {selectedTime} on {new Date(selectedDate!).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-[#64748B] text-xs">
                You'll receive a calendar invite at {email}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-[16px] p-6 shadow-lg border border-[#4065d33b]">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-[#1A80E7] mb-2 ff-jakarta">Select Your Preferred Time</h3>
          <p className="text-[#64748B] text-sm ff-Graphik">Choose a date and time that works best for you</p>
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-[#1E293B] mb-3 ff-jakarta">Available Dates</h4>
          <div className="grid grid-cols-5 gap-2">
            {mockTimeSlots.map((dayData) => (
              <button
                key={dayData.date}
                onClick={() => {
                  setSelectedDate(dayData.date);
                  setSelectedTime(null); // Reset time selection
                }}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedDate === dayData.date
                    ? 'border-[#1A80E7] bg-[#EAF6FB] text-[#1A80E7]'
                    : 'border-[#E2E8F0] hover:border-[#1A80E7] hover:bg-[#EAF6FB]'
                }`}
              >
                <div className="text-xs font-medium ff-jakarta">{dayData.day}</div>
                <div className="text-sm font-bold ff-jakarta">
                  {new Date(dayData.date).getDate()}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#1E293B] mb-3 ff-jakarta">Available Times</h4>
            <div className="grid grid-cols-2 gap-2">
              {mockTimeSlots
                .find(day => day.date === selectedDate)
                ?.slots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ff-jakarta ${
                      selectedTime === time
                        ? 'border-[#1A80E7] bg-[#EAF6FB] text-[#1A80E7]'
                        : 'border-[#E2E8F0] hover:border-[#1A80E7] hover:bg-[#EAF6FB]'
                    }`}
                  >
                    {time}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Meeting Details */}
        {selectedDate && selectedTime && (
          <div className="mb-6 p-4 bg-[#EAF6FB] rounded-lg border border-[#4065d33b]">
            <h4 className="text-sm font-semibold text-[#1E293B] mb-2 ff-jakarta">Meeting Details</h4>
            <div className="space-y-1 text-sm text-[#64748B] ff-Graphik">
              <div>📅 {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
              <div>🕐 {selectedTime} (30 minutes)</div>
              <div>👤 {name}</div>
              <div>📧 {email}</div>
              <div>💼 OneUpAI Strategy Call</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime || isBooking}
            className="w-full bg-gradient-to-r from-[#1A80E7] to-[#00C48C] text-white py-4 px-6 rounded-lg font-bold text-base ff-jakarta transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isBooking ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Scheduling Your Call...
              </>
            ) : (
              'Confirm & Schedule Call'
            )}
          </button>

          {/* Fallback Option */}
          <div className="text-center">
            <p className="text-xs text-[#64748B] mb-2 ff-Graphik">
              Having trouble? Use our direct booking link:
            </p>
            <button
              onClick={openGoogleCalendar}
              className="text-[#1A80E7] hover:text-[#155FA0] text-sm font-medium transition-colors duration-150 ff-jakarta"
            >
              Open Google Calendar →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}