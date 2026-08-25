'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, TrendingUp, Youtube, Instagram } from 'lucide-react';

export function TrendingStoriesWidget() {
  const trendingArticles = [
    {
      rank: '01',
      title: 'Konsa Will Bench Saliba At Arsenal — Chelsea Legend Claims',
      slug: 'konsa-will-bench-saliba-at-arsenal',
      category: 'World Football',
    },
    {
      rank: '02',
      title: 'Enyimba Secure Thrilling Victory Against Kano Pillars in NPFL Derby',
      slug: 'enyimba-thrilling-victory-npfl-derby',
      category: 'NPFL League',
    },
    {
      rank: '03',
      title: 'Super Eagles Star Signs Multi-Year Extension Deal',
      slug: 'super-eagles-star-signs-multi-year-extension',
      category: 'Transfer News',
    },
    {
      rank: '04',
      title: 'Heskey: Why Kane Will Return To Premier League',
      slug: 'heskey-why-kane-will-return-premier-league',
      category: 'Transfers',
    },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#2A2E7F] flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-[#D9541E]" /> TRENDING STORIES
        </h3>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D9541E] bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
          TOP READ
        </span>
      </div>

      <div className="space-y-3.5 divide-y divide-slate-100">
        {trendingArticles.map((art) => (
          <div key={art.rank} className="pt-3 first:pt-0 flex items-start space-x-3.5 group">
            <span className="text-2xl font-black text-[#D9541E] font-mono shrink-0 group-hover:scale-110 transition-transform">
              {art.rank}
            </span>
            <div className="space-y-1 flex-1">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#2A2E7F] block">
                {art.category}
              </span>
              <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-[#D9541E] transition-colors leading-snug line-clamp-2">
                <Link href={`/article/${art.slug}`} prefetch={true}>
                  {art.title}
                </Link>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NewsletterWidget() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <div className="space-y-1">
        <h3 className="text-sm font-extrabold text-[#2A2E7F] flex items-center gap-1.5">
          <Mail className="w-4 h-4 text-[#D9541E]" /> Sign up to Laku Media Sports Update!
        </h3>
        <p className="text-xs text-slate-600 font-medium">
          Top sports stories, live match alerts & transfer news delivered straight to your inbox.
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-2 pt-1">
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#D9541E] font-medium"
        />
        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-extrabold text-xs shadow-sm transition-colors"
        >
          Sign Up
        </button>
      </form>
      <p className="text-[10px] text-slate-400 text-center">You may opt out at any time.</p>
    </div>
  );
}

export function SocialCountersWidget() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#2A2E7F]">
        Follow Official Laku Media
      </h3>
      <div className="grid grid-cols-2 gap-2 text-xs font-extrabold">
        <a
          href="https://www.instagram.com/laku_media"
          target="_blank"
          rel="noreferrer"
          className="p-2.5 rounded-xl bg-[#C13584] text-white flex items-center justify-between shadow-sm hover:opacity-90 transition-opacity"
        >
          <span className="flex items-center gap-1"><Instagram className="w-3.5 h-3.5" /> Instagram</span>
          <span className="text-[10px] bg-pink-700 px-1.5 py-0.5 rounded font-mono">Follow</span>
        </a>
        <a
          href="https://www.youtube.com/channel/UCJLbr72xlR__9dlypiV4x4g/featured"
          target="_blank"
          rel="noreferrer"
          className="p-2.5 rounded-xl bg-rose-600 text-white flex items-center justify-between shadow-sm hover:opacity-90 transition-opacity"
        >
          <span className="flex items-center gap-1"><Youtube className="w-3.5 h-3.5" /> YouTube</span>
          <span className="text-[10px] bg-rose-700 px-1.5 py-0.5 rounded font-mono">Subscribe</span>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="p-2.5 rounded-xl bg-blue-600 text-white flex items-center justify-between shadow-sm hover:opacity-90 transition-opacity"
        >
          <span>Facebook</span>
          <span className="text-[10px] bg-blue-700 px-1.5 py-0.5 rounded font-mono">471K</span>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="p-2.5 rounded-xl bg-sky-500 text-white flex items-center justify-between shadow-sm hover:opacity-90 transition-opacity"
        >
          <span>Twitter / X</span>
          <span className="text-[10px] bg-sky-600 px-1.5 py-0.5 rounded font-mono">3.9K</span>
        </a>
      </div>
    </div>
  );
}

export function LatestCommentsWidget() {
  const sampleComments = [
    {
      id: 'c1',
      author: 'cuteprince',
      articleTitle: 'EXCLUSIVE: Nigerian Football Could Be Destroyed By FIFA Ban — Bonfrere Warns',
      articleSlug: 'exclusive-nigerian-football-fifa-ban',
      snippet: 'fifa ban has not destroyed russian football nor her developing talents.... we have been absent from all fifa male tournaments...',
    },
    {
      id: 'c2',
      author: 'Wike',
      articleTitle: 'Turkey: Osimhen Bags Brace, Assist In Galatasaray Win Over Erzurum FK',
      articleSlug: 'turkey-osimhen-bags-brace',
      snippet: '@monkey if everybody thinks like you, probably by now God would have destroyed the world in annoyance.',
    },
    {
      id: 'c3',
      author: 'Papafem',
      articleTitle: 'NPFL: Enyimba Masterclass Defeats Kano Pillars In Aba',
      articleSlug: 'enyimba-thrilling-victory-npfl-derby',
      snippet: 'Great match in Aba! Enyimba showed real determination today.',
    },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="pb-3 border-b border-slate-100">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#2A2E7F] flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4 text-[#D9541E]" /> Latest Comments
        </h3>
      </div>

      <div className="space-y-4 divide-y divide-slate-100">
        {sampleComments.map((c) => (
          <div key={c.id} className="pt-3 first:pt-0 space-y-1.5">
            <p className="text-xs font-extrabold text-slate-900">{c.author}</p>
            <p className="text-[11px] font-bold text-[#D9541E] leading-snug">
              on{' '}
              <Link href={`/article/${c.articleSlug}`} prefetch={true} className="hover:underline">
                {c.articleTitle}
              </Link>
            </p>
            <p className="text-xs text-slate-600 leading-relaxed font-normal italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              &ldquo;{c.snippet}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
