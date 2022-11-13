/**
 * Function with improved type of Object.keys.
 * @example
 * keys({ abc: 3, def: true }) results ['abc', 'def']
 * keys({ abc: 3, def: true }) is typed as ('abc' | 'def')[]
 * @example
 * keys({ 0: null, 1: 'time' }) results ['0', '1']
 * keys({ 0: null, 1: 'time' }) is typed as ('0' | '1')[]
 */
export function keys<T extends {}>(record: T): ReadonlyArray<Key<keyof T>> {
  return Object.keys(record) as any
}
type Key<T extends keyof any> = T extends string ? T : T extends number ? `${T}` : never

/**
 * Function with improved type of Object.values.
 * @example
 * values({ abc: 3, def: true }) results [3, true]
 * values({ abc: 3, def: true }) is typed as (number | boolean)[]
 * @example
 * values({ 0: false, 1: 'time' } as const) results [false, 'time']
 * values({ 0: false, 1: 'time' } as const) is typed as (false | 'time')[]
 */
export function values<T extends {}>(record: T): ReadonlyArray<T[keyof T]> {
  return Object.values(record) as any
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
