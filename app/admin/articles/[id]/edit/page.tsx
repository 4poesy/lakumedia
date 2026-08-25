'use me';
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params?.id as string;
  const supabase = createClient();

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState('published');

  useEffect(() => {
    const loadArticleAndCategories = async () => {
      setFetching(true);
      const { data: cats } = await (supabase.from('sports_categories' as any) as any).select('*').order('name');
      if (cats && cats.length > 0) setCategories(cats);

      const { data: artData } = await supabase.from('articles').select('*').eq('id', articleId).single();
      const art = artData as any;
      if (art) {
        setTitle(art.title || '');
        setSlug(art.slug || '');
        setExcerpt(art.excerpt || '');
        setBody(art.body || '');
        setCoverImageUrl(art.cover_image_url || '');
        setCategoryId(art.category_id || '');
        setStatus(art.status || 'published');
      } else {
        // Fallback initial data
        setTitle('Enyimba Secure Thrilling Victory Against Kano Pillars in NPFL Derby');
        setSlug('enyimba-thrilling-victory-npfl-derby');
        setExcerpt('Enyimba FC delivered a masterclass performance in Aba...');
        setBody('Full body content for Enyimba match report...');
      }
      setFetching(false);
    };

    if (articleId) loadArticleAndCategories();
  }, [articleId, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await (supabase.from('articles' as any) as any)
      .update({
        title,
        slug,
        excerpt,
        body,
        cover_image_url: coverImageUrl,
        category_id: categoryId || null,
        status: status as any,
        updated_at: new Date().toISOString(),
      })
      .eq('id', articleId);

    setLoading(false);
    if (!error) {
      router.push('/admin/articles');
    } else {
      alert(`Error updating article: ${error.message}`);
    }
  };

  if (fetching) {
    return (
      <div className="glass-panel p-12 rounded-2xl text-center text-slate-400 text-sm max-w-4xl mx-auto my-12">
        Loading article details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 theme-sports pb-12">
      <div className="space-y-2 pb-6 border-b border-slate-800">
        <Link
          href="/admin/articles"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-emerald-400 gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles List
        </Link>
        <h1 className="text-3xl font-extrabold text-white">Edit Article</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 glass-panel p-8 rounded-2xl border border-slate-800">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Article Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-base text-white focus:outline-none focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            URL Slug *
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-emerald-400" /> Cover Image URL
          </label>
          <input
            type="url"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Excerpt / Summary
          </label>
          <textarea
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Full Article Body *
          </label>
          <textarea
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
            required
          />
        </div>

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
            <span>{loading ? 'Saving...' : 'Update Article'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
