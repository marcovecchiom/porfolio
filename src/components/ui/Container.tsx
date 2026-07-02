import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Container.module.css';

/**
 * Contenedor centrado con ancho máximo y padding horizontal responsivo.
 * Da a todas las secciones el mismo ritmo de márgenes sin repetir valores.
 */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx(styles.container, className)}>{children}</div>;
}
