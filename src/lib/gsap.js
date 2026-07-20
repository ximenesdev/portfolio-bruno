/*
 * Ponto único de configuração do GSAP.
 * Registramos os plugins uma vez e reexportamos tudo para o resto do app.
 * (Desde o GSAP 3.13 / aquisição pela Webflow, SplitText e ScrollTrigger são
 *  gratuitos, inclusive para uso comercial — por isso podemos usá-los à vontade.)
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Padrão de movimento do site: saídas suaves e confiantes.
gsap.defaults({ ease: "power3.out", duration: 0.9 });

// Verdadeiro quando o usuário pediu menos movimento no sistema operacional.
// Todas as animações "de enfeite" checam isto e se desligam.
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText };
