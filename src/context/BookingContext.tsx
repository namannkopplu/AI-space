import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc,
  orderBy 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { AIBooking, AITool, SessionType } from '../types';

interface BookingContextType {
  bookings: AIBooking[];
  loadingBookings: boolean;
  isBookingModalOpen: boolean;
  selectedToolForBooking: AITool | null;
  openBookingModal: (tool?: AITool | null) => void;
  closeBookingModal: () => void;
  isMyBookingsModalOpen: boolean;
  openMyBookingsModal: () => void;
  closeMyBookingsModal: () => void;
  createBooking: (
    toolId: string,
    toolName: string,
    toolCategory: string,
    sessionType: SessionType,
    scheduledDate: string,
    scheduledTime: string,
    durationMinutes: number,
    notes?: string
  ) => Promise<AIBooking>;
  cancelBooking: (bookingId: string) => Promise<void>;
  rescheduleBooking: (bookingId: string, newDate: string, newTime: string) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const LOCAL_BOOKINGS_KEY = 'aispace_user_bookings_backup_2026';

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, userProfile } = useAuth();
  const [bookings, setBookings] = useState<AIBooking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [selectedToolForBooking, setSelectedToolForBooking] = useState<AITool | null>(null);
  const [isMyBookingsModalOpen, setIsMyBookingsModalOpen] = useState<boolean>(false);

  // Sync real-time bookings from Firestore
  useEffect(() => {
    if (!currentUser) {
      setBookings([]);
      return;
    }

    setLoadingBookings(true);
    let unsubscribe: () => void = () => {};

    try {
      const bookingsRef = collection(db, 'bookings');
      const q = query(
        bookingsRef,
        where('userId', '==', currentUser.uid)
      );

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list: AIBooking[] = [];
          snapshot.forEach((docSnap) => {
            list.push({
              id: docSnap.id,
              ...(docSnap.data() as Omit<AIBooking, 'id'>)
            });
          });

          // Sort by scheduledDate ascending
          list.sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
          setBookings(list);
          setLoadingBookings(false);

          // backup to localStorage
          try {
            localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(list));
          } catch {}
        },
        (error) => {
          console.warn('Firestore bookings subscription notice (using local cache):', error);
          // Fallback to local storage if indexing or security rules are propagating
          try {
            const cached = localStorage.getItem(LOCAL_BOOKINGS_KEY);
            if (cached) {
              setBookings(JSON.parse(cached));
            }
          } catch {}
          setLoadingBookings(false);
        }
      );
    } catch (err) {
      console.warn('Error setting up Firestore bookings listener:', err);
      setLoadingBookings(false);
    }

    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  const openBookingModal = (tool: AITool | null = null) => {
    setSelectedToolForBooking(tool);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setSelectedToolForBooking(null);
    setIsBookingModalOpen(false);
  };

  const openMyBookingsModal = () => {
    setIsMyBookingsModalOpen(true);
  };

  const closeMyBookingsModal = () => {
    setIsMyBookingsModalOpen(false);
  };

  const createBooking = async (
    toolId: string,
    toolName: string,
    toolCategory: string,
    sessionType: SessionType,
    scheduledDate: string,
    scheduledTime: string,
    durationMinutes: number,
    notes = ''
  ): Promise<AIBooking> => {
    const userId = currentUser?.uid || 'guest-user';
    const userEmail = currentUser?.email || 'explorer@aispace.app';
    const userName = userProfile?.displayName || currentUser?.displayName || 'AI Space Explorer';
    
    // Generate meeting code
    const meetingCode = `ais-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`;
    const meetingLink = `https://meet.google.com/${meetingCode}`;

    const newBookingData: Omit<AIBooking, 'id'> = {
      userId,
      userEmail,
      userName,
      toolId,
      toolName,
      toolCategory,
      sessionType,
      scheduledDate,
      scheduledTime,
      durationMinutes,
      status: 'confirmed',
      notes,
      meetingLink,
      createdAt: new Date().toISOString()
    };

    let bookingId = `book-${Date.now()}`;

    try {
      const docRef = await addDoc(collection(db, 'bookings'), newBookingData);
      bookingId = docRef.id;
    } catch (e) {
      console.warn('Firestore booking write notice (saving locally):', e);
    }

    const completeBooking: AIBooking = {
      id: bookingId,
      ...newBookingData
    };

    setBookings((prev) => {
      const updated = [...prev, completeBooking];
      try {
        localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    return completeBooking;
  };

  const cancelBooking = async (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );

    try {
      const bRef = doc(db, 'bookings', bookingId);
      await updateDoc(bRef, { status: 'cancelled' });
    } catch (e) {
      console.warn('Firestore cancel booking notice:', e);
    }
  };

  const rescheduleBooking = async (bookingId: string, newDate: string, newTime: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, scheduledDate: newDate, scheduledTime: newTime } : b))
    );

    try {
      const bRef = doc(db, 'bookings', bookingId);
      await updateDoc(bRef, { scheduledDate: newDate, scheduledTime: newTime });
    } catch (e) {
      console.warn('Firestore reschedule booking notice:', e);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loadingBookings,
        isBookingModalOpen,
        selectedToolForBooking,
        openBookingModal,
        closeBookingModal,
        isMyBookingsModalOpen,
        openMyBookingsModal,
        closeMyBookingsModal,
        createBooking,
        cancelBooking,
        rescheduleBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
