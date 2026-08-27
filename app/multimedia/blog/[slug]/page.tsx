import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { STUDIO_BLOG_POSTS, STUDIO_BLOG_CATEGORIES } from '@/lib/studio-blog-data';
import { StudioCommentSection } from '@/components/multimedia/studio-comment-section';
import { Film, Calendar, User, Clock, ArrowLeft, Tag, Share2, Sparkles, BookOpen, UserCheck, MessageSquare, Twitter, Facebook, Linkedin, Link2 } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface SingleBlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: SingleBlogPageProps): Promise<Metadata> {
  const post = STUDIO_BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | Laku Media Studio',
      description: 'The requested studio blog article could not be found.',
    };
  }

  return {
    title: `${post.seoTitle} | Laku Media Studio`,
    description: post.metaDescription,
    keywords: post.tags.concat(['Laku Media Studio', 'Adebayo Samuel Olaku', 'Nigeria Media']),
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url: `https://lakumedia.vercel.app/multimedia/blog/${post.slug}`,
      siteName: 'Laku Media Studio',
      images: [
        {
          url: `https://lakumedia.vercel.app${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.metaDescription,
      images: [`https://lakumedia.vercel.app${post.coverImage}`],
    },
  };
}

export default async function SingleStudioBlogPage({ params }: SingleBlogPageProps) {
  const { slug } = params;
  const post = STUDIO_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = STUDIO_BLOG_POSTS.filter((p) => p.slug !== slug);

  // Yoast SEO Compliant Schema.org JSON-LD
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: `https://lakumedia.vercel.app${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lakumedia.vercel.app/multimedia/blog/${post.slug}`,
    },
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      worksFor: {
        '@type': 'Organization',
        name: 'Laku Media Studio',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Laku Media Studio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lakumedia.vercel.app/brand/laku-media/laku-media-logo-symbol.jpeg',
      },
    },
    keywords: post.tags.join(', '),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://lakumedia.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Multimedia Studio',
        item: 'https://lakumedia.vercel.app/multimedia',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Blog',
        item: 'https://lakumedia.vercel.app/multimedia/blog',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: post.title,
        item: `https://lakumedia.vercel.app/multimedia/blog/${post.slug}`,
      },
    ],
  };

  return (
    <article className="space-y-10 text-slate-100 max-w-7xl mx-auto">
      {/* Schema.org Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Top Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-slate-400">
        <Link href="/multimedia" className="hover:text-white transition-colors">
          Studio Home
        </Link>
        <span>/</span>
        <Link href="/multimedia/blog" className="hover:text-white transition-colors">
          Blog
        </Link>
        <span>/</span>
        <span className="text-[#D9541E] truncate max-w-xs">{post.category}</span>
      </nav>

      {/* Article Header Section */}
      <header className="space-y-6 bg-[#090A0F] p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded bg-[#D9541E] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
            <Tag className="w-3.5 h-3.5" /> {post.category}
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-extrabold flex items-center gap-1 border border-slate-700">
            <Clock className="w-3.5 h-3.5 text-amber-400" /> {post.readTime}
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-extrabold flex items-center gap-1 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> YOAST SEO OPTIMIZED (1,200+ WORDS)
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
          {post.title}
        </h1>

        {/* Author Details Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-[#2A2E7F] border-2 border-[#D9541E] flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md">
              AO
            </div>
            <div>
              <h3 className="text-sm font-black text-white">{post.author.name}</h3>
              <p className="text-xs text-slate-400 font-medium">{post.author.role}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <Calendar className="w-4 h-4 text-emerald-400" />
              Published: {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="relative w-full h-[300px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover object-center"
          style={{ filter: 'contrast(1.06) brightness(1.02)', imageRendering: 'crisp-edges' }}
          priority
        />
      </div>

      {/* Article Body & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Article Content (2 Cols) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Yoast SEO Article Content Container */}
          <div
            className="prose prose-invert max-w-none prose-headings:font-black prose-headings:text-white prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base prose-li:text-slate-300 prose-strong:text-white prose-blockquote:border-l-[#D9541E] bg-[#0F172A] p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tag Cloud */}
          <div className="bg-[#0F172A] p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-[#D9541E]" /> Article Keywords & Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 hover:border-[#D9541E] transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Comment Section Component */}
          <StudioCommentSection postId={post.id} postTitle={post.title} />

        </div>

        {/* Sidebar (1 Col) */}
        <div className="space-y-8">
          
          {/* Executive Author Profile Card */}
          <div className="bg-[#0F172A] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-12 h-12 rounded-full bg-[#2A2E7F] border-2 border-[#D9541E] flex items-center justify-center text-white font-black text-sm shrink-0">
                AO
              </div>
              <div>
                <h4 className="text-sm font-black text-white">{post.author.name}</h4>
                <p className="text-[11px] text-[#D9541E] font-bold">Executive Author & CEO</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              {post.author.bio}
            </p>
            <div className="pt-2 text-[11px] text-slate-400 font-bold flex items-center gap-1 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <UserCheck className="w-4 h-4 text-emerald-400" /> Executive Office: Laku Media Complex
            </div>
          </div>

          {/* Categories Sidebar */}
          <div className="bg-[#0F172A] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#D9541E]" /> Studio Categories
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

          {/* Related Articles */}
          <div className="bg-[#0F172A] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D9541E]" /> Related Studio Stories
            </h3>

            <div className="space-y-3">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/multimedia/blog/${rPost.slug}`}
                  className="block bg-slate-900 p-3 rounded-2xl border border-slate-800 hover:border-[#D9541E] transition-all space-y-1 group"
                >
                  <span className="text-[10px] font-extrabold text-[#D9541E] uppercase tracking-wider">{rPost.category}</span>
                  <h5 className="text-xs font-extrabold text-white group-hover:text-[#D9541E] line-clamp-2 transition-colors">
                    {rPost.title}
                  </h5>
                  <span className="text-[10px] text-slate-400 font-medium block pt-1">{rPost.readTime}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>
    </article>
  );
}
