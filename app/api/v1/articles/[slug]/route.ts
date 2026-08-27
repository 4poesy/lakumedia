import { NextRequest } from 'next/server';
import { validateApiKey, createApiErrorResponse, createApiSuccessResponse } from '@/lib/api-key-service';
import { getAggregatedNews } from '@/lib/rss-service';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const auth = validateApiKey(req);
  if (!auth.authenticated) {
    return createApiErrorResponse(auth.error || 'Unauthorized', 401);
  }

  const articles = await getAggregatedNews();
  const article = articles.find(a => a.id === params.slug || a.id.includes(params.slug)) || articles[0];

  return createApiSuccessResponse(article);
}
