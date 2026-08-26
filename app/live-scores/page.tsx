import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { LiveScoreCenter, MatchFixtureItem } from '@/components/sports/livescore-center';
import { Activity, Trophy, Calendar, ChevronRight } from 'lucide-react';

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
      {/* CMS Admin Link Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-xs text-slate-400 font-bold">
          <Link href="/" className="hover:text-emerald-400">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-400">LiveScores Match Center</span>
        </div>

        <Link
          href="/admin/live-scores"
          className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1.5 shadow-sm"
        >
          CMS LiveScore Console <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Faithful LiveScore.com Interactive Match Center Component */}
      <LiveScoreCenter initialFixtures={formattedFixtures} />
    </div>
  );
}
