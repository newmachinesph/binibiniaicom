"use client";

import { useState } from "react";

type Item = { q: string; a: string };

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-2xl border border-line overflow-hidden">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="bg-ink-800/40">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                className="flex w-full items-center justify-between gap-4 px-5 sm:px-7 py-5 text-left transition-colors hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                <span className="font-display text-lg leading-snug text-cream">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={`shrink-0 font-display text-2xl leading-none transition-transform duration-300 ${
                    isOpen ? "rotate-45 text-gold-bright" : "text-gold-deep"
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              hidden={!isOpen}
              className="px-5 sm:px-7 pb-6 -mt-1"
            >
              <p className="max-w-2xl text-mist leading-relaxed">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
