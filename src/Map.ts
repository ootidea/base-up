import { map as mapIterable } from './Iterable'
import { Nominal } from './type'

declare const NON_EMPTY_MAP_TAG: unique symbol
export type NonEmptyMap<K, T> = Nominal<Map<K, T>, typeof NON_EMPTY_MAP_TAG>
export type ReadonlyNonEmptyMap<K, T> = Nominal<ReadonlyMap<K, T>, typeof NON_EMPTY_MAP_TAG>

export function mapOf<H extends readonly [any, any], T extends readonly [any, any][]>(
  head: H,
  ...tail: T
): ReadonlyNonEmptyMap<H[0] | T[number][0], H[1] | T[number][1]>
export function mapOf<T extends readonly [any, any][]>(...args: T): ReadonlyMap<T[number][0], T[number][1]>
export function mapOf<T extends readonly [any, any][]>(...args: T): ReadonlyMap<T[number][0], T[number][1]> {
  return new Map(args)
}

export function isEmpty<K, T>(map: ReadonlyNonEmptyMap<K, T>): false
export function isEmpty<K, T>(map: ReadonlyMap<K, T>): boolean
export function isEmpty<K, T>(map: ReadonlyMap<K, T>): boolean {
  return map.size === 0
}

export function isNotEmpty<K, T>(map: ReadonlyNonEmptyMap<K, T>): true
export function isNotEmpty<K, T>(map: ReadonlyMap<K, T>): map is ReadonlyNonEmptyMap<K, T>
export function isNotEmpty<K, T>(map: ReadonlyMap<K, T>): map is ReadonlyNonEmptyMap<K, T> {
  return map.size > 0
}

export function map<K, T, U>(map: ReadonlyNonEmptyMap<K, T>, f: (_: T) => U): ReadonlyNonEmptyMap<K, U>
export function map<K, T, U>(map: ReadonlyMap<K, T>, f: (_: T) => U): ReadonlyMap<K, U>
export function map<K, T, U>(map: ReadonlyMap<K, T>, f: (_: T) => U): ReadonlyMap<K, U> {
  return new Map(mapIterable(map.entries(), ([key, value]) => [key, f(value)]))
}

export function set<K, T>(map: ReadonlyMap<K, T>, key: K, value: T): ReadonlyMap<K, T> {
  const cloned = new Map(map)
  cloned.set(key, value)
  return cloned
}

export function update<K, T>(map: ReadonlyMap<K, T>, key: K, f: (_: T | undefined) => T): ReadonlyMap<K, T> {
  const cloned = new Map(map)
  cloned.set(key, f(cloned.get(key)))
  return cloned
}
