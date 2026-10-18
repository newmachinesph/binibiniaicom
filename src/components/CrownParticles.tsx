"use client";

import { useEffect, useRef } from "react";

/**
 * Signature hero moment: a crown assembled from ~700 drifting particles.
 * Beauty assembled from data — the metaphor is the product.
 * Canvas 2D, no deps. Honors prefers-reduced-motion (renders static).
 */

type P = {
  hx: number; // home
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  tw: number; // twinkle phase
  gold: boolean;
};

// crown outline in a 560x430 local space
function crownPoints(): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  const poly = [
    [60, 360], [60, 150], [170, 275], [280, 65], [390, 275], [500, 150], [500, 360],
  ];
  // outline segments
  for (let s = 0; s < poly.length - 1; s++) {
    const [x1, y1] = poly[s];
    const [x2, y2] = poly[s + 1];
    const len = Math.hypot(x2 - x1, y2 - y1);
    const n = Math.max(8, Math.floor(len / 4.5));
    for (let i = 0; i <= n; i++) {
      pts.push({ x: x1 + ((x2 - x1) * i) / n, y: y1 + ((y2 - y1) * i) / n });
    }
  }
  // base band (double line)
  for (const yy of [385, 408]) {
    for (let i = 0; i <= 90; i++) pts.push({ x: 60 + (440 * i) / 90, y: yy });
  }
  // gems on the three tips
  for (const [cx, cy] of [
    [280, 48], [60, 132], [500, 132],
  ]) {
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2;
      const r = 14 + (i % 3) * 3;
      pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
    }
  }
  return pts;
}

export function CrownParticles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    let mx = -9999;
    let my = -9999;
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };

    const base = crownPoints();
    let parts: P[] = [];
    let W = 0;
    let H = 0;

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scale = Math.min(W / 640, H / 520);
      const ox = (W - 560 * scale) / 2;
      const oy = (H - 430 * scale) / 2;
      parts = base.map((p) => ({
        hx: ox + p.x * scale + (rnd() - 0.5) * 3,
        hy: oy + p.y * scale + (rnd() - 0.5) * 3,
        x: rnd() * W,
        y: rnd() * H,
        vx: 0,
        vy: 0,
        r: 0.8 + rnd() * 1.5,
        tw: rnd() * Math.PI * 2,
        gold: rnd() > 0.22,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        // spring home
        p.vx += (p.hx - p.x) * 0.012;
        p.vy += (p.hy - p.y) * 0.012;
        // mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < 8100) {
          const d = Math.sqrt(d2) || 1;
          const f = ((90 - d) / 90) * 1.6;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        const a = 0.35 + 0.55 * Math.abs(Math.sin(t / 900 + p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(231,194,125,${a})`
          : `rgba(224,105,182,${a})`;
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        ctx.beginPath();
        ctx.arc(p.hx, p.hy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? "rgba(231,194,125,0.7)" : "rgba(224,105,182,0.7)";
        ctx.fill();
      }
    };

    layout();
    if (reduce) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };
    const onResize = () => {
      layout();
      if (reduce) drawStatic();
    };
    const onVis = () => {
      running = !document.hidden && !reduce;
      if (running) raf = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
