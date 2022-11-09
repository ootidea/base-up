/**
 * Function with improved type of Object.keys.
 * @example
 * keys({ abc: 3, def: true }) results ['abc', 'def']
 */
export function keys<K extends string | number>(record: Record<K, unknown>): ReadonlyArray<`${K}`> {
  return Object.keys(record) as any
}

/** Function with improved type of Object.fromEntries. */
export function fromEntries<K extends keyof any, T>(entries: Iterable<readonly [K, T]>): Record<K, T> {
  return Object.fromEntries(entries) as Record<K, T>
}
