import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, Film, Radio, Tv, Sparkles, CheckCircle2, ArrowRight, Video, Music, Calendar, Award } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function MultimediaServicesPage() {
  const agencyServices = [
    {
      id: 's1',
      title: 'Broadcast Media Production',
      description: 'End-to-end multi-cam satellite television broadcasting, OB van deployment, studio set staging, live graphics engineering, and master control room operations.',
      icon: Tv,
      badge: 'TV & BROADCAST',
      color: 'border-[#10B981]',
    },
    {
      id: 's2',
      title: 'Music Videos Production',
      description: 'High-concept 4K/8K cinema music video direction, lighting choreography, color grading, visual effects, and post-production for top recording artists.',
      icon: Music,
      badge: 'MUSIC VIDEOS',
      color: 'border-[#D9541E]',
    },
    {
      id: 's3',
      title: 'Movies & Feature Films',
      description: 'Full-length theatrical film production, scriptwriting, talent casting, location scouting, sound scoring, and international cinema distribution.',
      icon: Film,
      badge: 'CINEMA FILMS',
      color: 'border-[#2A2E7F]',
    },
    {
      id: 's4',
      title: 'Documentaries & Storytelling',
      description: 'Award-winning investigative & cultural documentaries, corporate history films, and brand storytelling crafted for global broadcast networks.',
      icon: Video,
      badge: 'DOCUMENTARIES',
      color: 'border-amber-400',
    },
    {
      id: 's5',
      title: 'Live Streaming & Concert Coverage',
      description: 'Ultra-low latency live multi-platform streaming, festival sound reinforcement, stadium concert staging, and global audience engagement.',
      icon: Radio,
      badge: 'LIVE CONCERTS',
      color: 'border-[#10B981]',
    },
    {
      id: 's6',
      title: 'Private Corporate Events Coverage',
      description: 'Executive keynotes, AGM staging, brand product launches, gala dinner filming, live LED wall staging, and corporate media management.',
      icon: Calendar,
      badge: 'CORPORATE EVENTS',
      color: 'border-[#D9541E]',
    },
  ];

  return (
    <div className="bg-[#090A0F] text-white min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header Section */}
      <section className="max-w-5xl mx-auto text-center space-y-6 pt-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#2A2E7F] border border-slate-700 text-[#10B981] text-xs font-extrabold tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>LAKU MEDIA CREATIVE AGENCY & PRODUCTION STUDIO</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          WORLD-CLASS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-amber-300 to-[#D9541E]">MEDIA PRODUCTION</span> & ENTERTAINMENT SERVICES
        </h1>

        <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
          From blockbuster movies & music videos to live stadium concert broadcasting & corporate event staging, Laku Media delivers high-definition production excellence.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-4 rounded-2xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-sm shadow-2xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 border border-orange-400"
          >
            <span>Hire Laku Media Studio</span> <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/multimedia/about"
            className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm border border-slate-700 transition-colors"
          >
            About Laku Media Agency
          </Link>
        </div>
      </section>

      {/* Services Grid (Dark Obsidian Cards with Electric Lemon Green & Burnt Orange Fills) */}
      <section className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981] block">
              OUR PRODUCTION CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              6 CORE CREATIVE MEDIA SERVICES
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agencyServices.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-slate-950 p-8 rounded-3xl border border-slate-800 hover:border-[#10B981] shadow-2xl transition-all duration-300 space-y-5 group hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#2A2E7F] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-[#10B981]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-[10px] font-extrabold text-amber-400 border border-slate-700 uppercase tracking-widest">
                    {srv.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-white group-hover:text-[#10B981] transition-colors leading-snug">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-xs font-extrabold text-[#D9541E]">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> 100% Studio Managed
                  </span>
                  <Link href="/contact" className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Book Service</span> →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Production Studio Showcase Banner */}
      <section className="max-w-7xl mx-auto bg-slate-950 rounded-3xl p-8 lg:p-12 border border-slate-800 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="px-3 py-1 rounded-full bg-[#2A2E7F] text-[#10B981] font-extrabold text-xs tracking-widest uppercase">
              STUDIO CAPACITY & EQUIPMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              STATE-OF-THE-ART PRODUCTION INFRASTRUCTURE
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Under the executive leadership of CEO Adebayo Samuel Olaku, Laku Media Agency operates multi-camera OB broadcast vans, 4K RED/ARRI cinema rigs, aerial drones, and Dolby sound suites.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-extrabold text-white pt-2">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[#10B981] font-black text-xl block">4K / 8K</span>
                <span>Cinema Rigging</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[#D9541E] font-black text-xl block">OB VAN</span>
                <span>Satellite Broadcast</span>
              </div>
            </div>
          </div>

          <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-900 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop"
              alt="Laku Media Production Equipment"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
