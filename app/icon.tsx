import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 112,
          position: "relative",
          border: "8px solid rgba(45, 212, 191, 0.35)",
        }}
      >
        {/* CAD Corner Ticks */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#2dd4bf",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 32,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#38bdf8",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 32,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#2dd4bf",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 32,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#38bdf8",
            opacity: 0.6,
          }}
        />

        {/* Monogram Content */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "monospace",
            fontWeight: 800,
            fontSize: 168,
            letterSpacing: "-4px",
          }}
        >
          <span style={{ color: "#2dd4bf", marginRight: 10 }}>{"<"}</span>
          <span style={{ color: "#ffffff", fontWeight: 900 }}>P</span>
          <span style={{ color: "#38bdf8", marginLeft: 10 }}>{"/>"}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
