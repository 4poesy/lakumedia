'use me';
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-6 theme-sports">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 animate-pulse" />
      </div>

      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-extrabold text-white">Something Went Wrong</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          An unexpected error occurred while loading this page. Our technical team has been notified.
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Try Again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-1.5"
        >
          <Home className="w-3.5 h-3.5" /> Return Home
        </Link>
      </div>
    </div>
  );
}
