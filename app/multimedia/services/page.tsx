import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, Film, Radio, Tv, Sparkles, CheckCircle2, ArrowRight, Video, Music, Calendar, Zap } from 'lucide-react';
import { BookUsNowSection } from '@/components/multimedia/book-us-now';
import { StudioFaqSection } from '@/components/multimedia/studio-faq';
import { StudioSubscriberSection } from '@/components/multimedia/newsletter-popup-modal';

export const dynamic = 'force-dynamic';

export default function MultimediaServicesPage() {
  const agencyServices = [
    {
      id: 's1',
      title: 'Broadcast Media Production',
      description: 'End-to-end multi-cam satellite television broadcasting, OB van deployment, studio set staging, live graphics engineering, and master control room operations.',
      icon: Tv,
      badge: 'TV & BROADCAST',
    },
    {
      id: 's2',
      title: 'Music Videos Production',
      description: 'High-concept 4K/8K cinema music video direction, lighting choreography, color grading, visual effects, and post-production for top recording artists.',
      icon: Music,
      badge: 'MUSIC VIDEOS',
    },
    {
      id: 's3',
      title: 'Movies & Feature Films',
      description: 'Full-length theatrical film production, scriptwriting, talent casting, location scouting, sound scoring, and international cinema distribution.',
      icon: Film,
      badge: 'CINEMA FILMS',
    },
    {
      id: 's4',
      title: 'Documentaries & Storytelling',
      description: 'Award-winning investigative & cultural documentaries, corporate history films, and brand storytelling crafted for global broadcast networks.',
      icon: Video,
      badge: 'DOCUMENTARIES',
    },
    {
      id: 's5',
      title: 'Live Streaming & Concert Coverage',
      description: 'Ultra-low latency live multi-platform streaming, festival sound reinforcement, stadium concert staging, and global audience engagement.',
      icon: Radio,
      badge: 'LIVE CONCERTS',
    },
    {
      id: 's6',
      title: 'Private Corporate Events Coverage',
      description: 'Executive keynotes, AGM staging, brand product launches, gala dinner filming, live LED wall staging, and corporate media management.',
      icon: Calendar,
      badge: 'CORPORATE EVENTS',
    },
  ];

  return (
    <div className="bg-[#090A0F] text-white min-h-screen space-y-16">
      
      {/* High-Tech Studio Services Hero Header with Lighter Overlay for Image Clarity */}
      <section className="relative rounded-3xl overflow-hidden min-h-[440px] sm:min-h-[500px] flex items-center justify-center border-2 border-slate-800 shadow-2xl">
        <Image
          src="/assest/user_services_hero_cinema.jpg"
          alt="Laku Media Production Studio Services Cinema Theater"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/50 to-[#090A0F]/20 opacity-90" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-12 space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight uppercase drop-shadow-2xl">
            WORLD-CLASS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-amber-300 to-[#D9541E]">MEDIA PRODUCTION</span> & ENTERTAINMENT SERVICES
          </h1>

          <p className="text-sm sm:text-lg text-slate-100 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
            From blockbuster movies & music videos to live stadium concert broadcasting & corporate event staging, Laku Media delivers high-definition production excellence.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-2xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-sm shadow-2xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 border border-orange-400"
            >
              <span>Hire Laku Media Studio</span> <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981] block">
              OUR PRODUCTION CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
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

      {/* EXTENDED PARALLAX WRAPPER with Reduced Overlay Darkness for Red Curtains Background Visibility */}
      <section className="relative rounded-3xl overflow-hidden max-w-7xl mx-auto my-12 border-2 border-slate-800 shadow-2xl p-6 sm:p-12 space-y-12">
        {/* Fixed Parallax Red Curtains Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('/assest/user_red_curtains_parallax.jpg')` }}
        />
        {/* Transparent Dark Overlay for Parallax Image Clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090A0F]/75 via-[#090A0F]/60 to-[#090A0F]/75 backdrop-blur-[1px]" />
        
        {/* FAQ Section inside Extended Parallax Container */}
        <div className="relative z-10">
          <StudioFaqSection />
        </div>

        {/* Theatrical Cinema Experience Section inside Extended Parallax Container */}
        <div className="relative z-10 pt-8 border-t border-slate-800/80">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-xs font-extrabold tracking-widest uppercase shadow-xl backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>THEATRICAL CINEMA EXPERIENCE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight uppercase drop-shadow-2xl">
              WE PRODUCE UNFORGETTABLE CINEMATIC EXPERIENCES
            </h2>

            <p className="text-sm sm:text-lg text-slate-100 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
              From RED 8K camera rigging and theatrical cinema projection to live satellite OB van broadcasting, Laku Media Studios sets the benchmark for African filmmaking.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-2xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-sm shadow-2xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 border border-orange-400"
              >
                <span>Book Private Screening</span> <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/multimedia/portfolio"
                className="px-8 py-4 rounded-2xl bg-slate-950/80 hover:bg-slate-900 text-white font-extrabold text-sm border border-slate-700 backdrop-blur-md transition-colors"
              >
                Watch Portfolio Reel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subscriber Section */}
      <div className="max-w-7xl mx-auto">
        <StudioSubscriberSection />
      </div>

      {/* Book Us Section */}
      <div className="max-w-7xl mx-auto">
        <BookUsNowSection />
      </div>

    </div>
  );
}
