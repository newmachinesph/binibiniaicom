import type { Metadata } from "next";
import { CONTESTANTS } from "@/lib/data";
import { cityById } from "@/lib/cities";
import { finalScore } from "@/lib/scoring";
import { SectionHeading } from "@/components/SectionHeading";
import { BracketBuilder, type PoolMuse } from "@/components/BracketBuilder";

export const metadata: Metadata = {
  title: "Ang Top 12 Ko — Binibini AI",
  description:
    "Build your own Top 12 bracket, download your card, and post your bets before coronation night locks the scores.",
};

export default function BracketPage() {
  const pool: PoolMuse[] = CONTESTANTS.filter(
    (c) => c.stage === "national_finalist" || c.stage === "regional",
  )
    .map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      look: c.look,
      sashNumber: c.sashNumber,
      cityName: cityById(c.cityId)?.name ?? "",
      stage: c.stage,
      score: Number(finalScore(c.scores).toFixed(1)),
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
      <SectionHeading
        eyebrow="The Prediction Game"
        title={
          <>
            Ang Top 12 <span className="text-gradient-gold italic">Ko.</span>
          </>
        }
        description="Pick the twelve muses you believe walk on coronation night — your order is your ranking. Download your bracket card, post your bets, and let the group chat argue."
      />
      <p className="mt-4 text-sm text-faint">
        {pool.length} regional and national finalists are eligible. Your bracket lives in this
        browser only — free, no sign-in, walang bayad.
      </p>
      <div className="mt-10">
        <BracketBuilder pool={pool} />
      </div>
    </div>
  );
}
