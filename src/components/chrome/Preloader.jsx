/*
 * Preloader — a "cortina" de entrada.
 * Iniciais BX sobem sob máscara + uma linha âmbar desenha 0->100 + o painel sobe
 * revelando o Hero. Dura ~2,2s e NUNCA repete na mesma sessão (sessionStorage).
 *
 * modos:
 *  - 'full':  primeira visita da sessão (animação completa).
 *  - 'quick': revisita na mesma sessão (fade curto, sem enrolar).
 *  - 'skip':  reduced-motion (não renderiza nada; conteúdo aparece direto).
 */
import { useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import styles from "./Preloader.module.css";

function getMode() {
  if (prefersReducedMotion()) return "skip";
  try {
    if (sessionStorage.getItem("bx_loaded")) return "quick";
  } catch {
    /* modo privado pode bloquear storage — segue como primeira visita */
  }
  return "full";
}

export default function Preloader({ onDone }) {
  const mode = useRef(getMode());
  const [render] = useState(mode.current !== "skip");
  const rootRef = useRef(null);
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    try {
      sessionStorage.setItem("bx_loaded", "1");
    } catch {
      /* ignora */
    }
    onDone?.();
  };

  useLayoutEffect(() => {
    if (mode.current === "skip") {
      finish();
      return;
    }

    const root = rootRef.current;
    const ctx = gsap.context(() => {
      if (mode.current === "quick") {
        // revisita: só um fade rápido para não irritar
        gsap.to(root, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: finish,
        });
        return;
      }

      // primeira visita: a sequência completa
      const tl = gsap.timeline({ onComplete: finish });
      tl.set(root, { autoAlpha: 1 })
        .from(`.${styles.char}`, {
          yPercent: 120,
          duration: 0.7,
          ease: "power4.out",
          stagger: 0.08,
        })
        .to(
          `.${styles.fill}`,
          { scaleX: 1, duration: 1, ease: "power2.inOut" },
          "-=0.3"
        )
        .to(`.${styles.char}`, { yPercent: -120, duration: 0.6, ease: "power4.in" }, "+=0.15")
        .to(`.${styles.track}`, { autoAlpha: 0, duration: 0.3 }, "<")
        .to(root, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.2");
    }, root);

    return () => ctx.revert();
  }, []);

  if (!render) return null;

  return (
    <div className={styles.preloader} ref={rootRef}>
      <div className={styles.initials} aria-label="Bruno Ximenes" role="img">
        <span className={styles.mask}>
          <span className={styles.char}>B</span>
        </span>
        <span className={styles.mask}>
          <span className={styles.char}>X</span>
        </span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} />
      </div>
    </div>
  );
}
