import { ImageResponse } from "next/og";
import { contestantBySlug } from "@/lib/data";
import { cityById, regionById } from "@/lib/cities";
import { finalScore } from "@/lib/scoring";

export const alt = "Binibini AI contestant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = contestantBySlug(slug);
  const city = c ? cityById(c.cityId) : undefined;
  const region = c ? regionById(c.regionId) : undefined;
  const hue = c?.look.hue ?? 45;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: `linear-gradient(160deg, hsl(${hue} 45% 16%) 0%, #14111b 60%)`,
          position: "relative",
          fontFamily: "serif",
          padding: "70px 80px",
        }}
      >
        {/* sash stripe */}
        <div
          style={{
            position: "absolute",
            width: 1700,
            height: 150,
            left: -200,
            top: 300,
            transform: "rotate(-10deg)",
            background: "linear-gradient(90deg, #f2d9a4, #e7c27d 40%, #e069b6)",
            opacity: 0.18,
          }}
        />
        {/* giant sash number */}
        <div
          style={{
            position: "absolute",
            right: 60,
            top: 30,
            fontSize: 300,
            fontWeight: 700,
            color: "transparent",
            backgroundClip: "text",
            background: `linear-gradient(180deg, hsl(${hue} 60% 60% / 0.5), hsl(${hue} 60% 60% / 0.06))`,
          }}
        >
          {c ? `#${c.sashNumber}` : "AI"}
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ color: "#e7c27d", fontSize: 24, letterSpacing: 7, textTransform: "uppercase", display: "flex" }}>
            Binibini AI · Season 01 {region ? `· ${region.short}` : ""}
          </div>
          <div style={{ marginTop: 22, fontSize: 96, fontWeight: 700, color: "#f5efe2", lineHeight: 1.02, maxWidth: 900 }}>
            {c?.name ?? "Meet the muses"}
          </div>
          <div style={{ marginTop: 22, fontSize: 38, color: "#c9bcd6", display: "flex" }}>
            {city ? `Representing ${city.name}` : "The Philippines' first AI beauty pageant"}
          </div>
          <div style={{ marginTop: 40, display: "flex", gap: 16, alignItems: "center" }}>
            {c && (
              <div
                style={{
                  display: "flex",
                  padding: "12px 28px",
                  borderRadius: 50,
                  background: "linear-gradient(90deg, #f2d9a4, #e7c27d)",
                  color: "#221a10",
                  fontSize: 30,
                  fontWeight: 700,
                }}
              >
                Score {finalScore(c.scores).toFixed(1)}
              </div>
            )}
            <div
              style={{
                display: "flex",
                padding: "12px 28px",
                borderRadius: 50,
                border: "2px solid #e069b6",
                color: "#e995cb",
                fontSize: 30,
              }}
            >
              Vote free at binibiniai.com
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 80,
            display: "flex",
            padding: "8px 22px",
            border: "1.5px solid #3a3346",
            borderRadius: 40,
            color: "#e7c27d",
            fontSize: 22,
          }}
        >
          100% AI · disclosed &amp; watermarked
        </div>
      </div>
    ),
    { ...size },
  );
}
