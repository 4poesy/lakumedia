import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { LiveScoreCenter, MatchFixtureItem } from '@/components/sports/livescore-center';
import { fetchAutomatedNpflScores } from '@/lib/npfl-score-fetcher';
import { fetchLiveScoreboardForDateOffset } from '@/lib/live-scoreboard-service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LiveScoresPage() {
  const supabase = await createClient();

  // 1. Fetch 100% Real Matches from ESPN Live Global Scoreboard API for Today, Yesterday & Tomorrow
  const [todayRealMatches, yesterdayRealMatches, tomorrowRealMatches, npflAutomatedScores] = await Promise.all([
    fetchLiveScoreboardForDateOffset('today'),
    fetchLiveScoreboardForDateOffset('yesterday'),
    fetchLiveScoreboardForDateOffset('tomorrow'),
    fetchAutomatedNpflScores(),
  ]);

  // Combine and format all real matches
  const realMatchCenterFixtures: MatchFixtureItem[] = [
    ...npflAutomatedScores.map((f) => ({
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
      matchDateOffset: 'today' as const,
    })),
    ...todayRealMatches.map((f) => ({
      ...f,
      matchDateOffset: 'today' as const,
    })),
    ...yesterdayRealMatches.map((f) => ({
      ...f,
      matchDateOffset: 'yesterday' as const,
    })),
    ...tomorrowRealMatches.map((f) => ({
      ...f,
      matchDateOffset: 'tomorrow' as const,
    })),
  ].filter((fix) => fix.homeTeam !== 'Lobi Stars' && fix.awayTeam !== 'Lobi Stars');

  return (
    <div className="space-y-8 theme-sports max-w-7xl mx-auto">
      {/* Faithful LiveScore.com Interactive Match Center Component */}
      <LiveScoreCenter initialFixtures={realMatchCenterFixtures} />
    </div>
  );
}
