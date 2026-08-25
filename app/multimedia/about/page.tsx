import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, UserCheck, Shield, Film, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function MultimediaAboutPage() {
  return (
    <div className="bg-[#0B0E14] text-white min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <section className="max-w-5xl mx-auto text-center space-y-6 pt-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#2A2E7F] border border-slate-700 text-amber-400 text-xs font-extrabold tracking-widest uppercase">
          <Film className="w-4 h-4 text-emerald-400" />
          <span>ABOUT LAKU MEDIA PRODUCTION & MARKETING AGENCY</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          NIGERIA&apos;S PREMIER <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-[#D9541E]">DUAL-VERTICAL MEDIA HOUSE</span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
          Combining real-time sports coverage with immersive streaming multimedia entertainment, commercial advertising, and live event production services.
        </p>
      </section>

      {/* CEO Executive Spotlight Card */}
      <section className="max-w-5xl mx-auto bg-slate-950 rounded-3xl p-8 sm:p-12 border-2 border-[#D9541E] shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#D9541E] shadow-2xl shrink-0 bg-slate-900">
            <Image
              src="/brand/laku-media/laku-media-logo-dark.jpeg"
              alt="Adebayo Samuel Olaku, CEO Laku Media"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2A2E7F] text-emerald-400 font-extrabold text-xs tracking-wider uppercase">
              <UserCheck className="w-4 h-4 text-[#D9541E]" /> EXECUTIVE LEADERSHIP
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Adebayo Samuel Olaku
            </h2>
            <p className="text-xs font-extrabold text-[#D9541E] uppercase tracking-widest">
              Chief Executive Officer & Founder, Laku Media Platform
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              &ldquo;At Laku Media, our goal is to build an unbeatable media ecosystem that empowers African sports, tells authentic high-definition stories, and provides world-class commercial production services for global brands.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#2A2E7F] flex items-center justify-center">
            <Award className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-extrabold text-white">Broadcast Excellence</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Deploying multi-camera OB vans, satellite uplinks, and real-time graphics for stadium sports and live entertainment concerts.
          </p>
        </div>

        <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#D9541E] flex items-center justify-center">
            <Film className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-extrabold text-white">Original Cinema</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Producing high-impact documentary series, feature films, comedy specials, and podcasts that reach millions across Africa.
          </p>
        </div>

        <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-extrabold text-white">Brand Marketing</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Helping top corporate brands execute high-converting marketing campaigns, commercial spot videos, and social media blitzes.
          </p>
        </div>
      </section>

      {/* Call To Action */}
      <section className="max-w-5xl mx-auto text-center space-y-6 bg-gradient-to-r from-slate-950 via-[#2A2E7F] to-slate-950 p-10 rounded-3xl border border-slate-800">
        <h2 className="text-3xl font-extrabold text-white">READY TO PRODUCE YOUR NEXT PROJECT WITH LAKU MEDIA?</h2>
        <div className="flex justify-center">
          <Link
            href="/multimedia/services"
            className="px-8 py-4 rounded-2xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-sm shadow-2xl flex items-center gap-2 transition-transform hover:scale-105"
          >
            <span>Explore Agency Services</span> <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
