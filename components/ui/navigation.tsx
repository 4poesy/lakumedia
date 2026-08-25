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
    { label: 'LIGUE 1', href: '/world-football', icon: '/leagues/ucl.png' },
    { label: 'MLS', href: '/world-football', icon: '/leagues/ucl.png' },
    { label: 'SAUDI PRO LEAGUE', href: '/world-football', icon: '/leagues/ucl.png' },
    { label: 'TURKISH SÜPER LIG', href: '/world-football', icon: '/leagues/ucl.png' },
  ];

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

      {/* 2. Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center space-x-3">
            <Link href="/" prefetch={true} className="flex items-center space-x-2.5 group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm shrink-0">
                <Image
                  src="/brand/laku-media/laku-media-logo-symbol.jpeg"
                  alt="Laku Media Official Logo"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#2A2E7F] flex items-center">
                  LAKU<span className="text-[#D9541E]">MEDIA</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#D9541E] font-extrabold">
                  {isMultimedia ? 'Entertainment & Production' : "Nigeria's No.1 Sports & Multimedia"}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.active !== undefined ? link.active : (link.href === '/' ? pathname === '/' : pathname === link.href);
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-extrabold transition-colors flex items-center space-x-1.5 active:scale-95 ${
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
                className="px-3.5 py-2 rounded-lg text-xs font-extrabold text-[#2A2E7F] hover:text-[#D9541E] hover:bg-slate-100 flex items-center space-x-1 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#2A2E7F]" />
                <span>All Divisions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${leaguesMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            )}
          </nav>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/sign-in"
              prefetch={true}
              className="px-4 py-2 rounded-lg text-xs font-extrabold bg-[#2A2E7F] hover:bg-[#1f2260] text-white transition-all flex items-center space-x-1.5 shadow-sm active:scale-95"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2A2E7F] hover:text-[#D9541E] hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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

      {/* Completesports-Style Sub-Bar with Official League Logos (Including Ligue 1, MLS, Saudi, Turkish) */}
      {!isMultimedia && (
        <div className="bg-slate-50 border-t border-slate-200 py-1.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center space-x-2 overflow-x-auto text-[11px] font-extrabold scrollbar-none">
            {/* Live Scores Button */}
            <Link
              href="/live-scores"
              prefetch={true}
              className="px-3 py-1 rounded-md bg-[#D9541E] hover:bg-[#b84315] text-white flex items-center gap-1.5 shrink-0 shadow-sm transition-colors uppercase tracking-wider active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>LIVE SCORES</span>
            </Link>

            {/* League Pills with Official League Logos */}
            {leagueQuickFilters.map((filter, idx) => (
              <Link
                key={idx}
                href={filter.href}
                prefetch={true}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-200 text-[#2A2E7F] hover:text-[#D9541E] border border-slate-200 shrink-0 transition-colors uppercase tracking-wider text-[10px] active:scale-95 flex items-center gap-1.5"
              >
                {filter.icon && (
                  <img
                    src={filter.icon}
                    alt={filter.label}
                    className="w-4 h-4 object-contain rounded-full bg-white shrink-0"
                  />
                )}
                <span>{filter.label}</span>
              </Link>
            ))}
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
