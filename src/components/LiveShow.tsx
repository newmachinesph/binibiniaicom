"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { MuseLook } from "@/lib/portrait";
import { SEGMENTS } from "@/lib/segments";
import { MusePortrait } from "./MusePortrait";
import { Button } from "./ui/Button";

export type LiveFinalist = {
  id: string;
  slug: string;
  name: string;
  look: MuseLook;
  sashNumber: number;
  cityName: string;
  /** finalScore rounded to 1dp — the simulation drifts from here */
  baseScore: number;
};

type Delta = { dir: 1 | -1; n: number };
type FeedEvent = { id: number; at: number; text: string };

// ponytail: mulberry32 — tiny seeded PRNG so the "broadcast" plays back
// deterministically. No Math.random anywhere → no hydration risk.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const RANK_CHIP = [
  "bg-gradient-to-br from-gold-bright to-gold text-ink",
  "bg-gradient-to-br from-mist to-cream text-ink",
  "bg-gradient-to-br from-orchid to-orchid-bright text-ink",
];

// One 500ms master clock; everything else derives from the tick count.
const TICK_MS = 500;
const DRIFT_EVERY = 5; // scores nudge every 2.5s
const FEATURE_EVERY = 12; // featured finalist rotates every 6s
const SEGMENT_EVERY = 40; // segment advances every 20s

export function LiveShow({ finalists }: { finalists: LiveFinalist[] }) {
  // First render is fully deterministic (props only) — safe to hydrate.
  const [n, setN] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>(() =>
    Object.fromEntries(finalists.map((f) => [f.id, f.baseScore])),
  );
  const [deltas, setDeltas] = useState<Record<string, Delta>>({});
  const [events, setEvents] = useState<FeedEvent[]>([]);

  useEffect(() => {
    const rng = mulberry32(0x510e01); // fixed Season 01 seed
    let tick = 0;
    let eventId = 0;

    const pushEvent = (now: number, text: string) => {
      eventId += 1;
      const e = { id: eventId, at: Math.floor(now / 2), text };
      setEvents((prev) => [e, ...prev].slice(0, 8));
    };

    const interval = setInterval(() => {
      tick += 1;
      const now = tick;
      setN(now);

      if (now % DRIFT_EVERY === 0) {
        // nudge 1-3 finalists by ±0.1-0.4
        const count = 1 + Math.floor(rng() * 3);
        const nudges: { id: string; nudge: number }[] = [];
        for (let i = 0; i < count; i += 1) {
          const f = finalists[Math.floor(rng() * finalists.length)];
          const nudge = (0.1 + rng() * 0.3) * (rng() < 0.5 ? -1 : 1);
          nudges.push({ id: f.id, nudge });
        }
        setScores((prev) => {
          const next = { ...prev };
          for (const { id, nudge } of nudges) {
            next[id] =
              Math.round(Math.min(100, Math.max(0, (next[id] ?? 0) + nudge)) * 10) / 10;
          }
          return next;
        });
        setDeltas((prev) => {
          const next = { ...prev };
          for (const { id, nudge } of nudges) {
            next[id] = { dir: nudge > 0 ? 1 : -1, n: now };
          }
          return next;
        });

        if (rng() < 0.45) {
          const f = finalists[Math.floor(rng() * finalists.length)];
          const seg = SEGMENTS[Math.floor(now / SEGMENT_EVERY) % SEGMENTS.length];
          const texts = [
            `${f.name} surges in the public vote`,
            `Sentiment spike: ${f.name} trending in ${f.cityName}`,
            "Provenance check cleared — all assets verified",
            `Crowd meter climbing for ${f.name}`,
            `Judges deliberating on ${seg.name} ${seg.emoji}`,
          ];
          pushEvent(now, texts[Math.floor(rng() * texts.length)]);
        }
      }

      if (now % SEGMENT_EVERY === 0) {
        const done =
          SEGMENTS[(Math.floor(now / SEGMENT_EVERY) - 1 + SEGMENTS.length) % SEGMENTS.length];
        pushEvent(now, `Judges' scores locked for ${done.name}`);
      }
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [finalists]);

  const live = n > 0;
  const elapsed = Math.floor(n / 2);
  const featured = finalists[Math.floor(n / FEATURE_EVERY) % finalists.length];
  const segment = SEGMENTS[Math.floor(n / SEGMENT_EVERY) % SEGMENTS.length];
  const ranked = [...finalists].sort(
    (a, b) =>
      (scores[b.id] ?? b.baseScore) - (scores[a.id] ?? a.baseScore) ||
      a.name.localeCompare(b.name),
  );

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-12">
        <div className="grid items-start gap-5 lg:grid-cols-[1.4fr_1fr]">
          {/* ---------- main stage ---------- */}
          <div className="card overflow-hidden">
            <div className="relative aspect-video overflow-hidden bg-ink-800">
              <AnimatePresence initial={false}>
                <motion.div
                  key={featured.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <MusePortrait
                    look={featured.look}
                    uid={`live-stage-${featured.id}`}
                    name={featured.name}
                    sash={featured.sashNumber}
                    mode="stage"
                    className="absolute inset-0"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />

              <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-orchid/50 bg-ink/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-orchid-bright backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-orchid animate-[twinkle_1.4s_ease-in-out_infinite]" />
                {live ? "Live" : "Going live…"}
              </span>

              <span className="absolute top-4 right-4 rounded-full border border-line bg-ink/70 px-3 py-1.5 text-[11px] uppercase tracking-wide text-cream backdrop-blur">
                {segment.emoji} {segment.name}
              </span>

              {/* lower third */}
              <div className="absolute right-0 bottom-0 left-0 p-5 sm:p-6">
                <div className="border-l-2 border-gold pl-4">
                  <h2 className="font-display text-2xl leading-tight sm:text-3xl">
                    {featured.name}
                  </h2>
                  <p className="text-sm text-mist">
                    {featured.cityName} · Sash No. {featured.sashNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- live standings ---------- */}
          <div className="card p-4 sm:p-5">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h2 className="font-display text-xl">Live standings</h2>
              <span className="text-[11px] uppercase tracking-wide text-faint">
                Hybrid score · simulated
              </span>
            </div>
            <div>
              {ranked.map((c, i) => {
                const d = deltas[c.id];
                return (
                  <motion.div
                    layout
                    key={c.id}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="flex items-center gap-3 border-b border-line/60 py-2 last:border-0"
                  >
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-display text-xs font-bold ${
                        RANK_CHIP[i] ?? "border border-line text-faint"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-line">
                      <MusePortrait
                        look={c.look}
                        uid={`live-row-${c.id}`}
                        name={c.name}
                        className="absolute inset-0"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{c.name}</span>
                      <span className="block truncate text-[11px] text-faint">
                        {c.cityName} · No. {c.sashNumber}
                      </span>
                    </span>
                    <span className="w-4 text-center text-xs" aria-hidden>
                      {d && (
                        <motion.span
                          key={d.n}
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 1.8, delay: 0.3 }}
                          className={d.dir > 0 ? "text-gold-bright" : "text-orchid-bright"}
                        >
                          {d.dir > 0 ? "▲" : "▼"}
                        </motion.span>
                      )}
                    </span>
                    <span className="w-12 text-right font-display text-lg text-gradient-gold tabular-nums">
                      {(scores[c.id] ?? c.baseScore).toFixed(1)}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ---------- event ticker ---------- */}
        <div className="card mt-5 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl">Event feed</h2>
            <span className="text-xs text-faint tabular-nums">
              {live ? `On air · ${fmt(elapsed)}` : "Standing by"}
            </span>
          </div>
          <ul aria-live="polite" className="mt-3 min-h-[5rem] space-y-1.5">
            {events.length === 0 && (
              <li className="text-sm text-faint">Waiting for the first cue…</li>
            )}
            <AnimatePresence initial={false}>
              {events.map((e) => (
                <motion.li
                  key={e.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex gap-3 text-sm"
                >
                  <span className="pt-0.5 text-xs text-faint tabular-nums">{fmt(e.at)}</span>
                  <span className="text-mist">{e.text}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>

      {/* ---------- sticky CTA strip ---------- */}
      <div className="sticky bottom-0 z-40 border-t border-line bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <p className="text-sm text-mist">
            This is a preview. The real crown is decided live on{" "}
            <span className="text-cream">Aug 30, 2026</span>.
          </p>
          <div className="flex items-center gap-3">
            <Button href="/vote" size="sm">
              Vote now — it counts
            </Button>
            <Button href="/coronation" size="sm" variant="outline">
              Coronation night →
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
