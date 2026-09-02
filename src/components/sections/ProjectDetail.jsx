/*
 * DETALHE DE UM PROJETO — a vista que abre quando se clica em "Detalhes".
 * -----------------------------------------------------------------------------
 * Renderiza o que existir no objeto do projeto e ignora o resto: um projeto sem
 * screenshots não deixa buraco, um sem casos técnicos não mostra a seção vazia.
 * Assim o mesmo componente serve o itau-resilience-bff e o manducakes-cardapio.
 *
 * `extra` liga um componente especial ao final do detalhe (hoje, o diagrama do
 * Circuit Breaker). Para acrescentar outro, basta registrá-lo em EXTRAS.
 */
import { useState } from "react";
import MagneticButton from "../ui/MagneticButton";
import Reveal from "../ui/Reveal";
import CircuitBreaker from "./CircuitBreaker";
import styles from "./ProjectDetail.module.css";

// Componentes que um projeto pode "pendurar" no fim do detalhe.
const EXTRAS = {
  circuitBreaker: {
    overline: "Os 3 estados na prática",
    intro:
      "É isso que o Resilience4j faz por baixo: alterna entre três estados para proteger o sistema. Passe o mouse nos nós para fixar cada um.",
    Componente: CircuitBreaker,
  },
};

// Figura de screenshot: se o arquivo ainda não existe em public/img/, mostra um
// placeholder claro com o caminho — sem ícone de imagem quebrada.
function Shot({ src, alt, legenda }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        {!failed && (
          <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
        )}
        {failed && (
          <div className={styles.placeholder}>
            <span>Screenshot aqui</span>
            <code>public{src}</code>
          </div>
        )}
      </div>
      <figcaption className={styles.caption}>{legenda}</figcaption>
    </figure>
  );
}

export default function ProjectDetail({ projeto, tituloRef }) {
  const extra = projeto.extra ? EXTRAS[projeto.extra] : null;
  const temShots = projeto.screenshots?.length > 0;
  const casos = projeto.casos ?? [];

  return (
    <article>
      <div className={styles.top}>
        <Reveal>
          {/* tabIndex -1: alvo do foco ao abrir o detalhe (não entra na ordem do Tab) */}
          <h3 className={styles.nome} ref={tituloRef} tabIndex={-1}>
            {projeto.nome}
          </h3>
          {(projeto.contexto || projeto.periodo) && (
            <p className={styles.meta}>
              {[projeto.contexto, projeto.periodo].filter(Boolean).join(" · ")}
            </p>
          )}
          <p className={styles.tagline}>{projeto.tagline}</p>

          <div className={styles.acoes}>
            {(projeto.links ?? []).map((l) => (
              <MagneticButton
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                variant={l.primario ? "solid" : "ghost"}
                arrow
              >
                {l.label}
              </MagneticButton>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className={styles.desc}>{projeto.descricao ?? projeto.resumo}</p>
          <ul className={styles.stack}>
            {projeto.stack.map((s) => (
              <li className={styles.badge} key={s}>
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {temShots && (
        <Reveal className={styles.shots} stagger={0.15}>
          {projeto.screenshots.map((s) => (
            <Shot key={s.src} {...s} />
          ))}
        </Reveal>
      )}

      {/* Desafios técnicos: blocos COMPACTOS (sintoma → causa → correção), não um
          showcase de 3 colunas. Provam envolvimento real sem virar o clímax. */}
      {casos.map((caso) => (
        <Reveal className={styles.caseCard} key={caso.titulo}>
          <div className={styles.caseHeader}>
            <p className="overline">Desafio técnico</p>
            <h4 className={styles.caseTitle}>{caso.titulo}</h4>
            <p className={styles.caseIntro}>{caso.intro}</p>
          </div>
          <dl className={styles.caseSteps}>
            {caso.passos.map((p) => (
              <div className={styles.caseRow} key={p.titulo}>
                <dt className={styles.caseLabel}>{p.titulo}</dt>
                <dd className={styles.caseText}>{p.texto}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      ))}

      {extra && (
        <>
          <Reveal>
            <p className="overline" style={{ marginBottom: "1rem" }}>
              {extra.overline}
            </p>
            <p className={styles.diagramIntro}>{extra.intro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <extra.Componente />
          </Reveal>
        </>
      )}
    </article>
  );
}
