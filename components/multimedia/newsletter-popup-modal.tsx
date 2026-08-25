'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, Sparkles, CheckCircle2, Send, Gift } from 'lucide-react';
import { NeonBorder } from '@/components/ui/neon-border';

export function NewsletterPopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Cinema Films & Music Videos');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds if user has not already dismissed or subscribed
    const timer = setTimeout(() => {
      const hasSubscribed = localStorage.getItem('laku_media_subscribed');
      if (!hasSubscribed) {
        setIsOpen(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    localStorage.setItem('laku_media_subscribed', 'true');
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg">
        <NeonBorder color="#D9541E" rounded={28} thickness={4} borderSize={60} glow={90}>
          <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl relative space-y-6">
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-[#10B981]" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase">VIP ACCESS GRANTED!</h3>
                <p className="text-xs text-slate-300 font-medium max-w-sm mx-auto">
                  Thank you for joining Laku Media Studio VIP network. Check your inbox for your 15% discount code and private film reel invitations!
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-2 text-center pt-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#D9541E] flex items-center justify-center mx-auto shadow-lg">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-black text-[#10B981] uppercase tracking-widest block">
                    EXCLUSIVE STUDIO INVITATION
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase leading-tight">
                    GET 15% OFF YOUR FIRST PRODUCTION
                  </h3>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-sm mx-auto">
                    Subscribe to Laku Media VIP newsletter to receive exclusive rates, private cinema screening passes, and live stream notifications.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="producer@yourcompany.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs font-medium focus:outline-none focus:border-[#D9541E]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                      Primary Media Interest
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-[#D9541E]"
                    >
                      <option>Cinema Films & Music Videos</option>
                      <option>Live Satellite Broadcast & Concerts</option>
                      <option>Corporate Events & AGM Staging</option>
                      <option>Commercial Advertising & Marketing</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl border border-orange-400 transition-transform active:scale-95"
                  >
                    <span>Claim 15% VIP Discount</span> <Send className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-[10px] text-center text-slate-500 font-medium">
                  100% Privacy Guaranteed. Zero spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </NeonBorder>
      </div>
    </div>
  );
}

export function StudioSubscriberSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-slate-950 p-8 sm:p-12 rounded-3xl border-2 border-[#10B981] shadow-2xl space-y-6 relative overflow-hidden my-10">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-extrabold text-[#10B981] uppercase tracking-widest block">
          JOIN LAKU MEDIA STUDIO NETWORK
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase">
          SUBSCRIBE FOR PRIVATE CINEMA REELS & DISCOUNTS
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto leading-relaxed">
          Stay connected with Laku Media for theatrical movie release dates, multi-camera live broadcast alerts, and exclusive client rate offers.
        </p>

        {submitted ? (
          <div className="p-4 rounded-2xl bg-[#10B981]/20 border border-[#10B981] text-[#10B981] font-extrabold text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#10B981]" /> Subscribed! Welcome to Laku Media VIP Network.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto pt-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full sm:flex-1 px-5 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs font-medium focus:outline-none focus:border-[#10B981]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#10B981] hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-transform active:scale-95"
            >
              <span>Subscribe</span> <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
