import { NextRequest, NextResponse } from 'next/server';
import { getDiasporaPlayers, DiasporaRegion } from '@/lib/diaspora-service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const regionParam = req.nextUrl.searchParams.get('region') as DiasporaRegion | null;
    const players = await getDiasporaPlayers(regionParam || undefined);

    return NextResponse.json({
      success: true,
      count: players.length,
      region: regionParam || 'all',
      players,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to fetch diaspora players' },
      { status: 500 }
    );
  }
}
