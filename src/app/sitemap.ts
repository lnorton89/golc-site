import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://golc-site.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/architecture", "/roadmap", "/docs", "/download", "/changelog", "/reference"];
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
