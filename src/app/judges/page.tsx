import type { Metadata } from "next";
import { CreatorMark } from "@/components/CreatorMark";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "The Panel — Binibini AI",
  description:
    "The four judges — and one advisory synthetic panelist — behind the panel's 55-point expert share of the hybrid score: an AI ethicist, a terno modernist, a pageant legend, a creative technologist, and Bb. Maya.",
};

const JUDGES = [
  {
    name: "Dr. Amihan Reyes-Cortez",
    uid: "judge-amihan",
    role: "AI Ethicist · Chair, Provenance Gate",
    bio: "The first voice any entry meets and the last one it has to satisfy. Amihan spent a decade writing consent frameworks for synthetic media before pageantry ever touched a diffusion pipeline, and she chairs the Provenance Gate that every muse must clear before a single point is scored. Her scorecard has exactly one soft spot: work that is honest about how it was made.",
    scores: "Consent, disclosure, and responsible craft — the gate before the glamour.",
  },
  {
    name: "Paolo Madrigal",
    uid: "judge-paolo",
    role: "Couture Designer · Terno Modernist",
    bio: "Paolo has spent twenty years arguing that the terno's butterfly sleeve is engineering, not nostalgia — and his ateliers have dressed three decades of national stages. He reads a rendered gown the way a cutter reads cloth: seam logic first, silhouette second, story always. A beautiful image that couldn't exist as a garment does not survive his pass.",
    scores: "Terno Reimagined and Couture Render — heritage honored, construction believed.",
  },
  {
    name: "Carmela “Reyna” Divino",
    uid: "judge-carmela",
    role: "Pageant Legend · 3 International Crowns",
    bio: "Three international crowns in the nineties and a legendary final answer that still gets replayed every pageant season. Reyna has walked every stage this country ever built, and she judges the one thing no render can fake its way past her on: whether a muse carries the moment or merely appears in it.",
    scores: "Poise, presence, and Q&A substance — the crown is worn, not generated.",
  },
  {
    name: "Kai Nakamura-Lim",
    uid: "judge-kai",
    role: "Creative Technologist · Ex-Studio Motion Director",
    bio: "Kai directed motion for a major animation studio before going independent to push generative pipelines past the demo-reel stage. He can tell a lucky seed from a controlled one at a glance, and he scores accordingly — rewarding creators who bend the tools with intent rather than ride them downhill.",
    scores: "Generative Talent and technical craft — intent over accident, direction over luck.",
  },
] as const;

const RUBRIC = [
  {
    n: "01",
    title: "Blind first pass",
    d: "Every entry is scored without creator names, follower counts, or city attached. The craft argues its own case before anything else is allowed in the room.",
  },
  {
    n: "02",
    title: "Provenance check",
    d: "No score becomes official until the Provenance Gate clears the entry — consent certified, watermark verified, disclosure in place. Pass or fail, before points.",
  },
  {
    n: "03",
    title: "Live deliberation",
    d: "On coronation night the panel argues in the open, on the broadcast, with the receipts on screen. The final numbers land in front of the country, not behind a curtain.",
  },
];

export default function JudgesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
      {/* hero */}
      <Reveal>
        <SectionHeading
          eyebrow="The Panel"
          title={<>Fifty-five points.<br />Four opinions that earn them.</>}
          description="The hybrid score runs on four voices — 40% expert panel, 35% free public vote, 15% judged craft & originality, 10% social sentiment. The panel scores the craft axis too, so 55 of the 100 points are its expert eye. This page is that 55: four judges (and one advisory synthetic panelist) whose job is to know the difference between a pretty render and a muse."
        />
      </Reveal>

      {/* human judges */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {JUDGES.map((j, i) => (
          <Reveal key={j.uid} delay={i * 0.06}>
            <article className="card p-6 sm:p-7 h-full flex flex-col">
              <div className="flex items-start gap-5">
                <CreatorMark name={j.name} uid={j.uid} size={96} />
                <div className="min-w-0">
                  <h2 className="font-display text-2xl leading-tight">{j.name}</h2>
                  <span className="mt-2 inline-block rounded-full border border-line px-3 py-1 text-xs text-gold-bright">
                    {j.role}
                  </span>
                </div>
              </div>
              <p className="mt-5 text-sm text-mist leading-relaxed">{j.bio}</p>
              <div className="mt-auto pt-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gold-deep">On the scorecard</p>
                <p className="mt-1 text-sm text-cream">{j.scores}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Bb. Maya — the synthetic judge */}
      <Reveal>
        <article className="mt-6 rounded-3xl border border-orchid/30 bg-gradient-to-br from-orchid/10 via-ink to-ink p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <CreatorMark name="Bb. Maya" uid="judge-maya" size={96} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-2xl leading-tight">Bb. Maya</h2>
                <span className="rounded-full border border-orchid/40 bg-orchid/10 px-3 py-1 text-xs text-orchid-bright">
                  Synthetic panelist · clearly labeled
                </span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-faint">
                The first AI judge in Philippine pageant history
              </p>
              <p className="mt-4 text-sm text-mist leading-relaxed">
                A pageant judging AI where AI contestants compete? Of course. Bb. Maya is trained on
                three decades of pageant scoring — every rubric, every deduction, every final-question
                answer that ever made a coliseum gasp. She is the only judge who has read every pageant
                transcript ever, and she never claims to be anything but software. Her scores surface
                patterns the human panel debates out loud; her vote is one, advisory, and non-binding.
              </p>
              <div className="mt-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-orchid-bright">On the scorecard</p>
                <p className="mt-1 text-sm text-cream">
                  Consistency across thirty years of precedent — with zero authority to break a tie.
                </p>
              </div>
            </div>
          </div>
        </article>
      </Reveal>

      {/* how the panel scores */}
      <Reveal>
        <section className="mt-16 card p-8">
          <SectionHeading
            eyebrow="How the panel scores"
            title="Blind, gated, then out loud"
            description="Three passes stand between an entry and its fifty-five points — and after every stage of the competition, the panel's numbers are published in full. Radical transparency isn't a slogan here; it's the format."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {RUBRIC.map((r) => (
              <div key={r.n} className="rounded-xl border border-line p-5">
                <span className="font-display text-4xl text-gold-deep/60">{r.n}</span>
                <h3 className="mt-2 font-display text-lg text-gold-bright">{r.title}</h3>
                <p className="mt-2 text-sm text-mist leading-relaxed">{r.d}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* integrity note */}
      <Reveal>
        <section className="mt-8 rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/5 via-ink to-orchid/5 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Integrity note</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li className="flex items-start gap-3 rounded-xl border border-line bg-ink/40 px-4 py-3">
              <span className="text-gold-bright mt-0.5">✓</span>
              <span className="text-sm text-cream">
                Judges recuse from any city where they mentor creators. A muse never faces a scorecard
                her mentor is holding.
              </span>
            </li>
            <li className="flex items-start gap-3 rounded-xl border border-line bg-ink/40 px-4 py-3">
              <span className="text-gold-bright mt-0.5">✓</span>
              <span className="text-sm text-cream">
                Bb. Maya's vote is advisory only. Software informs the panel; it never outvotes it.
              </span>
            </li>
          </ul>
        </section>
      </Reveal>

      {/* cta */}
      <Reveal>
        <div className="mt-16 flex flex-wrap items-center gap-3">
          <Button href="/rounds" size="lg">See what they score →</Button>
          <Button href="/vote" size="lg" variant="outline">Your 35% is free — vote</Button>
        </div>
      </Reveal>
    </div>
  );
}
