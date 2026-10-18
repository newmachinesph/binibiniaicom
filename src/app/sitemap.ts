import type { MetadataRoute } from "next";
import { CONTESTANTS, CREATORS } from "@/lib/data";
import { CITIES } from "@/lib/cities";

const BASE = "https://www.binibiniai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = [
    "",
    "/how-it-works",
    "/rounds",
    "/cities",
    "/contestants",
    "/vote",
    "/coronation",
    "/join",
    "/partners",
    "/battle",
    "/bracket",
    "/judges",
    "/ethics",
    "/live",
  ].map((p) => ({ url: `${BASE}${p}`, changeFrequency: "daily" as const }));

  return [
    ...statics,
    ...CONTESTANTS.map((c) => ({
      url: `${BASE}/contestants/${c.slug}`,
      changeFrequency: "daily" as const,
    })),
    ...CITIES.map((c) => ({
      url: `${BASE}/cities/${c.slug}`,
      changeFrequency: "weekly" as const,
    })),
    ...CREATORS.map((c) => ({
      url: `${BASE}/creators/${c.id}`,
      changeFrequency: "weekly" as const,
    })),
  ];
}
