import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAIApp } from '../context/AIAppContext';
import { useBooking } from '../context/BookingContext';
import { 
  X, 
  User, 
  Mail, 
  Briefcase, 
  Building, 
  LogOut, 
  Bookmark, 
  Check, 
  Calendar,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const UserProfileModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { userProfile, currentUser, logout, updateProfileData } = useAuth();
  const { tools, openToolModal } = useAIApp();
  const { bookings, openMyBookingsModal } = useBooking();

  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [role, setRole] = useState(userProfile?.role || '');
  const [company, setCompany] = useState(userProfile?.company || '');
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const savedTools = tools.filter(t => userProfile?.savedToolIds?.includes(t.id));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfileData({
      displayName,
      role,
      company,
      bio
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div
      id="user-profile-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-[#070e1c] border border-white/10 rounded-xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col text-xs">
        
        {/* Header */}
        <div className="p-5 bg-slate-900/60 border-b border-white/5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-sm">
              {(userProfile?.displayName || currentUser?.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {userProfile?.displayName || 'User Profile'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {currentUser?.email}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 border border-white/5 text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => {
                onClose();
                openMyBookingsModal();
              }}
              className="p-3 rounded-lg bg-slate-900/60 border border-white/5 hover:border-blue-500/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px]">Active Bookings</span>
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <p className="text-lg font-bold text-white">{bookings.length}</p>
              <span className="text-[10px] text-blue-400">Manage sessions →</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px]">Bookmarked AI Models</span>
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-lg font-bold text-white">{userProfile?.savedToolIds?.length || 0}</p>
              <span className="text-[10px] text-slate-400">Saved in Firestore</span>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSave} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Account Information
              </h3>
              {savedSuccess && (
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Saved to Firestore!
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-slate-400 mb-1 text-[11px]">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 text-[11px]">Role / Discipline</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Researcher"
                  className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 text-[11px]">Company / Organization</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme AI"
                className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>

          {/* Bookmarked AI Models */}
          {savedTools.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-white/5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Bookmarked AI Tools ({savedTools.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {savedTools.map(t => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onClose();
                      openToolModal(t);
                    }}
                    className="p-2.5 rounded bg-slate-900/60 border border-white/5 hover:border-white/10 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-white block">{t.name}</span>
                      <span className="text-[10px] text-slate-400">{t.category}</span>
                    </div>
                    <span className="text-[10px] text-blue-400">View →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sign Out */}
          <div className="pt-3 border-t border-white/5 flex justify-between items-center">
            <span className="text-[11px] text-slate-500">
              User ID: <code className="font-mono text-[10px]">{currentUser?.uid.substring(0, 12)}...</code>
            </span>
            <button
              type="button"
              onClick={async () => {
                onClose();
                await logout();
              }}
              className="px-3 py-1.5 rounded bg-red-950/40 hover:bg-red-950/70 text-red-300 border border-red-900/40 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
