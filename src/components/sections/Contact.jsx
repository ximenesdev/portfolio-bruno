/*
 * CONTATO — dominante violeta (o convite, a resolução da jornada de cor).
 * Convite em tipografia grande + 3 destinos como itens grandes com traço que se
 * desenha e o rótulo atraído pelo cursor (magnetic). Nada de rodapé de ícones.
 */
import { contato } from "../../data/content";
import Reveal from "../ui/Reveal";
import { useMagnetic } from "../../hooks/useMagnetic";
import styles from "./Contact.module.css";

function ContactRow({ label, handle, href }) {
  const ref = useMagnetic({ strength: 0.2, radius: 60 });
  const external = href.startsWith("http");
  return (
    <a
      className={styles.row}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className={styles.rowMain} ref={ref}>
        <span className={styles.rowLabel}>{label}</span>
        <span className={styles.rowHandle}>{handle}</span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contato" className={`section ${styles.contact}`}>
      <div className="container">
        <Reveal>
          <p className="overline" style={{ marginBottom: "1.5rem" }}>
            {contato.overline}
          </p>
          <h2 className={styles.title}>{contato.titulo}</h2>
          <p className={styles.sub}>{contato.subtitulo}</p>
        </Reveal>

        <Reveal className={styles.list} stagger={0.1} start="top 85%">
          {contato.links.map((l) => (
            <ContactRow key={l.label} {...l} />
          ))}
        </Reveal>

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Bruno Ximenes · Brasília</span>
          <span>Construído com React, GSAP e um mesh em WebGL</span>
        </footer>
      </div>
    </section>
  );
}
