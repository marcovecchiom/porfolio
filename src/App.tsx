import { LanguageProvider } from './context/LanguageProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { CustomCursor } from './components/layout/CustomCursor';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { StackMarquee } from './components/sections/StackMarquee';
import { Work } from './components/sections/Work';

/**
 * Raíz de la aplicación. Envuelve todo en los providers de tema e idioma y
 * ordena las secciones. La composición vive acá; cada sección es autónoma y
 * lee lo que necesita de los contextos.
 */
export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ScrollProgress />
        <CustomCursor />
        <Header />

        <main id="top">
          <Hero />
          <StackMarquee />
          <About />
          <Work />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}
