import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        <div style={{ display: "flex", fontSize: 140, fontWeight: 600, fontStyle: "italic" }}>
          <span style={{ color: "#e2231a" }}>RS</span>
          <span style={{ color: "#ffffff" }}>.MOTOR</span>
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 32, color: "#8a8a8a" }}>
          Málaga · Coches de importación con garantía
        </div>
      </div>
    ),
    { ...size }
  );
}
