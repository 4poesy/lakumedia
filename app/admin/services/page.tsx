'use me';
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Camera, Plus, Edit, Trash2, Eye, Filter } from 'lucide-react';

export default function ServicesAdminPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  const supabase = createClient();

  const fetchServices = async () => {
    setLoading(true);
    const { data } = await (supabase.from('services' as any) as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      setServices(data);
    } else {
      setServices([
        {
          id: '60000000-0000-0000-0000-000000000001',
          title: 'Music Video Production',
          slug: 'music-video-production',
          service_type: 'music_video_production',
          status: 'published',
        },
        {
          id: '60000000-0000-0000-0000-000000000002',
          title: 'Feature Film & Movie Editing',
          slug: 'movie-editing',
          service_type: 'movie_editing',
          status: 'published',
        },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service offering?')) return;

    const { error } = await (supabase.from('services' as any) as any)
      .delete()
      .eq('id', id);

    if (!error) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    } else {
      alert(`Error deleting service: ${error.message}`);
    }
  };

  const filteredServices = services.filter(
    (s) => selectedType === 'all' || s.service_type === selectedType
  );

  return (
    <div className="space-y-6 theme-sports">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Camera className="w-8 h-8 text-[#D9541E]" /> Production Services Admin
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage Laku Media business portfolio offerings across all seven service types.
          </p>
        </div>

        <Link
          href="/admin/services/new"
          className="px-5 py-2.5 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-xs flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" /> Add New Service
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0 mr-2">
          <Filter className="w-3.5 h-3.5 text-[#D9541E]" /> Type:
        </span>
        {['all', 'music_video_production', 'movie_editing', 'television_programme', 'photography', 'broadcast_production', 'corporate_event_coverage', 'concert_coverage'].map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
              selectedType === t
                ? 'bg-[#D9541E] text-white shadow'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            {t === 'all' ? 'All Services' : t.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Table List */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading service offerings...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3">Service Title</th>
                  <th className="px-6 py-3">Service Type</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">
                      {service.title}
                    </td>
                    <td className="px-6 py-4 text-slate-400 capitalize">
                      {service.service_type?.replace(/_/g, ' ')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        service.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/multimedia/production/${service.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white inline-block"
                        title="View Case Study"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/services/${service.id}/edit`}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-emerald-400 inline-block"
                        title="Edit Service"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 inline-block"
                        title="Delete Service"
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
