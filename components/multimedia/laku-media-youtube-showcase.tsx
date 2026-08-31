'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Youtube, ExternalLink, X, Film, Sparkles } from 'lucide-react';

interface LakuYoutubeVideo {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
}

export function LakuMediaYoutubeShowcase() {
  const LAKU_YOUTUBE_VIDEOS: LakuYoutubeVideo[] = [
    {
      id: 'laku-1',
      youtubeId: 'MFAejiCKDjk',
      title: 'Laku Media Concepts — Cinema Production & Broadcast Reel',
      category: 'Featured Production',
    },
    {
      id: 'laku-2',
      youtubeId: 'szV-YWVJ5aY',
      title: 'Commercial Brand Campaign & Studio Film Showcase',
      category: 'Commercial Ad',
    },
    {
      id: 'laku-3',
      youtubeId: 'zZHbLPiXAos',
      title: 'Live Event Satellite Coverage & Multicam Production',
      category: 'Live Broadcast',
    },
    {
      id: 'laku-4',
      youtubeId: 'mJag5F0ASqQ',
      title: 'Laku Media Documentary & Cultural Storytelling Series',
      category: 'Documentary',
    },
    {
      id: 'laku-5',
      youtubeId: 'CwZLn1s0q-k',
      title: 'Music Video Direction & 8K Cinema Color Grading',
      category: 'Music Video',
    },
    {
      id: 'laku-6',
      youtubeId: 'BIiwifY-41I',
      title: 'Corporate Brand Film & Executive Studio Production',
      category: 'Corporate Film',
    },
    {
      id: 'laku-7',
      youtubeId: '7WhZTYsBP24',
      title: 'Satellite Uplink & Outdoor Broadcast Special Coverage',
      category: 'Satellite Broadcast',
    },
    {
      id: 'laku-8',
      youtubeId: 'QRewtT5srWc',
      title: 'Laku Media Studio Behind The Scenes & Aerial Drones',
      category: 'Behind The Scenes',
    },
    {
      id: 'laku-9',
      youtubeId: 'MYDXVne_GHk',
      title: 'High-Impact Sports & Live Concert Streaming Reel',
      category: 'Live Concert',
    },
    {
      id: 'laku-10',
      youtubeId: 'shpKJLSzucc',
      title: 'Nollywood Cinema Teaser & Theatrical Trailer Edition',
      category: 'Cinema Trailer',
    },
    {
      id: 'laku-11',
      youtubeId: '73bZ0xNg1mI',
      title: 'Laku Media Creative Studio Portfolio Master Collection',
      category: 'Portfolio Collection',
    },
  ];

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>('');

  const handlePlay = (youtubeId: string, title: string) => {
    setActiveVideoId(youtubeId);
    setActiveVideoTitle(title);
  };

  return (
    <section className="max-w-7xl mx-auto my-12 bg-slate-950 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-6 select-none">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-600/20 text-rose-400 border border-rose-500/40 text-[10px] font-black uppercase tracking-widest">
            <Youtube className="w-3.5 h-3.5 fill-rose-500" />
            <span>OFFICIAL YOUTUBE PORTFOLIO SHOWCASE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            LAKU MEDIA CONCEPTS — <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-400 to-[#D9541E]">PRODUCTIONS ON YOUTUBE</span>
          </h2>
        </div>

        <a
          href="https://www.youtube.com/@LakuMediaConcepts/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 border border-rose-500 shadow-lg shrink-0 transition-colors"
        >
          <Youtube className="w-4 h-4 fill-white" />
          <span>Subscribe @LakuMediaConcepts</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Active Inline Player Modal */}
      {activeVideoId && (
        <div className="relative w-full h-[360px] sm:h-[500px] rounded-2xl overflow-hidden bg-black border-2 border-rose-600 shadow-2xl animate-in fade-in duration-200">
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

      {/* Video Grid (11 YouTube Videos) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {LAKU_YOUTUBE_VIDEOS.map((vid) => (
          <div
            key={vid.id}
            onClick={() => handlePlay(vid.youtubeId, vid.title)}
            className="bg-slate-900 border border-slate-800 hover:border-rose-500 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 shadow-md flex flex-col justify-between"
          >
            <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
              <Image
                src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                alt={vid.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center pl-0.5 shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-white" />
                </div>
              </div>
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-950/80 text-rose-400 font-mono text-[9px] font-black uppercase tracking-wider border border-slate-700">
                {vid.category}
              </span>
            </div>

            <div className="p-4 space-y-2 bg-slate-900 flex-1 flex flex-col justify-between">
              <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-rose-400 transition-colors line-clamp-2 leading-snug">
                {vid.title}
              </h4>
              
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1 font-bold text-rose-500">
                  <Youtube className="w-3 h-3 fill-rose-500" /> Watch Inline
                </span>
                <span className="font-extrabold text-slate-300 group-hover:text-white">Click to Play</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
