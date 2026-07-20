/*
 * Botão/link com efeito magnetic (atração ao cursor no desktop).
 * Renderiza <a> ou <button> conforme o uso. Anima só transform.
 */
import { useMagnetic } from "../../hooks/useMagnetic";
import styles from "./MagneticButton.module.css";

export default function MagneticButton({
  as = "a",
  variant = "solid",
  children,
  arrow = false,
  className = "",
  ...rest
}) {
  const ref = useMagnetic();
  const cls = `${styles.btn} ${styles[variant]} ${className}`;

  const inner = (
    <span className={styles.label}>
      {children}
      {arrow && (
        <svg
          className={styles.arrow}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 12h14m0 0-5-5m5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );

  if (as === "button") {
    return (
      <button ref={ref} className={cls} {...rest}>
        {inner}
      </button>
    );
  }
  return (
    <a ref={ref} className={cls} {...rest}>
      {inner}
    </a>
  );
}
