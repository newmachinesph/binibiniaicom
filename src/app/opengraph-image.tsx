import { ImageResponse } from "next/og";

export const alt = "Binibini AI — The Philippines' first AI beauty pageant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "linear-gradient(160deg, #1a1524 0%, #14111b 55%, #171020 100%)",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* sash stripe */}
        <div
          style={{
            position: "absolute",
            width: 1700,
            height: 130,
            left: -200,
            top: 400,
            transform: "rotate(-9deg)",
            background: "linear-gradient(90deg, #f2d9a4, #e7c27d 40%, #e069b6)",
            opacity: 0.16,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#e7c27d",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#e069b6" }} />
          The Philippines&apos; First AI Beauty Pageant
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 132,
            fontWeight: 700,
            color: "#f5efe2",
            lineHeight: 1,
            display: "flex",
          }}
        >
          Binibini&nbsp;
          <span
            style={{
              background: "linear-gradient(100deg, #f2d9a4, #e7c27d, #e069b6)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            AI
          </span>
        </div>
        <div style={{ marginTop: 34, fontSize: 34, color: "#a89bb4", display: "flex" }}>
          149 cities · one crown · every contestant synthetic, every creator Filipino
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 44,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#7d7089",
            fontSize: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "8px 22px",
              border: "1.5px solid #3a3346",
              borderRadius: 40,
              color: "#e7c27d",
            }}
          >
            AI · BINIBINI
          </div>
          binibiniai.com
        </div>
      </div>
    ),
    { ...size },
  );
}
