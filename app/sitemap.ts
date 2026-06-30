import type { MetadataRoute } from "next";
import { LANDINGS, SITE_URL } from "@/lib/landings";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...LANDINGS.map((l) => ({
      url: `${SITE_URL}/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
