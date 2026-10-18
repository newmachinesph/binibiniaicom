// The competition rounds — classic pageant segments reimagined for AI contestants.
// Each contestant is scored per round; the weighted sum of these six rounds (weights
// total 100) IS the judges' 40% panel score in the four-voice final tally.

export type Segment = {
  id: string;
  order: number;
  name: string;
  classic: string; // the real-pageant equivalent
  emoji: string;
  weight: number; // % of the competition score
  tagline: string;
  description: string;
  judged: string[];
  tools: string[];
  accent: "gold" | "orchid" | "cream";
};

export const SEGMENTS: Segment[] = [
  {
    id: "photoreal",
    order: 1,
    name: "The Photoreal Round",
    classic: "Swimsuit & Resort Wear",
    emoji: "🌊",
    weight: 15,
    tagline: "Can the render survive daylight?",
    description:
      "The old pageant put contestants under the noon sun to test poise. Ours tests something far harder — photorealism. On wet sand, mid-stride, in unforgiving natural light, the eye hunts for the tell. To be clear: the round grades the render, not the woman — skin, light, and anatomy realism as a technical craft, never her attractiveness or her body. Every reflection, every strand of hair caught in the sea breeze, every hard-to-fake fall of light and water is scrutinized frame by frame as a feat of rendering. This is where the uncanny valley comes to die.",
    judged: ["Skin & light realism", "Anatomical consistency", "Motion believability", "Composition"],
    tools: ["Flux", "Midjourney", "Higgsfield"],
    accent: "cream",
  },
  {
    id: "terno",
    order: 2,
    name: "Terno Reimagined",
    classic: "National Costume · Filipiniana",
    emoji: "🪷",
    weight: 20,
    tagline: "Heritage, hallucinated with love.",
    description:
      "The most sacred round. Each contestant wears a national costume no seamstress could ever sew — a butterfly-sleeved terno spun from parol light, a baro't saya blooming with sampaguita that never wilts, armor forged from Sarimanok feathers and Mayon's ash. Imagination is unbounded; disrespect is disqualifying. Sacred, religious, and indigenous symbols — the Sarimanok among them — are rendered only in consultation with the culture bearers who hold them, never lifted as decoration or costume armor; misuse is disqualifying, not a deduction. The last bar, and the softest: would a lola weep with pride — or wince?",
    judged: ["Cultural homage", "Originality", "Craftsmanship", "Storytelling"],
    tools: ["Midjourney", "Stable Diffusion", "ComfyUI"],
    accent: "orchid",
  },
  {
    id: "couture",
    order: 3,
    name: "The Couture Render",
    classic: "Evening Gown",
    emoji: "✨",
    weight: 15,
    tagline: "A gown that gravity forgot.",
    description:
      "Haute couture unshackled from thread and physics. Gowns of liquid mercury, of stained glass, of a single frozen wave caught at golden hour. Pure aesthetic artistry — the prompt as atelier. Judges reward restraint as much as spectacle: the fine line between a costume and a statement, between loud and unforgettable.",
    judged: ["Aesthetic vision", "Prompt artistry", "Elegance", "Cohesion"],
    tools: ["Midjourney", "Flux"],
    accent: "gold",
  },
  {
    id: "talent",
    order: 4,
    name: "The Generative Talent",
    classic: "Talent",
    emoji: "🎬",
    weight: 20,
    tagline: "Lights. Camera. Inference.",
    description:
      "Sixty seconds of moving image, generated end to end. A neon music video shot in a Manila that never sleeps; a contemporary dance where anatomy is merely a suggestion; a hand-painted anime short set to kundiman. The talent on trial isn't the contestant's — it's the creator's command of motion, rhythm, and story.",
    judged: ["Creativity", "Production quality", "Motion coherence", "Direction"],
    tools: ["Runway", "Kling", "Sora", "Luma"],
    accent: "orchid",
  },
  {
    id: "advocacy",
    order: 5,
    name: "Beauty With A Purpose",
    classic: "Advocacy Film",
    emoji: "💗",
    weight: 15,
    tagline: "A cause, in ninety seconds.",
    description:
      "Every contestant carries an advocacy — and here she makes her case as a short AI-generated film. Not a slideshow of stock footage, but a crafted piece of persuasion: the flooded barangay she wants to spare, the classroom she'd rebuild, the language she refuses to let die. Message over polish, always — but the finest contestants deliver both.",
    judged: ["Message clarity", "Emotional impact", "Storytelling", "Relevance"],
    tools: ["Runway", "HeyGen", "ElevenLabs"],
    accent: "cream",
  },
  {
    id: "qna",
    order: 6,
    name: "The Live AI Q&A",
    classic: "Final Question",
    emoji: "🎤",
    weight: 15,
    tagline: "Poise, at 24 frames per second.",
    description:
      "The crown-decider. On coronation night each finalist is asked one unrehearsed question — and answers as a freshly generated video, her AI voice speaking words her creator did not pre-script. Watermarked, disclosed, judged on substance and grace. This is where a beautiful render proves it has something to say.",
    judged: ["Substance", "Poise", "Authenticity", "Delivery"],
    tools: ["HeyGen", "ElevenLabs", "Runway"],
    accent: "gold",
  },
];

export const segmentById = (id: string) => SEGMENTS.find((s) => s.id === id);

// Not scored — a pass/fail gate every entry must clear before any round counts.
export const CONSENT_GATE = {
  title: "The Provenance Gate",
  tagline: "No receipts, no runway.",
  rules: [
    "Every asset is watermarked and disclosed as AI-generated.",
    "No impersonation of real, identifiable people — ever.",
    "The creator holds rights to all inputs, likenesses, and training material.",
    "Full tool + prompt provenance is filed with each entry.",
  ],
};

export const TRACK_CLASS: Record<Segment["accent"], string> = {
  gold: "bg-gradient-to-r from-gold-deep to-gold-bright",
  orchid: "bg-gradient-to-r from-orchid to-orchid-bright",
  cream: "bg-gradient-to-r from-mist to-cream",
};
