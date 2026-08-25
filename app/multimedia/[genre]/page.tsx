import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { VideoCard } from '@/components/multimedia/video-card';
import { Film, ChevronRight, ArrowLeft, Filter } from 'lucide-react';

export const revalidate = 60;

interface GenrePageProps {
  params: {
    genre: string;
  };
}

export default async function GenreListingPage({ params }: GenrePageProps) {
  const { genre: genreSlug } = params;
  const supabase = await createClient();

  // Query genre by slug
  const { data: genreData } = await supabase
    .from('media_genres')
    .select('*')
    .eq('slug', genreSlug)
    .single();

  const genreName = (genreData as any)?.name || genreSlug.toUpperCase().replace('-', ' ');

  // Query media items for this genre
  const { data: mediaData } = await supabase
    .from('media_items')
    .select('*, media_genres(name, slug)')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  const filteredItems = mediaData
    ? (mediaData as any[]).filter(
        (m: any) =>
          m.media_genres?.slug === genreSlug ||
          m.media_genres?.name?.toLowerCase() === genreName.toLowerCase()
      )
    : [
        {
          id: 'demo-1',
          title: `Featured ${genreName} Release`,
          slug: `${genreSlug}-featured-release`,
          synopsis: `Top-rated stream available in the ${genreName} catalog. High definition 4K audio and visuals.`,
          thumbnail_url: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&auto=format&fit=crop',
          media_type: 'film' as const,
          duration_seconds: 4500,
          is_kid_safe: genreSlug === 'kids-shows',
          media_genres: { name: genreName, slug: genreSlug },
        },
      ];

  return (
    <div className="space-y-8 theme-multimedia">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link href="/multimedia" className="hover:text-[#D9541E]">Watch</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-[#D9541E] font-bold">{genreName}</span>
      </nav>

      {/* Header Banner */}
      <div className="space-y-4 pb-6 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D9541E]/20 border border-[#D9541E]/40 flex items-center justify-center text-[#D9541E] font-extrabold text-xl">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white">{genreName}</h1>
              <p className="text-xs text-slate-400 mt-1">
                Browse all on-demand titles and shows in the {genreName} collection.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-1.5 font-semibold">
              <Filter className="w-3.5 h-3.5 text-[#D9541E]" /> {filteredItems.length} Titles
            </div>
          </div>
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item: any) => (
          <VideoCard
            key={item.id}
            title={item.title}
            slug={item.slug}
            synopsis={item.synopsis}
            thumbnailUrl={item.thumbnail_url}
            genreName={item.media_genres?.name || genreName}
            mediaType={item.media_type}
            durationSeconds={item.duration_seconds}
            isKidSafe={item.is_kid_safe}
          />
        ))}
      </div>
    </div>
  );
}
