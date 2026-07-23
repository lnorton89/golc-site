import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const SPECTRUM = ["#C0554A", "#CC8A47", "#B6A24C", "#4E9E68", "#1B44D9", "#6A50A8"];

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: "#17181C",
          display: "flex",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 7,
            width: 18,
            height: 2.5,
            borderRadius: 2,
            background: "#F4F1EB",
            display: "flex",
          }}
        />
        <div style={{ position: "absolute", top: 11, left: 6, display: "flex" }}>
          {SPECTRUM.map((c) => (
            <div
              key={c}
              style={{ width: 3, height: 14, background: c, marginRight: 0.6, display: "flex" }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
