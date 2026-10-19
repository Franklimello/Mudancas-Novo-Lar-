import Image from "next/image"
import Link from "next/link"

import { servicos } from "@/content/servicos"

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="border-t border-linha">
      <div className="container-site grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="servicos-titulo" className="font-letreiro text-[2.1rem] text-marinho sm:text-[2.6rem] lg:text-[2.3rem] xl:text-[2.6rem]">
            O que a gente faz
          </h2>
          <p className="mt-4 max-w-[40ch] text-lg text-tinta-suave">
            Da primeira caixa à última peça montada. Você escolhe: mudança completa, só o transporte dos móveis ou um frete de
            poucos itens.
          </p>
        </div>

        <ul className="divide-y divide-linha border-y border-linha">
          {servicos.map((servico) => (
            <li
              key={servico.slug}
              className="group relative grid grid-cols-[minmax(0,1fr)_6.5rem] items-start gap-4 py-7 sm:grid-cols-[minmax(0,1fr)_11rem] sm:gap-8 sm:py-8"
            >
              <div>
                <h3 className="font-letreiro-medio text-[1.35rem] text-marinho sm:text-[1.65rem]">
                  <Link
                    href={`/servicos/${servico.slug}`}
                    className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-4"
                  >
                    {servico.nome}
                  </Link>
                </h3>
                <p className="mt-2 max-w-[54ch] text-tinta-suave">{servico.resumo}</p>
                <span
                  aria-hidden="true"
                  className="mt-3 inline-block text-[0.95rem] font-semibold text-petroleo-texto underline decoration-2 underline-offset-[6px] group-hover:decoration-marinho"
                >
                  Ver detalhes
                </span>
              </div>
              <div className="overflow-hidden rounded-md bg-linha">
                <Image
                  src={servico.foto.src}
                  alt=""
                  sizes="(min-width: 640px) 176px, 104px"
                  placeholder="blur"
                  className="aspect-[4/3] h-auto w-full object-cover"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
