'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, ShieldAlert, ArrowRight } from 'lucide-react';

export function FcBayernNewsHub() {
  const bayernStyleArticles = [
    {
      id: 'b1',
      tag: 'FC BAYERN MUNICH SPOTLIGHT',
      title: 'Harry Kane & Musiala Masterclass Powers Bayern Munich Victory',
      slug: 'fc-bayern-munich-harry-kane-musiala-victory',
      excerpt: 'Exclusive tactical breakdown of FC Bayern Munich\'s dominant performance in the UEFA Champions League marquee fixture.',
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop',
      time: '1 hour ago',
    },
    {
      id: 'b2',
      tag: 'TRANSFERS & SCOUTING',
      title: 'Super Eagles Target Included In FC Bayern Summer Scouting List',
      slug: 'super-eagles-target-fc-bayern-scouting-list',
      excerpt: 'Bayern Munich sporting directors have officially dispatched scouts to monitor the Nigerian international winger.',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop',
      time: '3 hours ago',
    },
    {
      id: 'b3',
      tag: 'MATCHDAY HUB',
      title: 'Der Klassiker Preview: Bayern Munich vs Borussia Dortmund Countdown',
      slug: 'der-klassiker-preview-bayern-munich-dortmund',
      excerpt: 'Everything you need to know ahead of Saturday\'s crucial Bundesliga clash at Allianz Arena.',
      imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop',
      time: '5 hours ago',
    },
  ];

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 my-8">
      {/* FC Bayern Munich Style Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-3.5 h-7 rounded-full bg-[#D9541E]" />
          <div>
            <span className="text-[10px] font-extrabold text-[#D9541E] uppercase tracking-widest block">
              INSPIRED BY FC BAYERN MUNICH OFFICIAL NEWS HUB
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#2A2E7F] uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#D9541E]" /> MATCHDAY HUB & TACTICAL ANALYSIS
            </h2>
          </div>
        </div>
        <Link
          href="/world-football"
          prefetch={true}
          className="px-4 py-2 rounded-xl bg-[#2A2E7F] hover:bg-[#1f2260] text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-colors self-start sm:self-auto"
        >
          <span>Explore All News</span> <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* FC Bayern Clean 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bayernStyleArticles.map((art) => (
          <div
            key={art.id}
            className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-[#D9541E] transition-all group flex flex-col justify-between"
          >
            <div className="relative h-48 w-full overflow-hidden bg-slate-200">
              <Image
                src={art.imageUrl}
                alt={art.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded bg-[#2A2E7F] text-white shadow-sm">
                  {art.tag}
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#D9541E] transition-colors leading-snug line-clamp-2">
                  <Link href={`/article/${art.slug}`} prefetch={true}>
                    {art.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 font-medium leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-bold">
                <span>{art.time}</span>
                <Link
                  href={`/article/${art.slug}`}
                  prefetch={true}
                  className="text-[#D9541E] hover:underline flex items-center gap-1"
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
