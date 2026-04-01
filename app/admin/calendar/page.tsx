'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import AuthSessionProvider from '@/app/components/SessionProvider';

interface CalendarInfo {
  id: string;
  summary: string;
  primary?: boolean;
}

function CalendarAdminContent() {
  const { data: session, status } = useSession();
  const [calendars, setCalendars] = useState<CalendarInfo[]>([]);
  const [selectedCalendar, setSelectedCalendar] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch user's calendars when authenticated
  useEffect(() => {
    if (session?.accessToken) {
      fetchCalendars();
    }
  }, [session]);

  const fetchCalendars = async () => {
    if (!session?.accessToken) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/calendar/list', {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setCalendars(data.calendars || []);
        
        // Auto-select primary calendar if available
        const primaryCalendar = data.calendars?.find((cal: CalendarInfo) => cal.primary);
        if (primaryCalendar) {
          setSelectedCalendar(primaryCalendar.id);
        }
      } else {
        throw new Error('Failed to fetch calendars');
      }
    } catch (error) {
      console.error('Error fetching calendars:', error);
      setMessage({ type: 'error', text: 'Failed to fetch calendars. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const saveCalendarConfig = async () => {
    if (!selectedCalendar || !session?.accessToken) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/calendar/configure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          calendarId: selectedCalendar,
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
        }),
      });
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Calendar configured successfully! Your booking system is now active.' });
      } else {
        throw new Error('Failed to save configuration');
      }
    } catch (error) {
      console.error('Error saving calendar config:', error);
      setMessage({ type: 'error', text: 'Failed to save configuration. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#1A80E7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Google Calendar Integration</h1>
          <p className="text-gray-600">
            Connect your Google Calendar to enable automatic booking for your OneUpAI website.
          </p>
        </div>

        {!session ? (
          /* Sign In Section */
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#EAF6FB] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1A80E7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Connect Your Google Calendar</h2>
              <p className="text-gray-600 mb-6">
                Sign in with Google to connect your calendar and enable automatic booking on your website.
              </p>
              <Button
                onClick={() => signIn('google')}
                className="bg-[#1A80E7] hover:bg-[#155FA0] text-white px-6 py-3 rounded-lg font-medium"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </Button>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-left">
                <h3 className="font-medium text-blue-900 mb-2">What permissions are needed?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• View your calendars</li>
                  <li>• Create and manage events</li>
                  <li>• Send calendar invitations</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Calendar Selection Section */
          <div className="space-y-6">
            {/* User Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={session.user?.image || ''}
                    alt={session.user?.name || ''}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{session.user?.name}</p>
                    <p className="text-sm text-gray-600">{session.user?.email}</p>
                  </div>
                </div>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Calendar Selection */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Calendar</h2>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="w-6 h-6 border-2 border-[#1A80E7] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-gray-600">Loading calendars...</p>
                </div>
              ) : calendars.length > 0 ? (
                <div className="space-y-3">
                  {calendars.map((calendar) => (
                    <label
                      key={calendar.id}
                      className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="calendar"
                        value={calendar.id}
                        checked={selectedCalendar === calendar.id}
                        onChange={(e) => setSelectedCalendar(e.target.value)}
                        className="mr-3 text-[#1A80E7]"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{calendar.summary}</p>
                        {calendar.primary && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Primary</span>
                        )}
                      </div>
                    </label>
                  ))}
                  
                  <div className="pt-4">
                    <Button
                      onClick={saveCalendarConfig}
                      disabled={!selectedCalendar || isSaving}
                      className="bg-[#1A80E7] hover:bg-[#155FA0] text-white"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Configuring...
                        </>
                      ) : (
                        'Configure Calendar'
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No calendars found.</p>
                  <Button onClick={fetchCalendars} variant="outline">
                    Retry
                  </Button>
                </div>
              )}
            </div>

            {/* Status Messages */}
            {message && (
              <div className={`p-4 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}

            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Next Steps</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Select the calendar you want to use for bookings</li>
                <li>Click "Configure Calendar" to save your settings</li>
                <li>Your website booking system will now use this calendar</li>
                <li>Test the booking flow on your website</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CalendarAdminPage() {
  return (
    <AuthSessionProvider>
      <CalendarAdminContent />
    </AuthSessionProvider>
  );
}