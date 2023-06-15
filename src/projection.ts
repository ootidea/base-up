import { IsEqual } from './type'

/**
 * Function with improved type of Object.keys.
 * @example
 * keysOf({ name: 'Bob', age: 60 }) returns ['name', 'age']
 * keysOf({ name: 'Bob', age: 60 }) is typed as ('name' | 'age')[]
 * @example
 * keysOf({ 0: null, 1: 'time' }) returns ['0', '1']
 * keysOf({ 0: null, 1: 'time' }) is typed as ('0' | '1')[]
 * @example
 * keysOf({}) returns []
 * keysOf({}) is typed as []
 * @example
 * keysOf({ [Symbol.iterator]: false }) returns []
 * keysOf({ [Symbol.iterator]: false }) is typed as []
 * @example
 * keysOf([null, undefined]) returns ['0', '1']
 * keysOf([null, undefined]) is typed as ('0' | '1')[]
 */
export function keysOf<const T extends {}>(record: T): KeysOf<T> {
  return Object.keys(record) as any
}
// Remove symbol keys and convert number keys to string
type _KeysOf<T> = keyof T extends infer K extends string | number ? `${K}` : never
// Convert never[] to []
type KeysOf<T> = IsEqual<_KeysOf<T>, never, [], _KeysOf<T>[]>

/**
 * Get keys as type number from a record where key is type number.
 * @example
 * numberKeysOf({ 0: 'first', 1: 'second' } as const) returns [0, 1]
 * numberKeysOf({ 0: 'first', 1: 'second' } as const) is typed as (0 | 1)[]
 */
export function numberKeysOf<const K extends number>(record: Record<K, unknown>): IsEqual<K, never, [], K[]> {
  return Object.keys(record).map(Number) as any
}

/**
 * Function with improved type of Object.values.
 * @example
 * valuesOf({ name: 'Bob', age: 60 }) returns [3, true]
 * valuesOf({ name: 'Bob', age: 60 }) is typed as (number | boolean)[]
 * @example
 * valuesOf({ 0: false, 1: 'time' } as const) returns [false, 'time']
 * valuesOf({ 0: false, 1: 'time' } as const) is typed as (false | 'time')[]
 */
export function valuesOf<const T extends {}>(record: T): T[keyof T][] {
  return Object.values(record) as any
}

/**
 * Function with improved type of Object.entries
 * @example
 * entriesOf({ name: 'Bob', age: 60 }) returns [['name', 'Bob'], ['age', 60]]
 * entriesOf({ name: 'Bob', age: 60 }) is typed as (['name', 'Bob'] | ['age', 60])[]
 * @example number keys
 * entriesOf({ 0: 'first', 1: 'second' } as const) returns [['0', 'first'], ['1', 'second']]
 * entriesOf({ 0: 'first', 1: 'second' } as const) is typed as (['0', 'first'] | ['1', 'second'])[]
 * @example empty object
 * entriesOf({}) returns []
 * entriesOf({}) is typed as []
 */
export function entriesOf<const T extends {}>(record: T): EntriesOf<T> {
  return Object.entries(record) as any
}
type EntriesOf<T, K extends keyof T = keyof T> = {} extends T
  ? []
  : (K extends string | number ? [`${K}`, T[K]] : never)[]
