'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare } from 'lucide-react';

interface HorizontalArticleCardProps {
  title: string;
  slug: string;
  coverImageUrl?: string | null;
  categoryName?: string;
  publishedAt?: string | null;
  commentCount?: number;
}

export function HorizontalArticleCard({
  title,
  slug,
  coverImageUrl,
  categoryName,
  publishedAt,
  commentCount = 0,
}: HorizontalArticleCardProps) {
  const defaultImage =
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&auto=format&fit=crop';

  const [imgSrc, setImgSrc] = useState(coverImageUrl || defaultImage);

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <div className="flex items-center space-x-3 group py-2.5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 p-2 rounded-xl transition-colors">
      {/* Thumbnail Left (Compact Box) */}
      <div className="relative w-24 h-16 sm:w-28 sm:h-18 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-sm">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImgSrc(defaultImage)}
        />
      </div>

      {/* Title & Metadata Right */}
      <div className="space-y-1 flex-1">
        {categoryName && (
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#D9541E] block">
            {categoryName}
          </span>
        )}
        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#D9541E] transition-colors line-clamp-2 leading-snug">
          <Link href={`/article/${slug}`}>
            {title}
          </Link>
        </h4>
        <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-medium pt-0.5">
          <span>{formattedDate}</span>
          <span>•</span>
          <span className="flex items-center gap-0.5">
            <MessageSquare className="w-3 h-3 text-slate-400" /> {commentCount}
          </span>
        </div>
      </div>
    </div>
  );
}
