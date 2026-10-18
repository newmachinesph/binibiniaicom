"use client";

import { useMemo, useState } from "react";
import type { Contestant, Stage } from "@/lib/types";
import { STAGE_LABEL } from "@/lib/types";
import type { Region } from "@/lib/cities";
import { CITIES } from "@/lib/cities";
import { finalScore } from "@/lib/scoring";
import { ContestantCard } from "./ContestantCard";

type SortKey = "score" | "votes" | "followers";

const STAGES: (Stage | "all")[] = [
  "all",
  "national_finalist",
  "regional",
  "city_finalist",
  "audition",
];

const cityName = (id: string) => CITIES.find((c) => c.id === id)?.name ?? "";

export function ContestantsExplorer({
  contestants,
  regions,
}: {
  contestants: Contestant[];
  regions: Region[];
}) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [stage, setStage] = useState<Stage | "all">("all");
  const [sort, setSort] = useState<SortKey>("score");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = contestants.filter((c) => {
      if (region !== "all" && c.regionId !== region) return false;
      if (stage !== "all" && c.stage !== stage) return false;
      if (q && !`${c.name} ${cityName(c.cityId)}`.toLowerCase().includes(q)) return false;
      return true;
    });
    filtered.sort((a, b) => {
      if (sort === "votes") return b.votes - a.votes;
      if (sort === "followers") return b.followers - a.followers;
      return finalScore(b.scores) - finalScore(a.scores);
    });
    return filtered;
  }, [contestants, query, region, stage, sort]);

  return (
    <div>
      {/* controls */}
      <div className="sticky top-16 z-30 -mx-5 sm:-mx-8 px-5 sm:px-8 py-4 bg-ink/80 backdrop-blur-xl border-y border-line">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a muse or city…"
            className="w-full lg:max-w-xs rounded-full border border-line bg-white/[0.03] px-4 py-2.5 text-sm outline-none focus:border-gold placeholder:text-faint"
          />
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="rounded-full border border-line bg-ink px-4 py-2.5 text-sm outline-none focus:border-gold"
            >
              <option value="all">All regions</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.short} — {r.name}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-line bg-ink px-4 py-2.5 text-sm outline-none focus:border-gold"
            >
              <option value="score">Sort: Final score</option>
              <option value="votes">Sort: Votes</option>
              <option value="followers">Sort: Followers</option>
            </select>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {STAGES.map((s) => {
            const active = stage === s;
            return (
              <button
                key={s}
                onClick={() => setStage(s)}
                className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                  active
                    ? "border-gold text-gold-bright bg-gold/10"
                    : "border-line text-mist hover:text-cream"
                }`}
              >
                {s === "all" ? "All stages" : STAGE_LABEL[s]}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-sm text-faint">
        {results.length} {results.length === 1 ? "contestant" : "contestants"}
      </p>

      {results.length === 0 ? (
        <div className="mt-16 text-center text-mist">
          No muses match that. Try a different city or stage.
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {results.map((c, i) => (
            <ContestantCard key={c.id} contestant={c} rank={sort === "score" ? i + 1 : undefined} />
          ))}
        </div>
      )}
    </div>
  );
}
