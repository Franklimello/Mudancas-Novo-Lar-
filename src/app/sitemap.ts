import type { MetadataRoute } from "next"

import { absoluteUrl } from "@/config/site"
import { fotos } from "@/content/fotos"
import { servicos } from "@/content/servicos"

// Atualize ao publicar mudanças relevantes de conteúdo
const ultimaAtualizacao = "2026-10-19"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: ultimaAtualizacao,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl(fotos.letreiro.src.src), absoluteUrl(fotos.carregando.src.src), absoluteUrl(fotos.menores.src.src)],
    },
    ...servicos.map((s) => ({
      url: absoluteUrl(`/servicos/${s.slug}`),
      lastModified: ultimaAtualizacao,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [absoluteUrl(s.foto.src.src)],
    })),
    {
      url: absoluteUrl("/contato"),
      lastModified: ultimaAtualizacao,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ]
}
