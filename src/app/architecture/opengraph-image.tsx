import { renderOgImage, ogSize, ogContentType } from "@/lib/og-template";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "GOLC Architecture";

export default async function Image() {
  return renderOgImage({
    eyebrow: "How the codebase works",
    title: "Architecture.",
    description:
      "The real internal/ package dependency graph, repository layout, and configuration model — interactive, not a diagram.",
  });
}
