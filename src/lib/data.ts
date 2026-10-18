import { CITIES, REGIONS, cityById } from "./cities";
import type { Contestant, Creator, QnA, Stage } from "./types";
import { STAGE_RANK } from "./types";
import { SEGMENTS } from "./segments";
import { finalScore } from "./scoring";
import { hueOf } from "./portrait";

// ---- deterministic PRNG (mulberry32) so server & client render identically ----
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = <T,>(rng: () => number, arr: readonly T[]): T =>
  arr[Math.floor(rng() * arr.length)];

const range = (rng: () => number, min: number, max: number) =>
  min + rng() * (max - min);

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ---- pools ---------------------------------------------------------------
const FIRST = [
  "Aria", "Liwayway", "Mira", "Selene", "Dalisay", "Amihan", "Sofia", "Noelle",
  "Kalayaan", "Isabela", "Marikit", "Sinag", "Verona", "Tala", "Diwa", "Elysia",
  "Malaya", "Rhian", "Bituin", "Aurora", "Sampaguita", "Reyna", "Ligaya", "Zara",
  "Anahaw", "Celestine", "Maja", "Perlas", "Sabel", "Iris", "Lumina", "Halia",
];
const LAST = [
  "Solis", "Bagani", "de Vega", "Amara", "Rosales", "Cruz", "Montenegro",
  "Villareal", "Sinag", "Dominguez", "Reyes", "Aquino", "Lumen", "Salcedo",
  "Batungbakal", " Verano", "Ocampo", "Santelmo", "Nubla", "del Rosario",
];
const TAGLINES = [
  "Synthesized in the Philippines, dreamed for the world.",
  "Every pixel, a promise — labeled, always.",
  "Rendered with intention, disclosed with pride.",
  "A muse for the digital age, made in the islands.",
  "Code, couture, at katapangan.",
  "Made of light, and a little bit of home.",
  "The future has a Filipina face — and it says so.",
  "Grace, generated. Bayan, represented.",
];

// advocacy name → blurb, so a muse can carry a cause that fits her home region
const ADVOCACY_BLURB: Record<string, string> = {
  "Digital Literacy": "teaching Filipino youth to create with AI, not fear it — free workshops in every region.",
  "Mental Health": "normalizing the conversation and funding counseling access in public schools.",
  "Climate Resilience": "backing mangrove reforestation and typhoon-ready coastal communities.",
  "Women in Tech": "mentoring young women into engineering and creative-AI careers.",
  "Preserving Culture": "archiving endangered Philippine languages and weaving traditions into new media.",
  "Education Access": "scholarships and devices for learners in remote municipalities.",
  "Responsible AI": "championing consent, watermarking, and honesty in synthetic media.",
  "Livelihood & MSMEs": "helping local artisans reach global buyers through digital storefronts.",
};

// short sensory phrase per region — the raw material a muse is "made of"
const REGION_FLAVOR: Record<string, string> = {
  ncr: "the capital's restless neon and old-Manila grandeur",
  car: "the pine-cool highlands of the Cordillera",
  "region-i": "the wind-turbine coast and heritage streets of the Ilocos",
  "region-ii": "the wide tobacco valleys of Cagayan",
  "region-iii": "the sunbaked plains and old stone churches of Central Luzon",
  "region-iv-a": "the boomtown sprawl and lake air of CALABARZON",
  "region-iv-b": "the island light and clear water of MIMAROPA",
  "region-v": "the perfect cone of Mayon and the Bicol typhoon coast",
  "region-vi": "the sugar country and festival color of Western Visayas",
  "region-vii": "the reef-blue water and stone plazas of Central Visayas",
  "region-viii": "the storm-tested shores of Eastern Visayas",
  "region-ix": "the Latin-tiled streets of the Zamboanga peninsula",
  "region-x": "the waterfalls and highland farms of Northern Mindanao",
  "region-xi": "the durian heat and Pacific edge of the Davao region",
  "region-xii": "the pineapple plains of SOCCSKSARGEN",
  "region-xiii": "the gold rivers and surf breaks of Caraga",
  barmm: "the brass, weave, and lake country of Bangsamoro",
};

// advocacies that fit each region's real character (bias, not a lock)
const REGION_ADVOCACY: Record<string, string[]> = {
  ncr: ["Women in Tech", "Digital Literacy", "Responsible AI", "Mental Health"],
  car: ["Preserving Culture", "Education Access", "Climate Resilience"],
  "region-i": ["Livelihood & MSMEs", "Climate Resilience", "Education Access"],
  "region-ii": ["Education Access", "Livelihood & MSMEs", "Digital Literacy"],
  "region-iii": ["Digital Literacy", "Livelihood & MSMEs", "Education Access"],
  "region-iv-a": ["Women in Tech", "Digital Literacy", "Mental Health"],
  "region-iv-b": ["Climate Resilience", "Livelihood & MSMEs", "Preserving Culture"],
  "region-v": ["Climate Resilience", "Education Access", "Mental Health"],
  "region-vi": ["Livelihood & MSMEs", "Preserving Culture", "Climate Resilience"],
  "region-vii": ["Digital Literacy", "Livelihood & MSMEs", "Climate Resilience"],
  "region-viii": ["Climate Resilience", "Mental Health", "Education Access"],
  "region-ix": ["Preserving Culture", "Livelihood & MSMEs", "Education Access"],
  "region-x": ["Climate Resilience", "Education Access", "Livelihood & MSMEs"],
  "region-xi": ["Women in Tech", "Livelihood & MSMEs", "Climate Resilience"],
  "region-xii": ["Livelihood & MSMEs", "Education Access", "Climate Resilience"],
  "region-xiii": ["Climate Resilience", "Preserving Culture", "Livelihood & MSMEs"],
  barmm: ["Preserving Culture", "Education Access", "Livelihood & MSMEs"],
};

const ALL_ADVOCACIES = Object.keys(ADVOCACY_BLURB);

// a distinguishing line so no two bios read the same
const TRAITS = [
  "Her creator tunes every frame by hand, and it shows.",
  "She was built for motion — stillness bores her.",
  "Trained on nothing but consenting, disclosed data, and proud of it.",
  "Equal parts editorial cool and hometown warmth.",
  "She reads a room before she ever works it.",
  "No two of her renders wear the same light.",
  "She would rather be unforgettable than perfect.",
  "Every look she wears is arguing for something.",
  "Quiet on the stage, loud in the edit.",
  "She treats a prompt like a screenplay, not a slot machine.",
];

const AI_TOOLS = [
  "Midjourney", "Flux", "Stable Diffusion", "Runway", "Kling", "Sora", "Pika",
  "Luma", "HeyGen", "ElevenLabs", "ComfyUI", "Higgsfield",
];

// shared final-question answers — sampled AFTER each muse's signature answer,
// so her most-read reply is always uniquely hers (see buildSignatureQna)
const SHARED_QUESTIONS: QnA[] = [
  {
    question: "As an AI, what does authenticity mean to you?",
    answer:
      "Authenticity isn't about being born a certain way — it's about being honest about who made you and why. My creator built me to tell Filipino stories, and I carry that truth in every frame. I am transparent about what I am, and I think that honesty is the most human thing of all.",
  },
  {
    question: "How can AI contestants uplift, rather than replace, human artists?",
    answer:
      "Behind every one of us is a human dreaming in code. We are brushes, not painters. When a creator in Cebu can compete on a national stage from a single laptop, that isn't replacement — that's a door finally opening for talent that was always there.",
  },
  {
    question: "What would you tell a young Filipina watching tonight?",
    answer:
      "You do not need permission to build something beautiful. The tools are in your hands now. Learn them, respect them, and use them to say something only you can say. The stage is bigger than it has ever been — and there is room for your voice on it.",
  },
  {
    question: "How do you handle the ethics of synthetic beauty?",
    answer:
      "By never pretending. I am labeled, watermarked, and proud of it. Real harm comes from deception, not from art that declares itself. We are raising the standard: consent first, credit always, and no impersonation of real people — ever.",
  },
  {
    question: "Why does the Philippines belong at the front of the AI era?",
    answer:
      "Because we have always exported imagination — our music, our care, our resilience. Filipinos adapt faster than any technology can move. Give us new tools and we don't just use them, we make them sing. This crown says the world is finally listening.",
  },
  {
    question: "What is your definition of a modern muse?",
    answer:
      "A muse used to be silent inspiration. A modern muse speaks, organizes, and builds. I am not here to be looked at — I am here to point the camera at things that matter, and to make sure the light lands on my whole country.",
  },
];

const CREATOR_STUDIOS = [
  "Studio Sinag", "Neon Barrio", "Lumen Labs", "Makatao AI", "Bahaghari Studio",
  "Pixel Sampaguita", "Diwata Digital", "Anino Collective", "Araw Render",
  "Kislap Creative", "Tala Works", "Haraya AI", "Sulyap Studio", "Ningning Media",
  "Alon House", "Bagwis Labs", "Silahis Studio", "Umaga Creative", "Dagitab AI",
  "Panata Pictures",
];
const CREATOR_NAMES = [
  "Marco Delgado", "Jena Ricafort", "Paolo Bautista", "Kim Aquino", "Nika Salcedo",
  "Rafael Ong", "Bea Lardizabal", "Toffer Reyes", "Andrea Lim", "Migs Tolentino",
  "Cha Villanueva", "Enzo Panganiban", "Lara Mendoza", "Deo Ilagan", "Faye Corpuz",
  "Ram Villaruel", "Trisha Uy", "Gelo Macaraeg", "Pat Divinagracia", "Bianca Yulo",
];
const CITY_LOCATIONS = ["Manila", "Cebu City", "Davao City", "Baguio", "Iloilo City", "Cagayan de Oro"];

// ---- generation ----------------------------------------------------------
const rng = mulberry32(20260709);

// creators
export const CREATORS: Creator[] = CREATOR_STUDIOS.map((studio, i) => {
  const joinedYear = 2024 + Math.floor(rng() * 3);
  return {
    id: slug(studio),
    handle: "@" + slug(studio).replace(/-/g, ""),
    name: CREATOR_NAMES[i % CREATOR_NAMES.length],
    bio: `${studio} is a Filipino AI creative studio crafting synthetic muses with a conscience.`,
    location: CITY_LOCATIONS[i % CITY_LOCATIONS.length],
    modelCount: 0,
    joinedYear,
  };
});

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// shuffle cities deterministically so entries spread across regions
const shuffledCities = [...CITIES].sort(
  (a, b) => mulberry32(hash(a.id))() - mulberry32(hash(b.id))(),
);

const TARGET = 96;
const NATIONAL_FINALIST_COUNT = 12; // top 12 regions reach the coronation stage
let sash = 1;
const contestants: Contestant[] = [];

function lowerFirst(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function buildBio(name: string, creator: string, city: string, flavor: string, advocacy: string, trait: string): string {
  const advLower = advocacy.toLowerCase();
  const blurb = ADVOCACY_BLURB[advocacy];
  const templates = [
    `${name} is the AI muse ${creator} built to carry ${city}, shaped out of ${flavor}. She competes for ${advLower} — ${blurb} ${trait}`,
    `Conceived by ${creator} out of ${flavor}, ${name} represents ${city} with more than a pretty render. Her cause is ${advLower}: ${blurb} ${trait}`,
    `${name} carries ${city} into the running — a synthetic muse born of ${flavor}. ${trait} Her whole run is for ${advLower}, ${blurb}`,
  ];
  return pick(rng, templates);
}

function buildSignatureQna(city: string, flavor: string, advocacy: string): QnA {
  const advLower = advocacy.toLowerCase();
  return {
    question: `Why should ${city} be proud to send you?`,
    answer:
      `Because I am made of ${flavor}, and I carry it honestly — labeled and watermarked, never pretending to be a woman who never agreed to exist. ` +
      `A muse from ${city} shouldn't just look the part; she should stand for something. Mine is ${advLower}: ${ADVOCACY_BLURB[advocacy]}`,
  };
}

function shuffle<T>(r: () => number, arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function clamp(n: number) {
  return Math.max(50, Math.min(99, Math.round(n * 10) / 10));
}

// ---- pass 1: audition entries per city; highest-quality entry wins the city ----
for (const city of shuffledCities) {
  if (contestants.length >= TARGET) break;
  const region = REGIONS.find((r) => r.id === city.regionId)!;
  const auditions = rng() < 0.35 ? (rng() < 0.4 ? 3 : 2) : 1;

  const entries = Array.from({ length: auditions }, () => range(rng, 0.25, 1));
  entries.sort((a, b) => b - a);

  entries.forEach((q, idx) => {
    // The single strongest entry becomes the city's finalist; the rest stay in auditions.
    const stage: Stage = idx === 0 ? "city_finalist" : "audition";

    // Six competition rounds, scored from craft quality — then the judges' panel
    // score IS the weighted sum of those rounds (segments.ts weights sum to 100).
    const rounds = Object.fromEntries(
      SEGMENTS.map((s) => [s.id, clamp(52 + q * 40 + range(rng, -6, 6))]),
    ) as Record<string, number>;
    const judges = clamp(
      SEGMENTS.reduce((sum, s) => sum + rounds[s.id] * (s.weight / 100), 0),
    );

    const publicScore = clamp(58 + q * 30 + range(rng, -5, 5));
    const craft = clamp(56 + q * 36 + range(rng, -5, 5));
    const sentiment = clamp(55 + q * 32 + range(rng, -6, 6));

    const creator = CREATORS[Math.floor(rng() * CREATORS.length)];
    creator.modelCount++;

    const name = `${pick(rng, FIRST)} ${pick(rng, LAST).trim()}`;
    const id = `${slug(name)}-${sash}`;
    const followers = Math.floor(range(rng, 8, 420) * 1000 + sentiment * 900);
    const seed = hash(id);

    const flavor = REGION_FLAVOR[region.id] ?? "the islands";
    const pref = REGION_ADVOCACY[region.id] ?? ALL_ADVOCACIES;
    const advocacy = rng() < 0.75 ? pick(rng, pref) : pick(rng, ALL_ADVOCACIES);
    const trait = pick(rng, TRAITS);

    const qna: QnA[] = [
      buildSignatureQna(city.name, flavor, advocacy),
      ...shuffle(rng, SHARED_QUESTIONS).slice(0, 1 + (rng() < 0.5 ? 1 : 0)),
    ];

    contestants.push({
      id,
      slug: id,
      name,
      tagline: pick(rng, TAGLINES),
      cityId: city.id,
      regionId: region.id,
      creatorId: creator.id,
      look: {
        hue: hueOf(region.id),
        hue2: (hueOf(region.id) + 42) % 360,
        hair: seed % 4,
        halo: (seed >> 3) % 3,
      },
      bio: buildBio(name, creator.name, city.name, flavor, advocacy, trait),
      advocacy,
      advocacyBlurb: ADVOCACY_BLURB[advocacy],
      stage,
      sashNumber: sash,
      scores: { judges, public: publicScore, craft, sentiment },
      votes: Math.floor(publicScore * range(rng, 240, 1400)),
      followers,
      engagementRate: Number(range(rng, 3.2, 12.8).toFixed(1)),
      qna,
      aiTools: shuffle(rng, AI_TOOLS).slice(0, 2 + Math.floor(rng() * 2)),
      hasVideo: rng() < 0.85,
      rounds,
    });

    sash++;
  });
}

// ---- pass 2: one regional finalist per region (highest final score) ----
for (const region of REGIONS) {
  const cityWinners = contestants.filter(
    (c) => c.regionId === region.id && c.stage === "city_finalist",
  );
  if (cityWinners.length === 0) continue;
  cityWinners.sort((a, b) => finalScore(b.scores) - finalScore(a.scores));
  cityWinners[0].stage = "regional";
}

// ---- pass 3: the top NATIONAL_FINALIST_COUNT regionals advance to nationals ----
// One per region already guaranteed by pass 2, so the coronation field is
// geographically distinct — no region fields two finalists.
const regionalPool = contestants
  .filter((c) => c.stage === "regional")
  .sort((a, b) => finalScore(b.scores) - finalScore(a.scores));
regionalPool.slice(0, NATIONAL_FINALIST_COUNT).forEach((c) => {
  c.stage = "national_finalist";
});

// Note: `crowned` is the schema's terminal stage but is intentionally left
// unassigned — the crown is decided live on coronation night, not pre-seeded.
// The current leader is surfaced as a projected frontrunner, never as "Crowned."

export const CONTESTANTS: Contestant[] = contestants;

// ---- selectors -----------------------------------------------------------
export const creatorById = (id: string) => CREATORS.find((c) => c.id === id);
export const contestantBySlug = (s: string) => CONTESTANTS.find((c) => c.slug === s);
export const contestantsByCity = (cityId: string) =>
  CONTESTANTS.filter((c) => c.cityId === cityId);
export const contestantsByRegion = (regionId: string) =>
  CONTESTANTS.filter((c) => c.regionId === regionId);
export const contestantsByCreator = (creatorId: string) =>
  CONTESTANTS.filter((c) => c.creatorId === creatorId);

export const advancingByStage = (stage: Stage) =>
  CONTESTANTS.filter((c) => c.stage === stage);

/** The single muse advancing out of a city (highest stage, then score). */
export function cityAdvancer(cityId: string): Contestant | undefined {
  return contestantsByCity(cityId).sort(
    (a, b) => STAGE_RANK[b.stage] - STAGE_RANK[a.stage] || finalScore(b.scores) - finalScore(a.scores),
  )[0];
}

export const NATIONAL_FINALISTS = CONTESTANTS.filter(
  (c) => c.stage === "national_finalist",
).sort((a, b) => finalScore(b.scores) - finalScore(a.scores));

export const ACTIVE_CITY_IDS = Array.from(new Set(CONTESTANTS.map((c) => c.cityId)));

export const STATS = {
  contestants: CONTESTANTS.length,
  creators: CREATORS.filter((c) => c.modelCount > 0).length,
  activeCities: ACTIVE_CITY_IDS.length,
  regions: REGIONS.length,
  totalVotes: CONTESTANTS.reduce((s, c) => s + c.votes, 0),
  finalists: NATIONAL_FINALISTS.length,
};

export { cityById, REGIONS, CITIES };
