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
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-[#D9541E] transition-all duration-300 flex flex-col group h-full">
      {/* Thumbnail + Overlay */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={thumbnailUrl || defaultImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
          <Link
            href={`/multimedia/watch/${slug}`}
            className="w-12 h-12 rounded-full bg-[#D9541E] text-white flex items-center justify-center pl-1 shadow-md hover:scale-110 transition-transform"
          >
            <Play className="w-5 h-5 fill-white" />
          </Link>
        </div>

        {/* Solid Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded bg-slate-900 text-white shadow-sm">
            {genreName}
          </span>
          {isKidSafe && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-600 text-white flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3 h-3" /> Kids Safe
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3">
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-slate-900 text-white flex items-center gap-1 shadow-sm">
            <Clock className="w-3 h-3 text-slate-300" /> {formattedDuration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          <span className="text-[10px] font-extrabold text-[#D9541E] uppercase tracking-widest block mb-1">
            {formattedMediaType}
          </span>
          <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#D9541E] transition-colors line-clamp-1 leading-snug">
            <Link href={`/multimedia/watch/${slug}`}>
              {title}
            </Link>
          </h3>
          {synopsis && (
            <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
              {synopsis}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={`/multimedia/watch/${slug}`}
            className="text-xs font-extrabold text-[#D9541E] hover:underline flex items-center gap-1"
          >
            <Film className="w-3.5 h-3.5" /> Watch Stream
          </Link>
        </div>
      </div>
    </div>
  );
}
