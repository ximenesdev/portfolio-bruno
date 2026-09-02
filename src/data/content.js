/*
 * CONTEÚDO DO SITE — fonte única de verdade para todo o texto.
 * -----------------------------------------------------------------------------
 * Bruno: é aqui que você edita títulos, textos e links.
 * Nenhum componente tem texto "chumbado"; tudo passa por este arquivo.
 *
 * PARA ADICIONAR UM PROJETO OU UM CERTIFICADO, você só mexe aqui:
 *   - projeto novo    -> acrescente um objeto no fim do array `projetos`
 *   - certificado novo-> acrescente um objeto no fim do array `certificados`
 * A seção Portfólio se ajusta sozinha: conta os itens, monta as abas e escolhe
 * o formato da grade. Aba sem nenhum item simplesmente não aparece no site.
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
  { id: "portfolio", label: "Portfólio" },
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
    "Hoje curso **Ciência da Computação** (**6º semestre**) no **Centro Universitário do Distrito Federal (UDF)**, em Brasília, e sou **estagiário** na área de **Gestão de TIC** (Tecnologia da Informação e Comunicação) do **Ministério da Educação**. É onde coloco em prática, todo dia, o que estudo.",
    "Meu objetivo é ser **desenvolvedor full stack**. A base que construo agora é em **back-end**, com **Java** e **Spring Boot**, e sigo aprendendo e expandindo. Cada projeto aqui nasceu de um problema real — um sistema que quebrei, entendi por baixo do framework e consertei; um cardápio que precisava caber no celular de uma cliente.",
  ],
  /* TRAJETÓRIA — a carreira como progressão por níveis.
     `status` aceita "concluido" | "atual" | "proximo".
     O medidor ("Nível 4 de 5" e o quanto a barra enche) sai da POSIÇÃO do item
     com status "atual" dentro desta lista — nada é digitado à mão. Mova o
     "atual" para outro item, ou acrescente um nível, e o medidor se reescreve.
     Mantenha UM único item com status "atual". */
  trajetoria: [
    {
      n: "01",
      periodo: "2021 — 2024",
      status: "concluido",
      titulo: "Atendimento",
      texto:
        "Vendas, restaurante e telemarketing pela Bradesco Seguros. Aprendi a ouvir o problema inteiro antes de propor solução — e a lidar com gente irritada sem perder a linha.",
      ganhos: ["Escuta ativa", "Alto volume", "Clareza sob pressão"],
    },
    {
      n: "02",
      periodo: "2025 — 2026",
      status: "concluido",
      titulo: "Administrativo",
      texto:
        "Auxiliar administrativo na Clínica Ouvir e na Veras Centro Automotivo. Primeiro contato com sistema interno, processo documentado e rotina que não pode falhar.",
      ganhos: ["Processo", "Organização", "Sistemas internos"],
    },
    {
      n: "03",
      periodo: "2023 — cursando",
      status: "concluido",
      titulo: "Ciência da Computação — UDF",
      texto:
        "6º semestre, em Brasília. É onde a base formal entra: estrutura de dados, custo de algoritmo, banco de dados e engenharia de software.",
      ganhos: ["Algoritmos", "Estrutura de dados", "Banco de dados"],
    },
    {
      n: "04",
      periodo: "2026 — atual",
      status: "atual",
      titulo: "Estágio em TIC — Ministério da Educação",
      texto:
        "Coordenação de Gestão de TIC. Apoio às demandas do SEI e ao núcleo administrativo de TI. Tecnologia dentro de um órgão público, com escala e regra de verdade.",
      ganhos: ["SEI", "Suporte técnico", "Ambiente corporativo"],
    },
    {
      n: "05",
      periodo: "Próximo nível",
      status: "proximo",
      titulo: "Desenvolvedor full stack",
      texto:
        "A base começa no back-end, com Java e Spring Boot. Os projetos aqui embaixo são as provas que estou juntando pelo caminho.",
      ganhos: [],
    },
  ],

  /* Formação e experiência como LISTAS: entrada nova = uma linha a mais aqui.
     `periodo` é texto livre — escreva do jeito que quiser que apareça. */
  formacao: [
    {
      instituicao: "Centro Universitário do Distrito Federal (UDF)",
      curso: "Ciência da Computação — bacharelado",
      periodo: "2023 — cursando (6º semestre)",
    },
  ],
  experiencia: [
    {
      empresa: "Ministério da Educação (MEC)",
      cargo: "Estagiário — Coordenação de Gestão de TIC",
      periodo: "2026 — atual",
    },
    {
      empresa: "Veras Centro Automotivo",
      cargo: "Auxiliar administrativo",
      periodo: "2025 — 2026",
    },
    {
      empresa: "Clínica Ouvir",
      cargo: "Auxiliar administrativo",
      periodo: "2025",
    },
    {
      empresa: "Antecipa Brasil — atendimento Bradesco Seguros",
      cargo: "Atendente de telemarketing",
      periodo: "2024 — 2025",
    },
    {
      empresa: "Helena Nolleto Restaurante",
      cargo: "Atendente",
      periodo: "2024",
    },
  ],
};

/* ---------------------------------------------------------------------------
 * PORTFÓLIO — uma seção só, com abas. Projetos e certificados moram aqui.
 * A altura da página não cresce quando a lista cresce: ela cresce para dentro.
 * ------------------------------------------------------------------------- */
export const portfolio = {
  overline: "Portfólio",
  titulo: "O que eu construí.",
  // Rótulos das abas. A aba só aparece se a lista correspondente tiver item.
  abas: {
    projetos: "Projetos",
    certificados: "Certificados",
  },
  // Texto do botão que abre o detalhe de um projeto.
  verDetalhes: "Detalhes",
  voltar: "Voltar aos projetos",
};

/* PROJETOS
 * ---------------------------------------------------------------------------
 * Campos obrigatórios: id, nome, tagline, resumo, stack.
 * Opcionais: periodo, contexto, descricao, links, screenshots, casos, extra.
 *   - `resumo`  aparece no CARD (2 linhas, curto).
 *   - `descricao` aparece no DETALHE (pode ser longo).
 *   - `casos`   são os blocos "sintoma → causa → correção" do detalhe.
 *   - `extra`   liga um componente especial ao detalhe. Hoje só "circuitBreaker".
 * O primeiro item da lista é o destaque — deixe na frente o que quer mostrar.
 */
export const projetos = [
  {
    id: "itau-resilience-bff",
    nome: "itau-resilience-bff",
    tagline: "Resiliência em um sistema bancário distribuído.",
    periodo: "2026",
    contexto: "Projeto pessoal de estudo",
    resumo:
      "Serviços de back-end independentes atrás de um BFF com Resilience4j, e um painel que mostra o sistema se degradando sem cair.",
    descricao:
      "Uma simulação de sistema bancário distribuído: serviços de back-end independentes (saldo, cartão e investimentos) atrás de um BFF (Backend For Frontend) com Resilience4j, e um painel de operações que mostra o comportamento sob falha. Quando um serviço fica lento ou cai, o sistema continua respondendo em parte — degradação graciosa em vez de queda total.",
    stack: ["Java 25", "Spring Boot 4", "Resilience4j", "React 19", "Docker", "GitHub Actions"],
    links: [
      { label: "Ver no GitHub", href: "https://github.com/ximenesdev/itau-resilience-bff", primario: true },
    ],
    // Screenshots reais — os arquivos ficam em public/img/ com estes nomes.
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
    // Desafios técnicos concretos: sintoma → causa → correção.
    // Tom "assim que eu depuro", não "meu grande feito".
    casos: [
      {
        titulo: "O “Retry morto”",
        intro: "Um bug que rendeu — e como cheguei na causa.",
        passos: [
          {
            titulo: "Sintoma",
            texto:
              "Um @Retry configurado que simplesmente não tentava de novo. No papel, tudo certo; na prática, nada de retry.",
          },
          {
            titulo: "Causa",
            texto:
              "A ordem dos aspectos (AOP) do Resilience4j: o Circuit Breaker, por dentro, engolia a falha e devolvia o fallback como sucesso antes de o Retry, por fora, ver o erro.",
          },
          {
            titulo: "Correção",
            texto:
              "Inverti a ordem via aspectOrder na configuração — o Retry passou a ver a falha primeiro. Menos plugar biblioteca, mais entender o que roda por baixo do framework.",
          },
        ],
      },
    ],
    extra: "circuitBreaker",
  },
  {
    id: "manducakes-cardapio",
    nome: "manducakes-cardapio",
    tagline: "Um cardápio que abre rápido dentro do Instagram.",
    periodo: "2026",
    contexto: "Cliente real — confeitaria em Brasília",
    resumo:
      "Cardápio digital mobile-first para o link da bio, publicado sob autorização da cliente. HTML, CSS e JavaScript puros.",
    descricao:
      "A confeitaria divulgava o cardápio em PDF pelo Instagram. Dentro do navegador do próprio aplicativo, o arquivo abria mal, exigia zoom e não levava a lugar nenhum — quem queria pedir precisava sair e procurar o contato. Refiz como uma página única, mobile-first, que carrega rápido nesse navegador: categorias separadas por abas e um botão de WhatsApp fixo que já monta a mensagem conforme a seção aberta.",
    stack: ["HTML", "CSS", "JavaScript", "Cloudflare Workers"],
    links: [
      { label: "Ver o site", href: "https://manducakes-cardapio.contatoxm.workers.dev/", primario: true },
      { label: "Ver no GitHub", href: "https://github.com/ximenesdev/manducakes-cardapio" },
    ],
    screenshots: [],
    casos: [
      {
        titulo: "Por que sem framework",
        intro: "A decisão técnica que define o projeto.",
        passos: [
          {
            titulo: "Restrição",
            texto:
              "A página abre dentro do navegador do Instagram, no 4G, no celular de quem está com fome. O que pesa, perde o pedido.",
          },
          {
            titulo: "Escolha",
            texto:
              "HTML, CSS e JavaScript puros, sem dependência e sem build. É um site de conteúdo, sem estado complexo — React aqui custaria carregamento e manutenção sem devolver nada.",
          },
          {
            titulo: "Consequência",
            texto:
              "Os dados do cardápio ficam isolados em js/dados.js. Mudar um preço é editar uma linha, sem tocar em apresentação — e a dona do negócio não depende de mim para cada ajuste.",
          },
        ],
      },
      {
        titulo: "Acessível de verdade",
        intro: "Abas que funcionam sem mouse.",
        passos: [
          {
            titulo: "Estrutura",
            texto:
              "As abas usam os papéis ARIA corretos — tablist, tab e tabpanel, com aria-selected e aria-controls — em vez de divs com clique.",
          },
          {
            titulo: "Teclado",
            texto:
              "Navegação pelas setas, foco sempre visível e contraste de texto conferido. Quem usa leitor de tela entende onde está.",
          },
          {
            titulo: "Movimento",
            texto:
              "As transições respeitam prefers-reduced-motion: quem pediu menos animação no sistema recebe a página parada.",
          },
        ],
      },
    ],
    extra: null,
  },
];

/* CERTIFICADOS
 * ---------------------------------------------------------------------------
 * Está vazio de propósito — a aba "Certificados" não aparece no site enquanto
 * não houver nenhum. Para ligá-la, apague os comentários do exemplo abaixo e
 * preencha. `credencial` é opcional (link de verificação do emissor).
 *
 * {
 *   id: "curso-java-basico",
 *   nome: "Java: programação orientada a objetos",
 *   emissor: "Alura",
 *   data: "2026",
 *   carga: "12 h",
 *   credencial: "https://cursos.alura.com.br/certificate/...",
 * },
 */
export const certificados = [];

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
  portfolio: {
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
