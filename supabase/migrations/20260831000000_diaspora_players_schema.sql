-- Migration: 20260831000000_diaspora_players_schema.sql
-- Table: diaspora_players (Super Eagles & Global Diaspora Watch)

CREATE TABLE IF NOT EXISTS diaspora_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  position TEXT,
  current_club TEXT,
  club_country TEXT,
  photo_url TEXT,
  region TEXT CHECK (region IN ('europe','middle_east','africa_npfl','other')) DEFAULT 'europe',
  bio_summary TEXT,
  bio_source_url TEXT,
  market_value_estimate TEXT,     -- nullable; only populate with a real, cited, dated source
  market_value_source TEXT,
  market_value_as_of DATE,
  sports_data_player_id TEXT,
  wikipedia_slug TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index on region and slug for fast querying
CREATE INDEX IF NOT EXISTS idx_diaspora_players_region ON diaspora_players(region);
CREATE INDEX IF NOT EXISTS idx_diaspora_players_slug ON diaspora_players(slug);

-- Auto-update updated_at timestamp
CREATE TRIGGER update_diaspora_players_updated_at 
BEFORE UPDATE ON diaspora_players 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row-Level Security
ALTER TABLE diaspora_players ENABLE ROW LEVEL SECURITY;

-- Public Read Policy
CREATE POLICY "Public diaspora players are viewable by everyone" 
ON diaspora_players FOR SELECT USING (true);

-- Editor/Admin Full Access Policy
CREATE POLICY "Editors/Admins can modify diaspora players" 
ON diaspora_players FOR ALL USING (public.is_editor_or_admin());

-- Seed Top Nigerian Diaspora & Super Eagles Players (No fabricated financial claims)
INSERT INTO diaspora_players (
  name, slug, position, current_club, club_country, photo_url, region, bio_source_url, wikipedia_slug
) VALUES
(
  'Victor Osimhen',
  'victor-osimhen',
  'Centre-Forward',
  'Galatasaray SK',
  'Turkey',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80',
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
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
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
  'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&auto=format&fit=crop&q=80',
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
  'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&auto=format&fit=crop&q=80',
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
  'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&auto=format&fit=crop&q=80',
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
  'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800&auto=format&fit=crop&q=80',
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
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80',
  'europe',
  'https://en.wikipedia.org/wiki/Calvin_Bassey',
  'Calvin_Bassey'
),
(
  'Taiwo Awoniyi',
  'taiwo-awoniyi',
  'Centre-Forward',
  'Nottingham Forest FC',
  'England',
  'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop&q=80',
  'europe',
  'https://en.wikipedia.org/wiki/Taiwo_Awoniyi',
  'Taiwo_Awoniyi'
),
(
  'Moses Simon',
  'moses-simon',
  'Left Winger',
  'FC Nantes',
  'France',
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
  'europe',
  'https://en.wikipedia.org/wiki/Moses_Simon',
  'Moses_Simon'
),
(
  'Stanley Nwabali',
  'stanley-nwabali',
  'Goalkeeper',
  'Chippa United FC',
  'South Africa',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80',
  'africa_npfl',
  'https://en.wikipedia.org/wiki/Stanley_Nwabali',
  'Stanley_Nwabali'
),
(
  'Nathan Tella',
  'nathan-tella',
  'Right Winger / Wing-Back',
  'Bayer 04 Leverkusen',
  'Germany',
  'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&auto=format&fit=crop&q=80',
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
  'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&auto=format&fit=crop&q=80',
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
  'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&auto=format&fit=crop&q=80',
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
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80',
  'europe',
  'https://en.wikipedia.org/wiki/Bright_Osayi-Samuel',
  'Bright_Osayi-Samuel'
),
(
  'William Troost-Ekong',
  'william-troost-ekong',
  'Centre-Back',
  'Al-Kholood Club',
  'Saudi Arabia',
  'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800&auto=format&fit=crop&q=80',
  'middle_east',
  'https://en.wikipedia.org/wiki/William_Troost-Ekong',
  'William_Troost-Ekong'
),
(
  'Odion Ighalo',
  'odion-ighalo',
  'Centre-Forward',
  'Al-Wehda FC',
  'Saudi Arabia',
  'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop&q=80',
  'middle_east',
  'https://en.wikipedia.org/wiki/Odion_Ighalo',
  'Odion_Ighalo'
)
ON CONFLICT (slug) DO NOTHING;
