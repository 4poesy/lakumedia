import React from 'react';
import Image from 'next/image';
import { BookUsNowSection } from '@/components/multimedia/book-us-now';
import { StudioLocationMapSection } from '@/components/multimedia/studio-location-map';
import { StudioSubscriberSection } from '@/components/multimedia/newsletter-popup-modal';
import { MultiCurrencyPricing } from '@/components/multimedia/multi-currency-pricing';

export const dynamic = 'force-dynamic';

export default function MultimediaPricingPage() {
  return (
    <div className="bg-[#090A0F] text-white min-h-screen space-y-16">
      
      {/* Studio Pricing Hero Header with Lighter Overlay for Image Clarity */}
      <section className="relative rounded-3xl overflow-hidden min-h-[440px] sm:min-h-[500px] flex items-center justify-center border-2 border-slate-800 shadow-2xl">
        <Image
          src="/assest/user_pricing_hero_studio.jpg"
          alt="Laku Media Production Rates and Pricing Studio Setup"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/50 to-[#090A0F]/20 opacity-90" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-12 space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight uppercase drop-shadow-2xl">
            TRANSPARENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-[#D9541E]">PRODUCTION RATES</span> FOR EVERY PROJECT
          </h1>

          <p className="text-sm sm:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Whether you need a high-end music video, satellite live concert broadcast, or feature film production, Laku Media Studio delivers Hollywood quality.
          </p>
        </div>
      </section>

      {/* Multi-Currency Pricing Section */}
      <MultiCurrencyPricing />

      {/* Interactive Google Map Section */}
      <div className="max-w-7xl mx-auto">
        <StudioLocationMapSection />
      </div>

      {/* Subscriber Section */}
      <div className="max-w-7xl mx-auto">
        <StudioSubscriberSection />
      </div>

      {/* Book Us Now Form Section */}
      <div className="max-w-7xl mx-auto">
        <BookUsNowSection />
      </div>

    </div>
  );
}
