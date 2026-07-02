import { useLanguage } from '../../context/LanguageContext';
import { Container } from '../ui/Container';
import { EmphasizedText } from '../ui/EmphasizedText';
import { LinkButton } from '../ui/LinkButton';
import { NetworkCanvas } from '../ui/NetworkCanvas';
import { Reveal } from '../ui/Reveal';
import styles from './Hero.module.css';

/** Ícono de ubicación (pin). */
function LocationPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-6.5-5.686-6.5-11a6.5 6.5 0 1 1 13 0c0 5.314-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

/**
 * Sección de apertura: fondo de red animada, estado de disponibilidad, rol,
 * titular grande (con una palabra resaltada), descripción y CTAs.
 */
export function Hero() {
  const { t } = useLanguage();

  return (
    <section className={styles.hero} aria-label={t.hero.role}>
      <NetworkCanvas />
      <div className={styles.overlay} aria-hidden="true" />

      <Container className={styles.content}>
        <Reveal>
          <p className={styles.status}>
            <span className={styles.pulse} aria-hidden="true" />
            {t.hero.status}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p className={styles.role}>{t.hero.role}</p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className={styles.headline}>
            {t.hero.headline.map((segment, index) =>
              segment.emphasized ? (
                <EmphasizedText key={index}>{segment.text}</EmphasizedText>
              ) : (
                <span key={index}>{segment.text}</span>
              ),
            )}
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className={styles.sub}>{t.hero.sub}</p>
        </Reveal>

        <Reveal delay={300}>
          <div className={styles.actions}>
            <LinkButton href="#work" trailing="↓">
              {t.hero.cta1}
            </LinkButton>
            <LinkButton href="#contact" variant="outline">
              {t.hero.cta2}
            </LinkButton>
          </div>
        </Reveal>

        <Reveal delay={380}>
          <p className={styles.location}>
            <span className={styles.pin} aria-hidden="true">
              <LocationPin />
            </span>
            {t.hero.location}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
