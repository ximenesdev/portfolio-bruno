/*
 * Utilitários matemáticos usados pelo cursor, mesh e microinterações.
 */

// interpolação linear: mistura a->b na proporção t (0..1). É o coração do "atraso" suave.
export const lerp = (a, b, t) => a + (b - a) * t;

// prende um valor entre min e max
export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

// remapeia v da faixa [inMin,inMax] para [outMin,outMax]
export const mapRange = (v, inMin, inMax, outMin, outMax) =>
  outMin + ((v - inMin) * (outMax - outMin)) / (inMax - inMin);

// converte "#rrggbb" para {r,g,b} em 0..1 (o shader trabalha nessa escala)
export const hexToRgb01 = (hex) => {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
};
