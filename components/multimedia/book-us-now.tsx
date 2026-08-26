'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Camera, CheckCircle2, Mail, Phone, Send, Sparkles, User } from 'lucide-react';

export function BookUsNowSection() {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState('Broadcast Media Production');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative rounded-3xl p-8 sm:p-12 border-2 border-[#D9541E] shadow-2xl space-y-8 my-10 overflow-hidden bg-slate-950">
      
      {/* Background Parallax Sunset City Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assest/parallax_sunset_city.jpg"
          alt="Laku Media Production Sunset City Background"
          fill
          className="object-cover"
        />
        {/* Transparent Dark Overlay for Seamless Image Blending */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-black/80" />
      </div>

      <div className="relative z-10 max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#10B981]/25 text-[#10B981] font-extrabold text-xs tracking-widest uppercase border border-[#10B981]/50 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>BOOK LAKU MEDIA CREATIVE STUDIO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight uppercase drop-shadow-xl">
          READY TO PRODUCE YOUR NEXT <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-[#D9541E]">BLOCKBUSTER PROJECT?</span>
        </h2>
        <p className="text-sm text-slate-100 font-medium leading-relaxed drop-shadow">
          Book our multi-camera OB satellite broadcast van, 4K/8K cinema film crew, live concert streaming team, or corporate event coverage.
        </p>
      </div>

      {submitted ? (
        <div className="relative z-10 bg-emerald-950/80 border-2 border-emerald-500 text-white p-8 rounded-2xl space-y-3 text-center backdrop-blur-md">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-2xl font-extrabold text-white">BOOKING INQUIRY RECEIVED!</h3>
          <p className="text-xs text-slate-200 max-w-md mx-auto">
            Thank you for booking Laku Media Studio. Executive Producer Adebayo Samuel Olaku and our production team will contact you within 2 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Service Selection */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-100 block drop-shadow-sm">
              Select Production Service
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/25 text-white text-xs font-extrabold focus:outline-none focus:border-[#10B981] focus:bg-black/70 backdrop-blur-md transition-all shadow-inner"
            >
              <option value="Broadcast Media Production" className="bg-slate-950 text-white">Broadcast Media Production (TV & Satellite)</option>
              <option value="Music Videos Production" className="bg-slate-950 text-white">Music Videos Production (4K/8K Cinema)</option>
              <option value="Movies & Feature Films" className="bg-slate-950 text-white">Movies & Feature Films (Theatrical Production)</option>
              <option value="Documentaries" className="bg-slate-950 text-white">Documentaries & Corporate Storytelling</option>
              <option value="Live Streaming & Concert Coverage" className="bg-slate-950 text-white">Live Streaming & Concert Coverage</option>
              <option value="Private Corporate Events Coverage" className="bg-slate-950 text-white">Private Corporate Events Coverage</option>
            </select>
          </div>

          {/* Target Event / Shoot Date */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-100 block drop-shadow-sm">
              Target Shoot / Event Date
            </label>
            <div className="relative">
              <input
                type="date"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/25 text-white text-xs font-medium focus:outline-none focus:border-[#10B981] focus:bg-black/70 backdrop-blur-md transition-all shadow-inner"
              />
              <Calendar className="w-4 h-4 text-amber-400 absolute right-4 top-4 pointer-events-none" />
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-100 block drop-shadow-sm">
              Your Name / Company Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Adebayo Olaku / Universal Music Group"
                className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/25 text-white text-xs font-medium placeholder-slate-300 focus:outline-none focus:border-[#10B981] focus:bg-black/70 backdrop-blur-md transition-all shadow-inner"
              />
              <User className="w-4 h-4 text-slate-300 absolute right-4 top-4" />
            </div>
          </div>

          {/* Phone Number & WhatsApp */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-100 block drop-shadow-sm">
              Phone Number / WhatsApp
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="+234 800 000 0000"
                className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/25 text-white text-xs font-medium placeholder-slate-300 focus:outline-none focus:border-[#10B981] focus:bg-black/70 backdrop-blur-md transition-all shadow-inner"
              />
              <Phone className="w-4 h-4 text-slate-300 absolute right-4 top-4" />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-100 block drop-shadow-sm">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="producer@company.com"
                className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/25 text-white text-xs font-medium placeholder-slate-300 focus:outline-none focus:border-[#10B981] focus:bg-black/70 backdrop-blur-md transition-all shadow-inner"
              />
              <Mail className="w-4 h-4 text-slate-300 absolute right-4 top-4" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-black text-sm shadow-2xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95 border border-orange-400 uppercase tracking-wider"
            >
              <Send className="w-4 h-4" />
              <span>Submit Studio Booking Request</span>
            </button>
          </div>

        </form>
      )}
    </section>
  );
}
