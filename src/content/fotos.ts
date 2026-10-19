import type { StaticImageData } from "next/image"

import letreiro from "@/assets/fotos/caminhao-letreiro-novo-lar.jpg"
import carregando from "@/assets/fotos/mudanca-carregando-na-rua.jpg"
import menores from "@/assets/fotos/caminhoes-menores-frota.jpg"
import portaLateral from "@/assets/fotos/bau-porta-lateral-predio.jpg"
import cargo from "@/assets/fotos/caminhao-bau-cargo.jpg"
import doisCaminhoes from "@/assets/fotos/dois-caminhoes-bau.jpg"
import cargoFrente from "@/assets/fotos/caminhao-bau-cargo-frente.jpg"

export type Foto = {
  src: StaticImageData
  alt: string
  legenda: string
}

/* Fotos da frota enviadas pelo cliente (material-cliente/novasfotos). */
export const fotos = {
  letreiro: {
    src: letreiro,
    alt: "Caminhão baú branco com o nome Mudanças Novo Lar pintado na lateral, estacionado na rua",
    legenda: "Caminhão baú com o nome da empresa na lateral.",
  },
  carregando: {
    src: carregando,
    alt: "Dois caminhões baú estacionados em uma rua, um deles com a porta lateral aberta durante o carregamento",
    legenda: "Mudança em andamento, com o baú aberto para carregar.",
  },
  menores: {
    src: menores,
    alt: "Dois caminhões baú menores, um Iveco e um Volkswagen, estacionados lado a lado",
    legenda: "Os caminhões menores da frota.",
  },
  portaLateral: {
    src: portaLateral,
    alt: "Caminhão baú de perfil com a porta lateral aberta, em frente a um prédio residencial",
    legenda: "Baú com a porta lateral aberta em frente a um prédio.",
  },
  cargo: {
    src: cargo,
    alt: "Caminhão Ford Cargo prata com baú de alumínio estacionado em frente a um galpão",
    legenda: "Baú fechado, que protege a carga da chuva e da poeira na estrada.",
  },
  doisCaminhoes: {
    src: doisCaminhoes,
    alt: "Dois caminhões baú da empresa estacionados um atrás do outro em uma rua",
    legenda: "Parte da frota de caminhões baú.",
  },
  cargoFrente: {
    src: cargoFrente,
    alt: "Caminhão baú prata visto de frente, estacionado em rua asfaltada",
    legenda: "Caminhão baú pronto para carregar.",
  },
} satisfies Record<string, Foto>
