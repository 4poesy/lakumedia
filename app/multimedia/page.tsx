import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { GenreRail } from '@/components/multimedia/genre-rail';
import { RealtimeLiveCard } from '@/components/multimedia/realtime-live-card';
import { Film, Play, Radio, Sparkles, Camera, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function MultimediaHomePage() {
  let items: any[] = [];
  let genresData: any[] = [];

  try {
    const supabase = await createClient();
    const { data: g } = await supabase.from('media_genres').select('*').order('name');
    if (g) genresData = g;

    const { data: m } = await supabase
      .from('media_items')
      .select('*, media_genres(name, slug)')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    if (m) items = m;
  } catch (error) {
    console.error('Supabase query fallback on multimedia homepage:', error);
  }

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

  const defaultGenres = [
    { name: 'Films', slug: 'films' },
    { name: 'Documentaries', slug: 'documentaries' },
    { name: 'Comedy Shows', slug: 'comedy' },
    { name: 'Talk Shows', slug: 'talk-shows' },
    { name: 'Drama Series', slug: 'drama-series' },
    { name: 'Music Shows', slug: 'music-shows' },
    { name: 'Kids Shows', slug: 'kids-shows' },
  ];

  const genres = genresData.length > 0 ? genresData : defaultGenres;

  return (
    <div className="bg-[#090A0F] text-white min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* 1. High-Impact Agency Header Sub-Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-[#10B981] font-extrabold text-xs uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" /> LAKU MEDIA PRODUCTION & MARKETING STUDIO
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            CINEMATIC FILMS, LIVE BROADCASTS & BRAND AGENCY
          </h1>
        </div>

        {/* Agency Navigation Buttons */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          <Link
            href="/multimedia/services"
            className="px-4 py-2 rounded-xl text-xs font-extrabold bg-[#D9541E] text-white shadow-lg flex items-center gap-1.5 shrink-0"
          >
            <Camera className="w-4 h-4" /> Agency Services
          </Link>
          <Link
            href="/multimedia/about"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#2A2E7F] text-white hover:bg-blue-900 border border-slate-700 transition-colors shrink-0"
          >
            About Laku Media
          </Link>
        </div>
      </div>

      {/* 2. Ultra-Cinematic Studio Hero Spotlight Showcase */}
      <section className="flex flex-col md:flex-row rounded-3xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl group relative">
        <div className="relative h-72 md:h-auto md:w-7/12 overflow-hidden bg-slate-900 shrink-0">
          <Image
            src={
              heroItem.thumbnail_url ||
              'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop'
            }
            alt={heroItem.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link
              href={`/multimedia/watch/${heroItem.slug}`}
              className="w-20 h-20 rounded-full bg-[#D9541E] hover:bg-[#b84315] text-white flex items-center justify-center pl-1 shadow-2xl hover:scale-110 transition-transform group/play"
            >
              <Play className="w-8 h-8 fill-white" />
            </Link>
          </div>
        </div>

        <div className="p-6 sm:p-10 md:w-5/12 bg-slate-950 text-white flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-md bg-[#D9541E] text-white flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" /> Featured Original
              </span>
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-[#2A2E7F] text-[#10B981] border border-slate-700">
                {heroItem.media_genres?.name || 'Documentary'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {heroItem.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed font-medium">
              {heroItem.synopsis}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center space-x-3">
            <Link
              href={`/multimedia/watch/${heroItem.slug}`}
              className="px-6 py-3 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-xs flex items-center gap-2 shadow-lg transition-colors"
            >
              <Play className="w-4 h-4 fill-white" /> Stream Now
            </Link>
            <Link
              href="/multimedia/services"
              className="px-4 py-3 rounded-xl bg-[#2A2E7F] hover:bg-blue-900 text-white font-bold text-xs border border-slate-700 transition-colors flex items-center gap-1"
            >
              <span>Hire Studio</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Agency Production Services Cards (Lemon Green & Burnt Orange Accent) */}
      <section className="bg-slate-950 p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10B981] block">
              LAKU MEDIA STUDIO SERVICES
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              COMMERCIAL PRODUCTION & BRAND MARKETING
            </h3>
          </div>
          <Link
            href="/multimedia/services"
            className="text-xs font-extrabold text-[#D9541E] hover:underline flex items-center gap-1"
          >
            <span>View All Services</span> →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <Camera className="w-6 h-6 text-[#10B981]" />
            <h4 className="font-extrabold text-white text-sm">4K/8K Film & Video Production</h4>
            <p className="text-slate-400 leading-relaxed font-medium">
              Commercial adverts, cinema documentaries, corporate video spots, and original TV shows.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <Radio className="w-6 h-6 text-[#D9541E]" />
            <h4 className="font-extrabold text-white text-sm">24/7 Live Broadcast Streaming</h4>
            <p className="text-slate-400 leading-relaxed font-medium">
              OB van satellite broadcasting, stadium sports coverage, and live concert streaming.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <Zap className="w-6 h-6 text-amber-400" />
            <h4 className="font-extrabold text-white text-sm">Digital Brand Marketing</h4>
            <p className="text-slate-400 leading-relaxed font-medium">
              Influencer talent management, viral social media blitzes, and corporate marketing campaigns.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Live Now Rail */}
      {liveNowItems.length > 0 && (
        <section className="space-y-4 pt-2">
          <div className="flex items-center space-x-2 text-xs font-extrabold text-[#D9541E]">
            <Radio className="w-4 h-4" /> Live Now Broadcasts (Realtime Sync)
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

      {/* 5. On-Demand Catalog Genre Rails */}
      <div className="space-y-8">
        {genres.map((genre: any) => {
          const genreItems = items.filter(
            (item: any) =>
              item.media_genres?.slug === genre.slug ||
              item.media_genres?.name?.toLowerCase() === genre.name.toLowerCase()
          );

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
