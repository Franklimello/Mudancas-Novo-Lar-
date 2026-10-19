import { CaminhaoTitulo } from "@/components/caminhao-titulo"
import { QuoteForm } from "@/components/quote-form"
import { WhatsappIcon } from "@/components/whatsapp-icon"
import { primaryWhatsapp, site } from "@/config/site"
import { whatsappLink } from "@/lib/whatsapp"

export function Hero() {
  return (
    <section aria-labelledby="hero-titulo">
      <div className="container-site grid gap-12 pt-10 pb-16 md:pt-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-16 lg:pt-20 lg:pb-24">
        <div className="lg:sticky lg:top-28 lg:self-start lg:pt-6">
          {/* O título vem "pintado" no baú, como o letreiro dos caminhões da empresa */}
          <CaminhaoTitulo
            letreiroPequeno={
              <p className="font-letreiro-medio text-[2.7cqw] text-vermelho">{primaryWhatsapp.display}</p>
            }
          >
            <h1 id="hero-titulo" className="font-letreiro text-[5.7cqw] text-balance text-marinho">
              Sua mudança em Ipatinga, cuidada como se fosse a nossa.
            </h1>
          </CaminhaoTitulo>

          <p className="mt-8 max-w-[52ch] text-lg text-tinta-suave sm:text-xl sm:leading-relaxed">
            A gente protege os móveis, desmonta, leva e monta de novo. Casas, apartamentos e comércios em Ipatinga e no Vale do
            Aço, e mudanças estaduais e interestaduais.
          </p>

          <figure className="mt-10 max-w-[30rem] border-l-4 border-folha pl-5">
            <blockquote className="font-letreiro-medio text-[1.35rem] text-marinho sm:text-[1.5rem]">
              <p>“Tudo chegou direitinho, sem nenhum estrago.”</p>
            </blockquote>
            <figcaption className="mt-2 text-[0.95rem] text-tinta-suave">
              Mensagem de uma cliente pelo WhatsApp, julho de 2025
            </figcaption>
          </figure>

          <div className="mt-10">
            <p className="text-[0.95rem] text-tinta-suave">Prefere chamar direto? Fale com a {site.contactName}:</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
              {site.whatsapp.map((w) => (
                <li key={w.number}>
                  <a
                    href={whatsappLink(undefined, w.number)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm text-lg font-semibold text-marinho underline decoration-petroleo decoration-2 underline-offset-[6px] hover:decoration-marinho"
                  >
                    <WhatsappIcon className="size-5 text-petroleo-texto" />
                    {w.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:pt-2">
          <QuoteForm />
        </div>
      </div>
    </section>
  )
}
