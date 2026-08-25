import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, Play, Sparkles } from 'lucide-react';

export function TrendingTop10Rail() {
  const top10Items = [
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
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-[#D9541E] animate-pulse" />
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
            NETFLIX STYLE TOP 5 TRENDING TITLES TODAY
          </h2>
        </div>
        <span className="text-xs font-bold text-[#10B981]">Updated 10 Mins Ago</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {top10Items.map((item) => (
          <div key={item.rank} className="relative flex items-center group">
            {/* Number Rank Overlay (Netflix Style Giant Numbers) */}
            <span className="text-7xl font-black text-slate-800 group-hover:text-[#D9541E] transition-colors shrink-0 -mr-4 z-10 select-none font-mono">
              {item.rank}
            </span>

            {/* Video Card */}
            <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 group-hover:border-[#10B981] shadow-2xl transition-all duration-300 flex-1 relative">
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded bg-[#D9541E] text-white text-[8px] font-black uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
                <div className="absolute inset-0 bg-slate-950/20" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/multimedia/watch/${item.slug}`}
                    className="w-10 h-10 rounded-full bg-[#D9541E] text-white flex items-center justify-center pl-0.5 shadow-2xl scale-95 group-hover:scale-100 transition-transform"
                  >
                    <Play className="w-5 h-5 fill-white" />
                  </Link>
                </div>
              </div>

              <div className="p-3 bg-slate-950 space-y-1">
                <span className="text-[9px] font-extrabold text-[#10B981] uppercase tracking-widest block">
                  {item.genre}
                </span>
                <h3 className="text-xs font-extrabold text-white group-hover:text-[#10B981] transition-colors truncate">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
