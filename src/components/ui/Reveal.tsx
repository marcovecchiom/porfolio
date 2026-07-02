import type { ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cx } from '../../utils/cx';
import styles from './Reveal.module.css';

interface RevealProps {
  children: ReactNode;
  /** Retardo en ms para escalonar apariciones dentro de una misma zona. */
  delay?: number;
  className?: string;
}

/**
 * Revela su contenido con un fade + desplazamiento suave cuando entra en el
 * viewport. Si el usuario prefiere menos movimiento, aparece ya visible.
 *
 * Encapsula el patrón "animar al hacer scroll" en un solo lugar, así ninguna
 * sección tiene que repetir la lógica de IntersectionObserver.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>();
  const visible = reduced || inView;

  return (
    <div
      ref={ref}
      className={cx(styles.reveal, visible && styles.visible, className)}
      style={reduced ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
