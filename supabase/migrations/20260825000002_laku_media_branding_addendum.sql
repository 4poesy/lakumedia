-- Addendum: Laku Media Branding, Services & About Page Migration

-- Extend service_type enum to match Laku Media offerings exactly
ALTER TYPE service_type ADD VALUE IF NOT EXISTS 'movie_editing';
ALTER TYPE service_type ADD VALUE IF NOT EXISTS 'television_programme';
ALTER TYPE service_type ADD VALUE IF NOT EXISTS 'photography';
