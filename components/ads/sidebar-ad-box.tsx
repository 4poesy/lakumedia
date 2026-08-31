'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Sparkles, Trophy } from 'lucide-react';

interface SidebarAdBoxProps {
  title?: string;
  subtitle?: string;
  sponsorName?: string;
  targetUrl?: string;
  imageUrl?: string;
  ctaText?: string;
}

export function SidebarAdBox({
  title = 'Official Matchday Betting Partner',
  subtitle = 'Get 300% Welcome Bonus on First Deposit for All NPFL & European Fixtures',
  sponsorName = 'BET9JA / PREMIER BET',
  targetUrl = 'https://www.bet9ja.com',
  imageUrl = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
  ctaText = 'Claim 300% Bonus',
}: SidebarAdBoxProps) {
  return (
    <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden group select-none">
      {/* Background Graphic Accent */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-1.5">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            OFFICIAL ADVERTISEMENT
          </span>
        </div>
        <span className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          SPONSORED
        </span>
      </div>

      {/* Main Image Container */}
      <div className="relative h-36 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
          <span className="text-[10px] font-black text-amber-300 font-mono uppercase tracking-wider bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-md">
            {sponsorName}
          </span>
        </div>
      </div>

      {/* Ad Copy */}
      <div className="space-y-1">
        <h4 className="text-sm font-extrabold text-white group-hover:text-emerald-400 transition-colors leading-snug">
          {title}
        </h4>
        <p className="text-xs text-slate-400 font-medium leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* CTA Button */}
      <div className="pt-2 flex items-center space-x-2">
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 rounded-xl bg-[#10B981] hover:bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-transform active:scale-95 border border-emerald-400"
        >
          <span>{ctaText}</span>
          <ExternalLink className="w-3.5 h-3.5 fill-slate-950" />
        </a>

        <Link
          href="/advertise"
          className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors shrink-0"
          title="Advertise on Laku Media"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
        </Link>
      </div>
    </div>
  );
}
