import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Briefcase, 
  Building, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, setGuestMode } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [role, setRole] = useState<string>('AI Researcher / Developer');
  const [company, setCompany] = useState<string>('');
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, displayName, role, company || 'Personal');
        setSuccessMsg('Account created successfully! Welcome to AI space.');
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      let message = 'An error occurred during authentication.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        message = 'Invalid email or password. Please check your credentials or create a new account.';
      } else if (err.code === 'auth/email-already-in-use') {
        message = 'This email is already registered. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password is too weak. Please use at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Could not complete Google authentication.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoAccess = () => {
    setGuestMode(true);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#111111] flex flex-col justify-center items-center px-4 py-12 sm:px-6 relative overflow-hidden">
      {/* Soft atmospheric radial backdrop */}
      <div 
        className="absolute top-0 left-0 right-0 h-[400px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(100% 100% at 50% -10%, rgb(232, 64, 13) 0%, rgb(255, 238, 216) 45%, rgb(208, 178, 255) 80%, rgba(255, 255, 255, 0) 100%)'
        }}
      />

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffffff] border border-[rgba(17,17,17,0.08)] shadow-[rgba(17,17,17,0.04)_0px_2px_6px_0px] text-xs mb-1">
            <span className="w-2 h-2 rounded-full bg-[#e8400d]" />
            <span className="text-[#111111] font-normal">Founded 2026 • Verified Platform</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] text-[#111111]">
              AI space
            </span>
          </div>
          
          <p className="text-xs font-medium text-[#e8400d] tracking-tight">
            Find AI, Trust AI. Be relevent.
          </p>
        </div>

        {/* Auth Card — Amplemarket 12px Radius Feature Card */}
        <div className="bg-[#ffffff] border border-[rgba(17,17,17,0.1)] rounded-[12px] p-6 sm:p-8 shadow-[rgba(17,17,17,0.06)_0px_16px_48px_0px] space-y-5">
          
          {/* Tab switcher */}
          <div className="flex p-1 bg-[#f6f5f3] rounded-[8px] text-xs font-normal">
            <button
              id="tab-sign-in-btn"
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError(null);
              }}
              className={`flex-1 py-2 rounded-[6px] transition-all text-xs ${
                !isSignUp
                  ? 'bg-[#111111] text-[#ffffff] font-medium shadow-none'
                  : 'text-[#6d6c6b] hover:text-[#111111]'
              }`}
            >
              Sign In
            </button>
            <button
              id="tab-sign-up-btn"
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError(null);
              }}
              className={`flex-1 py-2 rounded-[6px] transition-all text-xs ${
                isSignUp
                  ? 'bg-[#111111] text-[#ffffff] font-medium shadow-none'
                  : 'text-[#6d6c6b] hover:text-[#111111]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error / Success feedback */}
          {error && (
            <div className="p-3.5 rounded-[8px] bg-[#fff5f5] border border-[#fecaca] text-[#b91c1c] text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#b91c1c]" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-[8px] bg-[#f0fdf4] border border-[#bbf7d0] text-[#15803d] text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#15803d]" />
              <span className="leading-snug">{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {isSignUp && (
              <>
                <div>
                  <label className="block text-[#6d6c6b] mb-1.5 text-xs">Full Name *</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[#b1b1af] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="signup-name-input"
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Dr. Alex Morgan"
                      className="w-full bg-[#ffffff] text-[#111111] pl-9 pr-3 py-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">Your Role / Field</label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-[#b1b1af] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="signup-role-input"
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Agronomist, Founder"
                        className="w-full bg-[#ffffff] text-[#111111] pl-9 pr-3 py-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">Organization (Optional)</label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-[#b1b1af] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="signup-company-input"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Stanford / AgriCorp"
                        className="w-full bg-[#ffffff] text-[#111111] pl-9 pr-3 py-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-[#6d6c6b] mb-1.5 text-xs">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#b1b1af] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="auth-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#ffffff] text-[#111111] pl-9 pr-3 py-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#6d6c6b] mb-1.5 text-xs">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#b1b1af] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="auth-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#ffffff] text-[#111111] pl-9 pr-9 py-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6d6c6b] hover:text-[#111111] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-[#6d6c6b]" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-[#6d6c6b] mb-1.5 text-xs">Confirm Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#b1b1af] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="signup-confirm-password-input"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#ffffff] text-[#111111] pl-9 pr-3 py-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Submit Button: 8px Border Radius */}
            <button
              id="auth-submit-btn"
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 rounded-[8px] bg-[#111111] hover:bg-[#272625] disabled:opacity-50 text-[#ffffff] font-medium text-xs flex items-center justify-center gap-2 transition-colors mt-2"
            >
              <span>{submitting ? 'Processing...' : isSignUp ? 'Create AI space Account' : 'Sign In to AI space'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ffffff]" />
            </button>
          </form>

          {/* Social Auth Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[rgba(17,17,17,0.08)]"></div>
            <span className="flex-shrink mx-3 text-[10px] uppercase font-mono text-[#6d6c6b]">Or continue with</span>
            <div className="flex-grow border-t border-[rgba(17,17,17,0.08)]"></div>
          </div>

          {/* Google Sign In: 8px Border Radius */}
          <button
            id="google-signin-btn"
            type="button"
            onClick={handleGoogleSignIn}
            disabled={submitting}
            className="w-full py-2.5 px-4 rounded-[8px] bg-[#ffffff] hover:bg-[#f6f5f3] border border-[rgba(17,17,17,0.12)] text-[#111111] text-xs font-normal flex items-center justify-center gap-2.5 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google Account</span>
          </button>

          {/* Guest / Demo preview link */}
          <div className="pt-2 text-center border-t border-[rgba(17,17,17,0.08)]">
            <button
              id="guest-preview-btn"
              type="button"
              onClick={handleDemoAccess}
              className="text-[11px] text-[#6d6c6b] hover:text-[#111111] transition-colors inline-flex items-center gap-1.5"
            >
              <span>Explore AI space in Guest Preview mode</span>
              <ArrowRight className="w-3 h-3 text-[#e8400d]" />
            </button>
          </div>
        </div>

        {/* Footer features */}
        <div className="grid grid-cols-3 gap-3 text-center text-[10px] text-[#6d6c6b] font-mono pt-2">
          <div className="flex flex-col items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#e8400d]" />
            <span>Firebase Secure Auth</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Zap className="w-4 h-4 text-[#e8400d]" />
            <span>AI Demo Bookings</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Sparkles className="w-4 h-4 text-[#e8400d]" />
            <span>Verified AI Profiles</span>
          </div>
        </div>
      </div>
    </div>
  );
};
