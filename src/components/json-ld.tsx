type JsonLdProps = { data: Record<string, unknown> | Record<string, unknown>[] }

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Escapa "<" para que nenhum texto feche a tag script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
