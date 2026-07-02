import { useEffect, type RefObject } from 'react';

/**
 * Cursor personalizado: un punto que sigue al mouse con precisión y un anillo
 * que lo persigue con un leve retardo (efecto "spring"). El anillo se agranda
 * sobre elementos interactivos.
 *
 * Solo debe activarse en dispositivos con puntero fino (mouse/trackpad); en
 * touch no tiene sentido. La verificación queda a cargo del componente que lo usa.
 *
 * @param dotRef  Ref al punto interior.
 * @param ringRef Ref al anillo exterior.
 * @param smooth  Si false (reduce-motion), el anillo no interpola: sigue directo.
 */
export function useCustomCursor(
  dotRef: RefObject<HTMLElement>,
  ringRef: RefObject<HTMLElement>,
  smooth: boolean,
): void {
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      if (!smooth) {
        ring.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    // Loop que interpola el anillo hacia el mouse (solo con animación habilitada).
    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };

    // Estado "hover" sobre elementos accionables.
    const grow = () => ring.classList.add('is-hovering');
    const shrink = () => ring.classList.remove('is-hovering');
    const interactive = Array.from(
      document.querySelectorAll<HTMLElement>('a, button, [data-interactive]'),
    );

    window.addEventListener('mousemove', onMove, { passive: true });
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });
    if (smooth) loop();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, [dotRef, ringRef, smooth]);
}
