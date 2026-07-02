/**
 * Sistema de color del porfolio.
 *
 * Un único lugar donde vive el color. La UI nunca hardcodea hex: consume
 * variables CSS (--bg, --accent, ...) que se derivan de estas paletas.
 *
 * Cada "acento" es una paleta tri-color al estilo Material Design
 * (primario · secundario · terciario), con variantes para claro y oscuro.
 * Cambiar de acento o agregar uno nuevo no toca ningún componente
 * (principio abierto/cerrado).
 */

/** Acentos disponibles. Agregar uno nuevo = una entrada más en ACCENTS. */
export type AccentName = 'forest' | 'cobalt' | 'plum';

/** Modo de color. */
export type ColorScheme = 'light' | 'dark';

/** Los cuatro tonos de acento para un esquema dado. */
interface AccentTones {
  /** Color de acento principal (CTAs, foco). */
  primary: string;
  /** Variante hover del principal. */
  primaryHover: string;
  /** Acento secundario. */
  secondary: string;
  /** Acento terciario. */
  tertiary: string;
}

/** Una paleta de acento completa: sus tonos en claro y en oscuro. */
interface AccentPalette {
  light: AccentTones;
  dark: AccentTones;
}

/**
 * Paletas de acento. Los valores replican las combinaciones Material del
 * diseño original: forest (verde · naranja · azul), cobalt (índigo · cian ·
 * rosa) y plum (púrpura · teal · rosa).
 */
const ACCENTS: Record<AccentName, AccentPalette> = {
  forest: {
    light: { primary: '#2E7D32', primaryHover: '#1B5E20', secondary: '#EF6C00', tertiary: '#1565C0' },
    dark: { primary: '#81C784', primaryHover: '#A5D6A7', secondary: '#FFB74D', tertiary: '#64B5F6' },
  },
  cobalt: {
    light: { primary: '#3949AB', primaryHover: '#303F9F', secondary: '#00838F', tertiary: '#C2185B' },
    dark: { primary: '#7986CB', primaryHover: '#9FA8DA', secondary: '#4DD0E1', tertiary: '#F06292' },
  },
  plum: {
    light: { primary: '#6A1B9A', primaryHover: '#4A148C', secondary: '#00897B', tertiary: '#AD1457' },
    dark: { primary: '#BA68C8', primaryHover: '#CE93D8', secondary: '#4DB6AC', tertiary: '#F06292' },
  },
};

/** Neutrales (fondo, texto, bordes) por esquema. Independientes del acento. */
const NEUTRALS: Record<ColorScheme, Omit<Theme, keyof AccentDerived | 'scheme'>> = {
  light: {
    bg: '#F4F1EA',
    elevated: '#FBF9F4',
    text: '#1B1A17',
    muted: '#57544D',
    faint: '#8E8A81',
    border: '#E5E0D6',
  },
  dark: {
    bg: '#131210',
    elevated: '#1C1A17',
    text: '#EEEAE0',
    muted: '#9C978C',
    faint: '#66625A',
    border: '#2A2723',
  },
};

/** Tokens derivados del acento (lo que agrega el acento sobre los neutrales). */
interface AccentDerived {
  accent: string;
  accentHover: string;
  /** Fondo tenue del acento (halos, glows suaves). */
  accentSoft: string;
  accent2: string;
  accent3: string;
  /** Color de las partículas del canvas del hero. */
  net: string;
}

/** Conjunto completo de tokens de color listos para pintar. */
export interface Theme extends AccentDerived {
  bg: string;
  elevated: string;
  text: string;
  muted: string;
  faint: string;
  border: string;
  scheme: ColorScheme;
}

/**
 * Resuelve la paleta completa para un acento y un esquema dados.
 * Es una función pura: mismas entradas → mismo objeto de tokens.
 */
export function resolveTheme(accent: AccentName, scheme: ColorScheme): Theme {
  const tones = ACCENTS[accent][scheme];
  const softAlpha = scheme === 'dark' ? '15%' : '9%';

  return {
    ...NEUTRALS[scheme],
    scheme,
    accent: tones.primary,
    accentHover: tones.primaryHover,
    accentSoft: `color-mix(in srgb, ${tones.primary} ${softAlpha}, transparent)`,
    accent2: tones.secondary,
    accent3: tones.tertiary,
    net: tones.primary,
  };
}

/**
 * Traduce un Theme a variables CSS (`--bg`, `--accent`, ...).
 * Estas variables se aplican en el nodo raíz y las consumen los CSS Modules.
 */
export function themeToCssVars(theme: Theme): Record<string, string> {
  return {
    '--bg': theme.bg,
    '--elevated': theme.elevated,
    '--text': theme.text,
    '--muted': theme.muted,
    '--faint': theme.faint,
    '--border': theme.border,
    '--accent': theme.accent,
    '--accent-hover': theme.accentHover,
    '--accent-soft': theme.accentSoft,
    '--accent-2': theme.accent2,
    '--accent-3': theme.accent3,
    'color-scheme': theme.scheme,
  };
}
