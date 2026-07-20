/*
 * Hook genérico de media query, mais dois atalhos semânticos.
 * Usado para decidir o que é "desktop com mouse" (mesh WebGL + cursor custom)
 * versus mobile/touch (versão leve).
 */
import { useEffect, useState } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

// "Desktop de verdade": tela larga E com ponteiro fino (mouse), não toque.
// É a combinação que autoriza os efeitos mais pesados.
export const usePointerFine = () => useMediaQuery("(hover: hover) and (pointer: fine)");
export const useIsWide = () => useMediaQuery("(min-width: 768px)");
