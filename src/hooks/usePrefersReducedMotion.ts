import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Indica si el usuario pidió reducir el movimiento a nivel sistema operativo.
 *
 * Todas las animaciones no esenciales (canvas, reveals, cursor) lo consultan
 * para desactivarse y respetar la accesibilidad. Se actualiza si la
 * preferencia cambia en vivo.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const onChange = () => setReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
