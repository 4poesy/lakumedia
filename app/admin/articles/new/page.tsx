'use me';
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Save, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function NewArticlePage() {
  const router = useRouter();
  const supabase = createClient();

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState('published');

  useEffect(() => {
    const loadCategories = async () => {
      const { data } = await (supabase.from('sports_categories' as any) as any).select('*').order('name');
      if (data && data.length > 0) {
        setCategories(data);
        setCategoryId(data[0].id);
      } else {
        setCategories([
          { id: '22222222-2222-2222-2222-222222222222', name: 'NPFL' },
          { id: '33333333-3333-3333-3333-333333333333', name: 'EPL' },
          { id: '44444444-4444-4444-4444-444444444444', name: 'Transfers' },
        ]);
        setCategoryId('22222222-2222-2222-2222-222222222222');
      }
    };
    loadCategories();
  }, [supabase]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    setSlug(autoSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await (supabase.from('articles' as any) as any).insert({
      title,
      slug: slug || `article-${Date.now()}`,
      excerpt,
      body,
      cover_image_url: coverImageUrl || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop',
      category_id: categoryId || null,
      status: status as any,
      published_at: status === 'published' ? new Date().toISOString() : null,
    });

    setLoading(false);
    if (!error) {
      router.push('/admin/articles');
    } else {
      alert(`Error creating article: ${error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 theme-sports pb-12">
      <div className="space-y-2 pb-6 border-b border-slate-800">
        <Link
          href="/admin/articles"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-emerald-400 gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles List
        </Link>
        <h1 className="text-3xl font-extrabold text-white">Create New Sports Article</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 glass-panel p-8 rounded-2xl border border-slate-800">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Article Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g., Enyimba Secure Thrilling Victory Against Kano Pillars"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-base text-white focus:outline-none focus:border-emerald-500"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            URL Slug (auto-generated) *
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="enyimba-thrilling-victory-npfl-derby"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            required
          />
        </div>

        {/* Category & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Category *
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Publication Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Cover Image URL */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-emerald-400" /> Cover Image URL
          </label>
          <input
            type="url"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Excerpt / Summary
          </label>
          <textarea
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short 1-2 sentence preview summary..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Body Content */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Full Article Body *
          </label>
          <textarea
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write full article content here..."
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
            required
          />
        </div>

        {/* Submit */}
        <div className="pt-4 flex items-center justify-end space-x-3">
          <Link
            href="/admin/articles"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-extrabold text-sm shadow flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Publishing...' : 'Save & Publish'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
