import { NextResponse } from 'next/server';
import { fetchLiveSportsFromApi } from '@/lib/sports-api';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await fetchLiveSportsFromApi();
  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    ...result,
  });
}

export async function POST() {
  const result = await fetchLiveSportsFromApi();
  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    ...result,
  });
}
