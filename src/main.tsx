import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Fuente auto-alojada (sin peticiones a terceros): mejor privacidad y offline.
import '@fontsource-variable/space-grotesk/index.css';
import './styles/global.css';

import { App } from './App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('No se encontró el nodo raíz #root en index.html.');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
