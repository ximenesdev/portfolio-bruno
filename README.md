# Portfólio — Bruno Ximenes

Site pessoal / portfólio de **Bruno Ximenes**, desenvolvedor em formação, com base
em back-end (Java e Spring Boot) e caminho para full stack. Single page, animado e
clean, construído para ser linkado no LinkedIn e no GitHub.

**Stack:** React 19 + Vite · GSAP (ScrollTrigger + SplitText) · Lenis (smooth scroll)
· mesh gradient em WebGL · CSS puro com design tokens · Poppins (self-hospedada).

---

## Rodar localmente

```bash
npm install      # instala as dependências
npm run dev      # sobe o servidor de desenvolvimento (Vite)
```

Abra o endereço que o Vite mostrar (normalmente http://localhost:5173).

```bash
npm run build    # build de produção (gera a pasta dist/)
npm run preview  # serve o build de produção localmente, para conferir
```

---

## Onde eu coloco meus arquivos (Bruno, é aqui 👇)

### Screenshots do projeto → `public/img/`
| Arquivo | O que mostra |
|---|---|
| `public/img/circuit-open.png` | O circuito no estado **OPEN** |
| `public/img/dashboard-graceful.png` | O dashboard com a **degradação graciosa** |

Enquanto não existirem, aparece um placeholder claro com o caminho no lugar da
imagem. Quando você soltá-los com os nomes exatos, aparecem sozinhos.

### Editar textos
Todo o conteúdo textual está em **`src/data/content.js`** (headline, sobre mim, case
do Retry morto, skills, links). É o único lugar que você precisa tocar para ajustar
texto — nenhum componente tem texto chumbado. No "Sobre mim", `**palavra**` vira
negrito.

---

## Deploy no Vercel

1. Suba este repositório no GitHub.
2. Em [vercel.com](https://vercel.com) → **Add New → Project** → importe o repositório.
3. O Vercel detecta o Vite automaticamente:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy.** Pronto — cada `git push` na branch principal republica o site.

Não é preciso configurar mais nada. (Conta, domínio etc. você faz manualmente.)

---

## Estrutura

```
src/
├─ styles/        tokens.css (cores/tipografia) · global.css
├─ lib/           gsap.js · lenis.js · math.js
├─ hooks/         useMediaQuery · useReducedMotion · useMagnetic
├─ data/          content.js  ← TODO o texto e os temas de cor por seção
├─ components/
│  ├─ background/ MeshGradient (WebGL) · shader.js
│  ├─ chrome/     Preloader · Cursor · Nav
│  ├─ sections/   Hero · About · Project · CircuitBreaker · Skills · Contact
│  └─ ui/         Reveal · SectionHeading · MagneticButton
├─ App.jsx        orquestra tudo (mesh, scroll, seção ativa)
└─ main.jsx
```

## Acessibilidade & performance

- Respeita `prefers-reduced-motion`: desliga mesh WebGL, cursor, SplitText e reveals,
  entregando uma versão estática e legível.
- Mobile/touch: sem cursor custom, mesh vira gradiente CSS estático (leve).
- Animações só em `transform`/`opacity`; imagens com `loading="lazy"`.
