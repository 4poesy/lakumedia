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
import { isNpflStory } from '@/lib/npfl-keywords';

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
    const contentText = (item.title + ' ' + item.snippet).toLowerCase();
    const fullText = (item.title + ' ' + item.snippet + ' ' + (item.source_name || '')).toLowerCase();

    if (categorySlug === 'npfl') {
      return isNpflStory(item.title, item.snippet);
    }

    if (categorySlug === 'transfers') {
      return (
        fullText.includes('transfer') ||
        fullText.includes('sign') ||
        fullText.includes('deal') ||
        fullText.includes('bid') ||
        fullText.includes('clause') ||
        fullText.includes('contract') ||
        fullText.includes('fee') ||
        fullText.includes('loan') ||
        fullText.includes('negotiation') ||
        fullText.includes('agree') ||
        fullText.includes('join') ||
        fullText.includes('exit') ||
        fullText.includes('swap') ||
        fullText.includes('move') ||
        fullText.includes('agent')
      );
    }

    if (categorySlug === 'world-football') {
      return (
        !contentText.includes('npfl') ||
        fullText.includes('premier league') ||
        fullText.includes('epl') ||
        fullText.includes('la liga') ||
        fullText.includes('champions league') ||
        fullText.includes('real madrid') ||
        fullText.includes('barcelona') ||
        fullText.includes('bayern') ||
        fullText.includes('psg') ||
        fullText.includes('arsenal') ||
        fullText.includes('chelsea') ||
        fullText.includes('liverpool')
      );
    }

    return true;
  });

  const finalRssList = filteredRssItems;

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

  const npflDefaults = [
    {
      id: 'npfl-1',
      title: 'Enyimba FC 2-1 Kano Pillars: Aba Giants Win Thrilling NPFL Classic',
      slug: 'enyimba-thrilling-victory-npfl-derby',
      excerpt: 'Enyimba FC delivered a dominant performance in Aba to secure maximum points in the Nigeria Premier Football League derby.',
      cover_image_url: '/assest/user_enyimba_news_hero.jpg',
      sports_categories: { name: 'NPFL League' },
      published_at: new Date().toISOString(),
    },
    {
      id: 'npfl-2',
      title: 'Rangers International Maintain Top Spot With Dominant Home Win',
      slug: 'rangers-international-top-spot-npfl',
      excerpt: 'The Flying Antelopes showcased tactical supremacy in Enugu to extend their unbeaten streak at the top of the NPFL standings.',
      cover_image_url: '/assest/user_npfl_blue_player.jpg',
      sports_categories: { name: 'NPFL League' },
      published_at: new Date().toISOString(),
    },
    {
      id: 'npfl-3',
      title: '1XCup 2026: Four Games Hold Today As Battle For Group Stage Spots Intensifies',
      slug: '1xcup-2026-group-stage-battle',
      excerpt: 'Grassroots Nigerian teams battle for lucrative group stage qualification in Lagos and Ogun State venues.',
      cover_image_url: '/assest/user_super_eagles_manager.jpg',
      sports_categories: { name: 'NPFL League' },
      published_at: new Date().toISOString(),
    },
  ];

  const transferDefaults = [
    {
      id: 'tr-1',
      title: 'Transfers: What The Clubs Need To Do This Deadline Window',
      slug: 'transfers-what-clubs-need-to-do',
      excerpt: 'Comprehensive club-by-club transfer state of play, contract negotiations, and scouting priorities ahead of deadline day.',
      cover_image_url: '/assest/user_transfers_hero_graphic.jpg',
      sports_categories: { name: 'Transfer News' },
      published_at: new Date().toISOString(),
    },
    {
      id: 'tr-2',
      title: 'Super Eagles Star Signs Multi-Year Contract Extension With European Club',
      slug: 'super-eagles-star-signs-extension',
      excerpt: 'Contractual agreement finalized following stellar international performance during AFCON qualifiers.',
      cover_image_url: '/assest/user_super_eagles_manager.jpg',
      sports_categories: { name: 'Transfer News' },
      published_at: new Date().toISOString(),
    },
    {
      id: 'tr-3',
      title: 'Rangers Bolster Wing Options With Signing Of Kim Min-Su',
      slug: 'rangers-bolster-wing-options-kim',
      excerpt: 'Official announcement confirmed for the South Korean winger arriving on an initial multi-year deal.',
      cover_image_url: '/assest/user_home_hero_4th_slide.jpg',
      sports_categories: { name: 'Transfer News' },
      published_at: new Date().toISOString(),
    },
  ];

  const worldDefaults = [
    {
      id: 'wf-1',
      title: 'Harry Kane & Musiala Masterclass Powers Bayern Munich Victory',
      slug: 'fc-bayern-munich-harry-kane-musiala-victory',
      excerpt: 'Exclusive tactical breakdown of FC Bayern Munich\'s dominant performance in the UEFA Champions League marquee fixture.',
      cover_image_url: '/assest/user_kane_musiala_bayern.jpg',
      sports_categories: { name: 'World Football' },
      published_at: new Date().toISOString(),
    },
    {
      id: 'wf-2',
      title: 'Mourinho Hails Mbappe After Strikers Performance For Real Madrid',
      slug: 'mourinho-hails-mbappe-real-madrid',
      excerpt: 'Post-match tactical analysis highlighting Kylian Mbappes clinical finishing in La Liga action.',
      cover_image_url: '/assest/user_home_hero_4th_slide.jpg',
      sports_categories: { name: 'World Football' },
      published_at: new Date().toISOString(),
    },
  ];

  const categoryDefaults = categorySlug === 'npfl' ? npflDefaults : categorySlug === 'transfers' ? transferDefaults : worldDefaults;

  const articlesToRender = categoryRssArticles.length > 0 ? categoryRssArticles : categoryDefaults;

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

      {/* Rich Dynamic Visual Hero Header Banner for Category Pages */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl min-h-[280px] sm:min-h-[340px] flex items-center bg-slate-950">
        <Image
          src={leadArticle?.cover_image_url || heroBgImage}
          alt={`${humanizedTitle} Hero Banner`}
          fill
          className="object-cover object-[center_20%] transition-transform duration-700 hover:scale-105"
          style={{ filter: 'contrast(1.06) brightness(1.02) saturate(1.05)', imageRendering: 'crisp-edges' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
        
        <div className="relative z-10 p-6 sm:p-10 space-y-3 max-w-2xl text-white">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D9541E] text-white font-extrabold text-[10px] uppercase tracking-widest shadow-md">
            <Trophy className="w-3.5 h-3.5 text-white" />
            <span>LIVE {humanizedTitle.toUpperCase()} HEADLINE WIRE</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight uppercase text-white drop-shadow-md">
            {leadArticle?.title || humanizedTitle}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-medium">
            {leadArticle?.excerpt || `Comprehensive coverage, match statistics, player transfers, and exclusive commentary for ${humanizedTitle}.`}
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
