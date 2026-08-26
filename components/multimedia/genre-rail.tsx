'use client';

import React from 'react';
import Link from 'next/link';
import { VideoCard } from './video-card';
import { ChevronRight } from 'lucide-react';
import { MediaType } from '@/lib/types/supabase';
import { ScrollRevealSection, ScrollRevealChild } from '@/components/multimedia/motion/scroll-reveal-section';
import { CinematicCardMotion } from '@/components/multimedia/motion/cinematic-card-motion';

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
    <ScrollRevealSection stagger className="space-y-4 py-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-6 rounded-full bg-[#10B981] shadow-sm" />
          <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight uppercase">
            {genreName}
          </h2>
        </div>
        <Link
          href={`/multimedia/${genreSlug}`}
          className="text-xs font-extrabold text-[#D9541E] hover:underline flex items-center gap-1 group"
        >
          <span>Explore All ({items.length})</span> <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Mobile-first 2-column grid on mobile (<640px) scaling to 5-column on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {items.slice(0, 5).map((item) => (
          <ScrollRevealChild key={item.id}>
            <CinematicCardMotion hoverScale={1.03} hoverY={-5}>
              <VideoCard
                title={item.title}
                slug={item.slug}
                synopsis={item.synopsis}
                thumbnailUrl={item.thumbnail_url}
                genreName={genreName}
                mediaType={item.media_type}
                durationSeconds={item.duration_seconds}
                isKidSafe={item.is_kid_safe}
              />
            </CinematicCardMotion>
          </ScrollRevealChild>
        ))}
      </div>
    </ScrollRevealSection>
  );
}
