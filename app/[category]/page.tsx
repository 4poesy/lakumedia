import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArticleCard } from '@/components/sports/article-card';
import { Trophy, ChevronRight, Layers } from 'lucide-react';

export const revalidate = 60;

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = params;
  const supabase = await createClient();

  // Query category
  const { data: categoryData } = await supabase
    .from('sports_categories')
    .select('*')
    .eq('slug', categorySlug)
    .single();

  // Query sub-categories if this is a parent category
  const parentId = (categoryData as any)?.id;
  let subCategories: any[] = [];
  if (parentId) {
    const { data: subs } = await supabase
      .from('sports_categories')
      .select('*')
      .eq('parent_id', parentId);
    if (subs) subCategories = subs;
  }

  // Query articles
  const { data: articlesData } = await supabase
    .from('articles')
    .select('*, sports_categories(name, slug)')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  const categoryName = (categoryData as any)?.name || categorySlug.toUpperCase();

  // Filter articles
  const filteredArticles = articlesData
    ? (articlesData as any[]).filter(
        (a: any) =>
          a.sports_categories?.slug === categorySlug ||
          a.sports_categories?.name?.toLowerCase() === categoryName.toLowerCase() ||
          categorySlug === 'world-football'
      )
    : [
        {
          id: 'cat-1',
          title: `Latest Updates from ${categoryName}`,
          slug: `${categorySlug}-featured-update`,
          excerpt: `Comprehensive match reporting and analysis covering all key developments in ${categoryName}.`,
          cover_image_url:
            'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop',
          sports_categories: { name: categoryName },
          published_at: new Date().toISOString(),
        },
      ];

  return (
    <div className="space-y-8 theme-sports">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-emerald-400 font-bold">{categoryName}</span>
      </nav>

      {/* Category Banner */}
      <div className="space-y-4 pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-extrabold text-xl">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white">{categoryName} Coverage</h1>
            <p className="text-xs text-slate-400 mt-1">
              All published articles, fixtures, and news tagged under {categoryName}.
            </p>
          </div>
        </div>

        {/* Sub-Category Filter Row */}
        {subCategories.length > 0 && (
          <div className="pt-3 flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-emerald-400" /> Sub-Leagues:
            </span>
            {subCategories.map((sub) => (
              <Link
                key={sub.id}
                href={`/${sub.slug}`}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/60"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Category Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art: any) => (
          <ArticleCard
            key={art.id}
            title={art.title}
            slug={art.slug}
            excerpt={art.excerpt}
            coverImageUrl={art.cover_image_url}
            categoryName={art.sports_categories?.name || categoryName}
            publishedAt={art.published_at}
          />
        ))}
      </div>
    </div>
  );
}
