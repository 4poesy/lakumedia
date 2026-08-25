'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, X, Youtube } from 'lucide-react';

interface EmbeddedYoutubePlayerProps {
  title: string;
  youtubeVideoId?: string;
  thumbnailUrl?: string;
}

export function EmbeddedYoutubePlayer({
  title,
  youtubeVideoId = 'dQw4w9WgXcQ', // default video id or demo highlights
  thumbnailUrl = 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop',
}: EmbeddedYoutubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group">
      {isPlaying ? (
        <div className="relative w-full h-full">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md flex items-center gap-1 z-20"
          >
            <X className="w-4 h-4" /> Close Video
          </button>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Solid Dark Tint Box */}
          <div className="absolute inset-0 bg-slate-950/40" />

          {/* Inline Play Trigger (Stays in Interface, NO new tab!) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center pl-1 shadow-2xl hover:scale-110 transition-transform group/play"
              aria-label="Play Video Inline"
            >
              <Play className="w-7 h-7 fill-white" />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/90 text-white border border-slate-800 space-y-1">
            <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded bg-rose-600 text-white inline-flex items-center gap-1">
              <Youtube className="w-3 h-3 fill-white" /> INLINE YOUTUBE STREAM
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-white line-clamp-1">
              {title}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
