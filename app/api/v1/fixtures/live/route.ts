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

  const [npfl, espn] = await Promise.all([
    fetchAutomatedNpflScores(),
    fetchLiveScoreboardForDateOffset('today'),
  ]);

  const allFixtures = [...npfl, ...espn];
  const liveFixtures = allFixtures.filter((f) => f.status === 'live');

  return createApiSuccessResponse(liveFixtures, {
    count: liveFixtures.length,
    isLiveFeedActive: true,
  });
}
