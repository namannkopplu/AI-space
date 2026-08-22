import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { AIAppProvider } from './context/AIAppContext';
import { AuthScreen } from './components/AuthScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { AIDirectory } from './components/AIDirectory';
import { AICompareMatrix } from './components/AICompareMatrix';
import { AIRecommender } from './components/AIRecommender';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutUsSection } from './components/AboutUsSection';
import { Footer } from './components/Footer';
import { AIDetailModal } from './components/AIDetailModal';
import { AIRegistrationModal } from './components/AIRegistrationModal';
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentUser, isGuest, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050b18] text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center animate-pulse text-blue-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white tracking-tight">
              AI <span className="text-blue-400">space</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">Connecting to Firebase...</p>
          </div>
        </div>
      </div>
    );
  }

  // If user is not authenticated and not using guest preview, require Sign In / Sign Up
  if (!currentUser && !isGuest) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section with Search and Brand Identity */}
        <Hero />

        {/* Sticky Category Filter */}
        <CategoryFilter />

        {/* AI Directory / Explore Section */}
        <AIDirectory />

        {/* 3-AI Matrix Comparison Engine */}
        <AICompareMatrix />

        {/* AI Recommender Engine */}
        <AIRecommender />

        {/* Customer & User Reviews Section */}
        <ReviewsSection />

        {/* About Us & Contact Section */}
        <AboutUsSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Modals */}
      <AIDetailModal />
      <AIRegistrationModal />
      <BookingModal />
      <MyBookingsModal />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <AIAppProvider>
          <AppContent />
        </AIAppProvider>
      </BookingProvider>
    </AuthProvider>
  );
}

