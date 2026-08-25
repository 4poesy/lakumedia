'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Trophy, Film, Activity, User, Menu, X, Sparkles, Flame, Globe, ChevronDown } from 'lucide-react';
import { LiveMatchTicker } from './live-match-ticker';

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leaguesMenuOpen, setLeaguesMenuOpen] = useState(false);

  // Determine active section
  const isMultimedia = pathname.startsWith('/multimedia');

  const navLinks = [
    { href: '/', label: 'Home', icon: Sparkles },
    { href: '/npfl', label: 'NPFL', icon: Trophy, active: pathname === '/npfl' },
    { href: '/world-football', label: 'World Football', icon: Globe, active: pathname === '/world-football' },
    { href: '/transfers', label: 'Transfers', icon: Flame, active: pathname === '/transfers' },
    { href: '/live-scores', label: 'Live Scores', icon: Activity, active: pathname === '/live-scores', badge: 'LIVE' },
    { href: '/multimedia', label: 'Laku Media Watch', icon: Film, active: isMultimedia },
  ];

  const leagueQuickFilters = [
    { label: 'SUPER EAGLES', href: '/world-football', icon: '/leagues/supereagles.jpg' },
    { label: 'WORLD CUP 2026', href: '/world-football', icon: '/leagues/worldcup2026.png' },
    { label: 'NPFL', href: '/npfl', icon: '/leagues/npfl.jpg' },
    { label: 'AFCON', href: '/world-football', icon: '/leagues/afcon.png' },
    { label: 'UCL', href: '/world-football', icon: '/leagues/ucl.png' },
    { label: 'EPL', href: '/epl', icon: '/leagues/epl.png' },
    { label: 'LA LIGA', href: '/world-football', icon: '/leagues/laliga.png' },
    { label: 'SERIE A', href: '/world-football', icon: '/leagues/seriea.png' },
    { label: 'BUNDESLIGA', href: '/world-football', icon: '/leagues/bundesliga.png' },
    { label: 'LIGUE 1', href: '/world-football', icon: '/leagues/ligue1.jpg' },
    { label: 'MLS', href: '/world-football', icon: '/leagues/mls.jpg' },
    { label: 'SAUDI PRO LEAGUE', href: '/world-football', icon: '/leagues/spl.png' },
    { label: 'TURKISH SÜPER LIG', href: '/world-football', icon: '/leagues/turkishsuperlig.png' },
  ];

  // Duplicate for seamless 100% infinite marquee loop
  const infiniteLeagueFilters = [...leagueQuickFilters, ...leagueQuickFilters];

  // Continent & Sub-Divisions Hierarchy
  const globalDivisions = [
    {
      continent: 'EUROPE (UEFA)',
      leagues: [
        { name: 'Premier League (EPL)', subs: ['EFL Championship', 'League One', 'League Two', 'FA Cup', 'Carabao Cup'], href: '/epl' },
        { name: 'La Liga (Spain)', subs: ['La Liga EA Sports', 'La Liga Hypermotion', 'Copa del Rey'], href: '/world-football' },
        { name: 'Serie A (Italy)', subs: ['Serie A Enilive', 'Serie B', 'Coppa Italia'], href: '/world-football' },
        { name: 'Bundesliga (Germany)', subs: ['Bundesliga', '2. Bundesliga', 'DFB-Pokal'], href: '/world-football' },
        { name: 'Ligue 1 (France)', subs: ['Ligue 1 McDonald\'s', 'Ligue 2', 'Coupe de France'], href: '/world-football' },
        { name: 'Süper Lig (Turkey)', subs: ['TFF Süper Lig', 'TFF 1. Lig', 'Turkish Cup'], href: '/world-football' },
        { name: 'UEFA Tournaments', subs: ['UEFA Champions League', 'UEFA Europa League', 'UEFA Conference League'], href: '/world-football' },
      ],
    },
    {
      continent: 'AFRICA (CAF)',
      leagues: [
        { name: 'Nigeria Football', subs: ['NPFL Premier League', 'NNL National League', 'Federation Cup'], href: '/npfl' },
        { name: 'CAF Competitions', subs: ['Africa Cup of Nations (AFCON)', 'CAF Champions League', 'CAF Confederation Cup'], href: '/world-football' },
      ],
    },
    {
      continent: 'AMERICAS (CONCACAF & CONMEBOL)',
      leagues: [
        { name: 'USA & MLS', subs: ['Major League Soccer (MLS)', 'USL Championship', 'US Open Cup'], href: '/world-football' },
        { name: 'South America', subs: ['Copa Libertadores', 'Copa Sudamericana', 'Brazil Serie A', 'Argentina Liga Profesional'], href: '/world-football' },
      ],
    },
    {
      continent: 'ASIA & MIDDLE EAST (AFC)',
      leagues: [
        { name: 'Saudi Arabia', subs: ['Saudi Pro League (Roshn)', 'King Cup'], href: '/world-football' },
        { name: 'AFC Champions League', subs: ['AFC Champions League Elite', 'AFC Cup'], href: '/world-football' },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      
      {/* 1. Goal.com + LiveScore.com Style Top Score Ticker */}
      <LiveMatchTicker />

      {/* 2. Centralized Brand Header Bar with Rich Deep Navy (#2A2E7F) Background */}
      <div className="bg-[#2A2E7F] text-white border-b border-slate-800 py-4 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Spacer Left for desktop symmetry */}
          <div className="hidden md:block w-32" />

          {/* Centralized Brand Logo & Wordmark */}
          <Link href="/" prefetch={true} className="flex flex-col items-center group mx-auto">
            <div className="flex items-center space-x-3">
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-white p-1 shadow-lg shrink-0 border border-slate-200">
                <Image
                  src="/brand/laku-media/laku-media-logo-symbol.jpeg"
                  alt="Laku Media Official Logo"
                  width={44}
                  height={44}
                  className="object-cover w-full h-full rounded-xl"
                  priority
                />
              </div>
              <span className="font-black text-2xl sm:text-3xl tracking-tight text-white">
                LAKU<span className="text-[#D9541E]">MEDIA</span>
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-extrabold mt-1">
              {isMultimedia ? 'Entertainment & Production' : "Nigeria's No.1 Sports & Multimedia"}
            </span>
          </Link>

          {/* Right Auth Action */}
          <div className="hidden md:flex items-center justify-end w-32">
            <Link
              href="/sign-in"
              prefetch={true}
              className="px-4 py-2 rounded-xl text-xs font-extrabold bg-[#D9541E] hover:bg-[#b84315] text-white transition-all flex items-center space-x-1.5 shadow-md active:scale-95 border border-orange-400"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:text-[#D9541E] hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Horizontal Main Navigation Links Bar Below Logo */}
      <div className="hidden md:block bg-white border-b border-slate-200 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.active !== undefined ? link.active : (link.href === '/' ? pathname === '/' : pathname === link.href);
            
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className={`relative px-4 py-2 rounded-lg text-xs font-extrabold transition-colors flex items-center space-x-1.5 active:scale-95 ${
                  isActive
                    ? 'text-white bg-[#D9541E] shadow-sm'
                    : 'text-[#2A2E7F] hover:text-[#D9541E] hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#2A2E7F]'}`} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1 px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-[#D9541E] text-white shadow-sm animate-pulse">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* All Divisions Mega-Menu Trigger Button */}
          {!isMultimedia && (
            <button
              onClick={() => setLeaguesMenuOpen(!leaguesMenuOpen)}
              className="px-4 py-2 rounded-lg text-xs font-extrabold text-[#2A2E7F] hover:text-[#D9541E] hover:bg-slate-100 flex items-center space-x-1 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#2A2E7F]" />
              <span>All Divisions</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${leaguesMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Global Leagues & Sub-Divisions Mega Menu Overlay */}
      {leaguesMenuOpen && !isMultimedia && (
        <div className="bg-white border-t border-b border-slate-200 shadow-2xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#2A2E7F] flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#D9541E]" /> GLOBAL FOOTBALL CONTINENTS & SUB-DIVISIONS HIERARCHY
              </h3>
              <button
                onClick={() => setLeaguesMenuOpen(false)}
                className="text-xs font-extrabold text-[#D9541E] hover:underline"
              >
                Close Menu ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              {globalDivisions.map((cont, idx) => (
                <div key={idx} className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h4 className="font-extrabold text-[#D9541E] uppercase tracking-wider text-[11px]">
                    {cont.continent}
                  </h4>
                  <div className="space-y-3">
                    {cont.leagues.map((lg, lIdx) => (
                      <div key={lIdx} className="space-y-1">
                        <Link
                          href={lg.href}
                          prefetch={true}
                          onClick={() => setLeaguesMenuOpen(false)}
                          className="font-extrabold text-[#2A2E7F] hover:text-[#D9541E] block"
                        >
                          ▸ {lg.name}
                        </Link>
                        <div className="pl-3 space-y-0.5 border-l-2 border-slate-200">
                          {lg.subs.map((sub, sIdx) => (
                            <Link
                              key={sIdx}
                              href={lg.href}
                              prefetch={true}
                              onClick={() => setLeaguesMenuOpen(false)}
                              className="text-[10px] text-slate-600 hover:text-[#D9541E] block font-medium"
                            >
                              • {sub}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Completesports-Style AUTOMATIC CONTINUOUS HORIZONTAL MARQUEE Sub-Bar with All 13 Official League Logos */}
      {!isMultimedia && (
        <div className="bg-slate-50 border-t border-slate-200 py-1.5 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Fixed Live Scores Indicator Left */}
            <div className="shrink-0 pr-3 z-10 bg-slate-50">
              <Link
                href="/live-scores"
                prefetch={true}
                className="px-3 py-1 rounded-md bg-[#D9541E] hover:bg-[#b84315] text-white flex items-center gap-1.5 shrink-0 shadow-sm transition-colors uppercase tracking-wider text-[11px] font-extrabold active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>LIVE SCORES</span>
              </Link>
            </div>

            {/* Continuous Infinite Horizontal Marquee Stream for all 13 League Pills */}
            <div className="overflow-hidden flex-1 relative">
              <div className="animate-league-ticker space-x-2 flex items-center py-0.5">
                {infiniteLeagueFilters.map((filter, idx) => (
                  <Link
                    key={`${filter.label}-${idx}`}
                    href={filter.href}
                    prefetch={true}
                    className="px-2.5 py-1 rounded-md bg-white hover:bg-[#2A2E7F] hover:text-white text-[#2A2E7F] border border-slate-200 shrink-0 transition-colors uppercase tracking-wider text-[10px] font-extrabold active:scale-95 flex items-center gap-1.5 shadow-xs"
                  >
                    {filter.icon && (
                      <img
                        src={filter.icon}
                        alt={filter.label}
                        className="w-4 h-4 object-contain rounded-full bg-white shrink-0 border border-slate-100"
                      />
                    )}
                    <span>{filter.label}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.active !== undefined ? link.active : (link.href === '/' ? pathname === '/' : pathname === link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold ${
                  isActive
                    ? 'bg-[#D9541E] text-white font-extrabold'
                    : 'text-[#2A2E7F] hover:bg-slate-50 hover:text-[#D9541E]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 text-[#2A2E7F]" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-xs px-2 py-0.5 rounded bg-[#D9541E] text-white font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-200">
            <Link
              href="/sign-in"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center px-4 py-2.5 rounded-lg text-sm font-bold bg-[#2A2E7F] text-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
