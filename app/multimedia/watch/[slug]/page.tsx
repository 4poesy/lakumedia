import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { MediaComments } from '@/components/multimedia/media-comments';
import { StructuredData } from '@/components/seo/structured-data';
import { ArrowLeft, Play, Clock, ShieldCheck, Film, Radio, Calendar, Tv, Share2 } from 'lucide-react';

export const revalidate = 60;

interface WatchPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: WatchPageProps): Promise<Metadata> {
  const supabase = await createClient();
  const { data: rawData } = await (supabase.from('media_items' as any) as any)
    .select('title, synopsis, thumbnail_url')
    .eq('slug', params.slug)
    .single();
  const data = rawData as any;

  const title = data?.title || 'Watch Stream | Laku Media';
  const description = data?.synopsis || 'Stream high-definition films, documentaries, and shows on Laku Media.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: data?.thumbnail_url ? [data.thumbnail_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { slug } = params;
  const supabase = await createClient();

  // Query media item by slug
  const { data: mediaData } = await supabase
    .from('media_items')
    .select('*, media_genres(name, slug)')
    .eq('slug', slug)
    .single();

  const item = (mediaData as any) || {
    id: '50000000-0000-0000-0000-000000000001',
    title: 'Giants of Africa: The Story of Nigerian Football',
    slug: slug,
    synopsis:
      'An inspiring documentary tracing the evolution of Nigerian football from grassroot academies to the world stage. Features exclusive archival footage and locker room interviews with legendary stars.',
    video_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    thumbnail_url:
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop',
    media_genres: { name: 'Documentaries', slug: 'documentaries' },
    media_type: 'documentary' as const,
    duration_seconds: 3240,
    is_kid_safe: false,
    is_live: false,
    live_status: null,
    scheduled_start_at: null,
    season_number: 1,
    episode_number: 1,
  };

  // Query series episodes if this item belongs to a series or has child episodes
  const { data: episodeData } = await supabase
    .from('media_items')
    .select('*')
    .eq('media_type', 'drama_series')
    .order('episode_number', { ascending: true });

  const episodes = episodeData && (episodeData as any[]).length > 0 ? (episodeData as any[]) : [
    {
      id: '50000000-0000-0000-0000-000000000010',
      title: 'The Golden Boot: Season 1 Episode 1 - The Trials',
      slug: 'golden-boot-s1e1',
      synopsis: 'Series Premiere: Young striker Kelvin travels from Enugu to Aba for his first professional trials.',
      thumbnail_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop',
      season_number: 1,
      episode_number: 1,
      duration_seconds: 2400,
    },
  ];

  const formattedDuration = item.duration_seconds
    ? `${Math.floor(item.duration_seconds / 60)} minutes`
    : 'HD Stream';

  // Schema.org VideoObject JSON-LD
  const videoObjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: item.title,
    description: item.synopsis,
    thumbnailUrl: [item.thumbnail_url],
    uploadDate: item.published_at || new Date().toISOString(),
    contentUrl: item.video_url,
    publisher: {
      '@type': 'Organization',
      name: 'Laku Media',
    },
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 theme-multimedia">
      <StructuredData data={videoObjectSchema} />

      {/* Back Link */}
      <div>
        <Link
          href="/multimedia"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-[#D9541E] gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to On-Demand Catalog
        </Link>
      </div>

      {/* Video Player Canvas / Live Upcoming Banner */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass-panel border border-slate-800 shadow-2xl bg-slate-950 flex flex-col justify-center items-center group">
        {item.is_live && item.live_status === 'upcoming' ? (
          <div className="text-center p-8 space-y-4 max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center mx-auto">
              <Radio className="w-8 h-8 animate-pulse" />
            </div>
            <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-block uppercase tracking-wider">
              Upcoming Live Broadcast
            </span>
            <h2 className="text-2xl font-bold text-white">{item.title}</h2>
            <p className="text-xs text-slate-400">
              Scheduled Start:{' '}
              <span className="text-amber-300 font-bold">
                {item.scheduled_start_at
                  ? new Date(item.scheduled_start_at).toLocaleString()
                  : 'Starting Soon'}
              </span>
            </p>
          </div>
        ) : (
          /* Cloudflare Stream / HTML5 Embed Container */
          <div className="relative w-full h-full">
            <video
              src={item.video_url || 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'}
              controls
              poster={item.thumbnail_url || 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop'}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Video Details */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-3 text-xs">
              <span className="px-3 py-1 font-bold uppercase tracking-wider rounded-md bg-[#D9541E] text-white shadow">
                {item.media_genres?.name || 'Entertainment'}
              </span>
              {item.is_kid_safe && (
                <span className="px-3 py-1 font-bold rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Kids Safe
                </span>
              )}
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {formattedDuration}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {item.title}
            </h1>

            {item.season_number && item.episode_number && (
              <p className="text-xs font-bold text-[#D9541E] flex items-center gap-1.5 pt-1">
                <Tv className="w-4 h-4" /> Season {item.season_number} • Episode {item.episode_number}
              </p>
            )}
          </div>

          <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors">
            <Share2 className="w-4 h-4" /> Share Stream
          </button>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
          {item.synopsis}
        </p>
      </div>

      {/* Series Episodes Rail */}
      {(item.media_type === 'drama_series' || episodes.length > 0) && (
        <section className="pt-8 border-t border-slate-800 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Tv className="w-5 h-5 text-[#D9541E]" /> Series Episodes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {episodes.map((ep: any) => (
              <Link
                key={ep.id}
                href={`/multimedia/watch/${ep.slug}`}
                className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-[#D9541E]/50 transition-all flex space-x-4 group"
              >
                <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                  <Image
                    src={ep.thumbnail_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&auto=format&fit=crop'}
                    alt={ep.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>

                <div className="space-y-1 flex-1">
                  <span className="text-[10px] font-bold text-[#D9541E] uppercase tracking-wider block">
                    Season {ep.season_number || 1} • Episode {ep.episode_number || 1}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#D9541E] transition-colors line-clamp-1">
                    {ep.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {ep.synopsis}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Comments Thread */}
      <MediaComments mediaId={item.id} />
    </div>
  );
}
