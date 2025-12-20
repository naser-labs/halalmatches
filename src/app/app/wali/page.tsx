'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  User, 
  Building2, 
  UserCheck,
  CheckCircle,
  Info,
  ExternalLink
} from 'lucide-react';
import { getWaliStatus, saveWaliStatus } from '@/lib/storage';
import type { WaliStatus } from '@/lib/types';
import Link from 'next/link';

const WALI_PATHS = [
  {
    id: 'traditional' as const,
    title: 'Traditional Wali',
    icon: User,
    description: 'My father or male guardian will be involved from the beginning',
    details: [
      'Father, grandfather, or male relative acts as wali',
      'Direct involvement in all communications',
      'Traditional family-to-family approach',
      'Most structured and protected process'
    ],
    color: 'emerald'
  },
  {
    id: 'imam' as const,
    title: 'Imam/Masjid Representative',
    icon: Building2,
    description: 'An imam or masjid representative will serve as my wali',
    details: [
      'For sisters without accessible male relatives',
      'Local imam assumes wali responsibilities',
      'Provides Islamic oversight and protection',
      'Requires verification of imam credentials'
    ],
    color: 'blue'
  },
  {
    id: 'limited' as const,
    title: 'Limited Oversight',
    icon: UserCheck,
    description: 'I am a previously married woman seeking limited oversight',
    details: [
      'For divorced or widowed sisters',
      'Trusted advisor rather than formal wali',
      'More autonomy in the process',
      'Still maintains Islamic boundaries'
    ],
    color: 'gold'
  }
];

export default function WaliPage() {
  const [waliStatus, setWaliStatus] = useState<WaliStatus | null>(null);
  const [selectedPath, setSelectedPath] = useState<'traditional' | 'imam' | 'limited' | null>(null);
  const [waliName, setWaliName] = useState('');
  const [waliRelation, setWaliRelation] = useState('');
  const [waliContact, setWaliContact] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const status = getWaliStatus();
    if (status) {
      setWaliStatus(status);
      setSelectedPath(status.path);
      setWaliName(status.waliName || '');
      setWaliRelation(status.waliRelation || '');
      setWaliContact(status.waliContact || '');
    }
  }, []);

  const handleSave = () => {
    if (!selectedPath) return;

    const status: WaliStatus = {
      path: selectedPath,
      waliName: waliName || undefined,
      waliRelation: waliRelation || undefined,
      waliContact: waliContact || undefined,
      verified: false,
      updatedAt: new Date().toISOString()
    };

    saveWaliStatus(status);
    setWaliStatus(status);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-2">
          Wali Status
        </h1>
        <p className="text-charcoal-600 dark:text-charcoal-400">
          Configure your wali/guardian arrangement for the marriage process
        </p>
      </div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
      >
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
              Why Wali Involvement Matters
            </h3>
            <p className="text-sm text-emerald-700 dark:text-emerald-400">
              In Islamic tradition, the wali (guardian) provides protection, guidance, and legitimacy 
              to the marriage process. This ensures proper Islamic boundaries are maintained and helps 
              both parties make wise decisions with family support.
            </p>
            <Link 
              href="/wali-workflows"
              className="inline-flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 hover:underline mt-2"
            >
              Learn more about wali workflows
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Path Selection */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50">
          Select Your Path
        </h2>
        
        <div className="grid gap-4">
          {WALI_PATHS.map((path) => {
            const Icon = path.icon;
            const isSelected = selectedPath === path.id;
            
            return (
              <motion.button
                key={path.id}
                onClick={() => setSelectedPath(path.id)}
                className={`card text-left transition-all ${
                  isSelected 
                    ? 'ring-2 ring-emerald-500 border-emerald-500' 
                    : 'hover:border-emerald-300'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    path.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                    path.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    'bg-gold-100 dark:bg-gold-900/30'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      path.color === 'emerald' ? 'text-emerald-600' :
                      path.color === 'blue' ? 'text-blue-600' :
                      'text-gold-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-charcoal-900 dark:text-cream-50">
                        {path.title}
                      </h3>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      )}
                    </div>
                    <p className="text-sm text-charcoal-600 dark:text-charcoal-400 mt-1">
                      {path.description}
                    </p>
                    {isSelected && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 space-y-1"
                      >
                        {path.details.map((detail, idx) => (
                          <li key={idx} className="text-sm text-charcoal-500 dark:text-charcoal-400 flex items-start gap-2">
                            <span className="text-emerald-500 mt-1">•</span>
                            {detail}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Wali Details Form */}
      {selectedPath && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50 mb-4">
            {selectedPath === 'traditional' ? 'Wali Details' :
             selectedPath === 'imam' ? 'Imam/Representative Details' :
             'Advisor Details'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-1">
                Name
              </label>
              <input
                type="text"
                value={waliName}
                onChange={(e) => setWaliName(e.target.value)}
                placeholder={selectedPath === 'imam' ? "Imam's name" : "Wali's name"}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-1">
                Relation/Title
              </label>
              <input
                type="text"
                value={waliRelation}
                onChange={(e) => setWaliRelation(e.target.value)}
                placeholder={
                  selectedPath === 'traditional' ? "e.g., Father, Uncle, Brother" :
                  selectedPath === 'imam' ? "e.g., Imam at [Masjid Name]" :
                  "e.g., Trusted Family Friend, Elder"
                }
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-1">
                Contact (optional)
              </label>
              <input
                type="text"
                value={waliContact}
                onChange={(e) => setWaliContact(e.target.value)}
                placeholder="Email or phone"
                className="input-field"
              />
              <p className="text-xs text-charcoal-500 mt-1">
                This will only be shared with serious prospects
              </p>
            </div>

            <button
              onClick={handleSave}
              className="btn-primary w-full"
            >
              {saved ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Saved!
                </>
              ) : (
                'Save Wali Status'
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* Current Status */}
      {waliStatus && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card bg-charcoal-50 dark:bg-charcoal-800/50"
        >
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-charcoal-500" />
            <span className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
              Current Status
            </span>
          </div>
          <p className="text-charcoal-600 dark:text-charcoal-400">
            <strong>Path:</strong> {WALI_PATHS.find(p => p.id === waliStatus.path)?.title}
            {waliStatus.waliName && (
              <><br /><strong>Wali:</strong> {waliStatus.waliName} ({waliStatus.waliRelation})</>
            )}
            <br />
            <span className="text-sm">
              Last updated: {new Date(waliStatus.updatedAt).toLocaleDateString()}
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
}
