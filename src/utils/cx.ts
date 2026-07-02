/**
 * Une nombres de clase, descartando los valores falsy.
 * Alternativa mínima a `clsx`/`classnames` para no sumar una dependencia.
 *
 * @example cx(styles.card, isActive && styles.active)
 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
