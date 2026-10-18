import Link from "next/link";
import { MusePortrait } from "@/components/MusePortrait";
import { CrownParticles } from "@/components/CrownParticles";
import { CONTESTANTS, STATS } from "@/lib/data";
import { TOTAL_PH_CITIES } from "@/lib/cities";
import { finalScore, WEIGHT_LABELS } from "@/lib/scoring";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ContestantCard } from "@/components/ContestantCard";

const topContestants = [...CONTESTANTS].sort(
  (a, b) => finalScore(b.scores) - finalScore(a.scores),
);
const marquee = topContestants.slice(0, 14);
const featured = topContestants.slice(0, 8);

const PIPELINE = [
  { n: "01", title: "Audition", body: "Creators enter their AI contestant in any city. Multiple auditions per city — the crowd and panel react." },
  { n: "02", title: "City Crown", body: "One muse advances per city. 149 cities, 149 local queens carrying their hometown." },
  { n: "03", title: "Regional", body: "City queens battle within all 17 regions. Exactly one finalist emerges per region — the region's strongest city winner carries it forward." },
  { n: "04", title: "Coronation", body: "12 national finalists. One live AI Q&A. One crown: the first Binibini AI." },
];

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return Math.round(n / 1_000) + "K";
  return String(n);
}

export default function HomePage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] md:block"
          aria-hidden="true"
        >
          <CrownParticles className="h-full w-full" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-14 sm:pt-28">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs text-mist">
                <span className="h-1.5 w-1.5 rounded-full bg-orchid animate-[twinkle_2s_ease-in-out_infinite]" />
                Season 01 · Live now · {STATS.contestants} contestants competing
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl leading-[0.98] tracking-tight">
                The Philippines&apos; first
                <br />
                <span className="text-gradient-gold italic">AI beauty pageant.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 font-display text-xl sm:text-2xl italic text-gold-bright">
                Bawat lungsod, may reyna.{" "}
                <span className="text-base not-italic text-mist">
                  — every city has a queen.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg text-mist leading-relaxed">
                {TOTAL_PH_CITIES} cities. One crown. Every contestant is an AI creation built and
                operated by a Filipino creator — competing from audition to coronation, judged by
                four voices: expert panel, public vote, judged craft & originality, and social sentiment.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/contestants" size="lg">
                  Meet the contestants →
                </Button>
                <Button href="/join" size="lg" variant="outline">
                  Enter your AI contestant
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* portrait marquee */}
        <div className="relative w-full overflow-hidden py-2">
          <div className="flex w-max animate-marquee gap-4 px-2">
            {[...marquee, ...marquee].map((c, i) => (
              <Link
                key={`${c.id}-${i}`}
                href={`/contestants/${c.slug}`}
                className="group relative h-56 w-44 shrink-0 overflow-hidden rounded-2xl border border-line"
              >
                <MusePortrait
                  look={c.look}
                  uid={`mq-${c.id}-${i}`}
                  name={c.name}
                  sash={c.sashNumber}
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
                <div className="absolute bottom-0 p-3">
                  <p className="font-display text-sm leading-tight">{c.name}</p>
                  <p className="text-[11px] text-gold-bright">No. {c.sashNumber}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {[
            { label: "Cities represented", value: `${STATS.activeCities}`, sub: `of ${TOTAL_PH_CITIES}` },
            { label: "AI contestants", value: `${STATS.contestants}`, sub: "and counting" },
            { label: "Creator studios", value: `${STATS.creators}`, sub: "nationwide" },
            { label: "Votes cast", value: fmt(STATS.totalVotes), sub: "100% free" },
          ].map((s) => (
            <div key={s.label} className="bg-ink px-6 py-8">
              <p className="font-display text-4xl text-gradient-gold tabular-nums">{s.value}</p>
              <p className="mt-1 text-sm text-cream">{s.label}</p>
              <p className="text-xs text-faint">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- PIPELINE ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <Reveal>
          <SectionHeading
            eyebrow="The Journey"
            title={<>From a laptop in your city <br className="hidden sm:block" />to the national crown.</>}
            description="A clear, city-first road to the coronation — the same arc as a real pageant, rebuilt for AI creators."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {PIPELINE.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08}>
              <div className="card h-full p-6">
                <span className="font-display text-3xl text-gold-deep/70">{step.n}</span>
                <h3 className="mt-3 font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-sm text-mist leading-relaxed">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/how-it-works" variant="ghost">
            See the full mechanics →
          </Button>
        </div>
      </section>

      {/* ---------------- FEATURED ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <Reveal>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <SectionHeading
              eyebrow="Leaderboard"
              title="Tonight's frontrunners"
              description="Ranked live by the hybrid score. Your free votes move them."
            />
            <Button href="/vote" variant="outline" size="sm">
              Full leaderboard
            </Button>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5">
          {featured.map((c, i) => (
            <Reveal key={c.id} delay={(i % 4) * 0.06}>
              <ContestantCard contestant={c} rank={i + 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- SCORING ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="card p-8 sm:p-12 grid gap-10 md:grid-cols-2 items-center">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow="How winners are decided"
                title="One score. Four voices."
                description="No pay-to-win. No paid votes. The crown is decided by the expert panel, the public, judged craft & originality, and genuine social sentiment — with the panel holding 55 of the 100 points and nothing you can buy."
              />
              <Button href="/vote" className="mt-6" variant="outline" size="sm">
                Cast a free vote
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5">
              {WEIGHT_LABELS.map((w) => (
                <div key={w.key}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-lg">{w.label}</span>
                    <span className="font-display text-2xl text-gradient-gold">{w.pct}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-ink-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        w.color === "gold"
                          ? "bg-gradient-to-r from-gold-deep to-gold-bright"
                          : w.color === "orchid"
                            ? "bg-gradient-to-r from-orchid to-orchid-bright"
                            : w.color === "jade"
                              ? "bg-gradient-to-r from-jade-deep to-jade-bright"
                              : "bg-gradient-to-r from-mist to-cream"
                      }`}
                      style={{ width: `${w.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- PRESENTED BY FANVUE ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-orchid/10 via-ink to-gold/5 p-8 sm:p-14 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
              Official Founding Partner
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl leading-tight">
              Presented by <span className="text-gradient-gold">Fanvue.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-mist leading-relaxed">
              Binibini AI is proudly powered by Fanvue — home of the world&apos;s AI creators. Their
              founding partnership keeps the pageant free to enter and free to vote, for every creator
              in every city.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/partners" size="lg">
                Meet our partners
              </Button>
              <Button href="/coronation" size="lg" variant="outline">
                Coronation night →
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <Reveal>
            <Link href="/join" className="group card block p-8 h-full hover:border-gold transition-colors">
              <p className="text-xs uppercase tracking-wide text-gold-deep">For AI Creators</p>
              <h3 className="mt-3 font-display text-2xl group-hover:text-gold-bright transition-colors">
                Enter your muse →
              </h3>
              <p className="mt-2 text-sm text-mist">
                Represent your city. Free to join. Bring your creation, your tools, your story.
              </p>
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/vote" className="group card block p-8 h-full hover:border-orchid transition-colors">
              <p className="text-xs uppercase tracking-wide text-orchid">For Fans</p>
              <h3 className="mt-3 font-display text-2xl group-hover:text-orchid-bright transition-colors">
                Vote for free →
              </h3>
              <p className="mt-2 text-sm text-mist">
                Spend your attention, not your wallet. Every vote shapes the crown.
              </p>
            </Link>
          </Reveal>
          <Reveal delay={0.16}>
            <Link href="/battle" className="group card block p-8 h-full hover:border-gold transition-colors">
              <p className="text-xs uppercase tracking-wide text-gold-deep">Para sa rehiyon</p>
              <h3 className="mt-3 font-display text-2xl group-hover:text-gold-bright transition-colors">
                Battle of the Regions →
              </h3>
              <p className="mt-2 text-sm text-mist">
                Ipaglaban ang lungsod mo. Region vs region, live.
              </p>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
