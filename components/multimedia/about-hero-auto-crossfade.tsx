'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

interface AboutHeroAutoCrossfadeProps {
  images?: string[];
  intervalMs?: number;
}

export function AboutHeroAutoCrossfade({
  images = [
    '/assest/about_hero_auto_camera.jpg',
    '/assest/about_hero_auto_satellite.png',
  ],
  intervalMs = 5000,
}: AboutHeroAutoCrossfadeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length < 2) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images, intervalMs]);

  return (
    <section className="relative rounded-3xl overflow-hidden min-h-[480px] sm:min-h-[540px] flex items-center justify-center border-2 border-slate-800 shadow-2xl bg-[#090A0F]">
      {/* Render background images with smooth opacity transition */}
      {images.map((imgUrl, index) => {
        const isPng = imgUrl.endsWith('.png');
        return (
          <div
            key={imgUrl}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ transitionProperty: 'opacity, transform' }}
          >
            <Image
              src={imgUrl}
              alt="Laku Media Production Infrastructure"
              fill
              className={isPng ? 'object-contain p-10 sm:p-14' : 'object-cover'}
              priority={index === 0}
            />
          </div>
        );
      })}

      {/* Cinematic Dark Gradient Overlays for High Contrast Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/65 to-[#090A0F]/30 opacity-90 z-10" />

      {/* Foreground Content */}
      <div className="relative z-20 max-w-4xl mx-auto text-center px-6 py-12 space-y-4">
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

        {/* Dynamic Slide Indicator Dots */}
        <div className="pt-4 flex items-center justify-center space-x-2">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                i === currentIndex ? 'bg-[#10B981] w-8' : 'bg-slate-700 w-2.5'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
