import { site } from "@/config/site"

export function Areas() {
  const outrasCidadesDoVale = site.valeDoAco.filter((c) => c !== site.address.city)

  return (
    <section id="onde-atendemos" aria-labelledby="areas-titulo">
      <div className="container-site py-16 md:py-24">
        <h2 id="areas-titulo" className="font-letreiro text-[2.1rem] text-marinho sm:text-[2.6rem]">
          Onde atendemos
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          <div className="md:border-l-4 md:border-petroleo md:pl-6">
            <h3 className="font-letreiro-medio text-[1.4rem] text-marinho">Ipatinga</h3>
            <p className="mt-3 text-tinta-suave">
              Todos os bairros, como {site.bairrosIpatinga.slice(0, -1).join(", ")} e{" "}
              {site.bairrosIpatinga[site.bairrosIpatinga.length - 1]}.
            </p>
          </div>

          <div className="md:border-l-4 md:border-folha md:pl-6">
            <h3 className="font-letreiro-medio text-[1.4rem] text-marinho">Vale do Aço</h3>
            <p className="mt-3 text-tinta-suave">
              {outrasCidadesDoVale.slice(0, -1).join(", ")} e {outrasCidadesDoVale[outrasCidadesDoVale.length - 1]},
              com mudanças entre as cidades da região ou dentro delas.
            </p>
          </div>

          <div className="md:border-l-4 md:border-marinho md:pl-6">
            <h3 className="font-letreiro-medio text-[1.4rem] text-marinho">Mudança estadual e interestadual</h3>
            <p className="mt-3 text-tinta-suave">
              Saindo de Ipatinga para outras cidades de Minas Gerais e para outros estados, em caminhão baú. Diga o
              destino no pedido de orçamento.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
