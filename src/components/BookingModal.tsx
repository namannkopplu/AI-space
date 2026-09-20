import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { useAIApp } from '../context/AIAppContext';
import { useAuth } from '../context/AuthContext';
import { SessionType, AIBooking } from '../types';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  CheckCircle2, 
  Sparkles, 
  Briefcase, 
  ExternalLink,
  ChevronRight,
  UserCheck
} from 'lucide-react';

const SESSION_TYPES: { type: SessionType; label: string; desc: string }[] = [
  { 
    type: '1-on-1 AI Demo', 
    label: '1-on-1 AI Live Demo', 
    desc: 'Live walkthrough of features, workflows, and edge capabilities.' 
  },
  { 
    type: 'Technical Architecture Consultation', 
    label: 'Technical Architecture Review', 
    desc: 'API integration, latency benchmarks, and hosting infrastructure.' 
  },
  { 
    type: 'Enterprise Pricing & Pilot Review', 
    label: 'Enterprise Pricing & Pilot', 
    desc: 'Commercial licensing, SLA terms, and team volume quotes.' 
  },
  { 
    type: 'Model Integration Workshop', 
    label: 'Model Integration Workshop', 
    desc: 'Hands-on SDK onboarding and webhook setup with specialists.' 
  },
  { 
    type: 'Custom Prompt Engineering Session', 
    label: 'Prompt & Fine-Tuning Session', 
    desc: 'Custom system prompts and context window optimization.' 
  }
];

const TIME_SLOTS = [
  '09:00 AM UTC',
  '10:30 AM UTC',
  '01:00 PM UTC',
  '02:30 PM UTC',
  '04:00 PM UTC',
  '06:30 PM UTC'
];

export const BookingModal: React.FC = () => {
  const { 
    isBookingModalOpen, 
    selectedToolForBooking, 
    closeBookingModal, 
    createBooking,
    openMyBookingsModal
  } = useBooking();
  const { tools } = useAIApp();
  const { currentUser, userProfile } = useAuth();

  const [selectedToolId, setSelectedToolId] = useState<string>('');
  const [sessionType, setSessionType] = useState<SessionType>('1-on-1 AI Demo');
  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [scheduledTime, setScheduledTime] = useState<string>(TIME_SLOTS[1]);
  const [duration, setDuration] = useState<number>(30);
  const [notes, setNotes] = useState<string>('');
  
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<AIBooking | null>(null);

  // Default to tomorrow's date
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setScheduledDate(tomorrow.toISOString().split('T')[0]);
  }, [isBookingModalOpen]);

  useEffect(() => {
    if (selectedToolForBooking) {
      setSelectedToolId(selectedToolForBooking.id);
    } else if (tools.length > 0) {
      setSelectedToolId(tools[0].id);
    }
  }, [selectedToolForBooking, tools]);

  if (!isBookingModalOpen) return null;

  const currentSelectedTool = tools.find(t => t.id === selectedToolId) || tools[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSelectedTool) return;

    setSubmitting(true);
    try {
      const result = await createBooking(
        currentSelectedTool.id,
        currentSelectedTool.name,
        currentSelectedTool.category,
        sessionType,
        scheduledDate,
        scheduledTime,
        duration,
        notes
      );
      setConfirmedBooking(result);
    } catch (err) {
      console.error('Booking creation error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setConfirmedBooking(null);
    setNotes('');
    closeBookingModal();
  };

  const getCalendarLink = (b: AIBooking) => {
    const title = encodeURIComponent(`${b.sessionType} - ${b.toolName} (AI space)`);
    const details = encodeURIComponent(`AI space Live Session for ${b.toolName}\nMeeting Link: ${b.meetingLink}\nNotes: ${b.notes || 'None'}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${encodeURIComponent(b.meetingLink || '')}`;
  };

  return (
    <div
      id="booking-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto text-[#111111]"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#ffffff] border border-[rgba(17,17,17,0.12)] rounded-[12px] shadow-[rgba(17,17,17,0.16)_0px_24px_64px_0px] overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-[#f6f5f3] border-b border-[rgba(17,17,17,0.08)] flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-xs font-mono text-[#e8400d] bg-[#ffffff] border border-[rgba(17,17,17,0.08)] uppercase tracking-wider mb-2">
              <CalendarIcon className="w-3.5 h-3.5 text-[#e8400d]" />
              <span>AI space Booking Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#111111] tracking-[-0.03em]">
              Schedule Live AI Consultation
            </h2>
            <p className="text-xs text-[#6d6c6b] mt-1 font-normal">
              Book a live 1-on-1 walkthrough, technical review, or pricing pilot with certified AI specialists.
            </p>
          </div>

          <button
            id="close-booking-modal-btn"
            onClick={handleClose}
            className="p-2 rounded-[8px] bg-[#ffffff] border border-[rgba(17,17,17,0.1)] text-[#6d6c6b] hover:text-[#111111] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-xs">
          {confirmedBooking ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#b7efb2] flex items-center justify-center mx-auto text-[#111111]">
                <CheckCircle2 className="w-6 h-6 text-[#111111]" />
              </div>

              <div>
                <h3 className="text-2xl font-normal text-[#111111] tracking-tight">
                  Demo Session Successfully Booked!
                </h3>
                <p className="text-xs text-[#6d6c6b] mt-1 max-w-md mx-auto">
                  Your booking has been registered in Firebase Firestore and attached to your AI space account.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="p-5 rounded-[12px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.08)] max-w-md mx-auto text-left space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-[rgba(17,17,17,0.08)]">
                  <span className="text-[#6d6c6b]">AI Tool:</span>
                  <span className="text-sm font-semibold text-[#111111]">{confirmedBooking.toolName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6d6c6b]">Session Type:</span>
                  <span className="text-[#e8400d] font-medium">{confirmedBooking.sessionType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6d6c6b]">Scheduled Date & Time:</span>
                  <span className="text-[#111111] font-mono">{confirmedBooking.scheduledDate} at {confirmedBooking.scheduledTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6d6c6b]">Duration:</span>
                  <span className="text-[#111111] font-mono">{confirmedBooking.durationMinutes} Minutes</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[rgba(17,17,17,0.08)]">
                  <span className="text-[#6d6c6b]">Virtual Meeting Link:</span>
                  <a
                    href={confirmedBooking.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e8400d] hover:underline flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>{confirmedBooking.meetingLink}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <a
                  href={getCalendarLink(confirmedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-[8px] bg-[#111111] hover:bg-[#272625] text-[#ffffff] font-normal text-xs flex items-center gap-1.5 transition-colors"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-[#ffffff]" />
                  <span>Add to Google Calendar</span>
                </a>

                <button
                  onClick={() => {
                    handleClose();
                    openMyBookingsModal();
                  }}
                  className="px-5 py-2.5 rounded-[8px] bg-[#ffffff] hover:bg-[#ecebea] text-[#111111] border border-[rgba(17,17,17,0.12)] text-xs font-normal flex items-center gap-1.5 transition-colors"
                >
                  <span>View in My Bookings</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Select AI Tool */}
              <div>
                <label className="block text-[#6d6c6b] mb-1.5 text-xs font-normal">
                  Select AI Tool / Platform *
                </label>
                <select
                  id="booking-tool-select"
                  value={selectedToolId}
                  onChange={(e) => setSelectedToolId(e.target.value)}
                  className="w-full bg-[#ffffff] text-[#111111] p-3 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs font-medium transition-colors"
                >
                  {tools.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.category}) — by {t.companyName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Session Type */}
              <div>
                <label className="block text-[#6d6c6b] mb-1.5 text-xs font-normal">
                  Session Type *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SESSION_TYPES.map((st) => (
                    <button
                      key={st.type}
                      type="button"
                      onClick={() => setSessionType(st.type)}
                      className={`p-3.5 rounded-[8px] border text-left transition-colors ${
                        sessionType === st.type
                          ? 'bg-[#ffd7f0] border-[#ffd7f0] text-[#111111]'
                          : 'bg-[#ffffff] border-[rgba(17,17,17,0.1)] text-[#6d6c6b] hover:text-[#111111] hover:border-[rgba(17,17,17,0.25)]'
                      }`}
                    >
                      <span className="font-medium text-xs text-[#111111] block">{st.label}</span>
                      <span className="text-[10px] text-[#6d6c6b] leading-tight block mt-1">{st.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#6d6c6b] mb-1 text-xs font-normal flex items-center gap-1">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#e8400d]" /> Preferred Date *
                  </label>
                  <input
                    id="booking-date-input"
                    type="date"
                    required
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[#6d6c6b] mb-1 text-xs font-normal flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#e8400d]" /> Time Slot (UTC) *
                  </label>
                  <select
                    id="booking-time-select"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs font-medium"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#6d6c6b] mb-1 text-xs font-normal">
                    Duration
                  </label>
                  <select
                    id="booking-duration-select"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs font-medium"
                  >
                    <option value={30}>30 Minutes (Recommended)</option>
                    <option value={45}>45 Minutes (Deep Dive)</option>
                    <option value={60}>60 Minutes (Architecture)</option>
                  </select>
                </div>
              </div>

              {/* Requirements & Notes */}
              <div>
                <label className="block text-[#6d6c6b] mb-1 text-xs font-normal">
                  Specific Requirements or Questions (Optional)
                </label>
                <textarea
                  id="booking-notes-input"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. We want to test precision metrics against our local agricultural sensor dataset..."
                  className="w-full bg-[#ffffff] text-[#111111] p-3 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs"
                />
              </div>

              {/* Attendee info display */}
              <div className="p-3.5 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.08)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[6px] bg-[#ffd7f0] text-[#111111] flex items-center justify-center font-bold text-xs">
                    {(userProfile?.displayName || currentUser?.displayName || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-[#111111] font-medium block">
                      {userProfile?.displayName || currentUser?.displayName || 'AI Explorer'}
                    </span>
                    <span className="text-[11px] text-[#6d6c6b] font-mono">
                      {currentUser?.email || 'Registered User'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#111111] font-mono bg-[#ffffff] px-2.5 py-1 rounded-[4px] border border-[rgba(17,17,17,0.08)]">
                    Firestore Sync
                  </span>
                </div>
              </div>

              {/* Submit footer */}
              <div className="pt-3 border-t border-[rgba(17,17,17,0.08)] flex items-center justify-between">
                <span className="text-[11px] text-[#6d6c6b] font-mono">
                  Instant Google Meet link generated upon booking
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 rounded-[8px] bg-transparent text-[#6d6c6b] hover:text-[#111111] border border-[rgba(17,17,17,0.14)] text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    id="submit-booking-btn"
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-[8px] bg-[#111111] hover:bg-[#272625] text-[#ffffff] font-normal text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 text-[#ffffff]" />
                    <span>{submitting ? 'Confirming...' : 'Confirm Booking'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
