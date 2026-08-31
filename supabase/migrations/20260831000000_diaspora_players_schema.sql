-- Schema Migration: diaspora_players table for Super Eagles & Global Diaspora Watch
-- Provides structured data storage for Nigerian players playing abroad

CREATE TABLE IF NOT EXISTS public.diaspora_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  position TEXT NOT NULL,
  current_club TEXT NOT NULL,
  club_country TEXT NOT NULL,
  photo_url TEXT,
  region TEXT NOT NULL CHECK (region IN ('europe', 'middle_east', 'africa_npfl', 'other')),
  bio_summary TEXT,
  bio_source_url TEXT,
  market_value_estimate TEXT,
  market_value_source TEXT,
  market_value_as_of DATE,
  sports_data_player_id TEXT,
  wikipedia_slug TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing for high performance queries
CREATE INDEX IF NOT EXISTS idx_diaspora_players_region ON public.diaspora_players (region);
CREATE INDEX IF NOT EXISTS idx_diaspora_players_slug ON public.diaspora_players (slug);
CREATE INDEX IF NOT EXISTS idx_diaspora_players_current_club ON public.diaspora_players (current_club);

-- Enable Row Level Security (RLS)
ALTER TABLE public.diaspora_players ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public users can view diaspora players"
  ON public.diaspora_players
  FOR SELECT
  USING (true);

-- Authenticated Editor / Admin full management
CREATE POLICY "Admins and editors can manage diaspora players"
  ON public.diaspora_players
  FOR ALL
  USING (
    auth.role() = 'authenticated' AND (
      EXISTS (
        SELECT 1 FROM public.users
        WHERE public.users.id = auth.uid()
        AND public.users.role IN ('admin', 'editor')
      )
    )
  );

-- Seed initial verified Super Eagles stars with deterministic provider IDs
INSERT INTO public.diaspora_players (
  name,
  slug,
  position,
  current_club,
  club_country,
  sports_data_player_id,
  photo_url,
  region,
  bio_source_url,
  wikipedia_slug
) VALUES
(
  'Victor Osimhen',
  'victor-osimhen',
  'Centre-Forward',
  'Galatasaray SK',
  'Turkey',
  '253989',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/253989.png&w=500&h=500',
  'europe',
  'https://en.wikipedia.org/wiki/Victor_Osimhen',
  'Victor_Osimhen'
),
(
  'Ademola Lookman',
  'ademola-lookman',
  'Winger / Second Striker',
  'Atalanta BC',
  'Italy',
  '230198',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/230198.png&w=500&h=500',
  'europe',
  'https://en.wikipedia.org/wiki/Ademola_Lookman',
  'Ademola_Lookman'
),
(
  'Victor Boniface',
  'victor-boniface',
  'Centre-Forward',
  'Bayer 04 Leverkusen',
  'Germany',
  '299863',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/299863.png&w=500&h=500',
  'europe',
  'https://en.wikipedia.org/wiki/Victor_Boniface',
  'Victor_Boniface'
),
(
  'Alex Iwobi',
  'alex-iwobi',
  'Central Midfielder / Winger',
  'Fulham FC',
  'England',
  '226046',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/226046.png&w=500&h=500',
  'europe',
  'https://en.wikipedia.org/wiki/Alex_Iwobi',
  'Alex_Iwobi'
),
(
  'Samuel Chukwueze',
  'samuel-chukwueze',
  'Right Winger',
  'AC Milan',
  'Italy',
  '270381',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/270381.png&w=500&h=500',
  'europe',
  'https://en.wikipedia.org/wiki/Samuel_Chukwueze',
  'Samuel_Chukwueze'
),
(
  'Wilfred Ndidi',
  'wilfred-ndidi',
  'Defensive Midfielder',
  'Leicester City FC',
  'England',
  '214013',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/214013.png&w=500&h=500',
  'europe',
  'https://en.wikipedia.org/wiki/Wilfred_Ndidi',
  'Wilfred_Ndidi'
),
(
  'Calvin Bassey',
  'calvin-bassey',
  'Centre-Back / Left-Back',
  'Fulham FC',
  'England',
  '298453',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/298453.png&w=500&h=500',
  'europe',
  'https://en.wikipedia.org/wiki/Calvin_Bassey',
  'Calvin_Bassey'
),
(
  'Taiwo Awoniyi',
  'taiwo-awoniyi',
  'Centre-Forward',
  'Nottingham Forest',
  'England',
  '226154',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/226154.png&w=500&h=500',
  'europe',
  'https://en.wikipedia.org/wiki/Taiwo_Awoniyi',
  'Taiwo_Awoniyi'
),
(
  'Stanley Nwabali',
  'stanley-nwabali',
  'Goalkeeper',
  'Chippa United',
  'South Africa',
  '385610',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/385610.png&w=500&h=500',
  'africa_npfl',
  'https://en.wikipedia.org/wiki/Stanley_Nwabali',
  'Stanley_Nwabali'
),
(
  'Moses Simon',
  'moses-simon',
  'Left Winger',
  'FC Nantes',
  'France',
  '205469',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/205469.png&w=500&h=500',
  'europe',
  'https://en.wikipedia.org/wiki/Moses_Simon',
  'Moses_Simon'
),
(
  'Nathan Tella',
  'nathan-tella',
  'Right Midfielder / Winger',
  'Bayer 04 Leverkusen',
  'Germany',
  '266782',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/266782.png&w=500&h=500',
  'europe',
  'https://en.wikipedia.org/wiki/Nathan_Tella',
  'Nathan_Tella'
),
(
  'Frank Onyeka',
  'frank-onyeka',
  'Central Midfielder',
  'FC Augsburg',
  'Germany',
  '273415',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/273415.png&w=500&h=500',
  'europe',
  'https://en.wikipedia.org/wiki/Frank_Onyeka',
  'Frank_Onyeka'
),
(
  'Raphael Onyedika',
  'raphael-onyedika',
  'Defensive Midfielder',
  'Club Brugge KV',
  'Belgium',
  '303490',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/303490.png&w=500&h=500',
  'europe',
  'https://en.wikipedia.org/wiki/Raphael_Onyedika',
  'Raphael_Onyedika'
),
(
  'Bright Osayi-Samuel',
  'bright-osayi-samuel',
  'Right-Back / Wing-Back',
  'Fenerbahçe SK',
  'Turkey',
  '226707',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/226707.png&w=500&h=500',
  'europe',
  'https://en.wikipedia.org/wiki/Bright_Osayi-Samuel',
  'Bright_Osayi-Samuel'
),
(
  'William Troost-Ekong',
  'william-troost-ekong',
  'Centre-Back (Captain)',
  'Al-Kholood',
  'Saudi Arabia',
  '215886',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/215886.png&w=500&h=500',
  'middle_east',
  'https://en.wikipedia.org/wiki/William_Troost-Ekong',
  'William_Troost-Ekong'
),
(
  'Odion Ighalo',
  'odion-ighalo',
  'Centre-Forward',
  'Al-Wehda',
  'Saudi Arabia',
  '133177',
  'https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/133177.png&w=500&h=500',
  'middle_east',
  'https://en.wikipedia.org/wiki/Odion_Ighalo',
  'Odion_Ighalo'
)
ON CONFLICT (slug) DO UPDATE SET
  photo_url = EXCLUDED.photo_url,
  sports_data_player_id = EXCLUDED.sports_data_player_id,
  updated_at = NOW();
