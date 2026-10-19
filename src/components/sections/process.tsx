import Image from "next/image"

import { fotos, type Foto } from "@/content/fotos"

const etapas = [
  {
    titulo: "Você manda o pedido pelo WhatsApp",
    texto:
      "De onde sai, para onde vai, a data e o que vai na mudança. Um vídeo rápido dos cômodos ajuda a acertar o caminhão e a equipe. Respondemos com o valor.",
  },
  {
    titulo: "Embalamos o que precisa de proteção",
    texto:
      "Mantas acolchoadas nos móveis, meião nos sofás e colchões, e plástico bolha só nos vidros, que vão dentro das caixas.",
  },
  {
    titulo: "Desmontamos e carregamos",
    texto:
      "Camas e armários são desmontados com as ferragens guardadas juntas. No baú, cada peça vai amarrada e travada para não correr.",
  },
  {
    titulo: "Levamos até o endereço novo",
    texto: "Pela cidade ou pela estrada, em caminhão baú fechado, protegido da chuva e da poeira.",
  },
  {
    titulo: "Montamos e deixamos no lugar",
    texto:
      "Você diz onde cada móvel fica e a gente monta. Depois, buscamos o material de embalagem que sobrou.",
  },
]

export function Process() {
  return (
    <section id="como-funciona" aria-labelledby="processo-titulo" className="bg-nevoa">
      <div className="container-site py-16 md:py-24">
        <h2 id="processo-titulo" className="font-letreiro max-w-[20ch] text-[2.1rem] text-marinho sm:text-[2.6rem]">
          Do pedido de orçamento à última peça montada
        </h2>

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <ol className="space-y-9">
            {etapas.map((etapa, i) => (
              <li key={etapa.titulo} className="grid grid-cols-[3rem_1fr] gap-x-4 sm:grid-cols-[3.75rem_1fr]">
                <span
                  aria-hidden="true"
                  className="font-letreiro text-[2.2rem] leading-none text-petroleo sm:text-[2.6rem]"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-letreiro-medio text-[1.25rem] text-marinho sm:text-[1.35rem]">{etapa.titulo}</h3>
                  <p className="mt-1.5 max-w-[52ch] text-tinta-suave">{etapa.texto}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="grid grid-cols-2 items-start gap-3 sm:gap-4 lg:self-start">
            <FotoLegendada foto={fotos.letreiro} sizes="(min-width: 1216px) 280px, (min-width: 1024px) 23vw, 50vw" />
            <div className="space-y-3 sm:space-y-4">
              <FotoLegendada foto={fotos.carregando} sizes="(min-width: 1216px) 280px, (min-width: 1024px) 23vw, 50vw" />
              <FotoLegendada foto={fotos.menores} sizes="(min-width: 1216px) 280px, (min-width: 1024px) 23vw, 50vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FotoLegendada({ foto, className, sizes }: { foto: Foto; className?: string; sizes: string }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-md bg-linha">
        <Image
          src={foto.src}
          alt={foto.alt}
          sizes={sizes}
          placeholder="blur"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-2 text-sm leading-snug text-tinta-suave">{foto.legenda}</figcaption>
    </figure>
  )
}
