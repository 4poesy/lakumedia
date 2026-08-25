import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Film, ChevronRight, Clock, Youtube } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  slug: string;
  thumbnail_url?: string | null;
  duration_seconds?: number | null;
  published_at?: string | null;
}

interface FeaturedVideoSpotlightProps {
  videos: VideoItem[];
}

export function FeaturedVideoSpotlight({ videos }: FeaturedVideoSpotlightProps) {
  if (!videos || videos.length === 0) return null;

  const leadVideo = videos[0];
  const sideVideos = videos.slice(1, 4);

  const defaultImage =
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop';

  const officialYoutubeUrl = 'https://www.youtube.com/channel/UCJLbr72xlR__9dlypiV4x4g/featured';

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
        <a
          href={officialYoutubeUrl}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-colors self-start sm:self-auto"
        >
          <Youtube className="w-4 h-4 fill-white" />
          <span>Subscribe on YouTube</span>
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>

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
            {/* Play Button Overlay linking to Official YouTube Channel */}
            <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
              <a
                href={officialYoutubeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center pl-1 shadow-xl hover:scale-110 transition-transform"
              >
                <Play className="w-7 h-7 fill-white" />
              </a>
            </div>
          </div>

          <div className="p-5 space-y-2 bg-slate-950 text-white flex-1 flex flex-col justify-between">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded bg-[#D9541E] text-white shadow-sm">
                Official YouTube Stream
              </span>
              <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded bg-rose-600 text-white shadow-sm flex items-center gap-1">
                <Youtube className="w-3 h-3 fill-white" /> Laku Media Channel
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-extrabold text-white leading-snug hover:text-[#D9541E] transition-colors">
              <a href={officialYoutubeUrl} target="_blank" rel="noreferrer">
                {leadVideo.title}
              </a>
            </h3>
          </div>
        </div>

        {/* Right Stacked Video List (5 cols / 40% width on desktop) */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
          {sideVideos.map((vid) => (
            <div
              key={vid.id}
              className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-[#D9541E] transition-all group"
            >
              {/* Thumbnail Left */}
              <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                <Image
                  src={vid.thumbnail_url || defaultImage}
                  alt={vid.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              </div>

              {/* Title Right */}
              <div className="space-y-1 flex-1">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#D9541E] block">
                  LAKU MEDIA YOUTUBE
                </span>
                <h4 className="text-xs font-bold text-white group-hover:text-[#D9541E] transition-colors line-clamp-2 leading-snug">
                  <a href={officialYoutubeUrl} target="_blank" rel="noreferrer">
                    {vid.title}
                  </a>
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
