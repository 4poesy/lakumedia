'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Activity, Calendar, Star, ChevronDown, ChevronUp, Search, Flame, ShieldAlert, Award, ArrowRight } from 'lucide-react';

export interface MatchFixtureItem {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number | null;
  awayScore?: number | null;
  kickoffAt: string;
  status: 'live' | 'finished' | 'scheduled' | 'postponed';
  leagueName: string;
  leagueSlug?: string;
  countryFlag?: string;
  matchMinute?: string;
  stadium?: string;
  goals?: Array<{ minute: number; player: string; team: 'home' | 'away' }>;
  cards?: Array<{ minute: number; player: string; team: 'home' | 'away'; type: 'yellow' | 'red' }>;
}

interface LiveScoreCenterProps {
  initialFixtures: MatchFixtureItem[];
}

export function LiveScoreCenter({ initialFixtures }: LiveScoreCenterProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'finished' | 'scheduled' | 'favorites'>('all');
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<'yesterday' | 'today' | 'tomorrow'>('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Default rich match fixtures if database feeds are initializing
  const demoFixtures: MatchFixtureItem[] = [
    {
      id: 'fix-npfl-1',
      homeTeam: 'Enyimba FC',
      awayTeam: 'Kano Pillars',
      homeScore: 2,
      awayScore: 1,
      kickoffAt: new Date().toISOString(),
      status: 'live',
      matchMinute: '84',
      leagueName: 'Nigeria Premier Football League (NPFL)',
      leagueSlug: 'npfl',
      countryFlag: '🇳🇬',
      stadium: 'Enyimba International Stadium, Aba',
      goals: [
        { minute: 34, player: 'Victor Mbaoma', team: 'home' },
        { minute: 67, player: 'Chiamaka Madu', team: 'away' },
        { minute: 82, player: 'Austin Oladapo', team: 'home' },
      ],
      cards: [
        { minute: 42, player: 'Uche Onwuasonanya', team: 'away', type: 'yellow' },
        { minute: 90, player: 'Ifeanyi Anaemena', team: 'home', type: 'yellow' },
      ],
    },
    {
      id: 'fix-npfl-2',
      homeTeam: 'Rangers International',
      awayTeam: 'Remo Stars',
      homeScore: 1,
      awayScore: 0,
      kickoffAt: new Date().toISOString(),
      status: 'live',
      matchMinute: '62',
      leagueName: 'Nigeria Premier Football League (NPFL)',
      leagueSlug: 'npfl',
      countryFlag: '🇳🇬',
      stadium: 'Nnamdi Azikiwe Stadium, Enugu',
      goals: [{ minute: 28, player: 'Kenechukwu Agu', team: 'home' }],
    },
    {
      id: 'fix-epl-1',
      homeTeam: 'Arsenal FC',
      awayTeam: 'Chelsea FC',
      homeScore: 3,
      awayScore: 1,
      kickoffAt: new Date(Date.now() - 7200000).toISOString(),
      status: 'finished',
      leagueName: 'English Premier League (EPL)',
      leagueSlug: 'epl',
      countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      stadium: 'Emirates Stadium, London',
      goals: [
        { minute: 14, player: 'Bukayo Saka', team: 'home' },
        { minute: 38, player: 'Gabriel Martinelli', team: 'home' },
        { minute: 55, player: 'Cole Palmer', team: 'away' },
        { minute: 78, player: 'Declan Rice', team: 'home' },
      ],
    },
    {
      id: 'fix-epl-2',
      homeTeam: 'Manchester City',
      awayTeam: 'Liverpool FC',
      homeScore: null,
      awayScore: null,
      kickoffAt: new Date(Date.now() + 3600000 * 3).toISOString(),
      status: 'scheduled',
      leagueName: 'English Premier League (EPL)',
      leagueSlug: 'epl',
      countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      stadium: 'Etihad Stadium, Manchester',
    },
    {
      id: 'fix-ucl-1',
      homeTeam: 'Real Madrid',
      awayTeam: 'FC Bayern Munich',
      homeScore: 2,
      awayScore: 2,
      kickoffAt: new Date(Date.now() - 14400000).toISOString(),
      status: 'finished',
      leagueName: 'UEFA Champions League',
      leagueSlug: 'champions-league',
      countryFlag: '🇪🇺',
      stadium: 'Santiago Bernabéu, Madrid',
      goals: [
        { minute: 21, player: 'Harry Kane', team: 'away' },
        { minute: 49, player: 'Vinícius Júnior', team: 'home' },
        { minute: 71, player: 'Jamal Musiala', team: 'away' },
        { minute: 86, player: 'Jude Bellingham', team: 'home' },
      ],
    },
    {
      id: 'fix-afcon-1',
      homeTeam: 'Nigeria (Super Eagles)',
      awayTeam: 'South Africa (Bafana Bafana)',
      homeScore: 3,
      awayScore: 1,
      kickoffAt: new Date(Date.now() - 86400000).toISOString(),
      status: 'finished',
      leagueName: 'AFCON Qualifiers',
      leagueSlug: 'world-football',
      countryFlag: '🌍',
      stadium: 'Godswill Akpabio International Stadium, Uyo',
      goals: [
        { minute: 18, player: 'Victor Osimhen', team: 'home' },
        { minute: 44, player: 'Ademola Lookman', team: 'home' },
        { minute: 61, player: 'Percy Tau', team: 'away' },
        { minute: 80, player: 'Samuel Chukwueze', team: 'home' },
      ],
    },
  ];

  const fixtures = initialFixtures && initialFixtures.length > 0 ? initialFixtures : demoFixtures;

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleExpand = (id: string) => {
    setExpandedMatchId((prev) => (prev === id ? null : id));
  };

  // Filter Logic
  const filteredFixtures = fixtures.filter((fix) => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        fix.homeTeam.toLowerCase().includes(q) ||
        fix.awayTeam.toLowerCase().includes(q) ||
        fix.leagueName.toLowerCase().includes(q);
      if (!matchSearch) return false;
    }

    // Status Tab Filter
    if (activeTab === 'live' && fix.status !== 'live') return false;
    if (activeTab === 'finished' && fix.status !== 'finished') return false;
    if (activeTab === 'scheduled' && fix.status !== 'scheduled') return false;
    if (activeTab === 'favorites' && !favorites.includes(fix.id)) return false;

    // League Filter
    if (selectedLeague !== 'all') {
      if (selectedLeague === 'npfl' && !fix.leagueName.toLowerCase().includes('npfl')) return false;
      if (selectedLeague === 'epl' && !fix.leagueName.toLowerCase().includes('premier league')) return false;
      if (selectedLeague === 'ucl' && !fix.leagueName.toLowerCase().includes('champions')) return false;
      if (selectedLeague === 'afcon' && !fix.leagueName.toLowerCase().includes('afcon')) return false;
    }

    return true;
  });

  // Group filtered fixtures by League
  const groupedByLeague: Record<string, MatchFixtureItem[]> = {};
  filteredFixtures.forEach((fix) => {
    if (!groupedByLeague[fix.leagueName]) {
      groupedByLeague[fix.leagueName] = [];
    }
    groupedByLeague[fix.leagueName].push(fix);
  });

  const liveCount = fixtures.filter((f) => f.status === 'live').length;

  return (
    <div className="bg-[#0E1015] text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden font-sans">
      
      {/* LiveScore Signature Header Bar */}
      <div className="bg-[#141824] px-4 sm:px-8 py-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FF4500] text-white flex items-center justify-center font-black text-lg shadow-lg">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF4500]">
                LIVESCORE.COM OFFICIAL STYLE MATCH CENTER
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              REALTIME LIVE SCORES
            </h1>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search teams, leagues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FF4500] font-medium"
          />
        </div>
      </div>

      {/* Date Switcher Bar (Yesterday, Today, Tomorrow) */}
      <div className="bg-[#181D2B] px-4 sm:px-8 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-extrabold">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedDate('yesterday')}
            className={`px-4 py-2 rounded-xl transition-all ${
              selectedDate === 'yesterday'
                ? 'bg-[#FF4500] text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            YESTERDAY (25 AUG)
          </button>

          <button
            onClick={() => setSelectedDate('today')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              selectedDate === 'today'
                ? 'bg-[#FF4500] text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>TODAY (26 AUG)</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          </button>

          <button
            onClick={() => setSelectedDate('tomorrow')}
            className={`px-4 py-2 rounded-xl transition-all ${
              selectedDate === 'tomorrow'
                ? 'bg-[#FF4500] text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            TOMORROW (27 AUG)
          </button>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Calendar className="w-4 h-4 text-[#FF4500]" />
          <span className="hidden sm:inline font-mono">LIVE COVERAGE 24/7</span>
        </div>
      </div>

      {/* Filter Tabs (All, Live, Favorites, Finished, Scheduled) */}
      <div className="bg-[#10131C] px-4 sm:px-8 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
              activeTab === 'all'
                ? 'bg-slate-800 text-[#FF4500] border border-[#FF4500]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            ALL MATCHES ({fixtures.length})
          </button>

          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 ${
              activeTab === 'live'
                ? 'bg-rose-950/80 text-rose-400 border border-rose-600'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>LIVE ({liveCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'bg-amber-950/80 text-amber-400 border border-amber-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>FAVORITES ({favorites.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('finished')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
              activeTab === 'finished'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            FINISHED
          </button>

          <button
            onClick={() => setActiveTab('scheduled')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
              activeTab === 'scheduled'
                ? 'bg-slate-800 text-blue-400 border border-blue-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            SCHEDULED
          </button>
        </div>

        {/* League Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold">
          <button
            onClick={() => setSelectedLeague('all')}
            className={`px-3 py-1 rounded-lg ${selectedLeague === 'all' ? 'bg-[#FF4500] text-white' : 'bg-slate-900 text-slate-400'}`}
          >
            ALL LEAGUES
          </button>
          <button
            onClick={() => setSelectedLeague('npfl')}
            className={`px-3 py-1 rounded-lg ${selectedLeague === 'npfl' ? 'bg-[#FF4500] text-white' : 'bg-slate-900 text-slate-400'}`}
          >
            🇳🇬 NPFL
          </button>
          <button
            onClick={() => setSelectedLeague('epl')}
            className={`px-3 py-1 rounded-lg ${selectedLeague === 'epl' ? 'bg-[#FF4500] text-white' : 'bg-slate-900 text-slate-400'}`}
          >
            🏴󠁧󠁢󠁥󠁮󠁧󠁿 EPL
          </button>
          <button
            onClick={() => setSelectedLeague('ucl')}
            className={`px-3 py-1 rounded-lg ${selectedLeague === 'ucl' ? 'bg-[#FF4500] text-white' : 'bg-slate-900 text-slate-400'}`}
          >
            🇪🇺 UCL
          </button>
          <button
            onClick={() => setSelectedLeague('afcon')}
            className={`px-3 py-1 rounded-lg ${selectedLeague === 'afcon' ? 'bg-[#FF4500] text-white' : 'bg-slate-900 text-slate-400'}`}
          >
            🌍 AFCON
          </button>
        </div>
      </div>

      {/* Main Fixture Listing Area Grouped By League */}
      <div className="p-4 sm:p-8 space-y-6">
        {Object.keys(groupedByLeague).length > 0 ? (
          Object.entries(groupedByLeague).map(([leagueName, leagueMatches]) => {
            const countryFlag = leagueMatches[0]?.countryFlag || '⚽';
            const leagueSlug = leagueMatches[0]?.leagueSlug || 'npfl';

            return (
              <div key={leagueName} className="bg-[#141824] rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                
                {/* League Header Row */}
                <div className="bg-[#1B2030] px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{countryFlag}</span>
                    <h3 className="text-xs sm:text-sm font-black uppercase text-white tracking-wide">
                      {leagueName}
                    </h3>
                  </div>

                  <Link
                    href={`/leagues/${leagueSlug}`}
                    className="text-[11px] font-bold text-[#FF4500] hover:underline flex items-center gap-1"
                  >
                    <span>Standings & Stats</span> →
                  </Link>
                </div>

                {/* Match Rows List */}
                <div className="divide-y divide-slate-800/60">
                  {leagueMatches.map((match) => {
                    const isFav = favorites.includes(match.id);
                    const isExpanded = expandedMatchId === match.id;

                    return (
                      <div key={match.id} className="transition-colors hover:bg-[#1A1F30]">
                        
                        {/* Main Interactive Match Bar */}
                        <div
                          onClick={() => toggleExpand(match.id)}
                          className="px-4 sm:px-6 py-4 flex items-center justify-between cursor-pointer select-none gap-3"
                        >
                          {/* Match Status / Minute Left Box */}
                          <div className="w-16 sm:w-20 text-center shrink-0">
                            {match.status === 'live' && (
                              <div className="flex flex-col items-center justify-center">
                                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-600 text-white animate-pulse">
                                  {match.matchMinute}&apos; LIVE
                                </span>
                              </div>
                            )}

                            {match.status === 'finished' && (
                              <span className="text-xs font-black uppercase text-emerald-400 font-mono">
                                FT
                              </span>
                            )}

                            {match.status === 'scheduled' && (
                              <span className="text-xs font-bold text-slate-400 font-mono">
                                {new Date(match.kickoffAt).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: false,
                                })}
                              </span>
                            )}
                          </div>

                          {/* Teams & Scoreboard Middle Box */}
                          <div className="flex-1 max-w-xl grid grid-cols-12 items-center gap-2 text-xs sm:text-sm font-extrabold">
                            {/* Home Team */}
                            <div className="col-span-5 flex items-center justify-end text-right space-x-2 text-slate-100">
                              <span className="truncate">{match.homeTeam}</span>
                              <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black shrink-0">
                                {match.homeTeam.substring(0, 1)}
                              </div>
                            </div>

                            {/* Score Display Box */}
                            <div className="col-span-2 text-center">
                              {match.homeScore !== null && match.homeScore !== undefined ? (
                                <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 font-mono text-base font-black text-amber-400 tracking-wider shadow-inner inline-block">
                                  {match.homeScore} - {match.awayScore}
                                </div>
                              ) : (
                                <span className="text-slate-500 font-mono text-xs">VS</span>
                              )}
                            </div>

                            {/* Away Team */}
                            <div className="col-span-5 flex items-center justify-start text-left space-x-2 text-slate-100">
                              <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black shrink-0">
                                {match.awayTeam.substring(0, 1)}
                              </div>
                              <span className="truncate">{match.awayTeam}</span>
                            </div>
                          </div>

                          {/* Right Controls: Star Favorite + Expand Drawer */}
                          <div className="flex items-center space-x-3 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(match.id);
                              }}
                              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
                            >
                              <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                            </button>

                            <div className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </div>
                          </div>
                        </div>

                        {/* Expandable Match Stats & Fact Drawer */}
                        {isExpanded && (
                          <div className="bg-[#111420] px-6 py-5 border-t border-slate-800/80 space-y-4 text-xs font-medium text-slate-300">
                            {match.stadium && (
                              <div className="flex items-center gap-1.5 text-slate-400 font-bold">
                                <span>🏟️ Venue:</span>
                                <span className="text-white">{match.stadium}</span>
                              </div>
                            )}

                            {/* Goals Timeline */}
                            {match.goals && match.goals.length > 0 && (
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-black uppercase text-[#FF4500] tracking-widest block">
                                  ⚽ OFFICIAL GOALS LOG
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px]">
                                  {match.goals.map((g, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                      <span className="text-amber-400 font-bold">{g.minute}&apos;</span>
                                      <span className="text-white font-bold">{g.player}</span>
                                      <span className="text-slate-400 text-[10px]">
                                        ({g.team === 'home' ? match.homeTeam : match.awayTeam})
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Disciplinary Cards Log */}
                            {match.cards && match.cards.length > 0 && (
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-black uppercase text-amber-400 tracking-widest block">
                                  🟨 CARDS & DISCIPLINARY LOG
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px]">
                                  {match.cards.map((c, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                      <span>{c.type === 'red' ? '🟥' : '🟨'}</span>
                                      <span className="text-amber-300 font-bold">{c.minute}&apos;</span>
                                      <span className="text-white">{c.player}</span>
                                      <span className="text-slate-400 text-[10px]">
                                        ({c.team === 'home' ? match.homeTeam : match.awayTeam})
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Action Link: Read Match Report or Generate AI Article */}
                            <div className="pt-2 flex items-center justify-between">
                              <Link
                                href={`/article/enyimba-thrilling-victory-npfl-derby`}
                                className="px-4 py-2 rounded-xl bg-[#FF4500] hover:bg-[#e03d00] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
                              >
                                <span>Read Match Report</span> <ArrowRight className="w-3.5 h-3.5" />
                              </Link>

                              <Link
                                href="/admin/articles"
                                className="text-[10px] text-slate-400 hover:text-emerald-400 font-bold uppercase tracking-wider"
                              >
                                Editor AI Fact Generator →
                              </Link>
                            </div>

                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-[#141824] p-12 rounded-3xl text-center text-slate-400 text-sm border border-slate-800 space-y-3">
            <Activity className="w-8 h-8 text-[#FF4500] mx-auto opacity-50" />
            <p className="font-extrabold text-white">No matches found for the selected filter criteria.</p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSelectedLeague('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-[#FF4500] hover:bg-slate-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
