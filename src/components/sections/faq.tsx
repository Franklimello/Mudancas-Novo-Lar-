import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { WhatsappIcon } from "@/components/whatsapp-icon"
import { site } from "@/config/site"
import type { Pergunta } from "@/content/faq"
import { cn } from "@/lib/utils"
import { whatsappLink } from "@/lib/whatsapp"

type FaqProps = {
  perguntas: Pergunta[]
  titulo?: string
  className?: string
}

export function Faq({ perguntas, titulo = "Perguntas frequentes", className }: FaqProps) {
  return (
    <section id="perguntas" aria-labelledby="faq-titulo" className={cn("border-t border-linha", className)}>
      <div className="container-site grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="faq-titulo" className="font-letreiro text-[2.1rem] text-marinho sm:text-[2.6rem]">
            {titulo}
          </h2>
          <div className="mt-6 hidden max-w-[22rem] border-l-4 border-petroleo pl-5 lg:block">
            <p className="text-tinta-suave">Não achou a sua dúvida? Pergunte direto para a {site.contactName}.</p>
            <a
              href={whatsappLink("Olá! Tenho uma dúvida sobre mudança.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-marinho px-4 py-2.5 font-semibold text-white transition-colors hover:bg-marinho-2"
            >
              <WhatsappIcon className="size-[18px] text-folha-clara" />
              Perguntar no WhatsApp
            </a>
          </div>
        </div>
        <Accordion type="single" collapsible className="border-t border-linha">
          {perguntas.map((p, i) => (
            <AccordionItem key={p.pergunta} value={`p-${i}`} className="border-b border-linha">
              <AccordionTrigger className="items-center gap-6 rounded-none py-5 text-left text-[1.1rem] font-semibold text-marinho hover:no-underline focus-visible:ring-0 sm:text-[1.15rem] **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-petroleo-texto">
                {p.pergunta}
              </AccordionTrigger>
              <AccordionContent className="max-w-[62ch] pb-6 text-[1.02rem] leading-relaxed text-tinta-suave">
                <p>{p.resposta}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
