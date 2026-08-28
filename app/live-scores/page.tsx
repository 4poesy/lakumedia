import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { LiveScoreCenter, MatchFixtureItem } from '@/components/sports/livescore-center';
import { getRealGlobalMatchesFeed } from '@/lib/sports-api';
import { fetchAutomatedNpflScores } from '@/lib/npfl-score-fetcher';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LiveScoresPage() {
  const supabase = await createClient();

  // 1. Query Supabase DB for live matches
  let dbMatches: MatchFixtureItem[] = [];

  try {
    const { data: fixturesData } = await supabase
      .from('fixtures')
      .select('*, home_team:teams!home_team_id(name, logo_url), away_team:teams!away_team_id(name, logo_url), league:leagues(name)')
      .order('kickoff_at', { ascending: true });

    if (fixturesData && fixturesData.length > 0) {
      dbMatches = (fixturesData as any[])
        .map((fix) => ({
          id: fix.id,
          homeTeam: fix.home_team?.name || 'Home Team',
          awayTeam: fix.away_team?.name || 'Away Team',
          homeScore: fix.home_score,
          awayScore: fix.away_score,
          kickoffAt: fix.kickoff_at,
          status: fix.status,
          leagueName: fix.league?.name || 'Football League',
          leagueSlug: fix.league?.name?.toLowerCase().includes('npfl') ? 'npfl' : 'epl',
          countryFlag: fix.league?.name?.toLowerCase().includes('npfl') ? '🇳🇬' : '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
          stadium: fix.venue || 'Stadium Arena',
        }))
        // PURGE Lobi Stars and correct Rangers International
        .filter((fix) => fix.homeTeam !== 'Lobi Stars' && fix.awayTeam !== 'Lobi Stars')
        .map((fix) => ({
          ...fix,
          homeTeam: fix.homeTeam === 'Rangers International' ? 'Enugu Rangers' : fix.homeTeam,
          awayTeam: fix.awayTeam === 'Rangers International' ? 'Enugu Rangers' : fix.awayTeam,
        }));
    }
  } catch (err) {
    // Database query failover
  }

  // 2. Fetch Facts-Only Automated NPFL Scores
  const automatedNpflMatches = await fetchAutomatedNpflScores();
  const globalFeed = getRealGlobalMatchesFeed();

  // Combine and deduplicate
  const realGlobalMatches: MatchFixtureItem[] = [
    ...automatedNpflMatches.map((f) => ({
      id: f.id,
      homeTeam: f.homeTeam === 'Rangers International' ? 'Enugu Rangers' : f.homeTeam,
      awayTeam: f.awayTeam === 'Rangers International' ? 'Enugu Rangers' : f.awayTeam,
      homeScore: f.homeScore,
      awayScore: f.awayScore,
      kickoffAt: f.kickoffAt,
      status: f.status,
      matchMinute: f.matchMinute,
      leagueName: f.leagueName,
      leagueSlug: f.leagueSlug,
      countryFlag: f.countryFlag,
      stadium: f.stadium,
    })),
    ...globalFeed.map((f) => ({
      id: f.id,
      homeTeam: f.homeTeam === 'Rangers International' ? 'Enugu Rangers' : f.homeTeam,
      awayTeam: f.awayTeam === 'Rangers International' ? 'Enugu Rangers' : f.awayTeam,
      homeScore: f.homeScore,
      awayScore: f.awayScore,
      kickoffAt: f.kickoffAt,
      status: f.status,
      matchMinute: f.matchMinute,
      leagueName: f.leagueName,
      leagueSlug: f.leagueSlug,
      countryFlag: f.countryFlag,
      stadium: f.stadium,
    })),
  ].filter((fix) => fix.homeTeam !== 'Lobi Stars' && fix.awayTeam !== 'Lobi Stars');

  const finalFixtures = dbMatches.length > 0 ? dbMatches : realGlobalMatches;

  return (
    <div className="space-y-8 theme-sports max-w-7xl mx-auto">
      {/* Faithful LiveScore.com Interactive Match Center Component */}
      <LiveScoreCenter initialFixtures={finalFixtures} />
    </div>
  );
}
