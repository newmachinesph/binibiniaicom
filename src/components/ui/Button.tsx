import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-gold-bright to-gold text-ink shadow-[0_8px_30px_-8px_rgba(220,180,90,0.6)] hover:shadow-[0_10px_40px_-6px_rgba(220,180,90,0.75)] hover:-translate-y-0.5",
  outline:
    "border border-line text-cream hover:border-gold hover:text-gold-bright bg-white/0 hover:bg-white/[0.03]",
  ghost: "text-mist hover:text-cream",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  disabled?: boolean;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  href,
  onClick,
  type = "button",
  disabled,
  target,
  rel,
  "aria-label": ariaLabel,
}: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} target={target} rel={rel} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} onClick={onClick} type={type} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
