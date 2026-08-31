/**
 * Client-safe helper for generating provider player headshot CDN URLs
 */
export function getProviderHeadshotUrl(athleteId: string | null | undefined): string | null {
  if (!athleteId) return null;
  const cleanId = String(athleteId).trim();
  return `https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/${cleanId}.png`;
}
