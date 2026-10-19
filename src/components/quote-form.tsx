"use client"

import { useId } from "react"
import { useForm, useWatch, type Control } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { AnimatePresence, MotionConfig, motion } from "motion/react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { WhatsappIcon } from "@/components/whatsapp-icon"
import { primaryWhatsapp } from "@/config/site"
import { whatsappLink } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

const imoveis = {
  casa: "Casa",
  apartamento: "Apartamento",
  comercio: "Comércio ou escritório",
  "poucos-itens": "Poucos itens",
} as const

const acessos = {
  elevador: "Tem elevador",
  escada: "Só escada",
} as const

const extras = {
  embalagem: "Embalagem",
  montagem: "Desmontar e montar móveis",
} as const

const schema = z.object({
  origem: z.string().trim().min(3, "Diga o bairro e a cidade de onde a mudança sai."),
  destino: z.string().trim().min(3, "Diga o bairro e a cidade para onde a mudança vai."),
  data: z.string(),
  imovel: z.enum(Object.keys(imoveis) as [keyof typeof imoveis]).or(z.literal("")),
  acesso: z.enum(Object.keys(acessos) as [keyof typeof acessos]).or(z.literal("")),
  extras: z.array(z.enum(Object.keys(extras) as [keyof typeof extras])),
  itens: z.string().trim().max(600, "Resuma em até 600 caracteres; o resto você conta no WhatsApp."),
  nome: z.string().trim().max(60),
})

type QuoteValues = z.infer<typeof schema>

const vazio: QuoteValues = {
  origem: "",
  destino: "",
  data: "",
  imovel: "",
  acesso: "",
  extras: [],
  itens: "",
  nome: "",
}

function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split("-")
  return ano && mes && dia ? `${dia}/${mes}/${ano}` : ""
}

export function montarMensagem(v: Partial<QuoteValues>) {
  const linhas = [v.nome?.trim() ? `Olá! Aqui é ${v.nome.trim()}. Quero um orçamento de mudança.` : "Olá! Quero um orçamento de mudança."]
  if (v.origem?.trim()) linhas.push(`Saindo de: ${v.origem.trim()}`)
  if (v.destino?.trim()) linhas.push(`Indo para: ${v.destino.trim()}`)
  if (v.data) linhas.push(`Data: ${formatarData(v.data)}`)
  if (v.imovel) {
    const acesso = v.imovel === "apartamento" && v.acesso ? ` (${acessos[v.acesso].toLowerCase()})` : ""
    linhas.push(`Imóvel: ${imoveis[v.imovel].toLowerCase()}${acesso}`)
  }
  if (v.extras?.length) linhas.push(`Preciso de: ${v.extras.map((e) => extras[e].toLowerCase()).join(" e ")}`)
  if (v.itens?.trim()) linhas.push(`O que vai: ${v.itens.trim()}`)
  return linhas.join("\n")
}

type QuoteFormProps = {
  /** Valores iniciais, por exemplo o tipo de imóvel numa página de serviço */
  defaults?: Partial<QuoteValues>
  titulo?: string
  className?: string
  headingLevel?: "h2" | "h3"
}

export function QuoteForm({ defaults, titulo = "Peça seu orçamento", className, headingLevel = "h2" }: QuoteFormProps) {
  const uid = useId()
  const Heading = headingLevel
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<QuoteValues>({
    resolver: zodResolver(schema),
    defaultValues: { ...vazio, ...defaults },
    mode: "onTouched",
  })

  const imovel = useWatch({ control, name: "imovel" })

  function enviar(values: QuoteValues) {
    const url = whatsappLink(montarMensagem(values))
    // Com "noopener" o window.open sempre devolve null, então o opener é cortado à mão
    const janela = window.open(url, "_blank")
    if (janela) janela.opener = null
    else window.location.assign(url)
  }

  const campo = (nome: string) => `${uid}-${nome}`

  return (
    <MotionConfig reducedMotion="user">
      <div className={cn("relative rounded-md bg-papelao px-5 pt-9 pb-6 text-marinho sm:px-8 sm:pb-8", className)}>
        <span aria-hidden="true" className="fita absolute -top-3.5 left-8 h-8 w-36 -rotate-2 rounded-[2px] sm:left-12" />

        <Heading className="font-letreiro-medio text-[1.6rem] sm:text-[1.8rem]">{titulo}</Heading>
        <p className="mt-1.5 max-w-[46ch] text-[0.95rem] text-papelao-escuro">
          Preencha a etiqueta e a mensagem fica pronta para mandar no WhatsApp.
        </p>

        <form onSubmit={handleSubmit(enviar)} noValidate className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
            <Campo id={campo("origem")} rotulo="Saindo de" erro={errors.origem?.message}>
              <Input
                id={campo("origem")}
                autoComplete="address-level2"
                placeholder="Ex.: Cidade Nobre, Ipatinga"
                aria-invalid={!!errors.origem}
                aria-describedby={errors.origem ? `${campo("origem")}-erro` : undefined}
                className={campoEtiqueta}
                {...register("origem")}
              />
            </Campo>
            <Campo id={campo("destino")} rotulo="Indo para" erro={errors.destino?.message}>
              <Input
                id={campo("destino")}
                placeholder="Ex.: Centro, Timóteo"
                aria-invalid={!!errors.destino}
                aria-describedby={errors.destino ? `${campo("destino")}-erro` : undefined}
                className={campoEtiqueta}
                {...register("destino")}
              />
            </Campo>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
            <Campo id={campo("data")} rotulo="Quando" dica="Se ainda não sabe, deixe em branco.">
              <Input id={campo("data")} type="date" className={campoEtiqueta} {...register("data")} />
            </Campo>
            <Campo id={campo("nome")} rotulo="Seu nome" dica="Opcional.">
              <Input id={campo("nome")} autoComplete="given-name" className={campoEtiqueta} {...register("nome")} />
            </Campo>
          </div>

          <div role="group" aria-labelledby={campo("imovel")}>
            <span id={campo("imovel")} className={rotuloClasse}>
              Imóvel
            </span>
            <ToggleGroup
              type="single"
              value={imovel}
              onValueChange={(v) => {
                setValue("imovel", v as QuoteValues["imovel"])
                if (v !== "apartamento") setValue("acesso", "")
              }}
              className="mt-2 flex w-full flex-wrap gap-2"
              aria-label="Tipo de imóvel"
            >
              {Object.entries(imoveis).map(([valor, rotulo]) => (
                <ToggleGroupItem key={valor} value={valor} className={chip}>
                  {rotulo}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <AnimatePresence initial={false}>
              {imovel === "apartamento" && (
                <motion.div
                  key="acesso"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.2, 0.7, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <AcessoApartamento control={control} onChange={(v) => setValue("acesso", v)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div role="group" aria-labelledby={campo("extras")}>
            <span id={campo("extras")} className={rotuloClasse}>
              Precisa de
            </span>
            <ExtrasToggle control={control} onChange={(v) => setValue("extras", v)} />
          </div>

          <Campo
            id={campo("itens")}
            rotulo="O que vai na mudança"
            erro={errors.itens?.message}
            dica="Opcional. Ex.: geladeira, fogão, cama de casal, sofá, umas 15 caixas."
          >
            <Textarea
              id={campo("itens")}
              rows={2}
              aria-invalid={!!errors.itens}
              className={cn(campoEtiqueta, "min-h-[4.5rem] resize-y py-2.5")}
              {...register("itens")}
            />
          </Campo>

          <Previa control={control} id={campo("previa")} />

          <div>
            <button
              type="submit"
              className="flex h-13 w-full items-center justify-center gap-2.5 rounded-md bg-marinho px-5 text-[1.05rem] font-semibold text-white transition-colors hover:bg-marinho-2"
            >
              <WhatsappIcon className="size-5 text-folha-clara" />
              Enviar pelo WhatsApp
            </button>
            <p className="mt-2.5 text-center text-sm text-papelao-escuro">
              Abre o WhatsApp da empresa, {primaryWhatsapp.display}, com o texto pronto. Nada é enviado antes de você
              tocar em enviar lá.
            </p>
          </div>
        </form>
      </div>
    </MotionConfig>
  )
}

const campoEtiqueta =
  "h-11 rounded-t-md rounded-b-none border-0 border-b-2 border-marinho/35 bg-white/55 px-3 text-base text-marinho shadow-none placeholder:text-papelao-escuro/75 focus-visible:border-marinho focus-visible:bg-white/80 focus-visible:ring-0 aria-invalid:border-erro aria-invalid:ring-0 md:text-base"

const chip =
  "h-10 rounded-full border border-marinho/30 bg-white/40 px-4 text-[0.95rem] font-medium text-marinho hover:bg-white/70 hover:text-marinho data-[state=on]:border-marinho data-[state=on]:bg-marinho data-[state=on]:text-white"

const rotuloClasse = "block text-[0.95rem] font-semibold"

type CampoProps = {
  id: string
  rotulo: string
  erro?: string
  dica?: string
  children: React.ReactNode
}

function Campo({ id, rotulo, erro, dica, children }: CampoProps) {
  return (
    <div>
      <label htmlFor={id} className={rotuloClasse}>
        {rotulo}
      </label>
      <div className="mt-1.5">
        {children}
        {erro ? (
          <p id={`${id}-erro`} role="alert" className="mt-1.5 text-sm font-medium text-erro">
            {erro}
          </p>
        ) : dica ? (
          <p className="mt-1.5 text-sm text-papelao-escuro">{dica}</p>
        ) : null}
      </div>
    </div>
  )
}

function AcessoApartamento({
  control,
  onChange,
}: {
  control: Control<QuoteValues>
  onChange: (v: QuoteValues["acesso"]) => void
}) {
  const acesso = useWatch({ control, name: "acesso" })
  return (
    <div className="pt-3">
      <p className="text-sm text-papelao-escuro">E o acesso ao apartamento?</p>
      <ToggleGroup
        type="single"
        value={acesso}
        onValueChange={(v) => onChange(v as QuoteValues["acesso"])}
        className="mt-2 flex flex-wrap gap-2"
        aria-label="Acesso ao apartamento"
      >
        {Object.entries(acessos).map(([valor, rotulo]) => (
          <ToggleGroupItem key={valor} value={valor} className={chip}>
            {rotulo}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

function ExtrasToggle({
  control,
  onChange,
}: {
  control: Control<QuoteValues>
  onChange: (v: QuoteValues["extras"]) => void
}) {
  const selecionados = useWatch({ control, name: "extras" })
  return (
    <ToggleGroup
      type="multiple"
      value={selecionados}
      onValueChange={(v) => onChange(v as QuoteValues["extras"])}
      className="mt-2 flex w-full flex-wrap gap-2"
      aria-label="Serviços extras"
    >
      {Object.entries(extras).map(([valor, rotulo]) => (
        <ToggleGroupItem key={valor} value={valor} className={chip}>
          {rotulo}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

/** Balão com a mensagem que vai para o WhatsApp, atualizado a cada campo */
function Previa({ control, id }: { control: Control<QuoteValues>; id: string }) {
  const valores = useWatch({ control })
  const mensagem = montarMensagem(valores as Partial<QuoteValues>)

  return (
    <div className="border-t-2 border-dashed border-marinho/25 pt-5">
      <p className="text-sm font-semibold" id={id}>
        Sua mensagem
      </p>
      <div className="mt-2 flex justify-end">
        <motion.p
          layout
          transition={{ layout: { duration: 0.18, ease: "easeOut" } }}
          aria-labelledby={id}
          className="relative max-w-[92%] rounded-2xl rounded-br-[4px] bg-white px-4 py-3 text-[0.95rem] leading-relaxed whitespace-pre-line text-marinho shadow-[0_1px_0_rgb(11_37_69/0.12)]"
        >
          {mensagem}
        </motion.p>
      </div>
    </div>
  )
}
