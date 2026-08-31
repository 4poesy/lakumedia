'use client';

import React, { useState, useMemo } from 'react';
import { DiasporaPlayer, DiasporaRegion } from '@/lib/diaspora-service';
import { DiasporaPlayerCard } from './diaspora-player-card';
import { DiasporaPlayerDossierModal } from './diaspora-player-dossier-modal';
import {
  Globe,
  Search,
  CheckCircle2,
  ShieldCheck,
  Trophy,
  Filter,
  Sparkles,
} from 'lucide-react';

interface DiasporaWatchHubProps {
  initialPlayers: DiasporaPlayer[];
  seasonString: string;
}

const REGION_TABS: Array<{ id: DiasporaRegion | 'all'; label: string; countSuffix?: string }> = [
  { id: 'all', label: 'All Diaspora' },
  { id: 'europe', label: 'Europe (UEFA)' },
  { id: 'middle_east', label: 'Middle East' },
  { id: 'africa_npfl', label: 'Africa & NPFL' },
];

const POSITION_FILTERS = ['All Positions', 'Forwards', 'Midfielders', 'Defenders', 'Goalkeepers'];

export function DiasporaWatchHub({ initialPlayers, seasonString }: DiasporaWatchHubProps) {
  const [selectedRegion, setSelectedRegion] = useState<DiasporaRegion | 'all'>('all');
  const [selectedPosition, setSelectedPosition] = useState<string>('All Positions');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDossierPlayer, setActiveDossierPlayer] = useState<DiasporaPlayer | null>(null);

  const filteredPlayers = useMemo(() => {
    return initialPlayers.filter((player) => {
      // Region filter
      if (selectedRegion !== 'all' && player.region !== selectedRegion) {
        return false;
      }

      // Position filter
      if (selectedPosition !== 'All Positions') {
        const pos = player.position?.toLowerCase() || '';
        if (selectedPosition === 'Forwards' && !pos.includes('forward') && !pos.includes('striker') && !pos.includes('winger')) {
          return false;
        }
        if (selectedPosition === 'Midfielders' && !pos.includes('midfielder')) {
          return false;
        }
        if (selectedPosition === 'Defenders' && !pos.includes('back') && !pos.includes('defender')) {
          return false;
        }
        if (selectedPosition === 'Goalkeepers' && !pos.includes('goalkeeper')) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = player.name.toLowerCase().includes(q);
        const matchesClub = player.current_club?.toLowerCase().includes(q);
        const matchesCountry = player.club_country?.toLowerCase().includes(q);
        if (!matchesName && !matchesClub && !matchesCountry) {
          return false;
        }
      }

      return true;
    });
  }, [initialPlayers, selectedRegion, selectedPosition, searchQuery]);

  return (
    <section className="space-y-6 pt-4">
      
      {/* Section Header */}
      <div className="bg-gradient-to-r from-[#2A2E7F] via-slate-900 to-[#10B981] p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden border border-slate-700/50">
        <div className="relative z-10 space-y-3 max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D9541E] text-white font-extrabold text-[11px] uppercase tracking-wider shadow-md">
            <Trophy className="w-4 h-4 text-white" />
            <span>SUPER EAGLES & GLOBAL DIASPORA WATCH</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white drop-shadow">
            Nigerian Stars Abroad — Dossiers & Current Season Form
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            Tracking Nigerian footballers across Europe, the Middle East, and Continental leagues with verified Wikipedia biographies, granular {seasonString} competition stats, and real-time player news.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-bold text-emerald-200">
            <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Fact-Checked Stats
            </span>
            <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Sourced Identity & Photos
            </span>
            <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" /> {seasonString} Dynamic Scope
            </span>
          </div>

        </div>
      </div>

      {/* Controls Bar: Region Tabs, Search & Position Filter */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Region Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            {REGION_TABS.map((tab) => {
              const isActive = selectedRegion === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#2A2E7F] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-bold text-slate-500">
            Showing <span className="font-extrabold text-slate-900">{filteredPlayers.length}</span> Profiles
          </div>
        </div>

        {/* Filter Controls: Search & Position Dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="sm:col-span-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Nigerian diaspora player, club, or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs font-medium rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />
          </div>

          {/* Position Selector */}
          <div className="sm:col-span-4 relative">
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            >
              {POSITION_FILTERS.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Player Profiles Grid */}
      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlayers.map((player) => (
            <DiasporaPlayerCard
              key={player.id || player.slug}
              player={player}
              onOpenDossier={(p) => setActiveDossierPlayer(p)}
              seasonString={seasonString}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-2">
          <Globe className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-sm font-extrabold text-slate-800">No Diaspora Players Found</h4>
          <p className="text-xs text-slate-500">
            Try selecting a different region tab or clearing your search keywords.
          </p>
        </div>
      )}

      {/* Player Dossier Modal */}
      {activeDossierPlayer && (
        <DiasporaPlayerDossierModal
          player={activeDossierPlayer}
          onClose={() => setActiveDossierPlayer(null)}
          seasonString={seasonString}
        />
      )}

    </section>
  );
}
