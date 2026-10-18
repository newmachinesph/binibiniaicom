"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { StreakChip } from "./StreakChip";

const NAV = [
  { href: "/contestants", label: "Contestants" },
  { href: "/cities", label: "Cities" },
  { href: "/battle", label: "Battle" },
  { href: "/rounds", label: "Rounds" },
  { href: "/vote", label: "Vote" },
  { href: "/live", label: "Live", live: true },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-ink/80 border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-16">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid place-items-center h-8 w-8 rounded-full bg-gradient-to-br from-gold-bright to-orchid text-ink font-display font-bold text-lg">
            B
          </span>
          <span className="font-display text-lg tracking-tight">
            Binibini<span className="text-gradient-gold font-semibold"> AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm rounded-full transition-colors ${
                  active ? "text-gold-bright" : "text-mist hover:text-cream"
                }`}
              >
                {item.live && (
                  <span className="h-1.5 w-1.5 rounded-full bg-orchid animate-[twinkle_1.4s_ease-in-out_infinite]" />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="hidden lg:block">
            <StreakChip />
          </div>
          <Button href="/join" size="sm">
            Join as Creator
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden grid place-items-center h-10 w-10 rounded-full border border-line text-cream"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-ink/95 backdrop-blur-xl px-5 py-4 flex flex-col gap-1">
          <div className="mb-2">
            <StreakChip />
          </div>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2.5 rounded-lg text-sm ${
                pathname === item.href ? "text-gold-bright bg-white/[0.03]" : "text-mist"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/join" size="sm" className="mt-2">
            Join as Creator
          </Button>
        </div>
      )}
    </header>
  );
}
