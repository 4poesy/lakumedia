'use me';
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

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Wordmark - Laku Media Official Branding */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
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
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                  {isMultimedia ? 'Entertainment & Production' : 'Sports & Entertainment'}
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
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive
                      ? isMultimedia
                        ? 'text-[#D9541E] bg-[#D9541E]/10 border border-[#D9541E]/30 shadow-sm'
                        : 'text-emerald-700 bg-emerald-50 border border-emerald-200 shadow-sm'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? (isMultimedia ? 'text-[#D9541E]' : 'text-emerald-600') : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-rose-100 text-rose-700 border border-rose-200 animate-pulse">
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
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm ${
                isMultimedia
                  ? 'bg-[#2A2E7F] hover:bg-[#1f2260] text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

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
                    ? 'bg-slate-100 text-slate-900 font-extrabold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-xs px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-bold border border-rose-200">
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
              className="w-full block text-center px-4 py-2.5 rounded-lg text-sm font-bold bg-emerald-600 text-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
