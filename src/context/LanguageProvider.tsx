import { useEffect, useMemo, type ReactNode } from 'react';
import { siteConfig } from '../config/site';
import { translations, type Language } from '../content/portfolio';
import { usePersistentState } from '../hooks/usePersistentState';
import { LanguageContext, type LanguageContextValue } from './LanguageContext';

const STORAGE_KEY = 'mm-portfolio:lang';

/**
 * Provee el idioma activo y su diccionario de textos. Recuerda la elección
 * del visitante y mantiene sincronizado el atributo `lang` del <html> para
 * accesibilidad y SEO.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = usePersistentState<Language>(STORAGE_KEY, siteConfig.defaultLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
