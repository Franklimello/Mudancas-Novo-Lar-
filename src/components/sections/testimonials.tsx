import { conversas, type Conversa } from "@/content/depoimentos"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

export function Testimonials() {
  return (
    <section id="depoimentos" aria-labelledby="depoimentos-titulo" className="bg-marinho text-white">
      <div className="container-site py-16 md:py-24">
        <div className="max-w-[44rem]">
          <h2 id="depoimentos-titulo" className="font-letreiro text-[2.1rem] sm:text-[2.6rem]">
            O que os clientes mandam depois da mudança
          </h2>
          <p className="mt-4 text-lg text-[#b6d7e2]">
            Trechos de conversas no WhatsApp que a {site.contactName} guardou e publicou no Instagram. Os nomes dos
            clientes ficaram de fora.
          </p>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {conversas.map((conversa) => (
            <ConversaCard key={conversa.id} conversa={conversa} />
          ))}
        </div>

        <p className="mt-14 text-[#b6d7e2]">
          Tem mais no Instagram, nos destaques de feedbacks:{" "}
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm font-semibold text-white underline decoration-folha decoration-2 underline-offset-[6px] hover:decoration-white"
          >
            {site.instagram.handle}
          </a>
          {site.googleBusinessUrl ? (
            <>
              {" "}
              e nas{" "}
              <a
                href={site.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm font-semibold text-white underline decoration-folha decoration-2 underline-offset-[6px] hover:decoration-white"
              >
                avaliações do Google
              </a>
            </>
          ) : null}
          .
        </p>
      </div>
    </section>
  )
}

function ConversaCard({ conversa }: { conversa: Conversa }) {
  return (
    <article aria-label={`Conversa de ${conversa.dataLegivel}`}>
      <header className="mb-4 flex items-baseline justify-between gap-4 border-b border-white/15 pb-3">
        <p className="font-semibold">{conversa.contexto}</p>
        <time dateTime={conversa.data} className="shrink-0 text-sm text-[#b6d7e2]">
          {conversa.dataLegivel}
        </time>
      </header>
      <ul className="space-y-2.5">
        {conversa.mensagens.map((m, i) => {
          const empresa = m.de === "empresa"
          const anterior = conversa.mensagens[i - 1]
          const primeiraDoBloco = !anterior || anterior.de !== m.de
          return (
            <li key={i} className={cn("flex flex-col", empresa ? "items-end" : "items-start")}>
              {primeiraDoBloco ? (
                <span className="mb-1 px-1 text-xs text-[#b6d7e2]">{empresa ? site.contactName : "Cliente"}</span>
              ) : null}
              <p
                className={cn(
                  "max-w-[88%] rounded-2xl px-4 py-2.5 text-[0.98rem] leading-relaxed",
                  empresa
                    ? "rounded-tr-[4px] bg-petroleo-texto text-white"
                    : "rounded-tl-[4px] bg-white text-marinho",
                  !primeiraDoBloco && (empresa ? "rounded-tr-2xl" : "rounded-tl-2xl")
                )}
              >
                {m.texto}
              </p>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
