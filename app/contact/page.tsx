'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MessageSquare, Send, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#090A0F] text-white py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Return Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-xs font-black uppercase tracking-wider text-slate-400 hover:text-[#10B981] gap-2 transition-colors bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4 text-[#10B981]" /> Return to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/50 flex items-center justify-center text-[#10B981] shrink-0">
              <Mail className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">Contact Laku Media</h1>
              <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                Executive Desk, Studio Bookings & Editorial Press Enquiries
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-[11px] text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Communications Channel</span>
          </div>
        </div>

        {/* Two-Column Grid: Executive Info + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Executive Desk Info Card (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#D9541E]/20 text-[#D9541E] border border-[#D9541E]/40">
                  Laku Media Concepts
                </span>
                <h2 className="text-xl font-extrabold text-white mt-2">Executive Desk</h2>
                <p className="text-xs text-slate-400 font-medium">Samuel Adebayo Olaku (CEO)</p>
              </div>

              {/* Phone Numbers Block */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Phone Line 1 & WhatsApp</p>
                    <a
                      href="tel:+2348108285303"
                      className="text-base font-mono font-extrabold text-white hover:text-[#10B981] transition-colors block"
                    >
                      +234 810 828 5303
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Phone Line 2</p>
                    <a
                      href="tel:+2349160395269"
                      className="text-base font-mono font-extrabold text-white hover:text-[#10B981] transition-colors block"
                    >
                      +234 916 039 5269
                    </a>
                  </div>
                </div>

                {/* Email Address Block */}
                <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <Mail className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Official Email</p>
                    <a
                      href="mailto:lakumediaconcept@gmail.com"
                      className="text-sm font-mono font-extrabold text-white hover:text-[#10B981] transition-colors block truncate"
                    >
                      lakumediaconcept@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-4">
              <a
                href="https://wa.me/2348108285303"
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 border border-emerald-300/80 transition-all duration-300 hover:scale-[1.02] active:scale-95 uppercase tracking-wider group"
              >
                <MessageSquare className="w-5 h-5 fill-slate-950 text-slate-950 group-hover:scale-110 transition-transform" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-xl font-extrabold text-white">Send a Message</h2>
                <p className="text-xs text-slate-400 font-medium">Fill out the form below and our team will get back to you promptly.</p>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="lakumediaconcept@gmail.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                  Message / Inquiry <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message or studio inquiry here..."
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all font-medium"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#10B981] hover:bg-emerald-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <Send className="w-4 h-4 fill-slate-950" />
                <span>Send Inquiry</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
