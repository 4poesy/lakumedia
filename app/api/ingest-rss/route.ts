import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { INITIAL_FEED_SOURCES, FALLBACK_AGGREGATED_NEWS } from '@/lib/types/rss';
import { parseFeedSource } from '@/lib/rss-parser';

export const dynamic = 'force-dynamic';

// In-memory cache of the last ingestion execution log for real-time diagnostic reporting
let LAST_INGESTION_STATUS: {
  timestamp: string;
  success: boolean;
  totalIngested: number;
  skippedNoImage: number;
  sourcesProcessed: number;
  sourceDetails: Array<{ name: string; type: string; count: number; error?: string }>;
  logs: string[];
} | null = null;

export async function GET(request: NextRequest) {
  // Security check: if CRON_SECRET is defined in env, enforce token match for external cron triggers
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');
  const querySecret = request.nextUrl.searchParams.get('secret');

  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && querySecret !== cronSecret) {
    return NextResponse.json({ error: 'Unauthorized cron request' }, { status: 401 });
  }

  let totalIngested = 0;
  let skippedNoImage = 0;
  const logs: string[] = [];
  const sourceDetails: Array<{ name: string; type: string; count: number; error?: string }> = [];
  const now = new Date().toISOString();

  try {
    const supabase = await createClient();

    // 1. Fetch active feed sources from Supabase (or initialize defaults)
    let sources: any[] = [];
    const { data: dbSources } = await (supabase.from('rss_feed_sources' as any) as any).select('*').eq('is_active', true);

    if (!dbSources || dbSources.length === 0) {
      logs.push('No active feed sources in database; seeding default RSS sources...');
      for (const src of INITIAL_FEED_SOURCES) {
        await (supabase.from('rss_feed_sources' as any) as any).upsert(src, { onConflict: 'id' });
      }
      sources = INITIAL_FEED_SOURCES;
    } else {
      sources = dbSources;
    }

    logs.push(`Starting automated RSS ingestion for ${sources.length} active feed sources at ${now}...`);

    // 2. Loop through active feed sources and parse live RSS XML / Atom / YouTube feeds
    for (const source of sources) {
      try {
        const items = await parseFeedSource(source);
        logs.push(`Source '${source.name}' (${source.feed_type}): Parsed ${items.length} items with valid imagery.`);
        sourceDetails.push({ name: source.name, type: source.feed_type, count: items.length });

        for (const item of items) {
          if (!item.thumbnail_url) {
            skippedNoImage++;
            continue;
          }

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
              fetched_at: now,
              feed_source_id: source.id,
            },
            { onConflict: 'source_url' }
          );

          if (!error) {
            totalIngested++;
          }
        }

        // Update last_fetched_at timestamp on feed source
        await (supabase.from('rss_feed_sources' as any) as any)
          .update({ last_fetched_at: now })
          .eq('id', source.id);
      } catch (srcErr: any) {
        const errStr = srcErr.message || String(srcErr);
        logs.push(`Error parsing feed source '${source.name}': ${errStr}`);
        sourceDetails.push({ name: source.name, type: source.feed_type, count: 0, error: errStr });
      }
    }

    // 3. Fallback check: If database is empty, seed curated sports news items
    if (totalIngested === 0) {
      logs.push('No live RSS items returned from network; seeding initial curated sports headlines...');
      for (const fallbackItem of FALLBACK_AGGREGATED_NEWS) {
        await (supabase.from('aggregated_news' as any) as any).upsert(
          {
            id: fallbackItem.id,
            content_type: fallbackItem.content_type,
            title: fallbackItem.title,
            snippet: fallbackItem.snippet,
            source_name: fallbackItem.source_name,
            source_url: fallbackItem.source_url,
            thumbnail_url: fallbackItem.thumbnail_url,
            video_embed_id: fallbackItem.video_embed_id || null,
            published_at: fallbackItem.published_at,
            fetched_at: now,
            feed_source_id: fallbackItem.feed_source_id || null,
          },
          { onConflict: 'source_url' }
        );
        totalIngested++;
      }
    }

    LAST_INGESTION_STATUS = {
      timestamp: now,
      success: true,
      totalIngested,
      skippedNoImage,
      sourcesProcessed: sources.length,
      sourceDetails,
      logs,
    };

    return NextResponse.json({
      success: true,
      timestamp: now,
      message: `RSS Ingestion completed successfully! Processed ${sources.length} sources and ingested/updated ${totalIngested} items.`,
      totalIngested,
      skippedNoImage,
      sourcesProcessed: sources.length,
      sourceDetails,
      logs,
      lastRunStatus: LAST_INGESTION_STATUS,
    });
  } catch (error: any) {
    console.error('RSS Ingestion Fatal Error:', error);

    LAST_INGESTION_STATUS = {
      timestamp: now,
      success: false,
      totalIngested: 0,
      skippedNoImage: 0,
      sourcesProcessed: 0,
      sourceDetails,
      logs: [...logs, `Fatal Error: ${error.message || error}`],
    };

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'RSS ingestion failed',
        timestamp: now,
        logs,
        lastRunStatus: LAST_INGESTION_STATUS,
      },
      { status: 200 }
    );
  }
}
