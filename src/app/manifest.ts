import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Binibini AI — The Philippines' AI Pageant",
    short_name: "Binibini AI",
    description:
      "The first national beauty pageant for AI contestants. 149 cities, one crown.",
    start_url: "/",
    display: "standalone",
    background_color: "#14111b",
    theme_color: "#14111b",
    icons: [{ src: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
  };
}
