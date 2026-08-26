'use client';

import React from 'react';
import { Radio, Wifi, ShieldCheck } from 'lucide-react';

export function LiveMcrStatusBar() {
  return (
    <div className="bg-[#0D0F18] border-b border-slate-800 text-slate-300 py-1.5 px-4 text-[11px] font-medium flex items-center justify-between overflow-x-auto whitespace-nowrap">
      <div className="flex items-center space-x-3">
        {/* Pulsing Live Satellite Indicator */}
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#10B981]/20 border border-[#10B981]/50 text-[#10B981] font-black uppercase tracking-widest text-[9px]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping shrink-0" />
          <span>📡 SATELLITE MCR UPLINK: 24/7 ONLINE</span>
        </div>

        <span className="hidden sm:inline text-slate-400 font-mono">
          Ogun State Studio Teleport Dish #1 & #2 Active
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 text-emerald-400 text-[10px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Signal Delivery Guarantee</span>
        </div>
        
        <a
          href="https://wa.me/2348103285303"
          target="_blank"
          rel="noreferrer"
          className="text-amber-400 hover:text-white font-mono font-bold hover:underline transition-colors hidden md:inline"
        >
          CEO WhatsApp Hotline: +234 810 328 5303
        </a>
      </div>
    </div>
  );
}
