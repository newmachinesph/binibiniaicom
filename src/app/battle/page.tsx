import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { BattleLive } from "@/components/BattleLive";
import { REGIONS } from "@/lib/cities";
import { contestantsByRegion } from "@/lib/data";
import { REGION_HUES } from "@/lib/portrait";

export const metadata: Metadata = {
  title: "Battle of the Regions — Binibini AI",
  description:
    "Laban ng mga rehiyon. All 17 Philippine regions ranked live by the strength of their AI contestants — see who leads, who's rising, and tonight's matchup.",
};

const hueOf = (regionId: string) => REGION_HUES[regionId] ?? 45;

// Base rosters per region — the live ranking + strength is computed client-side
// from session votes in BattleLive.
const regionRosters = REGIONS.map((region) => ({
  region,
  roster: contestantsByRegion(region.id),
  hue: hueOf(region.id),
}));

export default function BattlePage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-14 sm:pt-24">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
                Laban ng mga Rehiyon
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 font-display text-5xl sm:text-6xl md:text-7xl leading-[0.98] tracking-tight">
                Battle of the
                <br />
                <span className="text-gradient-gold italic">Regions.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg text-mist leading-relaxed">
                Ipaglaban ang rehiyon mo. Seventeen regions, one national
                standing — every free vote for your muse lifts your entire
                region up this board. Cebu, Davao, Manila: lahat may laban dito.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- LIVE MATCHUP + REGIONAL LEADERBOARD ---------------- */}
      <BattleLive regions={regionRosters} />

      {/* ---------------- HOW STRENGTH IS SCORED + CTA ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="card h-full p-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
                How strength is scored
              </p>
              <h3 className="mt-3 font-display text-2xl">Top three carry the flag.</h3>
              <p className="mt-3 text-sm text-mist leading-relaxed">
                Each region&apos;s strength is the average final score of its
                three highest-scoring delegates — judges panel, public vote, and
                social sentiment combined. Deep benches win wars: one star
                helps, three queens conquer.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-gold/8 via-ink to-orchid/8 p-8 sm:p-10 flex flex-col justify-center">
              <h3 className="font-display text-3xl sm:text-4xl leading-tight">
                Dalhin mo ang rehiyon mo{" "}
                <span className="text-gradient-gold italic">sa tuktok.</span>
              </h3>
              <p className="mt-3 max-w-md text-mist leading-relaxed">
                Every vote is free and every vote counts twice — for your muse,
                and for the region on her sash.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/vote" size="lg">
                  Vote for your region →
                </Button>
                <Button href="/cities" size="lg" variant="outline">
                  Explore the cities
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
