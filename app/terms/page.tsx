import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Laku Media',
  description: 'Terms of service and platform usage guidelines for Laku Media.',
};

export default function TermsOfServicePage() {
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
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
            <p className="text-xs text-slate-400">Last updated: August 2026</p>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Laku Media, you agree to comply with and be bound by these Terms of Service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Intellectual Property</h2>
          <p>
            All content, sports reporting, logos, video streams, and media assets published on Laku Media are the intellectual property of Laku Media or its content licensors.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. User Code of Conduct</h2>
          <p>
            Users engaging in comment threads must refrain from posting offensive, defamatory, or abusive content. Laku Media reserves the right to moderate or delete any content violating these guidelines.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Production Services & Bookings</h2>
          <p>
            Service inquiries submitted through the platform constitute requests for quotation and do not form a binding contract until formal terms are agreed upon.
          </p>
        </section>
      </div>
    </div>
  );
}
