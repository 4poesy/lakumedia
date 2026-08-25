'use me';
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { Camera, ArrowLeft, ChevronRight, Award, UserCheck, Filter, Check } from 'lucide-react';

export default function ProductionServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        setServices(data);
      } else {
        setServices([
          {
            id: 's1',
            title: 'Music Video Production',
            slug: 'music-video-production',
            description: 'Full 4K/8K music video concept creation, set design, multi-angle camera direction, color grading, and visual effects editing.',
            cover_image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop',
            service_type: 'music_video_production',
            is_featured: true,
          },
          {
            id: 's2',
            title: 'Feature Film & Movie Editing',
            slug: 'movie-editing',
            description: 'Professional post-production, theatrical sound design, color mastering, and editorial cutting for feature films.',
            cover_image_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&auto=format&fit=crop',
            service_type: 'movie_editing',
            is_featured: true,
          },
          {
            id: 's3',
            title: 'Television Programme Broadcast Production',
            slug: 'television-programme',
            description: 'End-to-end television studio show production, talk show recording, sports magazine programming, and multi-cam switching.',
            cover_image_url: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&auto=format&fit=crop',
            service_type: 'television_programme',
            is_featured: true,
          },
          {
            id: 's4',
            title: 'Professional Commercial Photography',
            slug: 'photography',
            description: 'High-end studio photography, event red carpet portraits, corporate executive headshots, and editorial sports photography.',
            cover_image_url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&auto=format&fit=crop',
            service_type: 'photography',
            is_featured: true,
          },
          {
            id: 's5',
            title: 'NPFL Super 8 Broadcast Production',
            slug: 'npfl-super-8-broadcast',
            description: 'Outside Broadcast OB truck multi-cam setup for national league matches with VAR graphics integration.',
            cover_image_url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop',
            service_type: 'broadcast_production',
            is_featured: true,
          },
          {
            id: 's6',
            title: 'Lagos Tech & Media Summit Coverage',
            slug: 'lagos-tech-media-summit-coverage',
            description: 'Corporate event coverage, live multi-stage audio streaming, and high-impact executive recap video reels.',
            cover_image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop',
            service_type: 'corporate_event_coverage',
            is_featured: true,
          },
          {
            id: 's7',
            title: 'Afro-Fusion Arena Concert Filming',
            slug: 'afro-fusion-arena-concert-filming',
            description: 'Full stadium lighting, 4K camera rig filming, live stream encoding, and concert film editing.',
            cover_image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&auto=format&fit=crop',
            service_type: 'concert_coverage',
            is_featured: true,
          },
        ]);
      }
      setLoading(false);
    };

    fetchServices();
  }, [supabase]);

  const serviceTypes = [
    { id: 'all', label: 'All Services' },
    { id: 'music_video_production', label: 'Music Videos' },
    { id: 'movie_editing', label: 'Movie Editing' },
    { id: 'television_programme', label: 'TV Programmes' },
    { id: 'photography', label: 'Photography' },
    { id: 'broadcast_production', label: 'Broadcast OB' },
    { id: 'corporate_event_coverage', label: 'Corporate Events' },
    { id: 'concert_coverage', label: 'Concerts' },
  ];

  const filteredServices =
    selectedType === 'all'
      ? services
      : services.filter((s) => s.service_type === selectedType);

  return (
    <div className="space-y-10 theme-multimedia">
      {/* Header Banner */}
      <div className="space-y-4 pb-6 border-b border-slate-800">
        <Link
          href="/multimedia"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-[#D9541E] gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Multimedia Hub
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-14 h-14 rounded-2xl bg-white p-1 overflow-hidden shadow-lg border border-slate-700">
              <Image
                src="/brand/laku-media/laku-media-logo-symbol.jpeg"
                alt="Laku Media"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-[#D9541E] uppercase tracking-wider mb-1">
                <UserCheck className="w-3.5 h-3.5" /> Adebayo Samuel Olaku, CEO
              </div>
              <h1 className="text-3xl font-extrabold text-white">
                Laku Media Production Services
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Full Production Suite: Music Videos • Movie Editing • TV Programmes • Photography • Broadcast OB
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
            <Award className="w-4 h-4 text-[#D9541E]" /> Official Portfolio
          </div>
        </div>
      </div>

      {/* Interactive Service Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800/60">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0 mr-2">
          <Filter className="w-3.5 h-3.5 text-[#D9541E]" /> Filter:
        </span>
        {serviceTypes.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedType(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedType === tab.id
                ? 'bg-[#D9541E] text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((item: any) => {
          const typeLabel = item.service_type
            ? item.service_type.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
            : 'Production Service';

          return (
            <div
              key={item.id}
              className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-[#D9541E]/50 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <Image
                  src={
                    item.cover_image_url ||
                    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop'
                  }
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-slate-950/90 text-[#D9541E] border border-[#D9541E]/40 backdrop-blur-md">
                    {typeLabel}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-white group-hover:text-[#D9541E] transition-colors leading-snug">
                    <Link href={`/multimedia/production/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={`/multimedia/production/${item.slug}`}
                    className="text-xs font-bold text-[#D9541E] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    View Portfolio Case Study <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
