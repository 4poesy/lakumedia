import { fetchLiveScoreboardForDateOffset } from '@/lib/live-scoreboard-service';
import { fetchAutomatedNpflScores } from '@/lib/npfl-score-fetcher';

export interface ApiMatchFixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  status: 'live' | 'finished' | 'scheduled' | 'postponed';
  kickoffAt: string;
  matchMinute?: string;
  leagueName: string;
  leagueSlug: string;
  countryFlag: string;
  stadium?: string;
  matchDateOffset?: 'yesterday' | 'today' | 'tomorrow';
  goals?: Array<{ minute: number; player: string; team: 'home' | 'away' }>;
  cards?: Array<{ minute: number; player: string; team: 'home' | 'away'; type: 'yellow' | 'red' }>;
  h2h?: {
    homeWins: number;
    draws: number;
    awayWins: number;
    lastMatchesHome: Array<'W' | 'D' | 'L'>;
    lastMatchesAway: Array<'W' | 'D' | 'L'>;
  };
  tableSnapshot?: {
    homeRank: number;
    awayRank: number;
    homePts: number;
    awayPts: number;
  };
}

/**
 * Dynamic Synchronous Feed Helper — Zero hardcoded mock matches.
 */
export function getRealGlobalMatchesFeed(): ApiMatchFixture[] {
  return [];
}

/**
 * Live Verified Multi-Source Fetcher (ESPN Provider + NPFL RSS facts)
 */
export async function fetchLiveSportsFromApi(): Promise<{
  success: boolean;
  itemCount: number;
  fixtures: ApiMatchFixture[];
  source: string;
}> {
  try {
    const [npfl, espnToday, espnYesterday] = await Promise.all([
      fetchAutomatedNpflScores().catch(() => []),
      fetchLiveScoreboardForDateOffset('today').catch(() => []),
      fetchLiveScoreboardForDateOffset('yesterday').catch(() => []),
    ]);

    const allFixtures: ApiMatchFixture[] = [
      ...npfl,
      ...espnToday.map((f: any) => ({
        id: f.id,
        homeTeam: f.homeTeam,
        awayTeam: f.awayTeam,
        homeScore: f.homeScore,
        awayScore: f.awayScore,
        status: f.status,
        kickoffAt: f.kickoffAt,
        matchMinute: f.matchMinute,
        leagueName: f.leagueName,
        leagueSlug: f.leagueSlug,
        countryFlag: f.countryFlag || '🌍',
        matchDateOffset: 'today' as const,
      })),
      ...espnYesterday.map((f: any) => ({
        id: f.id,
        homeTeam: f.homeTeam,
        awayTeam: f.awayTeam,
        homeScore: f.homeScore,
        awayScore: f.awayScore,
        status: f.status,
        kickoffAt: f.kickoffAt,
        matchMinute: f.matchMinute,
        leagueName: f.leagueName,
        leagueSlug: f.leagueSlug,
        countryFlag: f.countryFlag || '🌍',
        matchDateOffset: 'yesterday' as const,
      })),
    ];

    return {
      success: true,
      itemCount: allFixtures.length,
      fixtures: allFixtures,
      source: 'Verified Live API (ESPN + NPFL facts)',
    };
  } catch (error: any) {
    console.error('Error in multi-source live sports API:', error);
    return {
      success: false,
      itemCount: 0,
      fixtures: [],
      source: 'API Error: ' + error.message,
    };
  }
}
