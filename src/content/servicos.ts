import type { Pergunta } from "@/content/faq"
import { fotos, type Foto } from "@/content/fotos"

export type Servico = {
  slug: string
  nome: string
  /** Frase curta para a lista de serviços da home */
  resumo: string
  h1: string
  metaTitle: string
  metaDescription: string
  intro: string[]
  inclui: string[]
  foto: Foto
  perguntas: Pergunta[]
}

/*
 * Embalagem, como o cliente descreveu: mantas acolchoadas nos móveis, meião em
 * sofás e colchões, e plástico bolha só nos vidros que vão dentro das caixas.
 */
export const servicos: Servico[] = [
  {
    slug: "mudanca-residencial",
    nome: "Mudança residencial",
    resumo:
      "Casas e apartamentos em Ipatinga e no Vale do Aço. A gente protege os móveis, desmonta, leva e monta tudo de novo no endereço novo.",
    h1: "Mudança residencial em Ipatinga",
    metaTitle: "Mudança residencial em Ipatinga: casas e apartamentos",
    metaDescription:
      "Mudança de casa e apartamento em Ipatinga e no Vale do Aço, com móveis protegidos em mantas acolchoadas, desmontagem e montagem, em caminhão baú. Orçamento pelo WhatsApp.",
    intro: [
      "Mudar de casa já dá trabalho o bastante. A nossa parte é tirar do seu caminho o que é pesado: proteger os móveis, desmontar o que precisa, carregar o caminhão do jeito certo e montar tudo de novo no endereço novo.",
      "Atendemos todos os bairros de Ipatinga e as cidades do Vale do Aço: Coronel Fabriciano, Timóteo e Santana do Paraíso. Em prédio, combinamos antes com a portaria ou o síndico por onde a mudança sai e entra, se pelo hall ou pela garagem.",
    ],
    inclui: [
      "Móveis protegidos com mantas acolchoadas",
      "Sofás e colchões no meião",
      "Desmontagem e montagem de camas, guarda-roupas e armários",
      "Móveis amarrados e travados dentro do baú",
      "Caminhão baú fechado, que protege da chuva e da poeira",
    ],
    foto: fotos.portaLateral,
    perguntas: [
      {
        pergunta: "Quanto custa uma mudança residencial em Ipatinga?",
        resposta:
          "O valor depende do volume de móveis, da distância entre os endereços, de escada ou elevador e do que você quer que a gente faça, como desmontar e montar. Mande a lista do que vai, ou fotos dos cômodos, e respondemos com o orçamento, sem compromisso.",
      },
      {
        pergunta: "Preciso estar em casa durante a mudança?",
        resposta:
          "É bom ter alguém nos dois endereços: na saída, para mostrar o que vai, e na chegada, para dizer onde cada móvel fica. Pode ser você ou alguém de confiança.",
      },
      {
        pergunta: "Moro em apartamento. O que preciso combinar com o prédio?",
        resposta:
          "Confirme com a portaria ou o síndico os horários permitidos para mudança e se dá para reservar o elevador. A gente combina por onde carregar, se pelo hall ou pela garagem.",
      },
    ],
  },
  {
    slug: "mudanca-estadual-e-interestadual",
    nome: "Mudança estadual e interestadual",
    resumo:
      "Para outras cidades de Minas Gerais ou para outros estados. Viagem em caminhão baú, com a carga protegida e amarrada para aguentar a estrada.",
    h1: "Mudança estadual e interestadual saindo de Ipatinga",
    metaTitle: "Mudança estadual e interestadual saindo de Ipatinga",
    metaDescription:
      "Mudanças de Ipatinga e do Vale do Aço para outras cidades de Minas Gerais e para outros estados, em caminhão baú, com móveis protegidos em mantas acolchoadas e amarrados. Orçamento pelo WhatsApp.",
    intro: [
      "Mudança de longa distância pede outro cuidado com a carga. Na estrada o caminhão balança e freia por horas. Por isso os móveis vão envolvidos em mantas acolchoadas, sofás e colchões no meião, e tudo amarrado dentro do baú, com as peças grandes travando o resto.",
      "Você combina com a gente a data de saída e acompanha pelo WhatsApp. Quem for receber no destino só precisa estar lá para abrir a casa e dizer onde cada coisa fica.",
    ],
    inclui: [
      "Móveis protegidos com mantas acolchoadas para a viagem",
      "Sofás e colchões no meião",
      "Carga amarrada e travada dentro do baú",
      "Desmontagem na saída e montagem no destino",
      "Data de saída e previsão de chegada combinadas antes",
    ],
    foto: fotos.cargo,
    perguntas: [
      {
        pergunta: "Vocês fazem mudança para outro estado?",
        resposta:
          "Sim. Fazemos mudança estadual, para outras cidades de Minas Gerais, e interestadual, para outros estados, saindo de Ipatinga e do Vale do Aço. Informe a cidade de destino no orçamento para calcularmos a viagem.",
      },
      {
        pergunta: "Como é calculado o valor de uma mudança estadual ou interestadual?",
        resposta:
          "Entram na conta a distância, o volume da mudança, o acesso nos dois endereços e os serviços de desmontagem e montagem. Com a lista dos móveis ou fotos dos cômodos conseguimos passar o valor.",
      },
      {
        pergunta: "O caminhão chega até qualquer endereço?",
        resposta:
          "Trabalhamos com caminhão baú, que precisa de rua com acesso para caminhão. Mande o endereço de destino no pedido para confirmarmos antes.",
      },
    ],
  },
  {
    slug: "mudanca-comercial",
    nome: "Mudança comercial",
    resumo:
      "Escritórios, lojas e consultórios. Planejamos a ordem e o horário para a sua empresa ficar parada o mínimo possível.",
    h1: "Mudança de escritório, loja e consultório em Ipatinga",
    metaTitle: "Mudança comercial em Ipatinga: escritórios e lojas",
    metaDescription:
      "Mudança de escritório, loja e consultório em Ipatinga e no Vale do Aço, com equipamentos protegidos em mantas acolchoadas, desmontagem e montagem de móveis. Orçamento pelo WhatsApp.",
    intro: [
      "Numa mudança comercial, cada dia parado pesa. Combinamos com você a ordem do que sai e do que chega primeiro, e um horário que atrapalhe o menos possível o atendimento.",
      "Mesas, cadeiras, arquivos, prateleiras, equipamentos e estoque vão protegidos e identificados por setor, para que no endereço novo cada coisa vá direto para o lugar certo.",
    ],
    inclui: [
      "Desmontagem e montagem de mesas, estações de trabalho e prateleiras",
      "Computadores, monitores e equipamentos protegidos com mantas acolchoadas",
      "Caixas identificadas por setor para agilizar a arrumação",
      "Horário combinado com antecedência",
    ],
    foto: fotos.doisCaminhoes,
    perguntas: [
      {
        pergunta: "Dá para fazer a mudança fora do horário comercial?",
        resposta: "Dá para combinar. Fale com a gente com antecedência e diga qual horário atrapalha menos a sua empresa.",
      },
      {
        pergunta: "Como os computadores e equipamentos são transportados?",
        resposta:
          "Protegidos com mantas acolchoadas e levados no baú fechado, separados dos móveis pesados.",
      },
    ],
  },
  {
    slug: "embalagem-e-montagem-de-moveis",
    nome: "Embalagem e montagem de móveis",
    resumo:
      "Mantas acolchoadas nos móveis, meião em sofás e colchões, plástico bolha nos vidros que vão em caixas. Desmontamos e montamos camas, armários e guarda-roupas.",
    h1: "Embalagem, desmontagem e montagem de móveis",
    metaTitle: "Embalagem de mudança e montagem de móveis em Ipatinga",
    metaDescription:
      "Móveis protegidos com mantas acolchoadas, sofás e colchões no meião, e desmontagem e montagem de camas e guarda-roupas em Ipatinga e no Vale do Aço.",
    intro: [
      "É na proteção que se decide se a mudança chega inteira. Os móveis vão envolvidos em mantas acolchoadas, que amortecem batidas e atrito no transporte. Sofás e colchões vão no meião. O plástico bolha fica só para os vidros, que seguem dentro das caixas.",
      "Camas, guarda-roupas, armários e racks são desmontados com cuidado, com parafusos e ferragens guardados juntos, e montados de novo no endereço novo.",
    ],
    inclui: [
      "Mantas acolchoadas nos móveis",
      "Meião em sofás e colchões",
      "Plástico bolha nos vidros que vão em caixas",
      "Desmontagem e montagem de camas, guarda-roupas e armários",
      "Recolhimento do material de embalagem que sobrar",
    ],
    foto: fotos.cargoFrente,
    perguntas: [
      {
        pergunta: "Por que mantas acolchoadas em vez de plástico bolha?",
        resposta:
          "A manta acolchoada envolve o móvel inteiro e amortece melhor as batidas e o atrito dentro do caminhão. O plástico bolha usamos só nos vidros, como copos, taças e pratos, que vão dentro das caixas.",
      },
      {
        pergunta: "Como vão os sofás e colchões?",
        resposta: "Vão protegidos no meião durante todo o transporte, do carregamento até o endereço novo.",
      },
      {
        pergunta: "O que acontece com o material de embalagem depois?",
        resposta: "Você separa o que sobrou e a gente busca. Não precisa ficar com o lixo da mudança em casa.",
      },
    ],
  },
]

export function getServico(slug: string) {
  return servicos.find((s) => s.slug === slug)
}
