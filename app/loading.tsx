import React from 'react';

export default function GlobalLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      {/* Top Header skeleton */}
      <div className="h-10 bg-slate-200 rounded-xl w-64" />
      
      {/* Main Hero skeleton */}
      <div className="h-[420px] bg-slate-200 rounded-3xl w-full" />
      
      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-slate-200 rounded-2xl" />
            <div className="h-64 bg-slate-200 rounded-2xl" />
          </div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="h-48 bg-slate-200 rounded-2xl" />
          <div className="h-48 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
