import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { ArticleCard } from '@/components/sports/article-card';
import { HorizontalArticleCard } from '@/components/sports/horizontal-article-card';
import { ScoreCard } from '@/components/sports/score-card';
import { NewsletterWidget, SocialCountersWidget, LatestCommentsWidget } from '@/components/sports/sidebar-widgets';
import { getAggregatedNews } from '@/lib/rss-service';
import { Trophy, ChevronRight, Layers, Activity, Flame, Newspaper } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

  // Determine Category Hero Background Image
  const categoryHeroImages: Record<string, string> = {
    'npfl': '/assest/user_npfl_hero_team_celebration.jpg',
    'world-football': '/assest/user_world_football_kane_musiala.jpg',
    'transfers': '/assest/user_transfers_hero_graphic.jpg',
    'epl': '/assest/user_transfers_hero_graphic.jpg',
  };

  const heroBgImage = categoryHeroImages[categorySlug.toLowerCase()] || '/assest/user_npfl_hero_team_celebration.jpg';

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

  // Query live RSS stream news items for category page & apply Intelligent Category Filter
  const liveRssItems = await getAggregatedNews();

  const filteredRssItems = liveRssItems.filter((item) => {
    const text = (item.title + ' ' + item.snippet + ' ' + (item.source_name || '')).toLowerCase();

    if (categorySlug === 'npfl') {
      return (
        text.includes('npfl') ||
        text.includes('nigeria') ||
        text.includes('enyimba') ||
        text.includes('rangers') ||
        text.includes('remo') ||
        text.includes('rivers') ||
        text.includes('lobi') ||
        text.includes('pillars') ||
        text.includes('shooting stars') ||
        text.includes('complete sports') ||
        text.includes('super eagles') ||
        text.includes('nff') ||
        text.includes('1xcup') ||
        text.includes('nwaiwu')
      );
    }

    if (categorySlug === 'transfers') {
      return (
        text.includes('transfer') ||
        text.includes('sign') ||
        text.includes('deal') ||
        text.includes('bid') ||
        text.includes('clause') ||
        text.includes('contract') ||
        text.includes('fee') ||
        text.includes('loan') ||
        text.includes('negotiation') ||
        text.includes('agree') ||
        text.includes('join') ||
        text.includes('exit') ||
        text.includes('swap') ||
        text.includes('move') ||
        text.includes('agent')
      );
    }

    if (categorySlug === 'world-football') {
      return (
        !text.includes('npfl') ||
        text.includes('premier league') ||
        text.includes('epl') ||
        text.includes('la liga') ||
        text.includes('champions league') ||
        text.includes('real madrid') ||
        text.includes('barcelona') ||
        text.includes('bayern') ||
        text.includes('psg') ||
        text.includes('arsenal') ||
        text.includes('chelsea') ||
        text.includes('liverpool')
      );
    }

    return true;
  });

  const finalRssList = filteredRssItems.length > 0 ? filteredRssItems : liveRssItems;

  const categoryRssArticles = finalRssList.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.id || `news-${item.id}`,
    excerpt: item.snippet,
    cover_image_url: item.thumbnail_url || heroBgImage,
    sports_categories: { name: item.source_name || humanizedTitle },
    published_at: item.published_at,
    source_url: item.source_url,
  }));

  const articlesToRender = categoryRssArticles.length > 0 ? categoryRssArticles : [
    {
      id: 'cat-1',
      title: `Latest Headlines & Developments in ${humanizedTitle}`,
      slug: `${categorySlug}-featured-update`,
      excerpt: `Comprehensive match reporting, player reactions, and analysis covering all key developments in ${humanizedTitle}.`,
      cover_image_url: categorySlug === 'npfl' ? '/assest/user_npfl_blue_player.jpg' : heroBgImage,
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

      {/* Rich Visual Hero Header Banner for Category Pages with top-anchored object position */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl min-h-[260px] sm:min-h-[300px] flex items-center bg-slate-950">
        <Image
          src={heroBgImage}
          alt={`${humanizedTitle} Hero Banner`}
          fill
          className="object-cover object-[center_20%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
        
        <div className="relative z-10 p-6 sm:p-10 space-y-3 max-w-2xl text-white">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D9541E] text-white font-extrabold text-[10px] uppercase tracking-widest shadow-md">
            <Trophy className="w-3.5 h-3.5" />
            <span>LAKU SPORTS CATEGORY HUB</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-xl leading-tight">
            {humanizedTitle}
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed drop-shadow-md">
            Latest breaking news, live match reports, tactical breakdowns, and transfer updates for {humanizedTitle}.
          </p>

          {/* Sub-Category Filter Pills */}
          {subCategories.length > 0 && (
            <div className="pt-2 flex items-center space-x-2 overflow-x-auto">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1 shrink-0 mr-1">
                <Layers className="w-3.5 h-3.5 text-emerald-400" /> Sub-Leagues:
              </span>
              {subCategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/${sub.slug}`}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-900/90 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-colors border border-slate-700 shrink-0 backdrop-blur-md"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
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
