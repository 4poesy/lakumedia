import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { RealtimeLiveCard } from '@/components/multimedia/realtime-live-card';
import { Radio, Calendar, CheckCircle2, ArrowLeft, Signal } from 'lucide-react';

export const revalidate = 30;

export default async function MultimediaLivePage() {
  const supabase = await createClient();

  // Query live media items
  const { data: liveItemsData } = await supabase
    .from('media_items')
    .select('*, media_genres(name, slug)')
    .eq('is_live', true)
    .order('scheduled_start_at', { ascending: true });

  const items = (liveItemsData as any[]) || [
    {
      id: '50000000-0000-0000-0000-000000000005',
      title: 'Lagos Afrobeat Concert Live Stream',
      slug: 'lagos-afrobeat-concert-live',
      synopsis: 'Exclusive live streaming coverage of the annual Afrobeat Music Concert featuring headlining superstars live from Eko Hotel.',
      thumbnail_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop',
      media_genres: { name: 'Music Shows', slug: 'music-shows' },
      media_type: 'concert' as const,
      duration_seconds: 7200,
      is_live: true,
      live_status: 'live_now' as const,
      scheduled_start_at: new Date().toISOString(),
    },
    {
      id: '50000000-0000-0000-0000-000000000006',
      title: 'National Sports Gala & Red Carpet 2026',
      slug: 'national-sports-gala-2026',
      synopsis: 'Upcoming live broadcast of the prestigious National Sports Industry Gala honoring outstanding athletes and coaches.',
      thumbnail_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop',
      media_genres: { name: 'Talk Shows', slug: 'talk-shows' },
      media_type: 'talk_show' as const,
      duration_seconds: 5400,
      is_live: true,
      live_status: 'upcoming' as const,
      scheduled_start_at: new Date(Date.now() + 10800000).toISOString(),
    },
  ];

  const liveNow = items.filter((i: any) => i.live_status === 'live_now');
  const upcoming = items.filter((i: any) => i.live_status === 'upcoming');
  const ended = items.filter((i: any) => i.live_status === 'ended');

  return (
    <div className="space-y-10 theme-multimedia">
      {/* Header */}
      <div className="space-y-4 pb-6 border-b border-slate-800">
        <Link
          href="/multimedia"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-[#D9541E] gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to On-Demand Catalog
        </Link>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-[#D9541E]/20 border border-[#D9541E]/40 flex items-center justify-center text-[#D9541E] font-extrabold text-xl">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#D9541E] uppercase tracking-wider mb-1">
              <Signal className="w-3.5 h-3.5" /> Supabase Realtime Broadcast Center
            </div>
            <h1 className="text-3xl font-extrabold text-white">Live Broadcast Streams</h1>
          </div>
        </div>
      </div>

      {/* 1. Live Now Section */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-base font-bold text-white">
          <Radio className="w-5 h-5 text-[#D9541E] animate-pulse" />
          <span>Currently Live ({liveNow.length})</span>
        </div>

        {liveNow.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveNow.map((item: any) => (
              <RealtimeLiveCard
                key={item.id}
                initialItem={{
                  id: item.id,
                  title: item.title,
                  slug: item.slug,
                  synopsis: item.synopsis,
                  thumbnailUrl: item.thumbnail_url,
                  genreName: item.media_genres?.name || 'Live Stream',
                  mediaType: item.media_type,
                  durationSeconds: item.duration_seconds,
                  isKidSafe: item.is_kid_safe,
                  liveStatus: item.live_status,
                  scheduledStartAt: item.scheduled_start_at,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-8 rounded-2xl text-center text-slate-400 text-xs border border-slate-800">
            No live broadcasts currently in progress. Check upcoming streams below!
          </div>
        )}
      </section>

      {/* 2. Upcoming Streams Section */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-base font-bold text-white">
          <Calendar className="w-5 h-5 text-amber-400" />
          <span>Upcoming Live Schedule ({upcoming.length})</span>
        </div>

        {upcoming.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((item: any) => (
              <RealtimeLiveCard
                key={item.id}
                initialItem={{
                  id: item.id,
                  title: item.title,
                  slug: item.slug,
                  synopsis: item.synopsis,
                  thumbnailUrl: item.thumbnail_url,
                  genreName: item.media_genres?.name || 'Live Stream',
                  mediaType: item.media_type,
                  durationSeconds: item.duration_seconds,
                  isKidSafe: item.is_kid_safe,
                  liveStatus: item.live_status,
                  scheduledStartAt: item.scheduled_start_at,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-8 rounded-2xl text-center text-slate-400 text-xs border border-slate-800">
            No upcoming live streams scheduled at the moment.
          </div>
        )}
      </section>

      {/* 3. Recently Ended Section */}
      {ended.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center space-x-2 text-base font-bold text-slate-300">
            <CheckCircle2 className="w-5 h-5 text-slate-500" />
            <span>Recently Ended Replays ({ended.length})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
            {ended.map((item: any) => (
              <RealtimeLiveCard
                key={item.id}
                initialItem={{
                  id: item.id,
                  title: item.title,
                  slug: item.slug,
                  synopsis: item.synopsis,
                  thumbnailUrl: item.thumbnail_url,
                  genreName: item.media_genres?.name || 'Replay',
                  mediaType: item.media_type,
                  durationSeconds: item.duration_seconds,
                  isKidSafe: item.is_kid_safe,
                  liveStatus: item.live_status,
                  scheduledStartAt: item.scheduled_start_at,
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
