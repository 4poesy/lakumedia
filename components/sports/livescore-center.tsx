'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Activity, Calendar, Star, ChevronDown, ChevronUp, Search, Flame, Sun, Moon, ArrowRight, Trophy, BarChart2, Shield, Layers } from 'lucide-react';

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
  matchDateOffset?: 'yesterday' | 'today' | 'tomorrow';
  goals?: Array<{ minute: number; player: string; team: 'home' | 'away' }>;
  cards?: Array<{ minute: number; player: string; team: 'home' | 'away'; type: 'yellow' | 'red' }>;
  h2h?: {
    homeWins: number;
    draws: number;
    awayWins: number;
    lastMatchesHome: Array<'W' | 'D' | 'L'>;
    lastMatchesAway: Array<'W' | 'D' | 'L'>;
  };
  tableSnapshot?: {
    homeRank: number;
    awayRank: number;
    homePts: number;
    awayPts: number;
  };
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
  const [activeDrawerTab, setActiveDrawerTab] = useState<Record<string, 'summary' | 'h2h' | 'table'>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Toggle between Dark & Light Mode

  // Default rich match fixtures with Soccerway H2H & Table statistics
  const demoFixtures: MatchFixtureItem[] = [
    // --- TODAY MATCHES ---
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
      matchDateOffset: 'today',
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
      h2h: {
        homeWins: 7,
        draws: 3,
        awayWins: 4,
        lastMatchesHome: ['W', 'W', 'D', 'W', 'L'],
        lastMatchesAway: ['L', 'W', 'D', 'L', 'W'],
      },
      tableSnapshot: {
        homeRank: 2,
        awayRank: 6,
        homePts: 48,
        awayPts: 39,
      },
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
      matchDateOffset: 'today',
      stadium: 'Nnamdi Azikiwe Stadium, Enugu',
      goals: [{ minute: 28, player: 'Kenechukwu Agu', team: 'home' }],
      h2h: {
        homeWins: 5,
        draws: 2,
        awayWins: 5,
        lastMatchesHome: ['W', 'D', 'W', 'W', 'W'],
        lastMatchesAway: ['W', 'W', 'L', 'W', 'D'],
      },
      tableSnapshot: {
        homeRank: 1,
        awayRank: 3,
        homePts: 51,
        awayPts: 46,
      },
    },
    {
      id: 'fix-epl-1',
      homeTeam: 'Arsenal FC',
      awayTeam: 'Chelsea FC',
      homeScore: 3,
      awayScore: 1,
      kickoffAt: new Date().toISOString(),
      status: 'finished',
      leagueName: 'English Premier League (EPL)',
      leagueSlug: 'epl',
      countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      matchDateOffset: 'today',
      stadium: 'Emirates Stadium, London',
      goals: [
        { minute: 14, player: 'Bukayo Saka', team: 'home' },
        { minute: 38, player: 'Gabriel Martinelli', team: 'home' },
        { minute: 55, player: 'Cole Palmer', team: 'away' },
        { minute: 78, player: 'Declan Rice', team: 'home' },
      ],
      h2h: {
        homeWins: 11,
        draws: 6,
        awayWins: 8,
        lastMatchesHome: ['W', 'W', 'W', 'D', 'W'],
        lastMatchesAway: ['L', 'W', 'L', 'D', 'W'],
      },
      tableSnapshot: {
        homeRank: 2,
        awayRank: 5,
        homePts: 64,
        awayPts: 52,
      },
    },

    // --- YESTERDAY MATCHES ---
    {
      id: 'fix-ucl-1',
      homeTeam: 'Real Madrid',
      awayTeam: 'FC Bayern Munich',
      homeScore: 2,
      awayScore: 2,
      kickoffAt: new Date(Date.now() - 86400000).toISOString(),
      status: 'finished',
      leagueName: 'UEFA Champions League',
      leagueSlug: 'champions-league',
      countryFlag: '🇪🇺',
      matchDateOffset: 'yesterday',
      stadium: 'Santiago Bernabéu, Madrid',
      goals: [
        { minute: 21, player: 'Harry Kane', team: 'away' },
        { minute: 49, player: 'Vinícius Júnior', team: 'home' },
        { minute: 71, player: 'Jamal Musiala', team: 'away' },
        { minute: 86, player: 'Jude Bellingham', team: 'home' },
      ],
      h2h: {
        homeWins: 9,
        draws: 5,
        awayWins: 9,
        lastMatchesHome: ['W', 'W', 'D', 'W', 'W'],
        lastMatchesAway: ['W', 'L', 'W', 'W', 'D'],
      },
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
      matchDateOffset: 'yesterday',
      stadium: 'Godswill Akpabio International Stadium, Uyo',
      goals: [
        { minute: 18, player: 'Victor Osimhen', team: 'home' },
        { minute: 44, player: 'Ademola Lookman', team: 'home' },
        { minute: 61, player: 'Percy Tau', team: 'away' },
        { minute: 80, player: 'Samuel Chukwueze', team: 'home' },
      ],
      h2h: {
        homeWins: 8,
        draws: 4,
        awayWins: 2,
        lastMatchesHome: ['W', 'D', 'W', 'W', 'W'],
        lastMatchesAway: ['L', 'W', 'D', 'W', 'L'],
      },
    },

    // --- TOMORROW MATCHES ---
    {
      id: 'fix-epl-2',
      homeTeam: 'Manchester City',
      awayTeam: 'Liverpool FC',
      homeScore: null,
      awayScore: null,
      kickoffAt: new Date(Date.now() + 86400000).toISOString(),
      status: 'scheduled',
      leagueName: 'English Premier League (EPL)',
      leagueSlug: 'epl',
      countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      matchDateOffset: 'tomorrow',
      stadium: 'Etihad Stadium, Manchester',
      h2h: {
        homeWins: 10,
        draws: 7,
        awayWins: 10,
        lastMatchesHome: ['W', 'W', 'W', 'D', 'W'],
        lastMatchesAway: ['W', 'W', 'D', 'W', 'L'],
      },
      tableSnapshot: {
        homeRank: 1,
        awayRank: 3,
        homePts: 70,
        awayPts: 62,
      },
    },
    {
      id: 'fix-ucl-2',
      homeTeam: 'Barcelona',
      awayTeam: 'Paris Saint-Germain',
      homeScore: null,
      awayScore: null,
      kickoffAt: new Date(Date.now() + 86400000).toISOString(),
      status: 'scheduled',
      leagueName: 'UEFA Champions League',
      leagueSlug: 'champions-league',
      countryFlag: '🇪🇺',
      matchDateOffset: 'tomorrow',
      stadium: 'Camp Nou, Barcelona',
      h2h: {
        homeWins: 5,
        draws: 3,
        awayWins: 4,
        lastMatchesHome: ['W', 'W', 'L', 'W', 'W'],
        lastMatchesAway: ['W', 'W', 'W', 'D', 'W'],
      },
    },
  ];

  const rawFixtures = initialFixtures && initialFixtures.length > 0 ? initialFixtures : demoFixtures;

  // Compute exact match date offset for any fixture
  const getFixtureDateOffset = (fix: MatchFixtureItem): 'yesterday' | 'today' | 'tomorrow' => {
    if (fix.matchDateOffset) return fix.matchDateOffset;
    if (!fix.kickoffAt) return 'today';

    const kickoff = new Date(fix.kickoffAt);
    const now = new Date();

    const matchDay = new Date(kickoff.getFullYear(), kickoff.getMonth(), kickoff.getDate()).getTime();
    const todayDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const diffDays = Math.round((matchDay - todayDay) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'yesterday';
    if (diffDays > 0) return 'tomorrow';
    return 'today';
  };

  const fixtures = rawFixtures.map((fix) => ({
    ...fix,
    computedDateOffset: getFixtureDateOffset(fix),
  }));

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleExpand = (id: string) => {
    setExpandedMatchId((prev) => (prev === id ? null : id));
  };

  const setDrawerTab = (matchId: string, tab: 'summary' | 'h2h' | 'table') => {
    setActiveDrawerTab((prev) => ({ ...prev, [matchId]: tab }));
  };

  // Filter Logic
  const filteredFixtures = fixtures.filter((fix) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        fix.homeTeam.toLowerCase().includes(q) ||
        fix.awayTeam.toLowerCase().includes(q) ||
        fix.leagueName.toLowerCase().includes(q);
      if (!matchSearch) return false;
    }

    if (fix.computedDateOffset !== selectedDate) {
      return false;
    }

    if (activeTab === 'live' && fix.status !== 'live') return false;
    if (activeTab === 'finished' && fix.status !== 'finished') return false;
    if (activeTab === 'scheduled' && fix.status !== 'scheduled') return false;
    if (activeTab === 'favorites' && !favorites.includes(fix.id)) return false;

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

  const liveCount = fixtures.filter((f) => f.computedDateOffset === selectedDate && f.status === 'live').length;
  const dateMatchCount = fixtures.filter((f) => f.computedDateOffset === selectedDate).length;

  const theme = isDarkMode
    ? {
        container: 'bg-[#0E1015] text-white border-slate-800',
        header: 'bg-[#141824] border-slate-800',
        subHeader: 'bg-[#181D2B] border-slate-800',
        tabBar: 'bg-[#10131C] border-slate-800',
        card: 'bg-[#141824] border-slate-800',
        cardHeader: 'bg-[#1B2030] border-slate-800 text-white',
        rowHover: 'hover:bg-[#1A1F30]',
        scoreBg: 'bg-slate-900 border-slate-700 text-amber-400',
        drawerBg: 'bg-[#111420] border-slate-800',
      }
    : {
        container: 'bg-white text-slate-900 border-slate-200 shadow-xl',
        header: 'bg-slate-900 text-white border-slate-800',
        subHeader: 'bg-slate-100 border-slate-200 text-slate-900',
        tabBar: 'bg-slate-50 border-slate-200',
        card: 'bg-white border-slate-200 shadow-sm',
        cardHeader: 'bg-[#2A2E7F] border-slate-700 text-white',
        rowHover: 'hover:bg-slate-50',
        scoreBg: 'bg-[#2A2E7F] text-white border-blue-900',
        drawerBg: 'bg-slate-50 border-slate-200',
      };

  return (
    <div className={`${theme.container} rounded-3xl border shadow-2xl overflow-hidden font-sans transition-colors duration-300`}>
      
      {/* LiveScore Header Bar with Prominent 1-Click Dark/Light Theme Toggle */}
      <div className={`${theme.header} px-4 sm:px-8 py-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#D9541E] text-white flex items-center justify-center font-black text-lg shadow-lg shrink-0">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#D9541E]">
                HYBRID LIVESCORE & SOCCERWAY STATISTICAL CENTER
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              REALTIME MATCH CENTER & H2H STATS
            </h1>
          </div>
        </div>

        {/* Header Right Controls */}
        <div className="flex flex-wrap items-center space-x-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-4 py-2.5 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform active:scale-95 border border-orange-400 shrink-0 cursor-pointer"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-300" />
                <span>SWITCH TO LIGHT MODE ☀️</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-100" />
                <span>SWITCH TO DARK MODE 🌙</span>
              </>
            )}
          </button>

          <div className="relative flex-1 md:w-64 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search teams, leagues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D9541E] font-medium"
            />
          </div>
        </div>
      </div>

      {/* Date Switcher Bar */}
      <div className={`${theme.subHeader} px-4 sm:px-8 py-3 border-b flex flex-wrap items-center justify-between gap-3 text-xs font-extrabold`}>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              setSelectedDate('yesterday');
              setActiveTab('all');
            }}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer select-none active:scale-95 ${
              selectedDate === 'yesterday'
                ? 'bg-[#D9541E] text-white shadow-md font-black border border-orange-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            YESTERDAY (25 AUG)
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedDate('today');
              setActiveTab('all');
            }}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer select-none active:scale-95 flex items-center gap-1.5 ${
              selectedDate === 'today'
                ? 'bg-[#D9541E] text-white shadow-md font-black border border-orange-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <span>TODAY (26 AUG)</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedDate('tomorrow');
              setActiveTab('all');
            }}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer select-none active:scale-95 ${
              selectedDate === 'tomorrow'
                ? 'bg-[#D9541E] text-white shadow-md font-black border border-orange-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            TOMORROW (27 AUG)
          </button>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
          <Calendar className="w-4 h-4 text-[#D9541E]" />
          <span>SHOWING {selectedDate.toUpperCase()} MATCHES</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={`${theme.tabBar} px-4 sm:px-8 py-3 border-b flex flex-wrap items-center justify-between gap-3`}>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#2A2E7F] text-white shadow-md'
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            ALL MATCHES ({dateMatchCount})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'live'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>LIVE ({liveCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>FAVORITES ({favorites.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('finished')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
              activeTab === 'finished'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            FINISHED
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('scheduled')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
              activeTab === 'scheduled'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            SCHEDULED
          </button>
        </div>

        {/* League Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setSelectedLeague('all')}
            className={`px-3 py-1 rounded-lg cursor-pointer ${selectedLeague === 'all' ? 'bg-[#D9541E] text-white' : 'bg-slate-800 text-slate-300'}`}
          >
            ALL LEAGUES
          </button>
          <button
            type="button"
            onClick={() => setSelectedLeague('npfl')}
            className={`px-3 py-1 rounded-lg cursor-pointer ${selectedLeague === 'npfl' ? 'bg-[#D9541E] text-white' : 'bg-slate-800 text-slate-300'}`}
          >
            🇳🇬 NPFL
          </button>
          <button
            type="button"
            onClick={() => setSelectedLeague('epl')}
            className={`px-3 py-1 rounded-lg cursor-pointer ${selectedLeague === 'epl' ? 'bg-[#D9541E] text-white' : 'bg-slate-800 text-slate-300'}`}
          >
            🏴󠁧󠁢󠁥󠁮󠁧󠁿 EPL
          </button>
          <button
            type="button"
            onClick={() => setSelectedLeague('ucl')}
            className={`px-3 py-1 rounded-lg cursor-pointer ${selectedLeague === 'ucl' ? 'bg-[#D9541E] text-white' : 'bg-slate-800 text-slate-300'}`}
          >
            🇪🇺 UCL
          </button>
          <button
            type="button"
            onClick={() => setSelectedLeague('afcon')}
            className={`px-3 py-1 rounded-lg cursor-pointer ${selectedLeague === 'afcon' ? 'bg-[#D9541E] text-white' : 'bg-slate-800 text-slate-300'}`}
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
              <div key={leagueName} className={`${theme.card} rounded-2xl overflow-hidden border shadow-xl`}>
                
                {/* League Header Row */}
                <div className={`${theme.cardHeader} px-5 py-3 border-b flex items-center justify-between`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{countryFlag}</span>
                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-wide">
                      {leagueName}
                    </h3>
                  </div>

                  <Link
                    href={`/leagues/${leagueSlug}`}
                    className="text-[11px] font-bold text-amber-300 hover:underline flex items-center gap-1"
                  >
                    <span>Full Soccerway Table & Stats</span> →
                  </Link>
                </div>

                {/* Match Rows List */}
                <div className="divide-y divide-slate-200/20">
                  {leagueMatches.map((match) => {
                    const isFav = favorites.includes(match.id);
                    const isExpanded = expandedMatchId === match.id;
                    const drawerTab = activeDrawerTab[match.id] || 'summary';

                    return (
                      <div key={match.id} className={`transition-colors ${theme.rowHover}`}>
                        
                        {/* Main Interactive Match Bar */}
                        <div
                          onClick={() => toggleExpand(match.id)}
                          className="px-4 sm:px-6 py-4 flex items-center justify-between cursor-pointer select-none gap-3"
                        >
                          {/* Match Status / Minute */}
                          <div className="w-16 sm:w-20 text-center shrink-0">
                            {match.status === 'live' && (
                              <div className="flex flex-col items-center justify-center">
                                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-600 text-white animate-pulse">
                                  {match.matchMinute}&apos; LIVE
                                </span>
                              </div>
                            )}

                            {match.status === 'finished' && (
                              <span className="text-xs font-black uppercase text-emerald-500 font-mono">
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

                          {/* Teams & Scoreboard */}
                          <div className="flex-1 max-w-xl grid grid-cols-12 items-center gap-2 text-xs sm:text-sm font-extrabold">
                            <div className="col-span-5 flex items-center justify-end text-right space-x-2">
                              <span className="truncate">{match.homeTeam}</span>
                              <div className="w-5 h-5 rounded-full bg-slate-700 border border-slate-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                                {match.homeTeam.substring(0, 1)}
                              </div>
                            </div>

                            <div className="col-span-2 text-center">
                              {match.homeScore !== null && match.homeScore !== undefined ? (
                                <div className={`px-2.5 py-1 rounded-lg border font-mono text-base font-black tracking-wider shadow-inner inline-block ${theme.scoreBg}`}>
                                  {match.homeScore} - {match.awayScore}
                                </div>
                              ) : (
                                <span className="text-slate-400 font-mono text-xs">VS</span>
                              )}
                            </div>

                            <div className="col-span-5 flex items-center justify-start text-left space-x-2">
                              <div className="w-5 h-5 rounded-full bg-slate-700 border border-slate-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                                {match.awayTeam.substring(0, 1)}
                              </div>
                              <span className="truncate">{match.awayTeam}</span>
                            </div>
                          </div>

                          {/* Right Controls */}
                          <div className="flex items-center space-x-3 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(match.id);
                              }}
                              className="p-1.5 rounded-lg hover:bg-slate-700/20 text-slate-400 hover:text-amber-400 transition-colors"
                            >
                              <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                            </button>

                            <div className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900">
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </div>
                          </div>
                        </div>

                        {/* Expandable Soccerway Multi-Tab Drawer */}
                        {isExpanded && (
                          <div className={`${theme.drawerBg} px-6 py-5 border-t space-y-4 text-xs font-medium`}>
                            
                            {/* Soccerway Drawer Tab Navigation Bar */}
                            <div className="flex items-center gap-2 border-b border-slate-700/60 pb-3">
                              <button
                                type="button"
                                onClick={() => setDrawerTab(match.id, 'summary')}
                                className={`px-3 py-1.5 rounded-lg font-black uppercase text-[11px] transition-colors flex items-center gap-1.5 ${
                                  drawerTab === 'summary'
                                    ? 'bg-[#D9541E] text-white'
                                    : 'bg-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                ⚽ Match Summary
                              </button>

                              <button
                                type="button"
                                onClick={() => setDrawerTab(match.id, 'h2h')}
                                className={`px-3 py-1.5 rounded-lg font-black uppercase text-[11px] transition-colors flex items-center gap-1.5 ${
                                  drawerTab === 'h2h'
                                    ? 'bg-[#D9541E] text-white'
                                    : 'bg-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                <BarChart2 className="w-3.5 h-3.5" /> Soccerway H2H & Form
                              </button>

                              {match.tableSnapshot && (
                                <button
                                  type="button"
                                  onClick={() => setDrawerTab(match.id, 'table')}
                                  className={`px-3 py-1.5 rounded-lg font-black uppercase text-[11px] transition-colors flex items-center gap-1.5 ${
                                    drawerTab === 'table'
                                      ? 'bg-[#D9541E] text-white'
                                      : 'bg-slate-800 text-slate-400 hover:text-white'
                                  }`}
                                >
                                  <Trophy className="w-3.5 h-3.5" /> Live Rank
                                </button>
                              )}
                            </div>

                            {/* TAB 1: SUMMARY */}
                            {drawerTab === 'summary' && (
                              <div className="space-y-4">
                                {match.stadium && (
                                  <div className="flex items-center gap-1.5 text-slate-400 font-bold">
                                    <span>🏟️ Stadium Venue:</span>
                                    <span className="text-slate-900 dark:text-white font-extrabold">{match.stadium}</span>
                                  </div>
                                )}

                                {match.goals && match.goals.length > 0 && (
                                  <div className="space-y-1.5">
                                    <span className="text-[10px] font-black uppercase text-[#D9541E] tracking-widest block">
                                      ⚽ GOALS TIMELINE
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-900 text-white p-3 rounded-xl border border-slate-800 font-mono text-[11px]">
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

                                {match.cards && match.cards.length > 0 && (
                                  <div className="space-y-1.5">
                                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-widest block">
                                      🟨 CARDS & DISCIPLINARY LOG
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-900 text-white p-3 rounded-xl border border-slate-800 font-mono text-[11px]">
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
                              </div>
                            )}

                            {/* TAB 2: SOCCERWAY H2H STATS & FORM GUIDE */}
                            {drawerTab === 'h2h' && (
                              <div className="space-y-4 bg-slate-900 text-white p-4 rounded-2xl border border-slate-800">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                  <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                                    <BarChart2 className="w-4 h-4 text-emerald-400" /> SOCCERWAY HEAD-TO-HEAD HISTORY
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400">PAST CLASHES RECORD</span>
                                </div>

                                {match.h2h ? (
                                  <div className="space-y-4 text-xs font-bold">
                                    {/* H2H Win Breakdown Bar */}
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                      <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                                        <span className="text-[10px] text-slate-400 block uppercase">{match.homeTeam} Wins</span>
                                        <span className="text-lg font-black text-emerald-400">{match.h2h.homeWins}</span>
                                      </div>

                                      <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                                        <span className="text-[10px] text-slate-400 block uppercase">Draws</span>
                                        <span className="text-lg font-black text-amber-400">{match.h2h.draws}</span>
                                      </div>

                                      <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                                        <span className="text-[10px] text-slate-400 block uppercase">{match.awayTeam} Wins</span>
                                        <span className="text-lg font-black text-blue-400">{match.h2h.awayWins}</span>
                                      </div>
                                    </div>

                                    {/* Last 5 Matches Form Guide Badges */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                                      <div className="space-y-1.5">
                                        <span className="text-[10px] uppercase text-slate-400 block">{match.homeTeam} Form Guide</span>
                                        <div className="flex gap-1.5">
                                          {match.h2h.lastMatchesHome.map((res, i) => (
                                            <span
                                              key={i}
                                              className={`w-6 h-6 rounded-md flex items-center justify-center font-black text-xs text-white ${
                                                res === 'W' ? 'bg-emerald-600' : res === 'D' ? 'bg-amber-600' : 'bg-red-600'
                                              }`}
                                            >
                                              {res}
                                            </span>
                                          ))}
                                        </div>
                                      </div>

                                      <div className="space-y-1.5">
                                        <span className="text-[10px] uppercase text-slate-400 block">{match.awayTeam} Form Guide</span>
                                        <div className="flex gap-1.5">
                                          {match.h2h.lastMatchesAway.map((res, i) => (
                                            <span
                                              key={i}
                                              className={`w-6 h-6 rounded-md flex items-center justify-center font-black text-xs text-white ${
                                                res === 'W' ? 'bg-emerald-600' : res === 'D' ? 'bg-amber-600' : 'bg-red-600'
                                              }`}
                                            >
                                              {res}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-xs text-slate-400">H2H stats updating from match registry.</p>
                                )}
                              </div>
                            )}

                            {/* TAB 3: LIVE TABLE SNAPSHOT */}
                            {drawerTab === 'table' && match.tableSnapshot && (
                              <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3 font-mono text-xs">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                  <span className="font-extrabold text-emerald-400 uppercase">STANDINGS TABLE SNAPSHOT</span>
                                  <span>{match.leagueName}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
                                    <span className="text-[10px] text-slate-400 uppercase block">{match.homeTeam} Position</span>
                                    <span className="text-xl font-black text-white">#{match.tableSnapshot.homeRank}</span>
                                    <span className="text-[10px] text-emerald-400 block">({match.tableSnapshot.homePts} pts)</span>
                                  </div>

                                  <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
                                    <span className="text-[10px] text-slate-400 uppercase block">{match.awayTeam} Position</span>
                                    <span className="text-xl font-black text-white">#{match.tableSnapshot.awayRank}</span>
                                    <span className="text-[10px] text-emerald-400 block">({match.tableSnapshot.awayPts} pts)</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Action Link: Read Match Report */}
                            <div className="pt-2 flex items-center justify-between">
                              <Link
                                href={`/article/enyimba-thrilling-victory-npfl-derby`}
                                className="px-4 py-2 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
                              >
                                <span>Read Full Match Report</span> <ArrowRight className="w-3.5 h-3.5" />
                              </Link>

                              <Link
                                href={`/leagues/${match.leagueSlug || 'npfl'}`}
                                className="text-[10px] text-emerald-400 hover:underline font-extrabold uppercase tracking-wider flex items-center gap-1"
                              >
                                Soccerway Full Standings Table →
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
          <div className={`${theme.card} p-12 rounded-3xl text-center text-slate-400 text-sm border space-y-3`}>
            <Activity className="w-8 h-8 text-[#D9541E] mx-auto opacity-50" />
            <p className="font-extrabold text-slate-900 dark:text-white">No matches scheduled for {selectedDate.toUpperCase()} under current filter criteria.</p>
            <button
              type="button"
              onClick={() => {
                setActiveTab('all');
                setSelectedLeague('all');
                setSelectedDate('today');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-[#D9541E] hover:bg-slate-700 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
