import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap:
      "https://kiran-portfolio-git-main-kiran-41e4.vercel.app/sitemap.xml",
  };
}