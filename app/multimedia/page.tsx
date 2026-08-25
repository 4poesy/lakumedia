import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { GenreRail } from '@/components/multimedia/genre-rail';
import { RealtimeLiveCard } from '@/components/multimedia/realtime-live-card';
import { BookUsNowSection } from '@/components/multimedia/book-us-now';
import { Film, Play, Radio, Sparkles, Camera, ArrowRight, Zap, Award, DollarSign, Briefcase } from 'lucide-react';

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

  const sampleThumbnails = [
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&auto=format&fit=crop&q=75',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=75',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=75',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop&q=75',
    'https://images.unsplash.com/photo-1543351611-c823945f1007?w=800&auto=format&fit=crop&q=75',
  ];

  // Helper generator to guarantee 5 video cards per genre rail
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
      
      {/* 1. Responsive Agency Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center space-x-2 text-[#10B981] font-extrabold text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-400" /> LAKU MEDIA PRODUCTION & MARKETING STUDIO
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            CINEMATIC FILMS, LIVE BROADCASTS & BRAND AGENCY
          </h1>
        </div>

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

      {/* 3. On-Demand Catalog Genre Rails (Guaranteed 5 Video Cards per Rail!) */}
      <div className="space-y-12">
        {genres.map((genre: any) => {
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

      {/* 4. Book Us Now Section */}
      <BookUsNowSection />

    </div>
  );
}
