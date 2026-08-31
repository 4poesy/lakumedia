import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BookUsNowSection } from '@/components/multimedia/book-us-now';
import { StudioSubscriberSection } from '@/components/multimedia/newsletter-popup-modal';
import { PortfolioClientGrid } from '@/components/multimedia/portfolio-client-grid';
import { LakuMediaYoutubeShowcase } from '@/components/multimedia/laku-media-youtube-showcase';

export const dynamic = 'force-dynamic';

export default function MultimediaPortfolioPage() {
  const portfolioProjects = [
    {
      id: 'port-1',
      title: 'Laku Media Concepts Cinema Production & Broadcast Reel',
      category: 'LIVE CONCERT BROADCAST',
      client: 'Laku Media Concepts Network',
      description: 'Full multi-camera satellite OB van live stream to viewers across YouTube and African television networks.',
      imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop',
      youtubeId: 'MFAejiCKDjk',
    },
    {
      id: 'port-2',
      title: 'Commercial Brand Campaign & Studio Film Showcase',
      category: 'DOCUMENTARY FILM',
      client: 'Laku Media Originals',
      description: 'Feature length 4K theatrical commercial exploring brand storytelling and visual direction.',
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop',
      youtubeId: 'szV-YWVJ5aY',
    },
    {
      id: 'port-3',
      title: 'Live Event Satellite Coverage & Multicam Production',
      category: 'MUSIC VIDEO DIRECTION',
      client: 'Starboy Entertainment',
      description: 'Hollywood-grade RED Cinema 8K music video production shot on location.',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop',
      youtubeId: 'zZHbLPiXAos',
    },
    {
      id: 'port-4',
      title: 'Laku Media Documentary & Cultural Storytelling Series',
      category: 'CORPORATE EVENT STAGING',
      client: 'Corporate Brand Network',
      description: 'Stage lighting choreography, 4K multi-cam live LED wall feed, and executive keynote video production.',
      imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&auto=format&fit=crop',
      youtubeId: 'mJag5F0ASqQ',
    },
    {
      id: 'port-5',
      title: 'Music Video Direction & 8K Cinema Color Grading',
      category: 'BROADCAST ADVERTISING',
      client: 'Global Music Labels',
      description: 'High-impact broadcast TV advert with 3D CGI animation and Dolby sound mixing.',
      imageUrl: 'https://images.unsplash.com/photo-1543351611-c823945f1007?w=1200&auto=format&fit=crop',
      youtubeId: 'CwZLn1s0q-k',
    },
    {
      id: 'port-6',
      title: 'Corporate Brand Film & Executive Studio Production',
      category: 'DRONE & VISUAL EFFECTS',
      client: 'Laku Media Creative Studio',
      description: 'FPV high-speed drone aerial filming across landmarks and coastal infrastructure.',
      imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop',
      youtubeId: 'BIiwifY-41I',
    },
  ];

  return (
    <div className="bg-[#090A0F] text-white min-h-screen space-y-16">
      
      {/* 1. STUDIO PORTFOLIO HERO HEADER */}
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
              <span>Book Studio Production</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Interactive Client Grid Section */}
      <section className="max-w-7xl mx-auto">
        <PortfolioClientGrid initialProjects={portfolioProjects} />
      </section>

      {/* 3. LAKU MEDIA CONCEPTS OFFICIAL YOUTUBE SHOWCASE */}
      <LakuMediaYoutubeShowcase />

      {/* 4. Book Us Now Section */}
      <BookUsNowSection />

      {/* 5. Studio Subscriber Section */}
      <div className="max-w-7xl mx-auto">
        <StudioSubscriberSection />
      </div>

    </div>
  );
}
