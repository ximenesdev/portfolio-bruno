/*
 * MATERIAL DE ESTUDO — dominante violeta. 4 cards de PDF, prontos e funcionais.
 * Os arquivos ainda não existem: basta soltar os PDFs em public/docs/ com os
 * nomes definidos em data/content.js e o download passa a funcionar, sem tocar
 * em código.
 */
import { material } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import PdfCard from "../ui/PdfCard";
import styles from "./StudyMaterial.module.css";

export default function StudyMaterial() {
  return (
    <section id="material" className="section">
      <div className="container">
        <SectionHeading overline={material.overline} title={material.titulo} />
        <p className={styles.intro}>{material.intro}</p>

        <Reveal className={styles.grid} stagger={0.1} start="top 85%">
          {material.pdfs.map((pdf, i) => (
            <PdfCard key={pdf.arquivo} index={i} {...pdf} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
