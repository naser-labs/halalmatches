'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import { getProfile, calculateProfileCompletion } from '@/lib/storage';
import {
  LayoutDashboard,
  User,
  Image,
  Video,
  MessageSquare,
  Users,
  Menu,
  X,
  Moon,
  Sun,
  Heart,
  ChevronLeft,
  LogOut,
  Settings,
} from 'lucide-react';

const navItems = [
  { href: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/profile', label: 'Profile', icon: User },
  { href: '/app/media', label: 'Photos', icon: Image },
  { href: '/app/video', label: 'Video', icon: Video },
  { href: '/app/introductions', label: 'Introductions', icon: MessageSquare },
  { href: '/app/wali', label: 'Wali Status', icon: Users },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const pathname = usePathname();
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const profile = getProfile();
    if (profile) {
      setProfileCompletion(calculateProfileCompletion(profile));
    }
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/app') {
      return pathname === '/app' || pathname === '/app/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-charcoal-950 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-white dark:bg-charcoal-900 border-r border-cream-200 dark:border-charcoal-800">
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-cream-200 dark:border-charcoal-800">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl rotate-3 group-hover:rotate-6 transition-transform" />
              <Heart className="relative w-5 h-5 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-semibold text-emerald-800 dark:text-emerald-400">
                HalalMatches
              </span>
              <span className="text-[9px] text-charcoal-500 dark:text-charcoal-400 -mt-0.5 tracking-wide">
                DIGNIFIED MATRIMONY
              </span>
            </div>
          </Link>
        </div>

        {/* Profile Completion */}
        <div className="px-4 py-4 border-b border-cream-200 dark:border-charcoal-800">
          <div className="p-4 rounded-xl bg-cream-50 dark:bg-charcoal-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                Profile Completion
              </span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {profileCompletion}%
              </span>
            </div>
            <div className="h-2 bg-cream-200 dark:bg-charcoal-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${profileCompletion}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive(item.href)
                  ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-medium'
                  : 'text-charcoal-600 dark:text-charcoal-400 hover:bg-cream-100 dark:hover:bg-charcoal-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-cream-200 dark:border-charcoal-800 space-y-2">
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-charcoal-600 dark:text-charcoal-400 hover:bg-cream-100 dark:hover:bg-charcoal-800 w-full transition-all"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-charcoal-600 dark:text-charcoal-400 hover:bg-cream-100 dark:hover:bg-charcoal-800 w-full transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-charcoal-900 border-b border-cream-200 dark:border-charcoal-800">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg" />
              <Heart className="relative w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-display text-lg font-semibold text-emerald-800 dark:text-emerald-400">
              HalalMatches
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-charcoal-600 dark:text-charcoal-400 hover:bg-cream-100 dark:hover:bg-charcoal-800"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-charcoal-900/50 z-50"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-charcoal-900 z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-cream-200 dark:border-charcoal-800">
                <span className="font-display text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                  Menu
                </span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg text-charcoal-600 dark:text-charcoal-400 hover:bg-cream-100 dark:hover:bg-charcoal-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Profile Completion */}
              <div className="px-4 py-4 border-b border-cream-200 dark:border-charcoal-800">
                <div className="p-4 rounded-xl bg-cream-50 dark:bg-charcoal-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Profile Completion
                    </span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {profileCompletion}%
                    </span>
                  </div>
                  <div className="h-2 bg-cream-200 dark:bg-charcoal-700 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${profileCompletion}%` }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                    />
                  </div>
                </div>
              </div>

              <nav className="px-4 py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive(item.href)
                        ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-medium'
                        : 'text-charcoal-600 dark:text-charcoal-400 hover:bg-cream-100 dark:hover:bg-charcoal-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="p-4 border-t border-cream-200 dark:border-charcoal-800 space-y-2">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-charcoal-600 dark:text-charcoal-400 hover:bg-cream-100 dark:hover:bg-charcoal-800 w-full"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <Link
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-charcoal-600 dark:text-charcoal-400 hover:bg-cream-100 dark:hover:bg-charcoal-800 w-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back to Home
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:pl-72">
        <div className="pt-16 lg:pt-0 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
