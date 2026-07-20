/*
 * Smooth scroll com Lenis, sincronizado ao GSAP ScrollTrigger.
 * Este é o combo padrão dos sites premiados: o Lenis controla o scroll e o
 * ScrollTrigger é avançado no mesmo "tick" do GSAP — sem dois loops brigando.
 *
 * Em prefers-reduced-motion NÃO instanciamos o Lenis: devolvemos o scroll nativo,
 * que é instantâneo e previsível para quem pediu menos movimento.
 */
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

export function initSmoothScroll() {
  if (prefersReducedMotion()) return null;

  const lenis = new Lenis({
    duration: 1.1, // "peso" do scroll — nem pesado demais, nem seco
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // A cada avanço do Lenis, o ScrollTrigger recalcula.
  lenis.on("scroll", ScrollTrigger.update);

  // Um único loop: o ticker do GSAP avança o Lenis (nada de rAF paralelo).
  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Guardamos o cleanup na própria instância para o React desmontar limpo.
  lenis._cleanup = () => {
    gsap.ticker.remove(raf);
    lenis.off("scroll", ScrollTrigger.update);
    lenis.destroy();
  };

  return lenis;
}
