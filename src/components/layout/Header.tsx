import { useLanguage } from '../../context/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import styles from './Header.module.css';

/**
 * Cabecera fija con logo, navegación por secciones y los controles de idioma
 * y tema. Los enlaces del nav se generan a partir del diccionario, así el
 * orden y las etiquetas siguen al idioma activo.
 */
export function Header() {
  const { t } = useLanguage();

  const links = [
    { href: '#about', label: t.nav.approach },
    { href: '#work', label: t.nav.work },
    { href: '#experience', label: t.nav.experience },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand}>
          <span className={styles.mark}>MM</span>
          <span className={styles.name}>Mauricio Marcovecchio</span>
        </a>

        <div className={styles.controls}>
          <nav className={styles.nav} aria-label={t.nav.approach}>
            {links.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
