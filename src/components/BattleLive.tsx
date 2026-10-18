"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MusePortrait } from "./MusePortrait";
import { Button } from "./ui/Button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ShareBar } from "./ShareBar";
import { liveFinalScore } from "@/lib/scoring";
import { useVoteStore } from "@/lib/store";
import type { Contestant } from "@/lib/types";
import type { Region } from "@/lib/cities";

type RegionRoster = { region: Region; roster: Contestant[]; hue: number };

const accent = (hue: number) => `hsl(${hue} 65% 60%)`;

const MEDAL = [
  "border-gold text-gold-bright bg-gold/10",
  "border-line text-cream bg-white/[0.06]",
  "border-orchid text-orchid-bright bg-orchid/10",
];

// Region strength reacts to live session votes — same mounted-guarded pattern as
// Leaderboard, so every free vote for a muse lifts her whole region's board.
export function BattleLive({ regions }: { regions: RegionRoster[] }) {
  const [mounted, setMounted] = useState(false);
  const votes = useVoteStore((s) => s.votes);
  useEffect(() => setMounted(true), []);

  const sv = (id: string) => (mounted ? votes[id] ?? 0 : 0);

  const standings = useMemo(() => {
    const v = mounted ? votes : {};
    return regions
      .map(({ region, roster, hue }) => {
        const ranked = [...roster].sort(
          (a, b) => liveFinalScore(b, v[b.id] ?? 0) - liveFinalScore(a, v[a.id] ?? 0),
        );
        const top3 = ranked.slice(0, 3);
        const strength = top3.length
          ? top3.reduce((sum, c) => sum + liveFinalScore(c, v[c.id] ?? 0), 0) / top3.length
          : 0;
        return { region, roster: ranked, strength, top: ranked[0], hue };
      })
      .sort((a, b) => b.strength - a.strength);
  }, [regions, votes, mounted]);

  const maxStrength = standings[0]?.strength || 100;
  const [alpha, beta] = standings.filter((s) => s.top);

  return (
    <>
      {/* ---------------- TONIGHT'S MATCHUP ---------------- */}
      {alpha?.top && beta?.top && (
        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-10">
          <Reveal>
            <SectionHeading
              eyebrow="Tonight's Matchup"
              title="The two strongest regions collide."
              description="Sino ang papanalunin mo? The frontrunners of the top two regions, head to head — and every vote reshuffles who lands here."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mt-10 grid overflow-hidden rounded-3xl border border-line md:grid-cols-2">
              {[alpha, beta].map((side, i) => {
                const muse = side.top!;
                return (
                  <div
                    key={side.region.id}
                    className="relative p-6 sm:p-10"
                    style={{
                      background: `linear-gradient(${i === 0 ? "135deg" : "225deg"}, hsl(${side.hue} 55% 16%), hsl(${side.hue} 40% 8%) 70%)`,
                    }}
                  >
                    <div
                      className={`flex flex-col gap-6 sm:flex-row sm:items-center ${i === 1 ? "sm:flex-row-reverse sm:text-right" : ""}`}
                    >
                      <div className="relative h-56 w-44 shrink-0 overflow-hidden rounded-2xl border border-line">
                        <MusePortrait
                          look={muse.look}
                          uid={`vs-${muse.id}`}
                          name={muse.name}
                          sash={muse.sashNumber}
                          className="absolute inset-0"
                        />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-xs font-medium uppercase tracking-[0.18em]"
                          style={{ color: accent(side.hue) }}
                        >
                          {side.region.short} · {side.region.name}
                        </p>
                        <h3 className="mt-2 font-display text-3xl sm:text-4xl leading-tight">
                          {muse.name}
                        </h3>
                        <p className="mt-1 text-sm text-mist">
                          Sash No. {muse.sashNumber}
                        </p>
                        <p className="mt-3 font-display text-4xl text-gradient-gold tabular-nums">
                          {liveFinalScore(muse, sv(muse.id)).toFixed(1)}
                        </p>
                        <div className="mt-5">
                          <Button
                            href={`/contestants/${muse.slug}`}
                            size="sm"
                            variant={i === 0 ? "primary" : "outline"}
                          >
                            Vote {muse.name.split(" ")[0]} →
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
                <span className="rounded-full border border-gold/50 bg-ink px-5 py-3 font-display text-3xl italic text-gradient-gold shadow-[0_0_40px_-5px_rgba(220,180,90,0.5)]">
                  VS
                </span>
              </div>
              <div className="flex items-center justify-center border-t border-line bg-ink py-3 md:hidden">
                <span className="font-display text-2xl italic text-gradient-gold">VS</span>
              </div>
            </div>
          </Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-mist">
              Laban tayo — i-post ang matchup ng rehiyon mo.
            </span>
            <ShareBar
              small
              title={`Laban tayo! ${alpha.region.short} vs ${beta.region.short} — Binibini AI`}
              path="/battle"
            />
          </div>
        </section>
      )}

      {/* ---------------- REGIONAL LEADERBOARD ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Regional Standings"
            title="All 17 regions, ranked live."
            description="Region strength is the average live score of each region's top three delegates. Your votes move it — walang bayad, puro malasakit."
          />
        </Reveal>
        <div className="mt-10 space-y-3">
          {standings.map((s, i) => (
            <Reveal key={s.region.id} delay={Math.min(i, 6) * 0.04}>
              <div className="card flex flex-wrap items-center gap-x-5 gap-y-3 p-4 sm:p-5">
                {/* rank */}
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-display text-lg tabular-nums ${
                    i < 3 && s.top ? MEDAL[i] : "border-line text-faint"
                  }`}
                >
                  {i + 1}
                </span>

                {/* region */}
                <div className="flex min-w-0 flex-1 basis-40 items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: accent(s.hue) }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg leading-tight">
                      {s.region.name}
                    </p>
                    <p className="text-xs text-faint">
                      {s.region.short} ·{" "}
                      {s.roster.length > 0
                        ? `${s.roster.length} delegate${s.roster.length > 1 ? "s" : ""}`
                        : "no delegates yet"}
                    </p>
                  </div>
                </div>

                {/* strength */}
                {s.roster.length > 0 ? (
                  <div className="w-full sm:w-56">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] uppercase tracking-wide text-faint">
                        Strength
                      </span>
                      <span className="font-display text-xl tabular-nums text-cream">
                        {s.strength.toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink-700">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(s.strength / maxStrength) * 100}%`,
                          background: `linear-gradient(90deg, hsl(${s.hue} 55% 40%), hsl(${s.hue} 70% 65%))`,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-faint">Awaiting its first muse</p>
                )}

                {/* top muse */}
                {s.top && (
                  <Link
                    href={`/contestants/${s.top.slug}`}
                    className="group flex shrink-0 items-center gap-3"
                  >
                    <span className="relative block h-12 w-10 overflow-hidden rounded-lg border border-line">
                      <MusePortrait
                        look={s.top.look}
                        uid={`lb-${s.top.id}`}
                        name={s.top.name}
                        sash={s.top.sashNumber}
                        className="absolute inset-0"
                      />
                    </span>
                    <span className="hidden sm:block">
                      <span className="block text-[11px] uppercase tracking-wide text-faint">
                        Top muse
                      </span>
                      <span className="block text-sm text-cream group-hover:text-gold-bright transition-colors">
                        {s.top.name}
                      </span>
                    </span>
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
