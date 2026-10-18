import type { Metadata } from "next";
import { REGIONS, CITIES, TOTAL_PH_CITIES } from "@/lib/cities";
import { ACTIVE_CITY_IDS, cityAdvancer } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { CitiesExplorer, type CityRow } from "@/components/CitiesExplorer";

export const metadata: Metadata = {
  title: "The Map — Binibini AI",
  description:
    "Every Philippine city fields a muse. Browse all cities by region and meet the contestant advancing from each.",
};

export default function CitiesPage() {
  const cities: CityRow[] = CITIES.map((c) => {
    const advancer = cityAdvancer(c.id);
    return {
      id: c.id,
      name: c.name,
      slug: c.slug,
      regionId: c.regionId,
      active: Boolean(advancer),
      advancer: advancer
        ? {
            id: advancer.id,
            name: advancer.name,
            look: advancer.look,
            sashNumber: advancer.sashNumber,
          }
        : undefined,
    };
  });

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
      <SectionHeading
        eyebrow="The Map"
        title={<>Every city fields a muse.</>}
        description="From the capital to the coast, each Philippine city crowns one contestant to carry it forward. Find your hometown and see who's advancing."
      />
      <p className="mt-6 text-sm text-faint">
        <span className="text-gradient-gold font-display text-lg tabular-nums">
          {ACTIVE_CITY_IDS.length}
        </span>{" "}
        of {TOTAL_PH_CITIES} cities active, across{" "}
        <span className="text-cream">{REGIONS.length}</span> regions.
      </p>

      <div className="mt-8">
        <CitiesExplorer regions={REGIONS} cities={cities} />
      </div>
    </div>
  );
}
