import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { GenreRail } from '@/components/multimedia/genre-rail';
import { RealtimeLiveCard } from '@/components/multimedia/realtime-live-card';
import { BookUsNowSection } from '@/components/multimedia/book-us-now';
import { StudioCollectionsHub } from '@/components/multimedia/studio-collections-hub';
import { TrendingTop10Rail } from '@/components/multimedia/trending-top10-rail';
import { MultimediaHeroSlider } from '@/components/multimedia/multimedia-hero-slider';
import { ParallaxCinemaSection } from '@/components/multimedia/parallax-cinema-section';
import { Camera, Briefcase, DollarSign, Radio } from 'lucide-react';

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

  const sampleThumbnails = [
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&auto=format&fit=crop&q=75',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=75',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=75',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop&q=75',
    'https://images.unsplash.com/photo-1543351611-c823945f1007?w=800&auto=format&fit=crop&q=75',
  ];

  const generateFiveCards = (genreName: string, genreSlug: string, dbItems: any[]) => {
    if (dbItems.length >= 5) return dbItems;

    const dummyTitles: Record<string, string[]> = {
      films: [
        'The Royal Inheritance (Nollywood Feature Film)',
        'Midnight Cinema: Lagos City Thriller',
        'Echoes of the Delta (Award Winning Movie)',
        'The Billionaire\'s Secret Bride',
        'Sands of Time: West African Legend',
      ],
      documentaries: [
        'Giants of Africa: Football Origins',
        'Lagos Underground: Afrobeats Revolution',
        'The Great NPFL Derby Story',
        'Nollywood Rising: Behind The Lens',
        'Voices of the Niger Delta',
      ],
      comedy: [
        'Laku Media Stand-Up Special: Night of Laughter',
        'Nollywood Kings of Comedy Live in Lagos',
        'Crazy Campus Chronicles: Episode 1',
        'Street Side Pranks & Laughs',
        'The Laugh Factory Special',
      ],
      'talk-shows': [
        'Laku Media Executive Talk: Interview With Industry Leaders',
        'The Sports & Entertainment Roundtable',
        'Nollywood Stars Spotlight Interview',
        'Creative Directors Studio Panel',
        'Afrobeats Global Music Talk',
      ],
      'drama-series': [
        'Lagos Heights: Season 1 Drama',
        'The Billionaire Clan: Episode 5',
        'Shattered Dreams (Dramatic Television Series)',
        'Rhythm & Passion Drama',
        'Shadows of the City',
      ],
      'music-shows': [
        'Lagos International Live Music Concert 2026',
        'Afrobeats Unplugged Studio Session',
        'Highlife Kings Live on Stage',
        'Naija Gospel Hits Concert Stream',
        'Soundwave Radio Live Session',
      ],
      'kids-shows': [
        'Ananse The Spider (Animated Kids Special)',
        'Naija Junior Storytime & Songs',
        'Junior Champions Academy',
        'Little Explorers West Africa',
        'The Magic Drum Kids Show',
      ],
    };

    const titles = dummyTitles[genreSlug] || [
      `${genreName} Original Special Edition 1`,
      `${genreName} Cinema Masterpiece 2`,
      `${genreName} Studio Broadcast Release 3`,
      `${genreName} High-Definition Feature 4`,
      `${genreName} Production Showcase 5`,
    ];

    const result = [...dbItems];
    for (let i = dbItems.length; i < 5; i++) {
      result.push({
        id: `card-${genreSlug}-${i + 1}`,
        title: titles[i % titles.length],
        slug: `${genreSlug}-release-${i + 1}`,
        synopsis: `Exclusive high-definition ${genreName} video produced by Laku Media Creative Studio.`,
        thumbnail_url: sampleThumbnails[i % sampleThumbnails.length],
        media_type: 'film',
        duration_seconds: 2400 + i * 300,
        is_kid_safe: genreSlug === 'kids-shows',
        media_genres: { name: genreName, slug: genreSlug },
      });
    }
    return result;
  };

  return (
    <div className="bg-[#090A0F] text-white min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Clean Studio Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight uppercase">
          CINEMATIC FILMS, LIVE BROADCASTS & BRAND AGENCY
        </h1>

        {/* Action Buttons Container */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/multimedia/services"
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#D9541E] hover:bg-[#b84315] text-white shadow-lg flex items-center gap-1.5 transition-transform active:scale-95 border border-orange-400"
          >
            <Camera className="w-4 h-4" /> Agency Services
          </Link>
          <Link
            href="/multimedia/portfolio"
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#10B981] text-slate-950 hover:bg-emerald-400 shadow-lg flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <Briefcase className="w-4 h-4" /> Studio Portfolio
          </Link>
          <Link
            href="/multimedia/pricing"
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-lg flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <DollarSign className="w-4 h-4" /> Pricing & Rates
          </Link>
          <Link
            href="/multimedia/about"
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#2A2E7F] hover:bg-blue-900 text-white border border-slate-700 transition-colors shadow-lg"
          >
            About Laku Media
          </Link>
        </div>
      </div>

      {/* 4-Slide Interactive Hero Slider Component (Zero Prev/Next Arrows) */}
      <MultimediaHeroSlider />

      {/* Featured Studio Hubs */}
      <StudioCollectionsHub />

      {/* Top 5 Trending Titles Today */}
      <TrendingTop10Rail />

      {/* Live Now Broadcast Stream Rail */}
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

      {/* On-Demand Catalog Genre Rails (Films, Documentaries, Comedy) */}
      <div className="space-y-12">
        {genres.slice(0, 3).map((genre: any) => {
          const genreItems = items.filter(
            (item: any) =>
              item.media_genres?.slug === genre.slug ||
              item.media_genres?.name?.toLowerCase() === genre.name.toLowerCase()
          );

          const fiveCards = generateFiveCards(genre.name, genre.slug, genreItems);

          return (
            <GenreRail
              key={genre.id || genre.slug}
              genreName={genre.name}
              genreSlug={genre.slug}
              items={fiveCards as any}
            />
          );
        })}
      </div>

      {/* Parallax Cinema Banner Section */}
      <ParallaxCinemaSection
        title="PIONEERING 4K/8K CINEMATOGRAPHY & SATELLITE BROADCASTING"
        subtitle="Under the executive direction of CEO Adebayo Samuel Olaku, Laku Media Studio operates multi-camera satellite OB vans, FPV aerial drones, and Dolby sound suites."
        badge="AFRICAN MEDIA POWERHOUSE"
        imageUrl="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1600&auto=format&fit=crop&q=80"
        ctaText="Book Studio Production"
        ctaHref="/multimedia/services"
      />

      {/* Remaining On-Demand Catalog Genre Rails (Talk Shows, Drama, Music, Kids) */}
      <div className="space-y-12">
        {genres.slice(3).map((genre: any) => {
          const genreItems = items.filter(
            (item: any) =>
              item.media_genres?.slug === genre.slug ||
              item.media_genres?.name?.toLowerCase() === genre.name.toLowerCase()
          );

          const fiveCards = generateFiveCards(genre.name, genre.slug, genreItems);

          return (
            <GenreRail
              key={genre.id || genre.slug}
              genreName={genre.name}
              genreSlug={genre.slug}
              items={fiveCards as any}
            />
          );
        })}
      </div>

      {/* Book Us Now Agency Inquiry Section */}
      <BookUsNowSection />

    </div>
  );
}
