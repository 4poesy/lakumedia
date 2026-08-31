import { NextRequest, NextResponse } from 'next/server';
import { getDiasporaPlayerDossier } from '@/lib/diaspora-service';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const dossier = await getDiasporaPlayerDossier(slug);

    if (!dossier) {
      return NextResponse.json(
        { success: false, error: `Diaspora player profile '${slug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      dossier,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to fetch player dossier' },
      { status: 500 }
    );
  }
}
