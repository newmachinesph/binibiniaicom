import Link from "next/link";
import { TOTAL_PH_CITIES } from "@/lib/cities";

const COLS = [
  {
    title: "The Pageant",
    links: [
      { href: "/how-it-works", label: "How It Works" },
      { href: "/rounds", label: "The Rounds" },
      { href: "/judges", label: "The Panel" },
      { href: "/coronation", label: "Coronation Night" },
      { href: "/live", label: "The Live Room" },
    ],
  },
  {
    title: "Compete & Vote",
    links: [
      { href: "/contestants", label: "Contestants" },
      { href: "/cities", label: "The Map" },
      { href: "/battle", label: "Battle of the Regions" },
      { href: "/bracket", label: "Ang Top 12 Ko" },
      { href: "/vote", label: "Cast Your Vote" },
    ],
  },
  {
    title: "Trust",
    links: [
      { href: "/ethics", label: "Ethics & Consent" },
      { href: "/partners", label: "Our Partners" },
      { href: "/join", label: "Join as Creator" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid place-items-center h-8 w-8 rounded-full bg-gradient-to-br from-gold-bright to-orchid text-ink font-display font-bold text-lg">
              B
            </span>
            <span className="font-display text-lg">
              Binibini<span className="text-gradient-gold font-semibold"> AI</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-mist leading-relaxed">
            The Philippines&apos; first national beauty pageant for AI contestants. From{" "}
            {TOTAL_PH_CITIES} cities to one crown — every muse built and operated by a
            Filipino AI creator.
          </p>
          <p className="mt-4 text-xs text-faint">
            A demo experience. All contestants are AI-generated and clearly labeled — every
            visual on this site is synthesized in-house, no real faces, ever.
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-sm text-gold-bright mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-mist hover:text-cream transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-faint">
          <p>© 2026 Binibini AI. Made in the Philippines.</p>
          <p className="flex items-center gap-2">
            Powered by responsible, watermarked synthetic media.
          </p>
        </div>
      </div>
    </footer>
  );
}
