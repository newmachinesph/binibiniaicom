"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Contestant } from "@/lib/types";
import { cityById } from "@/lib/cities";
import { liveFinalScore } from "@/lib/scoring";
import { useVoteStore } from "@/lib/store";
import { MusePortrait } from "./MusePortrait";
import { StageBadge } from "./StageBadge";
import { VoteButton } from "./VoteButton";

export function Leaderboard({ contestants }: { contestants: Contestant[] }) {
  const [mounted, setMounted] = useState(false);
  const [finalistsOnly, setFinalistsOnly] = useState(false);
  const votes = useVoteStore((s) => s.votes);
  useEffect(() => setMounted(true), []);

  const ranked = useMemo(() => {
    const v = mounted ? votes : {};
    const pool = finalistsOnly
      ? contestants.filter((c) => c.stage === "national_finalist")
      : contestants;
    return [...pool].sort(
      (a, b) => liveFinalScore(b, v[b.id] ?? 0) - liveFinalScore(a, v[a.id] ?? 0),
    );
  }, [contestants, votes, mounted, finalistsOnly]);

  const podium = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="inline-flex rounded-full border border-line p-1">
          <button
            onClick={() => setFinalistsOnly(false)}
            className={`rounded-full px-4 py-1.5 text-sm ${!finalistsOnly ? "bg-gold text-ink" : "text-mist"}`}
          >
            All contestants
          </button>
          <button
            onClick={() => setFinalistsOnly(true)}
            className={`rounded-full px-4 py-1.5 text-sm ${finalistsOnly ? "bg-gold text-ink" : "text-mist"}`}
          >
            National finalists
          </button>
        </div>
        <span className="hidden sm:flex items-center gap-2 text-xs text-mist">
          <span className="h-2 w-2 rounded-full bg-orchid animate-[twinkle_1.6s_ease-in-out_infinite]" />
          Live ranking
        </span>
      </div>

      {/* podium */}
      <div className="grid gap-4 sm:grid-cols-3 mb-10">
        {podium.map((c, i) => {
          const city = cityById(c.cityId);
          const medal = ["from-gold-bright to-gold", "from-mist to-cream", "from-orchid to-orchid-bright"][i];
          return (
            <div
              key={c.id}
              className={`card overflow-hidden ${i === 0 ? "sm:-translate-y-3 border-gold" : ""}`}
            >
              <Link href={`/contestants/${c.slug}`} className="relative block aspect-[5/4] overflow-hidden">
                <MusePortrait look={c.look} uid={`pod-${c.id}`} name={c.name} sash={c.sashNumber} className="absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <span className={`absolute top-3 left-3 grid place-items-center h-9 w-9 rounded-full bg-gradient-to-br ${medal} text-ink font-display font-bold`}>
                  {i + 1}
                </span>
                <div className="absolute bottom-0 p-4">
                  <h3 className="font-display text-xl">{c.name}</h3>
                  <p className="text-xs text-mist">{city?.name}</p>
                </div>
              </Link>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="font-display text-2xl text-gradient-gold tabular-nums">
                  {liveFinalScore(c, (mounted ? votes[c.id] : 0) ?? 0).toFixed(1)}
                </span>
                <VoteButton contestantId={c.id} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ranked list */}
      <div className="card divide-y divide-line overflow-hidden">
        {rest.map((c, i) => {
          const city = cityById(c.cityId);
          const score = liveFinalScore(c, (mounted ? votes[c.id] : 0) ?? 0);
          return (
            <div key={c.id} className="flex items-center gap-4 px-4 sm:px-5 py-3 hover:bg-white/[0.02]">
              <span className="w-6 text-center font-display text-lg text-faint tabular-nums">{i + 4}</span>
              <Link href={`/contestants/${c.slug}`} className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-line">
                <MusePortrait look={c.look} uid={`row-${c.id}`} name={c.name} className="absolute inset-0" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link href={`/contestants/${c.slug}`} className="font-medium truncate block hover:text-gold-bright">
                  {c.name}
                </Link>
                <p className="text-xs text-faint truncate">
                  {city?.name} · No. {c.sashNumber}
                </p>
              </div>
              <div className="hidden sm:block">
                <StageBadge stage={c.stage} />
              </div>
              <span className="font-display text-lg text-gradient-gold tabular-nums w-14 text-right">
                {score.toFixed(1)}
              </span>
              <VoteButton contestantId={c.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
