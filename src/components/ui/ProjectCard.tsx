import type { CSSProperties } from 'react';
import type { Project } from '../../content/portfolio';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  /** Color de acento de la tarjeta, como referencia CSS (ej: 'var(--accent-2)'). */
  accentVar: string;
}

/** Permite pasar `--ca` como variable CSS dentro del objeto style tipado. */
type CardStyle = CSSProperties & { '--ca': string };

/**
 * Tarjeta de proyecto: portada con patrón + inicial grande, y cuerpo con
 * contexto, nombre, descripción y stack. Cada tarjeta recibe su propio acento
 * (`--ca`) para que el patrón, el hover y los chips combinen entre sí.
 */
export function ProjectCard({ project, accentVar }: ProjectCardProps) {
  const style: CardStyle = { '--ca': accentVar };

  return (
    <article className={styles.card} style={style}>
      <div className={styles.cover} style={{ backgroundImage: project.coverPattern }}>
        <span className={styles.num} aria-hidden="true">
          {project.num}
        </span>
        <span className={styles.mono} aria-hidden="true">
          {project.mono}
        </span>
      </div>

      <div className={styles.body}>
        <p className={styles.context}>{project.context}</p>
        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.role}>{project.role}</p>

        <ul className={styles.stack}>
          {project.stack.map((tech) => (
            <li key={tech} className={styles.tag}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
