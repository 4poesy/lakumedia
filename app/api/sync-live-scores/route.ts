import { NextResponse } from 'next/server';
import { syncLiveFixturesToDatabase } from '@/lib/fixtures-sync';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await syncLiveFixturesToDatabase();
  return NextResponse.json({
    status: result.success ? 'success' : 'error',
    ...result,
  });
}

export async function POST() {
  const result = await syncLiveFixturesToDatabase();
  return NextResponse.json({
    status: result.success ? 'success' : 'error',
    ...result,
  });
}
