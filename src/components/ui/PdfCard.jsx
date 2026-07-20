/*
 * Card de PDF de material de estudo.
 * O link aponta para /docs/... com `download`. Funciona mesmo antes do arquivo
 * existir: quando Bruno soltar o PDF em public/docs/ com o nome certo, baixa.
 */
import styles from "./PdfCard.module.css";

export default function PdfCard({ titulo, desc, arquivo, index }) {
  return (
    <a
      className={styles.card}
      href={arquivo}
      download
      aria-label={`Baixar PDF: ${titulo}`}
    >
      <div className={styles.top}>
        {/* ícone de documento, desenhado à mão (mesma linguagem visual para os 4) */}
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 2.5h7L18.5 8v13.5H6z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M13 2.5V8h5.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <path
            d="M8.75 12.5h6.5M8.75 15.5h6.5M8.75 18h4"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
        <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
      </div>

      <h3 className={styles.title}>{titulo}</h3>
      <p className={styles.desc}>{desc}</p>

      <span className={styles.download}>
        Baixar PDF
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}
