import React, { createContext, useContext, useState, useEffect } from 'react';
import { AITool, UserReview, NewAIRegistrationInput, AICategory } from '../types';
import { INITIAL_AI_TOOLS } from '../data/aiToolsData';

interface AIAppContextType {
  tools: AITool[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  
  // Comparison (up to 3)
  compareList: AITool[];
  addToCompare: (tool: AITool) => boolean; // returns true if added, false if already 3 or present
  removeFromCompare: (toolId: string) => void;
  clearCompare: () => void;
  setCompareSlot: (slotIndex: 0 | 1 | 2, tool: AITool | null) => void;
  isCompared: (toolId: string) => boolean;

  // Selected tool modal
  activeToolModal: AITool | null;
  openToolModal: (tool: AITool) => void;
  closeToolModal: () => void;

  // Registration modal
  isRegisterModalOpen: boolean;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  registerNewAI: (input: NewAIRegistrationInput) => { success: boolean; tool: AITool };

  // Reviews
  addUserReview: (toolId: string, review: Omit<UserReview, 'id' | 'date'>) => void;

  // Navigation target
  activeSection: string;
  setActiveSection: (sec: string) => void;
  scrollToSection: (sectionId: string) => void;
}

const AIAppContext = createContext<AIAppContextType | undefined>(undefined);

const REGISTERED_STORAGE_KEY = 'aispace_registered_innovations_2026';
const REVIEWS_STORAGE_KEY = 'aispace_user_reviews_2026';

export const AIAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tools, setTools] = useState<AITool[]>(INITIAL_AI_TOOLS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Initialize comparison with 3 prominent tools from different categories
  const [compareList, setCompareList] = useState<AITool[]>(() => {
    const initialCompare = [
      INITIAL_AI_TOOLS.find(t => t.id === 'chatgpt') || INITIAL_AI_TOOLS[0],
      INITIAL_AI_TOOLS.find(t => t.id === 'google-gemini') || INITIAL_AI_TOOLS[1],
      INITIAL_AI_TOOLS.find(t => t.id === 'claude') || INITIAL_AI_TOOLS[2]
    ].filter(Boolean) as AITool[];
    return initialCompare.slice(0, 3);
  });

  const [activeToolModal, setActiveToolModal] = useState<AITool | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Load registered tools and reviews from localStorage on mount
  useEffect(() => {
    try {
      const savedInnovations = localStorage.getItem(REGISTERED_STORAGE_KEY);
      const savedReviews = localStorage.getItem(REVIEWS_STORAGE_KEY);

      let registeredTools: AITool[] = [];
      if (savedInnovations) {
        registeredTools = JSON.parse(savedInnovations);
      }

      let extraReviews: Record<string, UserReview[]> = {};
      if (savedReviews) {
        extraReviews = JSON.parse(savedReviews);
      }

      // Merge base + registered + extra reviews
      const merged = [...INITIAL_AI_TOOLS, ...registeredTools].map(t => {
        if (extraReviews[t.id]) {
          const combinedReviews = [...extraReviews[t.id], ...t.reviews];
          const avgRating = combinedReviews.reduce((sum, r) => sum + r.rating, 0) / combinedReviews.length;
          return {
            ...t,
            reviews: combinedReviews,
            rating: Number(avgRating.toFixed(1)),
            reviewCount: t.reviewCount + extraReviews[t.id].length
          };
        }
        return t;
      });

      setTools(merged);
    } catch (e) {
      console.warn('Could not load local storage:', e);
    }
  }, []);

  const addToCompare = (tool: AITool): boolean => {
    if (compareList.some(t => t.id === tool.id)) {
      return false;
    }
    if (compareList.length >= 3) {
      // replace the last one or alert
      return false;
    }
    setCompareList(prev => [...prev, tool]);
    return true;
  };

  const removeFromCompare = (toolId: string) => {
    setCompareList(prev => prev.filter(t => t.id !== toolId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const setCompareSlot = (slotIndex: 0 | 1 | 2, tool: AITool | null) => {
    setCompareList(prev => {
      const copy = [...prev];
      while (copy.length <= slotIndex) {
        copy.push(INITIAL_AI_TOOLS[0]);
      }
      if (tool) {
        copy[slotIndex] = tool;
      } else {
        copy.splice(slotIndex, 1);
      }
      return copy.filter(Boolean).slice(0, 3);
    });
  };

  const isCompared = (toolId: string) => {
    return compareList.some(t => t.id === toolId);
  };

  const openToolModal = (tool: AITool) => {
    setActiveToolModal(tool);
  };

  const closeToolModal = () => {
    setActiveToolModal(null);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const registerNewAI = (input: NewAIRegistrationInput) => {
    const slug = input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `registered-${slug}-${Date.now()}`;

    const workItems = input.workItDoes
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const strengthsList = input.strengths
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const weaknessesList = input.weaknesses
      ? input.weaknesses.split('\n').map(s => s.trim()).filter(s => s.length > 0)
      : ['Rapid development cycle in progress'];

    const platformList = input.platforms
      ? input.platforms.split(',').map(s => s.trim()).filter(s => s.length > 0)
      : ['Web Portal', 'API Access'];

    const newTool: AITool = {
      id,
      name: input.name,
      slug,
      category: input.category,
      tagline: input.tagline,
      description: input.description,
      workItDoes: workItems.length > 0 ? workItems : [input.workItDoes],
      pricing: {
        model: input.pricingModel,
        freeTier: input.freeTier || 'Free access available',
        startingPrice: input.startingPrice || 'Contact for pricing',
        proTier: input.proTier || 'Professional Tier Available'
      },
      url: input.url.startsWith('http') ? input.url : `https://${input.url}`,
      rating: 5.0,
      reviewCount: 1,
      reviews: [
        {
          id: `rev-${id}-init`,
          author: `${input.companyName} Team`,
          role: 'Verified Creator',
          rating: 5,
          date: '2026-08-22',
          comment: `Officially registered on AI space! Verified innovative solution for ${input.category.toLowerCase()}.`,
          verified: true
        }
      ],
      strengths: strengthsList.length > 0 ? strengthsList : ['Newly registered cutting-edge AI architecture'],
      weaknesses: weaknessesList,
      bestFor: input.bestFor || 'Businesses and power users looking for state-of-the-art AI',
      platforms: platformList,
      verified: true,
      isCommunityRegistered: true,
      companyName: input.companyName,
      releaseYear: 2026,
      badge: '2026 Innovation',
      colorTheme: {
        accent: '#38bdf8',
        border: 'border-sky-400/40',
        bgGlow: 'from-sky-500/20'
      }
    };

    // Update state
    setTools(prev => [newTool, ...prev]);

    // Save to localStorage
    try {
      const saved = localStorage.getItem(REGISTERED_STORAGE_KEY);
      const list = saved ? JSON.parse(saved) : [];
      localStorage.setItem(REGISTERED_STORAGE_KEY, JSON.stringify([newTool, ...list]));
    } catch (e) {
      console.error('Error saving registered tool:', e);
    }

    return { success: true, tool: newTool };
  };

  const addUserReview = (toolId: string, review: Omit<UserReview, 'id' | 'date'>) => {
    const newRev: UserReview = {
      ...review,
      id: `rev-user-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      verified: true
    };

    setTools(prev =>
      prev.map(t => {
        if (t.id === toolId) {
          const updatedReviews = [newRev, ...t.reviews];
          const newAvg = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
          const updatedTool = {
            ...t,
            reviews: updatedReviews,
            rating: Number(newAvg.toFixed(1)),
            reviewCount: t.reviewCount + 1
          };

          if (activeToolModal && activeToolModal.id === toolId) {
            setActiveToolModal(updatedTool);
          }
          return updatedTool;
        }
        return t;
      })
    );

    // Save to localStorage
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      const dict = saved ? JSON.parse(saved) : {};
      dict[toolId] = [newRev, ...(dict[toolId] || [])];
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(dict));
    } catch (e) {
      console.error('Error saving user review:', e);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AIAppContext.Provider
      value={{
        tools,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        setCompareSlot,
        isCompared,
        activeToolModal,
        openToolModal,
        closeToolModal,
        isRegisterModalOpen,
        openRegisterModal,
        closeRegisterModal,
        registerNewAI,
        addUserReview,
        activeSection,
        setActiveSection,
        scrollToSection
      }}
    >
      {children}
    </AIAppContext.Provider>
  );
};

export const useAIApp = () => {
  const context = useContext(AIAppContext);
  if (!context) {
    throw new Error('useAIApp must be used within an AIAppProvider');
  }
  return context;
};
