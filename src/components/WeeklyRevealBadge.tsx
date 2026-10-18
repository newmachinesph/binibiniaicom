"use client";

import { useEffect, useState } from "react";

// Coronation target — mirrors Countdown.tsx. One segment is spotlighted each week
// so the season has a weekly return reason; the highlight rotates deterministically
// as the countdown ticks down toward coronation night.
const TARGET = new Date("2026-08-30T20:00:00+08:00");
const WEEK_MS = 7 * 86_400_000;

/** Which segment index is "revealing this week" — a weekly rotation over `count`
 *  segments, keyed to whole weeks left until coronation. Always in [0, count). */
export function revealingIndex(now: number, count: number): number {
  const weeksLeft = Math.max(0, Math.ceil((TARGET.getTime() - now) / WEEK_MS));
  return (count - (weeksLeft % count)) % count;
}

export function WeeklyRevealBadge({ index, count }: { index: number; count: number }) {
  // -1 until mounted: server and first client paint render nothing (no hydration
  // mismatch); the real week resolves post-mount, same trick as Countdown so
  // Date.now() never runs during render.
  const [active, setActive] = useState(-1);
  useEffect(() => setActive(revealingIndex(Date.now(), count)), [count]);

  if (active !== index) return null;

  return (
    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-xs font-medium text-gold-bright">
      <span className="h-1.5 w-1.5 rounded-full bg-gold-bright animate-[twinkle_1.6s_ease-in-out_infinite]" />
      Revealing this week
    </span>
  );
}
