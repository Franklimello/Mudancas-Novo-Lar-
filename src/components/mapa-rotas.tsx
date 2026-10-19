import { cn } from "@/lib/utils"

/*
 * Mapa ilustrativo (fora de escala) das rotas saindo de Ipatinga.
 * Só SVG e CSS: as linhas pontilhadas "fluem" com stroke-dashoffset (globals.css)
 * e os pontinhos percorrem cada rota com <animateMotion>. Com "reduzir movimento"
 * ativado no sistema, as animações param e os pontinhos somem.
 */

type Destino = {
  id: string
  nome: string
  x: number
  y: number
  /** Curva da rota (ponto de controle da Bézier quadrática) */
  cx: number
  cy: number
  tipo: "vale" | "longe"
  rotulo: { x: number; y: number; anchor: "start" | "middle" | "end" }
  duracao: number
  atraso: number
}

const hub = { x: 262, y: 205 }

const destinos: Destino[] = [
  {
    id: "santana",
    nome: "Santana do Paraíso",
    x: 228,
    y: 110,
    cx: 238,
    cy: 162,
    tipo: "vale",
    rotulo: { x: 212, y: 100, anchor: "end" },
    duracao: 2.4,
    atraso: 0,
  },
  {
    id: "fabriciano",
    nome: "Cel. Fabriciano",
    x: 168,
    y: 240,
    cx: 214,
    cy: 214,
    tipo: "vale",
    rotulo: { x: 152, y: 244, anchor: "end" },
    duracao: 2.2,
    atraso: 0.8,
  },
  {
    id: "timoteo",
    nome: "Timóteo",
    x: 198,
    y: 316,
    cx: 238,
    cy: 266,
    tipo: "vale",
    rotulo: { x: 198, y: 344, anchor: "middle" },
    duracao: 2.6,
    atraso: 1.5,
  },
  {
    id: "valadares",
    nome: "Gov. Valadares",
    x: 404,
    y: 76,
    cx: 350,
    cy: 176,
    tipo: "longe",
    rotulo: { x: 388, y: 52, anchor: "end" },
    duracao: 3.6,
    atraso: 0.4,
  },
  {
    id: "bh",
    nome: "Belo Horizonte",
    x: 62,
    y: 352,
    cx: 140,
    cy: 300,
    tipo: "longe",
    rotulo: { x: 30, y: 392, anchor: "start" },
    duracao: 4.4,
    atraso: 1.2,
  },
  {
    id: "estados",
    nome: "Outros estados",
    x: 420,
    y: 338,
    cx: 356,
    cy: 304,
    tipo: "longe",
    rotulo: { x: 466, y: 378, anchor: "end" },
    duracao: 4,
    atraso: 2.1,
  },
]

const cores = {
  vale: "#4a8a06",
  longe: "#0b2545",
  hub: "#d7141a",
}

function rota(d: Destino) {
  return `M${hub.x},${hub.y} Q${d.cx},${d.cy} ${d.x},${d.y}`
}

/** Pino de mapa com a ponta em (0,0) */
function Pino({ x, y, cor, escala = 1 }: { x: number; y: number; cor: string; escala?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${escala})`}>
      <ellipse cx="0" cy="1.5" rx="6" ry="2.2" fill="#0b2545" opacity="0.15" />
      <path d="M0 0C0 0-13-11.5-13-20.5a13 13 0 0 1 26 0C13-11.5 0 0 0 0Z" fill={cor} />
      <circle cx="0" cy="-20.5" r="5" fill="#fff" />
    </g>
  )
}

export function MapaRotas({ className }: { className?: string }) {
  return (
    <figure className={cn("rounded-md bg-nevoa p-3 sm:p-5", className)}>
      <svg
        viewBox="0 0 480 420"
        role="img"
        aria-labelledby="mapa-rotas-titulo mapa-rotas-desc"
        className="mapa-rotas block h-auto w-full"
      >
        <title id="mapa-rotas-titulo">Rotas da Mudanças Novo Lar a partir de Ipatinga</title>
        <desc id="mapa-rotas-desc">
          Mapa ilustrativo, fora de escala: de Ipatinga saem rotas para Santana do Paraíso, Coronel Fabriciano e
          Timóteo, no Vale do Aço, e para Governador Valadares, Belo Horizonte e outros estados.
        </desc>

        <defs>
          <pattern id="mapa-rotas-grade" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="#c9d6e0" />
          </pattern>
          {destinos.map((d) => (
            <path key={d.id} id={`mapa-rota-${d.id}`} d={rota(d)} />
          ))}
        </defs>

        <rect width="480" height="420" fill="url(#mapa-rotas-grade)" />

        {/* Área do Vale do Aço */}
        <ellipse cx="222" cy="214" rx="96" ry="128" fill="#4a8a06" opacity="0.07" />

        {/* Rotas pontilhadas */}
        {destinos.map((d) => (
          <path
            key={d.id}
            d={rota(d)}
            fill="none"
            stroke={cores[d.tipo]}
            strokeWidth={d.tipo === "longe" ? 3.2 : 3}
            strokeLinecap="round"
            strokeDasharray={d.tipo === "longe" ? "0.1 11" : "0.1 9"}
            className={d.tipo === "longe" ? "mapa-rotas-linha-longa" : "mapa-rotas-linha"}
          />
        ))}

        {/* Pontinhos percorrendo as rotas */}
        <g className="mapa-rotas-pontos">
          {destinos.map((d) => (
            <circle key={d.id} r={d.tipo === "longe" ? 5.5 : 4.5} fill={d.tipo === "longe" ? cores.hub : cores.vale} opacity="0">
              <animateMotion dur={`${d.duracao}s`} begin={`${d.atraso}s`} repeatCount="indefinite" calcMode="linear">
                <mpath href={`#mapa-rota-${d.id}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.12;0.85;1"
                dur={`${d.duracao}s`}
                begin={`${d.atraso}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        {/* Destinos */}
        {destinos.map((d) => (
          <g key={d.id}>
            <Pino x={d.x} y={d.y} cor={cores[d.tipo]} escala={d.tipo === "longe" ? 0.95 : 0.8} />
            <text
              x={d.rotulo.x}
              y={d.rotulo.y}
              textAnchor={d.rotulo.anchor}
              className="mapa-rotas-rotulo"
              fontSize={d.tipo === "longe" ? 18 : 17}
              fontWeight={600}
            >
              {d.nome}
            </text>
          </g>
        ))}

        {/* Ipatinga */}
        <circle cx={hub.x} cy={hub.y} r="9" fill="none" stroke={cores.hub} strokeWidth="2.5" className="mapa-rotas-pulso" />
        <Pino x={hub.x} y={hub.y} cor={cores.hub} escala={1.3} />
        <text x={hub.x + 22} y={hub.y - 22} className="mapa-rotas-rotulo mapa-rotas-hub" fontSize={23} fontWeight={800}>
          Ipatinga
        </text>
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-5 gap-y-1 px-1 text-sm text-tinta-suave">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="inline-block size-2.5 rounded-full bg-[#4a8a06]" />
          Vale do Aço
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="inline-block size-2.5 rounded-full bg-marinho" />
          Estadual e interestadual
        </span>
        <span>Mapa ilustrativo, fora de escala.</span>
      </figcaption>
    </figure>
  )
}
