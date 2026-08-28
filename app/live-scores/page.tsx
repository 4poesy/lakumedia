import React from 'react';
import { LiveScoreCenter, MatchFixtureItem } from '@/components/sports/livescore-center';
import { fetchMultiSourceMatchesAndNews } from '@/lib/multi-source-football-aggregator';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LiveScoresPage() {
  // Fetch Multi-Source Data (SofaScore, beIN SPORTS, Al Jazeera, ESPN) for Yesterday, Today, Tomorrow
  const [todayData, yesterdayData, tomorrowData] = await Promise.all([
    fetchMultiSourceMatchesAndNews('today'),
    fetchMultiSourceMatchesAndNews('yesterday'),
    fetchMultiSourceMatchesAndNews('tomorrow'),
  ]);

  const realMatchCenterFixtures: MatchFixtureItem[] = [
    ...todayData.fixtures.map((f) => ({ ...f, matchDateOffset: 'today' as const })),
    ...yesterdayData.fixtures.map((f) => ({ ...f, matchDateOffset: 'yesterday' as const })),
    ...tomorrowData.fixtures.map((f) => ({ ...f, matchDateOffset: 'tomorrow' as const })),
  ];

  return (
    <div className="space-y-8 theme-sports max-w-7xl mx-auto">
      {/* Faithful LiveScore.com Interactive Match Center Component */}
      <LiveScoreCenter initialFixtures={realMatchCenterFixtures} />
    </div>
  );
}
