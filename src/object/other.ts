/**
 * Function with improved type of Object.keys.
 * @example
 * keys({ abc: 3, def: true }) results ['abc', 'def']
 * keys({ abc: 3, def: true }) is typed as ('abc' | 'def')[]
 * @example
 * keys({ 0: null, 1: 'time' }) results ['0', '1']
 * keys({ 0: null, 1: 'time' }) is typed as ('0' | '1')[]
 */
export function keys<K extends string | number>(record: Record<K, unknown>): ReadonlyArray<`${K}`> {
  return Object.keys(record) as any
}

/** Function with improved type of Object.fromEntries. */
export function fromEntries<T extends readonly [any, any]>(entries: Iterable<T>): Record<T[0], T[1]> {
  return Object.fromEntries(entries) as any
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
