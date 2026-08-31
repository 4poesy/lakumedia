import { RssFeedSource, AggregatedNewsItem, INITIAL_FEED_SOURCES } from '@/lib/types/rss';
import { createClient } from '@/lib/supabase/server';
import { parseFeedSource } from '@/lib/rss-parser';

export { INITIAL_FEED_SOURCES, type AggregatedNewsItem, type RssFeedSource };

export async function getAggregatedNews(): Promise<AggregatedNewsItem[]> {
  const liveItems: AggregatedNewsItem[] = [];

  // 1. Fetch live RSS items from active global feed sources (BBC Sport, Sky Sports, CompleteSports)
  for (const source of INITIAL_FEED_SOURCES.slice(0, 4)) {
    try {
      const parsed = await parseFeedSource(source);
      if (parsed && parsed.length > 0) {
        liveItems.push(...parsed);
      }
    } catch (e) {
      console.warn(`Live fetch warning for ${source.name}:`, e);
    }
  }

  if (liveItems.length > 0) {
    // Sort by date descending
    return liveItems.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  }

  // 2. Try Supabase query
  try {
    const supabase = await createClient();
    const { data: dbItems } = await (supabase.from('aggregated_news' as any) as any)
      .select('*')
      .order('published_at', { ascending: false })
      .limit(15);

    if (dbItems && dbItems.length > 0) {
      return dbItems;
    }
  } catch (err) {
    console.error('Supabase fallback query error:', err);
  }

  return [];
}

export async function getFeedSources(): Promise<RssFeedSource[]> {
  try {
    const supabase = await createClient();
    const { data: dbSources } = await (supabase.from('rss_feed_sources' as any) as any)
      .select('*')
      .order('name');
    if (dbSources && dbSources.length > 0) {
      return dbSources;
    }
  } catch (err) {
    console.error('Supabase query fallback for rss_feed_sources:', err);
  }

  return INITIAL_FEED_SOURCES;
}
