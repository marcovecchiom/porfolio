import { useLanguage } from '../../context/LanguageContext';
import { Container } from '../ui/Container';
import styles from './Footer.module.css';

/** Pie de página con firma y nota de copyright. */
export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <span className={styles.signature}>Mauricio Marcovecchio</span>
        <span>{t.footer}</span>
      </Container>
    </footer>
  );
}
