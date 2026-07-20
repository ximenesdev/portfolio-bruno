/*
 * Reexpõe a preferência de "menos movimento" como hook reativo, para os
 * componentes React decidirem o que renderizar (ex.: mesh estático vs animado).
 */
import { useMediaQuery } from "./useMediaQuery";

export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
