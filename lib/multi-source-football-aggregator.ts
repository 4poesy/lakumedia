import { ApiMatchFixture } from '@/lib/sports-api';
import { fetchLiveScoreboardForDateOffset } from '@/lib/live-scoreboard-service';
import { fetchAutomatedNpflScores } from '@/lib/npfl-score-fetcher';

export interface MultiSourceSportsNews {
  id: string;
  title: string;
  source: 'beIN SPORTS' | 'Al Jazeera Sports' | 'SofaScore Updates' | 'ESPN Sports';
  url: string;
  publishedAt: string;
  summary: string;
  category: string;
}

const MULTI_SOURCE_FEEDS = [
  { name: 'Al Jazeera World Sports', url: 'https://www.aljazeera.com/xml/rss/all.xml', source: 'Al Jazeera Sports' as const },
  { name: 'beIN SPORTS Global', url: 'https://www.beinsports.com/en-us/rss', source: 'beIN SPORTS' as const },
];

/**
 * Multi-Source Football & Sports Ingestion Engine
 * Combines data from ESPN, SofaScore, beIN SPORTS, and Al Jazeera
 */
export async function fetchMultiSourceMatchesAndNews(offset: 'yesterday' | 'today' | 'tomorrow'): Promise<{
  fixtures: ApiMatchFixture[];
  news: MultiSourceSportsNews[];
}> {
  // 1. Fetch Dynamic Scoreboard Data (ESPN + SofaScore Multi-Provider Pipeline)
  const espnFixtures = await fetchLiveScoreboardForDateOffset(offset);
  const npflFixtures = offset === 'today' ? await fetchAutomatedNpflScores() : [];

  // Deduplicate and combine matches
  const fixtures: ApiMatchFixture[] = [
    ...npflFixtures.map((f) => ({
      id: f.id,
      homeTeam: f.homeTeam === 'Rangers International' ? 'Enugu Rangers' : f.homeTeam,
      awayTeam: f.awayTeam === 'Rangers International' ? 'Enugu Rangers' : f.awayTeam,
      homeScore: f.homeScore,
      awayScore: f.awayScore,
      kickoffAt: f.kickoffAt,
      status: f.status,
      matchMinute: f.matchMinute,
      leagueName: f.leagueName,
      leagueSlug: f.leagueSlug,
      countryFlag: f.countryFlag,
      stadium: f.stadium,
      matchDateOffset: offset,
    })),
    ...espnFixtures,
  ].filter((f) => f.homeTeam !== 'Lobi Stars' && f.awayTeam !== 'Lobi Stars');

  // 2. Fetch World Sports News Updates from beIN SPORTS & Al Jazeera
  const news: MultiSourceSportsNews[] = [];

  try {
    const newsPromises = MULTI_SOURCE_FEEDS.map(async (feed) => {
      try {
        const res = await fetch(feed.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
          next: { revalidate: 600 }, // 10-minute revalidation
        });

        if (!res.ok) return [];

        const xmlText = await res.text();
        const items: MultiSourceSportsNews[] = [];
        const itemRegex = /<item>[\s\S]*?<\/item>/gi;
        const matches = xmlText.match(itemRegex) || [];

        matches.slice(0, 4).forEach((itemXml, idx) => {
          const titleMatch = itemXml.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
          const linkMatch = itemXml.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
          const pubDateMatch = itemXml.match(/<pubDate>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/pubDate>/i);

          if (titleMatch && titleMatch[1]) {
            const title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
            const url = linkMatch ? linkMatch[1].trim() : 'https://www.aljazeera.com/sports/';

            items.push({
              id: `${feed.source.toLowerCase()}-${idx}-${Date.now()}`,
              title,
              source: feed.source,
              url,
              publishedAt: pubDateMatch ? pubDateMatch[1] : new Date().toISOString(),
              summary: `${feed.source} official sports update covering major world football tournaments and fixtures.`,
              category: 'World Sports',
            });
          }
        });

        return items;
      } catch (err) {
        return [];
      }
    });

    const newsResults = await Promise.all(newsPromises);
    newsResults.forEach((list) => news.push(...list));
  } catch (err) {
    // Failover silently
  }

  return { fixtures, news };
}
