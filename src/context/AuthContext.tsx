import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  authError: string | null;
  isGuest: boolean;
  setGuestMode: (enabled: boolean) => void;
  retryAuth: () => void;
  clearAuthError: () => void;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, displayName: string, role?: string, company?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfileData: (data: Partial<UserProfile>) => Promise<void>;
  toggleFavoriteTool: (toolId: string) => Promise<void>;
  isFavorite: (toolId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('aispace_force_guest') === 'true';
    } catch {
      return false;
    }
  });
  const [authAttempt, setAuthAttempt] = useState<number>(0);

  // Sync user profile from Firestore
  const fetchUserProfile = async (user: User) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        setUserProfile(snap.data() as UserProfile);
      } else {
        // Create initial profile in Firestore
        const newProfile: UserProfile = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || user.email?.split('@')[0] || 'AI Explorer',
          photoURL: user.photoURL || undefined,
          role: 'AI Researcher / User',
          company: 'Independent',
          createdAt: new Date().toISOString(),
          savedToolIds: ['chatgpt', 'claude', 'google-gemini'],
        };
        await setDoc(userRef, newProfile);
        setUserProfile(newProfile);
      }
    } catch (err) {
      console.warn('Firestore user fetch notice (using fallback profile):', err);
      // Fallback local profile if Firestore rule or network takes a moment
      setUserProfile({
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || user.email?.split('@')[0] || 'AI Explorer',
        photoURL: user.photoURL || undefined,
        role: 'AI Researcher / User',
        company: 'Independent',
        createdAt: new Date().toISOString(),
        savedToolIds: ['chatgpt', 'claude', 'google-gemini'],
      });
    }
  };

  useEffect(() => {
    let resolved = false;
    setLoading(true);
    setAuthError(null);

    // If session forced guest, we can immediately release loading
    try {
      if (sessionStorage.getItem('aispace_force_guest') === 'true') {
        setIsGuest(true);
        setLoading(false);
        return;
      }
    } catch {}

    // 6.5s timeout watchdog so the user is NEVER stuck on an infinite loading screen
    const timeoutId = setTimeout(() => {
      if (!resolved) {
        console.warn('Authentication service connection timed out.');
        setAuthError('Connection to authentication services timed out. The server or network took too long to respond. You can retry the connection or launch immediately in Guest Mode.');
        setLoading(false);
      }
    }, 6500);

    let unsubscribe: () => void = () => {};
    try {
      unsubscribe = onAuthStateChanged(
        auth,
        async (user) => {
          resolved = true;
          clearTimeout(timeoutId);
          setCurrentUser(user);
          if (user) {
            setIsGuest(false);
            try {
              await fetchUserProfile(user);
            } catch (err) {
              console.warn('User profile sync notice:', err);
            }
          } else {
            setUserProfile(null);
          }
          setLoading(false);
        },
        (error) => {
          resolved = true;
          clearTimeout(timeoutId);
          console.error('Firebase onAuthStateChanged error:', error);
          setAuthError(`Authentication service error: ${error.message || 'Unable to communicate with auth provider.'}`);
          setLoading(false);
        }
      );
    } catch (err: any) {
      resolved = true;
      clearTimeout(timeoutId);
      console.error('Firebase onAuthStateChanged setup error:', err);
      setAuthError(`Authentication initialization error: ${err?.message || 'Could not connect to service.'}`);
      setLoading(false);
    }

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, [authAttempt]);

  const retryAuth = () => {
    setAuthError(null);
    setLoading(true);
    setAuthAttempt(prev => prev + 1);
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
      await fetchUserProfile(cred.user);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (
    email: string, 
    pass: string, 
    displayName: string, 
    role = 'AI Explorer', 
    company = 'Personal'
  ) => {
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      if (displayName) {
        await updateProfile(cred.user, { displayName });
      }
      const newProfile: UserProfile = {
        uid: cred.user.uid,
        email: cred.user.email || '',
        displayName: displayName || email.split('@')[0],
        role,
        company,
        createdAt: new Date().toISOString(),
        savedToolIds: ['chatgpt', 'claude', 'google-gemini'],
      };
      
      try {
        const userRef = doc(db, 'users', cred.user.uid);
        await setDoc(userRef, newProfile);
      } catch (e) {
        console.warn('Firestore write notice during signup:', e);
      }
      setUserProfile(newProfile);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      await fetchUserProfile(cred.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserProfile(null);
      setIsGuest(false);
    } finally {
      setLoading(false);
    }
  };

  const updateProfileData = async (data: Partial<UserProfile>) => {
    if (!currentUser || !userProfile) return;
    const updated = { ...userProfile, ...data };
    setUserProfile(updated);

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, data);
    } catch (e) {
      console.warn('Could not persist profile update to Firestore:', e);
    }
  };

  const toggleFavoriteTool = async (toolId: string) => {
    if (!userProfile) return;
    const currentFavs = userProfile.savedToolIds || [];
    const newFavs = currentFavs.includes(toolId)
      ? currentFavs.filter(id => id !== toolId)
      : [...currentFavs, toolId];

    await updateProfileData({ savedToolIds: newFavs });
  };

  const isFavorite = (toolId: string) => {
    return userProfile?.savedToolIds?.includes(toolId) ?? false;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        authError,
        isGuest,
        setGuestMode: setIsGuest,
        retryAuth,
        clearAuthError,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        logout,
        updateProfileData,
        toggleFavoriteTool,
        isFavorite
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
