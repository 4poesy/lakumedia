'use client';

import React from 'react';
import Link from 'next/link';
import { Film, Tv, Sparkles, Trophy, Music } from 'lucide-react';
import { ScrollRevealSection, ScrollRevealChild } from '@/components/multimedia/motion/scroll-reveal-section';
import { CinematicCardMotion } from '@/components/multimedia/motion/cinematic-card-motion';

export function StudioCollectionsHub() {
  const collections = [
    {
      id: 'c1',
      title: 'LAKU ORIGINALS',
      subtitle: 'Exclusive Cinema Films',
      icon: Film,
      href: '/multimedia/films',
      bgGradient: 'from-amber-600/40 via-slate-950 to-slate-950 border-amber-500/40 hover:border-amber-400',
      badgeColor: 'bg-amber-500 text-slate-950',
    },
    {
      id: 'c2',
      title: 'AFROBEATS LIVE',
      subtitle: 'Concerts & Festivals',
      icon: Music,
      href: '/multimedia/music-shows',
      bgGradient: 'from-purple-600/40 via-slate-950 to-slate-950 border-purple-500/40 hover:border-purple-400',
      badgeColor: 'bg-purple-500 text-white',
    },
    {
      id: 'c3',
      title: 'FOOTBALL DOCS',
      subtitle: 'Super Eagles & NPFL',
      icon: Trophy,
      href: '/multimedia/documentaries',
      bgGradient: 'from-[#10B981]/40 via-slate-950 to-slate-950 border-[#10B981]/40 hover:border-emerald-400',
      badgeColor: 'bg-[#10B981] text-slate-950',
    },
    {
      id: 'c4',
      title: 'NOLLYWOOD HITS',
      subtitle: 'Top Theatrical Movies',
      icon: Tv,
      href: '/multimedia/films',
      bgGradient: 'from-[#D9541E]/40 via-slate-950 to-slate-950 border-[#D9541E]/40 hover:border-orange-400',
      badgeColor: 'bg-[#D9541E] text-white',
    },
    {
      id: 'c5',
      title: 'LAKU KIDS 4K',
      subtitle: 'Animations & Stories',
      icon: Sparkles,
      href: '/multimedia/kids-shows',
      bgGradient: 'from-cyan-600/40 via-slate-950 to-slate-950 border-cyan-500/40 hover:border-cyan-400',
      badgeColor: 'bg-cyan-400 text-slate-950',
    },
  ];

  return (
    <ScrollRevealSection stagger className="space-y-4 py-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-6 rounded-full bg-[#10B981] shadow-sm" />
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
            FEATURED STUDIO HUBS
          </h2>
        </div>
        <span className="text-xs font-bold text-slate-400">5 Curated Collections</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {collections.map((col) => {
          const Icon = col.icon;
          return (
            <ScrollRevealChild key={col.id}>
              <CinematicCardMotion hoverScale={1.04} hoverY={-4}>
                <Link
                  href={col.href}
                  className={`bg-gradient-to-b ${col.bgGradient} p-5 rounded-2xl border shadow-xl flex flex-col justify-between h-36 group transition-all duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${col.badgeColor}`}>
                      4K ULTRA
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-medium">{col.subtitle}</p>
                  </div>
                </Link>
              </CinematicCardMotion>
            </ScrollRevealChild>
          );
        })}
      </div>
    </ScrollRevealSection>
  );
}
