import type { MuseLook } from "./portrait";

export type Stage =
  | "audition"
  | "city_finalist"
  | "regional"
  | "national_finalist"
  | "crowned";

export type Creator = {
  id: string;
  handle: string;
  name: string;
  bio: string;
  location: string;
  modelCount: number;
  joinedYear: number;
};

export type QnA = {
  question: string;
  answer: string;
};

export type Scores = {
  /** 0-100 panel score — the weighted sum of the six competition rounds */
  judges: number;
  /** 0-100 derived from public votes */
  public: number;
  /** 0-100 judged craft: technical difficulty + originality (anti-sameface) */
  craft: number;
  /** 0-100 social sentiment / clout */
  sentiment: number;
};

export type Contestant = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  cityId: string;
  regionId: string;
  creatorId: string;
  /** procedural portrait recipe — all visuals are synthesized in-house */
  look: MuseLook;
  bio: string;
  advocacy: string;
  advocacyBlurb: string;
  stage: Stage;
  sashNumber: number;
  scores: Scores;
  votes: number;
  followers: number;
  engagementRate: number;
  qna: QnA[];
  aiTools: string[];
  hasVideo: boolean;
  /** score per competition round, keyed by segment id (0-100) */
  rounds: Record<string, number>;
};

export const STAGE_LABEL: Record<Stage, string> = {
  audition: "Audition",
  city_finalist: "City Finalist",
  regional: "Regional Finalist",
  national_finalist: "National Finalist",
  crowned: "Crowned",
};

export const STAGE_RANK: Record<Stage, number> = {
  audition: 0,
  city_finalist: 1,
  regional: 2,
  national_finalist: 3,
  crowned: 4,
};
