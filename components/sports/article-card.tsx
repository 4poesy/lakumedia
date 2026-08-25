import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Flame } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImageUrl?: string | null;
  categoryName?: string;
  publishedAt?: string | null;
  featured?: boolean;
}

export function ArticleCard({
  title,
  slug,
  excerpt,
  coverImageUrl,
  categoryName = 'Sports',
  publishedAt,
  featured = false,
}: ArticleCardProps) {
  const defaultImage =
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop';

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  if (featured) {
    return (
      <div className="relative h-[380px] sm:h-[450px] w-full rounded-2xl overflow-hidden glass-panel border border-slate-800 shadow-xl group">
        <Image
          src={coverImageUrl || defaultImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-3">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-emerald-500 text-slate-950 flex items-center gap-1 shadow">
              <Flame className="w-3.5 h-3.5" /> {categoryName}
            </span>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" /> {formattedDate}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white group-hover:text-emerald-300 transition-colors leading-tight">
            <Link href={`/article/${slug}`}>
              {title}
            </Link>
          </h2>

          {excerpt && (
            <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed max-w-3xl">
              {excerpt}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl overflow-hidden border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group">
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <Image
          src={coverImageUrl || defaultImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
          {categoryName}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
            <Link href={`/article/${slug}`}>
              {title}
            </Link>
          </h3>
          {excerpt && (
            <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-600" /> {formattedDate}
          </span>
          <Link
            href={`/article/${slug}`}
            className="font-bold text-emerald-400 hover:underline text-[11px]"
          >
            Read Full →
          </Link>
        </div>
      </div>
    </div>
  );
}
