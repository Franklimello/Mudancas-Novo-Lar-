import Image from "next/image"
import Link from "next/link"

import logo from "@/assets/logo-novo-lar-contorno.png"
import { InstagramIcon } from "@/components/instagram-icon"
import { navLinks } from "@/components/site-header"
import { WhatsappIcon } from "@/components/whatsapp-icon"
import { site } from "@/config/site"
import { servicos } from "@/content/servicos"
import { whatsappLink } from "@/lib/whatsapp"

const linkRodape = "rounded-sm text-[#c9d6e2] underline-offset-4 hover:text-white hover:underline"

export function SiteFooter() {
  const { address } = site
  return (
    <footer className="bg-marinho pb-24 text-[#c9d6e2] md:pb-0 [&_:focus-visible]:outline-white">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-12">
        <div>
          <Image src={logo} alt={site.name} sizes="190px" className="h-auto w-[190px]" />
          <p className="mt-5 max-w-[34ch] text-[0.95rem]">
            Mudanças residenciais e comerciais em {address.city} e no {address.region}, e mudanças estaduais e
            interestaduais.
          </p>
        </div>

        <nav aria-label="Serviços">
          <h2 className="font-semibold text-white">Serviços</h2>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            {servicos.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicos/${s.slug}`} className={linkRodape}>
                  {s.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Rodapé">
          <h2 className="font-semibold text-white">No site</h2>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkRodape}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-semibold text-white">Contato</h2>
          <address className="mt-3 space-y-2.5 text-[0.95rem] not-italic">
            {site.whatsapp.map((w) => (
              <p key={w.number}>
                <a
                  href={whatsappLink(undefined, w.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 ${linkRodape}`}
                >
                  <WhatsappIcon className="size-4 text-folha-clara" />
                  {w.display}
                </a>
              </p>
            ))}
            <p>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${linkRodape}`}
              >
                <InstagramIcon className="size-4 text-white" />
                {site.instagram.handle}
              </a>
            </p>
            <p>
              {address.street ? `${address.street}, ` : ""}
              {address.city}, {address.state}
              {address.postalCode ? `, CEP ${address.postalCode}` : ""}
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="container-site py-5 text-sm">
          {site.name}. {site.slogan}
        </p>
      </div>
    </footer>
  )
}
