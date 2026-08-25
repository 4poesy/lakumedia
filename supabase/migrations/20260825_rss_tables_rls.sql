-- Supabase RLS SQL Migration script for Lakumedia RSS Tables
-- Enables Row Level Security (RLS) and public read / admin write policies

-- 1. Create rss_feed_sources table if not exists
CREATE TABLE IF NOT EXISTS public.rss_feed_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    feed_url TEXT NOT NULL UNIQUE,
    feed_type TEXT NOT NULL DEFAULT 'news',
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_fetched_at TIMESTAMPTZ
);

-- 2. Create aggregated_news table if not exists
CREATE TABLE IF NOT EXISTS public.aggregated_news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type TEXT NOT NULL DEFAULT 'article',
    title TEXT NOT NULL,
    snippet TEXT NOT NULL,
    source_name TEXT NOT NULL,
    source_url TEXT NOT NULL UNIQUE,
    thumbnail_url TEXT NOT NULL,
    video_embed_id TEXT,
    category_id UUID REFERENCES public.sports_categories(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    feed_source_id UUID REFERENCES public.rss_feed_sources(id) ON DELETE SET NULL
);

-- 3. Enable RLS
ALTER TABLE public.rss_feed_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aggregated_news ENABLE ROW LEVEL SECURITY;

-- 4. Create Public Read Policies
DROP POLICY IF EXISTS "Public Read RSS Feed Sources" ON public.rss_feed_sources;
CREATE POLICY "Public Read RSS Feed Sources" ON public.rss_feed_sources
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Aggregated News" ON public.aggregated_news;
CREATE POLICY "Public Read Aggregated News" ON public.aggregated_news
    FOR SELECT USING (true);

-- 5. Create Service Role / Authenticated Writes
DROP POLICY IF EXISTS "Service Write RSS Feed Sources" ON public.rss_feed_sources;
CREATE POLICY "Service Write RSS Feed Sources" ON public.rss_feed_sources
    FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Service Write Aggregated News" ON public.aggregated_news;
CREATE POLICY "Service Write Aggregated News" ON public.aggregated_news
    FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
