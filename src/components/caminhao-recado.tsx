"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useAnimate, useReducedMotion } from "motion/react"

import caminhao from "@/assets/caminhao-novo-lar.png"
import { WhatsappIcon } from "@/components/whatsapp-icon"
import { whatsappLink } from "@/lib/whatsapp"

/*
 * Caminhãozinho estacionado no canto da tela. Ao clicar, ele atravessa a tela para a
 * esquerda puxando uma faixa com um recado (que leva ao WhatsApp) e depois volta para
 * a vaga. Com "reduzir movimento", a faixa só aparece acima do caminhão, sem ele andar.
 */

const recados = [
  "Partiu casa nova? A gente leva!",
  "Tudo protegido e amarrado no baú. Bora?",
  "Mudança em Ipatinga? Já tô indo!",
  "Orçamento sem compromisso no WhatsApp",
]

const mensagemWhatsapp = "Olá! Vi o caminhãozinho no site e quero um orçamento de mudança."

type Fase = "parado" | "andando" | "voltando"

export function CaminhaoRecado() {
  const [grupo, animate] = useAnimate<HTMLDivElement>()
  const faixaRef = useRef<HTMLDivElement>(null)
  const [fase, setFase] = useState<Fase>("parado")
  const [indice, setIndice] = useState(0)
  const [estatico, setEstatico] = useState(false)
  const [dica, setDica] = useState(false)
  const reduzir = useReducedMotion()

  // Dica "Me clica!" uma vez por sessão
  useEffect(() => {
    let jaViu = false
    try {
      jaViu = sessionStorage.getItem("nl-caminhao-dica") === "1"
    } catch {}
    if (jaViu) return
    const mostrar = setTimeout(() => setDica(true), 5000)
    const esconder = setTimeout(() => {
      setDica(false)
      try {
        sessionStorage.setItem("nl-caminhao-dica", "1")
      } catch {}
    }, 10000)
    return () => {
      clearTimeout(mostrar)
      clearTimeout(esconder)
    }
  }, [])

  // Versão sem movimento: a faixa some sozinha depois de alguns segundos
  useEffect(() => {
    if (!estatico) return
    const t = setTimeout(() => setEstatico(false), 7000)
    return () => clearTimeout(t)
  }, [estatico])

  async function partir() {
    setDica(false)
    if (reduzir) {
      setEstatico((v) => !v)
      if (!estatico) setIndice((i) => (i + 1) % recados.length)
      return
    }
    if (fase !== "parado" || !grupo.current) return

    setFase("andando")
    // espera a faixa entrar no DOM para medir até onde ela vai
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
    const fimDaFaixa = faixaRef.current?.getBoundingClientRect().right ?? window.innerWidth + 400
    const distancia = fimDaFaixa + 24
    const duracao = Math.min(9.5, Math.max(4.5, distancia / 220))

    await animate(grupo.current, { x: -distancia }, { duration: duracao, ease: [0.42, 0, 0.85, 0.9] })

    setFase("voltando")
    setIndice((i) => (i + 1) % recados.length)
    await animate(grupo.current, { x: [160, 0] }, { duration: 1.2, ease: [0.2, 0.8, 0.3, 1] })
    setFase("parado")
  }

  const recado = recados[indice]
  const andando = fase === "andando"

  return (
    <div className="pointer-events-none fixed right-3 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-30 md:right-5 md:bottom-5 print:hidden">
      <div ref={grupo} className="relative">
        {/* Dica */}
        <AnimatePresence>
          {dica && fase === "parado" && !estatico ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="absolute right-2 bottom-full mb-1.5 rounded-full bg-marinho px-3 py-1 text-xs font-semibold whitespace-nowrap text-white"
            >
              Me clica!
            </motion.p>
          ) : null}
        </AnimatePresence>

        {/* Faixa estática (reduzir movimento) */}
        <AnimatePresence>
          {estatico ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="pointer-events-auto absolute right-0 bottom-full mb-2"
            >
              <Faixa recado={recado} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          onClick={partir}
          disabled={fase !== "parado"}
          aria-label="Caminhão da Mudanças Novo Lar: clique para ver o recado"
          title="Me clica!"
          className="pointer-events-auto relative block rounded-md disabled:cursor-default"
        >
          {/* Tremidinha de motor ligado (CSS) por fora, sacolejo da estrada (Motion) por dentro */}
          <span className={fase === "parado" ? "caminhao-motor block" : "block"}>
            <motion.span
              className="block"
              animate={andando ? { y: [0, -1.5, 0] } : { y: 0 }}
              transition={andando ? { repeat: Infinity, duration: 0.32, ease: "easeInOut" } : { duration: 0.2 }}
            >
              <Image
                src={caminhao}
                alt=""
                sizes="(min-width: 768px) 112px, 88px"
                className="h-auto w-[88px] drop-shadow-[0_3px_4px_rgb(11_37_69/0.25)] md:w-[112px]"
              />
            </motion.span>
          </span>
          {andando ? (
            <span aria-hidden="true" className="caminhao-fumaca">
              <span />
              <span />
              <span />
            </span>
          ) : null}
        </button>

        {/* Corda + faixa puxada atrás do caminhão */}
        {andando ? (
          <div ref={faixaRef} className="pointer-events-auto absolute bottom-[38%] left-full flex items-center">
            <svg aria-hidden="true" width="40" height="14" viewBox="0 0 40 14" className="shrink-0">
              <path d="M0 3 Q20 15 40 3" fill="none" stroke="#0b2545" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <motion.div
              style={{ transformOrigin: "0% 50%" }}
              animate={{ rotate: [-1.5, 1.5] }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 0.8, ease: "easeInOut" }}
            >
              <Faixa recado={recado} />
            </motion.div>
          </div>
        ) : null}

        <span className="sr-only" aria-live="polite">
          {andando || estatico ? recado : ""}
        </span>
      </div>
    </div>
  )
}

function Faixa({ recado }: { recado: string }) {
  return (
    <a
      href={whatsappLink(mensagemWhatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-md border-2 border-marinho bg-white px-3.5 py-2 text-sm font-bold whitespace-nowrap text-marinho shadow-[0_2px_0_rgb(11_37_69/0.15)] md:text-[0.95rem]"
    >
      <WhatsappIcon className="size-4 shrink-0 text-[#25a244]" />
      {recado}
    </a>
  )
}
