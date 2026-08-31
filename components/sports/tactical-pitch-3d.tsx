'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PlayerLineupItem, calculateFormationGridPositions } from '@/lib/lineups-service';
import { User, X, Trophy, AlertTriangle, ShieldCheck } from 'lucide-react';

interface TacticalPitch3DProps {
  teamName: string;
  formation: string;
  starters: PlayerLineupItem[];
}

export function TacticalPitch3D({ teamName, formation, starters }: TacticalPitch3DProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerLineupItem | null>(null);

  const positionedPlayers = calculateFormationGridPositions(starters, formation);

  return (
    <div className="relative w-full space-y-4 select-none">
      
      {/* Pitch Header Banner */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3 rounded-xl text-white">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h4 className="text-sm font-black uppercase tracking-wider">{teamName}</h4>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Tactical Formation</span>
          <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono font-black text-xs border border-emerald-800">
            {formation}
          </span>
        </div>
      </div>

      {/* 3D Tilted Tactical Camera Pitch View */}
      <div className="relative w-full h-[480px] sm:h-[540px] overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center p-2">
        
        {/* CSS 3D Perspective Container */}
        <div
          style={{
            transform: 'perspective(1000px) rotateX(24deg) scale(0.96)',
            transformOrigin: 'center center',
          }}
          className="relative w-full h-full bg-[#064e3b] border-4 border-emerald-400/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between"
        >
          {/* Turf Stripes Pattern */}
          <div className="absolute inset-0 grid grid-rows-6 opacity-20 pointer-events-none">
            <div className="bg-black/20" />
            <div className="bg-transparent" />
            <div className="bg-black/20" />
            <div className="bg-transparent" />
            <div className="bg-black/20" />
            <div className="bg-transparent" />
          </div>

          {/* SVG Field Markings */}
          <svg className="absolute inset-0 w-full h-full stroke-emerald-200/50 fill-none stroke-[2]" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Outer Boundary */}
            <rect x="2" y="2" width="96" height="96" />
            {/* Center Line & Circle */}
            <line x1="2" y1="50" x2="98" y2="50" />
            <circle cx="50" cy="50" r="14" />
            <circle cx="50" cy="50" r="1" fill="#fff" />
            
            {/* Bottom Penalty Box (Home/Defending end) */}
            <rect x="22" y="76" width="56" height="22" />
            <rect x="36" y="88" width="28" height="10" />
            <circle cx="50" cy="85" r="0.8" fill="#fff" />
            <path d="M 38 76 A 12 12 0 0 1 62 76" />

            {/* Top Penalty Box (Attacking end) */}
            <rect x="22" y="2" width="56" height="22" />
            <rect x="36" y="2" width="28" height="10" />
            <circle cx="50" cy="15" r="0.8" fill="#fff" />
            <path d="M 38 24 A 12 12 0 0 0 62 24" />

            {/* Corner Arcs */}
            <path d="M 2 6 A 4 4 0 0 0 6 2" />
            <path d="M 94 2 A 4 4 0 0 0 98 6" />
            <path d="M 2 94 A 4 4 0 0 1 6 98" />
            <path d="M 94 98 A 4 4 0 0 1 98 94" />
          </svg>

          {/* Positioned Player Markers */}
          <div className="absolute inset-0">
            {positionedPlayers.map((player) => (
              <div
                key={player.id}
                style={{
                  left: `${player.gridX}%`,
                  bottom: `${player.gridY}%`,
                  transform: 'translate(-50%, 50%)',
                }}
                onClick={() => setSelectedPlayer(player)}
                className="absolute cursor-pointer group flex flex-col items-center z-10 transition-transform duration-300 hover:scale-110 active:scale-95"
              >
                {/* Marker Badge Container */}
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900 border-2 border-emerald-400 shadow-xl overflow-hidden flex items-center justify-center group-hover:border-amber-400 transition-colors">
                  {player.photoUrl ? (
                    <Image
                      src={player.photoUrl}
                      alt={player.name}
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                  ) : (
                    <User className="w-6 h-6 text-slate-400" />
                  )}

                  {/* Jersey Number Tag */}
                  <span className="absolute bottom-0 right-0 px-1 py-0.2 bg-[#D9541E] text-white text-[9px] font-mono font-black rounded-tl-md shadow">
                    {player.jerseyNumber}
                  </span>
                </div>

                {/* Player Short Name */}
                <div className="mt-1 bg-slate-950/90 text-white px-2 py-0.5 rounded-md border border-slate-800 shadow-md text-center max-w-[85px] group-hover:bg-[#2A2E7F] transition-colors">
                  <p className="text-[10px] font-black uppercase tracking-tight truncate">
                    {player.shortName}
                  </p>
                  <p className="text-[8px] font-mono font-extrabold text-emerald-400">
                    {player.positionAbbr}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Selected Player Popover Modal */}
        {selectedPlayer && (
          <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="relative w-full max-w-sm bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl p-5 text-white space-y-4">
              
              <button
                onClick={() => setSelectedPlayer(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 shrink-0 flex items-center justify-center">
                  {selectedPlayer.photoUrl ? (
                    <Image
                      src={selectedPlayer.photoUrl}
                      alt={selectedPlayer.name}
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                  ) : (
                    <User className="w-8 h-8 text-slate-500" />
                  )}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-[#D9541E] text-white font-mono font-black text-xs">
                      #{selectedPlayer.jerseyNumber}
                    </span>
                    <span className="text-xs font-black uppercase text-emerald-400">
                      {selectedPlayer.positionName} ({selectedPlayer.positionAbbr})
                    </span>
                  </div>

                  <h3 className="text-base font-black uppercase tracking-tight text-white truncate">
                    {selectedPlayer.name}
                  </h3>

                  <p className="text-xs text-slate-400 font-bold">{teamName}</p>
                </div>
              </div>

              {/* Match Stats Summary */}
              <div className="pt-2 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs font-bold">
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <span className="block text-[9px] text-slate-400 uppercase font-black">Goals</span>
                  <span className="text-sm font-mono text-emerald-400 font-black">
                    {selectedPlayer.goals || 0}
                  </span>
                </div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <span className="block text-[9px] text-slate-400 uppercase font-black">Yellow Cards</span>
                  <span className="text-sm font-mono text-amber-400 font-black">
                    {selectedPlayer.yellowCards || 0}
                  </span>
                </div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <span className="block text-[9px] text-slate-400 uppercase font-black">Red Cards</span>
                  <span className="text-sm font-mono text-rose-500 font-black">
                    {selectedPlayer.redCards || 0}
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
