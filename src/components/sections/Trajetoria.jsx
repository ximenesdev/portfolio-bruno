/*
 * TRAJETÓRIA — a carreira como progressão por níveis, dentro da seção "Sobre".
 * -----------------------------------------------------------------------------
 * Um trilho vertical que se preenche conforme o scroll, com um nó por nível.
 * O preenchimento PARA na altura do nível "atual": o último nível ainda não foi
 * conquistado, e mostrar a barra cheia seria mentir sobre onde eu estou.
 *
 * Nada aqui é digitado à mão — nível, total e porcentagem saem da posição do
 * item com status "atual" dentro de about.trajetoria. Acrescentar um nível no
 * content.js reescreve o medidor sozinho.
 */
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../lib/gsap";
import { about } from "../../data/content";
import Reveal from "../ui/Reveal";
import styles from "./Trajetoria.module.css";

const SELO = { concluido: "Concluído", atual: "Atual", proximo: "Próximo" };

export default function Trajetoria() {
  const lista = about.trajetoria ?? [];

  const raizRef = useRef(null);
  const corpoRef = useRef(null);
  const preenchRef = useRef(null);
  const barraRef = useRef(null);
  const nosRef = useRef([]);

  // Nível atual = posição do item "atual" na lista (1-based). Sem "atual", o
  // medidor assume tudo concluído em vez de quebrar.
  const iAtual = lista.findIndex((n) => n.status === "atual");
  const total = lista.length;
  const nivel = iAtual >= 0 ? iAtual + 1 : total;
  const pct = total ? nivel / total : 0;

  useLayoutEffect(() => {
    const raiz = raizRef.current;
    if (!raiz || !total) return;

    /* Onde o trilho para de preencher: o centro do nó "atual". Medido do DOM,
       não chumbado — muda sozinho se um nível ganhar mais texto.

       Usa offsetTop/offsetHeight, NÃO getBoundingClientRect: o rect enxerga
       transform, e no mount os cards ainda carregam o deslocamento do Reveal
       (y: 26). Medir pelo rect ali dava 68,4% em vez dos 66,5% reais — o
       preenchimento passava do centro do nó. offset* é posição de layout e
       ignora transform, então a conta fecha em qualquer momento. */
    const distanciaAte = (el, ancestral) => {
      let d = 0;
      let n = el;
      while (n && n !== ancestral) {
        d += n.offsetTop;
        n = n.offsetParent;
      }
      return d;
    };

    const medirTrilho = () => {
      const corpo = corpoRef.current;
      const preench = preenchRef.current;
      const noAlvo = nosRef.current[iAtual >= 0 ? iAtual : total - 1];
      if (!corpo || !preench || !noAlvo || !corpo.offsetHeight) return;
      const centro = distanciaAte(noAlvo, corpo) + noAlvo.offsetHeight / 2;
      const fracao = centro / corpo.offsetHeight;
      preench.style.height = `${Math.min(100, Math.max(0, fracao * 100))}%`;
    };
    medirTrilho();

    // Sem movimento: trilho já preenchido, nós já acesos, medidor já cheio.
    if (prefersReducedMotion()) {
      nosRef.current.forEach((no, i) => {
        if (no && iAtual >= 0 && i <= iAtual) no.classList.add(styles.aceso);
      });
      if (barraRef.current) barraRef.current.style.transform = `scaleX(${pct})`;
      return;
    }

    // O trilho é medido em px; qualquer refresh (inclusive o do Portfólio ao
    // trocar de vista) precisa remedir antes de o ScrollTrigger recalcular.
    ScrollTrigger.addEventListener("refresh", medirTrilho);

    const ctx = gsap.context(() => {
      // 1. O trilho preenche acompanhando o scroll (scrub), sem vida própria.
      gsap.fromTo(
        preenchRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: raiz,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.4, // leve atraso: acompanha o Lenis sem parecer preso ao pixel
          },
        }
      );

      // 2. Cada nó acende quando o preenchimento chega nele — um a um, não em
      //    bloco. O nível "próximo" nunca acende: ainda não foi conquistado.
      nosRef.current.forEach((no, i) => {
        if (!no || iAtual < 0 || i > iAtual) return;
        ScrollTrigger.create({
          trigger: no,
          start: "top 62%",
          onEnter: () => no.classList.add(styles.aceso),
          onLeaveBack: () => no.classList.remove(styles.aceso),
        });
      });

      // 3. A barra do medidor cresce de 0 até a porcentagem final na entrada.
      gsap.fromTo(
        barraRef.current,
        { scaleX: 0 },
        {
          scaleX: pct,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: raiz, start: "top 80%", once: true },
        }
      );
    }, raiz);

    return () => {
      ScrollTrigger.removeEventListener("refresh", medirTrilho);
      ctx.revert();
    };
  }, []);

  if (!total) return null;

  return (
    <div className={styles.trajetoria} ref={raizRef}>
      <div className={styles.cabecalho}>
        <p className="overline">Trajetória</p>

        {/* O texto carrega a informação; a barra é enfeite e fica escondida
            do leitor de tela para não virar ruído. */}
        <div className={styles.medidor}>
          <p className={styles.medidorRotulo}>Progresso da carreira</p>
          <p className={styles.medidorNivel}>
            Nível {nivel} de {total}
          </p>
          <div className={styles.medidorTrilho} aria-hidden="true">
            <span className={styles.medidorBarra} ref={barraRef} />
          </div>
        </div>
      </div>

      {/* O trilho é irmão da <ol>, não filho: <ol> só aceita <li>. */}
      <div className={styles.corpo} ref={corpoRef}>
        <div className={styles.trilho} aria-hidden="true">
          <span className={styles.trilhoPreench} ref={preenchRef} />
        </div>

        <ol className={styles.lista}>
          {lista.map((item, i) => (
            /* Um Reveal por nível: cada card entra quando ELE entra na tela.
               Um stagger único dispararia os últimos ainda fora da viewport. */
            <Reveal as="li" className={styles.nivel} data-status={item.status} key={item.n}>
              <div className={styles.no} ref={(el) => (nosRef.current[i] = el)}>
                <span>{item.n}</span>
              </div>

              <div className={styles.card}>
                <div className={styles.cardTopo}>
                  <span className={styles.periodo}>{item.periodo}</span>
                  <span className={styles.selo}>{SELO[item.status]}</span>
                </div>

                <h4 className={styles.cardTitulo}>{item.titulo}</h4>
                <p className={styles.cardTexto}>{item.texto}</p>

                {item.ganhos?.length > 0 && (
                  <div className={styles.rodape}>
                    <p className="overline">Ganhei</p>
                    <ul className={styles.chips}>
                      {item.ganhos.map((g) => (
                        <li className={styles.chip} key={g}>
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* número gigante em contorno, atrás do conteúdo */}
                <span className={styles.fantasma} aria-hidden="true">
                  {item.n}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}
