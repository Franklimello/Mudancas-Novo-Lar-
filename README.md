# Mudanças Novo Lar — site institucional

Site da Mudanças Novo Lar (Ipatinga, MG). Todas as páginas são geradas como HTML estático no build.

## Stack

Next.js 16 (App Router, Cache Components, `ensureStatic = "navigation"`) · TypeScript · Tailwind CSS 4 · shadcn/ui (Radix) · Lucide · Motion · React Hook Form + Zod · `next/image` · `next/font` (Archivo) · Metadata API · JSON-LD · sitemap e robots gerados.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
```

Copie `.env.example` para `.env.local` e preencha:

| Variável | Para quê |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Domínio final (canonical, sitemap, Open Graph, JSON-LD) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (opcional; sem ele nenhum script carrega) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Meta tag de verificação do Search Console (opcional) |

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Telefones, Instagram, endereço, cidades e bairros | `src/config/site.ts` |
| Serviços (textos, SEO, perguntas de cada página) | `src/content/servicos.ts` |
| Depoimentos (conversas do WhatsApp) | `src/content/depoimentos.ts` |
| Perguntas frequentes da home | `src/content/faq.ts` |
| Fotos e legendas | `src/content/fotos.ts` + `src/assets/fotos/` |
| Cores e tipografia | `src/app/globals.css` |

Para criar um serviço novo, adicione um item em `servicos.ts`. A página `/servicos/<slug>`, o sitemap e o JSON-LD saem automaticamente.

## Páginas

- `/`: hero com formulário de orçamento que monta a mensagem e abre o WhatsApp, serviços, como funciona, depoimentos, onde atendemos, perguntas e contato
- `/servicos/[slug]`: 4 páginas de serviço com FAQ e dados estruturados `Service` + `BreadcrumbList` + `FAQPage`
- `/contato`
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`

## Confirmar com o cliente antes de publicar

- [ ] Endereço completo e CEP (`site.address`). A foto de perfil do Instagram mostra um endereço na Av. Selim José de Sales, mas está ilegível.
- [ ] Link do perfil da empresa no Google (`site.googleBusinessUrl`): os clientes citam avaliações lá
- [ ] Se é a Marília quem atende (o nome aparece no site)
- [ ] Se fazem mudança comercial e transporte avulso ("só o transporte")
- [ ] Se o material de embalagem está incluído no preço
- [ ] Domínio definitivo
- [ ] Fotos da embalagem (mantas acolchoadas e meião em uso). Hoje todas as fotos são da frota (`material-cliente/novasfotos`).

## Publicar (Vercel)

1. Suba o repositório no GitHub e importe na Vercel.
2. Configure as variáveis de ambiente acima.
3. Aponte o domínio.
4. No Google Search Console: adicione a propriedade, verifique e envie `https://SEU-DOMINIO/sitemap.xml`.
5. No Perfil da Empresa no Google: coloque o link do site e use o mesmo nome, telefone e cidade que estão no site.

## Material do cliente

`material-cliente/` guarda o logo original e os prints recebidos. A pasta está no `.gitignore` porque os prints mostram conversas e números de terceiros.
