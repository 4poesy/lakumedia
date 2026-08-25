import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Flame, ArrowRight } from 'lucide-react';

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
      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 shadow-xl group flex flex-col md:flex-row">
        <div className="relative h-64 md:h-auto md:w-1/2 overflow-hidden bg-slate-900 shrink-0">
          <Image
            src={coverImageUrl || defaultImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>

        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between space-y-4 bg-slate-900/80">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-emerald-500 text-slate-950 flex items-center gap-1 shadow">
                <Flame className="w-3.5 h-3.5" /> {categoryName}
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" /> {formattedDate}
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold text-white group-hover:text-emerald-400 transition-colors leading-snug">
              <Link href={`/article/${slug}`}>
                {title}
              </Link>
            </h2>

            {excerpt && (
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                {excerpt}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <Link
              href={`/article/${slug}`}
              className="text-xs font-extrabold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
            >
              <span>Read Full Story</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Standard Contained Card Block (Image strictly separated above text content)
  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group h-full">
      {/* Top Image Container Block */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900 shrink-0">
        <Image
          src={coverImageUrl || defaultImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-slate-950/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md shadow">
          {categoryName}
        </div>
      </div>

      {/* Separate Text Content Block Below Image */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-slate-900/40">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
            <Link href={`/article/${slug}`}>
              {title}
            </Link>
          </h3>
          {excerpt && (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-500" /> {formattedDate}
          </span>
          <Link
            href={`/article/${slug}`}
            className="font-bold text-emerald-400 hover:underline text-xs flex items-center gap-1"
          >
            Read <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
