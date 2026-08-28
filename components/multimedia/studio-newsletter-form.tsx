'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export function StudioNewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <div className="bg-gradient-to-br from-[#2A2E7F] to-[#0F172A] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
        <Mail className="w-4 h-4" /> VIP Studio Newsletter
      </div>
      <h4 className="text-base font-black text-white">Subscribe to Production Case Studies</h4>
      <p className="text-xs text-slate-300 font-medium leading-relaxed">
        Get technical whitepapers, OB Van satellite engineering breakdowns, and behind-the-scenes cinema guides delivered directly to your inbox.
      </p>

      {subscribed && (
        <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 p-3 rounded-xl flex items-center gap-2 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Thank you! You are subscribed to Laku Media Studio Insights.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          placeholder="Enter your email address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D9541E]"
        />
        <button
          type="submit"
          className="w-full bg-[#D9541E] hover:bg-[#b84315] text-white font-black text-xs py-2.5 rounded-xl uppercase tracking-wider transition-colors shadow-md"
        >
          SUBSCRIBE NOW
        </button>
      </form>
    </div>
  );
}
