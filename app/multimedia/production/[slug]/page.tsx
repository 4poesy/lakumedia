import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft, Camera, Award, Mail, Phone, UserCheck, CheckCircle2, Image as ImageIcon } from 'lucide-react';

export const revalidate = 60;

interface ProductionSlugProps {
  params: {
    slug: string;
  };
}

export default async function ProductionDetailPage({ params }: ProductionSlugProps) {
  const { slug } = params;
  const supabase = await createClient();

  const { data: serviceData } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();

  const formattedTitle = slug
    .replace('-', ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const service = (serviceData as any) || {
    id: 's1',
    title: formattedTitle.includes('Music') ? 'Music Video Production' : formattedTitle,
    slug: slug,
    description:
      'Laku Media provides full end-to-end production capabilities including scriptwriting, set design, multi-angle camera direction, 4K/8K filming, color grading, theatrical sound engineering, and post-production editorial mastering.',
    cover_image_url:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop',
    ],
    service_type: 'music_video_production' as const,
  };

  const galleryImages = Array.isArray(service.gallery)
    ? service.gallery
    : [
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop',
      ];

  const typeLabel = service.service_type
    ? service.service_type.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
    : 'Production Service';

  return (
    <div className="max-w-4xl mx-auto space-y-8 theme-multimedia">
      {/* Back Link */}
      <div>
        <Link
          href="/multimedia/production"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-[#D9541E] gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Production Offerings
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-[#D9541E] text-white shadow">
            {typeLabel}
          </span>
          <span className="text-xs text-[#D9541E] font-bold flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" /> Adebayo Samuel Olaku, CEO
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
          {service.title}
        </h1>
      </div>

      {/* Cover Image */}
      <div className="relative h-80 sm:h-[420px] w-full rounded-3xl overflow-hidden border border-slate-800 glass-panel shadow-2xl">
        <Image
          src={
            service.cover_image_url ||
            'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop'
          }
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Service Overview */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Camera className="w-6 h-6 text-[#D9541E]" /> Production Scope & Capabilities
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
          {service.description}
        </p>

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D9541E]" /> High-Definition 4K / 8K Filming Rigs
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D9541E]" /> Theatrical Audio Engineering & Sound Design
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D9541E]" /> Professional Color Grading & Visual Effects
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D9541E]" /> Multi-Cam Live Broadcast OB Truck Setup
          </div>
        </div>
      </div>

      {/* Production Gallery Showcase */}
      {galleryImages.length > 0 && (
        <section className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#D9541E]" /> Production Stills & Gallery
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {galleryImages.map((imgUrl: string, idx: number) => (
              <div
                key={idx}
                className="relative h-48 rounded-xl overflow-hidden border border-slate-800 glass-panel"
              >
                <Image
                  src={imgUrl}
                  alt={`Production Still ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Book This Service CTA */}
      <div className="glass-panel p-8 rounded-3xl border border-[#D9541E]/40 text-center space-y-4 bg-gradient-to-b from-[#2A2E7F]/20 to-slate-950">
        <h3 className="text-2xl font-extrabold text-white">Book {service.title}</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
          Contact our production desk directly to schedule a project consultation, request a customized rate card, or reserve production dates.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`mailto:production@lakumedia.com?subject=Inquiry: ${encodeURIComponent(service.title)}`}
            className="px-6 py-3 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-xs flex items-center gap-2 shadow-lg"
          >
            <Mail className="w-4 h-4" /> Book Via Email Inquiry
          </a>
          <Link
            href="/multimedia/about"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700"
          >
            Company Leadership Details
          </Link>
        </div>
      </div>
    </div>
  );
}
