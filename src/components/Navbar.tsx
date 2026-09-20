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
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'explore', label: 'Catalog', icon: Layers },
    { id: 'compare', label: 'Compare', icon: Scale, count: compareList.length > 0 ? compareList.length : undefined },
    { id: 'recommender', label: 'Advisor', icon: Sparkles },
    { id: 'reviews', label: 'Reviews', icon: MessageSquareQuote },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#ffffff]/90 backdrop-blur-md border-b border-[rgba(17,17,17,0.08)] shadow-[rgba(17,17,17,0.03)_0px_2px_8px_0px]'
            : 'bg-[#ffffff] border-b border-[rgba(17,17,17,0.08)]'
        }`}
      >
        {/* Top Banner Announcement — Amplemarket Cream Wash */}
        <div className="bg-[#f6f5f3] border-b border-[rgba(17,17,17,0.06)] py-1.5 px-4 text-xs text-[#6d6c6b]">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffffff] text-[#111111] border border-[rgba(17,17,17,0.08)] text-[11px] font-medium tracking-tight">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8400d]" /> Founded 2026
              </span>
              <span className="hidden sm:inline text-[#b1b1af]">•</span>
              <span className="text-[#111111] font-sans tracking-tight text-[11px] font-normal">
                &ldquo;Find AI, Trust AI. Be relevent.&rdquo;
              </span>
            </div>

            <div className="flex items-center gap-4 text-[#6d6c6b] text-xs">
              <a
                href="tel:9876543210"
                className="hover:text-[#111111] transition-colors hidden md:flex items-center gap-1.5 text-[11px]"
              >
                <Phone className="w-3 h-3 text-[#6d6c6b]" />
                <span>9876543210</span>
              </a>
              <a
                href="mailto:AIspace283@gmail.com"
                className="hover:text-[#111111] transition-colors hidden sm:flex items-center gap-1.5 text-[11px]"
              >
                <Mail className="w-3 h-3 text-[#6d6c6b]" />
                <span>AIspace283@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar — 62px height, 1200px max width */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[62px] gap-4">
            
            {/* Logo Lockup: Amplemarket White Pill Badge with Phoenix Orange Mark */}
            <button
              id="brand-logo-btn"
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 text-left group shrink-0 focus:outline-none"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[8px] bg-[#111111] text-[#ffffff] flex items-center justify-center font-bold text-xs shadow-sm group-hover:bg-[#e8400d] transition-colors">
                  AI
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-bold tracking-tight text-[#111111]">
                      AI space
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded-full bg-[#ecebea] text-[#111111]">
                      2026
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#6d6c6b] font-normal">
                    Verified Intelligence
                  </span>
                </div>
              </div>
            </button>

            {/* Quick Search Field in Navbar */}
            <div className="hidden lg:flex flex-1 max-w-sm mx-4">
              <div className="relative w-full">
                <input
                  id="navbar-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalog (ChatGPT, Claude, Agri AI...)"
                  className="w-full bg-[#ffffff] border border-[rgba(17,17,17,0.1)] rounded-[12px] py-1.5 pl-4 pr-9 text-xs text-[#111111] placeholder-[#6d6c6b] focus:outline-none focus:border-[#111111] transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                  {searchQuery ? (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-[#6d6c6b] hover:text-[#111111]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <Search className="w-3.5 h-3.5 text-[#6d6c6b]" />
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Nav Links: 400 weight, calm restrained aesthetic */}
            <nav className="hidden xl:flex items-center gap-6 text-sm font-normal text-[#6d6c6b]">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-1.5 transition-colors py-1 relative ${
                      isActive
                        ? 'text-[#111111] font-medium after:content-[\'\'] after:absolute after:-bottom-[19px] after:left-0 after:right-0 after:h-[2px] after:bg-[#e8400d]'
                        : 'hover:text-[#111111]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.count !== undefined && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#ecebea] text-[#111111] font-mono">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Stack: Buttons with 8px radius */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Neutral Filled Button: Pearl #ecebea */}
              <button
                id="navbar-book-demo-btn"
                onClick={() => openBookingModal(null)}
                className="hidden md:flex px-3.5 py-2 rounded-[8px] text-xs font-normal text-[#111111] bg-[#ecebea] hover:bg-[#e2e1df] transition-colors items-center gap-1.5"
                title="Book an AI consultation or live walkthrough"
              >
                <Calendar className="w-3.5 h-3.5 text-[#e8400d]" />
                <span>Book Demo</span>
              </button>

              {/* My Bookings Pill */}
              <button
                id="navbar-my-bookings-btn"
                onClick={openMyBookingsModal}
                className="px-3 py-2 rounded-[8px] text-xs font-normal text-[#111111] bg-[#ffffff] hover:bg-[#f6f5f3] border border-[rgba(17,17,17,0.1)] transition-colors flex items-center gap-1.5"
                title="View your scheduled sessions"
              >
                <Calendar className="w-3.5 h-3.5 text-[#6d6c6b]" />
                <span className="hidden sm:inline">Bookings</span>
                {bookings.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-[#e8400d] text-[#ffffff] text-[10px] font-semibold font-mono">
                    {bookings.length}
                  </span>
                )}
              </button>

              {/* Primary Action Button: #111111 (Ink) fill, #ffffff text, 8px radius */}
              <button
                id="open-register-modal-btn"
                onClick={openRegisterModal}
                className="hidden lg:flex px-4 py-2 rounded-[8px] text-xs font-medium text-[#ffffff] bg-[#111111] hover:bg-[#272625] transition-all shadow-none items-center gap-1.5 active:scale-98"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#ffffff]" />
                <span>Register AI</span>
              </button>

              {/* User Profile Button */}
              <button
                id="navbar-user-profile-btn"
                onClick={() => setIsProfileOpen(true)}
                className="p-1.5 rounded-[8px] bg-[#f6f5f3] hover:bg-[#ecebea] border border-[rgba(17,17,17,0.08)] text-[#6d6c6b] hover:text-[#111111] transition-colors flex items-center gap-1.5"
                title="Account Settings"
              >
                <div className="w-6 h-6 rounded-full bg-[#111111] text-[#ffffff] flex items-center justify-center font-bold text-[11px]">
                  {(userProfile?.displayName || currentUser?.email || 'U').charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline text-xs font-normal text-[#111111] max-w-[100px] truncate px-1">
                  {userProfile?.displayName || 'Account'}
                </span>
              </button>

              {/* Mobile Menu Trigger */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.08)] text-[#6d6c6b] hover:text-[#111111]"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#ffffff] border-b border-[rgba(17,17,17,0.08)] px-4 pt-3 pb-6 space-y-3">
            {/* Mobile Search */}
            <div className="relative w-full mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI catalog..."
                className="w-full bg-[#f6f5f3] border border-[rgba(17,17,17,0.1)] rounded-[12px] py-2 pl-4 pr-9 text-xs text-[#111111] placeholder-[#6d6c6b] focus:outline-none focus:border-[#111111]"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6d6c6b]" />
            </div>

            {/* Quick Mobile Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="p-2.5 rounded-[8px] bg-[#ecebea] text-[#111111] text-xs font-normal flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#e8400d]" />
                <span>Book AI Demo</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRegisterModal();
                }}
                className="p-2.5 rounded-[8px] bg-[#111111] text-[#ffffff] text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#ffffff]" />
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
                    className={`flex items-center justify-between px-4 py-2.5 rounded-[8px] text-xs font-normal transition-colors ${
                      isActive
                        ? 'bg-[#ecebea] text-[#111111] font-medium'
                        : 'bg-transparent text-[#6d6c6b] hover:text-[#111111]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#e8400d]" />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffffff] text-[#111111] border border-[rgba(17,17,17,0.08)]">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Profile trigger on mobile */}
            <div className="pt-3 border-t border-[rgba(17,17,17,0.08)] flex items-center justify-between text-xs text-[#6d6c6b]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsProfileOpen(true);
                }}
                className="flex items-center gap-2 text-[#111111] hover:text-[#e8400d]"
              >
                <User className="w-3.5 h-3.5 text-[#e8400d]" />
                <span>Signed in as <strong className="text-[#111111]">{userProfile?.displayName || currentUser?.email || 'User'}</strong></span>
              </button>
              <button
                onClick={logout}
                className="text-[#6d6c6b] hover:text-[#111111] flex items-center gap-1 text-[11px]"
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
