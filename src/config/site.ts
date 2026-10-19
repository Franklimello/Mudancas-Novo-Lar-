/**
 * Dados da empresa usados no site, nos metadados e no JSON-LD.
 * Itens marcados com "CONFIRMAR" precisam ser validados com o cliente.
 */

/*
 * Endereço do site, em ordem de preferência:
 * 1. NEXT_PUBLIC_SITE_URL, se for definida na Vercel
 * 2. VERCEL_PROJECT_PRODUCTION_URL, que a Vercel preenche sozinha com o domínio de
 *    produção: o .vercel.app enquanto não houver domínio próprio, e o domínio
 *    próprio assim que ele for adicionado ao projeto
 * 3. localhost, no desenvolvimento
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  return "http://localhost:3000"
}

const siteUrl = resolveSiteUrl().replace(/\/$/, "")

export const site = {
  name: "Mudanças Novo Lar",
  url: siteUrl,
  locale: "pt_BR",
  description:
    "Empresa de mudanças em Ipatinga e no Vale do Aço: mudança residencial e comercial, fretes e transporte de móveis em caminhão baú, com desmontagem e montagem. Mudança estadual e interestadual. Orçamento pelo WhatsApp.",
  slogan: "Mudança segura, ágil e sem estresse.",

  /** Quem atende no WhatsApp */
  contactName: "Marília",

  whatsapp: [
    { number: "5531987425488", display: "(31) 98742-5488" },
    { number: "5531986447020", display: "(31) 98644-7020" },
  ],

  /** Telefone fixo do cartão da empresa */
  telefoneFixo: { number: "553138237343", display: "(31) 3823-7343" },

  instagram: {
    handle: "@mudancanovolar",
    url: "https://www.instagram.com/mudancanovolar/",
  },

  /** CONFIRMAR: link do perfil da empresa no Google (clientes citam avaliações lá) */
  googleBusinessUrl: "" as string,

  /** Código da meta tag de verificação do Google Search Console (é público, vai no HTML) */
  googleSiteVerification: "WKbHrteBd7ZVAata6JEWdk1U8D2AAF8Smo41RTP5XFU" as string,

  address: {
    city: "Ipatinga",
    state: "MG",
    region: "Vale do Aço",
    country: "BR",
    /** Endereço do cartão da empresa; CEP conferido no ViaCEP */
    street: "Rua Magdala, 185" as string,
    district: "Canaã" as string,
    postalCode: "35164-185" as string,
  },

  /** Cidades atendidas, usadas no texto e no areaServed do JSON-LD */
  valeDoAco: ["Ipatinga", "Coronel Fabriciano", "Timóteo", "Santana do Paraíso"],

  bairrosIpatinga: [
    "Centro",
    "Cidade Nobre",
    "Horto",
    "Castelo",
    "Bom Retiro",
    "Iguaçu",
    "Veneza",
    "Canaã",
    "Bethânia",
    "Cariru",
    "Imbaúbas",
    "Ideal",
    "Vila Ipanema",
    "Bela Vista",
    "Novo Cruzeiro",
    "Parque das Águas",
    "Limoeiro",
    "Esperança",
  ],
} as const

export const primaryWhatsapp = site.whatsapp[0]

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`
}

/** Endereço numa linha só, para exibir e para buscar no Google Maps */
export function enderecoCompleto() {
  const { street, district, city, state, postalCode } = site.address
  return [street, district, `${city} - ${state}`, postalCode].filter(Boolean).join(", ")
}

/*
 * URL final do embed (a mesma para onde o Google redireciona ?q=...&output=embed).
 * Usar direto evita o redirecionamento, que responde com X-Frame-Options.
 */
export function mapsEmbedUrl() {
  const busca = encodeURIComponent(enderecoCompleto()).replace(/%20/g, "+")
  return `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${busca}!6i16`
}

export function mapsRotaUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(enderecoCompleto())}`
}
