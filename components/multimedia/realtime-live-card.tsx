'use me';
'use client';

import React, { useEffect, useState } from 'react';
import { VideoCard } from './video-card';
import { createClient } from '@/lib/supabase/client';
import { LiveStatus, MediaType } from '@/lib/types/supabase';
import { Radio, Calendar } from 'lucide-react';

interface RealtimeLiveCardProps {
  initialItem: {
    id: string;
    title: string;
    slug: string;
    synopsis?: string | null;
    thumbnailUrl?: string | null;
    genreName?: string;
    mediaType: MediaType;
    durationSeconds?: number | null;
    isKidSafe?: boolean;
    liveStatus?: LiveStatus | null;
    scheduledStartAt?: string | null;
  };
}

export function RealtimeLiveCard({ initialItem }: RealtimeLiveCardProps) {
  const [item, setItem] = useState(initialItem);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel(`media_live_realtime_${item.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'media_items',
          filter: `id=eq.${item.id}`,
        },
        (payload) => {
          const updated = payload.new as any;
          if (updated) {
            setItem((prev) => ({
              ...prev,
              liveStatus: updated.live_status || prev.liveStatus,
              scheduledStartAt: updated.scheduled_start_at || prev.scheduledStartAt,
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [item.id, supabase]);

  return (
    <div className="relative group">
      <div className="absolute top-3 right-3 z-20">
        {item.liveStatus === 'live_now' ? (
          <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-[#D9541E] text-white flex items-center gap-1.5 shadow-lg animate-pulse">
            <Radio className="w-3.5 h-3.5" /> LIVE NOW
          </span>
        ) : item.liveStatus === 'upcoming' ? (
          <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5" /> Upcoming
          </span>
        ) : (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-800 text-slate-400 border border-slate-700">
            Ended
          </span>
        )}
      </div>

      <VideoCard
        title={item.title}
        slug={item.slug}
        synopsis={item.synopsis}
        thumbnailUrl={item.thumbnailUrl}
        genreName={item.genreName}
        mediaType={item.mediaType}
        durationSeconds={item.durationSeconds}
        isKidSafe={item.isKidSafe}
      />
    </div>
  );
}
