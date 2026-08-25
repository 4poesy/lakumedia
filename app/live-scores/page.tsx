import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { RealtimeScoreCard } from '@/components/sports/realtime-score-card';
import { Activity, Trophy, Calendar, ChevronRight } from 'lucide-react';

export const revalidate = 10;

export default async function LiveScoresPage() {
  const supabase = await createClient();

  // Query all fixtures with team and league data
  const { data: fixturesData } = await supabase
    .from('fixtures')
    .select('*, home_team:teams!home_team_id(name, logo_url), away_team:teams!away_team_id(name, logo_url), league:leagues(name)')
    .order('kickoff_at', { ascending: true });

  const fixtures = fixturesData && fixturesData.length > 0 ? (fixturesData as any[]) : [
    {
      id: '30000000-0000-0000-0000-000000000001',
      home_team: { name: 'Enyimba FC', logo_url: null },
      away_team: { name: 'Kano Pillars', logo_url: null },
      league: { name: 'Nigeria Premier Football League (NPFL)' },
      kickoff_at: new Date().toISOString(),
      home_score: 2,
      away_score: 1,
      status: 'finished' as const,
    },
    {
      id: '30000000-0000-0000-0000-000000000002',
      home_team: { name: 'Arsenal FC', logo_url: null },
      away_team: { name: 'Chelsea FC', logo_url: null },
      league: { name: 'English Premier League (EPL)' },
      kickoff_at: new Date(Date.now() + 3600000).toISOString(),
      home_score: null,
      away_score: null,
      status: 'scheduled' as const,
    },
    {
      id: '30000000-0000-0000-0000-000000000003',
      home_team: { name: 'Real Madrid', logo_url: null },
      away_team: { name: 'Arsenal FC', logo_url: null },
      league: { name: 'UEFA Champions League' },
      kickoff_at: new Date(Date.now() + 86400000).toISOString(),
      home_score: null,
      away_score: null,
      status: 'scheduled' as const,
    },
  ];

  const liveMatches = fixtures.filter((f) => f.status === 'live');
  const upcomingMatches = fixtures.filter((f) => f.status === 'scheduled');
  const finishedMatches = fixtures.filter((f) => f.status === 'finished');

  return (
    <div className="space-y-8 theme-sports max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-4 pb-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-extrabold text-xl shadow-sm">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Live Scores & Match Center</h1>
              <p className="text-xs text-slate-500 mt-1">
                Realtime match score updates for NPFL, EPL, La Liga, and International Tournaments.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              href="/admin/live-scores"
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              CMS Editor Console <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 1. Live Now Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
          <span>Currently Playing ({liveMatches.length})</span>
        </h2>

        {liveMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.map((fix: any) => (
              <RealtimeScoreCard
                key={fix.id}
                initialFixture={{
                  id: fix.id,
                  homeTeam: fix.home_team?.name || 'Home Team',
                  awayTeam: fix.away_team?.name || 'Away Team',
                  homeScore: fix.home_score,
                  awayScore: fix.away_score,
                  kickoffAt: fix.kickoff_at,
                  status: fix.status,
                  leagueName: fix.league?.name || 'League',
                  homeLogo: fix.home_team?.logo_url,
                  awayLogo: fix.away_team?.logo_url,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl text-center text-slate-500 text-xs border border-slate-200 shadow-sm">
            No live matches currently in play. Check upcoming fixtures below!
          </div>
        )}
      </section>

      {/* 2. Upcoming Fixtures */}
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <span>Upcoming Fixtures ({upcomingMatches.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingMatches.map((fix: any) => (
            <RealtimeScoreCard
              key={fix.id}
              initialFixture={{
                id: fix.id,
                homeTeam: fix.home_team?.name || 'Home Team',
                awayTeam: fix.away_team?.name || 'Away Team',
                homeScore: fix.home_score,
                awayScore: fix.away_score,
                kickoffAt: fix.kickoff_at,
                status: fix.status,
                leagueName: fix.league?.name || 'League',
                homeLogo: fix.home_team?.logo_url,
                awayLogo: fix.away_team?.logo_url,
              }}
            />
          ))}
        </div>
      </section>

      {/* 3. Finished Results */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-slate-400" />
          <span>Recent Full-Time Results ({finishedMatches.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {finishedMatches.map((fix: any) => (
            <RealtimeScoreCard
              key={fix.id}
              initialFixture={{
                id: fix.id,
                homeTeam: fix.home_team?.name || 'Home Team',
                awayTeam: fix.away_team?.name || 'Away Team',
                homeScore: fix.home_score,
                awayScore: fix.away_score,
                kickoffAt: fix.kickoff_at,
                status: fix.status,
                leagueName: fix.league?.name || 'League',
                homeLogo: fix.home_team?.logo_url,
                awayLogo: fix.away_team?.logo_url,
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
