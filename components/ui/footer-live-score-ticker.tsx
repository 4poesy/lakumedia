'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Activity, ChevronRight } from 'lucide-react';
import { MatchTickerFixture } from '@/app/api/fixtures/route';

export function FooterLiveScoreTicker() {
  const [fixtures, setFixtures] = useState<MatchTickerFixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileIndex, setMobileIndex] = useState(0);

  const fetchFixtures = useCallback(async () => {
    try {
      const res = await fetch('/api/fixtures');
      if (res.ok) {
        const data = await res.json();
        if (data.fixtures && Array.isArray(data.fixtures)) {
          // Strict validation: Only keep fixtures that have both home and away teams
          const valid = data.fixtures.filter(
            (f: any) => f && f.homeTeam && f.awayTeam && f.homeTeam.trim() !== '' && f.awayTeam.trim() !== ''
          );
          setFixtures(valid);
        }
      }
    } catch (err) {
      // Keep existing fixtures on network error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFixtures();
    const interval = setInterval(fetchFixtures, 60000);
    return () => clearInterval(interval);
  }, [fetchFixtures]);

  // Mobile Auto-rotate ticker index every 4 seconds
  useEffect(() => {
    if (fixtures.length <= 1) return;
    const mobInterval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % fixtures.length);
    }, 4000);
    return () => clearInterval(mobInterval);
  }, [fixtures.length]);

  const formatKickoff = (isoString: string): string => {
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return '16:00';
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    } catch {
      return '16:00';
    }
  };

  const renderScoreOrTime = (m: MatchTickerFixture) => {
    if (m.status === 'scheduled') {
      return (
        <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[11px] font-bold border border-slate-700 shrink-0">
          {formatKickoff(m.kickoffAt)}
        </span>
      );
    }

    if (m.status === 'live' || m.status === 'finished') {
      const hasHome = typeof m.homeScore === 'number' && !isNaN(m.homeScore);
      const hasAway = typeof m.awayScore === 'number' && !isNaN(m.awayScore);
      const scoreText = hasHome && hasAway ? `${m.homeScore} - ${m.awayScore}` : hasHome ? `${m.homeScore} - 0` : 'vs';

      return (
        <span className="px-2 py-0.5 rounded bg-slate-800 text-white font-mono text-xs font-black border border-slate-700 shrink-0">
          {scoreText}
        </span>
      );
    }

    return (
      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px] font-bold shrink-0">
        {m.status ? m.status.toUpperCase() : 'SCHED'}
      </span>
    );
  };

  const renderStatusBadge = (m: MatchTickerFixture) => {
    if (m.status === 'live') {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-600 text-white font-mono text-[9px] font-black uppercase tracking-wider animate-pulse shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          {m.matchMinute ? `${m.matchMinute}'` : 'LIVE'}
        </span>
      );
    }
    if (m.status === 'finished') {
      return (
        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[9px] font-bold uppercase tracking-wider shrink-0">
          FT
        </span>
      );
    }
    return (
      <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono text-[9px] font-bold uppercase tracking-wider shrink-0">
        UPCOMING
      </span>
    );
  };

  const tickerItems = fixtures.length > 0 ? [...fixtures, ...fixtures, ...fixtures] : [];

  return (
    <aside className="fixed bottom-0 inset-x-0 z-40 bg-slate-950 border-t border-slate-800 text-white py-2 px-4 shadow-2xl select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Fixed Badge */}
        <div className="flex items-center space-x-2 shrink-0 pr-3 z-10 bg-slate-950">
          <Link
            href="/live-scores"
            className="px-2.5 py-1 rounded-lg bg-[#D9541E] hover:bg-[#b84315] text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow transition-colors"
          >
            <Activity className="w-3.5 h-3.5 text-white animate-pulse" />
            <span className="hidden sm:inline">LIVE SCORES</span>
            <span className="sm:hidden">SCORES</span>
          </Link>
        </div>

        {/* Center: Desktop Horizontal Marquee Strip */}
        <div className="hidden md:block overflow-hidden flex-1 relative">
          {loading ? (
            <div className="flex items-center space-x-4 py-1 text-slate-400 text-xs font-bold animate-pulse">
              <span>Fetching verified live match scoreboard…</span>
            </div>
          ) : fixtures.length > 0 ? (
            <div className="animate-ticker space-x-3 flex items-center py-0.5">
              {tickerItems.map((m, idx) => (
                <Link
                  key={`${m.id}-${idx}`}
                  href="/live-scores"
                  className="flex items-center space-x-2.5 bg-slate-900/90 hover:bg-[#2A2E7F] px-3.5 py-1 rounded-xl border border-slate-800 hover:border-slate-700 shrink-0 transition-colors"
                >
                  <span className="text-[9px] text-amber-400 uppercase tracking-widest font-mono font-bold truncate max-w-[100px]">
                    {m.leagueName}
                  </span>

                  <span className="text-white text-xs font-extrabold truncate max-w-[120px]">
                    {m.homeTeam}
                  </span>

                  {renderScoreOrTime(m)}

                  <span className="text-white text-xs font-extrabold truncate max-w-[120px]">
                    {m.awayTeam}
                  </span>

                  {renderStatusBadge(m)}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-slate-400 text-xs font-medium py-1">
              No live fixtures currently in progress. Check upcoming match center schedules.
            </div>
          )}
        </div>

        {/* Center: Mobile Horizontal Scroll Ticker Strip */}
        <div className="md:hidden flex-1 overflow-x-auto no-scrollbar scroll-smooth px-2 flex items-center space-x-2 shrink border-x border-slate-900" style={{ WebkitOverflowScrolling: 'touch' }}>
          {loading ? (
            <div className="text-[11px] text-slate-400 font-bold animate-pulse text-center w-full">
              Loading scores…
            </div>
          ) : fixtures.length > 0 ? (
            fixtures.map((m, idx) => (
              <Link
                key={`mob-tick-${m.id}-${idx}`}
                href="/live-scores"
                className="flex items-center space-x-2 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 shrink-0 text-xs shadow-sm hover:border-[#D9541E] transition-colors"
              >
                <span className="text-[9px] text-amber-400 uppercase tracking-widest font-mono font-bold truncate max-w-[70px]">
                  {m.leagueName}
                </span>

                <span className="text-white font-black text-xs truncate max-w-[85px]">
                  {m.homeTeam}
                </span>

                {renderScoreOrTime(m)}

                <span className="text-white font-black text-xs truncate max-w-[85px]">
                  {m.awayTeam}
                </span>

                {renderStatusBadge(m)}
              </Link>
            ))
          ) : (
            <div className="text-[11px] text-slate-400 text-center w-full">
              No active matches right now
            </div>
          )}
        </div>

        {/* Right Action: Match Center Link */}
        <div className="flex items-center space-x-1 shrink-0 pl-3 z-10 bg-slate-950">
          <Link
            href="/live-scores"
            className="hidden sm:flex items-center gap-1 text-[11px] font-black text-amber-400 hover:text-white uppercase tracking-wider transition-colors"
          >
            <span>Full Center</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </aside>
  );
}
