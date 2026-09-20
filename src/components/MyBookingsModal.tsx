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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto text-[#111111]"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeMyBookingsModal();
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#ffffff] border border-[rgba(17,17,17,0.12)] rounded-[12px] shadow-[rgba(17,17,17,0.16)_0px_24px_64px_0px] overflow-hidden my-6 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#f6f5f3] border-b border-[rgba(17,17,17,0.08)] flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-[10px] font-mono text-[#e8400d] bg-[#ffffff] border border-[rgba(17,17,17,0.08)] uppercase tracking-wider mb-2">
              <CalendarCheck className="w-3.5 h-3.5 text-[#e8400d]" />
              <span>Bookings Registry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#111111] tracking-[-0.03em]">
              Scheduled AI Demos & Consultations
            </h2>
            <p className="text-xs text-[#6d6c6b] mt-1 font-normal">
              Manage your upcoming AI walkthroughs, architecture sessions, and meeting rooms.
            </p>
          </div>

          <button
            id="close-my-bookings-modal-btn"
            onClick={closeMyBookingsModal}
            className="p-2 rounded-[8px] bg-[#ffffff] border border-[rgba(17,17,17,0.1)] text-[#6d6c6b] hover:text-[#111111] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Bar & Action */}
        <div className="px-6 py-3.5 bg-[#ffffff] border-b border-[rgba(17,17,17,0.08)] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex gap-1 bg-[#f6f5f3] p-1 rounded-[8px]">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-[6px] text-xs transition-colors ${
                filter === 'all' ? 'bg-[#111111] text-[#ffffff] font-medium' : 'text-[#6d6c6b] hover:text-[#111111]'
              }`}
            >
              All ({bookings.length})
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-3.5 py-1.5 rounded-[6px] text-xs transition-colors ${
                filter === 'upcoming' ? 'bg-[#111111] text-[#ffffff] font-medium' : 'text-[#6d6c6b] hover:text-[#111111]'
              }`}
            >
              Active / Upcoming
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`px-3.5 py-1.5 rounded-[6px] text-xs transition-colors ${
                filter === 'cancelled' ? 'bg-[#111111] text-[#ffffff] font-medium' : 'text-[#6d6c6b] hover:text-[#111111]'
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
            className="px-4 py-2 rounded-[8px] bg-[#111111] hover:bg-[#272625] text-[#ffffff] font-normal text-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Book New AI Session</span>
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto space-y-3.5 text-xs flex-1">
          {loadingBookings ? (
            <div className="py-12 text-center text-[#6d6c6b] font-mono">
              <span className="inline-block animate-spin mr-2 text-[#e8400d]">⟳</span>
              Loading bookings from Firestore database...
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#f6f5f3] flex items-center justify-center mx-auto text-[#e8400d]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-normal text-[#111111]">No scheduled sessions found</h3>
                <p className="text-xs text-[#6d6c6b] mt-1 max-w-sm mx-auto">
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
                className="px-5 py-2 rounded-[8px] bg-[#111111] hover:bg-[#272625] text-[#ffffff] font-normal text-xs transition-colors"
              >
                Schedule First AI Demo
              </button>
            </div>
          ) : (
            filteredBookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.06)] hover:border-[rgba(17,17,17,0.15)] transition-colors space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-[#111111]">{b.toolName}</span>
                      <span className="px-2.5 py-0.5 rounded-[4px] text-[10px] font-mono bg-[#ffffff] text-[#6d6c6b] border border-[rgba(17,17,17,0.08)]">
                        {b.toolCategory}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-[4px] text-[10px] font-mono ${
                          b.status === 'confirmed'
                            ? 'bg-[#b7efb2] text-[#111111]'
                            : b.status === 'cancelled'
                            ? 'bg-[#fee2e2] text-[#b91c1c]'
                            : 'bg-[#ffd7f0] text-[#111111]'
                        }`}
                      >
                        {b.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-[#e8400d] font-medium">{b.sessionType}</p>
                  </div>

                  <div className="text-right text-xs">
                    <div className="flex items-center gap-1.5 text-[#111111] font-mono justify-end">
                      <Calendar className="w-3.5 h-3.5 text-[#e8400d]" />
                      <span>{b.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#6d6c6b] text-[11px] font-mono justify-end mt-0.5">
                      <Clock className="w-3 h-3 text-[#6d6c6b]" />
                      <span>{b.scheduledTime} ({b.durationMinutes} min)</span>
                    </div>
                  </div>
                </div>

                {b.notes && (
                  <p className="text-[11px] text-[#6d6c6b] bg-[#ffffff] p-2.5 rounded-[6px] border border-[rgba(17,17,17,0.08)]">
                    <strong className="text-[#111111] font-mono">Notes:</strong> {b.notes}
                  </p>
                )}

                {/* Rescheduling Form */}
                {reschedulingId === b.id && (
                  <div className="p-3.5 rounded-[8px] bg-[#ffffff] border border-[#e8400d]/40 space-y-2.5">
                    <div className="text-[11px] font-mono text-[#e8400d]">Reschedule Session:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-[#6d6c6b] font-mono block mb-0.5">New Date</label>
                        <input
                          type="date"
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                          className="w-full bg-[#f6f5f3] text-[#111111] p-2 rounded-[6px] border border-[rgba(17,17,17,0.12)] text-xs focus:outline-none focus:border-[#111111]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#6d6c6b] font-mono block mb-0.5">New Time</label>
                        <input
                          type="text"
                          value={newTime}
                          onChange={(e) => setNewTime(e.target.value)}
                          placeholder="e.g. 02:00 PM UTC"
                          className="w-full bg-[#f6f5f3] text-[#111111] p-2 rounded-[6px] border border-[rgba(17,17,17,0.12)] text-xs focus:outline-none focus:border-[#111111]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => setReschedulingId(null)}
                        className="px-3 py-1.5 rounded-[6px] bg-[#ecebea] text-[#111111] hover:bg-[#e2e1df] text-[11px] transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleConfirmReschedule(b.id)}
                        className="px-3 py-1.5 rounded-[6px] bg-[#111111] text-[#ffffff] font-normal text-[11px] transition-colors"
                      >
                        Save New Time
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions Row */}
                <div className="pt-2 border-t border-[rgba(17,17,17,0.08)] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {b.meetingLink && b.status === 'confirmed' && (
                      <a
                        href={b.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-[6px] bg-[#ffffff] hover:bg-[#ecebea] text-[#111111] border border-[rgba(17,17,17,0.12)] text-xs font-mono flex items-center gap-1.5 transition-colors"
                      >
                        <Video className="w-3.5 h-3.5 text-[#e8400d]" />
                        <span>Join Meeting Room</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    )}
                  </div>

                  {b.status === 'confirmed' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartReschedule(b)}
                        className="px-3 py-1.5 rounded-[6px] bg-[#ffffff] hover:bg-[#ecebea] text-[#6d6c6b] hover:text-[#111111] border border-[rgba(17,17,17,0.12)] text-[11px] transition-colors"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="px-3 py-1.5 rounded-[6px] bg-[#fff1f2] hover:bg-[#ffe4e6] text-[#b91c1c] border border-[#fecdd3] text-[11px] transition-colors"
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
        <div className="p-4 bg-[#f6f5f3] border-t border-[rgba(17,17,17,0.08)] flex items-center justify-between text-xs text-[#6d6c6b] font-mono">
          <span>Synced with Firebase Firestore</span>
          <button
            onClick={closeMyBookingsModal}
            className="px-4 py-1.5 rounded-[6px] bg-[#ffffff] text-[#111111] hover:bg-[#ecebea] border border-[rgba(17,17,17,0.12)] text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
