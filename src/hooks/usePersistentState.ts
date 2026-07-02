import { useEffect, useState } from 'react';

/**
 * `useState` que persiste su valor en localStorage.
 *
 * Útil para recordar preferencias del visitante (tema, idioma) entre visitas.
 * Es tolerante a fallos: si localStorage no está disponible (modo privado,
 * cuota llena), degrada a estado en memoria sin romper la app.
 *
 * @param key    Clave de almacenamiento.
 * @param initial Valor inicial si no hay nada guardado.
 */
export function usePersistentState<T>(key: string, initial: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => readStorage(key, initial));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Sin persistencia disponible: seguimos con el valor en memoria.
    }
  }, [key, value]);

  return [value, setValue];
}

/** Lee y parsea un valor de localStorage, con fallback ante cualquier error. */
function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
