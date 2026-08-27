import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ScoreCard } from '@/components/sports/score-card';
import { Trophy, ArrowLeft, Calendar, Flag, BarChart2, Award, Flame, ChevronRight } from 'lucide-react';

export const revalidate = 60;

interface LeaguePageProps {
  params: {
    slug: string;
  };
}

export default async function LeaguePage({ params }: LeaguePageProps) {
  const { slug } = params;
  const supabase = await createClient();

  const isNpfl = slug.toLowerCase() === 'npfl';
  const leagueName = isNpfl ? 'Nigeria Premier Football League (NPFL)' : 'English Premier League (EPL)';
  const country = isNpfl ? 'Nigeria 🇳🇬' : 'England 🏴󠁧󠁢󠁥󠁮󠁧󠁿';

  // Official Standings Table Data
  const standingsTable = isNpfl
    ? [
        { rank: 1, team: 'Rangers International', mp: 28, w: 16, d: 6, l: 6, gf: 42, ga: 20, gd: '+22', pts: 54, form: ['W', 'W', 'D', 'W', 'W'] },
        { rank: 2, team: 'Enyimba FC', mp: 28, w: 15, d: 6, l: 7, gf: 40, ga: 22, gd: '+18', pts: 51, form: ['W', 'L', 'W', 'W', 'D'] },
        { rank: 3, team: 'Remo Stars', mp: 28, w: 14, d: 7, l: 7, gf: 38, ga: 24, gd: '+14', pts: 49, form: ['W', 'W', 'L', 'D', 'W'] },
        { rank: 4, team: 'Rivers United', mp: 28, w: 13, d: 8, l: 7, gf: 36, ga: 25, gd: '+11', pts: 47, form: ['W', 'D', 'W', 'L', 'W'] },
        { rank: 5, team: 'Lobi Stars', mp: 28, w: 12, d: 8, l: 8, gf: 33, ga: 28, gd: '+5', pts: 44, form: ['L', 'W', 'D', 'W', 'L'] },
        { rank: 6, team: 'Kano Pillars', mp: 28, w: 11, d: 9, l: 8, gf: 35, ga: 31, gd: '+4', pts: 42, form: ['L', 'D', 'L', 'W', 'D'] },
        { rank: 7, team: 'Bendel Insurance', mp: 28, w: 10, d: 10, l: 8, gf: 29, ga: 26, gd: '+3', pts: 40, form: ['D', 'W', 'D', 'D', 'L'] },
        { rank: 8, team: 'Shooting Stars SC', mp: 28, w: 10, d: 9, l: 9, gf: 31, ga: 30, gd: '+1', pts: 39, form: ['W', 'L', 'W', 'D', 'D'] },
        { rank: 9, team: 'Plateau United', mp: 28, w: 11, d: 5, l: 12, gf: 36, ga: 34, gd: '+2', pts: 38, form: ['L', 'W', 'L', 'W', 'D'] },
        { rank: 10, team: 'Katsina United', mp: 28, w: 10, d: 7, l: 11, gf: 28, ga: 29, gd: '-1', pts: 37, form: ['D', 'L', 'W', 'W', 'L'] },
        { rank: 11, team: 'Abia Warriors', mp: 28, w: 10, d: 6, l: 12, gf: 30, ga: 35, gd: '-5', pts: 36, form: ['W', 'D', 'L', 'L', 'W'] },
        { rank: 12, team: 'Bayelsa United', mp: 28, w: 9, d: 8, l: 11, gf: 32, ga: 38, gd: '-6', pts: 35, form: ['L', 'D', 'W', 'D', 'W'] },
        { rank: 13, team: 'Kwara United', mp: 28, w: 8, d: 10, l: 10, gf: 26, ga: 31, gd: '-5', pts: 34, form: ['D', 'W', 'D', 'L', 'D'] },
        { rank: 14, team: 'Sunshine Stars', mp: 28, w: 9, d: 6, l: 13, gf: 27, ga: 33, gd: '-6', pts: 33, form: ['L', 'L', 'W', 'D', 'L'] },
        { rank: 15, team: 'Niger Tornadoes', mp: 28, w: 8, d: 8, l: 12, gf: 24, ga: 30, gd: '-6', pts: 32, form: ['D', 'D', 'L', 'W', 'L'] },
        { rank: 16, team: 'Akwa United', mp: 28, w: 8, d: 7, l: 13, gf: 25, ga: 32, gd: '-7', pts: 31, form: ['W', 'L', 'D', 'L', 'D'] },
        { rank: 17, team: 'Heartland FC', mp: 28, w: 7, d: 9, l: 12, gf: 23, ga: 34, gd: '-11', pts: 30, form: ['L', 'D', 'L', 'D', 'W'] },
        { rank: 18, team: 'Sporting Lagos', mp: 28, w: 7, d: 8, l: 13, gf: 26, ga: 37, gd: '-11', pts: 29, form: ['D', 'L', 'W', 'L', 'L'] },
        { rank: 19, team: 'Gombe United', mp: 28, w: 6, d: 7, l: 15, gf: 21, ga: 42, gd: '-21', pts: 25, form: ['L', 'L', 'D', 'L', 'L'] },
        { rank: 20, team: 'Doma United', mp: 28, w: 5, d: 8, l: 15, gf: 19, ga: 41, gd: '-22', pts: 23, form: ['L', 'D', 'L', 'L', 'L'] },
      ]
    : [
        { rank: 1, team: 'Manchester City', mp: 29, w: 22, d: 5, l: 2, gf: 74, ga: 26, gd: '+48', pts: 71, form: ['W', 'W', 'W', 'D', 'W'] },
        { rank: 2, team: 'Arsenal FC', mp: 29, w: 21, d: 5, l: 3, gf: 70, ga: 24, gd: '+46', pts: 68, form: ['W', 'W', 'W', 'W', 'D'] },
        { rank: 3, team: 'Liverpool FC', mp: 29, w: 20, d: 7, l: 2, gf: 68, ga: 28, gd: '+40', pts: 67, form: ['W', 'D', 'W', 'W', 'L'] },
        { rank: 4, team: 'Aston Villa', mp: 29, w: 17, d: 5, l: 7, gf: 59, ga: 42, gd: '+17', pts: 56, form: ['L', 'W', 'D', 'W', 'W'] },
        { rank: 5, team: 'Tottenham Hotspur', mp: 29, w: 16, d: 5, l: 8, gf: 58, ga: 45, gd: '+13', pts: 53, form: ['W', 'L', 'W', 'L', 'W'] },
        { rank: 6, team: 'Chelsea FC', mp: 29, w: 15, d: 7, l: 7, gf: 56, ga: 40, gd: '+16', pts: 52, form: ['W', 'W', 'L', 'D', 'W'] },
        { rank: 7, team: 'Manchester United', mp: 29, w: 14, d: 5, l: 10, gf: 45, ga: 44, gd: '+1', pts: 47, form: ['L', 'W', 'D', 'W', 'L'] },
        { rank: 8, team: 'Newcastle United', mp: 29, w: 13, d: 6, l: 10, gf: 52, ga: 48, gd: '+4', pts: 45, form: ['W', 'D', 'L', 'W', 'W'] },
        { rank: 9, team: 'West Ham United', mp: 29, w: 12, d: 8, l: 9, gf: 50, ga: 49, gd: '+1', pts: 44, form: ['D', 'W', 'D', 'L', 'W'] },
        { rank: 10, team: 'Brighton & Hove Albion', mp: 29, w: 11, d: 10, l: 8, gf: 50, ga: 44, gd: '+6', pts: 43, form: ['W', 'D', 'L', 'W', 'D'] },
        { rank: 11, team: 'Wolverhampton Wanderers', mp: 29, w: 12, d: 5, l: 12, gf: 42, ga: 46, gd: '-4', pts: 41, form: ['L', 'W', 'W', 'L', 'D'] },
        { rank: 12, team: 'AFC Bournemouth', mp: 29, w: 11, d: 7, l: 11, gf: 44, ga: 50, gd: '-6', pts: 40, form: ['W', 'W', 'D', 'L', 'W'] },
        { rank: 13, team: 'Fulham FC', mp: 29, w: 11, d: 6, l: 12, gf: 47, ga: 44, gd: '+3', pts: 39, form: ['W', 'L', 'W', 'W', 'L'] },
        { rank: 14, team: 'Crystal Palace', mp: 29, w: 9, d: 11, l: 9, gf: 38, ga: 43, gd: '-5', pts: 38, form: ['D', 'W', 'D', 'D', 'L'] },
        { rank: 15, team: 'Everton FC', mp: 29, w: 9, d: 9, l: 11, gf: 33, ga: 39, gd: '-6', pts: 36, form: ['D', 'D', 'W', 'L', 'D'] },
        { rank: 16, team: 'Brentford FC', mp: 29, w: 9, d: 8, l: 12, gf: 43, ga: 49, gd: '-6', pts: 35, form: ['L', 'W', 'D', 'L', 'W'] },
        { rank: 17, team: 'Nottingham Forest', mp: 29, w: 9, d: 7, l: 13, gf: 42, ga: 51, gd: '-9', pts: 34, form: ['W', 'L', 'L', 'D', 'W'] },
        { rank: 18, team: 'Luton Town', mp: 29, w: 6, d: 8, l: 15, gf: 42, ga: 60, gd: '-18', pts: 26, form: ['L', 'D', 'L', 'L', 'D'] },
        { rank: 19, team: 'Burnley FC', mp: 29, w: 5, d: 9, l: 15, gf: 31, ga: 58, gd: '-27', pts: 24, form: ['D', 'W', 'D', 'L', 'L'] },
        { rank: 20, team: 'Sheffield United', mp: 29, w: 3, d: 7, l: 19, gf: 27, ga: 74, gd: '-47', pts: 16, form: ['L', 'L', 'D', 'L', 'L'] },
      ];

  const topScorers = isNpfl
    ? [
        { rank: 1, player: 'Chiamaka Madu', team: 'Enyimba FC', goals: 17 },
        { rank: 2, player: 'Kenechukwu Agu', team: 'Rangers International', goals: 15 },
        { rank: 3, player: 'Sikiru Alimi', team: 'Remo Stars', goals: 14 },
        { rank: 4, player: 'Nyima Nwagua', team: 'Rivers United', goals: 12 },
      ]
    : [
        { rank: 1, player: 'Erling Haaland', team: 'Manchester City', goals: 25 },
        { rank: 2, player: 'Mohamed Salah', team: 'Liverpool FC', goals: 20 },
        { rank: 3, player: 'Bukayo Saka', team: 'Arsenal FC', goals: 18 },
        { rank: 4, player: 'Ollie Watkins', team: 'Aston Villa', goals: 16 },
      ];

  return (
    <div className="space-y-8 theme-sports max-w-7xl mx-auto py-4">
      {/* Back Link & Header */}
      <div className="space-y-4 pb-6 border-b border-slate-200">
        <Link
          href="/live-scores"
          className="inline-flex items-center text-xs font-bold text-slate-600 hover:text-emerald-600 gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to LiveScores Match Center
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[#2A2E7F] text-white flex items-center justify-center font-black text-2xl shadow-lg border border-blue-900">
              <Trophy className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2 text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                <Flag className="w-3.5 h-3.5 text-[#D9541E]" /> {country}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">{leagueName}</h1>
            </div>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-black flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-emerald-600" /> LAKU MEDIA OFFICIAL STATS HUB
          </div>
        </div>
      </div>

      {/* Main Grid: Standings Table + Top Scorers Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Full 20-Team Standings Table (2 Columns Span) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart2 className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base font-black uppercase">OFFICIAL LEAGUE STANDINGS TABLE</h2>
              </div>
              <span className="text-xs font-mono text-slate-400">SEASON 2025/2026</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 font-black text-slate-900 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5 text-center">#</th>
                    <th className="p-3.5">Club / Team</th>
                    <th className="p-3.5 text-center">MP</th>
                    <th className="p-3.5 text-center">W</th>
                    <th className="p-3.5 text-center">D</th>
                    <th className="p-3.5 text-center">L</th>
                    <th className="p-3.5 text-center hidden sm:table-cell">GF:GA</th>
                    <th className="p-3.5 text-center">GD</th>
                    <th className="p-3.5 text-center font-black">PTS</th>
                    <th className="p-3.5 text-center hidden md:table-cell">Form</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-bold">
                  {standingsTable.map((row) => (
                    <tr
                      key={row.rank}
                      className={`hover:bg-slate-50 transition-colors ${
                        row.rank <= 3 ? 'bg-emerald-50/40' : row.rank >= 7 ? 'bg-rose-50/20' : ''
                      }`}
                    >
                      <td className="p-3.5 text-center font-mono text-slate-500 font-extrabold">{row.rank}</td>
                      <td className="p-3.5 font-extrabold text-slate-900 flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                          {row.team.substring(0, 1)}
                        </div>
                        <span>{row.team}</span>
                      </td>
                      <td className="p-3.5 text-center font-mono">{row.mp}</td>
                      <td className="p-3.5 text-center font-mono text-emerald-600">{row.w}</td>
                      <td className="p-3.5 text-center font-mono text-amber-600">{row.d}</td>
                      <td className="p-3.5 text-center font-mono text-rose-600">{row.l}</td>
                      <td className="p-3.5 text-center font-mono text-slate-500 hidden sm:table-cell">
                        {row.gf}:{row.ga}
                      </td>
                      <td className="p-3.5 text-center font-mono text-slate-900">{row.gd}</td>
                      <td className="p-3.5 text-center font-mono font-black text-[#2A2E7F] text-sm">{row.pts}</td>
                      <td className="p-3.5 text-center hidden md:table-cell">
                        <div className="flex items-center justify-center gap-1">
                          {row.form.map((f, i) => (
                            <span
                              key={i}
                              className={`w-4 h-4 rounded text-[9px] font-black flex items-center justify-center text-white ${
                                f === 'W' ? 'bg-emerald-600' : f === 'D' ? 'bg-amber-600' : 'bg-red-600'
                              }`}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar: Top Scorers Leaderboard */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-md space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-black uppercase text-white">TOP SCORERS LEADERBOARD</h3>
            </div>

            <div className="space-y-3">
              {topScorers.map((scorer) => (
                <div key={scorer.rank} className="p-3 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-mono font-black flex items-center justify-center text-xs">
                      #{scorer.rank}
                    </span>
                    <div>
                      <p className="font-extrabold text-white">{scorer.player}</p>
                      <p className="text-[10px] text-slate-400">{scorer.team}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-[#D9541E] text-white font-mono font-black text-xs">
                    {scorer.goals} Goals
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
