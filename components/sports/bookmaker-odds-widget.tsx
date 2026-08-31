'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, TrendingUp, ShieldCheck, Flame } from 'lucide-react';

interface MatchOddsItem {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  kickoffTime: string;
  homeOdds: string;
  drawOdds: string;
  awayOdds: string;
  featuredBookmaker: string;
  targetUrl: string;
}

export function BookmakerOddsWidget() {
  const [selectedBookmaker, setSelectedBookmaker] = useState<'bet9ja' | 'sportybet' | '1xbet'>('bet9ja');

  const ODDS_DATA: Record<string, MatchOddsItem[]> = {
    bet9ja: [
      {
        id: 'odd-1',
        homeTeam: 'Arsenal FC',
        awayTeam: 'Chelsea FC',
        league: 'English Premier League',
        kickoffTime: 'Tomorrow 20:00',
        homeOdds: '1.85',
        drawOdds: '3.60',
        awayOdds: '4.20',
        featuredBookmaker: 'BET9JA',
        targetUrl: 'https://www.bet9ja.com',
      },
      {
        id: 'odd-2',
        homeTeam: 'Enyimba FC',
        awayTeam: 'Kano Pillars',
        league: 'NPFL Nigeria',
        kickoffTime: 'Sunday 16:00',
        homeOdds: '2.10',
        drawOdds: '3.10',
        awayOdds: '3.50',
        featuredBookmaker: 'BET9JA',
        targetUrl: 'https://www.bet9ja.com',
      },
      {
        id: 'odd-3',
        homeTeam: 'Real Madrid',
        awayTeam: 'FC Barcelona',
        league: 'Spanish La Liga',
        kickoffTime: 'Sunday 21:00',
        homeOdds: '2.25',
        drawOdds: '3.40',
        awayOdds: '3.10',
        featuredBookmaker: 'BET9JA',
        targetUrl: 'https://www.bet9ja.com',
      },
    ],
    sportybet: [
      {
        id: 'odd-1',
        homeTeam: 'Arsenal FC',
        awayTeam: 'Chelsea FC',
        league: 'English Premier League',
        kickoffTime: 'Tomorrow 20:00',
        homeOdds: '1.88',
        drawOdds: '3.65',
        awayOdds: '4.15',
        featuredBookmaker: 'SPORTYBET',
        targetUrl: 'https://www.sportybet.com',
      },
      {
        id: 'odd-2',
        homeTeam: 'Enyimba FC',
        awayTeam: 'Kano Pillars',
        league: 'NPFL Nigeria',
        kickoffTime: 'Sunday 16:00',
        homeOdds: '2.15',
        drawOdds: '3.15',
        awayOdds: '3.45',
        featuredBookmaker: 'SPORTYBET',
        targetUrl: 'https://www.sportybet.com',
      },
      {
        id: 'odd-3',
        homeTeam: 'Real Madrid',
        awayTeam: 'FC Barcelona',
        league: 'Spanish La Liga',
        kickoffTime: 'Sunday 21:00',
        homeOdds: '2.30',
        drawOdds: '3.45',
        awayOdds: '3.05',
        featuredBookmaker: 'SPORTYBET',
        targetUrl: 'https://www.sportybet.com',
      },
    ],
    '1xbet': [
      {
        id: 'odd-1',
        homeTeam: 'Arsenal FC',
        awayTeam: 'Chelsea FC',
        league: 'English Premier League',
        kickoffTime: 'Tomorrow 20:00',
        homeOdds: '1.91',
        drawOdds: '3.70',
        awayOdds: '4.25',
        featuredBookmaker: '1XBET',
        targetUrl: 'https://1xbet.com',
      },
      {
        id: 'odd-2',
        homeTeam: 'Enyimba FC',
        awayTeam: 'Kano Pillars',
        league: 'NPFL Nigeria',
        kickoffTime: 'Sunday 16:00',
        homeOdds: '2.20',
        drawOdds: '3.20',
        awayOdds: '3.55',
        featuredBookmaker: '1XBET',
        targetUrl: 'https://1xbet.com',
      },
      {
        id: 'odd-3',
        homeTeam: 'Real Madrid',
        awayTeam: 'FC Barcelona',
        league: 'Spanish La Liga',
        kickoffTime: 'Sunday 21:00',
        homeOdds: '2.32',
        drawOdds: '3.50',
        awayOdds: '3.12',
        featuredBookmaker: '1XBET',
        targetUrl: 'https://1xbet.com',
      },
    ],
  };

  const currentList = ODDS_DATA[selectedBookmaker];

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 my-8 select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 inline-flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> LIVE BOOKMAKER ODDS COMPARISON
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            Marquee Match Odds & Bet Market Stream
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Real-time 1X2 market odds across verified betting partners.
          </p>
        </div>

        {/* Bookmaker Switcher */}
        <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setSelectedBookmaker('bet9ja')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
              selectedBookmaker === 'bet9ja' ? 'bg-[#10B981] text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            BET9JA
          </button>
          <button
            onClick={() => setSelectedBookmaker('sportybet')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
              selectedBookmaker === 'sportybet' ? 'bg-[#D9541E] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            SPORTYBET
          </button>
          <button
            onClick={() => setSelectedBookmaker('1xbet')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
              selectedBookmaker === '1xbet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            1XBET
          </button>
        </div>
      </div>

      {/* Odds Cards Table */}
      <div className="space-y-3">
        {currentList.map((m) => (
          <div
            key={m.id}
            className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-emerald-500/50 transition-colors"
          >
            <div className="space-y-1">
              <span className="text-[10px] text-amber-400 font-black uppercase tracking-wider font-mono">
                {m.league} • {m.kickoffTime}
              </span>
              <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>{m.homeTeam}</span>
                <span className="text-xs text-slate-500 font-bold">vs</span>
                <span>{m.awayTeam}</span>
              </h4>
            </div>

            {/* 1X2 Odds Buttons */}
            <div className="flex items-center space-x-2.5">
              <a
                href={m.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition-colors"
              >
                <span className="text-[9px] text-slate-400 font-bold block uppercase">1 ({m.homeTeam.split(' ')[0]})</span>
                <span className="text-sm font-mono font-black text-amber-400">{m.homeOdds}</span>
              </a>

              <a
                href={m.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition-colors"
              >
                <span className="text-[9px] text-slate-400 font-bold block uppercase">X (DRAW)</span>
                <span className="text-sm font-mono font-black text-white">{m.drawOdds}</span>
              </a>

              <a
                href={m.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition-colors"
              >
                <span className="text-[9px] text-slate-400 font-bold block uppercase">2 ({m.awayTeam.split(' ')[0]})</span>
                <span className="text-sm font-mono font-black text-emerald-400">{m.awayOdds}</span>
              </a>

              <a
                href={m.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-[#10B981] hover:bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider hidden sm:flex items-center gap-1 shadow-md shrink-0"
              >
                <span>BET NOW</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
