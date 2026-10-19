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
    "Mudanças residenciais e comerciais em Ipatinga e no Vale do Aço, e mudanças estaduais e interestaduais. Móveis protegidos com mantas acolchoadas, desmontagem, montagem e caminhão baú. Orçamento pelo WhatsApp.",
  slogan: "Mudança segura, ágil e sem estresse.",

  /** Quem atende no WhatsApp */
  contactName: "Marília",

  whatsapp: [
    { number: "5531987425488", display: "(31) 98742-5488" },
    { number: "5531986447020", display: "(31) 98644-7020" },
  ],

  instagram: {
    handle: "@mudancanovolar",
    url: "https://www.instagram.com/mudancanovolar/",
  },

  /** CONFIRMAR: link do perfil da empresa no Google (clientes citam avaliações lá) */
  googleBusinessUrl: "" as string,

  address: {
    city: "Ipatinga",
    state: "MG",
    region: "Vale do Aço",
    country: "BR",
    /** CONFIRMAR: endereço completo e CEP. Deixe vazio para não exibir. */
    street: "" as string,
    postalCode: "" as string,
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
