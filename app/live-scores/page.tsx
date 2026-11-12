import React from 'react';
import type { Metadata } from 'next';
import { LiveScoreCenter, MatchFixtureItem } from '@/components/sports/livescore-center';
import { fetchMultiSourceMatchesAndNews } from '@/lib/multi-source-football-aggregator';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Live Football Scores Today, Fixtures & Match Center',
  description: 'Real-time live scores for NPFL, Premier League, Champions League, La Liga, Serie A, and international football fixtures. Goal updates, kick-off times, and live match ticker on Laku Media Concept.',
  keywords: [
    'Live football scores',
    'NPFL live score today',
    'Livescore Nigeria',
    'Premier League live match scores',
    'Today football match fixtures',
    'Laku Media Concept match center',
  ],
  alternates: {
    canonical: '/live-scores',
  },
  openGraph: {
    title: 'Live Football Scores Today, Fixtures & Match Center | Laku Media',
    description: 'Real-time live scores for NPFL, Premier League, Champions League, La Liga, and international football fixtures.',
    url: 'https://lakumediaconcept.com/live-scores',
    siteName: 'Laku Media Concept',
    type: 'website',
    images: [
      {
        url: 'https://lakumediaconcept.com/brand/laku-media/laku-media-logo-light.jpeg',
        width: 1200,
        height: 630,
        alt: 'Live Football Score Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Football Scores Today, Fixtures & Match Center',
    description: 'Real-time live scores for NPFL, Premier League, Champions League, and international football fixtures.',
  },
};

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
