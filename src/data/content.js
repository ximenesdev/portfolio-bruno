/*
 * CONTEÚDO DO SITE — fonte única de verdade para todo o texto.
 * -----------------------------------------------------------------------------
 * Bruno: é aqui que você edita títulos, textos e links.
 * Nenhum componente tem texto "chumbado"; tudo passa por este arquivo.
 *
 * Nos parágrafos do "Sobre mim", use **asteriscos** para deixar uma palavra em
 * negrito (cargos, tempo, instituições) — o componente converte para <strong>.
 */

export const meta = {
  nome: "Bruno Ximenes",
  // Selo de disponibilidade — diz "o que eu busco" logo de cara.
  badge: "Disponível para oportunidades como desenvolvedor Java",
  // Headline (fio condutor): vale no técnico (resiliência) e na virada de carreira.
  headline: "Construo back-ends que continuam de pé quando uma peça falha.",
};

export const nav = [
  { id: "hero", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "projeto", label: "Projeto" },
  { id: "skills", label: "Stack" },
  { id: "contato", label: "Contato" },
];

export const hero = {
  // Uma frase direta: quem eu sou + o que eu faço + stack (sem exigir scroll).
  lead:
    "Estudante de Ciência da Computação (Brasília) em transição de carreira — construo back-ends em Java e Spring Boot, com foco em resiliência.",
};

export const about = {
  overline: "Sobre mim",
  titulo: "Do atendimento ao código que resiste a falha.",
  // Trajetória real, tom profissional. **negrito** destaca cargos/tempo/instituições.
  paragrafos: [
    "Minha trajetória não começou na tecnologia. Comecei como **vendedor**, passei pelo **atendimento em restaurante** e depois pelo **telemarketing** — atendendo pela **Bradesco Seguros**. Em seguida migrei para a área administrativa, como **auxiliar administrativo**.",
    "Hoje curso **Ciência da Computação** (**5º semestre**) no **Centro Universitário do Distrito Federal**, em Brasília, e atuo como **analista de dados** no **Ministério da Educação**. Uso esse cargo como ponte enquanto migro de vez para o desenvolvimento **Java**.",
    "O **itau-resilience-bff** é o meu **primeiro projeto de verdade** — não um tutorial: um sistema que eu quebrei, entendi por baixo do framework e consertei. E é só o primeiro: pretendo construir um portfólio de projetos que provem, na prática, que sou desenvolvedor.",
  ],
  // Trajetória condensada (renderizada com stagger).
  marcos: [
    { de: "Vendas, restaurante e telemarketing", para: "Atendimento de verdade — inclusive pela Bradesco Seguros." },
    { de: "Auxiliar administrativo", para: "Organização, processo e rotina." },
    { de: "Ciência da Computação — UDF", para: "5º semestre, em Brasília." },
    { de: "Analista de dados — MEC", para: "A ponte atual, enquanto migro para Java." },
    { de: "Desenvolvedor Java", para: "O destino — começando pelo itau-resilience-bff." },
  ],
};

export const project = {
  overline: "Projeto em destaque",
  nome: "itau-resilience-bff",
  tagline: "Um super app bancário que degrada com elegância em vez de cair.",
  descricao:
    "Um app bancário simplificado (saldo, cartão, investimentos) que demonstra resiliência em microsserviços com o padrão BFF (Backend For Frontend) + Resilience4j. Quando um serviço de backend falha ou fica lento, o sistema continua respondendo em parte — degradação graciosa, não uma queda total.",
  stack: ["Java 25", "Spring Boot 4", "Resilience4j", "React 19", "Docker", "GitHub Actions"],
  repo: "https://github.com/ximenesdev/itau-resilience-bff",
  // O melhor case técnico, contado em 3 passos que se revelam no scroll.
  caseRetry: {
    titulo: "A história do “Retry morto”",
    passos: [
      {
        n: "01",
        titulo: "O sintoma",
        texto:
          "Eu tinha um @Retry configurado que simplesmente não tentava de novo. No papel estava tudo certo; na prática, nada de retry.",
      },
      {
        n: "02",
        titulo: "A causa",
        texto:
          "A ordem dos aspectos (AOP) do Resilience4j. O Circuit Breaker, por estar “por dentro”, engolia a falha e devolvia o fallback como se fosse sucesso — antes de o Retry, “por fora”, enxergar o erro real.",
      },
      {
        n: "03",
        titulo: "A correção",
        texto:
          "Inverti a ordem dos aspectos via aspectOrder na configuração. O Retry passou a ver a falha primeiro. Mais do que plugar biblioteca, foi entender o que acontece por baixo do framework.",
      },
    ],
  },
  // Screenshots reais — Bruno solta os arquivos em public/img/ com estes nomes.
  screenshots: [
    {
      src: "/img/circuit-open.png",
      alt: "Painel mostrando o circuito no estado OPEN",
      legenda: "Circuito no estado OPEN — a falha é isolada.",
    },
    {
      src: "/img/dashboard-graceful.png",
      alt: "Dashboard demonstrando degradação graciosa",
      legenda: "Degradação graciosa — o app responde em parte, não cai.",
    },
  ],
};

// Estados do Circuit Breaker mapeados NA PALETA do site (nada de verde/vermelho
// de tutorial — cor = estado, dentro do âmbar/azul/violeta).
export const circuitStates = [
  {
    id: "closed",
    nome: "CLOSED",
    cor: "var(--blue)",
    corGlow: "var(--blue-glow)",
    desc: "Tudo fluindo. As chamadas passam normalmente.",
  },
  {
    id: "open",
    nome: "OPEN",
    cor: "var(--amber)",
    corGlow: "var(--amber-glow)",
    desc: "Falhas demais. O circuito abre e protege o sistema com fallback.",
  },
  {
    id: "half",
    nome: "HALF_OPEN",
    cor: "var(--violet)",
    corGlow: "var(--violet-glow)",
    desc: "Teste cauteloso. Deixa passar poucas chamadas para ver se recuperou.",
  },
];

// Bruno: ajuste os níveis à vontade. "solido" = mais confortável;
// "evoluindo" = aprofundando agora. Rótulos confiantes de propósito (público = recrutador).
export const skills = {
  overline: "Stack",
  titulo: "As ferramentas com que eu construo.",
  grupos: [
    {
      rotulo: "Base sólida",
      nivel: "solido",
      itens: ["Java", "Spring Boot", "Resilience4j", "Git"],
    },
    {
      rotulo: "Em evolução ativa",
      nivel: "evoluindo",
      itens: ["React", "Docker", "Gradle"],
    },
  ],
};

export const contato = {
  overline: "Contato",
  titulo: "Vamos construir algo que não cai?",
  subtitulo:
    "Aberto a oportunidades como desenvolvedor Java — de preferência no setor bancário.",
  email: "brunoximenes71@gmail.com",
  links: [
    { label: "GitHub", handle: "ximenesdev", href: "https://github.com/ximenesdev" },
    {
      label: "LinkedIn",
      handle: "bruno-ximenes",
      href: "https://www.linkedin.com/in/bruno-ximenes-97a52338a",
    },
    {
      label: "E-mail",
      handle: "brunoximenes71@gmail.com",
      href: "mailto:brunoximenes71@gmail.com",
    },
  ],
};

/*
 * TEMAS DE COR POR SEÇÃO — a "jornada de matiz" (5 seções).
 * accent/accentGlow/accentRgb: reescrevem as CSS vars quando a seção fica ativa.
 * mesh: as 3 cores que o shader mistura sobre o quase-preto (c1 domina).
 * Ordem quente->fria: âmbar (humano) -> azul (técnico) -> violeta (convite).
 * A seção Stack faz a ponte azul->violeta antes do Contato.
 */
export const sectionThemes = {
  hero: {
    accent: "#e8763c",
    accentGlow: "#ff9a5a",
    accentRgb: "232, 118, 60",
    mesh: ["#e8763c", "#ff9a5a", "#4a2f47"],
  },
  sobre: {
    accent: "#e8763c",
    accentGlow: "#ff9a5a",
    accentRgb: "232, 118, 60",
    mesh: ["#c26a4a", "#e8763c", "#2f3357"],
  },
  projeto: {
    accent: "#4b82e0",
    accentGlow: "#74a2f7",
    accentRgb: "75, 130, 224",
    mesh: ["#4b82e0", "#74a2f7", "#2a2a55"],
  },
  skills: {
    accent: "#6f6be0",
    accentGlow: "#9a8cf0",
    accentRgb: "111, 107, 224",
    mesh: ["#4b82e0", "#6f6be0", "#8a6bd8"],
  },
  contato: {
    accent: "#8a6bd8",
    accentGlow: "#ac8df2",
    accentRgb: "138, 107, 216",
    mesh: ["#8a6bd8", "#ac8df2", "#3a2f52"],
  },
};
