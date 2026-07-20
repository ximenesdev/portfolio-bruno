/*
 * PROJETO EM DESTAQUE — itau-resilience-bff. Dominante azul (frieza técnica).
 * Estrutura: nome + descrição + stack + repo, screenshots (com placeholder que
 * some quando o PNG real existir), o case do "Retry morto" em 3 passos, e o
 * diagrama animado do Circuit Breaker.
 */
import { useState } from "react";
import { project } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import MagneticButton from "../ui/MagneticButton";
import Reveal from "../ui/Reveal";
import CircuitBreaker from "./CircuitBreaker";
import styles from "./Project.module.css";

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

export default function Project() {
  return (
    <section id="projeto" className="section">
      <div className="container">
        <SectionHeading overline={project.overline} title={project.tagline} />

        <div className={styles.top}>
          <Reveal>
            <p className={styles.repoName}>{project.nome}</p>
            <MagneticButton href={project.repo} target="_blank" rel="noreferrer" arrow>
              Ver no GitHub
            </MagneticButton>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.desc}>{project.descricao}</p>
            <div className={styles.stack}>
              {project.stack.map((s) => (
                <span className={styles.badge} key={s}>
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className={styles.shots} stagger={0.15}>
          {project.screenshots.map((s) => (
            <Shot key={s.src} {...s} />
          ))}
        </Reveal>

        <div className={styles.caseHead}>
          <Reveal>
            <p className="overline" style={{ marginBottom: "1rem" }}>
              Case técnico
            </p>
            <h3 className={styles.caseTitle}>{project.caseRetry.titulo}</h3>
          </Reveal>
        </div>

        <Reveal className={styles.steps} stagger={0.15}>
          {project.caseRetry.passos.map((p) => (
            <div className={styles.step} key={p.n}>
              <p className={styles.stepNum}>{p.n}</p>
              <h4 className={styles.stepTitle}>{p.titulo}</h4>
              <p className={styles.stepText}>{p.texto}</p>
            </div>
          ))}
        </Reveal>

        <Reveal>
          <p className="overline" style={{ marginBottom: "1rem" }}>
            Os 3 estados na prática
          </p>
          <p className={styles.diagramIntro}>
            É isso que o Resilience4j faz por baixo: alterna entre três estados para proteger
            o sistema. Passe o mouse nos nós para fixar cada um.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <CircuitBreaker />
        </Reveal>
      </div>
    </section>
  );
}
