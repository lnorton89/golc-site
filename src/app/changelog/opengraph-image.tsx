import { renderOgImage, ogSize, ogContentType } from "@/lib/og-template";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "GOLC Changelog";

export default async function Image() {
  return renderOgImage({
    eyebrow: "Coming soon",
    title: "Changelog.",
    description:
      "Release notes publish here once GOLC ships its first qualified build.",
  });
}
