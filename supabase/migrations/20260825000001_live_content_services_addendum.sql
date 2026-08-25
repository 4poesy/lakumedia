-- Phase 1 Addendum: Live Content & Services/Portfolio Extension Migration

-- 1. Create New Enums
CREATE TYPE live_status AS ENUM ('upcoming', 'live_now', 'ended');
CREATE TYPE service_type AS ENUM ('broadcast_production', 'corporate_event_coverage', 'concert_coverage', 'music_video_production');

-- 2. Extend media_type Enum
ALTER TYPE media_type ADD VALUE IF NOT EXISTS 'music_video';
ALTER TYPE media_type ADD VALUE IF NOT EXISTS 'concert';

-- 3. Extend media_items Table
ALTER TABLE media_items 
ADD COLUMN is_live BOOLEAN DEFAULT FALSE NOT NULL,
ADD COLUMN scheduled_start_at TIMESTAMPTZ,
ADD COLUMN live_status live_status;

-- 4. Create services Table (Portfolio / Production Showcase)
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    cover_image_url TEXT,
    gallery JSONB DEFAULT '[]'::jsonb NOT NULL,
    service_type service_type NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE NOT NULL,
    status article_status DEFAULT 'draft' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Helper Trigger for services updated_at
CREATE TRIGGER update_services_updated_at 
BEFORE UPDATE ON services 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. Row-Level Security (RLS) for services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public services are viewable by everyone" 
ON services FOR SELECT 
USING (status = 'published' OR public.is_editor_or_admin());

CREATE POLICY "Editors/Admins can modify services" 
ON services FOR ALL 
USING (public.is_editor_or_admin());
