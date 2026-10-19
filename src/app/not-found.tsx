import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="container-site py-24 md:py-32">
      <h1 className="font-letreiro max-w-[16ch] text-[2.4rem] text-marinho sm:text-[3rem]">
        Essa página mudou de endereço
      </h1>
      <p className="mt-5 max-w-[48ch] text-lg text-tinta-suave">
        O link pode estar errado ou a página foi removida. Volte para o início ou peça seu orçamento direto pelo
        contato.
      </p>
      <div className="mt-8 flex flex-wrap gap-6 text-lg font-semibold">
        <Link href="/" className="rounded-sm text-marinho underline decoration-petroleo decoration-2 underline-offset-[6px]">
          Ir para o início
        </Link>
        <Link href="/contato" className="rounded-sm text-marinho underline decoration-petroleo decoration-2 underline-offset-[6px]">
          Pedir orçamento
        </Link>
      </div>
    </div>
  )
}
