import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './LinkButton.module.css';

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  /** Estilo visual: relleno con acento o solo contorno. */
  variant?: 'solid' | 'outline';
  /** Si apunta afuera del sitio (abre en pestaña nueva con rel seguro). */
  external?: boolean;
  /** Ícono/afijo opcional a la derecha del texto (flecha, etc.). */
  trailing?: ReactNode;
  className?: string;
}

/**
 * Botón con forma de píldora renderizado como enlace `<a>`.
 * Un único componente para todos los CTAs, con dos variantes visuales.
 */
export function LinkButton({
  href,
  children,
  variant = 'solid',
  external = false,
  trailing,
  className,
}: LinkButtonProps) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a
      href={href}
      className={cx(styles.button, styles[variant], className)}
      {...externalProps}
    >
      {children}
      {trailing && (
        <span className={styles.trailing} aria-hidden="true">
          {trailing}
        </span>
      )}
    </a>
  );
}
