/*
 * STACK / SKILLS — dominante azul→índigo. Duas faixas: "Base sólida" e
 * "Em evolução ativa". Pills tipográficas com hover (glow no acento via CSS —
 * sem magnetic aqui, para não pesar com muitos elementos ouvindo o mouse).
 */
import { skills } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading overline={skills.overline} title={skills.titulo} />

        {skills.grupos.map((g) => (
          <div
            className={`${styles.group} ${g.nivel === "evoluindo" ? styles.evoluindo : ""}`}
            key={g.rotulo}
          >
            <p className={styles.groupLabel}>
              <span className={styles.mark} />
              {g.rotulo}
            </p>
            <Reveal className={styles.pills} stagger={0.08} start="top 88%">
              {g.itens.map((item) => (
                <span className={styles.pill} key={item} data-cursor="hover">
                  {item}
                </span>
              ))}
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
