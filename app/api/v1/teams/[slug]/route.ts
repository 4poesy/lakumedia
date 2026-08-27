import { NextRequest } from 'next/server';
import { validateApiKey, createApiErrorResponse, createApiSuccessResponse } from '@/lib/api-key-service';
import { getRealGlobalMatchesFeed } from '@/lib/sports-api';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const auth = validateApiKey(req);
  if (!auth.authenticated) {
    return createApiErrorResponse(auth.error || 'Unauthorized', 401);
  }

  const slug = params.slug.toLowerCase();
  const allFixtures = getRealGlobalMatchesFeed();

  const teamMatches = allFixtures.filter(f =>
    f.homeTeam.toLowerCase().includes(slug) || f.awayTeam.toLowerCase().includes(slug)
  );

  const teamInfo = {
    slug,
    name: slug.replace(/-/g, ' ').toUpperCase(),
    recentMatches: teamMatches,
  };

  return createApiSuccessResponse(teamInfo);
}
