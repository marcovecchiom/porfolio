import { useLanguage } from '../../context/LanguageContext';
import { Container } from '../ui/Container';
import { EmphasizedText } from '../ui/EmphasizedText';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import styles from './Experience.module.css';

/**
 * Línea de tiempo de experiencia. La columna izquierda (título) queda fija
 * mientras la derecha (los puestos) hace scroll, guiando la lectura.
 */
export function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-heading">
      <Container className={styles.layout}>
        <div className={styles.intro}>
          <Reveal>
            <SectionLabel tone="accent2">{t.exp.label}</SectionLabel>
          </Reveal>
          <Reveal delay={60}>
            <h2 id="experience-heading" className={styles.heading}>
              {t.exp.headingPre}
              <EmphasizedText>{t.exp.headingEm}</EmphasizedText>
            </h2>
          </Reveal>
        </div>

        <ol className={styles.timeline}>
          {t.experience.map((item) => (
            <li key={`${item.company}-${item.period}`}>
              <Reveal className={styles.entry}>
                <span className={styles.marker} aria-hidden="true" />
                <div className={styles.info}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.company}>{item.company}</h3>
                    <span className={styles.role}>{item.role}</span>
                  </div>
                  <p className={styles.line}>{item.line}</p>
                </div>
                <span className={styles.period}>{item.period}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
