import { useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useNetworkCanvas } from '../../hooks/useNetworkCanvas';
import styles from './NetworkCanvas.module.css';

/**
 * Fondo animado de red de partículas. Envuelve el <canvas> y le conecta el
 * hook de animación con el color del tema. Se desactiva ante reduce-motion.
 */
export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const reduced = usePrefersReducedMotion();

  useNetworkCanvas(canvasRef, theme.net, !reduced);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
