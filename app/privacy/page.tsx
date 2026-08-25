import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Laku Media',
  description: 'Privacy policy and data protection guidelines for Laku Media platform.',
};

export default function PrivacyPolicyPage() {
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
            <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
            <p className="text-xs text-slate-400">Last updated: August 2026</p>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Introduction</h2>
          <p>
            Welcome to Laku Media. We respect your privacy and are committed to protecting personal data collected through our sports coverage and multimedia streaming platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
          <p>
            We collect information provided directly by users when creating an account, posting comments, or submitting production service inquiries (such as name, email address, and user profile data).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Use of Information</h2>
          <p>
            Your information is used to personalize content, enable reader reactions, facilitate service bookings, and ensure platform security and performance analytics.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Cookies & Analytics</h2>
          <p>
            We use essential cookies to maintain user sessions and analytics tools to monitor traffic performance. You may control cookie preferences through your browser settings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">5. Contact Us</h2>
          <p>
            For privacy inquiries or data removal requests, please contact our privacy desk at privacy@lakumedia.com.
          </p>
        </section>
      </div>
    </div>
  );
}
