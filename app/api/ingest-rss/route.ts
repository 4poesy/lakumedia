import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { INITIAL_FEED_SOURCES, FALLBACK_AGGREGATED_NEWS } from '@/lib/types/rss';
import { parseFeedSource } from '@/lib/rss-parser';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Optional security check: if CRON_SECRET is defined in env, enforce token match
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');
  const querySecret = request.nextUrl.searchParams.get('secret');

  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && querySecret !== cronSecret) {
    return NextResponse.json({ error: 'Unauthorized cron request' }, { status: 401 });
  }

  let totalIngested = 0;
  let skippedNoImage = 0;
  const logs: string[] = [];
  const now = new Date().toISOString();

  try {
    const supabase = await createClient();

    // 1. Fetch active feed sources from Supabase (or initialize defaults)
    let sources: any[] = [];
    const { data: dbSources } = await (supabase.from('rss_feed_sources' as any) as any).select('*').eq('is_active', true);

    if (!dbSources || dbSources.length === 0) {
      logs.push('Initializing default RSS feed sources...');
      for (const src of INITIAL_FEED_SOURCES) {
        await (supabase.from('rss_feed_sources' as any) as any).upsert(src, { onConflict: 'id' });
      }
      sources = INITIAL_FEED_SOURCES;
    } else {
      sources = dbSources;
    }

    logs.push(`Starting automatic feed ingestion for ${sources.length} active sources...`);

    // 2. Loop through active feed sources and parse live RSS feeds
    for (const source of sources) {
      try {
        const items = await parseFeedSource(source);
        logs.push(`Source '${source.name}': Parsed ${items.length} items with valid images.`);

        for (const item of items) {
          // Strict image enforcement: Never insert items without thumbnails
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
      } catch (srcErr) {
        console.error(`Error processing feed ${source.name}:`, srcErr);
      }
    }

    // 3. Fallback check: If no live items were fetched, ensure curated fallback items exist
    if (totalIngested === 0) {
      logs.push('No live items parsed; seeding initial curated sports headlines...');
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

    return NextResponse.json({
      success: true,
      timestamp: now,
      message: `Automatic ingestion complete! Ingested/updated ${totalIngested} items. (Skipped ${skippedNoImage} items missing images).`,
      totalIngested,
      skippedNoImage,
      logs,
    });
  } catch (error: any) {
    console.error('RSS Ingestion Job Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'RSS ingestion failed',
        fallbackCount: FALLBACK_AGGREGATED_NEWS.length,
      },
      { status: 200 }
    );
  }
}
