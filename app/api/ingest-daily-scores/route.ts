import { NextResponse } from 'next/server';
import { fetchLiveScoreboardForDateOffset } from '@/lib/live-scoreboard-service';
import { fetchAutomatedNpflScores } from '@/lib/npfl-score-fetcher';

export const dynamic = 'force-dynamic';

/**
 * Automated Daily Multi-Source Score Ingestion Cron Endpoint
 * Automatically updates yesterday, today, and tomorrow match scores dynamically.
 */
export async function GET() {
  try {
    const [yesterday, today, tomorrow, npfl] = await Promise.all([
      fetchLiveScoreboardForDateOffset('yesterday'),
      fetchLiveScoreboardForDateOffset('today'),
      fetchLiveScoreboardForDateOffset('tomorrow'),
      fetchAutomatedNpflScores(),
    ]);

    const totalMatches = yesterday.length + today.length + tomorrow.length + npfl.length;

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        yesterdayMatchesCount: yesterday.length,
        todayMatchesCount: today.length,
        tomorrowMatchesCount: tomorrow.length,
        npflMatchesCount: npfl.length,
        totalIngestedMatches: totalMatches,
      },
      sources: ['ESPN Live API', 'SofaScore Engine', 'beIN SPORTS Feed', 'Al Jazeera Sports', 'NPFL Automated Fetcher'],
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Daily score ingestion failed' },
      { status: 500 }
    );
  }
}
