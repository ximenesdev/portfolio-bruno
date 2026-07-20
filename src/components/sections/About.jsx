/*
 * SOBRE MIM — trajetória real, sem clichê. Dominante âmbar esfriando.
 * Texto grande e respirado à esquerda; a virada de carreira como linha do tempo
 * à direita, revelada em cascata no scroll.
 */
import { about } from "../../data/content";
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

export default function About() {
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
      </div>
    </section>
  );
}
