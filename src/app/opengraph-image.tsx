import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { site } from "@/config/site"

export const alt = "Mudanças Novo Lar: mudanças em Ipatinga e no Vale do Aço"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Lido no carregamento do módulo para a imagem ser gerada no build
const logo = await readFile(join(process.cwd(), "public/logo-novo-lar.png"))
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#0b2545",
          padding: "64px 72px 0",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={640} height={154} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 66, lineHeight: 1.08, letterSpacing: -1 }}>
            <span>Mudanças em Ipatinga</span>
            <span>e no Vale do Aço</span>
          </div>
          <div style={{ fontSize: 30, color: "#4a6178" }}>
            Embalagem, desmontagem, montagem e caminhão baú
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#d9bc8e",
            margin: "0 -72px",
            padding: "26px 72px",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          <span>Orçamento pelo WhatsApp</span>
          <span>{site.whatsapp[0].display}</span>
        </div>
      </div>
    ),
    size
  )
}
