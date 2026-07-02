import { createContext, useContext } from 'react';
import type { Language, Translation } from '../content/portfolio';

/** Lo que expone el contexto de idioma. */
export interface LanguageContextValue {
  /** Idioma activo. */
  lang: Language;
  /** Cambia el idioma. */
  setLang: (lang: Language) => void;
  /** Diccionario de textos del idioma activo (atajo de conveniencia). */
  t: Translation;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Acceso al idioma activo y sus textos. Falla si se usa fuera del provider. */
export function useLanguage(): LanguageContextValue {
  const value = useContext(LanguageContext);
  if (value === null) {
    throw new Error('useLanguage debe usarse dentro de <LanguageProvider>.');
  }
  return value;
}
