import { renderOgImage, ogSize, ogContentType } from "@/lib/og-template";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "GOLC Download";

export default async function Image() {
  return renderOgImage({
    eyebrow: "No release yet",
    title: "Download.",
    description:
      "GOLC hasn't reached a qualified release. Track progress on the roadmap or build from source.",
  });
}
