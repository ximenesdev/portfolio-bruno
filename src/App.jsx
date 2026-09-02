/*
 * APP — orquestra o site inteiro.
 * - inicia o smooth scroll (Lenis) e o trava enquanto o preloader roda;
 * - rastreia a seção ativa (IntersectionObserver no centro da tela) e, a cada
 *   troca, reescreve as CSS vars de acento E alimenta o mesh — é isto que faz a
 *   "jornada de matiz" âmbar -> azul -> violeta;
 * - decide o modo pesado (mesh WebGL + cursor) só no desktop com movimento ok.
 */
import { useEffect, useRef, useState } from "react";
import { initSmoothScroll } from "./lib/lenis";
import { ScrollTrigger } from "./lib/gsap";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useIsWide } from "./hooks/useMediaQuery";
import { sectionThemes, nav as navItems } from "./data/content";

import MeshGradient from "./components/background/MeshGradient";
import Cursor from "./components/chrome/Cursor";
import Preloader from "./components/chrome/Preloader";
import Nav from "./components/chrome/Nav";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Portfolio from "./components/sections/Portfolio";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";

// intensidade do mesh por seção: o Hero é o mais vivo; o resto respira mais.
const INTENSITY = {
  hero: 1.25,
  sobre: 1.0,
  portfolio: 0.9,
  skills: 0.95,
  contato: 1.1,
};

// Recuo de âncora ao pular para uma seção: a altura REAL da barra fixa (que muda
// entre desktop e mobile por causa do padding fluido) + um respiro acima do título.
// Medimos o elemento em vez de chumbar um número — assim nada chega cortado.
function getAnchorOffset() {
  const navEl = document.querySelector("nav");
  const navH = navEl ? navEl.getBoundingClientRect().height : 64;
  const gap = Math.min(24, window.innerHeight * 0.03); // respiro (menor no mobile)
  return Math.round(navH + gap);
}

export default function App() {
  const reduced = useReducedMotion();
  const isWide = useIsWide();
  const animated = isWide && !reduced; // liga o mesh WebGL (senão, fallback CSS)

  const [activeId, setActiveId] = useState("hero");
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef(null);

  // ---- Smooth scroll ----
  useEffect(() => {
    const lenis = initSmoothScroll();
    lenisRef.current = lenis;
    return () => lenis?._cleanup?.();
  }, []);

  // ---- Trava o scroll enquanto o preloader está na tela ----
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!loaded) {
      document.documentElement.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.documentElement.style.overflow = "";
      lenis?.start();
      // conteúdo/fontes já assentados: recalcula os gatilhos de scroll
      ScrollTrigger.refresh();
    }
  }, [loaded]);

  // ---- Publica o recuo de âncora (px) para o scroll-margin-top das seções ----
  // A barra muda de altura em desktop/mobile; medimos no mount, no resize e
  // quando o preloader levanta (fontes já assentadas = altura final da barra).
  useEffect(() => {
    const apply = () =>
      document.documentElement.style.setProperty("--anchor-offset", `${getAnchorOffset()}px`);
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [loaded]);

  // ---- Seção ativa: a banda de detecção é uma linha no centro da tela ----
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // ---- Aplica o tema da seção ativa (acento em toda a UI + fallback do mesh) ----
  useEffect(() => {
    const t = sectionThemes[activeId];
    if (!t) return;
    const root = document.documentElement.style;
    root.setProperty("--accent", t.accent);
    root.setProperty("--accent-glow", t.accentGlow);
    root.setProperty("--accent-rgb", t.accentRgb);
  }, [activeId]);

  const onNavigate = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Mede a barra AGORA (estado atual, mobile/desktop) e usa o mesmo recuo nos
    // dois caminhos — sem cálculo em dobro.
    const offset = getAnchorOffset();
    document.documentElement.style.setProperty("--anchor-offset", `${offset}px`);
    const lenis = lenisRef.current;
    // Fonte ÚNICA de recuo: o scroll-margin-top das seções (= --anchor-offset).
    // Esta versão do Lenis JÁ respeita scroll-margin-top, então NÃO passamos offset
    // aqui — passar recriaria o recuo em dobro. O fallback nativo usa o mesmo CSS.
    if (lenis) lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: "auto" });
  };

  const theme = sectionThemes[activeId] ?? sectionThemes.hero;

  return (
    <>
      <MeshGradient animated={animated} colors={theme.mesh} intensity={INTENSITY[activeId] ?? 1} />
      <Preloader onDone={() => setLoaded(true)} />
      <Cursor />
      <Nav activeId={activeId} onNavigate={onNavigate} />

      <main>
        <Hero play={loaded} onNavigate={onNavigate} />
        <About onNavigate={onNavigate} />
        {/* onNavigate reenquadra a seção quando o Portfólio troca de vista
            (abrir/fechar o detalhe de um projeto), usando o mesmo recuo do menu */}
        <Portfolio onNavigate={onNavigate} />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
