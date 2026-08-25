import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { GenreRail } from '@/components/multimedia/genre-rail';
import { RealtimeLiveCard } from '@/components/multimedia/realtime-live-card';
import { Film, Play, Radio, Sparkles, Award } from 'lucide-react';

export const revalidate = 30;

export default async function MultimediaHomePage() {
  const supabase = await createClient();

  // Query all media genres
  const { data: genresData } = await supabase
    .from('media_genres')
    .select('*')
    .order('name');

  // Query published media items
  const { data: mediaData } = await supabase
    .from('media_items')
    .select('*, media_genres(name, slug)')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  const items = (mediaData as any[]) || [];

  // Hero Featured Spotlight item
  const heroItem: any =
    items.find((item: any) => item.is_featured) ||
    items[0] || {
      id: '50000000-0000-0000-0000-000000000001',
      title: 'Giants of Africa: The Story of Nigerian Football',
      slug: 'giants-of-africa-nigerian-football',
      synopsis:
        'An inspiring documentary tracing the evolution of Nigerian football from grassroot academies to the world stage.',
      thumbnail_url:
        'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop',
      media_genres: { name: 'Documentaries', slug: 'documentaries' },
      media_type: 'documentary' as const,
      duration_seconds: 3240,
    };

  // Live Now items
  const liveNowItems = items.filter((item: any) => item.is_live && item.live_status === 'live_now');

  // Group items by genre slug
  const defaultGenres = [
    { name: 'Films', slug: 'films' },
    { name: 'Documentaries', slug: 'documentaries' },
    { name: 'Comedy Shows', slug: 'comedy' },
    { name: 'Talk Shows', slug: 'talk-shows' },
    { name: 'Drama Series', slug: 'drama-series' },
    { name: 'Music Shows', slug: 'music-shows' },
    { name: 'Kids Shows', slug: 'kids-shows' },
  ];

  const genres = genresData && genresData.length > 0 ? genresData : defaultGenres;

  return (
    <div className="space-y-10 theme-multimedia">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-[#D9541E] font-bold text-xs uppercase tracking-wider mb-1">
            <Film className="w-4 h-4" /> Laku Media On-Demand Catalog
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Films, Series & Live Entertainment
          </h1>
        </div>

        {/* Genre Pill Nav */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          <Link
            href="/multimedia"
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#D9541E] text-white shadow"
          >
            All Genres
          </Link>
          {genres.map((g: any) => (
            <Link
              key={g.id || g.slug}
              href={`/multimedia/${g.slug}`}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/60 whitespace-nowrap"
            >
              {g.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Hero Featured Spotlight */}
      <section className="relative h-[380px] sm:h-[480px] w-full rounded-3xl overflow-hidden glass-panel border border-slate-800 shadow-2xl group">
        <Image
          src={
            heroItem.thumbnail_url ||
            'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop'
          }
          alt={heroItem.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 space-y-4 max-w-3xl">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-[#D9541E] text-white flex items-center gap-1.5 shadow">
              <Sparkles className="w-3.5 h-3.5" /> Featured Spotlight
            </span>
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-slate-900/80 text-slate-300 border border-slate-700">
              {heroItem.media_genres?.name || 'Documentary'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {heroItem.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed max-w-2xl">
            {heroItem.synopsis}
          </p>

          <div className="pt-2 flex items-center space-x-4">
            <Link
              href={`/multimedia/watch/${heroItem.slug}`}
              className="px-6 py-3 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Play className="w-4 h-4 fill-white" /> Watch Now
            </Link>
            <Link
              href="/multimedia/about"
              className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
            >
              Laku Media Production Info
            </Link>
          </div>
        </div>
      </section>

      {/* Live Now Rail */}
      {liveNowItems.length > 0 && (
        <section className="space-y-4 pt-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#D9541E]">
            <Radio className="w-4 h-4 animate-pulse" /> Live Now Broadcasts (Realtime Sync)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveNowItems.map((live: any) => (
              <RealtimeLiveCard
                key={live.id}
                initialItem={{
                  id: live.id,
                  title: live.title,
                  slug: live.slug,
                  synopsis: live.synopsis,
                  thumbnailUrl: live.thumbnail_url,
                  genreName: live.media_genres?.name || 'Live',
                  mediaType: live.media_type,
                  durationSeconds: live.duration_seconds,
                  isKidSafe: live.is_kid_safe,
                  liveStatus: live.live_status,
                  scheduledStartAt: live.scheduled_start_at,
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Genre Rails */}
      <div className="space-y-6">
        {genres.map((genre: any) => {
          const genreItems = items.filter(
            (item: any) =>
              item.media_genres?.slug === genre.slug ||
              item.media_genres?.name?.toLowerCase() === genre.name.toLowerCase()
          );

          // Fallback demo items if database genre items are empty
          const displayItems =
            genreItems.length > 0
              ? genreItems
              : [
                  {
                    id: `demo-${genre.slug}-1`,
                    title: `Latest Release in ${genre.name}`,
                    slug: `${genre.slug}-latest-release`,
                    synopsis: `Exclusive high-definition content produced for the ${genre.name} collection on Laku Media.`,
                    thumbnail_url:
                      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&auto=format&fit=crop',
                    media_type: 'film' as const,
                    duration_seconds: 3600,
                    is_kid_safe: genre.slug === 'kids-shows',
                    media_genres: { name: genre.name, slug: genre.slug },
                  },
                ];

          return (
            <GenreRail
              key={genre.id || genre.slug}
              genreName={genre.name}
              genreSlug={genre.slug}
              items={displayItems as any}
            />
          );
        })}
      </div>
    </div>
  );
}
