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
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 group flex flex-col md:flex-row">
        <div className="relative h-64 md:h-auto md:w-1/2 overflow-hidden bg-slate-100 shrink-0">
          <Image
            src={coverImageUrl || defaultImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>

        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between space-y-4 bg-white">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-md bg-emerald-600 text-white flex items-center gap-1 shadow-sm">
                <Flame className="w-3.5 h-3.5" /> {categoryName}
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> {formattedDate}
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
              <Link href={`/article/${slug}`}>
                {title}
              </Link>
            </h2>

            {excerpt && (
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-medium">
                {excerpt}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              href={`/article/${slug}`}
              className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
            >
              <span>Read Full Story</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Standard Contained Solid Light Mode Card
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between group h-full">
      {/* Top Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={coverImageUrl || defaultImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-slate-900 text-white shadow-sm">
          {categoryName}
        </div>
      </div>

      {/* Separate Text Content Block Below Image */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
        <div className="space-y-2">
          <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
            <Link href={`/article/${slug}`}>
              {title}
            </Link>
          </h3>
          {excerpt && (
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
              {excerpt}
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> {formattedDate}
          </span>
          <Link
            href={`/article/${slug}`}
            className="font-extrabold text-emerald-700 hover:underline text-xs flex items-center gap-1"
          >
            Read <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
