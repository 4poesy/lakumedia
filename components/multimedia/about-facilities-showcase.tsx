'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Navigation, Radio, Tv, Camera } from 'lucide-react';
import { NeonBorder } from '@/components/ui/neon-border';

export function AboutFacilitiesShowcase() {
  const facilities = [
    {
      id: 'fac-ogun',
      name: 'OGUN STATE MAIN STUDIO COMPLEX & TELEPORT',
      location: 'Km 12 Lagos-Ibadan Expressway, Ogun State, Nigeria',
      badge: 'MAIN SOUNDSTAGE & SATELLITE MCR',
      badgeColor: 'bg-[#10B981] text-slate-950',
      description: 'Features a 12,000 sq.ft acoustically-treated soundstage, Dolby Atmos audio mixing suite, 8K RED post-production bay, and dual C/Ku-band satellite teleport dishes.',
      imageUrl: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&auto=format&fit=crop&q=75',
    },
    {
      id: 'fac-lagos',
      name: 'LAGOS DIGITAL PUBLISHING & LAKU SPORTS HUB',
      location: 'Plot 1422, Ahmadu Bello Way, Victoria Island, Lagos State',
      badge: 'REALTIME SPORTS NEWSDESK & EDITORIAL',
      badgeColor: 'bg-[#D9541E] text-white',
      description: 'Houses the 24/7 Laku Sports newsroom, live scores aggregation center, executive podcast recording studio, and client strategy suites.',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=75',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto space-y-8 bg-slate-950 p-6 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#D9541E] flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-[#D9541E]" /> WORLD-CLASS PRODUCTION FOOTPRINT
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            PHYSICAL STUDIOS & LOCATION FACILITIES
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {facilities.map((fac) => (
          <div
            key={fac.id}
            className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-[#10B981] shadow-2xl transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
              <Image
                src={fac.imageUrl}
                alt={fac.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest shadow-md ${fac.badgeColor}`}>
                  {fac.badge}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-white group-hover:text-[#10B981] transition-colors leading-snug">
                  {fac.name}
                </h3>

                <div className="flex items-start space-x-2 text-xs font-semibold text-amber-400">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{fac.location}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-medium pt-2">
                  {fac.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
