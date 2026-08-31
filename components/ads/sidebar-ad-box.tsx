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
  title = 'Official Broadcast & OB Uplink Partner',
  subtitle = 'RTM Media multi-camera satellite OB vans & 8K cinema infrastructure.',
  sponsorName = 'RTM MEDIA',
  targetUrl = 'https://wa.me/2348108285303',
  imageUrl = '/assest/ads/rtm-logo.jpg',
  ctaText = 'Book Satellite Uplink',
}: SidebarAdBoxProps) {
  return (
    <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden group select-none">
      {/* Background Graphic Accent */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-1.5">
          <Trophy className="w-4 h-4 text-blue-400" />
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            OFFICIAL BROADCAST PARTNER
          </span>
        </div>
        <span className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
          RTM BROADCAST
        </span>
      </div>

      {/* Main Logo Showcase with Cinematic Movement (No White Box) */}
      <div className="relative h-40 w-full rounded-2xl bg-gradient-to-b from-slate-950/90 via-slate-900/90 to-slate-950 border border-blue-500/30 flex items-center justify-center p-4 overflow-hidden shadow-2xl group">
        <div className="absolute inset-0 bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all duration-700 pointer-events-none" />
        <img
          src={imageUrl}
          alt={title}
          className="max-h-32 w-auto object-contain transition-all duration-700 group-hover:scale-110 animate-pulse filter drop-shadow-[0_0_25px_rgba(37,99,235,0.75)]"
        />
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
