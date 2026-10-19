import { JsonLd } from "@/components/json-ld"
import { Areas } from "@/components/sections/areas"
import { Cta } from "@/components/sections/cta"
import { Faq } from "@/components/sections/faq"
import { Hero } from "@/components/sections/hero"
import { Process } from "@/components/sections/process"
import { Services } from "@/components/sections/services"
import { Testimonials } from "@/components/sections/testimonials"
import { perguntasGerais } from "@/content/faq"
import { faqSchema, websiteSchema } from "@/lib/schema"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Testimonials />
      <Areas />
      <Faq perguntas={perguntasGerais} />
      <Cta />
      <JsonLd data={[websiteSchema(), faqSchema(perguntasGerais)]} />
    </>
  )
}
