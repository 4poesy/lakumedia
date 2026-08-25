import React from 'react';
import Link from 'next/link';
import { User, Lock, ArrowLeft } from 'lucide-react';

export default function SignUpPage() {
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
          <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center font-extrabold text-xl text-purple-400">
            L
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-xs text-slate-400">
            Join Lakumedia to save watch history and join the sports community.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="reader@lakumedia.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold bg-purple-600 hover:bg-purple-700 text-white text-sm shadow transition-all"
          >
            Create Account
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-800 text-xs text-slate-400">
          Already have an account?{' '}
          <Link href="/sign-in" className="font-bold text-purple-400 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
