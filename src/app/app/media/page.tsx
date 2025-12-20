'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image,
  Plus,
  Trash2,
  ExternalLink,
  Info,
  CheckCircle2,
  AlertCircle,
  Upload,
  Link as LinkIcon,
  Eye,
  Shield,
} from 'lucide-react';
import { getDriveMedia, addDriveMedia, removeDriveMedia } from '@/lib/storage';
import type { DriveMedia } from '@/lib/types';

export default function MediaPage() {
  const [media, setMedia] = useState<DriveMedia[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFileId, setNewFileId] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [error, setError] = useState('');
  const [previewId, setPreviewId] = useState<string | null>(null);

  useEffect(() => {
    setMedia(getDriveMedia());
  }, []);

  const extractFileId = (input: string): string | null => {
    // Handle direct file IDs
    if (/^[a-zA-Z0-9_-]{25,}$/.test(input.trim())) {
      return input.trim();
    }
    
    // Handle Google Drive URLs
    const patterns = [
      /\/file\/d\/([a-zA-Z0-9_-]+)/,
      /id=([a-zA-Z0-9_-]+)/,
      /\/d\/([a-zA-Z0-9_-]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) return match[1];
    }
    
    return null;
  };

  const handleAddMedia = () => {
    const fileId = extractFileId(newFileId);
    
    if (!fileId) {
      setError('Invalid Google Drive file ID or URL. Please check and try again.');
      return;
    }
    
    if (media.some(m => m.fileId === fileId)) {
      setError('This photo has already been added.');
      return;
    }
    
    if (media.length >= 6) {
      setError('Maximum 6 photos allowed.');
      return;
    }
    
    const newMedia = {
      id: `media_${Date.now()}`,
      fileId,
      caption: newCaption.trim() || undefined,
      order: media.length,
    };
    
    const updated = addDriveMedia(newMedia);
    setMedia(updated);
    setNewFileId('');
    setNewCaption('');
    setShowAddModal(false);
    setError('');
  };

  const handleRemove = (fileId: string) => {
    const updated = removeDriveMedia(fileId);
    setMedia(updated);
  };

  const getThumbnailUrl = (fileId: string) => {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
  };

  const getViewUrl = (fileId: string) => {
    return `https://drive.google.com/file/d/${fileId}/view`;
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
              Your Photos
            </h1>
            <p className="text-charcoal-600 dark:text-charcoal-400 mt-1">
              Link photos from your Google Drive • {media.length}/6 added
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            disabled={media.length >= 6}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-charcoal-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Photo
          </button>
        </div>

        {/* Privacy Info */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex-shrink-0">
              <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
                Privacy-First Photo Storage
              </h3>
              <ul className="text-sm text-emerald-700 dark:text-emerald-400 space-y-1">
                <li>• Your photos stay in YOUR Google Drive - we never copy or store them</li>
                <li>• We only save the file ID (a reference) in your browser</li>
                <li>• You control who can see your photos via Google Drive sharing settings</li>
                <li>• Make sure your photos are set to "Anyone with the link can view"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-cream-200 dark:border-charcoal-800 p-6">
          <h3 className="font-semibold text-charcoal-900 dark:text-cream-50 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-600" />
            How to Add Photos
          </h3>
          <ol className="space-y-3 text-sm text-charcoal-600 dark:text-charcoal-400">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center justify-center font-medium text-xs">1</span>
              <span>Upload your photo to Google Drive if you haven't already</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center justify-center font-medium text-xs">2</span>
              <span>Right-click the file → Share → Change to "Anyone with the link"</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center justify-center font-medium text-xs">3</span>
              <span>Copy the sharing link or file ID</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center justify-center font-medium text-xs">4</span>
              <span>Paste it here - we'll extract the file ID automatically</span>
            </li>
          </ol>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {media.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square rounded-2xl overflow-hidden bg-cream-100 dark:bg-charcoal-800 border border-cream-200 dark:border-charcoal-700"
              >
                <img
                  src={getThumbnailUrl(item.fileId)}
                  alt={item.caption || 'Photo'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23e5e5e5" width="100" height="100"/><text x="50" y="55" font-size="12" text-anchor="middle" fill="%23999">Photo</text></svg>';
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    {item.caption && (
                      <p className="text-white text-sm mb-2 line-clamp-2">{item.caption}</p>
                    )}
                    <div className="flex gap-2">
                      <a
                        href={getViewUrl(item.fileId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </a>
                      <button
                        onClick={() => handleRemove(item.fileId)}
                        className="p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty slots */}
          {Array.from({ length: Math.max(0, 6 - media.length) }).map((_, i) => (
            <button
              key={`empty-${i}`}
              onClick={() => setShowAddModal(true)}
              className="aspect-square rounded-2xl border-2 border-dashed border-cream-300 dark:border-charcoal-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors flex flex-col items-center justify-center gap-2 text-charcoal-400 dark:text-charcoal-500 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <Plus className="w-8 h-8" />
              <span className="text-sm">Add Photo</span>
            </button>
          ))}
        </div>

        {/* Add Modal */}
        <AnimatePresence>
          {showAddModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddModal(false)}
                className="fixed inset-0 bg-charcoal-900/50 z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-charcoal-900 rounded-2xl shadow-xl z-50 overflow-hidden"
              >
                <div className="p-6 border-b border-cream-200 dark:border-charcoal-800">
                  <h2 className="text-xl font-display font-semibold text-charcoal-900 dark:text-cream-50">
                    Add Photo from Google Drive
                  </h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                      Google Drive Link or File ID *
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                      <input
                        type="text"
                        value={newFileId}
                        onChange={(e) => {
                          setNewFileId(e.target.value);
                          setError('');
                        }}
                        className="input-field pl-10"
                        placeholder="Paste Google Drive link or file ID"
                      />
                    </div>
                    <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">
                      Example: https://drive.google.com/file/d/ABC123.../view
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                      Caption (Optional)
                    </label>
                    <input
                      type="text"
                      value={newCaption}
                      onChange={(e) => setNewCaption(e.target.value)}
                      className="input-field"
                      placeholder="Add a caption for this photo"
                    />
                  </div>
                  
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </div>
                  )}
                </div>
                
                <div className="p-6 bg-cream-50 dark:bg-charcoal-800 border-t border-cream-200 dark:border-charcoal-700 flex gap-3">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setNewFileId('');
                      setNewCaption('');
                      setError('');
                    }}
                    className="flex-1 px-4 py-2.5 bg-white dark:bg-charcoal-900 border border-cream-300 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-300 rounded-xl font-medium hover:bg-cream-100 dark:hover:bg-charcoal-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMedia}
                    className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
                  >
                    Add Photo
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
