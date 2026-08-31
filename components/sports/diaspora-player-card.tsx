'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DiasporaPlayer } from '@/lib/diaspora-service';
import { Shield, Globe, User, ChevronRight, CheckCircle2, Award } from 'lucide-react';

interface DiasporaPlayerCardProps {
  player: DiasporaPlayer;
  onOpenDossier: (player: DiasporaPlayer) => void;
  seasonString: string;
}

const REGION_BADGES: Record<string, { label: string; bg: string; text: string }> = {
  europe: { label: 'Europe (UEFA)', bg: 'bg-blue-900/60', text: 'text-blue-300' },
  middle_east: { label: 'Middle East (AFC)', bg: 'bg-amber-900/60', text: 'text-amber-300' },
  africa_npfl: { label: 'Africa & NPFL (CAF)', bg: 'bg-emerald-900/60', text: 'text-emerald-300' },
  other: { label: 'Global Diaspora', bg: 'bg-purple-900/60', text: 'text-purple-300' },
};

export function DiasporaPlayerCard({
  player,
  onOpenDossier,
  seasonString,
}: DiasporaPlayerCardProps) {
  const [imageError, setImageError] = useState(false);
  const regionInfo = REGION_BADGES[player.region] || REGION_BADGES.europe;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-emerald-500">
      
      {/* Top Header Strip with Region Tag & Verified Badge */}
      <div className="p-4 pb-0 flex items-center justify-between z-10">
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${regionInfo.bg} ${regionInfo.text} border border-slate-700/30`}>
          {regionInfo.label}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Sourced Identity
        </span>
      </div>

      {/* Card Body: Player Photo & Details */}
      <div className="p-4 pt-3 flex items-start gap-4">
        {/* Photo Container with Silhouette Fallback */}
        <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200 shadow-inner flex items-center justify-center">
          {player.photo_url && !imageError ? (
            <Image
              src={player.photo_url}
              alt={`${player.name} verified portrait`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
              <User className="w-10 h-10 text-slate-500 mb-1" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Silhouette</span>
            </div>
          )}
          
          {/* Super Eagles Icon Badge */}
          <div className="absolute bottom-1 right-1 bg-emerald-600 text-white rounded-md p-0.5 shadow-sm text-[10px] font-black">
            🇳🇬
          </div>
        </div>

        {/* Player Details */}
        <div className="flex-1 min-w-0 space-y-1">
          <h3 className="text-base font-black text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
            {player.name}
          </h3>

          <div className="text-xs font-extrabold text-emerald-700 flex items-center gap-1 truncate">
            <span>{player.position}</span>
          </div>

          <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 truncate pt-0.5">
            <Shield className="w-3.5 h-3.5 text-[#D9541E] shrink-0" />
            <span className="truncate">{player.current_club}</span>
          </div>

          <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1 truncate">
            <Globe className="w-3 h-3 text-slate-400 shrink-0" />
            <span>{player.club_country}</span>
          </div>

          <div className="pt-1.5">
            <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
              Season: {seasonString}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between mt-2">
        <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-amber-500" /> Dossier Available
        </span>

        <button
          onClick={() => onOpenDossier(player)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#2A2E7F] hover:bg-[#D9541E] text-white text-xs font-black transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <span>View Dossier</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
