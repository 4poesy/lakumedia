import React from 'react';
import Link from 'next/link';
import { VideoCard } from './video-card';
import { ChevronRight } from 'lucide-react';
import { MediaType } from '@/lib/types/supabase';

export interface MediaRailItem {
  id: string;
  title: string;
  slug: string;
  synopsis?: string | null;
  thumbnail_url?: string | null;
  media_type: MediaType;
  duration_seconds?: number | null;
  is_kid_safe?: boolean;
  media_genres?: { name?: string; slug?: string } | null;
}

interface GenreRailProps {
  genreName: string;
  genreSlug: string;
  items: MediaRailItem[];
}

export function GenreRail({ genreName, genreSlug, items }: GenreRailProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="space-y-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-6 rounded-full bg-[#D9541E] shadow-sm shadow-[#D9541E]/50" />
          <h2 className="text-xl font-bold text-white tracking-tight">{genreName}</h2>
        </div>
        <Link
          href={`/multimedia/${genreSlug}`}
          className="text-xs font-semibold text-[#D9541E] hover:underline flex items-center gap-1 group"
        >
          Explore All ({items.length}) <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.slice(0, 4).map((item) => (
          <VideoCard
            key={item.id}
            title={item.title}
            slug={item.slug}
            synopsis={item.synopsis}
            thumbnailUrl={item.thumbnail_url}
            genreName={genreName}
            mediaType={item.media_type}
            durationSeconds={item.duration_seconds}
            isKidSafe={item.is_kid_safe}
          />
        ))}
      </div>
    </section>
  );
}
