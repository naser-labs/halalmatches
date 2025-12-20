// Profile Types
export interface UserProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  
  // Basic Info
  name?: string;
  displayName?: string;
  age?: number;
  gender?: 'male' | 'female';
  location?: string;
  ethnicity?: string;
  nationality?: string;
  
  // Education & Career
  education?: string;
  occupation?: string;
  
  // Marital Status
  maritalStatus?: string;
  hasChildren?: boolean;
  wantsChildren?: boolean;
  
  // Religious Practice
  islamicPractice?: {
    prayer?: string;
    hijabBeard?: string;
    quranReading?: string;
    sect?: string;
  };
  religiousPractice?: 'very-practicing' | 'practicing' | 'moderately-practicing' | 'learning';
  sect?: string;
  prayerFrequency?: 'five-daily' | 'most-prayers' | 'some-prayers' | 'working-on-it';
  hijabNiqab?: 'hijab' | 'niqab' | 'neither' | 'considering';
  
  // About
  aboutMe?: string;
  lookingFor?: string;
  dealBreakers?: string;
  familyBackground?: string;
  languages?: string[];
  
  // Marriage Preferences
  preferredAgeRange?: {
    min: number;
    max: number;
  };
  willingToRelocate?: boolean;
  preferredLocations?: string[];
  
  // Wali Info
  waliStatus?: 'has-wali' | 'no-wali' | 'limited';
  waliName?: string;
  waliRelation?: string;
  waliContact?: string;
  
  // Profile Completion
  completionPercentage?: number;
}

// Media Types
export interface DriveMedia {
  id: string;
  fileId: string;
  fileName?: string;
  mimeType?: string;
  caption?: string;
  order: number;
  addedAt: string;
  isApproved?: boolean;
}

export interface YouTubeVideo {
  videoId: string;
  title?: string;
  addedAt: string;
}

// Introduction Types
export interface Introduction {
  id: string;
  recipientId: string;
  recipientName?: string;
  templateUsed?: string;
  sentAt: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'declined';
  message?: string;
}

// Wali Status
export interface WaliStatus {
  path: 'traditional' | 'imam' | 'limited';
  waliName?: string;
  waliRelation?: string;
  waliContact?: string;
  verified: boolean;
  updatedAt: string;
}

// App State
export interface AppState {
  profile: UserProfile | null;
  driveMedia: DriveMedia[];
  youtubeVideo: YouTubeVideo | null;
  introductions: Introduction[];
  waliStatus: WaliStatus | null;
  onboardingCompleted: boolean;
  darkMode: boolean;
  googleConnected: boolean;
}

// Waitlist Entry
export interface WaitlistEntry {
  email: string;
  gender: 'male' | 'female';
  country: string;
  hasWali: boolean;
  submittedAt: string;
}

// Component Props Types
export interface StepperStep {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  status: 'completed' | 'current' | 'upcoming';
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
