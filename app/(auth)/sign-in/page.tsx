import React from 'react';
import Link from 'next/link';
import { User, Lock, ArrowLeft, Sparkles } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto my-12 space-y-6">
      <Link
        href="/"
        className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-white gap-1"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
      </Link>

      <div className="glass-panel rounded-2xl p-8 border border-slate-800 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center font-extrabold text-xl text-emerald-400">
            L
          </div>
          <h1 className="text-2xl font-bold text-white">Sign In to Lakumedia</h1>
          <p className="text-xs text-slate-400">
            Access live match updates, watch history, and article comments.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="reader@lakumedia.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-sm shadow transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-800 text-xs text-slate-400">
          Don&apos;t have an account yet?{' '}
          <Link href="/sign-up" className="font-bold text-emerald-400 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
