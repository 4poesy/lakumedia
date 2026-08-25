'use client';

import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Minimize2, Maximize2, Youtube, Sparkles } from 'lucide-react';

export function FloatingPodcastPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const podcastEpisode = {
    title: 'Laku Media Sports Radio: NPFL Derby Analysis & Super Eagles AFCON Squad',
    host: 'Adebayo Samuel Olaku & Laku Media Sports Team',
    duration: '24:15',
    youtubeId: '3Q06g9O0J-Y',
  };

  return (
    <aside className="fixed bottom-4 right-4 sm:right-6 z-50 transition-all select-none">
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="px-4 py-2.5 rounded-full bg-[#2A2E7F] hover:bg-[#D9541E] text-white font-extrabold text-xs shadow-2xl flex items-center gap-2 border-2 border-amber-400 transition-all active:scale-95 animate-bounce"
        >
          <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>LAKU MEDIA RADIO (LIVE)</span>
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      ) : (
        <div className="bg-[#0F172A] text-white p-4 rounded-2xl border-2 border-[#D9541E] shadow-2xl w-80 sm:w-96 space-y-3">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D9541E] flex items-center gap-1">
                <Radio className="w-3 h-3 text-amber-400" /> OFFICIAL LAKU MEDIA RADIO
              </span>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Minimize Player"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Episode Info */}
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold text-white line-clamp-1 leading-snug">
              {podcastEpisode.title}
            </h4>
            <p className="text-[10px] text-slate-400 font-medium">
              Hosted by {podcastEpisode.host}
            </p>
          </div>

          {/* Audio Controls & Animated Waveform */}
          <div className="flex items-center justify-between pt-1">
            
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-[#D9541E] hover:bg-[#b84315] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 shrink-0"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white pl-0.5" />}
            </button>

            {/* Simulated Animated Equalizer Bars */}
            <div className="flex items-end space-x-1 h-6 px-3">
              <span className={`w-1 bg-[#D9541E] rounded-full transition-all ${isPlaying ? 'h-5 animate-pulse' : 'h-2'}`} />
              <span className={`w-1 bg-amber-400 rounded-full transition-all ${isPlaying ? 'h-3 animate-pulse delay-75' : 'h-1.5'}`} />
              <span className={`w-1 bg-emerald-400 rounded-full transition-all ${isPlaying ? 'h-6 animate-pulse delay-150' : 'h-2'}`} />
              <span className={`w-1 bg-[#D9541E] rounded-full transition-all ${isPlaying ? 'h-4 animate-pulse delay-100' : 'h-1'}`} />
              <span className={`w-1 bg-amber-400 rounded-full transition-all ${isPlaying ? 'h-5 animate-pulse' : 'h-2'}`} />
            </div>

            {/* Mute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* YouTube Stream Link */}
            <a
              href={`https://www.youtube.com/channel/UCJLbr72xlR__9dlypiV4x4g/featured`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors"
              title="Watch Stream on YouTube"
            >
              <Youtube className="w-4 h-4 fill-white" />
            </a>

          </div>

          {/* Subtext */}
          <div className="pt-1 flex items-center justify-between text-[9px] text-slate-400 font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <Sparkles className="w-3 h-3" /> STREAMING LIVE 24/7
            </span>
            <span>{podcastEpisode.duration}</span>
          </div>

        </div>
      )}
    </aside>
  );
}
