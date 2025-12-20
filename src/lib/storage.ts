'use client';

import { AppState, UserProfile, DriveMedia, YouTubeVideo, Introduction, WaitlistEntry, WaliStatus } from './types';

const STORAGE_KEYS = {
  PROFILE: 'halalmatches_profile',
  DRIVE_MEDIA: 'halalmatches_drive_media',
  YOUTUBE_VIDEO: 'halalmatches_youtube_video',
  INTRODUCTIONS: 'halalmatches_introductions',
  WALI_STATUS: 'halalmatches_wali_status',
  ONBOARDING: 'halalmatches_onboarding',
  DARK_MODE: 'halalmatches_dark_mode',
  GOOGLE_CONNECTED: 'halalmatches_google_connected',
  WAITLIST: 'halalmatches_waitlist',
} as const;

// Helper to safely access localStorage
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error('localStorage setItem error:', e);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('localStorage removeItem error:', e);
    }
  },
};

// Profile Functions
export function getProfile(): UserProfile | null {
  const data = safeLocalStorage.getItem(STORAGE_KEYS.PROFILE);
  return data ? JSON.parse(data) : null;
}

export function saveProfile(profile: UserProfile): void {
  safeLocalStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

export function updateProfile(updates: Partial<UserProfile>): UserProfile | null {
  const current = getProfile();
  if (!current) return null;
  
  const updated = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveProfile(updated);
  return updated;
}

export function createEmptyProfile(): UserProfile {
  return {
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: '',
    displayName: '',
    age: undefined,
    gender: undefined,
    location: '',
    ethnicity: '',
    nationality: '',
    education: '',
    occupation: '',
    maritalStatus: '',
    hasChildren: false,
    wantsChildren: undefined,
    islamicPractice: {
      prayer: '',
      hijabBeard: '',
      quranReading: '',
      sect: '',
    },
    aboutMe: '',
    lookingFor: '',
    dealBreakers: '',
    languages: [],
    waliStatus: 'has-wali',
    completionPercentage: 0,
  };
}

// Drive Media Functions
export function getDriveMedia(): DriveMedia[] {
  const data = safeLocalStorage.getItem(STORAGE_KEYS.DRIVE_MEDIA);
  return data ? JSON.parse(data) : [];
}

export function addDriveMedia(media: Omit<DriveMedia, 'addedAt'>): DriveMedia[] {
  const current = getDriveMedia();
  const newMedia: DriveMedia = {
    ...media,
    addedAt: new Date().toISOString(),
  };
  const updated = [...current, newMedia];
  safeLocalStorage.setItem(STORAGE_KEYS.DRIVE_MEDIA, JSON.stringify(updated));
  return updated;
}

export function removeDriveMedia(fileId: string): DriveMedia[] {
  const current = getDriveMedia();
  const updated = current.filter((m) => m.fileId !== fileId);
  safeLocalStorage.setItem(STORAGE_KEYS.DRIVE_MEDIA, JSON.stringify(updated));
  return updated;
}

// YouTube Video Functions
export function getYouTubeVideo(): YouTubeVideo | null {
  const data = safeLocalStorage.getItem(STORAGE_KEYS.YOUTUBE_VIDEO);
  return data ? JSON.parse(data) : null;
}

export function saveYouTubeVideo(video: YouTubeVideo): void {
  safeLocalStorage.setItem(STORAGE_KEYS.YOUTUBE_VIDEO, JSON.stringify(video));
}

export function removeYouTubeVideo(): void {
  safeLocalStorage.removeItem(STORAGE_KEYS.YOUTUBE_VIDEO);
}

// Introduction Functions
export function getIntroductions(): Introduction[] {
  const data = safeLocalStorage.getItem(STORAGE_KEYS.INTRODUCTIONS);
  return data ? JSON.parse(data) : [];
}

export function addIntroduction(intro: Omit<Introduction, 'id' | 'createdAt'>): Introduction[] {
  const current = getIntroductions();
  const newIntro: Introduction = {
    ...intro,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  const updated = [...current, newIntro];
  safeLocalStorage.setItem(STORAGE_KEYS.INTRODUCTIONS, JSON.stringify(updated));
  return updated;
}

// Wali Status Functions
export function getWaliStatus(): WaliStatus | null {
  const data = safeLocalStorage.getItem(STORAGE_KEYS.WALI_STATUS);
  return data ? JSON.parse(data) : null;
}

export function saveWaliStatus(status: WaliStatus): void {
  safeLocalStorage.setItem(STORAGE_KEYS.WALI_STATUS, JSON.stringify(status));
}

// Dark Mode Functions
export function getDarkMode(): boolean {
  const data = safeLocalStorage.getItem(STORAGE_KEYS.DARK_MODE);
  return data === 'true';
}

export function saveDarkMode(enabled: boolean): void {
  safeLocalStorage.setItem(STORAGE_KEYS.DARK_MODE, String(enabled));
}

// Google Connection Status
export function getGoogleConnected(): boolean {
  const data = safeLocalStorage.getItem(STORAGE_KEYS.GOOGLE_CONNECTED);
  return data === 'true';
}

export function saveGoogleConnected(connected: boolean): void {
  safeLocalStorage.setItem(STORAGE_KEYS.GOOGLE_CONNECTED, String(connected));
}

// Onboarding Status
export function getOnboardingCompleted(): boolean {
  const data = safeLocalStorage.getItem(STORAGE_KEYS.ONBOARDING);
  return data === 'true';
}

export function saveOnboardingCompleted(completed: boolean): void {
  safeLocalStorage.setItem(STORAGE_KEYS.ONBOARDING, String(completed));
}

// Waitlist Functions
export function getWaitlist(): WaitlistEntry[] {
  const data = safeLocalStorage.getItem(STORAGE_KEYS.WAITLIST);
  return data ? JSON.parse(data) : [];
}

export function addToWaitlist(entry: Omit<WaitlistEntry, 'submittedAt'>): WaitlistEntry[] {
  const current = getWaitlist();
  const newEntry: WaitlistEntry = {
    ...entry,
    submittedAt: new Date().toISOString(),
  };
  const updated = [...current, newEntry];
  safeLocalStorage.setItem(STORAGE_KEYS.WAITLIST, JSON.stringify(updated));
  return updated;
}

// Profile Completion Calculator
export function calculateProfileCompletion(profile: UserProfile): number {
  const requiredFields = [
    profile.name || profile.displayName,
    profile.age && profile.age > 0,
    profile.gender,
    profile.location,
    profile.education,
    profile.occupation,
    profile.aboutMe,
    profile.lookingFor,
    profile.islamicPractice?.prayer,
    profile.waliStatus,
  ];
  
  const completed = requiredFields.filter(Boolean).length;
  return Math.round((completed / requiredFields.length) * 100);
}

// Full App State
export function getAppState(): AppState {
  return {
    profile: getProfile(),
    driveMedia: getDriveMedia(),
    youtubeVideo: getYouTubeVideo(),
    introductions: getIntroductions(),
    waliStatus: getWaliStatus(),
    onboardingCompleted: getOnboardingCompleted(),
    darkMode: getDarkMode(),
    googleConnected: getGoogleConnected(),
  };
}

// Clear All Data
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    safeLocalStorage.removeItem(key);
  });
}

// Utility Functions
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Export storage keys for debugging
export { STORAGE_KEYS };
