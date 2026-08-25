'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMultimedia = pathname.startsWith('/multimedia');

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isMultimedia ? 'bg-[#090A0F] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      {children}
    </div>
  );
}
