import type { AccentName, ColorScheme } from '../theme/palette';
import type { Language } from '../content/portfolio';

/**
 * Configuración global del sitio: datos de contacto, redes y valores por
 * defecto de tema/idioma. Cambiar el acento o el idioma inicial es tocar
 * una sola línea acá, sin buscar por los componentes.
 */
export const siteConfig = {
  /** Acento de color activo (ver src/theme/palette.ts). */
  accent: 'forest' as AccentName,
  /** Tema por defecto cuando el visitante no tiene preferencia guardada ni del SO. */
  defaultScheme: 'light' as ColorScheme,
  /** Idioma por defecto. */
  defaultLanguage: 'en' as Language,

  /** Contacto y redes. Único lugar donde viven estos enlaces. */
  contact: {
    email: 'marcovecchio.mauricio@gmail.com',
    linkedin: 'https://www.linkedin.com/in/marcovecchio/',
    github: 'https://github.com/marcovecchiom',
  },
} as const;
