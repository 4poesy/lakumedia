'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar, Flame, ArrowRight, Sparkles } from 'lucide-react';

export interface SlideItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  categoryName: string;
  publishedAt: string;
}

interface HeroSliderProps {
  slides: SlideItem[];
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const defaultSlides: SlideItem[] = [
    {
      id: 'slide-1',
      title: 'Enyimba Secure Thrilling Victory Against Kano Pillars in NPFL Derby',
      slug: 'enyimba-thrilling-victory-npfl-derby',
      excerpt: 'Enyimba FC delivered a masterclass performance in Aba to secure a 2-1 victory over rivals Kano Pillars in front of a capacity stadium crowd.',
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1600&auto=format&fit=crop&q=90',
      categoryName: 'NPFL League',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'slide-2',
      title: 'Konsa Will Bench Saliba At Arsenal — Chelsea Legend Claims',
      slug: 'konsa-will-bench-saliba-at-arsenal',
      excerpt: 'Former Chelsea legend insists Ezri Konsa would easily earn a starting berth over William Saliba at the Emirates Stadium this season.',
      imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600&auto=format&fit=crop&q=90',
      categoryName: 'World Football',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'slide-3',
      title: 'Super Eagles Star Signs Multi-Year Extension Deal',
      slug: 'super-eagles-star-signs-multi-year-extension',
      excerpt: 'In a major transfer update, the Nigerian international winger has officially signed a multi-year contract extension worth record wages.',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&auto=format&fit=crop&q=90',
      categoryName: 'Transfer News',
      publishedAt: new Date().toISOString(),
    },
  ];

  const slideData = slides && slides.length >= 3 ? slides : defaultSlides;

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slideData.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideData.length) % slideData.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideData.length);
  };

  const currentSlide = slideData[currentIndex];

  const [imgSrc, setImgSrc] = useState(currentSlide.imageUrl);

  useEffect(() => {
    setImgSrc(currentSlide.imageUrl);
  }, [currentSlide.imageUrl, currentIndex]);

  return (
    <div
      className="relative w-full h-[420px] sm:h-[500px] lg:h-[540px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 group my-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Full-Bleed Background Image */}
      <div className="relative w-full h-full">
        <Image
          src={imgSrc}
          alt={currentSlide.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          priority
          onError={() =>
            setImgSrc('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1600&auto=format&fit=crop&q=90')
          }
        />
        {/* Full-Bleed Bottom-to-Top Dark Gradient for Seamless Text Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
      </div>

      {/* Floating Badges Top Left */}
      <div className="absolute top-5 left-5 flex items-center space-x-2.5 z-10">
        <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-md bg-[#D9541E] text-white flex items-center gap-1.5 shadow-md">
          <Flame className="w-3.5 h-3.5" /> {currentSlide.categoryName}
        </span>
        <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-md bg-[#2A2E7F] text-white shadow-md flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 8K ULTRA HD
        </span>
      </div>

      {/* Content Overlay - Beautiful Full Width Gradient Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 space-y-3 max-w-4xl z-10">
        <div className="flex items-center space-x-3 text-xs text-slate-300 font-bold">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            {new Date(currentSlide.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* Title with Glowing Accent Line on Left */}
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight border-l-4 border-[#D9541E] pl-4 hover:text-[#D9541E] transition-colors drop-shadow-md">
          <Link href={`/article/${currentSlide.slug}`}>
            {currentSlide.title}
          </Link>
        </h2>

        <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed font-medium max-w-3xl hidden sm:block pl-5">
          {currentSlide.excerpt}
        </p>

        <div className="pt-3 flex items-center justify-between pl-5">
          <Link
            href={`/article/${currentSlide.slug}`}
            className="px-6 py-3 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-xs flex items-center gap-2 shadow-lg transition-colors"
          >
            <span>Read Full Story</span> <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Slide Indicator Dots */}
          <div className="flex items-center space-x-2">
            {slideData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  currentIndex === idx ? 'w-8 bg-[#D9541E]' : 'w-2.5 bg-white/50 hover:bg-white'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Manual Navigation Controls (Left / Right Arrow Buttons) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-950/70 hover:bg-[#2A2E7F] text-white flex items-center justify-center shadow-lg transition-colors border border-white/20 z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-950/70 hover:bg-[#2A2E7F] text-white flex items-center justify-center shadow-lg transition-colors border border-white/20 z-20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
