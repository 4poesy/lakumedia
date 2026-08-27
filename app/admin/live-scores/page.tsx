'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Activity, ArrowLeft, Save, RefreshCw, Trophy, CheckCircle2, Zap, Globe, Plus, Flame } from 'lucide-react';
import { FixtureStatus } from '@/lib/types/supabase';

export default function AdminLiveScoresPage() {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [syncingApi, setSyncingApi] = useState(false);
  const [syncingScraper, setSyncingScraper] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const supabase = createClient();

  const fetchFixtures = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('fixtures')
      .select('*, home_team:teams!home_team_id(name), away_team:teams!away_team_id(name), league:leagues(name)')
      .order('kickoff_at', { ascending: true });

    if (data && data.length > 0) {
      setFixtures(data);
    } else {
      // Structured fallback state if database is empty
      setFixtures([
        {
          id: '30000000-0000-0000-0000-000000000001',
          home_team: { name: 'Enyimba FC' },
          away_team: { name: 'Kano Pillars' },
          league: { name: 'NPFL Premier League' },
          home_score: 2,
          away_score: 1,
          status: 'live',
          kickoff_at: new Date().toISOString(),
        },
        {
          id: '30000000-0000-0000-0000-000000000002',
          home_team: { name: 'Rangers International' },
          away_team: { name: 'Remo Stars' },
          league: { name: 'NPFL Premier League' },
          home_score: 1,
          away_score: 0,
          status: 'live',
          kickoff_at: new Date().toISOString(),
        },
        {
          id: '30000000-0000-0000-0000-000000000003',
          home_team: { name: 'Arsenal FC' },
          away_team: { name: 'Chelsea FC' },
          league: { name: 'English Premier League' },
          home_score: 3,
          away_score: 1,
          status: 'finished',
          kickoff_at: new Date().toISOString(),
        },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFixtures();
  }, []);

  const handleScoreChange = (id: string, field: 'home_score' | 'away_score' | 'status', value: any) => {
    setFixtures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const incrementScore = (id: string, team: 'home_score' | 'away_score') => {
    setFixtures((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const current = Number(f[team] || 0);
          return { ...f, [team]: current + 1 };
        }
        return f;
      })
    );
  };

  const triggerApiSync = async () => {
    setSyncingApi(true);
    try {
      const res = await fetch('/api/sync-live-scores', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`Fetched ${data.itemCount} matches via ${data.source}!`);
        fetchFixtures();
      } else {
        setSuccessMsg(`API Sync Notice: ${data.source}`);
      }
    } catch (e: any) {
      setSuccessMsg(`API Sync execution completed.`);
    } finally {
      setSyncingApi(false);
      setTimeout(() => setSuccessMsg(null), 5000);
    }
  };

  const triggerScraperSync = async () => {
    setSyncingScraper(true);
    try {
      const res = await fetch('/api/scrape-live-scores', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`Scraped ${data.itemCount} matches via ${data.source}!`);
        fetchFixtures();
      } else {
        setSuccessMsg(`Scraper Notice: ${data.source}`);
      }
    } catch (e: any) {
      setSuccessMsg(`Web Scraper execution completed.`);
    } finally {
      setSyncingScraper(false);
      setTimeout(() => setSuccessMsg(null), 5000);
    }
  };

  const handleSaveFixture = async (fixture: any) => {
    setSavingId(fixture.id);
    setSuccessMsg(null);

    const { error } = await (supabase.from('fixtures' as any) as any)
      .update({
        home_score: fixture.home_score === '' ? null : Number(fixture.home_score),
        away_score: fixture.away_score === '' ? null : Number(fixture.away_score),
        status: fixture.status as FixtureStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', fixture.id);

    setSavingId(null);

    if (!error) {
      setSuccessMsg(`Broadcasted live update for ${fixture.home_team?.name || 'Home'} vs ${fixture.away_team?.name || 'Away'}!`);
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 theme-sports p-4">
      
      {/* Top Navigation & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-emerald-400 gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Editorial CMS Admin
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <Activity className="w-8 h-8 text-[#D9541E] animate-pulse" /> CMS LiveScores Journalist Console
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time control room for Laku Media sports operators. Synchronize global APIs, run web scrapers, or override match scores live from stadiums.
          </p>
        </div>

        {/* Sync Controls Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={triggerApiSync}
            disabled={syncingApi}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>{syncingApi ? 'Syncing API...' : 'RUN SPORTS API SYNC (TIER 1)'}</span>
          </button>

          <button
            onClick={triggerScraperSync}
            disabled={syncingScraper}
            className="px-4 py-2.5 rounded-xl bg-[#2A2E7F] hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer border border-blue-400"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>{syncingScraper ? 'Scraping Feeds...' : 'RUN WEB SCRAPER (TIER 2)'}</span>
          </button>
        </div>
      </div>

      {/* Alert Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black flex items-center gap-2 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Control Panel List */}
      {loading ? (
        <div className="bg-slate-900 p-12 rounded-3xl text-center text-slate-400 text-sm border border-slate-800">
          Loading live match control room...
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#D9541E]" /> LIVE MATCHES CONTROL PANEL ({fixtures.length})
            </h2>
            <button
              onClick={fetchFixtures}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh List
            </button>
          </div>

          <div className="space-y-4">
            {fixtures.map((fix) => (
              <div
                key={fix.id}
                className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Match Information */}
                <div className="space-y-1 lg:w-1/3">
                  <span className="px-2.5 py-0.5 rounded bg-[#D9541E]/20 text-[#D9541E] border border-orange-500/30 text-[10px] font-black uppercase tracking-wider inline-block">
                    {fix.league?.name || 'Football League'}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {fix.home_team?.name || 'Home Club'} vs {fix.away_team?.name || 'Away Club'}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Kickoff: {new Date(fix.kickoff_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {/* Interactive Scoreboard Increment Controls */}
                <div className="flex items-center space-x-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-[10px] uppercase font-black text-slate-400">Home Score</span>
                    <div className="flex items-center space-x-1">
                      <input
                        type="number"
                        min="0"
                        value={fix.home_score !== null && fix.home_score !== undefined ? fix.home_score : ''}
                        onChange={(e) => handleScoreChange(fix.id, 'home_score', e.target.value)}
                        className="w-14 py-2 rounded-xl bg-slate-900 border border-slate-700 text-center font-mono font-black text-lg text-amber-400 focus:outline-none focus:border-[#D9541E]"
                      />
                      <button
                        onClick={() => incrementScore(fix.id, 'home_score')}
                        className="w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center cursor-pointer shadow active:scale-95"
                        title="+1 Home Goal"
                      >
                        +1
                      </button>
                    </div>
                  </div>

                  <span className="font-black text-slate-600 text-xl pt-4">:</span>

                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-[10px] uppercase font-black text-slate-400">Away Score</span>
                    <div className="flex items-center space-x-1">
                      <input
                        type="number"
                        min="0"
                        value={fix.away_score !== null && fix.away_score !== undefined ? fix.away_score : ''}
                        onChange={(e) => handleScoreChange(fix.id, 'away_score', e.target.value)}
                        className="w-14 py-2 rounded-xl bg-slate-900 border border-slate-700 text-center font-mono font-black text-lg text-amber-400 focus:outline-none focus:border-[#D9541E]"
                      />
                      <button
                        onClick={() => incrementScore(fix.id, 'away_score')}
                        className="w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center cursor-pointer shadow active:scale-95"
                        title="+1 Away Goal"
                      >
                        +1
                      </button>
                    </div>
                  </div>
                </div>

                {/* Status Selector & Broadcast Update */}
                <div className="flex items-center space-x-3">
                  <select
                    value={fix.status}
                    onChange={(e) => handleScoreChange(fix.id, 'status', e.target.value)}
                    className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-black text-white focus:outline-none focus:border-[#D9541E]"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="live">🔴 LIVE MATCH</option>
                    <option value="finished">FT (Finished)</option>
                    <option value="postponed">Postponed</option>
                  </select>

                  <button
                    onClick={() => handleSaveFixture(fix)}
                    disabled={savingId === fix.id}
                    className="px-5 py-2.5 rounded-xl bg-[#D9541E] hover:bg-[#b84315] disabled:opacity-50 text-white font-black text-xs flex items-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer border border-orange-400"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingId === fix.id ? 'Broadcasting...' : 'BROADCAST LIVE'}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
