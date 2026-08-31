/**
 * Dynamic Season Calculation Engine
 * Rule: July (month index >= 6) or later in the year = "{year}/{year+1}" (e.g. 2026/2027)
 *       Before July (January - June) = "{year-1}/{year}" (e.g. 2025/2026)
 */

export interface SeasonInfo {
  seasonString: string; // e.g. "2026/2027"
  startYear: number;   // 2026
  endYear: number;     // 2027
  label: string;       // "2026/2027 Season"
}

export function getCurrentSeason(date: Date = new Date()): SeasonInfo {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth(); // 0-indexed: 0 = Jan, 6 = July

  let startYear: number;
  let endYear: number;

  if (currentMonth >= 6) {
    // July or later
    startYear = currentYear;
    endYear = currentYear + 1;
  } else {
    // January through June
    startYear = currentYear - 1;
    endYear = currentYear;
  }

  const seasonString = `${startYear}/${endYear}`;

  return {
    seasonString,
    startYear,
    endYear,
    label: `${seasonString} Season`,
  };
}

export function getCurrentSeasonString(date: Date = new Date()): string {
  return getCurrentSeason(date).seasonString;
}

export function formatSeasonLabel(prefix?: string, date: Date = new Date()): string {
  const season = getCurrentSeason(date);
  return prefix ? `${prefix} (${season.seasonString})` : season.label;
}
