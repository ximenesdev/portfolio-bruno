/*
 * SOBRE MIM — trajetória real, sem clichê. Dominante âmbar esfriando.
 * Texto grande e respirado à esquerda; a virada de carreira como linha do tempo
 * à direita, revelada em cascata no scroll.
 *
 * Abaixo, formação e experiência como LISTAS (entrada nova = uma linha no
 * content.js) e os atalhos para o Portfólio, cujos números são CONTADOS a
 * partir das listas — nunca digitados à mão, para não desatualizarem.
 */
import { about, projetos, certificados } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import styles from "./About.module.css";

// Converte **palavra** em <strong> — dá ritmo de leitura (cargos, tempo, nomes).
function renderBold(texto) {
  return texto.split(/(\*\*[^*]+\*\*)/g).map((parte, i) =>
    parte.startsWith("**") && parte.endsWith("**") ? (
      <strong key={i}>{parte.slice(2, -2)}</strong>
    ) : (
      parte
    )
  );
}

// Coluna de histórico (Formação ou Experiência) — mesma forma para as duas.
function Historico({ titulo, itens, chaveTopo, chaveMeio }) {
  if (!itens?.length) return null;
  return (
    <div>
      <p className="overline">{titulo}</p>
      <Reveal className={styles.linha} stagger={0.1} start="top 85%">
        {itens.map((item, i) => (
          <div className={styles.item} key={i}>
            <p className={styles.itemTopo}>{item[chaveTopo]}</p>
            <p className={styles.itemMeio}>{item[chaveMeio]}</p>
            <p className={styles.itemPeriodo}>{item.periodo}</p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}

export default function About({ onNavigate }) {
  // Só entra o atalho que tem conteúdo — nada de contador zerado na tela.
  const atalhos = [
    { id: "projetos", label: "Projetos", nota: "Construídos e publicados", total: projetos.length },
    { id: "certificados", label: "Certificados", nota: "Cursos concluídos", total: certificados.length },
  ].filter((a) => a.total > 0);

  return (
    <section id="sobre" className="section">
      <div className="container">
        <SectionHeading overline={about.overline} title={about.titulo} />

        <div className={styles.grid}>
          <Reveal className={styles.prose} stagger={0.15}>
            {about.paragrafos.map((p, i) => (
              <p key={i}>{renderBold(p)}</p>
            ))}
          </Reveal>

          <Reveal className={styles.marcos} stagger={0.12} start="top 80%">
            {about.marcos.map((m, i) => (
              <div className={styles.marco} key={i}>
                <p className={styles.marcoDe}>{m.de}</p>
                <p className={styles.marcoPara}>{m.para}</p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* A formação é curta e a experiência é longa. Os atalhos ficam sob a
            formação para equilibrar as duas colunas — sem buraco de um lado. */}
        <div className={styles.historicos}>
          <div className={styles.coluna}>
            <Historico
              titulo="Formação"
              itens={about.formacao}
              chaveTopo="instituicao"
              chaveMeio="curso"
            />

            {atalhos.length > 0 && (
              <Reveal className={styles.atalhos} stagger={0.1}>
                {atalhos.map((a) => (
                  <button
                    type="button"
                    className={styles.atalho}
                    key={a.id}
                    onClick={() => onNavigate?.("portfolio")}
                  >
                    <span className={styles.atalhoNumero}>{a.total}</span>
                    <span className={styles.atalhoTexto}>
                      <span className={styles.atalhoLabel}>{a.label}</span>
                      <span className={styles.atalhoNota}>{a.nota}</span>
                    </span>
                    <span className={styles.atalhoSeta} aria-hidden="true">
                      ↗
                    </span>
                    <span className="sr-only">Ir para o portfólio</span>
                  </button>
                ))}
              </Reveal>
            )}
          </div>

          <Historico
            titulo="Experiência"
            itens={about.experiencia}
            chaveTopo="empresa"
            chaveMeio="cargo"
          />
        </div>
      </div>
    </section>
  );
}
