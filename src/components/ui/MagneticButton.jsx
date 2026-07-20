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
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
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
