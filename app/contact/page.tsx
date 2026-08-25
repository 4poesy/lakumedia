import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, UserCheck } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Laku Media',
  description: 'Get in touch with Laku Media production desk and editorial team.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 theme-sports py-6">
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-emerald-400 gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Homepage
        </Link>
      </div>

      <div className="space-y-4 pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white">Contact Laku Media</h1>
            <p className="text-xs text-slate-400">Production Services, Editorial Press & Customer Inquiries</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#D9541E]" /> Executive Desk
          </h2>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-start space-x-3">
              <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Adebayo Samuel Olaku</p>
                <p className="text-slate-400">Chief Executive Officer (CEO)</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Production Inquiry Email</p>
                <p className="text-slate-400">production@lakumedia.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Headquarters</p>
                <p className="text-slate-400">Lagos, Nigeria</p>
              </div>
            </div>
          </div>
        </div>

        <form className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white">Send a Direct Message</h2>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Full name"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Message</label>
            <textarea
              rows={4}
              placeholder="How can we assist you?"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs shadow"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
