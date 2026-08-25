import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lakumedia.com';
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

  // Static routes
  const staticRoutes = [
    '',
    '/live-scores',
    '/npfl',
    '/epl',
    '/transfers',
    '/world-football',
    '/multimedia',
    '/multimedia/live',
    '/multimedia/production',
    '/multimedia/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'hourly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const articleRoutes = (articles || []).map((art: any) => ({
    url: `${baseUrl}/article/${art.slug}`,
    lastModified: art.updated_at || new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  const watchRoutes = (mediaItems || []).map((item: any) => ({
    url: `${baseUrl}/multimedia/watch/${item.slug}`,
    lastModified: item.updated_at || new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  const serviceRoutes = (services || []).map((s: any) => ({
    url: `${baseUrl}/multimedia/production/${s.slug}`,
    lastModified: s.updated_at || new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...watchRoutes, ...serviceRoutes];
}
