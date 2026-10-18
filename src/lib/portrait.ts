/**
 * Procedural muse portraits — every visual on the site is synthesized in-house.
 * One SVG string generator, consumed by <MusePortrait> (inline) and the
 * share-card canvas (rasterized). No external images, no real faces.
 *
 * Art direction: elegant silhouette, terno butterfly sleeves, parol halo,
 * diagonal sash, region-coded palette, visible AI watermark.
 */

export type MuseLook = {
  /** primary regional hue (0-360) */
  hue: number;
  /** companion hue for gradients */
  hue2: number;
  /** hair silhouette variant 0-3 */
  hair: number;
  /** halo variant 0-2 */
  halo: number;
};

export type PortraitMode = "portrait" | "editorial" | "stage";

/** Region identity hues — also the palette for city/region rivalry UI. */
export const REGION_HUES: Record<string, number> = {
  ncr: 45, // metro gold
  car: 160, // pine
  "region-i": 75, // amber fields
  "region-ii": 130, // valley leaf
  "region-iii": 155, // rice emerald
  "region-iv-a": 340, // rose
  "region-iv-b": 200, // island aqua
  "region-v": 25, // mayon ember
  "region-vi": 35, // coral
  "region-vii": 250, // cobalt
  "region-viii": 290, // violet
  "region-ix": 185, // teal
  "region-x": 110, // lime highlands
  "region-xi": 320, // magenta
  "region-xii": 60, // sun
  "region-xiii": 210, // river cyan
  barmm: 270, // royal
};

export const hueOf = (regionId: string) => REGION_HUES[regionId] ?? 45;

const GOLD = "#e7c27d";
const GOLD_BRIGHT = "#f2d9a4";
const ORCHID = "#e069b6";
const INK = "#14111b";

// ---------------------------------------------------------------- fragments

function defs(uid: string, look: MuseLook) {
  const { hue, hue2 } = look;
  return `<defs>
    <linearGradient id="bg-${uid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#16121d"/>
      <stop offset="1" stop-color="hsl(${hue} 45% 13%)"/>
    </linearGradient>
    <radialGradient id="glow-${uid}" cx="0.5" cy="0.34" r="0.62">
      <stop offset="0" stop-color="hsl(${hue2} 70% 62%)" stop-opacity="0.28"/>
      <stop offset="1" stop-color="hsl(${hue2} 70% 62%)" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="skin-${uid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#282033"/>
      <stop offset="1" stop-color="#130f18"/>
    </linearGradient>
    <linearGradient id="sleeve-${uid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="hsl(${hue} 65% 62%)" stop-opacity="0.75"/>
      <stop offset="1" stop-color="hsl(${hue2} 60% 45%)" stop-opacity="0.35"/>
    </linearGradient>
    <linearGradient id="sash-${uid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${GOLD_BRIGHT}"/>
      <stop offset="1" stop-color="${ORCHID}"/>
    </linearGradient>
    <radialGradient id="vig-${uid}" cx="0.5" cy="0.5" r="0.75">
      <stop offset="0.62" stop-color="#0b0910" stop-opacity="0"/>
      <stop offset="1" stop-color="#0b0910" stop-opacity="0.6"/>
    </radialGradient>
    <pattern id="scan-${uid}" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="1" fill="#ffffff" opacity="0.045"/>
    </pattern>
  </defs>`;
}

/** Hair silhouettes, drawn behind the head. */
function hairPath(v: number, uid: string) {
  const fill = `url(#skin-${uid})`;
  switch (v % 4) {
    case 0: // long straight mane
      return `<path fill="${fill}" d="M450,258 C575,258 650,340 650,455 L650,950 C650,1002 615,1032 570,1032 L330,1032 C285,1032 250,1002 250,950 L250,455 C250,340 325,258 450,258 Z"/>`;
    case 1: // cascading waves
      return `<path fill="${fill}" d="M450,258 C580,258 655,345 648,460 C642,540 668,592 650,662 C632,732 664,792 648,862 C635,932 600,984 558,1004 L342,1004 C300,984 265,932 252,862 C236,792 268,732 250,662 C232,592 258,540 252,460 C245,345 320,258 450,258 Z"/>`;
    case 2: // regal updo with bun
      return `<circle cx="450" cy="242" r="60" fill="${fill}"/>
        <ellipse cx="450" cy="352" rx="104" ry="102" fill="${fill}"/>
        <path fill="${fill}" d="M356,392 C348,452 360,492 380,516 L364,520 C344,488 336,444 344,396 Z"/>
        <path fill="${fill}" d="M544,392 C552,452 540,492 520,516 L536,520 C556,488 564,444 556,396 Z"/>`;
    default: // sculpted bob
      return `<path fill="${fill}" d="M450,262 C570,262 640,350 640,462 C640,574 586,642 450,642 C314,642 260,574 260,462 C260,350 330,262 450,262 Z"/>`;
  }
}

/** Halo behind the figure — parol star, ring, or rays. */
function haloSvg(v: number, look: MuseLook, cx = 450, cy = 390) {
  const c = `hsl(${look.hue2} 72% 68%)`;
  switch (v % 3) {
    case 0: {
      // parol: two overlapping squares = 8-point star
      const s = 330;
      const x = cx - s / 2;
      const y = cy - s / 2;
      return `<g stroke="${c}" stroke-opacity="0.4" fill="none" stroke-width="2.5">
        <rect x="${x}" y="${y}" width="${s}" height="${s}" rx="6"/>
        <rect x="${x}" y="${y}" width="${s}" height="${s}" rx="6" transform="rotate(45 ${cx} ${cy})"/>
        <circle cx="${cx}" cy="${cy - s * 0.72}" r="5" fill="${c}" stroke="none" fill-opacity="0.8"/>
      </g>`;
    }
    case 1: {
      // double ring with orbit dots
      const dots = Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return `<circle cx="${(cx + Math.cos(a) * 258).toFixed(1)}" cy="${(cy + Math.sin(a) * 258).toFixed(1)}" r="4" fill="${c}" fill-opacity="0.7"/>`;
      }).join("");
      return `<g fill="none" stroke="${c}">
        <circle cx="${cx}" cy="${cy}" r="228" stroke-opacity="0.45" stroke-width="2.5"/>
        <circle cx="${cx}" cy="${cy}" r="258" stroke-opacity="0.2" stroke-width="1.5"/>
        ${dots}
      </g>`;
    }
    default: {
      // radiant spokes
      const rays = Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const x1 = cx + Math.cos(a) * 205;
        const y1 = cy + Math.sin(a) * 205;
        const x2 = cx + Math.cos(a) * 282;
        const y2 = cy + Math.sin(a) * 282;
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
      }).join("");
      return `<g stroke="${c}" stroke-opacity="0.38" stroke-width="2.5" stroke-linecap="round">
        ${rays}<circle cx="${cx}" cy="${cy}" r="196" fill="none" stroke-opacity="0.18"/>
      </g>`;
    }
  }
}

/** The full figure: hair, head, neck/shoulders, terno sleeves, jewelry, sash. */
function figureSvg(uid: string, look: MuseLook, sash?: number) {
  const skin = `url(#skin-${uid})`;
  const sashBand = sash
    ? `<g transform="rotate(-24 450 780)">
        <rect x="404" y="500" width="92" height="600" rx="10" fill="url(#sash-${uid})" opacity="0.92"/>
        <rect x="404" y="500" width="92" height="600" rx="10" fill="none" stroke="#0f0c14" stroke-opacity="0.25"/>
        <text x="450" y="798" transform="rotate(90 450 780)" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="46" fill="#221a10" letter-spacing="4">No. ${sash}</text>
      </g>`
    : "";
  return `
    ${hairPath(look.hair, uid)}
    <ellipse cx="450" cy="390" rx="92" ry="115" fill="${skin}"/>
    <path fill="${skin}" d="M405,498 L405,600 C405,626 380,642 340,654 C228,688 150,782 150,932 L150,1125 L750,1125 L750,932 C750,782 672,688 560,654 C520,642 495,626 495,600 L495,498 Z"/>
    <path d="M365,332 A92 115 0 0 1 535,332" fill="none" stroke="${GOLD_BRIGHT}" stroke-opacity="0.3" stroke-width="3"/>
    <path fill="url(#sleeve-${uid})" d="M345,662 C305,558 222,538 180,580 C148,612 158,694 232,736 C286,766 330,740 352,700 Z"/>
    <path fill="url(#sleeve-${uid})" d="M555,662 C595,558 678,538 720,580 C752,612 742,694 668,736 C614,766 570,740 548,700 Z"/>
    <circle cx="352" cy="470" r="5" fill="${GOLD}"/><circle cx="352" cy="484" r="3" fill="${GOLD}" opacity="0.8"/>
    <circle cx="548" cy="470" r="5" fill="${GOLD}"/><circle cx="548" cy="484" r="3" fill="${GOLD}" opacity="0.8"/>
    <circle cx="414" cy="592" r="4" fill="${GOLD}"/><circle cx="450" cy="606" r="4" fill="${GOLD}"/><circle cx="486" cy="592" r="4" fill="${GOLD}"/>
    <circle cx="450" cy="632" r="7" fill="${GOLD_BRIGHT}"/>
    ${sashBand}`;
}

function watermark(x: number, y: number) {
  return `<g>
    <rect x="${x}" y="${y}" width="176" height="40" rx="20" fill="#0f0d14" fill-opacity="0.8" stroke="#3a3346" stroke-width="1"/>
    <circle cx="${x + 24}" cy="${y + 20}" r="4" fill="${ORCHID}"/>
    <text x="${x + 40}" y="${y + 26}" font-family="Arial, sans-serif" font-size="17" letter-spacing="3" fill="${GOLD}">AI · BINIBINI</text>
  </g>`;
}

// ---------------------------------------------------------------- modes

function portraitMode(uid: string, look: MuseLook, sash?: number) {
  const W = 900;
  const H = 1125;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style="display:block">
    ${defs(uid, look)}
    <rect width="${W}" height="${H}" fill="url(#bg-${uid})"/>
    <rect width="${W}" height="${H}" fill="url(#glow-${uid})"/>
    ${haloSvg(look.halo, look)}
    ${figureSvg(uid, look, sash)}
    <rect width="${W}" height="${H}" fill="url(#scan-${uid})"/>
    <rect width="${W}" height="${H}" fill="url(#vig-${uid})"/>
    ${watermark(24, H - 64)}
  </svg>`;
}

function editorialMode(uid: string, look: MuseLook) {
  const W = 900;
  const H = 675;
  const c = `hsl(${look.hue} 70% 64%)`;
  const stars = [
    [180, 480, 26],
    [760, 140, 20],
    [640, 540, 14],
  ]
    .map(
      ([x, y, r]) =>
        `<g stroke="${c}" stroke-opacity="0.5" fill="none" stroke-width="1.5">
          <rect x="${x - r}" y="${y - r}" width="${r * 2}" height="${r * 2}"/>
          <rect x="${x - r}" y="${y - r}" width="${r * 2}" height="${r * 2}" transform="rotate(45 ${x} ${y})"/>
        </g>`,
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style="display:block">
    ${defs(uid, look)}
    <rect width="${W}" height="${H}" fill="url(#bg-${uid})"/>
    <rect width="${W}" height="${H}" fill="url(#glow-${uid})"/>
    <g transform="translate(0 -60)">${haloSvg(0, look, 450, 400)}</g>
    ${stars}
    <path fill="url(#sleeve-${uid})" opacity="0.65" d="M430,675 C380,545 260,520 205,575 C162,618 175,700 265,742 L430,742 Z"/>
    <path fill="url(#sleeve-${uid})" opacity="0.65" d="M470,675 C520,545 640,520 695,575 C738,618 725,700 635,742 L470,742 Z"/>
    <rect width="${W}" height="${H}" fill="url(#scan-${uid})"/>
    <rect width="${W}" height="${H}" fill="url(#vig-${uid})"/>
    ${watermark(24, H - 64)}
  </svg>`;
}

function stageMode(uid: string, look: MuseLook, sash?: number) {
  const W = 1600;
  const H = 900;
  const audience = Array.from({ length: 26 }, (_, i) => {
    const x = 60 + ((i * 137 + look.hue * 3) % (W - 120));
    const y = 856 + ((i * 53) % 30);
    return `<circle cx="${x}" cy="${y}" r="3" fill="#ffffff" opacity="0.1"/>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style="display:block">
    ${defs(uid, look)}
    <rect width="${W}" height="${H}" fill="#0e0c12"/>
    <rect width="${W}" height="${H}" fill="url(#glow-${uid})"/>
    <polygon points="800,-60 520,900 1080,900" fill="hsl(${look.hue2} 60% 80%)" opacity="0.1"/>
    <polygon points="800,-60 660,900 940,900" fill="hsl(${look.hue2} 70% 88%)" opacity="0.14"/>
    <g transform="translate(521 172) scale(0.62)">${haloSvg(look.halo, look)}${figureSvg(uid, look, sash)}</g>
    <rect x="0" y="838" width="${W}" height="4" fill="hsl(${look.hue} 40% 40%)" opacity="0.5"/>
    <rect x="0" y="842" width="${W}" height="58" fill="#0a080d"/>
    ${audience}
    <rect width="${W}" height="${H}" fill="url(#scan-${uid})"/>
    <rect width="${W}" height="${H}" fill="url(#vig-${uid})"/>
    ${watermark(28, H - 66)}
  </svg>`;
}

// ---------------------------------------------------------------- exports

export function portraitSvg(
  look: MuseLook,
  mode: PortraitMode,
  uid: string,
  sash?: number,
): string {
  // ids inside SVG must be unique per instance on a page
  const safe = uid.replace(/[^a-z0-9-]/gi, "").slice(0, 40) + "-" + mode;
  if (mode === "editorial") return editorialMode(safe, look);
  if (mode === "stage") return stageMode(safe, look, sash);
  return portraitMode(safe, look, sash);
}

/** Small medallion for creator studios — initials in a gold ring. */
export function creatorMarkSvg(name: string, uid: string): string {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const hue = (Array.from(uid).reduce((a, ch) => a + ch.charCodeAt(0), 0) * 37) % 360;
  const safe = uid.replace(/[^a-z0-9-]/gi, "").slice(0, 40);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%" style="display:block">
    <defs>
      <linearGradient id="cm-${safe}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${GOLD_BRIGHT}"/><stop offset="1" stop-color="${ORCHID}"/>
      </linearGradient>
      <radialGradient id="cmb-${safe}" cx="0.5" cy="0.4" r="0.8">
        <stop offset="0" stop-color="hsl(${hue} 40% 22%)"/><stop offset="1" stop-color="${INK}"/>
      </radialGradient>
    </defs>
    <circle cx="60" cy="60" r="57" fill="url(#cmb-${safe})" stroke="url(#cm-${safe})" stroke-width="3"/>
    <text x="60" y="72" text-anchor="middle" font-family="Georgia, serif" font-size="38" fill="${GOLD_BRIGHT}">${initials}</text>
    <circle cx="60" cy="16" r="3" fill="${ORCHID}"/>
  </svg>`;
}
