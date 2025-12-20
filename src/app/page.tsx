'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { addToWaitlist } from '@/lib/storage';
import {
  Heart,
  Shield,
  Users,
  Lock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Globe,
  Eye,
  EyeOff,
  MessageSquare,
  Video,
  Image,
  UserCheck,
  XCircle,
  ChevronRight,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [country, setCountry] = useState('');
  const [hasWali, setHasWali] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    addToWaitlist({ email, gender, country, hasWali });
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-emerald-50/30 to-cream-100 dark:from-charcoal-950 dark:via-emerald-950/20 dark:to-charcoal-900" />
          <div className="absolute inset-0 bg-islamic-pattern opacity-30 dark:opacity-10" />
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
          
          <div className="container-wide relative py-24 lg:py-32">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Badge */}
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Launching Soon — Join the Waitlist
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-6 leading-tight"
              >
                Find Your Spouse{' '}
                <span className="gradient-text">The Halal Way</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl text-charcoal-600 dark:text-charcoal-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                A dignified Muslim matrimonial platform with structured introductions, 
                wali workflows, and strong Islamic boundaries. Marriage-focused, 
                privacy-first, globally connected.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="#waitlist" className="btn-primary text-lg px-8 py-4">
                  Join the Waitlist
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="/wali-workflows" className="btn-secondary text-lg px-8 py-4">
                  <Users className="mr-2 w-5 h-5" />
                  Learn About Wali Workflows
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                variants={fadeInUp}
                className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-charcoal-500 dark:text-charcoal-400"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  Zero PII Storage
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  Your Data, Your Control
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  Global Community
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* What This Is / Isn't Section */}
        <section className="py-20 bg-white dark:bg-charcoal-900">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-4">
                What HalalMatches Is & Isn&apos;t
              </h2>
              <p className="text-charcoal-600 dark:text-charcoal-400 max-w-2xl mx-auto">
                Clear expectations from the start — we&apos;re building something different.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* What It Is */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="card border-2 border-emerald-200 dark:border-emerald-800"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-emerald-700 dark:text-emerald-400">
                    What This IS
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Marriage-focused introductions only',
                    'Structured wali involvement workflows',
                    'Privacy-first architecture (no PII stored)',
                    'Verification through trusted processes',
                    'Guided conversations, not free chat',
                    'Global Muslim community connection',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-charcoal-700 dark:text-charcoal-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* What It Isn't */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="card border-2 border-red-200 dark:border-red-900/50"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-red-700 dark:text-red-400">
                    What This ISN&apos;T
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Not a dating app',
                    'Not for casual conversations',
                    'Not storing your private photos',
                    'Not harvesting your personal data',
                    'Not bypassing family involvement',
                    'Not promoting haram interactions',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-charcoal-700 dark:text-charcoal-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-cream-50 dark:bg-charcoal-950">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-4">
                Built for <span className="gradient-text">Dignified</span> Matrimony
              </h2>
              <p className="text-charcoal-600 dark:text-charcoal-400 max-w-2xl mx-auto">
                Every feature designed with Islamic principles and modern privacy standards.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: 'Wali Workflows',
                  description: 'Three paths: with wali, imam/masjid representative, or limited oversight. Every sister supported.',
                  color: 'emerald',
                },
                {
                  icon: Shield,
                  title: 'Zero PII Storage',
                  description: 'We store nothing sensitive. Your photos stay in YOUR Drive. Your videos on YOUR YouTube.',
                  color: 'blue',
                },
                {
                  icon: MessageSquare,
                  title: 'Structured Introductions',
                  description: 'No casual chat. Template-based introductions via Google Chat with guided workflows.',
                  color: 'purple',
                },
                {
                  icon: Video,
                  title: 'Video Introductions',
                  description: 'Share your story through unlisted YouTube videos. Controlled visibility, dignified presentation.',
                  color: 'red',
                },
                {
                  icon: Image,
                  title: 'Privacy-First Photos',
                  description: 'Photos stored in your Google Drive. We only reference file IDs. Full control remains yours.',
                  color: 'amber',
                },
                {
                  icon: UserCheck,
                  title: 'Verification Process',
                  description: 'Community-based verification through trusted references and optional video calls.',
                  color: 'teal',
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card-hover group"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-100 dark:bg-${feature.color}-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-7 h-7 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-charcoal-900 dark:text-cream-50 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy First Banner */}
        <section className="py-16 bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 dark:from-emerald-900 dark:via-emerald-950 dark:to-charcoal-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-islamic-pattern opacity-10" />
          <div className="container-wide relative">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                  Privacy Isn&apos;t Optional — It&apos;s Our Foundation
                </h2>
                <p className="text-emerald-100 max-w-xl">
                  Your personal data belongs to you. We architect every feature 
                  so we never need to store your sensitive information.
                </p>
              </div>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-800 font-semibold rounded-xl hover:bg-cream-100 transition-colors"
              >
                Read Our Privacy Approach
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-20 bg-white dark:bg-charcoal-900">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-4">
                Built on Trust
              </h2>
              <p className="text-charcoal-600 dark:text-charcoal-400 max-w-2xl mx-auto">
                Core principles that guide everything we build.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'Salafi Framework',
                  description: 'Grounded in authentic Islamic methodology',
                },
                {
                  icon: Lock,
                  title: 'Data Sovereignty',
                  description: 'You own and control all your data',
                },
                {
                  icon: Eye,
                  title: 'Transparency',
                  description: 'Open about what we do and don\'t store',
                },
                {
                  icon: Heart,
                  title: 'Marriage Focused',
                  description: 'Every feature serves the goal of nikah',
                },
              ].map((badge, i) => (
                <motion.div
                  key={badge.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-gold-100 dark:from-emerald-900/50 dark:to-gold-900/30 flex items-center justify-center mx-auto mb-4">
                    <badge.icon className="w-8 h-8 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-charcoal-900 dark:text-cream-50 mb-2">
                    {badge.title}
                  </h3>
                  <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
                    {badge.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section id="waitlist" className="py-20 bg-cream-50 dark:bg-charcoal-950 scroll-mt-20">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card max-w-xl mx-auto p-8 sm:p-10"
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-charcoal-900 dark:text-cream-50 mb-3">
                    You&apos;re on the List!
                  </h3>
                  <p className="text-charcoal-600 dark:text-charcoal-400 mb-6">
                    بارك الله فيك — We&apos;ll notify you when we launch. 
                    May Allah bless your search for a righteous spouse.
                  </p>
                  <Link href="/wali-workflows" className="btn-secondary">
                    Learn About Wali Workflows
                  </Link>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 text-sm font-medium mb-4">
                      <Sparkles className="w-4 h-4" />
                      Be Among the First
                    </span>
                    <h3 className="font-display text-2xl font-bold text-charcoal-900 dark:text-cream-50 mb-2">
                      Join the Waitlist
                    </h3>
                    <p className="text-charcoal-600 dark:text-charcoal-400">
                      Get early access when we launch. Your data is stored locally only.
                    </p>
                  </div>

                  <form onSubmit={handleWaitlistSubmit} className="space-y-5">
                    <div>
                      <label className="label">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="input-field"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label">I am a</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setGender('male')}
                            className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all ${
                              gender === 'male'
                                ? 'bg-emerald-700 text-white'
                                : 'bg-cream-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400'
                            }`}
                          >
                            Brother
                          </button>
                          <button
                            type="button"
                            onClick={() => setGender('female')}
                            className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all ${
                              gender === 'female'
                                ? 'bg-emerald-700 text-white'
                                : 'bg-cream-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400'
                            }`}
                          >
                            Sister
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="label">Country</label>
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required
                          placeholder="e.g., USA"
                          className="input-field"
                        />
                      </div>
                    </div>

                    {gender === 'female' && (
                      <div>
                        <label className="label">Do you have a wali?</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setHasWali(true)}
                            className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all ${
                              hasWali
                                ? 'bg-emerald-700 text-white'
                                : 'bg-cream-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400'
                            }`}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setHasWali(false)}
                            className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all ${
                              !hasWali
                                ? 'bg-emerald-700 text-white'
                                : 'bg-cream-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400'
                            }`}
                          >
                            No / Need Help
                          </button>
                        </div>
                        {!hasWali && (
                          <p className="text-sm text-charcoal-500 dark:text-charcoal-500 mt-2">
                            We have workflows for sisters without a wali — 
                            <Link href="/wali-workflows" className="text-emerald-600 hover:underline ml-1">
                              learn more
                            </Link>
                          </p>
                        )}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-4 text-lg disabled:opacity-70"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Joining...
                        </span>
                      ) : (
                        <>
                          Join Waitlist
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-center text-charcoal-500 dark:text-charcoal-500">
                      This form saves locally only. No data sent to any server.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
