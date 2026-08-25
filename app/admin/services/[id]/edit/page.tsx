'use me';
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params?.id as string;
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [galleryUrls, setGalleryUrls] = useState('');
  const [serviceType, setServiceType] = useState('music_video_production');
  const [isFeatured, setIsFeatured] = useState(true);
  const [status, setStatus] = useState('published');

  useEffect(() => {
    const loadService = async () => {
      setFetching(true);
      const { data } = await (supabase.from('services' as any) as any)
        .select('*')
        .eq('id', serviceId)
        .single();

      const item = data as any;
      if (item) {
        setTitle(item.title || '');
        setSlug(item.slug || '');
        setDescription(item.description || '');
        setCoverImageUrl(item.cover_image_url || '');
        setServiceType(item.service_type || 'music_video_production');
        setIsFeatured(item.is_featured || false);
        setStatus(item.status || 'published');
        if (Array.isArray(item.gallery)) {
          setGalleryUrls(item.gallery.join('\n'));
        }
      }
      setFetching(false);
    };

    if (serviceId) loadService();
  }, [serviceId, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const galleryArray = galleryUrls
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    const { error } = await (supabase.from('services' as any) as any)
      .update({
        title,
        slug,
        description,
        cover_image_url: coverImageUrl,
        gallery: galleryArray.length > 0 ? galleryArray : [coverImageUrl],
        service_type: serviceType as any,
        is_featured: isFeatured,
        status: status as any,
        updated_at: new Date().toISOString(),
      })
      .eq('id', serviceId);

    setLoading(false);

    if (!error) {
      router.push('/admin/services');
    } else {
      alert(`Error updating service offering: ${error.message}`);
    }
  };

  if (fetching) {
    return (
      <div className="glass-panel p-12 rounded-2xl text-center text-slate-400 text-sm max-w-4xl mx-auto my-12">
        Loading service details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 theme-sports pb-12">
      <div className="space-y-2 pb-6 border-b border-slate-800">
        <Link
          href="/admin/services"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-[#D9541E] gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Services Portfolio
        </Link>
        <h1 className="text-3xl font-extrabold text-white">Edit Production Service</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 glass-panel p-8 rounded-2xl border border-slate-800">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Service Title *
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Service Type *
            </label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-[#D9541E]"
            >
              <option value="music_video_production">Music Video Production</option>
              <option value="movie_editing">Movie Editing</option>
              <option value="television_programme">Television Programme</option>
              <option value="photography">Photography</option>
              <option value="broadcast_production">Broadcast OB Production</option>
              <option value="corporate_event_coverage">Corporate Event Coverage</option>
              <option value="concert_coverage">Concert Coverage</option>
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

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Cover Image URL *
          </label>
          <input
            type="url"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-[#D9541E]"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Gallery Photo URLs (One URL per line)
          </label>
          <textarea
            rows={4}
            value={galleryUrls}
            onChange={(e) => setGalleryUrls(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-[#D9541E]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Full Description *
          </label>
          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-[#D9541E]"
            required
          />
        </div>

        <div className="pt-4 flex items-center justify-end space-x-3">
          <Link
            href="/admin/services"
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
            <span>{loading ? 'Updating...' : 'Update Service Offering'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
