import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { AIAppProvider } from './context/AIAppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorPage } from './components/ErrorPage';
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
import { Sparkles, AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentUser, isGuest, loading, authError, retryAuth, setGuestMode } = useAuth();
  const [loadingDuration, setLoadingDuration] = useState<number>(0);
  const [manualErrorTrigger, setManualErrorTrigger] = useState<string | null>(null);

  // Measure loading duration to provide graceful escape hatches
  useEffect(() => {
    if (!loading) {
      setLoadingDuration(0);
      return;
    }

    const interval = setInterval(() => {
      setLoadingDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);

  // If a problem or auth error occurred, show the Error Page immediately instead of loading forever
  if (authError || manualErrorTrigger) {
    return (
      <ErrorPage
        error={manualErrorTrigger || authError}
        title="Application Connection Alert"
        description="The application encountered an issue communicating with cloud authentication or network services. Instead of leaving you waiting, you can retry or continue in Guest Mode immediately."
        onRetry={() => {
          setManualErrorTrigger(null);
          retryAuth();
        }}
        onContinueAsGuest={() => {
          setManualErrorTrigger(null);
          setGuestMode(true);
        }}
      />
    );
  }

  // Active Loading State with graceful recovery if it takes more than 3 seconds
  if (loading) {
    return (
      <div className="min-h-screen bg-[#ffffff] text-[#111111] flex flex-col items-center justify-center p-4 selection:bg-[#ffd7f0] selection:text-[#111111]">
        <div className="flex flex-col items-center gap-4 max-w-sm text-center">
          <div className="w-12 h-12 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.08)] flex items-center justify-center animate-pulse text-[#e8400d]">
            <Sparkles className="w-5 h-5" />
          </div>
          
          <div>
            <h1 className="text-2xl font-normal text-[#111111] tracking-tight">
              AI <span className="text-[#e8400d]">space</span>
            </h1>
            <p className="text-xs text-[#6d6c6b] mt-1 font-mono tracking-tight">
              {loadingDuration < 3 
                ? "Syncing vault ledger..." 
                : "Synchronizing services (taking longer than expected)..."}
            </p>
          </div>

          {/* Graceful escape hatch if loading exceeds 3 seconds */}
          {loadingDuration >= 3 && (
            <div className="mt-2 p-3.5 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.1)] space-y-2 text-xs w-full animate-fadeIn">
              <p className="text-[11px] text-[#6d6c6b]">
                Connection is taking extra time. You can skip the wait or report a diagnostic error:
              </p>
              <div className="flex flex-col gap-1.5 pt-1">
                <button
                  onClick={() => setGuestMode(true)}
                  className="w-full py-2 px-3 rounded-[6px] bg-[#111111] hover:bg-[#272625] text-[#ffffff] font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#ffd7f0]" />
                  <span>Launch in Guest Mode</span>
                </button>
                <button
                  onClick={() => setManualErrorTrigger("Loading timeout: Network request or authentication ledger took longer than expected to respond.")}
                  className="w-full py-1.5 px-3 rounded-[6px] bg-[#ffffff] hover:bg-[#fee2e2] text-[#b91c1c] border border-[rgba(17,17,17,0.1)] text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <AlertTriangle className="w-3 h-3" />
                  <span>View Diagnostic Error Page</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // If user is not authenticated and not using guest preview, require Sign In / Sign Up
  if (!currentUser && !isGuest) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#111111] flex flex-col font-sans selection:bg-[#ffd7f0] selection:text-[#111111]">
      
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

        {/* 3-AI Matrix Comparison Engine (Preserving comparison user flow and slots) */}
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
    <ErrorBoundary>
      <AuthProvider>
        <BookingProvider>
          <AIAppProvider>
            <ErrorBoundary>
              <AppContent />
            </ErrorBoundary>
          </AIAppProvider>
        </BookingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

