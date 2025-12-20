'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User,
  Image,
  Video,
  MessageSquare,
  Users,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  Heart,
  Shield,
  BookOpen,
} from 'lucide-react';
import { getProfile, getDriveMedia, getYouTubeVideo, getWaliStatus, calculateProfileCompletion } from '@/lib/storage';
import type { UserProfile, DriveMedia, YouTubeVideo, WaliStatus } from '@/lib/types';

interface Step {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: React.ElementType;
  completed: boolean;
  required: boolean;
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [media, setMedia] = useState<DriveMedia[]>([]);
  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [waliStatus, setWaliStatus] = useState<WaliStatus | null>(null);
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const storedProfile = getProfile();
    const storedMedia = getDriveMedia();
    const storedVideo = getYouTubeVideo();
    const storedWali = getWaliStatus();
    
    setProfile(storedProfile);
    setMedia(storedMedia);
    setVideo(storedVideo);
    setWaliStatus(storedWali);
    
    if (storedProfile) {
      setCompletion(calculateProfileCompletion(storedProfile));
    }
  }, []);

  const steps: Step[] = [
    {
      id: 'profile',
      label: 'Complete Your Profile',
      description: 'Add your basic info, preferences, and Islamic values',
      href: '/app/profile',
      icon: User,
      completed: completion >= 60,
      required: true,
    },
    {
      id: 'wali',
      label: 'Set Wali Status',
      description: 'Specify your wali arrangement for proper introductions',
      href: '/app/wali',
      icon: Users,
      completed: waliStatus !== null,
      required: true,
    },
    {
      id: 'photos',
      label: 'Add Photos',
      description: 'Link photos from your Google Drive (privacy-first)',
      href: '/app/media',
      icon: Image,
      completed: media.length > 0,
      required: false,
    },
    {
      id: 'video',
      label: 'Add Introduction Video',
      description: 'Link your unlisted YouTube video introduction',
      href: '/app/video',
      icon: Video,
      completed: video !== null,
      required: false,
    },
    {
      id: 'introductions',
      label: 'Start Introductions',
      description: 'Send structured introduction requests via Google Chat',
      href: '/app/introductions',
      icon: MessageSquare,
      completed: false,
      required: false,
    },
  ];

  const completedSteps = steps.filter(s => s.completed).length;
  const requiredSteps = steps.filter(s => s.required);
  const requiredCompleted = requiredSteps.filter(s => s.completed).length;
  const readyForIntroductions = requiredSteps.every(s => s.completed);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Welcome Header */}
        <motion.div variants={itemVariants}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 sm:p-8 text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold">
                    Assalamu Alaikum{profile?.displayName ? `, ${profile.displayName.split(' ')[0]}` : ''}!
                  </h1>
                  <p className="text-emerald-100 text-sm sm:text-base">
                    Welcome to your dignified matrimonial journey
                  </p>
                </div>
              </div>
              
              <div className="mt-6 grid sm:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold">{completedSteps}/{steps.length}</div>
                  <div className="text-emerald-100 text-sm">Steps Completed</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold">{completion}%</div>
                  <div className="text-emerald-100 text-sm">Profile Complete</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold">{readyForIntroductions ? '✓' : '○'}</div>
                  <div className="text-emerald-100 text-sm">Ready for Introductions</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div variants={itemVariants}>
          <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-cream-200 dark:border-charcoal-800 overflow-hidden">
            <div className="p-6 border-b border-cream-200 dark:border-charcoal-800">
              <h2 className="text-xl font-display font-semibold text-charcoal-900 dark:text-cream-50">
                Complete Your Setup
              </h2>
              <p className="text-charcoal-600 dark:text-charcoal-400 mt-1">
                Complete these steps to start receiving introductions
              </p>
            </div>
            
            <div className="divide-y divide-cream-200 dark:divide-charcoal-800">
              {steps.map((step, index) => (
                <Link
                  key={step.id}
                  href={step.href}
                  className="flex items-center gap-4 p-4 sm:p-6 hover:bg-cream-50 dark:hover:bg-charcoal-800/50 transition-colors group"
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    step.completed
                      ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400'
                      : 'bg-cream-100 dark:bg-charcoal-800 text-charcoal-400 dark:text-charcoal-500'
                  }`}>
                    {step.completed ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${
                        step.completed
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-charcoal-900 dark:text-cream-50'
                      }`}>
                        {step.label}
                      </h3>
                      {step.required && !step.completed && (
                        <span className="px-2 py-0.5 bg-gold-100 dark:bg-gold-900/50 text-gold-700 dark:text-gold-400 text-xs font-medium rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-charcoal-600 dark:text-charcoal-400 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                  
                  <ArrowRight className="w-5 h-5 text-charcoal-400 dark:text-charcoal-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div variants={itemVariants} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-cream-200 dark:border-charcoal-800 p-6">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold text-charcoal-900 dark:text-cream-50 mb-2">
              Privacy First
            </h3>
            <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
              Your photos stay in your Google Drive. Your videos stay on your YouTube. We store only references.
            </p>
          </div>
          
          <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-cream-200 dark:border-charcoal-800 p-6">
            <div className="w-12 h-12 bg-gold-100 dark:bg-gold-900/50 rounded-xl flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-gold-600 dark:text-gold-400" />
            </div>
            <h3 className="font-semibold text-charcoal-900 dark:text-cream-50 mb-2">
              Marriage-Only
            </h3>
            <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
              No casual dating. No endless swiping. Just serious, dignified introductions with clear intentions.
            </p>
          </div>
          
          <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-cream-200 dark:border-charcoal-800 p-6 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-cream-200 dark:bg-charcoal-800 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-charcoal-600 dark:text-charcoal-400" />
            </div>
            <h3 className="font-semibold text-charcoal-900 dark:text-cream-50 mb-2">
              Proper Process
            </h3>
            <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
              Wali involvement options, structured introductions, and clear Islamic boundaries throughout.
            </p>
          </div>
        </motion.div>

        {/* Status Banner */}
        {!readyForIntroductions && (
          <motion.div variants={itemVariants}>
            <div className="bg-gold-50 dark:bg-gold-900/20 border border-gold-200 dark:border-gold-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gold-100 dark:bg-gold-900/50 rounded-xl">
                  <Circle className="w-6 h-6 text-gold-600 dark:text-gold-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gold-800 dark:text-gold-300 mb-1">
                    Complete Required Steps
                  </h3>
                  <p className="text-sm text-gold-700 dark:text-gold-400">
                    You've completed {requiredCompleted} of {requiredSteps.length} required steps. 
                    Complete your profile and set your wali status to start receiving introductions.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {readyForIntroductions && (
          <motion.div variants={itemVariants}>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
                    Ready for Introductions!
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-400 mb-4">
                    You've completed all required steps. You can now send and receive structured introductions.
                  </p>
                  <Link
                    href="/app/introductions"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Start Introductions
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
