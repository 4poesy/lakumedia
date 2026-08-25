import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { ArticleCard } from '@/components/sports/article-card';
import { ArticleComments } from '@/components/sports/article-comments';
import { StructuredData } from '@/components/seo/structured-data';
import { ArrowLeft, Calendar, User, Share2, Flame } from 'lucide-react';

export const revalidate = 60;

interface ArticleSlugPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticleSlugPageProps): Promise<Metadata> {
  const supabase = await createClient();
  const { data: rawData } = await (supabase.from('articles' as any) as any)
    .select('title, excerpt, cover_image_url')
    .eq('slug', params.slug)
    .single();
  const data = rawData as any;

  const title = data?.title || 'Sports Headline | Laku Media';
  const description = data?.excerpt || 'Read the latest sports news and match coverage on Laku Media.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: data?.cover_image_url ? [data.cover_image_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ArticleSlugPage({ params }: ArticleSlugPageProps) {
  const { slug } = params;
  const supabase = await createClient();

  // Query article details
  const { data: articleData } = await supabase
    .from('articles')
    .select('*, sports_categories(name), profiles(display_name, avatar_url)')
    .eq('slug', slug)
    .single();

  const article = (articleData as any) || {
    id: '40000000-0000-0000-0000-000000000001',
    title: 'Enyimba Secure Thrilling Victory Against Kano Pillars in NPFL Derby',
    slug: slug,
    body: `Enyimba FC delivered a masterclass performance in Aba to secure a 2-1 victory over rivals Kano Pillars in a gripping NPFL derby clash on Sunday afternoon.

The atmosphere at the Enyimba International Stadium was electric from kick-off, with both sides showcasing high-octane attacking football. The Peoples' Elephant opened the scoring in the 24th minute through a stunning long-range strike into the top corner.

Kano Pillars responded before the stroke of halftime with a clinical equalizer, setting up a pulsating second 45 minutes. Ultimately, Enyimba claimed all three points following a late 82nd-minute header off a pinpoint corner kick.

Speaking after the final whistle, the head coach praised his squad's resilience and tactical discipline: 'This win is for our incredible fans who supported us through every minute. We stay focused on the league title.'`,
    excerpt: 'Enyimba FC delivered a masterclass performance in Aba to secure a 2-1 victory over rivals Kano Pillars in a gripping NPFL clash on Sunday afternoon.',
    cover_image_url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop',
    category_id: '22222222-2222-2222-2222-222222222222',
    sports_categories: { name: 'NPFL' },
    profiles: { display_name: 'Lakumedia Editorial Team', avatar_url: null },
    published_at: new Date().toISOString(),
  };

  // Query related articles
  const { data: relatedData } = await supabase
    .from('articles')
    .select('*, sports_categories(name)')
    .eq('status', 'published')
    .neq('slug', slug)
    .limit(3);

  const relatedArticles = relatedData && relatedData.length > 0 ? (relatedData as any[]) : [
    {
      id: '40000000-0000-0000-0000-000000000002',
      title: 'Premier League Title Race Heats Up Ahead of London Derby',
      slug: 'premier-league-title-race-heats-up',
      excerpt: 'The Premier League title race hits high gear this weekend as London rivals prepare for a high-stakes showdown.',
      cover_image_url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&auto=format&fit=crop',
      sports_categories: { name: 'EPL' },
      published_at: new Date().toISOString(),
    },
  ];

  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently Published';

  // Schema.org NewsArticle JSON-LD
  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: [article.cover_image_url],
    datePublished: article.published_at,
    author: {
      '@type': 'Person',
      name: article.profiles?.display_name || 'Lakumedia Editorial Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Laku Media',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lakumedia.com/brand/laku-media/laku-media-logo-light.jpeg',
      },
    },
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8 theme-sports">
      <StructuredData data={newsArticleSchema} />

      {/* Back Link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-emerald-400 gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Sports Coverage
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            {article.sports_categories?.name || 'Sports News'}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {formattedDate}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
          {article.title}
        </h1>

        {/* Author Bar */}
        <div className="flex items-center justify-between py-4 border-y border-slate-800 text-xs text-slate-400">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200">
              <User className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="font-bold text-slate-200">{article.profiles?.display_name || 'Lakumedia Desk'}</p>
              <p className="text-[11px] text-slate-500">Senior Football Reporter</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 font-semibold transition-colors">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-80 sm:h-[450px] w-full rounded-2xl overflow-hidden border border-slate-800 glass-panel">
        <Image
          src={
            article.cover_image_url ||
            'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop'
          }
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article Body */}
      <div className="prose prose-invert max-w-none text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-4">
        {article.body}
      </div>

      {/* Related Articles Section */}
      <section className="pt-8 border-t border-slate-800 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-emerald-400" /> Related Headlines
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {relatedArticles.map((rel: any) => (
            <ArticleCard
              key={rel.id}
              title={rel.title}
              slug={rel.slug}
              excerpt={rel.excerpt}
              coverImageUrl={rel.cover_image_url}
              categoryName={rel.sports_categories?.name || 'Sports'}
              publishedAt={rel.published_at}
            />
          ))}
        </div>
      </section>

      {/* Interactive Comments Component */}
      <ArticleComments articleId={article.id} />
    </article>
  );
}
