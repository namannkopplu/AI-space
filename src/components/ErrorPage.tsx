import React, { useState } from 'react';
import { 
  AlertTriangle, 
  RefreshCw, 
  ArrowRight, 
  RotateCcw, 
  Trash2, 
  Wifi, 
  WifiOff, 
  ChevronDown, 
  ChevronUp, 
  Bug,
  ShieldAlert,
  Home,
  Sparkles
} from 'lucide-react';

export interface ErrorPageProps {
  error?: Error | string | null;
  errorInfo?: React.ErrorInfo | null;
  title?: string;
  description?: string;
  onRetry?: () => void;
  onContinueAsGuest?: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  error,
  errorInfo,
  title = "Application Encountered an Issue",
  description,
  onRetry,
  onContinueAsGuest
}) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  const errorMessage = error instanceof Error 
    ? error.message 
    : typeof error === 'string' 
      ? error 
      : 'An unexpected application error or service communication failure occurred.';

  const errorStack = error instanceof Error ? error.stack : null;
  const componentStack = errorInfo?.componentStack;

  const handleHardReload = () => {
    window.location.reload();
  };

  const handleResetCache = () => {
    try {
      localStorage.removeItem('aispace_registered_innovations_2026');
      localStorage.removeItem('aispace_user_reviews_2026');
      localStorage.removeItem('aispace_user_bookings_backup_2026');
      sessionStorage.clear();
    } catch (e) {
      console.warn('Storage reset notice:', e);
    }
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#111111] flex flex-col justify-between selection:bg-[#ffd7f0] selection:text-[#111111]">
      {/* Soft atmospheric gradient wash matching Amplemarket canvas */}
      <div 
        className="absolute top-0 left-0 right-0 h-[380px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(100% 100% at 50% -10%, rgb(232, 64, 13) 0%, rgb(255, 238, 216) 45%, rgb(208, 178, 255) 80%, rgba(255, 255, 255, 0) 100%)'
        }}
      />

      {/* Top Bar */}
      <header className="relative z-10 border-b border-[rgba(17,17,17,0.08)] bg-[#ffffff]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.08)] flex items-center justify-center text-[#e8400d]">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-base font-normal tracking-tight text-[#111111]">
            AI <strong className="font-semibold text-[#e8400d]">space</strong>
          </span>
          <span className="ml-2 px-2 py-0.5 rounded-[4px] bg-[#fee2e2] text-[#b91c1c] text-[11px] font-mono border border-[#fecaca]">
            System Alert
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#6d6c6b]">
          {isOnline ? (
            <span className="inline-flex items-center gap-1.5 text-[#15803d]">
              <Wifi className="w-3.5 h-3.5" /> Network Online
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[#b91c1c]">
              <WifiOff className="w-3.5 h-3.5" /> Network Offline
            </span>
          )}
        </div>
      </header>

      {/* Main Error Box */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-2xl bg-[#ffffff] border border-[rgba(17,17,17,0.12)] rounded-[12px] shadow-[rgba(17,17,17,0.08)_0px_24px_56px_0px] p-6 sm:p-8 space-y-6">
          
          {/* Badge & Title */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#fff1f2] border border-[#fecdd3] text-[#b91c1c] text-xs font-mono">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Diagnostic Failure Detected</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-normal text-[#111111] tracking-[-0.03em]">
              {title}
            </h1>

            <p className="text-xs sm:text-sm text-[#6d6c6b] font-normal leading-relaxed">
              {description || 
                "The application encountered an issue while loading or processing services. Rather than leaving you on a blank or endless loading screen, you can inspect the diagnostic details below and use immediate recovery controls."}
            </p>
          </div>

          {/* Error Message Card */}
          <div className="p-4 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.08)] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#6d6c6b]">
              <span className="flex items-center gap-1.5 text-[#e8400d] font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" /> Error Notice
              </span>
              <span>Timestamp: {new Date().toLocaleTimeString()}</span>
            </div>
            <p className="text-xs text-[#111111] font-mono break-words bg-[#ffffff] p-3 rounded-[6px] border border-[rgba(17,17,17,0.06)] leading-relaxed">
              {errorMessage}
            </p>
          </div>

          {/* Primary Recovery Actions */}
          <div className="space-y-3 pt-1">
            <span className="text-[11px] font-mono text-[#6d6c6b] uppercase tracking-wider block">
              Recommended Recovery Actions
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {onRetry && (
                <button
                  id="error-retry-btn"
                  onClick={onRetry}
                  className="py-2.5 px-4 rounded-[8px] bg-[#111111] hover:bg-[#272625] text-[#ffffff] font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#ffffff]" />
                  <span>Retry Connection</span>
                </button>
              )}

              {onContinueAsGuest && (
                <button
                  id="error-guest-btn"
                  onClick={onContinueAsGuest}
                  className="py-2.5 px-4 rounded-[8px] bg-[#ffd7f0] hover:bg-[#ffcceb] text-[#111111] font-medium flex items-center justify-center gap-2 transition-colors border border-[#ffd7f0]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#e8400d]" />
                  <span>Launch in Guest Mode</span>
                </button>
              )}

              <button
                id="error-reload-btn"
                onClick={handleHardReload}
                className="py-2.5 px-4 rounded-[8px] bg-[#ffffff] hover:bg-[#f6f5f3] text-[#111111] border border-[rgba(17,17,17,0.12)] font-normal flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#6d6c6b]" />
                <span>Reload Page</span>
              </button>

              <button
                id="error-reset-cache-btn"
                onClick={handleResetCache}
                className="py-2.5 px-4 rounded-[8px] bg-[#ffffff] hover:bg-[#fee2e2] text-[#b91c1c] border border-[rgba(17,17,17,0.12)] hover:border-[#fecaca] font-normal flex items-center justify-center gap-2 transition-colors"
                title="Clears cached local state and reloads cleanly"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Cache & Reset</span>
              </button>
            </div>
          </div>

          {/* Collapsible Technical Details */}
          <div className="pt-2 border-t border-[rgba(17,17,17,0.08)]">
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="w-full flex items-center justify-between text-xs text-[#6d6c6b] hover:text-[#111111] py-1 transition-colors font-mono"
            >
              <span className="flex items-center gap-1.5">
                <Bug className="w-3.5 h-3.5 text-[#e8400d]" />
                <span>Technical Trace & Diagnostics</span>
              </span>
              {showTechnicalDetails ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {showTechnicalDetails && (
              <div className="mt-3 p-3.5 rounded-[8px] bg-[#111111] text-[#f6f5f3] font-mono text-[11px] overflow-x-auto max-h-48 space-y-2">
                <div>
                  <span className="text-[#e8400d]">User Agent:</span> {typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'}
                </div>
                <div>
                  <span className="text-[#e8400d]">URL:</span> {typeof window !== 'undefined' ? window.location.href : 'Unknown'}
                </div>
                {errorStack && (
                  <div>
                    <span className="text-[#e8400d]">Stack:</span>
                    <pre className="mt-1 whitespace-pre-wrap text-[10px] text-[#b1b1af]">
                      {errorStack}
                    </pre>
                  </div>
                )}
                {componentStack && (
                  <div>
                    <span className="text-[#e8400d]">Component Trace:</span>
                    <pre className="mt-1 whitespace-pre-wrap text-[10px] text-[#b1b1af]">
                      {componentStack}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer info */}
      <footer className="relative z-10 border-t border-[rgba(17,17,17,0.08)] px-6 py-4 text-center text-xs text-[#6d6c6b] font-mono">
        <span>AI space Reliability Engine • Verified Platform</span>
      </footer>
    </div>
  );
};
