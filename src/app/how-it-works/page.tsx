import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Accordion } from "@/components/Accordion";
import { WEIGHT_LABELS } from "@/lib/scoring";
import { TOTAL_PH_CITIES } from "@/lib/cities";

export const metadata: Metadata = {
  title: "How It Works — Binibini AI",
  description:
    "The full mechanics of the Philippines' first AI beauty pageant: the four-stage journey, the four-voice hybrid score, the live AI Q&A round, and the rules that keep it honest.",
};

const STAGES = [
  {
    n: "01",
    title: "Audition",
    advance: "Open entry · every city",
    what: "A Filipino creator enters their AI contestant in any of the country's cities. Multiple muses can audition per city — the panel and the crowd react to each in real time.",
    judged:
      "First impression scoring across craft, presence, and concept. No one is eliminated for being new; every entry starts on equal footing.",
  },
  {
    n: "02",
    title: "City Crown",
    advance: "1 advances per city",
    what: `Exactly one muse is crowned for her city and carries its name forward — no city fields two. ${TOTAL_PH_CITIES} cities, ${TOTAL_PH_CITIES} local queens.`,
    judged:
      "The four-voice hybrid score decides it: 40% expert panel, 35% free public votes, 15% judged craft & originality, and 10% social sentiment. The highest total in the city advances — nothing else.",
  },
  {
    n: "03",
    title: "Regional",
    advance: "1 finalist per region",
    what: "City queens battle within their region. Exactly one muse emerges from each of the 17 regions — the region's strongest city winner becomes its lone Regional Finalist.",
    judged:
      "The same four-voice formula, higher stakes. One finalist per region and no more; the strongest city queen carries her region toward the national stage as the panel and public pressure-test each muse.",
  },
  {
    n: "04",
    title: "Coronation",
    advance: "12 finalists · 1 crown",
    what: "The 12 strongest regions send their finalist to the coronation stage — 12 national finalists from 12 distinct regions, one live production and one AI Q&A round. One is crowned the first Binibini AI, decided live on the night.",
    judged:
      "A final four-voice tally over the night's performance and Q&A. The crown is the sum of the panel's expert eye, the public, judged craft, and genuine clout — decided live, never pre-decided.",
  },
];

const VOICES: Record<string, string> = {
  judges:
    "An expert panel — AI ethicists, creative directors, and pageant veterans — scoring craft, concept, presence, and how responsibly the contestant is built.",
  public:
    "Free votes from anyone, anywhere. No purchases, no packs, no pay-to-win. Attention is the only currency, and it costs nothing to spend.",
  craft:
    "Technical difficulty and originality, scored only by the panel. It rewards a hard, distinctive build and penalizes sameface — and because it can't be voted or bought, no fandom or wallet can brigade it.",
  sentiment:
    "The smallest voice at 10%: genuine, organic social clout — followers, engagement, shares. The pull a muse earns beyond the voting booth, measured across platforms and never gamed by paid reach.",
};

const RULES = [
  {
    t: "One contestant per city advances",
    d: "A single muse carries each city forward. No city fields two finalists — the crown routes through every corner of the country.",
  },
  {
    t: "Every contestant is labeled AI",
    d: "No muse is ever passed off as a real person. Each profile is clearly marked as an AI creation built by a creator.",
  },
  {
    t: "Voting is always free",
    d: "The public vote is an attention economy, never a wallet one. There is no paid voting, ever — the crown cannot be bought.",
  },
  {
    t: "Responsible AI & consent",
    d: "Watermarking, disclosure, and no impersonation of real people. Creators affirm consent for every likeness and dataset they use.",
  },
  {
    t: "Filipino creators only",
    d: "Every contestant is built and operated by a Filipino creator or studio, representing a real Philippine city.",
  },
];

const FAQ = [
  {
    q: "Is every contestant really an AI contestant?",
    a: "Yes. Every muse is a synthetic creation generated and operated by a Filipino creator using AI tools. Each is clearly labeled as AI — the pageant celebrates the craft of building them, never pretends they are real people.",
  },
  {
    q: "Does it cost anything to vote?",
    a: "No. Voting is completely free and always will be. There are no paid votes, vote packs, or purchases of any kind. Your attention is the only thing a vote spends — the crown cannot be bought.",
  },
  {
    q: "How exactly is the final score calculated?",
    a: "A four-voice hybrid formula: 40% from the expert judges panel, 35% from the free public vote, 15% from judged craft & originality (technical difficulty and anti-sameface, scored only by the panel), and 10% from organic social sentiment. The panel therefore owns 55 of the 100 points — judges plus craft — while the public and sentiment hold the other 45. The four combine into one 0–100 score, and the highest total advances at each stage. Consent and provenance stay a separate pass/fail gate, never points.",
  },
  {
    q: "Who is on the judges panel?",
    a: "A rotating expert panel of AI ethicists, creative directors, and seasoned pageant veterans. They score craft, concept, presence, and how responsibly each contestant is built — bringing rigor the public vote alone can't.",
  },
  {
    q: "How does the AI Q&A round work?",
    a: "Creators generate AI video answers in their model's voice to the round's questions. Everything is watermarked, disclosed as AI, and bound by the no-impersonation rule. The answers are judged as part of the coronation.",
  },
  {
    q: "Who can enter a contestant?",
    a: "Any Filipino creator or studio can enter a contestant to represent a real Philippine city. Entry is free — bring your creation, your tools, and your story. One muse advances per city.",
  },
];

function barClass(color: string) {
  if (color === "gold") return "bg-gradient-to-r from-gold-deep to-gold-bright";
  if (color === "orchid") return "bg-gradient-to-r from-orchid to-orchid-bright";
  if (color === "jade") return "bg-gradient-to-r from-jade-deep to-jade-bright";
  return "bg-gradient-to-r from-mist to-cream";
}

export default function HowItWorksPage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-10 sm:pt-24">
        <Reveal>
          <SectionHeading
            eyebrow="The Mechanics"
            title={
              <>
                How a laptop in your city
                <br className="hidden sm:block" /> becomes a national crown.
              </>
            }
            description="Binibini AI runs the arc of a real pageant — audition to coronation — rebuilt for AI creators. Here is exactly how a muse advances, how she's scored, and the rules that keep the crown honest."
          />
        </Reveal>
      </section>

      {/* ---------------- STAGE JOURNEY ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
        <Reveal>
          <SectionHeading
            eyebrow="The Journey"
            title="Four stages, one road"
            description="City-first, exactly like the real thing. One muse leaves each city; twelve reach the finale."
          />
        </Reveal>
        <ol className="mt-12 space-y-5">
          {STAGES.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <li className="card grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:gap-10">
                <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-1">
                  <span className="font-display text-5xl sm:text-6xl text-gold-deep/60 tabular-nums">
                    {s.n}
                  </span>
                  <span className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-wide text-gold-bright">
                    {s.advance}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl">{s.title}</h3>
                  <p className="mt-3 text-mist leading-relaxed">{s.what}</p>
                  <p className="mt-4 border-l-2 border-gold-deep/40 pl-4 text-sm text-faint leading-relaxed">
                    <span className="text-gold-deep uppercase tracking-wide text-[11px]">
                      How it&apos;s judged ·{" "}
                    </span>
                    {s.judged}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------------- SCORING FORMULA ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="card p-8 sm:p-12">
          <Reveal>
            <SectionHeading
              center
              eyebrow="The Hybrid Score"
              title={
                <>
                  One score. <span className="text-gradient-gold">Four voices.</span>
                </>
              }
              description="Every advancement runs through the same formula — four voices, none for sale. The panel owns 55 of the 100 points (judges plus craft & originality); the public and sentiment hold the other 45. No single voice can crown a muse, and none of it can be bought."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {WEIGHT_LABELS.map((w, i) => (
              <Reveal key={w.key} delay={i * 0.08}>
                <div className="flex h-full flex-col">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-xl">{w.label}</span>
                    <span className="font-display text-3xl text-gradient-gold tabular-nums">
                      {w.pct}%
                    </span>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-ink-700">
                    <div
                      className={`h-full rounded-full ${barClass(w.color)}`}
                      style={{ width: `${w.pct}%` }}
                    />
                  </div>
                  <p className="mt-4 text-sm text-mist leading-relaxed">
                    {VOICES[w.key]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- AI Q&A ROUND ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="The Signature Round"
              title="The AI Q&A"
              description="Every pageant has its question-and-answer moment. Ours is generated — and held to a higher standard because of it."
            />
            <p className="mt-6 text-mist leading-relaxed">
              For the coronation, each creator generates an AI video answer in
              their contestant&apos;s own voice. The muse responds to the night&apos;s
              questions on advocacy, ethics, and the future of Filipino creativity
              — and the panel scores the substance, not just the render.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {[
                {
                  t: "Consent first",
                  d: "Every likeness and dataset is affirmed by its creator. No borrowed faces, no scraped identities.",
                },
                {
                  t: "Watermarked & disclosed",
                  d: "All Q&A video is watermarked and openly labeled AI-generated. The audience always knows what they are watching.",
                },
                {
                  t: "No impersonation",
                  d: "A muse may never depict or imitate a real living person. She is her own character, and only her own.",
                },
              ].map((r) => (
                <li key={r.t} className="card p-5">
                  <p className="font-display text-lg text-gold-bright">{r.t}</p>
                  <p className="mt-1 text-sm text-mist leading-relaxed">{r.d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------------- RULES ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <Reveal>
          <SectionHeading
            eyebrow="The Rules"
            title="The crown is earned, never bought"
            description="Five commitments that make Binibini AI a real competition — and a responsible one."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {RULES.map((r, i) => (
            <Reveal key={r.t} delay={(i % 2) * 0.06}>
              <div className="card flex h-full gap-4 p-6">
                <span className="font-display text-2xl text-gold-deep/70 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg">{r.t}</h3>
                  <p className="mt-1.5 text-sm text-mist leading-relaxed">{r.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Questions"
            title="Everything else you're wondering"
          />
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-10 max-w-3xl">
            <Accordion items={FAQ} />
          </div>
        </Reveal>
      </section>

      {/* ---------------- CTA BAND ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-gold/8 via-ink to-orchid/10 p-8 sm:p-14 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
              You know the rules
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl leading-tight">
              Now pick your side of the stage.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-mist leading-relaxed">
              Enter your muse and represent your city, or spend your free votes on
              the ones already competing. Both shape the crown.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/join" size="lg">
                Enter your AI contestant
              </Button>
              <Button href="/vote" size="lg" variant="outline">
                Cast a free vote →
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
