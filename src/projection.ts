/**
 * Function with improved type of Object.keys.
 * @example
 * keysOf({ abc: 3, def: true }) returns ['abc', 'def']
 * keysOf({ abc: 3, def: true }) is typed as ('abc' | 'def')[]
 * @example
 * keysOf({ 0: null, 1: 'time' }) returns ['0', '1']
 * keysOf({ 0: null, 1: 'time' }) is typed as ('0' | '1')[]
 */
export function keysOf<T extends object>(record: T): KeysOf<T>[] {
  return Object.keys(record) as any
}
export type KeysOf<T, K extends keyof T = keyof T> = K extends K
  ? K extends string
    ? K
    : K extends number
    ? `${K}`
    : never
  : never

/**
 * Get keys as type number from a record where key is type number.
 * @example
 * numberKeysOf({ 10: [], 4: "abc" }) returns [10, 4]
 * numberKeysOf({ 10: [], 4: "abc" }) is typed as readonly (10 | 4)[]
 */
export function numberKeysOf<K extends number>(record: Record<K, unknown>): K[] {
  return Object.keys(record).map(Number) as any
}

/**
 * Function with improved type of Object.values.
 * @example
 * valuesOf({ abc: 3, def: true }) returns [3, true]
 * valuesOf({ abc: 3, def: true }) is typed as (number | boolean)[]
 * @example
 * valuesOf({ 0: false, 1: 'time' } as const) returns [false, 'time']
 * valuesOf({ 0: false, 1: 'time' } as const) is typed as (false | 'time')[]
 */
export function valuesOf<T extends object>(record: T): T[keyof T][] {
  return Object.values(record) as any
}

/** Function with improved type of Object.entries */
export function entriesOf<K extends keyof any, T>(record: Record<K, T>): [ToStringKey<K>, T][] {
  return Object.entries(record) as any
}
export type ToStringKey<K extends keyof any> = K extends K
  ? K extends string
    ? K
    : K extends number
    ? `${K}`
    : never
  : never
