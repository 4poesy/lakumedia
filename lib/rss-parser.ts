import { AggregatedNewsItem, RssFeedSource } from './types/rss';

function cleanHtmlEntities(text: string): string {
  if (!text) return '';
  return text
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function enhanceThumbnailResolution(url: string | null, fallbackIndex: number): string {
  const categoryFallbackImages = [
    '/assest/user_enyimba_news_hero.jpg',
    '/assest/user_npfl_blue_player.jpg',
    '/assest/user_kane_musiala_bayern.jpg',
    '/assest/user_home_hero_4th_slide.jpg',
    '/assest/user_super_eagles_manager.jpg',
    '/assest/user_transfers_hero_graphic.jpg',
  ];

  if (!url || !url.startsWith('http')) {
    return categoryFallbackImages[fallbackIndex % categoryFallbackImages.length];
  }

  // BBC iChef URL Upgrade: Replace small sizes (/240/, /320/, /480/, /640/) with /1024/
  if (url.includes('ichef.bbci.co.uk')) {
    return url.replace(/\/(240|320|480|640|800)\//g, '/1024/');
  }

  // Sky Sports / Media URL Upgrade: Replace small thumbnails (/160x160/, /320x180/) with /1024x576/
  if (url.includes('skysports.com') || url.includes('eircom.net')) {
    return url.replace(/\/\d+x\d+\//g, '/1024x576/');
  }

  // Unsplash HD Upgrade
  if (url.includes('unsplash.com')) {
    if (url.includes('w=')) {
      return url.replace(/w=\d+/g, 'w=1920').replace(/q=\d+/g, 'q=95');
    }
    return `${url}&w=1920&q=95&auto=format&fit=crop`;
  }

  return url;
}

/**
 * Robust, fault-tolerant RSS & Atom parser
 * Supports: RSS 2.0, Atom 1.0, YouTube Channel Feeds, Media Enclosures, OpenGraph Image fallbacks
 */
export async function parseFeedSource(source: RssFeedSource): Promise<AggregatedNewsItem[]> {
  const items: AggregatedNewsItem[] = [];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second max timeout

    // Handle HTTP redirects & browser User-Agent
    const res = await fetch(source.feed_url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 LakuMediaBot/2.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
      signal: controller.signal,
      next: { revalidate: 1200 }, // 20-minute revalidation
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Feed source '${source.name}' returned status ${res.status}: ${res.statusText}`);
      return items;
    }

    const xml = await res.text();
    if (!xml || xml.length < 50) return items;

    // A. Parse YouTube Channel Feeds
    if (source.feed_type === 'youtube_channel' || xml.includes('<yt:videoId>') || xml.includes('youtube.com/xml/schemas')) {
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
        const title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').replace(/&amp;/g, '&').trim() : '';
        const sourceUrl = linkMatch ? linkMatch[1].trim() : videoId ? `https://www.youtube.com/watch?v=${videoId}` : '';
        const thumbnailUrl = thumbMatch
          ? thumbMatch[1].trim()
          : videoId
          ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
          : '/assest/user_npfl_hero_team_celebration.jpg';
        const rawDesc = descMatch ? descMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').replace(/<[^>]+>/g, '').trim() : '';
        const snippet = rawDesc.slice(0, 180) || `Watch official video highlight on ${source.name}.`;

        if (title && sourceUrl && videoId) {
          items.push({
            id: `yt-${videoId}`,
            content_type: 'video',
            title,
            snippet,
            source_name: source.name,
            source_url: sourceUrl,
            thumbnail_url: thumbnailUrl,
            video_embed_id: videoId,
            published_at: publishedMatch ? new Date(publishedMatch[1].trim()).toISOString() : new Date().toISOString(),
            feed_source_id: source.id,
          });
        }
      }
    } else {
      // B. Parse Standard RSS 2.0 / Atom News Feeds
      const itemRegex = /<item[\s\S]*?<\/item>/gi;
      const rssItems = xml.match(itemRegex) || [];

      const categoryFallbackImages = [
        '/assest/user_enyimba_news_hero.jpg',
        '/assest/user_npfl_blue_player.jpg',
        '/assest/user_kane_musiala_bayern.jpg',
        '/assest/user_home_hero_4th_slide.jpg',
        '/assest/user_super_eagles_manager.jpg',
        '/assest/user_transfers_hero_graphic.jpg',
      ];

      let itemIndex = 0;

      for (const itemXml of rssItems) {
        itemIndex++;
        const titleMatch = itemXml.match(/<title>(.*?)<\/title>/i);
        const linkMatch = itemXml.match(/<link>(.*?)<\/link>/i);
        const descMatch = itemXml.match(/<description>(.*?)<\/description>/i);
        const contentMatch = itemXml.match(/<content:encoded>(.*?)<\/content:encoded>/i);
        const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/i) || itemXml.match(/<dc:date>(.*?)<\/dc:date>/i);

        // Clean title & link
        const rawTitle = titleMatch ? titleMatch[1] : '';
        const title = cleanHtmlEntities(rawTitle);
        const sourceUrl = linkMatch ? linkMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : '';

        const fullText = (contentMatch ? contentMatch[1] : '') + ' ' + (descMatch ? descMatch[1] : '');
        const rawSnippet = descMatch ? descMatch[1] : '';
        const snippet = cleanHtmlEntities(rawSnippet).slice(0, 180) || `Read full sports story on ${source.name}.`;

        // Extract thumbnail from media:content, enclosure, media:thumbnail, or img tag
        const mediaMatch =
          itemXml.match(/<media:content[^>]+url=["'](.*?)["']/i) ||
          itemXml.match(/<enclosure[^>]+url=["'](.*?)["']/i) ||
          itemXml.match(/<media:thumbnail[^>]+url=["'](.*?)["']/i) ||
          fullText.match(/<img[^>]+src=["'](.*?)["']/i) ||
          fullText.match(/&lt;img[^&]+src=&quot;(.*?)&quot;/i);

        let rawThumbnail = mediaMatch ? mediaMatch[1].trim() : null;
        let thumbnailUrl = enhanceThumbnailResolution(rawThumbnail, itemIndex);

        if (title && sourceUrl) {
          items.push({
            id: `rss-${Buffer.from(sourceUrl).toString('base64').slice(0, 20)}`,
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
  } catch (err: any) {
    console.error(`Error parsing RSS feed source ${source.name}:`, err.message || err);
  }

  return items;
}
