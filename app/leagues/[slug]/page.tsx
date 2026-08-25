import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ScoreCard } from '@/components/sports/score-card';
import { Trophy, ArrowLeft, Calendar, Flag } from 'lucide-react';

export const revalidate = 60;

interface LeaguePageProps {
  params: {
    slug: string;
  };
}

export default async function LeaguePage({ params }: LeaguePageProps) {
  const { slug } = params;
  const supabase = await createClient();

  // Query league by slug or match
  const { data: leaguesData } = await supabase.from('leagues').select('*');
  const league = (leaguesData as any[])?.find(
    (l: any) => l.name.toLowerCase().includes(slug.toLowerCase()) || slug === 'npfl' || slug === 'epl'
  ) || {
    id: '10000000-0000-0000-0000-000000000001',
    name: slug.toUpperCase() === 'NPFL' ? 'Nigeria Premier Football League (NPFL)' : 'English Premier League (EPL)',
    country: slug.toUpperCase() === 'NPFL' ? 'Nigeria' : 'England',
  };

  // Query fixtures for this league
  const { data: fixturesData } = await supabase
    .from('fixtures')
    .select('*, home_team:teams!home_team_id(name, logo_url), away_team:teams!away_team_id(name, logo_url), league:leagues(name)')
    .order('kickoff_at', { ascending: true });

  const fixtures = fixturesData && fixturesData.length > 0 ? (fixturesData as any[]) : [
    {
      id: 'f1',
      home_team: { name: 'Enyimba FC', logo_url: null },
      away_team: { name: 'Kano Pillars', logo_url: null },
      league: { name: league.name },
      kickoff_at: new Date().toISOString(),
      home_score: 2,
      away_score: 1,
      status: 'finished' as const,
    },
    {
      id: 'f2',
      home_team: { name: 'Arsenal FC', logo_url: null },
      away_team: { name: 'Chelsea FC', logo_url: null },
      league: { name: league.name },
      kickoff_at: new Date(Date.now() + 3600000).toISOString(),
      home_score: null,
      away_score: null,
      status: 'scheduled' as const,
    },
  ];

  return (
    <div className="space-y-8 theme-sports">
      {/* Header */}
      <div className="space-y-4 pb-6 border-b border-slate-800">
        <Link
          href="/live-scores"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-emerald-400 gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Match Center
        </Link>

        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-extrabold text-2xl">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <Flag className="w-3.5 h-3.5 text-emerald-400" /> {league.country}
            </div>
            <h1 className="text-3xl font-extrabold text-white">{league.name}</h1>
          </div>
        </div>
      </div>

      {/* Fixtures Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" /> League Fixtures & Results
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fixtures.map((fix: any) => (
            <ScoreCard
              key={fix.id}
              homeTeam={fix.home_team?.name || 'Home Team'}
              awayTeam={fix.away_team?.name || 'Away Team'}
              homeScore={fix.home_score}
              awayScore={fix.away_score}
              kickoffAt={fix.kickoff_at}
              status={fix.status}
              leagueName={fix.league?.name || league.name}
              homeLogo={fix.home_team?.logo_url}
              awayLogo={fix.away_team?.logo_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
