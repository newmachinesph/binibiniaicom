import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { JoinForm } from "@/components/JoinForm";

export const metadata: Metadata = {
  title: "Enter your AI contestant — Binibini AI",
  description:
    "Audition your AI contestant for the Philippines' first AI beauty pageant. Free to join, city-first, responsible-AI required.",
};

const STEPS = [
  {
    n: "01",
    title: "Enter your contestant",
    body: "Submit your AI creation, the city she represents, and the tools that brought her to life. One audition per creator, per city.",
  },
  {
    n: "02",
    title: "Panel review",
    body: "Our team checks craft, originality, and responsible-AI compliance. Approved contestants go live on the roster.",
  },
  {
    n: "03",
    title: "Compete for the crown",
    body: "One contestant advances per city, then regionals, then the national coronation. Free public voting moves her up.",
  },
];

const REASSURANCE = [
  { label: "Free to join", body: "No entry fee, ever. Your talent is the ticket." },
  { label: "You keep your IP", body: "Your creation, your likeness, your rights. We license nothing." },
  { label: "One advances per city", body: "A real pageant ladder — 149 cities, 149 local queens." },
  { label: "Responsible-AI required", body: "Consent-first, watermarked, no impersonation of real people." },
];

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
      <Reveal>
        <SectionHeading
          eyebrow="For AI Creators"
          title={
            <>
              Enter your AI contestant in the <span className="text-gradient-gold italic">national pageant.</span>
            </>
          }
          description="Build her in your studio. Send her to the stage. From a single audition to the coronation crown — the road starts here."
        />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <JoinForm />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl mb-4">How it works for creators</h3>
              <div className="space-y-4">
                {STEPS.map((s) => (
                  <div key={s.n} className="card p-5">
                    <span className="font-display text-2xl text-gold-deep/70">{s.n}</span>
                    <h4 className="mt-2 font-display text-lg">{s.title}</h4>
                    <p className="mt-1.5 text-sm text-mist leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl mb-4">The fine print, in plain words</h3>
              <div className="grid grid-cols-2 gap-3">
                {REASSURANCE.map((r) => (
                  <div key={r.label} className="rounded-xl border border-line bg-white/[0.02] p-4">
                    <p className="text-sm text-gold-bright font-medium">{r.label}</p>
                    <p className="mt-1 text-xs text-mist leading-relaxed">{r.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
