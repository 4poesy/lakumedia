'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export function OfficialPartnersBar() {
  const PARTNERS = [
    {
      id: 'mtn',
      name: 'MTN Nigeria',
      category: '5G Official Telecom Partner',
      tagline: 'High-speed 5G streaming for live match updates & commentary.',
      logoUrl: '/assest/ads/mtn-logo.jpg',
      targetUrl: 'https://www.mtn.ng',
      borderColor: 'hover:border-amber-400',
    },
    {
      id: 'rtm',
      name: 'RTM Media',
      category: 'Official Broadcast & OB Uplink Partner',
      tagline: 'Satellite OB vans & 8K broadcast distribution across West Africa.',
      logoUrl: '/assest/ads/rtm-logo.jpg',
      targetUrl: 'https://wa.me/2348108285303',
      borderColor: 'hover:border-blue-400',
    },
    {
      id: 'coca-cola',
      name: 'Coca-Cola',
      category: 'Official Matchday Refreshment Partner',
      tagline: 'Refreshing Super Eagles fans & NPFL matchday centers nationwide.',
      logoUrl: '/assest/ads/coca-cola-logo.jpg',
      targetUrl: 'https://www.coca-cola.com',
      borderColor: 'hover:border-rose-500',
    },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 my-8 select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> OFFICIAL COMMERCIAL PARTNERS & SPONSORS
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            Powered by Leading Global Brands
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Laku Media partners with industry leaders to deliver top-tier sports broadcasting and digital experiences.
          </p>
        </div>

        <Link
          href="/advertise"
          className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 font-black text-xs uppercase tracking-wider border border-slate-800 transition-colors inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Become a Sponsor</span>
        </Link>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PARTNERS.map((p) => (
          <a
            key={p.id}
            href={p.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-slate-950 p-5 rounded-2xl border border-slate-800 ${p.borderColor} transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between space-y-4 group`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden relative bg-slate-900 shrink-0 p-1.5 border border-slate-700/80 shadow-lg group-hover:border-emerald-500/50 transition-colors">
                <img
                  src={p.logoUrl}
                  alt={p.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 filter drop-shadow-md"
                />
              </div>

              <div>
                <span className="text-[9px] font-mono font-black uppercase tracking-wider text-amber-400 block">
                  {p.category}
                </span>
                <h4 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors leading-tight">
                  {p.name}
                </h4>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              {p.tagline}
            </p>

            <div className="pt-2 flex items-center justify-between border-t border-slate-900 text-xs font-black uppercase text-slate-400 group-hover:text-white transition-colors">
              <span>Visit Partner</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </a>
        ))}
      </div>

    </div>
  );
}
