import { useLanguage } from '../../context/LanguageContext';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import styles from './About.module.css';

/**
 * Sección "Enfoque": una frase-manifiesto a la izquierda y dos párrafos de
 * contexto a la derecha. La palabra clave de la frase va resaltada.
 */
export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <Container>
        <Reveal>
          <SectionLabel tone="accent2">{t.about.label}</SectionLabel>
        </Reveal>

        <div className={styles.grid}>
          <div className={styles.quoteCol}>
            <Reveal>
              <p id="about-heading" className={styles.quote}>
                {t.about.quotePre}
                <span className={styles.emphasis}>{t.about.quoteEm}</span>
                {t.about.quotePost}
              </p>
            </Reveal>
          </div>

          <div className={styles.bodyCol}>
            <Reveal delay={80}>
              <p className={styles.body}>{t.about.body1}</p>
            </Reveal>
            <Reveal delay={160}>
              <p className={styles.body}>{t.about.body2}</p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
