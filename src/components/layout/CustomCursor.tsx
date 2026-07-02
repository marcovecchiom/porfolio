import { useRef } from 'react';
import { useCustomCursor } from '../../hooks/useCustomCursor';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './CustomCursor.module.css';

/** ¿El dispositivo tiene un puntero fino (mouse/trackpad)? */
function hasFinePointer(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
}

/**
 * Cursor personalizado (punto + anillo). Solo se monta en dispositivos con
 * puntero fino; en touch no aporta y podría estorbar.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // El hook no hace nada si los refs son null, pero evitamos montar el DOM en touch.
  useCustomCursor(dotRef, ringRef, !reduced);

  if (!hasFinePointer()) return null;

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
}
