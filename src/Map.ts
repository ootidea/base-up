import { every } from './collectionPredicate'
import { Nominal } from './type'

declare const NON_EMPTY_MAP_TAG: unique symbol
export type NonEmptyMap<K, T> = Nominal<Map<K, T>, typeof NON_EMPTY_MAP_TAG>
export type ReadonlyNonEmptyMap<K, T> = Nominal<ReadonlyMap<K, T>, typeof NON_EMPTY_MAP_TAG>

/**
 * Wrapper function for the Map constructor.
 * Use to avoid name conflicts.
 */
export function newMap<K, T>(...args: ConstructorParameters<typeof Map<K, T>>) {
  return new Map(...args)
}

export function mapOf<H extends readonly [any, any], T extends readonly [any, any][]>(
  head: H,
  ...tail: T
): ReadonlyNonEmptyMap<H[0] | T[number][0], H[1] | T[number][1]>
export function mapOf<T extends readonly [any, any][]>(...args: T): ReadonlyMap<T[number][0], T[number][1]>
export function mapOf<T extends readonly [any, any][]>(...args: T): ReadonlyMap<T[number][0], T[number][1]> {
  return new Map(args)
}

export function everyKeys<K, T, U extends K>(
  self: ReadonlyMap<K, T>,
  f: (key: K) => key is U
): self is ReadonlyMap<U, T>
export function everyKeys<K, T>(self: ReadonlyMap<K, T>, f: (key: K) => boolean): boolean
export function everyKeys<K, T>(self: ReadonlyMap<K, T>, f: (key: K) => boolean): boolean {
  return every.Iterable(self.keys(), f)
}

export function everyValues<K, T, U extends T>(
  self: ReadonlyMap<K, T>,
  f: (value: T) => value is U
): self is ReadonlyMap<K, U>
export function everyValues<K, T>(self: ReadonlyMap<K, T>, f: (value: T) => boolean): boolean
export function everyValues<K, T>(self: ReadonlyMap<K, T>, f: (value: T) => boolean): boolean {
  return every.Iterable(self.values(), f)
}
