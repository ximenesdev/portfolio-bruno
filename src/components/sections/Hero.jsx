/*
 * HERO — 100% tipográfico (sem foto). Dominante âmbar.
 * A intro toca quando o preloader levanta (prop `play`): o nome sobe sob máscara,
 * o headline entra por linhas (SplitText) e o resto faz fade-up. Só o texto se
 * move — a tipografia grande faz o trabalho, com muito espaço escuro em volta.
 */
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, SplitText, prefersReducedMotion } from "../../lib/gsap";
import { meta, hero } from "../../data/content";
import MagneticButton from "../ui/MagneticButton";
import styles from "./Hero.module.css";

export default function Hero({ play, onNavigate }) {
  const root = useRef(null);
  const hasRun = useRef(false);

  // Antes de pintar: se vamos animar, escondemos os elementos para não haver flash.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const q = gsap.utils.selector(root);
    gsap.set([q(`.${styles.name}`), q(`.${styles.headline}`)], { autoAlpha: 0 });
    gsap.set([q(`.${styles.eyebrow}`), q(`.${styles.lead}`), q(`.${styles.ctas}`), q(`.${styles.scroll}`)], {
      autoAlpha: 0,
      y: 22,
    });
  }, []);

  // Toca a intro assim que o preloader termina.
  useEffect(() => {
    if (!play || hasRun.current || prefersReducedMotion()) return;
    hasRun.current = true;

    const q = gsap.utils.selector(root);
    const build = () => {
      const nameSplit = new SplitText(q(`.${styles.name}`), { type: "lines", mask: "lines" });
      const headSplit = new SplitText(q(`.${styles.headline}`), { type: "lines", mask: "lines" });
      gsap.set([q(`.${styles.name}`), q(`.${styles.headline}`)], { autoAlpha: 1 });

      const tl = gsap.timeline();
      tl.from(q(`.${styles.eyebrow}`), { autoAlpha: 0, y: 22, duration: 0.7 })
        .from(nameSplit.lines, { yPercent: 115, duration: 1, stagger: 0.1, ease: "power4.out" }, "-=0.4")
        .from(headSplit.lines, { yPercent: 115, duration: 0.9, stagger: 0.09, ease: "power4.out" }, "-=0.7")
        .to(q(`.${styles.lead}`), { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to(q(`.${styles.ctas}`), { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(q(`.${styles.scroll}`), { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.6");
    };

    if (document.fonts && document.fonts.status !== "loaded") document.fonts.ready.then(build);
    else build();
  }, [play]);

  return (
    <section id="hero" className={styles.hero} ref={root}>
      <div className="container">
      <div className={styles.inner}>
        <p className={`overline ${styles.eyebrow}`}>
          <span>{meta.eyebrow}</span>
          <span className={styles.dot} />
          <span>{meta.local}</span>
        </p>

        <h1 className={styles.name}>{meta.nome}</h1>

        <p className={styles.headline}>{meta.headline}</p>

        <p className={styles.lead}>{hero.lead}</p>

        <div className={styles.ctas}>
          <MagneticButton href="#projeto" onClick={(e) => { e.preventDefault(); onNavigate("projeto"); }} arrow>
            Ver o projeto
          </MagneticButton>
          <MagneticButton
            href="#contato"
            variant="ghost"
            onClick={(e) => { e.preventDefault(); onNavigate("contato"); }}
          >
            Entrar em contato
          </MagneticButton>
        </div>
      </div>
      </div>

      <div className={styles.scroll} aria-hidden="true">
        <span className={styles.scrollLine} />
        Role para descobrir
      </div>
    </section>
  );
}
