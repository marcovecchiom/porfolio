import { useEffect, useRef, type RefObject } from 'react';

/** Convierte "#rrggbb" (o "#rgb") a una tupla [r, g, b]. */
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.replace(/./g, (c) => c + c) : clean;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/** Distancia máxima a la que dos partículas se conectan con una línea. */
const LINK_DISTANCE = 128;
/** Radio de influencia del cursor sobre las partículas. */
const CURSOR_RADIUS = 150;

/**
 * Red de partículas animada para el fondo del hero.
 *
 * Dibuja puntos que flotan y se conectan con líneas cuando están cerca, y que
 * se sienten atraídos suavemente hacia el cursor. El color sigue al tema en
 * vivo (se lee por ref, así cambiar de claro/oscuro no reinicia la animación).
 *
 * @param canvasRef Ref al <canvas> destino.
 * @param color     Color de las partículas (hex).
 * @param enabled   Si false (p. ej. reduce-motion), no se anima.
 */
export function useNetworkCanvas(
  canvasRef: RefObject<HTMLCanvasElement>,
  color: string,
  enabled: boolean,
): void {
  // El color se lee dentro del loop; guardarlo en ref evita reiniciar todo al cambiar de tema.
  const colorRef = useRef(color);
  colorRef.current = color;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const mouse = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let frame = 0;

    /** Recalcula tamaño y reparte las partículas según el área disponible. */
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.round(Math.min(66, (width * height) / 15000));
      points = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      }));
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      const [r, g, b] = hexToRgb(colorRef.current);
      ctx.clearRect(0, 0, width, height);

      // Mover partículas (con leve gravedad hacia el cursor y wrap en los bordes).
      for (const p of points) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CURSOR_RADIUS && dist > 0.5) {
          p.vx += (dx / dist) * 0.012;
          p.vy += (dy / dist) * 0.012;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x += width;
        else if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        else if (p.y > height) p.y -= height;
      }

      // Líneas entre partículas cercanas (opacidad según la distancia).
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DISTANCE) {
            const alpha = (0.16 * (1 - d / LINK_DISTANCE)).toFixed(3);
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Las partículas.
      ctx.fillStyle = `rgba(${r},${g},${b},0.55)`;
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [canvasRef, enabled]);
}
