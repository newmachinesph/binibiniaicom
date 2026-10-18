import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MusePortrait } from "@/components/MusePortrait";
import { CITIES, regionById } from "@/lib/cities";
import { contestantsByCity, cityAdvancer } from "@/lib/data";
import { finalScore } from "@/lib/scoring";
import { STAGE_LABEL } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { StageBadge } from "@/components/StageBadge";
import { ContestantCard } from "@/components/ContestantCard";
import { VoteButton } from "@/components/VoteButton";
import { ShareBar } from "@/components/ShareBar";

export function generateStaticParams() {
  return CITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = CITIES.find((c) => c.slug === slug);
  if (!city) return { title: "City — Binibini AI" };
  const advancer = cityAdvancer(city.id);
  return {
    title: `${city.name} — Binibini AI`,
    description: advancer
      ? `${advancer.name} is advancing for ${city.name}. Meet every audition from the city.`
      : `${city.name}'s crown is open. Enter your AI contestant and represent the city.`,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = CITIES.find((c) => c.slug === slug);
  if (!city) notFound();

  const region = regionById(city.regionId);
  const contestants = contestantsByCity(city.id);
  const advancer = cityAdvancer(city.id);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
      <nav className="text-sm text-faint mb-6 flex items-center gap-2">
        <Link href="/cities" className="hover:text-cream">The Map</Link>
        <span>/</span>
        <span className="text-mist">{region?.short}</span>
      </nav>

      <header>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
          {region?.name} · {region?.short}
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl leading-[1.0]">{city.name}</h1>
      </header>

      {contestants.length > 0 && advancer ? (
        <>
          {/* ---- spotlight: advancing muse ---- */}
          <div className="mt-10">
            <Reveal>
              <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] card overflow-hidden p-4 sm:p-6">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
                  <MusePortrait
                    look={advancer.look}
                    uid={`spot-${advancer.id}`}
                    name={advancer.name}
                    sash={advancer.sashNumber}
                    className="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-ink/70 backdrop-blur px-3 py-1 text-sm font-medium text-gold-bright border border-line">
                    No. {advancer.sashNumber}
                  </span>
                  <span className="absolute bottom-4 left-4 rounded-full bg-gradient-to-r from-gold-bright to-gold px-4 py-1.5 text-xs font-bold text-ink">
                    ♛ Advancing from {city.name}
                  </span>
                </div>

                <div className="flex flex-col justify-center">
                  <StageBadge stage={advancer.stage} />
                  <h2 className="mt-3 font-display text-3xl sm:text-4xl leading-[1.02]">
                    {advancer.name}
                  </h2>
                  <p className="mt-3 text-lg text-mist italic font-display">
                    &ldquo;{advancer.tagline}&rdquo;
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="card px-4 py-3 text-center">
                      <p className="font-display text-2xl text-gradient-gold tabular-nums">
                        {finalScore(advancer.scores).toFixed(1)}
                      </p>
                      <p className="text-xs text-faint">Final score</p>
                    </div>
                    <div className="card px-4 py-3 text-center">
                      <p className="font-display text-2xl text-gradient-gold">
                        {STAGE_LABEL[advancer.stage]}
                      </p>
                      <p className="text-xs text-faint">Current stage</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <VoteButton contestantId={advancer.id} size="lg" />
                    <Button href={`/contestants/${advancer.slug}`} variant="outline">
                      View her profile →
                    </Button>
                  </div>
                  <div className="mt-4">
                    <ShareBar
                      title={`${advancer.name} — Reyna ng ${city.name} | Binibini AI`}
                      path={`/cities/${city.slug}`}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---- all auditions ---- */}
          <div className="mt-14">
            <Reveal>
              <div className="mb-6">
                <h2 className="font-display text-2xl sm:text-3xl">
                  All auditions in {city.name}
                </h2>
                <p className="mt-2 text-sm text-mist">
                  Multiple creators can audition per city — only one muse advances to the
                  regional stage.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {contestants.map((c, i) => (
                <Reveal key={c.id} delay={(i % 4) * 0.06}>
                  <ContestantCard contestant={c} />
                </Reveal>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* ---- empty state ---- */
        <Reveal>
          <div className="mt-12 card p-10 sm:p-16 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-orchid">
              Crown open
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl leading-tight">
              No muse has claimed
              <br />
              {city.name} yet.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-mist leading-relaxed">
              This city&apos;s crown is still open. Be the first creator to field an AI contestant
              for {city.name} and carry the hometown into the regional stage.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/join" size="lg">
                Represent {city.name} →
              </Button>
            </div>
          </div>
        </Reveal>
      )}

      <div className="mt-14 pt-8 border-t border-line">
        <Link href="/cities" className="text-gold-bright hover:text-gold text-sm">
          ← Back to the map
        </Link>
      </div>
    </div>
  );
}
