import { buildProjects } from '../../content/portfolio';
import { useLanguage } from '../../context/LanguageContext';
import { Container } from '../ui/Container';
import { EmphasizedText } from '../ui/EmphasizedText';
import { ProjectCard } from '../ui/ProjectCard';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import styles from './Work.module.css';

/** Acentos que rotan entre las tarjetas para variar el color de cada una. */
const ACCENT_CYCLE = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)'];

/** Sección de trabajos seleccionados: grilla de tarjetas de proyecto. */
export function Work() {
  const { lang, t } = useLanguage();
  const projects = buildProjects(lang);

  return (
    <section id="work" className={styles.section} aria-labelledby="work-heading">
      <Container>
        <div className={styles.header}>
          <Reveal>
            <SectionLabel>{t.work.label}</SectionLabel>
          </Reveal>
          <Reveal delay={60}>
            <h2 id="work-heading" className={styles.heading}>
              {t.work.headingPre}
              <EmphasizedText tone="accent2">{t.work.headingEm}</EmphasizedText>
            </h2>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <Reveal key={project.num}>
              <ProjectCard project={project} accentVar={ACCENT_CYCLE[index % ACCENT_CYCLE.length]} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
