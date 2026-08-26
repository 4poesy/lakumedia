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
    <section className="relative rounded-3xl p-8 sm:p-12 border-2 border-[#D9541E] shadow-2xl space-y-8 my-10 overflow-hidden bg-[#090A0F]">
      
      {/* Background Parallax Sunset City Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assest/parallax_sunset_city.jpg"
          alt="Laku Media Production Sunset City Background"
          fill
          className="object-cover"
        />
        {/* Dark Contrast Gradient Overlay for High Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#090A0F]/90 via-[#090A0F]/80 to-[#090A0F]/90" />
      </div>

      <div className="relative z-10 max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] font-extrabold text-xs tracking-widest uppercase border border-[#10B981]/40 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>BOOK LAKU MEDIA CREATIVE STUDIO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight uppercase drop-shadow-lg">
          READY TO PRODUCE YOUR NEXT <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-[#D9541E]">BLOCKBUSTER PROJECT?</span>
        </h2>
        <p className="text-sm text-slate-200 font-medium leading-relaxed drop-shadow">
          Book our multi-camera OB satellite broadcast van, 4K/8K cinema film crew, live concert streaming team, or corporate event coverage.
        </p>
      </div>

      {submitted ? (
        <div className="relative z-10 bg-emerald-950/90 border-2 border-emerald-500 text-white p-8 rounded-2xl space-y-3 text-center backdrop-blur-md">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-2xl font-extrabold text-white">BOOKING INQUIRY RECEIVED!</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Thank you for booking Laku Media Studio. Executive Producer Adebayo Samuel Olaku and our production team will contact you within 2 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Service Selection */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-200 block">
              Select Production Service
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white text-xs font-extrabold focus:outline-none focus:border-[#10B981] backdrop-blur-md"
            >
              <option value="Broadcast Media Production">Broadcast Media Production (TV & Satellite)</option>
              <option value="Music Videos Production">Music Videos Production (4K/8K Cinema)</option>
              <option value="Movies & Feature Films">Movies & Feature Films (Theatrical Production)</option>
              <option value="Documentaries">Documentaries & Corporate Storytelling</option>
              <option value="Live Streaming & Concert Coverage">Live Streaming & Concert Coverage</option>
              <option value="Private Corporate Events Coverage">Private Corporate Events Coverage</option>
            </select>
          </div>

          {/* Target Event / Shoot Date */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-200 block">
              Target Shoot / Event Date
            </label>
            <div className="relative">
              <input
                type="date"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-[#10B981] backdrop-blur-md"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-200 block">
              Your Name / Company Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Adebayo Olaku / Universal Music Group"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white text-xs font-medium placeholder-slate-500 focus:outline-none focus:border-[#10B981] backdrop-blur-md"
              />
              <User className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
            </div>
          </div>

          {/* Phone Number & WhatsApp */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-200 block">
              Phone Number / WhatsApp
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="+234 800 000 0000"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white text-xs font-medium placeholder-slate-500 focus:outline-none focus:border-[#10B981] backdrop-blur-md"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-200 block">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="producer@company.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white text-xs font-medium placeholder-slate-500 focus:outline-none focus:border-[#10B981] backdrop-blur-md"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-sm shadow-2xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95 border border-orange-400"
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
