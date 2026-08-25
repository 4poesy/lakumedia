/**
 * Lightweight client-side / API rate limiting helper to throttle rapid comment submissions.
 */
const submissionTracker = new Map<string, number>();

export function checkRateLimit(key: string, limitMs: number = 5000): boolean {
  const lastTime = submissionTracker.get(key) || 0;
  const now = Date.now();

  if (now - lastTime < limitMs) {
    return false; // Rate limited
  }

  submissionTracker.set(key, now);
  return true; // Allowed
}
