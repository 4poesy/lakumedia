/**
 * Official 2025/26 NPFL 20-Club Roster & Keyword Registry
 * Covers all 20 top-flight Nigerian Premier Football League clubs and name variants.
 */

export interface NpflClubKeywordSet {
  clubName: string;
  shortCode: string;
  keywords: string[];
}

export const NPFL_2025_26_CLUBS: NpflClubKeywordSet[] = [
  { clubName: 'Abia Warriors', shortCode: 'ABW', keywords: ['abia warriors', 'umuahia'] },
  { clubName: 'Barau FC', shortCode: 'BAR', keywords: ['barau fc', 'barau', 'kano barau'] },
  { clubName: 'Bayelsa United', shortCode: 'BAY', keywords: ['bayelsa united', 'yenagoa'] },
  { clubName: 'Bendel Insurance', shortCode: 'BEN', keywords: ['bendel insurance', 'benin city insurance'] },
  { clubName: 'El-Kanemi Warriors', shortCode: 'ELK', keywords: ['el-kanemi warriors', 'elkanemi', 'maiduguri warriors'] },
  { clubName: 'Enugu Rangers', shortCode: 'RAN', keywords: ['enugu rangers', 'rangers international', 'rangers fc'] },
  { clubName: 'Enyimba', shortCode: 'ENY', keywords: ['enyimba fc', 'enyimba international', 'enyimba', 'aba fc'] },
  { clubName: 'Ikorodu City', shortCode: 'IKO', keywords: ['ikorodu city', 'ikorodu city fc'] },
  { clubName: 'Kano Pillars', shortCode: 'PIL', keywords: ['kano pillars', 'pillars fc'] },
  { clubName: 'Katsina United', shortCode: 'KAT', keywords: ['katsina united'] },
  { clubName: 'Kun Khalifat', shortCode: 'KUN', keywords: ['kun khalifat', 'kun khalifat fc', 'owerri khalifat'] },
  { clubName: 'Kwara United', shortCode: 'KWA', keywords: ['kwara united', 'ilorin united'] },
  { clubName: 'Nasarawa United', shortCode: 'NAS', keywords: ['nasarawa united', 'lafia united'] },
  { clubName: 'Niger Tornadoes', shortCode: 'TOR', keywords: ['niger tornadoes', 'minna tornadoes'] },
  { clubName: 'Plateau United', shortCode: 'PLA', keywords: ['plateau united', 'jos united'] },
  { clubName: 'Remo Stars', shortCode: 'REM', keywords: ['remo stars', 'ikenne stars'] },
  { clubName: 'Rivers United', shortCode: 'RIV', keywords: ['rivers united', 'port harcourt united'] },
  { clubName: 'Shooting Stars', shortCode: 'SHO', keywords: ['shooting stars', '3sc', 'shooting stars sc', 'ibadan 3sc'] },
  { clubName: 'Warri Wolves', shortCode: 'WAR', keywords: ['warri wolves'] },
  { clubName: 'Wikki Tourists', shortCode: 'WIK', keywords: ['wikki tourists', 'bauchi tourists'] },
];

export const NPFL_LEAGUE_KEYWORDS = [
  'npfl',
  'nigeria premier football league',
  'nigerian premier league',
  'nigeria professional football league',
  'npfl table',
  'npfl standings',
  'npfl fixtures',
  'nigerian fa cup',
  'nigerian super cup',
  '1xcup',
  'super eagles',
  'chan eagles',
  'laku sports npfl',
];

// Combined master array of all NPFL triggers for high-speed matching
export const ALL_NPFL_KEYWORDS: string[] = [
  ...NPFL_LEAGUE_KEYWORDS,
  ...NPFL_2025_26_CLUBS.flatMap((club) => club.keywords),
];

// Rejection triggers to filter out foreign Scottish Rangers or foreign clubs
export const NPFL_REJECT_TRIGGERS = [
  'glasgow',
  'scottish premiership',
  'scottish cup',
  'ibrox',
  'real madrid',
  'barcelona',
  'bayern munich',
  'psg',
];

/**
 * High-speed NPFL story matcher
 */
export function isNpflStory(title: string, snippet: string = ''): boolean {
  const combinedText = `${title} ${snippet}`.toLowerCase();

  // Reject foreign Scottish Rangers or European stories
  if (NPFL_REJECT_TRIGGERS.some((reject) => combinedText.includes(reject))) {
    return false;
  }

  // Match any of the 20 clubs or league-wide triggers
  return ALL_NPFL_KEYWORDS.some((kw) => combinedText.includes(kw));
}
