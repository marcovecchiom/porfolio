import { MARQUEE } from '../../content/portfolio';
import styles from './StackMarquee.module.css';

/** Una fila de chips de tecnologías. */
function TechRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={styles.row} aria-hidden={hidden || undefined}>
      {MARQUEE.map((tech, index) => (
        <span key={`${tech}-${index}`} className={styles.chip}>
          <span className={styles.dot} aria-hidden="true" />
          {tech}
        </span>
      ))}
    </div>
  );
}

/**
 * Marquee horizontal e infinito con el stack técnico.
 * La fila se duplica: mientras la primera se va, la copia entra, dando la
 * ilusión de bucle sin costura. La copia va oculta a lectores de pantalla.
 */
export function StackMarquee() {
  return (
    <section className={styles.section} aria-label="Stack">
      <div className={styles.viewport}>
        <div className={styles.track}>
          <TechRow />
          <TechRow hidden />
        </div>
      </div>
    </section>
  );
}
