import Link from "next/link";
import type { Contestant } from "@/lib/types";
import { SEGMENTS, TRACK_CLASS } from "@/lib/segments";

export function RoundScorecard({ contestant }: { contestant: Contestant }) {
  const rows = SEGMENTS.map((s) => ({ seg: s, score: contestant.rounds[s.id] ?? 0 }));
  const best = rows.reduce((a, b) => (b.score > a.score ? b : a), rows[0]);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg">Scorecard by Round</h3>
        <Link href="/rounds" className="text-xs text-gold-deep hover:text-gold-bright">
          What are the rounds? →
        </Link>
      </div>
      <div className="space-y-4">
        {rows.map(({ seg, score }) => (
          <div key={seg.id}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-mist flex items-center gap-1.5">
                <span>{seg.emoji}</span>
                {seg.name}
                {seg.id === best.seg.id && (
                  <span className="rounded-full border border-gold/50 text-gold-bright px-1.5 py-0.5 text-[10px]">
                    strongest
                  </span>
                )}
              </span>
              <span className="font-medium text-cream tabular-nums">{score.toFixed(1)}</span>
            </div>
            <div className="h-1.5 rounded-full bg-ink-700 overflow-hidden">
              <div className={`h-full rounded-full ${TRACK_CLASS[seg.accent]}`} style={{ width: `${score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
