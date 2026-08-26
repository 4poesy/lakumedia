'use client';

import React from 'react';
import { Camera, Radio, Cpu, Volume2, Shield, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { NeonBorder } from '@/components/ui/neon-border';

export function AboutTechStackShowcase() {
  const techSpecs = [
    {
      id: 'spec-camera',
      icon: Camera,
      badge: 'CINEMA RIGS',
      badgeColor: 'bg-[#D9541E] text-white',
      title: 'RED V-Raptor 8K & ARRI Alexa Mini LF',
      description: '8K VV sensor resolution, 120fps high-speed capture, anamorphic cinema prime lenses, and 3-axis motorized gimbal rigs.',
      features: ['8K Resolution Capture', 'Anamorphic Cine Lenses', 'ProRes 4444 XQ & RAW'],
    },
    {
      id: 'spec-broadcast',
      icon: Radio,
      badge: 'SATELLITE OB FLEET',
      badgeColor: 'bg-[#10B981] text-slate-950',
      title: 'Dual C/Ku-Band OB Satellite Uplink Van',
      description: 'Fully motorized 2.4m satellite dish antenna, 16-channel 4K video switcher, and 24/7 stadium live stream MCR.',
      features: ['Dual Satellite Transponders', '16-Channel 4K Triax Switcher', 'Live Stadium Graphics Engine'],
    },
    {
      id: 'spec-[#2A2E7F]',
      icon: Volume2,
      badge: 'MASTER AUDIO',
      badgeColor: 'bg-[#2A2E7F] text-[#10B981]',
      title: 'Dolby Atmos 7.1.4 Surround Sound Suite',
      description: 'Pro Tools HDX hardware DSP, Genelec Smart Active Monitors, and certified Dolby Atmos spatial audio mixing room.',
      features: ['Dolby Atmos Certified Room', 'Genelec 7.1.4 Active Suite', 'Acoustically Isolated Booths'],
    },
    {
      id: 'spec-aerial',
      icon: Cpu,
      badge: 'AERIAL & SPECIAL EFFECTS',
      badgeColor: 'bg-purple-600 text-white',
      title: 'FPV Racing Drones & Stadium Cablecam',
      description: 'Custom high-speed FPV cinema drones capable of 140km/h chase shots and high-tension stadium 3D wire cable cams.',
      features: ['140km/h FPV Aerial Chase', '3D Stadium Wire Cablecam', 'Realtime 4K Wireless Video'],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto space-y-8 bg-slate-950 p-6 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> HOLLYWOOD-GRADE INFRASTRUCTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            HARDWARE & STUDIO TECH STACK
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {techSpecs.map((spec) => {
          const Icon = spec.icon;
          return (
            <div
              key={spec.id}
              className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 hover:border-[#10B981] shadow-2xl transition-all duration-300 space-y-4 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest shadow-md ${spec.badgeColor}`}>
                    {spec.badge}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white group-hover:text-[#10B981] transition-colors">
                  {spec.title}
                </h3>

                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {spec.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                {spec.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
