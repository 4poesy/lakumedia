import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Film, Shield, Heart, UserCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#2A2E7F] text-slate-200 text-sm mt-20 border-t border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col with Laku Media Logo & CEO Credit */}
          <div className="space-y-4">
            <Link href="/" prefetch={true} className="flex items-center space-x-2">
              <div className="relative w-40 h-12 overflow-hidden rounded-xl bg-white p-1.5 shadow-md">
                <Image
                  src="/brand/laku-media/laku-media-logo-dark.jpeg"
                  alt="Laku Media Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Nigeria&apos;s premier dual-vertical platform combining real-time sports coverage with immersive streaming multimedia entertainment & production services.
            </p>
            <div className="text-[11px] text-[#D9541E] font-extrabold flex items-center gap-1.5 bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/80">
              <UserCheck className="w-4 h-4 text-[#D9541E]" /> Laku Media — Adebayo Samuel Olaku, CEO
            </div>
          </div>

          {/* Sports Vertical Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-1.5 border-l-4 border-emerald-500 pl-2">
              <Trophy className="w-3.5 h-3.5 text-emerald-400" /> Sports Headquarters
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-300">
              <li><Link href="/npfl" prefetch={true} className="hover:text-white hover:underline transition-colors">NPFL League Center</Link></li>
              <li><Link href="/world-football" prefetch={true} className="hover:text-white hover:underline transition-colors">World Football</Link></li>
              <li><Link href="/transfers" prefetch={true} className="hover:text-white hover:underline transition-colors">Transfer News</Link></li>
              <li><Link href="/live-scores" prefetch={true} className="hover:text-white hover:underline transition-colors">Live Match Center</Link></li>
            </ul>
          </div>

          {/* Laku Media Multimedia Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#D9541E] mb-4 flex items-center gap-1.5 border-l-4 border-[#D9541E] pl-2">
              <Film className="w-3.5 h-3.5 text-[#D9541E]" /> Laku Media Production
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-300">
              <li><Link href="/multimedia/about" prefetch={true} className="hover:text-white hover:underline transition-colors">About Laku Media</Link></li>
              <li><Link href="/multimedia/production" prefetch={true} className="hover:text-white hover:underline transition-colors">Production Services & Portfolio</Link></li>
              <li><Link href="/multimedia/live" prefetch={true} className="hover:text-white hover:underline transition-colors">Live Concerts & Streams</Link></li>
              <li><Link href="/multimedia" prefetch={true} className="hover:text-white hover:underline transition-colors">On-Demand Catalog</Link></li>
            </ul>
          </div>

          {/* Legal & Platform Info */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-1.5 border-l-4 border-amber-400 pl-2">
              <Shield className="w-3.5 h-3.5 text-amber-400" /> Platform & Legal
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-300">
              <li><Link href="/privacy" prefetch={true} className="hover:text-white hover:underline transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" prefetch={true} className="hover:text-white hover:underline transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" prefetch={true} className="hover:text-white hover:underline transition-colors">Contact Us</Link></li>
              <li><Link href="/admin" prefetch={true} className="hover:text-white hover:underline transition-colors">Editorial CMS Admin</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Laku Media Platform. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Engineered with <Heart className="w-3.5 h-3.5 text-[#D9541E] fill-[#D9541E]" /> for Nigerian Sports & Entertainment.
          </p>
        </div>
      </div>
    </footer>
  );
}
