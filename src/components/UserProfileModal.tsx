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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto text-[#111111]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-[#ffffff] border border-[rgba(17,17,17,0.12)] rounded-[12px] shadow-[rgba(17,17,17,0.16)_0px_24px_64px_0px] overflow-hidden my-6 max-h-[90vh] flex flex-col text-xs">
        
        {/* Header */}
        <div className="p-6 bg-[#f6f5f3] border-b border-[rgba(17,17,17,0.08)] flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[8px] bg-[#ffd7f0] text-[#111111] flex items-center justify-center font-bold text-sm">
              {(userProfile?.displayName || currentUser?.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-normal text-[#111111] tracking-tight">
                {userProfile?.displayName || 'User Profile'}
              </h2>
              <p className="text-[11px] font-mono text-[#6d6c6b]">
                {currentUser?.email}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-[8px] bg-[#ffffff] border border-[rgba(17,17,17,0.1)] text-[#6d6c6b] hover:text-[#111111] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => {
                onClose();
                openMyBookingsModal();
              }}
              className="p-4 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.08)] hover:border-[rgba(17,17,17,0.2)] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between text-[#6d6c6b] mb-1">
                <span className="text-[11px] font-medium">Active Bookings</span>
                <Calendar className="w-3.5 h-3.5 text-[#e8400d]" />
              </div>
              <p className="text-2xl font-normal text-[#111111]">{bookings.length}</p>
              <span className="text-[10px] text-[#e8400d] font-medium">Manage sessions →</span>
            </div>

            <div className="p-4 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.08)]">
              <div className="flex items-center justify-between text-[#6d6c6b] mb-1">
                <span className="text-[11px] font-medium">Bookmarked Tools</span>
                <Bookmark className="w-3.5 h-3.5 text-[#e8400d]" />
              </div>
              <p className="text-2xl font-normal text-[#111111]">{userProfile?.savedToolIds?.length || 0}</p>
              <span className="text-[10px] text-[#6d6c6b]">Saved in Firestore</span>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSave} className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#6d6c6b]">
                Account Information
              </h3>
              {savedSuccess && (
                <span className="text-[11px] text-[#15803d] flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" /> Saved to Firestore!
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#6d6c6b] mb-1.5 text-xs">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] text-xs focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="block text-[#6d6c6b] mb-1.5 text-xs">Role / Discipline</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Researcher"
                  className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] text-xs focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#6d6c6b] mb-1.5 text-xs">Company / Organization</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme AI"
                className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] text-xs focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded-[8px] bg-[#111111] hover:bg-[#272625] text-[#ffffff] font-normal text-xs transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>

          {/* Bookmarked AI Models */}
          {savedTools.length > 0 && (
            <div className="space-y-2.5 pt-3 border-t border-[rgba(17,17,17,0.08)]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#6d6c6b]">
                Bookmarked AI Tools ({savedTools.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {savedTools.map(t => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onClose();
                      openToolModal(t);
                    }}
                    className="p-3 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.08)] hover:border-[rgba(17,17,17,0.2)] flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-xs text-[#111111] block">{t.name}</span>
                      <span className="text-[10px] text-[#6d6c6b]">{t.category}</span>
                    </div>
                    <span className="text-[10px] text-[#e8400d] font-medium">View →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sign Out */}
          <div className="pt-3.5 border-t border-[rgba(17,17,17,0.08)] flex justify-between items-center">
            <span className="text-[11px] font-mono text-[#6d6c6b]">
              UID: <code>{currentUser?.uid.substring(0, 10)}...</code>
            </span>
            <button
              type="button"
              onClick={async () => {
                onClose();
                await logout();
              }}
              className="px-3.5 py-1.5 rounded-[8px] bg-[#fff1f2] hover:bg-[#ffe4e6] text-[#b91c1c] border border-[#fecdd3] text-xs font-normal flex items-center gap-1.5 transition-colors"
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
