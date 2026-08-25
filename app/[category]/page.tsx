import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArticleCard } from '@/components/sports/article-card';
import { HorizontalArticleCard } from '@/components/sports/horizontal-article-card';
import { ScoreCard } from '@/components/sports/score-card';
import { NewsletterWidget, SocialCountersWidget, LatestCommentsWidget } from '@/components/sports/sidebar-widgets';
import { Trophy, ChevronRight, Layers, Activity, Flame, Newspaper } from 'lucide-react';

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
    {
      id: 'cat-2',
      title: `Transfer Window Speculation Heats Up For ${humanizedTitle} Stars`,
      slug: `${categorySlug}-transfer-speculation`,
      excerpt: 'Scouting reports and contractual negotiations underway across top clubs.',
      cover_image_url:
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop',
      sports_categories: { name: humanizedTitle },
      published_at: new Date().toISOString(),
    },
    {
      id: 'cat-3',
      title: `Tactical Breakdown & Managerial Press Conference Highlights`,
      slug: `${categorySlug}-tactical-breakdown`,
      excerpt: 'Post-match press conference takeaways and strategic team selection analysis.',
      cover_image_url:
        'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop',
      sports_categories: { name: humanizedTitle },
      published_at: new Date().toISOString(),
    },
  ];

  // Lead story vs horizontal list stories
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
            <p className="text-xs text-slate-500 mt-1 font-medium">
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

      {/* Completesports.com Layout (Main News Stream + Right Sidebar Widgets) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Column (8 cols desktop - 68%) */}
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

          {/* Secondary Compact Horizontal List Cards */}
          {secondaryArticles.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Newspaper className="w-5 h-5 text-emerald-600" /> More {humanizedTitle} Headlines
              </h3>
              <div className="divide-y divide-slate-100">
                {secondaryArticles.map((art: any) => (
                  <HorizontalArticleCard
                    key={art.id}
                    title={art.title}
                    slug={art.slug}
                    coverImageUrl={art.cover_image_url}
                    categoryName={art.sports_categories?.name || humanizedTitle}
                    publishedAt={art.published_at}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar Column (4 cols desktop - 32%) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Newsletter Box */}
          <NewsletterWidget />

          {/* Social Counters */}
          <SocialCountersWidget />

          {/* Match Center Widget */}
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

          {/* Latest Comments Widget */}
          <LatestCommentsWidget />

        </div>
      </div>
    </div>
  );
}
