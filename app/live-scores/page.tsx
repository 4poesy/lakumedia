import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { LiveScoreCenter, MatchFixtureItem } from '@/components/sports/livescore-center';

export const revalidate = 10;

export default async function LiveScoresPage() {
  const supabase = await createClient();

  // Query all fixtures with team and league data
  const { data: fixturesData } = await supabase
    .from('fixtures')
    .select('*, home_team:teams!home_team_id(name, logo_url), away_team:teams!away_team_id(name, logo_url), league:leagues(name)')
    .order('kickoff_at', { ascending: true });

  const formattedFixtures: MatchFixtureItem[] = fixturesData && fixturesData.length > 0
    ? (fixturesData as any[]).map((fix) => ({
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
    : [];

  return (
    <div className="space-y-8 theme-sports max-w-7xl mx-auto">
      {/* Faithful LiveScore.com Interactive Match Center Component */}
      <LiveScoreCenter initialFixtures={formattedFixtures} />
    </div>
  );
}
