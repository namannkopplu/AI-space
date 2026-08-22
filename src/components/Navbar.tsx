import React, { useState, useEffect } from 'react';
import { useAIApp } from '../context/AIAppContext';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { UserProfileModal } from './UserProfileModal';
import {
  Search,
  Scale,
  Sparkles,
  PlusCircle,
  MessageSquareQuote,
  Info,
  Layers,
  Phone,
  Mail,
  X,
  Menu,
  CheckCircle2,
  Calendar,
  User,
  LogOut
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    compareList,
    openRegisterModal,
    scrollToSection,
    activeSection
  } = useAIApp();
  const { currentUser, userProfile, logout, isGuest } = useAuth();
  const { bookings, openMyBookingsModal, openBookingModal } = useBooking();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'explore', label: 'Explore & Categories', icon: Layers },
    { id: 'compare', label: 'Compare (3 AIs)', icon: Scale, count: compareList.length },
    { id: 'recommender', label: 'AI Recommender', icon: Sparkles },
    { id: 'reviews', label: 'User Reviews', icon: MessageSquareQuote },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070e1c]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30'
            : 'bg-[#070e1c] border-b border-white/10'
        }`}
      >
        {/* Top Banner Announcement */}
        <div className="bg-[#050b18] border-b border-white/5 py-1 px-4 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[10px] font-semibold">
                <CheckCircle2 className="w-3 h-3 text-blue-400" /> Founded 2026
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="text-slate-300 tracking-wide text-[11px]">
                &ldquo;Find AI, Trust AI. Be relevent.&rdquo;
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-400 text-xs">
              <a
                href="tel:9876543210"
                className="hover:text-blue-400 transition-colors hidden md:flex items-center gap-1 text-[11px]"
              >
                <Phone className="w-3 h-3 text-blue-400" />
                <span>9876543210</span>
              </a>
              <a
                href="mailto:AIspace283@gmail.com"
                className="hover:text-blue-400 transition-colors hidden sm:flex items-center gap-1 text-[11px]"
              >
                <Mail className="w-3 h-3 text-blue-400" />
                <span>AIspace283@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Logo & Tagline */}
            <button
              id="brand-logo-btn"
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 text-left group shrink-0 focus:outline-none"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-blue-400 group-hover:text-blue-300 transition-colors">
                    AI space
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    2026
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium">
                  Find AI, Trust AI. Be relevent.
                </span>
              </div>
            </button>

            {/* Quick Search in Navbar (Medium/Large Screens) */}
            <div className="hidden lg:flex flex-1 max-w-sm mx-2">
              <div className="relative w-full">
                <input
                  id="navbar-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI catalog (ChatGPT, Claude, Agri AI...)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-full py-1.5 pl-4 pr-9 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all shadow-inner"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                  {searchQuery ? (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden xl:flex items-center gap-4 text-xs font-medium text-slate-400">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-1.5 transition-colors py-1 ${
                      isActive
                        ? 'text-blue-400 font-semibold underline decoration-blue-500 underline-offset-4'
                        : 'hover:text-blue-400'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.count !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                          item.count === 3
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-blue-600/20 text-blue-400'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Stack: Book Demo + My Bookings + Register + User Avatar */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Book Demo Button */}
              <button
                id="navbar-book-demo-btn"
                onClick={() => openBookingModal(null)}
                className="hidden md:flex px-2.5 py-1.5 rounded-md text-xs font-medium text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-colors items-center gap-1"
                title="Book an AI consultation or live walkthrough"
              >
                <Calendar className="w-3 h-3 text-blue-400" />
                <span>Book Demo</span>
              </button>

              {/* My Bookings Pill */}
              <button
                id="navbar-my-bookings-btn"
                onClick={openMyBookingsModal}
                className="px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-white/10 transition-colors flex items-center gap-1.5"
                title="View your scheduled sessions"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Bookings</span>
                {bookings.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                    {bookings.length}
                  </span>
                )}
              </button>

              {/* Register AI CTA */}
              <button
                id="open-register-modal-btn"
                onClick={openRegisterModal}
                className="hidden lg:flex px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm items-center gap-1.5 active:scale-95"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Register AI</span>
              </button>

              {/* User Profile Button */}
              <button
                id="navbar-user-profile-btn"
                onClick={() => setIsProfileOpen(true)}
                className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                title="Account Settings"
              >
                <div className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-[10px]">
                  {(userProfile?.displayName || currentUser?.email || 'U').charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline text-xs font-medium max-w-[100px] truncate">
                  {userProfile?.displayName || 'Account'}
                </span>
              </button>

              {/* Mobile Menu Trigger */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-md bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#070e1c] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
            {/* Mobile Search */}
            <div className="relative w-full mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI catalog..."
                className="w-full bg-slate-900 border border-slate-800 rounded-full py-1.5 pl-4 pr-9 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Quick Mobile Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="p-2 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>Book AI Demo</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRegisterModal();
                }}
                className="p-2 rounded bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Register AI</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3.5 py-2 rounded-md text-xs font-medium ${
                      isActive
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                        : 'bg-slate-900/50 text-slate-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-blue-400" />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-600/20 text-blue-400">
                        {item.count}/3
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Profile trigger on mobile */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsProfileOpen(true);
                }}
                className="flex items-center gap-2 text-slate-300 hover:text-white"
              >
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>Signed in as <strong>{userProfile?.displayName || currentUser?.email || 'User'}</strong></span>
              </button>
              <button
                onClick={logout}
                className="text-red-400 hover:text-red-300 flex items-center gap-1 text-[11px]"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* User Profile Modal */}
      <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};

