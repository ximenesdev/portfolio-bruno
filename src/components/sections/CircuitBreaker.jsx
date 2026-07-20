/*
 * DIAGRAMA ANIMADO DO CIRCUIT BREAKER (3 estados).
 * O pulso percorre CLOSED -> OPEN -> HALF_OPEN -> CLOSED; só o estado ativo
 * brilha, e um painel explica o que ele significa. Passar o mouse num nó pausa
 * o ciclo e fixa aquele estado.
 *
 * Cor = estado, dentro da paleta do site (azul/âmbar/violeta). Nada de
 * verde/vermelho de tutorial. Em reduced-motion vira uma legenda estática.
 * Só anima quando está na tela (IntersectionObserver) — nada de rodar à toa.
 */
import { useEffect, useRef, useState } from "react";
import { circuitStates } from "../../data/content";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./CircuitBreaker.module.css";

// posições dos nós no viewBox (0 0 425 330)
const POS = [
  { x: 100, y: 165 }, // CLOSED
  { x: 325, y: 100 }, // OPEN
  { x: 325, y: 230 }, // HALF_OPEN
];
// conectores i -> (i+1): o pulso flui no sentido do ciclo
const LINKS = [
  "M100,165 Q225,85 325,100",
  "M325,100 Q395,165 325,230",
  "M325,230 Q205,255 100,165",
];

export default function CircuitBreaker() {
  const reduced = useReducedMotion();
  const [auto, setAuto] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [inView, setInView] = useState(false);
  const rootRef = useRef(null);

  const shown = hovered != null ? hovered : auto;

  // só cicla quando visível, com movimento permitido e sem hover travando
  useEffect(() => {
    if (reduced || !inView || hovered != null) return;
    const id = setInterval(() => setAuto((a) => (a + 1) % circuitStates.length), 1900);
    return () => clearInterval(id);
  }, [reduced, inView, hovered]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.cb} ref={rootRef}>
      <div className={styles.stage}>
        <svg className={styles.svg} viewBox="0 0 425 330" role="img"
          aria-label="Diagrama dos estados do Circuit Breaker: CLOSED, OPEN e HALF_OPEN">
          {/* conectores base */}
          {LINKS.map((d, i) => (
            <path key={`b${i}`} className={styles.link} d={d} />
          ))}
          {/* conectores ativos (pulso) — o que entra no nó ativo acende */}
          {LINKS.map((d, i) => {
            const dest = (i + 1) % circuitStates.length;
            const on = !reduced && dest === shown;
            return (
              <path
                key={`a${i}`}
                className={`${styles.linkActive} ${on ? styles.on : ""}`}
                d={d}
                style={{ color: circuitStates[dest].cor }}
              />
            );
          })}
          {/* nós */}
          {circuitStates.map((s, i) => {
            const active = reduced || i === shown;
            return (
              <g
                key={s.id}
                className={`${styles.node} ${active ? styles.active : ""}`}
                style={{ color: s.cor }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                data-cursor="hover"
              >
                <g className={styles.nodeScale}>
                  <circle cx={POS[i].x} cy={POS[i].y} r="48" />
                </g>
                <text x={POS[i].x} y={POS[i].y} textAnchor="middle" dominantBaseline="central">
                  {s.nome}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* painel: descrição do estado atual (ou legenda estática em reduced-motion) */}
      <div className={styles.panel}>
        {reduced ? (
          <div className={styles.legend}>
            {circuitStates.map((s) => (
              <div className={styles.legendItem} key={s.id} style={{ color: s.cor }}>
                <span className={styles.legendDot} />
                <div>
                  <strong style={{ color: "var(--text-hi)" }}>{s.nome}</strong>
                  <p className={styles.panelDesc} style={{ color: "var(--text-mid)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div key={shown} className={styles.fadeItem}>
            <p className={styles.panelName} style={{ color: circuitStates[shown].cor }}>
              {circuitStates[shown].nome}
            </p>
            <p className={styles.panelDesc}>{circuitStates[shown].desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}
