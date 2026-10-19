import Image from "next/image"
import Link from "next/link"

import logo from "@/assets/logo-novo-lar-contorno.png"
import { InstagramIcon } from "@/components/instagram-icon"
import { MobileNav } from "@/components/mobile-nav"
import { WhatsappIcon } from "@/components/whatsapp-icon"
import { site } from "@/config/site"
import { whatsappLink } from "@/lib/whatsapp"

export const navLinks = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#depoimentos", label: "Clientes" },
  { href: "/#onde-atendemos", label: "Onde atendemos" },
  { href: "/contato", label: "Contato" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-vermelho text-white [&_:focus-visible]:outline-white">
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-20 xl:gap-6">
        <Link href="/" className="shrink-0 rounded-sm" aria-label={`${site.name}, página inicial`}>
          {/* Versão com contorno branco: a palavra "MUDANÇAS" é vermelha e sumiria no fundo vermelho */}
          <Image
            src={logo}
            alt={site.name}
            sizes="(min-width: 768px) 200px, 150px"
            className="h-auto w-[150px] md:w-[200px]"
            loading="eager"
          />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-[0.95rem] font-bold xl:gap-7 xl:text-base">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm py-2 whitespace-nowrap text-marinho-escuro decoration-2 underline-offset-[6px] hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${site.instagram.handle}`}
            title={`Instagram ${site.instagram.handle}`}
            className="inline-flex size-11 items-center justify-center rounded-md text-marinho-escuro transition-colors hover:bg-black/10"
          >
            <InstagramIcon className="size-6" />
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-md bg-white px-4 py-2.5 text-[0.95rem] font-semibold whitespace-nowrap text-marinho transition-colors hover:bg-nevoa sm:inline-flex"
          >
            <WhatsappIcon className="size-[18px] text-folha" />
            Pedir orçamento
          </a>
          <MobileNav links={navLinks} />
        </div>
      </div>
    </header>
  )
}
