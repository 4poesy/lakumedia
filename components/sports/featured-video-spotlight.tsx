'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Film, ChevronRight, Clock, Youtube, X } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  slug: string;
  thumbnail_url?: string | null;
  duration_seconds?: number | null;
  published_at?: string | null;
  youtubeId?: string;
}

interface FeaturedVideoSpotlightProps {
  videos: VideoItem[];
}

export function FeaturedVideoSpotlight({ videos }: FeaturedVideoSpotlightProps) {
  if (!videos || videos.length === 0) return null;

  const defaultImage =
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop';

  const defaultYoutubeIds = ['3Q06g9O0J-Y', 'dQw4w9WgXcQ', 'L_LUpnjgPso', 'kXYiU_JCYtU'];

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>('');

  const leadVideo = videos[0];
  const sideVideos = videos.slice(1, 4);

  const handlePlayInline = (youtubeId: string, title: string) => {
    setActiveVideoId(youtubeId);
    setActiveVideoTitle(title);
  };

  return (
    <section className="bg-slate-900 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl border border-slate-800 my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-6 rounded-full bg-[#D9541E]" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Film className="w-5 h-5 text-[#D9541E]" /> OFFICIAL LAKU MEDIA YOUTUBE & VIDEOS
          </h2>
        </div>
        <div className="px-3 py-1 rounded-xl bg-rose-600/90 text-white font-extrabold text-xs flex items-center gap-1.5 self-start sm:self-auto border border-rose-500">
          <Youtube className="w-4 h-4 fill-white" />
          <span>INLINE EMBEDDED PLAYER</span>
        </div>
      </div>

      {/* Active Modal / Inline Video Player if triggered */}
      {activeVideoId && (
        <div className="relative w-full h-[360px] sm:h-[480px] rounded-2xl overflow-hidden bg-black border-2 border-rose-600 shadow-2xl mb-6">
          <iframe
            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
            title={activeVideoTitle}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            onClick={() => setActiveVideoId(null)}
            className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-xl flex items-center gap-1.5 z-30"
          >
            <X className="w-4 h-4" /> Close Player
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Featured Video Left (7 cols / 60% width on desktop) */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl overflow-hidden shadow-lg group border border-slate-800 bg-slate-950">
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
            <Image
              src={leadVideo.thumbnail_url || defaultImage}
              alt={leadVideo.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Play Button Overlay triggers INLINE player inside page (NO tab navigation!) */}
            <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
              <button
                onClick={() =>
                  handlePlayInline(leadVideo.youtubeId || defaultYoutubeIds[0], leadVideo.title)
                }
                className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center pl-1 shadow-xl hover:scale-110 transition-transform"
                aria-label="Play Inline"
              >
                <Play className="w-7 h-7 fill-white" />
              </button>
            </div>
          </div>

          <div className="p-5 space-y-2 bg-slate-950 text-white flex-1 flex flex-col justify-between">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded bg-[#D9541E] text-white shadow-sm">
                Inline Video Stream
              </span>
              <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded bg-rose-600 text-white shadow-sm flex items-center gap-1">
                <Youtube className="w-3 h-3 fill-white" /> Click to Play Here
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-extrabold text-white leading-snug hover:text-[#D9541E] transition-colors">
              <button
                onClick={() =>
                  handlePlayInline(leadVideo.youtubeId || defaultYoutubeIds[0], leadVideo.title)
                }
                className="text-left font-extrabold text-white hover:text-[#D9541E]"
              >
                {leadVideo.title}
              </button>
            </h3>
          </div>
        </div>

        {/* Right Stacked Video List (5 cols / 40% width on desktop) */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
          {sideVideos.map((vid, idx) => (
            <div
              key={vid.id}
              className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-[#D9541E] transition-all group cursor-pointer"
              onClick={() =>
                handlePlayInline(vid.youtubeId || defaultYoutubeIds[idx + 1] || defaultYoutubeIds[0], vid.title)
              }
            >
              {/* Thumbnail Left */}
              <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                <Image
                  src={vid.thumbnail_url || defaultImage}
                  alt={vid.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              </div>

              {/* Title Right */}
              <div className="space-y-1 flex-1">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#D9541E] block">
                  PLAY INLINE
                </span>
                <h4 className="text-xs font-bold text-white group-hover:text-[#D9541E] transition-colors line-clamp-2 leading-snug">
                  {vid.title}
                </h4>
                <span className="text-[10px] text-slate-400 font-mono block">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {vid.duration_seconds ? `${Math.floor(vid.duration_seconds / 60)} min` : 'HD Stream'}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
