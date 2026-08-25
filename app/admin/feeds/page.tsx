'use client';

import React, { useState } from 'react';
import { RssFeedSource, FeedType, INITIAL_FEED_SOURCES } from '@/lib/types/rss';
import { Rss, Plus, CheckCircle2, XCircle, RefreshCw, Globe, Youtube } from 'lucide-react';

export default function AdminFeedsPage() {
  const [sources, setSources] = useState<RssFeedSource[]>(INITIAL_FEED_SOURCES);
  const [name, setName] = useState('');
  const [feedUrl, setFeedUrl] = useState('');
  const [feedType, setFeedType] = useState<FeedType>('news');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
    setMessage('Feed source added successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const toggleStatus = (id: string) => {
    setSources(
      sources.map((src) =>
        src.id === id ? { ...src, is_active: !src.is_active } : src
      )
    );
  };

  const triggerIngestion = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ingest-rss');
      const data = await res.json();
      setMessage(data.message || 'Ingestion completed!');
    } catch (err) {
      setMessage('Ingestion triggered locally.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 flex items-center gap-1.5">
            <Rss className="w-4 h-4 text-emerald-600" /> RSS NEWS & VIDEO AGGREGATOR ADMIN
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
            MANAGE RSS & YOUTUBE FEED SOURCES
          </h1>
        </div>

        <button
          onClick={triggerIngestion}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-[#2A2E7F] hover:bg-blue-900 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Ingesting Feeds...' : 'Run Ingestion Job'}</span>
        </button>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold">
          {message}
        </div>
      )}

      {/* Add Feed Source Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-black text-slate-900 uppercase flex items-center gap-2">
          <Plus className="w-5 h-5 text-emerald-600" /> Add New RSS / YouTube Feed Source
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
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-colors"
              >
                Add Source
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Feed Sources Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-black text-slate-900 uppercase">
            CONFIGURED FEED SOURCES ({sources.length})
          </h2>
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
