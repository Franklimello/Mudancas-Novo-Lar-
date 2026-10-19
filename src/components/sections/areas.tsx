import { NavigationIcon, PhoneIcon } from "lucide-react"

import { MapaEndereco } from "@/components/mapa-endereco"
import { MapaRotas } from "@/components/mapa-rotas"
import { mapsRotaUrl, site } from "@/config/site"

export function Areas() {
  const outrasCidadesDoVale = site.valeDoAco.filter((c) => c !== site.address.city)
  const { street, district, city, state, postalCode } = site.address

  return (
    <section id="onde-atendemos" aria-labelledby="areas-titulo">
      <div className="container-site py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 id="areas-titulo" className="font-letreiro text-[2.1rem] text-marinho sm:text-[2.6rem]">
              Onde atendemos
            </h2>

            <div className="mt-8 space-y-7">
              <div className="border-l-4 border-vermelho pl-5">
                <h3 className="font-letreiro-medio text-[1.35rem] text-marinho">Ipatinga</h3>
                <p className="mt-2 text-tinta-suave">
                  Todos os bairros, como {site.bairrosIpatinga.slice(0, -1).join(", ")} e{" "}
                  {site.bairrosIpatinga[site.bairrosIpatinga.length - 1]}.
                </p>
              </div>

              <div className="border-l-4 border-[#4a8a06] pl-5">
                <h3 className="font-letreiro-medio text-[1.35rem] text-marinho">Vale do Aço</h3>
                <p className="mt-2 text-tinta-suave">
                  {outrasCidadesDoVale.slice(0, -1).join(", ")} e{" "}
                  {outrasCidadesDoVale[outrasCidadesDoVale.length - 1]}, com mudanças entre as cidades da região ou
                  dentro delas.
                </p>
              </div>

              <div className="border-l-4 border-marinho pl-5">
                <h3 className="font-letreiro-medio text-[1.35rem] text-marinho">Mudança estadual e interestadual</h3>
                <p className="mt-2 text-tinta-suave">
                  Saindo de Ipatinga para outras cidades de Minas Gerais e para outros estados, em caminhão baú. Diga
                  o destino no pedido de orçamento.
                </p>
              </div>
            </div>
          </div>

          <MapaRotas />
        </div>

        <div className="mt-16 grid gap-8 border-t border-linha pt-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <div>
            <h3 className="font-letreiro-medio text-[1.6rem] text-marinho sm:text-[1.9rem]">Onde estamos</h3>
            <p className="mt-3 max-w-[40ch] text-tinta-suave">
              A Mudanças Novo Lar fica no bairro {district}, em {city}. O orçamento é pelo WhatsApp, sem precisar
              vir até aqui.
            </p>
            <address className="mt-6 space-y-3 text-marinho not-italic">
              <p>
                {street}, {district}
                <br />
                {city}/{state}, CEP {postalCode}
              </p>
              <p>
                <a
                  href={`tel:+${site.telefoneFixo.number}`}
                  className="inline-flex items-center gap-2 rounded-sm font-semibold underline decoration-petroleo decoration-2 underline-offset-[6px] hover:decoration-marinho"
                >
                  <PhoneIcon className="size-4 text-petroleo-texto" aria-hidden="true" />
                  {site.telefoneFixo.display}
                </a>
              </p>
            </address>
            <a
              href={mapsRotaUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-md border-2 border-marinho px-4 py-2.5 font-semibold text-marinho transition-colors hover:bg-marinho hover:text-white"
            >
              <NavigationIcon className="size-4" aria-hidden="true" />
              Como chegar
            </a>
          </div>
          <MapaEndereco comLegenda={false} />
        </div>
      </div>
    </section>
  )
}
