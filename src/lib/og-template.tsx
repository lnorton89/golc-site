import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

const SPECTRUM = ["#C0554A", "#CC8A47", "#B6A24C", "#4E9E68", "#1B44D9", "#6A50A8"];

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

async function loadFonts() {
  const dir = path.join(process.cwd(), "src", "app", "fonts");
  const [archivo800, archivo700, mono500] = await Promise.all([
    readFile(path.join(dir, "Archivo-800.ttf")),
    readFile(path.join(dir, "Archivo-700.ttf")),
    readFile(path.join(dir, "JetBrainsMono-500.ttf")),
  ]);
  return [
    { name: "Archivo", data: archivo800, weight: 800 as const, style: "normal" as const },
    { name: "Archivo", data: archivo700, weight: 700 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: mono500, weight: 500 as const, style: "normal" as const },
  ];
}

export async function renderOgImage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "#E4E0D8",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 100 100">
            <rect x="2" y="2" width="96" height="96" rx="22" fill="#17181C" />
            <polygon points="50,25 18.5,84 25.5,84" fill="#C0554A" />
            <polygon points="50,25 29.5,84 36.5,84" fill="#CC8A47" />
            <polygon points="50,25 40.5,84 47.5,84" fill="#B6A24C" />
            <polygon points="50,25 51.5,84 58.5,84" fill="#4E9E68" />
            <polygon points="50,25 62.5,84 69.5,84" fill="#1B44D9" />
            <polygon points="50,25 73.5,84 80.5,84" fill="#6A50A8" />
            <rect x="40" y="18" width="20" height="7" rx="3" fill="#F4F1EB" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "Archivo",
                fontWeight: 800,
                fontSize: 30,
                color: "#17181C",
                letterSpacing: -0.6,
              }}
            >
              GOLC
            </span>
            <span
              style={{
                fontFamily: "JetBrains Mono",
                fontWeight: 500,
                fontSize: 13,
                color: "#8A887F",
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Go Lighting Control
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            marginTop: 12,
          }}
        >
          <span
            style={{
              fontFamily: "JetBrains Mono",
              fontWeight: 500,
              fontSize: 18,
              color: "#1B44D9",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              display: "flex",
              fontFamily: "Archivo",
              fontWeight: 800,
              fontSize: 62,
              color: "#17181C",
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
          <span
            style={{
              display: "flex",
              fontFamily: "Archivo",
              fontWeight: 400,
              fontSize: 26,
              color: "#57564E",
              marginTop: 22,
              maxWidth: 920,
              lineHeight: 1.4,
            }}
          >
            {description}
          </span>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {SPECTRUM.map((c) => (
            <div key={c} style={{ display: "flex", flex: 1, height: 6, borderRadius: 3, background: c }} />
          ))}
        </div>
      </div>
    ),
    { ...ogSize, fonts }
  );
}

export { ImageResponse };
