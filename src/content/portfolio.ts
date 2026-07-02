/**
 * Contenido del porfolio: la "fuente de verdad" de todos los textos.
 *
 * Separamos lo que se traduce (textos EN/ES) de lo que no depende del idioma
 * (numeración, iniciales, stack técnico, patrón de portada). Así una traducción
 * nunca puede quedar desincronizada de la metadata visual del proyecto.
 */

/** Idiomas soportados. */
export type Language = 'en' | 'es';

/** Un fragmento del título del hero; `emphasized` lo resalta con el acento. */
export interface HeadlineSegment {
  text: string;
  emphasized?: boolean;
}

/** Parte traducible de un proyecto. */
interface ProjectCopy {
  context: string;
  name: string;
  role: string;
}

/** Parte de un proyecto que no depende del idioma. */
interface ProjectMeta {
  /** Número de orden ("01".."06"). */
  num: string;
  /** Inicial grande decorativa de la portada. */
  mono: string;
  /** Stack técnico (chips). */
  stack: string[];
  /** Patrón CSS de la portada (usa la variable --ca de la tarjeta). */
  coverPattern: string;
}

/** Proyecto completo, ya resuelto para un idioma. */
export type Project = ProjectCopy & ProjectMeta;

/** Un puesto en la línea de experiencia. */
export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  line: string;
}

/** Diccionario completo de textos para un idioma. */
export interface Translation {
  nav: { approach: string; work: string; experience: string; contact: string };
  themeLabel: string;
  hero: {
    status: string;
    role: string;
    headline: HeadlineSegment[];
    sub: string;
    cta1: string;
    cta2: string;
    location: string;
  };
  about: {
    label: string;
    quotePre: string;
    quoteEm: string;
    quotePost: string;
    body1: string;
    body2: string;
  };
  work: { label: string; headingPre: string; headingEm: string };
  projects: ProjectCopy[];
  exp: { label: string; headingPre: string; headingEm: string };
  experience: ExperienceItem[];
  contact: {
    label: string;
    headingPre: string;
    headingEm: string;
    headingPost: string;
    body: string;
    emailCta: string;
  };
  footer: string;
}

/**
 * Metadata visual de los proyectos, común a todos los idiomas.
 * El orden se corresponde 1:1 con `translations[lang].projects`.
 */
const PROJECT_META: ProjectMeta[] = [
  {
    num: '01',
    mono: 'A',
    stack: ['MCP', 'Anthropic', 'Bedrock', 'Textract', 'Lambda', 'Step Functions', 'Node.js', 'TypeScript'],
    coverPattern:
      'repeating-radial-gradient(circle at 86% 128%, transparent 0 25px, color-mix(in srgb, var(--ca) 15%, transparent) 25px 26px)',
  },
  {
    num: '02',
    mono: 'm',
    stack: ['React', 'TypeScript', 'Node.js'],
    coverPattern:
      'radial-gradient(color-mix(in srgb, var(--ca) 26%, transparent) 1.4px, transparent 1.7px)',
  },
  {
    num: '03',
    mono: 'W',
    stack: ['React', 'TypeScript'],
    coverPattern:
      'repeating-linear-gradient(45deg, color-mix(in srgb, var(--ca) 14%, transparent) 0 1px, transparent 1px 13px)',
  },
  {
    num: '04',
    mono: 'L',
    stack: ['React Native'],
    coverPattern:
      'repeating-linear-gradient(0deg, color-mix(in srgb, var(--ca) 12%, transparent) 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, color-mix(in srgb, var(--ca) 12%, transparent) 0 1px, transparent 1px 22px)',
  },
  {
    num: '05',
    mono: 'D',
    stack: ['React', 'Node.js'],
    coverPattern:
      'repeating-linear-gradient(0deg, color-mix(in srgb, var(--ca) 15%, transparent) 0 1px, transparent 1px 15px)',
  },
  {
    num: '06',
    mono: 'T',
    stack: ['React', 'Node.js'],
    coverPattern:
      'repeating-linear-gradient(90deg, color-mix(in srgb, var(--ca) 15%, transparent) 0 2px, transparent 2px 18px)',
  },
];

/** Tecnologías que desfilan en el marquee (independiente del idioma). */
export const MARQUEE: string[] = [
  'React',
  'React Native',
  'Node.js',
  'TypeScript',
  'AWS Lambda',
  'S3',
  'Step Functions',
  'Textract',
  'Bedrock',
  'MCP',
  'Serverless',
  'REST APIs',
  'Scrum',
  'CI/CD',
];

/** Diccionarios de traducción. */
export const translations: Record<Language, Translation> = {
  en: {
    nav: { approach: 'Approach', work: 'Work', experience: 'Experience', contact: 'Contact' },
    themeLabel: 'Toggle dark mode',
    hero: {
      status: 'Open to senior & architecture roles',
      role: 'Senior Full Stack Developer & Software Architect',
      headline: [
        { text: 'I build scalable platforms ' },
        { text: 'and lead', emphasized: true },
        { text: ' the teams that ship them.' },
      ],
      sub: '10+ years across React, Node.js & TypeScript and AWS Serverless architectures. Currently focused on bringing AI into complex, document-driven operations in gov-tech and fintech.',
      cta1: 'View work',
      cta2: 'Get in touch',
      location: 'Buenos Aires, Argentina · Remote-friendly',
    },
    about: {
      label: 'Approach',
      quotePre: 'Business vision in, ',
      quoteEm: 'engineering decisions',
      quotePost: ' out.',
      body1:
        'I pair the technical depth of a software architect with a solid track record as a Scrum Master. That lets me read a system end to end, translate business vision into engineering decisions, and steer teams toward the solution that actually fits the problem — prioritizing value over a preconceived answer.',
      body2:
        'Over 10+ years I’ve built and led the platforms behind gov-tech and fintech products. Today I’m focused on integrating AI into complex, document-driven operations.',
    },
    work: { label: 'Selected work', headingPre: 'A few things ', headingEm: 'I’ve built.' },
    projects: [
      {
        context: 'Urban Development Secretariat · GCBA',
        name: 'Process Automation Platform',
        role: 'End-to-end architect. An MCP layer over Anthropic + AWS Bedrock & Textract turned a manual document-review process into an automated, scalable flow.',
      },
      {
        context: 'Government education platform · GCBA',
        name: 'miEscuela',
        role: 'Integrated MiBA authentication, the Obelisco UI and the Callejero API into a platform built for concurrent access at scale.',
      },
      {
        context: 'Fintech / Crypto · B2C',
        name: 'Transactional Wallet',
        role: 'Core architecture of a digital wallet, from concept to a secure launch — delivered alongside the Scrum Master role.',
      },
      {
        context: 'Fintech · Consumer credit',
        name: 'Lending Platform',
        role: 'Onboarding, identity verification (KYC) and credit-scoring flows engineered for customer acquisition and conversion.',
      },
      {
        context: 'AdTech · DSP',
        name: 'Demand Side Platform',
        role: 'Migrated a PHP monolith to React and moved the REST APIs to Node.js, enabling real-time communication and faster data processing.',
      },
      {
        context: 'AdTech · U.S. Hispanic market',
        name: 'Targeting Portfolio App',
        role: 'Interactive app to visualize ad-targeting options in real time, plus internal dashboards for campaign decisions.',
      },
    ],
    exp: { label: 'Experience', headingPre: '10+ years, ', headingEm: 'end to end.' },
    experience: [
      {
        company: 'Phinx Labs',
        role: 'Sr. Full Stack Dev & Architect',
        period: 'Oct 2024 — Jul 2026',
        line: 'AI-driven gov-tech & fintech automation on AWS Serverless; technical reference and team lead.',
      },
      {
        company: 'Clave',
        role: 'Full Stack Dev & Scrum Master',
        period: 'Dec 2021 — May 2023',
        line: 'Core architecture of a transactional crypto wallet, from concept to launch.',
      },
      {
        company: 'Wenance',
        role: 'Full Stack Dev & Scrum Master',
        period: 'Jun — Dec 2021',
        line: 'Onboarding, KYC and credit-scoring flows in React Native; led agile adoption.',
      },
      {
        company: 'Zetech · TuRecibo.com',
        role: 'Developer & Scrum Master',
        period: 'Jun 2020 — Jun 2021',
        line: 'Refactored and optimized a document-management platform; reduced technical debt.',
      },
      {
        company: 'Pulpo Media',
        role: 'Full Stack Developer',
        period: 'Jul 2019 — Jun 2020',
        line: 'Real-time ad-targeting tools and dashboards for the U.S. Hispanic market.',
      },
      {
        company: 'Darriens',
        role: 'Full Stack Developer',
        period: 'Feb 2016 — Jun 2019',
        line: 'Migrated a DSP from PHP monolith to React + Node.js; mentored 2 juniors.',
      },
    ],
    contact: {
      label: 'Contact',
      headingPre: 'Let’s build something ',
      headingEm: 'that scales',
      headingPost: '.',
      body: 'Open to senior engineering and architecture roles, and to conversations with teams building ambitious products.',
      emailCta: 'Email me',
    },
    footer: '© 2026 · Buenos Aires, Argentina',
  },

  es: {
    nav: { approach: 'Enfoque', work: 'Proyectos', experience: 'Experiencia', contact: 'Contacto' },
    themeLabel: 'Cambiar modo oscuro',
    hero: {
      status: 'Disponible para roles senior y de arquitectura',
      role: 'Senior Full Stack Developer & Software Architect',
      headline: [
        { text: 'Construyo plataformas escalables ' },
        { text: 'y lidero', emphasized: true },
        { text: ' los equipos que las hacen realidad.' },
      ],
      sub: '10+ años en React, Node.js & TypeScript y arquitecturas AWS Serverless. Hoy enfocado en llevar IA a operativas documentales complejas en gov-tech y fintech.',
      cta1: 'Ver proyectos',
      cta2: 'Hablemos',
      location: 'Buenos Aires, Argentina · Trabajo remoto',
    },
    about: {
      label: 'Enfoque',
      quotePre: 'Visión de negocio adentro, ',
      quoteEm: 'decisiones de ingeniería',
      quotePost: ' afuera.',
      body1:
        'Combino la profundidad técnica del arquitecto con una sólida trayectoria como Scrum Master. Eso me permite leer el sistema de extremo a extremo, traducir la visión de negocio en decisiones de ingeniería y orientar a los equipos hacia la solución que mejor se adapta al problema — priorizando el valor sobre la respuesta preconcebida.',
      body2:
        'En 10+ años construí y lideré las plataformas detrás de productos gov-tech y fintech. Hoy estoy enfocado en integrar IA en operativas documentales complejas.',
    },
    work: { label: 'Trabajo seleccionado', headingPre: 'Algunas cosas ', headingEm: 'que construí.' },
    projects: [
      {
        context: 'Secretaría de Desarrollo Urbano · GCBA',
        name: 'Plataforma de Automatización de Trámites',
        role: 'Arquitecto de extremo a extremo. Una capa MCP sobre Anthropic + AWS Bedrock y Textract convirtió la revisión documental manual en un flujo automatizado y escalable.',
      },
      {
        context: 'Plataforma educativa gubernamental · GCBA',
        name: 'miEscuela',
        role: 'Integré la autenticación MiBA, la UI Obelisco y la API Callejero en una plataforma pensada para acceso concurrente a escala.',
      },
      {
        context: 'Fintech / Crypto · B2C',
        name: 'Billetera Transaccional',
        role: 'Arquitectura core de una billetera virtual, desde la concepción hasta un lanzamiento seguro — en paralelo al rol de Scrum Master.',
      },
      {
        context: 'Fintech · Crédito al consumo',
        name: 'Plataforma de Préstamos',
        role: 'Flujos de onboarding, validación de identidad (KYC) y scoring crediticio diseñados para adquisición y conversión.',
      },
      {
        context: 'AdTech · DSP',
        name: 'Demand Side Platform',
        role: 'Migré un monolito PHP a React y llevé las APIs REST a Node.js, habilitando comunicación en tiempo real y mejor procesamiento de datos.',
      },
      {
        context: 'AdTech · Mercado hispano de EE.UU.',
        name: 'App de Targeting',
        role: 'App interactiva para visualizar opciones de targeting en tiempo real, más dashboards internos para decisiones de campaña.',
      },
    ],
    exp: { label: 'Experiencia', headingPre: '10+ años, ', headingEm: 'de punta a punta.' },
    experience: [
      {
        company: 'Phinx Labs',
        role: 'Sr. Full Stack Dev & Arquitecto',
        period: 'Oct 2024 — Jul 2026',
        line: 'Automatización gov-tech y fintech con IA sobre AWS Serverless; referente técnico y líder de equipo.',
      },
      {
        company: 'Clave',
        role: 'Full Stack Dev & Scrum Master',
        period: 'Dic 2021 — May 2023',
        line: 'Arquitectura core de una billetera cripto transaccional, de la idea al launch.',
      },
      {
        company: 'Wenance',
        role: 'Full Stack Dev & Scrum Master',
        period: 'Jun — Dic 2021',
        line: 'Flujos de onboarding, KYC y scoring crediticio en React Native; lideré la adopción ágil.',
      },
      {
        company: 'Zetech · TuRecibo.com',
        role: 'Developer & Scrum Master',
        period: 'Jun 2020 — Jun 2021',
        line: 'Refactorización y optimización de una plataforma de gestión documental; menos deuda técnica.',
      },
      {
        company: 'Pulpo Media',
        role: 'Full Stack Developer',
        period: 'Jul 2019 — Jun 2020',
        line: 'Herramientas de targeting en tiempo real y dashboards para el mercado hispano de EE.UU.',
      },
      {
        company: 'Darriens',
        role: 'Full Stack Developer',
        period: 'Feb 2016 — Jun 2019',
        line: 'Migración de una DSP de monolito PHP a React + Node.js; mentoría a 2 juniors.',
      },
    ],
    contact: {
      label: 'Contacto',
      headingPre: 'Construyamos algo ',
      headingEm: 'que escale',
      headingPost: '.',
      body: 'Abierto a roles senior de ingeniería y arquitectura, y a conversar con equipos que construyen productos ambiciosos.',
      emailCta: 'Escribime',
    },
    footer: '© 2026 · Buenos Aires, Argentina',
  },
};

/**
 * Combina los textos traducidos con la metadata visual para producir la lista
 * de proyectos lista para renderizar en el idioma pedido.
 */
export function buildProjects(lang: Language): Project[] {
  return translations[lang].projects.map((copy, index) => ({
    ...copy,
    ...PROJECT_META[index],
  }));
}
