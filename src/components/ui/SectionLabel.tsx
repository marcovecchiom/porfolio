import { cx } from '../../utils/cx';
import styles from './SectionLabel.module.css';

interface SectionLabelProps {
  /** Texto del rótulo (se muestra en mayúsculas). */
  children: string;
  /** Tono del acento a usar. Por defecto el principal. */
  tone?: 'accent' | 'accent2';
}

/**
 * Rótulo de sección: una línea corta seguida de un texto en versalitas.
 * Marca visualmente el inicio de cada bloque (Approach, Work, ...).
 */
export function SectionLabel({ children, tone = 'accent' }: SectionLabelProps) {
  return (
    <div className={cx(styles.label, tone === 'accent2' && styles.secondary)}>
      <span className={styles.line} aria-hidden="true" />
      <span className={styles.text}>{children}</span>
    </div>
  );
}
