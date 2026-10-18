import type { Contestant, Scores } from "./types";

// Hybrid scoring — the pageant's official formula.
// Four voices, none for sale: expert panel, the public, judged craft, and
// organic clout. Craft (technical difficulty + originality) is what the
// sentiment cut funds — it moves 15 points from popularity to merit, and it
// cannot be brigaded because only the panel scores it. Consent/provenance stays
// a hard pass/fail gate (see segments.ts CONSENT_GATE), never a tradeable weight.
export const WEIGHTS = {
  judges: 0.4,
  public: 0.35,
  craft: 0.15,
  sentiment: 0.1,
} as const;

export const WEIGHT_LABELS = [
  { key: "judges", label: "Judges Panel", pct: 40, color: "gold" },
  { key: "public", label: "Public Vote", pct: 35, color: "orchid" },
  { key: "craft", label: "Craft & Originality", pct: 15, color: "jade" },
  { key: "sentiment", label: "Social Sentiment", pct: 10, color: "cream" },
] as const;

/** Weighted final score, 0-100. */
export function finalScore(s: Scores): number {
  return (
    s.judges * WEIGHTS.judges +
    s.public * WEIGHTS.public +
    s.craft * WEIGHTS.craft +
    s.sentiment * WEIGHTS.sentiment
  );
}

/**
 * Live public score: base contestant score nudged by any votes cast in this
 * browser session, so the demo reacts to the visitor. Capped at 100.
 * The bump cap (+6) matches the per-contestant vote cap in store.ts
 * (MAX_PER_CONTESTANT = 10 × 0.6), so the ceiling is reachable, not dead.
 */
export function livePublicScore(c: Contestant, sessionVotes: number): number {
  const bump = Math.min(sessionVotes * 0.6, 6);
  return Math.min(100, c.scores.public + bump);
}

export function liveFinalScore(c: Contestant, sessionVotes: number): number {
  return finalScore({ ...c.scores, public: livePublicScore(c, sessionVotes) });
}

export function rankContestants(
  contestants: Contestant[],
  sessionVotes: Record<string, number> = {},
): Contestant[] {
  return [...contestants].sort(
    (a, b) => liveFinalScore(b, sessionVotes[b.id] ?? 0) - liveFinalScore(a, sessionVotes[a.id] ?? 0),
  );
}
