'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Sparkles, ArrowRight } from 'lucide-react';

export function MultimediaHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'slide-1',
      title: 'GIANTS OF AFRICA: THE STORY OF NIGERIAN FOOTBALL',
      category: 'DOCUMENTARY FILM',
      synopsis: 'An inspiring 4K documentary tracing the evolution of Nigerian football from grassroots street academies in Aba to world cup stardom.',
      imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1600&auto=format&fit=crop&q=80',
      badge: 'FEATURED ORIGINAL',
      slug: 'giants-of-africa-nigerian-football',
      badgeColor: 'bg-[#D9541E] text-white',
    },
    {
      id: 'slide-2',
      title: 'LAGOS CITY THRILLER: 8K CINEMA BLOCKBUSTER',
      category: 'THEATRICAL FEATURE',
      synopsis: 'A high-octane Nollywood action thriller shot on location in Victoria Island with RED V-Raptor 8K cinema camera rigs.',
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1600&auto=format&fit=crop&q=80',
      badge: 'IN THEATRES 2026',
      slug: 'films-latest-release',
      badgeColor: 'bg-[#10B981] text-slate-950',
    },
    {
      id: 'slide-3',
      title: 'AFROBEATS STADIUM CONCERT 24/7 LIVE STREAM',
      category: 'LIVE BROADCAST',
      synopsis: 'Multi-camera satellite OB van live concert streaming to 2.5 million fans across African television networks and digital web.',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&auto=format&fit=crop&q=80',
      badge: 'LIVE CONCERT STREAM',
      slug: 'music-shows-latest-release',
      badgeColor: 'bg-purple-600 text-white',
    },
    {
      id: 'slide-4',
      title: 'COMMERCIAL ADVERTISING & BRAND MARKETING',
      category: 'AGENCY PRODUCTIONS',
      synopsis: 'High-converting television commercials, digital campaigns, and executive keynotes for Fortune 500 brands.',
      imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600&auto=format&fit=crop&q=80',
      badge: 'COMMERCIAL REEL',
      slug: 'services',
      badgeColor: 'bg-amber-500 text-slate-950',
    },
  ];

  // Auto-play 5.5s timer for smooth endless sliding
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const active = slides[currentSlide];

  return (
    <section className="relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex items-center group">
      
      {/* Background Image Carousel */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <Image
            src={s.imageUrl}
            alt={s.title}
            fill
            className="object-cover transition-transform duration-10000 scale-105 group-hover:scale-100"
            priority={idx === 0}
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090A0F]/90 via-[#090A0F]/50 to-transparent" />
        </div>
      ))}

      {/* Foreground Hero Content Card */}
      <div className="relative z-20 max-w-3xl p-6 sm:p-12 space-y-4 sm:space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2.5 py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-md ${active.badgeColor} shadow-md`}>
            {active.badge}
          </span>
          <span className="px-2.5 py-1 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest rounded-md bg-[#2A2E7F] text-[#10B981] border border-slate-700">
            {active.category}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight uppercase drop-shadow-2xl">
          {active.title}
        </h1>

        <p className="text-xs sm:text-base text-slate-300 line-clamp-2 sm:line-clamp-3 leading-relaxed font-medium max-w-2xl drop-shadow-md">
          {active.synopsis}
        </p>

        <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
          <Link
            href={`/multimedia/watch/${active.slug}`}
            className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-2xl transition-transform hover:scale-105 active:scale-95 border border-orange-400"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" /> <span>Watch Trailer & Reel</span>
          </Link>
          <Link
            href="/multimedia/services"
            className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-700 backdrop-blur-md transition-colors flex items-center gap-1.5"
          >
            <span>Book Studio</span> <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>
      </div>

      {/* Sleek Minimalist Slider Indicator Dots (NO PREV/NEXT ARROWS) */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-30 flex items-center space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-[#D9541E]' : 'w-2.5 bg-slate-600 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
