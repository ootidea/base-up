import { MinLengthOf, Tuple } from './Array/other'
import { RangeUntil } from './generate'
import { Interpolable } from './string/other'
import { IsEqual } from './typePredicate'

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
export type KeysOf<T> = IsEqual<T, any> extends true
  ? string[]
  : IsEqual<T, never> extends true
  ? never
  : T extends Tuple
  ? KeysOfTuple<T>
  : _KeysOf<T> extends infer Keys
  ? IsEqual<Keys, never, [], Keys[]>
  : never
// Remove symbol keys and convert number keys to string
type _KeysOf<T> = keyof T extends infer K
  ? K extends string | number
    ? IsEqual<K, never> extends true
      ? never
      : IsEqual<K, any> extends true
      ? string
      : `${K}`
    : never
  : never
type KeysOfTuple<T extends Tuple> = IsEqual<Exclude<keyof T, keyof []>, never> extends true
  ? string[]
  : ToStringElements<RangeUntil<MinLengthOf<T>>>
type ToStringElements<T extends Tuple> = T extends readonly [infer H extends Interpolable, ...infer L]
  ? [`${H}`, ...ToStringElements<L>]
  : []

/**
 * Get all keys of an object including inherited keys.
 * It behaves similarly to the typeof operator.
 * @example
 * allKeysOf({ name: 'Bob', age: 60 }) returns new Set(['name', 'age'])
 * allKeysOf({}) returns new Set()
 * allKeysOf({ 0: false, 1: true }) returns new Set(['0', '1'])
 * allKeysOf({ [Symbol.iterator]: false }) returns new Set([Symbol.iterator])
 */
export function allKeysOf(objectLike: unknown): Set<string | symbol> {
  const result: Set<string | symbol> = new Set()
  const basePrototype = Object.getPrototypeOf({})

  let current = objectLike
  while (current !== basePrototype) {
    for (const ownPropertyName of Object.getOwnPropertyNames(current)) {
      if (ownPropertyName !== 'constructor') {
        result.add(ownPropertyName)
      }
    }
    for (const ownPropertySymbol of Object.getOwnPropertySymbols(current)) {
      result.add(ownPropertySymbol)
    }
    current = Object.getPrototypeOf(current)
  }
  return result
}

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
type _EntriesOf<T> = keyof T extends infer K extends keyof T
  ? K extends string | number
    ? [`${K}`, T[K]]
    : never
  : never
type EntriesOf<T> = IsEqual<_EntriesOf<T>, never, [], _EntriesOf<T>[]>
