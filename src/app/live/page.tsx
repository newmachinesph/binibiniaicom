import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { LiveShow, type LiveFinalist } from "@/components/LiveShow";
import { NATIONAL_FINALISTS } from "@/lib/data";
import { cityById } from "@/lib/cities";
import { finalScore } from "@/lib/scoring";

export const metadata: Metadata = {
  title: "Live — Binibini AI",
  description:
    "The Live Room — a real-time simulation of how coronation night will play: scores tick, segments advance, the crown decides. Season 01 preview.",
};

const finalists: LiveFinalist[] = NATIONAL_FINALISTS.map((c) => ({
  id: c.id,
  slug: c.slug,
  name: c.name,
  look: c.look,
  sashNumber: c.sashNumber,
  cityName: cityById(c.cityId)?.name ?? "",
  baseScore: Math.round(finalScore(c.scores) * 10) / 10,
})).sort((a, b) => b.baseScore - a.baseScore);

export default function LivePage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-10">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
            Coronation Preview
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl leading-[0.98] tracking-tight">
            The <span className="text-gradient-gold italic">Live Room</span>
          </h1>
          <p className="mt-4 max-w-xl text-mist leading-relaxed">
            A real-time simulation of how coronation night will play — scores
            tick, segments advance, the crown decides.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-orchid/40 bg-orchid/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-orchid-bright">
            Simulation · Season 01 preview
          </span>
        </Reveal>
      </section>

      <LiveShow finalists={finalists} />
    </>
  );
}
