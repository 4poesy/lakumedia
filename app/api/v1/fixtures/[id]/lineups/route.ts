import { NextRequest, NextResponse } from 'next/server';
import { fetchMatchLineups } from '@/lib/lineups-service';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const leagueSlug = req.nextUrl.searchParams.get('league') || 'epl';

    const payload = await fetchMatchLineups(id, leagueSlug);

    return NextResponse.json({
      success: true,
      data: payload,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Failed to fetch match lineups',
        data: null,
      },
      { status: 500 }
    );
  }
}
