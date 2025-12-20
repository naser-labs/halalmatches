'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Shield,
  Lock,
  Database,
  Cloud,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  HardDrive,
  Video,
  Image,
  MessageSquare,
  FileText,
  Key,
  Server,
  Globe,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-emerald-50/30 to-cream-100 dark:from-charcoal-950 dark:via-emerald-950/20 dark:to-charcoal-900" />
          <div className="absolute inset-0 bg-islamic-pattern opacity-20 dark:opacity-10" />

          <div className="container-wide relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Privacy By Design
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-6">
                Your Privacy Is{' '}
                <span className="gradient-text">Non-Negotiable</span>
              </h1>
              <p className="text-lg text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                We&apos;ve architected HalalMatches so we never need to store your sensitive data.
                Your photos, videos, and conversations remain under your complete control.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="py-16 bg-white dark:bg-charcoal-900">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-4">
                Our Privacy Principles
              </h2>
              <p className="text-charcoal-600 dark:text-charcoal-400 max-w-2xl mx-auto">
                Three fundamental commitments that guide every technical decision.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Database,
                  title: 'Zero PII Storage',
                  description: 'We do not store personally identifiable information on our servers. No photos, no documents, no private data.',
                },
                {
                  icon: Cloud,
                  title: 'User-Owned Storage',
                  description: 'Your media stays in YOUR Google Drive and YouTube. We only store references (file IDs), never the content.',
                },
                {
                  icon: Lock,
                  title: 'No Message Storage',
                  description: 'Conversations happen via Google Chat. We facilitate connections but never see or store your messages.',
                },
              ].map((principle, i) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card-hover text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mx-auto mb-4">
                    <principle.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-charcoal-900 dark:text-cream-50 mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-charcoal-600 dark:text-charcoal-400">
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Store vs Don't Store */}
        <section className="py-16 bg-cream-50 dark:bg-charcoal-950">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-4">
                What We Store vs. What We Don&apos;t
              </h2>
              <p className="text-charcoal-600 dark:text-charcoal-400 max-w-2xl mx-auto">
                Complete transparency about data handling. No surprises, no hidden practices.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* What We DON'T Store */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="card border-2 border-red-200 dark:border-red-900/50 overflow-hidden"
              >
                <div className="bg-red-50 dark:bg-red-950/30 px-6 py-4 -mx-6 -mt-6 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-red-700 dark:text-red-400">
                    We Do NOT Store
                  </h3>
                </div>

                <ul className="space-y-4">
                  {[
                    {
                      icon: Image,
                      title: 'Your Photos',
                      detail: 'Stored in your Google Drive only',
                    },
                    {
                      icon: Video,
                      title: 'Your Videos',
                      detail: 'Hosted on your YouTube as unlisted',
                    },
                    {
                      icon: MessageSquare,
                      title: 'Your Messages',
                      detail: 'Conversations via Google Chat',
                    },
                    {
                      icon: FileText,
                      title: 'Identity Documents',
                      detail: 'Never uploaded to our servers',
                    },
                    {
                      icon: Key,
                      title: 'Passwords',
                      detail: 'Google handles all authentication',
                    },
                    {
                      icon: Globe,
                      title: 'Precise Location',
                      detail: 'Only general city/country if shared',
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <span className="font-medium text-charcoal-900 dark:text-cream-50">
                          {item.title}
                        </span>
                        <p className="text-sm text-charcoal-500 dark:text-charcoal-500">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* What We DO Store */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="card border-2 border-emerald-200 dark:border-emerald-800 overflow-hidden"
              >
                <div className="bg-emerald-50 dark:bg-emerald-950/30 px-6 py-4 -mx-6 -mt-6 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                    We Store (Locally/Minimal)
                  </h3>
                </div>

                <ul className="space-y-4">
                  {[
                    {
                      icon: HardDrive,
                      title: 'Profile Data (localStorage)',
                      detail: 'Stored in YOUR browser only',
                    },
                    {
                      icon: FileText,
                      title: 'Drive File IDs',
                      detail: 'References, not actual files',
                    },
                    {
                      icon: Video,
                      title: 'YouTube Video IDs',
                      detail: 'References, not actual videos',
                    },
                    {
                      icon: Eye,
                      title: 'Display Preferences',
                      detail: 'Theme, language settings',
                    },
                    {
                      icon: Shield,
                      title: 'Wali Status',
                      detail: 'Your chosen workflow path',
                    },
                    {
                      icon: Server,
                      title: 'Anonymous Analytics',
                      detail: 'Page views only, no tracking',
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <span className="font-medium text-charcoal-900 dark:text-cream-50">
                          {item.title}
                        </span>
                        <p className="text-sm text-charcoal-500 dark:text-charcoal-500">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white dark:bg-charcoal-900">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-4">
                How Your Data Stays Yours
              </h2>
              <p className="text-charcoal-600 dark:text-charcoal-400 max-w-2xl mx-auto">
                A closer look at our privacy-first architecture.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-8">
              {[
                {
                  title: 'Photos via Google Drive',
                  description: 'When you add photos, you\'re selecting files from YOUR Google Drive. We only store the file ID (a reference string). The actual image never touches our servers. You can revoke access anytime from your Google account.',
                  icon: Image,
                },
                {
                  title: 'Videos via YouTube',
                  description: 'Your introduction video lives on YOUR YouTube channel as an unlisted video. We store just the video ID. You control who can view it, and you can delete it anytime directly from YouTube.',
                  icon: Video,
                },
                {
                  title: 'Messaging via Google Chat',
                  description: 'We don\'t build chat. Instead, we provide deep links and guided steps to start conversations on Google Chat. Your messages are between you and the other party — we never see them.',
                  icon: MessageSquare,
                },
                {
                  title: 'Authentication via Google',
                  description: 'We use Google Identity Services for login. We never see or store your password. Google handles the authentication, and we only receive basic profile info (name, email) with your consent.',
                  icon: Key,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card flex gap-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-charcoal-900 dark:text-cream-50 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* V1 Note */}
        <section className="py-12 bg-gradient-to-r from-gold-100 via-gold-50 to-gold-100 dark:from-gold-950/30 dark:via-charcoal-900 dark:to-gold-950/30">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-200 dark:bg-gold-900/50 text-gold-700 dark:text-gold-400 text-sm font-medium mb-4">
                V1 Static Deployment
              </div>
              <h3 className="font-display text-xl font-semibold text-charcoal-900 dark:text-cream-50 mb-3">
                Current Version: 100% Client-Side
              </h3>
              <p className="text-charcoal-600 dark:text-charcoal-400">
                In this initial version, ALL data is stored in your browser&apos;s localStorage.
                Nothing is sent to any server. This means your data exists only on your device —
                if you clear your browser data, it&apos;s gone. Future versions may offer optional 
                cloud backup, but always with the same privacy principles.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-cream-50 dark:bg-charcoal-950">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card text-center p-10"
            >
              <Shield className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" />
              <h2 className="text-2xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-4">
                Questions About Privacy?
              </h2>
              <p className="text-charcoal-600 dark:text-charcoal-400 mb-6 max-w-lg mx-auto">
                We&apos;re committed to transparency. If you have any questions about how we handle data,
                don&apos;t hesitate to reach out.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/faq" className="btn-primary">
                  View FAQ
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <a
                  href="mailto:privacy@halalmatches.com"
                  className="btn-secondary"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
