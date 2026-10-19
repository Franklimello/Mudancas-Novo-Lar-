import { PhoneIcon } from "lucide-react"

import { WhatsappIcon } from "@/components/whatsapp-icon"
import { primaryWhatsapp } from "@/config/site"
import { whatsappLink } from "@/lib/whatsapp"

/* Barra fixa no celular: o contato fica sempre a um toque */
export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-linha bg-white/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        <a
          href={`tel:+${primaryWhatsapp.number}`}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md border border-marinho/25 font-semibold text-marinho"
        >
          <PhoneIcon className="size-[18px]" aria-hidden="true" />
          Ligar
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-[1.6] items-center justify-center gap-2 rounded-md bg-marinho font-semibold whitespace-nowrap text-white"
        >
          <WhatsappIcon className="size-5 text-folha-clara" />
          Pedir orçamento
        </a>
      </div>
    </div>
  )
}
