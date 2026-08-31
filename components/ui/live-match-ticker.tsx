'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, ChevronRight, Film } from 'lucide-react';
import { MatchTickerFixture } from '@/app/api/fixtures/route';

export function LiveMatchTicker() {
  const pathname = usePathname();
  const isMultimedia = pathname.startsWith('/multimedia');
  const [fixtures, setFixtures] = useState<MatchTickerFixture[]>([]);

  const fetchFixtures = useCallback(async () => {
    try {
      const res = await fetch('/api/fixtures');
      if (res.ok) {
        const data = await res.json();
        if (data.fixtures && Array.isArray(data.fixtures)) {
          setFixtures(data.fixtures);
        }
      }
    } catch {
      // Retain previous state on fetch error
    }
  }, []);

  useEffect(() => {
    if (!isMultimedia) {
      fetchFixtures();
      const interval = setInterval(fetchFixtures, 60000);
      return () => clearInterval(interval);
    }
  }, [isMultimedia, fetchFixtures]);

  const studioNewsItems = [
    {
      id: 'sn1',
      badge: 'NEW MOVIE',
      title: 'Giants of Africa: Feature Cinema Documentary Now Streaming in 4K',
      slug: 'giants-of-africa-nigerian-football',
    },
    {
      id: 'sn2',
      badge: 'LIVE CONCERT',
      title: 'Lagos International Afrobeats Live Stream Event',
      slug: 'live',
    },
    {
      id: 'sn3',
      badge: 'IN PRODUCTION',
      title: 'Lagos City Thriller 8K Feature Film Shot on ARRI Rigs',
      slug: 'portfolio',
    },
    {
      id: 'sn4',
      badge: 'STUDIO BLOG',
      title: 'Behind the Scenes: How Laku Media Deploys OB Van Satellite Uplinks',
      slug: 'about',
    },
    {
      id: 'sn5',
      badge: '24/7 RADIO',
      title: 'Laku Media Sports & Entertainment Podcast Live Stream',
      slug: 'services',
    },
  ];

  const formatKickoff = (isoString: string): string => {
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return 'Scheduled';
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    } catch {
      return 'Scheduled';
    }
  };

  const tickerMatches = fixtures.length > 0 ? [...fixtures, ...fixtures, ...fixtures] : [];
  const tickerStudioNews = [...studioNewsItems, ...studioNewsItems, ...studioNewsItems];

  if (isMultimedia) {
    return (
      <div className="bg-[#090A0F] text-white border-b border-slate-800 text-xs py-1.5 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 shrink-0 pr-4 bg-[#090A0F] z-10">
            <span className="px-2.5 py-1 rounded bg-[#10B981] text-slate-950 font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Film className="w-3.5 h-3.5" /> STUDIO HEADLINES
            </span>
          </div>

          <div className="overflow-hidden flex-1 relative">
            <div className="animate-ticker space-x-3 flex items-center py-0.5">
              {tickerStudioNews.map((news, idx) => (
                <Link
                  key={`${news.id}-${idx}`}
                  href={`/multimedia/${news.slug}`}
                  prefetch={true}
                  className="flex items-center space-x-2 bg-slate-950 hover:bg-[#2A2E7F] px-3 py-1 rounded-md border border-slate-800 shrink-0 transition-colors"
                >
                  <span className="text-[9px] text-[#10B981] uppercase tracking-widest font-mono font-extrabold">
                    {news.badge}
                  </span>
                  <span className="text-white font-extrabold text-xs">{news.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/multimedia/services"
            prefetch={true}
            className="hidden md:flex items-center gap-1 text-[11px] font-extrabold text-[#D9541E] hover:text-white shrink-0 pl-4 bg-[#090A0F] z-10 transition-colors uppercase tracking-wider"
          >
            <span>Studio Services</span> <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#2A2E7F] text-white border-b border-slate-800 text-xs py-1.5 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 shrink-0 pr-4 bg-[#2A2E7F] z-10">
          <span className="px-2.5 py-1 rounded bg-[#D9541E] text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> LIVE SCORES
          </span>
        </div>

        <div className="overflow-hidden flex-1 relative">
          {fixtures.length > 0 ? (
            <div className="animate-ticker space-x-3 flex items-center py-0.5">
              {tickerMatches.map((m, idx) => (
                <Link
                  key={`${m.id}-${idx}`}
                  href="/live-scores"
                  prefetch={true}
                  className="flex items-center space-x-2 bg-slate-900 hover:bg-[#D9541E] px-3 py-1 rounded-md border border-slate-700/80 shrink-0 transition-colors"
                >
                  <span className="text-[9px] text-amber-400 uppercase tracking-widest font-mono">
                    {m.leagueName}
                  </span>
                  <span className="text-white font-extrabold">{m.homeTeam}</span>
                  
                  {m.status === 'scheduled' ? (
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-amber-300 font-mono text-[10px] border border-slate-700 font-bold">
                      {formatKickoff(m.kickoffAt)}
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-white font-mono text-[10px] border border-slate-700 font-bold">
                      {m.homeScore !== null && m.homeScore !== undefined ? m.homeScore : '—'} - {m.awayScore !== null && m.awayScore !== undefined ? m.awayScore : '—'}
                    </span>
                  )}

                  <span className="text-white font-extrabold">{m.awayTeam}</span>
                  
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 rounded ${
                      m.status === 'live'
                        ? 'bg-rose-600 text-white animate-pulse'
                        : m.status === 'finished'
                        ? 'bg-slate-700 text-slate-200'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {m.status === 'live' ? (m.matchMinute ? `${m.matchMinute}'` : 'LIVE') : m.status === 'finished' ? 'FT' : 'SCHED'}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-slate-300 text-xs font-semibold py-0.5">
              Live score center active. Connecting to database fixtures…
            </div>
          )}
        </div>

        <Link
          href="/live-scores"
          prefetch={true}
          className="hidden md:flex items-center gap-1 text-[11px] font-extrabold text-[#D9541E] hover:text-white shrink-0 pl-4 bg-[#2A2E7F] z-10 transition-colors uppercase tracking-wider"
        >
          <span>All Matches</span> <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
