'use me';
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Film, Plus, Edit, Trash2, Radio, ShieldCheck, Eye, Search } from 'lucide-react';

export default function MediaLibraryAdminPage() {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  const supabase = createClient();

  const fetchMediaItems = async () => {
    setLoading(true);
    const { data } = await (supabase.from('media_items' as any) as any)
      .select('*, media_genres(name, slug)')
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      setMediaItems(data);
    } else {
      setMediaItems([
        {
          id: '50000000-0000-0000-0000-000000000001',
          title: 'Giants of Africa: The Story of Nigerian Football',
          slug: 'giants-of-africa-nigerian-football',
          media_type: 'documentary',
          status: 'published',
          is_live: false,
          is_featured: true,
          media_genres: { name: 'Documentaries' },
        },
        {
          id: '50000000-0000-0000-0000-000000000005',
          title: 'Lagos Afrobeat Concert Live Stream',
          slug: 'lagos-afrobeat-concert-live',
          media_type: 'concert',
          status: 'published',
          is_live: true,
          live_status: 'live_now',
          media_genres: { name: 'Music Shows' },
        },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;

    const { error } = await (supabase.from('media_items' as any) as any)
      .delete()
      .eq('id', id);

    if (!error) {
      setMediaItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert(`Error deleting item: ${error.message}`);
    }
  };

  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || item.media_genres?.slug === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="space-y-6 theme-sports">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Film className="w-8 h-8 text-[#D9541E]" /> Media Catalog Admin
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage films, documentaries, comedy shows, series episodes, and live streams.
          </p>
        </div>

        <Link
          href="/admin/media/new"
          className="px-5 py-2.5 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-xs flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" /> Add Media Item
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search catalog titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D9541E]"
          />
        </div>
      </div>

      {/* Table List */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading catalog items...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Type / Genre</th>
                  <th className="px-6 py-3">Live Status</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">
                      <div className="flex items-center space-x-2">
                        <span>{item.title}</span>
                        {item.is_featured && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#D9541E]/20 text-[#D9541E] border border-[#D9541E]/40">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 capitalize">
                      {item.media_type?.replace('_', ' ')} • {item.media_genres?.name || 'General'}
                    </td>
                    <td className="px-6 py-4">
                      {item.is_live ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center gap-1 w-fit animate-pulse">
                          <Radio className="w-3 h-3" /> {item.live_status || 'Live'}
                        </span>
                      ) : (
                        <span className="text-slate-500">Standard VOD</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/multimedia/watch/${item.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white inline-block"
                        title="View Public Stream"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/media/${item.id}/edit`}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-emerald-400 inline-block"
                        title="Edit Item"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 inline-block"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
