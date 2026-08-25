'use me';
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Activity, ArrowLeft, Save, RefreshCw, Trophy, CheckCircle2 } from 'lucide-react';
import { FixtureStatus } from '@/lib/types/supabase';

export default function AdminLiveScoresPage() {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
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
      // Fallback initial state if DB is unseeded
      setFixtures([
        {
          id: '30000000-0000-0000-0000-000000000001',
          home_team: { name: 'Enyimba FC' },
          away_team: { name: 'Kano Pillars' },
          league: { name: 'NPFL' },
          home_score: 2,
          away_score: 1,
          status: 'finished',
          kickoff_at: new Date().toISOString(),
        },
        {
          id: '30000000-0000-0000-0000-000000000002',
          home_team: { name: 'Arsenal FC' },
          away_team: { name: 'Chelsea FC' },
          league: { name: 'EPL' },
          home_score: 0,
          away_score: 0,
          status: 'scheduled',
          kickoff_at: new Date(Date.now() + 3600000).toISOString(),
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
      setSuccessMsg(`Saved score update for ${fixture.home_team?.name} vs ${fixture.away_team?.name}!`);
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 theme-sports">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-emerald-400 gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to CMS Admin
          </Link>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Activity className="w-8 h-8 text-emerald-400" /> Admin Match Score Console
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Update live match scores and statuses. Saves write directly to Supabase and broadcast live via Realtime.
          </p>
        </div>

        <button
          onClick={fetchFixtures}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-2 border border-slate-700 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh List
        </button>
      </div>

      {/* Alert banner */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {successMsg}
        </div>
      )}

      {/* Fixtures List Table */}
      {loading ? (
        <div className="glass-panel p-12 rounded-2xl text-center text-slate-400 text-sm">
          Loading live fixtures list...
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-emerald-400" /> Fixture Control Panel ({fixtures.length})
          </h2>

          <div className="space-y-4">
            {fixtures.map((fix) => (
              <div
                key={fix.id}
                className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Teams & League */}
                <div className="space-y-1 md:w-1/3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    {fix.league?.name || 'League'}
                  </span>
                  <h3 className="text-base font-extrabold text-white">
                    {fix.home_team?.name} vs {fix.away_team?.name}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Kickoff: {new Date(fix.kickoff_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {/* Score Controls */}
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Home</span>
                    <input
                      type="number"
                      min="0"
                      value={fix.home_score !== null && fix.home_score !== undefined ? fix.home_score : ''}
                      onChange={(e) => handleScoreChange(fix.id, 'home_score', e.target.value)}
                      className="w-16 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-center font-mono font-bold text-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <span className="font-bold text-slate-500 text-xl pt-4">:</span>

                  <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Away</span>
                    <input
                      type="number"
                      min="0"
                      value={fix.away_score !== null && fix.away_score !== undefined ? fix.away_score : ''}
                      onChange={(e) => handleScoreChange(fix.id, 'away_score', e.target.value)}
                      className="w-16 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-center font-mono font-bold text-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Status Dropdown & Save */}
                <div className="flex items-center space-x-3">
                  <select
                    value={fix.status}
                    onChange={(e) => handleScoreChange(fix.id, 'status', e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="live">🔴 LIVE</option>
                    <option value="finished">FT (Finished)</option>
                    <option value="postponed">Postponed</option>
                  </select>

                  <button
                    onClick={() => handleSaveFixture(fix)}
                    disabled={savingId === fix.id}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingId === fix.id ? 'Saving...' : 'Update'}</span>
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
