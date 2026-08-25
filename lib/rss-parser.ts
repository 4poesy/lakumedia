import { AggregatedNewsItem, RssFeedSource } from './types/rss';

/**
 * Robust XML regex parser for RSS 2.0, Atom 1.0, and YouTube Channel RSS Feeds
 * Features strict 6-second timeout per feed to prevent hanging server execution
 */
export async function parseFeedSource(source: RssFeedSource): Promise<AggregatedNewsItem[]> {
  const items: AggregatedNewsItem[] = [];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6-second max timeout

    const res = await fetch(source.feed_url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) LakumediaBot/1.0',
      },
      signal: controller.signal,
      next: { revalidate: 1200 }, // 20-minute cache
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Failed to fetch feed ${source.name} (${source.feed_url}): ${res.statusText}`);
      return items;
    }

    const xml = await res.text();

    if (source.feed_type === 'youtube_channel' || xml.includes('<yt:videoId>') || xml.includes('<entry>')) {
      // Parse YouTube Channel / Atom XML Feed
      const entryRegex = /<entry[\s\S]*?<\/entry>/gi;
      const entries = xml.match(entryRegex) || [];

      for (const entry of entries) {
        const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/i);
        const titleMatch = entry.match(/<title>(.*?)<\/title>/i);
        const linkMatch = entry.match(/<link[^>]+href=["'](.*?)["']/i);
        const publishedMatch = entry.match(/<published>(.*?)<\/published>/i);
        const thumbMatch = entry.match(/<media:thumbnail[^>]+url=["'](.*?)["']/i);
        const descMatch = entry.match(/<media:description>(.*?)<\/media:description>/i);

        const videoId = videoIdMatch ? videoIdMatch[1].trim() : null;
        const title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : '';
        const sourceUrl = linkMatch ? linkMatch[1].trim() : videoId ? `https://www.youtube.com/watch?v=${videoId}` : '';
        const thumbnailUrl = thumbMatch
          ? thumbMatch[1].trim()
          : videoId
          ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
          : null;
        const rawDesc = descMatch ? descMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').replace(/<[^>]+>/g, '').trim() : '';
        const snippet = rawDesc.slice(0, 180) || `Official video highlight from ${source.name}.`;

        if (title && sourceUrl && thumbnailUrl && videoId) {
          items.push({
            id: `yt-${videoId}`,
            content_type: 'video',
            title,
            snippet,
            source_name: source.name,
            source_url: sourceUrl,
            thumbnail_url: thumbnailUrl,
            video_embed_id: videoId,
            published_at: publishedMatch ? publishedMatch[1].trim() : new Date().toISOString(),
            feed_source_id: source.id,
          });
        }
      }
    } else {
      // Parse Standard RSS 2.0 Feed
      const itemRegex = /<item[\s\S]*?<\/item>/gi;
      const rssItems = xml.match(itemRegex) || [];

      for (const itemXml of rssItems) {
        const titleMatch = itemXml.match(/<title>(.*?)<\/title>/i);
        const linkMatch = itemXml.match(/<link>(.*?)<\/link>/i);
        const descMatch = itemXml.match(/<description>(.*?)<\/description>/i);
        const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/i) || itemXml.match(/<dc:date>(.*?)<\/dc:date>/i);
        const mediaThumbMatch = itemXml.match(/<media:content[^>]+url=["'](.*?)["']/i) || itemXml.match(/<enclosure[^>]+url=["'](.*?)["']/i) || itemXml.match(/<media:thumbnail[^>]+url=["']<\/media:thumbnail>/i) || itemXml.match(/<media:thumbnail[^>]+url=["'](.*?)["']/i);
        const imgTagMatch = itemXml.match(/<img[^>]+src=["'](.*?)["']/i);

        const title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : '';
        const sourceUrl = linkMatch ? linkMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : '';
        const rawDesc = descMatch ? descMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').replace(/<[^>]+>/g, '').trim() : '';
        const snippet = rawDesc.slice(0, 180) || `Read full sports story on ${source.name}.`;
        
        let thumbnailUrl = mediaThumbMatch ? mediaThumbMatch[1].trim() : imgTagMatch ? imgTagMatch[1].trim() : null;

        // Strict Image Enforcement Requirement: Items without images are discarded
        if (title && sourceUrl && thumbnailUrl && thumbnailUrl.startsWith('http')) {
          items.push({
            id: `rss-${Buffer.from(sourceUrl).toString('base64').slice(0, 16)}`,
            content_type: 'article',
            title,
            snippet,
            source_name: source.name,
            source_url: sourceUrl,
            thumbnail_url: thumbnailUrl,
            published_at: pubDateMatch ? new Date(pubDateMatch[1].trim()).toISOString() : new Date().toISOString(),
            feed_source_id: source.id,
          });
        }
      }
    }
  } catch (err) {
    console.error(`Error parsing RSS feed source ${source.name}:`, err);
  }

  return items;
}
