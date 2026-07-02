import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cx } from '../../utils/cx';
import styles from './EmphasizedText.module.css';

interface EmphasizedTextProps {
  children: string;
  /** Color del acento para el texto y el subrayado. */
  tone?: 'accent' | 'accent2' | 'accent3';
}

/** Mapea el tono a la clase de color correspondiente. */
const TONE_CLASS = {
  accent: styles.accent,
  accent2: styles.accent2,
  accent3: styles.accent3,
} as const;

/**
 * Palabra resaltada dentro de un título: se pinta con el acento y dibuja un
 * subrayado que "crece" cuando entra en pantalla. Puro adorno, por eso
 * respeta prefers-reduced-motion (aparece ya subrayada, sin animar).
 */
export function EmphasizedText({ children, tone = 'accent' }: EmphasizedTextProps) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLSpanElement>({ rootMargin: '0px 0px -20% 0px' });
  const drawn = reduced || inView;

  return (
    <span ref={ref} className={cx(styles.word, TONE_CLASS[tone], drawn && styles.drawn)}>
      {children}
    </span>
  );
}
