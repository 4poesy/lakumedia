'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Sparkles, MessageSquare } from 'lucide-react';

export function StudioLocationMapSection() {
  return (
    <section className="bg-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8 my-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] font-extrabold text-xs tracking-widest uppercase border border-[#10B981]/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>VISIT OUR PRODUCTION HEADQUARTERS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            LAKU MEDIA CREATIVE STUDIO LOCATION
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            Executive Production Studio & Soundstage Complex situated in Ogun State, Nigeria.
          </p>
        </div>
      </div>

      {/* Grid: Vibrant Coloured Map Iframe (Left 7 Cols) + Studio Address & Contact Info (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Full-Color Interactive Google Map Iframe */}
        <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          <iframe
            title="Laku Media Studio Ogun State Headquarters Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d506927.8471465225!2d3.0000000000000004!3d7.150000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b0d2d3e9dbd71%3A0x28bc3a6771d9d95f!2sOgun%20State!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
            className="w-full h-full border-0 absolute inset-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Studio Info Card */}
        <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <h3 className="text-xl font-extrabold text-white uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#D9541E]" /> STUDIO HEADQUARTERS
            </h3>

            {/* Address */}
            <div className="flex items-start space-x-3 text-xs">
              <div className="p-2.5 rounded-xl bg-[#2A2E7F] text-[#10B981] shrink-0 border border-slate-700">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-extrabold text-slate-200 block uppercase tracking-wider">Physical Address</span>
                <p className="text-slate-300 leading-relaxed font-medium">
                  Laku Media Studio Complex, Km 12 Lagos-Ibadan Expressway / Abeokuta Road, Ogun State, Nigeria.
                </p>
              </div>
            </div>

            {/* Telephone & WhatsApp */}
            <div className="flex items-start space-x-3 text-xs">
              <div className="p-2.5 rounded-xl bg-[#2A2E7F] text-amber-400 shrink-0 border border-slate-700">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-extrabold text-slate-200 block uppercase tracking-wider">Phone Line 1 & WhatsApp</span>
                <p className="text-amber-300 font-mono font-extrabold text-sm">
                  +234 810 828 5303
                </p>
                <p className="text-emerald-400 font-mono font-bold text-xs pt-1">
                  Phone Line 2: +234 916 039 5269
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-3 text-xs">
              <div className="p-2.5 rounded-xl bg-[#2A2E7F] text-emerald-400 shrink-0 border border-slate-700">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-extrabold text-slate-200 block uppercase tracking-wider">Official Email</span>
                <p className="text-slate-300 font-mono font-bold">
                  lakumediaconcept@gmail.com
                </p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-start space-x-3 text-xs">
              <div className="p-2.5 rounded-xl bg-[#2A2E7F] text-orange-400 shrink-0 border border-slate-700">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-extrabold text-slate-200 block uppercase tracking-wider">Production Hours</span>
                <p className="text-slate-300 font-medium">
                  Monday – Saturday: 8:00 AM – 9:00 PM <br />
                  <span className="text-[#10B981] font-bold">24/7 Satellite OB Van & Live Broadcast Uplink Operations</span>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <a
              href="https://wa.me/2348108285303"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-emerald-300/80 uppercase tracking-wider group"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950 text-slate-950 group-hover:scale-110 transition-transform" />
              <span>Chat Directly on WhatsApp</span>
            </a>

            <a
              href="https://maps.google.com/?q=Ogun+State,+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 border border-orange-400 uppercase tracking-wider"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
