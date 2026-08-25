import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArticleCard } from '@/components/sports/article-card';
import { ScoreCard } from '@/components/sports/score-card';
import { Trophy, ChevronRight, Layers, Activity, Flame, Newspaper, ArrowRight } from 'lucide-react';

export const revalidate = 60;

interface CategoryPageProps {
  params: {
    category: string;
  };
}

function humanizeCategorySlug(slug: string): string {
  const customMap: Record<string, string> = {
    'npfl': 'NPFL League',
    'epl': 'Premier League',
    'world-football': 'World Football',
    'transfers': 'Transfer News',
    'champions-league': 'Champions League',
  };

  if (customMap[slug.toLowerCase()]) {
    return customMap[slug.toLowerCase()];
  }

  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = params;
  const supabase = await createClient();

  // Query category
  const { data: categoryData } = await supabase
    .from('sports_categories')
    .select('*')
    .eq('slug', categorySlug)
    .single();

  const humanizedTitle = (categoryData as any)?.name || humanizeCategorySlug(categorySlug);

  // Query sub-categories if this is a parent category
  const parentId = (categoryData as any)?.id;
  let subCategories: any[] = [];
  if (parentId) {
    const { data: subs } = await supabase
      .from('sports_categories')
      .select('*')
      .eq('parent_id', parentId);
    if (subs) subCategories = subs;
  }

  // Query published articles
  const { data: articlesData } = await supabase
    .from('articles')
    .select('*, sports_categories(name, slug)')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  // Filter articles for category
  const allArticles = articlesData ? (articlesData as any[]) : [];
  const filteredArticles = allArticles.filter(
    (a: any) =>
      a.sports_categories?.slug === categorySlug ||
      a.sports_categories?.name?.toLowerCase() === humanizedTitle.toLowerCase() ||
      categorySlug === 'world-football'
  );

  const articlesToRender = filteredArticles.length > 0 ? filteredArticles : [
    {
      id: 'cat-1',
      title: `Latest Headlines & Developments in ${humanizedTitle}`,
      slug: `${categorySlug}-featured-update`,
      excerpt: `Comprehensive match reporting, player reactions, and analysis covering all key developments in ${humanizedTitle}.`,
      cover_image_url:
        'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop',
      sports_categories: { name: humanizedTitle },
      published_at: new Date().toISOString(),
    },
  ];

  // Lead story vs secondary stories
  const leadArticle = articlesToRender[0];
  const secondaryArticles = articlesToRender.slice(1);

  // Query live/today's fixtures for sidebar match center
  const { data: fixturesData } = await supabase
    .from('fixtures')
    .select('*, home_team:teams!home_team_id(name, code, logo_url), away_team:teams!away_team_id(name, code, logo_url), leagues(name)')
    .limit(3);

  const sidebarFixtures = fixturesData && fixturesData.length > 0 ? (fixturesData as any[]) : [
    {
      id: 'fix-1',
      home_team: { name: 'Enyimba FC', code: 'ENY' },
      away_team: { name: 'Kano Pillars', code: 'PIL' },
      home_score: 2,
      away_score: 1,
      match_minute: '84',
      status: 'live' as const,
      leagues: { name: 'NPFL' },
    },
  ];

  // Trending stories for sidebar widget
  const trendingArticles = allArticles.slice(0, 3);

  return (
    <div className="space-y-8 theme-sports max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs font-bold text-slate-500">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-emerald-700 font-extrabold">{humanizedTitle}</span>
      </nav>

      {/* Category Header Banner */}
      <div className="space-y-4 pb-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-extrabold text-xl shadow-sm">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{humanizedTitle}</h1>
            <p className="text-xs text-slate-500 mt-1">
              Latest news, breaking reports, tactical analysis, and fixture updates for {humanizedTitle}.
            </p>
          </div>
        </div>

        {/* Sub-Category Filter Pills */}
        {subCategories.length > 0 && (
          <div className="pt-3 flex items-center space-x-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
              <Layers className="w-3.5 h-3.5 text-emerald-600" /> Sub-Leagues:
            </span>
            {subCategories.map((sub) => (
              <Link
                key={sub.id}
                href={`/${sub.slug}`}
                className="px-3 py-1 rounded-lg text-xs font-bold bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200 shrink-0 shadow-sm"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Completesports.com Two-Column Layout (Main News Stream + Sidebar Widgets) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Column (8 cols desktop - 66%) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Lead Story Spotlight */}
          {leadArticle && (
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-emerald-600" /> Lead Story
              </span>
              <ArticleCard
                title={leadArticle.title}
                slug={leadArticle.slug}
                excerpt={leadArticle.excerpt}
                coverImageUrl={leadArticle.cover_image_url}
                categoryName={leadArticle.sports_categories?.name || humanizedTitle}
                publishedAt={leadArticle.published_at}
                featured={true}
              />
            </div>
          )}

          {/* Secondary Stories Grid */}
          {secondaryArticles.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-emerald-600" /> More {humanizedTitle} Stories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {secondaryArticles.map((art: any) => (
                  <ArticleCard
                    key={art.id}
                    title={art.title}
                    slug={art.slug}
                    excerpt={art.excerpt}
                    coverImageUrl={art.cover_image_url}
                    categoryName={art.sports_categories?.name || humanizedTitle}
                    publishedAt={art.published_at}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sparse Content Notice */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-2 shadow-sm">
            <p className="text-xs font-bold text-slate-700">
              More {humanizedTitle} news & match coverage coming soon.
            </p>
            <p className="text-[11px] text-slate-500">
              Our editorial desk reports live updates throughout the match week.
            </p>
          </div>
        </div>

        {/* Right Sidebar Column (4 cols desktop - 34%) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Match Center Live Scores Widget */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" /> Live Match Center
              </h3>
              <Link href="/live-scores" className="text-[11px] font-bold text-emerald-700 hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {sidebarFixtures.map((fix: any) => (
                <ScoreCard
                  key={fix.id}
                  homeTeam={fix.home_team?.name || 'Home Team'}
                  awayTeam={fix.away_team?.name || 'Away Team'}
                  homeScore={fix.home_score}
                  awayScore={fix.away_score}
                  kickoffAt={fix.kickoff_at || new Date().toISOString()}
                  status={fix.status}
                  leagueName={fix.leagues?.name || 'Football'}
                />
              ))}
            </div>
          </div>

          {/* Trending Stories Widget */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" /> Most Read Headlines
              </h3>
            </div>

            <div className="space-y-3 divide-y divide-slate-100">
              {trendingArticles.map((art: any, index: number) => (
                <div key={art.id} className="pt-3 first:pt-0 flex items-start space-x-3 group">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <div className="space-y-1 flex-1">
                    <Link
                      href={`/article/${art.slug}`}
                      className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug"
                    >
                      {art.title}
                    </Link>
                    <span className="text-[10px] text-slate-500 block">
                      {art.sports_categories?.name || 'Sports'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sports Categories Quick-Links */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Sports Categories
            </h3>
            <div className="space-y-1.5 text-xs font-bold">
              <Link href="/npfl" className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-slate-900 transition-colors">
                <span>NPFL League</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </Link>
              <Link href="/epl" className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-slate-900 transition-colors">
                <span>Premier League</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </Link>
              <Link href="/transfers" className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-slate-900 transition-colors">
                <span>Transfer News</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </Link>
              <Link href="/world-football" className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-slate-900 transition-colors">
                <span>World Football</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
