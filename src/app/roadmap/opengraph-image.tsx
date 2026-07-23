import { renderOgImage, ogSize, ogContentType } from "@/lib/og-template";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "GOLC Roadmap";

export default async function Image() {
  return renderOgImage({
    eyebrow: "Eleven dependency-ordered phases",
    title: "Roadmap.",
    description:
      "Each phase proves a working, reviewable capability before the next depends on it — from offline foundation to Windows release.",
  });
}
