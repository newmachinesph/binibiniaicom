import type { Metadata } from "next";
import { MusePortrait } from "@/components/MusePortrait";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ContestantCard } from "@/components/ContestantCard";
import { Countdown } from "@/components/Countdown";
import { NATIONAL_FINALISTS } from "@/lib/data";
import { cityById, regionById } from "@/lib/cities";
import { finalScore } from "@/lib/scoring";

export const metadata: Metadata = {
  title: "Coronation Night — Binibini AI",
  description:
    "Season 01 comes to its crown. Meet the 12 national finalists, watch the countdown to coronation night, and see the run of show for the crowning of the first Binibini AI.",
};

const ranked = [...NATIONAL_FINALISTS].sort(
  (a, b) => finalScore(b.scores) - finalScore(a.scores),
);
const frontrunner = ranked[0];

const PRIZES = [
  {
    t: "₱1,000,000 Creator Studio Grant",
    d: "Cash and gear for the winning creator's studio — the tools to build the next generation of muses.",
    highlight: true,
  },
  {
    t: "The Fanvue Residency",
    d: "A year of global platform partnership and promotion for the winning AI contestant.",
  },
  {
    t: "The EDSA Takeover",
    d: "A billboard run in Metro Manila — her face over the busiest road in the country.",
  },
  {
    t: "A Greenlit Series",
    d: "Her own funded generative short-form series, creator-directed from the first frame.",
  },
];

const PRIZE_LADDER = [
  { place: "Binibini AI — The Crown", cash: "₱1,000,000", note: "plus the full Crown Package below", crown: true },
  { place: "1st Runner-Up", cash: "₱500,000", note: "and a regional creator grant" },
  { place: "2nd Runner-Up", cash: "₱300,000", note: "and a regional creator grant" },
  { place: "3rd Runner-Up", cash: "₱200,000", note: "" },
  { place: "4th Runner-Up", cash: "₱100,000", note: "" },
  { place: "Top 12 Finalists", cash: "₱50,000", note: "each, for the creator studio" },
];

const SPECIAL_AWARDS = [
  { t: "Best in Terno Reimagined", cash: "₱25,000" },
  { t: "Best Generative Talent", cash: "₱25,000" },
  { t: "Best in the AI Q&A", cash: "₱25,000" },
  { t: "Reyna ng Kwento", cash: "₱25,000" },
  { t: "Best in Craft & Originality", cash: "₱25,000" },
  { t: "People's Choice", cash: "₱25,000" },
];

const RUN_OF_SHOW = [
  {
    t: "Opening Production Number",
    d: "All finalists take the stage in a synchronized, AI-choreographed spectacle — a first look at every muse under the coronation lights.",
  },
  {
    t: "Editorial Walk",
    d: "One by one, each finalist delivers her signature walk and editorial styling, judged for presence, craft, and command of the stage.",
  },
  {
    t: "National Costume",
    d: "A tribute to home — each muse renders a couture interpretation of her city's and region's heritage in full detail.",
  },
  {
    t: "The AI Q&A Round",
    d: "The signature moment: creators' AI video answers, in each muse's voice, on advocacy and the future of Filipino creativity. Watermarked, disclosed, and scored on substance.",
  },
  {
    t: "Final Look",
    d: "The evening-gown finale — the last visual statement before the scores lock and the field narrows to the crown.",
  },
  {
    t: "Crowning",
    d: "The four-voice tally is sealed and the first Binibini AI is crowned — one muse, one city, carried by judges, public, craft, and sentiment. Four voices, none for sale.",
  },
];

export default function CoronationPage() {
  const frontCity = frontrunner ? cityById(frontrunner.cityId) : undefined;
  const frontRegion = frontrunner ? regionById(frontrunner.regionId) : undefined;

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-14 sm:pt-24">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs text-mist">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-[twinkle_2s_ease-in-out_infinite]" />
                Season 01 · The Finale
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl leading-[0.98] tracking-tight">
                Coronation
                <br />
                <span className="text-gradient-gold italic">Night.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg text-mist leading-relaxed">
                Twelve muses. One live AI Q&amp;A. One crown. The first Binibini AI
                is decided under the coronation lights — the sum of every city,
                every vote, and every voice that carried her here.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-12 max-w-2xl">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
                Curtain rises in
              </p>
              <Countdown />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FRONTRUNNER SPOTLIGHT ---------------- */}
      {frontrunner && (
        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
          <Reveal>
            <div className="card grid gap-0 overflow-hidden md:grid-cols-[minmax(0,0.9fr)_1.1fr]">
              <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[520px] overflow-hidden">
                <MusePortrait
                  look={frontrunner.look}
                  uid={`front-${frontrunner.id}`}
                  name={frontrunner.name}
                  sash={frontrunner.sashNumber}
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent md:bg-gradient-to-r" />
                <span className="absolute top-4 left-4 rounded-full bg-gradient-to-r from-gold/20 to-orchid/20 border border-gold px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-gold-bright">
                  ♛ Frontrunner for the crown
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
                  Projected to be crowned
                </p>
                <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-[1.02]">
                  {frontrunner.name}
                </h2>
                <p className="mt-3 text-mist">
                  {frontCity?.name}
                  {frontRegion ? ` · ${frontRegion.short}` : ""} · Sash No.{" "}
                  {frontrunner.sashNumber}
                </p>
                <p className="mt-5 max-w-md text-mist leading-relaxed">
                  {frontrunner.tagline}
                </p>
                <div className="mt-8 flex items-end gap-8">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-faint">
                      Projected final score
                    </p>
                    <p className="font-display text-5xl text-gradient-gold tabular-nums leading-none">
                      {finalScore(frontrunner.scores).toFixed(1)}
                    </p>
                  </div>
                  <div className="pb-1">
                    <p className="text-[11px] uppercase tracking-wide text-faint">
                      Advocacy
                    </p>
                    <p className="font-display text-lg text-cream">
                      {frontrunner.advocacy}
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <Button
                    href={`/contestants/${frontrunner.slug}`}
                    variant="outline"
                    size="sm"
                  >
                    View her profile →
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ---------------- 12 NATIONAL FINALISTS ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow={`${ranked.length} National Finalists · ${ranked.length} regions`}
              title="The muses of the crown"
              description="One per region, all the way here — twelve finalists, twelve distinct regions. Ranked live by the four-voice score; your free votes still move them."
            />
            <Button href="/vote" variant="outline" size="sm">
              Full leaderboard
            </Button>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
          {ranked.map((c, i) => (
            <Reveal key={c.id} delay={(i % 4) * 0.06}>
              <ContestantCard contestant={c} rank={i + 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- THE CROWN PACKAGE ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <Reveal>
          <SectionHeading
            eyebrow="The Crown Package"
            title="What the first Binibini AI wins"
            description="The crown is not a trophy — it is a launchpad, for the muse and the creator behind her."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRIZES.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06}>
              <div
                className={`h-full rounded-2xl border p-6 ${
                  p.highlight
                    ? "border-gold bg-gradient-to-br from-gold/15 via-ink to-gold/5 shadow-[0_0_50px_-15px_rgba(220,180,90,0.4)]"
                    : "border-gold/25 bg-gradient-to-br from-gold/5 via-ink to-transparent"
                }`}
              >
                <span className="font-display text-3xl text-gold-deep/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`mt-3 font-display text-xl leading-snug ${
                    p.highlight ? "text-gradient-gold" : "text-cream"
                  }`}
                >
                  {p.t}
                </h3>
                <p className="mt-2 text-sm text-mist leading-relaxed">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {/* ---- prize ladder in pesos ---- */}
        <Reveal delay={0.2}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="card overflow-hidden">
              <div className="border-b border-line px-6 py-4">
                <h3 className="font-display text-xl">The Prize Ladder</h3>
                <p className="mt-1 text-xs text-mist">Cash awards, in Philippine pesos.</p>
              </div>
              <ul className="divide-y divide-line">
                {PRIZE_LADDER.map((p) => (
                  <li
                    key={p.place}
                    className={`flex items-baseline justify-between gap-4 px-6 py-4 ${
                      p.crown ? "bg-gradient-to-r from-gold/10 to-transparent" : ""
                    }`}
                  >
                    <div>
                      <p className={`font-display text-lg ${p.crown ? "text-gradient-gold" : "text-cream"}`}>
                        {p.crown && "♛ "}
                        {p.place}
                      </p>
                      {p.note && <p className="text-xs text-faint">{p.note}</p>}
                    </div>
                    <p
                      className={`font-display tabular-nums ${
                        p.crown ? "text-3xl text-gradient-gold" : "text-2xl text-gold-bright"
                      }`}
                    >
                      {p.cash}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="font-display text-xl">Special Awards</h3>
              <p className="mt-1 text-xs text-mist">Won on the night, any finalist eligible.</p>
              <ul className="mt-4 space-y-3">
                {SPECIAL_AWARDS.map((a) => (
                  <li key={a.t} className="flex items-baseline justify-between gap-3 rounded-xl border border-line px-4 py-3">
                    <span className="text-sm text-cream">{a.t}</span>
                    <span className="font-display text-lg text-orchid-bright tabular-nums">{a.cash}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white/[0.02] px-6 py-4">
            <p className="text-sm text-mist">
              All cash prizes go to the creator studios behind each muse — and every city winner
              keeps her sash and a permanent page in the Hall of Sashes.
            </p>
            <p className="text-xs uppercase tracking-wide text-faint">
              Season 01 demo figures
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------------- RUN OF SHOW ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Run of Show"
            title="How the night unfolds"
            description="Six segments, one crown. The order of the coronation, start to finish."
          />
        </Reveal>
        <ol className="mt-12 space-y-4">
          {RUN_OF_SHOW.map((seg, i) => (
            <Reveal key={seg.t} delay={i * 0.05}>
              <li className="card flex items-start gap-5 p-6 sm:p-7">
                <span className="font-display text-3xl sm:text-4xl text-gold-deep/60 tabular-nums leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl">{seg.t}</h3>
                  <p className="mt-2 text-mist leading-relaxed">{seg.d}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-orchid/12 via-ink to-gold/8 p-8 sm:p-14 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
              The crown is still in motion
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl leading-tight">
              Your vote decides who walks last.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-mist leading-relaxed">
              Voting is free — it always has been. Back your muse before the scores
              lock, and see the partners bringing coronation night to the nation.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/vote" size="lg">
                Vote now
              </Button>
              <Button href="/partners" size="lg" variant="outline">
                Presented by Fanvue →
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
