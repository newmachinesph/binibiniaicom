import type { Metadata } from "next";
import Link from "next/link";
import { MusePortrait } from "@/components/MusePortrait";
import { SEGMENTS, CONSENT_GATE, TRACK_CLASS } from "@/lib/segments";
import { CONTESTANTS } from "@/lib/data";
import { cityById } from "@/lib/cities";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { WeeklyRevealBadge } from "@/components/WeeklyRevealBadge";

export const metadata: Metadata = {
  title: "The Rounds — Binibini AI",
  description:
    "Six competition rounds — swimsuit, national costume, evening gown, talent, advocacy, and the live AI Q&A — reimagined for AI contestants.",
};

const ACCENT_TEXT: Record<string, string> = {
  gold: "text-gold-bright",
  orchid: "text-orchid-bright",
  cream: "text-cream",
};

const roundLeaders = SEGMENTS.map((seg) => ({
  seg,
  leader: [...CONTESTANTS].sort((a, b) => (b.rounds[seg.id] ?? 0) - (a.rounds[seg.id] ?? 0))[0],
}));

export default function RoundsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
      {/* hero */}
      <Reveal>
        <SectionHeading
          eyebrow="The Competition"
          title={<>Six rounds.<br />One crown.</>}
          description="Every great pageant is built on its segments — swimsuit, national costume, evening gown, talent, the final question. We kept the soul of each and rebuilt the body for AI. Same drama. New medium."
        />
      </Reveal>

      {/* weight bar */}
      <Reveal delay={0.08}>
        <div className="mt-10 card p-6">
          <p className="text-xs uppercase tracking-wide text-gold-deep mb-3">How the 100 points split</p>
          <div className="flex h-4 w-full overflow-hidden rounded-full">
            {SEGMENTS.map((s) => (
              <div
                key={s.id}
                className={TRACK_CLASS[s.accent]}
                style={{ width: `${s.weight}%` }}
                title={`${s.name} · ${s.weight}%`}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-mist">
            {SEGMENTS.map((s) => (
              <span key={s.id} className="inline-flex items-center gap-1.5">
                <span>{s.emoji}</span>
                {s.name} <span className="text-faint">· {s.weight}%</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* segments */}
      <div className="mt-16 space-y-16">
        {roundLeaders.map(({ seg, leader }, i) => {
          const city = cityById(leader.cityId);
          const flip = i % 2 === 1;
          return (
            <Reveal key={seg.id}>
              <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
                {/* text */}
                <div className={flip ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-5xl text-gold-deep/60">
                      {String(seg.order).padStart(2, "0")}
                    </span>
                    <span className="text-3xl">{seg.emoji}</span>
                  </div>
                  <WeeklyRevealBadge index={i} count={SEGMENTS.length} />
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-faint">
                    Reimagining · {seg.classic}
                  </p>
                  <h2 className="mt-1 font-display text-3xl sm:text-4xl">{seg.name}</h2>
                  <p className={`mt-2 font-display text-lg italic ${ACCENT_TEXT[seg.accent]}`}>
                    &ldquo;{seg.tagline}&rdquo;
                  </p>
                  <p className="mt-4 text-mist leading-relaxed">{seg.description}</p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {seg.judged.map((j) => (
                      <span key={j} className="rounded-full border border-line px-2.5 py-1 text-xs text-cream">
                        {j}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-faint">
                    <span>Weight {seg.weight}%</span>
                    <span>·</span>
                    <span>Typical tools: {seg.tools.join(", ")}</span>
                  </div>
                </div>

                {/* round leader card */}
                <div className={flip ? "lg:order-1" : ""}>
                  <Link href={`/contestants/${leader.slug}`} className="group block card overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <MusePortrait look={leader.look} uid={`rl-${seg.id}-${leader.id}`} name={leader.name} sash={leader.sashNumber} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                      <div className="absolute top-3 left-3 rounded-full bg-ink/70 backdrop-blur px-3 py-1 text-xs text-gold-bright border border-line">
                        Round leader
                      </div>
                      <div className="absolute bottom-0 p-5 flex items-end justify-between w-full">
                        <div>
                          <h3 className="font-display text-2xl">{leader.name}</h3>
                          <p className="text-xs text-mist">{city?.name} · No. {leader.sashNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] uppercase tracking-wide text-faint">{seg.name}</p>
                          <p className={`font-display text-3xl tabular-nums ${ACCENT_TEXT[seg.accent]}`}>
                            {(leader.rounds[seg.id] ?? 0).toFixed(1)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>

      {/* provenance gate */}
      <Reveal>
        <section className="mt-20 rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/5 via-ink to-orchid/5 p-8 sm:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Before any round counts</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">{CONSENT_GATE.title}</h2>
          <p className="mt-2 font-display text-lg italic text-gold-bright">&ldquo;{CONSENT_GATE.tagline}&rdquo;</p>
          <p className="mt-4 max-w-2xl text-mist leading-relaxed">
            Beauty is judged; ethics are gated. No contestant scores a single point in any round until
            they clear this — pass or fail, no exceptions.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {CONSENT_GATE.rules.map((r) => (
              <li key={r} className="flex items-start gap-3 rounded-xl border border-line bg-ink/40 px-4 py-3">
                <span className="text-gold-bright mt-0.5">✓</span>
                <span className="text-sm text-cream">{r}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* how rounds map to stages */}
      <Reveal>
        <section className="mt-16 card p-8">
          <SectionHeading
            eyebrow="Where the rounds live"
            title="Not every round, every stage"
            description="Auditions test the essentials. The pressure — and the full six — builds toward the crown."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {[
              { stage: "Audition", rounds: "Photoreal + Terno", note: "Prove the craft is real and the heritage is honored." },
              { stage: "City Crown", rounds: "+ Couture", note: "One muse per city earns the sash." },
              { stage: "Regional", rounds: "+ Talent + Advocacy", note: "Range and heart separate the field." },
              { stage: "Coronation", rounds: "All six + Live Q&A", note: "The full gauntlet, on the national stage." },
            ].map((s) => (
              <div key={s.stage} className="rounded-xl border border-line p-4">
                <p className="font-display text-lg text-gold-bright">{s.stage}</p>
                <p className="mt-1 text-xs text-cream">{s.rounds}</p>
                <p className="mt-2 text-xs text-mist leading-relaxed">{s.note}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* cta */}
      <Reveal>
        <div className="mt-16 flex flex-wrap items-center gap-3">
          <Button href="/contestants" size="lg">See who's competing →</Button>
          <Button href="/coronation" size="lg" variant="outline">Coronation night</Button>
          <Button href="/vote" size="lg" variant="ghost">Cast a free vote</Button>
        </div>
      </Reveal>
    </div>
  );
}
