import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, UserCheck, Shield, Film, Sparkles, ArrowRight, Target, Eye, Heart, Users, Star, CheckCircle2, Zap, Radio, Camera, Tv } from 'lucide-react';
import { StudioSubscriberSection } from '@/components/multimedia/newsletter-popup-modal';
import { NeonBorder } from '@/components/ui/neon-border';

export const dynamic = 'force-dynamic';

export default function MultimediaAboutPage() {
  const coreValues = [
    {
      id: 'v1',
      title: 'Cinematic Excellence',
      description: 'We hold every production to global 4K/8K cinema standards, utilizing RED/ARRI camera rigs and Dolby sound suites.',
      icon: Star,
      color: 'text-amber-400',
    },
    {
      id: 'v2',
      title: 'Authentic Storytelling',
      description: 'We empower local voices, cultural heritage, and sports narratives across Nigeria, Africa, and the global diaspora.',
      icon: Heart,
      color: 'text-[#D9541E]',
    },
    {
      id: 'v3',
      title: 'Client Trust & Reliability',
      description: '100% on-time delivery for live satellite broadcasts, commercial adverts, and theatrical release deadlines.',
      icon: Shield,
      color: 'text-[#10B981]',
    },
    {
      id: 'v4',
      title: 'Creative Audacity',
      description: 'Pioneering FPV aerial drone cinematography, 3D CGI visual effects, and multi-cam broadcast innovations.',
      icon: Sparkles,
      color: 'text-purple-400',
    },
  ];

  const executiveTeam = [
    {
      id: 't1',
      name: 'Adebayo Samuel Olaku',
      role: 'Chief Executive Officer & Managing Director',
      bio: 'Visionary media executive pioneering 4K/8K cinema productions, satellite sports broadcasting, and commercial entertainment across Africa.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=75',
      badge: 'FOUNDER & CEO',
      badgeColor: 'bg-[#D9541E] text-white',
    },
    {
      id: 't2',
      name: 'Kemi Adebisi',
      role: 'Head of Live Broadcast & Satellite MCR',
      bio: 'Master of multi-camera OB satellite van operations, live graphics engineering, and stadium stream uplinks.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=75',
      badge: 'SATELLITE MCR LEAD',
      badgeColor: 'bg-[#10B981] text-slate-950',
    },
    {
      id: 't3',
      name: 'Chidi Chukwuma',
      role: 'Director of Cinematography & Lighting',
      bio: 'Award-winning cinematographer specialized in RED V-Raptor 8K camera rigging, anamorphic lenses, and stage lighting choreography.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=75',
      badge: 'CINEMATOGRAPHY LEAD',
      badgeColor: 'bg-[#2A2E7F] text-[#10B981]',
    },
    {
      id: 't4',
      name: 'Zainab Bello',
      role: 'Brand Strategy & Creative Director',
      bio: 'Leading high-concept commercial ad campaigns, music video creative direction, and digital brand storytelling.',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=75',
      badge: 'CREATIVE DIRECTOR',
      badgeColor: 'bg-purple-600 text-white',
    },
  ];

  return (
    <div className="bg-[#090A0F] text-white min-h-screen space-y-16">
      
      {/* 1. STANDALONE ABOUT HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden min-h-[460px] sm:min-h-[520px] flex items-center justify-center border-2 border-slate-800 shadow-2xl">
        <Image
          src="/assest/user_portfolio_hero_stage.jpg"
          alt="Laku Media High-Tech Production Studio Stage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/50 to-[#090A0F]/20 opacity-90" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-xs font-extrabold tracking-widest uppercase shadow-xl backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>ABOUT LAKU MEDIA & CREATIVE STUDIOS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight uppercase drop-shadow-2xl">
            PIONEERING <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-[#D9541E]">4K/8K CINEMA</span> & SATELLITE BROADCASTING
          </h1>

          <p className="text-sm sm:text-lg text-slate-100 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
            Under executive leadership, Laku Media operates multi-camera satellite OB vans, 8K RED cinema rigs, Dolby Atmos audio suites, and a premier sports publishing portal.
          </p>
        </div>
      </section>

      {/* 2. ALTERNATING 2-COLUMN SHOWCASE 1 (Image on LEFT, Content on RIGHT) */}
      <section className="max-w-7xl mx-auto bg-slate-950 rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column (Image) */}
          <div className="lg:col-span-6 relative h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
            <Image
              src="/assest/user_portfolio_crew_set.jpg"
              alt="Laku Media Camera Crew Filming On Set"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#10B981] block">
                OUR ORIGIN STORY
              </span>
              <h3 className="text-sm font-extrabold text-white">Built From Passion for African Cinema & Sports</h3>
            </div>
          </div>

          {/* Right Column (Content) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-md bg-[#2A2E7F] text-[#10B981] text-[10px] font-black uppercase tracking-widest border border-slate-700">
                COMPANY OVERVIEW
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                AFRICA&apos;S PREMIER <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#10B981]">DUAL-VERTICAL</span> ENTERTAINMENT HOUSE
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Founded under the executive guidance of Chief Executive Officer Adebayo Samuel Olaku, Laku Media has grown into a powerhouse across two core verticals: **Laku Sports** (realtime news, scores, and sports aggregation) and **Laku Media Studios** (theatrical film production, music video direction, and satellite broadcasting).
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-2xl font-black text-[#D9541E]">10M+</span>
                <p className="text-xs text-slate-400 font-bold">Monthly Viewers</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-2xl font-black text-[#10B981]">100+</span>
                <p className="text-xs text-slate-400 font-bold">Delivered Productions</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. ALTERNATING 2-COLUMN SHOWCASE 2 (Content on LEFT, Image on RIGHT) */}
      <section className="max-w-7xl mx-auto bg-slate-950 rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-md bg-[#D9541E]/20 text-[#D9541E] text-[10px] font-black uppercase tracking-widest border border-orange-500/40">
                STATE-OF-THE-ART INFRASTRUCTURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                CUTTING-EDGE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#D9541E]">STUDIO & OB VAN</span> CAPABILITIES
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              We own and operate satellite Outside Broadcast (OB) vans, 8K RED V-Raptor cinema rigs, high-speed FPV aerial drones, and Dolby Atmos audio suites designed to power high-stakes broadcasts and blockbuster movies.
            </p>

            <div className="space-y-3 font-extrabold text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Multi-Camera Satellite OB Van Broadcasting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>RED V-Raptor 8K Cinema Camera Rigs & Anamorphic Lenses</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Dolby Atmos Master Audio Recording & Color Grading Suite</span>
              </div>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="lg:col-span-6 relative h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group order-1 lg:order-2">
            <Image
              src="/assest/user_portfolio_lighting_crew.jpg"
              alt="Laku Media Studio Lighting & Crew Setup"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                PRODUCTION ENGINEERING
              </span>
              <h3 className="text-sm font-extrabold text-white">Full-Scale Stage Rigging & Master Control Operations</h3>
            </div>
          </div>

        </div>
      </section>

      {/* 4. VISION & MISSION CARDS */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <NeonBorder color="#10B981" rounded={24} thickness={4} borderSize={60} glow={90}>
          <div className="bg-slate-950 p-8 sm:p-10 rounded-3xl space-y-4 relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-[#2A2E7F] flex items-center justify-center shadow-lg">
              <Eye className="w-7 h-7 text-[#10B981]" />
            </div>
            <span className="text-xs font-extrabold text-[#10B981] uppercase tracking-widest block">OUR VISION</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">To Be Africa&apos;s Foremost Multimedia Studio</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              To establish Laku Media as the leading African media ecosystem, renowned globally for cinema-grade film production, satellite live broadcasting, and high-impact commercial brand campaigns.
            </p>
          </div>
        </NeonBorder>

        <NeonBorder color="#D9541E" rounded={24} thickness={4} borderSize={60} glow={90}>
          <div className="bg-slate-950 p-8 sm:p-10 rounded-3xl space-y-4 relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-[#D9541E] flex items-center justify-center shadow-lg">
              <Target className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs font-extrabold text-[#D9541E] uppercase tracking-widest block">OUR MISSION</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Empowering African Stories & Global Brands</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              To deliver world-class 4K/8K video production, multi-camera live stream coverage, theatrical movies, and strategic digital marketing that captivate millions of viewers worldwide.
            </p>
          </div>
        </NeonBorder>
      </section>

      {/* 5. MEET THE EXECUTIVE TEAM & CREATIVE DIRECTORS */}
      <section className="max-w-7xl mx-auto space-y-10 bg-slate-950 p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D9541E] flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#D9541E]" /> EXECUTIVE LEADERSHIP & CREATIVE TEAM
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase">
              MEET THE TEAM BEHIND LAKU MEDIA
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {executiveTeam.map((member) => (
            <div
              key={member.id}
              className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-[#10B981] shadow-2xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative h-72 w-full overflow-hidden bg-slate-950">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest shadow-md ${member.badgeColor}`}>
                    {member.badge}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white group-hover:text-[#10B981] transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <span className="text-xs font-extrabold text-amber-400 block uppercase tracking-wider">
                    {member.role}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium pt-2">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Studio Subscriber Section */}
      <div className="max-w-7xl mx-auto">
        <StudioSubscriberSection />
      </div>

    </div>
  );
}
