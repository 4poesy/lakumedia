'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Play, Globe, Video, Newspaper, X, Clock } from 'lucide-react';
import { AggregatedNewsItem } from '@/lib/types/rss';

interface AroundTheWebRailProps {
  items: AggregatedNewsItem[];
  title?: string;
  subtitle?: string;
  variant?: 'full' | 'sidebar';
}

export function AroundTheWebRail({
  items,
  title = 'Around the Web — Sports Headlines & Video Highlights',
  subtitle = 'Curated third-party sports news and official video highlights from leading global publishers.',
  variant = 'full',
}: AroundTheWebRailProps) {
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  // Filter out any items without thumbnails strictly according to the feature brief
  const validItems = items.filter((item) => Boolean(item.thumbnail_url));

  if (validItems.length === 0) return null;

  return (
    <section className="space-y-6 my-10 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#2A2E7F] text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
              <Globe className="w-3 h-3 text-emerald-400" /> EXTERNAL AGGREGATOR
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
            {title}
          </h2>
          <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
        </div>
      </div>

      {/* Grid Layout */}
      <div
        className={
          variant === 'sidebar'
            ? 'space-y-4'
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        }
      >
        {validItems.map((item) => {
          const isVideo = item.content_type === 'video' && Boolean(item.video_embed_id);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Card Thumbnail */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.thumbnail_url}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Source Badge Overlay */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900/90 text-white font-extrabold text-[9px] uppercase tracking-widest shadow-md flex items-center gap-1 border border-slate-700">
                    {isVideo ? <Video className="w-3 h-3 text-amber-400" /> : <Newspaper className="w-3 h-3 text-emerald-400" />}
                    {item.source_name}
                  </span>
                </div>

                {/* Video Play Button Overlay */}
                {isVideo && (
                  <button
                    onClick={() => setActiveVideoModal(item.video_embed_id!)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#D9541E] text-white flex items-center justify-center pl-1 shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white" />
                    </div>
                  </button>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#2A2E7F] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                    {item.snippet}
                  </p>
                </div>

                {/* Card Action Link with SEO rel="noopener noreferrer nofollow" */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-[10px] text-slate-600 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {new Date(item.published_at).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>

                  {isVideo ? (
                    <button
                      onClick={() => setActiveVideoModal(item.video_embed_id!)}
                      className="text-[#D9541E] hover:underline flex items-center gap-1"
                    >
                      <span>Watch Highlight</span> <Play className="w-3 h-3 fill-[#D9541E]" />
                    </button>
                  ) : (
                    <a
                      href={item.source_url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-[#2A2E7F] hover:underline flex items-center gap-1"
                    >
                      <span>Read on {item.source_name}</span> <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official YouTube Embed Lightbox Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl space-y-4 p-4">
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="text-xs font-extrabold text-slate-300 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-emerald-400" /> OFFICIAL YOUTUBE EMBED PLAYER
              </span>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Official YouTube iframe Player */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoModal}?autoplay=1`}
                title="Official Video Highlight Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
