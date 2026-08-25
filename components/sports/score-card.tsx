import React from 'react';
import { Activity, Clock } from 'lucide-react';
import { FixtureStatus } from '@/lib/types/supabase';

interface ScoreCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number | null;
  awayScore?: number | null;
  kickoffAt: string;
  status: FixtureStatus;
  leagueName: string;
  homeLogo?: string | null;
  awayLogo?: string | null;
}

export function ScoreCard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  kickoffAt,
  status,
  leagueName,
  homeLogo,
  awayLogo,
}: ScoreCardProps) {
  const isLive = status === 'live';
  const isFinished = status === 'finished';

  const formattedDate = new Date(kickoffAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="glass-panel rounded-xl p-4 border border-slate-800 hover:border-emerald-500/40 transition-all duration-200 group">
      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-3 border-b border-slate-800/80 pb-2">
        <span className="text-emerald-400 font-bold uppercase tracking-wider">{leagueName}</span>
        <div className="flex items-center space-x-1.5">
          {isLive && (
            <span className="flex items-center gap-1 text-rose-400 font-bold px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-[10px] animate-pulse">
              <Activity className="w-3 h-3" /> LIVE
            </span>
          )}
          {isFinished && <span className="text-slate-400 bg-slate-800 px-2 py-0.5 rounded text-[10px]">FT</span>}
          {!isLive && !isFinished && (
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3 text-slate-400" /> {formattedDate}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 overflow-hidden">
              {homeLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={homeLogo} alt={homeTeam} className="w-full h-full object-cover" />
              ) : (
                homeTeam.substring(0, 2).toUpperCase()
              )}
            </div>
            <span className="font-semibold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors">
              {homeTeam}
            </span>
          </div>
          <span className="font-mono text-base font-bold text-white">
            {homeScore !== null && homeScore !== undefined ? homeScore : '-'}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 overflow-hidden">
              {awayLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={awayLogo} alt={awayTeam} className="w-full h-full object-cover" />
              ) : (
                awayTeam.substring(0, 2).toUpperCase()
              )}
            </div>
            <span className="font-semibold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors">
              {awayTeam}
            </span>
          </div>
          <span className="font-mono text-base font-bold text-white">
            {awayScore !== null && awayScore !== undefined ? awayScore : '-'}
          </span>
        </div>
      </div>
    </div>
  );
}
