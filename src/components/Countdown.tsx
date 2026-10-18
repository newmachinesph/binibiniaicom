"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-08-30T20:00:00+08:00");
const TILES = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

type Parts = Record<(typeof TILES)[number]["key"], number>;

function partsUntil(target: Date): Parts {
  const ms = Math.max(0, target.getTime() - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  // ponytail: mounted gate keeps first paint stable — server and client both
  // render the placeholder, so no hydration mismatch. Real clock starts post-mount.
  const [mounted, setMounted] = useState(false);
  const [parts, setParts] = useState<Parts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    setParts(partsUntil(TARGET));
    const id = setInterval(() => setParts(partsUntil(TARGET)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex flex-wrap items-stretch gap-3 sm:gap-4"
      aria-label="Time remaining until coronation night"
    >
      {TILES.map(({ key, label }) => (
        <div
          key={key}
          className="card flex-1 min-w-[74px] px-4 py-5 text-center sm:min-w-[104px] sm:px-6 sm:py-7"
        >
          <div className="font-display text-4xl sm:text-6xl text-gradient-gold tabular-nums leading-none">
            {mounted ? pad(parts[key]) : "--"}
          </div>
          <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-faint">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
