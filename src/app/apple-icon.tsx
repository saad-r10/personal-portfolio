import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
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
          background: "#15140f",
          color: "#f5ff3a",
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: "-0.05em",
        }}
      >
        AB
      </div>
    ),
    size
  );
}
