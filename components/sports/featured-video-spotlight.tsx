import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Film, ChevronRight, Clock } from 'lucide-react';

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

  return (
    <section className="bg-slate-900 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl border border-slate-800 my-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-6 rounded-full bg-[#D9541E]" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Film className="w-5 h-5 text-[#D9541E]" /> LAKU MEDIA VIDEOS & SPOTLIGHT
          </h2>
        </div>
        <Link
          href="/multimedia"
          className="text-xs font-extrabold text-[#D9541E] hover:text-white flex items-center gap-1 transition-colors"
        >
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Featured Video Left (7 cols / 60% width on desktop) */}
        <div className="lg:col-span-7 relative h-[280px] sm:h-[380px] rounded-2xl overflow-hidden shadow-lg group border border-slate-800 bg-slate-950">
          <Image
            src={leadVideo.thumbnail_url || defaultImage}
            alt={leadVideo.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Link
              href={`/multimedia/watch/${leadVideo.slug}`}
              className="w-16 h-16 rounded-full bg-[#D9541E] text-white flex items-center justify-center pl-1 shadow-xl hover:scale-110 transition-transform"
            >
              <Play className="w-7 h-7 fill-white" />
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded bg-[#D9541E] text-white shadow-sm">
              Featured Stream
            </span>
            <h3 className="text-lg sm:text-2xl font-extrabold text-white leading-snug group-hover:text-emerald-300 transition-colors">
              <Link href={`/multimedia/watch/${leadVideo.slug}`}>
                {leadVideo.title}
              </Link>
            </h3>
          </div>
        </div>

        {/* Right Stacked Video List (5 cols / 40% width on desktop) */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
          {sideVideos.map((vid) => (
            <div
              key={vid.id}
              className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-[#D9541E]/50 transition-all group"
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
                  MULTIMEDIA
                </span>
                <h4 className="text-xs font-bold text-white group-hover:text-[#D9541E] transition-colors line-clamp-2 leading-snug">
                  <Link href={`/multimedia/watch/${vid.slug}`}>
                    {vid.title}
                  </Link>
                </h4>
                <span className="text-[10px] text-slate-400 font-mono block">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {vid.duration_seconds ? `${Math.floor(vid.duration_seconds / 60)} min` : 'HD Video'}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
