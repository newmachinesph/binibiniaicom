"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Region } from "@/lib/cities";
import type { MuseLook } from "@/lib/portrait";
import { MusePortrait } from "./MusePortrait";

export type CityRow = {
  id: string;
  name: string;
  slug: string;
  regionId: string;
  active: boolean;
  advancer?: { id: string; name: string; look: MuseLook; sashNumber: number };
};

export function CitiesExplorer({
  regions,
  cities,
}: {
  regions: Region[];
  cities: CityRow[];
}) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = cities.filter((c) => {
      if (region !== "all" && c.regionId !== region) return false;
      if (q && !c.name.toLowerCase().includes(q)) return false;
      return true;
    });
    return regions
      .map((r) => ({ region: r, cities: filtered.filter((c) => c.regionId === r.id) }))
      .filter((g) => g.cities.length > 0);
  }, [cities, regions, query, region]);

  const shown = groups.reduce((n, g) => n + g.cities.length, 0);

  return (
    <div>
      {/* controls */}
      <div className="sticky top-16 z-30 -mx-5 sm:-mx-8 px-5 sm:px-8 py-4 bg-ink/80 backdrop-blur-xl border-y border-line">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a city…"
            className="w-full lg:max-w-xs rounded-full border border-line bg-white/[0.03] px-4 py-2.5 text-sm outline-none focus:border-gold placeholder:text-faint"
          />
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-full border border-line bg-ink px-4 py-2.5 text-sm outline-none focus:border-gold"
          >
            <option value="all">All 17 regions</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.short} — {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-faint">
        {shown} {shown === 1 ? "city" : "cities"} across {groups.length}{" "}
        {groups.length === 1 ? "region" : "regions"}
      </p>

      {groups.length === 0 ? (
        <div className="mt-16 text-center text-mist">
          No city matches that. Try a different name or region.
        </div>
      ) : (
        <div className="mt-4 space-y-12">
          {groups.map(({ region: r, cities: rows }) => (
            <section key={r.id}>
              <div className="flex items-baseline justify-between border-b border-line pb-3">
                <h2 className="font-display text-2xl sm:text-3xl">{r.name}</h2>
                <span className="text-xs uppercase tracking-wide text-gold-deep">
                  {r.short} · {rows.length} {rows.length === 1 ? "city" : "cities"}
                </span>
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {rows.map((c) => (
                  <CityCell key={c.id} city={c} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function CityCell({ city }: { city: CityRow }) {
  if (city.active && city.advancer) {
    const a = city.advancer;
    return (
      <Link
        href={`/cities/${city.slug}`}
        className="group card flex items-center gap-4 p-3 pr-4 border-gold-deep/40 bg-gold/[0.04] transition-transform duration-500 hover:-translate-y-0.5 hover:border-gold"
      >
        <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl border border-line">
          <MusePortrait
            look={a.look}
            uid={`city-${city.id}-${a.id}`}
            name={a.name}
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-lg leading-tight truncate">{city.name}</h3>
          <p className="mt-0.5 text-sm text-cream truncate">{a.name}</p>
          <p className="text-[11px] text-gold-bright">No. {a.sashNumber} · advancing</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/cities/${city.slug}`}
      className="group card flex items-center gap-4 p-3 pr-4 transition-transform duration-500 hover:-translate-y-0.5 hover:border-orchid/50"
    >
      <div className="flex h-16 w-14 shrink-0 items-center justify-center rounded-xl border border-dashed border-line text-faint text-xl">
        +
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-lg leading-tight truncate text-mist group-hover:text-cream transition-colors">
          {city.name}
        </h3>
        <p className="mt-0.5 text-xs text-faint">Open — be the first</p>
      </div>
    </Link>
  );
}
