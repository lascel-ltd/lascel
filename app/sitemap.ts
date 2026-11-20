import type { MetadataRoute } from "next";
import { site } from "@/site.config";

// Written to out/sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/privacy/"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: site.lastUpdated,
  }));
}
