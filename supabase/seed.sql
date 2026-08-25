-- Seed data for local testing & preview environment (Strict Postgres RFC 4122 Valid UUIDs)

-- 1. Sports Categories
INSERT INTO sports_categories (id, name, slug, parent_id) VALUES
    ('11111111-1111-1111-1111-111111111111', 'World Football', 'world-football', NULL),
    ('22222222-2222-2222-2222-222222222222', 'NPFL', 'npfl', '11111111-1111-1111-1111-111111111111'),
    ('33333333-3333-3333-3333-333333333333', 'EPL', 'epl', '11111111-1111-1111-1111-111111111111'),
    ('44444444-4444-4444-4444-444444444444', 'Transfers', 'transfers', NULL),
    ('55555555-5555-5555-5555-555555555555', 'Basketball', 'basketball', NULL)
ON CONFLICT (id) DO NOTHING;

-- 2. Media Genres
INSERT INTO media_genres (id, name, slug) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Documentaries', 'documentaries'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Films', 'films'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Comedy Shows', 'comedy'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Talk Shows', 'talk-shows'),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Drama Series', 'drama-series'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Music Shows', 'music-shows'),
    ('77777777-7777-7777-7777-777777777777', 'Kids Shows', 'kids-shows')
ON CONFLICT (id) DO NOTHING;

-- 3. Leagues
INSERT INTO leagues (id, name, country) VALUES
    ('10000000-0000-0000-0000-000000000001', 'Nigeria Premier Football League (NPFL)', 'Nigeria'),
    ('10000000-0000-0000-0000-000000000002', 'English Premier League (EPL)', 'England'),
    ('10000000-0000-0000-0000-000000000003', 'La Liga', 'Spain')
ON CONFLICT (id) DO NOTHING;

-- 4. Teams
INSERT INTO teams (id, name, logo_url, league_id) VALUES
    ('20000000-0000-0000-0000-000000000001', 'Enyimba FC', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=200&auto=format&fit=crop', '10000000-0000-0000-0000-000000000001'),
    ('20000000-0000-0000-0000-000000000002', 'Kano Pillars', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=200&auto=format&fit=crop', '10000000-0000-0000-0000-000000000001'),
    ('20000000-0000-0000-0000-000000000003', 'Arsenal FC', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=200&auto=format&fit=crop', '10000000-0000-0000-0000-000000000002'),
    ('20000000-0000-0000-0000-000000000004', 'Chelsea FC', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=200&auto=format&fit=crop', '10000000-0000-0000-0000-000000000002'),
    ('20000000-0000-0000-0000-000000000005', 'Real Madrid', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=200&auto=format&fit=crop', '10000000-0000-0000-0000-000000000003')
ON CONFLICT (id) DO NOTHING;

-- 5. Fixtures
INSERT INTO fixtures (id, home_team_id, away_team_id, league_id, kickoff_at, home_score, away_score, status, external_ref_id) VALUES
    ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', NOW() - INTERVAL '2 hours', 2, 1, 'finished', 'ext_npfl_001'),
    ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000002', NOW() + INTERVAL '1 hour', NULL, NULL, 'scheduled', 'ext_epl_001'),
    ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', NOW() + INTERVAL '24 hours', NULL, NULL, 'scheduled', 'ext_ucl_001')
ON CONFLICT (id) DO NOTHING;

-- 6. Articles
INSERT INTO articles (id, title, slug, body, excerpt, cover_image_url, category_id, status, published_at) VALUES
    ('40000000-0000-0000-0000-000000000001', 'Enyimba Secure Thrilling Victory Against Kano Pillars in NPFL Derby', 'enyimba-thrilling-victory-npfl-derby', 'Enyimba FC delivered a masterclass performance in Aba to secure a 2-1 victory over rivals Kano Pillars in a gripping NPFL clash on Sunday afternoon.', 'Enyimba FC delivered a masterclass performance in Aba to secure a 2-1 victory over rivals Kano Pillars.', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop', '22222222-2222-2222-2222-222222222222', 'published', NOW() - INTERVAL '1 day'),
    ('40000000-0000-0000-0000-000000000002', 'Premier League Title Race Heats Up Ahead of London Derby', 'premier-league-title-race-heats-up', 'The Premier League title race hits high gear this weekend as London rivals prepare for a high-stakes showdown with vital points on the line.', 'The Premier League title race hits high gear this weekend as London rivals prepare for a high-stakes showdown.', 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&auto=format&fit=crop', '33333333-3333-3333-3333-333333333333', 'published', NOW() - INTERVAL '2 days'),
    ('40000000-0000-0000-0000-000000000003', 'Super Eagles Star Signs Multi-Year Extension Deal', 'super-eagles-star-signs-multi-year-extension', 'In a major transfer update, the Nigerian international winger has officially signed a multi-year contract extension following intense summer speculation.', 'In a major transfer update, the Nigerian international winger has officially signed a contract extension.', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop', '44444444-4444-4444-4444-444444444444', 'published', NOW() - INTERVAL '3 days')
ON CONFLICT (id) DO NOTHING;

-- 7. Media Items (On-Demand Catalog + Series Episodes + Live Content)
INSERT INTO media_items (id, title, slug, synopsis, genre_id, media_type, video_url, thumbnail_url, duration_seconds, is_kid_safe, is_live, scheduled_start_at, live_status, is_featured, season_number, episode_number, parent_series_id, status, published_at) VALUES
    -- Hero Featured Spotlight
    ('50000000-0000-0000-0000-000000000001', 'Giants of Africa: The Story of Nigerian Football', 'giants-of-africa-nigerian-football', 'An inspiring documentary tracing the evolution of Nigerian football from grassroot academies to the world stage.', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'documentary', 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop', 3240, false, false, NULL, NULL, true, NULL, NULL, NULL, 'published', NOW() - INTERVAL '5 days'),
    ('50000000-0000-0000-0000-000000000002', 'Lagos Night Lights: Special Comedy Edition', 'lagos-night-lights-comedy', 'A hilarious stand-up comedy special spotlighting top African comedic talents live from Lagos.', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'comedy', 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop', 2700, false, false, NULL, NULL, false, NULL, NULL, NULL, 'published', NOW() - INTERVAL '4 days'),
    ('50000000-0000-0000-0000-000000000003', 'Little Champions: Junior Sports Academy', 'little-champions-junior-sports-academy', 'An uplifting animated series empowering kids to embrace sportsmanship, teamwork, and healthy outdoor activities.', '77777777-7777-7777-7777-777777777777', 'kids_show', 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1200&auto=format&fit=crop', 1200, true, false, NULL, NULL, false, NULL, NULL, NULL, 'published', NOW() - INTERVAL '2 days'),
    ('50000000-0000-0000-0000-000000000004', 'Behind The Mic: The Ultimate Sports Talk', 'behind-the-mic-sports-talk', 'In-depth interviews with legendary coaches and players analyzing tactics and backstage locker room drama.', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'talk_show', 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&auto=format&fit=crop', 1800, false, false, NULL, NULL, false, NULL, NULL, NULL, 'published', NOW() - INTERVAL '1 day'),

    -- Drama Series Episodes
    ('50000000-0000-0000-0000-000000000010', 'The Golden Boot: Season 1 Episode 1 - The Trials', 'golden-boot-s1e1', 'Series Premiere: Young striker Kelvin travels from Enugu to Aba for his first professional trials.', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'drama_series', 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop', 2400, false, false, NULL, NULL, false, 1, 1, NULL, 'published', NOW() - INTERVAL '7 days'),
    ('50000000-0000-0000-0000-000000000011', 'The Golden Boot: Season 1 Episode 2 - Contract Signing', 'golden-boot-s1e2', 'Episode 2: Kelvin signs his first youth contract but faces intense rivalries inside the squad.', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'drama_series', 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop', 2520, false, false, NULL, NULL, false, 1, 2, '50000000-0000-0000-0000-000000000010', 'published', NOW() - INTERVAL '6 days'),

    -- Feature Films & Music Videos
    ('50000000-0000-0000-0000-000000000020', 'Lagos Beats: Official Music Video', 'lagos-beats-official-music-video', 'A cinematic 4K music video directed by Laku Media spotlighting Lagos urban culture.', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'music_video', 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop', 240, false, false, NULL, NULL, false, NULL, NULL, NULL, 'published', NOW() - INTERVAL '3 days'),
    ('50000000-0000-0000-0000-000000000021', 'City of Dreams: Feature Film', 'city-of-dreams-feature-film', 'A gripping Nollywood feature film exploring ambition, family loyalty, and music production.', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'film', 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&auto=format&fit=crop', 6300, false, false, NULL, NULL, false, NULL, NULL, NULL, 'published', NOW() - INTERVAL '8 days'),

    -- Live Content
    ('50000000-0000-0000-0000-000000000005', 'Lagos Afrobeat Concert Live Stream', 'lagos-afrobeat-concert-live', 'Exclusive live streaming coverage of the annual Afrobeat Music Concert featuring headlining superstars live from Eko Hotel.', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'concert', 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop', 7200, false, true, NOW() - INTERVAL '15 minutes', 'live_now', false, NULL, NULL, NULL, 'published', NOW()),
    ('50000000-0000-0000-0000-000000000006', 'National Sports Gala & Red Carpet 2026', 'national-sports-gala-2026', 'Upcoming live broadcast of the prestigious National Sports Industry Gala honoring outstanding athletes and coaches.', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'talk_show', 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop', 5400, false, true, NOW() + INTERVAL '3 hours', 'upcoming', false, NULL, NULL, NULL, 'published', NOW())
ON CONFLICT (id) DO NOTHING;

-- 8. Laku Media Production Services Portfolio (All 7 Service Types Represented)
INSERT INTO services (id, title, slug, description, cover_image_url, gallery, service_type, is_featured, status) VALUES
    ('60000000-0000-0000-0000-000000000001', 'Music Video Production', 'music-video-production', 'Full 4K/8K music video concept creation, set design, multi-angle camera direction, color grading, and visual effects editing.', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop', '["https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800"]'::jsonb, 'music_video_production', true, 'published'),
    ('60000000-0000-0000-0000-000000000002', 'Feature Film & Movie Editing', 'movie-editing', 'Professional post-production, theatrical sound design, color mastering, and editorial cutting for feature films and cinema projects.', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&auto=format&fit=crop', '["https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800"]'::jsonb, 'movie_editing', true, 'published'),
    ('60000000-0000-0000-0000-000000000003', 'Television Programme Broadcast Production', 'television-programme', 'End-to-end television studio show production, talk show recording, sports magazine programming, and multi-cam broadcast switching.', 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&auto=format&fit=crop', '["https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800"]'::jsonb, 'television_programme', true, 'published'),
    ('60000000-0000-0000-0000-000000000004', 'Professional Commercial Photography', 'photography', 'High-end studio photography, event red carpet portraits, corporate executive headshots, and editorial sports photography.', 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&auto=format&fit=crop', '["https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800"]'::jsonb, 'photography', true, 'published'),
    ('60000000-0000-0000-0000-000000000005', 'NPFL Super 8 Broadcast Production', 'npfl-super-8-broadcast', 'Outside Broadcast OB truck multi-cam setup for national league matches with VAR graphics integration.', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop', '["https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800"]'::jsonb, 'broadcast_production', true, 'published'),
    ('60000000-0000-0000-0000-000000000006', 'Lagos Tech & Media Summit Coverage', 'lagos-tech-media-summit-coverage', 'Corporate event coverage, live multi-stage audio streaming, and high-impact executive recap video reels.', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop', '["https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800"]'::jsonb, 'corporate_event_coverage', true, 'published'),
    ('60000000-0000-0000-0000-000000000007', 'Afro-Fusion Arena Concert Filming', 'afro-fusion-arena-concert-filming', 'Full stadium lighting, 4K camera rig filming, live stream encoding, and concert film editing.', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&auto=format&fit=crop', '["https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800"]'::jsonb, 'concert_coverage', true, 'published')
ON CONFLICT (id) DO NOTHING;
