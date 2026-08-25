import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ScoreCard } from '@/components/sports/score-card';
import { Shield, ArrowLeft, Calendar, Trophy } from 'lucide-react';

export const revalidate = 60;

interface TeamPageProps {
  params: {
    slug: string;
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = params;
  const supabase = await createClient();

  const formattedName = slug
    .replace('-', ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  // Query team details
  const { data: teamsData } = await supabase.from('teams').select('*, leagues(name)');
  const team = (teamsData as any[])?.find((t: any) => t.name.toLowerCase().includes(slug.toLowerCase())) || {
    id: '20000000-0000-0000-0000-000000000001',
    name: formattedName.includes('Enyimba') ? 'Enyimba FC' : formattedName,
    logo_url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=200&auto=format&fit=crop',
    leagues: { name: 'Nigeria Premier Football League (NPFL)' },
  };

  // Query team fixtures
  const { data: fixturesData } = await supabase
    .from('fixtures')
    .select('*, home_team:teams!home_team_id(name, logo_url), away_team:teams!away_team_id(name, logo_url), league:leagues(name)')
    .order('kickoff_at', { ascending: true });

  const teamFixtures = fixturesData
    ? (fixturesData as any[]).filter(
        (f: any) =>
          f.home_team?.name?.toLowerCase().includes(slug.toLowerCase()) ||
          f.away_team?.name?.toLowerCase().includes(slug.toLowerCase())
      )
    : [
        {
          id: 'f1',
          home_team: { name: team.name, logo_url: team.logo_url },
          away_team: { name: 'Kano Pillars', logo_url: null },
          league: { name: team.leagues?.name || 'NPFL' },
          kickoff_at: new Date().toISOString(),
          home_score: 2,
          away_score: 1,
          status: 'finished' as const,
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
          <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-emerald-500/40 flex items-center justify-center font-bold text-xl text-white overflow-hidden shadow-lg">
            {team.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={team.logo_url} alt={team.name} className="w-full h-full object-cover" />
            ) : (
              <Shield className="w-8 h-8 text-emerald-400" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <Trophy className="w-3.5 h-3.5" /> {team.leagues?.name || 'Football League'}
            </div>
            <h1 className="text-3xl font-extrabold text-white">{team.name}</h1>
          </div>
        </div>
      </div>

      {/* Team Fixtures */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" /> Matches & Fixtures
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamFixtures.map((fix: any) => (
            <ScoreCard
              key={fix.id}
              homeTeam={fix.home_team?.name || team.name}
              awayTeam={fix.away_team?.name || 'Opponent'}
              homeScore={fix.home_score}
              awayScore={fix.away_score}
              kickoffAt={fix.kickoff_at}
              status={fix.status}
              leagueName={fix.league?.name || 'League'}
              homeLogo={fix.home_team?.logo_url}
              awayLogo={fix.away_team?.logo_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
