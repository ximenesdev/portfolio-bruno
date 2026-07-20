/*
 * CONTEÚDO DO SITE — fonte única de verdade para todo o texto.
 * -----------------------------------------------------------------------------
 * Bruno: é aqui que você edita títulos, textos, links e a lista de PDFs.
 * Nenhum componente tem texto "chumbado"; tudo passa por este arquivo.
 */

export const meta = {
  nome: "Bruno Ximenes",
  // Headline principal (fio condutor do site): vale em dois níveis — o foco
  // técnico (resiliência) e a virada de carreira.
  headline: "Construo back-ends que continuam de pé quando uma peça falha.",
  eyebrow: "Desenvolvedor Java · Back-end resiliente",
  local: "Ciência da Computação · Brasília",
};

export const nav = [
  { id: "hero", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "projeto", label: "Projeto" },
  { id: "skills", label: "Stack" },
  { id: "material", label: "Material" },
  { id: "contato", label: "Contato" },
];

export const hero = {
  lead:
    "Vim do administrativo, virei desenvolvedor e agora ataco engenharia de resiliência com projeto de verdade na mão.",
};

export const about = {
  overline: "Sobre mim",
  titulo: "De planilha e headset a código que resiste a falha.",
  // Rascunho honesto, sem clichê. Bruno lapida o texto final.
  paragrafos: [
    "Não cresci programando. Vim do administrativo e do atendimento — telemarketing, suporte, planilha — e num certo ponto decidi que queria construir as coisas, não só operá-las.",
    "Hoje curso Ciência da Computação (5º semestre) no Centro Universitário do Distrito Federal, em Brasília, e começo como analista de dados no Ministério da Educação. Uso o cargo como degrau: cada projeto que faço é um passo para me firmar como desenvolvedor Java.",
    "O itau-resilience-bff é a prova disso. Não é um tutorial copiado: é um sistema que eu quebrei, entendi por baixo do framework e consertei — inclusive um bug de ordem de aspectos que a maioria nunca chega a enxergar.",
  ],
  // Marcadores da trajetória (renderizados com stagger).
  marcos: [
    { de: "Administrativo & atendimento", para: "A base: organização e lidar com gente." },
    { de: "Ciência da Computação — UDF", para: "5º semestre, em Brasília." },
    { de: "Analista de dados — MEC", para: "O degrau atual, enquanto miro Java." },
    { de: "Desenvolvedor Java", para: "O destino, construído com projeto real." },
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

export const material = {
  overline: "Material de estudo",
  titulo: "O que eu documentei estudando este projeto.",
  intro:
    "Guias que escrevi para dominar o projeto de ponta a ponta — de arquitetura a comandos de terminal.",
  // Os arquivos ainda não existem em public/docs/ — a seção já funciona assim.
  // Basta soltar os PDFs com EXATAMENTE estes nomes e tudo passa a baixar.
  pdfs: [
    {
      titulo: "Entenda e Apresente seu Projeto",
      desc: "Arquitetura, glossário com analogias e a história do Retry morto — explicados do zero.",
      arquivo: "/docs/1-Entenda-e-Apresente-seu-Projeto.pdf",
    },
    {
      titulo: "Perguntas de Entrevista",
      desc: "Perguntas e respostas técnicas e comportamentais sobre o projeto.",
      arquivo: "/docs/2-Perguntas-de-Entrevista.pdf",
    },
    {
      titulo: "Guia de Comandos do Projeto",
      desc: "Docker, Gradle, npm, git e o roteiro de demonstração ao vivo.",
      arquivo: "/docs/3-Guia-de-Comandos-do-Projeto.pdf",
    },
    {
      titulo: "Guia de Comandos Linux",
      desc: "Navegação, permissões, processos, SSH e atalhos de terminal.",
      arquivo: "/docs/4-Guia-de-Comandos-Linux.pdf",
    },
  ],
};

export const contato = {
  overline: "Contato",
  titulo: "Vamos construir algo que não cai?",
  subtitulo:
    "Aberto a oportunidades como desenvolvedor Java — de preferência no setor bancário.",
  email: "brunoxmns7@gmail.com",
  links: [
    { label: "GitHub", handle: "ximenesdev", href: "https://github.com/ximenesdev" },
    {
      label: "LinkedIn",
      handle: "bruno-ximenes",
      href: "https://www.linkedin.com/in/bruno-ximenes-97a52338a",
    },
    { label: "E-mail", handle: "brunoxmns7@gmail.com", href: "mailto:brunoxmns7@gmail.com" },
  ],
};

/*
 * TEMAS DE COR POR SEÇÃO — a "jornada de matiz".
 * accent/accentGlow/accentRgb: reescrevem as CSS vars quando a seção fica ativa
 *   (bordas, brilhos, texto em gradiente reagem juntos).
 * mesh: as 3 cores que o shader mistura sobre o quase-preto (c1 domina).
 * A ordem quente->fria conta a história: âmbar (humano) -> azul (técnico) -> violeta (convite).
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
    accent: "#4b82e0",
    accentGlow: "#74a2f7",
    accentRgb: "75, 130, 224",
    mesh: ["#4b82e0", "#6f6be0", "#8a6bd8"],
  },
  material: {
    accent: "#8a6bd8",
    accentGlow: "#ac8df2",
    accentRgb: "138, 107, 216",
    mesh: ["#7a6bd8", "#6f6be0", "#4b82e0"],
  },
  contato: {
    accent: "#8a6bd8",
    accentGlow: "#ac8df2",
    accentRgb: "138, 107, 216",
    mesh: ["#8a6bd8", "#ac8df2", "#3a2f52"],
  },
};
