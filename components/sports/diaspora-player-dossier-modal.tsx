'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DiasporaPlayer, PlayerDossier, CompetitionStatBlock } from '@/lib/diaspora-service';
import {
  X,
  Shield,
  Globe,
  Trophy,
  ExternalLink,
  Award,
  BookOpen,
  Newspaper,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  Info,
} from 'lucide-react';

interface DiasporaPlayerDossierModalProps {
  player: DiasporaPlayer | null;
  onClose: () => void;
  seasonString: string;
}

export function DiasporaPlayerDossierModal({
  player,
  onClose,
  seasonString,
}: DiasporaPlayerDossierModalProps) {
  const [dossier, setDossier] = useState<PlayerDossier | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!player) return;

    let isMounted = true;
    setLoading(true);

    fetch(`/api/diaspora-players/${player.slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.dossier) {
          setDossier(data.dossier);
        }
      })
      .catch(() => {
        // Handle error gracefully
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [player]);

  if (!player) return null;

  const renderStatBlock = (block: CompetitionStatBlock, title: string, badgeBg: string) => {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${badgeBg} text-white shadow-sm`}>
              {title}
            </span>
            <span className="text-xs font-extrabold text-slate-200 truncate max-w-[150px] sm:max-w-[200px]">
              {block.competitionName}
            </span>
          </div>

          <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
            {block.season}
          </span>
        </div>

        {/* Check Sanity Flag */}
        {block.isValid ? (
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Apps</span>
              <span className="text-xl font-mono font-black text-white">{block.appearances}</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="block text-[10px] font-black uppercase tracking-wider text-emerald-400">Goals</span>
              <span className="text-xl font-mono font-black text-emerald-400">{block.goals}</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="block text-[10px] font-black uppercase tracking-wider text-amber-400">
                {block.cleanSheets !== undefined ? 'Clean Sheets' : 'Assists'}
              </span>
              <span className="text-xl font-mono font-black text-amber-400">
                {block.cleanSheets !== undefined ? block.cleanSheets : block.assists}
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-amber-950/40 border border-amber-800/60 p-3 rounded-xl flex items-center gap-2 text-amber-300 text-xs font-bold">
            <Clock className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
            <span>Stats updating from verified sports provider…</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-y-auto flex flex-col text-slate-200">
        
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-rose-600 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          aria-label="Close player dossier"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Hero Banner (Solid Color) */}
        <div className="relative p-5 sm:p-7 bg-[#1E293B] border-b border-slate-800">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* Player Verified Portrait / Silhouette */}
            <div className="relative w-28 h-36 rounded-2xl overflow-hidden bg-slate-900 shrink-0 border-2 border-slate-700 shadow-xl flex items-center justify-center">
              {player.photo_url && !imageError ? (
                <Image
                  src={player.photo_url}
                  alt={`${player.name} portrait`}
                  fill
                  className="object-cover object-top"
                  onError={() => setImageError(true)}
                  unoptimized
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                  <User className="w-12 h-12 text-slate-500 mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Silhouette</span>
                </div>
              )}
              
              <div className="absolute bottom-1 right-1 bg-emerald-600 text-white rounded px-1 text-[11px] font-black shadow">
                🇳🇬
              </div>
            </div>

            {/* Main Player Info */}
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-extrabold text-[10px] uppercase tracking-widest border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>SUPER EAGLES & GLOBAL DIASPORA DOSSIER</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                {player.name}
              </h2>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-bold">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-amber-300 border border-slate-700">
                  {player.position}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-[#D9541E]" />
                  {player.current_club} ({player.club_country})
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                  Current Season: {seasonString}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <Clock className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Loading verified dossier & real-time stats…
              </p>
            </div>
          ) : (
            <>
              {/* Section 1: Granular Current Season Stats (Split into 3 distinct blocks) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-emerald-400" />
                    <span>Current Season Performance Breakdown ({seasonString})</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Verified Competitions
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dossier?.seasonStats.league && renderStatBlock(dossier.seasonStats.league, 'Domestic League', 'bg-blue-600')}
                  {dossier?.seasonStats.international && renderStatBlock(dossier.seasonStats.international, 'Super Eagles', 'bg-emerald-600')}
                  {dossier?.seasonStats.continentalCup && renderStatBlock(dossier.seasonStats.continentalCup, 'Continental / Cup', 'bg-amber-600')}
                </div>
              </div>

              {/* Section 2: Verified Bio / Background (Wikipedia API) */}
              <div className="space-y-3 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>Verified Career & Background Bio</span>
                  </h4>
                  
                  {dossier?.bio.sourceUrl && (
                    <Link
                      href={dossier.bio.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      <span>Source: Wikipedia</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {dossier?.bio.summary}
                </p>

                <div className="text-[10px] text-slate-500 italic pt-1">
                  Public open knowledge cited under CC BY-SA 4.0. Lakumedia verifies player entries for accuracy.
                </div>
              </div>

              {/* Section 3: Market Value & Salary Editorial Policy */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-black text-slate-300 uppercase tracking-wider">
                  <Info className="w-4 h-4 text-sky-400" />
                  <span>Market Valuation & Financial Claims Policy</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {dossier?.marketValue.policyNote || 'Market valuations and player salaries are strictly omitted unless verified with an explicit, licensed, and dated citation.'}
                </p>
                {dossier?.marketValue.estimate && (
                  <div className="pt-1 text-xs font-bold text-emerald-400">
                    Estimate: {dossier.marketValue.estimate} (Source: {dossier.marketValue.source}, as of {dossier.marketValue.asOf})
                  </div>
                )}
              </div>

              {/* Section 4: Live Player-Specific News Wire */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                    <Newspaper className="w-4 h-4 text-[#D9541E]" />
                    <span>Real-Time News Wire for {player.name}</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Aggregated & Verified Headlines
                  </span>
                </div>

                {dossier && dossier.relatedNews.length > 0 ? (
                  <div className="space-y-2.5">
                    {dossier.relatedNews.map((news) => (
                      <Link
                        key={news.id}
                        href={news.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 flex-1">
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#D9541E]">
                              {news.source_name}
                            </span>
                            <h5 className="text-xs font-extrabold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                              {news.title}
                            </h5>
                            <p className="text-[11px] text-slate-400 line-clamp-1 font-medium">
                              {news.snippet}
                            </p>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white shrink-0 mt-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400 font-medium">
                    No recent aggregated news stories matching {player.name} in today&apos;s headlines.
                  </div>
                )}
              </div>

            </>
          )}

        </div>

      </div>

    </div>
  );
}
