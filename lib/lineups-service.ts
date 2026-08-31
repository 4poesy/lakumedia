import { getProviderHeadshotUrl } from '@/lib/player-headshot';

export interface PlayerLineupItem {
  id: string;
  athleteId?: string;
  name: string;
  shortName: string;
  jerseyNumber: string;
  positionAbbr: string;
  positionName: string;
  photoUrl: string | null;
  isStarter: boolean;
  subbedIn?: boolean;
  subbedOut?: boolean;
  subMinute?: string;
  goals?: number;
  yellowCards?: number;
  redCards?: number;
}

export interface TeamLineupData {
  teamName: string;
  teamLogo?: string | null;
  formation: string;
  starters: PlayerLineupItem[];
  substitutes: PlayerLineupItem[];
  lineupConfirmed: boolean;
}

export interface MatchLineupPayload {
  fixtureId: string;
  homeTeam: TeamLineupData;
  awayTeam: TeamLineupData;
  lineupsConfirmed: boolean;
  statusMessage?: string;
}

/**
 * Grid position map for common soccer formations (x: 0-100% left-to-right, y: 0-100% bottom-to-top)
 */
export function calculateFormationGridPositions(
  starters: PlayerLineupItem[],
  formationString: string
): Array<PlayerLineupItem & { gridX: number; gridY: number }> {
  if (!starters || starters.length !== 11) return [];

  const gk = starters.find((p) => p.positionAbbr === 'GK') || starters[0];
  const outfield = starters.filter((p) => p.id !== gk.id);

  // Parse formation lines (e.g. "4-3-3" -> [4, 3, 3], "4-2-3-1" -> [4, 2, 3, 1])
  const parts = formationString
    .replace(/[^0-9-]/g, '')
    .split('-')
    .map((n) => parseInt(n, 10))
    .filter((n) => !isNaN(n) && n > 0);

  const lines = parts.length >= 2 ? parts : [4, 4, 2];

  const results: Array<PlayerLineupItem & { gridX: number; gridY: number }> = [];

  // Goalkeeper at bottom center
  results.push({
    ...gk,
    gridX: 50,
    gridY: 10,
  });

  // Calculate y-bands for outfield lines
  const totalLines = lines.length;
  const startY = 26;
  const endY = 88;
  const yStep = (endY - startY) / Math.max(1, totalLines - 1);

  let playerIdx = 0;

  lines.forEach((countInLine, lineIdx) => {
    const y = totalLines === 1 ? 55 : startY + lineIdx * yStep;
    const xStep = 100 / (countInLine + 1);

    for (let i = 0; i < countInLine; i++) {
      if (playerIdx < outfield.length) {
        const player = outfield[playerIdx];
        const x = xStep * (i + 1);
        results.push({
          ...player,
          gridX: Math.round(x),
          gridY: Math.round(y),
        });
        playerIdx++;
      }
    }
  });

  // Position any remaining outfield players if formation counts didn't sum to 10
  while (playerIdx < outfield.length) {
    const player = outfield[playerIdx];
    results.push({
      ...player,
      gridX: 50,
      gridY: 50,
    });
    playerIdx++;
  }

  return results;
}

/**
 * Fetch official match lineups from ESPN Summary API
 */
export async function fetchMatchLineups(fixtureId: string, leagueSlug: string = 'epl'): Promise<MatchLineupPayload> {
  const cleanId = fixtureId.replace('espn-', '').replace('real-', '');

  const leagueCodeMap: Record<string, string> = {
    epl: 'eng.1',
    laliga: 'esp.1',
    seriea: 'ita.1',
    bundesliga: 'ger.1',
    ligue1: 'fra.1',
    saudi: 'sau.1',
    ucl: 'uefa.champions',
    uel: 'uefa.europa',
    afcon: 'caf.nations',
    npfl: 'eng.1',
  };

  const leagueCode = leagueCodeMap[leagueSlug.toLowerCase()] || 'eng.1';
  const endpoint = `https://site.web.api.espn.com/apis/site/v2/sports/soccer/${leagueCode}/summary?event=${cleanId}`;

  try {
    const res = await fetch(endpoint, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 180 },
    });

    if (res.ok) {
      const data = await res.json();
      const rosters = data.rosters || [];

      if (rosters.length >= 2) {
        const homeRosterData = rosters[0] || {};
        const awayRosterData = rosters[1] || {};

        const parseRoster = (teamRosterObj: any): TeamLineupData => {
          const teamName = teamRosterObj.team?.displayName || teamRosterObj.team?.name || 'Team';
          const teamLogo = teamRosterObj.team?.logo || null;
          const formation = teamRosterObj.formation || '4-3-3';
          const rosterList = teamRosterObj.roster || [];

          const starters: PlayerLineupItem[] = [];
          const substitutes: PlayerLineupItem[] = [];

          rosterList.forEach((item: any, idx: number) => {
            const ath = item.athlete || {};
            const pos = item.position || {};

            const playerItem: PlayerLineupItem = {
              id: ath.id || `player-${idx}`,
              athleteId: ath.id,
              name: ath.displayName || ath.name || 'Player',
              shortName: ath.shortName || ath.displayName || 'Player',
              jerseyNumber: ath.jersey || item.jersey || `${idx + 1}`,
              positionAbbr: pos.abbreviation || 'MF',
              positionName: pos.displayName || pos.name || 'Midfielder',
              photoUrl: ath.id ? getProviderHeadshotUrl(ath.id) : (ath.headshot?.href || null),
              isStarter: Boolean(item.starter),
              subbedIn: Boolean(item.subbedIn),
              subbedOut: Boolean(item.subbedOut),
              subMinute: item.subMinute ? String(item.subMinute) : undefined,
              goals: item.stats?.goals || 0,
              yellowCards: item.stats?.yellowCards || 0,
              redCards: item.stats?.redCards || 0,
            };

            if (playerItem.isStarter) {
              starters.push(playerItem);
            } else {
              substitutes.push(playerItem);
            }
          });

          const lineupConfirmed = starters.length === 11;

          return {
            teamName,
            teamLogo,
            formation,
            starters,
            substitutes,
            lineupConfirmed,
          };
        };

        const homeData = parseRoster(homeRosterData);
        const awayData = parseRoster(awayRosterData);
        const bothConfirmed = homeData.lineupConfirmed && awayData.lineupConfirmed;

        return {
          fixtureId,
          homeTeam: homeData,
          awayTeam: awayData,
          lineupsConfirmed: bothConfirmed,
          statusMessage: bothConfirmed
            ? undefined
            : 'Official lineups not yet announced — Published ~60 minutes prior to kickoff.',
        };
      }
    }
  } catch (err) {
    console.warn(`Lineup fetch error for fixture ${fixtureId}:`, err);
  }

  // Unannounced default payload
  return {
    fixtureId,
    homeTeam: {
      teamName: 'Home Team',
      formation: '4-3-3',
      starters: [],
      substitutes: [],
      lineupConfirmed: false,
    },
    awayTeam: {
      teamName: 'Away Team',
      formation: '4-3-3',
      starters: [],
      substitutes: [],
      lineupConfirmed: false,
    },
    lineupsConfirmed: false,
    statusMessage: 'Official lineups not yet announced — Published ~60 minutes prior to kickoff.',
  };
}
