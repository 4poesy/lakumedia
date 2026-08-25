import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, UserCheck, Shield, Film, Sparkles, ArrowRight, Target, Eye, Heart, Users, Star } from 'lucide-react';
import { BookUsNowSection } from '@/components/multimedia/book-us-now';
import { ParallaxCinemaSection } from '@/components/multimedia/parallax-cinema-section';
import { Smooth3DSlideshow } from '@/components/ui/smooth-3d-slideshow';
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
      title: 'Authentic African Storytelling',
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
      role: 'Chief Executive Officer & Founder',
      bio: 'Visionary media executive leading Laku Media’s dual-vertical expansion across sports journalism and high-definition cinema production.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=75',
      badge: 'FOUNDER & CEO',
    },
    {
      id: 't2',
      name: 'Kemi Adebisi',
      role: 'Head of Broadcast & Live Operations',
      bio: 'Veteran live television producer with 12+ years directing multi-camera satellite OB van stadium streams and concert broadcasts.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=75',
      badge: 'LIVE BROADCAST',
    },
    {
      id: 't3',
      name: 'Chidi Chukwuma',
      role: 'Director of Cinematography & Post-Production',
      bio: 'Award-winning Nollywood cinematographer specializing in RED 8K camera rigging, lighting choreography, and color grading.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=75',
      badge: 'CINEMATOGRAPHY',
    },
    {
      id: 't4',
      name: 'Zainab Bello',
      role: 'Brand Strategy & Creative Lead',
      bio: 'Digital marketing strategist managing corporate reputation, influencer campaigns, and commercial advertising blitzes for global brands.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=75',
      badge: 'BRAND MARKETING',
    },
  ];

  const teamSlides = [
    {
      image: {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=75',
        alt: 'Adebayo Samuel Olaku, CEO Laku Media',
      },
      title: 'Adebayo Samuel Olaku\nChief Executive Officer & Founder',
    },
    {
      image: {
        src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=75',
        alt: 'Kemi Adebisi',
      },
      title: 'Kemi Adebisi\nHead of Broadcast & Live Operations',
    },
    {
      image: {
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=75',
        alt: 'Chidi Chukwuma',
      },
      title: 'Chidi Chukwuma\nDirector of Cinematography',
    },
    {
      image: {
        src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=75',
        alt: 'Zainab Bello',
      },
      title: 'Zainab Bello\nBrand Strategy & Creative Lead',
    },
  ];

  return (
    <div className="bg-[#090A0F] text-white min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8 space-y-20">
      
      {/* 1. Standalone Hero Section (Using Uploaded Digital Globe Space Background Image 1) */}
      <section className="relative rounded-3xl overflow-hidden min-h-[460px] flex items-center justify-center border-2 border-slate-800 shadow-2xl">
        <Image
          src="/studio/studio-about-hero.png"
          alt="Laku Media High-Tech Broadcast Studio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/80 to-[#090A0F]/50" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-12 space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight uppercase drop-shadow-2xl">
            NIGERIA&apos;S PREMIER <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-[#D9541E]">MEDIA PRODUCTION POWERHOUSE</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-200 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
            Pioneering high-definition cinema films, music videos, 24/7 live concert broadcasting, documentaries, and corporate event production.
          </p>
        </div>
      </section>

      {/* Visual Separation Divider */}
      <div className="border-b border-slate-800/80 max-w-7xl mx-auto" />

      {/* 2. Standalone Vision & Mission Section */}
      <section className="max-w-7xl mx-auto space-y-8 pt-2">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981]">
            THE FOUNDATION OF LAKU MEDIA
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase">
            OUR VISION & MISSION STATEMENTS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Vision Card with Neon Border */}
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

          {/* Mission Card with Neon Border */}
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
        </div>
      </section>

      {/* 3. Parallax Cinema Image Section (Using Uploaded Curved LED News Studio Image 2) */}
      <div className="max-w-7xl mx-auto">
        <ParallaxCinemaSection
          title="HOLLYWOOD-GRADE CINEMATOGRAPHY IN WEST AFRICA"
          subtitle="Operating multi-cam satellite OB broadcast vans, 8K RED cinema rigs, and Dolby Atmos audio mixing suites under the leadership of CEO Adebayo Samuel Olaku."
          badge="STUDIO INFRASTRUCTURE"
          imageUrl="/studio/studio-services-hero.jpg"
          ctaText="Explore Studio Portfolio"
          ctaHref="/multimedia/portfolio"
        />
      </div>

      {/* 4. Core Values Section */}
      <section className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981]">
            OUR GUIDING PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase">
            THE 4 CORE VALUES OF LAKU MEDIA
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val) => {
            const Icon = val.icon;
            return (
              <div key={val.id} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl hover:border-[#10B981] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <Icon className={`w-6 h-6 ${val.color}`} />
                </div>
                <h3 className="text-lg font-extrabold text-white">{val.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{val.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Smooth 3D Coverflow Gallery — MEET OUR EXECUTIVE TEAM */}
      <section className="max-w-7xl mx-auto space-y-8 bg-slate-950 p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D9541E] flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#D9541E]" /> EXECUTIVE LEADERSHIP & CREATIVE DIRECTORS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase">
              MEET OUR EXECUTIVE TEAM
            </h2>
          </div>
          <Link
            href="/multimedia/services"
            className="px-5 py-2.5 rounded-xl bg-[#2A2E7F] hover:bg-blue-900 text-white font-extrabold text-xs flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <span>Explore Services</span> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3D Coverflow Slideshow Component */}
        <div className="py-4">
          <Smooth3DSlideshow
            slides={teamSlides}
            cardWidth={420}
            cardHeight={460}
            radius={6}
            gap={10}
            autoplay={true}
          />
        </div>
      </section>

      {/* 6. Book Us Section */}
      <div className="max-w-7xl mx-auto">
        <BookUsNowSection />
      </div>

    </div>
  );
}
