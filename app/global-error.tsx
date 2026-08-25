'use me';
'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen flex items-center justify-center p-6 text-center">
        <div className="space-y-4 max-w-md">
          <h1 className="text-3xl font-extrabold text-white">Application Error</h1>
          <p className="text-xs text-slate-400">
            A critical error occurred. Click below to recover the application.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
          >
            Reset Application
          </button>
        </div>
      </body>
    </html>
  );
}
