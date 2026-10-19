import { absoluteUrl, site } from "@/config/site"
import type { Pergunta } from "@/content/faq"
import type { Servico } from "@/content/servicos"

export const empresaId = absoluteUrl("/#empresa")

export function movingCompanySchema() {
  const { address } = site
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": empresaId,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/logo-novo-lar.png"),
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    slogan: site.slogan,
    telephone: `+${site.whatsapp[0].number}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: address.city,
      addressRegion: address.state,
      addressCountry: address.country,
      ...(address.street ? { streetAddress: address.street } : {}),
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
    },
    areaServed: [
      ...site.valeDoAco.map((name) => ({ "@type": "City", name })),
      { "@type": "State", name: "Minas Gerais" },
    ],
    contactPoint: site.whatsapp.map((w) => ({
      "@type": "ContactPoint",
      telephone: `+${w.number}`,
      contactType: "customer service",
      availableLanguage: "Portuguese",
    })),
    sameAs: [site.instagram.url, site.googleBusinessUrl].filter(Boolean),
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#site"),
    name: site.name,
    url: site.url,
    inLanguage: "pt-BR",
    publisher: { "@id": empresaId },
  }
}

export function faqSchema(perguntas: Pergunta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: perguntas.map((p) => ({
      "@type": "Question",
      name: p.pergunta,
      acceptedAnswer: { "@type": "Answer", text: p.resposta },
    })),
  }
}

export function serviceSchema(servico: Servico) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/servicos/${servico.slug}#servico`),
    name: servico.nome,
    serviceType: servico.nome,
    description: servico.metaDescription,
    url: absoluteUrl(`/servicos/${servico.slug}`),
    provider: { "@id": empresaId },
    areaServed: site.valeDoAco.map((name) => ({ "@type": "City", name })),
  }
}

export function breadcrumbSchema(itens: { nome: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itens.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nome,
      item: absoluteUrl(item.path),
    })),
  }
}
