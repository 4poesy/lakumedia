import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Sparkles, Camera, Film, Tv, Radio, ArrowRight, CheckCircle2, Award, Zap } from 'lucide-react';
import { BookUsNowSection } from '@/components/multimedia/book-us-now';
import { StudioFaqSection } from '@/components/multimedia/studio-faq';
import { StudioSubscriberSection } from '@/components/multimedia/newsletter-popup-modal';

export const dynamic = 'force-dynamic';

export default function MultimediaPortfolioPage() {
  const portfolioProjects = [
    {
      id: 'port-1',
      title: 'Lagos Stadium International Music Concert',
      category: 'LIVE CONCERT BROADCAST',
      client: 'African Music Awards Network',
      description: 'Full multi-camera satellite OB van live stream to 1.5 million viewers across YouTube and African television networks.',
      imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop',
      youtubeId: '3Q06g9O0J-Y',
    },
    {
      id: 'port-2',
      title: 'Giants of Africa: Feature Cinema Documentary',
      category: 'DOCUMENTARY FILM',
      client: 'Laku Media Originals',
      description: 'Feature length 4K theatrical documentary exploring grassroots football talent discovery in West Africa.',
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop',
      youtubeId: 'dQw4w9WgXcQ',
    },
    {
      id: 'port-3',
      title: 'Global Afrobeats Music Video Shoot',
      category: 'MUSIC VIDEO DIRECTION',
      client: 'Starboy Entertainment',
      description: 'Hollywood-grade RED Cinema 8K music video production shot on location in Aba and Lagos.',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop',
      youtubeId: 'L_LUpnjgPso',
    },
    {
      id: 'port-4',
      title: 'Annual Banking Executives Summit AGM',
      category: 'CORPORATE EVENT STAGING',
      client: 'First Bank of Nigeria',
      description: 'Stage lighting choreography, 4K multi-cam live LED wall feed, and executive keynote video production.',
      imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&auto=format&fit=crop',
      youtubeId: 'kXYiU_JCYtU',
    },
    {
      id: 'port-5',
      title: 'National Television Broadcast Commercial Advert',
      category: 'BROADCAST ADVERTISING',
      client: 'MTN Telecommunications',
      description: 'High-impact 30-second broadcast TV advert with 3D CGI animation and Dolby sound mixing.',
      imageUrl: 'https://images.unsplash.com/photo-1543351611-c823945f1007?w=1200&auto=format&fit=crop',
      youtubeId: '3Q06g9O0J-Y',
    },
    {
      id: 'port-6',
      title: 'Aerial Drone Cinematography Spotlight',
      category: 'DRONE & VISUAL EFFECTS',
      client: 'Laku Media Creative Studio',
      description: 'FPV high-speed drone aerial filming across Nigerian landmarks and coastal infrastructure.',
      imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop',
      youtubeId: 'dQw4w9WgXcQ',
    },
  ];

  return (
    <div className="bg-[#090A0F] text-white min-h-screen space-y-16">
      
      {/* 1. STUDIO PORTFOLIO HERO HEADER with Lighter Overlay for Background Image Clarity */}
      <section className="relative rounded-3xl overflow-hidden min-h-[440px] sm:min-h-[500px] flex items-center justify-center border-2 border-slate-800 shadow-2xl">
        <Image
          src="/assest/user_portfolio_hero_stage.jpg"
          alt="Laku Media Production Studio Stage & Camera Equipment Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/50 to-[#090A0F]/20 opacity-90" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-xs font-extrabold tracking-widest uppercase shadow-xl backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>LAKU MEDIA CREATIVE PORTFOLIO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight uppercase drop-shadow-2xl">
            OUR RECENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-[#D9541E]">PRODUCTION JOBS</span> & REELS
          </h1>

          <p className="text-sm sm:text-lg text-slate-100 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
            Explore completed music videos, live stadium broadcasts, corporate event keynotes, and cinema films produced by Laku Media.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-2xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-sm shadow-2xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 border border-orange-400"
            >
              <span>Book Studio Project</span> <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SHOWCASE SECTION 1: 2-COLUMN LAYOUT (User Image 2 on LEFT, Content on RIGHT) */}
      <section className="max-w-7xl mx-auto bg-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 relative h-[340px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
            <Image
              src="/assest/user_portfolio_crew_set.jpg"
              alt="Laku Media Camera Crew Filming On Studio Set"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#10B981] block">
                ON-SET CINEMATOGRAPHY
              </span>
              <h3 className="text-sm font-extrabold text-white">RED 8K Camera Rigging & Crew Coordination</h3>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-md bg-[#2A2E7F] text-[#10B981] text-[10px] font-black uppercase tracking-widest border border-slate-700">
                PRODUCTION CASE STUDY #1
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                STATE-OF-THE-ART <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#10B981]">STUDIO FILMING</span> & DIRECTION
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Under executive leadership, Laku Media Studios orchestrates multi-camera video shoots with precision lighting choreography, high-speed camera cranes, and synchronized audio capture for film sets and commercial campaigns.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-2xl font-black text-[#D9541E]">100%</span>
                <p className="text-xs text-slate-400 font-bold">4K/8K Cinema Standard</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-2xl font-black text-[#10B981]">50+</span>
                <p className="text-xs text-slate-400 font-bold">Delivered Commercials</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-xs inline-flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95 border border-orange-400 uppercase tracking-wider"
              >
                <span>Request Case Study Deck</span> <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Portfolio Projects Grid */}
      <section className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981] block">
              FEATURED PRODUCTION REELS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
              DELIVERED STUDIO PROJECTS
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 hover:border-[#10B981] shadow-2xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                <Image
                  src={proj.imageUrl}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/30" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md bg-[#2A2E7F] text-[#10B981] font-extrabold text-[10px] uppercase tracking-widest border border-slate-700 shadow-md">
                    {proj.category}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <a
                    href={`https://www.youtube.com/watch?v=${proj.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-14 h-14 rounded-full bg-[#D9541E] hover:bg-[#b84315] text-white flex items-center justify-center pl-1 shadow-2xl group-hover:scale-110 transition-transform"
                  >
                    <Play className="w-6 h-6 fill-white" />
                  </a>
                </div>
              </div>

              <div className="p-6 space-y-3 bg-slate-950 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block">
                    CLIENT: {proj.client}
                  </span>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-[#10B981] transition-colors leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-xs font-extrabold text-[#D9541E]">
                  <span className="text-slate-400 font-mono">Status: Delivered</span>
                  <a
                    href={`https://www.youtube.com/watch?v=${proj.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline flex items-center gap-1"
                  >
                    <span>Watch Reel</span> →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SHOWCASE SECTION 2: 2-COLUMN LAYOUT (Content on LEFT, User Image 3 on RIGHT) */}
      <section className="max-w-7xl mx-auto bg-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-md bg-[#D9541E]/20 text-[#D9541E] text-[10px] font-black uppercase tracking-widest border border-orange-500/40">
                PRODUCTION CASE STUDY #2
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                ADVANCED <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#D9541E]">STAGE LIGHTING</span> & STUDIO SET DESIGN
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Laku Media provides custom studio set rigging, professional softboxes, key lights, overhead spotlights, and sound-treated acoustics designed for high-end television shows, music videos, and film productions.
            </p>

            <div className="space-y-3 font-extrabold text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Multi-Angle Studio Spotlights & Key Lighting Rigs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Soundproofed Master Acoustic Recording Environment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Dolby Atmos Sound Mixing & Color Grading Suite</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/multimedia/services"
                className="px-7 py-3.5 rounded-xl bg-[#2A2E7F] hover:bg-blue-900 text-white font-extrabold text-xs inline-flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95 border border-slate-700 uppercase tracking-wider"
              >
                <span>Explore Technical Specs</span> <ArrowRight className="w-4 h-4 text-emerald-400" />
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 relative h-[340px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group order-1 lg:order-2">
            <Image
              src="/assest/user_portfolio_lighting_crew.jpg"
              alt="Laku Media Studio Lighting & Crew Production Setup"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                LIGHTING & SET DESIGN
              </span>
              <h3 className="text-sm font-extrabold text-white">Professional Studio Lighting Rigs & Sound Staging</h3>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto">
        <StudioFaqSection />
      </div>

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
