'use client';

import React from 'react';

export function AboutPartnerMarquee() {
  const partners = [
    { name: 'SUPERSPORT', category: 'SATELLITE SPORTS' },
    { name: 'NETFLIX AFRICA', category: 'ORIGINAL FILMS' },
    { name: 'DSTV / MULTICHOICE', category: 'BROADCAST NETWORK' },
    { name: 'NOLLYWOOD CINEMAS', category: 'THEATRICAL RELEASES' },
    { name: 'NPFL LEAGUE', category: 'LIVE STADIUM FEEDS' },
    { name: 'CANAL+ INTERNATIONAL', category: 'PAN-AFRICAN TV' },
    { name: 'PEPSI ENTERTAINMENT', category: 'COMMERCIAL CAMPAIGNS' },
    { name: 'RED BULL MEDIA HOUSE', category: 'EXTREME SPORTS' },
  ];

  return (
    <section className="bg-slate-950 py-8 border-y border-slate-800 shadow-2xl overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#10B981] block">
          TRUSTED BY GLOBAL BROADCASTERS & ENTERTAINMENT BRANDS
        </span>
      </div>

      {/* Infinite Ticker Container */}
      <div className="flex overflow-hidden whitespace-nowrap group select-none">
        <div className="flex animate-marquee space-x-10 shrink-0 items-center justify-around">
          {partners.map((partner, index) => (
            <div
              key={`p1-${index}`}
              className="inline-flex items-center space-x-3 px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg hover:border-[#D9541E] transition-colors"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#D9541E] animate-pulse" />
              <div>
                <span className="text-sm font-black text-white uppercase tracking-wider block">
                  {partner.name}
                </span>
                <span className="text-[9px] font-extrabold text-slate-400 block uppercase">
                  {partner.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Duplicate Set for Seamless Loop */}
        <div className="flex animate-marquee space-x-10 shrink-0 items-center justify-around aria-hidden:true">
          {partners.map((partner, index) => (
            <div
              key={`p2-${index}`}
              className="inline-flex items-center space-x-3 px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg hover:border-[#D9541E] transition-colors"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <div>
                <span className="text-sm font-black text-white uppercase tracking-wider block">
                  {partner.name}
                </span>
                <span className="text-[9px] font-extrabold text-slate-400 block uppercase">
                  {partner.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
