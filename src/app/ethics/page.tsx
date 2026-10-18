import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { TOTAL_PH_CITIES } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Ethics & Responsible AI — Binibini AI",
  description:
    "The framework behind the Philippines' first AI beauty pageant: full disclosure, watermarked provenance, zero impersonation, certified consent, auditable workflows, and a named Filipino creator on every profile.",
};

const COMMITMENTS = [
  {
    n: "01",
    title: "Disclosure",
    d: "Every contestant is labeled an AI creation everywhere she appears — profile, ballot, broadcast, clip, thumbnail. No fine print, no asterisk, no context where the label quietly falls off.",
  },
  {
    n: "02",
    title: "Watermarking",
    d: "Visible marks plus embedded provenance metadata on every asset the pageant publishes. If it came from this stage, it says so — and it keeps saying so after the screenshot.",
  },
  {
    n: "03",
    title: "No impersonation",
    d: "No real, identifiable person's likeness. Not a celebrity, not a public figure, not somebody's ex. Ever. A muse is an original creation or she is not a contestant.",
  },
  {
    n: "04",
    title: "Consent & rights",
    d: "Creators certify rights to every input in their workflow — reference, dataset, voice, all of it. Contestant likenesses are never used to train third-party systems. Full stop.",
  },
  {
    n: "05",
    title: "Provenance files",
    d: "Every entry files its tools and workflow with the pageant, and the file is auditable. When someone asks how a muse was made, the answer is a document, not a shrug.",
  },
  {
    n: "06",
    title: "Human credit",
    d: "The Filipino creator is named on every profile, every stage, every win. The muse is synthetic; the craft is human, and the human gets the byline.",
  },
  {
    n: "07",
    title: "Against a single standard",
    d: "The Philippines is not one shade or one face, and the roster will not pretend otherwise. We reject colorism outright — no Eurocentric or mestiza default, no lightening the field toward one look. Diversity of skin tone, features, and body type is a standard the pageant holds itself to, not a footnote.",
  },
];

const ENFORCEMENT = [
  {
    title: "The Provenance Gate",
    d: "A hard pass/fail floor, not a scored axis. No entry earns a single point in any round until consent is certified, watermarks verify, and disclosure is in place — and no amount of craft, beauty, or public love buys back a failed gate. Consent is never a number you can trade; the judged craft & originality axis measures skill, not ethics. There is no appeal to hype.",
  },
  {
    title: "One strike on impersonation",
    d: "A verified likeness violation is a takedown, not a warning. The entry is removed, the creator is out of the season, and the record says why.",
  },
  {
    title: "Public correction log",
    d: "When we get something wrong, the correction is published — dated, specific, and on the record. Trust is a scored round too, and we grade ourselves in public.",
  },
];

const PRESS_FACTS = [
  `${TOTAL_PH_CITIES} cities across all 17 regions of the Philippines`,
  "Hybrid score: 40% expert panel · 35% public vote · 15% judged craft & originality · 10% social sentiment",
  "Voting is always free — no paid votes, no vote packs, ever",
  "Every contestant is a disclosed AI creation credited to a named Filipino creator",
];

export default function EthicsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
      {/* hero */}
      <Reveal>
        <SectionHeading
          eyebrow="The Framework"
          title={<>Synthetic.<br />And honest about it.</>}
          description="This is the pageant where AI is the point — not a trick, not a rumor to deny. Every muse is disclosed, every asset is watermarked, and consent clears before beauty competes. Here is the framework, in writing, so you can hold us to it."
        />
      </Reveal>

      {/* commitments */}
      <Reveal delay={0.08}>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMMITMENTS.map((c) => (
            <article key={c.n} className="card p-6">
              <span className="font-display text-4xl text-gold-deep/60">{c.n}</span>
              <h2 className="mt-2 font-display text-xl text-gold-bright">{c.title}</h2>
              <p className="mt-2 text-sm text-mist leading-relaxed">{c.d}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* why so strict */}
      <Reveal>
        <section className="mt-16 rounded-3xl border border-orchid/30 bg-gradient-to-br from-orchid/10 via-ink to-ink p-8 sm:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-orchid-bright">Why so strict</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Because the industry earned it.</h2>
          <p className="mt-4 max-w-2xl text-mist leading-relaxed">
            When AI first walked into pageantry, consent came second and the headlines came first —
            and the recent controversies wrote themselves. We read those stories the way everyone
            else did, and we built this pageant in the opposite order: the gate first, the stage
            second. Scrutiny isn't a threat to an AI pageant done right. It's the audience.
          </p>
        </section>
      </Reveal>

      {/* enforcement */}
      <Reveal>
        <section className="mt-16 card p-8">
          <SectionHeading
            eyebrow="Enforcement"
            title="Rules with teeth"
            description="A framework nobody enforces is a press release. Ours has three moving parts, and all of them bite."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {ENFORCEMENT.map((e) => (
              <div key={e.title} className="rounded-xl border border-line p-5">
                <h3 className="font-display text-lg text-gold-bright">{e.title}</h3>
                <p className="mt-2 text-sm text-mist leading-relaxed">{e.d}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* for the press */}
      <Reveal>
        <section className="mt-16 rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/5 via-ink to-orchid/5 p-8 sm:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">For the press</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Quote us. Please.</h2>
          <div className="mt-6 rounded-xl border border-line bg-ink/40 p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-faint">Boilerplate</p>
            <p className="mt-2 text-sm text-cream leading-relaxed">
              Binibini AI is the Philippines' first AI beauty pageant — a nationwide competition
              where Filipino creators enter original, fully disclosed AI contestants to represent
              their cities, from audition to a live coronation. Presented with founding partner
              Fanvue, the crown is decided by a four-voice score — 40% expert panel, 35% free public
              voting, 15% judged craft and originality, and 10% social sentiment — under a
              consent-first responsible-AI framework.
            </p>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {PRESS_FACTS.map((f) => (
              <li key={f} className="flex items-start gap-3 rounded-xl border border-line bg-ink/40 px-4 py-3">
                <span className="text-gold-bright mt-0.5">✓</span>
                <span className="text-sm text-cream">{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button href="mailto:press@binibiniai.com" size="lg">press@binibiniai.com</Button>
            <p className="text-sm text-faint">Media assets and interviews available on request.</p>
          </div>
        </section>
      </Reveal>

      {/* cta */}
      <Reveal>
        <div className="mt-16 flex flex-wrap items-center gap-3">
          <Button href="/judges" size="lg">Meet the panel →</Button>
          <Button href="/how-it-works" size="lg" variant="outline">How the pageant works</Button>
        </div>
      </Reveal>
    </div>
  );
}
