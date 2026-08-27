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
  const leagueFixtures = allFixtures.filter(f => f.leagueSlug?.toLowerCase() === slug || f.leagueName.toLowerCase().includes(slug));

  const leagueInfo = {
    slug,
    name: slug === 'npfl' ? 'Nigeria Premier Football League (NPFL)' : 'English Premier League (EPL)',
    country: slug === 'npfl' ? 'Nigeria 🇳🇬' : 'England 🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    season: '2026/2027',
    totalTeams: 20,
    fixtures: leagueFixtures,
  };

  return createApiSuccessResponse(leagueInfo);
}
