'use client';

import React, { useEffect, useState } from 'react';
import { ScoreCard } from './score-card';
import { createClient } from '@/lib/supabase/client';
import { FixtureStatus } from '@/lib/types/supabase';

interface RealtimeScoreCardProps {
  initialFixture: {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeScore?: number | null;
    awayScore?: number | null;
    kickoffAt: string;
    status: FixtureStatus;
    leagueName: string;
    homeLogo?: string | null;
    awayLogo?: string | null;
  };
}

export function RealtimeScoreCard({ initialFixture }: RealtimeScoreCardProps) {
  const [fixture, setFixture] = useState(initialFixture);

  useEffect(() => {
    const supabase = createClient();

    // 1. Subscribe to Postgres changes on fixtures table via Supabase Realtime
    const channel = supabase
      .channel(`fixture_realtime_${fixture.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'fixtures',
          filter: `id=eq.${fixture.id}`,
        },
        (payload) => {
          const updated = payload.new as any;
          if (updated) {
            setFixture((prev) => ({
              ...prev,
              homeScore: updated.home_score !== undefined ? updated.home_score : prev.homeScore,
              awayScore: updated.away_score !== undefined ? updated.away_score : prev.awayScore,
              status: updated.status || prev.status,
            }));
          }
        }
      )
      .subscribe();

    // 2. Mobile 30-second fallback polling interval in case WebSockets drop on 3G/4G network
    const fallbackPollTimer = setInterval(async () => {
      try {
        const { data: updated } = await (supabase.from('fixtures' as any) as any)
          .select('home_score, away_score, status')
          .eq('id', fixture.id)
          .single();

        if (updated) {
          setFixture((prev) => ({
            ...prev,
            homeScore: updated.home_score !== undefined ? updated.home_score : prev.homeScore,
            awayScore: updated.away_score !== undefined ? updated.away_score : prev.awayScore,
            status: (updated.status as FixtureStatus) || prev.status,
          }));
        }
      } catch (err) {
        // Silent fallback failure
      }
    }, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(fallbackPollTimer);
    };
  }, [fixture.id]);

  return (
    <ScoreCard
      homeTeam={fixture.homeTeam}
      awayTeam={fixture.awayTeam}
      homeScore={fixture.homeScore}
      awayScore={fixture.awayScore}
      kickoffAt={fixture.kickoffAt}
      status={fixture.status}
      leagueName={fixture.leagueName}
      homeLogo={fixture.homeLogo}
      awayLogo={fixture.awayLogo}
    />
  );
}
