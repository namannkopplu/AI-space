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
  isGuest: boolean;
  setGuestMode: (enabled: boolean) => void;
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
  const [isGuest, setIsGuest] = useState<boolean>(false);

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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setIsGuest(false);
        await fetchUserProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
        isGuest,
        setGuestMode: setIsGuest,
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
