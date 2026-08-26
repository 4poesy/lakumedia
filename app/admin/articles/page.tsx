'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Newspaper, Plus, ArrowLeft, Edit3, Trash2, Eye, Sparkles, Bot, CheckCircle2 } from 'lucide-react';
import { AiArticleGeneratorModal } from '@/components/admin/ai-article-generator-modal';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'ai_drafts' | 'human'>('all');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
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
          id: 'ai-draft-sample-1',
          title: 'MATCH REPORT: Enyimba FC 2–1 Rangers International in NPFL Derby',
          slug: 'enyimba-fc-vs-rangers-international-match-report-sample',
          status: 'draft',
          is_ai_generated: true,
          ai_reviewed: false,
          author_name: 'Laku Media Sports Desk',
          sports_categories: { name: 'NPFL' },
          created_at: new Date().toISOString(),
        },
        {
          id: '40000000-0000-0000-0000-000000000001',
          title: 'Enyimba Secure Thrilling Victory Against Kano Pillars in NPFL Derby',
          slug: 'enyimba-thrilling-victory-npfl-derby',
          status: 'published',
          is_ai_generated: false,
          sports_categories: { name: 'NPFL' },
          created_at: new Date().toISOString(),
        },
        {
          id: '40000000-0000-0000-0000-000000000002',
          title: 'Premier League Title Race Heats Up Ahead of London Derby',
          slug: 'premier-league-title-race-heats-up',
          status: 'published',
          is_ai_generated: false,
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

  const filteredArticles = articles.filter((art) => {
    if (filter === 'ai_drafts') {
      return art.is_ai_generated && art.status === 'draft';
    }
    if (filter === 'human') {
      return !art.is_ai_generated;
    }
    return true;
  });

  const aiDraftCount = articles.filter((a) => a.is_ai_generated && a.status === 'draft').length;

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
            Manage sports news, generate AI match reports from facts, and review drafts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAiModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg border border-emerald-300 transition-transform active:scale-95"
          >
            <Sparkles className="w-4 h-4" /> Generate AI Match Article
          </button>

          <Link
            href="/admin/articles/new"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-extrabold flex items-center gap-2 border border-slate-700 shadow"
          >
            <Plus className="w-4 h-4 text-emerald-400" /> Write Article
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
            filter === 'all'
              ? 'bg-emerald-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          All Articles ({articles.length})
        </button>

        <button
          onClick={() => setFilter('ai_drafts')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            filter === 'ai_drafts'
              ? 'bg-[#10B981] text-slate-950 shadow'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>AI Drafts Pending Review</span>
          {aiDraftCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
              {aiDraftCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setFilter('human')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
            filter === 'human'
              ? 'bg-slate-800 text-white shadow'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          Human Authored
        </button>
      </div>

      {/* Articles Table */}
      {loading ? (
        <div className="glass-panel p-12 rounded-2xl text-center text-slate-400 text-sm">
          Loading editorial articles...
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center text-slate-400 text-sm space-y-3">
          <Bot className="w-10 h-10 text-emerald-400 mx-auto" />
          <p className="font-extrabold text-white">No articles matching &quot;{filter}&quot; filter.</p>
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#10B981] text-slate-950 font-black text-xs inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Generate AI Match Draft Now
          </button>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Article Title</th>
                <th className="p-4">Author & Type</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredArticles.map((art) => (
                <tr key={art.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-white max-w-xs truncate">
                    <div className="space-y-1">
                      <span>{art.title}</span>
                      {art.is_ai_generated && art.status === 'draft' && (
                        <span className="block text-[9px] font-black text-amber-300 uppercase tracking-widest">
                          ⚠️ AI DRAFT: MANDATORY HUMAN REVIEW REQUIRED
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    {art.is_ai_generated ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 font-extrabold text-[10px] uppercase">
                        <Bot className="w-3 h-3 text-amber-400" /> AI-Assisted
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium">Human Reporter</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700 font-semibold">
                      {art.sports_categories?.name || 'NPFL'}
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
                        href={`/article/${art.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        title="View Article"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/articles/${art.id}/edit`}
                        className={`px-3 py-1.5 rounded-lg font-black text-[11px] flex items-center gap-1 ${
                          art.is_ai_generated && art.status === 'draft'
                            ? 'bg-[#10B981] hover:bg-emerald-600 text-slate-950'
                            : 'bg-slate-800 hover:bg-slate-700 text-emerald-400'
                        }`}
                        title="Review & Edit Draft"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{art.is_ai_generated && art.status === 'draft' ? 'Review Fact-Check' : 'Edit'}</span>
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

      {/* AI Generator Modal */}
      <AiArticleGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSuccess={fetchArticles}
      />
    </div>
  );
}
