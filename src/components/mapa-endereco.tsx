import { MapPinIcon, NavigationIcon } from "lucide-react"

import { enderecoCompleto, mapsEmbedUrl, mapsRotaUrl, site } from "@/config/site"

type MapaEnderecoProps = {
  className?: string
  /** Mostra o endereço e o botão "Como chegar" abaixo do mapa */
  comLegenda?: boolean
}

/*
 * Mapa do Google sem chave de API. O iframe só carrega quando chega perto da tela
 * (loading="lazy"), para não pesar no carregamento inicial da página.
 */
export function MapaEndereco({ className, comLegenda = true }: MapaEnderecoProps) {
  const { street, district, city, state, postalCode } = site.address
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-md border border-linha bg-nevoa">
        <iframe
          title={`Mapa: ${site.name}, ${enderecoCompleto()}`}
          src={mapsEmbedUrl()}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="block aspect-[4/3] w-full sm:aspect-[16/10]"
        />
      </div>
      {comLegenda ? (
        <figcaption className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <p className="flex gap-2.5 text-marinho">
            <MapPinIcon className="mt-0.5 size-5 shrink-0 text-vermelho" aria-hidden="true" />
            <span>
              {street}, {district}
              <br />
              {city}/{state}, CEP {postalCode}
            </span>
          </p>
          <a
            href={mapsRotaUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border-2 border-marinho px-4 py-2.5 font-semibold text-marinho transition-colors hover:bg-marinho hover:text-white"
          >
            <NavigationIcon className="size-4" aria-hidden="true" />
            Como chegar
          </a>
        </figcaption>
      ) : null}
    </figure>
  )
}
