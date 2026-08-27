import { NextResponse } from 'next/server';
import { scrapeLiveSportsFeeds } from '@/lib/sports-scraper';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await scrapeLiveSportsFeeds();
  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    ...result,
  });
}

export async function POST() {
  const result = await scrapeLiveSportsFeeds();
  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    ...result,
  });
}
