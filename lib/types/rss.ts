export type FeedType = 'news' | 'youtube_channel';
export type AggregatedContentType = 'article' | 'video';

export interface RssFeedSource {
  id: string;
  name: string;
  feed_url: string;
  feed_type: FeedType;
  is_active: boolean;
  last_fetched_at?: string | null;
}

export interface AggregatedNewsItem {
  id: string;
  content_type: AggregatedContentType;
  title: string;
  snippet: string;
  source_name: string;
  source_url: string;
  thumbnail_url: string;
  video_embed_id?: string | null;
  category_id?: string | null;
  published_at: string;
  fetched_at?: string;
  feed_source_id?: string | null;
}

export const INITIAL_FEED_SOURCES: RssFeedSource[] = [
  {
    id: 'src-1',
    name: 'BBC Sport Football',
    feed_url: 'http://feeds.bbci.co.uk/sport/football/rss.xml',
    feed_type: 'news',
    is_active: true,
    last_fetched_at: new Date().toISOString(),
  },
  {
    id: 'src-2',
    name: 'Complete Sports Nigeria',
    feed_url: 'https://www.completesports.com/feed/',
    feed_type: 'news',
    is_active: true,
    last_fetched_at: new Date().toISOString(),
  },
  {
    id: 'src-3',
    name: 'Sky Sports Football News',
    feed_url: 'https://www.skysports.com/rss/12040',
    feed_type: 'news',
    is_active: true,
    last_fetched_at: new Date().toISOString(),
  },
  {
    id: 'src-4',
    name: 'Sky Sports Football YouTube',
    feed_url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCNAf1k0yIjyGu3k9BwAg3lg',
    feed_type: 'youtube_channel',
    is_active: true,
    last_fetched_at: new Date().toISOString(),
  },
  {
    id: 'src-5',
    name: 'NPFL Official YouTube Highlights',
    feed_url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC7bW40J3qC5cK2Jk8Xp4v9Q',
    feed_type: 'youtube_channel',
    is_active: true,
    last_fetched_at: new Date().toISOString(),
  },
];

export const FALLBACK_AGGREGATED_NEWS: AggregatedNewsItem[] = [
  {
    id: 'agg-1',
    content_type: 'article',
    title: 'NPFL Derby: Enyimba Host Rangers International In High-Stakes Clash',
    snippet: 'Nine-time champions Enyimba FC prepare to battle rivals Rangers International at the Aba Township Stadium in a critical NPFL title race encounter...',
    source_name: 'Complete Sports Nigeria',
    source_url: 'https://www.completesports.com/enyimba-vs-rangers-npfl-derby-2026',
    thumbnail_url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=75',
    published_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    feed_source_id: 'src-2',
  },
  {
    id: 'agg-2',
    content_type: 'video',
    title: 'Match Highlights: Arsenal 3-1 Chelsea | Premier League Goals & Tactical Analysis',
    snippet: 'Watch official match highlights from the Emirates Stadium as Arsenal secure a decisive victory over Chelsea with brilliant team goals...',
    source_name: 'Sky Sports Football YouTube',
    source_url: 'https://www.youtube.com/watch?v=3Q06g9O0J-Y',
    thumbnail_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=75',
    video_embed_id: '3Q06g9O0J-Y',
    published_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    feed_source_id: 'src-4',
  },
  {
    id: 'agg-3',
    content_type: 'article',
    title: 'Victor Osimhen Scores Spectacular Over-Head Kick In European Champions Cup',
    snippet: 'Nigerian international striker Victor Osimhen grabbed headlines across Europe with an extraordinary acrobatic bicycle kick in the 88th minute...',
    source_name: 'BBC Sport Football',
    source_url: 'https://www.bbc.com/sport/football/victor-osimhen-goal-spectacular',
    thumbnail_url: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&auto=format&fit=crop&q=75',
    published_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    feed_source_id: 'src-1',
  },
  {
    id: 'agg-4',
    content_type: 'video',
    title: 'NPFL Goal of the Month Contenders | Top 5 Rockets from Nigerian Stadiums',
    snippet: 'Relive the top 5 long-range screamers scored across NPFL Matchday 22 fixtures in Lagos, Aba, Kano, and Enugu...',
    source_name: 'NPFL Official YouTube Highlights',
    source_url: 'https://www.youtube.com/watch?v=kXYiU_JCYtU',
    thumbnail_url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop&q=75',
    video_embed_id: 'kXYiU_JCYtU',
    published_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    feed_source_id: 'src-5',
  },
  {
    id: 'agg-5',
    content_type: 'article',
    title: 'Super Eagles Manager Announces 24-Man Squad For Upcoming AFCON Qualifiers',
    snippet: 'The Nigeria Football Federation has officially released the squad list featuring NPFL standout performers and Europe-based stars for next month’s qualifiers...',
    source_name: 'Complete Sports Nigeria',
    source_url: 'https://www.completesports.com/super-eagles-squad-afcon-qualifiers',
    thumbnail_url: 'https://images.unsplash.com/photo-1543351611-c823945f1007?w=800&auto=format&fit=crop&q=75',
    published_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    feed_source_id: 'src-2',
  },
  {
    id: 'agg-6',
    content_type: 'video',
    title: 'Tactical Breakdown: How Sporting Lagos Bypassed Kano Pillars Low Block',
    snippet: 'In-depth tactical video analysis of Sporting Lagos building out from the back against Kano Pillars pressing structure...',
    source_name: 'Sky Sports Football YouTube',
    source_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=75',
    video_embed_id: 'dQw4w9WgXcQ',
    published_at: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
    feed_source_id: 'src-4',
  },
];
