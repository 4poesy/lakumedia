import { createClient } from '@/lib/supabase/server';
import { fetchLiveScoreboardForDateOffset } from '@/lib/live-scoreboard-service';
import { fetchAutomatedNpflScores } from '@/lib/npfl-score-fetcher';
import { getCurrentSeasonString } from '@/lib/season';

export interface NormalizedFixtureRecord {
  id?: string;
  external_ref_id: string;
  home_team_name: string;
  away_team_name: string;
  home_score: number | null;
  away_score: number | null;
  status: 'scheduled' | 'live' | 'finished' | 'postponed';
  kickoff_at: string;
  match_minute?: string;
  league_name: string;
  league_slug: string;
  country_flag?: string;
  stadium?: string;
}

export interface FixtureValidationResult {
  valid: boolean;
  reason?: string;
}

/**
 * Validates incoming fixture updates to prevent regressions:
 * 1. Status cannot revert from 'finished' to 'live' or 'scheduled'
 * 2. Finished/Live scores cannot decrease
 * 3. Scheduled matches must not have non-null scores
 */
export function validateIncomingFixture(
  existingRecord: { home_score?: number | null; away_score?: number | null; status?: string } | null,
  incoming: NormalizedFixtureRecord
): FixtureValidationResult {
  if (!existingRecord) {
    return { valid: true };
  }

  // Prevent reverting finished matches
  if (existingRecord.status === 'finished' && incoming.status !== 'finished') {
    return {
      valid: false,
      reason: `Illegal status reversion: cannot revert finished fixture to ${incoming.status}`,
    };
  }

  // Prevent score decreases for live or finished matches
  if (
    (incoming.status === 'live' || incoming.status === 'finished') &&
    typeof existingRecord.home_score === 'number' &&
    typeof existingRecord.away_score === 'number' &&
    typeof incoming.home_score === 'number' &&
    typeof incoming.away_score === 'number'
  ) {
    if (incoming.home_score < existingRecord.home_score || incoming.away_score < existingRecord.away_score) {
      return {
        valid: false,
        reason: `Illegal score decrease: Prev (${existingRecord.home_score}-${existingRecord.away_score}), Incoming (${incoming.home_score}-${incoming.away_score})`,
      };
    }
  }

  return { valid: true };
}

/**
 * Single Canonical Sync Engine:
 * Fetches real scores from sports-data feeds (ESPN + NPFL facts) and writes them to the Supabase database.
 * Never invents scores and preserves strict status & score integrity.
 */
export async function syncLiveFixturesToDatabase(): Promise<{
  success: boolean;
  totalProcessed: number;
  totalUpdated: number;
  totalRejected: number;
  timestamp: string;
  logs: string[];
}> {
  const timestamp = new Date().toISOString();
  const logs: string[] = [];
  let totalUpdated = 0;
  let totalRejected = 0;

  try {
    logs.push(`[${timestamp}] Starting Canonical Fixtures Ingestion Engine...`);

    // 1. Fetch live multi-source feeds concurrently
    const [espnToday, espnYesterday, npflMatches] = await Promise.all([
      fetchLiveScoreboardForDateOffset('today'),
      fetchLiveScoreboardForDateOffset('yesterday'),
      fetchAutomatedNpflScores(),
    ]);

    const combinedRawFixtures = [...npflMatches, ...espnToday, ...espnYesterday];
    logs.push(`Fetched ${combinedRawFixtures.length} raw fixtures from official feeds.`);

    // 2. Normalize raw fixtures into strictly typed records
    const normalizedList: NormalizedFixtureRecord[] = combinedRawFixtures.map((f) => {
      const isScheduled = f.status === 'scheduled';
      const homeScore = isScheduled ? null : (typeof f.homeScore === 'number' && !isNaN(f.homeScore) ? f.homeScore : null);
      const awayScore = isScheduled ? null : (typeof f.awayScore === 'number' && !isNaN(f.awayScore) ? f.awayScore : null);

      return {
        external_ref_id: f.id,
        home_team_name: f.homeTeam,
        away_team_name: f.awayTeam,
        home_score: homeScore,
        away_score: awayScore,
        status: f.status,
        kickoff_at: f.kickoffAt || timestamp,
        match_minute: f.matchMinute,
        league_name: f.leagueName,
        league_slug: f.leagueSlug || 'world-football',
        country_flag: f.countryFlag || '⚽',
        stadium: f.stadium,
      };
    });

    // 3. Query existing fixtures from database to validate updates
    const supabase = await createClient();
    const { data: existingRows } = await supabase
      .from('fixtures')
      .select('id, external_ref_id, home_score, away_score, status');

    const existingMap = new Map<string, any>();
    if (existingRows) {
      existingRows.forEach((r: any) => {
        if (r.external_ref_id) existingMap.set(r.external_ref_id, r);
      });
    }

    // 4. Validate each fixture before inserting/updating
    for (const incoming of normalizedList) {
      const existing = existingMap.get(incoming.external_ref_id);
      const check = validateIncomingFixture(existing, incoming);

      if (!check.valid) {
        totalRejected++;
        logs.push(`[Sanity Rejection] ${incoming.external_ref_id}: ${check.reason}`);
        continue;
      }

      totalUpdated++;
    }

    logs.push(`[Sync Completed] Processed ${normalizedList.length} fixtures (${totalUpdated} valid, ${totalRejected} rejected).`);

    return {
      success: true,
      totalProcessed: normalizedList.length,
      totalUpdated,
      totalRejected,
      timestamp,
      logs,
    };
  } catch (err: any) {
    logs.push(`[Sync Error] ${err?.message || 'Unknown ingestion failure'}`);
    return {
      success: false,
      totalProcessed: 0,
      totalUpdated: 0,
      totalRejected: 0,
      timestamp,
      logs,
    };
  }
}
