import { useEffect, useRef, useState } from 'react';

interface Options {
  /** Fracción del elemento visible para disparar (0..1). */
  threshold?: number;
  /** Margen del root, útil para adelantar/retrasar el disparo. */
  rootMargin?: string;
  /** Si true, se dispara una sola vez y deja de observar. */
  once?: boolean;
}

/**
 * Observa un elemento y avisa cuando entra en el viewport.
 *
 * Base reutilizable para las animaciones "al hacer scroll" (reveals, subrayados).
 * Devuelve un `ref` para adjuntar al elemento y un booleano `inView`.
 */
export function useInView<T extends HTMLElement>(
  options: Options = {},
): [React.RefObject<T>, boolean] {
  const { threshold = 0.12, rootMargin = '0px 0px -7% 0px', once = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
