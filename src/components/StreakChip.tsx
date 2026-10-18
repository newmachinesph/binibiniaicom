"use client";

import { useEffect, useState } from "react";
import { useVoteStore, remainingToday } from "@/lib/store";

export function StreakChip() {
  const [mounted, setMounted] = useState(false);
  const streak = useVoteStore((s) => s.streak);
  const remaining = useVoteStore(remainingToday);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-800 px-4 py-2 text-sm text-mist">
      <span aria-hidden>🔥</span>
      <span>
        {streak > 0 && (
          <>
            <span className="text-gold-bright">{streak}-day streak</span>
            {" · "}
          </>
        )}
        <span className="text-cream tabular-nums">{remaining}</span> free votes today
      </span>
    </span>
  );
}
