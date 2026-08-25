import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Calendar, MessageSquare } from 'lucide-react';
import { HorizontalArticleCard } from './horizontal-article-card';

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  cover_image_url?: string | null;
  categoryName?: string;
  published_at?: string | null;
}

interface CategoryColumnProps {
  categoryTitle: string;
  categorySlug: string;
  articles: ArticleItem[];
}

export function CategoryDualBlock({
  leftColumn,
  rightColumn,
}: {
  leftColumn: CategoryColumnProps;
  rightColumn: CategoryColumnProps;
}) {
  const defaultImage =
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop';

  const renderColumn = (col: CategoryColumnProps) => {
    if (!col.articles || col.articles.length === 0) return null;
    const lead = col.articles[0];
    const listItems = col.articles.slice(1, 4);

    return (
      <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        {/* Category Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-l-4 border-emerald-600 pl-2">
            {col.categoryTitle}
          </h3>
          <Link
            href={`/${col.categorySlug}`}
            className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5"
          >
            View all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Lead Feature Top Card */}
        {lead && (
          <div className="space-y-2 group">
            <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
              <Image
                src={lead.cover_image_url || defaultImage}
                alt={lead.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
              <Link href={`/article/${lead.slug}`}>
                {lead.title}
              </Link>
            </h4>
            <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-medium">
              <span>{lead.published_at ? new Date(lead.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <MessageSquare className="w-3 h-3 text-slate-400" /> 0
              </span>
            </div>
            {lead.excerpt && (
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium pt-1">
                {lead.excerpt}
              </p>
            )}
          </div>
        )}

        {/* Compact Horizontal Cards Below */}
        <div className="pt-2 divide-y divide-slate-100">
          {listItems.map((art) => (
            <HorizontalArticleCard
              key={art.id}
              title={art.title}
              slug={art.slug}
              coverImageUrl={art.cover_image_url}
              publishedAt={art.published_at}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      {renderColumn(leftColumn)}
      {renderColumn(rightColumn)}
    </div>
  );
}
