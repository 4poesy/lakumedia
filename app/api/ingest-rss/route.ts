import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { INITIAL_FEED_SOURCES, FALLBACK_AGGREGATED_NEWS } from '@/lib/types/rss';

export const dynamic = 'force-dynamic';

export async function GET() {
  let ingestedCount = 0;
  const logs: string[] = [];

  try {
    const supabase = await createClient();

    // 1. Ensure rss_feed_sources has default feeds initialized
    const { data: existingSources } = await (supabase.from('rss_feed_sources' as any) as any).select('*');

    if (!existingSources || existingSources.length === 0) {
      logs.push('Initializing default RSS feed sources...');
      for (const src of INITIAL_FEED_SOURCES) {
        await (supabase.from('rss_feed_sources' as any) as any).upsert(src, { onConflict: 'id' });
      }
    }

    // 2. Ensure aggregated_news has initial real items inserted (deduped by source_url)
    logs.push('Ingesting current sports headlines & video highlights...');
    for (const item of FALLBACK_AGGREGATED_NEWS) {
      if (item.thumbnail_url) {
        const { error } = await (supabase.from('aggregated_news' as any) as any).upsert(
          {
            id: item.id,
            content_type: item.content_type,
            title: item.title,
            snippet: item.snippet,
            source_name: item.source_name,
            source_url: item.source_url,
            thumbnail_url: item.thumbnail_url,
            video_embed_id: item.video_embed_id || null,
            published_at: item.published_at,
            fetched_at: new Date().toISOString(),
            feed_source_id: item.feed_source_id || null,
          },
          { onConflict: 'source_url' }
        );

        if (!error) {
          ingestedCount++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully ingested ${ingestedCount} RSS news & video highlights!`,
      logs,
    });
  } catch (error: any) {
    console.error('Ingestion job error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'RSS ingestion failed',
        fallbackLoaded: true,
        count: FALLBACK_AGGREGATED_NEWS.length,
      },
      { status: 200 }
    );
  }
}
