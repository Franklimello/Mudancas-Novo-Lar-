import Image from "next/image"

import { InstagramIcon } from "@/components/instagram-icon"
import { WhatsappIcon } from "@/components/whatsapp-icon"
import { site } from "@/config/site"
import { fotos } from "@/content/fotos"
import { whatsappLink } from "@/lib/whatsapp"

/* Os números em letra grande, como vêm pintados na lateral do baú, ao lado da frota */
export function Cta() {
  return (
    <section aria-labelledby="cta-titulo" className="bg-nevoa">
      <div className="container-site grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_26rem]">
        <div>
          <h2 id="cta-titulo" className="font-letreiro-medio max-w-[24ch] text-[1.6rem] text-marinho sm:text-[1.9rem]">
            Vai mudar? Mande a lista do que vai e o endereço novo.
          </h2>
          <ul className="mt-8 flex flex-col gap-3 sm:gap-4">
            {site.whatsapp.map((w) => (
              <li key={w.number}>
                <a
                  href={whatsappLink(undefined, w.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Chamar no WhatsApp: ${w.display}`}
                  className="group inline-flex items-center gap-3 rounded-sm text-marinho sm:gap-4"
                >
                  <WhatsappIcon className="size-7 shrink-0 text-folha sm:size-10" />
                  <span className="font-letreiro text-[1.6rem] tracking-[-0.02em] whitespace-nowrap tabular-nums underline decoration-transparent decoration-4 underline-offset-8 transition-colors group-hover:decoration-petroleo min-[400px]:text-[1.85rem] sm:text-[3rem] lg:text-[2.8rem] xl:text-[3.5rem]">
                    {w.display}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2.5 rounded-md border-2 border-marinho px-5 py-3 text-[1.05rem] font-semibold text-marinho transition-colors hover:bg-marinho hover:text-white"
          >
            <InstagramIcon className="size-5" />
            Ver fotos no Instagram {site.instagram.handle}
          </a>
        </div>

        <figure className="hidden lg:block">
          <div className="overflow-hidden rounded-md bg-linha">
            <Image
              src={fotos.doisCaminhoes.src}
              alt={fotos.doisCaminhoes.alt}
              sizes="(min-width: 1280px) 416px, 352px"
              placeholder="blur"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-2 text-sm text-tinta-suave">{fotos.doisCaminhoes.legenda}</figcaption>
        </figure>
      </div>
    </section>
  )
}
