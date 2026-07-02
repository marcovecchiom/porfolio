import type { Language } from '../../content/portfolio';
import { useLanguage } from '../../context/LanguageContext';
import { cx } from '../../utils/cx';
import styles from './LanguageToggle.module.css';

/** Idiomas ofrecidos en el conmutador, en orden de aparición. */
const OPTIONS: Language[] = ['en', 'es'];

/** Conmutador segmentado EN / ES. */
export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className={styles.group} role="group" aria-label="Language">
      {OPTIONS.map((option) => {
        const active = lang === option;
        return (
          <button
            key={option}
            type="button"
            className={cx(styles.segment, active && styles.active)}
            onClick={() => setLang(option)}
            aria-pressed={active}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
