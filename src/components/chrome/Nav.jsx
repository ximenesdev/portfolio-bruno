/*
 * Navegação. Barra discreta no topo com indicador da seção ativa (activeId vem
 * do App, que já rastreia a seção para o mesh). No mobile, vira um menu
 * full-screen com tipografia grande.
 */
import { useState } from "react";
import { nav as navItems } from "../../data/content";
import styles from "./Nav.module.css";

export default function Nav({ activeId, onNavigate }) {
  const [open, setOpen] = useState(false);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <nav className={styles.nav} aria-label="Navegação principal">
        <a className={styles.logo} href="#hero" onClick={(e) => go(e, "hero")}>
          Bruno<b>.</b>
        </a>

        <div className={styles.links}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => go(e, item.id)}
              className={`${styles.link} ${activeId === item.id ? styles.active : ""}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          className={`${styles.burger} ${open ? styles.open : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`${styles.overlay} ${open ? styles.show : ""}`}>
        {navItems.map((item, i) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => go(e, item.id)}
            className={`${styles.overlayLink} ${activeId === item.id ? styles.active : ""}`}
          >
            <span className={styles.idx}>0{i + 1}</span>
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
