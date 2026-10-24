import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pillowdreamworks.vercel.app";

  const publicRoutes = [
    "",
    "/about",
    "/assessments",
    "/books",
    "/books/bundles",
    "/books/finding-the-centre",
    "/books/psychology-toolkit",
    "/contact",
    "/learn",
    "/pricing",
    "/services",
    "/studio",
    "/legal/cookie",
    "/legal/disclaimer",
    "/legal/privacy",
    "/legal/refund",
    "/legal/terms",
  ];

  const now = new Date();

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/assessments" || route === "/learn" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/assessments" || route === "/services" ? 0.9 : 0.8,
  }));
}
