"use client";

import { useEffect, useState } from "react";
import type { Contestant } from "@/lib/types";
import { WEIGHT_LABELS, livePublicScore, liveFinalScore } from "@/lib/scoring";
import { useVoteStore } from "@/lib/store";

const TRACK: Record<string, string> = {
  gold: "bg-gradient-to-r from-gold-deep to-gold-bright",
  orchid: "bg-gradient-to-r from-orchid to-orchid-bright",
  jade: "bg-gradient-to-r from-jade-deep to-jade-bright",
  cream: "bg-gradient-to-r from-mist to-cream",
};

export function LiveScorePanel({ contestant }: { contestant: Contestant }) {
  const [mounted, setMounted] = useState(false);
  const sessionVotes = useVoteStore((s) => s.votes[contestant.id] ?? 0);
  useEffect(() => setMounted(true), []);

  const votes = mounted ? sessionVotes : 0;
  const values = {
    judges: contestant.scores.judges,
    public: livePublicScore(contestant, votes),
    craft: contestant.scores.craft,
    sentiment: contestant.scores.sentiment,
  };
  const final = liveFinalScore(contestant, votes);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg">Judging Breakdown</h3>
        {mounted && votes > 0 && (
          <span className="text-xs text-orchid-bright">+{votes} from you</span>
        )}
      </div>
      <div className="space-y-4">
        {WEIGHT_LABELS.map((w) => {
          const value = values[w.key];
          const boosted = w.key === "public" && votes > 0;
          return (
            <div key={w.key}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-mist">
                  {w.label} <span className="text-faint">· {w.pct}%</span>
                </span>
                <span className={`font-medium tabular-nums ${boosted ? "text-orchid-bright" : "text-cream"}`}>
                  {value.toFixed(1)}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-ink-700 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${TRACK[w.color]}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="pt-4 mt-4 border-t border-line flex items-center justify-between">
        <span className="text-sm text-gold-bright font-display">Final Score</span>
        <span className="font-display text-3xl text-gradient-gold tabular-nums transition-all duration-500">
          {final.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
