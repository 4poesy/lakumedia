import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Trophy, ArrowLeft, Calendar, Flag, BarChart2 } from 'lucide-react';
import { getLiveStandingsForLeague } from '@/lib/live-standings-service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface LeaguePageProps {
  params: {
    slug: string;
  };
}

export default async function LeaguePage({ params }: LeaguePageProps) {
  const { slug } = params;
  const supabase = await createClient();

  const isNpfl = slug.toLowerCase() === 'npfl';
  const leagueName = isNpfl ? 'Nigeria Premier Football League (NPFL) 2026/2027' : 'English Premier League (EPL) 2026/2027';

  // Fetch real live standings
  const realStandings = await getLiveStandingsForLeague(slug);

  const standingsTable = realStandings.length > 0 ? realStandings.map(s => ({
    rank: s.rank,
    team: s.team,
    mp: s.played,
    w: s.won,
    d: s.drawn,
    l: s.lost,
    gf: s.goalsFor,
    ga: s.goalsAgainst,
    gd: s.goalDifference >= 0 ? `+${s.goalDifference}` : `${s.goalDifference}`,
    pts: s.points,
    form: s.form,
  })) : [];

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <Link
            href="/live-scores"
            className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Live Match Center
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded bg-[#D9541E] text-white text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md">
                <Trophy className="w-3.5 h-3.5" /> OFFICIAL LEAGUE HUB
              </span>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-2">
                {leagueName}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-emerald-400" /> Real Standings Table
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-4">Club</th>
                <th className="py-3 px-2 text-center">MP</th>
                <th className="py-3 px-2 text-center">W</th>
                <th className="py-3 px-2 text-center">D</th>
                <th className="py-3 px-2 text-center">L</th>
                <th className="py-3 px-2 text-center">GD</th>
                <th className="py-3 px-3 text-center font-black text-amber-400">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {standingsTable.map((row) => (
                <tr key={row.rank} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-400">{row.rank}</td>
                  <td className="py-3 px-4 font-extrabold text-white">{row.team}</td>
                  <td className="py-3 px-2 text-center font-mono text-slate-300">{row.mp}</td>
                  <td className="py-3 px-2 text-center font-mono text-emerald-400 font-bold">{row.w}</td>
                  <td className="py-3 px-2 text-center font-mono text-amber-400">{row.d}</td>
                  <td className="py-3 px-2 text-center font-mono text-rose-400">{row.l}</td>
                  <td className="py-3 px-2 text-center font-mono font-bold text-slate-300">{row.gd}</td>
                  <td className="py-3 px-3 text-center font-mono font-black text-amber-400 text-sm">{row.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
