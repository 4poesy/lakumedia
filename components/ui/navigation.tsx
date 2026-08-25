'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Trophy, Film, Activity, User, Menu, X, Sparkles, Flame, Globe } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { label: 'SUPER EAGLES', href: '/world-football' },
    { label: 'WORLD CUP 2026', href: '/world-football' },
    { label: 'NPFL', href: '/npfl' },
    { label: 'AFCON', href: '/world-football' },
    { label: 'UCL', href: '/world-football' },
    { label: 'EPL', href: '/epl' },
    { label: 'LA LIGA', href: '/world-football' },
    { label: 'SERIE A', href: '/world-football' },
    { label: 'BUNDESLIGA', href: '/world-football' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Wordmark - Official Laku Media Colors (#2A2E7F Deep Navy & #D9541E Burnt Orange) */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
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
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-extrabold transition-colors flex items-center space-x-1.5 ${
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
          </nav>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/sign-in"
              className="px-4 py-2 rounded-lg text-xs font-extrabold bg-[#2A2E7F] hover:bg-[#1f2260] text-white transition-all flex items-center space-x-1.5 shadow-sm"
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

      {/* Completesports-Style Sub-Bar for League Quick-Filters */}
      {!isMultimedia && (
        <div className="bg-slate-50 border-t border-slate-200 py-1.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center space-x-2 overflow-x-auto text-[11px] font-extrabold scrollbar-none">
            {/* Live Scores Button */}
            <Link
              href="/live-scores"
              className="px-3 py-1 rounded-md bg-[#D9541E] hover:bg-[#b84315] text-white flex items-center gap-1.5 shrink-0 shadow-sm transition-colors uppercase tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>LIVE SCORES</span>
            </Link>

            {/* League Pills */}
            {leagueQuickFilters.map((filter, idx) => (
              <Link
                key={idx}
                href={filter.href}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-200 text-[#2A2E7F] hover:text-[#D9541E] border border-slate-200 shrink-0 transition-colors uppercase tracking-wider text-[10px]"
              >
                {filter.label}
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
