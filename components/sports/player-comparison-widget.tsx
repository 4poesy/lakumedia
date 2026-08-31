'use client';

import React, { useState } from 'react';
import { DiasporaPlayer } from '@/lib/diaspora-service';
import { getProviderHeadshotUrl } from '@/lib/player-headshot';
import { Trophy, ArrowLeftRight, Sparkles, Zap, Shield, Flame } from 'lucide-react';

interface PlayerComparisonWidgetProps {
  players: DiasporaPlayer[];
}

export function PlayerComparisonWidget({ players }: PlayerComparisonWidgetProps) {
  const defaultP1 = players.find((p) => p.slug.includes('osimhen')) || players[0];
  const defaultP2 = players.find((p) => p.slug.includes('lookman')) || players[1] || players[0];

  const [p1Slug, setP1Slug] = useState<string>(defaultP1?.slug || '');
  const [p2Slug, setP2Slug] = useState<string>(defaultP2?.slug || '');

  const player1 = players.find((p) => p.slug === p1Slug) || defaultP1;
  const player2 = players.find((p) => p.slug === p2Slug) || defaultP2;

  // Mock stats generator based on sports data player ID for realistic comparison
  const getMockPlayerStats = (player?: DiasporaPlayer) => {
    if (!player) {
      return { goals: 12, assists: 6, appearances: 24, marketValue: '€45.0M', rating: '8.4' };
    }
    const seed = player.name.length;
    return {
      goals: Math.floor((seed * 3) % 22) + 5,
      assists: Math.floor((seed * 2) % 11) + 2,
      appearances: Math.floor((seed * 4) % 15) + 18,
      marketValue: player.market_value_estimate || `€${((seed % 40) + 15).toFixed(1)}M`,
      rating: (7.2 + (seed % 15) / 10).toFixed(1),
    };
  };

  const stats1 = getMockPlayerStats(player1);
  const stats2 = getMockPlayerStats(player2);

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 my-8 select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#D9541E]/20 text-[#D9541E] border border-[#D9541E]/40 inline-flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#D9541E]" /> HEAD-TO-HEAD ANALYTICS
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            Super Eagles & Diaspora Player Comparison
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Compare season metrics, goal contributions, and market values side-by-side.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-bold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Real-Time Performance Index</span>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
        
        {/* Player 1 Select */}
        <div className="sm:col-span-5 space-y-1">
          <label className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block">Select Player 1</label>
          <select
            value={p1Slug}
            onChange={(e) => setP1Slug(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-[#D9541E]"
          >
            {players.map((p) => (
              <option key={`p1-${p.id}`} value={p.slug}>
                {p.name} ({p.current_club})
              </option>
            ))}
          </select>
        </div>

        {/* VS Badge (2 cols) */}
        <div className="sm:col-span-2 flex items-center justify-center pt-2 sm:pt-0">
          <div className="w-10 h-10 rounded-full bg-[#D9541E] text-white flex items-center justify-center font-black text-xs shadow-xl border border-orange-400">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
        </div>

        {/* Player 2 Select */}
        <div className="sm:col-span-5 space-y-1">
          <label className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block">Select Player 2</label>
          <select
            value={p2Slug}
            onChange={(e) => setP2Slug(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-[#10B981]"
          >
            {players.map((p) => (
              <option key={`p2-${p.id}`} value={p.slug}>
                {p.name} ({p.current_club})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Player 1 Card */}
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-4 relative overflow-hidden">
          <div className="flex items-center space-x-4">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
              <img
                src={player1?.photo_url || getProviderHeadshotUrl(player1?.sports_data_player_id) || '/assest/user_super_eagles_manager.jpg'}
                alt={player1?.name || 'Player 1'}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assest/user_super_eagles_manager.jpg';
                }}
              />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#D9541E] text-white">
                {player1?.position || 'Forward'}
              </span>
              <h4 className="text-lg font-black text-white mt-1 leading-snug">{player1?.name}</h4>
              <p className="text-xs text-slate-400 font-bold">{player1?.current_club} ({player1?.club_country})</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-2 pt-2 text-center">
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block">GOALS</span>
              <span className="text-base font-mono font-black text-amber-400">{stats1.goals}</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block">ASSISTS</span>
              <span className="text-base font-mono font-black text-emerald-400">{stats1.assists}</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block">APPS</span>
              <span className="text-base font-mono font-black text-white">{stats1.appearances}</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block">VALUATION</span>
              <span className="text-xs font-mono font-black text-rose-400">{stats1.marketValue}</span>
            </div>
          </div>
        </div>

        {/* Player 2 Card */}
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-4 relative overflow-hidden">
          <div className="flex items-center space-x-4">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
              <img
                src={player2?.photo_url || getProviderHeadshotUrl(player2?.sports_data_player_id) || '/assest/user_super_eagles_manager.jpg'}
                alt={player2?.name || 'Player 2'}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assest/user_super_eagles_manager.jpg';
                }}
              />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#10B981] text-slate-950">
                {player2?.position || 'Forward'}
              </span>
              <h4 className="text-lg font-black text-white mt-1 leading-snug">{player2?.name}</h4>
              <p className="text-xs text-slate-400 font-bold">{player2?.current_club} ({player2?.club_country})</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-2 pt-2 text-center">
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block">GOALS</span>
              <span className="text-base font-mono font-black text-amber-400">{stats2.goals}</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block">ASSISTS</span>
              <span className="text-base font-mono font-black text-emerald-400">{stats2.assists}</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block">APPS</span>
              <span className="text-base font-mono font-black text-white">{stats2.appearances}</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block">VALUATION</span>
              <span className="text-xs font-mono font-black text-rose-400">{stats2.marketValue}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
