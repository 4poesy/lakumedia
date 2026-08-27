import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { HeroSlider } from '@/components/sports/hero-slider';
import { CategoryDualBlock } from '@/components/sports/category-dual-block';
import { FeaturedVideoSpotlight } from '@/components/sports/featured-video-spotlight';
import { FcBayernNewsHub } from '@/components/sports/fc-bayern-news-hub';
import { RealtimeScoreCard } from '@/components/sports/realtime-score-card';
import { FanPredictionsWidget } from '@/components/sports/fan-predictions-widget';
import { NewsletterWidget, SocialCountersWidget, LatestCommentsWidget, TrendingStoriesWidget } from '@/components/sports/sidebar-widgets';
import { AroundTheWebRail } from '@/components/sports/around-the-web-rail';
import { getAggregatedNews } from '@/lib/rss-service';
import { Activity, Flame } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SportsRootHomePage() {
  let rawArticles: any[] = [];
  let fixturesData: any[] = [];
  let mediaData: any[] = [];
  let aggregatedNewsItems: any[] = [];

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

    // Fetch RSS Aggregated News
    aggregatedNewsItems = await getAggregatedNews();
  } catch (error) {
    console.error('Supabase query fallback on page.tsx:', error);
    aggregatedNewsItems = await getAggregatedNews();
  }

  // User uploaded high-resolution local assets
  const demoArticles = [
    {
      id: 'art1',
      title: 'Enyimba Secure Thrilling Victory Against Kano Pillars in NPFL Derby',
      slug: 'enyimba-thrilling-victory-npfl-derby',
      excerpt: 'Enyimba FC delivered a masterclass performance in Aba to secure a 2-1 victory over rivals Kano Pillars in front of a capacity crowd.',
      cover_image_url: '/assest/user_enyimba_news_hero.jpg',
      categoryName: 'NPFL League',
      published_at: new Date().toISOString(),
    },
    {
      id: 'art2',
      title: 'Konsa Will Bench Saliba At Arsenal — Chelsea Legend Claims',
      slug: 'konsa-will-bench-saliba-at-arsenal',
      excerpt: 'Former Chelsea legend insists Ezri Konsa would easily earn a starting berth over William Saliba at the Emirates Stadium this season.',
      cover_image_url: '/assest/user_world_football_kane_musiala.jpg',
      categoryName: 'World Football',
      published_at: new Date().toISOString(),
    },
    {
      id: 'art3',
      title: 'NPFL Derby: Enyimba Host Rangers International In High-Stakes Clash',
      slug: 'enyimba-vs-rangers-npfl-derby-2026',
      excerpt: 'Nine-time champions Enyimba FC prepare to battle rivals Rangers International at the Aba Township Stadium in a critical NPFL title race encounter.',
      cover_image_url: '/assest/user_enyimba_aba_jump.jpg',
      categoryName: 'NPFL League',
      published_at: new Date().toISOString(),
    },
    {
      id: 'art4',
      title: 'Haaland & Super Eagles Stars Battle In High-Octane International Duel',
      slug: 'haaland-super-eagles-stars-european-tackle',
      excerpt: 'Erling Haaland engages in an intense physical duel against top defensive talents in a thrilling European spectacle.',
      cover_image_url: '/assest/user_home_hero_4th_slide.jpg',
      categoryName: 'Match Spotlight',
      published_at: new Date().toISOString(),
    },
    {
      id: 'art5',
      title: 'Infantino Has Done Nothing Wrong — Eto\'o Backs FIFA President\'s Re-Election Bid',
      slug: 'infantino-done-nothing-wrong-etoo-backs-fifa',
      excerpt: 'FECAFOOT boss Samuel Eto\'o publicly pledges support for Gianni Infantino\'s continued presidency.',
      cover_image_url: '/assest/user_infantino_fifa.jpg',
      categoryName: 'World Football',
      published_at: new Date().toISOString(),
    },
    {
      id: 'art6',
      title: 'Super Eagles Manager Announces 24-Man Squad For Upcoming AFCON Qualifiers',
      slug: 'super-eagles-manager-announces-afcon-squad',
      excerpt: 'The Nigeria Football Federation has officially released the squad list featuring NPFL standout performers and Europe-based stars for next month’s qualifiers.',
      cover_image_url: '/assest/user_super_eagles_manager.jpg',
      categoryName: 'Super Eagles',
      published_at: new Date().toISOString(),
    },
  ];

  const heroSlides = [
    {
      id: 'slide-1',
      title: 'Enyimba Secure Thrilling Victory Against Kano Pillars in NPFL Derby',
      slug: 'enyimba-thrilling-victory-npfl-derby',
      excerpt: 'Enyimba FC delivered a masterclass performance in Aba to secure a 2-1 victory over rivals Kano Pillars in front of a capacity stadium crowd.',
      imageUrl: '/assest/user_enyimba_news_hero.jpg',
      categoryName: 'NPFL League',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'slide-2',
      title: 'Harry Kane & Musiala Masterclass Powers Bayern Munich Victory',
      slug: 'fc-bayern-munich-harry-kane-musiala-victory',
      excerpt: 'Exclusive tactical breakdown of FC Bayern Munich\'s dominant performance in the UEFA Champions League marquee fixture.',
      imageUrl: '/assest/user_kane_musiala_bayern.jpg',
      categoryName: 'World Football',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'slide-3',
      title: 'Transfers: What The Clubs Need To Do This Window',
      slug: 'transfers-what-clubs-need-to-do',
      excerpt: 'Comprehensive club-by-club transfer state of play, contract negotiations, and scouting priorities ahead of deadline day.',
      imageUrl: '/assest/user_transfers_hero_graphic.jpg',
      categoryName: 'Transfer News',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'slide-4',
      title: 'Haaland & Super Eagles Stars Battle In High-Octane International Duel',
      slug: 'haaland-super-eagles-stars-european-tackle',
      excerpt: 'Erling Haaland engages in an intense physical duel against top defensive talents in a thrilling European spectacle.',
      imageUrl: '/assest/user_home_hero_4th_slide.jpg',
      categoryName: 'Match Spotlight',
      publishedAt: new Date().toISOString(),
    },
  ];

  const articles = demoArticles;

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
      thumbnail_url: '/assest/user_super_eagles_manager.jpg',
      duration_seconds: 1800,
      youtubeId: '3Q06g9O0J-Y',
    },
    {
      id: 'v2',
      title: 'The 2026/27 Football League Season Preview',
      slug: 'football-league-season-preview',
      thumbnail_url: '/assest/user_npfl_hero_team_celebration.jpg',
      duration_seconds: 1200,
      youtubeId: 'dQw4w9WgXcQ',
    },
    {
      id: 'v3',
      title: 'Super Eagles Manager AFCON Press Conference Highlights',
      slug: 'justin-madugu-super-falcons-coach',
      thumbnail_url: '/assest/user_super_eagles_manager.jpg',
      duration_seconds: 900,
      youtubeId: 'L_LUpnjgPso',
    },
    {
      id: 'v4',
      title: '10 Super Eagles Stars Who Won Trophies In The 2025/26 Season',
      slug: 'super-eagles-stars-trophies',
      thumbnail_url: '/assest/user_npfl_blue_player.jpg',
      duration_seconds: 1500,
      youtubeId: 'kXYiU_JCYtU',
    },
  ];

  // Article buckets for dual blocks
  const npflArticles = articles.filter((a) => a.categoryName === 'NPFL League' || a.categoryName === 'NPFL' || a.categoryName === 'Super Eagles');
  const worldArticles = articles.filter((a) => a.categoryName === 'World Football' || a.categoryName === 'Match Spotlight');
  const featureArticles = articles.filter((a) => a.categoryName === 'Features' || a.categoryName === 'Transfer News' || a.categoryName === 'Transfers');

  return (
    <div className="space-y-8 theme-sports max-w-7xl mx-auto relative pb-20">
      
      {/* 1. 4-Slide Interactive Hero Slider Component */}
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
          
          {/* Dual Category Block 1: World Football & NPFL News */}
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
          
          {/* Fan Match Predictions & Odds Polling Widget */}
          <FanPredictionsWidget />

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

      {/* Around the Web RSS & Video Aggregation Rail */}
      <AroundTheWebRail items={aggregatedNewsItems} />

    </div>
  );
}
