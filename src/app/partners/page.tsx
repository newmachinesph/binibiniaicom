import type { Metadata } from "next";
import { STATS } from "@/lib/data";
import { TOTAL_PH_CITIES } from "@/lib/cities";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Presented by Fanvue — Binibini AI",
  description:
    "Binibini AI is proudly presented by Fanvue, home of the world's AI creators — the founding partner crowning the Philippines' first AI pageant.",
};

const DELIVERS = [
  {
    title: "The crown, fully funded",
    body: "Because a founding partner covers the pageant, it stays free to enter and free to vote. No contestant pays to compete; no fan pays to be heard.",
  },
  {
    title: "A global stage, brought home",
    body: "Fanvue built the world's platform for AI creators. Binibini AI channels that reach into a single, passionate national market — the Philippines.",
  },
  {
    title: "Tools in every creator's hands",
    body: "Founding-partner access to AI creation tooling means a creator in Tacloban competes on the same footing as a studio in Makati.",
  },
  {
    title: "A shared ethical spine",
    body: "Consent-first, watermarked, no impersonation. The partnership is built on responsible synthetic media — the standard, not the afterthought.",
  },
];

const PARTNERS = [
  { tier: "Founding Partner", name: "Fanvue", note: "Home of the world's AI creators. The force behind global Miss AI — now crowning the Philippines'.", lead: true },
  { tier: "Creative Compute Partner", name: "Haraya Cloud", note: "GPU credits and render pipelines for every registered creator.", lead: false },
  { tier: "Connectivity Partner", name: "Alon Telecom", note: "Nationwide reach so every city can watch, share, and vote.", lead: false },
  { tier: "Academic Partner", name: "Sanggunian University · AI Ethics Lab", note: "Independent oversight of consent, provenance, and the judging rubric.", lead: false },
];

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
      {/* hero */}
      <Reveal>
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
            Official Founding Partner
          </p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl leading-[1.02]">
            Presented by <span className="text-gradient-gold">Fanvue.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-mist leading-relaxed">
            Binibini AI is proudly powered by Fanvue — the home of the world&apos;s AI creators. Together
            we&apos;re crowning the Philippines&apos; first AI pageant, and keeping it free for every
            creator and every fan.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contestants" size="lg">Meet the contestants →</Button>
            <Button href="/coronation" size="lg" variant="outline">Coronation night</Button>
          </div>
        </div>
      </Reveal>

      {/* what the partnership delivers */}
      <section className="mt-20">
        <Reveal>
          <SectionHeading
            eyebrow="The Partnership"
            title="What Fanvue makes possible"
            description="A founding partner doesn't just put a logo on a stage. It's the reason the stage is free to stand on."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {DELIVERS.map((d, i) => (
            <Reveal key={d.title} delay={(i % 2) * 0.08}>
              <div className="card h-full p-6">
                <h3 className="font-display text-xl text-gold-bright">{d.title}</h3>
                <p className="mt-2 text-sm text-mist leading-relaxed">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* attention model */}
      <section className="mt-20">
        <Reveal>
          <div className="card p-8 sm:p-12 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Why it stays free</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              Fans spend attention. Never money.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-mist leading-relaxed">
              With Fanvue underwriting the pageant, there are no paid votes and no entry fees. The only
              currency is attention — social shares and free online votes across all {TOTAL_PH_CITIES}{" "}
              cities. That&apos;s a cleaner, more viral, more brand-safe engagement than any pay-to-win
              model could ever be.
            </p>
          </div>
        </Reveal>
      </section>

      {/* partner roster */}
      <section className="mt-20">
        <Reveal>
          <SectionHeading eyebrow="On Board" title="The partners behind the crown" />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.08}>
              <div
                className={`rounded-2xl p-6 h-full border ${
                  p.lead
                    ? "border-gold bg-gradient-to-br from-gold/10 via-ink to-orchid/5"
                    : "border-line bg-ink-800/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs uppercase tracking-wide ${p.lead ? "text-gold-bright" : "text-faint"}`}>
                    {p.tier}
                  </span>
                  {p.lead && <span className="text-gold-bright">♛</span>}
                </div>
                <h3 className="mt-2 font-display text-2xl">{p.name}</h3>
                <p className="mt-2 text-sm text-mist leading-relaxed">{p.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-faint">
          Demo experience — Fanvue is the intended founding partner; other partners shown are
          illustrative placeholders.
        </p>
      </section>

      {/* stats */}
      <section className="mt-16">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {[
              { label: "Cities in play", value: `${STATS.activeCities}` },
              { label: "AI contestants", value: `${STATS.contestants}` },
              { label: "Creator studios", value: `${STATS.creators}` },
              { label: "Regions", value: `${STATS.regions}` },
            ].map((s) => (
              <div key={s.label} className="bg-ink px-6 py-8 text-center">
                <p className="font-display text-4xl text-gradient-gold tabular-nums">{s.value}</p>
                <p className="mt-1 text-sm text-mist">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
