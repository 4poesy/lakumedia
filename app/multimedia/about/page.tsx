import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Camera, ChevronRight, UserCheck, ShieldAlert } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 theme-multimedia py-6">
      {/* Back Link */}
      <div>
        <Link
          href="/multimedia"
          className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-[#D9541E] gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Multimedia Hub
        </Link>
      </div>

      {/* Hero Section with Official Logo */}
      <section className="bg-white p-8 lg:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-center">
        <div className="relative w-48 sm:w-64 h-24 mx-auto overflow-hidden rounded-2xl bg-slate-50 p-3 border border-slate-200 shadow-sm">
          <Image
            src="/brand/laku-media/laku-media-logo-dark.jpeg"
            alt="Laku Media Logo"
            fill
            className="object-contain p-2"
            priority
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
            About <span className="text-[#D9541E]">Laku Media</span>
          </h1>
          <p className="text-sm font-bold text-slate-700 flex items-center justify-center gap-1.5">
            <UserCheck className="w-4 h-4 text-[#D9541E]" /> Executive Leadership: <span className="text-slate-900 font-extrabold">Adebayo Samuel Olaku, CEO</span>
          </p>
        </div>

        {/* Mission & Story Blurb (Marked as Placeholder for Client Input) */}
        <div className="max-w-2xl mx-auto space-y-4 pt-4 text-left">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Note for Client / Akinola: Placeholder company story below — pending final approved copy from client.</span>
          </div>

          <p className="text-slate-700 text-sm leading-relaxed font-medium">
            Laku Media is a premier Nigerian multimedia production company specializing in high-definition video editing, television programming, live broadcast coverage, music video direction, and professional photography.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed font-medium">
            Under the vision of CEO Adebayo Samuel Olaku, Laku Media bridges high-end commercial production services with on-demand digital entertainment streaming.
          </p>
        </div>
      </section>

      {/* Production Services Summary */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Camera className="w-6 h-6 text-[#D9541E]" /> Core Production Capabilities
          </h2>
          <Link
            href="/multimedia/production"
            className="text-xs font-bold text-[#D9541E] hover:underline flex items-center gap-1"
          >
            Explore Full Portfolio <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-lg font-extrabold text-[#D9541E]">Music Video Production</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Full 4K/8K music video concept creation, set design, multi-angle camera direction, and visual effects editing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-lg font-extrabold text-[#D9541E]">Movie Editing</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Professional post-production, theatrical sound design, color mastering, and editorial cutting for feature films.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-lg font-extrabold text-[#D9541E]">Television Programme</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              End-to-end television studio show production, talk show recording, sports magazine programming, and multi-cam switching.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-lg font-extrabold text-[#D9541E]">Commercial Photography</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              High-end studio photography, event red carpet portraits, corporate executive headshots, and editorial sports photography.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-4 shadow-sm">
        <h3 className="text-xl font-extrabold text-slate-900">Work With Laku Media</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Contact our production desk for inquiries regarding television programming, film editing, music video shoots, or photography bookings.
        </p>
        <Link
          href="/multimedia/production"
          className="inline-flex items-center px-6 py-3 rounded-xl font-extrabold bg-[#D9541E] hover:bg-[#b84315] text-white text-xs shadow-sm"
        >
          View Production Portfolio
        </Link>
      </div>
    </div>
  );
}
