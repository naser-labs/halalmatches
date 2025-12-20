'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  HelpCircle,
  ChevronDown,
  Heart,
  Shield,
  Users,
  DollarSign,
  UserCheck,
  AlertCircle,
  Search,
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  // Not Dating
  {
    id: 'not-dating-1',
    category: 'not-dating',
    question: 'Is HalalMatches a dating app?',
    answer: 'Absolutely not. HalalMatches is a matrimonial platform exclusively for Muslims seeking marriage (nikah). We do not facilitate dating, casual relationships, or any interactions that go against Islamic principles. Every feature is designed to support the halal path to marriage with proper family involvement.',
  },
  {
    id: 'not-dating-2',
    category: 'not-dating',
    question: 'What makes this different from other Muslim apps?',
    answer: 'Three key differences: (1) Wali workflows are built-in, not optional — sisters must choose a path with appropriate oversight. (2) No free chat — all communication is structured and guided. (3) Privacy-first architecture — we don\'t store your photos, videos, or messages. We\'ve architected the platform so we can\'t be used for haram purposes.',
  },
  {
    id: 'not-dating-3',
    category: 'not-dating',
    question: 'Can I just chat casually with matches?',
    answer: 'No. We intentionally do not offer casual chat functionality. All communication happens through structured introduction templates and is facilitated via Google Chat with guided steps. This maintains Islamic boundaries and keeps conversations focused on the purpose: evaluating compatibility for marriage.',
  },
  
  // Adults Only
  {
    id: 'adults-1',
    category: 'adults-only',
    question: 'What is the minimum age to use HalalMatches?',
    answer: 'You must be 18 years or older to create an account on HalalMatches. This is a platform for adults who are ready for the responsibility of marriage. We verify age during the registration process.',
  },
  {
    id: 'adults-2',
    category: 'adults-only',
    question: 'Can parents create profiles on behalf of their children?',
    answer: 'For adults 18+, a parent or wali can assist in creating and managing a profile with the individual\'s full knowledge and consent. However, the individual must be an active, willing participant in the process. We do not allow profiles for minors under any circumstances.',
  },
  
  // Verification
  {
    id: 'verification-1',
    category: 'verification',
    question: 'How do you verify users are genuine?',
    answer: 'We use a multi-layer approach: (1) Google authentication ensures valid email accounts. (2) Video introductions help verify identity. (3) Wali/representative involvement adds accountability. (4) Community reporting system for suspicious accounts. (5) Optional enhanced verification through trusted references.',
  },
  {
    id: 'verification-2',
    category: 'verification',
    question: 'Do I need to upload ID documents?',
    answer: 'No, and we intentionally don\'t ask for them. We don\'t want to store such sensitive documents. Instead, we rely on wali/representative involvement, video verification, and community accountability. This respects your privacy while still maintaining trust.',
  },
  {
    id: 'verification-3',
    category: 'verification',
    question: 'What if someone creates a fake profile?',
    answer: 'Our multi-layer verification makes fake profiles difficult: wali involvement requires real relationships, video introductions show real people, and community reporting quickly flags suspicious accounts. If you suspect a fake profile, report it immediately and we\'ll investigate.',
  },
  
  // Women Without Wali
  {
    id: 'wali-1',
    category: 'women-without-wali',
    question: 'I don\'t have a wali. Can I still use HalalMatches?',
    answer: 'Yes! We have specific pathways for sisters without a wali. Path B allows you to work with a verified imam or masjid representative who can fulfill the wali role. Path C (for previously married sisters) offers a limited oversight option with community accountability. Every sister deserves support in her marriage journey.',
  },
  {
    id: 'wali-2',
    category: 'women-without-wali',
    question: 'My father isn\'t Muslim. Who can be my wali?',
    answer: 'In Islamic jurisprudence, the wali should be a Muslim male relative. This can be your brother, uncle, grandfather, or other eligible male family member. If no Muslim male relatives are available, a local imam or trusted Muslim community leader can serve as your wali through our Path B workflow.',
  },
  {
    id: 'wali-3',
    category: 'women-without-wali',
    question: 'What if my family doesn\'t support my marriage search?',
    answer: 'We understand this is a difficult situation. Our Path B allows you to work with a verified imam who can help mediate and potentially engage with your family. Many imams have experience bridging these gaps. We encourage family involvement whenever possible, but we won\'t leave you without support.',
  },
  {
    id: 'wali-4',
    category: 'women-without-wali',
    question: 'Is it halal to marry without a wali?',
    answer: 'This is a matter of scholarly discussion. The majority position requires wali involvement for a valid nikah. However, some scholars, particularly in the Hanafi school, allow a previously married woman to conduct her own marriage. We follow a cautious approach: Path C is only for previously married sisters, and includes community accountability. We encourage all sisters to consult with knowledgeable scholars.',
  },
  
  // Halal Monetization
  {
    id: 'monetization-1',
    category: 'halal-monetization',
    question: 'Is HalalMatches free?',
    answer: 'The core platform is free. We believe access to halal marriage shouldn\'t be gatekept by ability to pay. In the future, we may offer optional premium features (enhanced verification, priority support) for a modest fee, but the essential functionality will always be free.',
  },
  {
    id: 'monetization-2',
    category: 'halal-monetization',
    question: 'How will HalalMatches make money?',
    answer: 'We\'re committed to halal monetization only. Planned revenue streams include: (1) Optional premium features. (2) Voluntary donations/sadaqah. (3) Partnerships with halal wedding vendors. We will never sell your data, show haram advertisements, or use manipulative engagement tactics.',
  },
  {
    id: 'monetization-3',
    category: 'halal-monetization',
    question: 'Will you sell my data?',
    answer: 'Never. First, we barely collect any data — your photos, videos, and messages aren\'t stored on our servers. Second, selling user data goes against everything we stand for. Our business model is based on providing genuine value, not exploiting users.',
  },
  
  // Moderation
  {
    id: 'moderation-1',
    category: 'moderation',
    question: 'How do you moderate the platform?',
    answer: 'Moderation happens at multiple levels: (1) Community reporting — users can flag inappropriate behavior. (2) Wali oversight — family involvement provides natural accountability. (3) Structured communication — templates prevent inappropriate messages. (4) Review team — reported accounts are reviewed and actioned promptly.',
  },
  {
    id: 'moderation-2',
    category: 'moderation',
    question: 'What happens if someone behaves inappropriately?',
    answer: 'Inappropriate behavior results in warnings, account restrictions, or permanent bans depending on severity. Since walis are involved, they\'re also notified of any issues. Serious violations may be reported to relevant authorities. We take a zero-tolerance approach to harassment, fraud, or any behavior that violates Islamic ethics.',
  },
  {
    id: 'moderation-3',
    category: 'moderation',
    question: 'Can I report someone?',
    answer: 'Yes. Every profile and introduction has a report option. Reports are reviewed within 24-48 hours. You can report for: fake profiles, inappropriate messages, misrepresentation, harassment, or any behavior that makes you uncomfortable. Your reports help keep the community safe.',
  },
];

const categories = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'not-dating', label: 'Not Dating', icon: Heart },
  { id: 'adults-only', label: 'Adults Only', icon: UserCheck },
  { id: 'verification', label: 'Verification', icon: Shield },
  { id: 'women-without-wali', label: 'Women Without Wali', icon: Users },
  { id: 'halal-monetization', label: 'Halal Monetization', icon: DollarSign },
  { id: 'moderation', label: 'Moderation', icon: AlertCircle },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                <HelpCircle className="w-4 h-4" />
                Frequently Asked Questions
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-6">
                Got Questions?{' '}
                <span className="gradient-text">We&apos;ve Got Answers</span>
              </h1>
              <p className="text-lg text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                Everything you need to know about HalalMatches, our approach to privacy,
                and how we support your journey to halal marriage.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="py-8 bg-white dark:bg-charcoal-900 border-y border-cream-200 dark:border-charcoal-800 sticky top-16 lg:top-20 z-40">
          <div className="container-wide">
            {/* Search */}
            <div className="max-w-xl mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-12"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-emerald-700 text-white'
                      : 'bg-cream-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400 hover:bg-cream-200 dark:hover:bg-charcoal-700'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16 bg-cream-50 dark:bg-charcoal-950">
          <div className="container-narrow">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-charcoal-300 dark:text-charcoal-700 mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-charcoal-900 dark:text-cream-50 mb-2">
                  No Questions Found
                </h3>
                <p className="text-charcoal-600 dark:text-charcoal-400">
                  Try adjusting your search or filter to find what you&apos;re looking for.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="card overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === item.id ? null : item.id)
                      }
                      className="w-full flex items-start gap-4 text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg font-semibold text-charcoal-900 dark:text-cream-50 pr-8">
                          {item.question}
                        </h3>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-cream-200 dark:bg-charcoal-700 text-xs text-charcoal-600 dark:text-charcoal-400 capitalize">
                          {item.category.replace(/-/g, ' ')}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-charcoal-400 transition-transform flex-shrink-0 mt-2 ${
                          expandedId === item.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedId === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-cream-200 dark:border-charcoal-700 pl-14">
                            <p className="text-charcoal-600 dark:text-charcoal-400 leading-relaxed whitespace-pre-line">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-white dark:bg-charcoal-900">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card text-center p-10 bg-gradient-to-br from-emerald-50 to-gold-50 dark:from-emerald-950/50 dark:to-gold-950/30"
            >
              <HelpCircle className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" />
              <h2 className="text-2xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-charcoal-600 dark:text-charcoal-400 mb-6 max-w-lg mx-auto">
                Can&apos;t find what you&apos;re looking for? We&apos;re here to help. 
                Reach out and we&apos;ll get back to you as soon as possible.
              </p>
              <a
                href="mailto:salam@halalmatches.com"
                className="btn-primary"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
