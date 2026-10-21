"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { WhatsappIcon } from "@/components/whatsapp-icon"
import { whatsappLink } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

interface Slide {
  category: string
  title: string
  description: string
  hasCta?: boolean
}

const slides: Slide[] = [
  {
    category: "Cuidado em cada detalhe",
    title: "Sua mudança merece cuidado de verdade.",
    description:
      "Cuidamos dos seus pertences com atenção, organização e responsabilidade em cada etapa.",
  },
  {
    category: "Segurança e tranquilidade",
    title: "Você tranquilo. Seus bens em boas mãos.",
    description:
      "Planejamento e cuidado para tornar sua mudança mais simples e segura.",
  },
  {
    category: "Mudanças residenciais",
    title: "Um novo lar começa com uma boa mudança.",
    description:
      "Levamos seus móveis e pertences com o cuidado que essa nova etapa merece.",
  },
  {
    category: "Mudanças comerciais",
    title: "Sua empresa em movimento, sem complicação.",
    description:
      "Organização e eficiência para transportar seus equipamentos e estruturar seu novo espaço.",
  },
  {
    category: "Solicite um orçamento",
    title: "Pronto para mudar?",
    description:
      "Converse com nossa equipe e encontre a solução ideal para sua mudança.",
    hasCta: true,
  },
]

export function VideoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const desktopVideoRef = useRef<HTMLVideoElement | null>(null)
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null)
  const touchStartX = useRef<number | null>(null)

  // Gerencia a reprodução dos vídeos:
  // - Visibilidade controlada por breakpoints CSS (hidden md:block / block md:hidden)
  // - Evita reproduzir os dois vídeos simultaneamente
  // - Respeita prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mediaQuery = window.matchMedia("(min-width: 768px)")

    const syncPlayback = () => {
      const prefersReduced = motionQuery.matches
      const isDesktop = mediaQuery.matches

      if (prefersReduced) {
        desktopVideoRef.current?.pause()
        mobileVideoRef.current?.pause()
        return
      }

      if (isDesktop) {
        // Pausa o vídeo mobile e reproduz o de desktop
        if (mobileVideoRef.current) {
          mobileVideoRef.current.pause()
        }
        if (desktopVideoRef.current) {
          desktopVideoRef.current.muted = true
          const playPromise = desktopVideoRef.current.play()
          if (playPromise !== undefined) {
            playPromise.catch(() => {})
          }
        }
      } else {
        // Pausa o vídeo desktop e reproduz o mobile
        if (desktopVideoRef.current) {
          desktopVideoRef.current.pause()
        }
        if (mobileVideoRef.current) {
          mobileVideoRef.current.muted = true
          const playPromise = mobileVideoRef.current.play()
          if (playPromise !== undefined) {
            playPromise.catch(() => {})
          }
        }
      }
    }

    // Inicia a reprodução correta na montagem
    syncPlayback()

    mediaQuery.addEventListener("change", syncPlayback)
    motionQuery.addEventListener("change", syncPlayback)

    return () => {
      mediaQuery.removeEventListener("change", syncPlayback)
      motionQuery.removeEventListener("change", syncPlayback)
    }
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Rotação automática suave a cada 5.5s (pausada sob interação ou prefers-reduced-motion)
  useEffect(() => {
    if (isPaused) return

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (motionQuery.matches) return

    const timer = setInterval(() => {
      nextSlide()
    }, 5500)

    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  // Navegação por teclado (setas esquerda e direita)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      prevSlide()
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      nextSlide()
    }
  }

  // Suporte a swipe em telas touch
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    setIsPaused(true)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false)
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diffX = touchStartX.current - touchEndX

    if (Math.abs(diffX) > 45) {
      if (diffX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    touchStartX.current = null
  }

  return (
    <section
      role="region"
      aria-roledescription="carrossel"
      aria-label="Destaques institucionais da Mudanças Novo Lar"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex min-h-[440px] h-[520px] sm:h-[540px] md:h-[560px] max-h-[600px] w-full items-center overflow-hidden bg-marinho text-white outline-none focus-visible:ring-2 focus-visible:ring-petroleo focus-visible:ring-inset"
    >
      {/* 
        Vídeos responsivos separados para desktop e mobile:
        - Desktop (>= 768px): videoDeskTop.mp4 (16:9), visível via CSS `hidden md:block`
        - Mobile (< 768px): videoMobile.mp4 (9:16), visível via CSS `block md:hidden`
        - z-0 posiciona o vídeo logo acima do fundo da seção, perfeitamente visível
      */}
      <video
        ref={desktopVideoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/videoDeskTop-poster.jpg"
        className="hidden md:block absolute inset-0 z-0 h-full w-full object-cover object-center pointer-events-none"
        aria-hidden="true"
      >
        <source src="/videos/videoDeskTop.mp4" type="video/mp4" />
      </video>

      <video
        ref={mobileVideoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/videoMobile-poster.jpg"
        className="block md:hidden absolute inset-0 z-0 h-full w-full object-cover object-center pointer-events-none"
        aria-hidden="true"
      >
        <source src="/videos/videoMobile.mp4" type="video/mp4" />
      </video>

      {/* 
        Sobreposição sutil em azul-petróleo e azul-marinho:
        - z-[1] camada uniforme com ~25% de opacidade para tonalidade institucional
        - z-[2] degradê suave mais denso atrás do texto e translúcido sobre o movimento do vídeo
        Garante legibilidade das frases mantendo a dinâmica do caminhão e dos profissionais claramente visível.
      */}
      <div
        className="absolute inset-0 z-[1] bg-petroleo/25 mix-blend-multiply pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-t from-marinho-escuro/85 via-marinho/50 to-transparent md:bg-gradient-to-r md:from-marinho-escuro/85 md:via-marinho/55 md:to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Conteúdo do Carrossel */}
      <div className="container-site relative z-10 w-full py-8 sm:py-12">
        <div className="max-w-[36rem] lg:max-w-[42rem]">
          {/* Slides com transição suave */}
          <div
            aria-live={isPaused ? "polite" : "off"}
            aria-atomic="true"
            className="relative min-h-[220px] sm:min-h-[200px] md:min-h-[210px] flex items-center"
          >
            {slides.map((slide, index) => {
              const isActive = index === currentIndex
              return (
                <div
                  key={slide.category}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} de ${slides.length}: ${slide.category}`}
                  aria-hidden={!isActive}
                  className={cn(
                    "w-full transition-all duration-600 ease-out",
                    isActive
                      ? "relative z-10 opacity-100 translate-y-0 pointer-events-auto"
                      : "absolute inset-0 z-0 opacity-0 translate-y-2 pointer-events-none"
                  )}
                >
                  {/* Indicador de categoria */}
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-folha" aria-hidden="true" />
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-petroleo-claro">
                      {slide.category}
                    </span>
                  </div>

                  {/* Título */}
                  <h2 className="mt-3 font-letreiro text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.08] text-white text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    {slide.title}
                  </h2>

                  {/* Frase complementar / Descrição */}
                  <p className="mt-3.5 max-w-[48ch] text-base sm:text-lg md:text-xl text-white/95 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                    {slide.description}
                  </p>

                  {/* Botão no último slide direcionando ao fluxo do WhatsApp */}
                  {slide.hasCta && (
                    <div className="mt-6">
                      <a
                        href={whatsappLink("Olá! Gostaria de um orçamento para minha mudança com a Novo Lar.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex items-center gap-2.5 rounded-md bg-folha px-5 py-3 text-[1.05rem] font-bold text-white shadow-md transition-colors hover:bg-folha-clara focus-visible:outline-white"
                      >
                        <WhatsappIcon className="size-5 text-white" />
                        <span>Solicitar orçamento</span>
                      </a>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Controles discretos: Indicadores de progresso e botões de navegação */}
          <div className="mt-6 sm:mt-8 flex items-center justify-between gap-4">
            {/* Pontos indicadores */}
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Selecionar slide do carrossel"
            >
              {slides.map((slide, index) => {
                const isActive = index === currentIndex
                return (
                  <button
                    key={slide.category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Ir para o slide ${index + 1}: ${slide.category}`}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "h-2.5 rounded-full transition-all focus-visible:outline-white",
                      isActive
                        ? "w-8 bg-folha"
                        : "w-2.5 bg-white/40 hover:bg-white/75"
                    )}
                  />
                )
              })}
            </div>

            {/* Setas discretas para navegação manual */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Slide anterior"
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-marinho/60 text-white backdrop-blur-xs transition-colors hover:bg-marinho/90 focus-visible:outline-white active:scale-95"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Próximo slide"
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-marinho/60 text-white backdrop-blur-xs transition-colors hover:bg-marinho/90 focus-visible:outline-white active:scale-95"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
