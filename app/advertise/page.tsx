'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Megaphone, Trophy, Users, BarChart3, Mail, MessageSquare, CheckCircle2, Send, Sparkles } from 'lucide-react';

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-[#090A0F] text-white py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Navigation Return Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-xs font-black uppercase tracking-wider text-slate-400 hover:text-[#10B981] gap-2 transition-colors bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4 text-[#10B981]" /> Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-slate-900/90 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="flex items-center space-x-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 inline-flex items-center gap-1.5">
              <Megaphone className="w-4 h-4 text-amber-400" /> ADVERTISE & SPONSORSHIPS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
            Reach 1.5M+ Passionate Football & Media Fans Across Nigeria & Global Diaspora
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-medium">
            Laku Media delivers high-impact commercial placements for top brands, betting partners, telecommunication giants, and consumer products across our sports publishing portal, live score ticker, and 8K multimedia broadcasts.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-2xl font-mono font-black text-amber-400">1.5M+</span>
              <span className="text-xs text-slate-400 font-bold block mt-0.5">Monthly Impressions</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-2xl font-mono font-black text-emerald-400">78%</span>
              <span className="text-xs text-slate-400 font-bold block mt-0.5">Male Audience (18-34)</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-2xl font-mono font-black text-white">4.8 Min</span>
              <span className="text-xs text-slate-400 font-bold block mt-0.5">Avg Session Duration</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-2xl font-mono font-black text-rose-400">100+</span>
              <span className="text-xs text-slate-400 font-bold block mt-0.5">Global Leagues Covered</span>
            </div>
          </div>
        </div>

        {/* Sponsorship Packages Grid */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Sponsorship Packages</h2>
            <p className="text-xs text-slate-400 font-medium">Select a tailored advertising package or request a custom rate card.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Package 1 */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-5 flex flex-col justify-between hover:border-amber-400 transition-colors">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950 text-amber-400 border border-slate-800">
                  STANDARD
                </span>
                <h3 className="text-xl font-black text-white">Header Leaderboard Banner</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  High-visibility 728x90 top banner slot displayed across all sports pages and article views.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 font-medium pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Top-of-Page Placement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Mobile & Desktop Responsive</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Click-Through Tracking</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-400 font-bold block">Starting From</span>
                <span className="text-2xl font-mono font-black text-amber-400">₦250,000 / month</span>
              </div>
            </div>

            {/* Package 2 (Featured) */}
            <div className="bg-slate-900 rounded-3xl p-6 border-2 border-emerald-500 space-y-5 flex flex-col justify-between shadow-2xl relative">
              <div className="absolute top-0 right-6 -mt-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-md">
                  MOST POPULAR
                </span>
              </div>

              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                  PREMIUM
                </span>
                <h3 className="text-xl font-black text-white">Live Match Ticker Partner</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Exclusive branding on the sticky real-time live score footer ticker seen by 100% of website visitors.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 font-medium pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>100% Impression Share</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Brand Logo in Ticker Bar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct Call-to-Action Link</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-400 font-bold block">Starting From</span>
                <span className="text-2xl font-mono font-black text-emerald-400">₦500,000 / month</span>
              </div>
            </div>

            {/* Package 3 */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-5 flex flex-col justify-between hover:border-amber-400 transition-colors">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950 text-rose-400 border border-slate-800">
                  ENTERPRISE
                </span>
                <h3 className="text-xl font-black text-white">In-Feed Native Spotlight</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Sponsored native cards integrated inside sports news feeds and Football Focus Extra video player.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 font-medium pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>High Engagement Native Ads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Video Overlay Placements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated Press Release</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-400 font-bold block">Starting From</span>
                <span className="text-2xl font-mono font-black text-rose-400">₦750,000 / month</span>
              </div>
            </div>

          </div>
        </div>

        {/* Ad Inquiry Form */}
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Request Rate Card & Consultation</h2>
            <p className="text-xs text-slate-400 font-medium">Submit your advertising inquiry and our sales team will respond within 2 hours.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">Company / Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. Bet9ja / MTN / Nike"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#10B981]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">Contact Email</label>
                <input
                  type="email"
                  placeholder="lakumediaconcept@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#10B981]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">Campaign Budget / Package</label>
              <select className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-[#10B981]">
                <option>Header Leaderboard Banner (₦250,000/mo)</option>
                <option>Live Match Ticker Partner (₦500,000/mo)</option>
                <option>In-Feed Native Spotlight (₦750,000/mo)</option>
                <option>Custom Enterprise Campaign</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">Campaign Details / Message</label>
              <textarea
                rows={4}
                placeholder="Describe your brand goals, target start date, and preferred ad slots..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#10B981]"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#10B981] hover:bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 border border-emerald-400"
              >
                <Send className="w-4 h-4 fill-slate-950" />
                <span>Submit Ad Inquiry</span>
              </button>

              <a
                href="https://wa.me/2348108285303?text=Hello%20Laku%20Media%20Ad%20Sales%20Team%2C%20I%20want%20to%20advertise%20my%20brand%20on%20your%20sports%20portal."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider border border-slate-800 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#10B981]" />
                <span>Direct Sales WhatsApp</span>
              </a>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
