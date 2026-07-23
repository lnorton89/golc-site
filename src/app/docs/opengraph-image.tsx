import { renderOgImage, ogSize, ogContentType } from "@/lib/og-template";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "GOLC Docs";

export default async function Image() {
  return renderOgImage({
    eyebrow: "How the program works",
    title: "Docs.",
    description:
      "How a show comes together, the planned interface, and the concepts used consistently across UI, docs, and marketing.",
  });
}
