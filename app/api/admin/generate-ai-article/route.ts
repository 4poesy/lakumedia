import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateSportsArticleFromData, StructuredMatchFacts } from '@/lib/sports/ai-article-generator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { facts, articleType = 'match_report', categoryId } = body as {
      facts: StructuredMatchFacts;
      articleType?: 'match_report' | 'preview' | 'roundup';
      categoryId?: string;
    };

    if (!facts || !facts.homeTeam || !facts.awayTeam) {
      return NextResponse.json(
        { error: 'Missing required match facts (homeTeam, awayTeam).' },
        { status: 400 }
      );
    }

    // 1. Generate article draft in SNAP house style
    const draft = generateSportsArticleFromData(facts, articleType);

    // 2. Insert into Supabase articles as DRAFT
    const supabase = await createClient();

    const insertData: any = {
      title: draft.title,
      slug: draft.slug,
      body: draft.body,
      excerpt: draft.excerpt,
      cover_image_url: draft.cover_image_url,
      status: 'draft', // MANDATORY HARD RULE: Always draft!
      is_ai_generated: true,
      ai_reviewed: false, // MANDATORY HARD RULE: Requires human review!
      ai_source_data: draft.ai_source_data,
      author_name: draft.author_name,
      category_id: categoryId || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: inserted, error } = await supabase
      .from('articles')
      .insert(insertData)
      .select('*')
      .single();

    if (error) {
      console.error('Supabase error inserting AI draft:', error);
      // Fallback for environments without database table migration
      return NextResponse.json({
        success: true,
        isFallback: true,
        article: {
          id: `ai-draft-${Date.now()}`,
          ...insertData,
        },
      });
    }

    return NextResponse.json({
      success: true,
      article: inserted,
    });
  } catch (err: any) {
    console.error('API Error generating AI sports article:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to generate AI sports article.' },
      { status: 500 }
    );
  }
}
