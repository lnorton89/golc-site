import { renderOgImage, ogSize, ogContentType } from "@/lib/og-template";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "GOLC Code Reference";

export default async function Image() {
  return renderOgImage({
    eyebrow: "For contributors",
    title: "Code reference.",
    description:
      "Generated Go package reference for GOLC — straight from the source's doc comments.",
  });
}
