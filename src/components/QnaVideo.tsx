"use client";

import { useState } from "react";
import type { QnA } from "@/lib/types";
import type { MuseLook } from "@/lib/portrait";
import { MusePortrait } from "./MusePortrait";

type Props = {
  look: MuseLook;
  uid: string;
  sash?: number;
  name: string;
  tools: string[];
  qna: QnA[];
};

export function QnaVideo({ look, uid, sash, name, tools, qna }: Props) {
  const [state, setState] = useState<"idle" | "loading" | "playing">("idle");
  const [active, setActive] = useState(0);

  const play = () => {
    setState("loading");
    // ponytail: demo has no real video file — simulate the render/stream
    setTimeout(() => setState("playing"), 900);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-line">
        <MusePortrait look={look} uid={`qna-${uid}`} name={name} sash={sash} mode="stage" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-ink/30" />

        {state === "playing" ? (
          <div className="absolute inset-0 flex items-end p-5">
            <div className="w-full">
              <div className="mb-3 flex items-center gap-2 text-xs text-orchid-bright">
                <span className="h-2 w-2 rounded-full bg-orchid animate-[twinkle_1.4s_ease-in-out_infinite]" />
                AI-generated response · streaming
              </div>
              <p className="font-display text-lg leading-snug">
                &ldquo;{qna[active]?.answer.slice(0, 120)}…&rdquo;
              </p>
              <div className="mt-3 h-1 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-gold to-orchid animate-marquee" />
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={play}
            className="absolute inset-0 grid place-items-center group"
            aria-label="Play AI Q&A"
          >
            <span className="grid place-items-center h-16 w-16 rounded-full bg-gold/90 text-ink text-2xl transition-transform group-hover:scale-110">
              {state === "loading" ? "◌" : "▶"}
            </span>
          </button>
        )}

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {tools.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-ink/70 backdrop-blur px-2 py-0.5 text-[10px] text-mist border border-line">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-gold-deep mb-2">Q&amp;A Transcript</p>
        {qna.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              setActive(i);
              if (state === "idle") play();
            }}
            className={`block w-full text-left rounded-xl border px-4 py-3 transition-colors ${
              active === i ? "border-gold bg-gold/5" : "border-line hover:border-line"
            }`}
          >
            <p className="text-sm font-medium text-cream">{item.question}</p>
            <p className="mt-1 text-xs text-mist line-clamp-2">{item.answer}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
