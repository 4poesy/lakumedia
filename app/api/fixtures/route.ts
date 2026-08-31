import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { fetchLiveScoreboardForDateOffset } from '@/lib/live-scoreboard-service';
import { fetchAutomatedNpflScores } from '@/lib/npfl-score-fetcher';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // 60s cache revalidation

export interface MatchTickerFixture {
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
  countryFlag?: string;
}

export async function GET(req: NextRequest) {
  try {
    const leagueFilter = req.nextUrl.searchParams.get('league')?.toLowerCase();
    const statusFilter = req.nextUrl.searchParams.get('status')?.toLowerCase();

    // 1. Fetch real-time live scoreboard feed directly from ESPN (23 global leagues) + NPFL feeds
    let liveFixtures: MatchTickerFixture[] = [];
    try {
      const [npfl, espnToday] = await Promise.all([
        fetchAutomatedNpflScores().catch(() => []),
        fetchLiveScoreboardForDateOffset('today').catch(() => []),
      ]);

      liveFixtures = [...npfl, ...espnToday].map((f) => {
        const isSched = f.status === 'scheduled';
        return {
          id: f.id,
          homeTeam: f.homeTeam,
          awayTeam: f.awayTeam,
          homeScore: isSched ? null : (typeof f.homeScore === 'number' && !isNaN(f.homeScore) ? f.homeScore : null),
          awayScore: isSched ? null : (typeof f.awayScore === 'number' && !isNaN(f.awayScore) ? f.awayScore : null),
          status: f.status,
          kickoffAt: f.kickoffAt,
          matchMinute: f.matchMinute,
          leagueName: f.leagueName,
          leagueSlug: f.leagueSlug,
          countryFlag: f.countryFlag || '⚽',
        };
      });
    } catch (liveErr) {
      console.warn('Real-time live scoreboard fetch warning:', liveErr);
    }

    // 2. If live scoreboard returns no matches, fall back to Database Fixtures
    let finalFixtures = liveFixtures;

    if (finalFixtures.length === 0) {
      try {
        const supabase = await createClient();
        const { data, error } = await (supabase.from('fixtures' as any) as any)
          .select(`
            id,
            kickoff_at,
            home_score,
            away_score,
            status,
            external_ref_id,
            home_team:teams!home_team_id(name),
            away_team:teams!away_team_id(name),
            league:leagues!league_id(name)
          `)
          .order('kickoff_at', { ascending: true })
          .limit(25);

        if (!error && data && data.length > 0) {
          finalFixtures = data.map((item: any) => ({
            id: item.id,
            homeTeam: item.home_team?.name || 'Home Team',
            awayTeam: item.away_team?.name || 'Away Team',
            homeScore: item.status === 'scheduled' ? null : (item.home_score !== null && !isNaN(item.home_score) ? item.home_score : null),
            awayScore: item.status === 'scheduled' ? null : (item.away_score !== null && !isNaN(item.away_score) ? item.away_score : null),
            status: item.status,
            kickoffAt: item.kickoff_at,
            leagueName: item.league?.name || 'Football',
            leagueSlug: 'football',
            countryFlag: '⚽',
          }));
        }
      } catch (dbErr) {
        console.warn('Database fallback query error:', dbErr);
      }
    }

    // Apply filters
    if (leagueFilter && leagueFilter !== 'all') {
      finalFixtures = finalFixtures.filter(
        (f) => f.leagueSlug.toLowerCase() === leagueFilter || f.leagueName.toLowerCase().includes(leagueFilter)
      );
    }

    if (statusFilter && statusFilter !== 'all') {
      finalFixtures = finalFixtures.filter((f) => f.status.toLowerCase() === statusFilter);
    }

    return NextResponse.json({
      success: true,
      count: finalFixtures.length,
      fixtures: finalFixtures,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to fetch fixtures', fixtures: [] },
      { status: 500 }
    );
  }
}
