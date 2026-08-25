import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Clock, ShieldCheck, Film } from 'lucide-react';
import { MediaType } from '@/lib/types/supabase';

interface VideoCardProps {
  title: string;
  slug: string;
  synopsis?: string | null;
  thumbnailUrl?: string | null;
  genreName?: string;
  mediaType: MediaType;
  durationSeconds?: number | null;
  isKidSafe?: boolean;
}

export function VideoCard({
  title,
  slug,
  synopsis,
  thumbnailUrl,
  genreName = 'Entertainment',
  mediaType,
  durationSeconds,
  isKidSafe = false,
}: VideoCardProps) {
  const defaultImage =
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&auto=format&fit=crop';

  const formattedDuration = durationSeconds
    ? `${Math.floor(durationSeconds / 60)} min`
    : 'HD Stream';

  const formattedMediaType = mediaType
    .replace('_', ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="glass-panel rounded-xl overflow-hidden border border-slate-800/80 hover:border-[#D9541E]/50 transition-all duration-300 flex flex-col group">
      {/* Thumbnail + Overlay */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <Image
          src={thumbnailUrl || defaultImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Link
            href={`/multimedia/watch/${slug}`}
            className="w-12 h-12 rounded-full bg-[#D9541E]/90 text-white flex items-center justify-center pl-1 shadow-lg shadow-[#D9541E]/30 group-hover:scale-110 group-hover:bg-[#D9541E] transition-all"
          >
            <Play className="w-5 h-5 fill-white" />
          </Link>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-slate-950/90 text-[#D9541E] border border-[#D9541E]/40 backdrop-blur-md">
            {genreName}
          </span>
          {isKidSafe && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 backdrop-blur-md">
              <ShieldCheck className="w-3 h-3" /> Kids Safe
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3">
          <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-slate-950/90 text-slate-300 border border-slate-800 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" /> {formattedDuration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
            {formattedMediaType}
          </span>
          <h3 className="text-base font-bold text-slate-100 group-hover:text-[#D9541E] transition-colors line-clamp-1 leading-snug">
            <Link href={`/multimedia/watch/${slug}`}>
              {title}
            </Link>
          </h3>
          {synopsis && (
            <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {synopsis}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
          <Link
            href={`/multimedia/watch/${slug}`}
            className="text-xs font-bold text-[#D9541E] hover:text-white flex items-center gap-1"
          >
            <Film className="w-3.5 h-3.5" /> Watch Now
          </Link>
        </div>
      </div>
    </div>
  );
}
