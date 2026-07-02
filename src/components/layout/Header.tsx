import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { cx } from '../../utils/cx';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import styles from './Header.module.css';

/** Ícono hamburguesa / cerrar según el estado del menú. */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
      {open ? (
        <>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </>
      )}
    </svg>
  );
}

/**
 * Cabecera fija con logo, navegación por secciones y los controles de idioma
 * y tema. En pantallas chicas la navegación se pliega en un menú desplegable
 * accesible (hamburguesa); en escritorio se muestra en línea.
 */
export function Header() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '#about', label: t.nav.approach },
    { href: '#work', label: t.nav.work },
    { href: '#experience', label: t.nav.experience },
    { href: '#contact', label: t.nav.contact },
  ];

  // Cerrar el menú con Escape mejora la navegación por teclado.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <span className={styles.mark}>MM</span>
          <span className={styles.name}>Mauricio Marcovecchio</span>
        </a>

        <div className={styles.controls}>
          <nav
            id="primary-nav"
            className={cx(styles.nav, menuOpen && styles.navOpen)}
            aria-label={t.nav.approach}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.navLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <LanguageToggle />
          <ThemeToggle />

          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>
    </header>
  );
}
