import { useScrollProgress } from '../../hooks/useScrollProgress';
import styles from './ScrollProgress.module.css';

/** Barra fina superior que refleja el avance de lectura de la página. */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className={styles.bar}
      style={{ transform: `scaleX(${progress})` }}
      role="progressbar"
      aria-hidden="true"
    />
  );
}
