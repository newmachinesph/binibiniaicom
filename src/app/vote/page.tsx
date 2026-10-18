import type { Metadata } from "next";
import { CONTESTANTS } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Leaderboard } from "@/components/Leaderboard";
import { ShareBar } from "@/components/ShareBar";
import { StreakChip } from "@/components/StreakChip";
import { Button } from "@/components/ui/Button";
import { WEIGHT_LABELS } from "@/lib/scoring";

export const metadata: Metadata = {
  title: "Vote & Leaderboard — Binibini AI",
  description: "Cast free votes and watch the live hybrid-score leaderboard react in real time.",
};

export default function VotePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8 py-16">
      <SectionHeading
        eyebrow="Live Leaderboard"
        title="Cast your vote. Move the crown."
        description="Voting is free and unlimited-ish — attention only, never money. Every vote nudges the Public Vote score. Watch the ranking shift as you tap."
      />

      <div className="mt-6 flex flex-wrap gap-2">
        {WEIGHT_LABELS.map((w) => (
          <span key={w.key} className="rounded-full border border-line px-3 py-1.5 text-xs text-mist">
            {w.label} · <span className="text-cream">{w.pct}%</span>
          </span>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <StreakChip />
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/bracket" variant="outline" size="sm">
            Ang Top 12 Ko →
          </Button>
          <ShareBar small title="Vote in Binibini AI — free, daily" path="/vote" />
        </div>
      </div>

      <div className="mt-6">
        <Leaderboard contestants={CONTESTANTS} />
      </div>
    </div>
  );
}
