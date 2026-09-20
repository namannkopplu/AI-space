export type AICategory = 
  | 'Education' 
  | 'Agriculture' 
  | 'Image Generator' 
  | 'Video Generation' 
  | 'Chat Bot'
  | 'Registered Innovation';

export interface UserReview {
  id: string;
  author: string;
  role: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  pros?: string;
  cons?: string;
  verified?: boolean;
}

export interface AIPricingDetails {
  model: 'Free' | 'Freemium' | 'Subscription' | 'Usage-based' | 'Commercial' | 'Open Weights / Hosted';
  freeTier: string;
  startingPrice: string;
  proTier?: string;
  enterprise?: string;
}

export interface AITool {
  id: string;
  name: string;
  slug: string;
  category: AICategory;
  secondaryCategories?: AICategory[];
  tagline: string;
  description: string;
  workItDoes: string[];
  pricing: AIPricingDetails;
  url: string; // real direct link
  rating: number; // e.g. 4.8
  reviewCount: number;
  reviews: UserReview[];
  strengths: string[];
  weaknesses: string[];
  bestFor: string;
  platforms: string[];
  verified: boolean;
  isCommunityRegistered?: boolean;
  companyName: string;
  releaseYear: string | number;
  badge?: string;
  colorTheme: {
    accent: string;
    border: string;
    bgGlow: string;
  };
}

export interface NewAIRegistrationInput {
  name: string;
  companyName: string;
  category: AICategory;
  tagline: string;
  description: string;
  workItDoes: string;
  url: string;
  pricingModel: AIPricingDetails['model'];
  freeTier: string;
  startingPrice: string;
  proTier?: string;
  strengths: string;
  weaknesses: string;
  bestFor: string;
  platforms: string;
  contactEmail: string;
  contactPhone?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role?: string;
  company?: string;
  createdAt: string;
  savedToolIds?: string[];
  bio?: string;
}

export type BookingStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

export type SessionType = 
  | '1-on-1 AI Demo' 
  | 'Technical Architecture Consultation' 
  | 'Enterprise Pricing & Pilot Review' 
  | 'Model Integration Workshop' 
  | 'Custom Prompt Engineering Session';

export interface AIBooking {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  toolId: string;
  toolName: string;
  toolCategory: string;
  sessionType: SessionType;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // e.g. "10:00 AM UTC"
  durationMinutes: number;
  status: BookingStatus;
  notes?: string;
  meetingLink?: string;
  createdAt: string;
}

