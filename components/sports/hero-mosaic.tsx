import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Flame, MessageSquare } from 'lucide-react';

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  cover_image_url?: string | null;
  categoryName?: string;
  published_at?: string | null;
}

interface HeroMosaicProps {
  articles: ArticleItem[];
}

export function HeroMosaic({ articles }: HeroMosaicProps) {
  if (!articles || articles.length === 0) return null;

  const leadArticle = articles[0];
  const secondaryArticles = articles.slice(1, 5);

  const defaultImage =
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop';

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return 'Recently';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-6">
      
      {/* Left Spotlight Lead Article (6 cols / 50% width on desktop) */}
      <div className="lg:col-span-6 relative h-[380px] sm:h-[460px] rounded-2xl overflow-hidden shadow-md group border border-slate-200">
        <Image
          src={leadArticle.cover_image_url || defaultImage}
          alt={leadArticle.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded bg-emerald-600 text-white shadow-sm flex items-center gap-1">
              <Flame className="w-3 h-3" /> {leadArticle.categoryName || 'Sports'}
            </span>
            <span className="text-[11px] text-slate-300 font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-300" /> {formatDate(leadArticle.published_at)}
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-snug group-hover:text-emerald-300 transition-colors drop-shadow-md">
            <Link href={`/article/${leadArticle.slug}`}>
              {leadArticle.title}
            </Link>
          </h2>

          {leadArticle.excerpt && (
            <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed hidden sm:block font-medium">
              {leadArticle.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Right Grid (4 secondary articles in 2x2 grid - 6 cols / 50% width on desktop) */}
      <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {secondaryArticles.map((art) => (
          <div
            key={art.id}
            className="relative h-[182px] sm:h-[222px] rounded-2xl overflow-hidden shadow-sm group border border-slate-200"
          >
            <Image
              src={art.cover_image_url || defaultImage}
              alt={art.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-3.5 space-y-1.5">
              <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded bg-slate-900/90 text-white backdrop-blur-md">
                {art.categoryName || 'Sports'}
              </span>

              <h3 className="text-xs font-extrabold text-white leading-snug group-hover:text-emerald-300 transition-colors line-clamp-2 drop-shadow-sm">
                <Link href={`/article/${art.slug}`}>
                  {art.title}
                </Link>
              </h3>

              <div className="flex items-center space-x-2 text-[10px] text-slate-300">
                <span>{formatDate(art.published_at)}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <MessageSquare className="w-3 h-3 text-slate-400" /> 0
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
