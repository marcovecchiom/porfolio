import { useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { siteConfig } from '../config/site';
import { resolveTheme, themeToCssVars, type ColorScheme } from '../theme/palette';
import { usePersistentState } from '../hooks/usePersistentState';
import { ThemeContext, type ThemeContextValue } from './ThemeContext';

const STORAGE_KEY = 'mm-portfolio:scheme';

/** Preferencia de tema del sistema operativo, si existe. */
function systemScheme(): ColorScheme {
  if (typeof window === 'undefined') return siteConfig.defaultScheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Provee el tema a toda la app y aplica los tokens de color como variables CSS
 * en un nodo raíz. La prioridad de decisión es:
 *   1. lo que el visitante eligió antes (localStorage),
 *   2. la preferencia de su sistema operativo,
 *   3. el default del sitio.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [scheme, setScheme] = usePersistentState<ColorScheme>(STORAGE_KEY, systemScheme());

  const toggleScheme = useCallback(() => {
    setScheme(scheme === 'dark' ? 'light' : 'dark');
  }, [scheme, setScheme]);

  // El tema solo se recalcula cuando cambia el esquema: función pura, memoizable.
  const value = useMemo<ThemeContextValue>(() => {
    const theme = resolveTheme(siteConfig.accent, scheme);
    return { theme, scheme, isDark: scheme === 'dark', toggleScheme };
  }, [scheme, toggleScheme]);

  // Los tokens viven como variables CSS en el <html>: así el fondo de toda la
  // página (y cualquier CSS Module) los hereda sin envolver el árbol en un div.
  useEffect(() => {
    const root = document.documentElement;
    const vars = themeToCssVars(value.theme);
    for (const [prop, val] of Object.entries(vars)) {
      root.style.setProperty(prop, val);
    }
  }, [value.theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
