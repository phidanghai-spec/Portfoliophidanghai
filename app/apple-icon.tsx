import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b1528 0%, #050b14 100%)",
          borderRadius: 40,
          position: "relative",
          border: "3px solid rgba(45, 212, 191, 0.35)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "monospace",
            fontWeight: 800,
            fontSize: 60,
            letterSpacing: "-2px",
          }}
        >
          <span style={{ color: "#2dd4bf", marginRight: 4 }}>{"<"}</span>
          <span style={{ color: "#ffffff", fontWeight: 900 }}>P</span>
          <span style={{ color: "#38bdf8", marginLeft: 4 }}>{"/>"}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
