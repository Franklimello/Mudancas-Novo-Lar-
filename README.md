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
| `NEXT_PUBLIC_SITE_URL` | Opcional. Força o endereço do site. Na Vercel, sem ela, o site usa o domínio de produção do projeto (o `.vercel.app` ou o domínio próprio, quando houver) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (opcional; sem ele nenhum script carrega) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Meta tag de verificação do Search Console (opcional) |

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Telefones, Instagram, endereço (e o mapa), cidades e bairros | `src/config/site.ts` |
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

- [ ] Link do perfil da empresa no Google (`site.googleBusinessUrl`): os clientes citam avaliações lá
- [ ] Se é a Marília quem atende (o nome aparece no site)
- [ ] Se fazem mudança comercial e transporte avulso ("só o transporte")
- [ ] Se fazem fretes de poucos móveis (página `/servicos/fretes-e-mudancas-pequenas`; para tirar, remova o item em `src/content/servicos.ts` e as perguntas de frete em `src/content/faq.ts`)
- [ ] Se o material de embalagem está incluído no preço
- [ ] Domínio definitivo
- [ ] Fotos da embalagem (mantas acolchoadas e meião em uso). Hoje todas as fotos são da frota (`material-cliente/novasfotos`).

## Publicar (Vercel)

1. Suba o repositório no GitHub e importe na Vercel.
2. As variáveis de ambiente são opcionais: só para Google Analytics e verificação do Search Console.
3. Por enquanto o site fica no endereço provisório `.vercel.app`. Canonical, sitemap e prévias de link já usam esse endereço sozinhos.
4. No Google Search Console: adicione a propriedade (prefixo de URL), verifique pela meta tag (`NEXT_PUBLIC_GSC_VERIFICATION`) e envie `/sitemap.xml`.
5. No Perfil da Empresa no Google: coloque o link do site e use o mesmo nome, telefone e cidade que estão no site.

### Quando houver domínio próprio

1. Adicione o domínio em Settings → Domains na Vercel. O site passa a usar o domínio novo no próximo deploy, sem mexer no código.
2. Na mesma tela, redirecione o `.vercel.app` para o domínio novo (308), para o Google não ver dois endereços.
3. No Search Console, adicione a propriedade do domínio novo e envie o sitemap de novo.

## Material do cliente

`material-cliente/` guarda o logo original e os prints recebidos. A pasta está no `.gitignore` porque os prints mostram conversas e números de terceiros.
