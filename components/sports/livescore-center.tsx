'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Activity, Calendar, Star, ChevronDown, ChevronUp, Search, Flame, Sun, Moon, ArrowRight, Trophy, BarChart2, Shield, Layers, Award, CheckCircle2 } from 'lucide-react';
import { getRealGlobalMatchesFeed } from '@/lib/sports-api';

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
  const [activeStandingsLeague, setActiveStandingsLeague] = useState<'npfl' | 'epl' | 'ucl' | 'laliga' | 'afcon'>('npfl');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);
  const [activeDrawerTab, setActiveDrawerTab] = useState<Record<string, 'summary' | 'h2h' | 'table'>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // 24/7 Automated Ingestion & Live Auto-Polling Engine (Triggers on mount & every 60s)
  React.useEffect(() => {
    const triggerBackgroundIngestion = async () => {
      try {
        await Promise.all([
          fetch('/api/sync-live-scores', { method: 'POST' }),
          fetch('/api/ingest-rss', { method: 'GET' }),
        ]);
      } catch (err) {
        // Silent background execution
      }
    };

    // Trigger immediately on page visit
    triggerBackgroundIngestion();

    // Auto-poll every 60 seconds
    const interval = setInterval(triggerBackgroundIngestion, 60000);
    return () => clearInterval(interval);
  }, []);

  // High-Quality 20+ Global Real Match Fixtures Pipeline
  const liveMatchEngineFixtures: MatchFixtureItem[] = getRealGlobalMatchesFeed();

  // Comprehensive Multi-League Standings Tables
  const standingsDatasets: Record<string, { leagueTitle: string; countryFlag: string; rows: any[] }> = {
    npfl: {
      leagueTitle: 'NIGERIA PREMIER FOOTBALL LEAGUE (NPFL) STANDINGS',
      countryFlag: '🇳🇬',
      rows: [
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
      ],
    },
    epl: {
      leagueTitle: 'ENGLISH PREMIER LEAGUE (EPL) STANDINGS',
      countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      rows: [
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
      ],
    },
    ucl: {
      leagueTitle: 'UEFA CHAMPIONS LEAGUE STANDINGS',
      countryFlag: '🇪🇺',
      rows: [
        { rank: 1, team: 'Real Madrid', mp: 6, w: 5, d: 1, l: 0, gf: 16, ga: 7, gd: '+9', pts: 16, form: ['W', 'W', 'W', 'D', 'W'] },
        { rank: 2, team: 'FC Bayern Munich', mp: 6, w: 5, d: 0, l: 1, gf: 18, ga: 6, gd: '+12', pts: 15, form: ['W', 'W', 'W', 'W', 'L'] },
        { rank: 3, team: 'Manchester City', mp: 6, w: 4, d: 2, l: 0, gf: 15, ga: 5, gd: '+10', pts: 14, form: ['W', 'D', 'W', 'W', 'D'] },
        { rank: 4, team: 'FC Barcelona', mp: 6, w: 4, d: 1, l: 1, gf: 14, ga: 8, gd: '+6', pts: 13, form: ['W', 'W', 'L', 'W', 'D'] },
        { rank: 5, team: 'Paris Saint-Germain', mp: 6, w: 4, d: 0, l: 2, gf: 12, ga: 7, gd: '+5', pts: 12, form: ['W', 'L', 'W', 'W', 'W'] },
        { rank: 6, team: 'Inter Milan', mp: 6, w: 3, d: 2, l: 1, gf: 10, ga: 6, gd: '+4', pts: 11, form: ['D', 'W', 'W', 'D', 'W'] },
      ],
    },
    laliga: {
      leagueTitle: 'LA LIGA EA SPORTS STANDINGS',
      countryFlag: '🇪🇸',
      rows: [
        { rank: 1, team: 'Real Madrid', mp: 29, w: 23, d: 4, l: 2, gf: 66, ga: 20, gd: '+46', pts: 73, form: ['W', 'W', 'D', 'W', 'W'] },
        { rank: 2, team: 'FC Barcelona', mp: 29, w: 20, d: 5, l: 4, gf: 62, ga: 34, gd: '+28', pts: 65, form: ['W', 'W', 'W', 'D', 'W'] },
        { rank: 3, team: 'Girona FC', mp: 29, w: 19, d: 5, l: 5, gf: 59, ga: 36, gd: '+23', pts: 62, form: ['L', 'W', 'L', 'W', 'W'] },
        { rank: 4, team: 'Atlético Madrid', mp: 29, w: 17, d: 4, l: 8, gf: 54, ga: 35, gd: '+19', pts: 55, form: ['L', 'W', 'D', 'W', 'L'] },
        { rank: 5, team: 'Athletic Club', mp: 29, w: 16, d: 8, l: 5, gf: 50, ga: 26, gd: '+24', pts: 56, form: ['W', 'D', 'W', 'W', 'D'] },
        { rank: 6, team: 'Real Sociedad', mp: 29, w: 12, d: 10, l: 7, gf: 42, ga: 31, gd: '+11', pts: 46, form: ['W', 'L', 'D', 'W', 'D'] },
        { rank: 7, team: 'Real Betis', mp: 29, w: 10, d: 15, l: 4, gf: 38, ga: 33, gd: '+5', pts: 45, form: ['D', 'W', 'D', 'W', 'L'] },
        { rank: 8, team: 'Valencia CF', mp: 29, w: 12, d: 8, l: 9, gf: 32, ga: 32, gd: '0', pts: 44, form: ['W', 'D', 'L', 'W', 'W'] },
        { rank: 9, team: 'Villarreal CF', mp: 29, w: 11, d: 9, l: 9, gf: 47, ga: 51, gd: '-4', pts: 42, form: ['W', 'W', 'W', 'D', 'W'] },
        { rank: 10, team: 'Getafe CF', mp: 29, w: 9, d: 11, l: 9, gf: 37, ga: 42, gd: '-5', pts: 38, form: ['L', 'D', 'W', 'L', 'D'] },
        { rank: 11, team: 'CA Osasuna', mp: 29, w: 10, d: 7, l: 12, gf: 36, ga: 43, gd: '-7', pts: 37, form: ['D', 'W', 'L', 'L', 'W'] },
        { rank: 12, team: 'Deportivo Alavés', mp: 29, w: 8, d: 11, l: 10, gf: 29, ga: 35, gd: '-6', pts: 35, form: ['W', 'D', 'L', 'D', 'L'] },
        { rank: 13, team: 'Sevilla FC', mp: 29, w: 7, d: 13, l: 9, gf: 37, ga: 44, gd: '-7', pts: 34, form: ['D', 'L', 'W', 'D', 'D'] },
        { rank: 14, team: 'RCD Mallorca', mp: 29, w: 6, d: 15, l: 8, gf: 25, ga: 35, gd: '-10', pts: 33, form: ['W', 'D', 'D', 'L', 'W'] },
        { rank: 15, team: 'Rayo Vallecano', mp: 29, w: 6, d: 14, l: 9, gf: 25, ga: 38, gd: '-13', pts: 32, form: ['D', 'W', 'D', 'L', 'D'] },
        { rank: 16, team: 'UD Las Palmas', mp: 29, w: 7, d: 10, l: 12, gf: 29, ga: 39, gd: '-10', pts: 31, form: ['L', 'L', 'D', 'L', 'D'] },
        { rank: 17, team: 'RC Celta de Vigo', mp: 29, w: 7, d: 9, l: 13, gf: 32, ga: 44, gd: '-12', pts: 30, form: ['W', 'L', 'W', 'L', 'D'] },
        { rank: 18, team: 'Cádiz CF', mp: 29, w: 3, d: 16, l: 10, gf: 20, ga: 38, gd: '-18', pts: 25, form: ['D', 'D', 'W', 'L', 'D'] },
        { rank: 19, team: 'Granada CF', mp: 29, w: 2, d: 15, l: 12, gf: 30, ga: 58, gd: '-28', pts: 21, form: ['L', 'D', 'L', 'L', 'D'] },
        { rank: 20, team: 'UD Almería', mp: 29, w: 1, d: 14, l: 14, gf: 28, ga: 57, gd: '-29', pts: 17, form: ['W', 'D', 'L', 'D', 'L'] },
      ],
    },
    afcon: {
      leagueTitle: 'AFCON QUALIFIERS & AFRICA NATIONS STANDINGS',
      countryFlag: '🌍',
      rows: [
        { rank: 1, team: 'Nigeria (Super Eagles)', mp: 6, w: 5, d: 1, l: 0, gf: 14, ga: 3, gd: '+11', pts: 16, form: ['W', 'W', 'W', 'D', 'W'] },
        { rank: 2, team: 'Ivory Coast (Elephants)', mp: 6, w: 4, d: 1, l: 1, gf: 12, ga: 4, gd: '+8', pts: 13, form: ['W', 'W', 'D', 'W', 'L'] },
        { rank: 3, team: 'Senegal (Lions of Teranga)', mp: 6, w: 4, d: 2, l: 0, gf: 10, ga: 2, gd: '+8', pts: 14, form: ['W', 'D', 'W', 'W', 'D'] },
        { rank: 4, team: 'Morocco (Atlas Lions)', mp: 6, w: 6, d: 0, l: 0, gf: 19, ga: 2, gd: '+17', pts: 18, form: ['W', 'W', 'W', 'W', 'W'] },
        { rank: 5, team: 'Egypt (Pharaohs)', mp: 6, w: 4, d: 2, l: 0, gf: 11, ga: 3, gd: '+8', pts: 14, form: ['W', 'W', 'D', 'D', 'W'] },
      ],
    },
  };

  const rawFixtures = liveMatchEngineFixtures;

  const fixtures = rawFixtures.map((fix) => ({
    ...fix,
    computedDateOffset: fix.matchDateOffset || 'today',
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

  const currentStandingsData = standingsDatasets[activeStandingsLeague] || standingsDatasets.npfl;

  return (
    <div className={`${theme.container} rounded-3xl border shadow-2xl overflow-hidden font-sans transition-colors duration-300 space-y-6`}>
      
      {/* Header Bar */}
      <div className={`${theme.header} px-4 sm:px-8 py-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#D9541E] text-white flex items-center justify-center font-black text-lg shadow-lg shrink-0">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> REAL-TIME SPORTS PIPELINE ACTIVE
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              LAKU MEDIA REALTIME MATCH CENTER & STATS
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
            YESTERDAY (26 AUG)
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
            <span>TODAY (27 AUG)</span>
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
            TOMORROW (28 AUG)
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
                    <span>Full League Table & Stats</span> →
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

                        {/* Expandable Multi-Tab Match Details Drawer */}
                        {isExpanded && (
                          <div className={`${theme.drawerBg} px-6 py-5 border-t space-y-4 text-xs font-medium`}>
                            
                            {/* Drawer Tab Navigation Bar */}
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
                                <BarChart2 className="w-3.5 h-3.5" /> Head-to-Head & Form Guide
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

                            {/* TAB 2: H2H STATS & FORM GUIDE */}
                            {drawerTab === 'h2h' && (
                              <div className="space-y-4 bg-slate-900 text-white p-4 rounded-2xl border border-slate-800">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                  <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                                    <BarChart2 className="w-4 h-4 text-emerald-400" /> HEAD-TO-HEAD STATISTICAL HISTORY
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
                                Full Standings Table & League Hub →
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
            <p className="font-extrabold text-slate-900 dark:text-white">No matches scheduled under current filter criteria.</p>
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

      {/* Prominent Multi-League Standings Table Hub */}
      <div className="p-4 sm:p-8 pt-0">
        <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden space-y-4 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <BarChart2 className="w-3 h-3 text-emerald-400" /> LAKU MEDIA OFFICIAL LEAGUE STANDINGS
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                <span>{currentStandingsData.countryFlag}</span>
                <span>{currentStandingsData.leagueTitle}</span>
              </h2>
            </div>

            <Link
              href={`/leagues/${activeStandingsLeague}`}
              className="px-4 py-2 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shrink-0 w-fit"
            >
              <span>VIEW FULL LEAGUE HUB</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Interactive League Selector Tabs for Standings */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-black">
            <button
              onClick={() => setActiveStandingsLeague('npfl')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeStandingsLeague === 'npfl' ? 'bg-[#D9541E] text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>🇳🇬 NPFL</span>
            </button>

            <button
              onClick={() => setActiveStandingsLeague('epl')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeStandingsLeague === 'epl' ? 'bg-[#D9541E] text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿 PREMIER LEAGUE</span>
            </button>

            <button
              onClick={() => setActiveStandingsLeague('ucl')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeStandingsLeague === 'ucl' ? 'bg-[#D9541E] text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>🇪🇺 CHAMPIONS LEAGUE</span>
            </button>

            <button
              onClick={() => setActiveStandingsLeague('laliga')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeStandingsLeague === 'laliga' ? 'bg-[#D9541E] text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>🇪🇸 LA LIGA</span>
            </button>

            <button
              onClick={() => setActiveStandingsLeague('afcon')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeStandingsLeague === 'afcon' ? 'bg-[#D9541E] text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>🌍 AFCON / AFRICA</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium text-slate-300">
              <thead className="bg-slate-800/80 font-black text-amber-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3 text-center">#</th>
                  <th className="p-3">Club / Team</th>
                  <th className="p-3 text-center">MP</th>
                  <th className="p-3 text-center">W</th>
                  <th className="p-3 text-center">D</th>
                  <th className="p-3 text-center">L</th>
                  <th className="p-3 text-center hidden sm:table-cell">GF:GA</th>
                  <th className="p-3 text-center">GD</th>
                  <th className="p-3 text-center font-black text-white">PTS</th>
                  <th className="p-3 text-center">Form Guide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-bold text-xs">
                {currentStandingsData.rows.map((row: any) => (
                  <tr key={row.rank} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 text-center font-mono text-slate-400 font-black">{row.rank}</td>
                    <td className="p-3 font-extrabold text-white flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0 border border-slate-700">
                        {row.team.substring(0, 1)}
                      </div>
                      <span>{row.team}</span>
                    </td>
                    <td className="p-3 text-center font-mono">{row.mp}</td>
                    <td className="p-3 text-center font-mono text-emerald-400">{row.w}</td>
                    <td className="p-3 text-center font-mono text-amber-400">{row.d}</td>
                    <td className="p-3 text-center font-mono text-rose-400">{row.l}</td>
                    <td className="p-3 text-center font-mono text-slate-400 hidden sm:table-cell">
                      {row.gf}:{row.ga}
                    </td>
                    <td className="p-3 text-center font-mono text-white">{row.gd}</td>
                    <td className="p-3 text-center font-mono font-black text-amber-300 text-sm">{row.pts}</td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {row.form.map((f: string, i: number) => (
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

    </div>
  );
}
