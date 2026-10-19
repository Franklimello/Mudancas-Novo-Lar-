import type { ReactNode } from "react"

/*
 * Caminhão baú ilustrado com o título "pintado" no baú.
 * O título continua sendo texto de verdade (o H1 da página). Todas as medidas usam
 * cqw (largura do caminhão), então letra, cabine e rodas crescem juntas e o
 * desenho mantém a proporção em qualquer tela.
 */

type CaminhaoTituloProps = {
  children: ReactNode
  /** Texto pequeno pintado no canto do baú, como o telefone nos caminhões de verdade */
  letreiroPequeno?: ReactNode
}

const RODA = 11 // diâmetro em cqw
const CHASSI = 2.2 // altura em cqw
// espaço abaixo do chassi para as rodas. Em % (o padding de um container não pode usar o próprio cqw;
// % de padding é medido pela largura do pai, que é a largura do caminhão)
const FOLGA = 5.5

export function CaminhaoTitulo({ children, letreiroPequeno }: CaminhaoTituloProps) {
  // centro da roda na metade do chassi
  const baseRoda = FOLGA + CHASSI / 2 - RODA / 2

  return (
    <div className="@container relative" style={{ paddingBottom: `${FOLGA}%` }}>
      <div className="flex items-end">
        <Cabine className="block h-auto w-[25%] shrink-0" />
        <div className="bau-caminhao relative min-w-0 flex-1 px-[4.5cqw] pt-[3.6cqw] pb-[4.6cqw]">
          {children}
          {letreiroPequeno ? <div className="mt-[1.6cqw] text-right">{letreiroPequeno}</div> : null}
        </div>
      </div>

      <div aria-hidden="true" className="mr-[3%] ml-[1%] rounded-b-sm bg-[#2f3a45]" style={{ height: `${CHASSI}cqw` }} />

      {/* Sombra no chão */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[3%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(11_37_69/0.22),transparent)]"
        style={{ bottom: `${baseRoda - 1.2}cqw`, height: "2.6cqw" }}
      />

      <Roda style={{ left: `calc(10.5% - ${RODA / 2}cqw)`, bottom: `${baseRoda}cqw`, width: `${RODA}cqw` }} />
      <Roda style={{ left: `calc(85% - ${RODA / 2}cqw)`, bottom: `${baseRoda}cqw`, width: `${RODA}cqw` }} />
    </div>
  )
}

/** Cabine vista de lado, virada para a esquerda (como os caminhões da Novo Lar nas fotos) */
function Cabine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 112" aria-hidden="true" className={className}>
      {/* defletor de ar no teto */}
      <path d="M32 24C36 8 52 5 70 5H100V24Z" fill="#f4f6f8" stroke="#c5ced6" strokeWidth="1.5" />
      {/* corpo da cabine */}
      <path
        d="M17 24H100V112H4V60C4 50 6 42 9 36L13 27C14 25 15.5 24 17 24Z"
        fill="#eef1f4"
        stroke="#b9c3cc"
        strokeWidth="1.5"
      />
      {/* para-brisa */}
      <path d="M11.5 33L23 30V62L6.5 64C6.5 52 8.5 42 11.5 33Z" fill="#33475b" />
      {/* janela lateral e reflexo */}
      <rect x="34" y="32" width="44" height="30" rx="4" fill="#33475b" />
      <path d="M40 58L54 34" stroke="#7d93ab" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      {/* porta e maçaneta */}
      <rect x="30" y="28" width="54" height="74" rx="4" fill="none" stroke="#b9c3cc" strokeWidth="1.5" />
      <rect x="73" y="68" width="8" height="2.6" rx="1.3" fill="#8d99a6" />
      {/* faixa vermelha */}
      <rect x="4" y="86" width="96" height="5" fill="#d7141a" />
      {/* farol */}
      <rect x="4" y="72" width="10" height="8" rx="2" fill="#fff6cc" stroke="#b9c3cc" />
      {/* para-lama da roda dianteira */}
      <path d="M13 112C13 95 26 83 42 83S71 95 71 112Z" fill="#3b4652" />
      {/* para-choque */}
      <rect x="0.5" y="96" width="14" height="14" rx="3" fill="#3b4652" />
      {/* retrovisor */}
      <rect x="0.5" y="36" width="5" height="17" rx="2" fill="#3b4652" />
    </svg>
  )
}

function Roda({ style }: { style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute h-auto" style={style}>
      <circle cx="50" cy="50" r="49" fill="#1f2933" />
      <circle cx="50" cy="50" r="30" fill="#9aa5b1" />
      <circle cx="50" cy="50" r="22" fill="#c9d1d8" />
      <circle cx="50" cy="50" r="8" fill="#6b7785" />
      {[0, 72, 144, 216, 288].map((a) => (
        <circle
          key={a}
          cx={50 + 15 * Math.cos((a * Math.PI) / 180)}
          cy={50 + 15 * Math.sin((a * Math.PI) / 180)}
          r="2.6"
          fill="#6b7785"
        />
      ))}
    </svg>
  )
}
