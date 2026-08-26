'use client';

import React, { useState, useEffect } from 'react';
import { RssFeedSource, FeedType, INITIAL_FEED_SOURCES } from '@/lib/types/rss';
import { Rss, Plus, CheckCircle2, XCircle, RefreshCw, Globe, Youtube, ShieldCheck, Activity, Terminal, AlertTriangle } from 'lucide-react';

interface IngestionStatus {
  timestamp: string;
  success: boolean;
  totalIngested: number;
  skippedNoImage: number;
  sourcesProcessed: number;
  sourceDetails?: Array<{ name: string; type: string; count: number; error?: string }>;
  logs?: string[];
}

export default function AdminFeedsPage() {
  const [sources, setSources] = useState<RssFeedSource[]>(INITIAL_FEED_SOURCES);
  const [name, setName] = useState('');
  const [feedUrl, setFeedUrl] = useState('');
  const [feedType, setFeedType] = useState<FeedType>('news');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastRunStatus, setLastRunStatus] = useState<IngestionStatus | null>(null);
  const [showLogs, setShowLogs] = useState(false);

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !feedUrl) return;

    const newSource: RssFeedSource = {
      id: `src-${Date.now()}`,
      name,
      feed_url: feedUrl,
      feed_type: feedType,
      is_active: true,
      last_fetched_at: new Date().toISOString(),
    };

    setSources([newSource, ...sources]);
    setName('');
    setFeedUrl('');
    setMessage('New feed source added successfully!');
    setTimeout(() => setMessage(''), 4000);
  };

  const toggleStatus = (id: string) => {
    setSources(
      sources.map((src) =>
        src.id === id ? { ...src, is_active: !src.is_active } : src
      )
    );
  };

  const triggerIngestionNow = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/ingest-rss');
      const data = await res.json();
      
      setLastRunStatus({
        timestamp: data.timestamp || new Date().toISOString(),
        success: data.success ?? true,
        totalIngested: data.totalIngested ?? 0,
        skippedNoImage: data.skippedNoImage ?? 0,
        sourcesProcessed: data.sourcesProcessed ?? sources.length,
        sourceDetails: data.sourceDetails || [],
        logs: data.logs || [],
      });

      setMessage(data.message || `Ingestion complete! Ingested ${data.totalIngested} items.`);
    } catch (err: any) {
      setMessage(`Ingestion execution notice: ${err.message || 'Triggered successfully'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4 theme-sports">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#D9541E] flex items-center gap-1.5">
            <Rss className="w-4 h-4 text-[#D9541E]" /> RSS & YOUTUBE AUTOMATED AGGREGATOR
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
            FEED SOURCES & INGESTION CONTROL
          </h1>
        </div>

        <button
          onClick={triggerIngestionNow}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-[#2A2E7F] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl transition-transform active:scale-95 disabled:opacity-50 border border-blue-400 self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'RUNNING INGESTION NOW...' : 'RUN INGESTION NOW'}</span>
        </button>
      </div>

      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-black flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{message}</span>
          </div>
        </div>
      )}

      {/* Real-time Ingestion Diagnostic Status Panel */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-slate-800 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block">
              REAL-TIME DIAGNOSTIC MONITOR
            </span>
            <h2 className="text-lg font-black text-white uppercase flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" /> LAST INGESTION RUN STATUS
            </h2>
          </div>

          {lastRunStatus && (
            <button
              onClick={() => setShowLogs(!showLogs)}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700 self-start sm:self-auto"
            >
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>{showLogs ? 'Hide Logs' : 'View Execution Logs'}</span>
            </button>
          )}
        </div>

        {lastRunStatus ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Last Execution Time</span>
                <span className="text-white font-mono">{new Date(lastRunStatus.timestamp).toLocaleTimeString()}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Items Ingested</span>
                <span className="text-emerald-400 font-mono text-lg font-black">{lastRunStatus.totalIngested}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Sources Processed</span>
                <span className="text-blue-400 font-mono text-lg font-black">{lastRunStatus.sourcesProcessed}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Skipped Items</span>
                <span className="text-amber-400 font-mono text-lg font-black">{lastRunStatus.skippedNoImage}</span>
              </div>
            </div>

            {/* Source Breakdown List */}
            {lastRunStatus.sourceDetails && lastRunStatus.sourceDetails.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  PER-SOURCE INGESTION BREAKDOWN
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {lastRunStatus.sourceDetails.map((src, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 font-bold truncate max-w-[160px]">{src.name}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-black">
                        +{src.count} items
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Execution Log Drawer */}
            {showLogs && lastRunStatus.logs && (
              <div className="p-4 rounded-2xl bg-black border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1 max-h-48 overflow-y-auto">
                <span className="text-amber-400 font-bold text-[10px] uppercase block mb-1">--- SERVER EXECUTION LOG ---</span>
                {lastRunStatus.logs.map((log, i) => (
                  <div key={i} className="leading-relaxed">{log}</div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
            <p className="text-xs text-slate-300 font-medium">
              Click <strong className="text-white">&quot;RUN INGESTION NOW&quot;</strong> above to manually trigger the feed pipeline and inspect realtime parsing logs.
            </p>
          </div>
        )}
      </div>

      {/* Add Feed Source Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-black text-slate-900 uppercase flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#D9541E]" /> Add New RSS / YouTube Feed Source
        </h2>

        <form onSubmit={handleAddSource} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Display Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Complete Sports Nigeria"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#2A2E7F]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Feed URL</label>
            <input
              type="url"
              required
              value={feedUrl}
              onChange={(e) => setFeedUrl(e.target.value)}
              placeholder="https://www.completesports.com/feed/"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#2A2E7F]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Feed Type</label>
            <div className="flex gap-2">
              <select
                value={feedType}
                onChange={(e) => setFeedType(e.target.value as FeedType)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#2A2E7F]"
              >
                <option value="news">News RSS/Atom</option>
                <option value="youtube_channel">YouTube Channel RSS</option>
              </select>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-xs shadow-md transition-colors"
              >
                Add Source
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Feed Sources Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 uppercase">
            CONFIGURED FEED SOURCES ({sources.length})
          </h2>
          <span className="text-xs font-bold text-slate-500 font-mono">SCHEDULE: EVERY 20 MINS</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 font-extrabold text-slate-900 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Source Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Feed URL</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sources.map((src) => (
                <tr key={src.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{src.name}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 font-bold text-[10px] uppercase tracking-wider text-slate-800 inline-flex items-center gap-1">
                      {src.feed_type === 'youtube_channel' ? (
                        <>
                          <Youtube className="w-3 h-3 text-red-600" /> YouTube Video
                        </>
                      ) : (
                        <>
                          <Globe className="w-3 h-3 text-blue-600" /> RSS Article
                        </>
                      )}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-slate-500 truncate max-w-xs">
                    {src.feed_url}
                  </td>
                  <td className="p-4">
                    {src.is_active ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase tracking-wider inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 font-bold text-[10px] uppercase tracking-wider inline-flex items-center gap-1">
                        <XCircle className="w-3 h-3 text-slate-400" /> Inactive
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(src.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        src.is_active
                          ? 'bg-red-50 text-red-700 hover:bg-red-100'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      {src.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
