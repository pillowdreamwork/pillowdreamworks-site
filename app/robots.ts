import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/testing", "/api/"],
      },
    ],
    sitemap: "https://pillowdreamworks.vercel.app/sitemap.xml",
  };
}
