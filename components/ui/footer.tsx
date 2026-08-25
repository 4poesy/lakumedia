import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Film, Shield, Heart, UserCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col with Laku Media Logo & CEO Credit */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-36 h-12 overflow-hidden rounded-lg bg-slate-900 border border-slate-800 p-1">
                <Image
                  src="/brand/laku-media/laku-media-logo-dark.jpeg"
                  alt="Laku Media Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nigeria&apos;s premier dual-vertical platform combining real-time sports coverage with immersive streaming multimedia entertainment & production services.
            </p>
            <div className="text-[11px] text-[#D9541E] font-semibold flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" /> Laku Media — Adebayo Samuel Olaku, CEO
            </div>
          </div>

          {/* Sports Vertical Links (Root Level) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" /> Sports Headquarters
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/npfl" className="hover:text-white transition-colors">NPFL League Center</Link></li>
              <li><Link href="/epl" className="hover:text-white transition-colors">Premier League</Link></li>
              <li><Link href="/transfers" className="hover:text-white transition-colors">Transfer News</Link></li>
              <li><Link href="/live-scores" className="hover:text-white transition-colors">Live Match Center</Link></li>
            </ul>
          </div>

          {/* Laku Media Multimedia Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D9541E] mb-3 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5" /> Laku Media Production
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/multimedia/about" className="hover:text-white transition-colors">About Laku Media</Link></li>
              <li><Link href="/multimedia/production" className="hover:text-white transition-colors">Production Services & Portfolio</Link></li>
              <li><Link href="/multimedia/live" className="hover:text-white transition-colors">Live Concerts & Streams</Link></li>
              <li><Link href="/multimedia" className="hover:text-white transition-colors">On-Demand Catalog</Link></li>
            </ul>
          </div>

          {/* Platform Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-400" /> Platform & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/admin" className="hover:text-white transition-colors">Editorial CMS Admin</Link></li>
              <li><span className="text-slate-400">Powered by Next.js 14 & Supabase</span></li>
              <li><span className="text-slate-400">Stream powered by Cloudflare / Mux</span></li>
              <li><span className="text-slate-400">Laku Media Production Suite</span></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Laku Media Platform. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Nigerian Sports & Entertainment.
          </p>
        </div>
      </div>
    </footer>
  );
}
