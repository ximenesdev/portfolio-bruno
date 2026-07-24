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
  // Selo de disponibilidade — diz "o que eu busco" logo de cara, sem cravar
  // linguagem nem senioridade que eu ainda não tenho.
  badge: "Aberto a oportunidades como desenvolvedor",
  // Headline: apresenta a PESSOA e a direção profissional (back-end → full stack).
  // Atemporal — continua valendo quando o próximo projeto for de outra natureza.
  headline: "Desenvolvedor em formação, construindo minha base no back-end.",
};

export const nav = [
  { id: "hero", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "projeto", label: "Projeto" },
  { id: "skills", label: "Stack" },
  { id: "contato", label: "Contato" },
];

export const hero = {
  // Camada de apoio ao headline: quem eu sou + onde estou + stack + direção,
  // tudo num relance (sem exigir scroll).
  lead:
    "Estudante de Ciência da Computação em Brasília, em transição de carreira. Hoje programo em Java e Spring Boot, caminhando para o full stack.",
};

export const about = {
  overline: "Sobre mim",
  titulo: "Do atendimento ao código.",
  // Trajetória real, tom profissional. **negrito** destaca cargos/tempo/instituições.
  paragrafos: [
    "Minha trajetória não começou na tecnologia. Fui **vendedor**, trabalhei como **garçom** em restaurante e passei pelo **telemarketing**, atendendo pela **Bradesco Seguros**. Depois vim para a área administrativa, como **auxiliar administrativo**.",
    "Hoje curso **Ciência da Computação** (**5º semestre**) no **Centro Universitário do Distrito Federal (UDF)**, em Brasília, e sou **estagiário** na área de **Gestão de TIC** (Tecnologia da Informação e Comunicação) do **Ministério da Educação**. É onde coloco em prática, todo dia, o que estudo.",
    "Meu objetivo é ser **desenvolvedor full stack**. A base que construo agora é em **back-end**, com **Java** e **Spring Boot**, e sigo aprendendo e expandindo. O **itau-resilience-bff** foi meu **primeiro projeto de verdade** — não um tutorial: um sistema que quebrei, entendi por baixo do framework e consertei. E é só o primeiro de vários.",
  ],
  // Trajetória condensada (renderizada com stagger).
  marcos: [
    { de: "Vendas, restaurante e telemarketing", para: "Atendimento de verdade — inclusive pela Bradesco Seguros." },
    { de: "Auxiliar administrativo", para: "Organização, processo e rotina." },
    { de: "Ciência da Computação — UDF", para: "5º semestre, em Brasília." },
    { de: "Estágio em TIC — MEC", para: "Tecnologia na prática, todos os dias." },
    { de: "Desenvolvedor full stack", para: "O objetivo — a base começa no back-end." },
  ],
};

export const project = {
  overline: "Projeto em destaque",
  nome: "itau-resilience-bff",
  tagline: "Resiliência em um sistema bancário distribuído.",
  descricao:
    "Uma simulação de sistema bancário distribuído: serviços de back-end independentes (saldo, cartão e investimentos) atrás de um BFF (Backend For Frontend) com Resilience4j, e um painel de operações que mostra o comportamento sob falha. Quando um serviço fica lento ou cai, o sistema continua respondendo em parte — degradação graciosa em vez de queda total.",
  stack: ["Java 25", "Spring Boot 4", "Resilience4j", "React 19", "Docker", "GitHub Actions"],
  repo: "https://github.com/ximenesdev/itau-resilience-bff",
  // Um desafio técnico concreto, compacto: sintoma → causa → correção.
  // Tom "assim que eu depuro", não "meu grande feito".
  caseRetry: {
    titulo: "O “Retry morto”",
    intro: "Um bug que rendeu — e como cheguei na causa.",
    passos: [
      {
        n: "01",
        titulo: "Sintoma",
        texto:
          "Um @Retry configurado que simplesmente não tentava de novo. No papel, tudo certo; na prática, nada de retry.",
      },
      {
        n: "02",
        titulo: "Causa",
        texto:
          "A ordem dos aspectos (AOP) do Resilience4j: o Circuit Breaker, por dentro, engolia a falha e devolvia o fallback como sucesso antes de o Retry, por fora, ver o erro.",
      },
      {
        n: "03",
        titulo: "Correção",
        texto:
          "Inverti a ordem via aspectOrder na configuração — o Retry passou a ver a falha primeiro. Menos plugar biblioteca, mais entender o que roda por baixo do framework.",
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
      legenda: "Degradação graciosa — o sistema responde em parte.",
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

// Bruno: ajuste os níveis à vontade. "solido" = onde tenho mais base;
// "evoluindo" = aprendendo agora. Rótulos honestos e profissionais (público = recrutador):
// nem coloquiais, nem inflados.
export const skills = {
  overline: "Stack",
  titulo: "Ferramentas e tecnologias.",
  grupos: [
    {
      rotulo: "Base técnica",
      nivel: "solido",
      itens: ["Java", "Spring Boot", "Resilience4j", "Git"],
    },
    {
      rotulo: "Em aprendizado",
      nivel: "evoluindo",
      itens: ["React", "Docker", "Gradle"],
    },
  ],
};

export const contato = {
  overline: "Contato",
  titulo: "Vamos conversar?",
  subtitulo:
    "Estou aberto a oportunidades como desenvolvedor — estágio, primeiro emprego ou parcerias em projetos. Se algo aqui fez sentido, me chama.",
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
