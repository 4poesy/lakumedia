'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Megaphone, ExternalLink, Sparkles } from 'lucide-react';

interface LeaderboardAdBannerProps {
  sponsorName?: string;
  sponsorTagline?: string;
  targetUrl?: string;
  logoUrl?: string;
  badgeText?: string;
}

export function LeaderboardAdBanner({
  sponsorName = 'MTN 5G ULTRA-FAST MATCHDAY STREAM',
  sponsorTagline = 'Stream NPFL & Premier League live commentary with zero latency on Nigeria\'s #1 5G Network.',
  targetUrl = 'https://www.mtn.ng',
  logoUrl = '/assest/ads/mtn-logo.jpg',
  badgeText = 'OFFICIAL 5G PARTNER',
}: LeaderboardAdBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-amber-500/30 shadow-xl my-4 group">
      {/* Background Dark Layer */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950" />

      <div className="relative z-10 p-3.5 sm:p-4 px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        
        {/* Left Ad Content with Sponsor Logo */}
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-amber-400/40 p-1 shrink-0 shadow-md">
            <img
              src={logoUrl}
              alt={sponsorName}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {badgeText}
              </span>
              <span className="text-[10px] font-bold text-slate-400 hidden md:inline">Verified Commercial Sponsor</span>
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-white mt-0.5 group-hover:text-amber-300 transition-colors">
              {sponsorName}
            </h4>
            <p className="text-[11px] text-slate-300 font-medium line-clamp-1 hidden sm:block">
              {sponsorTagline}
            </p>
          </div>
        </div>

        {/* Right CTA Button & Partner Link */}
        <div className="flex items-center space-x-3 shrink-0 self-end sm:self-auto">
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all active:scale-95 border border-amber-300"
          >
            <span>Visit Partner</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <Link
            href="/advertise"
            className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-[10px] uppercase tracking-wider border border-slate-800 transition-colors hidden lg:inline-flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Ad With Us</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
