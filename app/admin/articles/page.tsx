'use me';
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Newspaper, Plus, ArrowLeft, Edit3, Trash2, CheckCircle, Eye } from 'lucide-react';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchArticles = async () => {
    setLoading(true);
    const { data } = await (supabase.from('articles' as any) as any)
      .select('*, sports_categories(name)')
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      setArticles(data);
    } else {
      setArticles([
        {
          id: '40000000-0000-0000-0000-000000000001',
          title: 'Enyimba Secure Thrilling Victory Against Kano Pillars in NPFL Derby',
          slug: 'enyimba-thrilling-victory-npfl-derby',
          status: 'published',
          sports_categories: { name: 'NPFL' },
          created_at: new Date().toISOString(),
        },
        {
          id: '40000000-0000-0000-0000-000000000002',
          title: 'Premier League Title Race Heats Up Ahead of London Derby',
          slug: 'premier-league-title-race-heats-up',
          status: 'published',
          sports_categories: { name: 'EPL' },
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    await supabase.from('articles').delete().eq('id', id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
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
            <Newspaper className="w-8 h-8 text-emerald-400" /> Articles & Editorial CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage, publish, edit, and create sports news articles.
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-extrabold flex items-center gap-2 shadow transition-all"
        >
          <Plus className="w-4 h-4" /> Create New Article
        </Link>
      </div>

      {/* Articles Table */}
      {loading ? (
        <div className="glass-panel p-12 rounded-2xl text-center text-slate-400 text-sm">
          Loading editorial articles...
        </div>
      ) : (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Article Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-white max-w-xs truncate">
                    {art.title}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700 font-semibold">
                      {art.sports_categories?.name || 'General'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                        art.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {art.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/sports/article/${art.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        title="View Public Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/articles/${art.id}/edit`}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400"
                        title="Edit Article"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(art.id)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-rose-400"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
