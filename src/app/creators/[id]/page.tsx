import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreatorMark } from "@/components/CreatorMark";
import { CREATORS, creatorById, contestantsByCreator } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { ContestantCard } from "@/components/ContestantCard";

export function generateStaticParams() {
  return CREATORS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const creator = creatorById(id);
  if (!creator) return { title: "Creator — Binibini AI" };
  return {
    title: `${creator.name} · ${creator.handle} — Binibini AI`,
    description: `${creator.name} builds AI contestants for Binibini AI. ${creator.bio}`,
  };
}

export default async function CreatorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const creator = creatorById(id);
  if (!creator) notFound();

  const muses = contestantsByCreator(id);
  const topStage = muses.reduce(
    (best, m) => (m.stage === "national_finalist" ? best + 1 : best),
    0,
  );
  const cities = new Set(muses.map((m) => m.cityId)).size;

  const stats = [
    { label: "Contestants entered", value: `${muses.length}` },
    { label: "Cities represented", value: `${cities}` },
    { label: "National finalists", value: `${topStage}` },
    { label: "Studio since", value: `${creator.joinedYear}` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
      {/* ---- header ---- */}
      <Reveal>
        <div className="card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
            <CreatorMark name={creator.name} uid={creator.id} size={96} />
            <div className="flex-1">
              <h1 className="font-display text-3xl sm:text-4xl leading-tight">{creator.name}</h1>
              <p className="mt-1 text-sm">
                <span className="text-gold-deep">{creator.handle}</span>
                <span className="text-faint"> · {creator.location} · joined {creator.joinedYear}</span>
              </p>
              <p className="mt-3 text-mist leading-relaxed max-w-2xl">{creator.bio}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {stats.map((s) => (
              <div key={s.label} className="bg-ink px-5 py-5">
                <p className="font-display text-3xl text-gradient-gold tabular-nums">{s.value}</p>
                <p className="mt-0.5 text-xs text-faint">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---- muses ---- */}
      <section className="mt-14">
        <Reveal>
          <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
            <h2 className="font-display text-2xl sm:text-3xl">Their muses</h2>
            <Button href="/join" variant="outline" size="sm">
              Start your own studio →
            </Button>
          </div>
        </Reveal>

        {muses.length === 0 ? (
          <Reveal>
            <div className="card p-10 text-center">
              <p className="text-mist">No muses on the roster yet.</p>
              <p className="mt-1 text-sm text-faint">This studio&apos;s first audition is still to come.</p>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {muses.map((c, i) => (
              <Reveal key={c.id} delay={(i % 4) * 0.06}>
                <ContestantCard contestant={c} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ---- CTA ---- */}
      <section className="mt-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-gold/5 via-ink to-orchid/10 p-8 sm:p-12 text-center">
            <h2 className="font-display text-2xl sm:text-3xl">Building muses of your own?</h2>
            <p className="mx-auto mt-3 max-w-xl text-mist">
              Enter your AI contestant in any city and join the studios competing for the first Binibini AI crown.
            </p>
            <div className="mt-6">
              <Button href="/join" size="lg">
                Start your own studio →
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
