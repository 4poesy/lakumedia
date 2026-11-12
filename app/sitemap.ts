import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';
import { LEAGUE_META } from '@/lib/leagues-meta';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lakumediaconcept.com';
  const supabase = await createClient();

  // Query published articles
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at')
    .eq('status', 'published');

  // Query published media items
  const { data: mediaItems } = await supabase
    .from('media_items')
    .select('slug, updated_at')
    .eq('status', 'published');

  // Query published services
  const { data: services } = await supabase
    .from('services')
    .select('slug, updated_at')
    .eq('status', 'published');

  // Query teams
  const { data: teams } = await supabase
    .from('teams')
    .select('name');

  // Core static & category pillar routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date().toISOString(), changeFrequency: 'hourly', priority: 1.0 },
    { url: `${baseUrl}/live-scores`, lastModified: new Date().toISOString(), changeFrequency: 'hourly', priority: 0.95 },
    { url: `${baseUrl}/npfl`, lastModified: new Date().toISOString(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/epl`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/transfers`, lastModified: new Date().toISOString(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/world-football`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/multimedia`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/multimedia/live`, lastModified: new Date().toISOString(), changeFrequency: 'hourly', priority: 0.85 },
    { url: `${baseUrl}/multimedia/production`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/multimedia/services`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/multimedia/portfolio`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/multimedia/pricing`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/multimedia/about`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/multimedia/blog`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.75 },
    { url: `${baseUrl}/contact`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/advertise`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/developers`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/privacy`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.4 },
  ];

  // Programmatic League Hub Routes (30+ leagues worldwide)
  const leagueRoutes: MetadataRoute.Sitemap = Object.keys(LEAGUE_META).map((slug) => ({
    url: `${baseUrl}/leagues/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'hourly',
    priority: slug === 'npfl' || slug === 'epl' || slug === 'ucl' ? 0.9 : 0.8,
  }));

  // Programmatic Multimedia Genre Routes
  const genres = [
    'films',
    'documentaries',
    'comedy',
    'talk-shows',
    'drama-series',
    'music-shows',
    'kids-shows',
  ];
  const genreRoutes: MetadataRoute.Sitemap = genres.map((genre) => ({
    url: `${baseUrl}/multimedia/${genre}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.75,
  }));

  // Programmatic Team Hub Routes
  const fallbackTeamSlugs = [
    'enyimba-fc',
    'kano-pillars',
    'remo-stars',
    'enugu-rangers',
    'rivers-united',
    'shooting-stars',
    'bendel-insurance',
    'plateau-united',
    'arsenal-fc',
    'chelsea-fc',
    'fc-bayern-munich',
  ];

  const teamSlugsFromDb = (teams || [])
    .map((t: any) =>
      t.name
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
    )
    .filter(Boolean);

  const uniqueTeamSlugs = Array.from(new Set([...fallbackTeamSlugs, ...teamSlugsFromDb]));
  const teamRoutes: MetadataRoute.Sitemap = uniqueTeamSlugs.map((slug) => ({
    url: `${baseUrl}/teams/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.75,
  }));

  // Editorial Article Routes
  const articleRoutes: MetadataRoute.Sitemap = (articles || []).map((art: any) => ({
    url: `${baseUrl}/article/${art.slug}`,
    lastModified: art.updated_at || new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.75,
  }));

  // Streaming Watch Routes
  const watchRoutes: MetadataRoute.Sitemap = (mediaItems || []).map((item: any) => ({
    url: `${baseUrl}/multimedia/watch/${item.slug}`,
    lastModified: item.updated_at || new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  // Production Service Detail Routes
  const serviceRoutes: MetadataRoute.Sitemap = (services || []).map((s: any) => ({
    url: `${baseUrl}/multimedia/production/${s.slug}`,
    lastModified: s.updated_at || new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...leagueRoutes,
    ...genreRoutes,
    ...teamRoutes,
    ...articleRoutes,
    ...watchRoutes,
    ...serviceRoutes,
  ];
}
