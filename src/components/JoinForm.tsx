"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CITIES } from "@/lib/cities";
import { Button } from "@/components/ui/Button";

const AI_TOOL_OPTIONS = [
  "Midjourney",
  "Flux",
  "Runway",
  "Kling",
  "Sora",
  "HeyGen",
  "ElevenLabs",
  "ComfyUI",
];

// Provenance Gate — each affirmation is distinct and separately required.
const ATTESTATIONS: { id: string; text: string }[] = [
  {
    id: "watermark",
    text: "Every asset I submit is watermarked and openly disclosed as AI-generated.",
  },
  {
    id: "rights",
    text: "I hold the rights to all inputs — images, video, audio, and prompts — used to make her.",
  },
  {
    id: "consent",
    text: "I have explicit consent for every likeness, dataset, and voice used to train or build this muse.",
  },
  {
    id: "no-impersonation",
    text: "This muse does not impersonate any real, identifiable person.",
  },
  {
    id: "provenance",
    text: "I will file the full tool and prompt provenance for this entry.",
  },
];

type Fields = {
  creatorName: string;
  handle: string;
  email: string;
  museName: string;
  cityId: string;
  advocacy: string;
};

const EMPTY: Fields = {
  creatorName: "",
  handle: "",
  email: "",
  museName: "",
  cityId: "",
  advocacy: "",
};

const labelCls = "block text-xs uppercase tracking-wide text-faint mb-1.5";
const inputCls =
  "w-full rounded-xl border border-line bg-white/[0.02] px-4 py-2.5 text-sm text-cream placeholder:text-faint focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40 transition-colors";

function Dropzone({ label, hint }: { label: string; hint: string }) {
  // ponytail: fake upload — a styled label, no real file handling for the demo
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-line bg-white/[0.02] px-4 py-6 text-center transition-colors hover:border-gold/50">
      <span className="text-sm text-cream">{label}</span>
      <span className="mt-1 text-xs text-faint">{hint}</span>
      <input type="file" className="hidden" />
    </label>
  );
}

export function JoinForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [tools, setTools] = useState<string[]>([]);
  const [agreed, setAgreed] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Fields | null>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  const toggleTool = (t: string) =>
    setTools((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const toggleAttestation = (id: string) =>
    setAgreed((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fields.creatorName || !fields.email || !fields.museName || !fields.cityId) {
      setError("Please fill in your name, email, contestant name, and city.");
      return;
    }
    if (agreed.length < ATTESTATIONS.length) {
      setError("Please affirm every line of the Provenance Gate to submit.");
      return;
    }
    setError(null);
    setSubmitted(fields);
  }

  if (submitted) {
    const city = CITIES.find((c) => c.id === submitted.cityId);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="card p-8 sm:p-10 text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs text-gold-bright">
          <span className="h-1.5 w-1.5 rounded-full bg-orchid animate-[twinkle_2s_ease-in-out_infinite]" />
          Pending review
        </span>
        <h3 className="mt-6 font-display text-3xl sm:text-4xl">Audition received!</h3>
        <p className="mt-4 text-mist leading-relaxed">
          <span className="text-gradient-gold font-display text-xl">{submitted.museName}</span> is now in the
          queue to represent <span className="text-cream">{city?.name}</span>. Our panel reviews new contestants
          weekly — you&apos;ll hear from us at <span className="text-cream">{submitted.email}</span>.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/contestants" size="lg">
            Meet the contestants →
          </Button>
          <Button href="/cities" size="lg" variant="outline">
            Browse the cities
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="creatorName">Creator name *</label>
          <input id="creatorName" className={inputCls} value={fields.creatorName} onChange={set("creatorName")} placeholder="Jena Ricafort" />
        </div>
        <div>
          <label className={labelCls} htmlFor="handle">Studio / handle</label>
          <input id="handle" className={inputCls} value={fields.handle} onChange={set("handle")} placeholder="@studiosinag" />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">Email *</label>
          <input id="email" type="email" className={inputCls} value={fields.email} onChange={set("email")} placeholder="you@studio.ph" />
        </div>
        <div>
          <label className={labelCls} htmlFor="museName">Contestant / AI persona name *</label>
          <input id="museName" className={inputCls} value={fields.museName} onChange={set("museName")} placeholder="Liwayway Solis" />
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="city">City represented *</label>
        <select id="city" className={inputCls} value={fields.cityId} onChange={set("cityId")}>
          <option value="">Select a city…</option>
          {CITIES.map((c) => (
            <option key={c.id} value={c.id} className="bg-ink text-cream">
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className={labelCls}>AI tools used</span>
        <div className="flex flex-wrap gap-2">
          {AI_TOOL_OPTIONS.map((t) => {
            const active = tools.includes(t);
            return (
              <button
                type="button"
                key={t}
                onClick={() => toggleTool(t)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  active
                    ? "border-gold bg-gold/10 text-gold-bright"
                    : "border-line text-mist hover:border-gold/50 hover:text-cream"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="advocacy">Her advocacy</label>
        <textarea
          id="advocacy"
          rows={3}
          className={inputCls}
          value={fields.advocacy}
          onChange={set("advocacy")}
          placeholder="What cause will your muse carry onto the national stage?"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Dropzone label="Upload portrait" hint="PNG or JPG · the face of your campaign" />
        <Dropzone label="AI Q&A video" hint="MP4 · her answer to this season's question" />
      </div>

      <fieldset className="space-y-2.5">
        <legend className={labelCls}>Provenance Gate — affirm each line *</legend>
        {ATTESTATIONS.map((a) => (
          <label
            key={a.id}
            className="flex items-start gap-3 rounded-xl border border-line bg-white/[0.02] p-4 cursor-pointer transition-colors hover:border-gold/40"
          >
            <input
              type="checkbox"
              checked={agreed.includes(a.id)}
              onChange={() => toggleAttestation(a.id)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
            />
            <span className="text-sm text-mist leading-relaxed">{a.text}</span>
          </label>
        ))}
      </fieldset>

      {error && <p className="text-sm text-orchid-bright">{error}</p>}

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Submit audition →
      </Button>
    </form>
  );
}
