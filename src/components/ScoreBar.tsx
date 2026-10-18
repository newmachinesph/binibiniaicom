import type { Scores } from "@/lib/types";
import { finalScore, WEIGHT_LABELS } from "@/lib/scoring";

const TRACK: Record<string, string> = {
  gold: "bg-gradient-to-r from-gold-deep to-gold-bright",
  orchid: "bg-gradient-to-r from-orchid to-orchid-bright",
  jade: "bg-gradient-to-r from-jade-deep to-jade-bright",
  cream: "bg-gradient-to-r from-mist to-cream",
};

export function ScoreBar({ scores, showFinal = true }: { scores: Scores; showFinal?: boolean }) {
  return (
    <div className="space-y-3">
      {WEIGHT_LABELS.map((w) => {
        const value = scores[w.key];
        return (
          <div key={w.key}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-mist">
                {w.label} <span className="text-faint">· {w.pct}%</span>
              </span>
              <span className="font-medium text-cream tabular-nums">{value.toFixed(1)}</span>
            </div>
            <div className="h-1.5 rounded-full bg-ink-700 overflow-hidden">
              <div
                className={`h-full rounded-full ${TRACK[w.color]}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        );
      })}

      {showFinal && (
        <div className="pt-3 mt-1 border-t border-line flex items-center justify-between">
          <span className="text-sm text-gold-bright font-display">Final Score</span>
          <span className="font-display text-2xl text-gradient-gold tabular-nums">
            {finalScore(scores).toFixed(1)}
          </span>
        </div>
      )}
    </div>
  );
}
