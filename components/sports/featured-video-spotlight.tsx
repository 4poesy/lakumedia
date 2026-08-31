'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Film, ChevronRight, Clock, Youtube, X, ExternalLink } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  slug?: string;
  thumbnail_url?: string | null;
  duration_seconds?: number | null;
  published_at?: string | null;
  youtubeId?: string;
}

interface FeaturedVideoSpotlightProps {
  videos?: VideoItem[];
}

export function FeaturedVideoSpotlight({ videos }: FeaturedVideoSpotlightProps) {
  const FOOTBALL_FOCUS_VIDEOS: VideoItem[] = [
    {
      id: 'ff-1',
      title: 'Football Focus Extra — Exclusive Match Highlights & Tactical Breakdown',
      youtubeId: 'r6KHfURs22I',
      thumbnail_url: 'https://img.youtube.com/vi/r6KHfURs22I/hqdefault.jpg',
    },
    {
      id: 'ff-2',
      title: 'Super Eagles & Global Football Analysis | Football Focus Extra',
      youtubeId: 'W069gYjEYiA',
      thumbnail_url: 'https://img.youtube.com/vi/W069gYjEYiA/hqdefault.jpg',
    },
    {
      id: 'ff-3',
      title: 'Top Transfers & League Debates | Football Focus Extra Edition',
      youtubeId: 'xHzmsKX0-gY',
      thumbnail_url: 'https://img.youtube.com/vi/xHzmsKX0-gY/hqdefault.jpg',
    },
    {
      id: 'ff-4',
      title: 'Football Focus Extra Live Studio Discussion & Expert Insights',
      youtubeId: 'OuY70arpOy4',
      thumbnail_url: 'https://img.youtube.com/vi/OuY70arpOy4/hqdefault.jpg',
    },
  ];

  const activeVideoList = videos && videos.length > 0 ? videos : FOOTBALL_FOCUS_VIDEOS;

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>('');

  const leadVideo = activeVideoList[0];
  const sideVideos = activeVideoList.slice(1, 4);

  const handlePlayInline = (youtubeId: string, title: string) => {
    setActiveVideoId(youtubeId);
    setActiveVideoTitle(title);
  };

  return (
    <section className="bg-slate-900 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl border border-slate-800 my-8 select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-6 rounded-full bg-[#D9541E]" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Film className="w-5 h-5 text-[#D9541E]" /> FOOTBALL FOCUS EXTRA
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="https://www.youtube.com/@footballfocusextra9988"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center gap-1.5 border border-rose-500 shadow-md transition-colors"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>Visit @footballfocusextra9988</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Active Inline Video Player */}
      {activeVideoId && (
        <div className="relative w-full h-[360px] sm:h-[480px] rounded-2xl overflow-hidden bg-black border-2 border-rose-600 shadow-2xl mb-6 animate-in fade-in duration-200">
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

      {/* Main Video Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Featured Lead Video */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl overflow-hidden shadow-lg group border border-slate-800 bg-slate-950">
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
            <Image
              src={leadVideo.thumbnail_url || `https://img.youtube.com/vi/${leadVideo.youtubeId}/hqdefault.jpg`}
              alt={leadVideo.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
              <button
                onClick={() =>
                  handlePlayInline(leadVideo.youtubeId || 'r6KHfURs22I', leadVideo.title)
                }
                className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center pl-1 shadow-xl hover:scale-110 transition-transform cursor-pointer"
                aria-label="Play Inline"
              >
                <Play className="w-7 h-7 fill-white" />
              </button>
            </div>
          </div>

          <div className="p-5 space-y-2 bg-slate-950 text-white flex-1 flex flex-col justify-between">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded bg-[#D9541E] text-white shadow-sm">
                Football Focus Extra
              </span>
              <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded bg-rose-600 text-white shadow-sm flex items-center gap-1">
                <Youtube className="w-3 h-3 fill-white" /> Click to Play Video
              </span>
            </div>

            <h3 className="text-lg sm:text-2xl font-extrabold text-white leading-snug hover:text-[#D9541E] transition-colors">
              <button
                onClick={() =>
                  handlePlayInline(leadVideo.youtubeId || 'r6KHfURs22I', leadVideo.title)
                }
                className="text-left font-extrabold text-white hover:text-[#D9541E] cursor-pointer"
              >
                {leadVideo.title}
              </button>
            </h3>
          </div>
        </div>

        {/* Side Playlist Video Items */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
          {sideVideos.map((vid) => (
            <div
              key={vid.id}
              className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-[#D9541E] transition-all group cursor-pointer"
              onClick={() =>
                handlePlayInline(vid.youtubeId || 'r6KHfURs22I', vid.title)
              }
            >
              <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                <Image
                  src={vid.thumbnail_url || `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  unoptimized
                />
                <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center pl-0.5 shadow">
                    <Play className="w-4 h-4 fill-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <span className="text-[9px] text-[#D9541E] font-black uppercase tracking-wider block">
                  Football Focus Extra
                </span>
                <h4 className="text-xs sm:text-sm font-extrabold text-white line-clamp-2 leading-tight group-hover:text-[#D9541E] transition-colors">
                  {vid.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
