import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight } from 'lucide-react';
import { BookUsNowSection } from '@/components/multimedia/book-us-now';
import { StudioLocationMapSection } from '@/components/multimedia/studio-location-map';
import { StudioSubscriberSection } from '@/components/multimedia/newsletter-popup-modal';

export const dynamic = 'force-dynamic';

export default function MultimediaPricingPage() {
  const packages = [
    {
      id: 'p1',
      name: 'Commercial & Music Video Shoot',
      price: '$2,500',
      naira: '₦3,800,000',
      badge: 'POPULAR CHOICE',
      description: 'Ideal for music videos, brand commercial spots, and executive interviews.',
      features: [
        'Single/Dual 4K RED Cinema Camera Rigs',
        'Professional Lighting Setup & Sound Recordist',
        '2 Days On-Location Production',
        'Full Color Grading & 4K Master Export',
        'Social Media Teaser Edits (15s / 30s / 60s)',
      ],
      cta: 'Book Music / Video Shoot',
      popular: false,
    },
    {
      id: 'p2',
      name: 'Live Broadcast & Event Staging',
      price: '$7,500',
      naira: '₦11,500,000',
      badge: 'STADIUM BROADCAST',
      description: 'Multi-cam satellite OB van streaming for live concerts, sports, & AGMs.',
      features: [
        'Multi-Camera OB Broadcast Van & Crew',
        'Live Satellite Uplink & Real-Time Graphics MCR',
        'Aerial 4K FPV Drone Cinematography',
        'Concert Sound Mixing & LED Wall Staging',
        'Simultaneous 4K Multicast to YouTube, TV & Web',
      ],
      cta: 'Book Live Concert Broadcast',
      popular: true,
    },
    {
      id: 'p3',
      name: 'Hollywood Cinema & Feature Film',
      price: '$25,000+',
      naira: 'Custom Quote',
      badge: 'THEATRICAL FILMS',
      description: 'Feature film production, documentaries, and theatrical release.',
      features: [
        'Full Feature Cinema Crew & ARRI Alexa Mini LF Rigs',
        'Scriptwriting, Casting & Location Permissions',
        'Original Sound Score & Dolby Atmos Mixing',
        'VFX & CGI Animation Integration',
        'Cinema Distribution & Festival Submission Handling',
      ],
      cta: 'Request Cinema Quote',
      popular: false,
    },
  ];

  return (
    <div className="bg-[#090A0F] text-white min-h-screen space-y-16">
      
      {/* Studio Pricing Hero Header (Exact User Uploaded Image: /assest/user_pricing_hero_studio.jpg) */}
      <section className="relative rounded-3xl overflow-hidden min-h-[440px] sm:min-h-[500px] flex items-center justify-center border-2 border-slate-800 shadow-2xl">
        <Image
          src="/assest/user_pricing_hero_studio.jpg"
          alt="Laku Media Production Rates and Pricing Studio Setup"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/80 to-[#090A0F]/50" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-12 space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight uppercase drop-shadow-2xl">
            TRANSPARENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-[#D9541E]">PRODUCTION RATES</span> FOR EVERY PROJECT
          </h1>

          <p className="text-sm sm:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Whether you need a high-end music video, satellite live concert broadcast, or feature film production, Laku Media Studio delivers Hollywood quality.
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-3xl p-8 space-y-6 border transition-all duration-300 flex flex-col justify-between relative ${
              pkg.popular
                ? 'bg-slate-950 border-2 border-[#D9541E] shadow-2xl scale-105'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#2A2E7F] text-[#10B981] font-extrabold text-[10px] uppercase tracking-widest border border-slate-700">
                  {pkg.badge}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-white">{pkg.name}</h3>
                <p className="text-xs text-slate-400 font-medium">{pkg.description}</p>
              </div>

              <div className="pt-2">
                <span className="text-4xl font-black text-white">{pkg.price}</span>
                <span className="text-xs text-[#D9541E] font-bold block mt-1">Approx. {pkg.naira}</span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-slate-900 text-xs text-slate-300 font-medium">
                {pkg.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <Link
                href="/contact"
                className={`w-full py-3.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 ${
                  pkg.popular
                    ? 'bg-[#D9541E] hover:bg-[#b84315] text-white border border-orange-400'
                    : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700'
                }`}
              >
                <span>{pkg.cta}</span> <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Interactive Google Map Section (Replaces FAQ Section per user request) */}
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
