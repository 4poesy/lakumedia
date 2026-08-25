import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArticleCard } from '@/components/sports/article-card';
import { RealtimeScoreCard } from '@/components/sports/realtime-score-card';
import { Trophy, Activity, Flame, ChevronRight, Film } from 'lucide-react';

export const revalidate = 30;

export default async function SportsRootHomePage() {
  const supabase = await createClient();

  // Query sports categories
  const { data: categories } = await supabase
    .from('sports_categories')
    .select('*')
    .order('name', { ascending: true });

  // Query articles
  const { data: articlesData } = await supabase
    .from('articles')
    .select('*, sports_categories(name)')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  // Query fixtures
  const { data: fixturesData } = await supabase
    .from('fixtures')
    .select('*, home_team:teams!home_team_id(name, logo_url), away_team:teams!away_team_id(name, logo_url), league:leagues(name)')
    .order('kickoff_at', { ascending: true })
    .limit(3);

  const defaultCategories = categories && categories.length > 0 ? categories : [
    { id: '1', name: 'NPFL', slug: 'npfl' },
    { id: '2', name: 'EPL', slug: 'epl' },
    { id: '3', name: 'Transfers', slug: 'transfers' },
    { id: '4', name: 'World Football', slug: 'world-football' },
  ];

  const articles = articlesData && articlesData.length > 0 ? articlesData : [
    {
      id: 'art1',
      title: 'Enyimba Secure Thrilling Victory Against Kano Pillars in NPFL Derby',
      slug: 'enyimba-thrilling-victory-npfl-derby',
      excerpt: 'Enyimba FC delivered a masterclass performance in Aba to secure a 2-1 victory over rivals Kano Pillars.',
      cover_image_url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop',
      sports_categories: { name: 'NPFL' },
      published_at: new Date().toISOString(),
    },
    {
      id: 'art2',
      title: 'Premier League Title Race Heats Up Ahead of London Derby',
      slug: 'premier-league-title-race-heats-up',
      excerpt: 'The Premier League title race hits high gear this weekend as London rivals prepare for a high-stakes showdown.',
      cover_image_url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&auto=format&fit=crop',
      sports_categories: { name: 'EPL' },
      published_at: new Date().toISOString(),
    },
    {
      id: 'art3',
      title: 'Super Eagles Star Signs Multi-Year Extension Deal',
      slug: 'super-eagles-star-signs-multi-year-extension',
      excerpt: 'In a major transfer update, the Nigerian international winger has officially signed a multi-year contract extension.',
      cover_image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop',
      sports_categories: { name: 'Transfers' },
      published_at: new Date().toISOString(),
    },
  ];

  const fixtures = fixturesData && fixturesData.length > 0 ? fixturesData : [
    {
      id: '30000000-0000-0000-0000-000000000001',
      home_team: { name: 'Enyimba FC', logo_url: null },
      away_team: { name: 'Kano Pillars', logo_url: null },
      league: { name: 'NPFL' },
      kickoff_at: new Date().toISOString(),
      home_score: 2,
      away_score: 1,
      status: 'finished' as const,
    },
    {
      id: '30000000-0000-0000-0000-000000000002',
      home_team: { name: 'Arsenal FC', logo_url: null },
      away_team: { name: 'Chelsea FC', logo_url: null },
      league: { name: 'EPL' },
      kickoff_at: new Date(Date.now() + 3600000).toISOString(),
      home_score: null,
      away_score: null,
      status: 'scheduled' as const,
    },
  ];

  return (
    <div className="space-y-8 theme-sports max-w-7xl mx-auto">
      {/* Sports Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-emerald-700 font-extrabold text-xs uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4 text-emerald-600" /> Nigerian & World Sports Headquarters
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Latest Headlines & Live Match Center
          </h1>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-lg text-xs font-extrabold bg-emerald-600 text-white shadow-sm"
          >
            All News
          </Link>
          {defaultCategories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200 whitespace-nowrap shadow-sm"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/multimedia"
            className="px-3.5 py-1.5 rounded-lg text-xs font-extrabold bg-[#2A2E7F] text-white hover:bg-[#D9541E] transition-colors border border-purple-200 whitespace-nowrap flex items-center gap-1.5 shadow-sm"
          >
            <Film className="w-3.5 h-3.5 text-[#D9541E]" /> Laku Media Watch
          </Link>
        </div>
      </div>

      {/* Match Center Realtime Ticker */}
      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-600 font-bold">
          <span className="flex items-center gap-1.5 text-emerald-700 font-extrabold">
            <Activity className="w-4 h-4 text-emerald-600" /> Live Scores & Match Ticker (Realtime Sync)
          </span>
          <Link href="/live-scores" className="hover:text-emerald-700 flex items-center gap-1">
            Full Match Center <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </section>

      {/* Featured Headline Article */}
      {articles.length > 0 && (
        <ArticleCard
          title={articles[0].title}
          slug={articles[0].slug}
          excerpt={articles[0].excerpt}
          coverImageUrl={articles[0].cover_image_url}
          categoryName={articles[0].sports_categories?.name || 'Sports'}
          publishedAt={articles[0].published_at}
          featured={true}
        />
      )}

      {/* Secondary Articles Grid */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Flame className="w-5 h-5 text-emerald-600" /> Recent Editorial & Headlines
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((art: any) => (
            <ArticleCard
              key={art.id}
              title={art.title}
              slug={art.slug}
              excerpt={art.excerpt}
              coverImageUrl={art.cover_image_url}
              categoryName={art.sports_categories?.name || 'Sports'}
              publishedAt={art.published_at}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
