"use client";

import React, { useState, useEffect } from 'react';

interface TimeSlot {
  date: string;
  day: string;
  slots: string[];
}

interface BookingCalendarProps {
  name?: string;
  email?: string;
  className?: string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ name = "", email = "", className = "" }) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState<'select' | 'confirm' | 'success'>('select');
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState<string>('');

  // Fetch available time slots
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/calendar/slots');
        const data = await response.json();
        
        if (data.success) {
          setTimeSlots(data.data);
        } else {
          setError('Failed to load available time slots');
        }
      } catch (error) {
        console.error('Error fetching time slots:', error);
        setError('Failed to load calendar data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeSlots();
  }, []);

  // Handle time slot selection
  const handleTimeSelection = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setStep('confirm');
  };

  // Handle booking confirmation
  const handleBooking = async () => {
    if (!name || !email || !selectedDate || !selectedTime) {
      setError('Missing required information');
      return;
    }

    setIsBooking(true);
    setError('');

    try {
      const response = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          name,
          email,
          message: 'OneUpAI Strategy Call booking',
          duration: 30,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStep('success');
      } else {
        setError(data.error || 'Failed to book appointment');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setError('Failed to book appointment. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={className}>
      <div className="bg-white rounded-[16px] shadow-lg border border-[#4065d33b] overflow-hidden">
        
        {/* Content */}
        <div className="p-6">
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center gap-4 py-12">
              <div className="w-8 h-8 border-2 border-[#1A80E7] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[#64748B] text-sm ff-Graphik">Loading available times...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-600 text-sm ff-Graphik">{error}</p>
            </div>
          )}

          {/* Time Selection */}
          {step === 'select' && !isLoading && (
            <div className="space-y-4">
              {timeSlots.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[#64748B] ff-Graphik">No available time slots found. Please try again later.</p>
                </div>
              ) : (
                timeSlots.map((daySlot) => (
                  <div key={daySlot.date} className="border border-[#E2E8F0] rounded-lg p-4">
                    <h4 className="font-semibold text-[#1A80E7] mb-3 ff-jakarta">
                      {formatDate(daySlot.date)}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {daySlot.slots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelection(daySlot.date, time)}
                          className="px-3 py-2 text-sm border border-[#1A80E7] text-[#1A80E7] rounded-lg hover:bg-[#1A80E7] hover:text-white transition-colors ff-Graphik"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Booking Confirmation */}
          {step === 'confirm' && (
            <div className="space-y-6">
              <div className="bg-[#EAF6FB] rounded-lg p-4">
                <h4 className="font-semibold text-[#1A80E7] mb-3 ff-jakarta">Appointment Details</h4>
                <div className="space-y-2 text-sm ff-Graphik">
                  <p><span className="font-medium">Date:</span> {formatDate(selectedDate)}</p>
                  <p><span className="font-medium">Time:</span> {selectedTime}</p>
                  <p><span className="font-medium">Duration:</span> 30 minutes</p>
                  <p><span className="font-medium">Name:</span> {name}</p>
                  <p><span className="font-medium">Email:</span> {email}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-medium text-blue-800 mb-2 ff-jakarta">What to expect:</h5>
                <ul className="text-sm text-blue-700 space-y-1 ff-Graphik">
                  <li>• Discussion about your business goals</li>
                  <li>• How OneUpAI can help you grow</li>
                  <li>• Personalized recommendations</li>
                  <li>• Next steps for getting started</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('select')}
                  className="flex-1 px-4 py-2 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-gray-50 transition-colors ff-Graphik"
                >
                  Back
                </button>
                <button
                  onClick={handleBooking}
                  disabled={isBooking}
                  className="flex-1 px-4 py-2 bg-[#1A80E7] text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 ff-Graphik"
                >
                  {isBooking ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}

          {/* Success State */}
          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-green-800 ff-jakarta">Booking Confirmed!</h4>
                <p className="text-[#64748B] text-sm ff-Graphik">
                  Your call is scheduled for {formatDate(selectedDate)} at {selectedTime}
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                <h5 className="font-medium text-green-800 mb-2 ff-jakarta">Next Steps:</h5>
                <ul className="text-sm text-green-700 space-y-1 ff-Graphik">
                  <li>• Check your email for calendar invite</li>
                  <li>• Meeting link will be included in the invite</li>
                  <li>• You'll receive reminders before the call</li>
                  <li>• Prepare any questions about your business</li>
                </ul>
              </div>
            </div>
          )}
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
};

export default BookingCalendar;