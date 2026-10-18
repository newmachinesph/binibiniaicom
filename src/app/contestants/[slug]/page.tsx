import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONTESTANTS, contestantBySlug, creatorById } from "@/lib/data";
import { cityById, regionById } from "@/lib/cities";
import { MusePortrait } from "@/components/MusePortrait";
import { CreatorMark } from "@/components/CreatorMark";
import { StageBadge } from "@/components/StageBadge";
import { VoteButton } from "@/components/VoteButton";
import { ShareBar } from "@/components/ShareBar";
import { VoteCard } from "@/components/VoteCard";
import { LiveScorePanel } from "@/components/LiveScorePanel";
import { RoundScorecard } from "@/components/RoundScorecard";
import { QnaVideo } from "@/components/QnaVideo";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return CONTESTANTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = contestantBySlug(slug);
  if (!c) return { title: "Contestant — Binibini AI" };
  return {
    title: `${c.name} — Binibini AI`,
    description: `${c.name} represents ${cityById(c.cityId)?.name}. ${c.tagline}`,
  };
}

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

export default async function ContestantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = contestantBySlug(slug);
  if (!c) notFound();

  const city = cityById(c.cityId);
  const region = regionById(c.regionId);
  const creator = creatorById(c.creatorId);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
      <nav className="text-sm text-faint mb-6 flex items-center gap-2">
        <Link href="/contestants" className="hover:text-cream">Contestants</Link>
        <span>/</span>
        <span className="text-mist">{city?.name}</span>
      </nav>

      {/* ---- hero ---- */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="space-y-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
              <MusePortrait look={c.look} uid={`hero-${c.id}`} name={c.name} sash={c.sashNumber} className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <span className="absolute top-4 left-4 rounded-full bg-ink/70 backdrop-blur px-3 py-1 text-sm font-medium text-gold-bright border border-line">
                No. {c.sashNumber}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                <MusePortrait look={c.look} uid={`ed-${c.id}`} name={c.name} mode="editorial" className="absolute inset-0" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                <MusePortrait look={c.look} uid={`st-${c.id}`} name={c.name} sash={c.sashNumber} mode="stage" className="absolute inset-0" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <div className="flex items-center gap-3">
              <StageBadge stage={c.stage} />
              <span className="text-sm text-mist">
                {city?.name} · {region?.short}
              </span>
            </div>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-[1.02]">{c.name}</h1>
            <p className="mt-3 text-lg text-mist italic font-display">&ldquo;{c.tagline}&rdquo;</p>

            {creator && (
              <Link
                href={`/creators/${creator.id}`}
                className="mt-5 inline-flex items-center gap-3 rounded-full border border-line px-3 py-2 hover:border-gold transition-colors"
              >
                <CreatorMark name={creator.name} uid={creator.id} size={32} />
                <span className="text-sm">
                  <span className="text-faint">Built by </span>
                  <span className="text-cream">{creator.name}</span>
                  <span className="text-gold-deep"> · {creator.handle}</span>
                </span>
              </Link>
            )}

            <p className="mt-5 text-mist leading-relaxed">{c.bio}</p>

            {/* social stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Followers", value: fmt(c.followers) },
                { label: "Engagement", value: `${c.engagementRate}%` },
                { label: "Votes", value: fmt(c.votes) },
              ].map((s) => (
                <div key={s.label} className="card px-4 py-3 text-center">
                  <p className="font-display text-2xl text-gradient-gold tabular-nums">{s.value}</p>
                  <p className="text-xs text-faint">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <VoteButton contestantId={c.id} size="lg" />
              <span className="text-sm text-faint">Free · no sign-in · attention only</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <ShareBar
                title={`Vote ${c.name} — Binibini AI`}
                path={`/contestants/${c.slug}`}
              />
              <VoteCard
                name={c.name}
                slug={c.slug}
                look={c.look}
                sashNumber={c.sashNumber}
                cityName={city?.name ?? ""}
              />
            </div>
          </div>
        </Reveal>
      </div>

      {/* ---- score + advocacy ---- */}
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <LiveScorePanel contestant={c} />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="card p-6 h-full">
            <p className="text-xs uppercase tracking-wide text-gold-deep">Her Advocacy</p>
            <h3 className="mt-2 font-display text-2xl text-gold-bright">{c.advocacy}</h3>
            <p className="mt-3 text-mist leading-relaxed">{c.advocacyBlurb}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {c.aiTools.map((t) => (
                <span key={t} className="rounded-full border border-line px-2.5 py-1 text-xs text-mist">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ---- round scorecard ---- */}
      <div className="mt-6">
        <Reveal>
          <RoundScorecard contestant={c} />
        </Reveal>
      </div>

      {/* ---- Q&A video ---- */}
      <div className="mt-14">
        <Reveal>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl sm:text-3xl">The AI Q&amp;A Round</h2>
            <span className="text-xs text-faint">
              {c.hasVideo ? "AI-generated video · submitted by creator" : "Transcript only"}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <QnaVideo look={c.look} uid={c.id} sash={c.sashNumber} name={c.name} tools={c.aiTools} qna={c.qna} />
        </Reveal>
      </div>

      <div className="mt-14 pt-8 border-t border-line">
        <Link href="/contestants" className="text-gold-bright hover:text-gold text-sm">
          ← Back to all contestants
        </Link>
      </div>
    </div>
  );
}
