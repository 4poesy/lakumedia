'use me';
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Save, Radio } from 'lucide-react';

export default function EditMediaPage() {
  const router = useRouter();
  const params = useParams();
  const mediaId = params?.id as string;
  const supabase = createClient();

  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [genreId, setGenreId] = useState('');
  const [mediaType, setMediaType] = useState('film');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [durationSeconds, setDurationSeconds] = useState(3600);
  const [isKidSafe, setIsKidSafe] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState('published');

  // Live fields
  const [isLive, setIsLive] = useState(false);
  const [scheduledStartAt, setScheduledStartAt] = useState('');
  const [liveStatus, setLiveStatus] = useState('upcoming');

  useEffect(() => {
    const loadMediaAndGenres = async () => {
      setFetching(true);
      const { data: gData } = await (supabase.from('media_genres' as any) as any).select('*').order('name');
      if (gData && gData.length > 0) setGenres(gData);

      const { data: mData } = await (supabase.from('media_items' as any) as any)
        .select('*')
        .eq('id', mediaId)
        .single();

      const item = mData as any;
      if (item) {
        setTitle(item.title || '');
        setSlug(item.slug || '');
        setSynopsis(item.synopsis || '');
        setGenreId(item.genre_id || '');
        setMediaType(item.media_type || 'film');
        setVideoUrl(item.video_url || '');
        setThumbnailUrl(item.thumbnail_url || '');
        setDurationSeconds(item.duration_seconds || 3600);
        setIsKidSafe(item.is_kid_safe || false);
        setIsFeatured(item.is_featured || false);
        setStatus(item.status || 'published');
        setIsLive(item.is_live || false);
        setLiveStatus(item.live_status || 'upcoming');
        if (item.scheduled_start_at) {
          setScheduledStartAt(new Date(item.scheduled_start_at).toISOString().slice(0, 16));
        }
      }
      setFetching(false);
    };

    if (mediaId) loadMediaAndGenres();
  }, [mediaId, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await (supabase.from('media_items' as any) as any)
      .update({
        title,
        slug,
        synopsis,
        genre_id: genreId || null,
        media_type: mediaType as any,
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl,
        duration_seconds: Number(durationSeconds) || 0,
        is_kid_safe: isKidSafe,
        is_featured: isFeatured,
        is_live: isLive,
        scheduled_start_at: scheduledStartAt ? new Date(scheduledStartAt).toISOString() : null,
        live_status: isLive ? (liveStatus as any) : null,
        status: status as any,
        updated_at: new Date().toISOString(),
      })
      .eq('id', mediaId);

    setLoading(false);

    if (!error) {
      router.push('/admin/media');
    } else {
      alert(`Error updating item: ${error.message}`);
    }
  };

  if (fetching) {
    return (
      <div className="glass-panel p-12 rounded-2xl text-center text-slate-400 text-sm max-w-4xl mx-auto my-12">
        Loading media details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 theme-sports pb-12">
      <div className="space-y-2 pb-6 border-b border-slate-800">
        <Link
          href="/admin/media"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-[#D9541E] gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Media Catalog
        </Link>
        <h1 className="text-3xl font-extrabold text-white">Edit Media Item</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 glass-panel p-8 rounded-2xl border border-slate-800">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-base text-white focus:outline-none focus:border-[#D9541E]"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            URL Slug *
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-[#D9541E] focus:outline-none focus:border-[#D9541E]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Genre
            </label>
            <select
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-[#D9541E]"
            >
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Media Type *
            </label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-[#D9541E]"
            >
              <option value="film">Film</option>
              <option value="documentary">Documentary</option>
              <option value="comedy">Comedy</option>
              <option value="talk_show">Talk Show</option>
              <option value="drama_series">Drama Series</option>
              <option value="music_show">Music Show</option>
              <option value="kids_show">Kids Show</option>
              <option value="music_video">Music Video</option>
              <option value="concert">Concert</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-[#D9541E]"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Video URL
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-[#D9541E]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Thumbnail URL
            </label>
            <input
              type="url"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-[#D9541E]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Synopsis
          </label>
          <textarea
            rows={3}
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-[#D9541E]"
          />
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <label className="flex items-center space-x-2 text-xs font-bold text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-[#D9541E] focus:ring-0"
            />
            <span>Feature on Homepage Spotlight</span>
          </label>

          <label className="flex items-center space-x-2 text-xs font-bold text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={isKidSafe}
              onChange={(e) => setIsKidSafe(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-0"
            />
            <span>Kids Safe Content</span>
          </label>

          <label className="flex items-center space-x-2 text-xs font-bold text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={isLive}
              onChange={(e) => setIsLive(e.target.checked)}
              className="w-4 h-4 rounded text-rose-500 focus:ring-0"
            />
            <span>Is Live Stream Broadcast</span>
          </label>
        </div>

        {/* Live Stream Settings */}
        {isLive && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-4">
            <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-4 h-4" /> Live Stream Parameters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Scheduled Start Date & Time</label>
                <input
                  type="datetime-local"
                  value={scheduledStartAt}
                  onChange={(e) => setScheduledStartAt(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Live Status</label>
                <select
                  value={liveStatus}
                  onChange={(e) => setLiveStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="live_now">Live Now</option>
                  <option value="ended">Ended</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 flex items-center justify-end space-x-3">
          <Link
            href="/admin/media"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-[#D9541E] hover:bg-[#b84315] disabled:opacity-50 text-white font-extrabold text-sm shadow flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Updating...' : 'Update Media Item'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
