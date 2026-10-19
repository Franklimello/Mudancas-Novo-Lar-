/*
 * Trechos transcritos de conversas reais no WhatsApp, publicadas pela própria
 * empresa nos destaques do Instagram. Os nomes dos clientes foram omitidos;
 * a grafia foi levemente ajustada (ex.: "vcs" para "vocês").
 */

export type Mensagem = {
  de: "cliente" | "empresa"
  texto: string
}

export type Conversa = {
  id: string
  /** ISO, usado no atributo datetime */
  data: string
  dataLegivel: string
  contexto: string
  mensagens: Mensagem[]
}

export const conversas: Conversa[] = [
  {
    id: "julho-2025",
    data: "2025-07",
    dataLegivel: "julho de 2025",
    contexto: "Mudança entregue em outra cidade",
    mensagens: [
      {
        de: "cliente",
        texto:
          "Ei Marília, boa noite! Meu marido falou que recebeu a mudança lá. Tudo chegou direitinho, sem nenhum estrago, vocês são excelentes e super caprichosos. Amei a experiência, que Deus abençoe vocês imensamente. Obrigada!",
      },
      {
        de: "empresa",
        texto: "Boa noite, que bacana, fico feliz! Faço como se fosse para mim 😍 Chegamos em Ipatinga.",
      },
    ],
  },
  {
    id: "outubro-2021",
    data: "2021-10",
    dataLegivel: "outubro de 2021",
    contexto: "Mudança em prédio",
    mensagens: [
      {
        de: "cliente",
        texto:
          "Marília, parabéns pelo trabalho, os rapazes trabalham muito bem, excelente. Dei uma gorjeta no fim, de agradecimento. Fiquem bem e sucesso!",
      },
      { de: "empresa", texto: "Obrigada vocês! Fico muito feliz. Avalia a gente no Google se puder 😊" },
      { de: "cliente", texto: "Justo, avaliação feita!" },
    ],
  },
  {
    id: "abril-2021",
    data: "2021-04",
    dataLegivel: "abril de 2021",
    contexto: "Mudança residencial",
    mensagens: [
      {
        de: "cliente",
        texto:
          "Bom dia, Marília! Parabéns pelo trabalho e pela equipe. Pessoal educado, atenciosos e prestativos.",
      },
      { de: "cliente", texto: "O papel e o plástico bolha, vocês recolhem também?" },
      { de: "empresa", texto: "O que você separar aí, eu busco." },
    ],
  },
  {
    id: "agosto-2020",
    data: "2020-08",
    dataLegivel: "agosto de 2020",
    contexto: "Mudança residencial",
    mensagens: [
      { de: "cliente", texto: "Muito obrigado! Trabalho sensacional!" },
      { de: "empresa", texto: "Eu que agradeço! Tentamos fazer o melhor por nossos clientes 🙂" },
      { de: "cliente", texto: "Galera gente fina demais!" },
    ],
  },
]
