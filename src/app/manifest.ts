import type { MetadataRoute } from "next"

import { site } from "@/config/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Novo Lar",
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#d7141a",
    lang: "pt-BR",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}
