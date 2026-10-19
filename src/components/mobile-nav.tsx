"use client"

import Link from "next/link"
import { useState } from "react"
import { MenuIcon } from "lucide-react"

import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { InstagramIcon } from "@/components/instagram-icon"
import { WhatsappIcon } from "@/components/whatsapp-icon"
import { site } from "@/config/site"
import { whatsappLink } from "@/lib/whatsapp"

type MobileNavProps = { links: { href: string; label: string }[] }

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex size-11 items-center justify-center rounded-md text-marinho-escuro hover:bg-black/10 lg:hidden"
        aria-label="Abrir menu"
      >
        <MenuIcon className="size-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[86vw] max-w-sm gap-0 bg-white p-0">
        <div className="border-b border-linha px-6 pt-6 pb-5">
          <SheetTitle className="font-letreiro-medio text-lg text-marinho">Menu</SheetTitle>
          <SheetDescription className="sr-only">Navegação do site da {site.name}</SheetDescription>
        </div>
        <nav aria-label="Menu do celular" className="px-3 py-3">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3.5 text-lg font-medium text-marinho hover:bg-nevoa"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto border-t border-linha px-6 py-6">
          <p className="mb-3 text-sm text-tinta-suave">Orçamento pelo WhatsApp e Instagram</p>
          <ul className="space-y-2">
            {site.whatsapp.map((w) => (
              <li key={w.number}>
                <a
                  href={whatsappLink(undefined, w.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-md bg-marinho px-4 py-3 font-semibold text-white"
                >
                  <WhatsappIcon className="size-5 text-folha-clara" />
                  {w.display}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-md border border-marinho/25 px-4 py-3 font-semibold text-marinho"
              >
                <InstagramIcon className="size-5" />
                {site.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  )
}
