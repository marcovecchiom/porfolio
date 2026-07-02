import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import styles from './ThemeToggle.module.css';

/** Ícono de sol (para pasar a claro) o luna (para pasar a oscuro). */
function ThemeIcon({ dark }: { dark: boolean }) {
  if (dark) {
    // Sol: estamos en oscuro, el botón lleva a claro.
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" />
        <g strokeLinecap="round">
          <line x1="12" y1="2.5" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="21.5" />
          <line x1="2.5" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="21.5" y2="12" />
          <line x1="5.2" y1="5.2" x2="7" y2="7" />
          <line x1="17" y1="17" x2="18.8" y2="18.8" />
          <line x1="5.2" y1="18.8" x2="7" y2="17" />
          <line x1="17" y1="7" x2="18.8" y2="5.2" />
        </g>
      </svg>
    );
  }
  // Luna: estamos en claro, el botón lleva a oscuro.
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <path d="M20 13.2A8 8 0 1 1 10.8 4 6.3 6.3 0 0 0 20 13.2Z" />
    </svg>
  );
}

/** Botón para alternar entre modo claro y oscuro. */
export function ThemeToggle() {
  const { isDark, toggleScheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleScheme}
      aria-label={t.themeLabel}
      title={t.themeLabel}
    >
      <ThemeIcon dark={isDark} />
    </button>
  );
}
