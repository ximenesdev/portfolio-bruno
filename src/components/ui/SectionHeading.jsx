/*
 * Título de seção com revelação por linhas (SplitText + máscara).
 * As linhas "sobem" de dentro de um recorte — o efeito de tipografia cinética
 * que carrega o site. Em reduced-motion, o título aparece direto.
 */
import { useRef, useLayoutEffect } from "react";
import { gsap, SplitText, prefersReducedMotion } from "../../lib/gsap";
import styles from "./SectionHeading.module.css";

export default function SectionHeading({ overline, title }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const titleEl = root.querySelector("[data-split]");
    let split, tween, cancelled = false;

    const run = () => {
      if (cancelled) return;
      split = new SplitText(titleEl, { type: "lines", mask: "lines" });
      tween = gsap.from(split.lines, {
        yPercent: 115,
        duration: 1,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      });
    };

    // Espera as fontes carregarem para o split medir as linhas corretamente.
    if (document.fonts && document.fonts.status !== "loaded") {
      document.fonts.ready.then(run);
    } else {
      run();
    }

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, []);

  return (
    <div className={styles.heading} ref={ref}>
      {overline && <p className={`overline ${styles.overline}`}>{overline}</p>}
      <h2 className={styles.title} data-split>
        {title}
      </h2>
    </div>
  );
}
