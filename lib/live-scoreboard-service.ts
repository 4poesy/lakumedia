import { ApiMatchFixture } from '@/lib/sports-api';

const LEAGUES_TO_FETCH: Array<{ code: string; name: string; slug: string; flag: string }> = [
  { code: 'eng.1', name: 'English Premier League (EPL)', slug: 'epl', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { code: 'eng.2', name: 'EFL Championship', slug: 'epl', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { code: 'esp.1', name: 'La Liga EA Sports', slug: 'laliga', flag: '🇪🇸' },
  { code: 'esp.2', name: 'La Liga Hypermotion (2)', slug: 'laliga', flag: '🇪🇸' },
  { code: 'ita.1', name: 'Serie A Enilive', slug: 'seriea', flag: '🇮🇹' },
  { code: 'ita.2', name: 'Serie B', slug: 'seriea', flag: '🇮🇹' },
  { code: 'ger.1', name: 'Bundesliga', slug: 'bundesliga', flag: '🇩🇪' },
  { code: 'ger.2', name: '2. Bundesliga', slug: 'bundesliga', flag: '🇩🇪' },
  { code: 'fra.1', name: 'Ligue 1 McDonald\'s', slug: 'ligue1', flag: '🇫🇷' },
  { code: 'fra.2', name: 'Ligue 2', slug: 'ligue1', flag: '🇫🇷' },
  { code: 'sau.1', name: 'Saudi Pro League (Roshn)', slug: 'saudi', flag: '🇸🇦' },
  { code: 'uefa.champions', name: 'UEFA Champions League', slug: 'ucl', flag: '🇪🇺' },
  { code: 'uefa.europa', name: 'UEFA Europa League', slug: 'uel', flag: '🇪🇺' },
  { code: 'caf.nations', name: 'Africa Cup of Nations (AFCON)', slug: 'afcon', flag: '🌍' },
  { code: 'caf.champions', name: 'CAF Champions League', slug: 'caf-cl', flag: '🌍' },
  { code: 'ned.1', name: 'Eredivisie (Netherlands)', slug: 'eredivisie', flag: '🇳🇱' },
  { code: 'por.1', name: 'Liga Portugal Betclic', slug: 'liga-portugal', flag: '🇵🇹' },
  { code: 'usa.1', name: 'Major League Soccer (MLS)', slug: 'mls', flag: '🇺🇸' },
  { code: 'tur.1', name: 'Trendyol Süper Lig (Turkey)', slug: 'superlig', flag: '🇹🇷' },
  { code: 'sco.1', name: 'Scottish Premiership', slug: 'scottish', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { code: 'bra.1', name: 'Brasileirão Betano', slug: 'brasileirao', flag: '🇧🇷' },
  { code: 'arg.1', name: 'Liga Profesional (Argentina)', slug: 'liga-argentina', flag: '🇦🇷' },
  { code: 'mex.1', name: 'Liga BBVA MX (Mexico)', slug: 'liga-mx', flag: '🇲🇽' },
];

function formatDateForEspn(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

/**
 * Real-Time Multi-Provider Scoreboard Engine for Yesterday, Today, and Tomorrow
 * Fetches 100% real matches across 23 global leagues.
 */
export async function fetchLiveScoreboardForDateOffset(offset: 'yesterday' | 'today' | 'tomorrow'): Promise<ApiMatchFixture[]> {
  const now = new Date();
  let dateParam = '';
  let targetDate = new Date();

  if (offset === 'yesterday') {
    const yest1 = new Date(now.getTime() - 86400000 * 3); // 3 days window
    const yestEnd = new Date(now.getTime() - 86400000);
    dateParam = `${formatDateForEspn(yest1)}-${formatDateForEspn(yestEnd)}`;
    targetDate = yestEnd;
  } else if (offset === 'tomorrow') {
    targetDate = new Date(now.getTime() + 86400000);
    dateParam = formatDateForEspn(targetDate);
  } else {
    dateParam = formatDateForEspn(now);
  }

  const allMatches: ApiMatchFixture[] = [];

  // Query ESPN live scoreboards concurrently across 23 global leagues
  const promises = LEAGUES_TO_FETCH.map(async (lg) => {
    try {
      const url = `https://site.web.api.espn.com/apis/site/v2/sports/soccer/${lg.code}/scoreboard?dates=${dateParam}`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        },
        next: { revalidate: 120 }, // 2-minute revalidation
      });

      if (!res.ok) return [];

      const data = await res.json();
      const events = data.events || [];

      return events.map((ev: any, idx: number) => {
        const competition = ev.competitions?.[0] || {};
        const competitors = competition.competitors || [];
        const homeComp = competitors.find((c: any) => c.homeAway === 'home') || competitors[0] || {};
        const awayComp = competitors.find((c: any) => c.homeAway === 'away') || competitors[1] || {};

        const statusType = ev.status?.type?.name;
        const isFinished = statusType === 'STATUS_FULL_TIME' || statusType === 'STATUS_FINAL';
        const isLive = statusType === 'STATUS_IN_PROGRESS' || statusType === 'STATUS_HALFTIME';

        const homeScoreParsed = homeComp.score !== undefined && homeComp.score !== null ? parseInt(String(homeComp.score), 10) : null;
        const awayScoreParsed = awayComp.score !== undefined && awayComp.score !== null ? parseInt(String(awayComp.score), 10) : null;

        return {
          id: `espn-${ev.id || `${lg.slug}-${idx}`}`,
          homeTeam: homeComp.team?.displayName || homeComp.team?.name || 'Home Team',
          awayTeam: awayComp.team?.displayName || awayComp.team?.name || 'Away Team',
          homeScore: (isFinished || isLive) ? (homeScoreParsed !== null && !isNaN(homeScoreParsed) ? homeScoreParsed : null) : null,
          awayScore: (isFinished || isLive) ? (awayScoreParsed !== null && !isNaN(awayScoreParsed) ? awayScoreParsed : null) : null,
          status: isFinished ? 'finished' : isLive ? 'live' : 'scheduled',
          matchMinute: isLive ? `${ev.status?.displayClock || ev.status?.period || '45'}` : isFinished ? '90' : undefined,
          kickoffAt: ev.date || targetDate.toISOString(),
          leagueName: data.leagues?.[0]?.name || lg.name,
          leagueSlug: lg.slug,
          countryFlag: lg.flag,
          matchDateOffset: offset,
          stadium: competition.venue?.fullName || 'Stadium',
        } as ApiMatchFixture;
      });
    } catch (err) {
      return [];
    }
  });

  const results = await Promise.all(promises);
  results.forEach((list) => allMatches.push(...list));

  return allMatches;
}
