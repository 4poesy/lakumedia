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
    // Frequency control: Only show after 10 seconds if user has not subscribed or dismissed in the last 7 days
    const timer = setTimeout(() => {
      try {
        const hasSubscribed = localStorage.getItem('laku_media_subscribed');
        const lastDismissed = localStorage.getItem('laku_newsletter_dismissed');

        if (hasSubscribed) return;

        if (lastDismissed) {
          const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
          const timeSinceDismissed = Date.now() - parseInt(lastDismissed, 10);
          if (timeSinceDismissed < sevenDaysInMs) {
            return;
          }
        }

        setIsOpen(true);
      } catch (err) {
        console.error('Error checking newsletter popup frequency:', err);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    try {
      localStorage.setItem('laku_newsletter_dismissed', Date.now().toString());
    } catch (e) {
      console.error(e);
    }
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      localStorage.setItem('laku_media_subscribed', 'true');
    } catch (e) {
      console.error(e);
    }
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-md my-auto max-h-[92vh] flex flex-col justify-center">
        
        {/* Prominent Mobile-First Touch Close Button */}
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close modal"
          className="absolute -top-3 -right-3 z-30 w-11 h-11 rounded-full bg-slate-900 border-2 border-slate-700 text-white flex items-center justify-center shadow-2xl hover:bg-[#D9541E] hover:border-orange-400 transition-all active:scale-90"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>

        <NeonBorder color="#D9541E" rounded={28} thickness={4} borderSize={60} glow={90}>
          <div className="bg-slate-950 p-5 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative space-y-5 overflow-y-auto max-h-[85vh]">
            
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
                <div className="space-y-2 text-center pt-1">
                  <div className="w-12 h-12 rounded-2xl bg-[#D9541E] flex items-center justify-center mx-auto shadow-lg">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-black text-[#10B981] uppercase tracking-widest block">
                    EXCLUSIVE STUDIO INVITATION
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase leading-tight">
                    GET 15% OFF YOUR FIRST PRODUCTION
                  </h3>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-xs mx-auto">
                    Subscribe to Laku Media VIP newsletter to receive exclusive rates, private screening passes, and live stream alerts.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 pt-1">
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

                {/* Secondary Touch Dismiss Link for Small Mobile Screens */}
                <div className="text-center pt-1">
                  <button
                    onClick={handleClose}
                    type="button"
                    className="text-[11px] font-bold text-slate-400 hover:text-white underline p-1 active:scale-95"
                  >
                    No thanks, continue browsing
                  </button>
                </div>
              </>
            )}
          </div>
        </NeonBorder>
      </div>
    </div>
  );
}

interface StudioSubscriberSectionProps {
  showTagline?: boolean;
}

export function StudioSubscriberSection({ showTagline = true }: StudioSubscriberSectionProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      localStorage.setItem('laku_media_subscribed', 'true');
    } catch (e) {
      console.error(e);
    }
    setSubmitted(true);
  };

  return (
    <section className="bg-slate-950 p-8 sm:p-12 rounded-3xl border-2 border-[#10B981] shadow-2xl space-y-6 relative overflow-hidden my-10 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        {showTagline && (
          <span className="text-xs font-extrabold text-[#10B981] uppercase tracking-widest block">
            JOIN LAKU MEDIA STUDIO NETWORK
          </span>
        )}
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
