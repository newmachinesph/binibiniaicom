import { ImageResponse } from "next/og";
import { CITIES, regionById } from "@/lib/cities";
import { cityAdvancer } from "@/lib/data";
import { hueOf } from "@/lib/portrait";

export const alt = "Binibini AI city";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = CITIES.find((c) => c.slug === slug);
  const region = city ? regionById(city.regionId) : undefined;
  const advancer = city ? cityAdvancer(city.id) : undefined;
  const hue = city ? hueOf(city.regionId) : 45;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "70px 80px",
          background: `linear-gradient(150deg, hsl(${hue} 50% 17%) 0%, #14111b 65%)`,
          position: "relative",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 1700,
            height: 130,
            left: -200,
            top: 430,
            transform: "rotate(-8deg)",
            background: `linear-gradient(90deg, hsl(${hue} 70% 70%), #e7c27d, #e069b6)`,
            opacity: 0.15,
          }}
        />
        <div style={{ color: "#e7c27d", fontSize: 26, letterSpacing: 7, textTransform: "uppercase", display: "flex" }}>
          Binibini AI · The Map {region ? `· ${region.name}` : ""}
        </div>
        <div style={{ marginTop: 24, fontSize: 120, fontWeight: 700, color: "#f5efe2", lineHeight: 1 }}>
          {city?.name ?? "Every city"}
        </div>
        <div style={{ marginTop: 30, fontSize: 38, color: "#c9bcd6", display: "flex" }}>
          {advancer
            ? `${advancer.name} is advancing · Sash No. ${advancer.sashNumber}`
            : "The crown is open — no muse has claimed this city yet"}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 44,
            left: 80,
            display: "flex",
            gap: 14,
            alignItems: "center",
            color: "#7d7089",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", padding: "8px 22px", border: "1.5px solid #3a3346", borderRadius: 40, color: "#e7c27d" }}>
            AI · BINIBINI
          </div>
          binibiniai.com/cities/{slug}
        </div>
      </div>
    ),
    { ...size },
  );
}
