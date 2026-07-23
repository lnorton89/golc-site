import { renderOgImage, ogSize, ogContentType } from "@/lib/og-template";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "GOLC — Lighting control that behaves.";

export default async function Image() {
  return renderOgImage({
    eyebrow: "Status: early development",
    title: "Lighting control that behaves.",
    description:
      "Deterministic Art-Net playback, TypeScript automation, a public API, and autonomous LLM control — built in Go.",
  });
}
