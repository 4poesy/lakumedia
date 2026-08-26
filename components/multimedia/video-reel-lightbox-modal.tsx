'use client';

import React from 'react';
import { X, Play } from 'lucide-react';

interface VideoReelLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeId: string;
  title: string;
}

export function VideoReelLightboxModal({
  isOpen,
  onClose,
  youtubeId,
  title,
}: VideoReelLightboxModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#D9541E] flex items-center justify-center text-white">
              <Play className="w-4 h-4 fill-white" />
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-white truncate max-w-md">
              {title || 'Laku Media Production Reel'}
            </h3>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl bg-slate-800 hover:bg-[#D9541E] text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded YouTube Player */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

      </div>
    </div>
  );
}
