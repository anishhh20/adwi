
// 🔴 REQUIRED for `output: "export"`
export const dynamic = "force-static";

export default function sitemap(){
  return [
    {
      url: "https://www.adwitechnologies.com/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://www.adwitechnologies.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.adwitechnologies.com/services",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.adwitechnologies.com/contact",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
