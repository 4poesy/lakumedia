import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Film, Shield, Heart, UserCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-sm mt-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col with Laku Media Logo & CEO Credit */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-36 h-12 overflow-hidden rounded-lg bg-slate-50 border border-slate-200 p-1">
                <Image
                  src="/brand/laku-media/laku-media-logo-dark.jpeg"
                  alt="Laku Media Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nigeria&apos;s premier dual-vertical platform combining real-time sports coverage with immersive streaming multimedia entertainment & production services.
            </p>
            <div className="text-[11px] text-[#D9541E] font-bold flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" /> Laku Media — Adebayo Samuel Olaku, CEO
            </div>
          </div>

          {/* Sports Vertical Links (Root Level) */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-emerald-600" /> Sports Headquarters
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><Link href="/npfl" className="hover:text-slate-900 transition-colors">NPFL League Center</Link></li>
              <li><Link href="/epl" className="hover:text-slate-900 transition-colors">Premier League</Link></li>
              <li><Link href="/transfers" className="hover:text-slate-900 transition-colors">Transfer News</Link></li>
              <li><Link href="/live-scores" className="hover:text-slate-900 transition-colors">Live Match Center</Link></li>
            </ul>
          </div>

          {/* Laku Media Multimedia Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#D9541E] mb-3 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5" /> Laku Media Production
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><Link href="/multimedia/about" className="hover:text-slate-900 transition-colors">About Laku Media</Link></li>
              <li><Link href="/multimedia/production" className="hover:text-slate-900 transition-colors">Production Services & Portfolio</Link></li>
              <li><Link href="/multimedia/live" className="hover:text-slate-900 transition-colors">Live Concerts & Streams</Link></li>
              <li><Link href="/multimedia" className="hover:text-slate-900 transition-colors">On-Demand Catalog</Link></li>
            </ul>
          </div>

          {/* Legal & Platform Info */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2A2E7F] mb-3 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-600" /> Platform & Legal
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-slate-900 transition-colors">Contact Us</Link></li>
              <li><Link href="/admin" className="hover:text-slate-900 transition-colors">Editorial CMS Admin</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Laku Media Platform. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0 font-medium">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Nigerian Sports & Entertainment.
          </p>
        </div>
      </div>
    </footer>
  );
}
