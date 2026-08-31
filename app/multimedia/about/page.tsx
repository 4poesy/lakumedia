import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, UserCheck, Shield, Film, Sparkles, ArrowRight, Target, Eye, Heart, Users, Star, CheckCircle2, Zap, Radio, Camera, Tv, Globe } from 'lucide-react';
import { StudioSubscriberSection } from '@/components/multimedia/newsletter-popup-modal';
import { Smooth3DSlideshow } from '@/components/ui/smooth-3d-slideshow';
import { AboutHeroAutoCrossfade } from '@/components/multimedia/about-hero-auto-crossfade';
import { AboutPartnerMarquee } from '@/components/multimedia/about-partner-marquee';
import { AboutCeoStatement } from '@/components/multimedia/about-ceo-statement';
import { AboutFacilitiesShowcase } from '@/components/multimedia/about-facilities-showcase';
import { LakuMediaYoutubeShowcase } from '@/components/multimedia/laku-media-youtube-showcase';
import { NeonBorder } from '@/components/ui/neon-border';

export const dynamic = 'force-dynamic';

export default function MultimediaAboutPage() {
  const teamSlides = [
    {
      image: {
        src: '/assest/team/samuel-adebayo-olaku.jpg',
      },
      title: 'SAMUEL ADEBAYO OLAKU\nChief Executive Officer (CEO)',
    },
    {
      image: {
        src: '/assest/team/oluwaseun-olaku.jpg',
      },
      title: 'OLUWASEUN OLAKU\nProduction Manager',
    },
    {
      image: {
        src: '/assest/team/akinola-olujobi.jpg',
      },
      title: 'AKINOLA OLUJOBI\nWeb Developer',
    },
    {
      image: {
        src: '/assest/team/oluwarotimi-ajayi.jpg',
      },
      title: 'OLUWAROTIMI AJAYI\nHead of Operation',
    },
  ];

  return (
    <div className="bg-[#090A0F] text-white min-h-screen space-y-16">
      
      {/* 1. ABOUT HERO SECTION with Auto-Crossfading Background Images */}
      <AboutHeroAutoCrossfade
        images={[
          '/assest/about_hero_auto_camera.jpg',
          '/assest/about_hero_auto_satellite.jpg',
        ]}
        intervalMs={5000}
      />

      {/* 2. ANIMATED CLIENT & PARTNER LOGO MARQUEE */}
      <AboutPartnerMarquee />

      {/* 3. MESSAGE FROM OUR CHIEF EXECUTIVE OFFICER */}
      <AboutCeoStatement />

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

      {/* 5. WHY LAKU MEDIA? 2-COLUMN SHOWCASE */}
      <section className="max-w-7xl mx-auto bg-slate-950 rounded-3xl p-6 sm:p-12 border-2 border-[#10B981]/60 shadow-2xl overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-md bg-[#2A2E7F] text-[#10B981] text-[10px] font-black uppercase tracking-widest border border-slate-700 inline-block">
                THE LAKU MEDIA ADVANTAGE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                WHY <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-[#D9541E]">LAKU MEDIA?</span>
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Laku Media is Africa&apos;s dual-vertical powerhouse bridging world-class 8K cinema production, live satellite sports broadcasting, and commercial brand storytelling. We combine cutting-edge technology with unyielding creative passion to deliver unmatched media experiences.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-[#D9541E]/20 text-[#D9541E] shrink-0 border border-orange-500/40">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">End-to-End Broadcast & Cinema Rigs</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    Own & operate satellite OB vans, RED 8K cinema cameras, FPV aerial drones, and Dolby Atmos audio suites.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-[#10B981]/20 text-[#10B981] shrink-0 border border-[#10B981]/40">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">100% On-Time Delivery Guarantee</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    Zero signal dropouts for live stadium satellite streams and rigorous deadlines for commercial ad releases.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 shrink-0 border border-purple-500/40">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Pan-African & Global Audience Reach</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    Over 10M+ monthly viewers tuning in across Laku Sports and Laku Media Studios entertainment platforms.
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-6 relative h-[380px] sm:h-[480px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group order-1 lg:order-2">
            <Image
              src="/assest/user_why_laku_satellite_sunset_3.jpg"
              alt="Laku Media Satellite Dish Array Silhouette at Sunset"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#10B981] block">
                SATELLITE & CINEMA INFRASTRUCTURE
              </span>
              <h3 className="text-sm font-extrabold text-white">Uninterrupted Global Uplink & Production Capability</h3>
            </div>
          </div>

        </div>
      </section>

      {/* 6. MEET THE EXECUTIVE TEAM & CREATIVE DIRECTORS (3D Coverflow with Authentic Executive Team Photos) */}
      <section className="max-w-7xl mx-auto space-y-8 bg-slate-950 p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl">
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

        <div className="py-4">
          <Smooth3DSlideshow
            slides={teamSlides}
            cardWidth={420}
            cardHeight={440}
            radius={6}
            gap={8}
            tilt={12}
            sideTilt={8}
            autoplay={true}
            showTitle={true}
          />
        </div>
      </section>

      {/* 7. LAKU MEDIA CONCEPTS OFFICIAL YOUTUBE SHOWCASE */}
      <LakuMediaYoutubeShowcase />

      {/* 8. PHYSICAL STUDIOS & LOCATION FACILITIES SHOWCASE */}
      <AboutFacilitiesShowcase />

      {/* 9. Studio Subscriber Section */}
      <div className="max-w-7xl mx-auto">
        <StudioSubscriberSection />
      </div>

    </div>
  );
}
