'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, ShieldAlert, ArrowRight, Trophy } from 'lucide-react';

export function FcBayernNewsHub() {
  const bayernStyleArticles = [
    {
      id: 'b1',
      tag: 'FC BAYERN MUNICH SPOTLIGHT',
      title: 'Harry Kane & Musiala Masterclass Powers Bayern Munich Victory',
      slug: 'fc-bayern-munich-harry-kane-musiala-victory',
      excerpt: 'Exclusive tactical breakdown of FC Bayern Munich\'s dominant performance in the UEFA Champions League marquee fixture.',
      imageUrl: '/assest/user_kane_musiala_bayern.jpg',
      time: '1 hour ago',
      badgeColor: 'bg-[#D9541E] text-white',
    },
    {
      id: 'b2',
      tag: 'TRANSFERS & SCOUTING',
      title: 'Super Eagles Target Included In FC Bayern Summer Scouting List',
      slug: 'super-eagles-target-fc-bayern-scouting-list',
      excerpt: 'Bayern Munich sporting directors have officially dispatched scouts to monitor the Nigerian international winger.',
      imageUrl: '/assest/user_home_hero_4th_slide.jpg',
      time: '3 hours ago',
      badgeColor: 'bg-[#10B981] text-slate-950',
    },
    {
      id: 'b3',
      tag: 'MATCHDAY HUB',
      title: 'Der Klassiker Preview: Bayern Munich vs Borussia Dortmund Countdown',
      slug: 'der-klassiker-preview-bayern-munich-dortmund',
      excerpt: 'Everything you need to know ahead of Saturday\'s crucial Bundesliga clash at Allianz Arena.',
      imageUrl: '/assest/user_world_football_kane_musiala.jpg',
      time: '5 hours ago',
      badgeColor: 'bg-[#2A2E7F] text-white',
    },
  ];

  return (
    <section className="bg-slate-950 rounded-3xl p-5 sm:p-8 border-2 border-slate-800 shadow-2xl space-y-6 my-8 overflow-hidden text-white">
      
      {/* FC Bayern Munich Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-3.5 h-8 rounded-full bg-[#D9541E] shadow-md" />
          <div className="space-y-0.5">
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">
              OFFICIAL TACTICAL NEWS HUB
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#D9541E]" /> MATCHDAY HUB & TACTICAL ANALYSIS
            </h2>
          </div>
        </div>

        <Link
          href="/world-football"
          prefetch={true}
          className="px-4 py-2.5 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 border border-orange-400 self-start sm:self-auto uppercase tracking-wider"
        >
          <span>Explore All News</span> <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* FC Bayern Revamped 3-Card Grid (Mobile First 1-Col, Desktop 3-Col) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bayernStyleArticles.map((art) => (
          <div
            key={art.id}
            className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-[#10B981] shadow-xl transition-all duration-300 group flex flex-col justify-between"
          >
            {/* Image Container with Dynamic Badge Overlay */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
              <Image
                src={art.imageUrl}
                alt={art.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/20" />
              
              <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-md ${art.badgeColor} shadow-lg border border-slate-700 backdrop-blur-md`}>
                  {art.tag}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-slate-900">
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-black text-white group-hover:text-[#10B981] transition-colors leading-snug line-clamp-2">
                  <Link href={`/article/${art.slug}`} prefetch={true}>
                    {art.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 font-medium leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-extrabold">
                <span>{art.time}</span>
                <Link
                  href={`/article/${art.slug}`}
                  prefetch={true}
                  className="text-[#D9541E] hover:underline flex items-center gap-1 font-black"
                >
                  <span>Read Breakdown</span> →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
