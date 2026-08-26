'use client';

import React from 'react';
import Image from 'next/image';
import { Quote, Sparkles, Award } from 'lucide-react';
import { NeonBorder } from '@/components/ui/neon-border';

export function AboutCeoStatement() {
  return (
    <section className="max-w-7xl mx-auto my-12">
      <NeonBorder color="#D9541E" rounded={28} thickness={4} borderSize={60} glow={95}>
        <div className="bg-slate-950 p-6 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Executive CEO Image Column (5 Cols) */}
            <div className="lg:col-span-5 relative h-[380px] sm:h-[460px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=75"
                alt="Adebayo Samuel Olaku - CEO & Founder Laku Media"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D9541E] block">
                  FOUNDER & CHIEF EXECUTIVE OFFICER
                </span>
                <h3 className="text-base font-extrabold text-white">Adebayo Samuel Olaku</h3>
                <p className="text-[11px] text-slate-300 font-medium">Laku Media & Creative Studios Group</p>
              </div>
            </div>

            {/* CEO Letter & Statement Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D9541E]/20 text-[#D9541E] text-[10px] font-extrabold tracking-widest uppercase border border-[#D9541E]/40">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>EXECUTIVE VISION STATEMENT</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                  MESSAGE FROM OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-[#D9541E]">CHIEF EXECUTIVE OFFICER</span>
                </h2>
              </div>

              <div className="relative">
                <Quote className="w-12 h-12 text-[#D9541E]/20 absolute -top-4 -left-4 pointer-events-none" />
                <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed italic relative z-10 pl-4 border-l-2 border-[#D9541E]">
                  &ldquo;At Laku Media, our goal is clear: to establish Africa&apos;s most formidable media powerhouse. We refuse to settle for standard video production. Every film we produce, every sports event we broadcast via satellite, and every commercial campaign we launch is engineered to Hollywood 8K standards.
                  <br /><br />
                  By combining deep cultural storytelling with state-of-the-art OB satellite vans and RED cinema rigs, we give African creators and global brands a platform to captivate millions of viewers worldwide.&rdquo;
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 text-[#10B981] flex items-center justify-center border border-[#10B981]/40">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block uppercase">15+ Years Leadership</span>
                    <span className="text-[10px] text-slate-400 font-bold block">Cinema & Broadcasting Pioneer</span>
                  </div>
                </div>

                <div className="font-mono text-xs text-amber-400 font-bold tracking-widest uppercase bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
                  — ADEBAYO SAMUEL OLAKU
                </div>
              </div>
            </div>

          </div>
        </div>
      </NeonBorder>
    </section>
  );
}
