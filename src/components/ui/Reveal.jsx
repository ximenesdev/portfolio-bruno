/*
 * Reveal on scroll: fade + leve subida ao entrar na viewport.
 * Anima só opacity/transform. Em reduced-motion não faz nada (conteúdo já visível).
 * Com `stagger`, revela os filhos diretos em cascata.
 */
import { useRef, useLayoutEffect } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";

export default function Reveal({
  as: Tag = "div",
  children,
  y = 26,
  delay = 0,
  stagger = false,
  start = "top 85%",
  className,
  ...rest
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? el.children : el;
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ? (typeof stagger === "number" ? stagger : 0.1) : 0,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, ref);

    return () => ctx.revert();
  }, [y, delay, stagger, start]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
