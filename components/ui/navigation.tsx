'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Trophy, Film, Activity, User, Menu, X, Sparkles, Flame, Globe, ChevronDown, Camera, Briefcase, DollarSign, Info, Radio, Code, BookOpen, Settings, LogOut, UserCircle } from 'lucide-react';
import { LiveMatchTicker } from './live-match-ticker';
import { LiveMcrStatusBar } from '@/components/layout/live-mcr-status-bar';

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leaguesMenuOpen, setLeaguesMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  // Determine active vertical
  const isMultimedia = pathname.startsWith('/multimedia');

  // Clean Public Sports Navigation Bar Links (CMS Admin REMOVED from public nav)
  const sportsNavLinks = [
    { href: '/', label: 'Home', icon: Sparkles },
    { href: '/npfl', label: 'NPFL', icon: Trophy, active: pathname === '/npfl' },
    { href: '/world-football', label: 'World Football', icon: Globe, active: pathname === '/world-football' },
    { href: '/transfers', label: 'Transfers', icon: Flame, active: pathname === '/transfers' },
    { href: '/live-scores', label: 'Live Scores', icon: Activity, active: pathname === '/live-scores', badge: 'LIVE' },
    { href: '/multimedia', label: 'LAKU MEDIA', icon: Camera, active: isMultimedia, badge: 'STUDIO' },
  ];

  // Exact requested order for Laku Media Studio: Laku Media Hub, About Us, Services, Portfolio, Pricing, Laku Media Sport
  const multimediaNavLinks = [
    { href: '/multimedia', label: 'Laku Media Hub', icon: Film, active: pathname === '/multimedia' },
    { href: '/multimedia/about', label: 'About Us', icon: Info, active: pathname === '/multimedia/about' },
    { href: '/multimedia/services', label: 'Services', icon: Camera, active: pathname === '/multimedia/services' },
    { href: '/multimedia/portfolio', label: 'Portfolio', icon: Briefcase, active: pathname === '/multimedia/portfolio' },
    { href: '/multimedia/pricing', label: 'Pricing', icon: DollarSign, active: pathname === '/multimedia/pricing' },
    { href: '/multimedia/blog', label: 'Blog', icon: BookOpen, active: pathname.startsWith('/multimedia/blog'), badge: 'NEW' },
    { href: '/', label: '⚽ LAKU MEDIA SPORT', icon: Trophy, active: false, badge: 'SPORTS HOME' },
  ];

  const currentNavLinks = isMultimedia ? multimediaNavLinks : sportsNavLinks;

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

  const infiniteLeagueFilters = [...leagueQuickFilters, ...leagueQuickFilters];

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
      
      {/* Top Ticker / MCR Live Status Bar */}
      {isMultimedia ? <LiveMcrStatusBar /> : <LiveMatchTicker />}

      {/* Crisp Header Bar with Official Laku Media Branding (Navy + Burnt Orange) */}
      <div className="bg-[#2A2E7F] text-white border-b border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:block w-40" />

          {/* Centralized Crisp Brand Logo */}
          <Link href="/" prefetch={true} className="flex flex-col items-center group mx-auto">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-white p-1 shadow-lg shrink-0 border border-slate-200">
                <Image
                  src="/brand/laku-media/laku-media-logo-symbol.jpeg"
                  alt="Laku Media Official Logo Mark"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full rounded-xl"
                  priority
                />
              </div>
              <span className="font-black text-2xl sm:text-3xl tracking-tight text-white">
                LAKU<span className="text-[#D9541E]">MEDIA</span>
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-amber-300 font-black mt-0.5">
              {isMultimedia ? 'Entertainment & Production' : "Nigeria's Premier Sports & Media Hub"}
            </span>
          </Link>

          {/* Web Desktop Header Actions with Account & Laku Radio Dropdown */}
          <div className="hidden md:flex items-center justify-end space-x-2.5 relative">
            <div className="relative">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="px-4 py-2 rounded-xl text-xs font-extrabold bg-[#D9541E] hover:bg-[#b84315] text-white transition-all flex items-center space-x-1.5 shadow-md active:scale-95 border border-orange-400 cursor-pointer"
              >
                <User className="w-4 h-4 text-white" />
                <span>Sign In / Account</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 space-y-1 z-50 text-slate-900 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => {
                      alert('📻 Laku Media Radio is streaming 24/7 live sports commentary!');
                      setAccountMenuOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-amber-50 text-xs font-extrabold text-slate-900 flex items-center space-x-2.5 transition-colors border border-transparent hover:border-amber-300"
                  >
                    <Radio className="w-4 h-4 text-[#D9541E] animate-pulse shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-slate-900 font-black">LAKU RADIO 📻</span>
                      <span className="text-[10px] text-amber-700 font-bold">24/7 Live Commentary</span>
                    </div>
                  </button>

                  <div className="border-t border-slate-100 my-1" />

                  <Link
                    href="/sign-in"
                    prefetch={true}
                    onClick={() => setAccountMenuOpen(false)}
                    className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-slate-100 text-xs font-extrabold text-slate-800 flex items-center space-x-2 transition-colors"
                  >
                    <UserCircle className="w-4 h-4 text-[#2A2E7F]" />
                    <span>Sign In to Account</span>
                  </Link>

                  <Link
                    href="/sign-up"
                    prefetch={true}
                    onClick={() => setAccountMenuOpen(false)}
                    className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-slate-100 text-xs font-extrabold text-slate-800 flex items-center space-x-2 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Create New Account</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button - Clean & Uncluttered */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-white hover:text-[#D9541E] hover:bg-slate-800/80 focus:outline-none border border-slate-700/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Main Navigation Links Bar Below Logo */}
      <div className="hidden md:block bg-white border-b border-slate-200 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-1">
          {currentNavLinks.map((link) => {
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
                    : link.badge === 'SPORTS HOME'
                    ? 'text-white bg-[#10B981] hover:bg-emerald-600 shadow-sm'
                    : 'text-[#2A2E7F] hover:text-[#D9541E] hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive || link.badge === 'SPORTS HOME' ? 'text-white' : 'text-[#2A2E7F]'}`} />
                <span>{link.label}</span>
                {link.badge && link.badge !== 'SPORTS HOME' && (
                  <span className={`ml-1 px-1.5 py-0.2 text-[9px] font-bold rounded-full text-white shadow-sm ${link.badge === 'STUDIO' ? 'bg-[#10B981]' : 'bg-[#D9541E] animate-pulse'}`}>
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* All Divisions Mega-Menu Trigger Button (Sports Mode Only) */}
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

      {/* Global Leagues Overlay */}
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

      {/* Marquee Ticker (Sports Mode Only) */}
      {!isMultimedia && (
        <div className="bg-slate-50 border-t border-slate-200 py-1.5 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
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
          {currentNavLinks.map((link) => {
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
                    : link.badge === 'SPORTS HOME'
                    ? 'bg-[#10B981] text-white font-extrabold'
                    : 'text-[#2A2E7F] hover:bg-slate-50 hover:text-[#D9541E]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive || link.badge === 'SPORTS HOME' ? 'text-white' : 'text-[#2A2E7F]'}`} />
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
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                alert('📻 Laku Media Radio is streaming live sports commentary 24/7!');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-black bg-amber-400 text-slate-950 flex items-center justify-center space-x-2 shadow-sm"
            >
              <Radio className="w-4 h-4 text-slate-950 animate-pulse" />
              <span>LISTEN TO LAKU RADIO 📻</span>
            </button>

            <Link
              href="/sign-in"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center px-4 py-2.5 rounded-lg text-sm font-bold bg-[#2A2E7F] text-white"
            >
              Sign In / Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
