import { siteConfig } from '../../config/site';
import { useLanguage } from '../../context/LanguageContext';
import { Container } from '../ui/Container';
import { EmphasizedText } from '../ui/EmphasizedText';
import { LinkButton } from '../ui/LinkButton';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import styles from './Contact.module.css';

/**
 * Cierre del sitio: invitación a contactar, con CTA de email y enlaces a
 * redes. Los anillos decorativos giran de fondo (se detienen con reduce-motion).
 */
export function Contact() {
  const { t } = useLanguage();
  const { email, linkedin, github } = siteConfig.contact;

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.ringOuter} aria-hidden="true" />
      <div className={styles.ringInner} aria-hidden="true" />

      <Container className={styles.content}>
        <Reveal>
          <SectionLabel>{t.contact.label}</SectionLabel>
        </Reveal>

        <Reveal delay={60}>
          <h2 id="contact-heading" className={styles.heading}>
            {t.contact.headingPre}
            <EmphasizedText tone="accent2">{t.contact.headingEm}</EmphasizedText>
            {t.contact.headingPost}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className={styles.body}>{t.contact.body}</p>
        </Reveal>

        <Reveal delay={180}>
          <div className={styles.actions}>
            <LinkButton href={`mailto:${email}`} trailing="→">
              {t.contact.emailCta}
            </LinkButton>
            <LinkButton href={linkedin} variant="outline" external>
              LinkedIn
            </LinkButton>
            <LinkButton href={github} variant="outline" external>
              GitHub
            </LinkButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
