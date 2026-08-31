'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Sparkles, Trophy } from 'lucide-react';

export function CocaColaAdBox() {
  return (
    <div className="bg-slate-900 rounded-3xl p-5 border border-rose-500/30 shadow-xl space-y-4 relative overflow-hidden group select-none">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-rose-500/10 blur-xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-1.5">
          <Trophy className="w-4 h-4 text-rose-400" />
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            MATCHDAY REFRESHMENT PARTNER
          </span>
        </div>
        <span className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
          COCA-COLA
        </span>
      </div>

      {/* Main Logo Container (No White Box) */}
      <div className="relative h-36 w-full rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-rose-500/30 flex items-center justify-center p-4 overflow-hidden shadow-2xl group">
        <div className="absolute inset-0 bg-rose-500/10 blur-2xl group-hover:bg-rose-500/20 transition-all duration-700 pointer-events-none" />
        <img
          src="/assest/ads/coca-cola-logo.jpg"
          alt="Coca-Cola Official Matchday Refreshment"
          className="max-h-28 w-auto object-contain transition-all duration-700 group-hover:scale-110 filter drop-shadow-[0_0_20px_rgba(225,29,72,0.7)]"
        />
      </div>

      {/* Copy */}
      <div className="space-y-1">
        <h4 className="text-sm font-extrabold text-white group-hover:text-rose-400 transition-colors leading-snug">
          Real Magic on Matchday
        </h4>
        <p className="text-xs text-slate-400 font-medium leading-relaxed">
          Refreshing Super Eagles fans & NPFL stadium centers nationwide. Stay refreshed for every kickoff.
        </p>
      </div>

      {/* CTA Button */}
      <div className="pt-2 flex items-center space-x-2">
        <a
          href="https://www.coca-cola.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-transform active:scale-95 border border-rose-400"
        >
          <span>Discover Coca-Cola</span>
          <ExternalLink className="w-3.5 h-3.5 fill-white" />
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
