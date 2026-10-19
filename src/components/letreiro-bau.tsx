"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * Letreiro do baú que troca de frase de tempos em tempos.
 * - O H1 fica sempre no HTML com a frase principal (SEO e leitores de tela leem só ele);
 *   as outras frases são visuais (aria-hidden).
 * - Todas ficam empilhadas na mesma célula do grid, então o baú não muda de altura.
 * - A troca para com o mouse em cima, com o hero fora da tela ou a aba escondida,
 *   e não acontece para quem pediu "reduzir movimento".
 */

type LetreiroBauProps = {
  titulo: string
  frases: string[]
  className?: string
  /** Intervalo entre as trocas, em ms */
  intervalo?: number
}

export function LetreiroBau({ titulo, frases, className, intervalo = 6000 }: LetreiroBauProps) {
  const total = frases.length + 1
  const [{ atual, anterior }, setIndices] = useState<{ atual: number; anterior: number | null }>({
    atual: 0,
    anterior: null,
  })
  const [pausado, setPausado] = useState(false)
  const [visivel, setVisivel] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const reduzir = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entrada]) => setVisivel(entrada.isIntersecting), { threshold: 0.2 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduzir || pausado || !visivel) return
    const id = setInterval(() => {
      if (document.visibilityState !== "visible") return
      setIndices(({ atual: i }) => ({ atual: (i + 1) % total, anterior: i }))
    }, intervalo)
    return () => clearInterval(id)
  }, [reduzir, pausado, visivel, total, intervalo])

  const estado = (i: number) =>
    i === atual
      ? "translate-y-0 opacity-100"
      : i === anterior
        ? "-translate-y-[0.4em] opacity-0"
        : "translate-y-[0.4em] opacity-0"

  const camada =
    "[grid-area:1/1] transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none"

  return (
    <div
      ref={ref}
      className="grid"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <h1 id="hero-titulo" className={cn(className, camada, estado(0))}>
        {titulo}
      </h1>
      {frases.map((frase, i) => (
        <p
          key={frase}
          aria-hidden="true"
          className={cn(className, camada, estado(i + 1), i + 1 !== atual && "pointer-events-none select-none")}
        >
          {frase}
        </p>
      ))}
    </div>
  )
}
