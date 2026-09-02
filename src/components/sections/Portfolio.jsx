/*
 * PORTFÓLIO — uma seção só, com abas. Dominante azul (frieza técnica).
 * -----------------------------------------------------------------------------
 * Por que abas: a página não pode crescer para baixo a cada projeto novo. Com
 * abas, a seção ocupa sempre a mesma altura — 2 projetos ou 20.
 *
 * Duas vistas dentro da mesma seção:
 *   1. LISTA   — grade de cards (a grade se ajusta à quantidade de itens);
 *   2. DETALHE — um projeto por vez, com descrição, casos técnicos e extras.
 * Trocar entre elas não navega para outra página: substitui o conteúdo aqui.
 *
 * Aba sem item não é renderizada. Enquanto `certificados` estiver vazio no
 * content.js, a aba "Certificados" não existe no site.
 */
import { useEffect, useRef, useState } from "react";
import { portfolio, projetos, certificados } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import ProjectDetail from "./ProjectDetail";
import styles from "./Portfolio.module.css";

/* Card de projeto. Sem imagem de capa, o topo é tipográfico — mesma linha do
   Hero e do Sobre. Ali vai a TAGLINE, não o nome: o nome já é o título logo
   abaixo, e repetir seria ocupar o melhor espaço do card com eco.
   Com capa (campo `capa` no content.js), mostra a imagem no lugar. */
function ProjectCard({ projeto, onAbrir, botaoRef }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardTopo}>
        {projeto.capa ? (
          <img className={styles.capa} src={projeto.capa} alt="" loading="lazy" decoding="async" />
        ) : (
          <p className={styles.cardMarca} aria-hidden="true">
            {projeto.tagline}
          </p>
        )}
      </div>

      <div className={styles.cardCorpo}>
        {(projeto.contexto || projeto.periodo) && (
          <p className={styles.cardMeta}>
            {[projeto.contexto, projeto.periodo].filter(Boolean).join(" · ")}
          </p>
        )}
        <h3 className={styles.cardTitulo}>{projeto.nome}</h3>
        <p className={styles.cardResumo}>{projeto.resumo}</p>

        <ul className={styles.cardStack}>
          {projeto.stack.slice(0, 4).map((s) => (
            <li className={styles.badge} key={s}>
              {s}
            </li>
          ))}
        </ul>

        <button
          type="button"
          ref={botaoRef}
          className={styles.cardBotao}
          onClick={() => onAbrir(projeto.id)}
        >
          {portfolio.verDetalhes}
          <span className={styles.seta} aria-hidden="true">
            →
          </span>
          <span className="sr-only"> de {projeto.nome}</span>
        </button>
      </div>
    </article>
  );
}

/* Card de certificado: texto, não foto do diploma. Miniatura de certificado é
   ilegível e expõe número de registro — o link de credencial é que comprova. */
function CertificateCard({ cert }) {
  return (
    <article className={styles.cert}>
      <p className={styles.certEmissor}>{cert.emissor}</p>
      <h3 className={styles.certNome}>{cert.nome}</h3>
      <p className={styles.certMeta}>{[cert.data, cert.carga].filter(Boolean).join(" · ")}</p>
      {cert.credencial && (
        <a className={styles.certLink} href={cert.credencial} target="_blank" rel="noreferrer">
          Verificar credencial
          <span aria-hidden="true"> →</span>
        </a>
      )}
    </article>
  );
}

export default function Portfolio({ onNavigate }) {
  // Só entram as abas que têm conteúdo.
  const abas = [
    { id: "projetos", label: portfolio.abas.projetos, total: projetos.length },
    { id: "certificados", label: portfolio.abas.certificados, total: certificados.length },
  ].filter((a) => a.total > 0);

  const [abaAtiva, setAbaAtiva] = useState(abas[0]?.id ?? "projetos");
  const [abertoId, setAbertoId] = useState(null);

  const tabsRef = useRef([]);
  const cardsRef = useRef({});
  const detalheRef = useRef(null);
  const voltandoPara = useRef(null);

  const projetoAberto = projetos.find((p) => p.id === abertoId) ?? null;

  // Ao abrir o detalhe, o foco vai para o título dele; ao voltar, retorna para o
  // botão "Detalhes" do card de origem. Sem isso, quem usa teclado se perde.
  useEffect(() => {
    if (projetoAberto) {
      detalheRef.current?.focus();
    } else if (voltandoPara.current) {
      cardsRef.current[voltandoPara.current]?.focus();
      voltandoPara.current = null;
    }
  }, [projetoAberto]);

  const abrir = (id) => {
    setAbertoId(id);
    onNavigate?.("portfolio"); // reenquadra a seção usando o mesmo recuo do menu
  };

  const fechar = () => {
    voltandoPara.current = abertoId;
    setAbertoId(null);
    onNavigate?.("portfolio");
  };

  // Navegação por setas entre as abas — comportamento esperado de um tablist.
  const onTabKeyDown = (e) => {
    const i = abas.findIndex((a) => a.id === abaAtiva);
    let prox = null;
    if (e.key === "ArrowRight") prox = (i + 1) % abas.length;
    if (e.key === "ArrowLeft") prox = (i - 1 + abas.length) % abas.length;
    if (e.key === "Home") prox = 0;
    if (e.key === "End") prox = abas.length - 1;
    if (prox === null) return;
    e.preventDefault();
    setAbaAtiva(abas[prox].id);
    tabsRef.current[prox]?.focus();
  };

  const trocarAba = (id) => {
    setAbertoId(null); // sair da aba fecha qualquer detalhe aberto
    setAbaAtiva(id);
  };

  const lista = abaAtiva === "certificados" ? certificados : projetos;

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <SectionHeading overline={portfolio.overline} title={portfolio.titulo} />

        {/* Uma aba só não é escolha — não vale a barra. Ela aparece quando
            existir um segundo grupo de conteúdo (o primeiro certificado). */}
        {abas.length > 1 && (
          <Reveal>
            <div className={styles.tabs} role="tablist" aria-label="Categorias do portfólio">
              {abas.map((aba, i) => {
                const ativa = aba.id === abaAtiva;
                return (
                  <button
                    key={aba.id}
                    ref={(el) => (tabsRef.current[i] = el)}
                    type="button"
                    role="tab"
                    id={`tab-${aba.id}`}
                    aria-selected={ativa}
                    aria-controls={`painel-${aba.id}`}
                    tabIndex={ativa ? 0 : -1}
                    className={`${styles.tab} ${ativa ? styles.tabAtiva : ""}`}
                    onClick={() => trocarAba(aba.id)}
                    onKeyDown={onTabKeyDown}
                  >
                    {aba.label}
                    <span className={styles.tabCount}>{aba.total}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        )}

        <div
          id={`painel-${abaAtiva}`}
          role={abas.length > 1 ? "tabpanel" : undefined}
          aria-labelledby={abas.length > 1 ? `tab-${abaAtiva}` : undefined}
          tabIndex={-1}
          className={styles.painel}
        >
          {projetoAberto ? (
            /* key força a troca de conteúdo a reanimar ao abrir outro projeto */
            <div className={styles.troca} key={projetoAberto.id}>
              <button type="button" className={styles.voltar} onClick={fechar}>
                <span aria-hidden="true">←</span> {portfolio.voltar}
              </button>
              <ProjectDetail projeto={projetoAberto} tituloRef={detalheRef} />
            </div>
          ) : (
            <div
              className={`${styles.grade} ${styles.troca}`}
              data-quantidade={lista.length}
              key={abaAtiva}
            >
              {abaAtiva === "certificados"
                ? certificados.map((c) => <CertificateCard cert={c} key={c.id} />)
                : projetos.map((p) => (
                    <ProjectCard
                      key={p.id}
                      projeto={p}
                      onAbrir={abrir}
                      botaoRef={(el) => (cardsRef.current[p.id] = el)}
                    />
                  ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
