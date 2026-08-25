import { RssFeedSource, AggregatedNewsItem, INITIAL_FEED_SOURCES, FALLBACK_AGGREGATED_NEWS } from '@/lib/types/rss';
import { createClient } from '@/lib/supabase/server';

export { INITIAL_FEED_SOURCES, FALLBACK_AGGREGATED_NEWS };

export async function getAggregatedNews(): Promise<AggregatedNewsItem[]> {
  try {
    const supabase = await createClient();
    const { data: dbItems } = await (supabase.from('aggregated_news' as any) as any)
      .select('*')
      .order('published_at', { ascending: false });

    if (dbItems && dbItems.length > 0) {
      return dbItems.filter((item: AggregatedNewsItem) => Boolean(item.thumbnail_url));
    }
  } catch (err) {
    console.error('Supabase query fallback for aggregated_news:', err);
  }

  return FALLBACK_AGGREGATED_NEWS.filter((item) => Boolean(item.thumbnail_url));
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
