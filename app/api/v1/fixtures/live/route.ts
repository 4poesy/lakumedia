import { NextRequest } from 'next/server';
import { validateApiKey, createApiErrorResponse, createApiSuccessResponse } from '@/lib/api-key-service';
import { getRealGlobalMatchesFeed } from '@/lib/sports-api';

export async function GET(req: NextRequest) {
  const auth = validateApiKey(req);
  if (!auth.authenticated) {
    return createApiErrorResponse(auth.error || 'Unauthorized', 401);
  }

  const allFixtures = getRealGlobalMatchesFeed();
  const liveFixtures = allFixtures.filter(f => f.status === 'live');

  return createApiSuccessResponse(liveFixtures, {
    count: liveFixtures.length,
    isLiveFeedActive: true,
  });
}
