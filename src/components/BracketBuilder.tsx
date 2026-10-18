"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { MuseLook } from "@/lib/portrait";
import { portraitSvg } from "@/lib/portrait";
import type { Stage } from "@/lib/types";
import { MusePortrait } from "./MusePortrait";
import { StageBadge } from "./StageBadge";
import { ShareBar } from "./ShareBar";
import { Button } from "./ui/Button";

export type PoolMuse = {
  id: string;
  slug: string;
  name: string;
  look: MuseLook;
  sashNumber: number;
  cityName: string;
  stage: Stage;
  score: number;
};

const STORAGE_KEY = "binibini-bracket";
const SLOTS = 12;

export function BracketBuilder({ pool }: { pool: PoolMuse[] }) {
  const [mounted, setMounted] = useState(false);
  const [picks, setPicks] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const byId = new Map(pool.map((p) => [p.id, p]));
  // The 12 muses actually advancing to the coronation stage — the answer key.
  const finalistIds = new Set(
    pool.filter((p) => p.stage === "national_finalist").map((p) => p.id),
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ids = (JSON.parse(raw) as string[]).filter((id) => byId.has(id));
        setPicks(ids.slice(0, SLOTS));
      }
    } catch {
      // corrupted storage — start fresh
    }
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(picks));
  }, [picks, mounted]);

  const toggle = (id: string) => {
    setPreview(null);
    setPicks((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : p.length < SLOTS ? [...p, id] : p,
    );
  };

  const complete = picks.length === SLOTS;

  // Provisional score: how many picks are in the current national field.
  // Locks on coronation night — the crown itself is decided live.
  const hits = mounted ? picks.filter((id) => finalistIds.has(id)).length : 0;

  // ---- bracket card (canvas) -------------------------------------------
  const makeCard = async () => {
    const first = byId.get(picks[0]);
    if (!first || busy) return;
    setBusy(true);
    try {
      const canvas = canvasRef.current ?? document.createElement("canvas");
      canvasRef.current = canvas;
      canvas.width = 1080;
      canvas.height = 1350;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // backdrop
      ctx.fillStyle = "#14111b";
      ctx.fillRect(0, 0, 1080, 1350);
      // sash stripe
      ctx.save();
      ctx.translate(540, 700);
      ctx.rotate(-0.16);
      const grad = ctx.createLinearGradient(-900, 0, 900, 0);
      grad.addColorStop(0, "rgba(242,217,164,0.16)");
      grad.addColorStop(0.5, "rgba(231,194,125,0.16)");
      grad.addColorStop(1, "rgba(224,105,182,0.16)");
      ctx.fillStyle = grad;
      ctx.fillRect(-1000, -80, 2000, 160);
      ctx.restore();

      // header
      ctx.fillStyle = "#e7c27d";
      ctx.font = "bold 88px Georgia, serif";
      ctx.fillText("ANG TOP 12 KO", 60, 130);
      ctx.fillStyle = "#a89bb4";
      ctx.font = "34px Georgia, serif";
      ctx.fillText("My Binibini AI bracket · Season 01", 60, 184);

      // no.1 portrait
      const svg = portraitSvg(first.look, "portrait", `bk-${first.slug}`, first.sashNumber);
      const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
      try {
        await new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            ctx.save();
            ctx.strokeStyle = "#e7c27d";
            ctx.lineWidth = 4;
            ctx.strokeRect(58, 238, 364, 454);
            ctx.drawImage(img, 60, 240, 360, 450);
            ctx.restore();
            resolve();
          };
          img.onerror = () => reject(new Error("portrait raster failed"));
          img.src = url;
        });
      } finally {
        URL.revokeObjectURL(url);
      }

      // no.1 text
      ctx.fillStyle = "#e069b6";
      ctx.font = "bold 40px Georgia, serif";
      ctx.fillText("♛ MY CROWN PICK", 470, 300);
      ctx.fillStyle = "#f5efe2";
      let size = 62;
      ctx.font = `bold ${size}px Georgia, serif`;
      while (ctx.measureText(first.name).width > 540 && size > 34) {
        size -= 4;
        ctx.font = `bold ${size}px Georgia, serif`;
      }
      ctx.fillText(first.name, 470, 380);
      ctx.fillStyle = "#a89bb4";
      ctx.font = "34px Georgia, serif";
      ctx.fillText(`${first.cityName} · Sash No. ${first.sashNumber}`, 470, 434);
      ctx.fillStyle = "#e7c27d";
      ctx.font = "bold 40px Georgia, serif";
      ctx.fillText(`Score ${first.score.toFixed(1)}`, 470, 500);

      // divider
      ctx.fillStyle = "rgba(231,194,125,0.35)";
      ctx.fillRect(60, 740, 960, 2);

      // ranks 2..12 in two columns
      ctx.font = "32px Georgia, serif";
      picks.slice(1).forEach((id, i) => {
        const m = byId.get(id);
        if (!m) return;
        const col = i < 6 ? 0 : 1;
        const row = i % 6;
        const x = 60 + col * 500;
        const y = 800 + row * 62;
        ctx.fillStyle = "#e7c27d";
        ctx.fillText(`${i + 2}.`, x, y);
        ctx.fillStyle = "#f5efe2";
        let label = `${m.name} — ${m.cityName}`;
        while (ctx.measureText(label).width > 420 && label.length > 8) {
          label = label.slice(0, -2);
        }
        ctx.fillText(label, x + 56, y);
      });

      // footer
      ctx.fillStyle = "#7d7089";
      ctx.font = "30px Georgia, serif";
      ctx.fillText("binibiniai.com/bracket · gawa mo rin ang sa'yo", 60, 1290);
      ctx.fillStyle = "#e7c27d";
      ctx.fillText("AI · BINIBINI", 850, 1290);

      setPreview(canvas.toDataURL("image/png"));
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!preview) return;
    const a = document.createElement("a");
    a.href = preview;
    a.download = "ang-top-12-ko.png";
    a.click();
  };

  const shareCard = async () => {
    const canvas = canvasRef.current;
    if (!canvas || typeof navigator === "undefined" || !("share" in navigator)) return;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], "ang-top-12-ko.png", { type: "image/png" });
      const data = { files: [file], title: "Ang Top 12 Ko — Binibini AI" };
      try {
        if (navigator.canShare?.(data)) await navigator.share(data);
      } catch {
        // user dismissed the share sheet — nothing to do
      }
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      {/* ---- pool ---- */}
      <div>
        <p className="text-xs uppercase tracking-wide text-gold-deep mb-4">
          Tap to pick — order is your ranking
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {pool.map((m) => {
            const idx = picks.indexOf(m.id);
            const picked = idx >= 0;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => toggle(m.id)}
                aria-pressed={picked}
                className={`group card overflow-hidden text-left transition-all duration-300 ${
                  picked
                    ? "border-gold shadow-[0_0_24px_-8px_rgba(231,194,125,0.5)]"
                    : mounted && picks.length >= SLOTS
                      ? "opacity-45"
                      : "hover:-translate-y-0.5"
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <MusePortrait
                    look={m.look}
                    uid={`bk-${m.id}`}
                    name={m.name}
                    sash={m.sashNumber}
                    className="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                  {picked && (
                    <span className="absolute top-2 left-2 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-gold-bright to-gold font-display text-lg font-bold text-ink">
                      {idx + 1}
                    </span>
                  )}
                  <div className="absolute top-2 right-2">
                    <StageBadge stage={m.stage} />
                  </div>
                  <div className="absolute bottom-0 p-3">
                    <p className="font-display text-sm leading-tight">{m.name}</p>
                    <p className="text-[11px] text-mist">{m.cityName}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---- slots ---- */}
      <div className="lg:sticky lg:top-24 h-fit">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">Your Top 12</h2>
            <span className="font-display text-lg text-gradient-gold tabular-nums">
              {mounted ? picks.length : 0}/{SLOTS}
            </span>
          </div>

          <ol className="mt-4 space-y-1.5">
            {Array.from({ length: SLOTS }, (_, i) => {
              const m = mounted && picks[i] ? byId.get(picks[i]) : undefined;
              return (
                <li key={i}>
                  {m ? (
                    <button
                      type="button"
                      onClick={() => toggle(m.id)}
                      className="flex w-full items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-3 py-2 text-left hover:border-orchid/60"
                      title="Tap to remove"
                    >
                      <span className={`w-6 text-center font-display tabular-nums ${i === 0 ? "text-gold-bright" : "text-faint"}`}>
                        {i === 0 ? "♛" : i + 1}
                      </span>
                      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-line">
                        <MusePortrait look={m.look} uid={`slot-${m.id}`} name={m.name} className="absolute inset-0" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm">{m.name}</span>
                        <span className="block truncate text-[11px] text-faint">{m.cityName}</span>
                      </span>
                      <span className="text-xs text-faint">✕</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl border border-dashed border-line px-3 py-2 text-faint">
                      <span className="w-6 text-center font-display tabular-nums">{i + 1}</span>
                      <span className="text-xs">Open slot</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="mt-5 space-y-3">
            <Button
              onClick={makeCard}
              disabled={!complete || busy}
              className="w-full"
            >
              {busy ? "Rendering…" : complete ? "Get your bracket card" : `Pick ${SLOTS - (mounted ? picks.length : 0)} more`}
            </Button>
            {mounted && picks.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setPicks([]);
                  setPreview(null);
                }}
                className="w-full text-center text-xs text-faint hover:text-cream"
              >
                Reset bracket
              </button>
            )}
          </div>
        </div>

        {mounted && picks.length > 0 && (
          <div className="card mt-4 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gold-deep">
                  Live accuracy preview
                </p>
                <p className="mt-1 text-sm text-mist">
                  Your picks in the current national field.
                </p>
              </div>
              <span className="font-display text-3xl text-gradient-gold tabular-nums">
                {hits}/{SLOTS}
              </span>
            </div>
            <p className="mt-3 text-xs text-faint">
              Provisional — the field still moves and the crown is decided live. Your
              score locks on{" "}
              <Link href="/coronation" className="text-gold-bright hover:text-gold">
                coronation night
              </Link>
              .
            </p>
            <div className="mt-3">
              <ShareBar
                small
                title={`My Binibini AI bracket is matching ${hits}/${SLOTS} of the current national field (provisional) —`}
                path="/bracket"
              />
            </div>
          </div>
        )}

        {preview && (
          <div className="card mt-4 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Your Top 12 bracket card" className="w-full rounded-xl border border-line" />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button onClick={download} size="sm">
                Download PNG
              </Button>
              <Button onClick={shareCard} size="sm" variant="outline">
                Share
              </Button>
              <ShareBar small title="Ang Top 12 Ko — Binibini AI" path="/bracket" />
            </div>
            <p className="mt-3 text-xs text-faint">
              Post it, tag your kada, and defend your No. 1. Scores lock on coronation night —{" "}
              <Link href="/coronation" className="text-gold-bright hover:text-gold">
                Aug 30
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
