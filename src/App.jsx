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
import Project from "./components/sections/Project";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";

// intensidade do mesh por seção: o Hero é o mais vivo; o resto respira mais.
const INTENSITY = {
  hero: 1.25,
  sobre: 1.0,
  projeto: 0.9,
  skills: 0.95,
  contato: 1.1,
};

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
    // O recuo do nav fixo vem do scroll-margin-top das seções (CSS), respeitado
    // tanto pelo Lenis quanto pelo scrollIntoView nativo — sem offset em dobro.
    const lenis = lenisRef.current;
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
        <About />
        <Project />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
