'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trophy, CheckCircle2, XCircle, MinusCircle, ChevronRight, Shield } from 'lucide-react';

interface TeamFormItem {
  rank: number;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
  points: number;
  formStreak: Array<'W' | 'D' | 'L'>;
}

export function LeagueFormGuide() {
  const [activeLeague, setActiveLeague] = useState<'npfl' | 'epl' | 'laliga'>('npfl');

  const LEAGUE_TABLES: Record<string, TeamFormItem[]> = {
    npfl: [
      { rank: 1, teamName: 'Enyimba FC', played: 28, won: 17, drawn: 6, lost: 5, gd: 24, points: 57, formStreak: ['W', 'W', 'W', 'D', 'W'] },
      { rank: 2, teamName: 'Kano Pillars', played: 28, won: 16, drawn: 5, lost: 7, gd: 18, points: 53, formStreak: ['W', 'D', 'W', 'L', 'W'] },
      { rank: 3, teamName: 'Remo Stars FC', played: 28, won: 15, drawn: 7, lost: 6, gd: 15, points: 52, formStreak: ['D', 'W', 'W', 'W', 'L'] },
      { rank: 4, teamName: 'Rivers United', played: 28, won: 14, drawn: 8, lost: 6, gd: 12, points: 50, formStreak: ['W', 'L', 'W', 'D', 'W'] },
      { rank: 5, teamName: 'Enugu Rangers', played: 28, won: 13, drawn: 9, lost: 6, gd: 10, points: 48, formStreak: ['L', 'W', 'D', 'W', 'W'] },
    ],
    epl: [
      { rank: 1, teamName: 'Arsenal FC', played: 29, won: 20, drawn: 5, lost: 4, gd: 38, points: 65, formStreak: ['W', 'W', 'W', 'W', 'D'] },
      { rank: 2, teamName: 'Manchester City', played: 29, won: 19, drawn: 6, lost: 4, gd: 35, points: 63, formStreak: ['W', 'W', 'D', 'W', 'W'] },
      { rank: 3, teamName: 'Liverpool FC', played: 29, won: 18, drawn: 7, lost: 4, gd: 30, points: 61, formStreak: ['W', 'D', 'W', 'L', 'W'] },
      { rank: 4, teamName: 'Chelsea FC', played: 29, won: 15, drawn: 8, lost: 6, gd: 18, points: 53, formStreak: ['D', 'W', 'W', 'W', 'L'] },
      { rank: 5, teamName: 'Aston Villa', played: 29, won: 15, drawn: 6, lost: 8, gd: 14, points: 51, formStreak: ['W', 'L', 'D', 'W', 'W'] },
    ],
    laliga: [
      { rank: 1, teamName: 'Real Madrid', played: 29, won: 22, drawn: 4, lost: 3, gd: 42, points: 70, formStreak: ['W', 'W', 'W', 'D', 'W'] },
      { rank: 2, teamName: 'FC Barcelona', played: 29, won: 20, drawn: 5, lost: 4, gd: 36, points: 65, formStreak: ['W', 'D', 'W', 'W', 'L'] },
      { rank: 3, teamName: 'Atletico Madrid', played: 29, won: 17, drawn: 7, lost: 5, gd: 22, points: 58, formStreak: ['W', 'W', 'L', 'D', 'W'] },
      { rank: 4, teamName: 'Athletic Bilbao', played: 29, won: 15, drawn: 8, lost: 6, gd: 16, points: 53, formStreak: ['D', 'W',-[#10B981], 'W', 'L'] },
      { rank: 5, teamName: 'Girona FC', played: 29, won: 15, drawn: 5, lost: 9, gd: 12, points: 50, formStreak: ['L', 'W', 'D', 'W', 'W'] },
    ],
  };

  const currentTable = LEAGUE_TABLES[activeLeague];

  const renderFormBadge = (type: 'W' | 'D' | 'L', idx: number) => {
    if (type === 'W') {
      return (
        <span key={idx} className="w-5 h-5 rounded bg-emerald-600 text-white font-mono font-black text-[10px] flex items-center justify-center shadow">
          W
        </span>
      );
    }
    if (type === 'D') {
      return (
        <span key={idx} className="w-5 h-5 rounded bg-amber-600 text-white font-mono font-black text-[10px] flex items-center justify-center shadow">
          D
        </span>
      );
    }
    return (
      <span key={idx} className="w-5 h-5 rounded bg-rose-600 text-white font-mono font-black text-[10px] flex items-center justify-center shadow">
        L
      </span>
    );
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 my-8 select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#2A2E7F] text-[#10B981] border border-slate-700 inline-flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" /> LEAGUE FORM & STREAK ANALYZER
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            Top Clubs 5-Match Form Guide
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Visual win-draw-loss streaks and goal difference standings.
          </p>
        </div>

        {/* League Switcher */}
        <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveLeague('npfl')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
              activeLeague === 'npfl' ? 'bg-[#D9541E] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            NPFL NIGERIA
          </button>
          <button
            onClick={() => setActiveLeague('epl')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
              activeLeague === 'epl' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            PREMIER LEAGUE
          </button>
          <button
            onClick={() => setActiveLeague('laliga')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
              activeLeague === 'laliga' ? 'bg-[#10B981] text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            LA LIGA
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-xs font-medium">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase font-black text-[10px] tracking-wider bg-slate-950">
              <th className="py-3 px-3">#</th>
              <th className="py-3 px-3">Club</th>
              <th className="py-3 px-2 text-center">P</th>
              <th className="py-3 px-2 text-center">GD</th>
              <th className="py-3 px-2 text-center">PTS</th>
              <th className="py-3 px-3 text-center">Last 5 Matches</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {currentTable.map((row) => (
              <tr key={row.rank} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3 font-mono font-black text-amber-400">{row.rank}</td>
                <td className="py-3 px-3 font-black text-white">{row.teamName}</td>
                <td className="py-3 px-2 text-center font-mono text-slate-300 font-bold">{row.played}</td>
                <td className="py-3 px-2 text-center font-mono font-bold text-emerald-400">+{row.gd}</td>
                <td className="py-3 px-2 text-center font-mono font-black text-white text-sm">{row.points}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center justify-center space-x-1">
                    {row.formStreak.map((st, i) => renderFormBadge(st, i))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Link */}
      <div className="pt-2 flex justify-end">
        <Link
          href="/live-scores"
          className="text-xs font-black uppercase text-amber-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          <span>View Full League Tables & Standings</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
