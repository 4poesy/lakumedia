import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, Play } from 'lucide-react';

export function TrendingTop10Rail() {
  const top5Items = [
    {
      rank: 1,
      title: 'Giants of Africa: Football Origins',
      genre: 'Documentary',
      thumbnail: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&auto=format&fit=crop&q=75',
      slug: 'giants-of-africa-nigerian-football',
      badge: 'TOP #1 TODAY',
    },
    {
      rank: 2,
      title: 'Lagos City Thriller 8K Cinema Movie',
      genre: 'Feature Film',
      thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=75',
      slug: 'films-latest-release',
      badge: 'TOP #2 TODAY',
    },
    {
      rank: 3,
      title: 'Afrobeats Stadium Concert Live Stream',
      genre: 'Music Show',
      thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=75',
      slug: 'music-shows-latest-release',
      badge: 'TOP #3 TODAY',
    },
    {
      rank: 4,
      title: 'The Billionaire Clan Drama Series',
      genre: 'Drama',
      thumbnail: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop&q=75',
      slug: 'drama-series-latest-release',
      badge: 'TOP #4 TODAY',
    },
    {
      rank: 5,
      title: 'Night of 1000 Laughs Stand-Up Special',
      genre: 'Comedy',
      thumbnail: 'https://images.unsplash.com/photo-1543351611-c823945f1007?w=800&auto=format&fit=crop&q=75',
      slug: 'comedy-latest-release',
      badge: 'TOP #5 TODAY',
    },
  ];

  return (
    <section className="space-y-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-[#D9541E] animate-pulse" />
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
            TOP 5 TRENDING TITLES TODAY
          </h2>
        </div>
        <span className="text-xs font-bold text-[#10B981]">Updated 10 Mins Ago</span>
      </div>

      {/* Grid Cards (Clean, 100% Aligned with Zero Text Overlaps) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {top5Items.map((item) => (
          <Link
            key={item.rank}
            href={`/multimedia/watch/${item.slug}`}
            className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-[#10B981] shadow-2xl transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1"
          >
            {/* Image Thumbnail Container */}
            <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/20" />

              {/* Sleek Top Rank Badge (Gold Number Pill) */}
              <div className="absolute top-2.5 left-2.5 flex items-center space-x-1">
                <span className="w-7 h-7 rounded-full bg-[#D9541E] text-white font-black text-xs flex items-center justify-center shadow-lg border border-orange-400">
                  #{item.rank}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900/90 text-amber-300 text-[9px] font-black uppercase tracking-wider backdrop-blur-md border border-slate-700">
                  {item.badge}
                </span>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40">
                <div className="w-12 h-12 rounded-full bg-[#D9541E] text-white flex items-center justify-center pl-0.5 shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-6 h-6 fill-white" />
                </div>
              </div>
            </div>

            {/* Card Body Info (Padded & Clean) */}
            <div className="p-4 space-y-1.5 bg-slate-950 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-[#10B981] uppercase tracking-widest block">
                  {item.genre}
                </span>
                <h3 className="text-xs font-black text-white group-hover:text-[#10B981] transition-colors leading-tight line-clamp-2">
                  {item.title}
                </h3>
              </div>

              <div className="pt-2 border-t border-slate-900 text-[10px] font-extrabold text-slate-400 flex items-center justify-between">
                <span>4K ULTRA HD</span>
                <span className="text-[#D9541E] font-bold">Watch Reel →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
