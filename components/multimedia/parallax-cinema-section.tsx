'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Film, Play, Sparkles, ArrowRight, Award } from 'lucide-react';

interface ParallaxSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function ParallaxCinemaSection({
  title = "WE PRODUCE UNFORGETTABLE CINEMATIC EXPERIENCES",
  subtitle = "From RED 8K camera rigging and drone aerials to live satellite OB van broadcasting, Laku Media Studios sets the benchmark for African filmmaking.",
  badge = "HOLLYWOOD PRODUCTION GRADE",
  imageUrl = "/assest/red_curtain_parallax.jpg",
  ctaText = "Explore Studio Services",
  ctaHref = "/multimedia/services",
}: ParallaxSectionProps) {
  return (
    <section className="relative rounded-3xl overflow-hidden my-12 border-2 border-slate-800 shadow-2xl group min-h-[420px] flex items-center justify-center">
      {/* Background Image with CSS Parallax Fixed Attachment */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed transition-transform duration-1000 scale-105 group-hover:scale-100"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />

      {/* Dark Obsidian & Deep Navy Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#090A0F]/95 via-[#090A0F]/80 to-[#2A2E7F]/70" />
      <div className="absolute inset-0 bg-slate-950/40" />

      {/* Glassmorphic Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-12 space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-xs font-extrabold tracking-widest uppercase shadow-xl backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{badge}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight uppercase drop-shadow-2xl">
          {title}
        </h2>

        <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
          {subtitle}
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={ctaHref}
            className="px-8 py-4 rounded-2xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-sm shadow-2xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 border border-orange-400"
          >
            <span>{ctaText}</span> <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/multimedia/portfolio"
            className="px-8 py-4 rounded-2xl bg-slate-950/80 hover:bg-slate-900 text-white font-extrabold text-sm border border-slate-700 backdrop-blur-md transition-colors"
          >
            Watch Portfolio Reel
          </Link>
        </div>
      </div>
    </section>
  );
}
