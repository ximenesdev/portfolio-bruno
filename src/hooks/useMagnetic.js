/*
 * Efeito "magnetic": o elemento é atraído suavemente na direção do cursor
 * quando o mouse chega perto, e volta ao lugar quando sai. Usado em botões e
 * links de contato. Só liga no desktop com mouse e com movimento permitido.
 *
 * Anima apenas transform (translate) — nunca layout — para segurar os 60fps.
 */
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { usePointerFine } from "./useMediaQuery";

// Padrão de intensidade do site: magnético SUTIL. strength ~0.1–0.12 e raio de
// captura pequeno (~40–50px) mantêm o deslocamento na casa de poucos px. Quem
// precisar de menos (rótulos grandes de Contato) reduz ainda mais.
export function useMagnetic({ strength = 0.12, radius = 44 } = {}) {
  const ref = useRef(null);
  const pointerFine = usePointerFine();

  useEffect(() => {
    const el = ref.current;
    if (!el || !pointerFine || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      // Só "puxa" dentro de um raio ao redor do elemento.
      if (dist < r.width / 2 + radius) {
        xTo(dx * strength);
        yTo(dy * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [pointerFine, strength, radius]);

  return ref;
}
