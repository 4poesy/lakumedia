import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { HeroSlider } from '@/components/sports/hero-slider';
import { CategoryDualBlock } from '@/components/sports/category-dual-block';
import { FeaturedVideoSpotlight } from '@/components/sports/featured-video-spotlight';
import { FcBayernNewsHub } from '@/components/sports/fc-bayern-news-hub';
import { RealtimeScoreCard } from '@/components/sports/realtime-score-card';
import { NewsletterWidget, SocialCountersWidget, LatestCommentsWidget, TrendingStoriesWidget } from '@/components/sports/sidebar-widgets';
import { Activity, Flame } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SportsRootHomePage() {
  let rawArticles: any[] = [];
  let fixturesData: any[] = [];
  let mediaData: any[] = [];

  try {
    const supabase = await createClient();

    // Query articles safely
    const { data: arts } = await supabase
      .from('articles')
      .select('*, sports_categories(name, slug)')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (arts) rawArticles = arts;

    // Query fixtures safely
    const { data: fixs } = await supabase
      .from('fixtures')
      .select('*, home_team:teams!home_team_id(name, logo_url), away_team:teams!away_team_id(name, logo_url), league:leagues(name)')
      .order('kickoff_at', { ascending: true })
      .limit(3);

    if (fixs) fixturesData = fixs;

    // Query media items safely
    const { data: media } = await supabase
      .from('media_items')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(4);

    if (media) mediaData = media;
  } catch (error) {
    console.error('Supabase query fallback on page.tsx:', error);
  }

  const sampleImages = [
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1543351611-c823945f1007?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop',
  ];

  const sanitizeImageUrl = (url?: string | null, index: number = 0) => {
    if (!url || url.startsWith('/') || !url.startsWith('http')) {
      return sampleImages[index % sampleImages.length];
    }
    return url;
  };

  const demoArticles = [
    {
      id: 'art1',
      title: 'Enyimba Secure Thrilling Victory Against Kano Pillars in NPFL Derby',
      slug: 'enyimba-thrilling-victory-npfl-derby',
      excerpt: 'Enyimba FC delivered a masterclass performance in Aba to secure a 2-1 victory over rivals Kano Pillars in front of a capacity crowd.',
      cover_image_url: sampleImages[0],
      categoryName: 'NPFL League',
      published_at: new Date().toISOString(),
    },
    {
      id: 'art2',
      title: 'Konsa Will Bench Saliba At Arsenal — Chelsea Legend Claims',
      slug: 'konsa-will-bench-saliba-at-arsenal',
      excerpt: 'Former Chelsea legend insists Ezri Konsa would easily earn a starting berth over William Saliba at the Emirates Stadium this season.',
      cover_image_url: sampleImages[1],
      categoryName: 'World Football',
      published_at: new Date().toISOString(),
    },
    {
      id: 'art3',
      title: 'Super Eagles Star Signs Multi-Year Extension Deal',
      slug: 'super-eagles-star-signs-multi-year-extension',
      excerpt: 'In a major transfer update, the Nigerian international winger has officially signed a multi-year contract extension worth record wages.',
      cover_image_url: sampleImages[2],
      categoryName: 'Transfer News',
      published_at: new Date().toISOString(),
    },
    {
      id: 'art4',
      title: 'Heskey: Why Kane Will Return To Premier League',
      slug: 'heskey-why-kane-will-return-premier-league',
      excerpt: 'Emile Heskey believes Harry Kane still has unfinished business in England after his Bayern Munich spell.',
      cover_image_url: sampleImages[3],
      categoryName: 'Transfers',
      published_at: new Date().toISOString(),
    },
    {
      id: 'art5',
      title: 'Infantino Has Done Nothing Wrong — Eto\'o Backs FIFA President\'s Re-Election Bid',
      slug: 'infantino-done-nothing-wrong-etoo-backs-fifa',
      excerpt: 'FECAFOOT boss Samuel Eto\'o publicly pledges support for Gianni Infantino\'s continued presidency.',
      cover_image_url: sampleImages[4],
      categoryName: 'World Football',
      published_at: new Date().toISOString(),
    },
    {
      id: 'art6',
      title: 'Nigerian Government Should Stop Funding Sports — By Ehi Braimah',
      slug: 'nigerian-government-should-stop-funding-sports',
      excerpt: 'Opinion editorial on why public money funding of sports in Nigeria needs urgent commercial restructuring.',
      cover_image_url: sampleImages[5],
      categoryName: 'Features',
      published_at: new Date().toISOString(),
    },
  ];

  const heroSlides = rawArticles.length >= 3 ? rawArticles.slice(0, 3).map((a: any, idx: number) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt || 'Read the full sports news update on Laku Media.',
    imageUrl: sanitizeImageUrl(a.cover_image_url, idx),
    categoryName: a.sports_categories?.name || 'Sports',
    publishedAt: a.published_at || new Date().toISOString(),
  })) : demoArticles.slice(0, 3).map((a, idx) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    imageUrl: a.cover_image_url,
    categoryName: a.categoryName,
    publishedAt: a.published_at,
  }));

  const articles = rawArticles.length >= 5 ? rawArticles.map((a: any, idx: number) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    cover_image_url: sanitizeImageUrl(a.cover_image_url, idx),
    categoryName: a.sports_categories?.name || 'Sports',
    published_at: a.published_at,
  })) : demoArticles;

  const fixtures = (fixturesData as any[]).length > 0 ? fixturesData : [
    {
      id: '30000000-0000-0000-0000-000000000001',
      home_team: { name: 'Enyimba FC', logo_url: null },
      away_team: { name: 'Kano Pillars', logo_url: null },
      league: { name: 'NPFL Derby' },
      kickoff_at: new Date().toISOString(),
      home_score: 2,
      away_score: 1,
      status: 'finished' as const,
    },
    {
      id: '30000000-0000-0000-0000-000000000002',
      home_team: { name: 'Arsenal FC', logo_url: null },
      away_team: { name: 'Chelsea FC', logo_url: null },
      league: { name: 'Premier League' },
      kickoff_at: new Date(Date.now() + 3600000).toISOString(),
      home_score: null,
      away_score: null,
      status: 'scheduled' as const,
    },
  ];

  const videos = (mediaData as any[]).length > 0 ? mediaData : [
    {
      id: 'v1',
      title: 'Victor Ikpeba: Why Christian Chukwu Is Nigeria\'s Greatest Super Eagles Player',
      slug: 'victor-ikpeba-christian-chukwu-super-eagles',
      thumbnail_url: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop',
      duration_seconds: 1800,
      youtubeId: '3Q06g9O0J-Y',
    },
    {
      id: 'v2',
      title: 'The 2026/27 Football League Season Preview',
      slug: 'football-league-season-preview',
      thumbnail_url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop',
      duration_seconds: 1200,
      youtubeId: 'dQw4w9WgXcQ',
    },
    {
      id: 'v3',
      title: 'Should Justin Madugu Continue As Super Falcons Head Coach?',
      slug: 'justin-madugu-super-falcons-coach',
      thumbnail_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop',
      duration_seconds: 900,
      youtubeId: 'L_LUpnjgPso',
    },
    {
      id: 'v4',
      title: '10 Super Eagles Stars Who Won Trophies In The 2025/26 Season',
      slug: 'super-eagles-stars-trophies',
      thumbnail_url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop',
      duration_seconds: 1500,
      youtubeId: 'kXYiU_JCYtU',
    },
  ];

  // Article buckets for dual blocks
  const npflArticles = articles.filter((a) => a.categoryName === 'NPFL' || a.categoryName === 'Nigerian Football');
  const worldArticles = articles.filter((a) => a.categoryName === 'World Football' || a.categoryName === 'EPL');
  const featureArticles = articles.filter((a) => a.categoryName === 'Features' || a.categoryName === 'Transfers');

  return (
    <div className="space-y-8 theme-sports max-w-7xl mx-auto">
      
      {/* 1. 8K 3-Slide Interactive Hero Slider Component */}
      <section className="space-y-2">
        <div className="flex items-center justify-between pb-1 border-b border-slate-200">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#2A2E7F] flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#D9541E]" /> FEATURED HEADLINES & SLIDER
          </h2>
          <Link href="/world-football" prefetch={true} className="text-xs font-bold text-[#D9541E] hover:underline">
            View all news →
          </Link>
        </div>

        <HeroSlider slides={heroSlides} />
      </section>

      {/* Main Content Grid: Main News Stream (Left 68%) + Sidebar (Right 32%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main News Stream Column (8 cols / 68% desktop width) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Dual Category Block 1: Nigerian Footballers Abroad & NPFL News */}
          <CategoryDualBlock
            leftColumn={{
              categoryTitle: 'NIGERIAN FOOTBALLERS ABROAD',
              categorySlug: 'world-football',
              articles: worldArticles.length > 0 ? worldArticles : articles,
            }}
            rightColumn={{
              categoryTitle: 'NPFL NEWS',
              categorySlug: 'npfl',
              articles: npflArticles.length > 0 ? npflArticles : articles,
            }}
          />

          {/* FC Bayern Munich Inspired Tactical Breakdown Hub */}
          <FcBayernNewsHub />

          {/* Featured Multimedia Video Spotlight Section (Inline YouTube Player) */}
          <FeaturedVideoSpotlight videos={videos} />

          {/* Dual Category Block 2: FEATURES & LIFESTYLE */}
          <CategoryDualBlock
            leftColumn={{
              categoryTitle: 'FEATURES & OPINION',
              categorySlug: 'world-football',
              articles: featureArticles.length > 0 ? featureArticles : articles,
            }}
            rightColumn={{
              categoryTitle: 'LIFESTYLE & SPORTS',
              categorySlug: 'world-football',
              articles: articles,
            }}
          />

        </div>

        {/* Right Sidebar Column (4 cols / 32% desktop width) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Goal.com Style Numbered Trending Rail (01, 02, 03, 04) */}
          <TrendingStoriesWidget />

          {/* Newsletter Subscription Widget */}
          <NewsletterWidget />

          {/* Social Counters Widget */}
          <SocialCountersWidget />

          {/* LiveScore.com Style Match Center Widget */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#2A2E7F] flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#D9541E]" /> Match Center
              </h3>
              <Link href="/live-scores" prefetch={true} className="text-[11px] font-bold text-[#D9541E] hover:underline">
                Full Schedule →
              </Link>
            </div>
            <div className="space-y-3">
              {fixtures.map((fix: any) => (
                <RealtimeScoreCard
                  key={fix.id}
                  initialFixture={{
                    id: fix.id,
                    homeTeam: fix.home_team?.name || 'Home Team',
                    awayTeam: fix.away_team?.name || 'Away Team',
                    homeScore: fix.home_score,
                    awayScore: fix.away_score,
                    kickoffAt: fix.kickoff_at,
                    status: fix.status,
                    leagueName: fix.league?.name || 'League',
                    homeLogo: fix.home_team?.logo_url,
                    awayLogo: fix.away_team?.logo_url,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Latest Comments Widget */}
          <LatestCommentsWidget />

        </div>

      </div>

    </div>
  );
}
