import type { Metadata } from "next";
import { CONTESTANTS } from "@/lib/data";
import { REGIONS } from "@/lib/cities";
import { SectionHeading } from "@/components/SectionHeading";
import { ContestantsExplorer } from "@/components/ContestantsExplorer";

export const metadata: Metadata = {
  title: "Contestants — Binibini AI",
  description: "Meet every AI contestant competing in Binibini AI, from audition to national finalist.",
};

export default function ContestantsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
      <SectionHeading
        eyebrow="The Roster"
        title="Meet the muses"
        description="Every contestant is an AI creation built by a Filipino creator. Filter by region, stage, or search your city's bet."
      />
      <div className="mt-8">
        <ContestantsExplorer contestants={CONTESTANTS} regions={REGIONS} />
      </div>
    </div>
  );
}
