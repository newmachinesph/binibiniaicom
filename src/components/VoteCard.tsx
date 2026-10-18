"use client";

import { useState } from "react";
import { portraitSvg, type MuseLook } from "@/lib/portrait";
import { Button } from "@/components/ui/Button";

type Props = {
  name: string;
  slug: string;
  look: MuseLook;
  sashNumber: number;
  cityName: string;
};

const W = 1080;
const H = 1350;
const GOLD = "#e7c27d";
const ORCHID = "#e069b6";
const CREAM = "#f5efe2";

function fitText(ctx: CanvasRenderingContext2D, text: string, px: number, maxW: number) {
  let size = px;
  ctx.font = `${size}px Georgia, serif`;
  while (ctx.measureText(text).width > maxW && size > 28) {
    size -= 2;
    ctx.font = `${size}px Georgia, serif`;
  }
}

async function renderCard({ name, slug, look, sashNumber, cityName }: Props): Promise<string> {
  // rasterize the procedural SVG portrait (self-contained → canvas stays untainted)
  const svg = portraitSvg(look, "portrait", `vc-${slug}`, sashNumber);
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const objectUrl = URL.createObjectURL(blob);
  const img = new Image();
  try {
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("portrait failed to load"));
      img.src = objectUrl;
    });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas unsupported");

  // dark bg
  ctx.fillStyle = "#14111b";
  ctx.fillRect(0, 0, W, H);

  // portrait, cover-cropped into the top frame
  const frame = { x: 90, y: 80, w: 900, h: 720 };
  const scale = Math.max(frame.w / img.width, frame.h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.save();
  ctx.beginPath();
  ctx.rect(frame.x, frame.y, frame.w, frame.h);
  ctx.clip();
  ctx.drawImage(img, frame.x + (frame.w - dw) / 2, frame.y + (frame.h - dh) / 2, dw, dh);
  ctx.restore();
  ctx.strokeStyle = "rgba(231,194,125,0.35)";
  ctx.lineWidth = 3;
  ctx.strokeRect(frame.x, frame.y, frame.w, frame.h);

  // diagonal gold→orchid sash stripe behind the headline
  const grad = ctx.createLinearGradient(0, 860, W, 1140);
  grad.addColorStop(0, GOLD);
  grad.addColorStop(1, ORCHID);
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(0, 905);
  ctx.lineTo(W, 835);
  ctx.lineTo(W, 1005);
  ctx.lineTo(0, 1075);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // text
  ctx.textAlign = "center";
  ctx.fillStyle = GOLD;
  ctx.font = "bold 88px Georgia, serif";
  ctx.fillText("BUMOTO AKO ♥", W / 2, 985);

  ctx.fillStyle = CREAM;
  fitText(ctx, `I voted for ${name}`, 54, 960);
  ctx.fillText(`I voted for ${name}`, W / 2, 1075);

  ctx.fillStyle = ORCHID;
  fitText(ctx, `${cityName} · Sash No. ${sashNumber}`, 40, 960);
  ctx.fillText(`${cityName} · Sash No. ${sashNumber}`, W / 2, 1150);

  ctx.fillStyle = "rgba(245,239,226,0.55)";
  ctx.font = "34px Georgia, serif";
  ctx.fillText("binibiniai.com · vote free daily", W / 2, 1270);

  // AI-disclosure tag painted onto the card itself — independent of the cropped
  // portrait watermark, so every share card visibly discloses it is AI.
  const tag = "AI creation · binibiniai.com";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = "600 26px Arial, sans-serif";
  const tagX = frame.x + 20;
  const tagY = frame.y + 20;
  const tagH = 46;
  const tagW = ctx.measureText(tag).width + 52;
  ctx.fillStyle = "rgba(15,13,20,0.82)";
  ctx.beginPath();
  ctx.roundRect(tagX, tagY, tagW, tagH, 23);
  ctx.fill();
  ctx.strokeStyle = "rgba(58,51,70,0.9)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = ORCHID;
  ctx.beginPath();
  ctx.arc(tagX + 22, tagY + tagH / 2, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = GOLD;
  ctx.fillText(tag, tagX + 36, tagY + tagH / 2 + 1);

  return canvas.toDataURL("image/png");
}

export function VoteCard(props: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const fileName = `bumoto-ako-${props.slug}.png`;

  const generate = async () => {
    setBusy(true);
    try {
      setDataUrl(await renderCard(props));
    } catch {
      // canvas/svg hiccup — nothing to show
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = fileName;
    a.click();
  };

  const share = async () => {
    if (!dataUrl) return;
    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], fileName, { type: "image/png" });
      if (typeof navigator !== "undefined" && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: `Bumoto Ako — ${props.name}` });
      } else {
        download();
      }
    } catch {
      // user cancelled the share sheet — fine
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={generate} disabled={busy}>
        {busy ? "Preparing…" : "Get your “Bumoto Ako” card"}
      </Button>

      {dataUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 backdrop-blur-sm p-5"
          role="dialog"
          aria-label="Bumoto Ako card preview"
          onClick={() => setDataUrl(null)}
        >
          <div className="card p-5 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <p className="text-xs uppercase tracking-wide text-gold-deep mb-3">
              Your &ldquo;Bumoto Ako&rdquo; card
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dataUrl}
              alt={`Bumoto Ako card for ${props.name}`}
              className="w-full rounded-xl border border-line"
            />
            <div className="mt-4 flex items-center gap-2">
              <Button size="sm" onClick={download}>
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={share}>
                Share
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setDataUrl(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
