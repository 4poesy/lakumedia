'use client';

import React, { useState } from 'react';
import { Sparkles, X, CheckCircle2, Bot, FileText, Loader2, AlertCircle } from 'lucide-react';
import { StructuredMatchFacts } from '@/lib/sports/ai-article-generator';

interface AiArticleGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AiArticleGeneratorModal({
  isOpen,
  onClose,
  onSuccess,
}: AiArticleGeneratorModalProps) {
  const [loading, setLoading] = useState(false);
  const [articleType, setArticleType] = useState<'match_report' | 'preview'>('match_report');
  
  // Default Sample Fixtures to pick from
  const sampleFixtures: StructuredMatchFacts[] = [
    {
      fixtureId: 'fix-101',
      homeTeam: 'Enyimba FC',
      awayTeam: 'Rangers International',
      leagueName: 'NPFL (Nigeria Premier Football League)',
      leagueSlug: 'npfl',
      matchDate: '2026-08-25',
      stadium: 'Enyimba International Stadium, Aba',
      homeScore: 2,
      awayScore: 1,
      status: 'finished',
      goals: [
        { minute: 34, player: 'Victor Mbaoma', team: 'home' },
        { minute: 67, player: 'Chiamaka Madu', team: 'away' },
        { minute: 88, player: 'Austin Oladapo', team: 'home', isPenalty: true },
      ],
      cards: [
        { minute: 42, player: 'Uche Onwuasonanya', team: 'away', type: 'yellow' },
        { minute: 90, player: 'Ifeanyi Anaemena', team: 'home', type: 'yellow' },
      ],
      possession: { home: 58, away: 42 },
      shotsOnTarget: { home: 7, away: 3 },
      coverImageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
    },
    {
      fixtureId: 'fix-102',
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      leagueName: 'English Premier League',
      leagueSlug: 'epl',
      matchDate: '2026-08-24',
      stadium: 'Emirates Stadium, London',
      homeScore: 3,
      awayScore: 1,
      status: 'finished',
      goals: [
        { minute: 14, player: 'Bukayo Saka', team: 'home' },
        { minute: 45, player: 'Cole Palmer', team: 'away' },
        { minute: 58, player: 'Gabriel Martinelli', team: 'home' },
        { minute: 82, player: 'Kai Havertz', team: 'home' },
      ],
      cards: [
        { minute: 28, player: 'Moises Caicedo', team: 'away', type: 'yellow' },
        { minute: 76, player: 'Nicolas Jackson', team: 'away', type: 'red' },
      ],
      possession: { home: 62, away: 38 },
      shotsOnTarget: { home: 9, away: 4 },
      coverImageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop&q=80',
    },
    {
      fixtureId: 'fix-103',
      homeTeam: 'Rivers United',
      awayTeam: 'Remo Stars',
      leagueName: 'NPFL (Nigeria Premier Football League)',
      leagueSlug: 'npfl',
      matchDate: '2026-08-28',
      stadium: 'Adokiye Amiesimaka Stadium, Port Harcourt',
      status: 'scheduled',
      coverImageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop&q=80',
    },
  ];

  const [selectedFixtureIndex, setSelectedFixtureIndex] = useState(0);
  const selectedFixture = sampleFixtures[selectedFixtureIndex];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/generate-ai-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facts: selectedFixture,
          articleType,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate AI article');
      }

      setLoading(false);
      if (onSuccess) onSuccess();
      onClose();
      window.location.reload();
    } catch (err: any) {
      console.error(err);
      alert(`Error generating AI article: ${err.message}`);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-950 border-2 border-[#10B981] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-white my-auto">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] font-extrabold text-[10px] uppercase tracking-widest border border-[#10B981]/40">
            <Bot className="w-3.5 h-3.5" />
            <span>AI EDITORIAL PIPELINE</span>
          </div>
          <h2 className="text-2xl font-black uppercase text-white tracking-tight">
            GENERATE DATA-DRIVEN SPORTS ARTICLE
          </h2>
          <p className="text-xs text-slate-300 font-medium">
            Draft original, facts-based match reports and previews in Laku Media SNAP house style. Saved as draft for mandatory human review.
          </p>
        </div>

        {/* Form Options */}
        <div className="space-y-5">
          
          {/* Article Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider block">
              1. Article Generation Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setArticleType('match_report')}
                className={`p-4 rounded-2xl border text-left space-y-1 transition-all ${
                  articleType === 'match_report'
                    ? 'bg-[#10B981]/20 border-[#10B981] text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase">Finished Match Report</span>
                  {articleType === 'match_report' && <CheckCircle2 className="w-4 h-4 text-[#10B981]" />}
                </div>
                <p className="text-[10px] text-slate-300">
                  Full post-match breakdown, scores, goalscorers, and possession stats.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setArticleType('preview')}
                className={`p-4 rounded-2xl border text-left space-y-1 transition-all ${
                  articleType === 'preview'
                    ? 'bg-[#10B981]/20 border-[#10B981] text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase">Upcoming Match Preview</span>
                  {articleType === 'preview' && <CheckCircle2 className="w-4 h-4 text-[#10B981]" />}
                </div>
                <p className="text-[10px] text-slate-300">
                  Pre-match preview, stadium kickoff, and tactical data analysis.
                </p>
              </button>
            </div>
          </div>

          {/* Select Sports Fixture Data Source */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider block">
              2. Select Sports Fixture Fact Feed
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {sampleFixtures.map((fix, idx) => (
                <div
                  key={fix.fixtureId}
                  onClick={() => setSelectedFixtureIndex(idx)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedFixtureIndex === idx
                      ? 'bg-slate-900 border-[#D9541E] text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                        {fix.leagueSlug.toUpperCase()}
                      </span>
                      <span className="text-xs font-black text-white">
                        {fix.homeTeam} {fix.homeScore !== undefined ? `${fix.homeScore} - ${fix.awayScore}` : 'vs'} {fix.awayTeam}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {fix.leagueName} • {fix.matchDate} {fix.stadium ? `• ${fix.stadium}` : ''}
                    </p>
                  </div>
                  {selectedFixtureIndex === idx && <CheckCircle2 className="w-4 h-4 text-[#D9541E] shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* Fact Quality Safeguard Reminder Notice */}
          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs font-medium space-y-1 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold block">Fact-Safety Guarantee:</span>
              The LLM prompt is strictly restricted to reporting facts present in the structured fixture feed above. No invented quotes or fabricated stats.
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-extrabold text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl border border-emerald-300 transition-transform active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Drafting AI Article...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Draft Article</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
