import { createContext, useContext } from 'react';
import type { ColorScheme, Theme } from '../theme/palette';

/** Lo que expone el contexto de tema a la app. */
export interface ThemeContextValue {
  /** Tokens de color ya resueltos (para uso en JS: canvas, etc.). */
  theme: Theme;
  /** Esquema activo. */
  scheme: ColorScheme;
  /** Atajo booleano de conveniencia. */
  isDark: boolean;
  /** Alterna entre claro y oscuro. */
  toggleScheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Acceso al tema activo. Falla explícitamente si se usa fuera del provider,
 * convirtiendo un error silencioso en uno inmediato y claro.
 */
export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (value === null) {
    throw new Error('useTheme debe usarse dentro de <ThemeProvider>.');
  }
  return value;
}
