import { NextRequest } from 'next/server';
import { validateApiKey, createApiErrorResponse, createApiSuccessResponse } from '@/lib/api-key-service';
import { getAggregatedNews } from '@/lib/rss-service';

export async function GET(req: NextRequest) {
  const auth = validateApiKey(req);
  if (!auth.authenticated) {
    return createApiErrorResponse(auth.error || 'Unauthorized', 401);
  }

  const articles = await getAggregatedNews();

  return createApiSuccessResponse(articles, {
    count: articles.length,
    source: 'Laku Media Realtime Ingestion & RSS Pipeline',
  });
}
