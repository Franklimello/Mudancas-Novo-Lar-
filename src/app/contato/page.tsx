import type { Metadata } from "next"
import { PhoneIcon } from "lucide-react"

import { JsonLd } from "@/components/json-ld"
import { MapaEndereco } from "@/components/mapa-endereco"
import { QuoteForm } from "@/components/quote-form"
import { WhatsappIcon } from "@/components/whatsapp-icon"
import { site } from "@/config/site"
import { pageMetadata } from "@/lib/metadata"
import { breadcrumbSchema } from "@/lib/schema"
import { whatsappLink } from "@/lib/whatsapp"

export const metadata: Metadata = pageMetadata({
  title: "Contato e orçamento de mudança em Ipatinga",
  description:
    "Fale com a Mudanças Novo Lar pelo WhatsApp (31) 98742-5488 ou (31) 98644-7020. Rua Magdala, 185, Canaã, Ipatinga. Orçamento de mudança no Vale do Aço, estadual e interestadual.",
  path: "/contato",
})

export default function ContatoPage() {
  const { address } = site
  return (
    <>
      <div className="container-site grid gap-12 pt-10 pb-20 md:pt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <h1 className="font-letreiro max-w-[14ch] text-[2.4rem] text-marinho sm:text-[3.1rem]">
            Fale com a gente
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg text-tinta-suave">
            O atendimento é pelo WhatsApp, com a {site.contactName}. Mande de onde sai, para onde vai, a data e o que
            vai na mudança. Fotos ou um vídeo dos cômodos ajudam a calcular certo.
          </p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-sm text-tinta-suave">WhatsApp</dt>
              {site.whatsapp.map((w) => (
                <dd key={w.number} className="mt-1">
                  <a
                    href={whatsappLink(undefined, w.number)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm text-xl font-semibold text-marinho underline decoration-petroleo decoration-2 underline-offset-[6px] hover:decoration-marinho"
                  >
                    <WhatsappIcon className="size-5 text-petroleo-texto" />
                    {w.display}
                  </a>
                </dd>
              ))}
            </div>
            <div>
              <dt className="text-sm text-tinta-suave">Instagram</dt>
              <dd className="mt-1">
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm text-xl font-semibold text-marinho underline decoration-petroleo decoration-2 underline-offset-[6px] hover:decoration-marinho"
                >
                  {site.instagram.handle}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-tinta-suave">Telefone fixo</dt>
              <dd className="mt-1">
                <a
                  href={`tel:+${site.telefoneFixo.number}`}
                  className="inline-flex items-center gap-2 rounded-sm text-xl font-semibold text-marinho underline decoration-petroleo decoration-2 underline-offset-[6px] hover:decoration-marinho"
                >
                  <PhoneIcon className="size-5 text-petroleo-texto" aria-hidden="true" />
                  {site.telefoneFixo.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-tinta-suave">Endereço</dt>
              <dd className="mt-1 text-xl font-semibold text-marinho">
                {address.street}, {address.district}
                <br />
                {address.city}/{address.state}, CEP {address.postalCode}
              </dd>
            </div>
          </dl>
        </div>

        <QuoteForm />
      </div>

      <section aria-labelledby="mapa-titulo" className="border-t border-linha">
        <div className="container-site py-14 md:py-20">
          <h2 id="mapa-titulo" className="font-letreiro text-[1.9rem] text-marinho sm:text-[2.3rem]">
            Onde estamos
          </h2>
          <MapaEndereco className="mt-8" />
        </div>
      </section>
      <JsonLd
        data={breadcrumbSchema([
          { nome: "Início", path: "/" },
          { nome: "Contato", path: "/contato" },
        ])}
      />
    </>
  )
}
