import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background:
            "radial-gradient(1200px 600px at 10% 10%, #2b2b2b 0%, #0a0a0a 60%)",
          color: "white",
          fontFamily: "Inter, ui-sans-serif, system-ui",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: -1 }}>
          Simon Stancovich
        </div>
        <div style={{ marginTop: 8, fontSize: 28, opacity: 0.9 }}>
          Fullstack Developer · React / TypeScript / Next.js
        </div>
        <div style={{ marginTop: 24, fontSize: 22, opacity: 0.8 }}>
          Clean architecture · Strong UI · Production-quality delivery
        </div>
      </div>
    ),
    { ...size }
  );
}
