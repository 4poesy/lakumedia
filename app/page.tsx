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
import { Activity, Flame, Globe } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

    // Fetch Live RSS Aggregated News
    aggregatedNewsItems = await getAggregatedNews();
  } catch (error) {
    console.error('Supabase query error on page.tsx:', error);
    aggregatedNewsItems = await getAggregatedNews();
  }

  // Build Hero Slides dynamically from Live RSS News Stream if available
  const heroSlides = aggregatedNewsItems.length >= 4
    ? aggregatedNewsItems.slice(0, 4).map((item, idx) => ({
        id: item.id || `rss-slide-${idx}`,
        title: item.title,
        slug: item.id || `news-story-${idx}`,
        excerpt: item.snippet,
        imageUrl: item.thumbnail_url || '/assest/user_npfl_blue_player.jpg',
        categoryName: item.source_name || 'World Sports',
        publishedAt: item.published_at,
        sourceUrl: item.source_url,
      }))
    : [
        {
          id: 'slide-1',
          title: 'Enyimba Secure Thrilling Victory Against Kano Pillars in NPFL Derby',
          slug: 'enyimba-thrilling-victory-npfl-derby',
          excerpt: 'Enyimba FC delivered a masterclass performance in Aba to secure a 2-1 victory over rivals Kano Pillars.',
          imageUrl: '/assest/user_enyimba_news_hero.jpg',
          categoryName: 'NPFL League',
          publishedAt: new Date().toISOString(),
        },
        {
          id: 'slide-2',
          title: 'Harry Kane & Musiala Masterclass Powers Bayern Munich Victory',
          slug: 'fc-bayern-munich-harry-kane-musiala-victory',
          excerpt: 'Exclusive tactical breakdown of FC Bayern Munich\'s dominant performance in the UEFA Champions League.',
          imageUrl: '/assest/user_kane_musiala_bayern.jpg',
          categoryName: 'World Football',
          publishedAt: new Date().toISOString(),
        },
      ];

  const articles = rawArticles.length > 0 ? rawArticles : demoArticlesFallback;

  const fixtures = (fixturesData as any[]).length > 0 ? fixturesData : [
    {
      id: 'fix-1',
      home_team: { name: 'Enyimba FC' },
      away_team: { name: 'Kano Pillars' },
      home_score: 2,
      away_score: 1,
      match_minute: '84',
      status: 'live',
      league: { name: 'NPFL' },
    },
    {
      id: 'fix-2',
      home_team: { name: 'Rangers International' },
      away_team: { name: 'Remo Stars' },
      home_score: 1,
      away_score: 0,
      match_minute: '62',
      status: 'live',
      league: { name: 'NPFL' },
    },
  ];

  return (
    <div className="space-y-8 theme-sports">
      
      {/* 1. Main Hero Slider Section (Powered by Live RSS Stream) */}
      <section className="relative">
        <HeroSlider slides={heroSlides} />
      </section>

      {/* 2. Live Scores Ticker Bar & Worldwide RSS News Feed */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" /> LIVE GLOBAL SPORTS STREAM
            </h2>
          </div>

          <Link href="/live-scores" className="text-xs font-bold text-amber-400 hover:underline">
            View All Live Matches & Scores →
          </Link>
        </div>

        {/* Live RSS Feed Wire Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {aggregatedNewsItems.slice(0, 6).map((news) => (
            <a
              key={news.id}
              href={news.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-1.5">
                <span className="px-2 py-0.5 rounded bg-[#D9541E]/20 text-[#D9541E] border border-orange-500/30 text-[10px] font-black uppercase tracking-wider inline-block">
                  {news.source_name}
                </span>
                <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                  {news.title}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                  {news.snippet}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-700/60">
                <span>{new Date(news.published_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                <span className="text-amber-400 font-bold group-hover:underline">Read Source →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 3. Main Completesports.com Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Column (8 cols - 68%) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Dual Category News Block (NPFL & World Football) */}
          <CategoryDualBlock
            leftColumn={{
              categoryTitle: 'NPFL & NIGERIAN SPORTS',
              categorySlug: 'npfl',
              articles: (aggregatedNewsItems.length > 0 ? aggregatedNewsItems : articles).map((item) => ({
                id: item.id,
                title: item.title,
                slug: item.slug || item.id,
                excerpt: item.snippet || item.excerpt,
                cover_image_url: item.thumbnail_url || item.cover_image_url || '/assest/user_npfl_blue_player.jpg',
                published_at: item.published_at,
              })).slice(0, 4),
            }}
            rightColumn={{
              categoryTitle: 'WORLD FOOTBALL & BREAKING TRANSFERS',
              categorySlug: 'world-football',
              articles: (aggregatedNewsItems.length > 4 ? aggregatedNewsItems.slice(4) : articles).map((item) => ({
                id: item.id,
                title: item.title,
                slug: item.slug || item.id,
                excerpt: item.snippet || item.excerpt,
                cover_image_url: item.thumbnail_url || item.cover_image_url || '/assest/user_world_football_kane_musiala.jpg',
                published_at: item.published_at,
              })).slice(0, 4),
            }}
          />

          {/* Featured Video Spotlight */}
          <FeaturedVideoSpotlight videos={mediaData.length > 0 ? mediaData : demoVideosFallback} />

          {/* FC Bayern Munich & European Club Hub */}
          <FcBayernNewsHub />

          {/* Around the Web Media Rail */}
          <AroundTheWebRail items={aggregatedNewsItems} />

        </div>

        {/* Right Sidebar Column (4 cols - 32%) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Realtime Live Score Card Widget */}
          {fixturesData.length > 0 ? (
            <RealtimeScoreCard
              initialFixture={{
                id: fixturesData[0].id,
                homeTeam: fixturesData[0].home_team?.name || 'Home Team',
                awayTeam: fixturesData[0].away_team?.name || 'Away Team',
                homeScore: fixturesData[0].status === 'scheduled' ? null : fixturesData[0].home_score,
                awayScore: fixturesData[0].status === 'scheduled' ? null : fixturesData[0].away_score,
                kickoffAt: fixturesData[0].kickoff_at,
                status: fixturesData[0].status,
                leagueName: fixturesData[0].league?.name || 'Match Center',
                homeLogo: fixturesData[0].home_team?.logo_url,
                awayLogo: fixturesData[0].away_team?.logo_url,
              }}
            />
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800">
                Match Center
              </span>
              <h4 className="text-sm font-bold text-white">Live Match Broadcasts</h4>
              <p className="text-xs text-slate-400 font-medium">
                Live scores update in real-time when matches kick off.
              </p>
            </div>
          )}

          {/* Trending Stories Widget */}
          <TrendingStoriesWidget />

          {/* Fan Match Predictions Widget */}
          <FanPredictionsWidget />

          {/* Newsletter Box */}
          <NewsletterWidget />

          {/* Social Counters */}
          <SocialCountersWidget />

          {/* Latest Comments Widget */}
          <LatestCommentsWidget />

        </div>

      </div>

    </div>
  );
}

const demoArticlesFallback = [
  {
    id: 'art1',
    title: 'Enyimba Secure Thrilling Victory Against Kano Pillars in NPFL Derby',
    slug: 'enyimba-thrilling-victory-npfl-derby',
    excerpt: 'Enyimba FC delivered a masterclass performance in Aba to secure a 2-1 victory over rivals Kano Pillars.',
    cover_image_url: '/assest/user_enyimba_news_hero.jpg',
    categoryName: 'NPFL League',
    published_at: new Date().toISOString(),
  },
  {
    id: 'art2',
    title: 'Konsa Will Bench Saliba At Arsenal — Chelsea Legend Claims',
    slug: 'konsa-will-bench-saliba-at-arsenal',
    excerpt: 'Former Chelsea legend insists Ezri Konsa would easily earn a starting berth over William Saliba.',
    cover_image_url: '/assest/user_world_football_kane_musiala.jpg',
    categoryName: 'World Football',
    published_at: new Date().toISOString(),
  },
];

const demoVideosFallback = [
  {
    id: 'vid-1',
    title: 'Laku Media Studio Complex Tour & Executive Interview',
    slug: 'laku-media-studio-tour',
    thumbnail_url: '/assest/user_enyimba_news_hero.jpg',
    youtubeId: '3Q06g9O0J-Y',
    duration_seconds: 420,
    published_at: new Date().toISOString(),
  },
  {
    id: 'vid-2',
    title: 'Match Highlights: Top NPFL Thrillers & Stadium Reactions',
    slug: 'npfl-thillers-highlights',
    thumbnail_url: '/assest/user_npfl_hero_team_celebration.jpg',
    youtubeId: 'L_LUpnjgPso',
    duration_seconds: 310,
    published_at: new Date().toISOString(),
  },
];
