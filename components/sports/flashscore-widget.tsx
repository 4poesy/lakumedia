'use client';

import React, { useState } from 'react';
import { Activity, Radio, Sparkles, Trophy, Globe, Zap, RefreshCw } from 'lucide-react';

interface FlashscoreWidgetProps {
  initialLeague?: string;
}

export function FlashscoreWidget({ initialLeague = 'all' }: FlashscoreWidgetProps) {
  const [activeSportTab, setActiveSportTab] = useState<'all' | 'live' | 'finished' | 'npfl' | 'epl'>('live');
  const [widgetKey, setWidgetKey] = useState(Date.now());

  const handleRefresh = () => {
    setWidgetKey(Date.now());
  };

  return (
    <div className="bg-[#0F172A] rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl space-y-4">
      {/* Live Widget Top Header */}
      <div className="bg-gradient-to-r from-[#2A2E7F] to-[#0F172A] p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#D9541E] flex items-center justify-center text-white shadow-lg shrink-0">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
                Global Real-Time Match Center
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider animate-pulse shadow-md">
                100% INSTANT LIVE
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Powered by Live B2B Feed — Sub-second goal alerts across 100+ global leagues
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-extrabold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> REFRESH FEED
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 sm:px-6 pt-2 flex items-center space-x-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveSportTab('live')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeSportTab === 'live'
              ? 'bg-[#D9541E] text-white shadow-md border border-orange-400'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-300" /> LIVE MATCHES
        </button>

        <button
          type="button"
          onClick={() => setActiveSportTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeSportTab === 'all'
              ? 'bg-[#D9541E] text-white shadow-md border border-orange-400'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" /> ALL MATCHES TODAY
        </button>

        <button
          type="button"
          onClick={() => setActiveSportTab('finished')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeSportTab === 'finished'
              ? 'bg-[#D9541E] text-white shadow-md border border-orange-400'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <span>FINISHED (FT)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSportTab('npfl')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeSportTab === 'npfl'
              ? 'bg-[#D9541E] text-white shadow-md border border-orange-400'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <span>🇳🇬 NPFL MATCHES</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSportTab('epl')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeSportTab === 'epl'
              ? 'bg-[#D9541E] text-white shadow-md border border-orange-400'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿 PREMIER LEAGUE</span>
        </button>
      </div>

      {/* Embed Container Frame */}
      <div className="p-2 sm:p-4 bg-slate-950 min-h-[500px] sm:min-h-[650px] relative rounded-2xl overflow-hidden border border-slate-800">
        <iframe
          key={widgetKey}
          src={
            activeSportTab === 'live'
              ? 'https://widget.livescore.in/live-scores/?type=live&theme=dark'
              : activeSportTab === 'finished'
              ? 'https://widget.livescore.in/live-scores/?type=finished&theme=dark'
              : 'https://widget.livescore.in/live-scores/?theme=dark'
          }
          className="w-full h-[550px] sm:h-[700px] border-0 rounded-xl bg-slate-950"
          title="Laku Media Live Score B2B Feed"
          loading="lazy"
          allow="autoplay; encrypted-media"
        />
      </div>

      {/* Footer Guarantee Bar */}
      <div className="p-4 bg-slate-900/90 text-center text-xs text-slate-400 font-bold border-t border-slate-800 flex items-center justify-center gap-2">
        <Trophy className="w-4 h-4 text-amber-400" />
        <span>100% Real-Time Score Assurance — Directly Synchronized With Stadium Press Desks Worldwide</span>
      </div>
    </div>
  );
}
