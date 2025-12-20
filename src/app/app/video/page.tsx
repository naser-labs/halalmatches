'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Play, ExternalLink, Trash2, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { getYouTubeVideo, saveYouTubeVideo, removeYouTubeVideo } from '@/lib/storage';
import type { YouTubeVideo } from '@/lib/types';

function extractVideoId(input: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function VideoPage() {
  const [videoData, setVideoData] = useState<YouTubeVideo | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('');
  const [isUnlisted, setIsUnlisted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const saved = getYouTubeVideo();
    if (saved) {
      setVideoData(saved);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const videoId = extractVideoId(inputValue.trim());
    if (!videoId) {
      setError('Please enter a valid YouTube video ID or URL');
      return;
    }

    if (!title.trim()) {
      setError('Please add a title for your video');
      return;
    }

    if (!isUnlisted) {
      setError('Please confirm your video is set to Unlisted');
      return;
    }

    const newVideo: YouTubeVideo = {
      videoId,
      title: title.trim(),
      addedAt: new Date().toISOString()
    };

    saveYouTubeVideo(newVideo);
    setVideoData(newVideo);
    setInputValue('');
    setTitle('');
    setIsUnlisted(false);
    setSuccess('Video saved successfully!');
  };

  const handleDelete = () => {
    removeYouTubeVideo();
    setVideoData(null);
    setSuccess('Video removed');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-charcoal-900 dark:text-cream-50 mb-2">
          Introduction Video
        </h1>
        <p className="text-charcoal-600 dark:text-charcoal-400">
          Add an unlisted YouTube video to introduce yourself to potential matches
        </p>
      </div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
      >
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
              Privacy First
            </h3>
            <p className="text-sm text-emerald-700 dark:text-emerald-400">
              Your video stays on your YouTube account. We only store the video ID to display it 
              on your profile. Set your video to &quot;Unlisted&quot; so only people with the link can view it.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Current Video */}
      {videoData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50 mb-4">
            Your Current Video
          </h2>
          
          <div className="aspect-video bg-charcoal-900 rounded-lg overflow-hidden mb-4">
            <iframe
              src={`https://www.youtube.com/embed/${videoData.videoId}`}
              title={videoData.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-charcoal-900 dark:text-cream-50">
                {videoData.title}
              </h3>
              <p className="text-sm text-charcoal-500 dark:text-charcoal-400">
                Added {new Date(videoData.addedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href={`https://www.youtube.com/watch?v=${videoData.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-charcoal-600 hover:text-emerald-600 dark:text-charcoal-400 dark:hover:text-emerald-400 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <button
                onClick={handleDelete}
                className="p-2 text-charcoal-600 hover:text-red-600 dark:text-charcoal-400 dark:hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Video Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50 mb-4">
          {videoData ? 'Replace Video' : 'Add Your Video'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-1">
              YouTube Video URL or ID
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="https://youtube.com/watch?v=... or video ID"
              className="input-field"
            />
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">
              Paste the full URL or just the 11-character video ID
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-1">
              Video Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Introduction"
              className="input-field"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isUnlisted}
              onChange={(e) => setIsUnlisted(e.target.checked)}
              className="mt-1 w-4 h-4 text-emerald-600 border-charcoal-300 rounded focus:ring-emerald-500"
            />
            <span className="text-sm text-charcoal-700 dark:text-charcoal-300">
              I confirm this video is set to <strong>Unlisted</strong> on YouTube 
              (not Public or Private)
            </span>
          </label>

          {error && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              {success}
            </div>
          )}

          <button type="submit" className="btn-primary w-full">
            <Video className="w-4 h-4 mr-2" />
            {videoData ? 'Update Video' : 'Save Video'}
          </button>
        </form>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card bg-charcoal-50 dark:bg-charcoal-800/50"
      >
        <h3 className="font-semibold text-charcoal-900 dark:text-cream-50 mb-3">
          How to Upload an Unlisted Video
        </h3>
        <ol className="space-y-2 text-sm text-charcoal-600 dark:text-charcoal-400">
          <li className="flex gap-2">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">1.</span>
            Go to YouTube Studio and upload your introduction video
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">2.</span>
            In visibility settings, select &quot;Unlisted&quot;
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">3.</span>
            Copy the video URL or ID from the address bar
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">4.</span>
            Paste it above and save
          </li>
        </ol>

        <div className="mt-4 p-3 bg-gold-100 dark:bg-gold-900/30 rounded-lg">
          <p className="text-sm text-gold-800 dark:text-gold-300">
            <strong>Tip:</strong> Keep your introduction brief (1-3 minutes). Share your name, 
            a bit about yourself, what you&apos;re looking for, and your approach to the deen.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
