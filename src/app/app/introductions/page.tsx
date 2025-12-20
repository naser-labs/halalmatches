'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  User,
  Heart,
  Shield,
  Copy,
  Check
} from 'lucide-react';
import { getIntroductions, addIntroduction, getProfile } from '@/lib/storage';
import type { Introduction, UserProfile } from '@/lib/types';

const INTRO_TEMPLATES = [
  {
    id: 'formal',
    name: 'Formal Introduction',
    template: `Assalamu Alaikum,

My name is [YOUR_NAME] and I came across your profile on HalalMatches. I am reaching out with the intention of marriage, in accordance with Islamic principles.

I am [AGE] years old, [OCCUPATION], and currently based in [LOCATION]. I practice [MADHAB/APPROACH] and am looking for a spouse who shares similar values.

If you are interested, I would be happy to have our families/walis connect to discuss further.

JazakAllahu Khair`
  },
  {
    id: 'brief',
    name: 'Brief & Direct',
    template: `Assalamu Alaikum,

I'm [YOUR_NAME]. Your profile resonated with what I'm looking for in a spouse. I'm serious about marriage and would like to know if you'd be open to a halal conversation with wali involvement.

Please let me know if you're interested.

Wassalam`
  },
  {
    id: 'wali-first',
    name: 'Wali-First Approach',
    template: `Assalamu Alaikum,

I am writing on behalf of my [son/daughter/self], [NAME], regarding your profile on HalalMatches.

We would like to initiate a conversation about the possibility of marriage. Our family takes this matter seriously and we prefer to proceed with proper Islamic guidelines from the start.

Please have your wali contact us at [CONTACT] if there is interest.

JazakAllahu Khair`
  }
];

export default function IntroductionsPage() {
  const [introductions, setIntroductions] = useState<Introduction[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(INTRO_TEMPLATES[0]);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'send' | 'history'>('send');

  useEffect(() => {
    setIntroductions(getIntroductions());
    setProfile(getProfile());
    setCustomMessage(INTRO_TEMPLATES[0].template);
  }, []);

  const handleTemplateChange = (template: typeof INTRO_TEMPLATES[0]) => {
    setSelectedTemplate(template);
    setCustomMessage(template.template);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(customMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openGoogleChat = () => {
    if (!recipientEmail) return;
    
    // Create introduction record
    const intro: Omit<Introduction, 'id' | 'createdAt'> = {
      recipientId: recipientEmail,
      recipientName: recipientEmail.split('@')[0],
      templateUsed: selectedTemplate.id,
      sentAt: new Date().toISOString(),
      status: 'pending'
    };
    
    addIntroduction(intro);
    setIntroductions([{ ...intro, id: Date.now().toString(), createdAt: new Date().toISOString() }, ...introductions]);
    
    // Open Google Chat
    const chatUrl = `https://mail.google.com/chat/dm/${encodeURIComponent(recipientEmail)}`;
    window.open(chatUrl, '_blank');
  };

  const getStatusIcon = (status: Introduction['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-gold-500" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'declined':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: Introduction['status']) => {
    switch (status) {
      case 'pending':
        return 'Awaiting Response';
      case 'accepted':
        return 'Accepted';
      case 'declined':
        return 'Declined';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-2">
          Introductions
        </h1>
        <p className="text-charcoal-600 dark:text-charcoal-400">
          Send structured, halal introductions via Google Chat
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-charcoal-200 dark:border-charcoal-700">
        <button
          onClick={() => setActiveTab('send')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
            activeTab === 'send'
              ? 'text-emerald-600 border-emerald-600'
              : 'text-charcoal-500 border-transparent hover:text-charcoal-700'
          }`}
        >
          <Send className="w-4 h-4 inline mr-2" />
          Send Introduction
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
            activeTab === 'history'
              ? 'text-emerald-600 border-emerald-600'
              : 'text-charcoal-500 border-transparent hover:text-charcoal-700'
          }`}
        >
          <Clock className="w-4 h-4 inline mr-2" />
          History ({introductions.length})
        </button>
      </div>

      {activeTab === 'send' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Guidelines */}
          <div className="card bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
                  Halal Communication Guidelines
                </h3>
                <ul className="text-sm text-emerald-700 dark:text-emerald-400 space-y-1">
                  <li>• Keep conversations purposeful and marriage-focused</li>
                  <li>• Involve walis/guardians early in the process</li>
                  <li>• Avoid casual chatting or emotional attachment before commitment</li>
                  <li>• Be respectful and straightforward with intentions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Template Selection */}
          <div className="card">
            <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50 mb-4">
              Choose a Template
            </h2>
            <div className="grid gap-3">
              {INTRO_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateChange(template)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedTemplate.id === template.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-charcoal-200 dark:border-charcoal-700 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedTemplate.id === template.id
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-charcoal-300'
                    }`}>
                      {selectedTemplate.id === template.id && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="font-medium text-charcoal-900 dark:text-cream-50">
                      {template.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message Editor */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                Customize Your Message
              </h2>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={12}
              className="input-field font-mono text-sm"
              placeholder="Write your introduction message..."
            />
            <p className="text-xs text-charcoal-500 mt-2">
              Replace bracketed placeholders [LIKE_THIS] with your information
            </p>
          </div>

          {/* Send Section */}
          <div className="card">
            <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50 mb-4">
              Send via Google Chat
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-1">
                  Recipient&apos;s Email
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="their.email@gmail.com"
                  className="input-field"
                />
              </div>
              
              <div className="bg-charcoal-50 dark:bg-charcoal-800 rounded-lg p-4">
                <h3 className="font-medium text-charcoal-900 dark:text-cream-50 mb-2">
                  How this works:
                </h3>
                <ol className="text-sm text-charcoal-600 dark:text-charcoal-400 space-y-1">
                  <li>1. Click the button below to open Google Chat</li>
                  <li>2. Paste your customized message (already copied)</li>
                  <li>3. Send your introduction</li>
                  <li>4. We&apos;ll track it in your history</li>
                </ol>
              </div>

              <button
                onClick={openGoogleChat}
                disabled={!recipientEmail}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Google Chat & Send
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'history' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {introductions.length === 0 ? (
            <div className="card text-center py-12">
              <MessageSquare className="w-12 h-12 text-charcoal-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-charcoal-900 dark:text-cream-50 mb-2">
                No introductions yet
              </h3>
              <p className="text-charcoal-600 dark:text-charcoal-400">
                When you send introductions, they&apos;ll appear here
              </p>
            </div>
          ) : (
            introductions.map((intro) => (
              <div key={intro.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <User className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal-900 dark:text-cream-50">
                        {intro.recipientName || intro.recipientId}
                      </h3>
                      <p className="text-sm text-charcoal-500">
                        {new Date(intro.sentAt).toLocaleDateString()} • {
                          INTRO_TEMPLATES.find(t => t.id === intro.templateUsed)?.name || 'Custom'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(intro.status)}
                    <span className={`text-sm ${
                      intro.status === 'pending' ? 'text-gold-600' :
                      intro.status === 'accepted' ? 'text-emerald-600' :
                      'text-red-600'
                    }`}>
                      {getStatusText(intro.status)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
}
