import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { GenreRail } from '@/components/multimedia/genre-rail';
import { RealtimeLiveCard } from '@/components/multimedia/realtime-live-card';
import { BookUsNowSection } from '@/components/multimedia/book-us-now';
import { StudioCollectionsHub } from '@/components/multimedia/studio-collections-hub';
import { TrendingTop10Rail } from '@/components/multimedia/trending-top10-rail';
import { MultimediaHeroSlider } from '@/components/multimedia/multimedia-hero-slider';
import { ParallaxCinemaSection } from '@/components/multimedia/parallax-cinema-section';
import { NewsletterPopupModal, StudioSubscriberSection } from '@/components/multimedia/newsletter-popup-modal';
import { Smooth3DSlideshow } from '@/components/ui/smooth-3d-slideshow';
import { LakuMediaYoutubeShowcase } from '@/components/multimedia/laku-media-youtube-showcase';
import { Radio, Film, Tv, Camera, Users, ArrowRight } from 'lucide-react';
import { NeonBorder } from '@/components/ui/neon-border';

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

  const teamSlides = [
    {
      image: {
        src: '/assest/team/samuel-adebayo-olaku.jpg',
      },
      title: 'SAMUEL ADEBAYO OLAKU\nChief Executive Officer (CEO)',
    },
    {
      image: {
        src: '/assest/team/oluwaseun-olaku.jpg',
      },
      title: 'OLUWASEUN OLAKU\nProduction Manager',
    },
    {
      image: {
        src: '/assest/team/akinola-olujobi.jpg',
      },
      title: 'AKINOLA OLUJOBI\nWeb Developer',
    },
    {
      image: {
        src: '/assest/team/oluwarotimi-ajayi.jpg',
      },
      title: 'OLUWAROTIMI AJAYI\nHead of Operation',
    },
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
    <div className="bg-[#090A0F] text-white min-h-screen space-y-10">
      {/* Lead Gen Newsletter Popup Modal */}
      <NewsletterPopupModal />

      {/* 1. PRIMARY HERO SECTION: 4-Slide Interactive Hero Slider at top */}
      <section className="pt-1">
        <MultimediaHeroSlider />
      </section>

      {/* 2. FEATURE BANNER SECTION: Studio Capabilities Banner placed right below Hero Slider */}
      <NeonBorder color="#D9541E" rounded={28} thickness={3} borderSize={40} glow={70}>
        <div className="relative rounded-3xl overflow-hidden min-h-[200px] sm:min-h-[240px] flex flex-col justify-center px-6 sm:px-10 py-8 border border-slate-800 shadow-2xl bg-slate-950">
          <Image
            src="/assest/user_about_control_room_2.jpg"
            alt="Laku Media Executive Studio Hub Background"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090A0F] via-[#090A0F]/85 to-transparent" />
          
          <div className="relative z-10 space-y-3 max-w-4xl">
            {/* Studio Micro Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-[#10B981]/20 border border-[#10B981]/50 text-[#10B981] text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                <Film className="w-3.5 h-3.5 text-emerald-400" /> 4K/8K CINEMA
              </span>
              <span className="px-3 py-1 rounded-md bg-[#D9541E]/20 border border-[#D9541E]/50 text-[#D9541E] text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                <Tv className="w-3.5 h-3.5 text-orange-400" /> SATELLITE BROADCAST
              </span>
              <span className="px-3 py-1 rounded-md bg-purple-500/20 border border-purple-500/50 text-purple-300 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                <Camera className="w-3.5 h-3.5 text-purple-400" /> CREATIVE BRAND AGENCY
              </span>
            </div>

            {/* WOW Redesigned Gradient Heading */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none uppercase drop-shadow-2xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-[#10B981]">
                CINEMATIC FILMS,{" "}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9541E] via-amber-400 to-orange-500">
                LIVE BROADCASTS{" "}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                & BRAND AGENCY
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl leading-relaxed drop-shadow-md">
              Nigeria&apos;s premier dual-vertical studio: Delivering theatrical Nollywood blockbusters, OB satellite concert broadcasts, and commercial brand advertising.
            </p>
          </div>
        </div>
      </NeonBorder>

      {/* 3. Featured Studio Hubs */}
      <StudioCollectionsHub />

      {/* 4. Top 5 Trending Titles Today */}
      <TrendingTop10Rail />

      {/* 5. Live Now Broadcast Stream Rail */}
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

      {/* 6. On-Demand Catalog Genre Rails (Films, Documentaries, Comedy) */}
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

      {/* 7. Remaining On-Demand Catalog Genre Rails (Talk Shows, Drama, Music, Kids) */}
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

      {/* 8. MEET OUR EXECUTIVE TEAM (3D Coverflow Gallery using exact Originkit component code) */}
      <section className="max-w-7xl mx-auto space-y-8 bg-slate-950 p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D9541E] flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#D9541E]" /> EXECUTIVE LEADERSHIP & CREATIVE TEAM
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase">
              MEET OUR EXECUTIVE TEAM
            </h2>
          </div>
          <Link
            href="/multimedia/about"
            className="px-5 py-2.5 rounded-xl bg-[#2A2E7F] hover:bg-blue-900 text-white font-extrabold text-xs flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <span>About Studio</span> <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>

        <div className="py-4">
          <Smooth3DSlideshow
            slides={teamSlides}
            cardWidth={420}
            cardHeight={440}
            radius={6}
            gap={8}
            tilt={12}
            sideTilt={8}
            autoplay={true}
            showTitle={true}
          />
        </div>
      </section>

      {/* 9. LAKU MEDIA CONCEPTS OFFICIAL YOUTUBE SHOWCASE */}
      <LakuMediaYoutubeShowcase />

      {/* 10. PARALLAX CINEMA SECTION */}
      <ParallaxCinemaSection
        title="PIONEERING 4K/8K CINEMATOGRAPHY & SATELLITE BROADCASTING"
        subtitle="Under the executive direction of CEO Adebayo Samuel Olaku, Laku Media Studio operates multi-camera satellite OB vans, FPV aerial drones, and Dolby sound suites."
        badge="THEATRICAL CINEMA EXPERIENCE"
        imageUrl="/assest/red_curtain_parallax.jpg"
        ctaText="Book Studio Production"
        ctaHref="/multimedia/services"
      />

      {/* 10. Permanent Studio Subscriber Section */}
      <StudioSubscriberSection />

      {/* 11. Book Us Now Agency Inquiry Section */}
      <BookUsNowSection />

    </div>
  );
}
