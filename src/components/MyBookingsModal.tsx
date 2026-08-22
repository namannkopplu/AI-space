import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { AIBooking } from '../types';
import { 
  X, 
  Calendar, 
  Clock, 
  Video, 
  ExternalLink, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  Sparkles,
  CalendarCheck
} from 'lucide-react';

export const MyBookingsModal: React.FC = () => {
  const { 
    bookings, 
    loadingBookings, 
    isMyBookingsModalOpen, 
    closeMyBookingsModal, 
    cancelBooking,
    rescheduleBooking,
    openBookingModal
  } = useBooking();
  const { userProfile, currentUser } = useAuth();

  const [filter, setFilter] = useState<'all' | 'upcoming' | 'cancelled'>('all');
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('10:30 AM UTC');

  if (!isMyBookingsModalOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'upcoming') {
      return b.status === 'confirmed' && b.scheduledDate >= todayStr;
    }
    if (filter === 'cancelled') {
      return b.status === 'cancelled';
    }
    return true;
  });

  const handleStartReschedule = (b: AIBooking) => {
    setReschedulingId(b.id);
    setNewDate(b.scheduledDate);
    setNewTime(b.scheduledTime);
  };

  const handleConfirmReschedule = async (bookingId: string) => {
    if (!newDate || !newTime) return;
    await rescheduleBooking(bookingId, newDate, newTime);
    setReschedulingId(null);
  };

  return (
    <div
      id="my-bookings-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeMyBookingsModal();
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#070e1c] border border-white/10 rounded-xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 bg-slate-900/60 border-b border-white/5 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider mb-1.5">
              <CalendarCheck className="w-3 h-3" />
              <span>User Bookings Dashboard</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              My Scheduled AI Demos & Consultations
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage your upcoming AI walkthroughs, architecture sessions, and meeting links.
            </p>
          </div>

          <button
            id="close-my-bookings-modal-btn"
            onClick={closeMyBookingsModal}
            className="p-1.5 rounded-lg bg-slate-800 border border-white/5 text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Bar & Action */}
        <div className="px-5 py-3 bg-slate-950/60 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'upcoming' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Active / Upcoming
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'cancelled' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Cancelled
            </button>
          </div>

          <button
            onClick={() => {
              closeMyBookingsModal();
              openBookingModal();
            }}
            className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Book New AI Session</span>
          </button>
        </div>

        {/* Content List */}
        <div className="p-5 overflow-y-auto space-y-3 text-xs flex-1">
          {loadingBookings ? (
            <div className="py-12 text-center text-slate-400">
              <span className="inline-block animate-spin mr-2">⟳</span>
              Loading your bookings from Firestore...
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-300">No scheduled sessions found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {filter === 'all' 
                    ? "You haven't booked any AI demo sessions yet. Schedule a 1-on-1 walkthrough for any AI in our catalog."
                    : `No ${filter} bookings recorded.`}
                </p>
              </div>
              <button
                onClick={() => {
                  closeMyBookingsModal();
                  openBookingModal();
                }}
                className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors"
              >
                Schedule First AI Demo
              </button>
            </div>
          ) : (
            filteredBookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-lg bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-white">{b.toolName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-white/5">
                        {b.toolCategory}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : b.status === 'cancelled'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}
                      >
                        {b.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-blue-400 font-medium">{b.sessionType}</p>
                  </div>

                  <div className="text-right text-xs">
                    <div className="flex items-center gap-1 text-slate-300 font-medium justify-end">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{b.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-[11px] justify-end mt-0.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{b.scheduledTime} ({b.durationMinutes} min)</span>
                    </div>
                  </div>
                </div>

                {b.notes && (
                  <p className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-white/5">
                    <strong>Notes:</strong> {b.notes}
                  </p>
                )}

                {/* Rescheduling Form */}
                {reschedulingId === b.id && (
                  <div className="p-3 rounded bg-slate-950 border border-blue-500/30 space-y-2">
                    <div className="text-[11px] font-semibold text-blue-400">Reschedule Session:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">New Date</label>
                        <input
                          type="date"
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                          className="w-full bg-slate-900 text-slate-200 p-1.5 rounded border border-white/10 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">New Time</label>
                        <input
                          type="text"
                          value={newTime}
                          onChange={(e) => setNewTime(e.target.value)}
                          placeholder="e.g. 02:00 PM UTC"
                          className="w-full bg-slate-900 text-slate-200 p-1.5 rounded border border-white/10 text-xs"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => setReschedulingId(null)}
                        className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-[11px]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleConfirmReschedule(b.id)}
                        className="px-3 py-1 rounded bg-blue-600 text-white font-medium text-[11px]"
                      >
                        Save New Time
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions Row */}
                <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {b.meetingLink && b.status === 'confirmed' && (
                      <a
                        href={b.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Video className="w-3.5 h-3.5 text-blue-400" />
                        <span>Join Google Meet</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    )}
                  </div>

                  {b.status === 'confirmed' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartReschedule(b)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="px-2.5 py-1 rounded bg-red-950/40 hover:bg-red-950/60 text-red-400 border border-red-900/40 text-[11px] font-medium transition-colors"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-900/60 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
          <span>Synced with Firebase Firestore</span>
          <button
            onClick={closeMyBookingsModal}
            className="px-3 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-white/5 text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
