/*
 * Cursor customizado (desktop com mouse + movimento permitido).
 * - ponto: segue o mouse quase instantâneo.
 * - anel: segue com atraso (quickTo) — é o glow/spotlight.
 * No mobile/touch ou em reduced-motion: não renderiza nada e o ponteiro nativo
 * permanece (nunca escondemos o cursor onde não há mouse).
 */
import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { usePointerFine } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./Cursor.module.css";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pointerFine = usePointerFine();
  const reduced = useReducedMotion();
  const enabled = pointerFine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;

    document.documentElement.classList.add("has-custom-cursor");

    // ponto rápido, anel lento — a diferença de atraso cria a sensação de "peso"
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    // cresce sobre qualquer elemento interativo (delegação de eventos)
    const isInteractive = (t) =>
      t.closest && t.closest("a, button, [data-cursor='hover']");
    const onOver = (e) => {
      if (isInteractive(e.target)) ring.classList.add(styles.hover);
    };
    const onOut = (e) => {
      if (isInteractive(e.target)) ring.classList.remove(styles.hover);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      gsap.killTweensOf([dot, ring]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
}
