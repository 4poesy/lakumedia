'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Globe } from 'lucide-react';
import { StudioQuoteCalculatorModal } from '@/components/multimedia/studio-quote-calculator-modal';

export function MultiCurrencyPricing() {
  const [currency, setCurrency] = useState<'NGN' | 'USD' | 'GBP' | 'EUR'>('NGN');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const currencyRates = {
    NGN: { symbol: '₦', multiplier: 1500, label: 'NGN (Naira)' },
    USD: { symbol: '$', multiplier: 1, label: 'USD (Dollar)' },
    GBP: { symbol: '£', multiplier: 0.79, label: 'GBP (Pound)' },
    EUR: { symbol: '€', multiplier: 0.92, label: 'EUR (Euro)' },
  };

  const rawPackages = [
    {
      id: 'p1',
      name: 'Commercial & Music Video Shoot',
      baseUsd: 2500,
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
      baseUsd: 7500,
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
      baseUsd: 25000,
      isCustom: true,
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

  const formatPrice = (baseUsd: number, isCustom?: boolean) => {
    if (isCustom) {
      if (currency === 'NGN') return '₦37,500,000+';
      if (currency === 'GBP') return '£19,750+';
      if (currency === 'EUR') return '€23,000+';
      return '$25,000+';
    }

    const { symbol, multiplier } = currencyRates[currency];
    const converted = baseUsd * multiplier;

    if (currency === 'NGN') {
      return `${symbol}${converted.toLocaleString()}`;
    }
    return `${symbol}${Math.round(converted).toLocaleString()}`;
  };

  return (
    <section className="space-y-8">
      {/* Currency Selector Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-xl max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-widest text-[#10B981]">
          <Globe className="w-4 h-4 text-amber-400" />
          <span>SELECT YOUR PREFERRED CURRENCY DISPLAY</span>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {(['NGN', 'USD', 'GBP', 'EUR'] as const).map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                currency === curr
                  ? 'bg-[#10B981] text-slate-950 shadow-lg scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {currencyRates[curr].symbol} {curr}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {rawPackages.map((pkg) => (
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
                <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                  {formatPrice(pkg.baseUsd, pkg.isCustom)}
                </span>
                <span className="text-xs text-[#D9541E] font-bold block mt-1">
                  Currency: {currencyRates[currency].label}
                </span>
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

            <div className="pt-6 space-y-2">
              <button
                type="button"
                onClick={() => setIsCalculatorOpen(true)}
                className={`w-full py-3.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 ${
                  pkg.popular
                    ? 'bg-[#D9541E] hover:bg-[#b84315] text-white border border-orange-400'
                    : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700'
                }`}
              >
                <span>{pkg.cta}</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Calculator Modal Trigger */}
      <StudioQuoteCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </section>
  );
}
