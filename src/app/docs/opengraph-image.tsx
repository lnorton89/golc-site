import { renderOgImage, ogSize, ogContentType } from "@/lib/og-template";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "GOLC Docs";

export default async function Image() {
  return renderOgImage({
    eyebrow: "Coming soon",
    title: "Docs.",
    description:
      "Reference docs publish here as the command model, API, and TypeScript SDK stabilize.",
  });
}
