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

/**
 * Get keys as type number from a record where key is type number.
 * @example
 * numberKeys({ 10: [], 4: "abc" }) returns [10, 4]
 * numberKeys({ 10: [], 4: "abc" }) is typed as readonly (10 | 4)[]
 */
export function numberKeys<K extends number>(record: Record<K, unknown>): readonly K[] {
  return Object.keys(record).map(Number) as any
}
