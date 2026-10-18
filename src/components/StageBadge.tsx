import type { Stage } from "@/lib/types";
import { STAGE_LABEL } from "@/lib/types";

const STYLES: Record<Stage, string> = {
  audition: "border-line text-mist",
  city_finalist: "border-gold-deep/50 text-gold-bright",
  regional: "border-orchid/50 text-orchid-bright",
  national_finalist: "border-gold bg-gold/10 text-gold-bright",
  crowned: "border-gold bg-gradient-to-r from-gold/20 to-orchid/20 text-gold-bright",
};

export function StageBadge({ stage, className = "" }: { stage: Stage; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase ${STYLES[stage]} ${className}`}
    >
      {stage === "crowned" && "♛ "}
      {STAGE_LABEL[stage]}
    </span>
  );
}
