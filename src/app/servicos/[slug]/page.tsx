import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { CheckIcon } from "lucide-react"

import { JsonLd } from "@/components/json-ld"
import { QuoteForm } from "@/components/quote-form"
import { Faq } from "@/components/sections/faq"
import { getServico, servicos } from "@/content/servicos"
import { pageMetadata } from "@/lib/metadata"
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema"

export function generateStaticParams() {
  return servicos.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: PageProps<"/servicos/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const servico = getServico(slug)
  if (!servico) return {}
  return pageMetadata({
    title: servico.metaTitle,
    description: servico.metaDescription,
    path: `/servicos/${servico.slug}`,
  })
}

const imovelPorServico: Record<string, "casa" | "comercio" | "poucos-itens" | ""> = {
  "mudanca-comercial": "comercio",
  "fretes-e-mudancas-pequenas": "poucos-itens",
}

/*
 * O conteúdo depende do slug, então fica dentro de <Suspense>: a navegação mostra
 * o esqueleto na hora e o conteúdo chega do HTML gerado no build. Para os slugs de
 * generateStaticParams, o HTML estático já sai completo (bom para o Google).
 */
export default function ServicoPage(props: PageProps<"/servicos/[slug]">) {
  return (
    <Suspense fallback={<ServicoEsqueleto />}>
      <ServicoConteudo params={props.params} />
    </Suspense>
  )
}

function ServicoEsqueleto() {
  return (
    <div aria-hidden="true" className="container-site pt-14 pb-24 md:pt-20">
      <div className="h-4 w-48 rounded bg-nevoa" />
      <div className="mt-8 h-12 w-full max-w-xl rounded bg-nevoa" />
      <div className="mt-4 h-12 w-2/3 max-w-md rounded bg-nevoa" />
      <div className="mt-10 h-28 w-full max-w-2xl rounded bg-nevoa" />
    </div>
  )
}

async function ServicoConteudo({ params }: { params: PageProps<"/servicos/[slug]">["params"] }) {
  const { slug } = await params
  const servico = getServico(slug)
  if (!servico) notFound()

  const outros = servicos.filter((s) => s.slug !== servico.slug)
  const trilha = [
    { nome: "Início", path: "/" },
    { nome: "Serviços", path: "/#servicos" },
    { nome: servico.nome, path: `/servicos/${servico.slug}` },
  ]

  return (
    <>
      <div className="container-site pt-8 md:pt-12">
        <nav aria-label="Você está em">
          <ol className="flex flex-wrap items-center gap-x-2 text-sm text-tinta-suave">
            {trilha.map((item, i) => (
              <li key={item.path} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true">/</span> : null}
                {i < trilha.length - 1 ? (
                  <Link href={item.path} className="rounded-sm hover:text-marinho hover:underline">
                    {item.nome}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-marinho">
                    {item.nome}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <article>
        <header className="container-site grid gap-10 pt-6 pb-14 md:pb-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16">
          <div>
            <h1 className="font-letreiro max-w-[18ch] text-[2.3rem] text-marinho sm:text-[3rem] lg:text-[3.4rem]">
              {servico.h1}
            </h1>
            <div className="mt-6 max-w-[60ch] space-y-4 text-lg text-tinta-suave">
              {servico.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <figure className="max-w-sm lg:justify-self-end">
            <div className="overflow-hidden rounded-md bg-linha">
              <Image
                src={servico.foto.src}
                alt={servico.foto.alt}
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, 100vw"
                placeholder="blur"
                loading="eager"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-2 text-sm text-tinta-suave">{servico.foto.legenda}</figcaption>
          </figure>
        </header>

        <section aria-labelledby="inclui-titulo" className="bg-nevoa">
          <div className="container-site grid gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 id="inclui-titulo" className="font-letreiro text-[1.9rem] text-marinho sm:text-[2.3rem]">
                O que está incluído
              </h2>
              <ul className="mt-8 space-y-4">
                {servico.inclui.map((item) => (
                  <li key={item} className="flex gap-3 text-lg text-marinho">
                    <CheckIcon className="mt-1 size-5 shrink-0 text-folha" strokeWidth={3} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-[52ch] text-tinta-suave">
                Quer só uma parte? Dá para contratar só o transporte, ou só a embalagem e a montagem. Diga no pedido o
                que você precisa.
              </p>
            </div>
            <QuoteForm
              titulo="Peça o orçamento"
              defaults={{ imovel: imovelPorServico[servico.slug] ?? "" }}
            />
          </div>
        </section>
      </article>

      <Faq perguntas={servico.perguntas} titulo={`Dúvidas sobre ${servico.nome.toLowerCase()}`} />

      <section aria-labelledby="outros-titulo" className="border-t border-linha">
        <div className="container-site py-14 md:py-16">
          <h2 id="outros-titulo" className="font-letreiro-medio text-[1.5rem] text-marinho">
            Outros serviços
          </h2>
          <ul className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-3">
            {outros.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicos/${s.slug}`}
                  className="rounded-sm text-lg font-semibold text-marinho underline decoration-petroleo decoration-2 underline-offset-[6px] hover:decoration-marinho"
                >
                  {s.nome}
                </Link>
                <p className="mt-2 text-[0.95rem] text-tinta-suave">{s.resumo}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd
        data={[
          serviceSchema(servico),
          breadcrumbSchema(trilha.filter((t) => !t.path.includes("#"))),
          faqSchema(servico.perguntas),
        ]}
      />
    </>
  )
}
