'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Users,
  User,
  Building2,
  Shield,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Heart,
  MessageSquare,
  Eye,
  UserCheck,
  Clock,
  AlertCircle,
} from 'lucide-react';

type PathType = 'path-a' | 'path-b' | 'path-c';

interface PathInfo {
  id: PathType;
  title: string;
  subtitle: string;
  icon: typeof Users;
  description: string;
  color: string;
  steps: {
    title: string;
    description: string;
    details?: string[];
  }[];
}

const paths: PathInfo[] = [
  {
    id: 'path-a',
    title: 'Path A: With Wali',
    subtitle: 'Traditional wali involvement',
    icon: Users,
    description: 'For sisters who have a father, grandfather, brother, or other eligible male guardian to serve as their wali. This is the standard Islamic approach.',
    color: 'emerald',
    steps: [
      {
        title: 'Profile Creation',
        description: 'Sister creates her marriage profile with her preferences and requirements.',
        details: [
          'Basic information and marriage goals',
          'Religious practice and preferences',
          'Educational/career background',
        ],
      },
      {
        title: 'Wali Registration',
        description: 'Wali is added to the account with his own access credentials.',
        details: [
          'Wali creates his own profile',
          'Linked to sister\'s account',
          'Receives all introduction requests',
        ],
      },
      {
        title: 'Profile Review',
        description: 'Wali reviews and approves the sister\'s profile before it goes live.',
        details: [
          'Wali can suggest edits',
          'Final approval required',
          'Both can update preferences',
        ],
      },
      {
        title: 'Introduction Requests',
        description: 'Interested brothers send structured introduction requests.',
        details: [
          'Template-based messages',
          'Brother\'s wali info included',
          'Goes to both sister and her wali',
        ],
      },
      {
        title: 'Wali-Led Conversations',
        description: 'Wali conducts initial conversations with interested brothers.',
        details: [
          'Via Google Chat deep links',
          'Can include brother\'s wali',
          'Sister kept informed',
        ],
      },
      {
        title: 'Guided Next Steps',
        description: 'If mutually interested, guided process for istikhara, meetings, and nikah preparation.',
        details: [
          'Istikhara guidance',
          'Family meeting coordination',
          'Resources for nikah preparation',
        ],
      },
    ],
  },
  {
    id: 'path-b',
    title: 'Path B: Imam/Masjid Representative',
    subtitle: 'Community-supported process',
    icon: Building2,
    description: 'For sisters without an available wali. A local imam or masjid representative can fulfill this role with proper verification.',
    color: 'blue',
    steps: [
      {
        title: 'Profile Creation',
        description: 'Sister creates her marriage profile and indicates need for wali support.',
        details: [
          'Select "Need Wali Support" option',
          'Explain your situation briefly',
          'Specify your location/region',
        ],
      },
      {
        title: 'Find a Representative',
        description: 'Use our directory or submit your local imam/masjid contact.',
        details: [
          'Search verified representatives',
          'Or submit your local imam',
          'We verify credentials',
        ],
      },
      {
        title: 'Verification Process',
        description: 'Representative is verified and agrees to serve in wali capacity.',
        details: [
          'Credential verification',
          'Brief interview process',
          'Agreement to guidelines',
        ],
      },
      {
        title: 'Representative Onboarding',
        description: 'Representative is added to account with appropriate access.',
        details: [
          'Receives introduction requests',
          'Can communicate with interested brothers',
          'Maintains Islamic boundaries',
        ],
      },
      {
        title: 'Managed Introductions',
        description: 'Representative manages the introduction process on sister\'s behalf.',
        details: [
          'Screens incoming requests',
          'Conducts initial conversations',
          'Reports to sister',
        ],
      },
      {
        title: 'Guided Conclusion',
        description: 'Representative helps guide the process to appropriate conclusion.',
        details: [
          'Facilitates family meetings',
          'Coordinates with brother\'s side',
          'Supports nikah preparation',
        ],
      },
    ],
  },
  {
    id: 'path-c',
    title: 'Path C: Limited Oversight',
    subtitle: 'For specific circumstances',
    icon: User,
    description: 'For mature, previously married sisters (divorced/widowed) who may conduct their own marriage affairs according to certain scholarly opinions, with community accountability.',
    color: 'amber',
    steps: [
      {
        title: 'Eligibility Verification',
        description: 'Confirm eligibility for limited oversight pathway.',
        details: [
          'Must be previously married',
          'Age and maturity consideration',
          'Acknowledgment of process',
        ],
      },
      {
        title: 'Profile with Attestation',
        description: 'Create profile with attestation of circumstances.',
        details: [
          'Detailed profile creation',
          'Statement of circumstances',
          'Agree to accountability measures',
        ],
      },
      {
        title: 'Community Accountability',
        description: 'Select a female accountability partner from the community.',
        details: [
          'Verified female mentor',
          'Regular check-ins',
          'Guidance and support',
        ],
      },
      {
        title: 'Direct Introductions',
        description: 'Receive and respond to introduction requests directly.',
        details: [
          'Template-based messages only',
          'Clear boundaries maintained',
          'Accountability partner notified',
        ],
      },
      {
        title: 'Guided Conversations',
        description: 'Conduct conversations with accountability measures.',
        details: [
          'Via Google Chat',
          'Accountability partner access',
          'Structured discussion topics',
        ],
      },
      {
        title: 'Family Involvement',
        description: 'Strong encouragement to involve family before nikah.',
        details: [
          'Family notification guidance',
          'Meeting coordination',
          'Nikah preparation resources',
        ],
      },
    ],
  },
];

export default function WaliWorkflowsPage() {
  const [activePath, setActivePath] = useState<PathType>('path-a');
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const currentPath = paths.find((p) => p.id === activePath)!;

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
                <Users className="w-4 h-4" />
                Structured Support for Every Sister
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-6">
                Wali Workflows
              </h1>
              <p className="text-lg text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                We believe every sister deserves proper support in her marriage journey.
                Choose the path that fits your situation — all lead to dignified, 
                halal introductions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Path Selector */}
        <section className="py-12 bg-white dark:bg-charcoal-900 border-y border-cream-200 dark:border-charcoal-800">
          <div className="container-wide">
            <div className="grid md:grid-cols-3 gap-4">
              {paths.map((path) => (
                <motion.button
                  key={path.id}
                  onClick={() => {
                    setActivePath(path.id);
                    setExpandedStep(0);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-6 rounded-2xl text-left transition-all duration-300 ${
                    activePath === path.id
                      ? `bg-${path.color}-50 dark:bg-${path.color}-950/50 border-2 border-${path.color}-500 shadow-glow`
                      : 'bg-cream-50 dark:bg-charcoal-800 border-2 border-transparent hover:border-cream-300 dark:hover:border-charcoal-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        activePath === path.id
                          ? `bg-${path.color}-500 text-white`
                          : 'bg-cream-200 dark:bg-charcoal-700 text-charcoal-600 dark:text-charcoal-400'
                      }`}
                    >
                      <path.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                        {path.title}
                      </h3>
                      <p className="text-sm text-charcoal-500 dark:text-charcoal-400">
                        {path.subtitle}
                      </p>
                    </div>
                  </div>
                  {activePath === path.id && (
                    <motion.div
                      layoutId="activePath"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-emerald-500 rounded-t-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Path Details */}
        <section className="py-16 bg-cream-50 dark:bg-charcoal-950">
          <div className="container-wide">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePath}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Path Description */}
                <div className="max-w-3xl mx-auto text-center mb-12">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-4">
                    {currentPath.title}
                  </h2>
                  <p className="text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                    {currentPath.description}
                  </p>
                </div>

                {/* Stepper */}
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-4">
                    {currentPath.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative"
                      >
                        {/* Connector Line */}
                        {index < currentPath.steps.length - 1 && (
                          <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-cream-300 dark:bg-charcoal-700" />
                        )}

                        <div
                          className={`card cursor-pointer transition-all duration-300 ${
                            expandedStep === index
                              ? 'ring-2 ring-emerald-500 shadow-glow'
                              : 'hover:shadow-soft-lg'
                          }`}
                          onClick={() =>
                            setExpandedStep(expandedStep === index ? null : index)
                          }
                        >
                          <div className="flex items-start gap-4">
                            {/* Step Number */}
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg flex-shrink-0 ${
                                expandedStep === index
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400'
                              }`}
                            >
                              {index + 1}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-4">
                                <h3 className="font-display text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                                  {step.title}
                                </h3>
                                <ChevronDown
                                  className={`w-5 h-5 text-charcoal-400 transition-transform flex-shrink-0 ${
                                    expandedStep === index ? 'rotate-180' : ''
                                  }`}
                                />
                              </div>
                              <p className="text-charcoal-600 dark:text-charcoal-400 mt-1">
                                {step.description}
                              </p>

                              {/* Expanded Details */}
                              <AnimatePresence>
                                {expandedStep === index && step.details && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="mt-4 pt-4 border-t border-cream-200 dark:border-charcoal-700"
                                  >
                                    <ul className="space-y-2">
                                      {step.details.map((detail, i) => (
                                        <li
                                          key={i}
                                          className="flex items-center gap-2 text-charcoal-600 dark:text-charcoal-400"
                                        >
                                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                          {detail}
                                        </li>
                                      ))}
                                    </ul>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="max-w-xl mx-auto mt-12 text-center">
                  <div className="card p-8 bg-gradient-to-br from-emerald-50 to-gold-50 dark:from-emerald-950/50 dark:to-gold-950/30 border-emerald-200 dark:border-emerald-800">
                    <h3 className="font-display text-xl font-semibold text-charcoal-900 dark:text-cream-50 mb-3">
                      Ready to Begin?
                    </h3>
                    <p className="text-charcoal-600 dark:text-charcoal-400 mb-6">
                      Join our waitlist to be notified when we launch. May Allah guide you to a righteous spouse.
                    </p>
                    <Link href="/#waitlist" className="btn-primary">
                      Join Waitlist
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-16 bg-white dark:bg-charcoal-900">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-4">
                Common Questions About Wali
              </h2>
              <p className="text-charcoal-600 dark:text-charcoal-400 mb-8">
                We understand this is a sensitive topic. Here are some quick answers.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-left">
                {[
                  {
                    q: 'What if my father isn\'t Muslim?',
                    a: 'The next eligible male relative (brother, uncle, grandfather) can serve as wali, or an imam can fulfill this role.',
                  },
                  {
                    q: 'Can I switch paths later?',
                    a: 'Yes, your circumstances may change. You can update your wali status at any time.',
                  },
                  {
                    q: 'Is Path C really halal?',
                    a: 'It follows scholarly opinions for previously married women, with accountability measures. Consult your local scholar.',
                  },
                  {
                    q: 'How are imams verified?',
                    a: 'We verify credentials, community standing, and conduct brief interviews before listing.',
                  },
                ].map((item, i) => (
                  <div key={i} className="card p-5">
                    <h4 className="font-medium text-charcoal-900 dark:text-cream-50 mb-2">
                      {item.q}
                    </h4>
                    <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/faq"
                className="inline-flex items-center gap-2 mt-8 text-emerald-700 dark:text-emerald-400 font-medium hover:underline"
              >
                View All FAQs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
