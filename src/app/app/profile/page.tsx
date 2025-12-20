'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Heart,
  BookOpen,
  Globe,
  Save,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { getProfile, saveProfile, calculateProfileCompletion } from '@/lib/storage';
import type { UserProfile } from '@/lib/types';

const ethnicityOptions = [
  'Arab', 'South Asian', 'Southeast Asian', 'East Asian', 'African', 
  'African American', 'European', 'Latino/Hispanic', 'Middle Eastern', 
  'Turkish', 'Persian', 'Mixed', 'Other', 'Prefer not to say'
];

const educationOptions = [
  'High School', 'Some College', 'Associate Degree', 'Bachelor\'s Degree',
  'Master\'s Degree', 'Doctorate/PhD', 'Islamic Studies', 'Hafiz/Hafiza',
  'Trade/Vocational', 'Other'
];

const maritalStatusOptions = [
  'Never Married', 'Divorced', 'Widowed', 'Annulled'
];

const prayerOptions = [
  'All 5 prayers on time', 'Most prayers', 'Working on consistency',
  'Just started praying', 'Prefer not to say'
];

const hijabOptions = [
  'Full hijab', 'Partial hijab', 'Considering hijab', 'No hijab', 'Niqab'
];

const beardOptions = [
  'Full beard', 'Trimmed beard', 'Goatee', 'Clean shaven', 'Working on growing'
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: '',
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
    aboutMe: '',
    islamicPractice: {
      prayer: '',
      hijabBeard: '',
      quranReading: '',
      sect: '',
    },
    lookingFor: '',
    dealBreakers: '',
    languages: [],
  });
  
  const [saved, setSaved] = useState(false);
  const [completion, setCompletion] = useState(0);
  const [languageInput, setLanguageInput] = useState('');

  useEffect(() => {
    const storedProfile = getProfile();
    if (storedProfile) {
      setProfile(storedProfile);
      setCompletion(calculateProfileCompletion(storedProfile));
    }
  }, []);

  const handleChange = (field: keyof UserProfile, value: any) => {
    setProfile(prev => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
    setSaved(false);
  };

  const handleIslamicChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      islamicPractice: {
        ...prev.islamicPractice,
        [field]: value,
      },
    }));
    setSaved(false);
  };

  const handleAddLanguage = () => {
    if (languageInput.trim() && !profile.languages?.includes(languageInput.trim())) {
      handleChange('languages', [...(profile.languages || []), languageInput.trim()]);
      setLanguageInput('');
    }
  };

  const handleRemoveLanguage = (lang: string) => {
    handleChange('languages', profile.languages?.filter(l => l !== lang) || []);
  };

  const handleSave = () => {
    const profileToSave = {
      ...profile,
      id: profile.id || `user_${Date.now()}`,
      createdAt: profile.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as UserProfile;
    
    saveProfile(profileToSave);
    setCompletion(calculateProfileCompletion(profileToSave));
    setSaved(true);
    
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-charcoal-900 dark:text-cream-50">
              Your Profile
            </h1>
            <p className="text-charcoal-600 dark:text-charcoal-400 mt-1">
              Marriage-focused profile • {completion}% complete
            </p>
          </div>
          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Profile
              </>
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-cream-200 dark:border-charcoal-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
              Profile Completion
            </span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {completion}%
            </span>
          </div>
          <div className="h-2 bg-cream-200 dark:bg-charcoal-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completion}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
            />
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-cream-200 dark:border-charcoal-800 overflow-hidden">
          <div className="p-6 border-b border-cream-200 dark:border-charcoal-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
                <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                Basic Information
              </h2>
            </div>
          </div>
          
          <div className="p-6 grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={profile.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                className="input-field"
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                Age *
              </label>
              <input
                type="number"
                value={profile.age || ''}
                onChange={(e) => handleChange('age', parseInt(e.target.value) || undefined)}
                className="input-field"
                placeholder="Your age"
                min={18}
                max={100}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                Gender *
              </label>
              <select
                value={profile.gender || ''}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="input-field"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                <input
                  type="text"
                  value={profile.location || ''}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="input-field pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                Ethnicity
              </label>
              <select
                value={profile.ethnicity || ''}
                onChange={(e) => handleChange('ethnicity', e.target.value)}
                className="input-field"
              >
                <option value="">Select ethnicity</option>
                {ethnicityOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                Nationality
              </label>
              <input
                type="text"
                value={profile.nationality || ''}
                onChange={(e) => handleChange('nationality', e.target.value)}
                className="input-field"
                placeholder="Your nationality"
              />
            </div>
          </div>
        </div>

        {/* Education & Career */}
        <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-cream-200 dark:border-charcoal-800 overflow-hidden">
          <div className="p-6 border-b border-cream-200 dark:border-charcoal-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gold-100 dark:bg-gold-900/50 rounded-xl">
                <GraduationCap className="w-5 h-5 text-gold-600 dark:text-gold-400" />
              </div>
              <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                Education & Career
              </h2>
            </div>
          </div>
          
          <div className="p-6 grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                Education Level
              </label>
              <select
                value={profile.education || ''}
                onChange={(e) => handleChange('education', e.target.value)}
                className="input-field"
              >
                <option value="">Select education</option>
                {educationOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                Occupation
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                <input
                  type="text"
                  value={profile.occupation || ''}
                  onChange={(e) => handleChange('occupation', e.target.value)}
                  className="input-field pl-10"
                  placeholder="Your profession"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Marital Status */}
        <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-cream-200 dark:border-charcoal-800 overflow-hidden">
          <div className="p-6 border-b border-cream-200 dark:border-charcoal-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cream-200 dark:bg-charcoal-800 rounded-xl">
                <Heart className="w-5 h-5 text-charcoal-600 dark:text-charcoal-400" />
              </div>
              <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                Marital Status
              </h2>
            </div>
          </div>
          
          <div className="p-6 grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                Current Status *
              </label>
              <select
                value={profile.maritalStatus || ''}
                onChange={(e) => handleChange('maritalStatus', e.target.value)}
                className="input-field"
              >
                <option value="">Select status</option>
                {maritalStatusOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                Do you have children?
              </label>
              <select
                value={profile.hasChildren ? 'yes' : 'no'}
                onChange={(e) => handleChange('hasChildren', e.target.value === 'yes')}
                className="input-field"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                Do you want children?
              </label>
              <select
                value={profile.wantsChildren === undefined ? '' : profile.wantsChildren ? 'yes' : 'no'}
                onChange={(e) => handleChange('wantsChildren', e.target.value === '' ? undefined : e.target.value === 'yes')}
                className="input-field"
              >
                <option value="">Prefer not to say</option>
                <option value="yes">Yes, InshaAllah</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Islamic Practice */}
        <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-cream-200 dark:border-charcoal-800 overflow-hidden">
          <div className="p-6 border-b border-cream-200 dark:border-charcoal-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
                <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                Islamic Practice
              </h2>
            </div>
          </div>
          
          <div className="p-6 grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                Prayer *
              </label>
              <select
                value={profile.islamicPractice?.prayer || ''}
                onChange={(e) => handleIslamicChange('prayer', e.target.value)}
                className="input-field"
              >
                <option value="">Select prayer level</option>
                {prayerOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                {profile.gender === 'female' ? 'Hijab' : 'Beard'}
              </label>
              <select
                value={profile.islamicPractice?.hijabBeard || ''}
                onChange={(e) => handleIslamicChange('hijabBeard', e.target.value)}
                className="input-field"
              >
                <option value="">Select option</option>
                {(profile.gender === 'female' ? hijabOptions : beardOptions).map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                Quran Reading
              </label>
              <select
                value={profile.islamicPractice?.quranReading || ''}
                onChange={(e) => handleIslamicChange('quranReading', e.target.value)}
                className="input-field"
              >
                <option value="">Select frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Occasionally">Occasionally</option>
                <option value="Learning">Learning to read</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                Islamic Tradition
              </label>
              <select
                value={profile.islamicPractice?.sect || ''}
                onChange={(e) => handleIslamicChange('sect', e.target.value)}
                className="input-field"
              >
                <option value="">Select tradition</option>
                <option value="Sunni">Sunni</option>
                <option value="Sunni - Salafi">Sunni - Salafi/Athari</option>
                <option value="Sunni - Hanafi">Sunni - Hanafi</option>
                <option value="Sunni - Maliki">Sunni - Maliki</option>
                <option value="Sunni - Shafi'i">Sunni - Shafi'i</option>
                <option value="Sunni - Hanbali">Sunni - Hanbali</option>
                <option value="Just Muslim">Just Muslim</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-cream-200 dark:border-charcoal-800 overflow-hidden">
          <div className="p-6 border-b border-cream-200 dark:border-charcoal-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cream-200 dark:bg-charcoal-800 rounded-xl">
                <Globe className="w-5 h-5 text-charcoal-600 dark:text-charcoal-400" />
              </div>
              <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                Languages
              </h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddLanguage()}
                className="input-field flex-1"
                placeholder="Add a language"
              />
              <button
                onClick={handleAddLanguage}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
              >
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {profile.languages?.map(lang => (
                <span
                  key={lang}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-full text-sm"
                >
                  {lang}
                  <button
                    onClick={() => handleRemoveLanguage(lang)}
                    className="hover:text-emerald-900 dark:hover:text-emerald-200"
                  >
                    ×
                  </button>
                </span>
              ))}
              {(!profile.languages || profile.languages.length === 0) && (
                <span className="text-sm text-charcoal-500 dark:text-charcoal-400">
                  No languages added yet
                </span>
              )}
            </div>
          </div>
        </div>

        {/* About & Looking For */}
        <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-cream-200 dark:border-charcoal-800 overflow-hidden">
          <div className="p-6 border-b border-cream-200 dark:border-charcoal-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gold-100 dark:bg-gold-900/50 rounded-xl">
                <Info className="w-5 h-5 text-gold-600 dark:text-gold-400" />
              </div>
              <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                About You
              </h2>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                About Me *
              </label>
              <textarea
                value={profile.aboutMe || ''}
                onChange={(e) => handleChange('aboutMe', e.target.value)}
                className="input-field min-h-[120px] resize-y"
                placeholder="Tell potential matches about yourself, your values, your goals, and what makes you who you are..."
                rows={4}
              />
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">
                Focus on your character, values, and life goals
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                What I'm Looking For *
              </label>
              <textarea
                value={profile.lookingFor || ''}
                onChange={(e) => handleChange('lookingFor', e.target.value)}
                className="input-field min-h-[120px] resize-y"
                placeholder="Describe the qualities you're seeking in a spouse, your expectations for marriage, and your vision for family life..."
                rows={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                Deal Breakers (Optional)
              </label>
              <textarea
                value={profile.dealBreakers || ''}
                onChange={(e) => handleChange('dealBreakers', e.target.value)}
                className="input-field min-h-[80px] resize-y"
                placeholder="Any absolute requirements or things you cannot compromise on..."
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Profile Saved!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Profile
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
