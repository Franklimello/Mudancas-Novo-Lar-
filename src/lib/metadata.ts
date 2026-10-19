import type { Metadata } from "next"

import { site } from "@/config/site"

/*
 * Quando uma página define `openGraph`, o Next substitui o objeto do layout em vez
 * de mesclar, e a imagem de app/opengraph-image deixa de ser herdada. Este helper
 * monta os metadados completos de cada página interna.
 */
const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Mudanças Novo Lar: mudanças em Ipatinga e no Vale do Aço",
}

type PageMetadataInput = {
  title: string
  description: string
  path: string
}

export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: ogImage.url, alt: ogImage.alt }],
    },
  }
}
