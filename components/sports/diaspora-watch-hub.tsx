'use client';

import React, { useState, useMemo } from 'react';
import { DiasporaPlayer, DiasporaRegion } from '@/lib/diaspora-service';
import { DiasporaPlayerCard } from './diaspora-player-card';
import { DiasporaPlayerDossierModal } from './diaspora-player-dossier-modal';
import { DiasporaCoverflowCarousel } from './diaspora-coverflow-carousel';
import {
  Globe,
  Search,
  CheckCircle2,
  ShieldCheck,
  Trophy,
  Sparkles,
  LayoutGrid,
  Layers,
} from 'lucide-react';

interface DiasporaWatchHubProps {
  initialPlayers: DiasporaPlayer[];
  seasonString: string;
}

const REGION_TABS: Array<{ id: DiasporaRegion | 'all'; label: string }> = [
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
  const [displayMode, setDisplayMode] = useState<'coverflow' | 'grid'>('coverflow');
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
    <section className="space-y-5 pt-4">
      
      {/* Clean, Sleek Section Heading (Hero Banner Removed) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b-2 border-slate-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px] uppercase tracking-widest border border-emerald-300 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-emerald-700" />
            <span>SUPER EAGLES & GLOBAL DIASPORA WATCH</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900">
            Nigerian Players in Diaspora
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Tracking Super Eagles stars across European & global leagues with verified {seasonString} dossiers.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setDisplayMode('coverflow')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              displayMode === 'coverflow'
                ? 'bg-[#2A2E7F] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Coverflow</span>
          </button>

          <button
            type="button"
            onClick={() => setDisplayMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              displayMode === 'grid'
                ? 'bg-[#2A2E7F] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid</span>
          </button>
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
                      ? 'bg-[#D9541E] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-bold text-slate-500">
            Showing <span className="font-extrabold text-slate-900">{filteredPlayers.length}</span> Stars
          </div>
        </div>

        {/* Filter Controls: Search & Position Dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
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

      {/* Main Cards Display: Coverflow Carousel or Grid */}
      {filteredPlayers.length > 0 ? (
        displayMode === 'coverflow' ? (
          <div className="py-2">
            <DiasporaCoverflowCarousel
              players={filteredPlayers}
              seasonString={seasonString}
              onOpenDossier={(p) => setActiveDossierPlayer(p)}
              activeWidth={540}
              activeHeight={380}
              restWidth={180}
              restHeight={280}
              gap={24}
              radius={16}
              showArrows={true}
              autoplay={true}
            />
          </div>
        ) : (
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
        )
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-2">
          <Globe className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-sm font-extrabold text-slate-800">No Diaspora Players Found</h4>
          <p className="text-xs text-slate-500">
            Try selecting a different region tab or clearing your search query.
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
