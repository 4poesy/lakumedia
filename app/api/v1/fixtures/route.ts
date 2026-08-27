import { NextRequest } from 'next/server';
import { validateApiKey, createApiErrorResponse, createApiSuccessResponse } from '@/lib/api-key-service';
import { getRealGlobalMatchesFeed } from '@/lib/sports-api';

export async function GET(req: NextRequest) {
  const auth = validateApiKey(req);
  if (!auth.authenticated) {
    return createApiErrorResponse(auth.error || 'Unauthorized', 401);
  }

  const league = req.nextUrl.searchParams.get('league')?.toLowerCase();
  const status = req.nextUrl.searchParams.get('status')?.toLowerCase();

  let fixtures = getRealGlobalMatchesFeed();

  if (league) {
    fixtures = fixtures.filter(f => f.leagueSlug?.toLowerCase() === league || f.leagueName.toLowerCase().includes(league));
  }

  if (status) {
    fixtures = fixtures.filter(f => f.status.toLowerCase() === status);
  }

  return createApiSuccessResponse(fixtures, {
    count: fixtures.length,
    filters: { league: league || 'all', status: status || 'all' },
  });
}
