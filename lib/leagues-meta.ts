export interface LeagueMetaItem {
  name: string;
  flag: string;
  country: string;
}

export const LEAGUE_META: Record<string, LeagueMetaItem> = {
  npfl: { name: 'Nigeria Premier Football League (NPFL)', flag: '🇳🇬', country: 'Nigeria' },
  epl: { name: 'English Premier League (EPL)', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', country: 'England' },
  'premier-league': { name: 'English Premier League (EPL)', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', country: 'England' },
  laliga: { name: 'La Liga EA Sports', flag: '🇪🇸', country: 'Spain' },
  'la-liga': { name: 'La Liga EA Sports', flag: '🇪🇸', country: 'Spain' },
  seriea: { name: 'Serie A Enilive', flag: '🇮🇹', country: 'Italy' },
  'serie-a': { name: 'Serie A Enilive', flag: '🇮🇹', country: 'Italy' },
  bundesliga: { name: 'Bundesliga (Germany)', flag: '🇩🇪', country: 'Germany' },
  ligue1: { name: "Ligue 1 McDonald's", flag: '🇫🇷', country: 'France' },
  'ligue-1': { name: "Ligue 1 McDonald's", flag: '🇫🇷', country: 'France' },
  saudi: { name: 'Saudi Pro League (Roshn)', flag: '🇸🇦', country: 'Saudi Arabia' },
  'saudi-pro-league': { name: 'Saudi Pro League (Roshn)', flag: '🇸🇦', country: 'Saudi Arabia' },
  ucl: { name: 'UEFA Champions League', flag: '🇪🇺', country: 'Europe' },
  'champions-league': { name: 'UEFA Champions League', flag: '🇪🇺', country: 'Europe' },
  uel: { name: 'UEFA Europa League', flag: '🇪🇺', country: 'Europe' },
  'europa-league': { name: 'UEFA Europa League', flag: '🇪🇺', country: 'Europe' },
  uecl: { name: 'UEFA Conference League', flag: '🇪🇺', country: 'Europe' },
  afcon: { name: 'Africa Cup of Nations & Qualifiers', flag: '🌍', country: 'Africa' },
  'caf-cl': { name: 'CAF Champions League', flag: '🌍', country: 'Africa' },
  eredivisie: { name: 'Eredivisie (Netherlands)', flag: '🇳🇱', country: 'Netherlands' },
  'liga-portugal': { name: 'Liga Portugal Betclic', flag: '🇵🇹', country: 'Portugal' },
  portugal: { name: 'Liga Portugal Betclic', flag: '🇵🇹', country: 'Portugal' },
  mls: { name: 'Major League Soccer (MLS)', flag: '🇺🇸', country: 'United States' },
  superlig: { name: 'Trendyol Süper Lig (Turkey)', flag: '🇹🇷', country: 'Turkey' },
  scottish: { name: 'Scottish Premiership', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', country: 'Scotland' },
  brasileirao: { name: 'Brasileirão Betano (Brazil)', flag: '🇧🇷', country: 'Brazil' },
  brazil: { name: 'Brasileirão Betano (Brazil)', flag: '🇧🇷', country: 'Brazil' },
  'liga-argentina': { name: 'Liga Profesional de Fútbol (Argentina)', flag: '🇦🇷', country: 'Argentina' },
  argentina: { name: 'Liga Profesional de Fútbol (Argentina)', flag: '🇦🇷', country: 'Argentina' },
  'liga-mx': { name: 'Liga BBVA MX (Mexico)', flag: '🇲🇽', country: 'Mexico' },
  mexico: { name: 'Liga BBVA MX (Mexico)', flag: '🇲🇽', country: 'Mexico' },
  'world-cup-2026': { name: 'FIFA World Cup 2026 Qualifiers', flag: '🏆', country: 'International' },
  'world-football': { name: 'World Football Championship', flag: '🌍', country: 'International' },
};
