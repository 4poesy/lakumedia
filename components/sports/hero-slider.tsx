'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Flame, ArrowRight } from 'lucide-react';

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
      imageUrl: '/assest/user_enyimba_news_hero.jpg',
      categoryName: 'NPFL League',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'slide-2',
      title: 'Konsa Will Bench Saliba At Arsenal — Chelsea Legend Claims',
      slug: 'konsa-will-bench-saliba-at-arsenal',
      excerpt: 'Former Chelsea legend insists Ezri Konsa would easily earn a starting berth over William Saliba at the Emirates Stadium this season.',
      imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop&q=75',
      categoryName: 'World Football',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'slide-3',
      title: 'Super Eagles Star Signs Multi-Year Extension Deal',
      slug: 'super-eagles-star-signs-multi-year-extension',
      excerpt: 'In a major transfer update, the Nigerian international winger has officially signed a multi-year contract extension worth record wages.',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=75',
      categoryName: 'Transfer News',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'slide-4',
      title: 'Haaland & Super Eagles Stars Battle In High-Octane International Duel',
      slug: 'haaland-super-eagles-stars-european-tackle',
      excerpt: 'Erling Haaland engages in an intense physical duel against top defensive talents in a thrilling European spectacle.',
      imageUrl: '/assest/user_home_hero_4th_slide.jpg',
      categoryName: 'Match Spotlight',
      publishedAt: new Date().toISOString(),
    },
  ];

  const slideData = slides && slides.length >= 4 ? slides : defaultSlides;

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slideData.length]);

  const currentSlide = slideData[currentIndex];

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-white group my-4 flex flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Crisp Fast-Loading Image Box */}
      <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] bg-slate-100 overflow-hidden">
        {slideData.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              currentIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              loading={idx === 0 ? 'eager' : 'lazy'}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=75';
              }}
            />
          </div>
        ))}

        {/* Category Badge Top Left */}
        <div className="absolute top-4 left-4 flex items-center space-x-2.5 z-20">
          <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-md bg-[#D9541E] text-white flex items-center gap-1.5 shadow-md">
            <Flame className="w-3.5 h-3.5" /> {currentSlide.categoryName}
          </span>
        </div>
      </div>

      {/* Solid Sharp Bottom Content Box */}
      <div className="p-6 sm:p-8 space-y-3 bg-[#0F172A] text-white border-t border-slate-800">
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

        {/* Title */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight border-l-4 border-[#D9541E] pl-4 hover:text-[#D9541E] transition-colors">
          <Link href={`/article/${currentSlide.slug}`} prefetch={true}>
            {currentSlide.title}
          </Link>
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-medium pl-5 hidden sm:block">
          {currentSlide.excerpt}
        </p>

        <div className="pt-2 flex items-center justify-between pl-5">
          <Link
            href={`/article/${currentSlide.slug}`}
            prefetch={true}
            className="px-5 py-2.5 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-colors"
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
                  currentIndex === idx ? 'w-8 bg-[#D9541E]' : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
