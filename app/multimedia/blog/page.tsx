import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { STUDIO_BLOG_POSTS, STUDIO_BLOG_CATEGORIES } from '@/lib/studio-blog-data';
import { Film, Calendar, User, Clock, ArrowRight, Tag, Search, Sparkles, BookOpen, UserCheck, Mail, Flame } from 'lucide-react';
import { StudioNewsletterForm } from '@/components/multimedia/studio-newsletter-form';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Laku Media Studio Blog — Broadcast Engineering, Film & Technology Insights',
  description: 'Official production blog of Laku Media Studio Complex. Read expert insights on 4K HDR live satellite broadcasting, OB Van engineering, cinematography, and Nollywood film production.',
  keywords: ['Laku Media Studio Blog', 'Broadcast Engineering Nigeria', '4K OB Van Satellite Uplink', 'Film Production Lagos', 'Cinematography Insights', 'Adebayo Samuel Olaku'],
  openGraph: {
    title: 'Laku Media Studio Blog — Broadcast Engineering, Film & Technology Insights',
    description: 'Expert insights on 4K HDR live satellite broadcasting, OB Van engineering, cinematography, and film production.',
    url: 'https://lakumedia.vercel.app/multimedia/blog',
    siteName: 'Laku Media Studio',
    type: 'website',
  },
};

export default function StudioBlogMainPage() {
  const posts = STUDIO_BLOG_POSTS;
  const leadPost = posts[0];
  const secondaryPosts = posts.slice(1);

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Laku Media Studio Blog',
    description: 'Official production blog of Laku Media Studio Complex covering 4K HDR live satellite broadcasting and film production.',
    url: 'https://lakumedia.vercel.app/multimedia/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Laku Media Studio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lakumedia.vercel.app/brand/laku-media/laku-media-logo-symbol.jpeg',
      },
    },
  };

  return (
    <div className="space-y-10 text-slate-100">
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Banner Section */}
      <div className="bg-[#090A0F] rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D9541E]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded bg-[#D9541E] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <Film className="w-3.5 h-3.5" /> LAKU MEDIA STUDIO INSIGHTS
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-[11px] font-extrabold uppercase tracking-wider border border-slate-700">
              SEO Optimized Production Journal
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Broadcast Engineering & Cinematic Production Blog
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Inside technical breakdowns, satellite uplink engineering, 4K HDR live workflows, and full-frame anamorphic filmmaking from the engineers and creators at Laku Media Studio Complex.
          </p>
        </div>
      </div>

      {/* Main Grid: Blog Posts & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content Area (2 Cols) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Featured Lead Post */}
          {leadPost && (
            <div className="bg-[#0F172A] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl space-y-6 group hover:border-[#D9541E] transition-all">
              <div className="relative w-full h-[280px] sm:h-[400px] overflow-hidden bg-slate-950">
                <Image
                  src={leadPost.coverImage}
                  alt={leadPost.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  style={{ filter: 'contrast(1.06) brightness(1.02)', imageRendering: 'crisp-edges' }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/30" />
                
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-md bg-[#D9541E] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" /> FEATURED STORY
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 pt-0">
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-extrabold uppercase tracking-wider">
                  <span className="text-[#D9541E] font-black">{leadPost.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(leadPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {leadPost.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight group-hover:text-[#D9541E] transition-colors">
                  <Link href={`/multimedia/blog/${leadPost.slug}`}>
                    {leadPost.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed font-medium">
                  {leadPost.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#2A2E7F] flex items-center justify-center text-white font-black text-xs border border-slate-700">
                      AO
                    </div>
                    <span className="text-xs text-slate-200 font-extrabold">{leadPost.author.name}</span>
                  </div>

                  <Link
                    href={`/multimedia/blog/${leadPost.slug}`}
                    className="px-4 py-2 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-colors"
                  >
                    READ ARTICLE <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Posts Grid */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase tracking-tight text-white border-l-4 border-[#D9541E] pl-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#D9541E]" /> Production Journal Archives
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {secondaryPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#0F172A] rounded-2xl overflow-hidden border border-slate-800 shadow-xl space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative w-full h-48 bg-slate-950 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover object-center"
                        style={{ filter: 'contrast(1.06) brightness(1.02)' }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded bg-slate-900/80 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase tracking-wider border border-slate-700">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h4 className="text-base font-extrabold text-white leading-snug hover:text-[#D9541E] transition-colors">
                        <Link href={`/multimedia/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h4>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-medium">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-800/60 mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-semibold">By {post.author.name}</span>
                    <Link
                      href={`/multimedia/blog/${post.slug}`}
                      className="text-xs font-black text-[#D9541E] hover:underline flex items-center gap-1"
                    >
                      Read Full <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar (1 Col) */}
        <div className="space-y-8">
          
          {/* Author Spotlight Box (Adebayo Samuel Olaku, CEO) */}
          <div className="bg-[#0F172A] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-12 h-12 rounded-full bg-[#2A2E7F] border-2 border-[#D9541E] flex items-center justify-center text-white font-black text-sm shrink-0">
                AO
              </div>
              <div>
                <h4 className="text-sm font-black text-white">Adebayo Samuel Olaku</h4>
                <p className="text-[11px] text-[#D9541E] font-bold">CEO & Executive Producer</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Leading the technological transformation of live broadcasting, OB Van engineering, and cinema production across Nigeria and West Africa at Laku Media Studio Complex.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 font-bold flex items-center gap-1 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <UserCheck className="w-4 h-4 text-emerald-400" /> Direct Executive Contact: +234 810 328 5303
            </div>
          </div>

          {/* Studio Categories Widget */}
          <div className="bg-[#0F172A] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#D9541E]" /> Production Categories
            </h3>

            <ul className="space-y-2 text-xs font-extrabold text-slate-300">
              {STUDIO_BLOG_CATEGORIES.map((cat) => (
                <li key={cat.slug} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer border border-transparent hover:border-slate-700">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D9541E]" /> {cat.name}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">
                    {cat.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Box */}
          <StudioNewsletterForm />

        </div>

      </div>
    </div>
  );
}
