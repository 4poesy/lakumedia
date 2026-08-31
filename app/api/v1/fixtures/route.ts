import { NextRequest } from 'next/server';
import { validateApiKey, createApiErrorResponse, createApiSuccessResponse } from '@/lib/api-key-service';
import { fetchLiveScoreboardForDateOffset } from '@/lib/live-scoreboard-service';
import { fetchAutomatedNpflScores } from '@/lib/npfl-score-fetcher';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = validateApiKey(req);
  if (!auth.authenticated) {
    return createApiErrorResponse(auth.error || 'Unauthorized', 401);
  }

  const league = req.nextUrl.searchParams.get('league')?.toLowerCase();
  const status = req.nextUrl.searchParams.get('status')?.toLowerCase();

  const [npfl, espn] = await Promise.all([
    fetchAutomatedNpflScores(),
    fetchLiveScoreboardForDateOffset('today'),
  ]);

  let fixtures = [...npfl, ...espn];

  if (league) {
    fixtures = fixtures.filter(
      (f) => f.leagueSlug?.toLowerCase() === league || f.leagueName.toLowerCase().includes(league)
    );
  }

  if (status) {
    fixtures = fixtures.filter((f) => f.status.toLowerCase() === status);
  }

  return createApiSuccessResponse(fixtures, {
    count: fixtures.length,
    filters: { league: league || 'all', status: status || 'all' },
  });
}
