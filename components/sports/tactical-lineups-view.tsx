'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MatchLineupPayload, PlayerLineupItem } from '@/lib/lineups-service';
import { TacticalPitch3D } from './tactical-pitch-3d';
import { Users, Clock, Shield, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

interface TacticalLineupsViewProps {
  fixtureId: string;
  leagueSlug?: string;
  initialLineupPayload?: MatchLineupPayload | null;
}

export function TacticalLineupsView({
  fixtureId,
  leagueSlug = 'epl',
  initialLineupPayload,
}: TacticalLineupsViewProps) {
  const [payload, setPayload] = useState<MatchLineupPayload | null>(initialLineupPayload || null);
  const [loading, setLoading] = useState(!initialLineupPayload);
  const [activeTeamTab, setActiveTeamTab] = useState<'home' | 'away'>('home');

  useEffect(() => {
    if (initialLineupPayload) {
      setPayload(initialLineupPayload);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    fetch(`/api/v1/fixtures/${fixtureId}/lineups?league=${leagueSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.data) {
          setPayload(data.data);
        }
      })
      .catch((err) => {
        console.warn('Error fetching lineup payload:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [fixtureId, leagueSlug, initialLineupPayload]);

  if (loading) {
    return (
      <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-3">
        <Clock className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
        <p className="text-xs font-black uppercase tracking-wider text-slate-300">
          Fetching official 3D match formations & starting XIs…
        </p>
      </div>
    );
  }

  if (!payload || !payload.lineupsConfirmed) {
    return (
      <div className="p-8 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-amber-400 shadow">
          <Clock className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-black uppercase tracking-tight text-white">
            Official Lineups Not Yet Announced
          </h4>
          <p className="text-xs text-slate-400 font-medium max-w-md mx-auto">
            {payload?.statusMessage || 'Official starting XIs and tactical formations are published ~60 minutes prior to kickoff.'}
          </p>
        </div>
      </div>
    );
  }

  const activeTeam = activeTeamTab === 'home' ? payload.homeTeam : payload.awayTeam;

  return (
    <div className="space-y-6">
      
      {/* Team Selector Toggle */}
      <div className="flex items-center justify-between bg-slate-950 p-2 rounded-2xl border border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTeamTab('home')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeTeamTab === 'home'
              ? 'bg-[#2A2E7F] text-white shadow-lg border border-indigo-500/50'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Shield className="w-4 h-4 text-[#D9541E]" />
          <span className="truncate">{payload.homeTeam.teamName} ({payload.homeTeam.formation})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTeamTab('away')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeTeamTab === 'away'
              ? 'bg-[#2A2E7F] text-white shadow-lg border border-indigo-500/50'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="truncate">{payload.awayTeam.teamName} ({payload.awayTeam.formation})</span>
        </button>
      </div>

      {/* 3D Tactical Pitch View */}
      <TacticalPitch3D
        teamName={activeTeam.teamName}
        formation={activeTeam.formation}
        starters={activeTeam.starters}
      />

      {/* Substitutes Bench Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white">
            <Users className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-black uppercase tracking-wider">
              {activeTeam.teamName} Substitutes Bench
            </h4>
          </div>
          <span className="text-[10px] font-mono text-slate-400 font-bold">
            {activeTeam.substitutes.length} Substitutes Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeTeam.substitutes.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center space-x-3 truncate">
                <span className="px-2 py-1 rounded bg-slate-800 text-amber-300 font-mono text-xs font-black border border-slate-700 shrink-0">
                  #{sub.jerseyNumber}
                </span>

                <div className="truncate min-w-0">
                  <p className="text-xs font-bold text-white truncate">{sub.name}</p>
                  <p className="text-[10px] font-mono font-semibold text-slate-400 uppercase">
                    {sub.positionName} ({sub.positionAbbr})
                  </p>
                </div>
              </div>

              {sub.subbedIn && (
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[9px] font-black uppercase shrink-0">
                  Subbed In ({sub.subMinute || 'Match'})
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
