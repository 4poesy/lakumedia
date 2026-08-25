'use me';
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Newspaper,
  Activity,
  Film,
  Camera,
  MessageSquare,
  Users,
  ArrowLeft,
  Shield,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/admin/articles', label: 'Articles CMS', icon: Newspaper },
    { href: '/admin/live-scores', label: 'Match Scores Console', icon: Activity },
    { href: '/admin/media', label: 'Media Catalog', icon: Film },
    { href: '/admin/services', label: 'Services Portfolio', icon: Camera },
    { href: '/admin/comments', label: 'Comment Moderation', icon: MessageSquare },
    { href: '/admin/users', label: 'User Roles', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col md:flex-row theme-sports">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-4 space-y-6 shrink-0">
        <div className="flex items-center justify-between md:flex-col md:items-start space-y-2">
          <Link href="/admin" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-900 tracking-tight block">
                LAKUMEDIA <span className="text-emerald-700">CMS</span>
              </span>
              <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
                Editorial Suite
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="text-xs text-slate-600 hover:text-emerald-700 font-bold flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Main Site
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Admin Body Content */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
