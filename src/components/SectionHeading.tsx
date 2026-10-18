import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  center?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, center, className = "" }: Props) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-mist leading-relaxed text-base sm:text-lg">{description}</p>
      )}
    </div>
  );
}
