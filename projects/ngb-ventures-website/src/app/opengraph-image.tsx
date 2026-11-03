import { ImageResponse } from "next/og";

export const alt = "NGB Ventures: Your Strategic Manufacturing & Sourcing Partner in India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#151515", color: "#F6F3ED", padding: 72, fontFamily: "serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: 999, border: "2px solid #A98758", display: "flex" }} />
          <div style={{ fontSize: 34, letterSpacing: 2 }}>NGB VENTURES</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, lineHeight: 1.02 }}>India’s Manufacturing Potential.</div>
          <div style={{ fontSize: 72, lineHeight: 1.02, color: "#A98758", fontStyle: "italic" }}>Your Global Business Advantage.</div>
        </div>
        <div style={{ fontSize: 22, color: "#B5B1AA", letterSpacing: 3 }}>SOURCING · PRIVATE LABEL · QUALITY · EXPORT — PUNE, INDIA</div>
      </div>
    ),
    size,
  );
}
