'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, ChevronRight } from 'lucide-react';

export function LiveMatchTicker() {
  const sampleMatches = [
    {
      id: 'm1',
      league: 'NPFL DERBY',
      homeTeam: 'Enyimba FC',
      awayTeam: 'Kano Pillars',
      homeScore: 2,
      awayScore: 1,
      status: 'FT',
      isLive: false,
    },
    {
      id: 'm2',
      league: 'PREMIER LEAGUE',
      homeTeam: 'Arsenal FC',
      awayTeam: 'Chelsea FC',
      homeScore: 1,
      awayScore: 0,
      status: "68'",
      isLive: true,
    },
    {
      id: 'm3',
      league: 'LA LIGA',
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeScore: null,
      awayScore: null,
      status: '20:00',
      isLive: false,
    },
    {
      id: 'm4',
      league: 'SUPER EAGLES',
      homeTeam: 'Nigeria',
      awayTeam: 'South Africa',
      homeScore: 3,
      awayScore: 1,
      status: 'FT',
      isLive: false,
    },
  ];

  return (
    <div className="bg-[#2A2E7F] text-white border-b border-slate-800 text-xs py-1.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Section: Live Score Ticker Label */}
        <div className="flex items-center space-x-3 shrink-0 mr-4">
          <span className="px-2 py-0.5 rounded bg-[#D9541E] text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1">
            <Activity className="w-3 h-3 animate-pulse" /> LIVE SCORES
          </span>
        </div>

        {/* Center Section: Horizontal Scrollable Fixture Pills */}
        <div className="flex items-center space-x-3 overflow-x-auto scrollbar-none py-0.5 font-bold text-[11px] flex-1">
          {sampleMatches.map((m) => (
            <Link
              key={m.id}
              href="/live-scores"
              prefetch={true}
              className="flex items-center space-x-2 bg-slate-900/80 hover:bg-[#D9541E] px-3 py-1 rounded-md border border-slate-700/60 shrink-0 transition-colors"
            >
              <span className="text-[9px] text-amber-400 uppercase tracking-widest font-mono">
                {m.league}
              </span>
              <span className="text-white font-extrabold">{m.homeTeam}</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-800 text-white font-mono text-[10px] border border-slate-700">
                {m.homeScore !== null ? `${m.homeScore} - ${m.awayScore}` : 'VS'}
              </span>
              <span className="text-white font-extrabold">{m.awayTeam}</span>
              <span
                className={`text-[9px] font-mono font-bold px-1 rounded ${
                  m.isLive ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-700 text-slate-300'
                }`}
              >
                {m.status}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Section: All Scores Link */}
        <Link
          href="/live-scores"
          prefetch={true}
          className="hidden md:flex items-center gap-1 text-[11px] font-extrabold text-[#D9541E] hover:text-white shrink-0 ml-4 transition-colors uppercase tracking-wider"
        >
          <span>All Matches</span> <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
