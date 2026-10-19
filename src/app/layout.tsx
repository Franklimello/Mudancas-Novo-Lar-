import type { Metadata, Viewport } from "next"
import { Archivo } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"

import { CaminhaoRecado } from "@/components/caminhao-recado"
import { JsonLd } from "@/components/json-ld"
import { MobileContactBar } from "@/components/mobile-contact-bar"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { site } from "@/config/site"
import { movingCompanySchema } from "@/lib/schema"

import "./globals.css"

// O site inteiro é gerado no build: HTML estático servido direto da CDN
export const ensureStatic = "navigation"

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
})

const gaId = process.env.NEXT_PUBLIC_GA_ID
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION || site.googleSiteVerification

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Mudanças em Ipatinga e no Vale do Aço | Mudanças Novo Lar",
    template: "%s | Mudanças Novo Lar",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
  verification: gscVerification ? { google: gscVerification } : undefined,
}

export const viewport: Viewport = {
  themeColor: "#d7141a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="sr-only z-50 rounded-md bg-marinho px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileContactBar />
        <CaminhaoRecado />
        <JsonLd data={movingCompanySchema()} />
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  )
}
